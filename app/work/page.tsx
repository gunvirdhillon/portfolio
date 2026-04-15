import type { Metadata } from "next";
import Link from "next/link";
import { ProjectMark } from "@/components/ProjectMark";
import { getWorkProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Timeline of GTM advisory, enterprise sales, founder builds, and product work. Dates, bullets, and links to full case notes.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work | Gunvir Dhillon",
    url: "/work",
  },
};

const linkClass =
  "text-xs uppercase tracking-[0.08em] text-accent transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cream rounded-sm";

export default function WorkPage() {
  const workProjects = getWorkProjects();

  return (
    <main
      id="main-content"
      className="relative z-10 mx-auto max-w-3xl flex-1 pad-x-safe py-16 md:py-24"
    >
      <Link href="/" className={linkClass}>
        ← Home
      </Link>
      <h1 className="mt-10 font-serif text-[clamp(2rem,5vw+1rem,3.75rem)] font-normal leading-tight tracking-tight text-ink">
        Work
      </h1>
      <div className="mt-8 space-y-5 text-muted leading-relaxed">
        <p>
          Ten-plus years in B2B revenue and GTM: enterprise sales, founder-side
          builds, and board-facing turnarounds where the plan had to tie to the
          P&amp;L. I take advisory and interim commercial mandates alongside
          products I build under my own name.
        </p>
        <p>
          The grid on the home page is the same set of engagements as below,
          ordered for layout. This page adds dates and bullets so you can scan
          fast, then open the case note when you want narrative detail.
        </p>
      </div>

      <div
        className="mt-10 flex flex-wrap gap-3 border-y border-rule py-6"
        aria-label="Engagement marks"
      >
        {workProjects.map((p) =>
          p.logo ? (
            <div key={p.slug} className="flex items-center gap-2">
              <ProjectMark logo={p.logo} />
              <span className="text-xs uppercase tracking-[0.08em] text-subtle">
                {p.title}
              </span>
            </div>
          ) : null
        )}
      </div>

      <div className="mt-12">
        {workProjects.map((project, i) => (
          <section
            key={project.slug}
            aria-labelledby={`work-${project.slug}-heading`}
            className={i > 0 ? "mt-16 border-t border-rule pt-16 md:mt-20 md:pt-20" : ""}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex min-w-0 flex-1 items-start gap-4">
                {project.logo ? <ProjectMark logo={project.logo} /> : null}
                <div className="min-w-0">
                  <h2
                    id={`work-${project.slug}-heading`}
                    className="font-serif text-xl font-normal leading-tight text-ink md:text-2xl"
                  >
                    {project.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted">{project.period}</p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-base text-muted">{project.descriptor}</p>
            {project.highlights && project.highlights.length > 0 ? (
              <ul className="mt-6 list-inside list-disc space-y-2 text-ink marker:text-accent">
                {project.highlights.map((item) => (
                  <li key={item} className="pl-1">
                    <span className="-ml-1">{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="mt-8">
              {project.status === "active" ? (
                <Link
                  href={`/projects/${project.slug}`}
                  className={linkClass}
                >
                  Case note →
                </Link>
              ) : (
                <span className="text-xs uppercase tracking-[0.08em] text-subtle">
                  In development
                </span>
              )}
            </p>
          </section>
        ))}
      </div>
    </main>
  );
}
