"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function FloatingName() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeDistance = 300;
  const opacity = Math.max(1 - scrollY / fadeDistance, 0);

  return (
    <div
      style={{ opacity }}
      className="
        fixed top-8 left-8 z-50
        transition-opacity duration-200 ease-out
        pointer-events-none
      "
    >
      <Link
        href="/"
        className="
          pointer-events-auto
          group
          inline-flex items-center
          rounded-2xl
          px-4 py-2
          uppercase
          tracking-[0.35em]
          text-[18px] md:text-[22px]
          font-medium
          text-white/80
          border border-transparent
          transition-all duration-200 ease-out
          hover:text-white
          hover:bg-white/10
          hover:border-white/30
          hover:-translate-y-[1px]
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-white/40
          cursor-pointer
        "
        aria-label="Go to home"
      >
        <span className="relative">
          JUSTIN TOWERY
          <span
            className="
              absolute left-0 -bottom-1 h-px w-full
              bg-white
              opacity-0
              transition-opacity duration-200 ease-out
              group-hover:opacity-100
            "
          />
        </span>
      </Link>
    </div>
  );
}