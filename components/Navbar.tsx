"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, TrendingUp, X } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Overview" },
    ...CATEGORIES.map((c) => ({ href: `/category/${c.slug}`, label: c.name })),
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-ink-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-glow">
            <TrendingUp size={18} className="text-white" />
          </span>
          <span className="text-base font-semibold tracking-tight text-white">
            Goldir<span className="text-brand-400">ham</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-white/8 text-white"
                    : "text-white/55 hover:bg-white/5 hover:text-white"
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <Link
            href="/category/ai-utilities"
            className="rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2 text-sm font-medium text-white shadow-glow transition hover:brightness-110"
          >
            Explore picks
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-white/70 hover:bg-white/5 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/8 px-4 py-3 lg:hidden">
          <div className="grid gap-1">
            {links.map((l) => {
              const active =
                l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm",
                    active ? "bg-white/8 text-white" : "text-white/60"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
