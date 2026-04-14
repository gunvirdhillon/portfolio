"use client";

import dynamic from "next/dynamic";
import type { Project } from "@/lib/projects";
import { ProjectMark } from "@/components/ProjectMark";

const ProjectDriveBrochure = dynamic(
  () => import("@/components/ProjectDriveBrochure"),
  {
    ssr: false,
    loading: () => (
      <div className="mt-14" aria-hidden>
        <div className="h-3 w-28 rounded bg-rule/40" />
        <div className="mt-6 min-h-[380px] h-[min(64vh,560px)] animate-pulse rounded-sm border border-rule bg-white/30" />
      </div>
    ),
  }
);

type ProjectStorySectionProps = {
  project: Project;
  sectionId: string;
};

export function ProjectStorySection({
  project,
  sectionId,
}: ProjectStorySectionProps) {
  const driveBrochure =
    project.brochure?.kind === "drive" ? project.brochure : undefined;
  const hasBrochure = Boolean(driveBrochure);
  const headingId = `story-${project.slug}-heading`;

  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      className={`scroll-mt-28 border-t border-rule pt-16 md:scroll-mt-32 md:pt-20 ${
        hasBrochure ? "max-w-3xl xl:max-w-6xl" : "max-w-3xl"
      } mx-auto w-full`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h2
            id={headingId}
            className="font-serif text-[clamp(1.5rem,2.5vw+0.75rem,2.25rem)] font-normal leading-tight text-ink"
          >
            {project.title}
          </h2>
          <p className="mt-2 text-sm text-subtle">{project.period}</p>
          <p className="mt-3 text-base text-muted">{project.descriptor}</p>
        </div>
        {project.logo ? <ProjectMark logo={project.logo} /> : null}
      </div>
      <hr className="mt-8 border-rule" />
      {project.highlights && project.highlights.length > 0 ? (
        <div className="mt-10">
          <h3 className="text-[11px] uppercase tracking-[0.08em] text-muted">
            Scope and outputs
          </h3>
          <ul className="mt-4 list-inside list-disc space-y-2 text-ink marker:text-accent">
            {project.highlights.map((item) => (
              <li key={item} className="pl-1">
                <span className="-ml-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <div
        className={`mt-10 space-y-6 ${hasBrochure ? "max-w-prose" : ""}`}
      >
        {project.body.map((paragraph, i) => (
          <p key={i} className="text-ink">
            {paragraph}
          </p>
        ))}
      </div>
      {driveBrochure ? (
        <div className="mt-10">
          <ProjectDriveBrochure brochure={driveBrochure} />
        </div>
      ) : null}
    </section>
  );
}
