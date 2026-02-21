"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function ContactPage() {
  const reduceMotion = useReducedMotion();

  // Single source of truth for your email
  const email = "jtowery@mac.com";

  // Optional: pre-fill subject/body when someone clicks the email button
  const mailto = `mailto:${email}?subject=${encodeURIComponent(
    "Production Inquiry"
  )}&body=${encodeURIComponent("Hi Justin,%0D%0A%0D%0A")}`;

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-24">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-xs uppercase tracking-[0.35em] text-zinc-200/90"
        >
          Contact
        </motion.p>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.05 }}
          className="mt-5 text-5xl font-bold tracking-tight leading-[0.95] text-white sm:text-6xl"
        >
          Let’s talk.
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.12 }}
          className="mt-6 text-lg leading-relaxed text-zinc-200/85"
        >
          For availability, bids, or production questions — reach out and I’ll get back quickly.
        </motion.p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Email</h2>
          <p className="mt-2 text-sm text-zinc-300">Click to email:</p>

          <a
            href={mailto}
            className="mt-4 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
          >
            {email}
          </a>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="rounded-xl border border-white/15 bg-white/0 px-5 py-3 text-center text-sm font-semibold text-white/90 transition hover:border-white/35 hover:text-white"
            >
              Back to home
            </Link>

            <Link
              href="/work"
              className="rounded-xl border border-white/15 bg-white/0 px-5 py-3 text-center text-sm font-semibold text-white/90 transition hover:border-white/35 hover:text-white"
            >
              View work
            </Link>

            <Link
              href="/credits"
              className="rounded-xl border border-white/15 bg-white/0 px-5 py-3 text-center text-sm font-semibold text-white/90 transition hover:border-white/35 hover:text-white"
            >
              Credits
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}