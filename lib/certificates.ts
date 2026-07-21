export type Certificate = {
  title: string;
  issuer: string;
  date: string;
  dateTime: string;
  credentialId: string;
  pdf: string;
  thumbnail: string;
  verifyUrl: string;
  category: "Development" | "Data & AI";
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
  },
];
