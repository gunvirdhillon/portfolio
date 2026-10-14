import Image from "next/image";
import type { Project } from "@/lib/projects";

/**
 * The company as it heads a case note: its wordmark where we have one, the
 * name in type otherwise. Wordmarks are set in ink so the page stays
 * monochrome; Noxus ships a white version for the dark scheme, Global-e is
 * inverted.
 */
export function CompanyName({ project }: { project: Project }) {
  const logo = project.logo;
  if (!logo) return <>{project.title}</>;

  const height = project.slug === "noxus" ? 28 : 36;
  const width = Math.round((logo.width / logo.height) * height);
  /* Lazy, so only the variant for the active colour scheme is fetched. */
  const common = { width, height, loading: "lazy" as const };

  if (logo.darkSrc) {
    return (
      <>
        <Image {...common} src={logo.src} alt={logo.alt} className="block dark:hidden" />
        <Image {...common} src={logo.darkSrc} alt={logo.alt} className="hidden dark:block" />
      </>
    );
  }
  return (
    <Image
      {...common}
      unoptimized
      src={logo.src}
      alt={logo.alt}
      className="block brightness-0 dark:invert"
    />
  );
}
