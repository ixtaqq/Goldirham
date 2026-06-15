import Link from "next/link";
import { ArrowRight, Gauge, LineChart, ShieldCheck } from "lucide-react";
import { ASSETS, getAsset, getAssetsByCategory } from "@/lib/assets";
import { CATEGORIES } from "@/lib/categories";
import { toCardData } from "@/lib/card";
import { Hero } from "@/components/Hero";
import { MarketPulse } from "@/components/MarketPulse";
import { CategoryGrid } from "@/components/CategoryGrid";
import { AssetCard } from "@/components/AssetCard";

const FEATURED = ["CEG", "NVDA", "MSFT", "BTC", "GOOGL", "VST", "AVGO", "SOL"];

export default function HomePage() {
  const counts: Record<string, number> = {};
  for (const c of CATEGORIES) counts[c.slug] = getAssetsByCategory(c.slug).length;

  const featured = FEATURED.map((s) => getAsset(s))
    .filter(Boolean)
    .map((a) => toCardData(a!));

  return (
    <>
      <Hero assetCount={ASSETS.length} categoryCount={CATEGORIES.length} />

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <MarketPulse />
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Explore by category
            </h2>
            <p className="mt-1 text-sm text-white/55">
              Five lenses on the same megatrend — from the power grid to the chips to
              the tokens.
            </p>
          </div>
        </div>
        <CategoryGrid counts={counts} />
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Editor&apos;s picks
            </h2>
            <p className="mt-1 text-sm text-white/55">
              High-conviction theses across the board. Tap any card for the full
              breakdown.
            </p>
          </div>
          <Link
            href="/category/ai-utilities"
            className="hidden items-center gap-1 text-sm font-medium text-brand-400 hover:text-brand-300 sm:flex"
          >
            View all <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((c) => (
            <AssetCard key={c.symbol} data={c} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <div className="ring-glow overflow-hidden rounded-3xl border border-white/8 bg-ink-850/40 p-8 sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            A consistent way to compare very different assets
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/55">
            Every asset — whether a regulated utility or a volatile token — is scored
            on the same three factors, so you can weigh opportunities like-for-like.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {[
              {
                icon: Gauge,
                title: "Upside",
                accent: "#22d39a",
                body: "Return potential if the thesis plays out — the size of the prize.",
              },
              {
                icon: ShieldCheck,
                title: "Safety",
                accent: "#f5b945",
                body: "Resilience to drawdowns: balance sheet, business model and volatility.",
              },
              {
                icon: LineChart,
                title: "AI exposure",
                accent: "#598bff",
                body: "How structurally tied the asset is to the AI build-out.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/8 bg-ink-900/40 p-5"
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${f.accent}1a`, color: f.accent }}
                >
                  <f.icon size={18} />
                </span>
                <h3 className="mt-3 font-semibold text-white">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/55">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
