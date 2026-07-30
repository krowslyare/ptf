"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { index: "01", label: "About", href: "#about" },
  { index: "02", label: "Experience", href: "#experience" },
  { index: "03", label: "Projects", href: "#projects" },
  { index: "04", label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Reading position, not a reveal — a progress rail should stay tied to scroll.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 sm:px-10 md:px-16 lg:px-24">
        <Link
          href="#top"
          className="font-serif text-xl tracking-tight transition-opacity hover:opacity-70"
        >
          H.T.
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-baseline gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="text-[9px] text-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {item.index}
              </span>
              <span className="relative">
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" />
              </span>
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={`h-px w-5 bg-foreground transition-all duration-300 ${
              mobileMenuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-foreground transition-all duration-300 ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-foreground transition-all duration-300 ${
              mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Scroll progress */}
      <motion.div
        className="h-px origin-left bg-brand"
        style={{ scaleX: progress }}
      />

      <div
        className={`overflow-hidden bg-background transition-all duration-500 md:hidden ${
          mobileMenuOpen ? "max-h-72 border-b border-border" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-baseline gap-3 border-b border-border/50 py-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="text-[9px] text-brand">{item.index}</span>
              {item.label}
            </Link>
          ))}
          <div className="pt-4">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
