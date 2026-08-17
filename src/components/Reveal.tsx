"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Generic version of the reveal-on-scroll behaviour built into
 *  PageHero/SectionHeading/Card (see ui.tsx) for markup that doesn't go
 *  through those shared primitives — the homepage's bespoke hero, stat bar,
 *  and quick-link/gallery grids.
 *
 *  Renders a plain div, sized `h-full`. That only takes effect when the
 *  parent has a definite height (e.g. a stretched CSS grid row) — inert
 *  everywhere else — so wrapping a grid item here doesn't break equal-height
 *  rows as long as the child itself also carries `h-full` (see usage). */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(16px)",
        transitionDelay: `${Math.min(delay, 400)}ms`,
      }}
      className={`h-full transition-all duration-700 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
