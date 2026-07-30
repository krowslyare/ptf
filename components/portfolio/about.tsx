"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "./reveal";
import { TextReveal, ParagraphReveal } from "./text-reveal";

const skills = {
  languages: [
    "Python",
    "SQL",
    "Java",
    "TypeScript/JavaScript"
  ],
  aiLLMs: [
    "Agentic Coding (Claude Code, Cursor, Codex)",
    "Prompt Engineering",
    "RAG",
    "AI Agents",
    "Context Management",
    "Cost Optimization",
    "MCP"
  ],
  webBackend: [
    "Next.js",
    "React",
    "Vite",
    "Node.js",
    "REST APIs",
    "Spring Boot",
    "Microservices"
  ],
  databases: [
    "PostgreSQL",
    "Supabase",
    "Row Level Security",
    "Firebase",
    "Data Modeling",
    "SQL Migrations"
  ],
  cloudData: [
    "Azure",
    "GCP",
    "Microsoft Fabric",
    "BigQuery",
    "Databricks",
    "ETL Pipelines"
  ],
  tools: [
    "Git",
    "Docker",
    "Airflow",
    "dbt",
    "Playwright",
    "Sentry",
    "Power BI",
    "Vercel"
  ]
};

const certifications = [
  {
    name: "Fabric Data Engineer Associate (DP-700)",
    issuer: "Microsoft",
    url: "https://learn.microsoft.com/api/credentials/share/en-us/HidekiToyama-6045/12986328E41F0210?sharingId=D3C28140A854C7E4",
  },
    {
    name: "Azure Developer Associate (AZ-204)",
    issuer: "Microsoft",
    url: "https://learn.microsoft.com/es-mx/users/hidekitoyama-6045/credentials/d9603ca9273b70ac",
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
  const categoryNames: Record<string, string> = {
    languages: "Languages",
    aiLLMs: "AI & LLMs",
    webBackend: "Web & Backend",
    databases: "Databases",
    cloudData: "Cloud & Data",
    tools: "Tools",
  };

  return (
    <div className="space-y-8">
      <TextReveal
        text="Skills"
        className="font-serif text-2xl"
        as="h3"
      />

      <Stagger className="space-y-6" stagger={0.07}>
        {Object.entries(skills).map(([category, items]) => (
          <SkillRow
            key={category}
            name={categoryNames[category]}
            items={items}
          />
        ))}
      </Stagger>
    </div>
  );
}

interface SkillRowProps {
  name: string;
  items: string[];
}

function SkillRow({ name, items }: SkillRowProps) {
  return (
    <StaggerItem
      className="group grid grid-cols-1 sm:grid-cols-[80px_1fr] md:grid-cols-[100px_1fr] gap-1 sm:gap-4 md:gap-8 items-baseline py-3 sm:py-4 border-b border-border/50"
    >
      <span className="text-[10px] sm:text-xs font-mono tracking-wide sm:tracking-widest text-muted-foreground uppercase shrink-0">
        {name}
      </span>
      <p className="text-xs sm:text-sm md:text-base text-foreground leading-relaxed break-words overflow-hidden">
        {items.map((skill, i) => (
          <span key={skill} className="inline">
            <span className="hover:text-foreground/80 transition-colors duration-200 cursor-default">
              {skill}
            </span>
            {i < items.length - 1 && (
              <span className="text-muted-foreground/50 mx-1.5 sm:mx-2">·</span>
            )}
          </span>
        ))}
      </p>
    </StaggerItem>
  );
}

function CertificationsSection() {
  return (
    <div className="space-y-6">
      <TextReveal
        text="Certifications"
        className="font-serif text-2xl"
        as="h3"
      />

      <Stagger className="space-y-4" stagger={0.08}>
        {certifications.map((cert) => (
          <CertificationCard key={cert.name} cert={cert} />
        ))}
      </Stagger>
    </div>
  );
}

interface CertificationCardProps {
  cert: typeof certifications[number];
}

function CertificationCard({ cert }: CertificationCardProps) {
  return (
    <StaggerItem
      as="a"
      y={16}
      href={cert.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start justify-between gap-3 p-3 sm:p-4 border border-border hover:border-foreground hover:bg-foreground/[0.02] transition-all duration-300 ease-out block"
      whileHover={{ 
        x: 4,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm sm:text-base font-medium group-hover:underline decoration-1 underline-offset-4 break-words">
          {cert.name}
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          {cert.issuer}
        </p>
      </div>
      <motion.svg
        className="w-4 h-4 mt-1 text-muted-foreground group-hover:text-foreground transition-colors duration-300 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        initial={{ x: 0, y: 0 }}
        whileHover={{ x: 2, y: -2 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7 17L17 7M17 7H7M17 7V17"
        />
      </motion.svg>
    </StaggerItem>
  );
}

export function About() {
  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 px-10 sm:px-14 md:px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Label */}
          <div className="md:col-span-3">
            <Reveal
              as="p"
              y={8}
              className="text-sm font-mono tracking-widest text-muted-foreground uppercase sticky top-24"
            >
              About
            </Reveal>
          </div>

          {/* Content */}
          <div className="md:col-span-9 space-y-10 sm:space-y-12 md:space-y-16">
            {/* Bio */}
            <div className="space-y-4 sm:space-y-6">
              <ParagraphReveal
                text="I work across backend, frontend, data, and infrastructure. In practice that means I usually end up owning a project from the database schema to the domain it runs on—which is what the teams I work with actually need."
                className="text-base sm:text-lg text-muted-foreground leading-relaxed"
              />
              <ParagraphReveal
                text="At EY I worked on ETL pipelines and financial data analysis for forensic audits, plus a Spring Boot microservice for authentication and access control. On my own I build and maintain web systems for businesses in Peru: a multi-tenant client portal, an inventory ERP for a mining contractor, and the sites in front of them."
                className="text-base sm:text-lg text-muted-foreground leading-relaxed"
              />
              <ParagraphReveal
                text="Most of what I know about production I learned self-hosting: VMs, containers, DNS, backups, and the migrations that go wrong at 2am."
                className="text-base sm:text-lg text-muted-foreground leading-relaxed"
              />

              <Reveal
                as="a"
                href="https://www.pucp.edu.pe/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 sm:gap-4 md:gap-6 pt-6 sm:pt-8 border-t border-border/50 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
              >
                <Image
                  src="/pucp.png" 
                  alt="PUCP" 
                  width={240}
                  height={240}
                  className="h-10 sm:h-14 md:h-20 w-auto dark:invert-0 invert shrink-0"
                />
                <div className="text-[9px] sm:text-xs md:text-sm tracking-wide sm:tracking-widest uppercase font-mono min-w-0">
                  <p className="text-foreground font-medium break-words">Pontificia Universidad Católica del Perú</p>
                  <p className="text-muted-foreground mt-1">Computer Science</p>
                </div>
              </Reveal>
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
