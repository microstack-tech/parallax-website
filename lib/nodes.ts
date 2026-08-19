import { isIP, isIPv6 } from "node:net"

// RPC nodes whose net_peers endpoint we query to discover the network.
// Set PARALLAX_RPC_NODES as a comma-separated list of URLs.
const RPC_NODES = (process.env.PARALLAX_RPC_NODES ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)

export const NODES_TTL_MS = 5 * 60 * 1000 // 5 minutes

export type Node = {
  lat: number
  lon: number
  country: string
  countryCode: string
  /** Region/state name, e.g. "California". Empty if unknown. */
  region: string
  /** City name, e.g. "Los Angeles". Empty if unknown. */
  city: string
}

export type NodesPayload = {
  updatedAt: number
  /**
   * Every peer observed, mapped or not: routable hosts plus `torPeers`. Larger
   * than `totalNodes`, which counts only the peers that survived geolocation.
   */
  totalPeers: number
  totalNodes: number
  countries: number
  /**
   * Peer connections carried over Tor. These arrive from net_peers as loopback
   * sockets (the local Tor daemon), so they have no location and never reach
   * the map — we surface the count instead. See `isTorPeer`.
   */
  torPeers: number
  nodes: Node[]
}

type GeoEntry = {
  lat: number
  lon: number
  country: string
  countryCode: string
  region: string
  city: string
}

type CacheEntry = { value: NodesPayload; expires: number }

let cache: CacheEntry | null = null
let inFlight: Promise<NodesPayload> | null = null

/**
 * Strip the port from an "ip:port" address. Handles IPv4, bracketed IPv6
 * ("[::1]:30303") and unbracketed IPv6 — both bare ("2001:db8::1") and, since
 * some peers report it, with a trailing port ("2001:db8::1:30303").
 *
 * The unbracketed-with-port form is ambiguous by construction: RFC 3986 requires
 * brackets precisely because ":30303" is indistinguishable from another hextet.
 * We resolve it by validating: a string that is already a well-formed IPv6
 * address is taken at face value, so "::1:3030" stays an address rather than
 * being read as "::1" port 3030. Only when the whole string is *not* a valid
 * address do we try dropping the last ":segment", and only if what remains is
 * itself a valid IP.
 */
function stripPort(addr: string): string {
  // Bracketed IPv6, with or without a port.
  if (addr.startsWith("[")) {
    const end = addr.indexOf("]")
    return end > 0 ? addr.slice(1, end) : addr
  }

  // A bare IPv6 literal carries no port — brackets would be required for that.
  if (isIPv6(addr)) return addr

  const lastColon = addr.lastIndexOf(":")
  if (lastColon < 0) return addr

  // "host:port" where host is a real IP: IPv4, or unbracketed IPv6 with a port.
  const host = addr.slice(0, lastColon)
  if (isIP(host)) return host

  // Not an IP either way (a hostname, say). Keep the old single-colon rule so
  // "example.com:30303" still yields something geolocatable.
  const colonCount = (addr.match(/:/g) ?? []).length
  if (colonCount === 1) return addr.slice(0, addr.indexOf(":"))
  return addr
}

/**
 * True for peers reached over Tor, which reach us in two shapes:
 *
 * - A ".onion" hostname, for connections the node dialed out. net_peers
 *   reports the logical dial target for these, so we see the real address.
 * - A loopback address, for inbound onion connections. Tor does not disclose
 *   a client's onion address to the service it connects to, so the node only
 *   sees its local daemon's socket and cannot do better.
 *
 * Either way the peer has no geographic location and must not reach the map.
 * Loopback also covers a node proxying *clearnet* traffic through SOCKS5 on an
 * older client, which over-counts Tor slightly; clients returning the dial
 * target report those as ordinary IPs and are unaffected.
 */
function isTorPeer(host: string): boolean {
  return host.endsWith(".onion") || host === "::1" || host.startsWith("127.")
}

/**
 * Fetch peer addresses from all configured RPC nodes via net_peers. The RPC
 * returns "ip:port" strings; we strip the port and return a deduplicated list
 * of routable IP addresses, plus a count of the Tor-relayed connections.
 *
 * Tor peers are counted, not deduplicated. Inbound ones share a single loopback
 * address and are often byte-identical (three entries of "127.0.0.1:9050"), so a
 * Set would collapse distinct connections into one; each RPC node also has its
 * own local daemon, making cross-node dedup meaningless. The result is a sum of
 * connections observed, while `ips` stays a union of distinct hosts.
 */
