import Link from "next/link";
import { LINKEDIN_PROFILE_URL } from "@/lib/site";

const linkClass =
  "text-xs uppercase tracking-[0.08em] text-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

export function Nav() {
  return (
    <header className="relative z-10 border-b border-rule">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between pad-x-safe pb-6 pt-[max(1.5rem,env(safe-area-inset-top,0px))]"
        aria-label="Main"
      >
        <Link href="/" className={linkClass}>
          Gunvir Dhillon
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 sm:gap-x-6">
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
          <a href="/#contact" className={linkClass}>
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
