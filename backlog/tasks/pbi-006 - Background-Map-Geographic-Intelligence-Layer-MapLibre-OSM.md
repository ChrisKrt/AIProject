---
id: PBI-006
title: Background Map - Geographic Intelligence Layer (MapLibre/OSM)
status: Refinement
assignee: []
created_date: '2026-04-06 15:26'
updated_date: '2026-04-06 15:50'
labels:
  - User Story
dependencies: []
references:
  - backlog/assets/PBI-006.feature
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
As a **tactical operator** using the SILENT SENTINEL intelligence analysis platform, I want an **interactive geographic background map** in the main content area so that **I can visualize and correlate intelligence data with real-world geographic context in real time**.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 MapLibre GL map renders in the center section of the main layout
- [ ] #2 OpenStreetMap raster tiles are used as the default background map layer
- [ ] #3 Dark map style (CARTO Dark Matter or equivalent) is applied when the application dark theme is active; a light style (CARTO Positron) when the light theme is active
- [ ] #4 Map pan interaction is supported (click+drag on desktop, touch-drag on mobile)
- [ ] #5 Map zoom interaction is supported (mouse wheel, pinch-to-zoom, double-click)
- [ ] #6 Keyboard navigation: arrow keys pan the map, + and - keys adjust zoom level
- [ ] #7 Zoom-in/out and north-reset control buttons are displayed with 0px border-radius, styled with design tokens
- [ ] #8 Map UI controls use the Bundeswehr Marine color palette (Primary #3D5F96, Accent #3B82F6)
- [ ] #9 Map container has aria-label='Tactical Map' and role='application' for screen reader support
- [ ] #10 Current map center coordinates (latitude/longitude) are displayed in the BottomStatusBar
- [ ] #11 Map initializes at Central Europe default center (9 degrees E, 51 degrees N) and zoom level 5, overridable via environment variable
- [ ] #12 Map viewport state (center, zoom, bearing, pitch) is managed as a reactive signal via IMapPort
- [ ] #13 Map viewport changes are broadcast across all open browser tabs via BroadcastChannel API (ADR-023)
- [ ] #14 OSM tile requests are cached by the PWA Service Worker so that the map works offline after first load (ADR-001)
- [ ] #15 Map fills the full available center content area and is responsive across all viewports (375px to 1920px)
- [ ] #16 Map rendering uses 0px border-radius consistent with the application design system (ADR-012)
- [ ] #17 Map attribution text '© OpenStreetMap contributors' is visibly displayed in the bottom-right corner of the map
- [ ] #18 Focus outline is visible on all map control buttons for keyboard navigation (WCAG AA)
- [ ] #19 Map renders performantly: initial tile load FCP under 2s, pan and zoom transitions under 100ms (QR-4)
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
### Phase 1 - Domain Model (Application Layer)
- src/Application/map/MapViewport.ts - value object: center [lng, lat], zoom, bearing, pitch
- src/Application/map/MapState.ts - reactive signal state (subscribe/notify), mirrors NavigationState pattern
- src/Application/ports/IMapPort.ts - inbound port interface: getViewport(), setViewport(MapViewport), flyTo(MapViewport)
- src/Application/map/MapState.spec.ts - unit tests for MapState

### Phase 2 - Infrastructure Adapter
- src/Infrastructure/map/MapLibreAdapter.ts - wraps maplibre-gl instance, implements IMapPort, syncs viewport via BroadcastChannel (ADR-023)
- Add maplibre-gl to package.json as dependency

### Phase 3 - Presentation Component
- src/Presentation/components/map-view/MapView.svelte - Svelte 5 component: mounts MapLibre GL map into a div, binds to IMapPort
- src/Presentation/components/map-view/MapView.module.css - fills full center section, 0px border-radius
- src/Presentation/components/map-view/MapView.spec.ts - Vitest unit tests (maplibre-gl mocked)

### Phase 4 - Shell Integration
- Wire MapView into MainLayout.svelte center section
- Pass IMapPort via prop/context injection
- Expose current viewport coordinates to BottomStatusBar via MapState signal reactive subscription

### Phase 5 - Tile Style and Theme Integration
- Dark style: CARTO Dark Matter (no API key required)
- Light style: CARTO Positron (no API key required)
- Tile URL configurable via environment variable VITE_MAP_TILE_URL (ADR-014)
- Theme switch triggered by design token / OS preference (ADR-011)

### Phase 6 - Offline Tile Caching (PWA)
- Update vite.config.ts PWA runtimeCaching: CacheFirst strategy for OSM tile requests
- Cache name: osm-tiles (ADR-001)

### Phase 7 - Tests
- Unit tests: MapState, MapLibreAdapter (maplibre-gl mocked), MapViewport value object
- backlog/assets/PBI-006.feature - Gherkin ATDD scenarios covering all ACs
- Playwright E2E tests: map render, pan, zoom, keyboard navigation, coordinate display in status bar
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
**Constraints and Architectural Decisions:**
- Follow ADRs: ADR-001 (offline-first), ADR-003 (Client-Side Rendering), ADR-009 (Vite), ADR-011 (Light/Dark Mode), ADR-012 (Bundeswehr Design System), ADR-014 (env config), ADR-019 (Ports and Adapters), ADR-023 (BroadcastChannel)
- maplibre-gl usage must be entirely encapsulated in MapLibreAdapter.ts (single third-party file rule)
- All maplibre-gl calls must be wrapped in try-catch blocks
- IMapPort follows the same inbound port pattern as INavigationPort
- MapState follows the same reactive signal pattern as NavigationState
- Default tile URLs: CARTO Dark Matter for dark theme, CARTO Positron for light theme (no API key required, attribution required)
- For classified/air-gapped networks: configure VITE_MAP_TILE_URL to point to a self-hosted tile server

**Environment Variables:**
- VITE_MAP_TILE_URL_DARK - tile style URL for dark theme (default: CARTO Dark Matter)
- VITE_MAP_TILE_URL_LIGHT - tile style URL for light theme (default: CARTO Positron)
- VITE_MAP_DEFAULT_LNG - default center longitude (default: 9)
- VITE_MAP_DEFAULT_LAT - default center latitude (default: 51)
- VITE_MAP_DEFAULT_ZOOM - default zoom level (default: 5)
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
