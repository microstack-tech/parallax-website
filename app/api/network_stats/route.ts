import { NextResponse } from "next/server"

type CacheEntry<T> = {
  value: T
  expires: number
}

type NetworkStats = {
  total_blocks: string
  total_transactions: string
  total_addresses: string
  average_block_time: number
  transactions_today: string
  price_usd: number | null
  price_change_24h: number | null
  market_cap_usd: number | null
  total_volume_usd: number | null
  circulating_supply: number | null
  max_supply: number | null
}

const BLOCKSCOUT_URL = "https://explorer.parallaxprotocol.org/api/v2/stats"
const COINGECKO_URL = "https://api.coingecko.com/api/v3/coins/parallax-2?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false"
const BROWSER_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
const TTL_MS = 60_000

export const revalidate = 60

let cache: CacheEntry<NetworkStats> | null = null
let inFlight: Promise<NetworkStats> | null = null

function getCache() {
  if (cache && Date.now() < cache.expires) return cache.value
  return null
}

function setCache(value: NetworkStats, ttlMs: number) {
  cache = { value, expires: Date.now() + ttlMs }
}

async function fetchStats(): Promise<NetworkStats> {
  const [blockscoutRes, coingeckoRes] = await Promise.allSettled([
    fetch(BLOCKSCOUT_URL, {
      headers: { Accept: "application/json", "User-Agent": BROWSER_USER_AGENT },
      cache: "no-store",
    }),
    fetch(COINGECKO_URL, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    }),
  ])

  if (blockscoutRes.status === "rejected" || !blockscoutRes.value.ok) {
    throw new Error("Blockscout request failed")
  }

  const blockscout = await blockscoutRes.value.json()

  let priceUsd: number | null = null
  let priceChange24h: number | null = null
  let marketCapUsd: number | null = null

  let totalVolumeUsd: number | null = null
  let circulatingSupply: number | null = null
  let maxSupply: number | null = null

  if (coingeckoRes.status === "fulfilled" && coingeckoRes.value.ok) {
    const coingecko = await coingeckoRes.value.json()
    const md = coingecko.market_data
    if (md) {
      priceUsd = md.current_price?.usd ?? null
      priceChange24h = md.price_change_percentage_24h ?? null
      marketCapUsd = md.market_cap?.usd ?? null
      totalVolumeUsd = md.total_volume?.usd ?? null
      circulatingSupply = md.circulating_supply ?? null
      maxSupply = md.max_supply ?? null
    }
  }

  return {
    total_blocks: blockscout.total_blocks,
    total_transactions: blockscout.total_transactions,
    total_addresses: blockscout.total_addresses,
    average_block_time: blockscout.average_block_time,
    transactions_today: blockscout.transactions_today,
    price_usd: priceUsd,
    price_change_24h: priceChange24h,
    market_cap_usd: marketCapUsd,
    total_volume_usd: totalVolumeUsd,
    circulating_supply: circulatingSupply,
    max_supply: maxSupply,
  }
}

export async function GET() {
  try {
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

    if (!inFlight) {
      inFlight = fetchStats()
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
      { error: "Failed to fetch network stats", details: String(err) },
      { status: 500 }
    )
  }
}
