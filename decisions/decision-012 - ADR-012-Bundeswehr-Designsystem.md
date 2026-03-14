---
id: decision-012
title: 'ADR-012: Bundeswehr Designsystem'
date: '2026-02-09 18:25'
status: accepted
---
## Context

The application requires a consistent, accessible, and flexible visual identity that supports multiple operational contexts and user preferences. To address this, we will define four distinct visual themes, each corresponding to a specific domain within the Bundeswehr, and mapped to light or dark mode as appropriate. These themes will be used across all user interfaces to ensure clarity, usability, and alignment with Bundeswehr branding.

## Decision

We will implement the following four themes for the application, each represented by a dedicated CSS file and domain-specific design tokens:

1. **Heer (bundeswehr-heer.css)**
   - Domain: Army (Heer)
   - Style: Standard/Operational
   - Mode: Neutral (default)

2. **Marine (marine.css)**
   - Domain: Navy (Marine)
   - Style: Maritime/Dark
   - Mode: Dark mode

3. **Luftwaffe/Arktis (arktis.css)**
   - Domain: Air Force (Luftwaffe/Arktis)
   - Style: Arctic/Light
   - Mode: Light mode

4. **Streitkräftebasis/Wüste (wueste.css)**
   - Domain: Joint Support Service (Streitkräftebasis/Wüste)
   - Style: Desert/Support
   - Mode: Neutral (alternative)

- Each theme will be selectable by users and/or set by context.
- Theme files are located in `DesignSystem/tokens/themes/`.
- The theme names and files are:
  - `bundeswehr-heer.css` (Heer)
  - `marine.css` (Marine, dark mode)
  - `arktis.css` (Arktis, light mode)
  - `wueste.css` (Wüste)
- The design system will ensure all themes meet accessibility and usability standards.

## Consequences

- Users can select a theme that matches their operational context or personal preference.
- The application will provide both light and dark mode options (Arktis for light, Marine for dark).
- Theming is extensible for future domains or special requirements.
- Consistent branding and accessibility are maintained across all Bundeswehr applications.
- Theme switching logic must be implemented in the frontend, referencing the correct CSS file for each domain.

