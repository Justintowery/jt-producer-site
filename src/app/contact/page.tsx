"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function ContactPage() {
  const reduceMotion = useReducedMotion();

  const email = "jtowery@mac.com";
  const phone = "541.912.9145";
  const instagramHandle = "@justintowery";
  const instagramUrl = "https://instagram.com/justintowery";

  // ✅ CLEAN MAILTO (no encoded body)
  const mailto = `mailto:${email}?subject=${encodeURIComponent(
    "Production Inquiry"
  )}`;

  const smsHref = `sms:${phone.replace(/\./g, "")}`;

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-28">
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="text-5xl font-bold tracking-tight leading-[0.95] text-white sm:text-6xl"
        >
          Let’s talk.
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
          className="mt-6 text-lg leading-relaxed text-zinc-400"
        >
          Availability, bids, or a quick gut-check - holler at me.
        </motion.p>

        {/* CONTACT METHODS */}
        <div className="mt-16">
          {/* EMAIL */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={reduceMotion ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
            className="pt-10"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Email (preferred)
            </p>

            <a
              href={mailto}
              className="group mt-3 inline-block text-2xl font-semibold text-white transition hover:text-zinc-200"
            >
              <span className="relative inline-block">
                {email}
                <span className="pointer-events-none absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 bg-white/35 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </span>
            </a>
          </motion.div>

          <div className="mt-10 h-px w-full bg-white/10" />

          {/* MOBILE */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={reduceMotion ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.16 }}
            className="pt-10"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Mobile (Text preferred over calls)
            </p>

            <a
              href={smsHref}
              className="group mt-3 inline-block text-2xl font-semibold text-white transition hover:text-zinc-200"
            >
              <span className="relative inline-block">
                {phone}
                <span className="pointer-events-none absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 bg-white/35 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </span>
            </a>
          </motion.div>

          <div className="mt-10 h-px w-full bg-white/10" />

          {/* INSTAGRAM */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={reduceMotion ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="pt-10"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Instagram
            </p>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-3 inline-block text-lg text-zinc-300 transition hover:text-white"
            >
              <span className="relative inline-block">
                {instagramHandle}
                <span className="pointer-events-none absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 bg-white/30 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </span>
            </a>

            <p className="mt-2 text-sm text-zinc-500">
              Mostly my wife and dogs. Occasionally some work.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}