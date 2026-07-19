export const siteConfig = {
  name: "Syed Mughees Ali",
  role: "Junior Full-Stack Developer",
  email: "syedmugheessali@gmail.com",
  linkedIn: "https://www.linkedin.com/in/syedmugheesali/",
  github: process.env.NEXT_PUBLIC_GITHUB_URL || "",
  resume: process.env.NEXT_PUBLIC_RESUME_URL || "",
  portrait: process.env.NEXT_PUBLIC_PORTRAIT_URL || "",
  location: "Karachi, Sindh, Pakistan",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://REPLACE-WITH-YOUR-DOMAIN.example",
} as const;

export const isPublicUrl = (value: string) =>
  /^https?:\/\//.test(value) && !value.includes("REPLACE-WITH");

export const isPublicAssetUrl = (value: string) =>
  (value.startsWith("/") && !value.startsWith("//")) || isPublicUrl(value);
