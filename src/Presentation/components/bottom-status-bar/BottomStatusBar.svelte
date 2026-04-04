<script lang="ts">
  /**
   * BottomStatusBar – Application status bar component.
   *
   * Renders a fixed bottom footer displaying:
   * - Current geo-coordinates
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
  import styles from "./BottomStatusBar.module.css";

  interface Props {
    /** Optional CSS class applied to the footer root element. */
    class?: string;
  }

  const { class: className }: Props = $props();
</script>

<footer
  aria-label="System status bar"
  class={`${styles.footer} ${className || ""}`.trim()}
>
  <!-- Status bar content removed as requested -->
</footer>
