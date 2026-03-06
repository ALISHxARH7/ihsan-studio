import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IHSAN STUDIO | Architecture & Design",
  description:
    "Студия архитектуры и дизайна интерьеров в Алматы. Создаём пространства, наполненные смыслом и красотой. Ихсан — наилучшее исполнение.",
  keywords: [
    "архитектура",
    "дизайн интерьера",
    "Алматы",
    "Казахстан",
    "ihsan studio",
    "дизайн проект",
    "ремонт",
    "авторский надзор",
  ],
  openGraph: {
    title: "IHSAN STUDIO | Architecture & Design",
    description:
      "Студия архитектуры и дизайна интерьеров в Алматы. Создаём пространства, наполненные смыслом и красотой.",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
