"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "p" | "h1" | "h2" | "h3" | "span";
}

export function TextReveal({ text, className = "", as: Tag = "p" }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.95", "end 0.7"],
  });

  // Suavizar el progreso del scroll para una animación más fluida
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={className}>
      <Tag className="flex flex-wrap">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 3 / words.length; // Rango más amplio para transición más suave
          return (
            <Word key={`${word}-${i}`} progress={smoothProgress} range={[start, Math.min(end, 1)]}>
              {word}
            </Word>
          );
        })}
      </Tag>
    </div>
  );
}

interface WordProps {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}

function Word({ children, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <span className="relative mr-[0.25em] mt-[0.1em]">
      <motion.span style={{ opacity }}>
        {children}
      </motion.span>
    </span>
  );
}

// Character by character reveal for headings
interface CharRevealProps {
  text: string;
  className?: string;
}

export function CharReveal({ text, className = "" }: CharRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.95", "end 0.7"],
  });

  // Suavizar el progreso del scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const chars = text.split("");

  return (
    <div ref={containerRef} className={className}>
      <span className="inline-block">
        {chars.map((char, i) => {
          const start = i / chars.length;
          const end = start + 4 / chars.length; // Rango más amplio
          return (
            <Char key={`${char}-${i}`} progress={smoothProgress} range={[start, Math.min(end, 1)]}>
              {char}
            </Char>
          );
        })}
      </span>
    </div>
  );
}

interface CharProps {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}

function Char({ children, progress, range }: CharProps) {
  const opacity = useTransform(progress, range, [0.1, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre">
      {children}
    </motion.span>
  );
}

// Paragraph reveal with line-by-line animation
interface ParagraphRevealProps {
  text: string;
  className?: string;
}

export function ParagraphReveal({ text, className = "" }: ParagraphRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.6"],
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={className}>
      <p className="inline">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 3 / words.length;
          return (
            <WordSmooth key={`${word}-${i}`} progress={scrollYProgress} range={[start, Math.min(end, 1)]}>
              {word}
            </WordSmooth>
          );
        })}
      </p>
    </div>
  );
}

interface WordSmoothProps {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}

function WordSmooth({ children, progress, range }: WordSmoothProps) {
  const opacity = useTransform(progress, range, [0.08, 1]);
  const y = useTransform(progress, range, [2, 0]);

  return (
    <motion.span 
      style={{ opacity, y }} 
      className="inline-block mr-[0.3em] whitespace-pre"
    >
      {children}
    </motion.span>
  );
}
