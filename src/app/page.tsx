"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useState } from "react";

export default function HomePage() {
  const reduceMotion = useReducedMotion();

  const heroPhotoInitial = { scale: 1.08, opacity: 0.95 };
  const heroPhotoAnimate = { scale: 1.0, opacity: 1 };
  const heroPhotoTransition = { duration: 1.6, ease: "easeOut" as const };

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -42]);
  const heroScale = useTransform(scrollYProgress, [0, 0.35], [1.02, 1.0]);

  const go = (path: string) => {
    window.location.href = path;
  };

  const grainSvg = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220">
      <filter id="n">
        <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <rect width="220" height="220" filter="url(#n)" opacity=".35"/>
    </svg>
  `);

  // Glow state
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  return (
    <main className="bg-black text-white">
      {/* HERO */}
      <section className="relative min-h-[92vh] w-full overflow-hidden isolate">
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          initial={heroPhotoInitial}
          animate={heroPhotoAnimate}
          transition={heroPhotoTransition}
          style={
            reduceMotion
              ? undefined
              : {
                  y: heroY,
                  scale: heroScale,
                }
          }
        >
          <Image
            src="/hero-mobile.jpg"
            alt="Justin Towery on set"
            fill
            priority
            className="object-cover object-top md:hidden"
          />
          <Image
            src="/hero.jpg"
            alt="Justin Towery on set"
            fill
            priority
            className="hidden object-cover object-top md:block"
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-10 bg-black/45" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black via-black/35 to-black/10" />

        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,${grainSvg}")`,
            backgroundRepeat: "repeat",
          }}
        />

        <div className="relative z-30 mx-auto flex min-h-[92vh] max-w-6xl items-end px-6 pb-16 pt-24">
          <div className="max-w-2xl">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={reduceMotion ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase tracking-[0.35em] text-zinc-200/85"
            >
              Los Angeles, CA ⇄ Portland, OR • Producing Worldwide
            </motion.p>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={reduceMotion ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.05 }}
              className="mt-5 text-5xl font-bold tracking-tight leading-[0.9] text-white sm:text-6xl"
            >
              Calm is
              <br />
              contagious.
            </motion.h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={reduceMotion ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12 }}
              className="mt-6 text-2xl text-zinc-200/90"
            >
              Complex productions. Calm execution.
            </motion.p>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={reduceMotion ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18 }}
              className="mt-8 text-base leading-relaxed text-zinc-200/80"
            >
              I produce commercials — from high-profile celebrity and athlete–driven broadcast campaigns to emerging brands ready to level up.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={reduceMotion ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <button
                onClick={() => go("/work")}
                className="rounded-2xl bg-white px-7 py-4 text-sm font-semibold text-black transition hover:-translate-y-[1px]"
              >
                View work
              </button>

              <button
                onClick={() => go("/credits")}
                className="rounded-2xl border border-white/25 px-7 py-4 text-sm font-semibold text-white/90 transition hover:border-white/45 hover:text-white"
              >
                Credits
              </button>

              <button
                onClick={() => go("/contact")}
                className="rounded-2xl border border-white/25 px-7 py-4 text-sm font-semibold text-white/90 transition hover:border-white/45 hover:text-white"
              >
                Contact
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BELOW THE FOLD */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 h-px w-full bg-white/10" />

        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-white">About</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-300">
              <p>I’ve spent two decades producing commercial work at scale — leading teams, managing complexity, and protecting creative at the highest level.</p>
              <p>I’ve worked in high-pressure environments long enough to know that preparation wins — and calm leadership sets the tone for everyone else.</p>
              <p className="text-zinc-200/85">Built in Los Angeles. Working nationally.</p>
              <p className="text-zinc-200/85">Calm isn’t a personality trait. It’s a strategy.</p>
            </div>
          </div>

          {/* GLOW CARD */}
          <div
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              setGlow({ x, y });
            }}
            className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm"
          >
            {/* Cursor Glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 hover:opacity-100"
              style={{
                background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.12), transparent 60%)`,
              }}
            />

            <h2 className="text-lg font-semibold text-white">Work together</h2>

            <div className="mt-10">
              <a
                href="/contact"
                className="block w-full rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-center text-sm font-semibold text-white transition-all duration-200 hover:bg-white/[0.08] hover:border-white/30 hover:-translate-y-[1px]"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}