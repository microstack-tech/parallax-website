import { NextResponse } from "next/server"
import { getNodes, NODES_TTL_MS, peekCacheStatus } from "@/lib/nodes"

export const revalidate = 300

export async function GET() {
  const cacheStatus = peekCacheStatus()
  try {
    const body = await getNodes()
    return NextResponse.json(body, {
      status: 200,
      headers: {
        "Cache-Control": `public, max-age=${Math.floor(NODES_TTL_MS / 1000)}`,
        "X-Cache": cacheStatus,
      },
    })
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch nodes", details: String(err) },
      { status: 500 },
    )
  }
}
