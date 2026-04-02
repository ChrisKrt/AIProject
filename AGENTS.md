# AI Defence Software

This web based software is a shell which gets continously expanded with new features and capabilities. The final purpose has yet to be defined.

## Project Structure

.github/ - GitHub specific files and configurations
src/ - Main application code
src/Application/ - Application logic
src/Infrastructure/ - Infrastructure related code (e.g., database, external services)
src/Presentation/ - User interface and presentation layer
src/Presentation/DesignSystem/ - Themes and styles
backlog/docs/ - Documentation related to the project
backlog/docs/doc-001 - User-Guide.md - A comprehensive guide for users to understand and utilize the software effectively.
backlog/docs/doc-002 - Admin-Guide.md - A guide for administrators to manage and maintain the software.
backlog/docs/doc-003 - Architecture-Documentation.md - Detailed documentation of the software architecture, including design decisions and system components.
backlog/docs/doc-004 - Product-Requirements-Document.md - A document outlining the product requirements, features, and specifications.
backlog/docs/doc-005 - Glossary-Ubiquitous-Language.md - A glossary of terms and definitions used within the project to ensure a common understanding among team members.
backlog/docs/doc-006 - Design-System.md - Documentation of the design system usage guidelines.
backlog/tasks/ - Product Backlog items - Implementation plan, acceptance criteria, defintion of done, etc.
backlog/decisions/ - Architectural Decision Records (ADRs) - Documenting architectural decisions and their rationale.
backlog/assets/ - Assets related to the Product Backlog items, such as mockups, ...

# Architecture Decision Records (ADRs) - In a nutshell

| #       | Title                     | Key Decision                                                                                                                                                |
| ------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ADR-001 | Fat Client Architecture   | The application runs entirely in the browser with no mandatory backend server, enabling full offline capability.                                            |
| ADR-002 | Progressive Web App (PWA) | The GUI is implemented as a PWA to support offline use, installability, and cross-platform browser access.                                                  |
| ADR-003 | Client-Side Rendering     | The UI uses client-side rendering with native web platform features (Web Components, Lit) instead of heavy frameworks.                                      |
| ADR-004 | State Management          | A lightweight, signal-based reactive state management strategy is used to synchronize frontend state without a heavy store library.                         |
| ADR-005 | Accessibility             | Accessibility (a11y) is a core requirement, mandating WCAG compliance and assistive technology support from the start.                                      |
| ADR-006 | Access Control            | Claim- and scope-based access control is enforced client-side, with optional OpenID Connect for identity federation.                                        |
| ADR-007 | Cloud File Access         | Files are accessed directly from cloud storage via HTTP range requests using OIDC tokens, without a custom backend proxy.                                   |
| ADR-008 | Monorepo                  | All components are managed in a monorepo with Git submodules for plugins                                                                                    |
| ADR-009 | Build Tool                | Vite is chosen as the build tool for its fast HMR, native ESM support, and PWA plugin ecosystem.                                                            |
| ADR-010 | UI Component Library      | WebAwesome (Shoelace-based Web Components) is adopted as the standard UI component library for visual consistency and accessibility.                        |
| ADR-011 | Light/Dark Mode           | The application supports both light and dark color schemes, automatically respecting the OS preference via CSS custom properties.                           |
| ADR-012 | Bundeswehr Design System  | Four domain-specific Bundeswehr themes (mapped to light/dark mode) define the application's visual identity.                                                |
| ADR-013 | Feature Flags             | Runtime feature flags are supported to enable/disable features for staged rollout, testing, and user customization.                                         |
| ADR-014 | Configuration             | All configuration is managed via environment variables following the 12-Factor App principle to separate config from code.                                  |
| ADR-015 | Language Support          | The GUI supports English and German as the two supported languages using i18n, while the CLI remains English-only.                                          |
| ADR-016 | Versioning                | Releases follow Semantic Versioning 2.0 (SemVer) to communicate breaking changes, features, and fixes clearly.                                              |
| ADR-017 | Business Rules            | Business rules are implemented in Rego (OPA) to keep them portable, testable, and decoupled from application code.                                          |
| ADR-018 | Pattern Language          | A shared pattern language is enforced in naming conventions (files, classes, modules) to make architectural intent explicit.                                |
| ADR-019 | Ports & Adapters          | The Hexagonal (Ports & Adapters) architecture is adopted to decouple core business logic from all external dependencies and technologies.                   |
| ADR-020 | OTA Updates               | Over-the-air (OTA) updates are supported with automatic backup and user configuration preservation during the upgrade process.                              |
| ADR-021 | Responsive Design         | A mobile-first responsive design approach ensures the UI works seamlessly across desktop, tablet, and smartphone form factors.                              |
| ADR-022 | Plugin System             | A plugin system is introduced so that classified or sensitive features can be loaded as separate, independently cleared modules into the open-source shell. |
| ADR-023 | Multitab Broadcasting     | State changes are broadcast across all open browser tabs using the `BroadcastChannel` API to keep views synchronized in real time.                          |
| ADR-024 | REST with HATEOAS         | The API follows REST with HATEOAS and JSON-LD to enable discoverability, reduce client-server coupling, and support asynchronous workflows.                 |

# Implementation Details
- We use commitizzen to enforce commit message conventions and generate changelogs automatically.
- The allowed commit types are: feat, fix, chore.
- The scope of the commit message is the PBI Number.
- We use trunk based development with feature branches and pull requests for code review and integration.
- Only the final merge commit to main must follow the commit message convention, feature branch commits can be more flexible for development purposes.
- The changelog is generated from the commit messages using the standard format of Conventional Commits, which allows us to automatically categorize changes into features, fixes, and chores, and to generate release notes based on the commit history.
- We use top down development, starting with the definition of the PBI and its acceptance criteria, then refining it into smaller tasks and subtasks, and finally implementing the code and tests to meet the definition of done. We start with the user interface and user experience design, then move on to the application logic and infrastructure, and finally integrate everything together and test it end to end.
- We use a combination of Test-Driven Development (TDD) and Behavior-Driven Development (BDD) to ensure that our code is well-tested, maintainable, and meets the requirements of the users. We write unit tests for the application logic and infrastructure, and we write ATDD test cases for the user interface and user experience to ensure that they meet the acceptance criteria defined in the PBIs. We also use UI mockups to visualize the design and get feedback from stakeholders before implementing the code.