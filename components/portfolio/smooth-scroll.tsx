"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis-driven scrolling.
 *
 * Also takes over same-page anchor navigation: Lenis runs its own scroll
 * position, so letting the browser jump natively would fight it and land in the
 * wrong place. Every in-page link is routed through lenis.scrollTo instead.
 *
 * Opted out entirely under prefers-reduced-motion — smoothing is exactly the
 * kind of vestibular motion that setting exists to suppress.
 */
export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      // Slightly long, with a steep ease-out: heavy enough to feel deliberate,
      // not so heavy that the page keeps travelling after the gesture ends.
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
      touchMultiplier: 1.6,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey) return;

      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href*="#"]'
      );
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      event.preventDefault();
      // Clear the fixed header.
      lenis.scrollTo(target as HTMLElement, { offset: -72 });
      history.pushState(null, "", url.hash);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
