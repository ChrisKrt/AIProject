---
id: decision-016
title: 'ADR-016: Application Versioning with Semantic Versioning 2.0'
date: '2026-02-09 18:41'
status: accepted
---
## Context

To ensure clear, predictable, and industry-standard versioning for releases, the application must follow Semantic Versioning 2.0.0 (SemVer 2.0). This approach is widely adopted in the software industry and provides a consistent way to communicate changes, compatibility, and upgrade paths to users and developers.

## Decision

All releases of the application (including CLI, GUI, and shared business logic) shall be versioned according to the Semantic Versioning 2.0.0 specification (https://semver.org/spec/v2.0.0.html):

- Version numbers will be in the format MAJOR.MINOR.PATCH (e.g., 1.2.3)
- MAJOR version increments for incompatible API changes
- MINOR version increments for added functionality in a backwards-compatible manner
- PATCH version increments for backwards-compatible bug fixes
- Pre-release and build metadata MAY be used as specified by SemVer 2.0

## Consequences

- All stakeholders can easily interpret the impact of a release by its version number
- Automated tooling and dependency management will work reliably with versioned artifacts
- Release notes and documentation must reference the SemVer version
- Breaking changes require a MAJOR version bump
- This policy applies to all distributed artifacts: CLI, GUI, and shared libraries