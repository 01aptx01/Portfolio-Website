import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./ProjectDetail.module.css";
import { projectsData } from "@/data/projects";
import { ArrowLeft, Github, ExternalLink, Cpu, CheckCircle2, Layers, AlertCircle } from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = projectsData.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Architecture & Case Study`,
    description: project.tagline,
  };
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
    return null;
  }

  return (
    <div className={styles.projectPage}>
      <div className="container">
        {/* Back Link */}
        <Link href="/#projects" className={styles.backNav} id="btn-back-projects">
          <ArrowLeft size={16} />
          <span>Back to All Projects</span>
        </Link>

        {/* Header Banner */}
        <header className={styles.headerCard}>
          <div className={styles.metaRow}>
            <span className={styles.category}>{project.category}</span>
            <span className={styles.timelineRole}>
              {project.role} • {project.timeline}
            </span>
          </div>

          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.tagline}>{project.tagline}</p>

          <div className={styles.linkGroup}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                id="btn-detail-github"
              >
                <Github size={18} />
                <span>Source Code (GitHub)</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                id="btn-detail-live"
              >
                <ExternalLink size={18} />
                <span>Live Demonstration</span>
              </a>
            )}
          </div>
        </header>

        {/* Highlight Metrics */}
        <section className={styles.metricsBanner} aria-label="Key Performance Indicators">
          {project.metrics.map((metric, index) => (
            <div key={index} className={styles.metricTile}>
              <span className={styles.metricDot} />
              <span className={styles.metricText}>{metric}</span>
            </div>
          ))}
        </section>

        {/* Deep Dive Grid */}
        <div className={styles.detailGrid}>
          {/* Left Column: System Architecture & Challenges */}
          <div>
            {/* Architecture Overview */}
            <article className={styles.contentCard}>
              <h2 className={styles.sectionHeading}>
                <Cpu size={20} color="var(--accent-coral)" />
                <span>System Architecture</span>
              </h2>
              <p className={styles.bodyText}>{project.architecture.overview}</p>

              <h3
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  marginBottom: "0.85rem",
                  color: "var(--text-primary)",
                }}
              >
                Key Architecture Components
              </h3>
              <ul className={styles.componentsList}>
                {project.architecture.keyComponents.map((component, cIdx) => (
                  <li key={cIdx} className={styles.componentItem}>
                    {component}
                  </li>
                ))}
              </ul>

              {project.architecture.dataFlow && (
                <div
                  style={{
                    marginTop: "1.75rem",
                    padding: "1rem 1.25rem",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(255, 255, 255, 0.7)",
                    border: "1px solid rgba(216, 203, 196, 0.4)",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: "var(--text-muted)",
                      marginBottom: "0.35rem",
                    }}
                  >
                    Data Pipeline Flow
                  </span>
                  <code
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    {project.architecture.dataFlow}
                  </code>
                </div>
              )}
            </article>

            {/* Engineering Challenges & Solutions */}
            <article className={styles.contentCard}>
              <h2 className={styles.sectionHeading}>
                <AlertCircle size={20} color="var(--accent-coral)" />
                <span>Engineering Challenges & Solutions</span>
              </h2>
              {project.challenges.map((challenge, chIdx) => (
                <div key={chIdx} className={styles.challengeBox}>
                  <div className={styles.problemTitle}>Challenge: {challenge.problem}</div>
                  <div className={styles.solutionText}>
                    <strong>Engineering Solution:</strong> {challenge.solution}
                  </div>
                </div>
              ))}
            </article>
          </div>

          {/* Right Column: Project Overview & Tech Breakdown */}
          <div>
            <aside className={styles.contentCard}>
              <h2 className={styles.sectionHeading}>
                <CheckCircle2 size={20} color="var(--accent-coral)" />
                <span>Project Scope</span>
              </h2>
              <p className={styles.bodyText}>{project.description}</p>
            </aside>

            <aside className={styles.contentCard}>
              <h2 className={styles.sectionHeading}>
                <Layers size={20} color="var(--accent-coral)" />
                <span>Technologies & Frameworks</span>
              </h2>
              <div className={styles.techChips}>
                {project.techStack.map((tech) => (
                  <span key={tech} className={styles.chip}>
                    {tech}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
