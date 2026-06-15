"use client";

import { useEffect, useRef, useState } from "react";
import {
  createChart,
  ColorType,
  type IChartApi,
  type ISeriesApi,
  type UTCTimestamp,
} from "lightweight-charts";
import type { ChartRange, ChartResponse, LinePoint } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useQuote } from "./LiveMarketProvider";

const RANGES: ChartRange[] = ["1D", "1W", "1M", "3M", "1Y"];

function rgba(hex: string, a: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function dedupe(points: LinePoint[]): LinePoint[] {
  const out: LinePoint[] = [];
  let last = -Infinity;
  for (const p of points) {
    if (p.time > last) {
      out.push(p);
      last = p.time;
    }
  }
  return out;
}

export function LiveChart({
  symbol,
  accent = "#598bff",
}: {
  symbol: string;
  accent?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const [range, setRange] = useState<ChartRange>("3M");
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<string>("");
  const quote = useQuote(symbol);

  // Create the chart once.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chart = createChart(el, {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "rgba(255,255,255,0.45)",
        fontFamily: "var(--font-sans), system-ui, sans-serif",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.035)" },
        horzLines: { color: "rgba(255,255,255,0.045)" },
      },
      rightPriceScale: { borderColor: "rgba(255,255,255,0.06)" },
      timeScale: {
        borderColor: "rgba(255,255,255,0.06)",
        secondsVisible: false,
      },
      crosshair: {
        mode: 1,
        vertLine: { color: "rgba(255,255,255,0.25)", labelBackgroundColor: "#1a2440" },
        horzLine: { color: "rgba(255,255,255,0.25)", labelBackgroundColor: "#1a2440" },
      },
      handleScale: { mouseWheel: false },
    });

    const series = chart.addAreaSeries({
      lineColor: accent,
      topColor: rgba(accent, 0.32),
      bottomColor: rgba(accent, 0.01),
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: true,
      crosshairMarkerBorderColor: accent,
      crosshairMarkerBackgroundColor: accent,
    });

    chartRef.current = chart;
    seriesRef.current = series;

    return () => {
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, [accent]);

  // Load / reload data when symbol or range changes.
  useEffect(() => {
    let active = true;
    setLoading(true);

    fetch(`/api/chart?symbol=${symbol}&range=${range}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d: ChartResponse) => {
        if (!active || !seriesRef.current || !chartRef.current) return;
        const pts = dedupe(d.points).map((p) => ({
          time: p.time as UTCTimestamp,
          value: p.value,
        }));
        seriesRef.current.setData(pts);
        chartRef.current.timeScale().fitContent();
        chartRef.current.applyOptions({
          timeScale: { timeVisible: range === "1D" || range === "1W" },
        });
        lastTimeRef.current = pts.length ? pts[pts.length - 1].time : null;
        setSource(d.source);
        setLoading(false);
      })
      .catch(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [symbol, range]);

  // Make the right edge breathe with the live quote.
  useEffect(() => {
    if (!quote || !seriesRef.current || lastTimeRef.current == null) return;
    seriesRef.current.update({
      time: lastTimeRef.current as UTCTimestamp,
      value: quote.price,
    });
  }, [quote]);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-white/45">
          <span
            className={cn(
              "inline-block h-1.5 w-1.5 rounded-full",
              source === "coingecko"
                ? "animate-pulse-dot bg-gain"
                : source === "finnhub"
                  ? "animate-pulse-dot bg-gain"
                  : "animate-pulse-dot bg-brand-400"
            )}
          />
          {source === "coingecko"
            ? "Live · CoinGecko"
            : source === "finnhub"
              ? "Live · Finnhub"
              : "Live simulated feed"}
        </div>

        <div className="inline-flex rounded-lg border border-white/10 bg-ink-900/60 p-0.5">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                range === r
                  ? "bg-white/10 text-white"
                  : "text-white/45 hover:text-white/80"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <div ref={containerRef} className="h-[340px] w-full sm:h-[380px]" />
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink-900/40 backdrop-blur-[1px]">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/15 border-t-white/60" />
          </div>
        )}
      </div>
    </div>
  );
}
