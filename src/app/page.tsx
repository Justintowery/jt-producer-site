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

  const [glow, setGlow] = useState({ x: 50, y: 50 });

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
    "/logos/amazon.svg",
    "/logos/hulu.svg",
    "/logos/verizon.svg",
    "/logos/ford.svg",
    "/logos/sony.svg",
    "/logos/puma.svg",
    "/logos/columbia-sportswear.svg",
    "/logos/chime.svg",
  ];

  return (
    <main className="bg-black text-white">
      <section className="relative min-h-[92vh] w-full overflow-hidden isolate">
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          initial={heroPhotoInitial}
          animate={heroPhotoAnimate}
          transition={heroPhotoTransition}
          style={
            reduceMotion
              ? undefined
              : { y: heroY, scale: heroScale }
          }
        >
          <Image
            src="/hero.jpg"
            alt="Justin Towery on set"
            fill
            priority
            className="object-cover object-top"
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-10 bg-black/45" />

        <div className="relative z-30 mx-auto flex min-h-[92vh] max-w-6xl items-end px-6 pb-16 pt-24">
          <div className="max-w-2xl">
            <h1 className="mt-5 text-5xl font-bold tracking-tight leading-[0.9] text-white sm:text-6xl">
              Calm is
              <br />
              contagious.
            </h1>

            <p className="mt-6 text-2xl text-zinc-200/90">
              Complex productions. Calm execution.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <button
                ref={magnetPrimary.ref}
                onMouseMove={magnetPrimary.onMove}
                onMouseLeave={magnetPrimary.onLeave}
                style={magnetPrimary.style}
                onClick={() => go("/work")}
                className={`${heroBtnBase} ${heroBtnLift} bg-white text-black`}
              >
                View work
              </button>

              <button
                ref={magnetSecondary.ref}
                onMouseMove={magnetSecondary.onMove}
                onMouseLeave={magnetSecondary.onLeave}
                style={magnetSecondary.style}
                onClick={() => go("/credits")}
                className={`${heroBtnBase} ${heroBtnLift} border border-white/25 text-white`}
              >
                Credits
              </button>

              <button
                ref={magnetTertiary.ref}
                onMouseMove={magnetTertiary.onMove}
                onMouseLeave={magnetTertiary.onLeave}
                style={magnetTertiary.style}
                onClick={() => go("/contact")}
                className={`${heroBtnBase} ${heroBtnLift} border border-white/25 text-white`}
              >
                Contact
              </button>
            </div>

            {/* CLIENT LOGO ROW */}
            <div className="mt-14">
              <p className="text-[11px] uppercase tracking-[0.32em] text-zinc-400">
                Selected clients
              </p>

              <div className="mt-6 grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4">
                {logos.map((src, index) => (
                  <div key={index} className="flex items-center">
                    <Image
                      src={src}
                      alt="Client logo"
                      width={140}
                      height={40}
                      className="h-6 w-auto opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}