"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { TextReveal } from "./text-reveal";

export function Contact() {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "start 0.2"],
  });

  const handleCopy = () => {
    navigator.clipboard.writeText("krowslyare00@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const labelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: labelProgress } = useScroll({
    target: labelRef,
    offset: ["start 0.9", "start 0.6"],
  });
  const labelOpacity = useTransform(labelProgress, [0, 1], [0, 1]);

  const ctaOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.3, 0.5], [20, 0]);

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

            {/* CTA */}
            <motion.div
              style={{ opacity: ctaOpacity, y: ctaY }}
              className="flex gap-4"
            >
              <a
                href="https://wa.me/51982104435"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-3 bg-secondary/20 hover:bg-secondary/40 text-foreground transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M12.031 6.172c-5.621 0-10.187 4.566-10.187 10.187 0 1.953.547 3.797 1.484 5.39l-1.328 4.25 4.453-1.297c1.516.828 3.25 1.281 5.094 1.281 5.621 0 10.187-4.566 10.187-10.187 0-5.621-4.566-10.187-10.187-10.187zm0 18.438c-1.688 0-3.266-.453-4.641-1.234l-3.078.906.922-2.922c-.938-1.5-1.453-3.234-1.453-5.063 0-4.641 3.766-8.406 8.406-8.406 4.641 0 8.406 3.766 8.406 8.406 0 4.641-3.766 8.406-8.406 8.406zm4.781-6.172c-.25-.125-1.484-.734-1.719-.813-.234-.078-.406-.125-.578.125-.172.25-.672.813-.813.984-.156.172-.313.188-.563.063-2.625-1.312-3.828-3.094-4.531-4.328-.188-.313 0-.484.141-.625.109-.109.25-.281.375-.422.125-.141.172-.234.25-.391.078-.156.047-.297-.016-.422-.063-.125-.594-1.422-.813-1.953-.219-.516-.438-.453-.609-.453h-.516c-.172 0-.469.063-.719.344-.25.281-.969.938-.969 2.297s.984 2.672 1.125 2.859c.141.188 1.953 2.984 4.719 4.187 2.125.922 2.953.906 3.969.813.984-.094 2.109-.859 2.406-1.688.297-.828.313-2.109.125-3.031-.188-.922-.438-1.047-.688-1.172z"/>
                </svg>
                <span className="font-mono text-sm tracking-wide">
                  WhatsApp
                </span>
              </a>

              <button
                onClick={() => setShowModal(true)}
                className="group inline-flex items-center gap-3 px-6 py-3 bg-secondary/20 hover:bg-secondary/40 text-foreground transition-colors"
                aria-label="Contactar por correo"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-mono text-sm tracking-wide">
                  Correo
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Email Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-zinc-900 border border-white/10 p-8 shadow-2xl"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor">
                  <path d="M1 1L11 11M1 11L11 1" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif text-foreground mb-2">Contacto</h3>
                  <p className="text-sm text-muted-foreground">Copia mi dirección o envíame un correo directamente.</p>
                </div>
                
                <div className="flex items-center gap-2 p-3 bg-white/5 rounded border border-white/10">
                  <code className="flex-1 font-mono text-sm text-foreground/80">
                    krowslyare00@gmail.com
                  </code>
                  <button
                    onClick={handleCopy}
                    className="p-2 hover:bg-white/5 rounded transition-colors text-muted-foreground hover:text-foreground relative"
                    title="Copiar correo"
                  >
                    {copied ? (
                      <span className="text-emerald-500">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M20 6L9 17L4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth="2"/>
                        <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" strokeWidth="2"/>
                      </svg>
                    )}
                  </button>
                </div>

                <a
                  href="mailto:krowslyare00@gmail.com"
                  className="block w-full text-center py-3 bg-foreground text-background font-sans text-sm tracking-wide hover:bg-foreground/90 transition-colors"
                >
                  Abrir cliente de correo
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
