"use client";

import dynamic from "next/dynamic";
import type { Project } from "@/lib/projects";
import { CompanyName } from "@/components/CompanyName";
import { smart } from "@/lib/typography";

const ProjectDriveBrochure = dynamic(() => import("@/components/ProjectDriveBrochure"), {
  ssr: false,
  loading: () => <div className="mt-10 h-[min(64vh,560px)] min-h-[380px] border border-rule" aria-hidden />,
});

type ProjectStorySectionProps = {
  project: Project;
  sectionId: string;
};

/**
 * The highlights as a plain ruled list with its label in the margin. From
 * 1280px the list moves into the open column beside the narrative, label on
 * top, so the figures sit next to the story.
 */
function Highlights({ project }: { project: Project }) {
  if (!project.highlights?.length) return null;
  const headingId = `story-${project.slug}-highlights`;
  return (
    <div className="col-full page-grid xl:col-start-3 xl:row-start-2 xl:mt-10 xl:block xl:self-start">
      <h4 id={headingId} className="col-margin running-head mt-10 lg:mt-12 lg:pt-3 xl:mt-0 xl:pt-0">
        Highlights
      </h4>
      <ul aria-labelledby={headingId} className="col-text mt-3 border-b border-rule lg:mt-12 xl:mt-3">
        {project.highlights.map((item) => (
          <li
            key={item}
            className="text-pretty border-t border-rule py-3 text-[1rem] leading-normal lg:text-[1.0625rem] xl:py-2.5 xl:text-[0.9375rem]"
          >
            {smart(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * One case note. The running head (dates, and the ticker, stage or country)
 * sits in the margin, the company and its italic descriptor in the text
 * column. Highlights come before the narrative, and beside it from 1280px.
 */
export function ProjectStorySection({ project, sectionId }: ProjectStorySectionProps) {
  const driveBrochure = project.brochure?.kind === "drive" ? project.brochure : undefined;
  const embedMode = driveBrochure?.embed ?? "full";
  const headingId = `story-${project.slug}-heading`;
  const tag =
    project.status === "coming_soon" ? "In development" : project.card_badge ?? project.place;

  return (
    <article
      id={sectionId}
      aria-labelledby={headingId}
      data-case-note
      className="page-grid border-t border-rule pt-5"
    >
      <p className="col-margin running-head flex flex-wrap gap-x-4 lg:block lg:pt-1.5">
        <span className="tabular not-italic">{project.period}</span>
        {tag ? <span className="lg:block">{tag}</span> : null}
      </p>

      <header className="col-text mt-2 lg:mt-0">
        <h3
          id={headingId}
          className="type-title flex min-h-9 items-center"
        >
          <CompanyName project={project} />
        </h3>
        <p className="mt-2 text-pretty text-[1.125rem] italic leading-snug text-muted lg:text-[1.3125rem]">{smart(project.descriptor)}</p>
      </header>

      <Highlights project={project} />

      <div className="col-text indented mt-8 text-pretty lg:mt-10 xl:row-start-2">
        {project.body.map((paragraph, i) => (
          <p key={i}>{smart(paragraph)}</p>
        ))}
      </div>

      {project.closing_link ? (
        <p className="col-text mt-4">
          <a
            href={project.closing_link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            {project.closing_link.label}
          </a>
        </p>
      ) : null}

      {driveBrochure && embedMode === "minimal" ? (
        <div className="col-text mt-10">
          <iframe
            src={`https://drive.google.com/file/d/${driveBrochure.driveFileId.trim()}/preview`}
            className="aspect-[4/3] w-full border border-rule bg-white"
            allow="autoplay"
            loading="lazy"
            title="10X Music case study"
          />
        </div>
      ) : null}

      {driveBrochure && embedMode !== "minimal" ? (
        <div className="col-text">
          <ProjectDriveBrochure brochure={driveBrochure} />
        </div>
      ) : null}
    </article>
  );
}
