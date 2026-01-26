"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal } from "./text-reveal";

const contactInfo = {
  email: "krowslyare00@gmail.com",
  phone: "+51 982 104 435",
};

function ContactItem({ 
  label, 
  value, 
  href,
  progress,
  index 
}: { 
  label: string; 
  value: string; 
  href?: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
}) {
  const start = 0.3 + index * 0.15;
  const opacity = useTransform(progress, [start, start + 0.25], [0, 1]);
  const x = useTransform(progress, [start, start + 0.25], [-30, 0]);

  const content = (
    <>
      <p className="text-sm font-mono tracking-wide text-background/50 uppercase mb-2">
        {label}
      </p>
      <span className="text-xl md:text-2xl font-light">
        {value}
      </span>
    </>
  );

  return (
    <motion.div style={{ opacity, x }} className="group">
      {href ? (
        <a
          href={href}
          className="block hover:underline underline-offset-4 decoration-1"
        >
          {content}
        </a>
      ) : (
        <div>{content}</div>
      )}
    </motion.div>
  );
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "start 0.2"],
  });

  const labelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: labelProgress } = useScroll({
    target: labelRef,
    offset: ["start 0.9", "start 0.6"],
  });
  const labelOpacity = useTransform(labelProgress, [0, 1], [0, 1]);

  const ctaOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.7, 0.9], [30, 0]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 px-6 bg-foreground text-background"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Label */}
          <div className="md:col-span-3" ref={labelRef}>
            <motion.p
              style={{ opacity: labelOpacity }}
              className="text-sm font-mono tracking-widest text-background/50 uppercase sticky top-24"
            >
              Contacto
            </motion.p>
          </div>

          {/* Content */}
          <div className="md:col-span-9">
            <div className="mb-12">
              <TextReveal
                text="¿Tienes un proyecto en mente o una oportunidad laboral? Hablemos."
                className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight"
                as="h2"
              />
            </div>

            <div className="space-y-8">
              <ContactItem
                label="Email"
                value={contactInfo.email}
                href={`mailto:${contactInfo.email}`}
                progress={scrollYProgress}
                index={0}
              />

              <ContactItem
                label="Teléfono"
                value={contactInfo.phone}
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                progress={scrollYProgress}
                index={1}
              />
            </div>

            {/* CTA */}
            <motion.div
              style={{ opacity: ctaOpacity, y: ctaY }}
              className="mt-16"
            >
              <a
                href={`mailto:${contactInfo.email}`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-background text-foreground font-sans text-sm tracking-wide hover:bg-background/90 transition-colors group"
              >
                <span>Enviar mensaje</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
