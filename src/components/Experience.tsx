"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./Experience.module.css";
import { experienceData } from "@/data/experience";
import { Briefcase } from "lucide-react";

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Respect user's motion preference (WCAG SC 2.2.2 & SC 2.3.3)
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      if (lineRef.current) {
        lineRef.current.style.height = "100%";
        lineRef.current.style.opacity = "1";
      }
      dotRefs.current.forEach((dot) => {
        if (dot) dot.classList.add(styles.dotActive);
      });
      return;
    }

    let currentProgress = 0;
    let targetProgress = 0;
    let rafId: number | null = null;
    let isRunning = false;

    const updateDots = (progress: number) => {
      const total = experienceData.length;
      dotRefs.current.forEach((dot, idx) => {
        if (!dot) return;
        // Dot activates slightly before the line tip reaches its exact center
        const threshold = idx / Math.max(total - 1, 1);
        const isActive = progress >= threshold - 0.02 && progress > 0;
        if (isActive) {
          dot.classList.add(styles.dotActive);
        } else {
          dot.classList.remove(styles.dotActive);
        }
      });
    };

    const loop = () => {
      // Silky smooth lerp damping (0.075 for maximum fluidity)
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.0003) {
        currentProgress += diff * 0.075;
      } else {
        currentProgress = targetProgress;
      }

      if (lineRef.current) {
        lineRef.current.style.height = `${currentProgress * 100}%`;
        lineRef.current.style.opacity = currentProgress > 0.005 ? "1" : "0";
      }
      updateDots(currentProgress);

      if (Math.abs(targetProgress - currentProgress) > 0.0003) {
        rafId = requestAnimationFrame(loop);
      } else {
        isRunning = false;
        rafId = null;
      }
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(loop);
      }
    };

    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start line drawing when top of timeline enters 75% down the viewport
      const startPoint = windowHeight * 0.75;
      const totalSpan = rect.height;

      const currentPosition = startPoint - rect.top;
      const raw = currentPosition / totalSpan;
      targetProgress = Math.min(Math.max(raw, 0), 1);

      startLoop();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial measurement
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
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
            ref={lineRef}
            className={styles.timelineProgressLine}
            style={{ height: "0%" }}
            aria-hidden="true"
          />

          {experienceData.map((item, index) => {
            return (
              <div key={index} className={styles.timelineItem}>
                <div
                  ref={(el) => {
                    dotRefs.current[index] = el;
                  }}
                  className={styles.timelineDot}
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
