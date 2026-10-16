import { useEffect } from "react";
import Lenis from "lenis";

export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    if (reducedMotion) return;

    // On mobile touchscreens, native momentum scrolling is superior and prevents scroll jank
    const isCoarse = window.matchMedia?.(
      "(hover: none) and (pointer: coarse)",
    )?.matches;
    if (isCoarse) return;

    let lenis: Lenis | null = null;
    let rafId = 0;

    try {
      lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        syncTouch: false,
      });

      function update(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(update);
      }
      rafId = requestAnimationFrame(update);
    } catch (e) {
      console.warn("Smooth scroll initialization bypassed:", e);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) {
        try {
          lenis.destroy();
        } catch {
          // ignore
        }
      }
    };
  }, []);
}
