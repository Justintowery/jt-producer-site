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

  // Fade out over first 300px
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
          px-3 py-2
          border border-transparent
          bg-transparent
          uppercase
          tracking-[0.35em]
          text-[18px] md:text-[22px]
          font-medium
          text-white/85
          transition-all duration-200 ease-out
          hover:text-white
          hover:bg-white/[0.04]
          hover:border-white/15
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-white/25
          cursor-pointer
        "
        aria-label="Go to home"
      >
        <span className="relative">
          JUSTIN TOWERY
          {/* subtle underline that fades in on hover */}
          <span
            className="
              pointer-events-none
              absolute left-0 -bottom-1
              h-px w-full
              bg-white/35
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