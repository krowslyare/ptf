"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { BrowserFrame, ScreenVideo } from "./project-media";

export type FeaturedProject = {
  id: string;
  title: string;
  kind: string;
  summary: string;
  stack: string[];
  video?: string;
  poster: string;
  domain: string;
  href?: string;
  status?: string;
};

/**
 * Native scroll-snap does the carousel; JS only tracks which slide is current
 * and drives the buttons. Swipe, trackpad and keyboard all work without it, and
 * the next slide peeks in at the edge so the sideways axis is obvious even
 * before anyone finds the arrows.
 */
export function WorkCarousel({ projects }: { projects: FeaturedProject[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [active, setActive] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      const scroller = scrollerRef.current;
      const target = Math.max(0, Math.min(index, projects.length - 1));
      const slide = scroller?.children.item(target);
      if (!scroller || !(slide instanceof HTMLElement)) return;
      scroller.scrollTo({
        left: slide.offsetLeft,
        behavior: "smooth",
      });
      setActive(target);
    },
    [projects.length]
  );

  const syncActive = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      const scroller = scrollerRef.current;
      if (!scroller) return;
      // At the far end the last slide can't reach the snap line, so the
      // distance test would never pick it. Treat "scrolled to the end" as last.
      if (scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 4) {
        setActive(projects.length - 1);
        return;
      }
      let best = 0;
      let bestDistance = Infinity;
      Array.from(scroller.children).forEach((child, i) => {
        const d = Math.abs((child as HTMLElement).offsetLeft - scroller.scrollLeft);
        if (d < bestDistance) {
          bestDistance = d;
          best = i;
        }
      });
      setActive(best);
    });
  };

  const current = projects[active];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Selected work
            </h2>
          </div>
          <p className="font-serif text-2xl leading-tight sm:text-3xl md:text-4xl">
            Built for businesses here in Peru, and still running.
          </p>
        </div>

        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <span
            className="mr-2 font-mono text-xs tabular-nums text-muted-foreground"
            aria-live="polite"
          >
            <span className="text-foreground">{String(active + 1).padStart(2, "0")}</span>
            {" / "}
            {String(projects.length).padStart(2, "0")}
          </span>
          <CarouselButton
            label="Previous project"
            disabled={active === 0}
            onClick={() => goTo(active - 1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </CarouselButton>
          <CarouselButton
            label="Next project"
            disabled={active === projects.length - 1}
            onClick={() => goTo(active + 1)}
          >
            <ArrowRight className="h-4 w-4" />
          </CarouselButton>
        </div>
      </div>

      {/* Track */}
      <div
        ref={scrollerRef}
        onScroll={syncActive}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            goTo(active + 1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            goTo(active - 1);
          }
        }}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={`Selected work, showing ${current.title}`}
        // Lenis only smooths the vertical axis, but it still listens to wheel
        // events here; opting the track out keeps trackpad swipes native.
        data-lenis-prevent-wheel
        // Fade the peeking slide so it reads as "more this way", not as a
        // cropped paragraph. Dropped on the last slide, which sits flush right.
        style={
          active < projects.length - 1
            ? {
                maskImage: "linear-gradient(to right, #000 var(--fade-at), transparent)",
                WebkitMaskImage: "linear-gradient(to right, #000 var(--fade-at), transparent)",
              }
            : undefined
        }
        className="relative -mx-1 grid [--fade-at:92%] sm:[--fade-at:89%] snap-x snap-mandatory auto-cols-[88%] grid-flow-col gap-4 overflow-x-auto px-1 pb-2 outline-none [scrollbar-width:none] focus-visible:ring-1 focus-visible:ring-brand sm:auto-cols-[86%] sm:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project, i) => (
          <Slide
            key={project.id}
            project={project}
            index={i}
            total={projects.length}
            isActive={i === active}
            onFocusSlide={() => i !== active && goTo(i)}
          />
        ))}
      </div>

      {/* Progress: one segment per slide, each a jump target */}
      <div className="flex items-center gap-1.5" role="tablist" aria-label="Choose a project">
        {projects.map((project, i) => (
          <button
            key={project.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={project.title}
            onClick={() => goTo(i)}
            className="group flex h-6 flex-1 items-center"
          >
            <span
              className={`h-px w-full transition-all duration-500 ${
                i === active
                  ? "h-[2px] bg-brand"
                  : "bg-border group-hover:bg-muted-foreground/60"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function CarouselButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="border border-border p-3 text-muted-foreground transition-colors hover:border-brand/60 hover:text-brand disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border disabled:hover:text-muted-foreground"
    >
      {children}
    </button>
  );
}

function Slide({
  project,
  index,
  total,
  isActive,
  onFocusSlide,
}: {
  project: FeaturedProject;
  index: number;
  total: number;
  isActive: boolean;
  onFocusSlide: () => void;
}) {
  const media = (
    <BrowserFrame domain={project.domain} href={project.href}>
      <ScreenVideo
        video={project.video}
        poster={project.poster}
        alt={`${project.title}, screen recording`}
        priority={index === 0}
      />
    </BrowserFrame>
  );

  return (
    <article
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}: ${project.title}`}
      onFocus={onFocusSlide}
      className={`snap-start transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-40"}`}
    >
      {project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden="true"
          className="block"
        >
          {media}
        </a>
      ) : (
        media
      )}

      <div className="mt-6 grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] md:gap-10">
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="text-brand">{String(index + 1).padStart(2, "0")}</span>
            <span>{project.kind}</span>
            {project.status && (
              <span className="inline-flex items-center gap-1.5 border border-brand/30 bg-brand/10 px-1.5 py-0.5 text-brand">
                <span className="h-1 w-1 animate-pulse rounded-full bg-brand" />
                {project.status}
              </span>
            )}
          </p>
          <h3 className="mt-3 font-serif text-2xl leading-tight md:text-3xl">{project.title}</h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {project.summary}
          </p>
        </div>

        <div className="flex flex-col justify-between gap-5 md:border-l md:border-border md:pl-6">
          <ul className="flex flex-wrap gap-1.5 md:flex-col md:gap-1">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="border border-border px-2 py-1 font-mono text-[11px] text-muted-foreground md:border-0 md:px-0 md:py-0.5"
              >
                {tech}
              </li>
            ))}
          </ul>
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isActive ? 0 : -1}
              className="group/cta inline-flex w-fit items-center gap-2 border-b border-brand/40 pb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-brand transition-colors hover:border-brand"
            >
              Visit site
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <Lock className="h-3 w-3 text-brand" />
              Private · client data
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
