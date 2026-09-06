"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { Send } from "lucide-react";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show when near the very top
      if (currentScrollY < 60) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 8 && currentScrollY > 100) {
        // Scrolling down -> smoothly hide
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 8) {
        // Scrolling up -> smoothly reveal
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${!isVisible ? styles.headerHidden : ""}`}>
      <nav className={styles.navContainer} aria-label="Main Navigation">
        <Link href="/" className={styles.brand} id="nav-brand">
          <div className={styles.brandIcon}>
            <Send size={16} />
          </div>
          <span>Dew.dev</span>
        </Link>

        <ul className={styles.links}>
          <li>
            <Link href="#about" className={styles.navLink} id="nav-link-about">
              About
            </Link>
          </li>
          <li>
            <Link href="#capabilities" className={styles.navLink} id="nav-link-capabilities">
              Capabilities
            </Link>
          </li>
          <li>
            <Link href="#projects" className={styles.navLink} id="nav-link-projects">
              Projects
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
