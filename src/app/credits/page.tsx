import type { Metadata } from "next";
import { credits } from "@/data/credits";

export const metadata: Metadata = {
  title: "Credits — Justin Towery",
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
      <section className="w-full px-12 pb-24 pt-32">
        {/* Page Label */}
        <p className="text-xs uppercase tracking-[0.45em] text-white/60">
          Credits
        </p>

        {/* Divider */}
        <div className="mt-12 h-px w-full bg-white/15" />

        {/* Table */}
        <div className="mt-12">
          {/* Column headers */}
          <div className="grid grid-cols-12 gap-8 pb-6 text-[11px] uppercase tracking-[0.38em] text-white/50">
            <div className="col-span-4 pl-2">Client</div>
            <div className="col-span-3">Director</div>
            <div className="col-span-3">Company</div>
            <div className="col-span-2 text-right pr-2">Location</div>
          </div>

          <div className="h-px w-full bg-white/15" />

          {/* Rows */}
          <div>
            {rows.map((r, i) => (
              <div key={`${r.client ?? "credit"}-${i}`}>
                <div className="grid grid-cols-12 gap-8 py-10">
                  <div className="col-span-4 pl-2 text-xl font-medium tracking-wide text-white">
                    {r.client ?? "—"}
                  </div>

                  <div className="col-span-3 self-center text-base text-white/80">
                    {r.director ?? "—"}
                  </div>

                  <div className="col-span-3 self-center text-base text-white/80">
                    {r.company ?? "—"}
                  </div>

                  <div className="col-span-2 self-center text-right pr-2 text-base text-white/70">
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
      </section>
    </main>
  );
}