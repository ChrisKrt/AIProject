---
id: decision-001
title: "ADR-001: Fat Client Architecture Without Server Backend"
date: '2026-02-08 18:26'
status: accepted
---
## Context
Key requirements:

- Must work fully offline
- Must have direct access to the local file system
- Must support both CLI and GUI frontends
- Must avoid infrastructure and operational complexity
- Must protect user privacy by keeping data local

A traditional client–server architecture would introduce unnecessary complexity and would not align with the offline-first requirement.


## Decision
The application will be implemented as a Fat Client architecture with no server-side backend.

- All business logic is executed on the client
- Data is stored locally on the user's machine
- No remote APIs, databases, or backend services are used
- The same business logic is shared across all frontends


## Consequences

### Positive

- Works fully offline
- No backend infrastructure or operational costs
- Improved privacy (no data leaves the user's device)
- Simplified deployment and maintenance
- Deterministic behavior independent of network conditions

### Negative

- No built-in multi-device synchronization
- Updates must be delivered via application updates
- Performance depends entirely on client hardware
