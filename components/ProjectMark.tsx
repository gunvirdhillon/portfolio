import Image from "next/image";
import type { ProjectLogo } from "@/lib/projects";

const monoShell =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center border border-rule bg-cream font-mono text-[10px] font-medium leading-none tracking-tight text-ink md:h-10 md:w-10 md:text-[11px]";

const emojiShell =
  "inline-flex h-9 w-9 shrink-0 select-none items-center justify-center border border-rule bg-surface text-lg leading-none md:h-10 md:w-10 md:text-xl";

type ProjectMarkProps = {
  logo?: ProjectLogo;
  className?: string;
};

export function ProjectMark({ logo, className }: ProjectMarkProps) {
  if (!logo) return null;
  if (logo.kind === "emoji") {
    return (
      <span
        role="img"
        aria-label={logo.label}
        className={`${emojiShell} ${className ?? ""}`}
      >
        {logo.glyph}
      </span>
    );
  }
  if (logo.kind === "monogram") {
    return (
      <span className={`${monoShell} ${className ?? ""}`} aria-hidden>
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
      className={`h-9 w-9 shrink-0 border border-rule bg-surface object-contain md:h-10 md:w-10 ${className ?? ""}`}
    />
  );
}
