// Responsive layout check for the home page. Usage: BASE_URL=http://localhost:3000 node scripts/layout-check.cjs
const { chromium } = require("playwright");

const BASE = process.env.BASE_URL || "http://localhost:3000";
const WIDTHS = [1512, 1280, 1024, 768, 390, 360];
const OUT = process.env.SHOT_DIR || "";

(async () => {
  const browser = await chromium.launch();
  let failed = 0;
  for (const width of WIDTHS) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const bad = [];
    page.on("response", (res) => {
      if (res.status() >= 400 && res.url().startsWith(BASE)) bad.push(`${res.status()} ${res.url().slice(BASE.length)}`);
    });
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    // Scroll through once so lazy images load before measuring.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo({ top: y, behavior: "instant" }); await new Promise((r) => setTimeout(r, 60)); }
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    await page.waitForTimeout(600);
    const r = await page.evaluate(() => {
      const problems = [];
      const box = (el) => el.getBoundingClientRect();
      const overlaps = (a, b) => !(a.right <= b.left + 1 || a.left >= b.right - 1 || a.bottom <= b.top + 1 || a.top >= b.bottom - 1);
      if (document.documentElement.scrollWidth > window.innerWidth) problems.push("horizontal scroll");

      // Project index: one row per case note, cells never collide or overflow.
      const rows = [...document.querySelectorAll("[data-index-row]")];
      for (const row of rows) {
        const a = row.querySelector("a");
        const cells = [...a.children];
        const name = row.querySelector("[data-index-name]")?.textContent.trim() || "?";
        if (a.scrollWidth > a.clientWidth + 1) problems.push(`${name}: index row overflows`);
        for (let i = 0; i < cells.length; i++)
          for (let j = i + 1; j < cells.length; j++)
            if (overlaps(box(cells[i]), box(cells[j]))) problems.push(`${name}: index cells ${i} and ${j} overlap`);
        const target = document.querySelector(a.getAttribute("href"));
        if (!target) problems.push(`${name}: index link has no target`);
      }
      const notes = document.querySelectorAll("[data-case-note]");
      if (notes.length !== rows.length) problems.push(`case notes (${notes.length}) do not match index rows (${rows.length})`);

      // Wordmarks: visible variant has loaded and has the right accessible name.
      for (const alt of ["Noxus", "Global-e"]) {
        const shown = [...document.querySelectorAll(`img[alt="${alt}"]`)].filter((img) => img.getBoundingClientRect().width > 0);
        if (shown.length !== 1) problems.push(`${alt}: ${shown.length} visible wordmarks (expected 1)`);
        else if (!shown[0].complete || shown[0].naturalWidth === 0) problems.push(`${alt}: wordmark failed to load`);
      }

      // Measure: running text stays at or under about 75 characters a line.
      for (const p of document.querySelectorAll("[data-case-note] .indented > p, #about p")) {
        const cs = getComputedStyle(p);
        const chars = p.clientWidth / (parseFloat(cs.fontSize) * 0.46);
        if (chars > 78) { problems.push(`measure ${Math.round(chars)} characters: "${p.textContent.slice(0, 30)}"`); break; }
      }

      // Nothing pokes out of its column.
      for (const el of document.querySelectorAll("h1, h2, h3, li, p"))
        if (el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflowX === "visible" && el.clientWidth > 0) {
          problems.push(`overflow: <${el.tagName.toLowerCase()}> "${el.textContent.trim().slice(0, 30)}"`);
          break;
        }

      for (const id of ["about", "selected-projects", "contact"])
        if (!document.getElementById(id)) problems.push(`missing #${id}`);
      return { n: rows.length, problems };
    });
    for (const b of bad) r.problems.push(`request failed: ${b}`);
    if (OUT) await page.screenshot({ path: `${OUT}/home-${width}.png`, fullPage: true });
    console.log(`${width}px: ${r.n} index rows, ${r.problems.length ? "FAIL" : "ok"}`);
    r.problems.forEach((p) => console.log(`  - ${p}`));
    failed += r.problems.length;
    await page.close();
  }
  const page = await browser.newPage();
  for (const path of ["/robots.txt", "/sitemap.xml"]) {
    const res = await page.request.get(`${BASE}${path}`);
    console.log(`${path}: ${res.status()}`);
    if (res.status() !== 200) failed++;
  }
  await browser.close();
  process.exit(failed ? 1 : 0);
})();
