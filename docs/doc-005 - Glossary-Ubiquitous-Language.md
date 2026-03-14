---
id: doc-005
title: Glossary - Ubiquitous Language
type: other
created_date: '2026-02-07 18:27'
updated_date: '2026-02-07 19:53'
---
# Glossary – Ubiquitous Language

This glossary defines key terms used throughout the project. Terms are listed alphabetically. Each term has a single, consistent meaning across all documentation, code, and communication.

---

## A

### Accent Color
A highlight color used sparingly to draw attention to specific UI elements such as active indicators or call-to-action components. Each theme defines its own accent scale.

## C

### Color Scale
A graduated series of color values from light (50) to dark (950), providing consistent tonal range for a single hue. Each scale contains 11 steps: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950.

### Component Token
A design token scoped to a specific UI component (for example, `--button-primary-bg`). Component tokens reference semantic tokens and add component-level defaults such as padding and border radius.

## D

### Design Token
A named value that stores a visual design attribute (color, spacing, typography, and similar). Tokens replace hard-coded values in stylesheets and provide a single source of truth for the design system.

## F

### Flecktarn
The five-color camouflage pattern used by the German Bundeswehr (Heer). It serves as the visual inspiration for the Bundeswehr Heer theme.

## N

### Neutral Color
A grayscale or near-grayscale color scale used for backgrounds, borders, body text, and other non-branded UI surfaces. Each theme defines its own neutral palette, ranging from warm grays to cool whites.

## P

### Primitive Token
The lowest-level design token that holds a raw value (for example, a hex color code). Primitive tokens change per theme and are defined in theme-specific CSS files.

### Primary Color
The dominant brand-identifying color within a theme. It is used for navigation bars, primary buttons, links, and other key interactive elements.

## S

### Schneetarn
The white/gray winter camouflage pattern used during arctic operations. It serves as the visual inspiration for the Arktis theme.

### Secondary Color
A supporting color that complements the primary color. It is used for secondary actions, alternative surfaces, and visual variety.

### Semantic Token
A design token that describes its purpose rather than its raw value (for example, `--text-primary` rather than `--color-neutral-900`). Semantic tokens reference primitive tokens and remain stable across themes.

## T

### Theme
A complete set of primitive token definitions that give the application a distinct visual identity. The application supports four themes: Bundeswehr Heer, Marine, Wüste, and Arktis.

### Three-Tier Token Architecture
The design token system's structure consisting of three layers: primitive tokens (raw values), semantic tokens (purpose-based aliases), and component tokens (component-specific bindings). This separation enables theme switching without changing component code.

### Tropentarn
The desert camouflage pattern used during operations in arid climates. It serves as the visual inspiration for the Wüste theme.
