<script lang="ts">
  /**
   * BottomStatusBar – Application status bar component.
   *
   * Renders a fixed bottom footer displaying:
   * - Current geo-coordinates from the map viewport (PBI-006, AC #10)
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

  let unsubscribe: (() => void) | null = null;

  onMount(() => {
    if (!mapPort) return;

    const vp = mapPort.getViewport();
    lng = vp.center[0];
    lat = vp.center[1];

    unsubscribe = mapPort.subscribe(() => {
      const updated = mapPort.getViewport();
      lng = updated.center[0];
      lat = updated.center[1];
    });
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
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
