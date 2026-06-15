"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn, formatCompact, formatPct, formatPrice } from "@/lib/utils";
import { useQuote } from "./LiveMarketProvider";

export function LivePrice({
  symbol,
  basePrice,
}: {
  symbol: string;
  basePrice: number;
}) {
  const quote = useQuote(symbol);
  const [flash, setFlash] = useState<"up" | "down" | null>(null);
  const prevPrice = useRef<number | null>(null);

  const price = quote?.price ?? basePrice;
  const changePct = quote?.changePct ?? 0;
  const change = quote?.change ?? 0;
  const up = changePct >= 0;

  useEffect(() => {
    if (quote == null) return;
    const prev = prevPrice.current;
    if (prev != null && prev !== quote.price) {
      setFlash(quote.price > prev ? "up" : "down");
      const t = setTimeout(() => setFlash(null), 600);
      prevPrice.current = quote.price;
      return () => clearTimeout(t);
    }
    prevPrice.current = quote.price;
  }, [quote]);

  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span
          className={cn(
            "font-mono text-4xl font-bold tracking-tight transition-colors duration-300 sm:text-5xl",
            flash === "up"
              ? "text-gain"
              : flash === "down"
                ? "text-loss"
                : "text-white"
          )}
        >
          {formatPrice(price)}
        </span>
        <span
          className={cn(
            "flex items-center gap-1 rounded-lg px-2.5 py-1 text-sm font-semibold tabular-nums",
            up ? "bg-gain/12 text-gain" : "bg-loss/12 text-loss"
          )}
        >
          {up ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {formatPrice(Math.abs(change))} ({formatPct(changePct)})
        </span>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/45">
        <span className="flex items-center gap-1.5">
          <span
            className={cn(
              "inline-block h-1.5 w-1.5 rounded-full",
              quote ? "animate-pulse-dot bg-gain" : "bg-white/30"
            )}
          />
          {quote ? "Live" : "Connecting…"}
          {quote?.source ? ` · ${sourceLabel(quote.source)}` : ""}
        </span>
        {quote?.marketCap ? (
          <span>
            Mkt cap{" "}
            <span className="text-white/70">${formatCompact(quote.marketCap)}</span>
          </span>
        ) : null}
        <span>24h change</span>
      </div>
    </div>
  );
}

function sourceLabel(s: string): string {
  if (s === "coingecko") return "CoinGecko";
  if (s === "finnhub") return "Finnhub";
  return "Simulated";
}
