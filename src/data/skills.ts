import { SkillGroup } from "./types";

export const skillsData: SkillGroup[] = [
  {
    category: "Full-Stack & Interactive 3D",
    description: "Creating accessible, performant, and fluid interfaces backed by rigorous component architecture and WebGL.",
    skills: [
      { name: "TypeScript & JavaScript", highlight: "Strict typing, ESNext & Generics" },
      { name: "React & Next.js", highlight: "App Router, Server Components & SSG" },
      { name: "3D Graphics & WebGL", highlight: "Three.js, Shaders & Physics Leaps" },
      { name: "Design Systems & CSS", highlight: "Tokens, Glassmorphism & Animations" },
      { name: "State & Data Sync", highlight: "Local-first, Zustand & Two-way Sync" },
      { name: "Web Accessibility (a11y)", highlight: "WCAG 2.2 Level A/AA Compliance" },
    ],
  },
  {
    category: "Distributed Systems & Backend",
    description: "Architecting resilient distributed services, IoT agent-server topologies, and asynchronous event streams.",
    skills: [
      { name: "Node.js & TypeScript Backend", highlight: "Event-driven architecture & Concurrency" },
      { name: "Decoupled Fleet Architecture", highlight: "Agent-Server topologies & Edge Controllers" },
      { name: "WebSockets & Real-time I/O", highlight: "Bidirectional telemetry & Reconnection backoff" },
      { name: "Database Engineering", highlight: "PostgreSQL, SQLite, Redis & Offline Queues" },
      { name: "Docker & Containerization", highlight: "Microservices & Multi-container environments" },
      { name: "CI/CD & Testing", highlight: "GitHub Actions, RobotFramework & Jenkins" },
    ],
  },
  {
    category: "AI, Machine Learning & NLP",
    description: "Developing end-to-end data science pipelines, fine-tuning transformer models, and threat classification.",
    skills: [
      { name: "Python & Data Science", highlight: "NumPy, Pandas & Jupyter Lab" },
      { name: "Deep Learning & PyTorch", highlight: "Transformer architectures & Fine-tuning" },
      { name: "NLP & Sentiment Intelligence", highlight: "XLM-RoBERTa, Hugging Face & Thai NLP" },
      { name: "Cybersecurity & NIDS", highlight: "Binary traffic classification & Threat mitigation" },
      { name: "Computer Vision", highlight: "OpenCV document scanning & Image processing" },
      { name: "Model Serving & APIs", highlight: "FastAPI, Streamlit & Containerized Endpoints" },
    ],
  },
];
