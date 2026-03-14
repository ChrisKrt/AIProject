---
id: decision-023
title: 'ADR-023: Multitab Broadcasting'
date: '2026-02-12 19:27'
status: accepted
---
## Context

The application provides multiple views to display and interact with the same data in different forms (e.g., table view, card view, list view, map view, etc.). Users may open the same data in multiple browser tabs or windows for comparison or workflow efficiency. Currently, there is no synchronization between these tabs, meaning that changes made in one tab (edits, selections, additions, removals, etc.) are not reflected in other open tabs.

This creates an inconsistent user experience and potential data integrity issues when the user switches between tabs.

## Decision

Implement multitab broadcasting using the JavaScript Broadcast Channel API (with fallback mechanisms where necessary) to automatically synchronize user actions and state changes across all open tabs and windows of the application.

Changes such as:
- Data edits or updates
- Selections or filtering
- Additions or removals of items
- Navigation or view state changes

...will be broadcasted to all other tabs in real-time using the browser's built-in BroadcastChannel API.

## Consequences

**Positive:**
- Consistent data view across all open tabs
- Improved user experience with real-time synchronization
- Better data integrity by preventing conflicting edits across tabs
- Lightweight implementation using native browser APIs
- No server-side coordination required (aligned with fat-client architecture)

**Negative:**
- Limited browser support for BroadcastChannel API in older browsers (requires polyfill/fallback)
- Increased complexity in state management to handle incoming broadcast messages
- Network latency may cause minor race conditions in rapid-fire changes across multiple tabs
- Potential for message flooding if many changes occur simultaneously

**Neutral:**
- Complements the client-side rendering and state management strategy (ADR-004)
- Reinforces the fat-client architecture (ADR-001)
- May simplify local-first data synchronization patterns

