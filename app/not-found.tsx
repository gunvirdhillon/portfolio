import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="page flex-1 py-24"
    >
      <h1 className="text-[2.5rem] font-[340] leading-tight">Page not found</h1>
      <p className="mt-4 text-muted">The page you requested does not exist.</p>
      <Link href="/" className="link mt-8 inline-block">
        Back to home
      </Link>
    </main>
  );
}
