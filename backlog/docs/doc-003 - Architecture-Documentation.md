---
id: doc-003
title: Architecture Documentation
type: other
created_date: '2026-02-07 18:14'
updated_date: '2026-04-03 18:36'
---
**About arc42**

arc42, the template for documentation of software and system
architecture.

Template Version 9.0-EN. (based upon AsciiDoc version), July 2025

Created, maintained and © by Dr. Peter Hruschka, Dr. Gernot Starke and
contributors. See <https://arc42.org>.

# Introduction and Goals {#section-introduction-and-goals}

## Requirements Overview {#_requirements_overview}

SILENT SENTINEL is a tactical intelligence analysis platform built as a Progressive Web App (PWA). It runs entirely in the browser with no mandatory backend server, enabling full offline capability (ADR-001). The application shell provides a responsive layout for navigating between intelligence analysis modules.

Key functional requirements for the application shell:

- Header with application title, primary navigation, and global controls
- Sidebar with icon and label navigation for intelligence disciplines
- Three-section main content layout (left panel, center view, right panel)
- Glassmorphism visual design with Bundeswehr Marine theme
- Mobile-first responsive design
- WCAG AA accessibility compliance

## Quality Goals {#_quality_goals}

| Priority | Quality Goal | Description |
|----------|-------------|-------------|
| 1 | Offline Capability | Application works without network connectivity |
| 2 | Accessibility | WCAG AA compliance for all interactive elements |
| 3 | Responsiveness | Layout adapts from smartphone to desktop viewports |
| 4 | Performance | Fast initial load and smooth navigation transitions |
| 5 | Maintainability | Clean architecture with separated concerns |

## Stakeholders {#_stakeholders}

| Role | Expectations |
|------|-------------|
| Tactical Operator | Efficient navigation, minimal cognitive load, works offline |
| System Administrator | Easy deployment, configuration via environment variables |
| Developer | Clean architecture, testable components, clear conventions |

# Architecture Constraints {#section-architecture-constraints}

| Constraint | Description |
|-----------|-------------|
| Fat Client (ADR-001) | No mandatory backend server; all logic runs in the browser |
| PWA (ADR-002) | Installable, offline-capable Progressive Web App |
| Client-Side Rendering (ADR-003) | UI rendered in browser using Web Components and Svelte |
| WebAwesome Components (ADR-010) | Shoelace-based Web Components for UI consistency |
| Bundeswehr Design System (ADR-012) | Domain-specific themes define visual identity |
| 12-Factor Configuration (ADR-014) | All configuration via environment variables |

# Context and Scope {#section-context-and-scope}

## Business Context {#_business_context}

SILENT SENTINEL operates as a standalone browser application. It does not require a backend server for core functionality. Optional cloud file access uses OIDC tokens and HTTP range requests (ADR-007).

## Technical Context {#_technical_context}

| Interface | Technology | Purpose |
|-----------|-----------|---------|
| Browser | Web Platform APIs | Application runtime environment |
| BroadcastChannel | Browser API | Multi-tab state synchronization (ADR-023) |
| Cloud Storage | HTTP + OIDC | Optional file access (ADR-007) |

# Solution Strategy {#section-solution-strategy}

The application uses Hexagonal Architecture (Ports and Adapters, ADR-019) to decouple business logic from UI and infrastructure. The core navigation state lives in the Application layer and is accessed through port interfaces. Presentation components consume these ports via dependency injection.

Key technology choices:

- **Svelte 5** for reactive UI components with signal-based state ($state, $effect runes)
- **Vite** as build tool for fast HMR and native ESM support (ADR-009)
- **WebAwesome** component library for accessible, consistent UI elements (ADR-010)
- **CSS Custom Properties** for design token theming (ADR-012)
- **Vitest** for unit testing, **Playwright** with **playwright-bdd** for E2E BDD testing

# Building Block View {#section-building-block-view}

## Whitebox Overall System {#_whitebox_overall_system}

The system follows a three-layer architecture aligned with Hexagonal Architecture principles:

```
┌─────────────────────────────────────────────────┐
│                  Presentation                    │
│  AppShell → AppHeader, AppSidebar, MainLayout,  │
│             BottomStatusBar                      │
├─────────────────────────────────────────────────┤
│                  Application                     │
│  NavigationModule, SidebarItem, NavigationState  │
│  Ports: INavigationPort                          │
├─────────────────────────────────────────────────┤
│                 Infrastructure                   │
│  NavigationAdapter (BroadcastChannel sync)       │
└─────────────────────────────────────────────────┘
```

### Application Layer

**Purpose**: Contains domain logic for navigation state management.

**Components**:
- `NavigationModule` – Enum of top navigation module identifiers
- `SidebarItem` – Enum of sidebar navigation items
- `NavigationState` – Signal-based reactive state implementing INavigationPort
- `INavigationPort` – Inbound port interface for navigation operations

**Location**: `src/Application/`

### Presentation Layer

**Purpose**: Svelte 5 components that render the UI and consume application ports.

