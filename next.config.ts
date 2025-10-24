import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

function csp() {
  // Base directives
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "frame-src": ["'self'", "https://www.google.com", "https://*.google.com"],
    "img-src": ["'self'", "data:", "https:"],
    "style-src": ["'self'", "'unsafe-inline'", "https:"],
    "font-src": ["'self'", "https:", "data:"],
    "connect-src": ["'self'", "https:"],
    "script-src": ["'self'", "'unsafe-inline'", "https:"],
    // ✅ allow video/audio streams
    "media-src": [
      "'self'",
      "https:",
      "https://firebasestorage.googleapis.com",
      "data:",
    ],
    // optional hardening
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "frame-ancestors": ["'none'"],
  };

  if (isDev) {
    // Needed for Next.js HMR + React Refresh
    directives["script-src"].push("'unsafe-eval'");
    directives["connect-src"].push("ws:", "wss:");
  } else {
    // Example: tighten in prod, keep as-is or add nonce/hashes if you want
  }

  // Join into a single string
  return Object.entries(directives)
    .map(([k, v]) => `${k} ${v.join(" ")}`)
    .join("; ");
}

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "geolocation=(), microphone=(), camera=()",
  },
  { key: "Content-Security-Policy", value: csp() },
  // Enable HSTS in prod *after* you’re always on HTTPS with a final domain
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=15552000; includeSubDomains; preload",
        },
      ]),
];

const nextConfig: NextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/**",
      },
      { protocol: "https", hostname: "**" },
    ],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
