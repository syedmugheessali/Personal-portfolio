const productionSiteUrl = "https://syedmugheesali.vercel.app";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteUrl = configuredSiteUrl && /^https?:\/\//.test(configuredSiteUrl) ? configuredSiteUrl.replace(/\/$/, "") : productionSiteUrl;

export const siteConfig = {
  name: "Syed Mughees Ali",
  role: "Full Stack Developer",
  email: "syedmugheessali@gmail.com",
  linkedIn: "https://www.linkedin.com/in/syedmugheesali/",
  github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/syedmugheessali",
  resume: process.env.NEXT_PUBLIC_RESUME_URL || "",
  portrait: process.env.NEXT_PUBLIC_PORTRAIT_URL || "/images/profile-headshot.webp",
  location: "Karachi, Sindh, Pakistan",
  siteUrl,
} as const;

export const isPublicUrl = (value: string) =>
  /^https?:\/\//.test(value) && !value.includes("REPLACE-WITH");

export const isPublicAssetUrl = (value: string) =>
  (value.startsWith("/") && !value.startsWith("//")) || isPublicUrl(value);
