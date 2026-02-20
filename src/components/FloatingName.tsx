"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function FloatingName() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 24,
        left: 24,
        zIndex: 2147483647,
        pointerEvents: "auto",
      }}
      className={[
        "transition-all duration-500 ease-out",
        scrolled ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0",
      ].join(" ")}
    >
      <Link
        href="/"
        aria-label="Go to home"
        className="text-sm font-medium tracking-[0.25em] uppercase text-white/80 hover:text-white transition"
      >
        Justin Towery
      </Link>
    </header>
  );
}