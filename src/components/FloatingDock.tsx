"use client";

import React, { useEffect, useState } from "react";
import styles from "./FloatingDock.module.css";
import {
  Home,
  User,
  Briefcase,
  FolderGit2,
  GraduationCap,
  MessageSquare,
  Send,
} from "lucide-react";

interface DockItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isSpecial?: boolean;
}

const dockItems: DockItem[] = [
  { id: "hero", label: "Home", icon: <Home size={19} /> },
  { id: "about", label: "About Me", icon: <User size={19} /> },
  { id: "capabilities", label: "Capabilities", icon: <Briefcase size={19} /> },
  { id: "projects", label: "Projects", icon: <FolderGit2 size={19} /> },
  { id: "experience", label: "Milestones", icon: <GraduationCap size={19} /> },
  { id: "contact", label: "Get in Touch", icon: <MessageSquare size={19} /> },
  { id: "contact", label: "Direct Message", icon: <Send size={18} />, isSpecial: true },
];

export default function FloatingDock() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isPastHero, setIsPastHero] = useState<boolean>(false);

  useEffect(() => {
    // Show ONLY when strictly scrolled down past the first screen (Hero section)
    const handleScroll = () => {
      const heroEl = document.getElementById("hero");
      const scrollY = window.scrollY;

      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // Hero is passed ONLY when its bottom is <= 80px from viewport top AND scrolled > 400px
        const passed = rect.bottom <= 80 && scrollY > 400;
        setIsPastHero(passed);
      } else {
        setIsPastHero(scrollY > window.innerHeight * 0.85);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["hero", "about", "capabilities", "projects", "experience", "contact"];
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-20% 0px -40% 0px",
      threshold: [0.25, 0.5],
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (id === "hero") {
      setIsPastHero(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("hero");
      return;
    }
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <nav
      className={`${styles.dockWrapper} ${isPastHero ? styles.dockVisible : styles.dockHidden}`}
      aria-label="Quick dock navigation"
      role="navigation"
    >
      <div className={styles.dockContainer}>
        {dockItems.map((item, index) => {
          const isActive = activeSection === item.id && !item.isSpecial;
          return (
            <a
              key={`${item.id}-${index}`}
              href={`#${item.id}`}
              onClick={(e) => handleScrollTo(e, item.id)}
              className={`${styles.dockButton} ${isActive ? styles.active : ""} ${
                item.isSpecial ? styles.sendButton : ""
              }`}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              id={`dock-nav-${item.id}${item.isSpecial ? "-send" : ""}`}
            >
              {item.icon}
              <span className={styles.tooltip}>{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
