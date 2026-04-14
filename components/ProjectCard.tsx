import type { Project } from "@/lib/projects";
import { ProjectMark } from "@/components/ProjectMark";

const focusLink =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const isActive = project.status === "active";

  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 font-serif text-xl text-ink md:text-2xl">
          {project.title}
        </h3>
        {project.logo ? <ProjectMark logo={project.logo} /> : null}
      </div>
      <p className="mt-1 text-xs uppercase tracking-[0.08em] text-subtle">
        {project.period}
      </p>
      <p className="mt-3 text-base text-muted">{project.card_subtitle}</p>
      {isActive ? (
        <span className="mt-6 inline-block text-xs uppercase tracking-[0.08em] text-accent transition-colors group-hover:text-ink">
          Read →
        </span>
      ) : (
        <p className="mt-6 text-xs uppercase tracking-[0.08em] text-subtle">
          In development
        </p>
      )}
    </>
  );

  const shellClass =
    "border-t-[3px] border-ink bg-surface p-6 md:p-7";

  if (isActive) {
    return (
      <a
        href={`#project-${project.slug}`}
        className={`group block ${shellClass} shadow-none transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-md ${focusLink} rounded-sm`}
      >
        {inner}
      </a>
    );
  }

  return (
    <article className={`${shellClass} rounded-sm`}>{inner}</article>
  );
}
