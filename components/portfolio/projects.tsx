"use client";

import { Reveal, Stagger, StaggerItem } from "./reveal";

const enterpriseProjects = [
  {
    title: "Data Engineering Pipeline",
    subtitle: "Azure Dataflow Gen2",
    description:
      "Data pipeline for ingestion and transformation of orders stored in Azure Data Lake. ETL orchestration with Dataflow Gen2, replicating Alteryx-style processes required by the client.",
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
      "Migration of legacy data flows to Databricks notebooks using PySpark, and orchestration of the resulting processes through Databricks Jobs. Involved in design, testing, and rollout.",
    technologies: ["Databricks", "PySpark", "Databricks Jobs"],
  },
  {
    title: "User Management Microservice",
    subtitle: "Azure",
    description:
      "REST microservice in Java/Spring Boot for users, roles, and permissions. Access control and authorization checks enforced at the API layer, with integration into notification services for user events.",
    technologies: [
      "Java",
      "Spring Boot",
      "Azure App Service",
      "REST API",
      "Docker",
    ],
  },
];

const clientProjects = [
  {
    title: "Kurogrid Portal",
    subtitle: "Multi-tenant client portal · Next.js + Supabase",
    description:
      "The operational backbone of the studio: clients handle billing, support requests and web metrics in one place, while the team runs everything from an admin panel. Organized as sixteen domain modules — billing, analytics, site health, complaints book, change requests, leads, reports, internal finance — each split into pure domain logic, server access, and UI. Tenant isolation enforced in PostgreSQL with Row Level Security; Playwright smoke tests gate every deploy.",
    technologies: [
      "Next.js 16",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Row Level Security",
      "Tailwind v4",
      "Playwright",
      "Sentry",
    ],
    demo: "https://portal.kurogrid.com",
  },
  {
    title: "Kurogrid",
    subtitle: "Studio site · Next.js",
    description:
      "Public site for the studio: service pages, MDX-driven blog, and interactive product demos built with React Three Fiber. Leads are captured into Supabase with UTM attribution carried through to the portal, and a per-tenant complaints book API serves the client sites that need one.",
    technologies: [
      "Next.js",
      "TypeScript",
      "React Three Fiber",
      "MDX",
      "Supabase",
      "Framer Motion",
      "Vitest",
    ],
    demo: "https://kurogrid.com",
  },
  {
    title: "VRD Inventory ERP",
    subtitle: "Industrial B2B system · Next.js + Supabase",
    description:
      "Inventory and logistics system for a mining contractor. Multi-warehouse stock with a transactional kardex: balances and costs are computed atomically in the database, so concurrent movements can't drift. Built around fast data entry — dense tables, keyboard-first flows, Excel import and export — over 80 SQL migrations and roles hardened with RLS.",
    technologies: [
      "Next.js",
      "Supabase",
      "PostgreSQL",
      "TypeScript",
      "Zod",
      "TanStack Table",
      "ExcelJS",
      "Playwright",
      "Sentry",
    ],
    demo: "https://portal.vrdmincon.com.pe",
  },
  {
    title: "VRD Corporate Site",
    subtitle: "Static site · Next.js 16",
    description:
      "Institutional site for the same contractor, deployed separately from the ERP so neither can take the other down. Fully static for SEO, with every text, service, KPI and image centralized in a single content file the client's team can edit without touching components.",
    technologies: ["Next.js 16", "React 19", "Tailwind v4", "GSAP", "Three.js"],
    demo: "https://vrdmincon.com.pe",
  },
  {
    title: "Ezcuadro",
    subtitle: "Custom canvas prints · Next.js + Firebase",
    description:
      "Storefront for a made-to-order canvas printing business in Lima. Quote builder with real-time size and price comparison, filterable catalog, blog, and a Peruvian complaints book for regulatory compliance. Orders close over WhatsApp, which is how the business already sold.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Firebase",
      "GSAP",
      "Lenis",
      "Leaflet",
    ],
    demo: "https://www.ezcuadro.com",
  },
  {
    title: "Ezcuadro Backoffice",
    subtitle: "Admin consolidation · Vite + React",
    description:
      "The store's internal tools had grown into eight isolated pages, each with its own login form and its own diverging CSS — and every admin deploy risked the public site. I pulled them out into a single SPA with one auth provider, role-based route guards, and one set of design tokens. The storefront and the panel now ship independently.",
    technologies: [
      "Vite",
      "React",
      "TypeScript",
      "React Router",
      "Firebase Auth",
      "Leaflet",
    ],
    github: "https://github.com/krowslyare/ezcuadro_portal",
    demo: "https://portal.ezcuadro.com",
  },
  {
    title: "SMVA",
    subtitle: "Corporate landing · Next.js",
    description:
      "Site for a mining contractor registered with Peru's Ministry of Energy and Mines. Service and capability pages aimed at procurement teams evaluating suppliers, with contact routing as the single conversion goal.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Lenis"],
    demo: "https://smva.com.pe",
  },
  {
    title: "Pokorb",
    subtitle: "Catalog commerce · React + WhatsApp",
    description:
      "Catalog and cart for artisan products where checkout hands off to WhatsApp instead of a payment gateway — the flow the client's customers already used. Includes product filtering, a complaints book, and 3D scene work in the landing.",
    technologies: [
      "React",
      "Three.js",
      "GSAP",
      "Lenis",
      "WhatsApp Business",
    ],
    demo: "https://pokorb.com",
  },
];

