"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal, ParagraphReveal } from "./text-reveal";

const skills = {
  technical: [
    "SQL",
    "NoSQL",
    "Python",
    "PySpark",
    "Java",
    "ETL",
    "Modelado de Datos",
    "APIs REST",
    "Spring Boot",
  ],
  platforms: ["Databricks", "Microsoft Fabric", "Azure", "Google Cloud"],
  tools: [
    "Git",
    "GitHub",
    "Apache Airflow",
    "dbt",
    "Alteryx",
    "Power BI",
    "Jupyter Notebook",
  ],
  languages: ["Inglés (Avanzado)", "Portugués (Básico)", "Japonés (Básico)"],
};

const certifications = [
  {
    name: "Fabric Data Engineer Associate (DP-700)",
    issuer: "Microsoft",
    url: "https://learn.microsoft.com/api/credentials/share/en-us/HidekiToyama-6045/12986328E41F0210?sharingId=D3C28140A854C7E4",
  },
  {
    name: "Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
    url: "https://learn.microsoft.com/api/credentials/share/en-us/HidekiToyama-6045/47EC6CA9E57E3CE7?sharingId=D3C28140A854C7E4",
  },
  {
    name: "Azure AI Fundamentals (AI-900)",
    issuer: "Microsoft",
    url: "https://learn.microsoft.com/api/credentials/share/en-us/HidekiToyama-6045/838B5BE475C72ECB?sharingId=D3C28140A854C7E4",
  },
  {
    name: "Azure Data Fundamentals (DP-900)",
    issuer: "Microsoft",
    url: "https://learn.microsoft.com/api/credentials/share/en-us/HidekiToyama-6045/F0CD2327ADA71DA7?sharingId=D3C28140A854C7E4",
  },
];

function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });

  return (
    <div ref={ref} className="space-y-8">
      <TextReveal 
        text="Habilidades" 
        className="font-serif text-2xl"
        as="h3"
      />

      <div className="grid sm:grid-cols-2 gap-8">
        {Object.entries(skills).map(([category, items], catIndex) => {
          const categoryNames: Record<string, string> = {
            technical: "Técnicas",
            platforms: "Plataformas Cloud",
            tools: "Herramientas",
            languages: "Idiomas",
          };
          
          return (
            <SkillCategory 
              key={category}
              name={categoryNames[category]}
              items={items}
              parentProgress={scrollYProgress}
              index={catIndex}
            />
          );
        })}
      </div>
    </div>
  );
}

interface SkillCategoryProps {
  name: string;
  items: string[];
  parentProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
}

function SkillCategory({ name, items, parentProgress, index }: SkillCategoryProps) {
  const opacity = useTransform(
    parentProgress,
    [index * 0.15, index * 0.15 + 0.3],
    [0, 1]
  );
  const y = useTransform(
    parentProgress,
    [index * 0.15, index * 0.15 + 0.3],
    [20, 0]
  );

  return (
    <motion.div style={{ opacity, y }}>
      <p className="text-sm font-mono tracking-wide text-muted-foreground uppercase mb-3">
        {name}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 text-sm border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function CertificationsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.5"],
  });

  return (
    <div ref={ref} className="space-y-6">
      <TextReveal 
        text="Certificaciones" 
        className="font-serif text-2xl"
        as="h3"
      />

      <div className="space-y-4">
        {certifications.map((cert, index) => {
          const start = index * 0.2;
          const end = start + 0.3;
          
          return (
            <CertificationCard 
              key={cert.name}
              cert={cert}
              progress={scrollYProgress}
              range={[start, Math.min(end, 1)]}
            />
          );
        })}
      </div>
    </div>
  );
}

interface CertificationCardProps {
  cert: typeof certifications[number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}

function CertificationCard({ cert, progress, range }: CertificationCardProps) {
  const opacity = useTransform(progress, range, [0, 1]);
  const x = useTransform(progress, range, [-20, 0]);

  return (
    <motion.a
      style={{ opacity, x }}
      href={cert.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start justify-between p-4 border border-border hover:border-foreground transition-colors block"
    >
      <div>
        <p className="font-medium group-hover:underline">
          {cert.name}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {cert.issuer}
        </p>
      </div>
      <svg
        className="w-4 h-4 mt-1 text-muted-foreground group-hover:text-foreground transition-colors"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7 17L17 7M17 7H7M17 7V17"
        />
      </svg>
    </motion.a>
  );
}

export function About() {
  const labelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: labelProgress } = useScroll({
    target: labelRef,
    offset: ["start 0.9", "start 0.6"],
  });
  const labelOpacity = useTransform(labelProgress, [0, 1], [0, 1]);

  return (
    <section id="about" className="py-32 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Label */}
          <div className="md:col-span-3" ref={labelRef}>
            <motion.p
              style={{ opacity: labelOpacity }}
              className="text-sm font-mono tracking-widest text-muted-foreground uppercase sticky top-24"
            >
              Sobre mí
            </motion.p>
          </div>

          {/* Content */}
          <div className="md:col-span-9 space-y-16">
            {/* Bio */}
            <div className="space-y-6">
              <ParagraphReveal
                text="Me gusta construir cosas: software, datos, interfaces, websites y servicios que corren en la nube, tanto en proyectos profesionales como personales."
                className="text-lg text-muted-foreground leading-relaxed"
              />
              <ParagraphReveal
                text="He trabajado entre backend, frontend, datos e infraestructura, adaptándome a lo que cada proyecto necesita. En paralelo, suelo experimentar y aprender montando servidores y servicios por hobby, lo que me ha dado bastante criterio práctico sobre cómo funcionan las cosas en producción."
                className="text-lg text-muted-foreground leading-relaxed"
              />
              <ParagraphReveal
                text="No me identifico mucho con la dinámica de comparación constante de redes profesionales. Prefiero enfocarme en aprender, mejorar y colaborar, sin convertir el trabajo en una vitrina."
                className="text-lg text-muted-foreground leading-relaxed"
              />

              <motion.a 
                href="https://www.pucp.edu.pe/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center gap-6 pt-8 border-t border-border/50 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
              >
                <img 
                  src="/pucp.png" 
                  alt="PUCP" 
                  className="h-20 w-auto dark:invert-0 invert"
                />
                <div className="text-xs md:text-sm tracking-widest uppercase font-mono">
                  <p className="text-foreground font-medium">Pontificia Universidad Católica del Perú</p>
                  <p className="text-muted-foreground mt-1">Ingeniería Informática</p>
                </div>
              </motion.a>
            </div>

            {/* Skills */}
            <SkillsSection />

            {/* Certifications */}
            <CertificationsSection />
          </div>
        </div>
      </div>
    </section>
  );
}
