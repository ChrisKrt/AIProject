---
name: edit-architecture-documentation
description: Edit and maintain architecture documentation based on arc42 template via Backlog.md
---

# Skill: Edit Architecture Documentation

## Purpose
Maintain and update architecture documentation following the arc42 standard through the Backlog.md MCP system. Arc42 provides a proven, comprehensive template for documenting software and system architecture in a structured, consistent manner.

## When to Use
- Architecture needs to be documented or updated
- Documenting system design decisions and rationale
- Creating cross-cutting architecture concepts
- Recording deployment and runtime architecture
- Defining quality requirements and constraints
- Sharing architecture knowledge with team members

## Arc42 Structure Overview

Arc42 is organized into 12 mandatory sections plus optional glossary. Each section serves a specific purpose:

| Section | Purpose |
|---------|---------|
| **Introduction & Goals** | Requirements, quality goals, and stakeholder expectations |
| **Architecture Constraints** | Technical, organizational, and regulatory constraints |
| **Context & Scope** | Business and technical system boundaries |
| **Solution Strategy** | High-level approach to achieve quality goals |
| **Building Block View** | System decomposition (3 hierarchical levels) |
| **Runtime View** | System behavior during execution (scenarios) |
| **Deployment View** | Infrastructure and deployment topology |
| **Cross-cutting Concepts** | Reusable patterns (logging, security, persistence, etc.) |
| **Architecture Decisions** | Rationale for key architectural choices |
| **Quality Requirements** | Non-functional requirements and scenarios |
| **Risks & Technical Debt** | Known issues and improvement opportunities |
| **Glossary** | Domain-specific terminology definitions |

## Backlog.md Integration

Architecture documentation is managed as a Backlog.md document:

```bash
# View current documentation
backlog document view doc-003

# Update documentation (via CLI or direct edit)
# The document is stored as: backlog/docs/doc-003 - Architecture-Documentation.md
```

## Editing Workflow

### 1. View Current Documentation
```bash
backlog document view doc-003 --plain
```

This shows the complete arc42 template with all sections.

### 2. Edit Specific Sections

**General approach:** Edit sections in the document while maintaining arc42 structure and order.

#### Introduction & Goals
- **Requirements Overview:** Function list or use case diagram + short descriptions
- **Quality Goals:** Top 3–5 quality characteristics (performance, scalability, security, etc.)
- **Stakeholders Table:** Document role, contact, and expectations

**Example quality goals:**
- Performance: Response time < 200ms for 95th percentile
- Security: OWASP Top 10 compliance, encryption at rest/transit
- Scalability: Support 10k concurrent users

#### Architecture Constraints
- **Technical constraints:** Technology stack, frameworks, databases, protocols
- **Organizational constraints:** Team structure, skills, delivery schedule
- **Regulatory/Compliance:** GDPR, HIPAA, SOC2, industry standards

List each constraint with brief explanation of impact.

#### Context & Scope
- **Business Context:** External partnerships, customers, systems your system integrates with
- **Technical Context:** Protocols, data flow, API contracts with external systems

Create tables or diagrams (ASCII art or links to external diagrams) to show system boundaries.

#### Solution Strategy
- **Overall approach** in 2–4 paragraphs
- **Rationale** for key technology choices
- **How quality goals are achieved**

Example: "We use microservices to achieve scalability and deployment independence; containerized via Docker/Kubernetes for operational efficiency."

#### Building Block View
Hierarchical decomposition in 3 levels:

- **Level 1 (Whitebox):** Overall system structure with major components
- **Level 2:** Internal structure of significant building blocks
- **Level 3:** Details of complex subsystems

For each block, document:
- Purpose/Responsibility
- Interfaces (API contracts)
- Quality/Performance characteristics
- File location (if applicable)
- Fulfilled requirements

**Example block:**
```
### Authentication Service
Purpose: Handle user identity, token generation, and permission validation

Interface:
- POST /auth/login - returns JWT token
- GET /auth/validate - verifies token, returns user context

Quality: <5ms latency, 99.9% availability
Location: src/auth-service/
Fulfilled Requirements: REQ-001 (user identity), REQ-003 (security)
```

