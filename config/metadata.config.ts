// src/config/metadata.config.ts

export const SITE_NAME = "Pier Lookout";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://pierlookout.vercel.app';

// --- Image Config ---
// Place these images in your /public folder
export const OG_IMAGE_URL = `${BASE_URL}/og-image.jpg`;         // Main OG Image (1200x630)
export const TWITTER_IMAGE_URL = `${BASE_URL}/twitter-image.jpg`; // Twitter Image (can be same as OG or 1024x512)
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const ICON_FOLDER = "/"; // Assuming favicons are in /public root

// --- Default Keywords ---
export const DEFAULT_KEYWORDS = [
    "Eastbourne accommodation",
    "seafront flat",
    "Eastbourne pier",
    "luxury accommodation",
    "holiday rental",
    "East Sussex coast",
    "sea views",
    "Pier Lookout",
    "self-catering",
];

// --- Verification Tokens ---
// Replace with your actual tokens
export const GOOGLE_VERIFICATION_TOKEN = 'CqPBpzXVDz1kTbLSJLOhx0JwwnghdBIKymjfVr0Vk0s'

// --- Locale ---
export const LOCALE = "en_GB";

// --- Site Manifest ---
export const MANIFEST_URL = `${ICON_FOLDER}site.webmanifest`;