import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { CategoryIcon } from "./CategoryIcon";

export function CategoryGrid({ counts }: { counts: Record<string, number> }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {CATEGORIES.map((c) => (
        <Link
          key={c.slug}
          href={`/category/${c.slug}`}
          className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-ink-850/50 p-6 transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-ink-800/70"
        >
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-15 blur-2xl transition-opacity group-hover:opacity-30"
            style={{ background: c.accent }}
          />
          <div className="mb-4 flex items-center justify-between">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10"
              style={{ background: `${c.accent}1a`, color: c.accent }}
            >
              <CategoryIcon name={c.icon} />
            </span>
            <ArrowUpRight
              size={18}
              className="text-white/30 transition group-hover:text-white"
            />
          </div>

          <div className="flex items-baseline gap-2">
            <h3 className="text-lg font-semibold text-white">{c.name}</h3>
            <span className="text-xs text-white/40">{counts[c.slug] ?? 0} assets</span>
          </div>
          <p className="mt-0.5 text-sm font-medium" style={{ color: c.accent }}>
            {c.short}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/55">{c.blurb}</p>
        </Link>
      ))}
    </div>
  );
}
