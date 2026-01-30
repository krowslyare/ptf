"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ParagraphReveal } from "./text-reveal";

const projects = [
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

interface ProjectCardProps {
  project: typeof projects[number];
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
      whileHover={{ 
        y: -2,
        transition: { duration: 0.25, ease: "easeOut" }
      }}
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

      <TechTags 
        technologies={project.technologies} 
        parentProgress={scrollYProgress}
      />
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
          <div className="md:col-span-9 space-y-12">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
