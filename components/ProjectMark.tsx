import Image from "next/image";
import type { Project, ProjectLogo } from "@/lib/projects";
import { NoxusMark } from "@/components/NoxusMark";

const tileShell =
  "inline-flex h-10 w-10 shrink-0 select-none items-center justify-center border border-rule bg-paper leading-none";

type ProjectMarkProps = {
  logo?: ProjectLogo;
  className?: string;
};

export function ProjectMark({ logo, className = "" }: ProjectMarkProps) {
  if (!logo) return null;
  if (logo.kind === "emoji") {
    return (
      <span role="img" aria-label={logo.label} className={`${tileShell} text-xl ${className}`}>
        {logo.glyph}
      </span>
    );
  }
  if (logo.kind === "monogram") {
    return (
      <span
        className={`${tileShell} font-serif text-base font-semibold text-ink ${className}`}
        aria-hidden
      >
        {logo.text}
      </span>
    );
  }
  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={40}
      height={40}
      className={`h-10 w-10 shrink-0 border border-rule bg-surface object-contain ${className}`}
    />
  );
}

type CompanyMarkProps = {
  project: Project;
  tone?: "light" | "dark";
  priority?: boolean;
};

/** The one mark per company used on cards and case-note rails. */
export function CompanyMark({ project, tone = "light", priority = false }: CompanyMarkProps) {
  if (project.slug === "noxus") return <NoxusMark tone={tone} />;
  if (project.card_logo) {
    return (
      <Image
        src={project.card_logo.src}
        alt={project.card_logo.alt}
        width={project.card_logo.width}
        height={project.card_logo.height}
        unoptimized
        priority={priority}
        className="h-8 w-auto"
      />
    );
  }
  return <ProjectMark logo={project.logo} />;
}
