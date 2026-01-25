"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal } from "./text-reveal";

const experiences = [
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
  {
    company: "AISIN SEIKI",
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
];

interface ExperienceCardProps {
  exp: typeof experiences[number];
  index: number;
}

function ExperienceCard({ exp, index }: ExperienceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [40, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
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
        <p className="text-sm font-mono tracking-wide text-muted-foreground whitespace-nowrap">
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
      </div>
    </motion.div>
  );
}

interface RoleItemProps {
  role: typeof experiences[number]["roles"][number];
  parentProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
}

function RoleItem({ role, parentProgress, index }: RoleItemProps) {
  const start = 0.3 + index * 0.2;
  const opacity = useTransform(parentProgress, [start, start + 0.3], [0, 1]);
  const x = useTransform(parentProgress, [start, start + 0.3], [-15, 0]);

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
          <div className="md:col-span-9 space-y-16">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.company} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
