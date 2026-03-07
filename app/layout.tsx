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
  title: "Minh Anh - Bắp | Tròn Một Tuổi 🎈",
  description: "Mừng bé Bắp tròn một tuổi - 15 tháng 3, 2025 | 55 Khúc Hạo, Đà Nẵng",
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
    title: "Minh Anh - Bắp | Tròn Một Tuổi 🎈",
    description: "Mừng bé Bắp tròn một tuổi 🎂 Thân mờii quý vị đến dự tiệc thôi nôi",
    url: "https://be-bap.com",
    siteName: "Minh Anh - Bắp Tròn Một Tuổi",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/images/card.jpg",
        width: 1200,
        height: 1600,
        alt: "Minh Anh - Bắp Tròn Một Tuổi",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Minh Anh - Bắp | Tròn Một Tuổi 🎈",
    description: "Mừng bé Bắp tròn một tuổi 🎂 Thân mờii quý vị đến dự tiệc thôi nôi",
    images: ["/images/card.jpg"],
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
