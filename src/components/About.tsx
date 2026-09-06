import styles from "./About.module.css";
import { profileData } from "@/data/profile";
import { Compass } from "lucide-react";

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-pill">
            <Compass size={14} />
            <span>Philosophy & Background</span>
          </div>
          <h2 className="section-title">Engineering from first principles.</h2>
          <p className="section-subtitle">
            Crafting deep modules, verifiable correctness, and high-performance digital systems.
          </p>
        </div>

        <div className={`${styles.aboutGrid} revealStagger`}>
          {/* Bio Description Card */}
          <div className={styles.bioCard}>
            <p className={styles.bioLead}>
              Hi, I&apos;m {profileData.name} — a {profileData.role} dedicated to solving hard software engineering problems.
            </p>
            {profileData.bio.map((paragraph, index) => (
              <p key={index} className={styles.bioParagraph}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Key Engineering Metrics */}
          <div className={styles.metricsGrid}>
            {profileData.metrics.map((metric, index) => (
              <div key={index} className={styles.metricCard}>
                <div className={styles.metricValue}>{metric.value}</div>
                <div className={styles.metricLabel}>{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
