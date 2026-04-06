<script lang="ts">
  /**
   * AppShell – Root application shell component.
   *
   * Composes all structural shell components:
   * - <AppHeader> – Global navigation header
   * - <AppSidebar> – Vertical icon navigation sidebar
   * - <MainLayout> – Three-section content layout (receives mapPort)
   * - <BottomStatusBar> – System status footer (receives mapPort)
   *
   * Bootstraps navigation state (NavigationState + NavigationAdapter) and map
   * state (MapState + MapLibreAdapter), injects ports into child components,
   * and initialises the active theme from the design token theme-switcher.
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
  import AppHeader from '../app-header/AppHeader.svelte';
  import AppSidebar from '../app-sidebar/AppSidebar.svelte';
  import MainLayout from '../main-layout/MainLayout.svelte';
  import BottomStatusBar from '../bottom-status-bar/BottomStatusBar.svelte';
  import styles from './AppShell.module.css';

  const navigationState = new NavigationState();
  const navigationAdapter = new NavigationAdapter(navigationState);
  const navigationPort = navigationAdapter.getPort();

  const mapState = new MapState();
  const mapAdapter = new MapLibreAdapter(mapState);

  onDestroy(() => {
    navigationAdapter.dispose();
    mapAdapter.disposeMap();
  });
</script>

<div class={styles.shell}>
  <AppHeader {navigationPort} class={styles.shell__header} />

  <div class={styles.shell__body}>
    <AppSidebar {navigationPort} />
    <MainLayout mapPort={mapAdapter} />
  </div>

  <BottomStatusBar mapPort={mapAdapter} class={styles.shell__status} />
</div>
