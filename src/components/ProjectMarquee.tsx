"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProjectMarquee.module.css";
import { projectsData } from "@/data/projects";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { getAssetPath } from "@/lib/basePath";

export default function ProjectMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items for continuous seamless infinite loop
  const row1 = [...projectsData, ...projectsData];
  const row2 = [...projectsData.slice().reverse(), ...projectsData.slice().reverse()];

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <div
      className={`${styles.marqueeSection} ${isPaused ? styles.paused : ""}`}
      role="region"
      aria-label="Interactive Projects Visual Showcase"
    >
      {/* Accessible Control Bar */}
      <div className={styles.marqueeControls}>
        <button
          type="button"
          onClick={togglePause}
          className={styles.pauseBtn}
          aria-pressed={isPaused}
          aria-label={isPaused ? "Resume project gallery animation" : "Pause project gallery animation"}
          id="btn-marquee-pause"
        >
          {isPaused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          <span>{isPaused ? "Resume Motion" : "Pause Motion"}</span>
        </button>
      </div>

      <div className={styles.marqueeWrapper}>
        {/* Track 1: Drifting Left */}
        <div className={`${styles.track} ${styles.trackLeft}`}>
          <div className={styles.trackGroup}>
            {row1.map((project, idx) => (
              <Link
                key={`row1-${project.slug}-${idx}`}
                href={`/projects/${project.slug}`}
                className={styles.marqueeCard}
                aria-label={`View ${project.title} - ${project.category}`}
              >
                <div className={styles.imageWrapper}>
                  {project.image && (
                    <Image
                      src={getAssetPath(project.image)}
                      alt={`Visual prototype preview for ${project.title}`}
                      fill
                      sizes="(max-width: 768px) 340px, 480px"
                      className={styles.projectImage}
                    />
                  )}
                  <div className={styles.cardOverlay}>
                    <div className={styles.cardTop}>
                      <span className={styles.cardCategory}>{project.category}</span>
                      <span className={styles.cardTimeline}>{project.timeline}</span>
                    </div>
                    <div className={styles.cardBottom}>
                      <h4 className={styles.cardTitle}>{project.title}</h4>
                      <p className={styles.cardTagline}>{project.tagline}</p>
                      <div className={styles.cardActionRow}>
                        <span>Explore Architecture</span>
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Track 2: Drifting Right */}
        <div className={`${styles.track} ${styles.trackRight}`}>
          <div className={styles.trackGroup}>
            {row2.map((project, idx) => (
              <Link
                key={`row2-${project.slug}-${idx}`}
                href={`/projects/${project.slug}`}
                className={styles.marqueeCard}
                aria-label={`View ${project.title} - ${project.category}`}
              >
                <div className={styles.imageWrapper}>
                  {project.image && (
                    <Image
                      src={getAssetPath(project.image)}
                      alt={`Visual prototype preview for ${project.title}`}
                      fill
                      sizes="(max-width: 768px) 340px, 480px"
                      className={styles.projectImage}
                    />
                  )}
                  <div className={styles.cardOverlay}>
                    <div className={styles.cardTop}>
                      <span className={styles.cardCategory}>{project.category}</span>
                      <span className={styles.cardTimeline}>{project.timeline}</span>
                    </div>
                    <div className={styles.cardBottom}>
                      <h4 className={styles.cardTitle}>{project.title}</h4>
                      <p className={styles.cardTagline}>{project.tagline}</p>
                      <div className={styles.cardActionRow}>
                        <span>Explore Architecture</span>
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
