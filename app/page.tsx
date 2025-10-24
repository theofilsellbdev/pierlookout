// app/page.tsx
import type { Metadata } from "next";
import HomeClient from "./components/HomeClient";
import { JSX } from "react";

// --- Site Metadata (concise, polished tone) ---
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://pierlookout--pierlookout.europe-west4.hosted.app";

const SITE_TITLE = "Pier Lookout — Seafront Views from a Regency Flat in Eastbourne";
const SITE_DESCRIPTION =
  "Top-floor regency apartment with uninterrupted views over Eastbourne Pier and the seafront. A refined coastal stay with effortless access to beach, promenade, and town.";

// Recommended OG size: 1200×630
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;
const OG_IMAGE_URL = `${BASE_URL}/og-image.jpg`;       // place in /public
const TWITTER_IMAGE_URL = `${BASE_URL}/twitter-image.jpg`; // place in /public
const FAVICON_BASE = "/"; // favicons in /public root

// Optional: read your Search Console token from env if you have it
const GOOGLE_VERIFICATION_TOKEN =
  process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_TOKEN || "YOUR_GOOGLE_VERIFICATION_TOKEN";

/**
 * Page metadata (App Router)
 * Uses static assets and a clear, editorial tone.
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    // Core
    metadataBase: new URL(BASE_URL),
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    keywords: [
      "Eastbourne accommodation",
      "seafront flat",
      "Eastbourne Pier",
      "luxury accommodation",
      "holiday rental",
      "East Sussex coast",
      "sea views",
    ],

    // Canonical
    alternates: { canonical: BASE_URL },

    // Open Graph
    openGraph: {
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      url: BASE_URL,
      siteName: "Pier Lookout",
      images: [
        {
          url: OG_IMAGE_URL,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: "Panoramic sea view across Eastbourne Pier from the Pier Lookout apartment.",
        },
      ],
      locale: "en_GB",
      type: "website",
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      images: [TWITTER_IMAGE_URL],
    },

    // Robots / Googlebot
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
        "noarchive": false,
      },
    },

    // Icons (static files in /public)
    icons: {
      icon: `${FAVICON_BASE}favicon.ico`,
      shortcut: `${FAVICON_BASE}favicon-16x16.png`,
      apple: `${FAVICON_BASE}apple-touch-icon.png`,
      // You can add 32x32/192x192 variants here if you have them
    },

    // PWA manifest (optional)
    manifest: `${FAVICON_BASE}site.webmanifest`,

    // Viewport
    viewport: {
      width: "device-width",
      initialScale: 1,
      // themeColor: "#ffffff",
    },

    // Search Console verification
    verification: {
      google: GOOGLE_VERIFICATION_TOKEN,
    },

    // Category
    category: "travel",
  };
}

export default function Home(): JSX.Element {
  return <HomeClient />;
}