import styles from "./Experience.module.css";
import { experienceData } from "@/data/experience";
import { Briefcase } from "lucide-react";

export default function Experience() {
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

        <div className={`${styles.timelineContainer} revealStagger`}>
          {experienceData.map((item, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineDot} />
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
          ))}
        </div>
      </div>
    </section>
  );
}
