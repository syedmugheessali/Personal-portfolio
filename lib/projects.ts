export type PortfolioProject = {
  id: string;
  title: string;
  shortDescription: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl?: string;
  status: "Live" | "Complete" | "Database-backed";
  featured: boolean;
};

export const projects: PortfolioProject[] = [
  {
    id: "developer-portfolio",
    title: "Developer Portfolio",
    shortDescription: "A recruiter-focused portfolio presenting verified experience, projects, credentials, and contact paths.",
    problem: "Present professional evidence clearly without relying on inflated claims or template filler.",
    solution: "A responsive Next.js portfolio with centralized content, accessible interactions, technical metadata, and production monitoring.",
    features: ["Responsive recruiter journey", "Accessible motion and navigation", "SEO and structured data", "Project and certificate showcases"],
    technologies: ["Next.js", "TypeScript", "React", "CSS", "Playwright"],
    image: "/images/projects/developer-portfolio.webp",
    githubUrl: "https://github.com/syedmugheessali/Personal-portfolio",
    liveUrl: "https://syedmugheesali.vercel.app",
    status: "Live",
    featured: true,
  },
  {
    id: "expense-tracker-js",
    title: "Ledgerly Expense Tracker",
    shortDescription: "A private browser-based tracker for managing, filtering, and summarizing income and expenses.",
    problem: "Keep everyday transaction records useful without requiring an account or external service.",
    solution: "A dependency-free JavaScript application with validated CRUD workflows and durable localStorage persistence.",
    features: ["Add, edit, and delete records", "Search and category filters", "Income, expense, and balance totals", "Local browser persistence"],
    technologies: ["JavaScript", "Semantic HTML", "Responsive CSS", "localStorage", "Node test runner"],
    image: "/images/projects/expense-tracker.webp",
    githubUrl: "https://github.com/syedmugheessali/Personal-portfolio",
    status: "Complete",
    featured: true,
  },
  {
    id: "eventease",
    title: "EventEase",
    shortDescription: "A database-backed event manager for events, registrations, capacity, and attendance workflows.",
    problem: "Replace temporary session-only event data with reliable records and complete management workflows.",
    solution: "A Blazor Server application with async EF Core services, SQLite persistence, validation, search, and responsive CRUD screens.",
    features: ["Event CRUD and search", "Validated attendee registration", "Capacity-aware check-in", "SQLite persistence"],
    technologies: ["C#", "ASP.NET Core", "Blazor Server", "Entity Framework Core", "SQLite"],
    image: "/images/projects/eventease.webp",
    githubUrl: "https://github.com/syedmugheessali/EventEase",
    status: "Database-backed",
    featured: true,
  },
];
