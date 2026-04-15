"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { MotionItem, MotionStagger } from "@/components/MotionStagger";
import { ProjectMark } from "@/components/ProjectMark";

const backClass =
  "text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cream rounded-sm";

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

type ProjectPageClientProps = {
  project: Project;
};

export function ProjectPageClient({ project }: ProjectPageClientProps) {
  const driveBrochure =
    project.brochure?.kind === "drive" ? project.brochure : undefined;
  const embedMode = driveBrochure?.embed ?? "full";
  const hasFullBrochure = Boolean(driveBrochure && embedMode !== "minimal");
  const hasMinimalBrochure = Boolean(driveBrochure && embedMode === "minimal");
  const highlightsTitle = project.highlights_heading ?? "Scope and outputs";

  return (
    <MotionStagger
      className={`relative z-10 mx-auto pad-x-safe py-16 md:py-20 ${
        hasFullBrochure ? "max-w-3xl xl:max-w-6xl" : "max-w-3xl"
      }`}
    >
      <MotionItem>
        <Link href="/work" className={backClass}>
          ← Work
        </Link>
      </MotionItem>
      <MotionItem className="mt-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="font-serif text-[clamp(1.75rem,3vw+1rem,2.75rem)] font-normal leading-tight text-ink">
              {project.title}
            </h1>
            <p className="mt-2 text-sm text-subtle">{project.period}</p>
            <p className="mt-3 text-base text-muted">{project.descriptor}</p>
          </div>
          {project.logo ? <ProjectMark logo={project.logo} /> : null}
        </div>
      </MotionItem>
      <MotionItem className="mt-8">
        <hr className="border-rule" />
      </MotionItem>
      {project.highlights && project.highlights.length > 0 ? (
        <MotionItem className="mt-10">
          <h2 className="text-[11px] uppercase tracking-[0.08em] text-muted">
            {highlightsTitle}
          </h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-ink marker:text-accent">
            {project.highlights.map((item) => (
              <li key={item} className="pl-1">
                <span className="-ml-1">{item}</span>
              </li>
            ))}
          </ul>
        </MotionItem>
      ) : null}
      <MotionItem className="mt-10 max-w-prose space-y-6">
        {project.body.map((paragraph, i) => (
          <p key={i} className="text-ink">
            {paragraph}
          </p>
        ))}
        {hasMinimalBrochure && driveBrochure ? (
          <div className="w-full pt-2">
            <iframe
              src={`https://drive.google.com/file/d/${driveBrochure.driveFileId.trim()}/preview`}
              className="aspect-[4/3] w-full rounded-md border border-rule"
              allow="autoplay"
              loading="lazy"
              title="10X Music case study"
            />
          </div>
        ) : null}
        {project.closing_link ? (
          <p className="!mt-8">
            <a
              href={project.closing_link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-4 transition-colors hover:text-ink"
            >
              {project.closing_link.label}
            </a>
          </p>
        ) : null}
      </MotionItem>
      {hasFullBrochure && driveBrochure ? (
        <MotionItem>
          <ProjectDriveBrochure brochure={driveBrochure} />
        </MotionItem>
      ) : null}
    </MotionStagger>
  );
}
