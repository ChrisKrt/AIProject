---
id: decision-024
title: 'ADR-024: REST with HATEOAS and JSON-LD for API Design'
date: '2026-03-14'
status: accepted
---

## Context

The application requires a scalable, maintainable API that supports diverse clients and long-running operations. Traditional REST approaches lack discoverability and tight coupling between clients and server endpoints. We need standardized error handling, API versioning, authorization, and support for asynchronous workflows typical of PWAs and distributed systems.

## Decision

All REST endpoints shall adhere to HATEOAS principles with JSON-LD as the hypermedia standard. APIs must include:

**Versioning & Headers**: API version via `Accept: application/vnd.app.v1+json` header; versioning in URI path reserved for breaking changes only.

**Error Responses**: Standardized error codes using HTTP status (201, 400, 401, 403, 404, 409, 422, 500+) with response body containing `code`, `message`, `details`, and `timestamp`.

**Authorization & Security**: OpenID Connect (OIDC) bearer tokens in `Authorization` header; claim-based access control; CORS with `Origin` validation; HTTPS/TLS mandatory; HSTS header enforcement.

**Hypermedia (HATEOAS)**: JSON-LD `@context` for semantic meaning; `_links` with `rel` and `href` for navigation; embed related resources where appropriate; implement link traversal for state transitions.

**Long-Running Operations**: POST returns `202 Accepted` with `Location` header linking to task resource; clients receive real-time updates via Server-Sent Events (SSE); task expiry after 24 hours; fallback polling available via GET if needed.

## Consequences

**Positive:**
- Self-discoverable APIs reduce client-server coupling and fragility
- JSON-LD enables semantic interoperability and linked data integration
- Standardized error handling improves debugging and user experience
- Long-running operations decouple client expectations from server processing
- Version header approach supports gradual migration without URL proliferation

**Negative:**
- Increased payload size due to `_links` and `@context` metadata (mitigate with caching)
- Learning curve for teams unfamiliar with HATEOAS and JSON-LD
- SSE requires persistent client connection; graceful reconnection logic needed for network resilience

## Alternatives Considered

- **GraphQL**: Powerful for queries but adds complexity; HATEOAS better aligns with REST philosophy and existing standards.
- **API Keys**: Stateless but less secure; lack standardized audit trail and user identity; OIDC provides superior security and integration with identity providers.
- **Synchronous-only operations**: Blocks clients on long tasks; unsuitable for PWA/offline-first design.

## Authors

- Architecture team

## References

- [Roy Fielding's REST dissertation](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)
- [JSON-LD spec](https://www.w3.org/TR/json-ld11/)
- [RFC 7807 Problem Details](https://tools.ietf.org/html/rfc7807)
- ADR-019 (Ports and Adapters Architecture)

