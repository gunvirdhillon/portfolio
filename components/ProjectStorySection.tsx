"use client";

import dynamic from "next/dynamic";
import type { Project } from "@/lib/projects";
import { CompanyMark } from "@/components/ProjectMark";
import { Reveal } from "@/components/Reveal";

const ProjectDriveBrochure = dynamic(
  () => import("@/components/ProjectDriveBrochure"),
  {
    ssr: false,
    loading: () => (
      <div className="mt-14" aria-hidden>
        <div className="h-3 w-28 bg-rule/60" />
        <div className="mt-6 h-[min(64vh,560px)] min-h-[380px] animate-pulse border border-rule bg-surface" />
      </div>
    ),
  }
);

type ProjectStorySectionProps = {
  project: Project;
  sectionId: string;
};

export function ProjectStorySection({ project, sectionId }: ProjectStorySectionProps) {
  const driveBrochure = project.brochure?.kind === "drive" ? project.brochure : undefined;
  const embedMode = driveBrochure?.embed ?? "full";
  const hasFullBrochure = Boolean(driveBrochure && embedMode !== "minimal");
  const hasMinimalBrochure = Boolean(driveBrochure && embedMode === "minimal");
  const headingId = `story-${project.slug}-heading`;
  const highlightsTitle = project.highlights_heading ?? "Scope and outputs";
  const [lead, ...rest] = project.body;
  const hasMore = rest.length > 0 || hasMinimalBrochure;

  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      className="border-t border-rule py-14 first:border-t-0 first:pt-4 md:py-20 md:first:pt-6"
    >
      <Reveal className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
        {/* Rail: who, when, what */}
        <header className="lg:sticky lg:top-8 lg:self-start">
          <div className="flex h-10 items-center">
            <CompanyMark project={project} />
          </div>
          <h3
            id={headingId}
            className="mt-5 font-serif text-[clamp(1.75rem,2vw+1rem,2.25rem)] font-normal leading-[1.1] tracking-tight text-ink"
          >
            {project.title}
          </h3>
          <p className="tabular mt-3 text-sm text-subtle">{project.period}</p>
          <p className="mt-3 max-w-measure text-[0.9375rem] leading-relaxed text-muted">
            {project.descriptor}
          </p>
        </header>

        <div className="min-w-0">
          {project.highlights && project.highlights.length > 0 ? (
            <div>
              <h4 className="text-sm font-bold text-ink">{highlightsTitle}</h4>
              <ul className="mt-4 grid gap-x-10 gap-y-0 md:grid-cols-2">
                {project.highlights.map((item) => (
                  <li
                    key={item}
                    className="relative border-t border-rule py-4 pl-5 text-[0.9875rem] leading-relaxed text-ink before:absolute before:left-0 before:top-[1.6rem] before:h-1.5 before:w-1.5 before:bg-accent-deep before:content-['']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {lead ? (
            <p className="mt-10 max-w-measure text-pretty font-serif text-[clamp(1.25rem,0.6vw+1.1rem,1.4375rem)] leading-[1.5] text-ink">
              {lead}
            </p>
          ) : null}

          {hasMore ? (
            <details className="details-reset group mt-6 max-w-measure">
              <summary className="focus-ring inline-flex cursor-pointer items-center gap-2 rounded-sm py-1 text-sm font-bold text-ink">
                <span
                  aria-hidden
                  className="inline-flex h-5 w-5 items-center justify-center border border-ink text-xs leading-none transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                >
                  +
                </span>
                <span className="link-underline group-open:hidden">Read the full case note</span>
                <span className="link-underline hidden group-open:inline">Hide the full case note</span>
              </summary>
              <div className="mt-6 space-y-5 text-muted">
                {rest.map((paragraph, i) => (
                  <p key={i} className="text-pretty">
                    {paragraph}
                  </p>
                ))}
                {hasMinimalBrochure && driveBrochure ? (
                  <div className="w-full pt-2">
                    <iframe
                      src={`https://drive.google.com/file/d/${driveBrochure.driveFileId.trim()}/preview`}
                      className="aspect-[4/3] w-full border border-rule bg-surface"
                      allow="autoplay"
                      loading="lazy"
                      title="10X Music case study"
                    />
                  </div>
                ) : null}
              </div>
            </details>
          ) : null}

          {project.closing_link ? (
            <p className="mt-6">
              <a
                href={project.closing_link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring link-underline rounded-sm text-ink"
              >
                {project.closing_link.label}
              </a>
            </p>
          ) : null}

          {hasFullBrochure && driveBrochure ? (
            <div className="mt-10">
              <ProjectDriveBrochure brochure={driveBrochure} />
            </div>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
}
