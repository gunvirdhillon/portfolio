import type { Project } from "@/lib/projects";
import { CompanyMark } from "@/components/ProjectMark";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const isActive = project.status === "active";
  const featured = Boolean(project.featured);
  const tone = featured ? "dark" : "light";

  const c = featured
    ? {
        shell: "on-band bg-band text-band-ink border-accent sm:col-span-2 lg:col-span-3",
        meta: "text-band-muted",
        role: "text-band-muted",
        rule: "border-band-rule",
        result: "text-band-ink",
        badge: "border-band-rule text-band-muted",
        cta: "text-accent",
      }
    : {
        shell: "bg-surface text-ink border-ink",
        meta: "text-subtle",
        role: "text-muted",
        rule: "border-rule",
        result: "text-ink",
        badge: "border-rule text-subtle",
        cta: "text-ink",
      };

  const head = (
    <div className="flex min-h-10 items-center justify-between gap-4">
      <div data-card-mark className="flex h-10 items-center">
        <CompanyMark project={project} tone={tone} priority />
      </div>
      <p className={`tabular shrink-0 text-sm ${c.meta}`}>{project.period}</p>
    </div>
  );

  const titleBlock = (
    <>
      <h3
        data-card-title
        className={`font-serif font-normal leading-[1.1] tracking-tight [overflow-wrap:anywhere] ${
          featured ? "mt-6 text-[clamp(1.75rem,3vw+0.5rem,2.5rem)]" : "mt-5 text-[1.625rem]"
        }`}
      >
        {project.title}
      </h3>
      {project.card_badge ? (
        <p
          data-card-badge
          className={`mt-2 inline-block self-start whitespace-nowrap border px-2 py-0.5 text-xs ${c.badge}`}
        >
          {project.card_badge}
        </p>
      ) : null}
      <p className={`mt-3 text-[0.9375rem] leading-relaxed ${c.role}`}>{project.descriptor}</p>
    </>
  );

  const result = (
    <p
      className={`text-pretty ${c.result} ${
        featured ? "font-serif text-[clamp(1.25rem,1.2vw+0.9rem,1.625rem)] leading-snug" : "text-base leading-relaxed"
      }`}
    >
      {project.card_subtitle}
    </p>
  );

  const cta = isActive ? (
    <span className={`text-sm font-bold ${c.cta} underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-current`}>
      Read the case note
    </span>
  ) : (
    <span className={`text-sm ${c.meta}`}>In development</span>
  );

  const inner = featured ? (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
      <div>
        {head}
        {titleBlock}
      </div>
      <div className={`flex flex-col border-t pt-6 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-1 ${c.rule}`}>
        {result}
        <div className="mt-auto pt-6">{cta}</div>
      </div>
    </div>
  ) : (
    <>
      {head}
      {titleBlock}
      <div className={`mt-5 border-t pt-4 ${c.rule}`}>{result}</div>
      <div className="mt-auto pt-6">{cta}</div>
    </>
  );

  const shellClass = `flex h-full flex-col border-t-[3px] p-6 md:p-8 ${c.shell}`;

  if (isActive) {
    return (
      <a
        data-card
        href={`#project-${project.slug}`}
        className={`group focus-ring ${shellClass}`}
      >
        {inner}
      </a>
    );
  }

  return (
    <article data-card className={shellClass}>
      {inner}
    </article>
  );
}
