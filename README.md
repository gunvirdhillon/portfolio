# gunvir.co.uk

Personal site: **Next.js 14** (App Router), **Tailwind CSS**, **Framer Motion**. The experience is a **single long home page**: hero, a **Selected projects** card grid, then **case notes** (full copy for each project) on the same scroll. There are no separate project detail pages.

## Content and layout

| What | Where |
|------|--------|
| Project copy, periods, highlights, optional brochure Drive ID | [`lib/projects.ts`](lib/projects.ts) |
| Home layout (hero, grid, stacked stories) | [`components/HomePageClient.tsx`](components/HomePageClient.tsx) |
| One project’s long-form block | [`components/ProjectStorySection.tsx`](components/ProjectStorySection.tsx) |
| Site constants (LinkedIn URL, “Last updated”) | [`lib/site.ts`](lib/site.ts) |

**Typography:** display serif is **Newsreader** via [`next/font/google`](app/layout.tsx); body uses the **system sans** stack in [`tailwind.config.ts`](tailwind.config.ts).

**Navigation:** **Work** opens your [LinkedIn profile](https://www.linkedin.com/in/gunvirdhillon/) in a new tab. **Projects** jumps to `/#selected-projects` on the home page. Project cards link to in-page anchors `#project-<slug>`.

**Legacy URLs:** `/projects` redirects to `/`. `/projects/<slug>` redirects to `/?p=<slug>`; the home page scrolls to that project and then clears the query from the address bar.

## Local development

```bash
cd gunvirsite
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

If the dev server or build behaves oddly after dependency or route changes, reset the Next cache:

```bash
npm run clean
npm run dev
```

## Deploy (Vercel + GitHub)

This project is a **standalone repo root** (not a subdirectory inside another app). Import the `gunvirsite` repository in Vercel with default root directory **`.`**.

### Checklist

1. **GitHub + Vercel:** Push the repo, import it in Vercel, deploy until the `*.vercel.app` URL works.
2. **Custom domain:** Vercel → Project → Settings → Domains → add `gunvir.co.uk` (and optionally `www.gunvir.co.uk`). Use the exact DNS records Vercel shows.
3. **Cloudflare DNS:** For `gunvir.co.uk`, add/update apex **A** (or as Vercel specifies) and **www** **CNAME** to Vercel’s target; remove conflicting records. If the certificate stays pending, set those records to **DNS only** (grey cloud), wait for Vercel to issue SSL, then reassess.
4. **Verify:** `https://gunvir.co.uk` loads with a valid certificate; **Work** (LinkedIn) and **Projects** (in-page anchor) behave as expected; scrolling reaches all case sections; old links such as `/projects/manamauri` redirect to home and land on the right block.
