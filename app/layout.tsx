import type { Metadata, Viewport } from "next";
import { Lexend, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";

const heading = Lexend({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const body = Source_Sans_3({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: "Syed Mughees Ali | Junior Full-Stack Developer",
  description: "Portfolio of Syed Mughees Ali, a Junior Full-Stack Developer and Software Engineering student at Bahria University with experience in responsive web applications, databases and API integration.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    title: "Syed Mughees Ali | Junior Full-Stack Developer",
    description: "Full-stack developer in Karachi building responsive, database-driven applications.",
    url: "/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Syed Mughees Ali portfolio" }],
  },
  twitter: { card: "summary_large_image", title: "Syed Mughees Ali | Junior Full-Stack Developer", images: ["/og-image.png"] },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#061225" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
