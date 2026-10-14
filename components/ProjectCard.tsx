import Image from "next/image";
import type { Project } from "@/lib/projects";
import { ProjectMark } from "@/components/ProjectMark";

const focusLink =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const isActive = project.status === "active";
  const mark = project.card_logo ? (
    <Image
      src={project.card_logo.src}
      alt={project.card_logo.alt}
      width={project.card_logo.width}
      height={project.card_logo.height}
      unoptimized
      priority
      className="h-7 w-auto md:h-8"
    />
  ) : project.logo ? (
    <ProjectMark logo={project.logo} />
  ) : null;

  const inner = (
    <>
      {mark ? <div className="flex h-10 items-center">{mark}</div> : null}
      <h3 className="mt-4 font-serif text-xl leading-snug text-ink [overflow-wrap:anywhere] md:text-2xl">
        {project.title}
      </h3>
      {project.card_badge ? (
        <p className="mt-1 whitespace-nowrap text-[10px] uppercase tracking-[0.12em] text-subtle">
          {project.card_badge}
        </p>
      ) : null}
      <p className="mt-1 text-xs uppercase tracking-[0.08em] text-subtle">
        {project.period}
      </p>
      <p className="mt-3 max-w-2xl text-base text-muted">{project.card_subtitle}</p>
      <div className="mt-auto pt-6">
        {isActive ? (
          <span className="text-xs uppercase tracking-[0.08em] text-accent transition-colors group-hover:text-ink">
            Read →
          </span>
        ) : (
          <p className="text-xs uppercase tracking-[0.08em] text-subtle">In development</p>
        )}
      </div>
    </>
  );

  const span = project.featured ? "sm:col-span-2 lg:col-span-3" : "";
  const shellClass = `flex h-full flex-col border-t-[3px] border-ink bg-surface p-6 md:p-7 ${span}`;

  if (isActive) {
    return (
      <a
        href={`#project-${project.slug}`}
        className={`group ${shellClass} shadow-none transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-md ${focusLink} rounded-sm`}
      >
        {inner}
      </a>
    );
  }

  return (
    <article className={`${shellClass} rounded-sm`}>{inner}</article>
  );
}
