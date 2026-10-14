import Link from "next/link";
import { LINKEDIN_PROFILE_URL } from "@/lib/site";

const linkClass =
  "focus-ring rounded-sm py-1 text-[0.9375rem] text-band-muted transition-colors hover:text-band-ink";

export function Nav() {
  return (
    <header className="on-band relative z-10 bg-band text-band-ink">
      <nav
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 pad-x-safe pb-5 pt-[max(1.25rem,env(safe-area-inset-top,0px))]"
        aria-label="Main"
      >
        <Link
          href="/"
          className="focus-ring rounded-sm font-serif text-xl font-semibold tracking-tight text-band-ink"
        >
          Gunvir Dhillon
        </Link>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-7">
          <a href="/#about" className={linkClass}>
            About
          </a>
          <a href="/#selected-projects" className={linkClass}>
            Projects
          </a>
          <a
            href={LINKEDIN_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            LinkedIn ↗
          </a>
          <a
            href="/#contact"
            className="focus-ring rounded-sm border border-band-rule px-3 py-1 text-[0.9375rem] text-band-ink transition-colors hover:border-accent"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
