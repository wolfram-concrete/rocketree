"use client";

import { useEffect } from "react";

/**
 * Clean scroll-reveal driver. Replaces the prototype's "frozen-context"
 * rect-sweep safety net (app.js / viz.js) with a single IntersectionObserver:
 *  - `.reveal` elements get `.in` once they enter the viewport (one-shot).
 *  - decorative viz wrappers get `.play` to trigger their one-shot draw.
 * `prefers-reduced-motion` is respected: everything is shown immediately.
 * Renders nothing.
 */
export default function RevealManager() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const vizPlay = Array.from(
      document.querySelectorAll<HTMLElement>(".hero-graph, .mindmap-wrap, .final-viz")
    );

    if (reduce) {
      reveals.forEach((el) => el.classList.add("in"));
      vizPlay.forEach((el) => el.classList.add("play"));
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add(el.classList.contains("reveal") ? "in" : "play");
          obs.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );

    [...reveals, ...vizPlay].forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
