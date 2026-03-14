---
id: decision-002
title: "ADR-002: Progressive Web App (PWA)"
date: '2026-02-08 18:26'
status: accepted
---
## Context
The GUI must:

- Work offline
- Access local files
- Be installable on desktop systems
- Avoid a traditional server backend

Native desktop applications would increase platform-specific maintenance.

## Decision
The GUI will be implemented as an installed Progressive Web App (PWA).

- Runs fully client-side
- Installed locally to enable file system access
- No server-side rendering
- Acts as a desktop-like application

## Consequences

### Positive

- Cross-platform deployment
- Offline-first by design
- No installation via app stores required
- Automatic updates via web distribution

### Negative

- Dependent on browser PWA capabilities
- Some OS-level integrations are limited
- File access requires user permission
