import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

const displaySerif = localFont({
  src: [
    { path: "./fonts/newsreader-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/newsreader-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-display-serif",
  display: "swap",
});

/* Ledger Sans: OFL Latin subset of Lato (see app/fonts/OFL-ledger-sans.txt). */
const bodySans = localFont({
  src: [
    { path: "./fonts/ledger-sans-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ledger-sans-latin-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-body-sans",
  display: "swap",
});

const SITE_TITLE = "Gunvir Dhillon | Enterprise Account Executive, AI and SaaS";
const SITE_DESCRIPTION =
  "Founding AE at Noxus (enterprise AI). $2m+ ARR at 130%+ attainment at Global-e; EU Mid-Market Salesperson of the Year 2025. London.";
const SOCIAL_DESCRIPTION =
  "Founding AE at Noxus, enterprise AI: $4.4m qualified pipeline in five months. Before that, $2m+ ARR at 130%+ attainment at Global-e. London.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s | Gunvir Dhillon" },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SOCIAL_DESCRIPTION,
    url: `${SITE_URL}/`,
    siteName: "Gunvir Dhillon",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SOCIAL_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${displaySerif.variable} ${bodySans.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://drive.google.com" />
        <link rel="preconnect" href="https://drive.google.com" />
        <link rel="preconnect" href="https://docs.google.com" />
      </head>
      <body className="relative flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only left-4 top-4 z-[100] rounded-sm bg-accent px-4 py-2.5 text-sm font-bold text-ink focus:not-sr-only focus:absolute focus:outline-none focus:ring-2 focus:ring-band-ink focus:ring-offset-2 focus:ring-offset-band"
        >
          Skip to main content
        </a>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
