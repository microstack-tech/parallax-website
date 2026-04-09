// RPC nodes whose net_peers endpoint we query to discover the network.
// Set PARALLAX_RPC_NODES as a comma-separated list of URLs.
const RPC_NODES = (process.env.PARALLAX_RPC_NODES ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)

export const NODES_TTL_MS = 5 * 60 * 1000 // 5 minutes

export type Node = {
  id: string
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
  totalNodes: number
  countries: number
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
 * Fetch peer IPs from all configured RPC nodes via net_peers, returning a
 * deduplicated list of IP addresses.
 */
async function fetchPeerIps(): Promise<string[]> {
  const allIps = new Set<string>()

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
          for (const ip of json.result) allIps.add(ip)
        }
      } catch {
        // Skip unreachable nodes.
      }
    }),
  )

  return Array.from(allIps)
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
  const ips = await fetchPeerIps()
  const geo = await geolocate(ips)

  const nodes: Node[] = []
  for (const ip of ips) {
    const g = geo.get(ip)
    if (!g) continue
    nodes.push({
      id: ip,
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
    totalNodes: nodes.length,
    countries,
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
