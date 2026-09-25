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
    id: "confessions",
    title: "Confessions",
    shortDescription: "An ephemeral anonymous confession platform featuring time-limited posts, live countdowns, and role-based moderation.",
    problem: "Share thoughts and confessions candidly without permanent digital footprints or identity exposure.",
    solution: "A full-stack MERN application with anonymous-first submission, auto-expiring posts with live countdown timers, and role-based access control for administrative moderation.",
    features: ["Anonymous-first confession feeds", "Live expiration countdown timers", "Tiered role-based moderation (RBAC)", "Parallelized queries and connection pooling"],
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT", "REST API"],
    image: "/images/projects/confessions.png",
    githubUrl: "https://github.com/syedmugheessali/Confessions",
    status: "Database-backed",
    featured: true,
  },
  {
    id: "localplay",
    title: "LocalPlay Video Player",
    shortDescription: "A privacy-first browser video player with custom controls, subtitles, bookmarks, snapshots, and no uploads.",
    problem: "Play personal video files with useful modern controls without uploading private media or installing a desktop application.",
    solution: "A dependency-free local player built on browser media APIs, with drag-and-drop input, persistent bookmarks, captions, picture-in-picture, and responsive controls.",
    features: ["Private drag-and-drop playback", "WebVTT subtitles and bookmarks", "Frame snapshots and picture-in-picture", "Keyboard and responsive controls"],
    technologies: ["JavaScript", "HTML5 Video", "File API", "WebVTT", "localStorage"],
    image: "/images/projects/localplay.png",
    githubUrl: "https://github.com/syedmugheessali/localplay",
    liveUrl: "https://syedmugheessali.github.io/localplay/",
    status: "Live",
    featured: true,
  },
  {
    id: "giftshop",
    title: "GIFTONIC Giftshop",
    shortDescription: "A responsive gift storefront with dynamic product discovery, a persistent cart, and a complete checkout experience.",
    problem: "Turn a curated gift catalogue into a clear shopping journey that works across devices and preserves the customer's selections.",
    solution: "A framework-free storefront that loads catalogue data from JSON, renders category filters and product details, and carries a local cart into checkout.",
    features: ["Dynamic catalogue and filters", "Product detail modal", "Persistent shopping cart", "Responsive checkout flow"],
    technologies: ["JavaScript", "Semantic HTML", "Responsive CSS", "JSON", "localStorage"],
    image: "/images/projects/giftshop.png",
    githubUrl: "https://github.com/syedmugheessali/giftshop",
    status: "Complete",
    featured: true,
  },
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
];
