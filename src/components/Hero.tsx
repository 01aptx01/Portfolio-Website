"use client";

import Link from "next/link";
import styles from "./Hero.module.css";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { profileData } from "@/data/profile";

export default function Hero() {
  return (
    <section className={styles.heroSection} id="hero">
      {/* Background Dawn Atmosphere */}
      <div className={styles.skyAtmosphere} aria-hidden="true">
        {/* Soft Peach Dawn Bloom on Bottom Left */}
        <div className={styles.peachBloom} />
        {/* Soft Lavender Sky Glow on Top Right */}
        <div className={styles.lavenderGlow} />
      </div>

      {/* Flanking Stippled Cloud Left */}
      <div className={styles.cloudLeft} aria-hidden="true">
        <svg viewBox="0 0 540 380" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.cloudSvg}>
          <defs>
            <radialGradient id="cloudGradLeft" cx="40%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#fffaf5" />
              <stop offset="50%" stopColor="#fde4d3" />
              <stop offset="85%" stopColor="#d5d0eb" />
              <stop offset="100%" stopColor="#bfb8e0" />
            </radialGradient>
            <filter id="cloudGrain">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
              <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.18 0" />
              <feComposite in2="SourceGraphic" in="gl" operator="in" />
            </filter>
          </defs>
          {/* Cloud Base Lobes */}
          <path
            d="M 60 280 C 30 250 20 200 60 160 C 90 120 160 110 190 140 C 220 100 300 90 350 130 C 400 110 460 130 480 180 C 510 210 500 270 450 300 C 410 320 100 330 60 280 Z"
            fill="url(#cloudGradLeft)"
            opacity="0.88"
          />
          {/* Stipple Grain Circles Overlay */}
          <g fill="#9f92c6" opacity="0.45">
            <circle cx="95" cy="210" r="1.5" />
            <circle cx="110" cy="225" r="2" />
            <circle cx="85" cy="235" r="1.5" />
            <circle cx="140" cy="205" r="2" />
            <circle cx="155" cy="220" r="1.5" />
            <circle cx="170" cy="240" r="2" />
            <circle cx="210" cy="220" r="2.5" />
            <circle cx="230" cy="250" r="2" />
            <circle cx="270" cy="240" r="2.5" />
            <circle cx="310" cy="230" r="2" />
            <circle cx="340" cy="255" r="2" />
            <circle cx="380" cy="245" r="2" />
            <circle cx="410" cy="260" r="1.5" />
          </g>
          <g fill="#e59868" opacity="0.4">
            <circle cx="120" cy="180" r="2" />
            <circle cx="180" cy="160" r="2.5" />
            <circle cx="240" cy="150" r="3" />
            <circle cx="290" cy="160" r="2.5" />
            <circle cx="360" cy="175" r="2" />
            <circle cx="420" cy="200" r="2" />
          </g>
        </svg>
      </div>

      {/* Flanking Stippled Cloud Right */}
      <div className={styles.cloudRight} aria-hidden="true">
        <svg viewBox="0 0 420 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.cloudSvg}>
          <defs>
            <radialGradient id="cloudGradRight" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#fcf0e4" />
              <stop offset="90%" stopColor="#e1dcfa" />
              <stop offset="100%" stopColor="#c5bee3" />
            </radialGradient>
          </defs>
          <path
            d="M 50 180 C 20 150 40 100 80 85 C 120 70 170 85 190 110 C 220 80 280 75 320 100 C 360 90 400 120 400 160 C 400 200 350 225 300 225 C 200 230 100 220 50 180 Z"
            fill="url(#cloudGradRight)"
            opacity="0.82"
          />
          <g fill="#9a8cc2" opacity="0.4">
            <circle cx="120" cy="140" r="2" />
            <circle cx="145" cy="155" r="1.5" />
            <circle cx="180" cy="165" r="2" />
            <circle cx="220" cy="150" r="2.5" />
            <circle cx="260" cy="170" r="2" />
            <circle cx="310" cy="160" r="2" />
            <circle cx="350" cy="175" r="1.5" />
          </g>
        </svg>
      </div>

      <div className={styles.heroContainer}>
        {/* Top Eyebrow Pill Badge (Trajectory Style) */}
        <div className={styles.eyebrowWrapper}>
          <div className={styles.eyebrowBadge}>
            <span className={styles.pulseDot} />
            <span>The Platform for Scalable Architecture</span>
          </div>
        </div>

        {/* Centerpiece Stage: Split Typography & Origami Paper Plane */}
        <div className={styles.stageRow}>
          {/* Left Hero Word */}
          <h1 className={styles.displayLeft}>
            Intelligence
          </h1>

          {/* Central Origami Airplane with Golden Stipple Jet Stream */}
          <div className={styles.planeWrapper} aria-label="Origami paper plane flying upwards in motion">
            <svg
              viewBox="0 0 320 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.planeSvg}
            >
              <defs>
                {/* Main Top Wing Surface (Cream to Soft Peach) */}
                <linearGradient id="trajMainWing" x1="15%" y1="20%" x2="90%" y2="85%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#fef2ea" />
                  <stop offset="100%" stopColor="#fcdfcb" />
                </linearGradient>

                {/* Left Creased Wing Fold (Blush Peach) */}
                <linearGradient id="trajLeftFold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fce4d8" />
                  <stop offset="100%" stopColor="#f4cbba" />
                </linearGradient>

                {/* Underside Fold (Signature Trajectory Violet Shadow) */}
                <linearGradient id="trajUnderFold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#b6aee0" />
                  <stop offset="100%" stopColor="#8d84bc" />
                </linearGradient>

                {/* Golden Particle Glow */}
                <radialGradient id="particleGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ebb672" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#e89d6e" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Golden Sunlit Stipple Particle Tail */}
              <g className={styles.stippleTrail}>
                {/* Far Tail Dispersal */}
                <circle cx="28" cy="225" r="1.5" fill="#ebb672" opacity="0.45" />
                <circle cx="42" cy="210" r="2.2" fill="#ebb672" opacity="0.55" />
                <circle cx="35" cy="232" r="1.8" fill="#e89d6e" opacity="0.4" />
                <circle cx="58" cy="202" r="2.5" fill="#f5c2a8" opacity="0.65" />
                <circle cx="50" cy="220" r="2.0" fill="#ebb672" opacity="0.5" />
                <circle cx="70" cy="190" r="3.2" fill="#ebb672" opacity="0.75" />
                <circle cx="82" cy="205" r="2.4" fill="#e89d6e" opacity="0.6" />
                <circle cx="95" cy="182" r="3.8" fill="#f0ab64" opacity="0.8" />
                <circle cx="108" cy="195" r="2.6" fill="#ebb672" opacity="0.7" />
                <circle cx="120" cy="170" r="4.2" fill="#f0ab64" opacity="0.88" />
                <circle cx="132" cy="184" r="3.2" fill="#ebb672" opacity="0.75" />
                <circle cx="145" cy="158" r="4.8" fill="#f0ab64" opacity="0.92" />
                <circle cx="158" cy="172" r="3.5" fill="#ebb672" opacity="0.85" />
                <circle cx="168" cy="148" r="5.2" fill="#f5b660" opacity="0.95" />
                <circle cx="178" cy="160" r="3.8" fill="#f0ab64" opacity="0.85" />

                {/* Fine Stipple Dust */}
                <circle cx="48" cy="235" r="1.2" fill="#ebb672" opacity="0.5" />
                <circle cx="65" cy="215" r="1.4" fill="#ebb672" opacity="0.6" />
                <circle cx="88" cy="220" r="1.5" fill="#ebb672" opacity="0.55" />
                <circle cx="104" cy="208" r="1.6" fill="#ebb672" opacity="0.6" />
                <circle cx="125" cy="195" r="1.8" fill="#ebb672" opacity="0.65" />
                <circle cx="140" cy="180" r="1.8" fill="#ebb672" opacity="0.7" />
                <circle cx="160" cy="185" r="2.0" fill="#ebb672" opacity="0.7" />
                <circle cx="172" cy="172" r="2.2" fill="#ebb672" opacity="0.75" />
              </g>

              {/* Origami Paper Airplane Polygons */}
              {/* 1. Underside Keel / Deep Violet Wing */}
              <polygon
                points="178,144 200,196 216,150"
                fill="url(#trajUnderFold)"
              />

              {/* 2. Right Wing Folded Flange */}
              <polygon
                points="178,144 298,42 216,150"
                fill="url(#trajLeftFold)"
                stroke="#e4c3b5"
                strokeWidth="0.6"
              />

              {/* 3. Main Upper Wing Canvas */}
              <polygon
                points="178,144 298,42 122,100"
                fill="url(#trajMainWing)"
                stroke="#ecd3c7"
                strokeWidth="0.8"
              />

              {/* 4. Crisp Fold Spine Highlight Line */}
              <line
                x1="178"
                y1="144"
                x2="298"
                y2="42"
                stroke="rgba(215, 175, 160, 0.45)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Right Hero Word */}
          <h1 className={styles.displayRight}>
            in motion
          </h1>
        </div>

        {/* Trajectory Bottom-Right Editorial Subtext & CTA */}
        <div className={styles.bottomRow}>
          <div className={styles.bottomCard}>
            <p className={styles.bodyDescription}>
              {profileData.tagline}
            </p>

            <div className={styles.actionGroup}>
              {/* Signature Trajectory Slate Navy Pill */}
              <Link href="#projects" className={styles.primaryPill} id="hero-btn-projects">
                <span>Explore Projects</span>
                <ArrowRight size={16} />
              </Link>

              {/* Soft Peach / Translucent Pill */}
              <Link href="#contact" className={styles.secondaryPill} id="hero-btn-contact">
                <span>Get In Touch</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
