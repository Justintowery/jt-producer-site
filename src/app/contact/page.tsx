"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactPage() {
  const email = "jtowery@mac.com";
  const phoneDisplay = "541.912.9145";
  const phoneDigits = "5419129145";
  const instagramHandle = "@justintowery";
  const instagramUrl = "https://instagram.com/justintowery";

  const [copied, setCopied] = useState<null | "email" | "phone">(null);

  async function copy(text: string, which: "email" | "phone") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      setTimeout(() => setCopied(null), 1200);
    } catch {
      setCopied(null);
    }
  }

  return (
    <main className="min-h-dvh bg-zinc-950 text-white">
      <section className="mx-auto max-w-3xl px-6 pb-20 pt-28 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">
            Contact
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Get in touch.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
            For availability, bids, or a quick gut-check — reach out.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur sm:p-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
        >
          {/* EMAIL */}
          <div className="flex flex-col gap-2 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.32em] text-zinc-400">
                Email
              </div>
              <a
                href={`mailto:${email}`}
                className="group mt-2 inline-flex items-baseline gap-2 text-xl text-white"
              >
                <span className="relative">
                  {email}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-white/70 transition-all duration-300 group-hover:w-full" />
                </span>
              </a>
              <div className="mt-1 text-sm text-zinc-400">
                Clicking opens your email composer.
              </div>
            </div>

            <button
              onClick={() => copy(email, "email")}
              className="mt-3 inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/0 px-4 py-2 text-sm text-zinc-200 transition hover:border-white/25 hover:bg-white/5 sm:mt-0"
            >
              {copied === "email" ? "Copied" : "Copy"}
            </button>
          </div>

          {/* PHONE */}
          <div className="mt-6 flex flex-col gap-2 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.32em] text-zinc-400">
                Phone
              </div>
              <a
                href={`tel:+1${phoneDigits}`}
                className="group mt-2 inline-flex items-baseline gap-2 text-xl text-white"
              >
                <span className="relative">
                  {phoneDisplay}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-white/70 transition-all duration-300 group-hover:w-full" />
                </span>
              </a>
              <div className="mt-1 text-sm text-zinc-400">
                Texts preferred over calls.
              </div>
            </div>

            <button
              onClick={() => copy(phoneDisplay, "phone")}
              className="mt-3 inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/0 px-4 py-2 text-sm text-zinc-200 transition hover:border-white/25 hover:bg-white/5 sm:mt-0"
            >
              {copied === "phone" ? "Copied" : "Copy"}
            </button>
          </div>

          {/* INSTAGRAM */}
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.32em] text-zinc-400">
                Instagram
              </div>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="group mt-2 inline-flex items-baseline gap-2 text-xl text-white"
              >
                <span className="relative">
                  {instagramHandle}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-white/70 transition-all duration-300 group-hover:w-full" />
                </span>
              </a>
              <div className="mt-1 text-sm text-zinc-400">
                Mainly photos of my dogs & wife + work.
              </div>
            </div>

            <Link
              href="/"
              className="mt-3 inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/0 px-4 py-2 text-sm text-zinc-200 transition hover:border-white/25 hover:bg-white/5 sm:mt-0"
            >
              Back home
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}