#### Runtime View
Document important execution scenarios:

- **Scenario 1:** User login flow
- **Scenario 2:** API request with authentication
- **Scenario 3:** Async job processing
- **Scenario 4:** Error handling

For each scenario:
1. Describe the flow (sequence)
2. Include or reference a sequence diagram (can be text or external link)
3. Highlight notable aspects (parallel execution, error paths, retries)

#### Deployment View
Infrastructure and deployment topology:

- **Infrastructure Level 1:** Overall deployment architecture (cloud regions, on-prem, hybrid)
- **Infrastructure Level 2:** Detailed deployment per environment (dev, staging, production)

Document:
- Hardware/VM specifications
- Container orchestration (Kubernetes, ECS, etc.)
- Network topology
- Storage and database deployment
- Monitoring and logging infrastructure

#### Cross-cutting Concepts
Document reusable patterns and concerns:

- **Logging & Monitoring:** Log levels, centralized logging, metrics collection
- **Security:** Authentication strategy, authorization model, encryption approach
- **Error Handling & Resilience:** Retry logic, circuit breakers, graceful degradation
- **Persistence Strategy:** ORM, database patterns, caching
- **Dependency Management:** How external dependencies are managed, versioning strategy
- **API Documentation:** API versioning, deprecation policy, contract-first design

Example:
```
### Asynchronous Processing
All long-running operations (reports, exports, external integrations) use message queues
(RabbitMQ) to decouple producers from consumers. Retry logic: exponential backoff,
max 3 retries. Dead-letter queue for failed messages after retries.
```

#### Architecture Decisions
Link or embed important ADRs (Architecture Decision Records):

- Document key decisions made
- Rationale and alternatives considered
- Link to detailed ADR documents (backlog/decisions/)

Example entry:
```
- **Database Technology:** PostgreSQL chosen for ACID compliance over NoSQL.
  See ADR-002 for full rationale and alternatives.
- **API Style:** RESTful with JSON for simplicity and broad tooling support.
```

#### Quality Requirements
Non-functional requirements and quality scenarios:

- **Performance:** Response time targets, throughput, latency percentiles
- **Availability:** Uptime SLAs, disaster recovery RTO/RPO
- **Security:** Threat model, security controls, compliance requirements
- **Scalability:** Expected growth, load targets, elasticity
- **Maintainability:** Code standards, documentation, technical debt tolerance

Include concrete scenarios:
```
Performance Scenario:
- Given: 1000 concurrent users browsing products
- When: User searches with filters
- Then: Result page loads in < 500ms (95th percentile)
```

#### Risks & Technical Debt
Known issues and improvement opportunities:

- **Risk:** Database query performance on large datasets
  - Impact: High (user-visible slowness)
  - Mitigation: Implement query indexing, caching layer
  - Owner: Backend team
  - Review date: Q2 2026

- **Technical Debt:** Legacy payment module (deprecated API)
  - Effort: 3 sprints to refactor
  - Priority: Medium (not blocking new features)
  - Target: Q3 2026

#### Glossary
The glossary is in its own document (backlog/docs/doc-004 - Glossary.md) to keep the main architecture document concise. Link to glossary from the architecture documentation.

### 3. Key Guidelines

- **Link ADRs:** Architecture decisions reference detailed ADRs in `backlog/decisions/`
- **Use diagrams:** Flowcharts, sequence diagrams, deployment diagrams improve clarity
- **Be specific:** Replace placeholders with actual project details
- **Record rationale:** Explain "why" for each decision
- **Keep current:** Update when architecture changes; review quarterly

### 4. Validation Checklist

- [ ] All 12 arc42 sections populated
- [ ] Technical decisions linked to ADRs in `backlog/decisions/`
- [ ] Quality goals tied to architecture choices
- [ ] Diagrams/tables referenced or embedded
- [ ] Glossary documents domain terminology
- [ ] No placeholder text remaining
- [ ] Team review completed

## Output
- **Location:** `backlog/docs/doc-003 - Architecture-Documentation.md`
- **Format:** Markdown (arc42 template)
- **References:** Link to `backlog/decisions/` for detailed ADRs
