"use client";

import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Activity } from "lucide-react";
import { TICKER_ORDER } from "@/lib/symbols";
import { cn, formatPct, formatPrice } from "@/lib/utils";
import { useMarket } from "./LiveMarketProvider";

export function MarketPulse() {
  const { quotes, ready } = useMarket();

  const movers = TICKER_ORDER.map((s) => quotes[s])
    .filter(Boolean)
    .sort((a, b) => Math.abs(b.changePct) - Math.abs(a.changePct))
    .slice(0, 4);

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Activity size={16} className="text-brand-400" />
        <h2 className="text-sm font-semibold uppercase tracking-wider text-white/60">
          Live market pulse
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {(ready && movers.length ? movers : Array(4).fill(null)).map((q, i) => {
          if (!q) {
            return (
              <div
                key={i}
                className="h-24 animate-pulse rounded-2xl border border-white/8 bg-ink-850/50"
              />
            );
          }
          const up = q.changePct >= 0;
          return (
            <Link
              key={q.symbol}
              href={`/asset/${q.symbol}`}
              className="group relative overflow-hidden rounded-2xl border border-white/8 bg-ink-850/60 p-4 transition hover:border-white/15 hover:bg-ink-800/70"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-semibold text-white/85">
                  {q.symbol}
                </span>
                <span
                  className={cn(
                    "flex items-center gap-0.5 text-xs font-semibold",
                    up ? "text-gain" : "text-loss"
                  )}
                >
                  {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                  {formatPct(q.changePct)}
                </span>
              </div>
              <div className="mt-2 font-mono text-lg font-semibold text-white">
                {formatPrice(q.price)}
              </div>
              <div
                className={cn(
                  "mt-2 h-1 rounded-full",
                  up ? "bg-gain/30" : "bg-loss/30"
                )}
              >
                <div
                  className={cn("h-full rounded-full", up ? "bg-gain" : "bg-loss")}
                  style={{ width: `${Math.min(100, Math.abs(q.changePct) * 12 + 8)}%` }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
