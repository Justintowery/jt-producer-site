import type { Metadata } from "next";
import { credits as creditsData } from "@/data/credits";

export const metadata: Metadata = {
  title: "Credits — Justin Towery",
  description:
    "Commercial credits — Justin Towery. Calm execution across complex productions.",
};

type CreditRow = {
  client?: string;
  director?: string;
  company?: string;
  location?: string;
};

export default function CreditsPage() {
  const rows = (Array.isArray(creditsData) ? creditsData : []) as CreditRow[];

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-28">
        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-zinc-300/70">
              Credits
            </p>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Selected credits
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300/80">
              A running list of commercial work—client, director, production
              partner, and where we made it.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 h-px w-full bg-white/10" />

        {/* “Film credits” table */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
          {/* Column heads */}
          <div className="grid grid-cols-12 gap-6 px-6 py-4 text-[11px] uppercase tracking-[0.38em] text-zinc-300/55">
            <div className="col-span-12 sm:col-span-3">Client</div>
            <div className="col-span-12 sm:col-span-3">Director</div>
            <div className="col-span-12 sm:col-span-4">Company</div>
            <div className="col-span-12 sm:col-span-2 sm:text-right">
              Location
            </div>
          </div>

          <div className="h-px w-full bg-white/10" />

          {/* Rows */}
          <div className="[mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]">
            {rows.map((r, i) => (
              <div
                key={`${r.client ?? "credit"}-${i}`}
                className="grid grid-cols-12 gap-6 px-6 py-7"
              >
                <div className="col-span-12 sm:col-span-3 text-base font-medium text-white/90">
                  {r.client ?? "—"}
                </div>

                <div className="col-span-12 sm:col-span-3 text-base text-zinc-200/80">
                  {r.director ?? "—"}
                </div>

                <div className="col-span-12 sm:col-span-4 text-base text-zinc-200/80">
                  {r.company ?? "—"}
                </div>

                <div className="col-span-12 sm:col-span-2 text-base text-zinc-200/70 sm:text-right">
                  {r.location ?? "—"}
                </div>

                {/* Row divider */}
                {i !== rows.length - 1 && (
                  <div className="col-span-12 mt-7 h-px w-full bg-white/10" />
                )}
              </div>
            ))}

            {rows.length === 0 && (
              <div className="px-6 py-10 text-sm text-zinc-300/70">
                No credits found in <code className="text-zinc-200/90">src/data/credits.ts</code>.
              </div>
            )}
          </div>
        </div>

        {/* Footer vibe line */}
        <p className="mt-10 text-xs uppercase tracking-[0.4em] text-zinc-300/50">
          Calm execution. Clean delivery.
        </p>
      </section>
    </main>
  );
}