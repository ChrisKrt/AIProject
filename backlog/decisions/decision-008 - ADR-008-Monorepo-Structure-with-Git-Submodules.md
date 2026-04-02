---
id: decision-008
title: 'ADR-008: Monorepo with Plugin Submodules and External Component Library'
date: '2026-02-09 18:18'
status: proposed
---
## Context
The application consists of a core shell with pluggable extensions. The shell and its core functionality must be tightly integrated, reducing friction for frequent changes. Plugins, however, can be developed, versioned, and deployed independently. UI components (buttons, forms, dialogs, etc.) are sourced from an external, maintained component library to ensure consistency and avoid code duplication.

## Decision
We use a monorepo structure for the core shell application. Plugins are managed as git submodules to enable independent development and versioning. Shared UI components are provided by an external component library accessed via package manager or CDN. Custom shared components may be managed in a dedicated repository and linked via git subtree in the future.

- The main repository contains the shell application code, documentation, and core logic.
- Plugins are included as git submodules, each with independent versioning and release cycle.
- Shared UI components are pulled from an external, centrally maintained component library.
- Custom shared components (if needed) will be managed in a separate repository and linked via git subtree.

## Consequences
- Core application and plugins develop at different velocities without friction.
- Developers must initialize and update submodules; CI/CD must support this workflow.
- UI consistency is enforced by the external component library.
- Custom component repository remains optional and can be introduced when needed without architecture disruption.

## Alternatives Considered
- All code in single repository: loses plugin independence and complicates plugin deployment.
- All plugins as separate repositories: increases integration friction for shell-plugin synchronization.
- Custom in-house component library: duplicates effort; external library is mature and maintained.

