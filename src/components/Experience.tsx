"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./Experience.module.css";
import { experienceData } from "@/data/experience";
import { Briefcase } from "lucide-react";

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const calcProgress = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start line drawing when top of timeline enters 70% down the viewport
      const startPoint = windowHeight * 0.7;
      const totalSpan = rect.height;

      const currentPosition = startPoint - rect.top;
      const rawProgress = currentPosition / totalSpan;
      const clamped = Math.min(Math.max(rawProgress, 0), 1);

      setScrollProgress(clamped);
    };

    const handleScroll = () => {
      if (rafRef.current !== null) return; // already scheduled
      rafRef.current = requestAnimationFrame(() => {
        calcProgress();
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    calcProgress(); // run once on mount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-pill">
            <Briefcase size={14} />
            <span>Career & Education</span>
          </div>
          <h2 className="section-title">Milestones & Experience</h2>
          <p className="section-subtitle">
            A chronological narrative of contributions, roles, and engineering impact.
          </p>
        </div>

        <div ref={timelineRef} className={`${styles.timelineContainer} revealStagger`}>
          {/* Base track line */}
          <div className={styles.timelineTrack} aria-hidden="true" />

          {/* Dynamic scroll-following progress line */}
          <div
            className={styles.timelineProgressLine}
            style={{ height: `${scrollProgress * 100}%` }}
            aria-hidden="true"
          />

          {experienceData.map((item, index) => {
            const threshold = (index + 0.15) / experienceData.length;
            const isDotActive = scrollProgress >= threshold;

            return (
              <div key={index} className={styles.timelineItem}>
                <div
                  className={`${styles.timelineDot} ${
                    isDotActive ? styles.dotActive : ""
                  }`}
                  aria-hidden="true"
                />
                <div className={styles.experienceCard}>
                  <div className={styles.itemHeader}>
                    <h3 className={styles.roleTitle}>{item.role}</h3>
                    <span className={styles.periodBadge}>{item.period}</span>
                  </div>

                  <div className={styles.companyRow}>
                    <span>{item.company}</span> • <span>{item.location}</span>
                  </div>

                  <ul className={styles.highlightsList}>
                    {item.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className={styles.highlightItem}>
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <div className={styles.techList}>
                    {item.technologies.map((tech) => (
                      <span key={tech} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
