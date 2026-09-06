import React from "react";
import styles from "./TechMarquee.module.css";

interface TechItem {
  name: string;
  logo: React.ReactNode;
}

const techItems: TechItem[] = [
  {
    name: "TypeScript",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path
          fill="#FFFFFF"
          d="M13.2 16.6c.8.5 1.7.8 2.6.8 1.1 0 1.7-.5 1.7-1.2 0-.7-.6-1.1-2-1.7-2-.8-3.3-1.8-3.3-3.6 0-2 1.6-3.6 4.1-3.6 1.3 0 2.3.4 3.1.9l-.9 1.9c-.6-.4-1.4-.7-2.3-.7-1 0-1.6.5-1.6 1.1 0 .7.6 1 2.1 1.6 2.1.8 3.3 1.9 3.3 3.7 0 2.2-1.8 3.8-4.4 3.8-1.5 0-2.8-.5-3.8-1.2l1.3-1.7zM4.5 9.1h7.5v2H9.5v10H7v-10H4.5v-2z"
        />
      </svg>
    ),
  },
  {
    name: "Next.js",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <circle cx="12" cy="12" r="11.5" fill="#000000" />
        <path
          fill="#FFFFFF"
          d="M15.2 16.7l-5.8-7.6H7.8v8.6h1.8v-6.2l5.2 6.8c.1-.5.3-1.1.4-1.6z"
        />
        <path fill="#FFFFFF" d="M15.8 7.7h1.8v9h-1.8z" />
      </svg>
    ),
  },
  {
    name: "Python",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          fill="#3776AB"
          d="M11.9 2c-5.2 0-4.9 2.3-4.9 2.3l.1 2.4h5v.7H4.8S2 7.1 2 12.3s2.5 5.1 2.5 5.1h1.5v-2.1s-.1-2.5 2.4-2.5h4.2s2.3.1 2.3-2.3V4.3S15.3 2 11.9 2zm-1.4 1.5a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6z"
        />
        <path
          fill="#FFD43B"
          d="M12.1 22c5.2 0 4.9-2.3 4.9-2.3l-.1-2.4h-5v-.7h7.3s2.8.3 2.8-4.9-2.5-5.1-2.5-5.1h-1.5v2.1s.1 2.5-2.4 2.5h-4.2s-2.3-.1-2.3 2.3v8.2s-.4 2.3 3 2.3zm1.4-1.5a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6z"
        />
      </svg>
    ),
  },
  {
    name: "PyTorch",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          fill="#EE4C2C"
          d="M13.6 2.3a8.9 8.9 0 0 0-4.2 1.4l1.4 1.4a7 7 0 1 1-4.8 12.1l-1.4 1.4a9 9 0 1 0 9-16.3zM15 6l-3.3 3.3a1 1 0 0 0 0 1.4 1 1 0 0 0 1.4 0L16.4 7.4 15 6z"
        />
      </svg>
    ),
  },
  {
    name: "XLM-RoBERTa",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="#FFD21E" />
        <circle cx="8.5" cy="10" r="1.5" fill="#202020" />
        <circle cx="15.5" cy="10" r="1.5" fill="#202020" />
        <path
          fill="none"
          stroke="#202020"
          strokeWidth="1.5"
          strokeLinecap="round"
          d="M8.2 15.2c1 .9 2.4 1.4 3.8 1.4s2.8-.5 3.8-1.4"
        />
        <path
          fill="#FF6B6B"
          d="M5.5 12c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm13 0c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5z"
        />
      </svg>
    ),
  },
  {
    name: "Docker",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          fill="#2496ED"
          d="M13.98 10.37h1.96V8.41H13.98v1.96zm-2.45 0h1.96V8.41h-1.96v1.96zm-2.45 0h1.96V8.41H9.08v1.96zm-2.45 0h1.96V8.41H6.63v1.96zm7.35-2.45h1.96V5.96h-1.96v1.96zm-2.45 0h1.96V5.96h-1.96v1.96zm-2.45 0h1.96V5.96H9.08v1.96zm7.35 4.9h-18A5.95 5.95 0 0 0 0 18.25c.98 2.76 4.1 4.25 7.84 4.25 7.84 0 12.98-4.9 14.21-8.58.5-.1.98-.37 1.47-.74-.49-.73-1.47-1.22-2.45-1.22-.37 0-.73.12-1.1.24z"
        />
      </svg>
    ),
  },
  {
    name: "Node.js",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          fill="#5FA04E"
          d="M12 2l9.5 5.5v11L12 24l-9.5-5.5v-11L12 2zm0 2.4L4.5 8.7v8.6l7.5 4.3 7.5-4.3V8.7L12 4.4z"
        />
        <path fill="#5FA04E" d="M12 7l5.5 3.2v6.4L12 19.8l-5.5-3.2v-6.4L12 7z" />
      </svg>
    ),
  },
  {
    name: "React",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          fill="none"
          stroke="#00D8FF"
          strokeWidth="1.6"
          transform="rotate(30 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          fill="none"
          stroke="#00D8FF"
          strokeWidth="1.6"
          transform="rotate(90 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          fill="none"
          stroke="#00D8FF"
          strokeWidth="1.6"
          transform="rotate(150 12 12)"
        />
        <circle cx="12" cy="12" r="1.8" fill="#00D8FF" />
      </svg>
    ),
  },
  {
    name: "Three.js",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          fill="#111111"
          d="M12 2L1.8 19.8h20.4L12 2zm0 4.3l7 12.2H5L12 6.3z"
        />
        <path fill="#111111" d="M12 9.8l3.8 6.7H8.2L12 9.8z" />
      </svg>
    ),
  },
  {
    name: "FastAPI",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="#009688" />
        <path fill="#FFFFFF" d="M13 3L6 13h5l-2 8 8-11h-5l1-7z" />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="#336791" />
        <path
          fill="#FFFFFF"
          d="M12 4.5c-3.6 0-6.5 2.6-6.5 5.8 0 2.2 1.4 4.1 3.5 5.1v2.1c-.8.3-1.4.8-1.4 1.4 0 .9 1.5 1.6 3.4 1.6h2c1.9 0 3.4-.7 3.4-1.6 0-.6-.6-1.1-1.4-1.4v-2.1c2.1-1 3.5-2.9 3.5-5.1 0-3.2-2.9-5.8-6.5-5.8zm-1.8 4.2c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm3.6 0c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z"
        />
      </svg>
    ),
  },
  {
    name: "Redis",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          fill="#DC382D"
          d="M12 2.5l9 5.2v8.6l-9 5.2-9-5.2V7.7l9-5.2zm0 2.3L5 9.4l7 4 7-4-7-4.6zm-7 6.4v5.3l7 4v-5.3l-7-4zm14 0l-7 4v5.3l7-4v-5.3z"
        />
      </svg>
    ),
  },
  {
    name: "WebSockets",
    logo: (
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="#E67E22"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M7 9h10M7 15h10M16 5l4 4-4 4M8 19l-4-4 4-4" />
      </svg>
    ),
  },
  {
    name: "Scikit-Learn",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <circle cx="9" cy="14" r="6" fill="#F89939" opacity="0.95" />
        <circle cx="15" cy="10" r="6" fill="#3499CD" opacity="0.9" />
      </svg>
    ),
  },
  {
    name: "Git & Linux",
    logo: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          fill="#F05032"
          d="M21.7 10.6L13.4 2.3a1.9 1.9 0 0 0-2.7 0L8.4 4.6l3.4 3.4a2.3 2.3 0 0 1 2.9 2.9l3.3 3.3a2.3 2.3 0 1 1-1.3 1.3L13.4 12v4.8a2.3 2.3 0 1 1-1.9 0V11a2.3 2.3 0 0 1-1.2-2.9L7 4.7 2.3 9.4a1.9 1.9 0 0 0 0 2.7l8.3 8.3a1.9 1.9 0 0 0 2.7 0l8.4-8.4a1.9 1.9 0 0 0 0-2.7z"
        />
      </svg>
    ),
  },
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
                <span className={styles.techLogo}>{tech.logo}</span>
                <span className={styles.techName}>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
