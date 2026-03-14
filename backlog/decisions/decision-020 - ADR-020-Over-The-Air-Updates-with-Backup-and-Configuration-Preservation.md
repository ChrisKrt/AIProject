---
id: decision-020
title: 'ADR-020: Over-The-Air Updates with Backup and Configuration Preservation'
date: '2026-02-09 18:56'
status: accepted
---
# ADR-020: Over-The-Air Updates with Backup and Configuration Preservation

## Status
Accepted

## Context

As a PWA application, the app needs reliable self-update capabilities to deliver updates without manual reinstallation. Users expect preservation of data and configuration. The app must check for updates, install automatically or on-demand, handle schema changes gracefully, and work offline-first.

## Decision

Implement OTA updates using PWA Service Worker mechanisms for a consistent user experience.

### Update Check and Installation

- Use Service Worker for update detection and caching.
- Add UI controls in settings: "Check for Updates" button and notification banner.
- Automatic background checks (configurable frequency).
- User-initiated installation of pending updates.
- Update logic in TypeScript, status communicated to C# WASM for business rules.

### Configuration Preservation and Migration

**Configuration Storage Location:**
- Stored outside installation directory (e.g., browser storage or app-specific path).
- Never touched during updates.

**Preservation:**
- Configuration files remain untouched.
- User data directories stay intact.

**Migration Strategy:**
1. Version configuration with `configVersion` field.
2. On startup, detect mismatch and apply transformations via ConfigurationMigrator (C# component).
3. Add new keys with defaults; retain deprecated keys for one major version.
4. Backup original: `{config-file}.backup.{timestamp}`.
5. Log migration report.

### Rollback Support

- Manual rollback via settings UI using Service Worker cache.
- Does not affect configuration (preserves post-update changes).

## Consequences

### Positive
- User convenience with automatic updates.
- Configuration continuity and graceful migrations.
- Offline-first operation.

### Negative
- PWA update delays (requires closing tabs).
- Migration complexity.

### Alternatives Considered
- No auto-update: Poor UX.
- Always auto-update: Removes user control.
- Configuration overwrite: Loses user settings.