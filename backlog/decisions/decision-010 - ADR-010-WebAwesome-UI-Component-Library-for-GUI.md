---
id: decision-010
title: 'ADR-010: WebAwesome UI Component Library for GUI'
date: '2026-02-09 18:21'
status: accepted
---
## Context

The current GUI is implemented as a Progressive Web App (PWA) using Lit Web Components, Vite, and TypeScript. The architecture emphasizes modularity, accessibility, and modern web standards. However, the project lacks a standardized, comprehensive UI component library to accelerate development, ensure visual consistency, and improve accessibility across the application. The team has evaluated several options and seeks to adopt a robust, well-maintained, and design-consistent UI library for all GUI components.


## Decision

The application shall use the [WebAwesome UI component library](https://webawesome.com/) for all user interface components. All new and existing GUI features will be implemented using WebAwesome components where possible. Custom components will only be created when project requirements are not met by the library.

WebAwesome was chosen for its:
- Comprehensive set of accessible, modern web components
- Strong support for web standards and interoperability with Lit
- Active maintenance and community support
- Theming and customization capabilities
- Performance and bundle size optimizations


## Consequences

### Positive
- Accelerates UI development with a rich set of prebuilt components
- Ensures visual and interaction consistency across the GUI
- Improves accessibility by leveraging well-tested, standards-compliant components
- Reduces maintenance burden for custom UI code
- Enables easier onboarding for new developers familiar with WebAwesome

### Negative
- Adds a dependency on a third-party library, requiring monitoring for breaking changes
- May require migration of existing custom components to WebAwesome equivalents
- Some highly specialized UI needs may still require custom development
- Bundle size may increase if unused components are not tree-shaken

## Alternatives Considered

- **Continue with only Lit and custom components**: Rejected due to increased development and maintenance effort, and risk of inconsistent UI/UX.
- **Other UI libraries (e.g., Material Web, Shoelace, Vaadin)**: Rejected due to less optimal integration with project requirements, smaller component set, or less active maintenance compared to WebAwesome.