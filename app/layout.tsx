import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { LocalBusinessSchema } from "@/components/layout/SchemaMarkup";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://salonlepote.rs";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Beauty by Aysha | Tretmani lica, Epilacija, Depilacija",
    template: "%s | Beauty by Aysha",
  },
  description:
    "Profesionalni kozmetički salon - tretmani lica, epilacija i depilacija. Rezervišite svoj termin danas.",
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: BASE_URL,
    siteName: "Beauty by Aysha",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <LocalBusinessSchema />
      </head>
      <body className="font-sans antialiased bg-white text-text-dark">
        {children}
      </body>
    </html>
  );
}
