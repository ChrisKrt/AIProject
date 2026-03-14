---
id: decision-007
title: 'ADR-007: Direct File Access with OpenID Connect and Cloud Storage'
date: '2026-02-09 18:13'
status: accepted
---
## Context
The application is designed as a fat client with no backend servers. All business logic and access control are implemented client-side. The application must access files (e.g., PDFs, Parquet) directly from cloud storage using HTTP/3 range requests, supporting cloud-ready formats and efficient, scalable access. Access control must be enforced without a custom backend.

## Decision
The application will use OpenID Connect (OIDC) for authentication and authorization. The client (CLI or GUI) authenticates the user via OIDC and obtains an access token containing the required claims and scopes. When accessing files, the client presents this access token directly to the cloud storage provider (e.g., Azure Blob Storage, Google Cloud Storage, or S3 with OIDC support) as a Bearer token in the HTTP Authorization header.

The storage provider validates the token, checks the claims/scopes, and enforces access control for the requested file or range. If the token is valid and the user is authorized, access is granted; otherwise, it is denied. No custom backend is required for authentication or authorization.

## Consequences
- No backend servers are needed for file access or access control.
- All authentication and authorization are handled by the client, the identity provider, and the storage provider.
- Access control policies are enforced both client-side (OPA/Rego or similar) and by the storage provider.
- The architecture is cloud-ready, scalable, and secure, leveraging standard protocols and cloud provider features.

## Implementation Notes
- The client uses OIDC Authorization Code Flow with PKCE to authenticate users.
- Access tokens are included as Bearer tokens in HTTP requests to cloud storage.
- Storage providers must support OIDC or token-based access control.
- Policies and claims are managed via the identity provider and storage provider IAM.