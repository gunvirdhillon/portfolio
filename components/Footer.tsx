export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-band relative z-10 mt-auto bg-band text-band-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 border-t border-band-rule pad-x-safe pt-8 pb-[max(2rem,env(safe-area-inset-bottom,0px))] text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>London, UK</p>
        <p>© {year} Gunvir Dhillon</p>
      </div>
    </footer>
  );
}
