import type { Category } from "./types";

export const CATEGORIES: Category[] = [
  {
    slug: "ai-utilities",
    name: "AI Utilities",
    short: "Power the buildout",
    blurb:
      "The picks-and-shovels of the AI era. Nuclear, gas and renewable operators signing long-term power deals with hyperscalers. AI is an electricity story before it is a software story.",
    icon: "Zap",
    accent: "#22d39a",
  },
  {
    slug: "ai-companies",
    name: "AI Companies",
    short: "Compute & intelligence",
    blurb:
      "The chips, foundries and software platforms building the intelligence layer — from GPUs and HBM memory to the data-analytics names monetising enterprise AI.",
    icon: "Cpu",
    accent: "#598bff",
  },
  {
    slug: "mega-stocks",
    name: "Mega Stocks",
    short: "Trillion-dollar compounders",
    blurb:
      "The mega-cap platforms with the balance sheets, distribution and cash flow to turn AI into durable earnings growth. Core holdings for the next decade.",
    icon: "Building2",
    accent: "#f5b945",
  },
  {
    slug: "etf",
    name: "AI & Growth ETFs",
    short: "One-ticket exposure",
    blurb:
      "Diversified baskets for investors who want the theme without single-stock risk — semiconductors, the Nasdaq-100, clean energy and disruptive innovation.",
    icon: "Layers",
    accent: "#a78bfa",
  },
  {
    slug: "crypto",
    name: "Crypto",
    short: "Digital assets",
    blurb:
      "Bitcoin as digital gold, Ethereum as settlement infrastructure, and the decentralised-compute tokens riding the same demand for GPUs and bandwidth as the equities.",
    icon: "Bitcoin",
    accent: "#f7931a",
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
