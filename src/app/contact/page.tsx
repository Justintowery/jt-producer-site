"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function ContactPage() {
  const reduceMotion = useReducedMotion();

  const email = "jtowery@mac.com";
  const phone = "541.912.9145";
  const instagram = "https://instagram.com/justintowery";

  const mailto = `mailto:${email}?subject=${encodeURIComponent(
    "Production Inquiry"
  )}&body=${encodeURIComponent("Hi Justin,%0D%0A%0D%0A")}`;

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-28">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-xs uppercase tracking-[0.35em] text-zinc-400"
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
          className="mt-6 text-lg leading-relaxed text-zinc-400"
        >
          Availability, bids, or a quick gut-check — reach out.
        </motion.p>

        {/* CONTACT METHODS */}
        <div className="mt-16 space-y-14">

          {/* EMAIL */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={reduceMotion ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Email (preferred)
            </p>

            <a
              href={mailto}
              className="mt-3 inline-block text-2xl font-semibold text-white transition hover:text-zinc-300"
            >
              {email}
            </a>
          </motion.div>

          {/* CELL */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={reduceMotion ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Text (faster than calling)
            </p>

            <a
              href={`sms:${phone.replace(/\./g, "")}`}
              className="mt-3 inline-block text-2xl font-semibold text-white transition hover:text-zinc-300"
            >
              {phone}
            </a>
          </motion.div>

          {/* INSTAGRAM */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={reduceMotion ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Instagram
            </p>

            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-lg text-zinc-300 transition hover:text-white"
            >
              @justintowery
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