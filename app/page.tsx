import { getHomeProjects } from "@/lib/projects";
import { HomePageClient } from "@/components/HomePageClient";

const SCROLL_SLUG_ALIASES: Record<string, string> = {
  "card-game": "reussite",
};

type HomeProps = {
  searchParams?: { p?: string };
};

export default function Home({ searchParams }: HomeProps) {
  const projects = getHomeProjects();
  const raw = searchParams?.p?.trim() || undefined;
  const scrollToSlug =
    raw && SCROLL_SLUG_ALIASES[raw] ? SCROLL_SLUG_ALIASES[raw] : raw;

  return (
    <main id="main-content" className="flex-1">
      <HomePageClient projects={projects} scrollToSlug={scrollToSlug} />
    </main>
  );
}
