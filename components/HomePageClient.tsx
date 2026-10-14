"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import type { Project } from "@/lib/projects";
import { getProjectBySlug } from "@/lib/projects";
import { ProjectIndex } from "@/components/ProjectIndex";
import { ProjectStorySection } from "@/components/ProjectStorySection";
import { ObfuscatedEmail } from "@/components/ObfuscatedEmail";
import { LINKEDIN_PROFILE_URL } from "@/lib/site";

type HomePageClientProps = {
  projects: Project[];
  scrollToSlug?: string;
};

/** A section opens on an ink rule with its name as a running head in the margin. */
function Section({
  id,
  title,
  children,
  className = "",
}: {
  id?: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const headingId = `${id ?? title.toLowerCase().replace(/\s+/g, "-")}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`page-grid mt-20 border-t border-ink pt-5 lg:mt-28 ${className}`}
    >
      <h2 id={headingId} className="col-margin running-head mb-6 text-ink lg:mb-0 lg:pt-1.5">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function HomePageClient({ projects, scrollToSlug }: HomePageClientProps) {
  const didScrollRef = useRef(false);

  useEffect(() => {
    if (!scrollToSlug || didScrollRef.current) return;
    if (!getProjectBySlug(scrollToSlug)) return;
    const el = document.getElementById(`project-${scrollToSlug}`);
    if (!el) return;
    didScrollRef.current = true;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState({}, "", "/");
  }, [scrollToSlug]);

  return (
    <div className="page">
      {/* Hero: the headline hangs into the margin; the introduction sits in the text column. */}
      <div className="page-grid pt-14 lg:pt-24">
        <h1 className="col-full text-balance text-[clamp(2.625rem,6.2vw+0.5rem,6.75rem)] font-[340] leading-[0.98] tracking-[-0.025em]">
          Enterprise seller. Builder.
        </h1>
        <div className="col-text mt-8 lg:mt-14">
          <p className="text-pretty text-[1.3125rem] leading-[1.45] lg:text-[1.5rem]">
            I am the founding Account Executive at Noxus, a seed-stage enterprise AI
            company, and its Head of Value Engineering since September 2026.
          </p>
          <p className="mt-5 text-pretty">
            I expanded Santander into a global framework agreement and built the
            outbound engine behind $4.4m of qualified pipeline in five months. Before
            that I closed $2m+ ARR in 2025 at 130%+ attainment at Global-e (NASDAQ:
            GLBE) and won EU Mid-Market Salesperson of the Year 2025. London.
          </p>
        </div>
      </div>

      <Section id="about" title="About">
        <div className="col-text indented text-pretty">
          <p>
            <span className="mb-4 block text-[1.5rem] leading-snug lg:text-[1.75rem]">
              I sell enterprise software and I build things.
            </span>{" "}
            Since May 2026 I have been the founding Account Executive at Noxus, which
            automates business processes with AI for large enterprises. I expanded
            Santander, own the Sky account, built the company’s first outbound engine
            and SDR team, and now lead value engineering: the use cases, ROI models and
            sales plays the team runs.
          </p>
          <p>
            Before Noxus I carried quota at Global-e for nearly two years, closing
            cross-border Merchant of Record deals with enterprise merchants and global
            brands. Before that I founded and sold a live events business in 13 months,
            managed a $140m market data book at Macquarie Group, and ran investment
            analysis for a family office in Dubai.
          </p>
          <p>
            Alongside the day job I advise early-stage companies on GTM and commercial
            strategy, and I build my own products. Réussite, a premium solitaire app for
            iOS and Android, is the current one. I vibe-coded the first version with
            minimal programming knowledge. Shipping it taught me how developers think,
            which makes me a sharper seller. I like solving problems for people and
            watching them get results. That instinct sits behind every deal I close and
            every advisory engagement I take on.
          </p>
        </div>
      </Section>

      <Section id="selected-projects" title="Selected projects">
        <div className="col-wide">
          <ProjectIndex projects={projects} />
        </div>
      </Section>

      <Section title="Case notes">
        <div className="col-full mt-4 space-y-20 lg:mt-12 lg:space-y-28">
          {projects.map((p) => (
            <ProjectStorySection key={p.slug} project={p} sectionId={`project-${p.slug}`} />
          ))}
        </div>
      </Section>

      <Section id="contact" title="Get in touch">
        <div className="col-text">
          <p className="text-[1.625rem] leading-tight [overflow-wrap:anywhere] lg:text-[2.25rem]">
            <ObfuscatedEmail />
          </p>
          <p className="mt-4">
            <a
              href={LINKEDIN_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Message on LinkedIn →
            </a>
          </p>
        </div>
      </Section>
    </div>
  );
}
