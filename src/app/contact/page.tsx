"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function HomePage() {
  const reduceMotion = useReducedMotion();

  // Hero photo "come to life" animation (Ken Burns style)
  const heroPhotoInitial = reduceMotion
    ? { opacity: 1, scale: 1 }
    : { opacity: 0, scale: 1.08, filter: "blur(6px)" as any };

  const heroPhotoAnimate = reduceMotion
    ? { opacity: 1, scale: 1 }
    : {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)" as any,
        // Very subtle drift so it feels alive
        y: [0, -8, 0],
      };

  const heroPhotoTransition = reduceMotion
    ? { duration: 0 }
    : {
        opacity: { duration: 0.8, ease: "easeOut" },
        scale: { duration: 1.2, ease: "easeOut" },
        filter: { duration: 1.1, ease: "easeOut" },
        y: { duration: 12, ease: "easeInOut", repeat: Infinity },
      };

  return (
    <main>
      {/* HERO */}
      <section className="film-grain relative min-h-[92vh] w-full overflow-hidden">
        {/* Background image (animated) */}
        <motion.div
          className="absolute inset-0"
          initial={heroPhotoInitial}
          animate={heroPhotoAnimate}
          transition={heroPhotoTransition}
        >
          {/* Background image (mobile) */}
          <Image
            src="/hero-mobile.jpg"
            alt="Justin Towery on set"
            fill
            priority
            className="object-cover object-top md:hidden"
          />

          {/* Background image (desktop) */}
          <Image
            src="/hero.jpg"
            alt="Justin Towery on set"
            fill
            priority
            className="hidden object-cover object-top md:block"
          />
        </motion.div>

        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />

        {/* Content */}
        <div className="relative mx-auto flex min-h-[92vh] max-w-6xl items-end px-6 pb-16 pt-24">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-xs uppercase tracking-[0.35em] text-zinc-200/90"
            >
              Los Angeles, CA ⇄ Portland, OR • Producing Worldwide
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.05 }}
              className="mt-5 text-5xl font-bold tracking-tight leading-[0.95] text-white sm:text-6xl"
            >
              Calm is
              <br />
              contagious.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.12 }}
              className="mt-6 text-2xl text-zinc-200"
            >
              Complex productions. Calm execution.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.18 }}
              className="mt-8 text-base leading-relaxed text-zinc-200/85 sm:text-lg"
            >
              I produce commercials — from high-profile celebrity and athlete–driven broadcast
              campaigns to emerging brands ready to level up.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <Link
                href="/work"
                className="w-full sm:w-auto rounded-2xl bg-white px-7 py-4 text-center text-sm font-semibold text-black shadow-sm transition hover:opacity-90"
              >
                View work
              </Link>

              <Link
                href="/credits"
                className="w-full sm:w-auto rounded-2xl border border-white/25 bg-white/0 px-7 py-4 text-center text-sm font-semibold text-white/90 backdrop-blur-sm transition hover:border-white/45 hover:text-white"
              >
                Credits
              </Link>

              <Link
                href="/contact"
                className="w-full sm:w-auto rounded-2xl border border-white/25 bg-white/0 px-7 py-4 text-center text-sm font-semibold text-white/90 backdrop-blur-sm transition hover:border-white/45 hover:text-white"
              >
                Contact
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BELOW THE FOLD */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-3">
          {/* ABOUT */}
          <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">About</h2>

            <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-300">
              <p>
                I’ve spent two decades producing commercial work at scale — leading teams,
                managing complexity, and protecting creative at the highest level.
              </p>

              <p>
                I’ve worked in high-pressure environments long enough to know that preparation
                wins — and calm leadership sets the tone for everyone else.
              </p>

              <p className="text-zinc-200/90">Built in Los Angeles. Working nationally.</p>

              <p className="text-zinc-200/90">Calm isn’t a personality trait. It’s a strategy.</p>
            </div>
          </div>

          {/* NEXT */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">Next</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Browse credits or reach out for availability. I’ll get back quickly.
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/credits"
                className="rounded-xl border border-white/15 bg-white/0 px-5 py-3 text-center text-sm font-semibold text-white/90 transition hover:border-white/35 hover:text-white"
              >
                View credits
              </Link>
              <Link
                href="/contact"
                className="rounded-xl bg-white px-5 py-3 text-center text-sm font-semibold text-black transition hover:opacity-90"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}