import type { Metadata, Viewport } from "next";
import { Lexend, Source_Sans_3 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { isPublicAssetUrl, siteConfig } from "@/lib/site";

const heading = Lexend({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const body = Source_Sans_3({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const description = "Portfolio of Syed Mughees Ali, a Full Stack Developer and Software Engineering student building responsive web applications, database-backed products, and API integrations.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { default: "Syed Mughees Ali | Full Stack Developer", template: "%s | Syed Mughees Ali" },
  description,
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", siteName: "Syed Mughees Ali Portfolio", title: "Syed Mughees Ali | Full Stack Developer",
    description, url: "/", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Syed Mughees Ali, Full Stack Developer" }],
  },
  twitter: { card: "summary_large_image", title: "Syed Mughees Ali | Full Stack Developer", description, images: ["/og-image.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#061225" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const isVercelDeployment = process.env.VERCEL === "1";
  const sameAs = [siteConfig.github, siteConfig.linkedIn, ...(isPublicAssetUrl(siteConfig.resume) ? [new URL(siteConfig.resume, siteConfig.siteUrl).toString()] : [])];
  const structuredData = [
    {
      "@context": "https://schema.org", "@type": "Person", "@id": `${siteConfig.siteUrl}/#person`, name: siteConfig.name,
      url: siteConfig.siteUrl, image: `${siteConfig.siteUrl}${siteConfig.portrait}`, jobTitle: siteConfig.role, email: `mailto:${siteConfig.email}`,
      address: { "@type": "PostalAddress", addressLocality: "Karachi", addressRegion: "Sindh", addressCountry: "PK" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "Bahria University" }, sameAs,
    },
    {
      "@context": "https://schema.org", "@type": "WebSite", "@id": `${siteConfig.siteUrl}/#website`, url: siteConfig.siteUrl,
      name: "Syed Mughees Ali Portfolio", description, author: { "@id": `${siteConfig.siteUrl}/#person` }, inLanguage: "en",
    },
  ];
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body suppressHydrationWarning>
        {children}
        {isVercelDeployment && <Analytics />}
        {isVercelDeployment && <SpeedInsights />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
