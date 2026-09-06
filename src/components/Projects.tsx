import Link from "next/link";
import styles from "./Projects.module.css";
import { projectsData } from "@/data/projects";
import { FolderGit2, ArrowRight, Github, ExternalLink } from "lucide-react";
import ProjectMarquee from "./ProjectMarquee";

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-pill">
            <FolderGit2 size={14} />
            <span>Featured Engineering</span>
          </div>
          <h2 className="section-title">Systems & Architecture Showcase</h2>
          <p className="section-subtitle">
            Curated selection of high-throughput distributed systems, performant frontend engines, and full-stack solutions.
          </p>
        </div>
      </div>

      {/* Semplice-Inspired Interactive Project Visual Showcase */}
      <ProjectMarquee />

      <div className="container">
        <div className={`${styles.bentoGrid} revealStagger`}>
          {projectsData.map((project, index) => {
            // Assign varying bento column spans for visual rhythm
            const gridClass =
              index === 0
                ? styles.cardCol8
                : index === 1
                ? styles.cardCol4
                : styles.cardCol6;

            return (
              <article
                key={project.slug}
                className={`${styles.bentoCard} ${gridClass}`}
                id={`project-${project.slug}`}
              >
                <div>
                  <div className={styles.cardHeader}>
                    <span className={styles.categoryBadge}>{project.category}</span>
                    <span className={styles.timeline}>{project.timeline}</span>
                  </div>

                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectTagline}>{project.tagline}</p>

                  {/* Highlight Metrics */}
                  <div className={styles.metricsList}>
                    {project.metrics.slice(0, 2).map((metric, mIdx) => (
                      <div key={mIdx} className={styles.metricItem}>
                        <span className={styles.metricDot} />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Badges */}
                  <div className={styles.techStack}>
                    {project.techStack.map((tech) => (
                      <span key={tech} className={styles.techBadge}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className={styles.cardFooter}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className={styles.deepDiveLink}
                    id={`link-deepdive-${project.slug}`}
                  >
                    <span>Read Architecture Spec</span>
                    <ArrowRight size={16} />
                  </Link>

                  <div className={styles.externalActions}>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.iconBtn}
                        aria-label={`View ${project.title} on GitHub`}
                        id={`btn-github-${project.slug}`}
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.iconBtn}
                        aria-label={`Visit ${project.title} live demo`}
                        id={`btn-live-${project.slug}`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
