"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

/**
 * Scroll-triggered entrance. Content stays visible without JS (see the
 * `@media (scripting: enabled)` rule in globals.css) and under reduced motion.
 * Use for below-the-fold content only; the hero uses the CSS `.f-enter` class.
 */
export function Reveal({
  children,
  as: As = "div",
  delay = 0,
  y = 20,
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  /** ms */
  delay?: number;
  /** px of upward travel */
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.dataset.visible = "true";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <As
      ref={ref}
      data-reveal=""
      className={className}
      style={{ "--reveal-delay": `${delay}ms`, "--reveal-y": `${y}px` } as CSSProperties}
    >
      {children}
    </As>
  );
}
