<script lang="ts">
  /**
   * MapView – Geographic intelligence map component.
   *
   * Renders the MapLibre GL map by delegating mount/dispose lifecycle to the
   * provided IMapPort adapter. The component never imports maplibre-gl directly;
   * all map interactions happen through the port (Ports & Adapters, ADR-019).
   *
   * Accessibility:
   * - Container carries aria-label="Tactical Map" and role="application" (AC #9)
   * - Focus outlines on map controls via CSS tokens (AC #18)
   */
  import { onMount, onDestroy } from 'svelte';
  import type { IMapPort } from '../../../Application/ports/IMapPort.js';
  import styles from './MapView.module.css';

  interface Props {
    /** The map port / adapter that handles mounting and state. */
    mapPort: IMapPort;
    /** Optional tile style URL. Defaults to dark/light theme from env or media query. */
    styleUrl?: string;
  }

  const { mapPort, styleUrl }: Props = $props();

  let containerEl: HTMLElement | undefined = $state();

  /** Resolve the tile style URL: prop > env var > media query. */
  function resolveStyleUrl(): string {
    if (styleUrl) return styleUrl;

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

  onMount(() => {
    if (containerEl) {
      mapPort.mountMap(containerEl, resolveStyleUrl());
    }
  });

  onDestroy(() => {
    mapPort.disposeMap();
  });
</script>

<div class={styles.map} aria-label="Tactical Map" role="application">
  <div class={styles.map__container} bind:this={containerEl}></div>
</div>
