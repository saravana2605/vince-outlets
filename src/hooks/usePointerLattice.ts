import { useEffect } from "react";

export function usePointerLattice() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const isCoarse = window.matchMedia(
      "(hover: none) and (pointer: coarse)",
    ).matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || isCoarse) {
      // On mobile / coarse or reduced motion, avoid running rAF loops entirely
      return;
    }

    const rootStyle = document.documentElement.style;
    let tx = -9999;
    let ty = -9999;
    let x = -9999;
    let y = -9999;
    let lx = -9999;
    let ly = -9999;
    let isRunning = false;
    let raf = 0;
    let last = performance.now();

    const LERP = 0.14;
    const LAG = 0.05;

    const loop = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;

      const a = 1 - Math.pow(1 - LERP, dt / 16.67);
      const b = 1 - Math.pow(1 - LAG, dt / 16.67);

      x += (tx - x) * a;
      y += (ty - y) * a;
      lx += (tx - lx) * b;
      ly += (ty - ly) * b;

      rootStyle.setProperty("--pointer-x", `${x.toFixed(1)}px`);
      rootStyle.setProperty("--pointer-y", `${y.toFixed(1)}px`);
      rootStyle.setProperty("--pointer-lag-x", `${lx.toFixed(1)}px`);
      rootStyle.setProperty("--pointer-lag-y", `${ly.toFixed(1)}px`);

      // Settle condition: if coordinates are practically at target, stop rAF loop to save CPU
      if (
        Math.abs(tx - x) < 0.2 &&
        Math.abs(ty - y) < 0.2 &&
        Math.abs(lx - x) < 0.2 &&
        Math.abs(ly - y) < 0.2
      ) {
        isRunning = false;
        return;
      }

      raf = requestAnimationFrame(loop);
    };

    const handlePointerMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (x === -9999) {
        x = lx = tx;
        y = ly = ty;
        rootStyle.setProperty("--pointer-x", `${x.toFixed(1)}px`);
        rootStyle.setProperty("--pointer-y", `${y.toFixed(1)}px`);
        rootStyle.setProperty("--pointer-lag-x", `${lx.toFixed(1)}px`);
        rootStyle.setProperty("--pointer-lag-y", `${ly.toFixed(1)}px`);
      }
      if (!isRunning) {
        isRunning = true;
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(raf);
    };
  }, []);
}
