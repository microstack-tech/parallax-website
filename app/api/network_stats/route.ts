import { NextResponse } from "next/server"

type CacheEntry<T> = {
  value: T
  expires: number
}

type MarketStats = {
  price_usd: number | null
  price_change_24h: number | null
  market_cap_usd: number | null
  total_volume_usd: number | null
  circulating_supply: number | null
  max_supply: number | null
}

const COINGECKO_URL = "https://api.coingecko.com/api/v3/coins/parallax-2?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false"
const TTL_MS = 60_000

export const revalidate = 60

let cache: CacheEntry<MarketStats> | null = null
let inFlight: Promise<MarketStats> | null = null

function getCache() {
  if (cache && Date.now() < cache.expires) return cache.value
  return null
}

function setCache(value: MarketStats, ttlMs: number) {
  cache = { value, expires: Date.now() + ttlMs }
}

async function fetchMarket(): Promise<MarketStats> {
  const res = await fetch(COINGECKO_URL, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  })

  if (!res.ok) {
    return {
      price_usd: null,
      price_change_24h: null,
      market_cap_usd: null,
      total_volume_usd: null,
      circulating_supply: null,
      max_supply: null,
    }
  }

  const coingecko = await res.json()
  const md = coingecko.market_data

  return {
    price_usd: md?.current_price?.usd ?? null,
    price_change_24h: md?.price_change_percentage_24h ?? null,
    market_cap_usd: md?.market_cap?.usd ?? null,
    total_volume_usd: md?.total_volume?.usd ?? null,
    circulating_supply: md?.circulating_supply ?? null,
    max_supply: md?.max_supply ?? null,
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
      inFlight = fetchMarket()
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
      { error: "Failed to fetch market stats", details: String(err) },
      { status: 500 }
    )
  }
}
