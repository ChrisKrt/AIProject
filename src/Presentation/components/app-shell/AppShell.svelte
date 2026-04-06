<script lang="ts">
  /**
   * AppShell – Root application shell component.
   *
   * Composes all structural shell components:
   * - <AppHeader> – Global navigation header
   * - <AppSidebar> – Vertical icon navigation sidebar
   * - <MainLayout> – Three-section content layout (receives mapPort, mapTileUrl)
   * - <BottomStatusBar> – System status footer (receives mapPort)
   *
   * Acts as the composition root: all environment-variable configuration is read
   * here and injected into child components as props (12-Factor App, ADR-014).
   *
   * Accessibility:
   * - Region changes are announced via aria-live regions in child components (AC #25)
   * - Semantic elements: header, aside, main, footer (AC #24)
   */
  import { onDestroy } from 'svelte';
  import { NavigationState } from '../../../Application/navigation/NavigationState.js';
  import { NavigationAdapter } from '../../../Infrastructure/navigation/NavigationAdapter.js';
  import { MapState } from '../../../Application/map/MapState.js';
  import { MapLibreAdapter } from '../../../Infrastructure/map/MapLibreAdapter.js';
  import type { MapViewport } from '../../../Application/map/MapViewport.js';
  import AppHeader from '../app-header/AppHeader.svelte';
  import AppSidebar from '../app-sidebar/AppSidebar.svelte';
  import MainLayout from '../main-layout/MainLayout.svelte';
  import BottomStatusBar from '../bottom-status-bar/BottomStatusBar.svelte';
  import styles from './AppShell.module.css';

  /** Read initial map viewport from environment variables (ADR-014). */
  function readInitialViewport(): MapViewport {
    const lng = Number(import.meta.env['VITE_MAP_DEFAULT_LNG'] ?? 9);
    const lat = Number(import.meta.env['VITE_MAP_DEFAULT_LAT'] ?? 51);
    const zoom = Number(import.meta.env['VITE_MAP_DEFAULT_ZOOM'] ?? 5);
    return { center: [lng, lat], zoom, bearing: 0, pitch: 0 };
  }

  /** Resolve the map tile style URL from environment variables and OS preference (ADR-014). */
  function resolveMapTileUrl(): string {
    const darkUrl =
      import.meta.env['VITE_MAP_TILE_URL_DARK'] ??
      'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';
    const lightUrl =
      import.meta.env['VITE_MAP_TILE_URL_LIGHT'] ??
      'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
    try {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? darkUrl : lightUrl;
    } catch {
      return darkUrl;
    }
  }

  const navigationState = new NavigationState();
  const navigationAdapter = new NavigationAdapter(navigationState);
  const navigationPort = navigationAdapter.getPort();

  const mapState = new MapState(readInitialViewport());
  const mapAdapter = new MapLibreAdapter(mapState);
  const mapTileUrl = resolveMapTileUrl();

  onDestroy(() => {
    navigationAdapter.dispose();
    mapAdapter.disposeMap();
  });
</script>

<div class={styles.shell}>
  <AppHeader {navigationPort} class={styles.shell__header} />

  <div class={styles.shell__body}>
    <AppSidebar {navigationPort} />
    <MainLayout mapPort={mapAdapter} {mapTileUrl} />
  </div>

  <BottomStatusBar mapPort={mapAdapter} class={styles.shell__status} />
</div>
