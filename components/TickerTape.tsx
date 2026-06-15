"use client";

import Link from "next/link";
import { TICKER_ORDER } from "@/lib/symbols";
import { cn, formatPct, formatPrice } from "@/lib/utils";
import { useMarket } from "./LiveMarketProvider";

export function TickerTape() {
  const { quotes, ready } = useMarket();

  const items = TICKER_ORDER.map((s) => quotes[s]).filter(Boolean);
  // Duplicate the row so the marquee loops seamlessly.
  const row = ready && items.length ? [...items, ...items] : [];

  return (
    <div className="relative overflow-hidden border-b border-white/8 bg-ink-950/80">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink-950 to-transparent" />

      {row.length ? (
        <div className="flex w-max animate-marquee gap-6 py-2 hover:[animation-play-state:paused]">
          {row.map((q, i) => {
            const up = q.changePct >= 0;
            return (
              <Link
                key={`${q.symbol}-${i}`}
                href={`/asset/${q.symbol}`}
                className="flex shrink-0 items-center gap-2 text-xs"
              >
                <span className="font-mono font-semibold text-white/80">
                  {q.symbol}
                </span>
                <span className="font-mono text-white/55">
                  {formatPrice(q.price)}
                </span>
                <span
                  className={cn(
                    "font-medium tabular-nums",
                    up ? "text-gain" : "text-loss"
                  )}
                >
                  {formatPct(q.changePct)}
                </span>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="py-2 text-center text-xs text-white/30">
          Loading live market data…
        </div>
      )}
    </div>
  );
}
