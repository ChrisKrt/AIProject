---
id: decision-018
title: 'ADR-018: Pattern Language'
date: '2026-02-09 18:48'
status: accepted
---
## Context

Architectural patterns are often implicit in code structure but not visible in naming. This creates cognitive load, makes violations hard to spot, and complicates onboarding.

Pattern Language (Mustersprache) makes architectural intent explicit through naming conventions. Class and file names clearly communicate their role (Port, Adapter, Service, Handler) and pattern, transforming naming into a self-documenting architectural tool.

## Decision

The codebase will adopt an explicit **Pattern Language (Mustersprache)** where class and file names clearly reflect their architectural role and pattern.

### Naming Conventions by Pattern

#### 1. **Ports** (Interfaces defining boundaries)

Prefix with `I`: `IFileStorage`, `IPdfFinder`, `IAuthenticationPort`, `IDocumentRepository`

Rules:
- All interfaces use `I` prefix
- Noun-based naming (what capability is provided)

#### 2. **Adapters** (Concrete implementations of ports)

Name adapter implementations to clearly indicate their specific implementation strategy and purpose:

```
LocalFileSystemAdapter        // Implements file storage for local filesystem
CloudStorageAdapter           // Implements file storage for cloud (S3, Azure)
OpenIDConnectAuthAdapter      // Implements authentication via OpenID Connect
PostgresDocumentRepository    // Implements document persistence with PostgreSQL
InMemoryDocumentRepository    // Implements document persistence in-memory (tests)
Format: `LocalFileSystemAdapter`, `CloudStorageAdapter`, `OpenIDConnectAuthAdapter`, `PostgresDocumentRepository`

Rules:
- Format: `[Technology][Capability]Adapter`
- Technology/source must be explici
ListDocumentsQueryHandler        // Handles: List Documents query
FindPdfByNameQueryHandler        // Handles: Find PDF by Name query
```

**Rules:**
- Commands are named `[Action][Entity]CommandHandler`
- Queries are named `[Verb][Entity]QueryHandler`
- Clearly distinguishes between state-changing and read-only operations

#### 4. **Services** (Application/Domain Services)

Name services to indicate )

Format: `CreateDocumentCommandHandler`, `ListDocumentsQueryHandler`, `FindPdfByNameQueryHandler`

Rules:
- Commands: `[Action][Entity]CommandHandler`
- Queries: `[Verb][Entity]QueryHandler`

Use descriptive suffixes for classes implementing cross-cutting concerns:

Format: `PdfIndexingService`, `SearchCoordinationService`, `DocumentAccessService`

Rules:
- Format: `[Capability]Service`
- M = Observable/reactive behavior modification
- Name clearly states the concern being addressed
Format: `LoggingAspect`, `ValidationDecorator`, `CachingBehavior`, `AuthorizationAspect`

Rules:
- `Aspect` = AOP-style cross-cutting concern
- `Decorator` = Decorator pattern
- `Behavior` = Observable/reactive behavior
⚠️ **Longer Class Names** - Names become more verbose and descriptive  
⚠️ **Naming Discipline Required** - Team must consistently apply conventions  
⚠️ **Initial Learning Curve** - Team members must learn pattern vocabulary  
⚠️ **Refactoring When Patterns Change** - Changing a component's role requires renaming

## References

- Explicit Intent - Names communicate architectural role  
✅ Discoverable Architecture - Code becomes self-navigating  
✅ Easier Code Review - Violations become obvious  
✅ Simplified Onboarding - Naming makes patterns clear  


## Consequences

### Negative

⚠️ Longer Class Names - More verbose naming required  
⚠️ Naming Discipline - Team must consistently apply conventions  
