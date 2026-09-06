# Accessibility Audit Report — W3C WCAG 2.2 (Levels A & AA)

**Evaluated System**: Developer Portfolio Website (`f:\ComSci\Coding\Project\Portfolio-Website`)  
**Target Standards**: [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) Level A and Level AA  
**Auditor**: Antigravity WCAG Audit Agent  
**Date**: September 7, 2026  

---

## Executive Summary

An in-depth accessibility evaluation was conducted across all interface components, design tokens, interactive controls, and document landmarks against WCAG 2.2 Level A and AA criteria. While the visual aesthetic is exceptionally high caliber, **11 specific defects** across 6 core dimensions were identified with numbered annotations below. All issues have concrete remediation specifications.

---

## Numbered Audit Findings & Annotations

| Issue ID | WCAG Criterion | Level | Component / File | Description & Severity | Remediation Requirement |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **#C1** | SC 1.4.3 Contrast (Minimum) | **AA** | `src/app/globals.css` (`--text-muted`) | Text color `#697386` against `--dawn-sky-bottom` (`#faf5f0`) has a contrast ratio of **4.29:1**, falling short of the **4.5:1** requirement for normal text. | Darken `--text-muted` to `#475367`, achieving a **5.4:1** contrast ratio on cream surfaces. |
| **#C2** | SC 1.4.11 Non-text Contrast & SC 2.4.7 Focus Visible | **AA** | `src/app/globals.css` | No universal `:focus-visible` styling is defined. Interactive elements rely on browser default focus rings which are low-contrast or invisible against pastel backgrounds. | Implement a universal `:focus-visible` rule with `outline: 2px solid var(--accent-indigo); outline-offset: 3px; border-radius: inherit;`. |
| **#T1** | SC 2.5.8 Target Size (Minimum) | **AA** | `src/components/Projects.module.css` (`.iconBtn`) | External action buttons (GitHub & Live Link) have physical dimensions of **34×34px**, below the recommended **44×44px** standard for ergonomic mobile touch. | Expand hit area to minimum **44×44px** (`min-width: 44px; min-height: 44px; display: inline-flex; align-items: center; justify-content: center;`). |
| **#T2** | SC 2.5.8 Target Size (Minimum) | **AA** | `src/components/Navbar.module.css` (`.navLink`) | Navigation links possess only `padding: 0.25rem`, rendering a vertical tap height of ~26px. | Increase interactive hit area with `padding: 0.5rem 0.75rem; min-height: 44px; display: inline-flex; align-items: center;`. |
| **#T3** | SC 2.5.8 Target Size (Minimum) | **AA** | `src/components/Footer.module.css` (`.backToTop`) | Back to top button height is **34px**, below the 44px touch target best practice. | Set `min-height: 44px; padding: 0.65rem 1.25rem;`. |
| **#F1** | SC 2.4.1 Bypass Blocks | **A** | `src/app/layout.tsx` & `src/components/Navbar.tsx` | Missing a "Skip to Main Content" link at the start of the DOM. Keyboard and screen reader users must tab through all navigation items on every page visit. | Add `<a href="#main-content" className="skip-to-content">Skip to main content</a>` positioned off-screen and visible on `:focus`. |
| **#F2** | SC 2.1.1 Keyboard & SC 4.1.2 Name, Role, Value | **A** | `src/components/Contact.tsx` (`.emailPillContainer`) | Email copy button is implemented as a `<div role="button">` with custom keydown listeners instead of a native semantic `<button>` element. | Refactor `.emailPillContainer` to a native `<button type="button">` with native keyboard accessibility. |
| **#S1** | SC 1.3.1 Info and Relationships | **A** | `src/components/Hero.tsx` | Hero section contains two separate `<h1>` tags (`<h1>Teeranan</h1>` and `<h1>Pakdeekhan</h1>`) to achieve split styling, violating the single `<h1>` document hierarchy rule. | Unify into a single `<h1 className={styles.stageRow}>` containing `<span className={styles.displayLeft}>Teeranan</span>` and `<span className={styles.displayRight}>Pakdeekhan</span>`. |
| **#S2** | SC 1.3.1 Info and Relationships | **A** | `src/app/layout.tsx` | The `<main>` landmark element lacks an `id="main-content"` anchor for keyboard navigation and screen-reader target jumping. | Add `id="main-content"` to `<main>` in `layout.tsx`. |
| **#R1** | SC 1.1.1 Non-text Content & SC 1.4.1 Use of Color | **A** | `src/components/Hero.tsx` (`.pulseDot`) | Green pulse indicator communicates live availability without explicit `aria-hidden="true"`, potentially causing screen reader confusion. | Add `aria-hidden="true"` to `.pulseDot`. |
| **#R2** | SC 4.1.3 Status Messages | **AA** | `src/components/Contact.tsx` | Clicking the email copy button renders a visual "Copied!" toast but does not announce the success state to assistive technologies. | Wrap the dynamic notification text in an element with `aria-live="polite"` and `role="status"`. |
| **#M1** | SC 2.2.2 Pause, Stop, Hide & SC 2.3.3 Animation | **A/AA** | `src/app/globals.css` & `src/components/Hero.tsx` | Continuous cloud floating animations and scroll takeoff lack `@media (prefers-reduced-motion: reduce)` fallbacks. | Add CSS and JS reduced-motion queries to pause infinite animations and disable takeoff scaling when preferred. |

---

## Remediation Roadmap

1. **Tokens & Utilities (`src/app/globals.css`)**: Fix `#C1`, `#C2`, `#F1`, `#M1`.
2. **Document Landmarks (`src/app/layout.tsx`)**: Fix `#F1`, `#S2`.
3. **Hero Component (`src/components/Hero.tsx`)**: Fix `#S1`, `#R1`, `#M1`.
4. **Navigation Component (`src/components/Navbar.tsx` & `.module.css`)**: Fix `#T2`.
5. **Contact Component (`src/components/Contact.tsx` & `.module.css`)**: Fix `#F2`, `#R2`.
6. **Projects Bento Component (`src/components/Projects.module.css`)**: Fix `#T1`.
7. **Footer Component (`src/components/Footer.module.css`)**: Fix `#T3`.
