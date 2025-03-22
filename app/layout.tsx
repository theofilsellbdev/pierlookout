import { Cormorant, Shippori_Mincho } from "next/font/google";
import "./globals.css";

const shipporiSerif = Shippori_Mincho({
  variable: "--font-shippori-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
});

const cormorantSerif = Cormorant({
  variable: "--font-cormorant-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${shipporiSerif.variable} ${cormorantSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
