"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { credits } from "@/data/credits";

type Credit = {
  title: string;
  role?: string;
  client?: string;
  director?: string;
  prodco?: string;
  year?: string;
};

export default function CreditsPage() {
  const items = (credits as unknown as Credit[]) ?? [];

  return (
    <main className="min-h-dvh bg-zinc-950 text-white">
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-28 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">
            Credits
          </p>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-300 sm:text-lg">
            A snapshot of work across broadcast, digital, and brand campaigns.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur sm:p-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((c, idx) => (
              <div
                key={`${c.title ?? "credit"}-${idx}`}
                className="rounded-2xl border border-white/10 bg-black/20 p-5"
              >
                <div className="text-base font-semibold text-white">
                  {c.title}
                </div>

                <div className="mt-2 space-y-1 text-sm text-zinc-300">
                  {c.client && (
                    <div>
                      <span className="text-zinc-400">Client:</span>{" "}
                      {c.client}
                    </div>
                  )}
                  {c.role && (
                    <div>
                      <span className="text-zinc-400">Role:</span> {c.role}
                    </div>
                  )}
                  {c.director && (
                    <div>
                      <span className="text-zinc-400">Director:</span>{" "}
                      {c.director}
                    </div>
                  )}
                  {c.prodco && (
                    <div>
                      <span className="text-zinc-400">Prod Co:</span> {c.prodco}
                    </div>
                  )}
                  {c.year && (
                    <div>
                      <span className="text-zinc-400">Year:</span> {c.year}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/work"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/0 px-5 py-3 text-sm font-semibold text-white/90 transition hover:border-white/35 hover:text-white"
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