async function fetchPeerIps(): Promise<{ ips: string[]; torPeers: number }> {
  const allIps = new Set<string>()
  let torPeers = 0

  await Promise.all(
    RPC_NODES.map(async (url) => {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jsonrpc: "2.0", method: "net_peers", params: [], id: 1 }),
          cache: "no-store",
          signal: AbortSignal.timeout(5000),
        })
        if (!res.ok) return
        const json = (await res.json()) as { result?: string[] }
        if (Array.isArray(json.result)) {
          for (const addr of json.result) {
            const ip = stripPort(addr)
            if (!ip) continue
            if (isTorPeer(ip)) torPeers++
            else allIps.add(ip)
          }
        }
      } catch {
        // Skip unreachable nodes.
      }
    }),
  )

  return { ips: Array.from(allIps), torPeers }
}

/**
 * Geolocate up to 100 IPs per call via ip-api.com's free batch endpoint.
 * No API key required. Rate limit is 15 req/min from a single source IP — at
 * one batch per 30-min refresh we are nowhere near it.
 */
async function geolocate(ips: string[]): Promise<Map<string, GeoEntry>> {
  const out = new Map<string, GeoEntry>()
  if (ips.length === 0) return out

  const chunks: string[][] = []
  for (let i = 0; i < ips.length; i += 100) chunks.push(ips.slice(i, i + 100))

  for (const chunk of chunks) {
    try {
      const res = await fetch(
        "http://ip-api.com/batch?fields=status,country,countryCode,regionName,city,lat,lon,query",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(chunk),
          cache: "no-store",
        },
      )
      if (!res.ok) continue
      const arr = (await res.json()) as Array<{
        status?: string
        query?: string
        lat?: number
        lon?: number
        country?: string
        countryCode?: string
        regionName?: string
        city?: string
      }>
      for (const entry of arr) {
        if (entry.status !== "success" || !entry.query) continue
        if (typeof entry.lat !== "number" || typeof entry.lon !== "number") continue
        out.set(entry.query, {
          lat: entry.lat,
          lon: entry.lon,
          country: entry.country ?? "",
          countryCode: entry.countryCode ?? "",
          region: entry.regionName ?? "",
          city: entry.city ?? "",
        })
      }
    } catch {
      // Skip this chunk on transient failure.
    }
  }

  return out
}

async function fetchNodes(): Promise<NodesPayload> {
  const { ips, torPeers } = await fetchPeerIps()
  const geo = await geolocate(ips)

  const nodes: Node[] = []
  for (const ip of ips) {
    const g = geo.get(ip)
    if (!g) continue
    nodes.push({
      lat: g.lat,
      lon: g.lon,
      country: g.country,
      countryCode: g.countryCode,
      region: g.region,
      city: g.city,
    })
  }

  const countries = new Set(nodes.map((n) => n.countryCode).filter(Boolean)).size

  return {
    updatedAt: Date.now(),
    totalPeers: ips.length + torPeers,
    totalNodes: nodes.length,
    countries,
    torPeers,
    nodes,
  }
}

/**
 * Returns the cached node payload if fresh, otherwise refreshes it. Concurrent
 * callers share a single in-flight promise to avoid duplicate work.
 *
 * If `refresh` throws and we have no prior cache, the error propagates. If we
 * have a stale cache, we return it instead.
 */
export async function getNodes(): Promise<NodesPayload> {
  if (cache && Date.now() < cache.expires) return cache.value

  if (!inFlight) {
    inFlight = fetchNodes()
      .then((body) => {
        cache = { value: body, expires: Date.now() + NODES_TTL_MS }
        return body
      })
      .finally(() => {
        inFlight = null
      })
  }

  try {
    return await inFlight
  } catch (err) {
    if (cache) return cache.value
    throw err
  }
}

/** Exposed for the API route so it can set X-Cache headers correctly. */
export function peekCacheStatus(): "HIT" | "MISS" {
  return cache && Date.now() < cache.expires ? "HIT" : "MISS"
}
