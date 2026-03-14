---
id: PBI-002
title: Project Setup
status: In Progress
assignee:
  - '@coder'
created_date: '2026-02-11 20:43'
updated_date: '2026-02-28 16:42'
labels: []
dependencies: []
references:
  - .\backlog\assets\pbi-002-mackup.drawio
ordinal: 2000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Setup the project infrastructure according to all ADRs. Establish monorepo structure, build tooling, domain architecture, PWA, plugin system, and workflows. Follow ADR-008, ADR-009, ADR-019, ADR-022, ADR-002, ADR-003, ADR-010, ADR-014, ADR-015, ADR-017. Ensure all critical directories, configs, and dependencies are present. Use Svelte as the main UI framework. Verify setup with dev/build/test commands.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Monorepo directory structure created as per ADR-008 and ADR-019
- [ ] #2 pnpm workspace and package.json configured
- [ ] #3 Vite and TypeScript configs present in gui and shared packages
- [ ] #4 All required npm dependencies installed (Svelte, WebAwesome, Nanostores, OPA, etc.)
- [ ] #5 PWA manifest and service worker implemented
- [ ] #6 i18n files for English and German created
- [ ] #7 Ports & Adapters domain scaffolding exists
- [ ] #8 Docker and CI/CD setup completed
- [ ] #9 Minimal Svelte shell app runs in dev mode
- [ ] #10 Setup verified with dev/build/test commands
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
Phase 1 — Monorepo Foundation (AC #1,#2): 1. pnpm-workspace.yaml + root package.json + .npmrc. 2. Directory structure: ApplicationLogic/src/domains, Infrastructure/src, UserInterface/src, packages/shared/src, plugins/, docker/, scripts/, .github/workflows/. 3. package.json per workspace package (gui, shared).
Phase 2 — TypeScript & Vite Config (AC #3): 4. tsconfig.base.json (strict). 5. Per-package tsconfigs. 6. vite.config.ts with @sveltejs/vite-plugin-svelte, vite-plugin-federation, vite-plugin-pwa, CSS modules, env handling. 7. index.html entry.
Phase 3 — Dependencies (AC #4): 8. GUI: svelte, @webawesome/webawesome, nanostores, @open-policy-agent/opa-wasm, @originjs/vite-plugin-federation, vite-plugin-pwa. 9. Dev: vite, typescript, vitest, @playwright/test, eslint, prettier.
Phase 4 — Code Quality: 10. .editorconfig, eslint.config.js, .prettierrc.
Phase 5 — Test Infrastructure (AC #10 prereq): 11. vitest.config.ts + playwright.config.ts. 12. TDD Red: first failing domain port test. 13. TDD Green: stub implementation.
Phase 6 — PWA (AC #5): 14. public/manifest.webmanifest. 15. vite-plugin-pwa generateSW strategy. 16. SW registration in main.ts.
Phase 7 — i18n (AC #6): 17. src/i18n/en.json + de.json. 18. src/i18n/index.ts (Nanostores store, localStorage).
Phase 8 — Ports & Adapters Scaffolding (AC #7): 19. domains/auth/ports, domains/files/ports, domains/policies/ports + use-cases + access.rego. 20. Infrastructure/src/adapters/ placeholders. 21. packages/shared/src/plugin-contract.ts (Module Federation interface).
Phase 9 — Environment Config (ADR-014): 22. docker/config.js.template (window.ENV). 23. .env.example. 24. scripts/generate-config.sh.
Phase 10 — Docker & CI/CD (AC #8): 25. Dockerfile (multi-stage build→nginx). 26. docker-compose.yml. 27. nginx.conf (SPA routing). 28. .github/workflows/ci.yml (pnpm + submodules + lint + build + test). 29. .github/workflows/docker-build.yml.
Phase 11 — Minimal Svelte Shell (AC #9,#10): 30. src/main.ts (mounts App, registers SW). 31. src/App.svelte (shell + i18n + theme). 32. src/app.css (WebAwesome + CSS tokens). 33. Verify pnpm dev, build, test.
Phase 12 — Documentation (DoD #5-7): 34. Update Architecture doc, User Guide, Admin Guide.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
## Final Directory Structure

```
AIProject/
├── README.md
├── Application/
│   ├── gui/
│   ├── application/
│   └── infrastructure/
├── backlog/

```

## GUI Package Structure
(not necssary for this ticket)
```
├── Application/
│   ├── gui/   # Workspace: main Svelte app (Host/Shell)
    │   ├── package.json
    │   ├── tsconfig.json
    │   ├── vite.config.ts
    │   ├── vitest.config.ts
    │   ├── playwright.config.ts
    │   ├── .env.example
    │   │
    │   ├── public/
    │   │   ├── manifest.webmanifest     # PWA manifest
    │   │   ├── service-worker.js        # PWA service worker
    │   │   ├── icons/ (icon-192x192.png, icon-512x512.png, favicon.ico)
    │   │   └── locales/ (en.json, de.json)
    │   │
    │   ├── src/
    │   │   ├── main.ts
    │   │   ├── App.svelte
    │   │   ├── app.css
    │   │   │
    │   │   ├── aspects/
    |   │   │    └── auth/
    |   │   │         ├── ports/ (authentication.port.ts, identity-provider.port.ts)
    |   │   │         ├── adapters/ (oidc-client.adapter.ts, http-auth-controller.adapter.ts)
    |   │   │         ├── use-cases/ (login, logout, refresh-token)
    |   │   │         └── store/ (auth.store.ts)
    │   │   ├── application/                 # Domain-driven (Ports & Adapters)
    │   │   │   ├── core/
    │   │   │       ├── ports/ (policy-engine.port.ts)
    │   │   │       ├── policies
    │   │   │       └── use-cases/ 
    │   │   ├── plugin/               # Plugin management domain
    │   │   │    ├── ports/ (plugin-loader.port.ts)
    │   │   │    ├── use-cases/ (load-plugin, unload-plugin)
    │   │   │    └── store/ (plugins.store.ts)
    │   │   ├── infrastructure/ 
    |   │   │    └──  files/
    |   │   │         ├── adapters/ (cloud-storage.adapter.ts)
    |   │   │         ├── store/ (files.store.ts)
    |   │   │         └── components/
    │   │   ├── shared/                  # Shared across domains
    │   │   │   ├── components/ (WebAwesome components, reusable UI)
    │   │   │   ├── layouts/
    │   │   │   ├── services/
    │   │   │   └── config/
    │   │   │       ├── env.config.ts    # 12-Factor Principle
    │   │   │       ├── feature-flags.ts
    │   │   │       └── constants.ts
    │   │   ├── pages/                   # Page components
    │   │   │   ├── Home.svelte
    │   │   │   ├── About.svelte
    │   │   │   ├── Settings.svelte
    │   │   │   └── NotFound.svelte
    │   │   │
    │   │   ├── routes/ (+page.svelte, auth/, files/, settings/)
    │   │   ├── lib/ (i18n.ts)
    │   │   └── styles/ (design-tokens.css, themes.css, globals.css)
    │   │
    │   ├── tests/
    │   │   ├── unit/domains/
    │   │   ├── integration/
    │   │   └── e2e/features/ (auth.feature)
    │   │
    │   └── dist/
```

## Plugins & Infrastructure
not necessary for this ticket
```
├── Application/plugins                         # Workspace: plugin development
│   ├── example-plugin/
│   │   ├── package.json
│   │   ├── vite.config.ts          # Module Federation for remote
│   │   ├── src/
│   │   │   ├── remote-entry.ts
│   │   │   └── Plugin.svelte
│   │   └── dist/
│   │
│   └── manifest.json               # Local registry of available plugins
│
├── infrastructure/
│   ├── docker/ (Dockerfile, docker-compose.yml, nginx.conf)
│   ├── kubernetes/
│   └── scripts/ (build.sh, dev.sh, test.sh, lint.sh, deploy.sh)
│
├── backlog/ (tasks/, decisions/, docs/, completed/, config.yml)
├── Architecture/ (arc42 template docs)
├── Guides/ (User/Admin guides)
├── DesignSystem/ (tokens/, components/)
└── .gitignore
```

## Key Implementation Notes

**Architecture Alignment:**
- Monorepo (ADR-008): Three workspace packages - shared/, gui/, plugins/
- Ports & Adapters (ADR-019): Each domain has ports/, adapters/, use-cases/
- Plugin System (ADR-022): Module Federation via vite.config.ts
- PWA (ADR-002): Service worker, manifest, icons in gui/public/
- i18n (ADR-015): en.json and de.json in public/locales/
- Design System (ADR-011, 012): Tokens in gui/src/styles
- Config (ADR-014): .env.example and env.config.ts (12-Factor)
- Build (ADR-009): vite.config.ts in gui/ and root
- Testing: Unit, integration, BDD features in gui/tests/
<!-- SECTION:NOTES:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Unit Tests written
- [ ] #2 Code reviewed
- [ ] #3 Unit Tests pass
- [ ] #4 ATDD / BDD scenarios pass
- [ ] #5 Documentation updated
- [ ] #6 User Guide updated
- [ ] #7 Admin Guide updated
- [ ] #8 No regressions introduced
<!-- DOD:END -->
