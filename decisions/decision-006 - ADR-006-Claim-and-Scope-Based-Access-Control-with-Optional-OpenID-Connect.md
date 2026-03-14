---
id: decision-006
title: 'ADR-006: Claim- and Scope-Based Access Control with Optional OpenID Connect'
date: '2026-02-09 18:06'
status: accepted
---
## Context

This application is a fat-client, offline-first JavaScript/TypeScript application with no mandatory backend.
It provides both a CLI and a GUI, which share the same business logic implemented in JavaScript/TypeScript.

The application requires access control in order to:

- Gate functionality (e.g. importing, deleting, or editing content)
- Support different usage scenarios (single-user, restricted mode, future extensions)
- Integrate with OpenID Connect (e.g. Keycloak) when available

At the same time, the following constraints apply:

- The application must work fully offline
- OpenID Connect must be optional
- The same authorization logic must be usable in both CLI and GUI
- The solution must not depend on a server-side backend

Traditional role-based access control (RBAC) is too rigid and does not integrate well with OpenID Connect scopes. A more flexible model is required.

## Decision

Access control in this application is implemented using a claim-based authorization model, with scopes as the primary permission mechanism.

Key aspects of the decision:

- Scopes as permissions
  - Permissions are expressed as string-based scopes (e.g. app.read, app.import)
  - Scopes define what actions an identity is allowed to perform
  - Roles, if needed, are treated as derived concepts, not as the primary model
- Claims as contextual information
  - Claims provide additional attributes (e.g. username, edition, locale)
  - Claims do not grant permissions by themselves but may influence policy decisions
- Policy-based authorization
  - Business logic enforces access control through named authorization policies
  - Policies are evaluated against the current identity’s scopes and claims
  - Frontends do not implement authorization rules themselves
- Optional OpenID Connect integration
  - When configured, OpenID Connect (e.g. Keycloak) acts as an identity provider
  - Scopes and claims are extracted from OpenID Connect tokens
  - No server-side backend is required for token validation
- Local identity fallback
  - When OpenID Connect is not configured or unavailable, a local identity is used
  - Local identities are assigned a predefined set of scopes
  - This ensures full functionality in offline and single-user scenarios

## Implementation

### Policy Evaluation with OPA WebAssembly (opa-wasm NPM module)

Authorization policies are implemented in Rego and compiled to WebAssembly using the Open Policy Agent (OPA) toolchain. Policies are evaluated in-process inside the shared JavaScript/TypeScript business logic using the official OPA WebAssembly NPM module (`@open-policy-agent/opa-wasm`):

- Policies are written as `.rego` files and versioned with the application
- Policies are compiled to WebAssembly and loaded at runtime
- Policies are evaluated from JavaScript/TypeScript with JSON input that includes the current identity’s scopes and claims
- No policy server and no backend is required; evaluation works offline
- CLI and GUI both call the same JavaScript/TypeScript policy evaluation code path (frontends never implement authorization logic)

This aligns the authorization-policy runtime with the general “Rego for business rules” approach.

## Consequences

### Positive

- Works fully offline and without a backend
- Integrates naturally with OpenID Connect and Keycloak
- Provides fine-grained, flexible authorization
- Single authorization model shared by CLI and GUI
- Clear separation between identity, authorization, and presentation logic
- Easy to extend with new scopes and policies

### Negative

- Access control is not a strong security boundary against local attackers
- Requires careful scope and policy design to avoid complexity
- Token caching and offline usage introduce additional edge cases

## Notes

Because this application is a local fat client, access control is primarily intended for feature gating, safety, and intentional usage, not for defending against malicious users with local system access. This limitation is accepted as part of the architectural trade-off.