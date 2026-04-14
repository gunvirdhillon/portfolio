import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="relative z-10 mx-auto max-w-6xl flex-1 pad-x-safe py-24"
    >
      <h1 className="font-serif text-2xl text-ink">Page not found</h1>
      <p className="mt-4 text-muted">
        The page you requested does not exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block text-xs uppercase tracking-[0.08em] text-accent transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cream rounded-sm"
      >
        ← Back to home
      </Link>
    </main>
  );
}
