"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { credits } from "@/data/credits";

type AnyCredit = Record<string, unknown>;

function pickString(c: AnyCredit, keys: string[]): string | null {
  for (const k of keys) {
    const v = c[k];
    if (typeof v === "string" && v.trim().length > 0) return v.trim();
  }
  return null;
}

export default function CreditsPage() {
  const items = (credits as unknown as AnyCredit[]) ?? [];

  return (
    <main className="min-h-dvh bg-zinc-950 text-white">
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-28 sm:pt-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">
            Credits
          </p>

          <div className="mt-4 flex items-end justify-between">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Selected credits.
            </h1>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/0 px-4 py-2 text-sm text-zinc-200 transition hover:border-white/25 hover:bg-white/5"
            >
              Back home
            </Link>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
        >
          {/* Column headers */}
          <div className="hidden sm:grid sm:grid-cols-12 sm:gap-6 border-b border-white/10 pb-3">
            <div className="sm:col-span-4">
              <div className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">
                Client
              </div>
            </div>

            <div className="sm:col-span-3">
              <div className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">
                Director
              </div>
            </div>

            <div className="sm:col-span-3">
              <div className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">
                Company
              </div>
            </div>

            <div className="sm:col-span-2 text-right">
              <div className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">
                Location
              </div>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-white/10">
            {items.map((c, idx) => {
              const client =
                pickString(c, ["client", "brand", "title", "name"]) ?? "—";

              const director =
                pickString(c, ["director", "dir"]) ?? "—";

              const company =
                pickString(c, [
                  "company",
                  "prodco",
                  "productionCompany",
                  "production_company",
                ]) ?? "—";

              const location =
                pickString(c, ["location", "city", "market", "state"]) ?? "—";

              return (
                <div
                  key={`${client}-${director}-${idx}`}
                  className="group py-6 transition"
                >
                  {/* Desktop layout */}
                  <div className="hidden sm:grid sm:grid-cols-12 sm:gap-6 items-start">
                    <div className="sm:col-span-4">
                      <div className="text-lg font-medium tracking-tight text-white/95 group-hover:text-white">
                        {client}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <div className="text-base text-zinc-300 group-hover:text-zinc-200">
                        {director}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <div className="text-base text-zinc-300 group-hover:text-zinc-200">
                        {company}
                      </div>
                    </div>

                    <div className="sm:col-span-2 text-right">
                      <div className="text-base text-zinc-400 whitespace-nowrap group-hover:text-zinc-300">
                        {location}
                      </div>
                    </div>
                  </div>

                  {/* Mobile layout */}
                  <div className="sm:hidden">
                    <div className="text-lg font-medium tracking-tight text-white/95">
                      {client}
                    </div>

                    <div className="mt-3 grid gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-zinc-500 uppercase tracking-[0.32em] text-[11px]">
                          Director
                        </span>
                        <span className="text-zinc-200">{director}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-500 uppercase tracking-[0.32em] text-[11px]">
                          Company
                        </span>
                        <span className="text-zinc-200">{company}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-500 uppercase tracking-[0.32em] text-[11px]">
                          Location
                        </span>
                        <span className="text-zinc-300">{location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom actions */}
          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/work"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/0 px-5 py-3 text-sm font-semibold text-white/90 transition hover:border-white/35 hover:bg-white/5 hover:text-white"
            >
              View work
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Contact
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}