import { NextResponse } from "next/server"

type CacheEntry<T> = {
  value: T
  expires: number
}

const RPC_URL = process.env.PARALLAX_RPC_URL ?? "http://localhost:8545"

export const revalidate = 60

const TTL_MS = 60_000
const DECIMALS = 18

let cache: CacheEntry<string> | null = null
let inFlight: Promise<string> | null = null

function getCache() {
  if (cache && Date.now() < cache.expires) return cache.value
  return null
}

function setCache(value: string, ttlMs: number) {
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
  const fractionalStr = fractionalPart.toString().padStart(decimals, "0")
  return `${integerPart.toString()}.${fractionalStr}`
}

async function fetchTotalSupplyText(): Promise<string> {
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

  let raw: bigint
  try {
    raw = BigInt(hex)
  } catch (e) {
    throw new Error(`Failed to parse result: hex=${hex} err=${String(e)}`)
  }

  return formatUnits(raw, DECIMALS)
}

export async function GET() {
  try {
    // 1) Memory cache HIT
    const cached = getCache()
    if (cached) {
      return new NextResponse(cached, {
        status: 200,
        headers: {
          "Content-Type": "text/plain",
          "Cache-Control": `public, max-age=${Math.floor(TTL_MS / 1000)}`,
          "X-Cache": "HIT",
        },
      })
    }

    // 2) Dedupe concurrent requests
    if (!inFlight) {
      inFlight = fetchTotalSupplyText()
        .then((text) => {
          setCache(text, TTL_MS)
          return text
        })
        .finally(() => {
          inFlight = null
        })
    }

    const text = await inFlight

    return new NextResponse(text, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
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
