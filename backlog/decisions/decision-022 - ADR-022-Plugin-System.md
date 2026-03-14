---
id: decision-022
title: 'ADR-022: Plugin System'
date: '2026-02-11 20:25'
status: accepted
---

## Context
The application operates in **airgapped environments** with strict **security clearance** requirements. 
- The **Shell** (Host) should be developed openly to leverage modern web standards and rapid iteration.
- **Customer-specific code** ("Secret Plugins") contains sensitive logic and must be developed, audited, and maintained under higher security standards.
- Deployment occurs in isolated networks where external dependencies are unavailable.

## Decision
We will use **Vite + Svelte** combined with **Module Federation** (via `@originjs/vite-plugin-federation`) to decouple the application architecture into a **Public Host** and **Isolated Remotes**.

1.  **Host (Open):** Acts as the UI shell, providing navigation, PWA service workers, and shared state.
2.  **Remotes (Secret):** Developed in high-security silos. They expose specific Svelte components via a `remoteEntry.js` file.
3.  **Deployment:** Secret plugins are bundled as static assets and side-loaded into the airgapped environment's local storage or internal web server.
4.  **Interface:** A shared TypeScript contract (library) defines the communication between the Shell and Plugins.

## Rationale
- **Security Isolation:** The secret code is never part of the open repository. It is only merged at runtime in the secure environment.
- **Airgap Compatibility:** Module Federation in Vite generates standard ESM bundles. These are simple static files that can be easily moved through "gateways" or via sneakernet.
- **Flexibility:** Different customers can have different sets of secret plugins without modifying the core shell.
- **Framework Efficiency:** Svelte's small footprint is ideal for airgapped systems with potentially limited hardware resources.

## Consequences
- **Interface Stability:** Changes to the shared interface between Shell and Plugins must be managed carefully (SemVer).
- **Service Worker Config:** The PWA must be configured to cache dynamically discovered remote entries to ensure offline/airgap reliability.
- **Build Target:** All modules must target `esnext` to support the ESM-based federation.
- **Local Registry:** An internal strategy (e.g., a local JSON manifest) is required to tell the Shell which secret plugins are available in the specific airgapped instance.