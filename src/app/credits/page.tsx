import type { Metadata } from "next";
import creditsData from "@/data/credits";

export const metadata: Metadata = {
  title: "Credits — Justin Towery",
};

type CreditItem = {
  client: string;
  director?: string;
  company?: string;
  location?: string;
};

export default function CreditsPage() {
  const credits = (creditsData as unknown as CreditItem[]) ?? [];

  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* Subtle vignette + grain */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(255,255,255,0.06),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_100%,rgba(0,0,0,0.75),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay">
        <div className="h-full w-full bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22220%22%20height%3D%22220%22%20viewBox%3D%220%200%20220%20220%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%22.9%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22/%3E%3CfeColorMatrix%20type%3D%22saturate%22%20values%3D%220%22/%3E%3C/filter%3E%3Crect%20width%3D%22220%22%20height%3D%22220%22%20filter%3D%22url(%23n)%22%20opacity%3D%22.35%22/%3E%3C/svg%3E')] bg-repeat" />
      </div>

      <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-24">
        {/* Title block */}
        <header className="mb-10">
          <div className="text-[11px] uppercase tracking-[0.45em] text-white/55">
            Credits
          </div>

          <div className="mt-4 flex items-end justify-between gap-6">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Selected Work
            </h1>

            {/* Quiet cue (film-credit vibe) */}
            <div className="hidden items-center gap-3 sm:flex">
              <div className="h-px w-16 bg-white/15" />
              <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/45">
                Scroll
              </div>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/55">
            A concise selection of commercial credits — built in Los Angeles, working nationally.
          </p>
        </header>

        {/* Rule */}
        <div className="h-px w-full bg-white/10" />

        {/* Desktop “credit lines” */}
        <div className="hidden md:block">
          {/* Column headers */}
          <div className="grid grid-cols-12 gap-6 py-5">
            <div className="col-span-4 font-mono text-[11px] uppercase tracking-[0.35em] text-white/45">
              Client
            </div>
            <div className="col-span-3 font-mono text-[11px] uppercase tracking-[0.35em] text-white/45">
              Director
            </div>
            <div className="col-span-3 font-mono text-[11px] uppercase tracking-[0.35em] text-white/45">
              Company
            </div>
            <div className="col-span-2 text-right font-mono text-[11px] uppercase tracking-[0.35em] text-white/45">
              Location
            </div>
          </div>

          <div className="h-px w-full bg-white/10" />

          {/* Rows */}
          <ul className="divide-y divide-white/10">
            {credits.map((c, idx) => (
              <li
                key={`${c.client}-${idx}`}
                className="group"
              >
                <div className="grid grid-cols-12 gap-6 py-7 transition-transform duration-200 group-hover:-translate-y-[1px]">
                  <div className="col-span-4">
                    <div className="text-base font-medium text-white/90">
                      {c.client}
                    </div>
                    {/* subtle “role” line (optional, keeps film vibe) */}
                    <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
                      Producer
                    </div>
                  </div>

                  <div className="col-span-3 self-center text-sm text-white/70">
                    {c.director ?? "—"}
                  </div>

                  <div className="col-span-3 self-center text-sm text-white/70">
                    {c.company ?? "—"}
                  </div>

                  <div className="col-span-2 self-center text-right text-sm text-white/60">
                    {c.location ?? "—"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile “credit cards” */}
        <div className="md:hidden">
          <div className="space-y-4 pt-6">
            {credits.map((c, idx) => (
              <div
                key={`${c.client}-${idx}`}
                className="rounded-2xl border border-white/[0.10] bg-white/[0.03] p-5"
              >
                <div className="text-base font-semibold text-white/90">{c.client}</div>
                <div className="mt-2 grid gap-2 text-sm text-white/70">
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/45">
                      Director
                    </div>
                    <div className="text-right">{c.director ?? "—"}</div>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/45">
                      Company
                    </div>
                    <div className="text-right">{c.company ?? "—"}</div>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/45">
                      Location
                    </div>
                    <div className="text-right text-white/60">{c.location ?? "—"}</div>
                  </div>
                </div>

                <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
                  Producer
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade (film roll feel) */}
        <div className="pointer-events-none mt-10 h-10 w-full bg-gradient-to-b from-transparent to-black" />
      </section>
    </main>
  );
}