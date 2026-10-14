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
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const r = await page.evaluate(() => {
      const problems = [];
      const grid = document.querySelector("#selected-projects .grid");
      const cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
      const cards = [...grid.children];
      if (document.documentElement.scrollWidth > window.innerWidth) problems.push("horizontal scroll");
      for (const c of cards) {
        const h3 = c.querySelector("h3");
        const name = h3.textContent.trim();
        const cw = c.getBoundingClientRect().width;
        if (cw < 260) problems.push(`${name}: card ${Math.round(cw)}px wide (min 260)`);
        if (h3.scrollWidth > h3.clientWidth + 1) problems.push(`${name}: title overflows`);
        const mark = c.querySelector("img, [role=img], span[aria-hidden]");
        if (mark) {
          const m = mark.getBoundingClientRect(), t = h3.getBoundingClientRect();
          if (!(m.right <= t.left || m.left >= t.right || m.bottom <= t.top || m.top >= t.bottom))
            problems.push(`${name}: mark overlaps title`);
        }
        const badge = h3.nextElementSibling;
        if (badge && badge.textContent.includes(":") && badge.getBoundingClientRect().height > 20)
          problems.push(`${name}: badge wraps`);
      }
      const tops = cards.map((c) => Math.round(c.getBoundingClientRect().top));
      const lastTop = Math.max(...tops);
      const lastRow = tops.filter((t) => t === lastTop).length;
      const spansRow = cards[cards.length - 1].getBoundingClientRect().width > grid.clientWidth * 0.9;
      if (cols > 1 && lastRow < cols && !spansRow) problems.push(`orphan: ${lastRow} card(s) on a ${cols}-column last row`);
      const logo = document.querySelector("#selected-projects img");
      if (logo && logo.getAttribute("loading") === "lazy") problems.push("card logo is lazy-loaded");
      for (const li of document.querySelectorAll("section[id^='project-'] li")) {
        const range = document.createRange();
        range.selectNodeContents(li);
        const rects = [...range.getClientRects()].filter((x) => x.width > 0);
        if (rects.length > 1 && Math.abs(rects[0].left - rects[rects.length - 1].left) > 2) {
          problems.push(`no hanging indent: "${li.textContent.slice(0, 40)}"`);
          break;
        }
      }
      return { cols, n: cards.length, problems };
    });
    if (OUT) await page.screenshot({ path: `${OUT}/home-${width}.png`, fullPage: true });
    console.log(`${width}px: ${r.cols} cols, ${r.n} cards, ${r.problems.length ? "FAIL" : "ok"}`);
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
