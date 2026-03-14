---
id: decision-014
title: 'ADR-014: Configuration via Environment Variables (12-Factor Principle)'
date: '2026-02-09 18:31'
status: accepted
---

## Context

Applications often require configuration for aspects such as file paths, feature flags, cloud endpoints, and access control. Historically, configuration in applications is often handled via config files, command-line arguments, or hardcoded values. However, the 12-Factor App methodology recommends environment variables as the primary configuration mechanism, enabling separation of config from code, easier deployment, and improved portability.

For applications that may run in different environments (such as native, browser, or containerized deployments), direct access to OS environment variables may not always be possible. For example, browser-based applications cannot access OS environment variables at runtime, but can simulate them via build-time injection, localStorage, or URL parameters.

### Environment Variable Injection in Containers and Browsers

When an application is hosted in a Docker container, environment variables can be set at container startup. For browser-based applications, since they cannot access OS environment variables at runtime, these variables must be injected into the static assets served by the container.

**Recommended pattern:**
- Use an entrypoint script in the Docker container to generate a `config.js` file from environment variables at container startup. The application loads this file at runtime (e.g., `window.ENV = {...}`), making the configuration available in the browser.
- Alternatively, inject variables at build time using a tool like Vite, but this requires rebuilding the image for config changes.

**Best practice:**
- Set environment variables in Docker (`docker run -e VAR=value ...`).
- Entrypoint script writes them to a JS file.
- Application loads config from this JS file at runtime.

This approach allows configuration changes without rebuilding the Docker image and keeps the deployment flexible and environment-agnostic.

## Decision

All configuration for the application will be passed via environment variables, following the 12-Factor App principles:
- The application reads configuration from OS environment variables at runtime where possible.
- For environments where direct access is not possible (e.g., browsers), configuration is injected at build time and/or via URL parameters/localStorage for runtime overrides.
- No configuration is hardcoded in the application logic.
- Documentation will specify all supported environment variables and their precedence.

This ensures a consistent, portable, and environment-agnostic configuration approach across all deployment targets.

## Consequences

### Positive
- Consistent configuration mechanism for all application environments
- Separation of config from code, improving security and portability
- Easier deployment and environment-specific customization
- Enables 12-Factor App best practices
- No need for separate config files or code changes for environment-specific settings

### Negative
- Browser-based applications cannot access OS environment variables at runtime; must rely on build-time injection or URL/localStorage workarounds
- Some configuration changes in browser environments require a rebuild/redeploy or explicit user action
- Slightly more complex documentation and tooling for injecting environment variables in browser-based applications

## Alternatives Considered

- **Config files**: Rejected due to lack of portability and risk of leaking secrets into source control
- **Hardcoded values**: Rejected as it violates 12-Factor principles and reduces flexibility
- **Command-line arguments only**: Not sufficient for all environments, and less flexible for complex config

