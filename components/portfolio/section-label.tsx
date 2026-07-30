"use client";

import { Reveal } from "./reveal";
import { Kana } from "./kana";

/**
 * The sticky index that names each section. Numbered like sheets in a drawing
 * set, which is what ties the sections back to the hero's grid.
 */
interface SectionLabelProps {
  index: string;
  title: string;
  kana?: string;
  /** Inverted sections (contact) need the light-on-dark treatment. */
  inverted?: boolean;
}

export function SectionLabel({
  index,
  title,
  kana,
  inverted = false,
}: SectionLabelProps) {
  const muted = inverted ? "text-background/50" : "text-muted-foreground";
  const rule = inverted ? "bg-background/20" : "bg-border";
  const accent = inverted ? "text-brand-inv" : "text-brand";

  return (
    <Reveal as="div" y={8} className="sticky top-24 flex flex-col gap-3">
      <span className={`font-mono text-[10px] tracking-[0.3em] ${accent}`}>
        {index}
      </span>
      <span className={`h-px w-10 ${rule}`} />
      <span
        className={`font-mono text-xs uppercase tracking-[0.25em] ${muted}`}
      >
        {title}
      </span>
      {kana && (
        <Kana
          text={kana}
          // w-fit matters: vertical-rl lays the first line against the block's
          // right edge, so a full-width block pushes the kana across the column.
          className={`mt-2 hidden w-fit font-serif text-sm tracking-[0.25em] md:block ${muted} opacity-60`}
        />
      )}
    </Reveal>
  );
}
