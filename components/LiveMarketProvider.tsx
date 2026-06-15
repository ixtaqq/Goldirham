"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Quote } from "@/lib/types";

type QuoteMap = Record<string, Quote>;

interface MarketState {
  quotes: QuoteMap;
  ready: boolean;
  /** last tick direction per symbol, for flash animations */
  dir: Record<string, "up" | "down" | "flat">;
}

const MarketContext = createContext<MarketState>({
  quotes: {},
  ready: false,
  dir: {},
});

const POLL_MS = 6000;

export function LiveMarketProvider({ children }: { children: ReactNode }) {
  const [quotes, setQuotes] = useState<QuoteMap>({});
  const [dir, setDir] = useState<Record<string, "up" | "down" | "flat">>({});
  const [ready, setReady] = useState(false);
  const prev = useRef<QuoteMap>({});

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const res = await fetch("/api/quotes", { cache: "no-store" });
        if (!res.ok) return;
        const json = (await res.json()) as { quotes: Quote[] };
        if (!active) return;

        const map: QuoteMap = {};
        const nextDir: Record<string, "up" | "down" | "flat"> = {};
        for (const q of json.quotes) {
          map[q.symbol] = q;
          const before = prev.current[q.symbol]?.price;
          nextDir[q.symbol] =
            before === undefined || before === q.price
              ? "flat"
              : q.price > before
                ? "up"
                : "down";
        }
        prev.current = map;
        setQuotes(map);
        setDir(nextDir);
        setReady(true);
      } catch {
        /* keep last good data */
      }
    };

    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  return (
    <MarketContext.Provider value={{ quotes, ready, dir }}>
      {children}
    </MarketContext.Provider>
  );
}

export function useQuote(symbol: string): Quote | undefined {
  return useContext(MarketContext).quotes[symbol];
}

export function useMarket(): MarketState {
  return useContext(MarketContext);
}
