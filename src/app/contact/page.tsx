"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function ContactPage() {
  const reduceMotion = useReducedMotion();

  const phone = "541.912.9145";
  const email = "jtowery@mac.com";
  const instagramHandle = "@justintowery";
  const instagramUrl = "https://instagram.com/justintowery";

  const mailto = `mailto:${email}?subject=${encodeURIComponent(
    "Production Inquiry"
  )}&body=${encodeURIComponent("Hi Justin,\n\n")}`;

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
          Availability, bids, or a quick gut-check — holler at me. I’ll get back
          quickly.
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.18 }}
          className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-7 sm:p-8"
        >
          <div className="grid gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-200/80">
                Cell
              </p>
              <a
                href={`tel:${phone.replace(/\./g, "")}`}
                className="mt-2 inline-flex text-xl font-semibold tracking-tight text-white hover:text-white/90"
              >
                {phone}
              </a>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-200/80">
                Email
              </p>
              <a
                href={mailto}
                className="mt-2 inline-flex text-xl font-semibold tracking-tight text-white hover:text-white/90"
              >
                {email}
              </a>

              <div className="mt-4">
                <a
                  href={mailto}
                  className="inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  Email Justin
                </a>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-200/80">
                Instagram
              </p>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex text-xl font-semibold tracking-tight text-white hover:text-white/90"
              >
                {instagramHandle}
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="rounded-2xl border border-white/15 bg-white/0 px-5 py-3 text-center text-sm font-semibold text-white/90 transition hover:border-white/35 hover:text-white"
            >
              Back to home
            </Link>

            <Link
              href="/work"
              className="rounded-2xl border border-white/15 bg-white/0 px-5 py-3 text-center text-sm font-semibold text-white/90 transition hover:border-white/35 hover:text-white"
            >
              View work
            </Link>

            <Link
              href="/credits"
              className="rounded-2xl border border-white/15 bg-white/0 px-5 py-3 text-center text-sm font-semibold text-white/90 transition hover:border-white/35 hover:text-white"
            >
              Credits
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}