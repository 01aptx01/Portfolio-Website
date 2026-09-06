import { ExperienceItem } from "./types";

export const experienceData: ExperienceItem[] = [
  {
    role: "Senior Full-Stack Software Engineer",
    company: "Symphony Labs",
    location: "Bangkok / Remote",
    period: "2023 - Present",
    type: "Work",
    highlights: [
      "Architected and deployed high-performance microservices handling over 5M daily requests with 99.99% availability.",
      "Spearheaded design system modernization reducing frontend development cycle times by 35%.",
      "Mentored junior engineers on clean domain modeling, automated testing (TDD), and system observability."
    ],
    technologies: ["TypeScript", "Next.js", "Go", "Kafka", "PostgreSQL", "Docker"],
  },
  {
    role: "Software Engineer",
    company: "Vanguard Tech",
    location: "Bangkok, Thailand",
    period: "2022 - 2023",
    type: "Work",
    highlights: [
      "Engineered real-time data ingestion pipelines and collaborative client dashboards with WebSockets.",
      "Optimized database indexes and query caching strategies, achieving a 60% reduction in p95 response latencies.",
      "Built automated end-to-end testing suites with Playwright to maintain regression-free production releases."
    ],
    technologies: ["React", "Node.js", "GraphQL", "Redis", "Jest", "AWS"],
  },
  {
    role: "Bachelor of Science in Computer Science",
    company: "Faculty of Science, University",
    location: "Thailand",
    period: "2018 - 2022",
    type: "Education",
    highlights: [
      "First Class Honours with core focus on Distributed Systems, Algorithms, and Software Engineering Principles.",
      "Published capstone research on fault-tolerant distributed consensus mechanisms.",
      "President of the Computer Science Student Club, organizing tech workshops and annual hackathons."
    ],
    technologies: ["Data Structures & Algorithms", "Distributed Systems", "Database Theory", "OS & Networking"],
  },
];
