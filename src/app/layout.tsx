"use client";

import "./globals.css";
import { ReactNode, useEffect, useMemo, useState } from "react";
import CursorDot from "../components/CursorDot"; // <-- IMPORTANT: relative import (fixes runtime object import)

export default function RootLayout({ children }: { children: ReactNode }) {
  const [nameOpacity, setNameOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const fadeDistance = 220; // slightly longer, feels calmer
      const next = 1 - Math.min(y / fadeDistance, 1);
      setNameOpacity(next);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goHome = () => {
    window.location.href = "/";
  };

  // Tiny inline SVG grain for global overlay (subtle, premium)
  const grainSvg = useMemo(() => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220">
        <filter id="n">
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <rect width="220" height="220" filter="url(#n)" opacity=".35"/>
      </svg>
    `;
    return encodeURIComponent(svg);
  }, []);

  return (
    <html lang="en">
      <body className="relative min-h-screen bg-zinc-950 text-white">
        {/* Global cursor system (desktop only, never blocks clicks) */}
        <CursorDot />

        {/* Global finish: vignette + grain (quiet luxury) */}
        <div className="pointer-events-none fixed inset-0 z-0">
          {/* vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.25)_55%,rgba(0,0,0,0.65)_100%)]" />
          {/* grain */}
          <div
            className="absolute inset-0 opacity-[0.045] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,${grainSvg}")`,
              backgroundRepeat: "repeat",
            }}
          />
        </div>

        {/* Floating Name (Global Home Button) */}
        <button
          type="button"
          onClick={goHome}
          aria-label="Back home"
          data-cursor="hover"
          style={{ opacity: nameOpacity }}
          className="
            group
            fixed left-6 top-6 z-50
            select-none
            rounded-2xl
            px-4 py-3
            text-[18px] md:text-[22px]
            font-medium
            uppercase
            tracking-[0.35em]
            text-white/80
            border border-white/0
            bg-white/[0.00]
            transition-all duration-200 ease-out
            hover:text-white
            hover:bg-white/[0.08]
            hover:border-white/20
            hover:backdrop-blur-sm
            hover:-translate-y-[1px]
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-white/40
          "
        >
          <span className="relative inline-block">
            JUSTIN TOWERY
            {/* faint underline sweep on hover */}
            <span className="pointer-events-none absolute left-0 -bottom-2 h-px w-full origin-left scale-x-0 bg-white/40 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </span>
        </button>

        {/* App content above global finish */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}