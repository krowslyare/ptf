"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";

export function UnfocusedLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const blurValue = useMotionValue(40);

  useEffect(() => {
    // Small delay to ensure the effect is visible
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    const controls = animate(blurValue, 0, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.2,
    });

    return () => {
      clearTimeout(timer);
      controls.stop();
    };
  }, [blurValue]);

  const backdropFilter = useTransform(blurValue, (v) => `blur(${v}px)`);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] pointer-events-none"
          style={{
            background: "var(--background)",
          }}
        >
          {/* Blur overlay layers - simulating lens unfocus */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "inherit",
              backdropFilter: backdropFilter,
              WebkitBackdropFilter: backdropFilter,
            }}
          />

          {/* Bokeh circles - lens artifact simulation */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  scale: 1.5,
                  opacity: 0.15,
                }}
                animate={{ 
                  scale: 0,
                  opacity: 0,
                }}
                transition={{ 
                  duration: 1.4,
                  delay: 0.1 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute rounded-full"
                style={{
                  width: `${80 + i * 40}px`,
                  height: `${80 + i * 40}px`,
                  left: `${15 + i * 12}%`,
                  top: `${20 + (i % 3) * 25}%`,
                  background: `radial-gradient(circle, var(--muted-foreground) 0%, transparent 70%)`,
                  filter: "blur(20px)",
                }}
              />
            ))}
          </div>

          {/* Vignette that fades */}
          <motion.div
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, transparent 0%, var(--background) 100%)",
            }}
          />

          {/* Focus ring animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ 
                scale: 2,
                opacity: 0.3,
                borderWidth: 1,
              }}
              animate={{ 
                scale: 0.8,
                opacity: 0,
                borderWidth: 0,
              }}
              transition={{ 
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
              className="rounded-full border-muted-foreground/30"
              style={{
                width: "300px",
                height: "300px",
                borderStyle: "solid",
              }}
            />
          </div>

          {/* Grain texture */}
          <motion.div 
            initial={{ opacity: 0.08 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              opacity: 0.08,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
