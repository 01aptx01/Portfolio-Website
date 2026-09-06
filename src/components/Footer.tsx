"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { profileData } from "@/data/profile";

const ROTATING_TITLES = [
  "Full-Stack Developer",
  "UI/UX Architect",
  "Distributed Systems Engineer",
  "AI & ML Researcher",
  "Systems Craftsperson",
];

export default function Footer() {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Phase 1: Trigger blur fade-out
      setIsAnimating(true);

      // Phase 2: Switch word and blur fade-in
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % ROTATING_TITLES.length);
        setIsAnimating(false);
      }, 350);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footerWrapper} id="footer">
      <div className={styles.footerContainer}>
        {/* Top Header Row */}
        <div className={styles.headerRow}>
          <div className={styles.authorBadge}>
            <div className={styles.avatarBox} aria-hidden="true">
              <span>TP</span>
            </div>
            <div className={styles.authorInfo}>
              <h3 className={styles.authorName}>Teeranan Pakdeekhan</h3>
              <p className={styles.authorRole}>FULL-STACK & DISTRIBUTED SYSTEMS</p>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className={styles.backToTopBtn}
            aria-label="Scroll back to top"
            id="footer-back-to-top"
          >
            <span>Back to top</span>
            <ArrowUp size={15} />
          </button>
        </div>

        {/* Big Animated Card */}
        <div className={styles.bigBannerCard}>
          <div className={styles.innovatePill}>
            <span>INNOVATE & BUILD</span>
          </div>

          <h2
            className={`${styles.animatedTitle} ${
              isAnimating ? styles.animatingOut : styles.animatingIn
            }`}
          >
            {ROTATING_TITLES[index]}
          </h2>
        </div>

        {/* Navigation Links Row */}
        <nav className={styles.navRow} aria-label="Footer Navigation">
          <Link href="#hero" className={styles.footerLink}>
            Home
          </Link>
          <Link href="#about" className={styles.footerLink}>
            About
          </Link>
          <Link href="#capabilities" className={styles.footerLink}>
            Capabilities
          </Link>
          <Link href="#projects" className={styles.footerLink}>
            Projects
          </Link>
          <Link href="#experience" className={styles.footerLink}>
            Experience
          </Link>
          <Link href="#contact" className={styles.footerLink}>
            Contact
          </Link>
        </nav>

        {/* Subtle Divider Line */}
        <div className={styles.divider} aria-hidden="true" />

        {/* Bottom Row: Social Icons & Copyright */}
        <div className={styles.bottomRow}>
          <div className={styles.socialButtons}>
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialCircle}
              aria-label="GitHub Profile"
              id="footer-github"
            >
              <Github size={17} />
            </a>
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialCircle}
              aria-label="LinkedIn Profile"
              id="footer-linkedin"
            >
              <Linkedin size={17} />
            </a>
            <a
              href={`mailto:${profileData.email}`}
              className={styles.socialCircle}
              aria-label="Direct Email"
              id="footer-email"
            >
              <Mail size={17} />
            </a>
          </div>

          <p className={styles.copyrightText}>
            © {new Date().getFullYear()} Teeranan Pakdeekhan. Crafted with 🧡 & Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
