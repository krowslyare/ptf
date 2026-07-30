"use client";

import type { ElementType, ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * Shared reveal primitives.
 *
 * Everything here is scroll-*triggered*, not scroll-linked: an element animates
 * once when it enters the viewport and then stays put. Driving opacity directly
 * off scroll position (what this file replaces) meant a reveal could stall
 * half-finished if you stopped scrolling, run backwards on the way up, or never
 * complete at all for content near the end of the document, where there is no
 * scroll left to finish it with.
 */

// Ease-out with a long tail: fast to arrive, slow to settle.
const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 0.55;

// Fire slightly before the element is fully on screen, so motion reads as
// already underway rather than as a reaction to the scroll stopping.
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

const motionTags = {
  div: motion.div,
  article: motion.article,
  section: motion.section,
  span: motion.span,
  p: motion.p,
  li: motion.li,
  a: motion.a,
  h2: motion.h2,
  h3: motion.h3,
} as const;

type MotionTag = keyof typeof motionTags;

function useRevealVariants(y: number, duration: number): Variants {
  const reduced = useReducedMotion();

  return {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : duration, ease: EASE },
    },
  };
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Element to render. Defaults to a div. */
  as?: MotionTag;
  /** Vertical travel in px. */
  y?: number;
  delay?: number;
  duration?: number;
  [key: string]: unknown;
}

/** A single block that fades and rises into place when it enters the viewport. */
export function Reveal({
  children,
  className,
  as = "div",
  y = 16,
  delay = 0,
  duration = DURATION,
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion();
  const variants = useRevealVariants(y, duration);
  const Comp = motionTags[as] as ElementType;

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={variants}
      transition={{ delay: reduced ? 0 : delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  as?: MotionTag;
  /** Gap between consecutive children. */
  stagger?: number;
  delay?: number;
  [key: string]: unknown;
}

/**
 * Container that reveals its `StaggerItem` children in sequence. The children
 * inherit the animation state, so the whole group is governed by one viewport
 * observer instead of one per item.
 */
export function Stagger({
  children,
  className,
  as = "div",
  stagger = 0.06,
  delay = 0,
  ...rest
}: StaggerProps) {
  const reduced = useReducedMotion();
  const Comp = motionTags[as] as ElementType;

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduced ? 0 : stagger,
            delayChildren: reduced ? 0 : delay,
          },
        },
      }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: MotionTag;
  y?: number;
  duration?: number;
  [key: string]: unknown;
}

/** A child of `Stagger`. Has no viewport observer of its own by design. */
export function StaggerItem({
  children,
  className,
  as = "div",
  y = 10,
  duration = 0.4,
  ...rest
}: StaggerItemProps) {
  const variants = useRevealVariants(y, duration);
  const Comp = motionTags[as] as ElementType;

  return (
    <Comp className={className} variants={variants} {...rest}>
      {children}
    </Comp>
  );
}
