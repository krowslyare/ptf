"use client";

import { useEffect, useState } from "react";

/**
 * Vertical kana motif.
 *
 * The kana come from whatever mincho the visitor's OS ships, because next/font
 * can't deliver a japanese subset here. A machine with no CJK font would draw
 * notdef boxes, so the glyphs are measured first and the motif simply doesn't
 * render when they're unavailable. Decoration must never degrade into damage.
 */

const JP_STACK =
  '"Yu Mincho", "YuMincho", "Hiragino Mincho ProN", "Noto Serif CJK JP", "Noto Serif JP", "Source Han Serif", serif';

function canRender(sample: string) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return false;

  // A private-use codepoint has no glyph anywhere, so its advance width is the
  // notdef box. Anything matching that width is missing too.
  ctx.font = `64px ${JP_STACK}`;
  const target = ctx.measureText(sample).width;
  const notdef = ctx.measureText("").width;

  return target > 0 && Math.abs(target - notdef) > 0.5;
}

interface KanaProps {
  text: string;
  className?: string;
}

export function Kana({ text, className = "" }: KanaProps) {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(canRender(text));
  }, [text]);

  if (!supported) return null;

  return (
    <span
      aria-hidden="true"
      className={`text-vertical select-none ${className}`}
      style={{ fontFamily: JP_STACK }}
    >
      {text}
    </span>
  );
}
