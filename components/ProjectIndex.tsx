import type { Project } from "@/lib/projects";
import { smart } from "@/lib/typography";

/**
 * The project list as a ruled index: company, result, dates. Each row jumps
 * to its case note further down the page.
 */
export function ProjectIndex({ projects }: { projects: Project[] }) {
  return (
    <ul data-index className="border-b border-rule">
      {projects.map((p, i) => (
        <li key={p.slug} data-index-row className="border-t border-rule first:border-t-0">
          <a
            href={`#project-${p.slug}`}
            className={`group grid gap-x-8 gap-y-1 py-4 lg:grid-cols-[14rem_minmax(0,1fr)_7.5rem] lg:items-baseline lg:py-[1.125rem] ${
              i === 0 ? "lg:pt-1" : ""
            }`}
          >
            <span
              data-index-name
              className="text-[1.5rem] leading-tight decoration-green decoration-1 underline-offset-[0.2em] group-hover:underline lg:text-[1.625rem]"
            >
              {p.title}
            </span>
            <span className="text-pretty text-muted lg:text-ink">{smart(p.card_subtitle)}</span>
            <span className="tabular order-first text-[0.9375rem] text-muted lg:order-none lg:text-right lg:text-[1rem]">
              {p.period}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
