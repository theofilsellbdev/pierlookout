import { Cormorant, Shippori_Mincho, Goudy_Bookletter_1911 } from "next/font/google";
import "./globals.css";
import { GAListener } from "./GAListener";

const shipporiSerif = Shippori_Mincho({
  variable: "--font-shippori-serif",
  subsets: ["latin"],
  style: "normal",
  weight: ["400", "500", "600", "700", "800"],
});

const cormorantSerif = Cormorant({
  variable: "--font-cormorant-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const goudySerif = Goudy_Bookletter_1911({
  variable: "--font-goudy-serif",
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const LandingVideowebmURL =
    "https://firebasestorage.googleapis.com/v0/b/pierlookout.firebasestorage.app/o/Watercolour.webm?alt=media&token=3afa5c3b-c1d3-4b9c-8f86-0f35b86ce2b1";
  const LandingVideomp4URL =
    "https://firebasestorage.googleapis.com/v0/b/pierlookout.firebasestorage.app/o/Watercolour.mp4?alt=media&token=4bbbbd72-2eef-4b27-a4c5-d37db784daef";

  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://firebasestorage.googleapis.com"
          crossOrigin=""
        />
        <link
          rel="preload"
          as="video"
          href={LandingVideowebmURL}
          type="video/webm"
        />
        <link
          rel="preload"
          as="video"
          href={LandingVideomp4URL}
          type="video/mp4"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/preline@2.0.2/dist/preline.min.css"
        />
      </head>
      <body
        className={`${shipporiSerif.variable} ${cormorantSerif.variable} ${goudySerif.variable} antialiased bg-[#FAFCFC]`}
      >
        {/* Global analytics route listener */}
        <GAListener />
        {children}
      </body>
    </html>
  );
}