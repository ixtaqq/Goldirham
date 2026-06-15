import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/8 bg-ink-950/60">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700">
                <TrendingUp size={16} className="text-white" />
              </span>
              <span className="font-semibold text-white">
                Goldir<span className="text-brand-400">ham</span>
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/50">
              An AI-era investment research platform. Live prices, real-time charts
              and deep-dive theses across AI utilities, mega stocks, semiconductors,
              ETFs and crypto.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40">
                Categories
              </h4>
              <ul className="mt-3 space-y-2">
                {CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/category/${c.slug}`}
                      className="text-sm text-white/60 transition hover:text-white"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40">
                Data
              </h4>
              <ul className="mt-3 space-y-2 text-sm text-white/60">
                <li>Crypto · CoinGecko</li>
                <li>Stocks · Finnhub / simulated</li>
                <li>Charts · TradingView Lightweight</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/8 pt-6">
          <p className="text-xs leading-relaxed text-white/40">
            <strong className="text-white/60">Disclaimer:</strong> Goldirham is an
            educational research and demonstration project. Nothing here is financial
            advice, a recommendation, or an offer to buy or sell any security or digital
            asset. Scores and theses are editorial opinions for illustration. Prices may
            be simulated where live feeds are unavailable. Always do your own research
            and consult a licensed advisor before investing. © {new Date().getFullYear()}{" "}
            Goldirham.
          </p>
        </div>
      </div>
    </footer>
  );
}
