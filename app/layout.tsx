import { Cormorant, Shippori_Mincho, Goudy_Bookletter_1911 } from "next/font/google";
import "./globals.css";

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
      <body
        className={`${shipporiSerif.variable} ${cormorantSerif.variable} ${goudySerif.variable} antialiased bg-[#FAFCFC]`}
      >
        {children}
      </body>
    </html>
  );
}
