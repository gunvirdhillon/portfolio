import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="relative z-10 mx-auto w-full max-w-6xl flex-1 pad-x-safe py-24"
    >
      <h1 className="font-serif text-4xl text-ink">Page not found</h1>
      <p className="mt-4 text-muted">The page you requested does not exist.</p>
      <Link href="/" className="focus-ring link-underline mt-8 inline-block rounded-sm text-ink">
        Back to home
      </Link>
    </main>
  );
}
