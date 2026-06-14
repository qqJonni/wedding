import type { Metadata } from "next";
import { Manrope, Marck_Script } from "next/font/google";
import "./globals.css";
import { config } from "@/content";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-manrope",
});

// Marck Script — каллиграфический шрифт с поддержкой кириллицы
const marckScript = Marck_Script({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  display: "swap",
  variable: "--font-script",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,
  openGraph: {
    title: config.seo.title,
    description: config.seo.description,
    images: [{ url: config.seo.ogImage }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} ${marckScript.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
