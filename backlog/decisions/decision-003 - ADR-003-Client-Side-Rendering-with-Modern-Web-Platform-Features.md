---
id: decision-003
title: 'ADR-003: Client-Side Rendering with Modern Web Platform Features'
date: '2026-02-08 18:37'
status: proposed
---
## Context
The GUI must remain maintainable, performant, and aligned with modern web standards while avoiding heavy frameworks.

## Decision

The GUI will use client-side rendering (CSR) with modern web tooling:

- Svelte for the shell and domain components
- Vite for build and bundling
- TypeScript
- CSS Modules
- Shadow DOM
- Lazy loading and chunking
    - Optional and premium features are implemented as separate modules and loaded only when needed, keeping the initial application lightweight and improving performance.


The browser's native capabilities are preferred over framework abstractions.

## Consequences

### Positive

- Lightweight and fast application
- Strong encapsulation via Shadow DOM
- Clear component boundaries
- Modern developer experience
- Reduced framework lock-in

### Negative

- Requires discipline to manage complexity
- Less ecosystem support than large frameworks
- Some patterns must be implemented manually
