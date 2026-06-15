import { NextRequest, NextResponse } from "next/server";
import { getAsset } from "@/lib/assets";
import { simulateSeries } from "@/lib/market";
import { fetchCryptoChart } from "@/lib/sources";
import type { ChartRange, ChartResponse } from "@/lib/types";

export const dynamic = "force-dynamic";

const VALID: ChartRange[] = ["1D", "1W", "1M", "3M", "1Y"];

export async function GET(req: NextRequest) {
  const symbol = (req.nextUrl.searchParams.get("symbol") || "").toUpperCase();
  const rangeParam = (req.nextUrl.searchParams.get("range") || "3M") as ChartRange;
  const range = VALID.includes(rangeParam) ? rangeParam : "3M";

  const asset = getAsset(symbol);
  if (!asset) {
    return NextResponse.json({ error: "Unknown symbol" }, { status: 404 });
  }

  // Real crypto history from CoinGecko, with simulation fallback.
  if (asset.coingeckoId) {
    const points = await fetchCryptoChart(asset.coingeckoId, range);
    if (points && points.length > 1) {
      const body: ChartResponse = {
        symbol,
        range,
        source: "coingecko",
        points,
      };
      return NextResponse.json(body, { headers: { "Cache-Control": "no-store" } });
    }
  }

  const body: ChartResponse = {
    symbol,
    range,
    source: "simulated",
    points: simulateSeries(symbol, asset.basePrice, asset.vol, range),
  };
  return NextResponse.json(body, { headers: { "Cache-Control": "no-store" } });
}
