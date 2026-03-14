---
id: decision-019
title: 'ADR-019: Ports and Adapters Architecture'
date: '2026-02-09 18:53'
status: accepted
---

## Context

The application requires a modular architecture that decouples business logic from external dependencies and allows flexibility in choosing different implementations and technologies. As the application grows across multiple domains (authentication, file management, business rules, etc.), the core business logic needs to remain independent of framework choices, UI technologies, and external service implementations.

Additionally, the monorepo structure with Git submodules (ADR-008) necessitates clear boundaries between components that can be independently developed and tested.

## Decision

We adopt the **Ports and Adapters Architecture** (also known as Hexagonal Architecture) as the primary architectural pattern for the application.

### Architecture Overview

**Ports** define the contracts (interfaces) through which the application core communicates with the outside world:
- **Inbound Ports (Driving Ports)**: Receive requests from external actors (CLI, HTTP API, UI clients). Examples: `AuthenticationPort`, `FileServicePort`, `QueryPort`
- **Outbound Ports (Driven Ports)**: Define how the core communicates with external systems (databases, file storage, external services, messaging). Examples: `StoragePort`, `PolicyEnginePort`, `IdentityProviderPort`

**Adapters** are concrete implementations of ports that handle technology-specific details:
- **Inbound Adapters**: Translate external requests into port calls (HTTP controllers, CLI handlers, message queue consumers)
- **Outbound Adapters**: Translate port calls into external system interactions (MongoDB adapter, S3 adapter, OpenID Connect client, Rego policy engine wrapper)

### Control Flow

The control flow follows a unidirectional dependency pattern:

```
External World (UI, API, Integrations)
        ↓
[Inbound Adapters] → [Inbound Ports] → [Application Core / Use Cases]
                                              ↓
                                        [Outbound Ports]
                                              ↓
[Outbound Adapters] ← [Outbound Ports] ← [Application Core]
        ↓
External Systems (Storage, Auth, Policies)
```

**Request Flow (Driving):**
1. External actor sends request to Inbound Adapter (e.g., HTTP POST to controller)
2. Adapter translates HTTP request to domain objects
3. Adapter calls Inbound Port method with domain objects
4. Port delegates to Application Core / Use Case handler
5. Core processes business logic, may invoke Outbound Ports
6. Outbound Adapter executes external interaction (database query, file write)
7. Adapter returns result through port back to core
8. Core returns result through inbound port to adapter
9. Adapter translates result to external format (HTTP response)

**Key Control Flow Principles:**
- **Dependency flows inward**: Outer layers (adapters) depend on inner layers (ports and core), never the reverse
- **Core is agnostic**: Application core has zero knowledge of adapters or external technology choices
- **Ports are boundaries**: Clear interfaces prevent implementation leakage
- **Symmetric architecture**: Both driving and driven sides follow the same port/adapter pattern

### Implementation Structure

```
src/
├── domains/
│   ├── auth/
│   │   ├── ports/
│   │   │   ├── authentication.port.ts    (inbound)
│   │   │   └── identity-provider.port.ts (outbound)
│   │   ├── adapters/
│   │   │   ├── http-controller.adapter.ts
│   │   │   └── oidc-client.adapter.ts
│   │   └── use-cases/
│   │       └── authenticate.use-case.ts
│   ├── files/
│   ├── policies/
│   └── ...
├── shared/
│   ├── ports/
│   └── adapters/
```

## Consequences

### Positive

- **Testability**: Core logic can be tested independently without external dependencies; adapters can be tested in isolation
- **Flexibility**: Technology choices can change without affecting business logic (swap MongoDB for PostgreSQL, HTTP for gRPC)
- **Clear Architecture**: Explicit boundaries between layers make the system easier to understand and navigate
- **Modularity**: Aligns well with ADR-008 (monorepo structure); each domain can be independently developed
- **Reduced Coupling**: Dependencies flow in one direction; circular dependencies are impossible by design
- **Business Logic Preservation**: Use cases and business rules remain portable and technology-agnostic
- **Team Independence**: Different teams can work on different adapters without coordination

### Negative

- **Increased Code Volume**: Requires more boilerplate (ports, adapters, mappers between layers)
- **Learning Curve**: Developers unfamiliar with hexagonal architecture may find the pattern initially complex
- **Over-engineering Risk**: Simple features may feel over-engineered if ports/adapters are forced unnecessarily
- **Performance Considerations**: Additional abstraction layers introduce function call overhead; mitigation through careful design and async boundaries
- **Setup Complexity**: Each new domain requires establishing ports, adapters, and use cases; initial setup requires discipline

### Mitigation Strategies

- Create code templates and scaffolding tools for consistent port/adapter generation
- Provide clear guidelines for when to apply the pattern (all business logic) vs. when it's optional
- Use dependency injection frameworks to manage port-adapter wiring
- Design adapter boundaries to minimize translation overhead
- Document patterns and examples for team reference

