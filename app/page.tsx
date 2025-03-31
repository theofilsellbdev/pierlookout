// app/page.tsx
import { Metadata } from 'next';
import {
    SITE_NAME,
    BASE_URL,
    OG_IMAGE_URL,
    TWITTER_IMAGE_URL,
    OG_IMAGE_WIDTH,
    OG_IMAGE_HEIGHT,
    ICON_FOLDER,
    DEFAULT_KEYWORDS,
    GOOGLE_VERIFICATION_TOKEN,
    LOCALE,
    MANIFEST_URL
} from '@/config/metadata.config'; // Adjust path if necessary
import { JSX } from 'react';
import HomeClient from './components/HomeClient';

// --- Page Specific Config ---
const PAGE_TITLE = `${SITE_NAME} | Luxury Seafront Accommodation in Eastbourne`;
const PAGE_DESCRIPTION = "A top floor regency flat with breathtaking views of the Eastbourne pier and seafront. Enjoy luxury accommodation with perfect sea views.";
const PAGE_CANONICAL_URL = BASE_URL; // Homepage canonical is the base URL
const OG_IMAGE_ALT = "Panoramic sea view from Pier Lookout apartment window in Eastbourne";

export const metadata: Metadata = {
    // Core
    metadataBase: new URL(BASE_URL),
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS,
    alternates: {
        canonical: PAGE_CANONICAL_URL,
    },

    // Open Graph
    openGraph: {
        title: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        url: PAGE_CANONICAL_URL,
        siteName: SITE_NAME,
        images: [
            {
                url: OG_IMAGE_URL,
                width: OG_IMAGE_WIDTH,
                height: OG_IMAGE_HEIGHT,
                alt: OG_IMAGE_ALT,
            },
        ],
        locale: LOCALE,
        type: "website",
    },

    // Twitter
    twitter: {
        card: "summary_large_image",
        title: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        images: [TWITTER_IMAGE_URL], // Use the defined Twitter image
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
            "noarchive": false,
        },
    },

    // Icons
    icons: {
        icon: `${ICON_FOLDER}favicon.ico`,
        shortcut: `${ICON_FOLDER}favicon-16x16.png`,
        apple: `${ICON_FOLDER}apple-touch-icon.png`,
    },
    manifest: MANIFEST_URL,


    // Viewport
    viewport: {
        width: "device-width",
        initialScale: 1,
    },

    // Verification
    verification: {
        google: GOOGLE_VERIFICATION_TOKEN,
    },

    // Other
    category: 'travel',
};

export default function Home(): JSX.Element {
  return (
    <HomeClient />
  );
}