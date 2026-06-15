import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LiveMarketProvider } from "@/components/LiveMarketProvider";
import { Navbar } from "@/components/Navbar";
import { TickerTape } from "@/components/TickerTape";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Goldirham — AI-era investment research, live",
    template: "%s · Goldirham",
  },
  description:
    "Deep-dive research, 3-factor scores, real-time charts and live prices across AI utilities, mega stocks, semiconductors, ETFs and crypto.",
  keywords: [
    "investing",
    "AI stocks",
    "AI utilities",
    "ETF",
    "crypto",
    "research",
    "live charts",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen font-sans">
        <LiveMarketProvider>
          <Navbar />
          <TickerTape />
          <main>{children}</main>
          <Footer />
        </LiveMarketProvider>
      </body>
    </html>
  );
}
