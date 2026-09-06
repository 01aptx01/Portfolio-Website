"use client";

import Link from "next/link";
import styles from "./Footer.module.css";
import { ArrowUp } from "lucide-react";
import { profileData } from "@/data/profile";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.brandNote}>
          <span className={styles.brandName}>{profileData.name}</span>
          <span className={styles.brandDesc}>
            Built with Next.js, TypeScript & Dawn Pastel Editorial Design System.
          </span>
        </div>

        <button
          onClick={scrollToTop}
          className={styles.backToTop}
          aria-label="Back to top"
          id="btn-back-to-top"
        >
          <span>Back to Top</span>
          <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
}
