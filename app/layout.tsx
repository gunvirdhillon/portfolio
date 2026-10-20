import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

/* Newsreader variable (opsz 6 to 72, wght 200 to 800), OFL. One family sets everything. */
const newsreader = localFont({
  src: [
    { path: "./fonts/newsreader-latin-opsz-normal.woff2", weight: "200 800", style: "normal" },
    { path: "./fonts/newsreader-latin-opsz-italic.woff2", weight: "200 800", style: "italic" },
  ],
  variable: "--font-newsreader",
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
    types: { "text/plain": "/llms.txt" },
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
    <html lang="en-GB" className={newsreader.variable}>
      <head>
        <link rel="dns-prefetch" href="https://drive.google.com" />
        <link rel="preconnect" href="https://drive.google.com" />
        <link rel="preconnect" href="https://docs.google.com" />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only left-4 top-4 z-[100] bg-ink px-4 py-2 text-paper focus:not-sr-only focus:absolute"
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
