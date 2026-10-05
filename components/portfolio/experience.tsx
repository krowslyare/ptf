"use client";

import type { ReactNode } from "react";

import { Reveal, Stagger, StaggerItem } from "./reveal";
import { SectionLabel } from "./section-label";

const experienceSections = [
  {
    title: "EY",
    experiences: [
      {
        company: "Ernst & Young (EY)",
        location: "San Isidro, Peru",
        period: "2024 — 2025",
        roles: [
          {
            title: "Data Analyst / Data Engineer",
            level: "Staff",
            tasks: [
              "I worked with financial data for forensic audits, cleaning and transforming datasets and checking them before they went into analysis.",
              "I also prepared and validated the datasets that fed the team’s data pipelines.",
            ],
          },
          {
            title: "Software Development",
            tasks: [
              "On an internal Spring Boot service, my part was role management. I implemented the API changes and checked what each role could access.",
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
        company: "Kurogrid",
        location: "Remote",
        period: "2026 — Present",
        showcase: [
          {
            name: "KuroGrid",
            href: "https://kurogrid.com",
            logo: "/kurogrid logo.png",
            // logo ships with its own dark background
            imgClass: "",
          },
          {
            name: "Ezcuadro",
            href: "https://www.ezcuadro.com",
            logo: "/ezcuadro.png",
            // dark wordmark: flip it so it reads on the dark theme
            imgClass: "dark:invert",
          },
          {
            name: "VRD",
            href: "https://vrdmincon.com.pe",
            logo: "/vrd.png",
            imgClass: "",
          },
          {
            name: "SMVA",
            href: "https://smva.preview.kurogrid.com/",
            logo: "/smva.png",
            // white line art: flip it so it reads on the light theme
            imgClass: "invert dark:invert-0",
          },
          {
            name: "Pokorb",
            href: "https://pokorb.com",
            logo: "/pokorb.png",
            imgClass: "",
          },
        ],
        roles: [
          {
            title: "Full-Stack Developer",
            tasks: [
              "I build client portals with Next.js and Supabase. Each client has their own workspace, with access rules enforced in the database.",
              "For a mining contractor, I built an inventory system with stock movements and costs calculated in the database, plus Excel import and export.",
              "I keep business rules separate from the interface so a change to a screen doesn’t mean rewriting how the system works.",
              "I use Playwright and Vitest to check changes before deploying, and Sentry to keep track of errors afterward.",
            ],
          },
          {
            title: "Web & Systems Developer",
            tasks: [
              "I also build the public websites, with content clients can update through an admin portal.",
              "I handle the domain, DNS, hosting, deploys, and maintenance too. Those are part of the job.",
              <>
                For businesses in Peru, I also set up the complaints book (
                <em lang="es" className="italic">
                  Libro de Reclamaciones
                </em>
                ) and privacy policy pages.
              </>,
              "Enquiries go into the client’s portal with their source attached. For businesses that sell over WhatsApp, checkout goes there too.",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Operations",
    note: "Not engineering, just a 2-year side quest surviving automotive assembly lines in Japan to pay the bills.",
    experiences: [
      {
        company: "Aisin Seiki",
        subtitle: "Nishio Die-Casting Plant",
        location: "Aichi, Japan",
        period: "2021 — 2022",
        roles: [
          {
            title: "Machinery Operator & Quality Control",
            tasks: [
              "I operated machinery and checked parts at Aisin’s die-casting plant.",
            ],
          },
        ],
      },
      {
        company: "Toyota",
        subtitle: "Boshoku Seiko Corporation",
        location: "Aichi, Japan",
        period: "2021",
        roles: [
          {
            title: "Assembly Line Operator",
            tasks: [
              "I assembled car seats and checked them on the line at Toyota.",
            ],
          },
        ],
      },
    ],
  },
];

type Experience = (typeof experienceSections)[number]["experiences"][number] & {
  showcase?: {
    name: string;
    href: string;
    logo?: string;
    imgClass?: string;
  }[];
};

interface ExperienceCardProps {
  exp: Experience;
}

function ExperienceCard({ exp }: ExperienceCardProps) {
  return (
    <Reveal y={24}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="font-serif text-2xl">{exp.company}</h3>
          {'subtitle' in exp && exp.subtitle && (
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

      <Stagger className="space-y-6 border-l border-border pl-6" stagger={0.12} delay={0.1}>
        {exp.roles.map((role) => (
          <RoleItem key={role.title} role={role} />
        ))}

        {exp.showcase && (
          <StaggerItem className="pt-4">
            <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground/50 mb-3">
              Live
            </p>
            <div className="flex flex-wrap gap-3">
              {exp.showcase.map((project) => (
                <a
                  key={project.name}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-24 h-14 flex items-center justify-center rounded bg-secondary/10 hover:bg-secondary/20 border border-white/5 hover:border-white/10 transition-all duration-300"
                  title={`Visit ${project.name}`}
                >
                  {project.logo ? (
                    <img
                      src={project.logo}
                      alt={project.name}
                      className={`w-full h-full object-contain p-1.5 opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300 ${project.imgClass ?? ""}`}
                    />
                  ) : (
                    <span className="text-[10px] font-mono tracking-widest text-muted-foreground/70 uppercase group-hover:text-foreground transition-colors duration-300">
                      {project.name.slice(0, 2)}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </StaggerItem>
        )}
      </Stagger>
    </Reveal>
  );
}

interface Role {
  title: string;
  level?: string;
  tasks: ReactNode[];
}

interface RoleItemProps {
  role: Role;
}

function RoleItem({ role }: RoleItemProps) {
  return (
    <StaggerItem>
      <div className="flex items-center gap-3 mb-3">
        <h4 className="font-medium">{role.title}</h4>
        {role.level && (
          <span className="text-xs font-mono px-2 py-0.5 bg-foreground text-background">
            {role.level}
          </span>
        )}
      </div>
      <ul className="space-y-2">
        {role.tasks.map((task, i) => (
          <li
            key={i}
            className="text-muted-foreground leading-relaxed flex gap-3"
          >
            <span aria-hidden="true" className="text-foreground/30 mt-1.5">·</span>
            <span>{task}</span>
          </li>
        ))}
      </ul>
    </StaggerItem>
  );
}

export function Experience() {
  return (
    <section id="experience" className="border-t border-border bg-secondary/30 py-24 sm:py-32 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 md:px-16 lg:px-24">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Label */}
          <div className="md:col-span-3">
            <SectionLabel index="03" title="Experience" kana="ショクレキ" />
          </div>

          {/* Content */}
          <div className="md:col-span-9 space-y-24">
            {experienceSections.map((section) => (
              <div key={section.title} className="relative">
                <div className={`flex items-center gap-6 ${'note' in section && section.note ? 'mb-6' : 'mb-12'}`}>
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                    <h2 className="font-mono text-sm tracking-[0.2em] uppercase text-muted-foreground">
                      {section.title}
                    </h2>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                </div>

                {'note' in section && section.note && (
                  <p className="text-sm font-mono text-muted-foreground -mt-2 mb-10 max-w-2xl leading-relaxed">
                    {section.note}
                  </p>
                )}

                <div className="space-y-16">
                  {section.experiences.map((exp) => (
                    <ExperienceCard key={exp.company} exp={exp} />
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
