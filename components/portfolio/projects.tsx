"use client";

import { useState } from "react";
import { ArrowUpRight, Lock } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./reveal";
import { SectionLabel } from "./section-label";
import { BrowserFrame, ScreenVideo } from "./project-media";
import { WorkCarousel, type FeaturedProject } from "./work-carousel";

const M = "/media/projects";

const featured: FeaturedProject[] = [
  {
    id: "kurogrid-libro",
    title: "Libro de Reclamaciones",
    kind: "Compliance · Kurogrid Portal",
    summary:
      "Peru requires consumer-facing businesses to keep a complaints book. Mine takes complaints from a public form and tracks each one to an answer before its legal deadline, with every client’s records isolated by row-level security.",
    stack: ["Next.js 16", "Supabase", "Row Level Security", "Playwright", "Sentry"],
    video: `${M}/kurogrid-libro.mp4`,
    poster: `${M}/kurogrid-libro-poster.webp`,
    domain: "portal.kurogrid.com",
    href: "https://portal.kurogrid.com",
  },
  {
    id: "vrd-erp",
    title: "VRD Inventory ERP",
    kind: "Inventory system · Mining contractor",
    summary:
      "Replaced paper vouchers and a shared Excel. Stock movements and costs are calculated together in the database so balances stay consistent, and data entry is built for speed: dense tables, shortcuts, Excel in and out.",
    stack: ["Next.js", "PostgreSQL", "Zod", "TanStack Table", "ExcelJS"],
    video: `${M}/vrd-erp-flow.mp4`,
    poster: `${M}/vrd-erp-flow-poster.webp`,
    domain: "Private system",
  },
  {
    id: "ezcuadro",
    title: "Ezcuadro",
    kind: "Storefront · Canvas prints",
    summary:
      "Customers browse the catalog, compare sizes and prices, and put together a quote. The order closes on WhatsApp, which is how the shop already sold.",
    stack: ["Next.js", "Firebase", "GSAP", "Lenis", "Leaflet"],
    video: `${M}/ezcuadro-scroll.mp4`,
    poster: `${M}/ezcuadro-scroll-poster.webp`,
    domain: "ezcuadro.com",
    href: "https://www.ezcuadro.com",
  },
  {
    id: "ezcuadro-backoffice",
    title: "Ezcuadro Backoffice",
    kind: "Internal tools · Admin SPA",
    summary:
      "Eight admin pages, eight logins, eight flavors of CSS. My client vibe-coded them, which honestly got the business running, but nothing matched and every page was its own slow HTML load. I pulled them into one SPA with role-based routes that ships independently of the store.",
    stack: ["Vite", "React", "React Router", "Firebase Auth", "Leaflet"],
    poster: `${M}/ezcuadro-portal-rutas.webp`,
    domain: "Internal portal",
  },
  {
    id: "vrd-site",
    title: "VRD Corporate Site",
    kind: "Corporate site · Mining contractor",
    summary:
      "The contractor’s services, projects and contact in one public site. It deploys separately from the ERP, and all text and images live in a single content file.",
    stack: ["Next.js 16", "React 19", "Tailwind v4", "GSAP", "Three.js"],
    video: `${M}/vrd-scroll.mp4`,
    poster: `${M}/vrd-scroll-poster.webp`,
    domain: "vrdmincon.com.pe",
    href: "https://vrdmincon.com.pe",
  },
  {
    id: "smva",
    title: "SMVA",
    kind: "Corporate landing · Mining contractor",
    summary:
      "Lays out the contractor’s services and capabilities so buyers can check what they do and get in touch.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    video: `${M}/smva-scroll.mp4`,
    poster: `${M}/smva-scroll-poster.webp`,
    domain: "smva.preview.kurogrid.com",
    href: "https://smva.preview.kurogrid.com/",
    status: "In progress",
  },
];

type ShippedProject = {
  title: string;
  kind: string;
  summary: string;
  stack: string[];
  domain: string;
  href?: string;
  video?: string;
  poster?: string;
};

const alsoShipped: ShippedProject[] = [
  {
    title: "Kurogrid",
    kind: "Studio site",
    summary: "My studio’s public site. Enquiries land in the portal with their source attached.",
    stack: ["Next.js", "React Three Fiber", "MDX", "Vitest"],
    domain: "kurogrid.com",
    href: "https://kurogrid.com",
    video: `${M}/kurogrid-scroll.mp4`,
    poster: `${M}/kurogrid-scroll-poster.webp`,
  },
  {
    title: "Noctratte",
    kind: "Second-hand fashion store",
    summary: "Editorial storefront for curated second-hand clothing. Each piece is shown as it is, and orders are coordinated on WhatsApp.",
    stack: ["Next.js", "Vercel", "WhatsApp"],
    domain: "noctratte.com",
    href: "https://www.noctratte.com",
    video: `${M}/noctratte-scroll.mp4`,
    poster: `${M}/noctratte-scroll-poster.webp`,
  },
  {
    title: "Self-hosting",
    kind: "Personal · GCP",
    summary: "My own Linux VMs on GCP, mostly to learn how things break before it happens on a client’s server.",
    stack: ["Compute Engine", "Docker", "Cloud Storage"],
    domain: "self-hosted",
  },
];

