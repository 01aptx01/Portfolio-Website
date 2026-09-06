"use client";

import Link from "next/link";
import styles from "./Hero.module.css";
import { ArrowRight, Layers, Cpu, Zap, Sparkles } from "lucide-react";
import { profileData } from "@/data/profile";

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      {/* Background Ambient Cloud Glows */}
      <div className={styles.cloudBgLeft} aria-hidden="true" />
      <div className={styles.cloudBgRight} aria-hidden="true" />

      <div className={styles.heroContent}>
        {/* Top Status Pill */}
        <div className={styles.badgeWrapper}>
          <span className={styles.pulseDot} />
          <span>{profileData.status}</span>
        </div>

        {/* Hero Editorial Headline */}
        <h1 className={styles.headline}>
          <span className={styles.headlineSplit}>Intelligence</span>
          <span className={styles.headlineSplit}>in motion</span>
        </h1>

        {/* Subheadline */}
        <p className={styles.subheadline}>
          {profileData.tagline}
        </p>

        {/* Primary Call-to-Actions */}
        <div className={styles.ctaGroup}>
          <Link href="#projects" className="btn-primary" id="hero-cta-projects">
            <span>Explore Engineering Projects</span>
            <ArrowRight size={18} />
          </Link>
          <Link href="#contact" className="btn-secondary" id="hero-cta-contact">
            <span>Get in Touch</span>
          </Link>
        </div>

        {/* Paper Plane & Motion Centerpiece with Floating Badges */}
        <div className={styles.centerpieceContainer} aria-hidden="true">
          {/* Floating Keyword Badge 1: Full-Stack */}
          <div className={`${styles.floatingBadge} ${styles.badgeTopLeft}`}>
            <div className={styles.badgeIcon}><Layers size={14} /></div>
            <span>Full-Stack Systems</span>
          </div>

          {/* Floating Keyword Badge 2: Distributed Systems */}
          <div className={`${styles.floatingBadge} ${styles.badgeTopRight}`}>
            <div className={styles.badgeIcon}><Cpu size={14} /></div>
            <span>Distributed Architecture</span>
          </div>

          {/* Floating Keyword Badge 3: High Performance */}
          <div className={`${styles.floatingBadge} ${styles.badgeBottomLeft}`}>
            <div className={styles.badgeIcon}><Zap size={14} /></div>
            <span>High Throughput & Speed</span>
          </div>

          {/* Floating Keyword Badge 4: UI/UX Craft */}
          <div className={`${styles.floatingBadge} ${styles.badgeBottomRight}`}>
            <div className={styles.badgeIcon}><Sparkles size={14} /></div>
            <span>Refined UI/UX Craft</span>
          </div>

          {/* Origami Paper Plane Centerpiece with Stippled Trail */}
          <div className={styles.paperPlaneWrapper}>
            <svg
              viewBox="0 0 240 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", height: "100%", overflow: "visible" }}
            >
              <defs>
                {/* Paper Plane Wing Gradients */}
                <linearGradient id="mainWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="60%" stopColor="#fdf3ed" />
                  <stop offset="100%" stopColor="#fce4d6" />
                </linearGradient>

                <linearGradient id="leftFoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fce7df" />
                  <stop offset="100%" stopColor="#ecd4cf" />
                </linearGradient>

                <linearGradient id="underbellyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#dfd6e9" />
                  <stop offset="100%" stopColor="#c5b7da" />
                </linearGradient>

                <linearGradient id="stippleTrailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ebb672" stopOpacity="0.85" />
                  <stop offset="60%" stopColor="#f5c2a8" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#f8d6c8" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Stippled Propellant Particle Trail */}
              <g opacity="0.85">
                <circle cx="25" cy="165" r="2" fill="#ebb672" opacity="0.6" />
                <circle cx="45" cy="155" r="3" fill="#e89d6e" opacity="0.7" />
                <circle cx="65" cy="148" r="2" fill="#ebb672" opacity="0.5" />
                <circle cx="50" cy="165" r="3.5" fill="#f5c2a8" opacity="0.8" />
                <circle cx="75" cy="138" r="4.5" fill="#ebb672" opacity="0.85" />
                <circle cx="85" cy="150" r="2.5" fill="#e89d6e" opacity="0.75" />
                <circle cx="100" cy="132" r="4" fill="#ebb672" opacity="0.9" />
                <circle cx="110" cy="142" r="3" fill="#f5c2a8" opacity="0.8" />
                <circle cx="118" cy="125" r="5" fill="#f0ab64" opacity="0.95" />
                <circle cx="92" cy="120" r="2.5" fill="#ebb672" opacity="0.6" />
                <circle cx="105" cy="112" r="3" fill="#e89d6e" opacity="0.8" />
                <circle cx="126" cy="116" r="3.5" fill="#ebb672" opacity="0.85" />

                {/* Micro Stipple Dots */}
                <circle cx="35" cy="170" r="1" fill="#ebb672" />
                <circle cx="58" cy="172" r="1.5" fill="#ebb672" />
                <circle cx="70" cy="160" r="1.5" fill="#ebb672" />
                <circle cx="88" cy="165" r="1" fill="#ebb672" />
                <circle cx="115" cy="155" r="1.5" fill="#ebb672" />
                <circle cx="130" cy="135" r="2" fill="#ebb672" />
              </g>

              {/* Origami Paper Plane Bodies */}
              {/* Underbelly fold */}
              <polygon
                points="120,118 135,160 148,125"
                fill="url(#underbellyGrad)"
              />
              {/* Back right wing fold */}
              <polygon
                points="120,118 215,35 148,125"
                fill="url(#leftFoldGrad)"
              />
              {/* Main Top Facing Origami Wing */}
              <polygon
                points="120,118 215,35 78,82"
                fill="url(#mainWingGrad)"
                stroke="#ecd3c7"
                strokeWidth="0.75"
              />
              {/* Central Spine Fold Accent */}
              <line
                x1="120"
                y1="118"
                x2="215"
                y2="35"
                stroke="rgba(215, 175, 160, 0.45)"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
