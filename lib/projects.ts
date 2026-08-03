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
  status: "Live" | "Complete" | "Database-backed" | "Interactive" | "Playable";
  featured: boolean;
};

export const projects: PortfolioProject[] = [
  {
    id: "orbit",
    title: "Orbit Task Studio",
    shortDescription: "A responsive task workspace that combines planning, smart recommendations, and focused work sessions.",
    problem: "Keep daily priorities, task context, and focused execution together without depending on an account or external service.",
    solution: "A framework-free task manager with local persistence, board and list views, rule-based recommendations, and a built-in focus timer.",
    features: ["Board and list workflows", "Rule-based task recommendations", "Configurable focus sessions", "Local browser persistence"],
    technologies: ["JavaScript", "Semantic HTML", "Responsive CSS", "localStorage"],
    image: "/images/projects/orbit.png",
    githubUrl: "https://github.com/syedmugheessali/orbit",
    liveUrl: "https://orbit9.vercel.app",
    status: "Live",
    featured: true,
  },
  {
    id: "lumas-skybound-quest",
    title: "Luma's Skybound Quest",
    shortDescription: "A handcrafted 2D canvas platformer spanning three realms with enemies, collectibles, bosses, and persistent progress.",
    problem: "Create a complete cross-device platform adventure using browser-native technologies and no game framework.",
    solution: "A modular JavaScript game engine with collision systems, layered rendering, keyboard, gamepad and touch input, and recoverable saves.",
    features: ["Three complete playable realms", "Keyboard, gamepad, and touch controls", "Bosses, checkpoints, and collectibles", "Persistent progress and settings"],
    technologies: ["JavaScript", "Canvas API", "HTML", "CSS", "Node test runner"],
    image: "/images/projects/lumas.png",
    githubUrl: "https://github.com/syedmugheessali/lumas-2d-Javascript-only",
    liveUrl: "https://lumas-2d.vercel.app",
    status: "Playable",
    featured: true,
  },
  {
    id: "canvas-physics",
    title: "Canvas Physics",
    shortDescription: "An interactive particle playground that turns pointer movement into colorful motion and connecting trails.",
    problem: "Explore responsive particle movement and proximity-based connections directly in the browser.",
    solution: "A lightweight HTML Canvas experiment with animated particles, boundary collisions, hue shifts, and distance-aware line rendering.",
    features: ["Pointer-generated particles", "Boundary collision response", "Dynamic color animation", "Proximity-based connections"],
    technologies: ["JavaScript", "Canvas API", "HTML"],
    image: "/images/projects/canvas-physics.png",
    githubUrl: "https://github.com/syedmugheessali/canvas-physics",
    liveUrl: "https://canvas-dots.vercel.app",
    status: "Interactive",
    featured: true,
  },
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
    githubUrl: "https://github.com/syedmugheessali/expense-tracker-js",
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
