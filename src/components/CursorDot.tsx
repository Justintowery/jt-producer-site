"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Mode = "default" | "hover";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export default function CursorDot() {
  const reduceMotion = useMemo(() => prefersReducedMotion(), []);
  const rafRef = useRef<number | null>(null);

  const target = useRef({ x: 0, y: 0, has: false });
  const pos = useRef({ x: 0, y: 0 });

  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const [xy, setXy] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Don’t show custom cursor on touch devices
    const isCoarse = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
    if (isCoarse) return;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      target.current.has = true;
      if (!visible) setVisible(true);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => {
      setVisible(false);
      setMode("default");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseleave", onLeave);

    const loop = () => {
      if (!target.current.has) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      if (reduceMotion) {
        pos.current.x = target.current.x;
        pos.current.y = target.current.y;
      } else {
        const ease = 0.22; // calm follow
        pos.current.x += (target.current.x - pos.current.x) * ease;
        pos.current.y += (target.current.y - pos.current.y) * ease;
      }

      // Expand on elements that opt-in: data-cursor="hover"
      const el = document.elementFromPoint(target.current.x, target.current.y) as HTMLElement | null;
      const hoverTarget = el?.closest?.('[data-cursor="hover"]') as HTMLElement | null;
      setMode(hoverTarget ? "hover" : "default");

      setXy({ x: pos.current.x, y: pos.current.y });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  const dotSize = mode === "hover" ? 10 : 6;
  const bloomSize = mode === "hover" ? 18 : 12;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 240ms ease" }}
    >
      {/* soft bloom */}
      <div
        className="absolute rounded-full"
        style={{
          left: xy.x,
          top: xy.y,
          width: bloomSize,
          height: bloomSize,
          background: "rgba(255,255,255,0.12)",
          filter: "blur(8px)",
          transform: "translate(-50%, -50%)",
          transition: reduceMotion ? "none" : "width 180ms ease, height 180ms ease",
        }}
      />
      {/* crisp dot */}
      <div
        className="absolute rounded-full"
        style={{
          left: xy.x,
          top: xy.y,
          width: dotSize,
          height: dotSize,
          background: "rgba(255,255,255,0.85)",
          transform: "translate(-50%, -50%)",
          transition: reduceMotion ? "none" : "width 180ms ease, height 180ms ease",
        }}
      />
    </div>
  );
}