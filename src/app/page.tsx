"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type {
  CSSProperties,
  MouseEvent as ReactMouseEvent,
  RefObject,
} from "react";

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

  // Work Together card glow state
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  /**
   * Ultra-subtle magnetic hover for hero buttons
   * - barely-there translation toward cursor
   * - preserves clickability
   * - respects prefers-reduced-motion (disabled)
   */
  type MagnetApi = {
    ref: RefObject<HTMLButtonElement | null>;
    onMove: (e: ReactMouseEvent<HTMLButtonElement>) => void;
    onLeave: () => void;
    style: CSSProperties;
  };

  const useMagnet = (strength = 0.06): MagnetApi => {
    const ref = useRef<HTMLButtonElement | null>(null);

    const [pos, setPos] = useState({ x: 0, y: 0 });
    const raf = useRef<number | null>(null);

    const setPosRaf = (next: { x: number; y: number }) => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => setPos(next));
    };

    useEffect(() => {
      return () => {
        if (raf.current) cancelAnimationFrame(raf.current);
      };
    }, []);

    const onMove = (e: ReactMouseEvent<HTMLButtonElement>) => {
      if (reduceMotion) return;

      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      const dx = (px - 0.5) * rect.width * strength;
      const dy = (py - 0.5) * rect.height * strength;

      setPosRaf({ x: dx, y: dy });
    };

    const onLeave = () => {
      if (reduceMotion) return;
      setPosRaf({ x: 0, y: 0 });
    };

    const style: CSSProperties = reduceMotion
      ? {}
      : {
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          transition: "transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1)",
          willChange: "transform",
        };

    return { ref, onMove, onLeave, style };
  };

  const magnetPrimary = useMagnet(0.055);
  const magnetSecondary = useMagnet(0.05);
  const magnetTertiary = useMagnet(0.05);

  const heroBtnBase =
    "rounded-2xl px-7 py-4 text-sm font-semibold transition will-change-transform";
  const heroBtnLift = reduceMotion ? "" : "hover:-translate-y-[1px]";

  const logos = [
    { name: "Amazon", src: "/logos/amazon.svg" },
    { name: "Hulu", src: "/logos/hulu.svg" },
    { name: "Verizon", src: "/logos/verizon.svg" },
    { name: "Ford", src: "/logos/ford.svg" },
    { name: "Sony", src: "/logos/sony.svg" },
    { name: "Puma", src: "/logos/puma.svg" },
    { name: "Columbia Sportswear", src: "/logos/columbia-sportswear.svg" },
    { name: "Chime", src: "/logos/chime.svg" },
  ];

  // Duplicate for marquee loop (desktop)
  const marqueeLogos = [...logos, ...logos];

  return (
    <main className="bg-black text-white">
      {/* Marquee keyframes (scoped global) */}
      <style jsx global>{`
        @keyframes jtLogoMarquee {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
      `}</style>

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
          {/* Two-column layout on desktop */}
          <div className="w-full lg:grid lg:grid-cols-[1fr_300px] lg:items-end lg:gap-10">
            {/* LEFT: hero copy */}
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
                I produce commercials — from high-profile celebrity and athlete–driven
                broadcast campaigns to emerging brands ready to level up.
              </motion.p>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={reduceMotion ? false : { opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
              >
                <button
                  ref={magnetPrimary.ref}
                  onMouseMove={magnetPrimary.onMove}
                  onMouseLeave={magnetPrimary.onLeave}
                  style={magnetPrimary.style}
                  onClick={() => go("/work")}
                  className={`${heroBtnBase} ${heroBtnLift} bg-white text-black`}
                  aria-label="View work"
                >
                  View work
                </button>

                <button
                  ref={magnetSecondary.ref}
                  onMouseMove={magnetSecondary.onMove}
                  onMouseLeave={magnetSecondary.onLeave}
                  style={magnetSecondary.style}
                  onClick={() => go("/credits")}
                  className={`${heroBtnBase} ${heroBtnLift} border border-white/25 text-white/90 hover:border-white/45 hover:text-white`}
                  aria-label="Credits"
                >
                  Credits
                </button>

                <button
                  ref={magnetTertiary.ref}
                  onMouseMove={magnetTertiary.onMove}
                  onMouseLeave={magnetTertiary.onLeave}
                  style={magnetTertiary.style}
                  onClick={() => go("/contact")}
                  className={`${heroBtnBase} ${heroBtnLift} border border-white/25 text-white/90 hover:border-white/45 hover:text-white`}
                  aria-label="Contact"
                >
                  Contact
                </button>
              </motion.div>

              {/* Mobile fallback: small logo row under buttons */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={reduceMotion ? false : { opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="mt-12 lg:hidden"
              >
                <p className="text-[11px] uppercase tracking-[0.32em] text-zinc-200/60">
                  Selected clients
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-5">
                  {logos.map((logo) => (
                    <div
                      key={logo.name}
                      className="group flex h-6 items-center"
                      title={logo.name}
                      aria-label={logo.name}
                    >
                      <Image
                        src={logo.src}
                        alt={logo.name}
                        width={140}
                        height={28}
                        className="h-6 w-auto opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT: translucent scrolling logo column (desktop) */}
            <motion.aside
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={reduceMotion ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="hidden lg:block"
            >
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-zinc-200/60">
                    Selected clients
                  </p>
                  <div className="h-px flex-1 bg-white/10 mx-4" />
                  <p className="text-[11px] text-zinc-200/45">Scroll</p>
                </div>

                {/* Scroll window */}
                <div
                  className="mt-5 relative h-[220px] overflow-hidden"
                  style={{
                    // subtle fade top/bottom
                    maskImage:
                      "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
                  }}
                >
                  {/* Marquee track (auto-scroll unless reduced motion) */}
                  <div
                    className="absolute inset-0"
                    style={
                      reduceMotion
                        ? undefined
                        : {
                            animation: "jtLogoMarquee 18s linear infinite",
                          }
                    }
                  >
                    <div className="flex flex-col gap-6 py-2">
                      {marqueeLogos.map((logo, idx) => (
                        <div
                          key={`${logo.name}-${idx}`}
                          className="group flex items-center justify-start"
                          title={logo.name}
                          aria-label={logo.name}
                        >
                          <Image
                            src={logo.src}
                            alt={logo.name}
                            width={160}
                            height={36}
                            className="h-7 w-auto opacity-55 grayscale transition duration-300 group-hover:opacity-90 group-hover:grayscale-0"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Optional manual scroll overlay (subtle): pointer-events on container */}
                  {/* If you want manual scroll instead of auto, tell me and I'll switch it. */}
                </div>

                <p className="mt-4 text-xs text-zinc-200/45 leading-relaxed">
                  Quiet credibility. No noise.
                </p>
              </div>
            </motion.aside>
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
              <p>
                I’ve spent two decades producing commercial work at scale — leading
                teams, managing complexity, and protecting creative at the highest
                level.
              </p>
              <p>
                I’ve worked in high-pressure environments long enough to know that
                preparation wins — and calm leadership sets the tone for everyone
                else.
              </p>
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