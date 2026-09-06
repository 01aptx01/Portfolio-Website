---
name: wcag-audit
description: Comprehensive accessibility auditing skill based on W3C WCAG 2.2 Level A and AA standards. Use to audit interfaces, verify color contrast, evaluate touch targets, check keyboard focus order, ensure semantic HTML hierarchy, avoid color-only indicators, and generate numbered defect reports.
---

# WCAG 2.2 Accessibility Auditing Skill (Levels A & AA)

This skill equips agents with a systematic, repeatable process to audit web interfaces against the **W3C Web Content Accessibility Guidelines (WCAG) 2.2 Level A and Level AA** standards, produce numbered audit annotations, and execute targeted remediations.

---

## 1. Core Evaluation Dimensions

### Dimension 1: Color Contrast & Visual Presentation (Level AA)
- **SC 1.4.3 Contrast (Minimum) (Level AA)**:
  - Normal text (< 18pt regular or < 14pt bold): Minimum contrast ratio of **4.5:1** against its background.
  - Large text (≥ 18pt regular or ≥ 14pt bold): Minimum contrast ratio of **3.0:1**.
  - Always calculate against gradient and radial backdrop boundaries at their lightest and darkest points.
- **SC 1.4.11 Non-text Contrast (Level AA)**:
  - UI components (borders, form inputs, buttons, checkboxes) and graphical objects must achieve at least **3.0:1** against adjacent colors.
- **SC 1.4.12 Text Spacing (Level AA)**:
  - Line height at least 1.5x font size, spacing following paragraphs at least 2x font size, letter spacing at least 0.12x, word spacing at least 0.16x without clipping content.

### Dimension 2: Target Size & Pointer Gestures (Levels A & AA)
- **SC 2.5.8 Target Size (Minimum) (Level AA - WCAG 2.2 New)**:
  - Interactive touch/pointer targets must be at least **24×24 CSS pixels**, or provide sufficient spacing so a 24px diameter circle centered on the target does not intersect another target.
  - **Best Practice (Level AAA / Mobile Standard)**: Provide at least **44×44 CSS pixels** for tap targets on mobile viewports.
- **SC 2.5.2 Pointer Cancellation (Level A)**:
  - Activation occurs on up-event; abort or undo is available.

### Dimension 3: Keyboard Navigation, Focus Order & Focus Visible (Levels A & AA)
- **SC 2.1.1 Keyboard (Level A)**:
  - All functionality must be operable via keyboard interface (Tab, Shift+Tab, Enter, Space, Escape, Arrows).
- **SC 2.1.2 No Keyboard Trap (Level A)**:
  - Focus must never get trapped in any modal, canvas, or interactive widget.
- **SC 2.4.3 Focus Order (Level A)**:
  - Logical, predictable sequential focus navigation matching visual reading flow.
- **SC 2.4.7 Focus Visible (Level AA)**:
  - Any keyboard-operable interface element must have a clearly visible focus indicator (e.g., `outline: 2px solid [high-contrast-color]; outline-offset: 2px;`). Never use `outline: none` without a visible replacement.
- **SC 2.4.11 Focus Not Obscured (Minimum) (Level AA - WCAG 2.2 New)**:
  - When an item receives focus, it is not entirely obscured by author-created content (such as sticky headers, floating navbars, or fixed banners).
- **SC 2.4.1 Bypass Blocks (Level A)**:
  - Provide a "Skip to Main Content" mechanism for keyboard and screen-reader users to bypass repetitive navigation.

### Dimension 4: Semantic Hierarchy, Structure & ARIA (Level A)
- **SC 1.3.1 Info and Relationships (Level A)**:
  - Proper HTML5 landmark structure (`<header>`, `<nav>`, `<main>`, `<footer>`, `<section aria-labelledby="...">`).
  - Exactly one `<h1>` per page as the primary document title.
  - Strict heading hierarchy (`<h1>` ➔ `<h2>` ➔ `<h3>`) without skipping levels.
  - Lists formatted as `<ul>` / `<ol>` with `<li>` children.
  - Interactive elements must use native interactive tags (`<button>`, `<a>`, `<input>`) instead of generic `<div>` with `onClick` unless paired with `role="button"`, `tabIndex={0}`, and `onKeyDown`.
- **SC 1.1.1 Non-text Content (Level A)**:
  - Every non-text element (images, icons, canvas illustrations) must provide meaningful `alt` text or explicit `aria-hidden="true"` if purely decorative.
- **SC 4.1.2 Name, Role, Value (Level A)**:
  - All interactive controls have accessible names via visible text, `aria-label`, or `aria-labelledby`.

### Dimension 5: Reliance on Color & State Announcements (Levels A & AA)
- **SC 1.4.1 Use of Color (Level A)**:
  - Color must not be used as the sole visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element. Always pair color with text, icons, patterns, or underlining.
- **SC 4.1.3 Status Messages (Level AA)**:
  - Dynamic status changes (e.g. "Email copied to clipboard!", "Form submitted") must be announced to assistive technologies via `aria-live="polite"` or `role="status"`.

### Dimension 6: Motion & Seizure Safety (Levels A & AA)
- **SC 2.2.2 Pause, Stop, Hide (Level A)**:
  - Any moving, scrolling, or pulsing content that starts automatically and lasts > 5 seconds must have a mechanism for the user to pause, stop, or hide it (e.g., pause-on-hover, pause toggle, or reduced-motion query).
- **SC 2.3.3 Animation from Interactions (Level AAA / Best Practice)**:
  - Respect `prefers-reduced-motion: reduce` by dampening or disabling non-essential parallax, infinite transforms, or 3D rotations.

---

## 2. Auditing Workflow

1. **Static DOM & Code Inspection**:
   - Grep for contrast tokens, font colors, background colors.
   - Inspect semantic elements (`h1`–`h6`, `header`, `main`, `nav`, `footer`).
   - Check `tabIndex`, `role`, `aria-*`, and interactive element dimensions.
2. **Keyboard Traversal Test**:
   - Tab through the entire page from top to bottom.
   - Verify every link, button, and input receives a clear, high-contrast focus indicator.
   - Verify skip link appears on initial Tab.
3. **Color Contrast Measurement**:
   - Compute relative luminance and contrast ratio against light and dark bounds.
   - Flag any text failing 4.5:1 (or 3.0:1 for large text).
4. **Target Size Measurement**:
   - Check bounding boxes of all interactive targets to ensure ≥ 24px (and ≥ 44px for primary mobile targets).
5. **Issue Annotation**:
   - Assign each finding a unique numbered ID:
     - `#C1`, `#C2`... (Contrast)
     - `#T1`, `#T2`... (Touch Target)
     - `#F1`, `#F2`... (Focus & Keyboard)
     - `#S1`, `#S2`... (Semantic Hierarchy & Landmarks)
     - `#R1`, `#R2`... (Reliance on Color / Status Announcements)
     - `#M1`, `#M2`... (Motion & Reduced Motion)
6. **Remediation & Re-Verification**:
   - Apply code changes to fix each annotated issue.
   - Re-audit to verify zero regressions.