**Components**:
- `AppShell` – Root shell component, composes all sub-components
- `AppHeader` – Header with title, navigation modules, glassmorphism effect
- `AppSidebar` – 64px sidebar with icon and label navigation buttons
- `MainLayout` – Three-section content layout with liquid glass panels
- `BottomStatusBar` – Footer status bar

**Location**: `src/Presentation/components/`

### Infrastructure Layer

**Purpose**: Adapters that bridge application ports with browser APIs.

**Components**:
- `NavigationAdapter` – Wraps NavigationState with BroadcastChannel for multi-tab sync

**Location**: `src/Infrastructure/`

# Runtime View {#section-runtime-view}

## Navigation Module Switch

1. User selects a module in the header navigation.
2. AppHeader calls `navigationPort.setActiveModule(module)`.
3. NavigationState updates internal state and notifies subscribers.
4. NavigationAdapter broadcasts state change via BroadcastChannel.
5. All subscribed components (AppHeader, AppSidebar) re-render with new active state.

## Sidebar Item Selection

1. User selects a discipline in the sidebar.
2. AppSidebar calls `navigationPort.setActiveSidebarItem(item)`.
3. NavigationState updates and notifies subscribers.
4. AppSidebar re-renders with the new active item highlighted.

# Deployment View {#section-deployment-view}

## Infrastructure Level 1 {#_infrastructure_level_1}

The application is a static web application served from any HTTP server or CDN. No application server is required.

Build output: `dist/` directory produced by `npm run build` (Vite).

Deployment options:
- Static file hosting (Nginx, Apache, S3, CloudFront)
- PWA installation on client devices

# Cross-cutting Concepts {#section-concepts}

## Design Token System

All visual properties (colors, typography, spacing) are defined as CSS custom properties in the DesignSystem. Theme files (for example, Marine theme) override these tokens. Components never use hardcoded values.

## Accessibility

Accessibility is a first-class concern (ADR-005):
- Semantic HTML elements: header, nav, aside, main, footer
- aria-current attributes for active navigation states
- WCAG AA contrast ratios for all interactive elements
- Keyboard navigation with visible focus states
- Screen reader support with aria-label attributes

## Responsive Design

Mobile-first approach (ADR-021):
- Below 768px: sidebar hidden, simplified layout
- 768px to 1023px: right panel hidden
- 1024px and wider: full three-column layout

## State Management

Signal-based reactive state (ADR-004):
- NavigationState uses a subscribe/notify pattern
- Svelte 5 $effect runes synchronize component state with ports
- BroadcastChannel API syncs state across browser tabs (ADR-023)

# Architecture Decisions {#section-design-decisions}

Architecture decisions are documented as ADRs in `backlog/decisions/`. Key decisions for the application shell:

- ADR-001: Fat Client Architecture
- ADR-002: Progressive Web App
- ADR-003: Client-Side Rendering
- ADR-004: State Management
- ADR-005: Accessibility
- ADR-009: Build Tool (Vite)
- ADR-010: WebAwesome UI Components
- ADR-011: Light/Dark Mode
- ADR-012: Bundeswehr Design System
- ADR-019: Ports and Adapters Architecture
- ADR-021: Responsive Design
- ADR-023: Multitab Broadcasting

# Quality Requirements {#section-quality-scenarios}

## Quality Requirements Overview {#_quality_requirements_overview}

| Quality Attribute | Scenario | Target |
|-------------------|----------|--------|
| Accessibility | Screen reader navigates header and sidebar | All regions announced with correct labels |
| Accessibility | Keyboard-only user navigates controls | All interactive elements reachable via Tab |
| Responsiveness | Viewport resized to 375px | Sidebar hidden, layout remains usable |
| Performance | Initial page load on desktop | First Contentful Paint under 2 seconds |
| Offline | Network disconnected after load | Application remains fully functional |

## Quality Scenarios {#_quality_scenarios}

See `backlog/assets/PBI-005.feature` for detailed BDD scenarios covering accessibility, responsiveness, and visual design quality attributes.

# Risks and Technical Debts {#section-technical-risks}

| Risk / Debt | Description | Mitigation |
|-------------|-------------|------------|
| WebAwesome aria-current reflection | wa-button custom elements may not reflect aria-current as a standard DOM attribute, causing E2E test instability | Use CSS class checks or DOM evaluate in E2E tests |
| Single active module | Only OP_NEPTUNE is currently active; other modules are commented out | Enable modules as features are implemented |
| No backend API | No REST API implemented yet (ADR-024 planned) | API layer to be added when backend features are needed |

# Glossary {#section-glossary}

| Term | Definition |
|------|-----------|
| SILENT SENTINEL | Application name for the tactical intelligence analysis platform |
| OP_NEPTUNE | Operational module identifier for the primary navigation |
| IMINT | Imagery Intelligence – a discipline for image-based analysis |
| SIGINT | Signals Intelligence – a discipline for signal-based analysis |
| Glassmorphism | Visual design effect using backdrop blur and semi-transparent backgrounds |
| Liquid Glass | Panel design pattern using glassmorphism with 12px backdrop blur |
| Marine Theme | Bundeswehr domain-specific color theme using Navy and Marine Blue tones |
