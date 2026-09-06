"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";
import { Send } from "lucide-react";

export default function Navbar() {
  return (
    <header className={styles.header}>
      <nav className={styles.navContainer} aria-label="Main Navigation">
        <Link href="/" className={styles.brand} id="nav-brand">
          <div className={styles.brandIcon}>
            <Send size={16} />
          </div>
          <span>Alex.dev</span>
        </Link>

        <ul className={styles.links}>
          <li>
            <Link href="#about" className={styles.navLink} id="nav-link-about">
              About
            </Link>
          </li>
          <li>
            <Link href="#projects" className={styles.navLink} id="nav-link-projects">
              Projects
            </Link>
          </li>
          <li>
            <Link href="#skills" className={styles.navLink} id="nav-link-skills">
              Skills
            </Link>
          </li>
          <li>
            <Link href="#experience" className={styles.navLink} id="nav-link-experience">
              Experience
            </Link>
          </li>
          <li>
            <Link href="#contact" className={styles.navLink} id="nav-link-contact">
              Contact
            </Link>
          </li>
        </ul>

        <div className={styles.actions}>
          <Link href="#contact" className={styles.contactBtn} id="nav-cta-contact">
            Get In Touch
          </Link>
        </div>
      </nav>
    </header>
  );
}
