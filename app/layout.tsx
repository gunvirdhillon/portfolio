import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Grain } from "@/components/Grain";

const displaySerif = Newsreader({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-display-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gunvir.co.uk"),
  title: {
    default: "Gunvir Dhillon",
    template: "%s | Gunvir Dhillon",
  },
  description:
    "Revenue leader and GTM consultant. B2B sales, advisory, independent product builds. London.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Gunvir Dhillon",
    description:
      "Revenue leader and GTM consultant. B2B sales, advisory, independent product builds. London.",
    url: "https://gunvir.co.uk",
    siteName: "Gunvir Dhillon",
    locale: "en_GB",
    type: "website",
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
    <html lang="en-GB" className={displaySerif.variable}>
      <head>
        <link rel="dns-prefetch" href="https://drive.google.com" />
        <link rel="preconnect" href="https://drive.google.com" />
        <link rel="preconnect" href="https://docs.google.com" />
      </head>
      <body className="relative flex min-h-screen flex-col">
        <Grain />
        <a
          href="#main-content"
          className="sr-only left-4 top-4 z-[100] rounded-sm border border-rule bg-surface px-4 py-2.5 text-xs uppercase tracking-[0.08em] text-ink focus:not-sr-only focus:absolute focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-cream"
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
