import { LINKEDIN_PROFILE_URL, SITE_LAST_UPDATED } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-auto border-t border-rule">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 pad-x-safe pt-8 pb-[max(2rem,env(safe-area-inset-bottom,0px))] sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1 text-base text-muted">
          <p>London, UK</p>
          <p className="text-sm text-subtle">
            Last updated {SITE_LAST_UPDATED} · © {year} Gunvir Dhillon
          </p>
        </div>
        <a
          href={LINKEDIN_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-rule px-4 py-2.5 text-xs uppercase tracking-[0.08em] text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          <svg
            className="h-4 w-4 shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Message on LinkedIn
        </a>
      </div>
    </footer>
  );
}