const personalProjects = [
  {
    title: "Self-Hosted Cloud Infrastructure",
    subtitle: "Google Cloud Platform",
    description:
      "Linux VMs on GCP running my own services: firewall rules, SSH access and networking configured by hand, containerized deploys with Docker, Cloud Storage buckets, and a few migrations between environments. Most of what I know about production came from breaking this first.",
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

const projectGroups: {
  title: string;
  blurb: string;
  projects: Project[];
  confidential?: boolean;
}[] = [
  {
    title: "Enterprise",
    blurb: "Delivered inside a consulting firm. Code stays with the client.",
    projects: enterpriseProjects,
    confidential: true,
  },
  {
    title: "Client Work",
    blurb: "Systems I designed, shipped and still maintain. All live in production.",
    projects: clientProjects,
  },
  {
    title: "Personal",
    blurb: "Infrastructure I run for myself, mostly to learn how things break.",
    projects: personalProjects,
  },
];

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Reveal
      as="article"
      y={24}
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

      <p className="text-muted-foreground leading-relaxed mb-6">
        {project.description}
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <TechTags technologies={project.technologies} />
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
    </Reveal>
  );
}

interface TechTagsProps {
  technologies: string[];
}

/**
 * Tags cascade in on a fixed timeline. The previous version sliced the card's
 * scroll progress per tag, which meant a card with nine or more tags mapped its
 * last tags past the end of the range: they settled at ~88% opacity and stayed
 * there. Stagger is independent of tag count.
 */
function TechTags({ technologies }: TechTagsProps) {
  return (
    <Stagger className="flex flex-wrap gap-2" stagger={0.04}>
      {technologies.map((tech) => (
        <StaggerItem
          key={tech}
          as="span"
          y={8}
          duration={0.3}
          className="px-2 py-1 text-xs font-mono border border-border text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
        >
          {tech}
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-24 md:py-32 px-10 sm:px-14 md:px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Label */}
          <div className="md:col-span-3">
            <Reveal
              as="p"
              y={8}
              className="text-sm font-mono tracking-widest text-muted-foreground uppercase sticky top-24"
            >
              Projects
            </Reveal>
          </div>

          {/* Content */}
          <div className="md:col-span-9 space-y-20">
            {projectGroups.map((group) => (
              <div key={group.title} className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-6 mb-2">
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                      <h2 className="font-mono text-sm tracking-[0.2em] uppercase text-muted-foreground">
                        {group.title}
                      </h2>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                  </div>
                  <p className="text-xs text-muted-foreground/60 font-mono ml-4">
                    {group.blurb}
                  </p>
                </div>
                <div className="space-y-8">
                  {group.projects.map((project) => (
                    <ProjectCard
                      key={project.title}
                      project={
                        group.confidential
                          ? { ...project, confidential: true }
                          : project
                      }
                    />
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
