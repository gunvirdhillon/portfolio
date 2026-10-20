/**
 * Machine-readable profile shared by /llms.txt and the JSON-LD on the home page.
 * Every claim here already appears on the site or the CV; keep figures string
 * for string with the CV and update this file when the site copy changes.
 */
import { LINKEDIN_PROFILE_URL, SITE_URL } from "@/lib/site";

export const PROFILE = {
  name: "Gunvir Dhillon",
  headline: "Enterprise Account Executive · AI and B2B SaaS · Founding AE",
  location: "London, UK",
  summary:
    "Enterprise and mid-market seller who closes complex B2B software deals and builds pipeline where none existed. Founding Account Executive at Noxus, a seed-stage enterprise AI company, from May 2026: expanded Santander into a global framework agreement and built the outbound engine behind $4.4m of qualified pipeline in five months. At Global-e, closed $2m+ ARR at 130%+ attainment and won EU Mid-Market Salesperson of the Year 2025. MEDDPICC-trained; sells to COO, CFO and operations leaders at $1bn+ companies through procurement, legal and security reviews.",
  earlier: [
    "Founded and sold 10X Music, a live events and artist management business, in 13 months: 200+ deals at 42% conversion.",
    "Managed a $140m market data book at Macquarie Group.",
    "Investment analysis for a family office in Dubai (MST Investments).",
  ],
  award: "EU Mid-Market Salesperson of the Year 2025 (Global-e)",
  education: "BSc (Hons) Economics, Queen Mary University of London",
  skills: [
    "Enterprise and mid-market SaaS sales",
    "MEDDPICC",
    "Outbound pipeline generation",
    "Value engineering and ROI business cases",
    "SDR team setup",
    "GTM strategy",
    "AI workflow automation",
  ],
  links: {
    site: `${SITE_URL}/`,
    linkedin: LINKEDIN_PROFILE_URL,
    contact: `${SITE_URL}/#contact`,
  },
} as const;
