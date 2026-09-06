"use client";

import { useState } from "react";
import styles from "./Contact.module.css";
import { profileData } from "@/data/profile";
import { Mail, Copy, Check, Github, Linkedin, FileText, Send } from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className={`${styles.contactBox} reveal`}>
          <div className="section-pill" style={{ marginBottom: "1.5rem" }}>
            <Mail size={14} />
            <span>Initiate Collaboration</span>
          </div>

          <h2 className={styles.contactTitle}>Let&apos;s build something exceptional.</h2>
          <p className={styles.contactSubtitle}>
            Whether you have a complex distributed systems challenge, an ambitious web application, or a high-impact engineering role.
          </p>

          {/* 1-Click Copyable Email Pill */}
          <button
            type="button"
            className={styles.emailPillContainer}
            onClick={handleCopyEmail}
            aria-label={`Copy email address ${profileData.email}`}
            id="btn-copy-email"
          >
            <Mail size={18} color="var(--accent-coral)" aria-hidden="true" />
            <span className={styles.emailText}>{profileData.email}</span>
            <div
              className={`${styles.copyButton} ${copied ? styles.copiedToast : ""}`}
              aria-live="polite"
            >
              {copied ? (
                <>
                  <Check size={14} aria-hidden="true" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} aria-hidden="true" />
                  <span>Click to copy</span>
                </>
              )}
            </div>
          </button>

          {/* Primary Action Buttons */}
          <div className={styles.actionButtons}>
            <a
              href={`mailto:${profileData.email}?subject=Engineering%20Inquiry`}
              className="btn-primary"
              id="btn-send-email"
            >
              <Send size={16} />
              <span>Send Direct Email</span>
            </a>
            <a
              href={profileData.resumeUrl || "https://www.canva.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              id="btn-view-resume"
            >
              <FileText size={16} />
              <span>View Resume (Canva)</span>
            </a>
          </div>

          {/* Social Profiles */}
          <div className={styles.socialRow}>
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GitHub Profile"
              id="social-github"
            >
              <Github size={20} />
            </a>
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn Profile"
              id="social-linkedin"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`mailto:${profileData.email}`}
              className={styles.socialLink}
              aria-label="Direct Email"
              id="social-mail-direct"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
