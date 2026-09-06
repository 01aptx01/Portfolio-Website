"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { profileData } from "@/data/profile";
import TrajectoryPlaneCanvas from "./TrajectoryPlaneCanvas";

export default function Hero() {
  return (
    <section className={styles.heroSection} id="hero">
      {/* Authentic Trajectory Dawn Lighting Backdrop */}
      <div className={styles.backdropLayer} aria-hidden="true">
        <Image
          src="/images/trajectory/viz-platform.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.backdropImage}
        />
      </div>

      {/* Atmospheric Ambient Lighting Glows */}
      <div className={styles.skyAtmosphere} aria-hidden="true">
        <div className={styles.peachBloom} />
        <div className={styles.lavenderGlow} />
      </div>

      {/* Authentic Stippled Pointillism Cloud (Left) */}
      <div className={styles.cloudLeft} aria-hidden="true">
        <Image
          src="/images/trajectory/cloud-source-2.png"
          alt=""
          width={960}
          height={420}
          priority
          className={styles.cloudImg}
        />
      </div>

      {/* Authentic Stippled Pointillism Cloud (Right) */}
      <div className={styles.cloudRight} aria-hidden="true">
        <Image
          src="/images/trajectory/cloud-source-1.png"
          alt=""
          width={580}
          height={380}
          priority
          className={styles.cloudImg}
        />
      </div>

      <div className={styles.heroContainer}>
        {/* Top Eyebrow Pill Badge */}
        <div className={styles.eyebrowWrapper}>
          <div className={styles.eyebrowBadge}>
            <span className={styles.pulseDot} />
            <span>The Platform for Scalable Architecture</span>
          </div>
        </div>

        {/* Centerpiece Stage: Split Typography & Live 3D WebGL Origami Paper Airplane */}
        <div className={styles.stageRow}>
          {/* Left Hero Word */}
          <h1 className={styles.displayLeft}>
            Intelligence
          </h1>

          {/* Authentic 3D WebGL Origami Plane Canvas with Golden Particle Tail */}
          <div className={styles.planeWrapper} aria-label="3D Origami paper airplane flying in motion">
            <TrajectoryPlaneCanvas />
          </div>

          {/* Right Hero Word */}
          <h1 className={styles.displayRight}>
            in motion
          </h1>
        </div>

        {/* Trajectory Bottom-Right Editorial Subtext & Actions */}
        <div className={styles.bottomRow}>
          <div className={styles.bottomCard}>
            <p className={styles.bodyDescription}>
              {profileData.tagline}
            </p>

            <div className={styles.actionGroup}>
              {/* Signature Slate Navy Pill */}
              <Link href="#projects" className={styles.primaryPill} id="hero-btn-projects">
                <span>Explore Projects</span>
                <ArrowRight size={16} />
              </Link>

              {/* Soft Peach Translucent Pill */}
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
