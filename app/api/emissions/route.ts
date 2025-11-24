import { NextResponse } from "next/server";

const RPC_URL = process.env.PARALLAX_RPC_URL ?? "http://localhost:8545";

export const revalidate = 60;

const DECIMALS = BigInt(18);

export async function GET() {
  try {
    const payload = {
      jsonrpc: "2.0",
      id: 1,
      method: "eth_getCirculatingSupply",
      params: []
    };

    const rpcRes = await fetch(RPC_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!rpcRes.ok) {
      return NextResponse.json(
        { error: "RPC request failed", status: rpcRes.status },
        { status: 502 }
      );
    }

    const data = await rpcRes.json();

    if (data.error) {
      return NextResponse.json(
        { error: "RPC error", details: data.error },
        { status: 500 }
      );
    }

    const hex = data.result;
    if (typeof hex !== "string") {
      return NextResponse.json(
        { error: "Unexpected RPC format", result: data.result },
        { status: 500 }
      );
    }

    let raw: bigint;
    try {
      raw = BigInt(hex);
    } catch (e) {
      return NextResponse.json(
        { error: "Failed to parse result", hex, details: String(e) },
        { status: 500 }
      );
    }

    let divisor = BigInt(1);
    for (let i = BigInt(0); i < DECIMALS; i++) {
      divisor *= BigInt(10);
    }

    const integerPart = raw / divisor;
    const fractionalPart = raw % divisor;

    const fractionalStr = fractionalPart
      .toString()
      .padStart(Number(DECIMALS), "0");

    const final = `${integerPart.toString()}.${fractionalStr}`;

    return NextResponse.json(
      { result: final },
      { status: 200, headers: { "Cache-Control": "public, max-age=60" } }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Unexpected server error", details: String(err) },
      { status: 500 }
    );
  }
}
