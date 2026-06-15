import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAssetsByCategory } from "@/lib/assets";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { toCardData } from "@/lib/card";
import type { CategorySlug } from "@/lib/types";
import { AssetCard } from "@/components/AssetCard";
import { CategoryIcon } from "@/components/CategoryIcon";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const cat = getCategory(params.slug);
  if (!cat) return { title: "Not found" };
  return { title: cat.name, description: cat.blurb };
}

const TIER_BLURB: Record<number, string> = {
  1: "Core holdings — the best blend of safety and structural growth.",
  2: "Higher upside, moderate safety — more reward, more to watch.",
  3: "High upside, high volatility — small, high-conviction positions only.",
};

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = getCategory(params.slug);
  if (!cat) notFound();

  const assets = getAssetsByCategory(params.slug as CategorySlug);
  const cards = assets.map(toCardData);

  const tiers = Array.from(
    new Set(cards.map((c) => c.tier).filter((t): t is 1 | 2 | 3 => Boolean(t)))
  ).sort();
  const untiered = cards.filter((c) => !c.tier);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      {/* header */}
      <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-ink-850/50 p-8 sm:p-10">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-20 blur-3xl"
          style={{ background: cat.accent }}
        />
        <div className="relative">
          <span
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10"
            style={{ background: `${cat.accent}1a`, color: cat.accent }}
          >
            <CategoryIcon name={cat.icon} size={26} />
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {cat.name}
          </h1>
          <p className="mt-1 text-base font-medium" style={{ color: cat.accent }}>
            {cat.short}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
            {cat.blurb}
          </p>
          <p className="mt-4 text-sm text-white/40">
            {cards.length} researched {cards.length === 1 ? "asset" : "assets"}
          </p>
        </div>
      </div>

      {/* tiered sections */}
      {tiers.map((tier) => {
        const inTier = cards.filter((c) => c.tier === tier);
        return (
          <section key={tier} className="mt-12">
            <div className="mb-5 flex items-center gap-3">
              <span
                className="flex h-7 items-center rounded-lg px-2.5 text-xs font-bold"
                style={{ background: `${cat.accent}1a`, color: cat.accent }}
              >
                TIER {tier}
              </span>
              <p className="text-sm text-white/55">{TIER_BLURB[tier]}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {inTier.map((c) => (
                <AssetCard key={c.symbol} data={c} />
              ))}
            </div>
          </section>
        );
      })}

      {untiered.length > 0 && (
        <section className="mt-12">
          {tiers.length > 0 && (
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white/50">
              More in {cat.name}
            </h2>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {untiered.map((c) => (
              <AssetCard key={c.symbol} data={c} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
