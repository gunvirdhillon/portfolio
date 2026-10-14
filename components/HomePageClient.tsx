"use client";

import { MotionConfig } from "framer-motion";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import type { Project } from "@/lib/projects";
import { getProjectBySlug } from "@/lib/projects";
import { HeroItem, HeroSequence, Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectStorySection } from "@/components/ProjectStorySection";
import { ObfuscatedEmail } from "@/components/ObfuscatedEmail";
import { LINKEDIN_PROFILE_URL } from "@/lib/site";

type HomePageClientProps = {
  projects: Project[];
  scrollToSlug?: string;
};

/* Headline figures, quoted exactly as they appear in the case notes. */
const heroStats = [
  { figure: "$4.4m", label: "qualified pipeline in five months", source: "Noxus" },
  { figure: "$2m+", label: "ARR closed in 2025", source: "Global-e" },
  { figure: "130%+", label: "attainment for three consecutive quarters", source: "Global-e" },
] as const;

function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="font-serif text-[clamp(1.75rem,2.2vw+1rem,2.5rem)] font-normal leading-[1.1] tracking-tight text-ink"
    >
      {children}
    </h2>
  );
}

export function HomePageClient({ projects, scrollToSlug }: HomePageClientProps) {
  const didScrollRef = useRef(false);

  useEffect(() => {
    if (!scrollToSlug || didScrollRef.current) return;
    if (!getProjectBySlug(scrollToSlug)) return;
    const el = document.getElementById(`project-${scrollToSlug}`);
    if (!el) return;
    didScrollRef.current = true;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState({}, "", "/");
  }, [scrollToSlug]);

  return (
    <MotionConfig reducedMotion="user">
      {/* Hero: continues the navy band from the header */}
      <div className="on-band bg-band text-band-ink">
        <HeroSequence className="mx-auto max-w-6xl pad-x-safe pb-14 pt-10 md:pb-20 md:pt-16">
          <HeroItem>
            <h1 className="text-balance font-serif text-[clamp(2.75rem,6vw+1rem,5.75rem)] font-normal leading-[1.02] tracking-[-0.02em] text-band-ink">
              Enterprise seller. Builder.
            </h1>
          </HeroItem>
          <HeroItem className="mt-8 max-w-measure md:mt-10">
            <p className="text-pretty text-[1.1875rem] leading-[1.6] text-band-ink md:text-xl">
              I am the founding Account Executive at Noxus, a seed-stage enterprise AI
              company, and its Head of Value Engineering since September 2026.
            </p>
            <p className="mt-4 text-pretty leading-[1.7] text-band-muted">
              I expanded Santander into a global framework agreement and built the
              outbound engine behind $4.4m of qualified pipeline in five months. Before
              that I closed $2m+ ARR in 2025 at 130%+ attainment at Global-e (NASDAQ:
              GLBE) and won EU Mid-Market Salesperson of the Year 2025. London.
            </p>
          </HeroItem>
          <HeroItem className="mt-12 md:mt-16">
            <dl className="grid grid-cols-2 border-t border-band-rule lg:grid-cols-4">
              {heroStats.map((s) => (
                <div
                  key={s.figure}
                  className="flex flex-col border-b border-band-rule py-6 pr-4 even:border-l even:pl-4 sm:pr-6 sm:even:pl-6 lg:border-b-0 lg:border-r lg:px-6 lg:even:border-l-0 lg:first:pl-0"
                >
                  <dt className="order-2 mt-3 text-[0.875rem] leading-snug text-band-ink sm:text-[0.9375rem]">
                    {s.label}
                    <span className="mt-1 block text-sm text-band-muted">{s.source}</span>
                  </dt>
                  <dd className="tabular order-1 font-serif text-[clamp(2.25rem,4vw+1rem,4rem)] leading-none tracking-tight text-accent">
                    {s.figure}
                  </dd>
                </div>
              ))}
              <div className="col-span-2 flex flex-col justify-end border-b border-band-rule py-6 lg:col-span-1 lg:border-b-0 lg:pl-6">
                <dt className="sr-only">Award</dt>
                <dd className="font-serif text-[clamp(1.5rem,1vw+1.1rem,1.875rem)] leading-[1.15] text-band-ink">
                  EU Mid-Market Salesperson of the Year 2025
                  <span className="mt-2 block font-sans text-sm text-band-muted">Global-e</span>
                </dd>
              </div>
            </dl>
          </HeroItem>
        </HeroSequence>
      </div>

      <div className="mx-auto max-w-6xl pad-x-safe">
        {/* About */}
        <section
          id="about"
          aria-labelledby="about-heading"
          className="py-16 md:py-24"
        >
          <Reveal className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
            <SectionHeading id="about-heading">About</SectionHeading>
            <div className="min-w-0">
              <p className="max-w-measure text-balance font-serif text-[clamp(1.625rem,1.6vw+1.1rem,2.25rem)] leading-[1.2] text-ink">
                I sell enterprise software and I build things.
              </p>
              <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
                <div>
                  <h3 className="border-t-2 border-ink pt-3 text-sm font-bold text-ink">Now</h3>
                  <p className="mt-3 text-pretty text-muted">
                    Since May 2026 I have been the founding Account Executive at
                    Noxus, which automates business processes with AI for large
                    enterprises. I expanded Santander, own the Sky account, built the
                    company&apos;s first outbound engine and SDR team, and now lead
                    value engineering: the use cases, ROI models and sales plays the
                    team runs.
                  </p>
                </div>
                <div>
                  <h3 className="border-t-2 border-ink pt-3 text-sm font-bold text-ink">Before</h3>
                  <p className="mt-3 text-pretty text-muted">
                    Before Noxus I carried quota at Global-e for nearly two years,
                    closing cross-border Merchant of Record deals with enterprise
                    merchants and global brands. Before that I founded and sold a live
                    events business in 13 months, managed a $140m market data book at
                    Macquarie Group, and ran investment analysis for a family office in
                    Dubai.
                  </p>
                </div>
                <div>
                  <h3 className="border-t-2 border-ink pt-3 text-sm font-bold text-ink">Alongside</h3>
                  <p className="mt-3 text-pretty text-muted">
                    Alongside the day job I advise early-stage companies on GTM and
                    commercial strategy, and I build my own products. Réussite, a
                    premium solitaire app for iOS and Android, is the current one. I
                    vibe-coded the first version with minimal programming knowledge.
                    Shipping it taught me how developers think, which makes me a
                    sharper seller.
                  </p>
                </div>
                <div>
                  <h3 className="border-t-2 border-ink pt-3 text-sm font-bold text-ink">Why</h3>
                  <p className="mt-3 text-pretty text-muted">
                    I like solving problems for people and watching them get results.
                    That instinct sits behind every deal I close and every advisory
                    engagement I take on.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Project grid */}
        <section
          id="selected-projects"
          aria-labelledby="projects-heading"
          className="border-t border-rule py-16 md:py-24"
        >
          <Reveal>
            <SectionHeading id="projects-heading">Selected projects</SectionHeading>
          </Reveal>
          <Reveal className="mt-10">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </Reveal>
        </section>

        {/* Case notes */}
        <section aria-labelledby="case-notes-heading" className="border-t border-rule pt-16 md:pt-24">
          <Reveal>
            <SectionHeading id="case-notes-heading">Case notes</SectionHeading>
          </Reveal>
          <div className="mt-10 md:mt-14">
            {projects.map((p) => (
              <ProjectStorySection key={p.slug} project={p} sectionId={`project-${p.slug}`} />
            ))}
          </div>
        </section>
      </div>

      {/* Contact: opens the navy band that closes the page */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="on-band bg-band text-band-ink"
      >
        <Reveal className="mx-auto grid max-w-6xl gap-8 pad-x-safe py-16 md:py-24 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
          <h2
            id="contact-heading"
            className="font-serif text-[clamp(1.75rem,2.2vw+1rem,2.5rem)] font-normal leading-[1.1] tracking-tight text-band-ink"
          >
            Get in touch
          </h2>
          <div className="min-w-0 space-y-6">
            <p className="font-serif text-[clamp(1.5rem,3vw+0.5rem,2.75rem)] leading-tight [overflow-wrap:anywhere]">
              <ObfuscatedEmail />
            </p>
            <p>
              <a
                href={LINKEDIN_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring link-underline rounded-sm text-band-ink"
              >
                Message on LinkedIn →
              </a>
            </p>
          </div>
        </Reveal>
      </section>
    </MotionConfig>
  );
}
