"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CharCascade, ScrambleText, WordFade } from "./decode-text";
import { Kana } from "./kana";

/**
 * 黒 — type set large enough to carry the composition on its own, framed by
 * two mono rails and a single accent colour used sparingly enough that it
 * still reads as an accent.
 */

function StatusLine() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour12: false,
          timeZone: "America/Lima",
        })
      );
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 sm:gap-5 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
      <span className="flex items-center gap-2">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
        </span>
        <span className="hidden sm:inline">Available</span>
      </span>
      <span className="h-3 w-px bg-border" />
      <span className="tabular-nums">{time}</span>
      <span className="h-3 w-px bg-border" />
      <span>Lima, PE</span>
    </div>
  );
}

function Grain() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 opacity-[0.035] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative min-h-screen overflow-hidden border-b border-border bg-background"
    >
      <Grain />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1600px] flex-col justify-between px-6 pb-8 pt-24 sm:px-10 md:px-16 lg:px-24">
        {/* ── Top rail ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-start justify-between gap-6"
        >
          <StatusLine />
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            Portfolio / 2026
          </span>
        </motion.div>

        {/* ── Name ─────────────────────────────────────────── */}
        <motion.div
          style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
          className="flex flex-1 items-center py-12"
        >
          <div className="flex w-full items-center gap-6 md:gap-12">
            <div className="min-w-0 flex-1">
              <motion.p
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-brand sm:text-xs"
              >
                <span className="h-px w-8 bg-brand sm:w-14" />
                Software Engineer
              </motion.p>

              <h1 className="font-serif font-medium leading-[0.82] tracking-[-0.02em]">
                <span className="block text-[clamp(3.2rem,15vw,13rem)]">
                  <CharCascade text="HIDEKI" delay={0.35} stagger={0.045} />
                </span>
                <span className="block text-[clamp(3.2rem,15vw,13rem)] text-muted-foreground">
                  <CharCascade
                    text="TOYAMA"
                    delay={0.62}
                    stagger={0.045}
                    onDone={() => setStage(1)}
                  />
                </span>
              </h1>

              {/* Rule that draws itself under the name */}
              <motion.div
                className="mt-8 h-px origin-left bg-border"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />

              <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_1fr] md:gap-16">
                <p className="max-w-xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
                  {stage >= 1 && (
                    <WordFade text="I build web systems end to end — database, app, deploy, maintenance. Client portals, an inventory ERP, and data pipelines. All in production." />
                  )}
                </p>

                {/* Counter rail */}
                <motion.dl
                  initial={{ opacity: 0 }}
                  animate={{ opacity: stage >= 1 ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="flex gap-8 self-start border-l border-border pl-6 font-mono md:gap-10"
                >
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      Live systems
                    </dt>
                    <dd className="mt-1 text-2xl text-brand">08</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      Certs
                    </dt>
                    <dd className="mt-1 text-2xl">05</dd>
                  </div>
                </motion.dl>
              </div>
            </div>

            {/* Vertical kana, second axis of the composition */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="hidden shrink-0 items-center gap-4 self-stretch lg:flex"
            >
              <span className="h-full w-px bg-gradient-to-b from-transparent via-border to-transparent" />
              <Kana
                text="トヤマ ヒデキ"
                className="font-serif text-lg tracking-[0.3em] text-muted-foreground/70"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* ── Bottom rail ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : 12 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col gap-6 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group relative overflow-hidden border border-brand bg-brand px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-background transition-colors hover:bg-transparent hover:text-brand sm:text-xs"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="border border-border px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-foreground sm:text-xs"
            >
              Contact
            </a>
          </div>

          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <ScrambleText text="scroll to begin" delay={1500} speed={30} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
