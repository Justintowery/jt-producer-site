"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function FloatingName() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Set initial position
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
          uppercase
          tracking-[0.35em]
          text-[18px]
          md:text-[22px]
          font-medium
          text-white/90
          hover:text-white
          transition-colors duration-200 ease-out
        "
      >
        JUSTIN TOWERY
      </Link>
    </div>
  );
}