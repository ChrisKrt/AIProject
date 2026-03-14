---
id: doc-006
title: Design System
type: other
created_date: '2026-02-07 18:49'
updated_date: '2026-02-07 19:53'
---
# Design System – Bundeswehr Application

## Overview

This design system provides a unified visual language for the Bundeswehr application across four operational environments. It uses a **three-tier design token architecture** that separates raw values from semantic meaning, enabling consistent theming without changing component code.

## Token Architecture

The system follows a three-tier model:

| Tier | Purpose | Example |
|------|---------|---------|
| Primitive tokens | Raw color and value definitions | `--color-primary-600: #556230` |
| Semantic tokens | Purpose-based aliases | `--interactive-primary: var(--color-primary-600)` |
| Component tokens | Component-specific overrides | `--button-primary-bg: var(--interactive-primary)` |

### Why three tiers?

- **Primitive tokens** change per theme. Each theme file defines its own color scales.
- **Semantic tokens** stay constant across themes. They reference primitives by purpose (for example, "primary surface" or "error text").
- **Component tokens** bind semantic tokens to specific UI components, adding component-level defaults for padding, radius, and shadows.

## Themes

Four themes represent distinct Bundeswehr operational domains.

### Bundeswehr Heer (bundeswehr-heer)

Standard German Armed Forces theme. Uses olive green and brown tones inspired by the Flecktarn camouflage pattern and RAL 6031 Bronzegrün.

- **Primary:** Olive green scale (#6B7A3D base)
- **Secondary:** Leather brown scale (#8B6544 base)
- **Accent:** Khaki/Sand
- **Neutral:** Warm gray

### Deutsche Marine (marine)

German Navy theme. Uses deep navy blue and steel gray, evoking maritime traditions.

- **Primary:** Navy blue scale (#3D5F96 base)
- **Secondary:** Steel gray scale (#607383 base)
- **Accent:** Signal blue
- **Neutral:** Cool gray

### Wüste (wueste)

Desert operations theme. Uses sand, beige, and terracotta tones inspired by the Tropentarn pattern.

- **Primary:** Desert sand scale (#B88D55 base)
- **Secondary:** Terracotta scale (#A46842 base)
- **Accent:** Ocher/Gold yellow
- **Neutral:** Warm beige

### Arktis (arktis)

Arctic and winter operations theme. Uses ice blue, silver, and cool white tones inspired by the Schneetarn pattern.

- **Primary:** Ice blue scale (#6891BF base)
- **Secondary:** Silver gray scale (#858E9A base)
- **Accent:** Polar blue
- **Neutral:** Snow white / cool white

## File Structure

```
DesignSystem/
  tokens/
    index.css                  Entry point – imports all themes and base
    base.css                   Semantic and component token definitions
    tokens.json                W3C Design Tokens Community Group format
    theme-switcher.js          Runtime theme switching utility
    themes/
      bundeswehr-heer.css      Primitive tokens for Heer theme
      marine.css               Primitive tokens for Marine theme
      wueste.css               Primitive tokens for Wüste theme
      arktis.css               Primitive tokens for Arktis theme
```

## Usage

### HTML Setup

Import the token entry point and set the active theme on the root element:

```html
<html data-theme="bundeswehr-heer">
<head>
  <link rel="stylesheet" href="DesignSystem/tokens/index.css">
</head>
```

### Switching Themes at Runtime

Use the ThemeSwitcher utility:

```javascript
import { ThemeSwitcher } from './DesignSystem/tokens/theme-switcher.js';

// Initialize from stored preference or fall back to default
ThemeSwitcher.initTheme();

// Switch to a different theme
ThemeSwitcher.setTheme('marine');

// Get the current theme
const current = ThemeSwitcher.getTheme(); // "marine"

// List all available themes
const themes = ThemeSwitcher.getAvailableThemes();
// ["bundeswehr-heer", "marine", "wueste", "arktis"]
```

### Using Tokens in CSS

Reference semantic tokens instead of raw color values:

```css
.card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--card-border-radius);
  box-shadow: var(--card-shadow);
  padding: var(--card-padding);
}

.button-primary {
  background: var(--button-primary-bg);
  color: var(--button-primary-text);
  border: 1px solid var(--button-primary-border);
  border-radius: var(--button-border-radius);
  padding: var(--button-padding-y) var(--button-padding-x);
  font-weight: var(--button-font-weight);
}

.button-primary:hover {
  background: var(--button-primary-bg-hover);
}

.alert-error {
  background: var(--status-error-subtle);
  color: var(--status-error-text);
  border-left: 4px solid var(--status-error);
}
```

## Token Categories

### Color Scales

Each theme defines four color scales with steps from 50 (lightest) to 950 (darkest):

- **Primary** – The dominant brand/identity color
- **Secondary** – Supporting tonal range
- **Accent** – Highlight and emphasis color
- **Neutral** – Backgrounds, borders, and text

### Semantic Tokens

| Category | Token prefix | Description |
|----------|-------------|-------------|
| Surfaces | `--surface-*` | Background colors for different elevation levels |
| Text | `--text-*` | Text colors by emphasis and context |
| Borders | `--border-*` | Border colors by prominence level |
| Interactive | `--interactive-*` | Colors for clickable/tappable elements |
| Status | `--status-*` | Feedback colors (success, warning, error, info) |
| Focus | `--focus-ring-*` | Keyboard focus indicators |

### Non-Color Tokens

| Category | Token prefix | Description |
|----------|-------------|-------------|
| Typography | `--font-*`, `--line-height-*`, `--letter-spacing-*` | Font families, sizes, weights |
| Spacing | `--spacing-*` | Consistent spacing scale (4px base unit) |
| Radius | `--radius-*` | Border radius values |
| Shadows | `--shadow-*` | Elevation shadows |
| Transitions | `--transition-*` | Animation timing |
| Z-Index | `--z-*` | Stacking order |

### Component Tokens

Pre-configured tokens for common UI components:

- **Buttons** (`--button-*`) – Primary, secondary, danger variants
- **Cards** (`--card-*`) – Surface, border, shadow, padding
- **Inputs** (`--input-*`) – Background, borders, states
- **Navigation** (`--nav-*`) – Header/navigation bar
- **Sidebar** (`--sidebar-*`) – Side navigation panel
- **Badges** (`--badge-*`) – Status badges in all feedback colors
- **Tables** (`--table-*`) – Header, rows, alternating, hover

## Accessibility

- All text-on-background combinations meet WCAG 2.1 AA contrast requirements (at minimum 4.5:1 for normal text, 3:1 for large text).
- Status colors use dedicated subtle backgrounds with darker text variants to maintain contrast.
- Focus indicators use a visible ring with configurable width and offset (`--focus-ring-*` tokens).
- Color is never the sole indicator of meaning. Combine color tokens with labels, shapes, or patterns.
- Each theme declares `color-scheme: light` to inform user-agent default rendering.

## Design Principles

- **Operational clarity:** Each theme is immediately recognizable and maps to a specific military branch or environment.
- **Consistency over customization:** Components use semantic tokens, so theme changes propagate automatically.
- **Accessibility first:** Token values are chosen to meet contrast standards across all themes.
- **Separation of concerns:** Raw values, semantic meaning, and component binding are each maintained independently.
