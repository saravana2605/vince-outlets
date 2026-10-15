import { useEffect } from "react";
import Lenis from "lenis";

export function useSmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const isCoarse = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: !isCoarse,
    });

    let rafId = 0;
    function update(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(update);
    }
    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
