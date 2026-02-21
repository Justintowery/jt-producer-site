"use client";

import "./globals.css";
import { ReactNode, useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [nameOpacity, setNameOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const fadeDistance = 180; // adjust if needed
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

  return (
    <html lang="en">
      <body className="relative bg-zinc-950 text-white">
        {/* Floating Name (Global Home Button) */}
        <button
          type="button"
          onClick={goHome}
          aria-label="Back home"
          className="fixed left-6 top-6 z-50 select-none text-base tracking-[0.42em] text-white/85 transition hover:text-white"
          style={{ opacity: nameOpacity }}
        >
          JUSTIN TOWERY
        </button>

        {children}
      </body>
    </html>
  );
}