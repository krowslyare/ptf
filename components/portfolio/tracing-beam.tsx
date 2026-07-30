"use client";

import React from "react";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function TracingBeam({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, svgHeight]),
    { stiffness: 60, damping: 20 }
  );

  // Measuring once on mount left the beam scaled to a stale height: web fonts
  // land after first paint and reflow the content below them. A ResizeObserver
  // tracks the real height through font swaps and any later layout change.
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const observer = new ResizeObserver(([entry]) => {
      setSvgHeight(entry.contentRect.height);
    });

    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div ref={ref} className="relative w-full">
      {/* Subtle vertical line on the left */}
      <div className="absolute left-4 md:left-6 top-0 bottom-0 hidden md:block w-px">
        {/* Background line - very subtle */}
        <div 
          className="absolute left-0 top-0 w-full h-full bg-border/20"
        />
        
        {/* Progress indicator - elegant line fill */}
        <motion.div
          className="absolute left-0 top-0 w-full bg-gradient-to-b from-primary/80 to-primary/20 via-primary/50"
          style={{ height: y1 }}
        />
      </div>

      <div ref={contentRef} className="relative md:pl-12">
        {children}
      </div>
    </motion.div>
  );
}
