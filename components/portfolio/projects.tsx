"use client";

import { Reveal, Stagger, StaggerItem } from "./reveal";
import { SectionLabel } from "./section-label";

const enterpriseProjects = [
  {
    title: "Data Engineering Pipeline",
    subtitle: "Azure Dataflow Gen2",
    description:
      "I worked on a pipeline that reads order data from Azure Data Lake and transforms it with Dataflow Gen2. The client needed it to reproduce processes they were using in Alteryx.",
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
      "I helped move existing data flows into PySpark notebooks and schedule them with Databricks Jobs. My work covered design, testing, and rollout.",
    technologies: ["Databricks", "PySpark", "Databricks Jobs"],
  },
  {
    title: "User Management Microservice",
    subtitle: "Azure · contributor",
    description:
      "A Spring Boot service for users, roles, and permissions, built with a team at EY. I worked on role management in the API and checked that each role could access only what it should.",
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
    subtitle: "Client and studio portal · Next.js + Supabase",
    description:
      "I built this to manage Kurogrid and give clients a place to check their site’s analytics, leads, invoices, and support requests. Each client gets their own workspace, with access rules enforced in the database.",
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
    subtitle: "Studio website · Next.js",
    description:
      "The public site for Kurogrid, where I show the work and explain the services. Enquiries go into the portal with their source attached, and there are a few interactive demos to try.",
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
    subtitle: "Inventory system · Next.js + Supabase",
    description:
      "An inventory system I built for a mining contractor. Stock movements and costs are calculated together in the database to keep balances consistent. I focused on quick data entry: dense tables, keyboard shortcuts, and Excel import and export. The live version uses one warehouse; support for multiple warehouses is still in development.",
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
      "The public website for the same contractor. It deploys separately from the inventory system, so I can update one without redeploying the other. Text and images live in a single content file rather than being scattered through components.",
    technologies: ["Next.js 16", "React 19", "Tailwind v4", "GSAP", "Three.js"],
    demo: "https://vrdmincon.com.pe",
  },
  {
    title: "Ezcuadro",
    subtitle: "Custom canvas prints · Next.js + Firebase",
    description:
      "A storefront I built for a canvas printing business in Lima. Customers can browse the catalog and compare sizes and prices as they put together a quote. Orders close over WhatsApp, which is how the business already sold.",
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
      "The store's internal tools had grown into eight isolated pages, each with its own login form and its own diverging CSS, and every admin deploy risked the public site. I pulled them out into a single SPA with one auth provider, role-based route guards, and one set of design tokens. The storefront and the panel now ship independently.",
    technologies: [
      "Vite",
      "React",
      "TypeScript",
      "React Router",
      "Firebase Auth",
      "Leaflet",
    ],
    demo: "https://portal.ezcuadro.com",
  },
  {
    title: "SMVA",
    subtitle: "Corporate landing · Next.js",
    description:
      "A site I’m building for a mining contractor. It lays out their services and capabilities so buyers can check what they do and get in touch. Still in progress.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Lenis"],
    demo: "https://smva.preview.kurogrid.com/",
    status: "In progress",
  },
  {
    title: "Pokorb",
    subtitle: "Catalog commerce · React + WhatsApp",
    description:
      "A catalog and cart for artisan products. Checkout sends the order to WhatsApp, where the client’s customers already buy. I also worked on product filters and the 3D scene on the landing page.",
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
    title: "My self-hosting setup",
    subtitle: "Google Cloud Platform",
    description:
      "My own services running on Linux VMs in GCP, with Docker, storage buckets, and networking I set up myself. Nobody else depends on these, so this is where I try things before putting them on a client’s server.",
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
  status?: string;
};

const projectGroups: {
  title: string;
  blurb: string;
  projects: Project[];
  confidential?: boolean;
}[] = [
  {
    title: "At EY",
    blurb: "Work I contributed to at EY. The code stays with the client.",
    projects: enterpriseProjects,
    confidential: true,
  },
  {
    title: "Client Work",
    blurb: "Projects I build and maintain for clients. SMVA is still in progress.",
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
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Reveal
      as="article"
      y={24}
      className="group relative border border-border p-6 transition-colors duration-300 ease-out hover:border-brand/50 hover:bg-brand-dim md:p-8"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="font-serif text-2xl leading-tight md:text-3xl">
              {project.title}
            </h3>
            {project.status && (
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded border border-brand/30 bg-brand/10 text-brand">
                <span className="h-1 w-1 rounded-full bg-brand animate-pulse" />
                {project.status}
              </span>
            )}
          </div>
          <p className="mt-2 font-mono text-xs text-muted-foreground sm:text-sm">
            {project.subtitle}
          </p>
        </div>
        <span className="shrink-0 font-mono text-[10px] tracking-[0.2em] text-muted-foreground/50 transition-colors duration-300 group-hover:text-brand">
          {String(index + 1).padStart(2, "0")}
        </span>
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
          className="border border-border px-2 py-1 font-mono text-xs text-muted-foreground transition-colors duration-200 hover:border-brand/60 hover:text-brand"
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
    <section id="projects" className="border-t border-border py-24 sm:py-32 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 md:px-16 lg:px-24">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Label */}
          <div className="md:col-span-3">
            <SectionLabel index="02" title="Projects" kana="サクヒン" />
          </div>

          {/* Content */}
          <div className="md:col-span-9 space-y-20">
            {projectGroups.map((group) => (
              <div key={group.title} className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-6 mb-2">
                    <div className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                      <h2 className="font-mono text-sm tracking-[0.2em] uppercase text-muted-foreground">
                        {group.title}
                      </h2>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                  </div>
                  <p className="ml-5 font-mono text-xs text-muted-foreground/70">
                    {group.blurb}
                  </p>
                </div>
                <div className="space-y-8">
                  {group.projects.map((project, index) => (
                    <ProjectCard
                      key={project.title}
                      index={index}
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
