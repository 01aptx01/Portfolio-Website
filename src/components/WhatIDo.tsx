import styles from "./WhatIDo.module.css";
import { Server, BrainCircuit, Sparkles, Cpu, Layers } from "lucide-react";

interface Capability {
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

const capabilities: Capability[] = [
  {
    title: "Distributed Systems & Backend",
    description:
      "Architecting decoupled agent-server IoT fleet topologies, low-latency bidirectional WebSockets, and offline-tolerant write-ahead queues.",
    icon: <Server size={22} />,
    tags: ["Node.js", "TypeScript", "WebSockets", "Docker", "PostgreSQL", "SQLite Queues"],
  },
  {
    title: "AI, NLP & Machine Learning",
    description:
      "Engineering reproducible ML data pipelines, fine-tuning multilingual transformer backbones (XLM-RoBERTa), and building automated threat detection classifiers.",
    icon: <BrainCircuit size={22} />,
    tags: ["Python", "XLM-RoBERTa", "PyTorch", "Hugging Face", "Scikit-Learn", "FastAPI"],
  },
  {
    title: "Full-Stack & Interactive 3D",
    description:
      "Crafting production web applications with Next.js App Router, interactive Three.js/WebGL physics laboratories, and accessible WCAG 2.2 Level AA interfaces.",
    icon: <Sparkles size={22} />,
    tags: ["Next.js 14", "React", "Three.js / WebGL", "CSS Modules", "WCAG 2.2 AA"],
  },
  {
    title: "Systems Architecture & Performance",
    description:
      "Designing resilient state machine models, non-blocking time-sliced algorithm execution, and automated testing suites for mission-critical software.",
    icon: <Cpu size={22} />,
    tags: ["Decoupled Architecture", "60 FPS Loops", "TDD Testing", "Linux", "CI/CD"],
  },
];

export default function WhatIDo() {
  return (
    <section className="section" id="capabilities">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-pill">
            <Layers size={14} />
            <span>Core Disciplines</span>
          </div>
          <h2 className="section-title">What I Do & Engineering Focus</h2>
          <p className="section-subtitle">
            Delivering comprehensive software engineering across distributed architectures, intelligent machine learning models, and fluid interfaces.
          </p>
        </div>

        <div className={`${styles.grid} revealStagger`}>
          {capabilities.map((item, index) => (
            <article key={index} className={styles.card}>
              <div className={styles.iconWrapper} aria-hidden="true">
                {item.icon}
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
              <div className={styles.tagRow}>
                {item.tags.map((tag) => (
                  <span key={tag} className={styles.tagPill}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
