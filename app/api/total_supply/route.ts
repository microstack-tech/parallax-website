import { NextResponse } from "next/server"

type CacheEntry<T> = {
  value: T
  expires: number
}

type SupplyResponse = {
  result: string
}

const RPC_URL = process.env.PARALLAX_RPC_URL ?? "http://localhost:8545"

export const revalidate = 60

const TTL_MS = 60_000
const DECIMALS = 18

let cache: CacheEntry<SupplyResponse> | null = null
let inFlight: Promise<SupplyResponse> | null = null

function getCache() {
  if (cache && Date.now() < cache.expires) return cache.value
  return null
}

function setCache(value: SupplyResponse, ttlMs: number) {
  cache = { value, expires: Date.now() + ttlMs }
}

function pow10BigInt(exp: number): bigint {
  let result = BigInt(1)
  for (let i = 0; i < exp; i++) {
    result *= BigInt(10)
  }
  return result
}

function formatUnits(raw: bigint, decimals: number): string {
  const divisor = pow10BigInt(decimals)
  const integerPart = raw / divisor
  const fractionalPart = raw % divisor

  const fractionalStr = fractionalPart
    .toString()
    .padStart(decimals, "0")

  return `${integerPart.toString()}.${fractionalStr}`
}

async function fetchTotalSupply(): Promise<SupplyResponse> {
  const payload = {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getTotalSupply",
    params: [],
  }

  const rpcRes = await fetch(RPC_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  })

  if (!rpcRes.ok) {
    throw new Error(`RPC request failed: ${rpcRes.status}`)
  }

  const data = await rpcRes.json()

  if (data?.error) {
    throw new Error(`RPC error: ${JSON.stringify(data.error)}`)
  }

  const hex = data?.result
  if (typeof hex !== "string") {
    throw new Error(`Unexpected RPC format: ${JSON.stringify(data?.result)}`)
  }

  const raw = BigInt(hex)
  const final = formatUnits(raw, DECIMALS)

  return { result: final }
}

export async function GET() {
  try {
    // Cache HIT
    const cached = getCache()
    if (cached) {
      return NextResponse.json(cached, {
        status: 200,
        headers: {
          "Cache-Control": `public, max-age=${Math.floor(TTL_MS / 1000)}`,
          "X-Cache": "HIT",
        },
      })
    }

    // Deduplicate concurrent requests
    if (!inFlight) {
      inFlight = fetchTotalSupply()
        .then((body) => {
          setCache(body, TTL_MS)
          return body
        })
        .finally(() => {
          inFlight = null
        })
    }

    const body = await inFlight

    return NextResponse.json(body, {
      status: 200,
      headers: {
        "Cache-Control": `public, max-age=${Math.floor(TTL_MS / 1000)}`,
        "X-Cache": "MISS",
      },
    })
  } catch (err) {
    return NextResponse.json(
      { error: "Unexpected server error", details: String(err) },
      { status: 500 }
    )
  }
}
