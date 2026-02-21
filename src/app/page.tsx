"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function HomePage() {
  const reduceMotion = useReducedMotion();

  // Cinematic hero photo motion (calm, premium)
  const heroPhotoInitial = { scale: 1.08, opacity: 0.95 };
  const heroPhotoAnimate = { scale: 1.0, opacity: 1 };
  const heroPhotoTransition = { duration: 1.6, ease: "easeOut" as const };

  // Subtle parallax on scroll
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -42]);
  const heroScale = useTransform(scrollYProgress, [0, 0.35], [1.02, 1.0]);

  // Contact shortcuts (quietly useful, fills space elegantly)
  const email = "jtowery@mac.com";
  const phone = "541.912.9145";
  const mailto = `mailto:${email}?subject=${encodeURIComponent(
    "Production Inquiry"
  )}&body=${encodeURIComponent("Hi Justin,%0D%0A%0D%0A")}`;
  const smsHref = `sms:${phone.replace(/\./g, "")}`;

  const go = (path: string) => {
    window.location.href = path;
  };

  // Tasteful film grain (SVG turbulence) as a data-uri background
  const grainSvg = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220">
      <filter id="n">
        <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <rect width="220" height="220" filter="url(#n)" opacity=".35"/>
    </svg>
  `);

  return (
    <main className="bg-black text-white">
      {/* HERO */}
      <section className="relative min-h-[92vh] w-full overflow-hidden isolate">
        {/* Background image (animated + subtle parallax) */}
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

        {/* Overlays (depth + readability) */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-black/45" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black via-black/35 to-black/10" />

        {/* Film grain (very subtle) */}
        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,${grainSvg}")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* Content */}
        <div className="relative z-30 mx-auto flex min-h-[92vh] max-w-6xl items-end px-6 pb-16 pt-24">
          <div className="max-w-2xl">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={reduceMotion ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-xs uppercase tracking-[0.35em] text-zinc-200/85"
            >
              Los Angeles, CA ⇄ Portland, OR • Producing Worldwide
            </motion.p>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={reduceMotion ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.05 }}
              className="mt-5 text-5xl font-bold tracking-tight leading-[0.9] text-white sm:text-6xl"
            >
              Calm is
              <br />
              contagious.
            </motion.h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={reduceMotion ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.12 }}
              className="mt-6 text-2xl text-zinc-200/90"
            >
              Complex productions. Calm execution.
            </motion.p>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={reduceMotion ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.18 }}
              className="mt-8 text-base leading-relaxed text-zinc-200/80 sm:text-[17px]"
            >
              I produce commercials — from high-profile celebrity and athlete–driven broadcast campaigns to
              emerging brands ready to level up.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={reduceMotion ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <button
                type="button"
                onClick={() => go("/work")}
                className="w-full sm:w-auto rounded-2xl bg-white px-7 py-4 text-center text-sm font-semibold text-black shadow-sm transition duration-200 ease-out hover:-translate-y-[1px] hover:shadow-lg hover:opacity-95 active:translate-y-[0px]"
              >
                View work
              </button>

              <button
                type="button"
                onClick={() => go("/credits")}
                className="w-full sm:w-auto rounded-2xl border border-white/25 bg-white/0 px-7 py-4 text-center text-sm font-semibold text-white/90 backdrop-blur-sm transition duration-200 ease-out hover:-translate-y-[1px] hover:border-white/45 hover:text-white hover:bg-white/[0.03] active:translate-y-[0px]"
              >
                Credits
              </button>

              <button
                type="button"
                onClick={() => go("/contact")}
                className="w-full sm:w-auto rounded-2xl border border-white/25 bg-white/0 px-7 py-4 text-center text-sm font-semibold text-white/90 backdrop-blur-sm transition duration-200 ease-out hover:-translate-y-[1px] hover:border-white/45 hover:text-white hover:bg-white/[0.03] active:translate-y-[0px]"
              >
                Contact
              </button>
            </motion.div>
          </div>
        </div>

        {/* Soft transition into below-the-fold */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-16 bg-gradient-to-b from-transparent to-black" />
      </section>

      {/* BELOW THE FOLD */}
      <section className="relative mx-auto max-w-6xl px-6 py-20">
        {/* Hairline + fade (premium separation) */}
        <div className="pointer-events-none absolute -top-10 left-0 right-0 h-10 bg-gradient-to-b from-black to-transparent" />
        <div className="mb-10 h-px w-full bg-white/10" />

        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-white">About</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-300">
              <p>
                I’ve spent two decades producing commercial work at scale — leading teams, managing complexity,
                and protecting creative at the highest level.
              </p>
              <p>
                I’ve worked in high-pressure environments long enough to know that preparation wins — and calm
                leadership sets the tone for everyone else.
              </p>
              <p className="text-zinc-200/85">Built in Los Angeles. Working nationally.</p>
              <p className="text-zinc-200/85">Calm isn’t a personality trait. It’s a strategy.</p>
            </div>
          </div>

          {/* Work Together card (intentional content + premium depth) */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm">
            {/* Subtle top highlight line */}
            <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />

            <h2 className="text-lg font-semibold text-white">Work together</h2>

            {/* Micro-actions (fills space, feels bespoke) */}
            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={mailto}
                className="rounded-full border border-white/15 bg-white/[0.02] px-4 py-2 text-xs font-semibold tracking-wide text-white/85 transition hover:border-white/30 hover:text-white hover:bg-white/[0.04]"
              >
                Email (preferred)
              </a>
              <a
                href={smsHref}
                className="rounded-full border border-white/15 bg-white/[0.02] px-4 py-2 text-xs font-semibold tracking-wide text-white/85 transition hover:border-white/30 hover:text-white hover:bg-white/[0.04]"
              >
                Text
              </a>
            </div>

            <div className="mt-8 h-px w-full bg-white/10" />

            <div className="mt-8">
              <a
                href="/contact"
                className="block w-full rounded-xl bg-white px-5 py-3 text-center text-sm font-semibold text-black transition duration-200 ease-out hover:-translate-y-[1px] hover:shadow-lg hover:opacity-95 active:translate-y-[0px]"
              >
                Contact
              </a>
            </div>

            {/* Tiny signature detail */}
            <p className="mt-4 text-xs text-zinc-400/80">
              {email} • {phone}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}