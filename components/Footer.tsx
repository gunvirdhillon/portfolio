export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-auto border-t border-rule">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 pad-x-safe pt-8 pb-[max(2rem,env(safe-area-inset-bottom,0px))] sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1 text-base text-muted">
          <p>London, UK</p>
          <p className="text-sm text-subtle">© {year} Gunvir Dhillon</p>
        </div>
      </div>
    </footer>
  );
}
