# gunvir.co.uk

Personal site: **Next.js 14** (App Router), **Tailwind CSS**, **Framer Motion**. The experience is a **single long home page**: hero, a **Selected projects** card grid, then **case notes** (full copy for each project) on the same scroll. There are no separate project detail pages.

## Content and layout

| What | Where |
|------|--------|
| Project copy, periods, highlights, optional brochure Drive ID | [`lib/projects.ts`](lib/projects.ts) |
| Home layout (hero, grid, stacked stories) | [`components/HomePageClient.tsx`](components/HomePageClient.tsx) |
| One project’s long-form block | [`components/ProjectStorySection.tsx`](components/ProjectStorySection.tsx) |
| Site constants (LinkedIn URL, canonical `SITE_URL`, `SITE_LAST_UPDATED` for the sitemap) | [`lib/site.ts`](lib/site.ts) |
| robots.txt and sitemap.xml | [`app/robots.ts`](app/robots.ts), [`app/sitemap.ts`](app/sitemap.ts) |

**Typography:** display serif is **Newsreader**, self-hosted from [`app/fonts`](app/fonts) via [`next/font/local`](app/layout.tsx) (no build-time call to Google Fonts); body uses the **system sans** stack in [`tailwind.config.ts`](tailwind.config.ts).

**Navigation:** the nav shows **About**, **Projects**, **LinkedIn** and **Contact**. About, Projects and Contact jump to in-page anchors on the home page; **LinkedIn** opens the [LinkedIn profile](https://www.linkedin.com/in/gunvirdhillon/) in a new tab. Project cards link to in-page anchors `#project-<slug>`.

**Legacy URLs:** `/projects` and `/work` redirect to `/`. `/projects/<slug>` redirects to `/?p=<slug>`; the home page scrolls to that project and then clears the query from the address bar.

## Local development

```bash
cd portfolio
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Before opening a PR, run `npm run lint`, `npm run typecheck` and `npm run build`, then start the production server (`npx next start`) and run `npm run check:layout` (Playwright layout check at 1512, 1280, 1024, 768, 390 and 360px). Run `npx playwright install chromium` once first.

If the dev server or build behaves oddly after dependency or route changes, reset the Next cache:

```bash
npm run clean
npm run dev
```

## Working with Claude Code

Project conventions, commands and content rules for Claude Code live in [`CLAUDE.md`](CLAUDE.md); shared permissions are in [`.claude/settings.json`](.claude/settings.json). Work on a `claude/<topic>` branch and open a PR; Vercel builds a preview for every branch and deploys `main` to production.

## Deploy (Vercel + GitHub)

This project is a **standalone repo root** (not a subdirectory inside another app). Import the `portfolio` repository in Vercel with default root directory **`.`**.

### Checklist

1. **GitHub + Vercel:** Push the repo, import it in Vercel, deploy until the `*.vercel.app` URL works. Use the **Next.js** framework preset; leave **Output Directory** empty (this app is not a static export to `public`). [`vercel.json`](vercel.json) sets `"framework": "nextjs"` to help detection.
2. **Custom domain:** Vercel → Project → Settings → Domains → add `gunvir.co.uk` (and optionally `www.gunvir.co.uk`). Use the exact DNS records Vercel shows.
3. **Cloudflare DNS:** For `gunvir.co.uk`, add/update apex **A** (or as Vercel specifies) and **www** **CNAME** to Vercel’s target; remove conflicting records. If the certificate stays pending, set those records to **DNS only** (grey cloud), wait for Vercel to issue SSL, then reassess.
4. **Verify:** `https://gunvir.co.uk` loads with a valid certificate; **LinkedIn** (new tab) and **About**, **Projects**, **Contact** (in-page anchors) behave as expected; scrolling reaches all case sections; old links such as `/projects/manamauri` redirect to home and land on the right block.
