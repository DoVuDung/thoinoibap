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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Thôi Nôi Minh Anh — 11.03.2026",
    description: "Mừng bé Bắp tròn một tuổi 🎂 Thân mừ quý vị đến dự tiệc thôi nôi tại gia đình",
    url: "https://be-bap.com",
    siteName: "Thôi Nôi Minh Anh",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Thôi Nôi Minh Anh - 11.03.2026",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thôi Nôi Minh Anh — 11.03.2026",
    description: "Mừng bé Bắp tròn một tuổi 🎂 Thân mừ quý vị đến dự tiệc thôi nôi",
    images: ["/og-image.svg"],
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
