"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { profileData } from "@/data/profile";
import TrajectoryPlaneCanvas from "./TrajectoryPlaneCanvas";

export default function Hero() {
  const planeWrapperRef = useRef<HTMLDivElement>(null);
  const cloudLeftRef = useRef<HTMLDivElement>(null);
  const cloudRightRef = useRef<HTMLDivElement>(null);
  const stageRowRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;
    let rafId: number;

    const onScroll = () => {
      targetScroll = window.scrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const updateFlight = () => {
      // Smooth lerp (0.12) for buttery smooth 60/120fps motion
      currentScroll += (targetScroll - currentScroll) * 0.12;

      // Calculate flight parameters
      // Progress over 600px of scroll
      const progress = Math.min(Math.max(currentScroll / 600, 0), 1.0);

      // Smooth cubic aerodynamic easing (smoothstep)
      const easeProgress = progress * progress * (3 - 2 * progress);

      // Trajectory climb: ~35 degree climb soaring up and to the right
      const flightX = easeProgress * 280;
      const flightY = -easeProgress * 260;
      const flightScale = 1 + easeProgress * 0.26;
      const flightRot = -easeProgress * 14;
      // Graceful fadeout when nearing the top of flight
      const flightOpacity = 1 - Math.pow(Math.max(0, (progress - 0.65) / 0.35), 1.8);

      const stage = planeWrapperRef.current;
      if (stage) {
        stage.style.setProperty("--flight-x", `${flightX.toFixed(2)}px`);
        stage.style.setProperty("--flight-y", `${flightY.toFixed(2)}px`);
        stage.style.setProperty("--flight-scale", `${flightScale.toFixed(3)}`);
        stage.style.setProperty("--flight-rot", `${flightRot.toFixed(2)}deg`);
        stage.style.setProperty("--flight-opacity", `${flightOpacity.toFixed(3)}`);
      }

      // Parallax on clouds for deep cinematic depth
      if (cloudLeftRef.current) {
        cloudLeftRef.current.style.transform = `translate3d(0, ${(currentScroll * 0.14).toFixed(1)}px, 0)`;
      }
      if (cloudRightRef.current) {
        cloudRightRef.current.style.transform = `translate3d(0, ${(-currentScroll * 0.16).toFixed(1)}px, 0)`;
      }

      rafId = requestAnimationFrame(updateFlight);
    };

    rafId = requestAnimationFrame(updateFlight);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

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

      {/* Authentic Stippled Pointillism Cloud (Left) with Parallax */}
      <div className={styles.cloudLeft} ref={cloudLeftRef} aria-hidden="true">
        <Image
          src="/images/trajectory/cloud-source-2.png"
          alt=""
          width={960}
          height={420}
          priority
          className={styles.cloudImg}
        />
      </div>

      {/* Authentic Stippled Pointillism Cloud (Right) with Parallax */}
      <div className={styles.cloudRight} ref={cloudRightRef} aria-hidden="true">
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
        {/* Centerpiece Stage: Split Typography & Live 3D WebGL Origami Paper Airplane */}
        <h1 className={styles.stageRow} ref={stageRowRef} aria-label="Teeranan Pakdeekhan">
          {/* Left Hero Word */}
          <span className={styles.displayLeft}>
            Teeranan
          </span>

          {/* Authentic 3D WebGL Origami Plane Canvas with Golden Particle Tail */}
          <span
            ref={planeWrapperRef}
            className={styles.planeWrapper}
            aria-hidden="true"
          >
            <TrajectoryPlaneCanvas />
          </span>

          {/* Right Hero Word */}
          <span className={styles.displayRight}>
            Pakdeekhan
          </span>
        </h1>

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
