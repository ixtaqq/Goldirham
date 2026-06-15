import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-brand-400">
        <Compass size={30} />
      </span>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-white">
        Off the chart
      </h1>
      <p className="mt-2 text-white/55">
        We couldn&apos;t find that asset or page. It may have been delisted, or the
        ticker is misspelled.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-3 text-sm font-medium text-white shadow-glow transition hover:brightness-110"
      >
        Back to the research desk
      </Link>
    </div>
  );
}
