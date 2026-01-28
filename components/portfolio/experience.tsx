"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { TextReveal } from "./text-reveal";

const experienceSections = [
  {
    title: "Profesional",
    experiences: [
      {
        company: "Ernst & Young (EY)",
        location: "San Isidro, Perú",
        period: "2024 — 2025",
        roles: [
          {
            title: "Analista de Datos / Data Engineer",
            level: "Intern → Staff",
            tasks: [
              "Procesamiento, transformación y análisis de datos financieros (ETL) para auditorías forenses y detección de anomalías.",
              "Preparación y validación de datasets para flujos de Ingeniería de Datos y consumo analítico.",
            ],
          },
          {
            title: "Desarrollo de Software",
            tasks: [
              "Desarrollo de microservicio e integración frontend para autenticación, roles y control de accesos.",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Freelance",
    experiences: [
      {
        company: "Proyectos Independientes",
        location: "Remoto",
        period: "2025 — Presente",
        showcase: [
          {
            name: "SMVA",
            href: "https://smva.com.pe",
            logo: "/smva.png",
          },
        ],
        roles: [
          {
            title: "Desarrollador Web",
            tasks: [
              "Diseño y desarrollo de landing pages totalmente responsivas, enfocadas en conversión y experiencia de usuario.",
              "Gestión integral del ciclo de vida web: desde configuración de dominios y hosting hasta despliegue y optimización.",
              "Integración de servicios de contacto y notificaciones para facilitar la interacción con clientes.",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Operativo",
    experiences: [
      {
        company: "Aisin Seiki",
        subtitle: "Nishio Die-Casting Plant",
        location: "Aichi, Japón",
        period: "2021 — 2022",
        roles: [
          {
            title: "Operador de maquinaria y control de calidad",
            tasks: [
              "Operación de maquinaria industrial y ejecución de controles de calidad bajo estándares productivos.",
            ],
          },
        ],
      },
      {
        company: "Toyota",
        subtitle: "Boshoku Seiko Corporation",
        location: "Aichi, Japón",
        period: "2021",
        roles: [
          {
            title: "Operador de ensamblaje",
            tasks: [
              "Ensamblaje de asientos automotrices y verificación básica de calidad en línea de producción bajo estándares industriales.",
            ],
          },
        ],
      },
    ],
  },
];

type Experience = typeof experienceSections[number]["experiences"][number];

interface ExperienceCardProps {
  exp: Experience;
  index: number;
}

function ExperienceCard({ exp, index }: ExperienceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const opacity = useTransform(smoothProgress, [0, 0.5], [0, 1]);
  const y = useTransform(smoothProgress, [0, 0.5], [50, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <TextReveal
            text={exp.company}
            className="font-serif text-2xl"
            as="h3"
          />
          {exp.subtitle && (
            <p className="text-muted-foreground">{exp.subtitle}</p>
          )}
          <p className="text-sm text-muted-foreground mt-1">
            {exp.location}
          </p>
        </div>

        <p className="text-sm font-mono tracking-wide text-muted-foreground whitespace-nowrap pt-2 sm:pt-0">
          {exp.period}
        </p>
      </div>

      <div className="space-y-6 border-l border-border pl-6">
        {exp.roles.map((role, roleIndex) => (
          <RoleItem 
            key={role.title} 
            role={role} 
            parentProgress={scrollYProgress}
            index={roleIndex}
          />
        ))}

        {/* @ts-ignore */}
        {exp.showcase && (
          <div className="pt-4">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/50 mb-3 ml-0.5">
              Algunos ejemplos
            </p>
            <div className="flex flex-wrap gap-3">
              {/* @ts-ignore */}
              {exp.showcase.map((project) => (
                <a
                  key={project.name}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-24 h-14 flex items-center justify-center rounded bg-secondary/10 hover:bg-secondary/20 border border-white/5 hover:border-white/10 transition-all duration-300"
                  title={`Visitar ${project.name}`}
                >
                  {/* @ts-ignore */}
                  <img 
                    src={project.logo} 
                    alt={project.name} 
                    className="w-full h-full object-contain p-1.5 opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" 
                  />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface RoleItemProps {
  role: Experience["roles"][number];
  parentProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
}

function RoleItem({ role, parentProgress, index }: RoleItemProps) {
  const smoothProgress = useSpring(parentProgress, { stiffness: 50, damping: 20 });
  const start = 0.2 + index * 0.15;
  const opacity = useTransform(smoothProgress, [start, start + 0.3], [0, 1]);
  const x = useTransform(smoothProgress, [start, start + 0.3], [-20, 0]);

  return (
    <motion.div style={{ opacity, x }}>
      <div className="flex items-center gap-3 mb-3">
        <h4 className="font-medium">{role.title}</h4>
        {role.level && (
          <span className="text-xs font-mono px-2 py-0.5 bg-foreground text-background">
            {role.level}
          </span>
        )}
      </div>
      <ul className="space-y-2">
        {role.tasks.map((task) => (
          <li
            key={task}
            className="text-muted-foreground leading-relaxed flex gap-3"
          >
            <span className="text-foreground/30 mt-1.5">—</span>
            <span>{task}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Experience() {
  const labelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: labelProgress } = useScroll({
    target: labelRef,
    offset: ["start 0.9", "start 0.6"],
  });
  const labelOpacity = useTransform(labelProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="py-32 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Label */}
          <div className="md:col-span-3" ref={labelRef}>
            <motion.p
              style={{ opacity: labelOpacity }}
              className="text-sm font-mono tracking-widest text-muted-foreground uppercase sticky top-24"
            >
              Experiencia
            </motion.p>
          </div>

          {/* Content */}
          <div className="md:col-span-9 space-y-24">
            {experienceSections.map((section) => (
              <div key={section.title} className="relative">
                <div className="flex items-center gap-6 mb-12">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    <h2 className="font-mono text-sm tracking-[0.2em] uppercase text-muted-foreground">
                      {section.title}
                    </h2>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                </div>
                
                <div className="space-y-16">
                  {section.experiences.map((exp, index) => (
                    <ExperienceCard key={exp.company} exp={exp} index={index} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
