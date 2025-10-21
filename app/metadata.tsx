import { Metadata } from 'next';
// Removed Firebase imports as we'll use static images for core metadata

// --- Configuration Constants ---
const SITE_TITLE = "Pier Lookout, Seafront Views from a regency Flat in Eastbourne";
const SITE_DESCRIPTION = "A top floor regency flat with breathtaking views of the Eastbourne pier and seafront. Enjoy an apartment with perfect sea views.";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://pierlookout--pierlookout.europe-west4.hosted.app'; // Use env var if available

// Recommended OG Image size: 1200x630 (1.91:1 ratio)
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;
const OG_IMAGE_URL = `${BASE_URL}/og-image.jpg`; // Place 'og-image.jpg' (1200x630) in /public folder
const TWITTER_IMAGE_URL = `${BASE_URL}/twitter-image.jpg`; // Place 'twitter-image.jpg' (e.g., 1200x630 or 1024x512) in /public folder
const FAVICON_BASE = "/"; // Assuming favicons are in the /public root

/**
 * Generates metadata using static assets for core elements.
 */
export async function generateMetadata(): Promise<Metadata> {

  // --- Metadata Object ---
  return {
    // **Core Metadata**
    metadataBase: new URL(BASE_URL), // Important for resolving relative image paths
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    keywords: [
        "Eastbourne accommodation",
        "seafront flat",
        "Eastbourne pier",
        "luxury accommodation",
        "holiday rental",
        "East Sussex coast",
        "sea views"
      ], // Added a few relevant keywords

    // **Open Graph (Facebook, LinkedIn, etc.)**
    openGraph: {
      title: SITE_TITLE, // Use consistent title
      description: SITE_DESCRIPTION, // Use consistent description
      url: BASE_URL, // Canonical URL for the page being shared
      siteName: "Pier Lookout",
      images: [
        {
          url: OG_IMAGE_URL, // Static URL to image in /public
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: "Sea view from Pier Lookout apartment window in Eastbourne", // More specific alt text
        },
        // You could add more images here if needed
      ],
      locale: "en_GB",
      type: "website",
    },

    // **Twitter Card**
    twitter: {
      card: "summary_large_image",
      title: SITE_TITLE, // Use consistent title
      description: SITE_DESCRIPTION, // Use consistent description
      // No need for creator/site tags unless you have specific Twitter handles
      images: [TWITTER_IMAGE_URL], // Static URL to image in /public (can be same as OG_IMAGE_URL)
    },

    // **Search Engine Directives**
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large", // Allow large image previews in search results
        "max-snippet": -1, // Allow Google to choose snippet length
        "max-video-preview": -1, // Allow video previews if applicable
        "noarchive": false, // Allow caching (usually desired)
      },
    },

    // **Icons (MUST be static paths in /public)**
    icons: {
      icon: `${FAVICON_BASE}favicon.ico`, // Standard favicon
      shortcut: `${FAVICON_BASE}favicon-16x16.png`, // Legacy shortcut
      apple: `${FAVICON_BASE}apple-touch-icon.png`, // Apple touch icon
      // Consider adding other sizes like 192x192 for Android Chrome
      // other: [
      //   { rel: 'icon', type: 'image/png', sizes: '32x32', url: `${FAVICON_BASE}favicon-32x32.png` },
      //   { rel: 'icon', type: 'image/png', sizes: '192x192', url: `${FAVICON_BASE}android-chrome-192x192.png` },
      // ],
    },

     // **Manifest (for PWA features)**
     manifest: `${FAVICON_BASE}site.webmanifest`, // Place site.webmanifest in /public


    // **Viewport Configuration**
    viewport: {
      width: "device-width",
      initialScale: 1,
      // Add theme color if applicable
      // themeColor: '#ffffff',
    },

    // **Verification**
    verification: {
      // Add your actual Google Search Console verification token
      google: "YOUR_GOOGLE_VERIFICATION_TOKEN",
      // Add other verification tokens if needed (e.g., Bing, Yandex)
      // yandex: '...',
      // other: {
      //   me: ['my-email@example.com', 'my-link@example.com'],
      // }
    },

    // **Canonical URL**
    alternates: {
      canonical: BASE_URL, // Canonical URL for the homepage
      // Add language alternates if applicable
      // languages: {
      //   'en-US': 'https://example.com/en-US',
      // },
    },

    // **Other Useful Tags**
    // assets: ['https://example.com/assets/'], // If you host assets elsewhere
    category: 'travel', // Category relevant to your site
  };
}