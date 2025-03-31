// app/contact/page.tsx
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
import { JSX } from 'react';
import ContactPageClient from './components/ContactClient';

// --- Page Specific Config ---
const PAGE_TITLE = `Contact Us | ${SITE_NAME} | Book Your Eastbourne Stay`;
const PAGE_DESCRIPTION = `Contact ${SITE_NAME} to inquire about availability, ask questions, or book your luxury seafront stay in Eastbourne. Get in touch today!`;
const PAGE_CANONICAL_URL = `${BASE_URL}/contact`;
const CONTACT_KEYWORDS = [
    "contact us", "booking inquiry", "availability check", "phone number", "email address",
    "address", "map", "book Eastbourne flat", ...DEFAULT_KEYWORDS
];
const OG_IMAGE_ALT = `Contact ${SITE_NAME} for luxury seafront accommodation in Eastbourne`;

export const metadata: Metadata = {
    // Core
    metadataBase: new URL(BASE_URL),
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: CONTACT_KEYWORDS, // Use contact-specific keywords
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
                url: OG_IMAGE_URL, // Use general OG image
                width: OG_IMAGE_WIDTH,
                height: OG_IMAGE_HEIGHT,
                alt: OG_IMAGE_ALT, // Use contact-specific alt text
            },
        ],
        locale: LOCALE,
        type: "website", // Could be "profile" or "contact" if very specific
    },

    // Twitter
    twitter: {
        card: "summary_large_image",
        title: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        images: [TWITTER_IMAGE_URL],
    },

     // --- Common settings (can optionally be omitted if inherited from root layout) ---
    robots: { index: true, follow: true },
    icons: {
        icon: `${ICON_FOLDER}favicon.ico`,
        shortcut: `${ICON_FOLDER}favicon-16x16.png`,
        apple: `${ICON_FOLDER}apple-touch-icon.png`,
    },
    manifest: MANIFEST_URL,
    viewport: { width: "device-width", initialScale: 1 },
    verification: { google: GOOGLE_VERIFICATION_TOKEN },
};

export default function ContactPage() : JSX.Element {
  return <ContactPageClient />;
}