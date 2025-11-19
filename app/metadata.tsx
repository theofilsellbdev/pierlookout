import type { Metadata, Viewport } from "next";

// --- Configuration Constants ---
const SITE_TITLE =
  "Pier Lookout, Seafront Views from a regency Flat in Eastbourne";
const SITE_DESCRIPTION =
  "A top floor regency flat with breathtaking views of the Eastbourne pier and seafront. Enjoy an apartment with perfect sea views.";
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://pierlookout--pierlookout.europe-west4.hosted.app";

// Recommended OG Image size: 1200x630 (1.91:1 ratio)
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;
const OG_IMAGE_URL = `${BASE_URL}/og-image.jpg`;
const TWITTER_IMAGE_URL = `${BASE_URL}/twitter-image.jpg`;
const FAVICON_BASE = "/";

// ✅ Viewport must be exported separately
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // themeColor: "#ffffff",
};

// ✅ Only SEO metadata here – no `viewport` key
export async function generateMetadata(): Promise<Metadata> {
  return {
    // Core
    metadataBase: new URL(BASE_URL),
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    keywords: [
      "Eastbourne accommodation",
      "seafront flat",
      "Eastbourne pier",
      "luxury accommodation",
      "holiday rental",
      "East Sussex coast",
      "sea views",
    ],

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
          alt: "Sea view from Pier Lookout apartment window in Eastbourne",
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

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
        noarchive: false,
      },
    },

    // Icons
    icons: {
      icon: `${FAVICON_BASE}favicon.ico`,
      shortcut: `${FAVICON_BASE}favicon-16x16.png`,
      apple: `${FAVICON_BASE}apple-touch-icon.png`,
    },

    // Manifest
    manifest: `${FAVICON_BASE}site.webmanifest`,

    // Verification (swap in your real token when ready)
    verification: {
      google: "YOUR_GOOGLE_VERIFICATION_TOKEN",
    },

    // Canonical
    alternates: {
      canonical: BASE_URL,
    },

    category: "travel",
  };
}