"use client";

import { Reveal } from "./reveal";

/**
 * Text reveals.
 *
 * These used to animate word by word, with each word's opacity mapped to a
 * slice of the container's scroll progress. Words started at 0.08 opacity, so
 * any interrupted scroll left a paragraph sitting unreadable, and a long
 * paragraph could hold a few hundred motion values at once. Both now reveal as
 * a single block; the exported API is unchanged.
 */

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "p" | "h1" | "h2" | "h3" | "span";
}

export function TextReveal({ text, className = "", as: Tag = "p" }: TextRevealProps) {
  return (
    <Reveal className={className} y={12}>
      <Tag>{text}</Tag>
    </Reveal>
  );
}

interface ParagraphRevealProps {
  text: string;
  className?: string;
}

export function ParagraphReveal({ text, className = "" }: ParagraphRevealProps) {
  return (
    <Reveal as="p" className={className} y={14}>
      {text}
    </Reveal>
  );
}
