import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero({
  assetCount,
  categoryCount,
}: {
  assetCount: number;
  categoryCount: number;
}) {
  return (
    <section className="relative overflow-hidden">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 bg-grid-fade" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-gain/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 sm:pt-24">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <Sparkles size={13} className="text-brand-400" />
            AI Utility Portfolio · 2026–2030 research desk
          </span>
        </div>

        <h1 className="mt-6 max-w-3xl animate-fade-up text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
          The companies{" "}
          <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-gain bg-clip-text text-transparent">
            powering the AI era
          </span>
          — researched, scored & live.
        </h1>

        <p className="mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-white/60">
          Deep-dive theses on AI utilities, mega-cap compounders, semiconductors,
          thematic ETFs and crypto — each with an upside / safety / AI-exposure
          score, real-time charts and live prices.
        </p>

        <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-3">
          <Link
            href="/category/ai-utilities"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-3 text-sm font-medium text-white shadow-glow transition hover:brightness-110"
          >
            Explore the AI utility picks
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/asset/NVDA"
            className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10"
          >
            See a live thesis →
          </Link>
        </div>

        <dl className="mt-12 flex animate-fade-up flex-wrap gap-x-10 gap-y-4">
          {[
            { label: "Researched assets", value: `${assetCount}` },
            { label: "Asset categories", value: `${categoryCount}` },
            { label: "Live data", value: "Real-time" },
            { label: "Scoring model", value: "3-factor" },
          ].map((s) => (
            <div key={s.label}>
              <dt className="text-xs uppercase tracking-wider text-white/40">
                {s.label}
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-white">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
