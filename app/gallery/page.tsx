// app/gallery/page.tsx
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
} from '@/config/metadata.config'; // Adjust path

import GalleryPageClient from './components/GalleryPageClient';
import { JSX } from 'react';

// --- Page Specific Config ---
const PAGE_TITLE = `Photo Gallery | ${SITE_NAME} | Eastbourne Seafront Views`;
const PAGE_DESCRIPTION = `Browse photos of ${SITE_NAME}'s elegant interior, bedrooms, kitchen, and stunning sea views from our luxury Eastbourne seafront flat.`;
const PAGE_CANONICAL_URL = `${BASE_URL}/gallery`;
const GALLERY_KEYWORDS = [
    "photo gallery", "images", "pictures", "interior design", "bedroom photos", "kitchen photos",
    "sea view photos", "Eastbourne photos", ...DEFAULT_KEYWORDS
];
const OG_IMAGE_ALT = `Gallery images showcasing ${SITE_NAME}'s luxury interior and sea views`;

export const metadata: Metadata = {
    // Core
    metadataBase: new URL(BASE_URL),
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: GALLERY_KEYWORDS, // Use gallery-specific keywords
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
                url: OG_IMAGE_URL, // Consider a gallery-specific OG image if desired
                width: OG_IMAGE_WIDTH,
                height: OG_IMAGE_HEIGHT,
                alt: OG_IMAGE_ALT, // Use gallery-specific alt text
            },
        ],
        locale: LOCALE,
        type: "website", // Could be "photo.gallery" if more specific needed
    },

    // Twitter
    twitter: {
        card: "summary_large_image",
        title: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        images: [TWITTER_IMAGE_URL],
    },

    // --- Common settings (can optionally be omitted if inherited from root layout) ---
    robots: { index: true, follow: true }, // Simplified, inherit details from layout if set there
    icons: {
        icon: `${ICON_FOLDER}favicon.ico`,
        shortcut: `${ICON_FOLDER}favicon-16x16.png`,
        apple: `${ICON_FOLDER}apple-touch-icon.png`,
    },
    manifest: MANIFEST_URL,
    viewport: { width: "device-width", initialScale: 1 },
    verification: { google: GOOGLE_VERIFICATION_TOKEN },
};

export default function GalleryPage() : JSX.Element {
  return <GalleryPageClient />;
}