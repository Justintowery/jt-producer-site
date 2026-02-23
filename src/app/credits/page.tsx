import type { Metadata } from "next";
import Link from "next/link";
import { credits } from "@/data/credits";

export const metadata: Metadata = {
  title: "Credits — Justin Towery",
};

type CreditRow = {
  product?: string;
  director?: string;
  company?: string;
  location?: string;
};

export default function CreditsPage() {
  const rows = (Array.isArray(credits) ? credits : []) as CreditRow[];

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="w-full px-6 sm:px-10 lg:px-12 pb-24 pt-28 sm:pt-32">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.45em] text-white/60">
            Credits
          </p>

          <Link
            href="/"
            className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/70 transition hover:border-white/35 hover:text-white"
          >
            Back home
          </Link>
        </div>

        <div className="mt-12 h-px w-full bg-white/15" />

        <div className="mt-12">
          {/* Column headers */}
          <div className="grid grid-cols-12 gap-6 sm:gap-8 pb-6 text-[11px] uppercase tracking-[0.38em] text-white/55">
            <div className="col-span-4 pl-2">Client</div>
            <div className="col-span-3">Director</div>
            <div className="col-span-3">Company</div>
            <div className="col-span-2 text-right pr-2">Location</div>
          </div>

          <div className="h-px w-full bg-white/15" />

          {/* Rows wrapper: dims all rows on hover, keeps hovered row bright */}
          <div className="mt-0 hover:[&>div]:opacity-55 hover:[&>div:hover]:opacity-100">
            {rows.map((r, i) => (
              <div
                key={`${r.product ?? "credit"}-${i}`}
                className="relative transition-opacity duration-300 ease-out"
              >
                {/* Spotlight (only on hovered row) */}
                <div className="pointer-events-none absolute inset-x-0 -inset-y-2 opacity-0 transition-opacity duration-300 ease-out hover:opacity-100">
                  <div className="h-full w-full bg-gradient-to-r from-white/0 via-white/[0.06] to-white/0 blur-[0.5px]" />
                </div>

                <div className="grid grid-cols-12 gap-6 sm:gap-8 py-8 sm:py-9 text-[15px] sm:text-base leading-relaxed transition-colors duration-300 ease-out hover:text-white">
                  {/* Client (Option C: slightly stronger, not louder) */}
                  <div className="col-span-4 pl-2 text-white/90 tracking-[0.01em]">
                    {r.product ?? "—"}
                  </div>

                  {/* Director */}
                  <div className="col-span-3 text-white/75">
                    {r.director ?? "—"}
                  </div>

                  {/* Company */}
                  <div className="col-span-3 text-white/75">
                    {r.company && r.company.trim().length ? r.company : "—"}
                  </div>

                  {/* Location */}
                  <div className="col-span-2 text-right pr-2 text-white/60">
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