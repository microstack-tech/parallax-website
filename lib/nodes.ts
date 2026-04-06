import { promises as dns } from "node:dns"
import { decodeEnr } from "@/lib/enr"

// EIP-1459 DNS discovery tree for Parallax mainnet.
// Apex TXT at DISCOVERY_ROOT carries `enrtree-root:v1 e=<hash> l=<hash> seq=<n> sig=<...>`.
// We follow the `e=` subtree, walking `enrtree-branch:` records until we hit `enr:` leaves.
const DISCOVERY_ROOT = "all.mainnet.prlxdisc.org"

export const NODES_TTL_MS = 30 * 60 * 1000 // 30 minutes

// Hard caps so a misbehaving discovery tree can't fan out unbounded.
const MAX_TREE_NODES = 2000
const MAX_LOOKUPS = 4000

export type Node = {
  id: string
  lat: number
  lon: number
  country: string
  countryCode: string
  /** Autonomous System number, e.g. "AS16276". Empty if unknown. */
  asn: string
  /** Human-readable AS owner, e.g. "OVH SAS". Empty if unknown. */
  asOrg: string
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
  asn: string
  asOrg: string
}

type CacheEntry = { value: NodesPayload; expires: number }

let cache: CacheEntry | null = null
let inFlight: Promise<NodesPayload> | null = null

/**
 * Resolve a single TXT record at `name` and return the joined string. EIP-1459
 * entries are short enough to fit in a single TXT chunk in practice, but
 * Node's resolveTxt always returns string[][] so we flatten defensively.
 */
async function resolveTxtJoined(name: string): Promise<string | null> {
  try {
    const records = await dns.resolveTxt(name)
    for (const chunks of records) {
      const joined = chunks.join("")
      if (
        joined.startsWith("enrtree-root:") ||
        joined.startsWith("enrtree-branch:") ||
        joined.startsWith("enr:") ||
        joined.startsWith("enrtree://")
      ) {
        return joined
      }
    }
    return records[0]?.join("") ?? null
  } catch {
    return null
  }
}

/**
 * Walk the enrtree starting from the apex root, returning all `enr:` leaves
 * found. Tolerates missing/broken subtrees by skipping them rather than
 * failing the whole fetch.
 */
async function fetchEnrTree(): Promise<string[]> {
  const root = await resolveTxtJoined(DISCOVERY_ROOT)
  if (!root || !root.startsWith("enrtree-root:")) {
    throw new Error(`No enrtree-root at ${DISCOVERY_ROOT}`)
  }

  const eMatch = root.match(/(?:^|\s)e=([A-Z2-7]+)/)
  if (!eMatch) throw new Error("enrtree-root missing e= field")
  const enrSubtreeRoot = eMatch[1]

  const enrs: string[] = []
  const visited = new Set<string>()
  const queue: string[] = [enrSubtreeRoot]
  let lookups = 0

  while (queue.length > 0) {
    if (enrs.length >= MAX_TREE_NODES || lookups >= MAX_LOOKUPS) break
    const hash = queue.shift()!
    if (visited.has(hash)) continue
    visited.add(hash)
    lookups++

    const subname = `${hash}.${DISCOVERY_ROOT}`
    const txt = await resolveTxtJoined(subname)
    if (!txt) continue

    if (txt.startsWith("enr:")) {
      enrs.push(txt)
    } else if (txt.startsWith("enrtree-branch:")) {
      const children = txt
        .slice("enrtree-branch:".length)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
      for (const c of children) {
        if (!visited.has(c)) queue.push(c)
      }
    }
  }

  return enrs
}

/**
 * Split ip-api's `as` field ("AS16276 OVH SAS") into the ASN identifier and
 * the operator name. Returns empty strings if the input is missing or doesn't
 * match the expected shape.
 */
function parseAsField(value: string): { asn: string; asOrg: string } {
  if (!value) return { asn: "", asOrg: "" }
  const m = value.match(/^(AS\d+)\s*(.*)$/)
  if (!m) return { asn: "", asOrg: value.trim() }
  return { asn: m[1], asOrg: m[2].trim() }
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
        "http://ip-api.com/batch?fields=status,country,countryCode,lat,lon,query,as",
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
        as?: string
      }>
      for (const entry of arr) {
        if (entry.status !== "success" || !entry.query) continue
        if (typeof entry.lat !== "number" || typeof entry.lon !== "number") continue
        // ip-api returns `as` as a single string like "AS16276 OVH SAS".
        // Split into ASN + org so the client can group/display them
        // independently.
        const { asn, asOrg } = parseAsField(entry.as ?? "")
        out.set(entry.query, {
          lat: entry.lat,
          lon: entry.lon,
          country: entry.country ?? "",
          countryCode: entry.countryCode ?? "",
          asn,
          asOrg,
        })
      }
    } catch {
      // Skip this chunk on transient failure.
    }
  }

  return out
}

async function fetchNodes(): Promise<NodesPayload> {
  const enrTexts = await fetchEnrTree()

  // Decode and dedupe by node id (a single node can appear multiple times in
  // the tree if the publisher updates its ENR mid-walk).
  const decoded = new Map<string, { id: string; ip: string }>()
  for (const text of enrTexts) {
    const enr = decodeEnr(text)
    if (!enr || !enr.ip) continue
    if (!decoded.has(enr.id)) {
      decoded.set(enr.id, { id: enr.id, ip: enr.ip })
    }
  }

  const uniqueIps = Array.from(new Set(Array.from(decoded.values()).map((d) => d.ip)))
  const geo = await geolocate(uniqueIps)

  const nodes: Node[] = []
  for (const { id, ip } of decoded.values()) {
    const g = geo.get(ip)
    if (!g) continue
    nodes.push({
      id,
      lat: g.lat,
      lon: g.lon,
      country: g.country,
      countryCode: g.countryCode,
      asn: g.asn,
      asOrg: g.asOrg,
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
