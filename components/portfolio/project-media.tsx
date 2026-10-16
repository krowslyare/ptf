"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { ArrowUpRight, Lock } from "lucide-react";

/**
 * A browser window around a looping screen recording.
 *
 * The video is a progressive enhancement over the poster: it isn't requested
 * until the frame is near the viewport, it only plays while it's actually on
 * screen (a carousel slide scrolled sideways counts as off screen, since
 * IntersectionObserver clips against overflow ancestors), and under
 * prefers-reduced-motion it never loads at all.
 */

interface BrowserFrameProps {
  domain: string;
  href?: string;
  children: ReactNode;
  className?: string;
}

export function BrowserFrame({ domain, href, children, className = "" }: BrowserFrameProps) {
  return (
    <div
      className={`group/frame overflow-hidden border border-border bg-card shadow-[0_30px_70px_-45px_rgb(0_0_0/0.45)] ${className}`}
    >
      <div className="flex h-8 items-center gap-3 border-b border-border px-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-brand/70" />
        </span>
        <span className="min-w-0 flex-1 truncate text-center font-mono text-[10px] tracking-[0.15em] text-muted-foreground">
          {domain}
        </span>
        {href ? (
          <ArrowUpRight
            aria-hidden="true"
            className="h-3.5 w-3.5 text-muted-foreground transition-all duration-300 group-hover/frame:-translate-y-0.5 group-hover/frame:translate-x-0.5 group-hover/frame:text-brand"
          />
        ) : (
          <Lock aria-hidden="true" className="h-3 w-3 text-muted-foreground" />
        )}
      </div>
      <div className="relative aspect-video overflow-hidden bg-neutral-950">{children}</div>
    </div>
  );
}

interface ScreenVideoProps {
  video?: string;
  poster: string;
  alt: string;
  /** "view" loops whenever visible; "hover" waits for pointer or focus on an ancestor `.group`. */
  playOn?: "view" | "hover";
  hovered?: boolean;
  sizes?: string;
  priority?: boolean;
}

export function ScreenVideo({
  video,
  poster,
  alt,
  playOn = "view",
  hovered = false,
  sizes = "(min-width: 768px) 60vw, 90vw",
  priority = false,
}: ScreenVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const el = wrapRef.current;
    if (!el) return;

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: "300px" }
    );
    // A sliver peeking in from the carousel edge shouldn't start playback.
    const playObserver = new IntersectionObserver(
      ([entry]) => setVisible(entry.intersectionRatio >= 0.5),
      { threshold: [0, 0.5, 1] }
    );
    loadObserver.observe(el);
    playObserver.observe(el);
    return () => {
      loadObserver.disconnect();
      playObserver.disconnect();
    };
  }, []);

  const wantLoad = Boolean(video) && !reduced && near && (playOn === "view" || hovered);
  const shouldPlay = wantLoad && visible && (playOn === "view" || hovered);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (shouldPlay) {
      void v.play().catch(() => undefined);
    } else {
      v.pause();
      // Hover previews restart from the top, so each one reads as a fresh tour.
      if (playOn === "hover") v.currentTime = 0;
    }
  }, [shouldPlay, playOn]);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Image
        src={poster}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-top"
      />
      {wantLoad && (
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => {
            setReady(true);
            if (shouldPlay) void videoRef.current?.play().catch(() => undefined);
          }}
          // Cross-fade over the poster instead of flashing black while buffering.
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${
            ready && (playOn === "view" || hovered) ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
