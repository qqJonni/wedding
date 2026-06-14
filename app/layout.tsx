import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { config } from "@/content";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-manrope",
});

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
      <body className={`${manrope.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
