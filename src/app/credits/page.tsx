import type { Metadata } from "next";
import Link from "next/link";
import { credits } from "@/data/credits";

export const metadata: Metadata = {
  title: "Credits — Justin Towery",
};

type CreditRow = {
  product?: string;   // your data uses "product" for the client name
  director?: string;
  company?: string;
  location?: string;
};

export default function CreditsPage() {
  const rows = (Array.isArray(credits) ? credits : []) as CreditRow[];

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="w-full px-6 sm:px-10 lg:px-12 pb-24 pt-28 sm:pt-32">
        {/* Top row: label + back button */}
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.45em] text-white/60">
            Credits
          </p>

          <Link
            href="/"
            className="rounded-full border border-white/20 bg-white/0 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/70 transition hover:border-white/35 hover:text-white"
          >
            Back home
          </Link>
        </div>

        {/* Divider */}
        <div className="mt-12 h-px w-full bg-white/15" />

        {/* Table */}
        <div className="mt-12">
          {/* Column headers */}
          <div className="grid grid-cols-12 gap-6 sm:gap-8 pb-6 text-[11px] uppercase tracking-[0.38em] text-white/55">
            <div className="col-span-4 pl-2">Client</div>
            <div className="col-span-3">Director</div>
            <div className="col-span-3">Company</div>
            <div className="col-span-2 text-right pr-2">Location</div>
          </div>

          <div className="h-px w-full bg-white/15" />

          {/* Rows */}
          <div>
            {rows.map((r, i) => (
              <div key={`${r.product ?? "credit"}-${i}`}>
                <div className="grid grid-cols-12 gap-6 sm:gap-8 py-8 sm:py-10">
                  {/* CLIENT (your data is "product") */}
                  <div className="col-span-4 pl-2 text-lg sm:text-xl font-medium tracking-wide text-white">
                    {r.product ?? "—"}
                  </div>

                  <div className="col-span-3 self-center text-sm sm:text-base text-white/80">
                    {r.director ?? "—"}
                  </div>

                  <div className="col-span-3 self-center text-sm sm:text-base text-white/80">
                    {r.company && r.company.trim().length ? r.company : "—"}
                  </div>

                  <div className="col-span-2 self-center text-right pr-2 text-sm sm:text-base text-white/70">
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