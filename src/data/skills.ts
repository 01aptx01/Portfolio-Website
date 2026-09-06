import { SkillGroup } from "./types";

export const skillsData: SkillGroup[] = [
  {
    category: "Full-Stack & Frontend",
    description: "Creating accessible, performant, and delightful interfaces backed by solid component architecture.",
    skills: [
      { name: "TypeScript", highlight: "Strict typing & Generics" },
      { name: "React & Next.js", highlight: "App Router & SSR/SSG" },
      { name: "CSS Modules & Vanilla CSS", highlight: "Tokens & Fluid Responsive Layout" },
      { name: "State Management", highlight: "Zustand & TanStack Query" },
      { name: "Web Performance", highlight: "Core Web Vitals & Bundle Optimization" },
      { name: "Accessibility (a11y)", highlight: "WCAG 2.1 AAA Standards" },
    ],
  },
  {
    category: "Backend & Systems",
    description: "Architecting high-throughput distributed services, clean REST/GraphQL APIs, and resilient data layers.",
    skills: [
      { name: "Node.js & Go", highlight: "Async I/O & Concurrency" },
      { name: "RESTful & GraphQL APIs", highlight: "Federated & Schema-First" },
      { name: "Apache Kafka & Message Queues", highlight: "Event Streaming & Consumer Groups" },
      { name: "PostgreSQL & ClickHouse", highlight: "Schema Design & Query Tuning" },
      { name: "Redis", highlight: "Caching & Pub/Sub" },
      { name: "Microservices", highlight: "Domain-Driven Design & Hexagonal Architecture" },
    ],
  },
  {
    category: "Cloud, DevOps & Engineering Practices",
    description: "Ensuring reproducibility, observability, and robust automated testing throughout the SDLC.",
    skills: [
      { name: "Docker & Containers", highlight: "Multi-stage builds & Orchestration" },
      { name: "CI/CD Pipelines", highlight: "GitHub Actions & Automated Testing" },
      { name: "Testing (TDD)", highlight: "Jest, Playwright & Vitest" },
      { name: "Telemetry & Monitoring", highlight: "Prometheus, Grafana & OpenTelemetry" },
      { name: "Git & Trunk-Based Dev", highlight: "Semantic Versioning & Branch Guardrails" },
      { name: "Linux & Shell Scripting", highlight: "Bash & PowerShell Automation" },
    ],
  },
];
