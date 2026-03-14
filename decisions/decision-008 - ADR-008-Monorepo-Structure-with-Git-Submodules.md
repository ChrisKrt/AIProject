---
id: decision-008
title: 'ADR-008: Monorepo Structure with Git Submodules'
date: '2026-02-09 18:18'
status: proposed
---
## Context
The project consists of multiple components that are developed in different technologies but share common code and architectural decisions. Managing these components in a single repository (monorepo) can simplify dependency management, code sharing, and coordinated releases. However, some components may be developed or maintained independently, or reused in other contexts.

## Decision
We will use a monorepo to manage all major components of the project. To allow for independent versioning and external reuse, some subprojects (such as shared libraries or external dependencies) will be included as git submodules.

- The main repository will contain the overall project structure, documentation, and integration scripts.
- Submodules will be used for components that are shared with or reused by other projects, or that require independent versioning.
- All contributors must initialize and update submodules when cloning or pulling the repository.

## Consequences
- Simplifies cross-component changes and code sharing.
- Enables independent development and versioning of reusable components.
- Requires contributors to be familiar with git submodules and related workflows.
- CI/CD and tooling must support submodule initialization and updates.

## Alternatives Considered
- Multiple independent repositories: increases overhead for cross-component changes and integration.
- Monorepo without submodules: makes it harder to reuse or independently version shared components.

