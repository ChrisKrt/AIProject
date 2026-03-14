---
id: decision-004
title: 'ADR-004: Frontend State Management and Synchronization Strategy'
date: '2026-02-09 17:57'
status: accepted
---
## Context

The GUI must support:

- Undo / Redo
- Multiple tabs
- Shareable application state
- Predictable behavior

## Decision

State management will follow these principles:

- URL is the preferred state store
- Nanostores for global state
- Undo/Redo supported at the application level
- BroadcastChannel used for tab synchronization
- localStorage for persistence

## Consequences

### Positive

- Shareable and bookmarkable application state
- Predictable and debuggable behavior
- Consistent state across tabs
- Resilient against page reloads

### Negative

- URL size limitations
- Requires careful state modeling
- More architectural discipline required
