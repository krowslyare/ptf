"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ParagraphReveal } from "./text-reveal";

const professionalProjects = [
  {
    title: "Data Engineering Pipeline",
    subtitle: "Azure Dataflow Gen2",
    description:
      "Design and implementation of a data pipeline for ingestion and transformation of orders stored in Azure Data Lake. ETL flow orchestration using Dataflow Gen2, replicating Alteryx-style processes for specific client requirements.",
    technologies: [
      "Azure Data Lake",
      "Microsoft Fabric Dataflow Gen2",
      "SQL",
      "ETL",
    ],
  },
  {
    title: "Data Flow Modernization",
    subtitle: "Databricks",
    description:
      "Migration of complex data flows to Databricks Notebooks using PySpark. Participation in design, testing, and execution of process orchestration through Databricks Jobs.",
    technologies: ["Databricks", "PySpark", "Databricks Jobs"],
  },
  {
    title: "User Management Microservice",
    subtitle: "Azure",
    description:
      "Development of a REST microservice in Java/Spring Boot for user, role, and permission management. Implementation of access control and authorization validations at API level. Integration with notification services for user-related events.",
    technologies: [
      "Java",
      "Spring Boot",
      "Azure App Service",
      "REST API",
      "Docker",
    ],
  },
];

const personalProjects = [
  {
    title: "Kurogrid Client Portal",
    subtitle: "Next.js + Supabase",
    description:
      "Full-stack client onboarding portal with authentication, project state management, and file uploads. Features multi-step forms with draft/submitted/locked states, PostgreSQL database with Row Level Security (RLS), and cloud storage integration for client assets.",
    technologies: [
      "Next.js",
      "React",
      "Supabase",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "PostgreSQL",
    ],
    github: "",
    demo: "https://portal.kurogrid.com",
  },
  {
    title: "Pokorb E-Commerce Platform",
    subtitle: "Next.js + WhatsApp Integration",
    description:
      "Pseudo e-commerce platform for artisan products with catalog browsing, shopping cart, and WhatsApp checkout integration. Features a complaints book (Libro de Reclamaciones) for customer service compliance, product filtering, and direct messaging for order placement. Built with responsive design and optimized for conversion.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "WhatsApp Business API",
      "Framer Motion",
    ],
    github: "",
    demo: "https://pokorb.com",
  },
  {
    title: "VRD Inventory Management System",
    subtitle: "ERP Web Application",
    description:
      "Enterprise Resource Planning system for inventory management with real-time stock tracking, warehouse operations, and movement history. Implements ingreso/salida workflows with database-driven validation, cost freezing, and posting logic. Features authenticated inventory areas, API routes for movements, and Excel export capabilities.",
    technologies: [
      "Next.js",
      "Supabase",
      "TypeScript",
      "React Hook Form",
      "Zod",
      "TanStack Table",
      "Recharts",
      "ExcelJS",
      "Playwright",
      "Sentry",
    ],
    github: "",
    demo: "https://vrd-inv.vercel.app/",
  },
  {
    title: "Self-Hosted Cloud Infrastructure",
    subtitle: "Google Cloud Platform",
    description:
      "Provisioning and management of Linux VMs on GCP for self-hosted services. Configuration of firewall rules, SSH access, and networking. Containerized deployments using Docker, integration with Cloud Storage buckets, and execution of service migrations between environments.",
    technologies: [
      "GCP Compute Engine",
      "Linux",
      "Docker",
      "Cloud Storage",
      "Networking",
    ],
    github: "",
    demo: "",
  },
];

type Project = {
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  confidential?: boolean;
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project }: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.25"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const opacity = useTransform(smoothProgress, [0, 0.5], [0, 1]);
  const y = useTransform(smoothProgress, [0, 0.5], [50, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5], [0.96, 1]);

  return (
    <motion.article
      ref={ref}
      style={{ opacity, y, scale }}
      className="group p-6 md:p-8 border border-border hover:border-foreground hover:bg-foreground/[0.02] transition-all duration-300 ease-out"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
        <div>
          <h3 className="font-serif text-xl md:text-2xl group-hover:underline decoration-1 underline-offset-4">
            {project.title}
          </h3>
          <p className="text-sm font-mono text-muted-foreground mt-1">
            {project.subtitle}
          </p>
        </div>
      </div>

      <ParagraphReveal
        text={project.description}
        className="text-muted-foreground leading-relaxed mb-6"
      />

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <TechTags 
          technologies={project.technologies} 
          parentProgress={scrollYProgress}
        />
      </div>

      {/* Links or Confidential badge */}
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/30">
        {project.confidential ? (
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/50">
            Code confidential
          </span>
        ) : (
          <>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Visit Site
              </a>
            )}
            {!project.github && !project.demo && (
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/50">
                No public links
              </span>
            )}
          </>
        )}
      </div>
    </motion.article>
  );
}

interface TechTagsProps {
  technologies: string[];
  parentProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}

function TechTags({ technologies, parentProgress }: TechTagsProps) {
  const smoothProgress = useSpring(parentProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech, i) => {
        const start = 0.3 + i * 0.06;
        return (
          <TechTag 
            key={tech} 
            tech={tech} 
            progress={smoothProgress}
            range={[start, start + 0.25]}
          />
        );
      })}
    </div>
  );
}

interface TechTagProps {
  tech: string;
  progress: ReturnType<typeof useSpring>;
  range: [number, number];
}

function TechTag({ tech, progress, range }: TechTagProps) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [8, 0]);
  const scale = useTransform(progress, range, [0.9, 1]);

  return (
    <motion.span
      style={{ opacity, y, scale }}
      className="px-2 py-1 text-xs font-mono border border-border text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors duration-200"
      whileHover={{ scale: 1.05 }}
    >
      {tech}
    </motion.span>
  );
}

export function Projects() {
  const labelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: labelProgress } = useScroll({
    target: labelRef,
    offset: ["start 0.9", "start 0.6"],
  });
  const labelOpacity = useTransform(labelProgress, [0, 1], [0, 1]);

  return (
    <section id="projects" className="py-16 sm:py-24 md:py-32 px-10 sm:px-14 md:px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Label */}
          <div className="md:col-span-3" ref={labelRef}>
            <motion.p
              style={{ opacity: labelOpacity }}
              className="text-sm font-mono tracking-widest text-muted-foreground uppercase sticky top-24"
            >
              Projects
            </motion.p>
          </div>

          {/* Content */}
          <div className="md:col-span-9 space-y-20">
            {/* Professional Projects */}
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-center gap-6 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    <h2 className="font-mono text-sm tracking-[0.2em] uppercase text-muted-foreground">
                      Professional
                    </h2>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                </div>
                <p className="text-xs text-muted-foreground/60 font-mono ml-4">
                  Enterprise and client work delivered in consulting environments.
                </p>
              </div>
              <div className="space-y-8">
                {professionalProjects.map((project, index) => (
                  <ProjectCard key={project.title} project={{...project, confidential: true}} index={index} />
                ))}
              </div>
            </div>

            {/* Personal Projects */}
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-center gap-6 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    <h2 className="font-mono text-sm tracking-[0.2em] uppercase text-muted-foreground">
                      Personal
                    </h2>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                </div>
                <p className="text-xs text-muted-foreground/60 font-mono ml-4">
                  Independent builds, experiments, and self-hosted infrastructure.
                </p>
              </div>
              <div className="space-y-8">
                {personalProjects.map((project, index) => (
                  <ProjectCard key={project.title} project={project} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
