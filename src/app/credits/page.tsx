"use client";

import { useMemo, useState } from "react";
import { credits } from "@/data/credits";

type Credit = {
  product: string;
  director: string;
  company: string;
  location: string;
};

export default function CreditsPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return credits as Credit[];

    return (credits as Credit[]).filter((c) => {
      const haystack = `${c.product} ${c.director} ${c.company} ${c.location}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  return (
    <main className="relative mx-auto max-w-6xl px-6 pb-24 pt-28">
      {/* background polish */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-zinc-950" />
        <div className="absolute left-1/2 top-[-240px] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)] blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60" />
      </div>

      <div className="opacity-0 animate-[fadeIn_600ms_ease-out_forwards]">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">Credits</p>

        <div className="mt-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search product, director, company, or location…"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-[15px] text-white placeholder:text-zinc-500 outline-none transition focus:border-white/20 focus:bg-white/7"
          />
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] overflow-hidden">
          {/* DESKTOP TABLE */}
          <div className="hidden md:block">
            <div className="max-h-[70vh] overflow-auto">
              {/* sticky header */}
              <div className="sticky top-0 z-10 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
                <div className="grid grid-cols-[1.4fr_1fr_1fr_0.9fr] gap-6 px-8 py-4 text-[11px] uppercase tracking-[0.35em] text-zinc-400">
                  <div>Product</div>
                  <div>Director</div>
                  <div>Company</div>
                  <div className="text-right">Location</div>
                </div>
              </div>

              <div>
                {filtered.map((c, i) => (
                  <div
                    key={`${c.product}-${c.director}-${i}`}
                    className="grid grid-cols-[1.4fr_1fr_1fr_0.9fr] gap-6 px-8 py-5 border-b border-white/10 last:border-b-0 opacity-0 animate-[rowIn_420ms_ease-out_forwards]"
                    style={{ animationDelay: `${Math.min(i * 20, 280)}ms` }}
                  >
                    <div className="text-[18px] leading-snug text-white">{c.product}</div>
                    <div className="text-[18px] leading-snug text-zinc-200">{c.director}</div>
                    <div className="text-[18px] leading-snug text-zinc-400">{c.company}</div>
                    <div className="text-right text-[18px] leading-snug text-zinc-400 whitespace-nowrap">
                      {c.location}
                    </div>
                  </div>
                ))}

                {filtered.length === 0 && (
                  <div className="px-8 py-10 text-zinc-400">No matches.</div>
                )}
              </div>
            </div>
          </div>

          {/* MOBILE CARDS */}
          <div className="md:hidden">
            <div className="border-b border-white/10 bg-zinc-950/40 px-5 py-4">
              <div className="text-[11px] uppercase tracking-[0.35em] text-zinc-400">
                Product • Director • Company • Location
              </div>
            </div>

            <div>
              {filtered.map((c, i) => (
                <div
                  key={`${c.product}-${c.director}-${i}`}
                  className="border-b border-white/10 last:border-b-0 px-5 py-5 opacity-0 animate-[rowIn_420ms_ease-out_forwards]"
                  style={{ animationDelay: `${Math.min(i * 20, 280)}ms` }}
                >
                  <div className="text-[18px] leading-snug text-white">{c.product}</div>

                  <div className="mt-4 grid gap-3">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">
                        Director
                      </div>
                      <div className="mt-1 text-[16px] text-zinc-200">{c.director}</div>
                    </div>

                    <div>
                      <div className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">
                        Company
                      </div>
                      <div className="mt-1 text-[16px] text-zinc-400">{c.company}</div>
                    </div>

                    <div>
                      <div className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">
                        Location
                      </div>
                      <div className="mt-1 text-[16px] text-zinc-400">{c.location}</div>
                    </div>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="px-5 py-10 text-zinc-400">No matches.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes rowIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}