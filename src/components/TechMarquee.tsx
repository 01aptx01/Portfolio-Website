import styles from "./TechMarquee.module.css";

interface TechItem {
  name: string;
  category: string;
  color: string;
}

const techItems: TechItem[] = [
  { name: "TypeScript", category: "Core", color: "#3178c6" },
  { name: "Next.js 14", category: "Full-Stack", color: "#181d28" },
  { name: "Python", category: "Data & AI", color: "#3776ab" },
  { name: "PyTorch", category: "Deep Learning", color: "#ee4c2c" },
  { name: "XLM-RoBERTa", category: "NLP", color: "#9b59b6" },
  { name: "Docker", category: "Container", color: "#2496ed" },
  { name: "Node.js", category: "Backend", color: "#44bd32" },
  { name: "Three.js / WebGL", category: "3D Graphics", color: "#8c7ae6" },
  { name: "WebSockets", category: "Real-Time", color: "#e67e22" },
  { name: "PostgreSQL", category: "Relational DB", color: "#336791" },
  { name: "FastAPI", category: "REST Services", color: "#009688" },
  { name: "Scikit-Learn", category: "ML Security", color: "#e84118" },
  { name: "Redis", category: "Cache / Queue", color: "#c0392b" },
  { name: "React", category: "Frontend", color: "#00a8ff" },
  { name: "Linux & Git", category: "Infrastructure", color: "#f39c12" },
];

export default function TechMarquee() {
  // Duplicate for seamless infinite loop
  const displayItems = [...techItems, ...techItems];

  return (
    <div
      className={`${styles.tickerSection} reveal`}
      role="region"
      aria-label="Core Technology Stack and Tools"
    >
      <div className={styles.tickerTrackWrapper}>
        <div className={styles.tickerTrack}>
          <div className={styles.tickerTrackGroup}>
            {displayItems.map((tech, idx) => (
              <div key={`${tech.name}-${idx}`} className={styles.techPill}>
                <span
                  className={styles.techDot}
                  style={{
                    backgroundColor: tech.color,
                    boxShadow: `0 0 8px ${tech.color}55`,
                  }}
                  aria-hidden="true"
                />
                <span className={styles.techName}>{tech.name}</span>
                <span className={styles.techCategory}>{tech.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
