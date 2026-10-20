import { getHomeProjects } from "@/lib/projects";
import { HomePageClient } from "@/components/HomePageClient";
import { PROFILE } from "@/lib/profile";
import { SITE_URL } from "@/lib/site";

/** schema.org ProfilePage + Person, read by search engines and AI agents. */
const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: `${SITE_URL}/`,
  mainEntity: {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: PROFILE.name,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/og-image.png`,
    jobTitle: "Enterprise Account Executive",
    description: PROFILE.summary,
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "GB",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Queen Mary University of London",
    },
    award: PROFILE.award,
    knowsAbout: PROFILE.skills,
    sameAs: [PROFILE.links.linkedin],
  },
};

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />
      <HomePageClient projects={projects} scrollToSlug={scrollToSlug} />
    </main>
  );
}
