import { useEffect, useRef, useState, useCallback } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>";
const STEP_MS = 35;
const MAX_STEPS = 20;

function getRandomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

interface ScrambleTextProps {
  children: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p" | "div";
  triggerOnHover?: boolean;
  triggerOnArrival?: boolean;
  delay?: number;
}

export function ScrambleText({
  children,
  className = "",
  as: Component = "span",
  triggerOnHover = true,
  triggerOnArrival = true,
  delay = 0,
}: ScrambleTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [displayText, setDisplayText] = useState(children);
  const isRunningRef = useRef(false);
  const originalText = children;

  const runDecode = useCallback(() => {
    if (isRunningRef.current) return;
    if (typeof window === "undefined") return;

    const reducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    if (reducedMotion) {
      setDisplayText(originalText);
      return;
    }

    isRunningRef.current = true;
    const len = originalText.length;
    const stepCount = Math.max(1, Math.ceil(len / MAX_STEPS));
    let resolved = 0;

    const timer = setInterval(() => {
      resolved += stepCount;

      let result = "";
      for (let i = 0; i < len; i++) {
        const char = originalText[i];
        if (
          char === " " ||
          char === "\n" ||
          char === "\t" ||
          char === "—" ||
          char === "-"
        ) {
          result += char;
        } else if (i < resolved) {
          result += char;
        } else {
          result += getRandomGlyph();
        }
      }

      setDisplayText(result);

      if (resolved >= len) {
        clearInterval(timer);
        isRunningRef.current = false;
        setDisplayText(originalText);
      }
    }, STEP_MS);
  }, [originalText]);

  useEffect(() => {
    if (
      !triggerOnArrival ||
      !containerRef.current ||
      typeof window === "undefined"
    )
      return;
    const el = containerRef.current;

    let timeoutId: number;
    if (typeof IntersectionObserver === "undefined") {
      timeoutId = window.setTimeout(runDecode, delay);
      return () => clearTimeout(timeoutId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          timeoutId = window.setTimeout(runDecode, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [triggerOnArrival, runDecode, delay]);

  const setRef = useCallback((node: HTMLElement | null) => {
    containerRef.current = node;
  }, []);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      runDecode();
    }
  };

  return (
    <Component
      ref={setRef}
      onMouseEnter={handleMouseEnter}
      className={`inline-block tracking-tight ${className}`}
    >
      <span aria-hidden="true">{displayText}</span>
      <span className="sr-only">{children}</span>
    </Component>
  );
}
