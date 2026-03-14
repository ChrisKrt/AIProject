---
id: decision-015
title: 'ADR-015: English and German Language Support (GUI Only)'
date: '2026-02-09 18:34'
status: accepted
---
## Context

To be accessible to a broader user base, the application needs to support multiple languages.

The initial target audience includes both English and German-speaking users. Since the application runs entirely on the client side, the internationalization (i18n) solution must work without server-side rendering or backend infrastructure.

Key considerations:
- The GUI (PWA) must support both English and German to serve a broader audience
- The application must work completely offline, including language switching in the GUI
- A single language file format should be used across the application for consistency
- The GUI (PWA) must respect user language preferences from the browser/OS
- All GUI user-facing text, error messages, and help text must be translatable
- Date, time, and number formatting must respect locale conventions in the GUI

## Decision

The **GUI** shall support **English (en)** and **German (de)** as the initial supported languages, with infrastructure in place to add additional languages in the future. The **CLI** shall remain **English-only** to minimize maintenance complexity.

**Implementation approach:**
- **Single file format**: Use JSON-based translation files for consistency across the application (e.g., `en.json`, `de.json`)
- **Default language**: English (en)
- **Language persistence (GUI)**: Store user's language preference in localStorage
- **Resource organization**: JSON translation files organized by feature/module for maintainability

## Consequences

### Positive

- **Broader accessibility**: Makes the GUI usable for German-speaking users, expanding the potential user base
- **Localization infrastructure**: Establishes patterns and tooling for adding more languages to the GUI in the future
- **Single file format**: JSON-based translations are simple, human-readable, and easily maintainable
- **Offline support**: All translations bundled with the GUI application, no network required
- **Reduced CLI complexity**: CLI remains simple with English-only output, reducing maintenance burden
- **Professional GUI presentation**: Shows attention to detail and commitment to user experience for web users
- **Locale-aware formatting**: Dates, numbers, and currency formatted according to user expectations in GUI

### Negative

- **Maintenance overhead**: Every GUI user-facing string must be maintained in two languages
- **Translation effort**: Requires fluent German speaker for accurate GUI translations
- **Testing complexity**: GUI UI/UX testing must be performed in both languages
- **Bundle size increase**: GUI bundle includes translation resources for both languages
- **Development overhead**: GUI developers must use i18n APIs instead of hardcoded strings
- **Potential inconsistencies**: Risk of translations falling out of sync across updates
- **CLI limitation**: English-only CLI may limit appeal to non-English speaking power users
- **Limited GUI coverage initially**: Only two languages supported in GUI at launch