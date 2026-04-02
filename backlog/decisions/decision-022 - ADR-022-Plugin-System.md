---
id: decision-022
title: 'ADR-022: Plugin System'
date: '2026-02-11 20:25'
status: accepted
---

## Context
The application operates in **airgapped environments** with strict **security clearance** requirements.
- The **Shell** should be developed openly for rapid iteration and modern web standards.
- **Plugins** contain customer-specific or sensitive logic, requiring independent development, versioning, and security audits.
- Each plugin must be independently deployable with its own version lifecycle (SemVer).

## Decision
Plugins are developed in **separate Git repositories**, versioned independently (SemVer), and integrated via **Git submodules**. Each plugin defines a `/dist` build output containing compiled Svelte components and a `/plugin-manifest.json` that describes exports and version compatibility. The Host (Shell) loads plugins via `import()` from the submodule `/dist` directory.

## Rationale
- **Version Independence:** Each plugin maintains its own CHANGELOG and semantic version, enabling customer-specific patch releases without touching the Shell.
- **Security Silos:** High-security code is never merged into the main repository; only after auditing are submodule commits pinned.
- **Submodule Simplicity:** Git submodules are natively supported, require no special tooling, and work seamlessly in airgapped contexts (no external registry lookups).
- **Composition:** The Shell discovers available plugins at build time via submodule `/plugin-manifest.json` files, avoiding runtime federation complexity.

## Consequences
- **Submodule Discipline:** Teams must manage Git submodule clones, commits, and pinning carefully; automation (e.g., CI scripts) is essential.
- **Interface Contract:** A shared TypeScript interface library (in-repo or separately versioned) defines the Plugin API; breaking changes require SemVer coordination.
- **Build Pipeline:** The Shell's build must copy or link plugin `/dist` directories; configurations for Vite must reflect submodule paths.
- **Deployment:** All pinned submodule commits must be included in release packages; airgap deployments require pre-bundled or separately gated submodule sources.

## Alternatives Considered
- **Module Federation (Webpack/Vite):** Runtime complexity, harder to audit in high-security contexts, less suited to static airgap distribution.
- **npm Private Registry:** Requires external infrastructure and package lookups; fragile in airgapped networks.
- **Monorepo (Nx/Lerna):** No version separation; all code in one history; less suitable for high-security silos.

## Authors
- Architecture Team

## References
- ADR-008 - Monorepo Structure with Git Submodules
- ADR-001 - Fat Client Architecture