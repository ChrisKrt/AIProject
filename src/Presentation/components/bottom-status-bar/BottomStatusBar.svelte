<script lang="ts">
  /**
   * BottomStatusBar – Application status bar component.
   *
   * Renders a fixed bottom footer displaying:
   * - Current geo-coordinates from the map viewport (PBI-006, AC #10)
   *   When the cursor is over the map the coordinates show the cursor position;
   *   when the cursor is outside the map they show the viewport center.
   * - Encryption status
   * - System terminal shortcut
   * - System metrics: uplink status, latency, signal bars
   *
   * Uses Source Code Pro (monospace) for all data values.
   *
   * Accessibility:
   * - Uses semantic <footer> element (AC #24)
   * - Status regions carry appropriate ARIA roles
   */
  import { onMount, onDestroy } from 'svelte';
  import type { IMapPort } from '../../../Application/ports/IMapPort.js';
  import styles from './BottomStatusBar.module.css';

  interface Props {
    /** Optional CSS class applied to the footer root element. */
    class?: string;
    /** Map port for displaying current coordinates (PBI-006). */
    mapPort?: IMapPort;
  }

  const { class: className, mapPort }: Props = $props();

  let lng = $state(0);
  let lat = $state(0);

  /** Format a longitude value with correct hemisphere suffix. */
  function formatLng(value: number): string {
    return `${Math.abs(value).toFixed(4)}° ${value >= 0 ? 'E' : 'W'}`;
  }

  /** Format a latitude value with correct hemisphere suffix. */
  function formatLat(value: number): string {
    return `${Math.abs(value).toFixed(4)}° ${value >= 0 ? 'N' : 'S'}`;
  }

  let unsubscribeViewport: (() => void) | null = null;
  let unsubscribeMouseMove: (() => void) | null = null;

  /** Sync displayed coordinates from mouse position (preferred) or viewport center. */
  function syncCoords(): void {
    if (!mapPort) return;
    const mouse = mapPort.getMousePosition();
    if (mouse) {
      lng = mouse[0];
      lat = mouse[1];
    } else {
      const vp = mapPort.getViewport();
      lng = vp.center[0];
      lat = vp.center[1];
    }
  }

  onMount(() => {
    if (!mapPort) return;

    syncCoords();

    unsubscribeViewport = mapPort.subscribe(() => {
      syncCoords();
    });

    unsubscribeMouseMove = mapPort.subscribeMouseMove(() => {
      syncCoords();
    });
  });

  onDestroy(() => {
    if (unsubscribeViewport) {
      unsubscribeViewport();
      unsubscribeViewport = null;
    }
    if (unsubscribeMouseMove) {
      unsubscribeMouseMove();
      unsubscribeMouseMove = null;
    }
  });
</script>

<footer
  aria-label="System status bar"
  class={`${styles.footer} ${className || ''}`.trim()}
>
  {#if mapPort}
    <span aria-label="Coordinates" aria-live="polite" class={styles.footer__coords}>
      {formatLng(lng)}, {formatLat(lat)}
    </span>
  {/if}
</footer>
