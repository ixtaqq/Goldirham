"use client";

import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { CardData } from "@/lib/card";
import { cn, formatPct, formatPrice } from "@/lib/utils";
import { useQuote } from "./LiveMarketProvider";
import { Sparkline } from "./Sparkline";

const CLASS_LABEL: Record<string, string> = {
  stock: "Stock",
  etf: "ETF",
  crypto: "Crypto",
};

export function AssetCard({ data }: { data: CardData }) {
  const quote = useQuote(data.symbol);
  const up = quote ? quote.changePct >= 0 : true;
  const spark = data.spark;
  const sparkUp = spark[spark.length - 1] >= spark[0];

  return (
    <Link
      href={`/asset/${data.symbol}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-ink-850/60 p-4 transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-ink-800/70 hover:shadow-glow"
    >
      {/* accent glow */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
        style={{ background: data.accent }}
      />

      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ background: data.accent }}
            />
            <span className="font-mono text-sm font-semibold tracking-wide text-white">
              {data.symbol}
            </span>
            <span className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-white/45">
              {CLASS_LABEL[data.assetClass]}
            </span>
          </div>
          <p className="mt-1 truncate text-sm text-white/60">{data.name}</p>
        </div>

        <div className="text-right">
          {quote ? (
            <>
              <div className="font-mono text-sm font-semibold text-white">
                {formatPrice(quote.price)}
              </div>
              <div
                className={cn(
                  "flex items-center justify-end gap-0.5 text-xs font-medium tabular-nums",
                  up ? "text-gain" : "text-loss"
                )}
              >
                {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                {formatPct(quote.changePct)}
              </div>
            </>
          ) : (
            <div className="space-y-1">
              <div className="ml-auto h-4 w-16 animate-pulse rounded bg-white/10" />
              <div className="ml-auto h-3 w-10 animate-pulse rounded bg-white/8" />
            </div>
          )}
        </div>
      </div>

      <p className="mb-3 line-clamp-2 text-[13px] leading-snug text-white/45">
        {data.tagline}
      </p>

      <div className="mb-3 -mx-1">
        <Sparkline data={spark} up={sparkUp} width={280} height={48} className="w-full" />
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-white/8 pt-3 text-[11px]">
        <span className="text-white/40">
          {data.tier ? `Tier ${data.tier}` : "Research"}
        </span>
        <span className="font-medium text-white/55 transition-colors group-hover:text-white">
          Read thesis →
        </span>
      </div>
    </Link>
  );
}
