"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Typewriter effect with blinking cursor
function TypewriterText({ 
  text, 
  delay = 0,
  speed = 50,
  className = "",
  onComplete
}: { 
  text: string; 
  delay?: number;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const reduced = useReducedMotion();

  // Held in a ref so it stays out of the effect's dependencies. Call sites pass
  // inline arrows, and those change identity on every render: with onComplete
  // in the deps, the effect re-ran the moment its own callback set state, and
  // the line typed itself a second time.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    if (reduced) {
      setDisplayed(text);
      onCompleteRef.current?.();
      return;
    }

    let interval: ReturnType<typeof setInterval> | undefined;

    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      let i = 0;
      interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          onCompleteRef.current?.();
        }
      }, speed);
    }, delay);

    // The previous cleanup for this interval was returned from inside the
    // setTimeout callback, where React never saw it, so it leaked on unmount.
    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, [text, delay, speed, reduced]);

  // Cursor blink
  useEffect(() => {
    if (reduced) return;
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, [reduced]);

  return (
    <span className={className}>
      {displayed}
      <span 
        className={`inline-block w-[2px] h-[1em] bg-foreground ml-1 align-middle ${
          showCursor && isTyping ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-100`}
      />
    </span>
  );
}

// Glitch text effect - occasional distortion
function GlitchText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    // Each cycle schedules the next one, so the pending id has to be tracked
    // across cycles: clearing only the first timeout left the chain running
    // after unmount.
    let nextTimeout: ReturnType<typeof setTimeout>;
    let resetTimeout: ReturnType<typeof setTimeout>;

    const triggerGlitch = () => {
      setIsGlitching(true);
      setGlitchOffset({
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 2,
      });

      resetTimeout = setTimeout(() => {
        setIsGlitching(false);
        setGlitchOffset({ x: 0, y: 0 });
      }, 100 + Math.random() * 100);
    };

    // Random glitch every 3-8 seconds
    const scheduleGlitch = () => {
      nextTimeout = setTimeout(() => {
        triggerGlitch();
        scheduleGlitch();
      }, 3000 + Math.random() * 5000);
    };

    scheduleGlitch();
    return () => {
      clearTimeout(nextTimeout);
      clearTimeout(resetTimeout);
    };
  }, [reduced]);

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Main text */}
      <span className="relative z-10">{children}</span>
      
      {/* Glitch layers */}
      {isGlitching && (
        <>
          <span 
            className="absolute inset-0 text-foreground/80 z-0"
            style={{ 
              transform: `translate(${glitchOffset.x}px, ${glitchOffset.y}px)`,
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
            }}
          >
            {children}
          </span>
          <span 
            className="absolute inset-0 text-foreground/60 z-0"
            style={{ 
              transform: `translate(${-glitchOffset.x}px, ${-glitchOffset.y}px)`,
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
            }}
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
}

// Scan lines overlay
function ScanLines() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none z-20 opacity-[0.03]"
      style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          currentColor 2px,
          currentColor 4px
        )`,
        backgroundSize: '100% 4px',
      }}
    />
  );
}

// Noise grain texture
function NoiseGrain() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none z-10 opacity-[0.02] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

// Terminal-style status line
function StatusLine() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-[10px] tracking-widest text-muted-foreground/60 flex items-center gap-2 sm:gap-4 flex-wrap">
      <span className="hidden sm:inline">SYS.ACTIVE</span>
      <span className="hidden sm:inline w-px h-3 bg-muted-foreground/30" />
      <span>{time}</span>
      <span className="w-px h-3 bg-muted-foreground/30" />
      <span>LIMA, PE</span>
    </div>
  );
}

// Animated border frame
function BorderFrame() {
  return (
    <div className="absolute inset-4 sm:inset-8 md:inset-12 lg:inset-16 pointer-events-none">
      {/* Corner marks */}
      <div className="absolute top-0 left-0 w-8 h-8">
        <div className="absolute top-0 left-0 w-full h-px bg-foreground/20" />
        <div className="absolute top-0 left-0 w-px h-full bg-foreground/20" />
      </div>
      <div className="absolute top-0 right-0 w-8 h-8">
        <div className="absolute top-0 right-0 w-full h-px bg-foreground/20" />
        <div className="absolute top-0 right-0 w-px h-full bg-foreground/20" />
      </div>
      <div className="absolute bottom-0 left-0 w-8 h-8">
        <div className="absolute bottom-0 left-0 w-full h-px bg-foreground/20" />
        <div className="absolute bottom-0 left-0 w-px h-full bg-foreground/20" />
      </div>
      <div className="absolute bottom-0 right-0 w-8 h-8">
        <div className="absolute bottom-0 right-0 w-full h-px bg-foreground/20" />
        <div className="absolute bottom-0 right-0 w-px h-full bg-foreground/20" />
      </div>
    </div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], ["0%", "10%"]);

  const handleTitleComplete = useCallback(() => {
    setShowSubtitle(true);
  }, []);

  const handleSubtitleComplete = useCallback(() => {
    setShowDescription(true);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-10 sm:px-14 md:px-6 pt-20 relative overflow-hidden bg-background"
    >
      <ScanLines />
      <NoiseGrain />
      <BorderFrame />

      <motion.div 
        className="max-w-4xl mx-auto relative z-10"
        style={{ opacity, y }}
      >
        {/* Top status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-12"
        >
          <StatusLine />
        </motion.div>

        {/* Main title */}
        <div className="mb-6">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.9]">
            <GlitchText>
              <TypewriterText 
                text="Hideki" 
                delay={500} 
                speed={80}
              />
            </GlitchText>
          </h1>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.9] mt-2">
            <GlitchText>
              <TypewriterText 
                text="Toyama" 
                delay={1200} 
                speed={80}
                onComplete={handleTitleComplete}
              />
            </GlitchText>
          </h1>
        </div>

        {/* Role subtitle */}
        <div className="mb-6 sm:mb-8 min-h-[32px]">
          {showSubtitle && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 sm:gap-3"
            >
              <span className="w-6 sm:w-12 h-px bg-foreground shrink-0" />
              <span className="font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground uppercase">
                <TypewriterText 
                  text="Software & Data Engineer" 
                  speed={30}
                  onComplete={handleSubtitleComplete}
                />
              </span>
            </motion.div>
          )}
        </div>

        {/* Description */}
        <div className="mb-8 sm:mb-12 min-h-[60px] sm:min-h-[80px]">
          {showDescription && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed font-light"
            >
              <TypewriterText
                text="I build web systems end to end — database, app, deploy, maintenance."
                speed={20}
              />
              <br />
              <TypewriterText
                text="Client portals, an inventory ERP, and data pipelines. All in production."
                delay={1600}
                speed={20}
                onComplete={() => setShowCTA(true)}
              />
            </motion.div>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="min-h-[50px]">
          {showCTA && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap gap-3 sm:gap-4"
            >
              <a
                href="#projects"
                className="group relative px-4 sm:px-6 py-2.5 sm:py-3 bg-foreground text-background font-mono text-[10px] sm:text-xs tracking-widest uppercase overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10">View projects</span>
              </a>
              <a
                href="#contact"
                className="group px-4 sm:px-6 py-2.5 sm:py-3 border border-foreground/30 text-foreground font-mono text-[10px] sm:text-xs tracking-widest uppercase hover:border-foreground transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Contact
              </a>
            </motion.div>
          )}
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showCTA ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-[-80px] sm:bottom-[-120px] left-0 hidden sm:block"
        >
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-px h-16 bg-gradient-to-b from-foreground/50 to-transparent"
              animate={{ scaleY: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase writing-vertical">
              scroll
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Version mark */}
      <motion.div 
        className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 font-mono text-[10px] tracking-widest text-muted-foreground/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        v.2026
      </motion.div>
    </section>
  );
}
