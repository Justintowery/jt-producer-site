import type { Metadata } from "next";
import { credits } from "@/data/credits";

export const metadata: Metadata = {
  title: "Credits — Justin Towery",
  description: "Selected commercial credits — Justin Towery.",
};

type CreditRow = {
  client?: string;
  director?: string;
  company?: string;
  location?: string;
};

export default function CreditsPage() {
  const rows = (Array.isArray(credits) ? credits : []) as CreditRow[];

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-28">
        {/* Header */}
        <div>
          <p className="text-xs uppercase tracking-[0.45em] text-white/60">
            Credits
          </p>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Selected Work
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70">
            Commercial production credits — client, director, production partner, and location.
          </p>
        </div>

        {/* Divider */}
        <div className="mt-14 h-px w-full bg-white/15" />

        {/* Table */}
        <div className="mt-10">
          {/* Column headers */}
          <div className="grid grid-cols-12 gap-6 pb-6 text-[11px] uppercase tracking-[0.38em] text-white/50">
            <div className="col-span-4">Client</div>
            <div className="col-span-3">Director</div>
            <div className="col-span-3">Company</div>
            <div className="col-span-2 text-right">Location</div>
          </div>

          <div className="h-px w-full bg-white/15" />

          {/* Rows */}
          <div>
            {rows.map((r, i) => (
              <div key={`${r.client ?? "credit"}-${i}`}>
                <div className="grid grid-cols-12 gap-6 py-8">
                  <div className="col-span-4 text-lg font-medium text-white">
                    {r.client ?? "—"}
                  </div>

                  <div className="col-span-3 self-center text-base text-white/80">
                    {r.director ?? "—"}
                  </div>

                  <div className="col-span-3 self-center text-base text-white/80">
                    {r.company ?? "—"}
                  </div>

                  <div className="col-span-2 self-center text-right text-base text-white/70">
                    {r.location ?? "—"}
                  </div>
                </div>

                {i !== rows.length - 1 && (
                  <div className="h-px w-full bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer tone line */}
        <p className="mt-16 text-xs uppercase tracking-[0.4em] text-white/50">
          Calm execution. Clean delivery.
        </p>
      </section>
    </main>
  );
}