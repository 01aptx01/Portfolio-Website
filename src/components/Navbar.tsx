"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { Send } from "lucide-react";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const accumulatedDelta = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      // Always show when near the very top of the page
      if (currentScrollY <= 80) {
        setIsVisible(true);
        accumulatedDelta.current = 0;
        lastScrollY.current = currentScrollY;
        return;
      }

      // Reset accumulated delta if scroll direction reversed
      if ((delta > 0 && accumulatedDelta.current < 0) || (delta < 0 && accumulatedDelta.current > 0)) {
        accumulatedDelta.current = 0;
      }

      accumulatedDelta.current += delta;

      // Scrolling down past threshold -> smoothly hide navbar
      if (accumulatedDelta.current > 12) {
        setIsVisible(false);
      }
      // Scrolling up past threshold -> smoothly reveal navbar
      else if (accumulatedDelta.current < -12) {
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
