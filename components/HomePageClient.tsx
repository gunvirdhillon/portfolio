"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/lib/projects";
import { getProjectBySlug } from "@/lib/projects";
import { MotionItem, MotionStagger } from "@/components/MotionStagger";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectStorySection } from "@/components/ProjectStorySection";

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
            B2B sales, GTM advisory, and product builds I own end to end. London.
          </p>
        </div>
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
    </MotionStagger>
  );
}
