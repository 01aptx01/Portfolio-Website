import styles from "./Skills.module.css";
import { skillsData } from "@/data/skills";
import { Wrench } from "lucide-react";

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-pill">
            <Wrench size={14} />
            <span>Technical Proficiencies</span>
          </div>
          <h2 className="section-title">Core Competencies & Stack</h2>
          <p className="section-subtitle">
            Tools, architectures, and engineering principles leveraged to build resilient systems.
          </p>
        </div>

        <div className={`${styles.skillsGrid} revealStagger`}>
          {skillsData.map((group, index) => (
            <div key={index} className={styles.skillGroupCard}>
              <h3 className={styles.groupCategory}>{group.category}</h3>
              <p className={styles.groupDesc}>{group.description}</p>

              <div className={styles.skillList}>
                {group.skills.map((skill, sIdx) => (
                  <div key={sIdx} className={styles.skillItem}>
                    <span className={styles.skillName}>{skill.name}</span>
                    {skill.highlight && (
                      <span className={styles.skillHighlight}>{skill.highlight}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
