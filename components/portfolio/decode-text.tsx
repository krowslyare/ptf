"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Intro text effects, all of them layout-stable.
 *
 * The typewriter these replace appended one character at a time, so the line
 * re-wrapped on almost every frame and the text visibly shuffled while it
 * typed. Nothing here ever changes how much space the text occupies:
 *
 * - ScrambleText swaps glyphs, but only for monospaced text, where every glyph
 *   has the same advance width. Same effect, no reflow, and it's the honest
 *   place for it — the technical voice of the page is the mono face.
 * - CharCascade keeps every final glyph in the DOM from the first frame and
 *   animates only opacity and transform, which don't affect layout. That's what
 *   makes it safe for the proportional display face.
 * - WordFade does the same at word granularity for prose.
 */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}=+*#%$&@";

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** ms per resolve step. */
  speed?: number;
  delay?: number;
  onDone?: () => void;
}

export function ScrambleText({
  text,
  className = "",
  speed = 26,
  delay = 0,
  onDone,
}: ScrambleTextProps) {
  // Server-rendered as the final string, so there is no hydration mismatch and
  // the content is correct with JS disabled.
  const [output, setOutput] = useState(text);
  const reduced = useReducedMotion();

  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  });

  useEffect(() => {
    if (reduced) {
      onDoneRef.current?.();
      return;
    }

    let interval: ReturnType<typeof setInterval> | undefined;

    const start = setTimeout(() => {
      let resolved = 0;

      interval = setInterval(() => {
        setOutput(
          text
            .split("")
            .map((char, i) => {
              if (i < resolved || char === " ") return char;
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join("")
        );

        resolved += 1;
        if (resolved > text.length) {
          clearInterval(interval);
          setOutput(text);
          onDoneRef.current?.();
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, speed, delay, reduced]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{output}</span>
    </span>
  );
}

interface CharCascadeProps {
  text: string;
  className?: string;
  delay?: number;
  /** Gap between consecutive characters. */
  stagger?: number;
  onDone?: () => void;
}

export function CharCascade({
  text,
  className = "",
  delay = 0,
  stagger = 0.035,
  onDone,
}: CharCascadeProps) {
  const reduced = useReducedMotion();
  const chars = text.split("");

  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  });

  useEffect(() => {
    if (!onDoneRef.current) return;
    const total = reduced ? 0 : (delay + chars.length * stagger + 0.4) * 1000;
    const timer = setTimeout(() => onDoneRef.current?.(), total);
    return () => clearTimeout(timer);
  }, [delay, stagger, chars.length, reduced]);

  return (
    <span className={className} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          aria-hidden="true"
          className="inline-block"
          initial={{ opacity: 0, y: reduced ? 0 : "0.4em" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : 0.5,
            delay: reduced ? 0 : delay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}

interface WordFadeProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function WordFade({
  text,
  className = "",
  delay = 0,
  stagger = 0.022,
}: WordFadeProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: reduced ? 0 : 0.35,
            delay: reduced ? 0 : delay + i * stagger,
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}
