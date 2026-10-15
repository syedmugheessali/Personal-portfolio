export type Certificate = {
  title: string;
  issuer: string;
  date: string;
  dateTime: string;
  credentialId?: string;
  pdf: string;
  thumbnail: string;
  verifyUrl?: string;
  category: "Development" | "Data & AI" | "AI & Security";
  platform?: string;
};

export const certificates: Certificate[] = [
  {
    title: "Machine Learning for All",
    issuer: "University of London",
    date: "July 6, 2026",
    dateTime: "2026-07-06",
    credentialId: "VIS2AACNE3MU",
    pdf: "/certificates/Coursera VIS2AACNE3MU.pdf",
    thumbnail: "/certificates/thumbnails/VIS2AACNE3MU.webp",
    verifyUrl: "https://coursera.org/verify/VIS2AACNE3MU",
    category: "Data & AI",
    platform: "Coursera",
  },
  {
    title: "OpenAI Technical Practitioner",
    issuer: "OpenAI",
    date: "August 28, 2026",
    dateTime: "2026-08-28",
    pdf: "/certificates/openai-certificates/OpenAI Technical Practitioner.pdf",
    thumbnail: "/certificates/thumbnails/OpenAI_Technical_Practitioner.webp",
    category: "Data & AI",
    platform: "OpenAI",
  },
  {
    title: "Blazor for Front-End Development",
    issuer: "Microsoft",
    date: "July 5, 2026",
    dateTime: "2026-07-05",
    credentialId: "GYEWMBJVBHJD",
    pdf: "/certificates/Coursera GYEWMBJVBHJD.pdf",
    thumbnail: "/certificates/thumbnails/GYEWMBJVBHJD.webp",
    verifyUrl: "https://coursera.org/verify/GYEWMBJVBHJD",
    category: "Development",
    platform: "Coursera",
  },
  {
    title: "OpenAI Cyber Deployment Practitioner",
    issuer: "OpenAI",
    date: "August 25, 2026",
    dateTime: "2026-08-25",
    pdf: "/certificates/openai-certificates/OpenAI Cyber Deployment Practitioner.pdf",
    thumbnail: "/certificates/thumbnails/OpenAI_Cyber_Deployment_Practitioner.webp",
    category: "AI & Security",
    platform: "OpenAI",
  },
  {
    title: "Introduction to Web Development",
    issuer: "Microsoft",
    date: "July 5, 2026",
    dateTime: "2026-07-05",
    credentialId: "1O6PDS5B3VAI",
    pdf: "/certificates/Coursera 1O6PDS5B3VAI.pdf",
    thumbnail: "/certificates/thumbnails/1O6PDS5B3VAI.webp",
    verifyUrl: "https://coursera.org/verify/1O6PDS5B3VAI",
    category: "Development",
    platform: "Coursera",
  },
  {
    title: "API Deployment Practitioner",
    issuer: "OpenAI",
    date: "August 27, 2026",
    dateTime: "2026-08-27",
    pdf: "/certificates/openai-certificates/API Deployment Practitioner.pdf",
    thumbnail: "/certificates/thumbnails/API_Deployment_Practitioner.webp",
    category: "Data & AI",
    platform: "OpenAI",
  },
  {
    title: "Introduction to Programming With C#",
    issuer: "Microsoft",
    date: "July 4, 2026",
    dateTime: "2026-07-04",
    credentialId: "VJLOTSIGTOCV",
    pdf: "/certificates/Coursera VJLOTSIGTOCV.pdf",
    thumbnail: "/certificates/thumbnails/VJLOTSIGTOCV.webp",
    verifyUrl: "https://coursera.org/verify/VJLOTSIGTOCV",
    category: "Development",
    platform: "Coursera",
  },
  {
    title: "OpenAI Consultative Solutions Practitioner",
    issuer: "OpenAI",
    date: "August 31, 2026",
    dateTime: "2026-08-31",
    pdf: "/certificates/openai-certificates/OpenAI Consultative Solutions Practitioner.pdf",
    thumbnail: "/certificates/thumbnails/OpenAI_Consultative_Solutions_Practitioner.webp",
    category: "Data & AI",
    platform: "OpenAI",
  },
  {
    title: "Foundations of Coding Full-Stack",
    issuer: "Microsoft",
    date: "July 2, 2026",
    dateTime: "2026-07-02",
    credentialId: "E245AHPTWNJG",
    pdf: "/certificates/Coursera E245AHPTWNJG.pdf",
    thumbnail: "/certificates/thumbnails/E245AHPTWNJG.webp",
    verifyUrl: "https://coursera.org/verify/E245AHPTWNJG",
    category: "Development",
    platform: "Coursera",
  },
  {
    title: "Foundations of Data Science",
    issuer: "Google",
    date: "June 28, 2026",
    dateTime: "2026-06-28",
    credentialId: "PO52BDH8HE3S",
    pdf: "/certificates/Coursera PO52BDH8HE3S.pdf",
    thumbnail: "/certificates/thumbnails/PO52BDH8HE3S.webp",
    verifyUrl: "https://coursera.org/verify/PO52BDH8HE3S",
    category: "Data & AI",
    platform: "Coursera",
  },
];
