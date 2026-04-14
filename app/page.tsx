import { getHomeProjects } from "@/lib/projects";
import { HomePageClient } from "@/components/HomePageClient";

type HomeProps = {
  searchParams?: { p?: string };
};

export default function Home({ searchParams }: HomeProps) {
  const projects = getHomeProjects();
  const scrollToSlug = searchParams?.p?.trim() || undefined;

  return (
    <main id="main-content" className="flex-1">
      <HomePageClient projects={projects} scrollToSlug={scrollToSlug} />
    </main>
  );
}
