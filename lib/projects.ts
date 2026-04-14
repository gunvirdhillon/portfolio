export type ProjectStatus = "active" | "coming_soon";

export type ProjectBrochure = {
  kind: "drive";
  /** Google Drive file ID from the share link (`/file/d/<id>/view`). */
  driveFileId: string;
};

/** Optional client mark: image in /public, monogram text, or emoji (with SR label). */
export type ProjectLogo =
  | { kind: "image"; src: string; alt: string }
  | { kind: "monogram"; text: string }
  | { kind: "emoji"; glyph: string; label: string };

export type Project = {
  slug: string;
  title: string;
  descriptor: string;
  card_subtitle: string;
  body: string[];
  status: ProjectStatus;
  /** Human-readable engagement window. */
  period: string;
  /** Scannable outputs (optional). */
  highlights?: string[];
  /** Visual anchor on cards (optional). */
  logo?: ProjectLogo;
  brochure?: ProjectBrochure;
};

export const projects: Project[] = [
  {
    slug: "manamauri",
    title: "Manamauri Energy",
    descriptor: "GTM strategy, ICP, and EU market entry",
    card_subtitle: "ICP, positioning and EU market entry",
    period: "2024 – 2025",
    highlights: [
      "Commercial audit across channels, pricing, partners, outbound",
      "ICP and positioning rewritten with founders",
      "Phased EU market entry plan with partner scorecards",
      "Investor deck aligned to operating plan",
    ],
    logo: {
      kind: "emoji",
      glyph: "🇳🇿",
      label: "New Zealand flag (Manamauri Energy)",
    },
    body: [
      "Manamauri had a strong product and early revenue; commercial rails still trailed. Channel partners and investors heard a diffuse story because routes to market had grown ad hoc, the ICP lived in conversation only, and spend did not line up with stated priorities.",
      "With the founders I mapped the channel stack, traced bottlenecks in pricing, partner work, and outbound, then wrote the ICP and positioning into a single brief. We filed a phased EU market entry plan next: partner and distributor scorecards, qualification steps, and talk tracks for live calls, mirrored in the slide pack.",
      "In parallel I reworked the fundraising pack so the growth story and proof points matched the operating plan behind the round.",
    ],
    status: "active",
  },
  {
    slug: "dental-group",
    title: "UK dental group",
    descriptor: "Commercial support for a dentist buying a first practice",
    card_subtitle: "GTM strategy and commercial advisory",
    period: "2023 – 2024",
    highlights: [
      "Deal sizing, funding sequence, term debt structure",
      "Post-close pricing, staffing, vendor rationalisation",
      "KPI stack from zero: cadence, targets, unit economics",
    ],
    logo: {
      kind: "emoji",
      glyph: "🇬🇧",
      label: "United Kingdom flag",
    },
    body: [
      "The client was a senior dentist buying a first practice. Strength in the chair does not teach cap tables, bank covenants, or day-two clinic operations. That gap set the scope.",
      "On the buy side I sized the deal, sequenced short-term funding and term debt, and mapped balance-sheet choices that would matter after handover. After close the focus moved to the floor: pricing, staffing, efficiency through in-house skills with vendor spend kept narrow, and a roadmap for growth past the first site.",
      "We built KPIs from a blank sheet: metrics, cadence, and targets by stage. The group now routes major calls through operating numbers and unit economics.",
    ],
    status: "active",
  },
  {
    slug: "10x-music",
    title: "10X Music",
    descriptor:
      "Live events and artist management to high six-figure revenue, acquired within 13 months",
    card_subtitle: "Founder, exit, £0 to high six figures",
    period: "2016 – 2017",
    highlights: [
      "Built 10X Live production stack and five-stage sales process",
      "200+ deals closed, 42% conversion, 14 accounts, team of 6",
      "HubSpot: inbound triage, reporting, velocity by region",
      "Revenue to high six figures in 13 months, then acquisition",
    ],
    logo: {
      kind: "emoji",
      glyph: "🌍",
      label: "Globe (international markets)",
    },
    body: [
      "Clients booked large South Asian weddings and galas with Bollywood and Punjabi talent, staging at scale, and spend across the UK, India, the Gulf, and North America. I founded 10X Music to own artist development, the label, and production in one shop.",
      "10X Live sold on production: wide LED, 20 ft mirrored floors in silver, gold, or custom print, and CAD floor plans signed before load-in. Each booking ran consultation, priced package, contract, post-sale site visits plus invite and signage artwork, then onsite show call. Staff in Birmingham, Delhi, and Dubai ran delivery end to end.",
      "I closed more than 200 deals at 42% conversion, carried 14 live accounts, and led six people across time zones. HubSpot workflows covered inbound triage, finance closes, and velocity by region across the UK, India, US, EU, and UAE.",
      "Revenue crossed high six figures in thirteen months. A buyer closed weeks later. That window packed pricing, partner terms, cross-border logistics, and how build quality supports premium price into one cycle.",
    ],
    status: "active",
    brochure: {
      kind: "drive",
      driveFileId:
        process.env.NEXT_PUBLIC_10X_BROCHURE_DRIVE_FILE_ID?.trim() ||
        "1Gfowc8h6LPzYfj6qmi5_9sFrw684qYs-",
    },
  },
  {
    slug: "cosmetics",
    title: "Italian DTC cosmetics brand",
    descriptor:
      "Strategic redirection and GTM rebuild after a leadership transition",
    card_subtitle: "Commercial turnaround and GTM rebuild",
    period: "2024",
    highlights: [
      "GTM audit vs booked revenue and spend by route",
      "Channel mix rebuilt, low-upside arenas cut",
      "Phased profit plan: trade and DTC, emerging markets shelf",
    ],
    logo: {
      kind: "emoji",
      glyph: "🇮🇹",
      label: "Italy flag",
    },
    body: [
      "The business posted a loss year as leadership changed. The board wanted a blunt stay-execution plan tied to the P&L, with named cuts and channel bets.",
      "I compared booked revenue to spend by route, rebuilt channel mix, dropped arenas where burn beat upside, and ranked the shortest repeatable wins in trade and in direct online.",
      "Emerging categories and geographies offered room before entrenched players boxed the brand in. The output was a phased profit plan for the next budget cycles plus a shelf of plays for later scale.",
    ],
    status: "active",
  },
  {
    slug: "card-game",
    title: "Mobile card game",
    descriptor: "Premium iOS solitaire, in development",
    card_subtitle: "App Store and Play, coming soon",
    period: "2025 – now",
    highlights: [
      "Solitaire ruleset, editorial UI, retail-style marketing surfaces",
      "App Store and Google Play submission pipeline",
    ],
    logo: {
      kind: "emoji",
      glyph: "🃏",
      label: "Playing card (solitaire)",
    },
    body: [
      "Réussite is solitaire I am building alone: familiar rules, quiet editorial UI, retail-style marketing pages.",
      "Listing on the App Store and Google Play follows review.",
    ],
    status: "coming_soon",
  },
];

/** Home grid order per site reference (differs from `projects` array order). */
export const homeProjectSlugs = [
  "dental-group",
  "manamauri",
  "10x-music",
  "cosmetics",
  "card-game",
] as const;

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
  return projects;
}

export function getHomeProjects(): Project[] {
  return homeProjectSlugs.map((slug) => {
    const p = getProjectBySlug(slug);
    if (!p) throw new Error(`Missing project for slug: ${slug}`);
    return p;
  });
}
