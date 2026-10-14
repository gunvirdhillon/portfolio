import Link from "next/link";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#selected-projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

/** One line: name left, three links right, a hairline underneath. */
export function Nav() {
  return (
    <header className="page pt-[max(1.25rem,env(safe-area-inset-top,0px))]">
      <nav
        aria-label="Main"
        className="flex items-baseline justify-between gap-6 border-b border-rule pb-4"
      >
        <Link href="/" className="text-[1.0625rem] font-medium">
          Gunvir Dhillon
        </Link>
        <ul className="flex items-baseline gap-5 text-[1rem] text-muted sm:gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
