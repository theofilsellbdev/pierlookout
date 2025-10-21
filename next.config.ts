import type { NextConfig } from "next";

// --- Security Headers ---
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-XSS-Protection", value: "0" },
  { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self';",
      "img-src 'self' data: https:;",
      "style-src 'self' 'unsafe-inline' https:;",
      "script-src 'self' 'unsafe-inline' https:;",
      "font-src 'self' https: data:;",
      "connect-src 'self' https:;",
    ].join(" "),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=15552000; includeSubDomains; preload",
  },
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
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;