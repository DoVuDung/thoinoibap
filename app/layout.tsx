import type { Metadata } from "next";
import { Cormorant_Garamond, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["100", "300", "600"],
});

export const metadata: Metadata = {
  title: "Thôi Nôi Minh Anh — 11.03.2026",
  description: "Mừng bé Bắp tròn một tuổi - March 11, 2026 | 55 Khúc Hạo, Đà Nẵng",
  metadataBase: new URL("https://be-bap.com"),
  openGraph: {
    title: "Thôi Nôi Minh Anh — 11.03.2026",
    description: "Join us for a cozy family dinner at our home.",
    url: "https://be-bap.com",
    images: [
      {
        url: "/og-default.svg",
        width: 1200,
        height: 630,
        alt: "Bắp's 1st Birthday Invitation",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${beVietnamPro.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
