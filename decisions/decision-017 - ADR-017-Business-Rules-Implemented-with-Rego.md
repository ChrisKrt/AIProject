---
id: decision-017
title: 'ADR-017: Business Rules Implemented with Rego'
date: '2026-02-09 18:44'
status: approved
---
## Context

Business rules should be portable, testable, and not tied to any specific platform, language, or interface. Using a rule engine enables clear separation and flexibility.

## Decision

Business rules will be implemented using [Rego](https://www.openpolicyagent.org/docs/latest/policy-language/), a declarative rule engine evaluated by the application via OPA. No platform, language, or interface dependencies.

## Consequences

- Business rules are defined in Rego, not in application code.
- Application logic is decoupled from business rules.
- Rules can be updated and tested independently.


## Example
```rego
package business

allow { input.user == "admin" }
```
