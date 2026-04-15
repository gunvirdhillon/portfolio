"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/lib/projects";
import { getProjectBySlug } from "@/lib/projects";
import { MotionItem, MotionStagger } from "@/components/MotionStagger";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectStorySection } from "@/components/ProjectStorySection";
import { ObfuscatedEmail } from "@/components/ObfuscatedEmail";
import { LINKEDIN_PROFILE_URL } from "@/lib/site";

type HomePageClientProps = {
  projects: Project[];
  scrollToSlug?: string;
};

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
    <MotionStagger className="relative z-10 mx-auto max-w-6xl pad-x-safe py-16 md:py-24">
      <MotionItem>
        <div>
          <h1 className="text-balance font-serif text-[clamp(2rem,5vw+1rem,3.75rem)] font-normal leading-tight tracking-tight text-ink">
            Revenue leader. Builder.
          </h1>
          <p className="mt-6 max-w-2xl text-muted">
            I closed $2M+ ARR in 2025 at 130%+ quota attainment selling enterprise
            SaaS at Global-e (NASDAQ: GLBE) and won EU Mid-Market Salesperson of the
            Year. I also build products, run GTM advisory, and ship code. London.
          </p>
        </div>
      </MotionItem>
      <MotionItem className="mt-16 md:mt-20">
        <section
          id="about"
          aria-labelledby="about-heading"
          className="scroll-mt-28 md:scroll-mt-32"
        >
          <h2
            id="about-heading"
            className="font-serif text-[clamp(1.5rem,2.5vw+0.75rem,2.25rem)] font-normal leading-tight text-ink"
          >
            About
          </h2>
          <div className="mt-8 max-w-prose space-y-6 text-muted">
            <p>
              I sell enterprise software and I build things. For the past two years I
              carried quota at Global-e, closing cross-border MoR deals with enterprise
              merchants and global brands. Before that I founded and sold a live events
              business in 13 months, managed a $140m market data book at Macquarie Group,
              and ran investment analysis for a family office in Dubai.
            </p>
            <p>
              Between roles I consult on GTM and commercial strategy for early-stage
              companies, and I build my own products. Réussite, a premium solitaire app
              for iOS and Android, is the current one. I vibe-coded the first version with
              minimal programming knowledge. Shipping it taught me how developers think,
              which makes me a sharper seller.
            </p>
            <p>
              I like solving problems for people and watching them get results. That
              instinct sits behind every deal I close and every advisory engagement I take
              on.
            </p>
          </div>
        </section>
      </MotionItem>
      <MotionItem className="mt-16 md:mt-20">
        <hr className="border-rule" />
      </MotionItem>
      <MotionItem className="mt-10">
        <section id="selected-projects" aria-labelledby="projects-heading">
          <h2
            id="projects-heading"
            className="text-[11px] uppercase tracking-[0.08em] text-muted"
          >
            Selected projects
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-5">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      </MotionItem>
      <MotionItem className="mt-20 md:mt-28">
        <div>
          <p className="text-[11px] uppercase tracking-[0.08em] text-muted">
            Case notes
          </p>
          <div className="mt-10 space-y-0">
            {projects.map((p) => (
              <ProjectStorySection
                key={p.slug}
                project={p}
                sectionId={`project-${p.slug}`}
              />
            ))}
          </div>
        </div>
      </MotionItem>
      <MotionItem className="mt-20 md:mt-28">
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="scroll-mt-28 border-t border-rule pt-16 md:scroll-mt-32 md:pt-20"
        >
          <h2
            id="contact-heading"
            className="font-serif text-[clamp(1.5rem,2.5vw+0.75rem,2.25rem)] font-normal leading-tight text-ink"
          >
            Get in touch
          </h2>
          <div className="mt-8 max-w-prose space-y-4 text-muted">
            <p className="text-lg text-ink">
              <ObfuscatedEmail />
            </p>
            <p>
              <a
                href={LINKEDIN_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-2 transition-colors hover:text-ink"
              >
                Message on LinkedIn →
              </a>
            </p>
          </div>
        </section>
      </MotionItem>
    </MotionStagger>
  );
}
