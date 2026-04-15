export type ProjectStatus = "active" | "coming_soon";

export type ProjectBrochure = {
  kind: "drive";
  /** Google Drive file ID from the share link (`/file/d/<id>/view`). */
  driveFileId: string;
  /** `minimal`: constrained iframe per case study spec. `full`: rich viewer with chrome. */
  embed?: "minimal" | "full";
};

/** Optional client mark: image in /public, monogram text, or emoji (with SR label). */
export type ProjectLogo =
  | { kind: "image"; src: string; alt: string }
  | { kind: "monogram"; text: string }
  | { kind: "emoji"; glyph: string; label: string };

export type ProjectCardLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

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
  /** Override default "Scope and outputs" heading above highlights. */
  highlights_heading?: string;
  /** Visual anchor on cards and story header (optional). */
  logo?: ProjectLogo;
  /** Subtle label on project card (e.g. ticker). */
  card_badge?: string;
  /** Wider mark on the card only (e.g. partner wordmark). */
  card_logo?: ProjectCardLogo;
  brochure?: ProjectBrochure;
  /** Inline link after case study body. */
  closing_link?: { label: string; href: string };
};

export const projects: Project[] = [
  {
    slug: "global-e",
    title: "Global-e",
    descriptor: "Enterprise sales, cross-border MoR solution",
    card_subtitle: "Enterprise SaaS sales, $2M+ ARR, EU Salesperson of the Year",
    period: "2024 – 2026",
    highlights_heading: "Highlights",
    highlights: [
      "$2M+ ARR closed in 2025 at 130%+ attainment for three consecutive quarters",
      "EU Mid-Market Salesperson of the Year 2025",
      "$240k ARR competitive displacement against an entrenched incumbent at one of the UK's fastest-growing athleisure brands (£70m+ revenue)",
      "Won the 2025 Global-e AI Hackathon; now leading commercial rollout of the tool",
      "Fastest promotion in company history: SDR to Sales Manager in 8 months",
    ],
    card_badge: "NASDAQ: GLBE",
    card_logo: {
      src: "/images/global-e-logo.png",
      alt: "Global-e logo",
      width: 110,
      height: 31,
    },
    body: [
      "Global-e (NASDAQ: GLBE) sells cross-border ecommerce and Merchant of Record solutions to enterprise online retailers and global brands. I ran full-cycle sales across mid-six to seven-figure deal sizes using MEDDPICC for qualification, forecasting, and deal control.",
      "I built ROI-backed business cases for every cycle, multi-threaded across buying committees at VP and C-suite level, and steered deals through procurement, legal, and security review to signature. I partnered with the EU CEO and CRO on GTM strategy for a new product line, covering competitive positioning, territory planning, and outbound execution.",
      "The $240k competitive displacement came from one of the UK's fastest-growing athleisure brands, a £70m+ business running an entrenched incumbent. I won it through consultative selling and a differentiated commercial case.",
      "Led our team's winning entry in Global-e's 2025 AI Hackathon: an AI-powered live demo tool that shows prospects how Global-e would change their site in real time. Working with our developers, we defined which features to surface and how each one maps to a business problem, then shaped the output into something the sales team could use. Before I left, we presented the tool to Engineering, the CRO, CTO, and CPO and collaborated with those teams to plan the commercial rollout.",
    ],
    status: "active",
  },
  {
    slug: "reussite",
    title: "Réussite",
    descriptor: "Premium solitaire for iOS and Android",
    card_subtitle: "Premium iOS solitaire, built solo in React Native",
    period: "2026 – now",
    highlights: [
      "Solitaire ruleset with editorial UI and Hermès-inspired design language",
      "Built solo in React Native from zero coding experience",
      "App Store and Google Play submission pipeline in progress",
    ],
    logo: {
      kind: "emoji",
      glyph: "🃏",
      label: "Playing card (solitaire)",
    },
    body: [
      "Réussite is a solitaire game I am building alone. Familiar rules, quiet editorial UI, and a retail-style design sensibility drawn from Hermès and premium print.",
      "I built the entire app in React Native. I started with no real coding knowledge and used AI-assisted development to ship a working product. The point was to learn how developers and founders think about products so I can sell to them with more depth. That investment paid off in how I run discovery calls and how I talk to engineering stakeholders.",
      "The app targets a premium demographic. French progression naming. Restrained colour palette. No ads. Listing on the App Store and Google Play follows review.",
    ],
    status: "coming_soon",
  },
  {
    slug: "cosmetics",
    title: "Italian luxury cosmetics brand",
    descriptor:
      "Strategic redirection and GTM rebuild after a leadership transition",
    card_subtitle: "Strategic redirection and GTM rebuild",
    period: "2026",
    highlights: [
      "GTM audit against booked revenue and spend by channel",
      "Revenue model reformed to restore profitability",
      "New distribution agreements in the EU, with India and Africa in Phase 2",
      "Full site redevelopment scoped and in progress",
    ],
    logo: {
      kind: "emoji",
      glyph: "🇮🇹",
      label: "Italy flag",
    },
    body: [
      "The brand posted a loss year as leadership changed. A co-founder departed and the board needed a recovery plan tied to the P&L, with named cuts and channel bets.",
      "I compared booked revenue to spend by route, rebuilt the channel mix, and cut arenas where burn outran upside. I reformed the revenue model so the business could generate margin again, then ranked the shortest repeatable wins in trade and direct online.",
      "The work produced new EU distribution agreements and a phased expansion roadmap covering India and Africa. A full site redevelopment is in progress ahead of a late-2026 relaunch for peak season.",
      "The client has asked to remain confidential until the relaunch.",
    ],
    status: "active",
  },
  {
    slug: "manamauri",
    title: "Manamauri Energy",
    descriptor: "GTM strategy, ICP, and EU market entry",
    card_subtitle: "ICP, positioning, EU market entry, and fundraising support",
    period: "2024 – 2025",
    highlights: [
      "Commercial audit across channels, pricing, partners, and outbound",
      "ICP and positioning rebuilt with the founders",
      "Phased EU market entry plan with partner and distributor scorecards",
      "Investor deck aligned to the operating plan",
    ],
    logo: {
      kind: "emoji",
      glyph: "🇦🇪",
      label: "United Arab Emirates flag (Manamauri Energy)",
    },
    body: [
      "Manamauri had built a strong product and generated early revenue. The founders wanted to accelerate into a wider international footprint, a broader product catalogue, and new DTC channels. That transition required tighter commercial structure: a clear ICP, sharper positioning, and a phased plan for entering the EU.",
      "Together with the founding team, we mapped the channel stack, traced where pricing, partner coverage, and outbound could improve, then consolidated the ICP and positioning into a single brief. We built a phased EU market entry plan with partner and distributor scorecards, qualification steps, and talk tracks for live calls, and mirrored the strategy in the slide pack.",
      "In parallel we reworked the fundraising deck so the growth story and proof points matched the operating plan behind the round.",
      "The fundraising round closed. EastBridge Global Investments acquired Manamauri to fuel international expansion with new production facilities, extended product lines, and distribution across new markets. EU partnerships formed and a 2026 launch is planned alongside new SKUs including vitamin water and pre-workout drinks.",
    ],
    closing_link: { label: "manamauri.com →", href: "https://manamauri.com/" },
    status: "active",
  },
  {
    slug: "dental-group",
    title: "UK dental group",
    descriptor: "Commercial support for a first practice acquisition",
    card_subtitle: "GTM strategy and commercial advisory",
    period: "2023 – 2024",
    highlights: [
      "Deal sizing, funding sequence, and term debt structure",
      "Post-close pricing, staffing, and vendor rationalisation",
      "KPI stack from zero: cadence, targets, and unit economics",
      "Invisalign pricing and marketing strategy that drove a provider tier upgrade",
    ],
    logo: {
      kind: "emoji",
      glyph: "🇬🇧",
      label: "United Kingdom flag",
    },
    body: [
      "The client, an experienced dentist, was acquiring a first practice. Clinical expertise and commercial operations require different skills, and the second set needed building from scratch. That gap defined the scope.",
      "On the buy side I sized the deal, sequenced short-term funding and term debt, and mapped the balance-sheet decisions that would matter after handover. After close I moved to operations: pricing, staffing, in-house efficiency, and keeping vendor spend narrow while building a roadmap past the first site.",
      "I built the KPI stack from a blank sheet with metrics, cadence, and targets by stage. The group now routes major decisions through operating numbers and unit economics.",
      "A specific win came from reworking the Invisalign pricing and marketing strategy. The changes drove a sharp increase in Invisalign case volume, which earned the practice an upgrade in its Invisalign provider tier and improved both compliance and operational efficiency across the board.",
    ],
    status: "active",
  },
  {
    slug: "10x-music",
    title: "10X Music",
    descriptor:
      "Live events and artist management to high six-figure revenue, acquired within 13 months",
    card_subtitle: "Founder. £0 to high six figures in 13 months, then acquired.",
    period: "2022 – 2023",
    highlights: [
      "Built 10X Live production stack and five-stage sales process",
      "200+ deals closed, 42% conversion, 14 accounts, team of 6",
      "HubSpot: inbound triage, reporting, velocity tracking by region",
      "Revenue to high six figures in 13 months, then acquisition",
    ],
    logo: {
      kind: "emoji",
      glyph: "🌍",
      label: "Globe (international markets)",
    },
    body: [
      "I had worked in live events since 2016 and built an extensive network across venues, brands, and promoters. I founded 10X Music to consolidate artist development, the label, and production under one roof.",
      "Clients booked large South Asian weddings and galas with Bollywood and Punjabi talent, staging at scale, and spend across the UK, India, the Gulf, and North America. 10X Live sold on production quality: wide LED walls, 20 ft mirrored floors in silver, gold, or custom print, and CAD floor plans signed before load-in. Each booking ran consultation, priced package, contract, post-sale site visits, invite and signage artwork, then an onsite show call. Staff in Birmingham, Delhi, and Dubai ran delivery end to end.",
      "I built marketing funnels based on best practices for music and event management that leveraged the artists' reach, which drove heavy inbound deal flow and fuelled the fast growth. HubSpot workflows covered inbound triage, finance closes, and velocity tracking by region across the UK, India, US, EU, and UAE.",
      "I closed more than 200 deals at 42% conversion, carried 14 live accounts, and led six people across time zones.",
      "Revenue crossed high six figures in thirteen months. A buyer acquired the business weeks later. That cycle compressed pricing, partner terms, and how build quality supports a premium price into one window.",
    ],
    status: "active",
    brochure: {
      kind: "drive",
      driveFileId:
        process.env.NEXT_PUBLIC_10X_BROCHURE_DRIVE_FILE_ID?.trim() ||
        "1c5m0i5CaI38hYidcmn9KF5TYIaI3lvw2",
      embed: "minimal",
    },
  },
];

/** Home grid order (newest first). */
export const homeProjectSlugs = [
  "global-e",
  "reussite",
  "cosmetics",
  "manamauri",
  "dental-group",
  "10x-music",
] as const;

/** Work timeline page: same engagements as home, same order. */
export function getWorkProjects(): Project[] {
  return homeProjectSlugs.map((slug) => {
    const p = getProjectBySlug(slug);
    if (!p) throw new Error(`Missing project for slug: ${slug}`);
    return p;
  });
}

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
