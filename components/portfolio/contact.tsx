"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./reveal";
import { TextReveal } from "./text-reveal";

export function Contact() {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText("htoyama.dev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 md:py-32 px-10 sm:px-14 md:px-6 bg-foreground text-background"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Label */}
          <div className="md:col-span-3">
            <Reveal
              as="p"
              y={8}
              className="text-sm font-mono tracking-widest text-background/50 uppercase sticky top-24"
            >
              Contact
            </Reveal>
          </div>

          {/* Content */}
          <div className="md:col-span-9">
            <div className="mb-12">
              <TextReveal
                text="Have a project in mind or a job opportunity? Let's talk."
                className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight"
                as="h2"
              />
            </div>

            {/* CTA */}
            <Reveal className="flex gap-4" delay={0.15}>
              <a
                href="https://wa.me/51982104435"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-3 bg-secondary/20 hover:bg-secondary/40 text-foreground transition-colors"
              >
                <svg
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M26.576 5.363c-2.69-2.69-6.406-4.354-10.511-4.354-8.209 0-14.865 6.655-14.865 14.865 0 2.732 0.737 5.291 2.022 7.491l-0.038-0.070-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h0.006c8.209-0.003 14.862-6.659 14.862-14.868 0-4.103-1.662-7.817-4.349-10.507l0 0zM16.062 28.228h-0.005c-0 0-0.001 0-0.001 0-2.319 0-4.489-0.64-6.342-1.753l0.056 0.031-0.451-0.267-4.675 1.227 1.247-4.559-0.294-0.467c-1.185-1.862-1.889-4.131-1.889-6.565 0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353c0 6.822-5.53 12.353-12.353 12.353h-0zM22.838 18.977c-0.371-0.186-2.197-1.083-2.537-1.208-0.341-0.124-0.589-0.185-0.837 0.187-0.246 0.371-0.958 1.207-1.175 1.455-0.216 0.249-0.434 0.279-0.805 0.094-1.15-0.466-2.138-1.087-2.997-1.852l0.010 0.009c-0.799-0.74-1.484-1.587-2.037-2.521l-0.028-0.052c-0.216-0.371-0.023-0.572 0.162-0.757 0.167-0.166 0.372-0.434 0.557-0.65 0.146-0.179 0.271-0.384 0.366-0.604l0.006-0.017c0.043-0.087 0.068-0.188 0.068-0.296 0-0.131-0.037-0.253-0.101-0.357l0.002 0.003c-0.094-0.186-0.836-2.014-1.145-2.758-0.302-0.724-0.609-0.625-0.836-0.637-0.216-0.010-0.464-0.012-0.712-0.012-0.395 0.010-0.746 0.188-0.988 0.463l-0.001 0.002c-0.802 0.761-1.3 1.834-1.3 3.023 0 0.026 0 0.053 0.001 0.079l-0-0.004c0.131 1.467 0.681 2.784 1.527 3.857l-0.012-0.015c1.604 2.379 3.742 4.282 6.251 5.564l0.094 0.043c0.548 0.248 1.25 0.513 1.968 0.74l0.149 0.041c0.442 0.14 0.951 0.221 1.479 0.221 0.303 0 0.601-0.027 0.889-0.078l-0.031 0.004c1.069-0.223 1.956-0.868 2.497-1.749l0.009-0.017c0.165-0.366 0.261-0.793 0.261-1.242 0-0.185-0.016-0.366-0.047-0.542l0.003 0.019c-0.092-0.155-0.34-0.247-0.712-0.434z"/>
                </svg>
                <span className="font-mono text-sm tracking-wide">
                  WhatsApp
                </span>
              </a>

              <button
                onClick={() => setShowModal(true)}
                className="group inline-flex items-center gap-3 px-6 py-3 bg-secondary/20 hover:bg-secondary/40 text-foreground transition-colors"
                aria-label="Contact by email"
              >
                <svg
                  viewBox="0 -2.5 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
                    <g id="Dribbble-Light-Preview" transform="translate(-300.000000, -922.000000)" fill="currentColor">
                      <g id="icons" transform="translate(56.000000, 160.000000)">
                        <path d="M262,764.291 L254,771.318 L246,764.281 L246,764 L262,764 L262,764.291 Z M246,775 L246,766.945 L254,773.98 L262,766.953 L262,775 L246,775 Z M244,777 L264,777 L264,762 L244,762 L244,777 Z" id="email-[#1573]"></path>
                      </g>
                    </g>
                  </g>
                </svg>
                <span className="font-mono text-sm tracking-wide">
                  Email
                </span>
              </button>
            </Reveal>
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
                  <h3 className="text-xl font-serif text-foreground mb-2">Contact</h3>
                  <p className="text-sm text-muted-foreground">Copy my address or send me an email directly.</p>
                </div>
                
                <div className="flex items-center gap-2 p-3 bg-white/5 rounded border border-white/10">
                  <code className="flex-1 font-mono text-sm text-foreground/80">
                    htoyama.dev@gmail.com
                  </code>
                  <button
                    onClick={handleCopy}
                    className="p-2 hover:bg-white/5 rounded transition-colors text-muted-foreground hover:text-foreground relative"
                    title="Copy email"
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

                <button
                  onClick={() => window.open('https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=htoyama.dev@gmail.com', 'gmail', 'width=800,height=600,left=200,top=200')}
                  className="block w-full text-center py-3 bg-foreground text-background font-sans text-sm tracking-wide hover:bg-foreground/90 transition-colors"
                >
                  Open Gmail
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
