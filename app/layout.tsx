import { Cormorant, Shippori_Mincho, Goudy_Bookletter_1911 } from "next/font/google";
import "./globals.css";
import PrelineScriptWrapper from "@/components/preline/PrelineScriptWrapper";

const shipporiSerif = Shippori_Mincho({
  variable: "--font-shippori-serif",
  subsets: ["latin"],
  style: 'normal',
  weight: ["400", "500", "600", "700", "800"]
});

const cormorantSerif = Cormorant({
  variable: "--font-cormorant-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

const goudySerif = Goudy_Bookletter_1911({
  variable: "--font-goudy-serif",
  weight: "400",
  subsets: ['latin']
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/preline@2.0.2/dist/preline.min.css" />
      </head>
      <body
        className={`${shipporiSerif.variable} ${cormorantSerif.variable} ${goudySerif.variable} antialiased bg-[#FAFCFC]`}
      >
        {children}
        <PrelineScriptWrapper />
      </body>
    </html>
  );
}