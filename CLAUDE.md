# gunvir.co.uk

Personal site for Gunvir Dhillon. Read by headhunters and hiring managers, so accuracy beats flourish.

## Stack
Next.js 14 App Router, React 18, TypeScript, Tailwind 3, framer-motion. Newsreader self-hosted via next/font/local (app/fonts). Hosted on Vercel via Git integration: push to `main` deploys production; every other branch gets a preview URL.

## Commands
- `npm ci` install
- `npm run dev` dev server on :3000
- `npm run lint`, `npm run typecheck`, `npm run build` must all pass before a PR
- `npm run check:layout` with a server running (BASE_URL defaults to http://localhost:3000). In the cloud container prefix `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. The container cannot reach the live site; verify against `npm run build && npx next start`.

## Where things live
- Project cards and case notes: `lib/projects.ts` (data only)
- Hero, about, contact copy: `components/HomePageClient.tsx`
- Metadata, title, OG: `app/layout.tsx`; OG image: `public/og-image.png`
- Site constants: `lib/site.ts` (bump SITE_LAST_UPDATED when content changes)
- robots and sitemap: `app/robots.ts`, `app/sitemap.ts`

## Content rules
- The CV is the source of truth for role titles, dates and figures. Copy figures exactly as the CV writes them ($2m+, $4.4m, $140m, $70k, 130%+). Never round, restate or invent a number. If the site and CV disagree, the CV wins; ask Gunvir before adding a claim that is not on the CV.
- Noxus customers that may be named: Santander, Sky, Carlsberg. No other Noxus customer or prospect may be named anywhere: copy, alt text, comments, commit messages, PR text.
- The cosmetics client and the dental group stay anonymous.
- British English. No em-dashes. Keep the existing voice: first person, short declarative sentences, concrete figures.

## Workflow
- Never commit to `main` directly. Branch `claude/<topic>`, open a PR, check the Vercel preview, then squash-merge.
- Run lint, typecheck, build and check:layout before pushing.