const eyProjects = [
  {
    title: "Data Engineering Pipeline",
    summary:
      "Reads order data from Azure Data Lake and transforms it with Dataflow Gen2, reproducing processes the client ran in Alteryx.",
    stack: "Azure Data Lake · Fabric Dataflow Gen2 · SQL",
  },
  {
    title: "Data Flow Modernization",
    summary:
      "Moved existing data flows into PySpark notebooks scheduled with Databricks Jobs. Design, testing and rollout.",
    stack: "Databricks · PySpark · Databricks Jobs",
  },
  {
    title: "User Management Microservice",
    summary:
      "Team-built Spring Boot service for users, roles and permissions. I owned role management and checked what each role could reach.",
    stack: "Java · Spring Boot · Azure App Service · Docker",
  },
];

function GroupHeading({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mb-8 flex items-center gap-6">
      <div className="flex items-center gap-3">
        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
        <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
          {title}
        </h2>
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
      {note && (
        <span className="flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
          <Lock className="h-3 w-3" />
          {note}
        </span>
      )}
    </div>
  );
}

/** Self-hosting has nothing public to record, so it gets a diagram of the stack instead. */
function InfraDiagram() {
  const node =
    "border border-white/15 bg-white/[0.03] px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-white/70";
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_40%,rgb(163_230_53/0.10),transparent_60%)]">
      <div className="flex flex-col items-center gap-2">
        <span className={`${node} border-[#a3e635]/50 text-[#a3e635]`}>GCP</span>
        <span className="h-3 w-px bg-white/20" />
        <span className={node}>Linux VM</span>
        <span className="h-3 w-px bg-white/20" />
        <div className="flex items-center gap-2">
          <span className={node}>Docker</span>
          <span className="h-px w-3 bg-white/20" />
          <span className={node}>Storage</span>
        </div>
      </div>
    </div>
  );
}

function ShippedCard({ project }: { project: ShippedProject }) {
  const [hovered, setHovered] = useState(false);
  const Wrapper = project.href ? "a" : "div";

  return (
    <StaggerItem y={16}>
      <Wrapper
        {...(project.href
          ? { href: project.href, target: "_blank", rel: "noopener noreferrer" }
          : {})}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="group block"
      >
        <BrowserFrame
          domain={project.domain}
          href={project.href}
          className="transition-colors duration-300 group-hover:border-brand/50"
        >
          {project.video && project.poster ? (
            <ScreenVideo
              video={project.video}
              poster={project.poster}
              alt={`${project.title}, screen recording`}
              playOn="hover"
              hovered={hovered}
              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
            />
          ) : (
            <InfraDiagram />
          )}
        </BrowserFrame>
        <div className="mt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {project.kind}
          </p>
          <h3 className="mt-1.5 flex items-center gap-1.5 font-serif text-xl">
            {project.title}
            {project.href && (
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
            )}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
          <p className="mt-3 font-mono text-[11px] text-muted-foreground/70">
            {project.stack.join(" · ")}
          </p>
        </div>
      </Wrapper>
    </StaggerItem>
  );
}

export function Projects() {
  return (
    <section id="projects" className="border-t border-border py-24 sm:py-32 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 md:px-16 lg:px-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-3">
            <SectionLabel index="02" title="Projects" kana="サクヒン" />
          </div>

          <div className="min-w-0 space-y-24 md:col-span-9">
            <Reveal y={24}>
              <WorkCarousel projects={featured} />
            </Reveal>

            <div>
              <GroupHeading title="Also shipped" />
              <Stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8" stagger={0.08}>
                {alsoShipped.map((project) => (
                  <ShippedCard key={project.title} project={project} />
                ))}
              </Stagger>
            </div>

            <div>
              <GroupHeading title="At EY" note="Code stays with the client" />
              <Stagger as="div" className="divide-y divide-border border-y border-border" stagger={0.06}>
                {eyProjects.map((project, i) => (
                  <StaggerItem
                    key={project.title}
                    className="grid gap-2 py-6 md:grid-cols-[2.5rem_minmax(0,14rem)_minmax(0,1fr)] md:gap-6"
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] text-brand md:pt-1.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-serif text-lg leading-snug">{project.title}</h3>
                    <div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
                      <p className="mt-2 font-mono text-[11px] text-muted-foreground/70">{project.stack}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
