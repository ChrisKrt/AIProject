---
id: decision-009
title: 'ADR-009: Build Tool Using Vite'
date: '2026-02-09 18:19'
status: accepted
---
## Context

The GUI is a Progressive Web App (PWA) built with:

- TypeScript
- Svelte for the shell and domain components
- Client-side rendering (CSR)
- Lazy loading and code splitting
- CSS modules

A fast, modern build tool is essential for:

- Quick development iteration with HMR
- Efficient bundling and code splitting
- TypeScript support
- CSS module handling

Alternative tools considered:

- Webpack: Heavy, complex configuration
- Rollup: Lower-level, requires more setup
- Parcel: Less control over optimization
- esbuild: Fast but less mature ecosystem

## Decision

The GUI will use Vite 2.0 as the build tool and development server.

- Fast HMR for development experience
- Optimized production builds with rollup
- Native ES modules support
- Seamless TypeScript integration
- Excellent CSS modules support

## Consequences

### Positive

- Faster development iteration with instant HMR
- Smaller production bundle sizes via optimized bundling
- Minimal configuration required
- Native support for modern web standards
- Excellent tooling for lazy loading and code splitting
- Strong community and ecosystem

### Negative

- Vite ecosystem is newer than Webpack (though mature)
- Some legacy tool integrations may not be available
- Requires Node.js for build tooling
