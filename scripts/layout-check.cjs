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
    // Scroll through once so every scroll-reveal block has settled before measuring.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo({ top: y, behavior: "instant" }); await new Promise((r) => setTimeout(r, 60)); }
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    await page.waitForTimeout(900);
    const r = await page.evaluate(() => {
      const problems = [];
      const grid = document.querySelector("#selected-projects .grid");
      const cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
      const cards = [...grid.children];
      if (document.documentElement.scrollWidth > window.innerWidth) problems.push("horizontal scroll");
      for (const c of cards) {
        const h3 = c.querySelector("[data-card-title]");
        if (!h3) { problems.push("card without [data-card-title]"); continue; }
        const name = h3.textContent.trim();
        const cw = c.getBoundingClientRect().width;
        if (cw < 260) problems.push(`${name}: card ${Math.round(cw)}px wide (min 260)`);
        if (h3.scrollWidth > h3.clientWidth + 1) problems.push(`${name}: title overflows`);
        if (c.scrollWidth > c.clientWidth + 1) problems.push(`${name}: card content overflows horizontally`);
        const box = (el) => el.getBoundingClientRect();
        const overlaps = (a, b) => !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
        const mark = c.querySelector("[data-card-mark]");
        if (!mark) problems.push(`${name}: no company mark`);
        else {
          const visible = [...mark.querySelectorAll("img, [role=img], span[aria-hidden]")].filter((el) => {
            const st = getComputedStyle(el);
            return st.opacity !== "0" && st.display !== "none" && el.getBoundingClientRect().width > 0;
          });
          if (!visible.length) problems.push(`${name}: company mark renders nothing`);
          if (overlaps(box(mark), box(h3))) problems.push(`${name}: mark overlaps title`);
          if (box(mark).right > box(c).right + 1) problems.push(`${name}: mark overflows card`);
        }
        const badge = c.querySelector("[data-card-badge]");
        if (badge) {
          if (box(badge).height > 30) problems.push(`${name}: badge wraps`);
          if (box(badge).right > box(c).right + 1) problems.push(`${name}: badge overflows card`);
        }
      }
      const tops = cards.map((c) => Math.round(c.getBoundingClientRect().top));
      const lastTop = Math.max(...tops);
      const lastRow = tops.filter((t) => t === lastTop).length;
      const spansRow = cards[cards.length - 1].getBoundingClientRect().width > grid.clientWidth * 0.9;
      if (cols > 1 && lastRow < cols && !spansRow) problems.push(`orphan: ${lastRow} card(s) on a ${cols}-column last row`);
      const logo = document.querySelector("#selected-projects img[src*='global-e']");
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
      const stats = [...document.querySelectorAll("#main-content dl > div")];
      for (let i = 0; i < stats.length; i++)
        for (let j = i + 1; j < stats.length; j++) {
          const a = stats[i].getBoundingClientRect(), b = stats[j].getBoundingClientRect();
          if (!(a.right <= b.left + 1 || a.left >= b.right - 1 || a.bottom <= b.top + 1 || a.top >= b.bottom - 1))
            problems.push(`hero stats ${i} and ${j} overlap`);
        }
      for (const dd of document.querySelectorAll("#main-content dl dd"))
        if (dd.scrollWidth > dd.clientWidth + 1) problems.push(`stat "${dd.textContent.trim().slice(0, 20)}" overflows`);
      for (const id of ["about", "selected-projects", "contact"])
        if (!document.getElementById(id)) problems.push(`missing #${id}`);
      if (document.querySelectorAll("section[id^='project-']").length !== cards.length)
        problems.push("case note count does not match card count");
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
