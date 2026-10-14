/** One line, set in the text column so it does not mirror the header. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="page mt-auto pb-[max(2.5rem,env(safe-area-inset-bottom,0px))] pt-24">
      <div className="page-grid">
        <p className="col-text tabular text-[0.9375rem] text-muted">
          © {year} Gunvir Dhillon, London, UK
        </p>
      </div>
    </footer>
  );
}
