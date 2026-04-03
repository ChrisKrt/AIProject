<script lang="ts">
  /**
   * MainLayout – Three-section main content layout.
   *
   * Implements the three-section layout: left panel, center view, right panel
   * (AC #12). Uses Svelte snippets for named slot regions.
   *
   * Sections:
   * - Left panel: 256px – OBJ_DETECTION live feed (AC #13)
   * - Center: flex-1 – main content area (AC #14)
   * - Right panel: 288px – optional metadata panel (AC #12)
   *
   * All panels use liquid glass design (AC #15).
   * The center content area shows the dot-grid background pattern (AC #16).
   *
   * Accessibility:
   * - Uses semantic <main> element (AC #24)
   * - Regions labelled with aria-label for screen readers (AC #25)
   */
  import type { Snippet } from "svelte";
  import styles from "./MainLayout.module.css";

  interface Props {
    /** Optional content for the left OBJ_DETECTION panel. */
    left?: Snippet;
    /** Optional content for the center intelligence visualization area. */
    children?: Snippet;
    /** Optional content for the right METADATA_STREAM panel. */
    right?: Snippet;
    /** Optional CSS class applied to the layout root element. */
    class?: string;
  }

  const { left, children, right, class: className }: Props = $props();
</script>

<div class={`${styles.layout} ${className || ""}`.trim()}>
  <main class={styles.layout__main} aria-label="Main content">
    <!-- Left panel: (AC #13) -->
    <section
      class={styles.layout__left}
      aria-label="Left panel"
      aria-live="polite"
      aria-atomic="false"
    >
      <div class={styles["layout__left-header"]}>
        <h2 class={styles["layout__left-title"]}>LEFT PANEL</h2>
      </div>
      <div class={styles["layout__left-content"]}>
        {#if left}{@render left()}{/if}
      </div>
    </section>

    <!-- Center: main intelligence visualization area (AC #14) -->
    <section
      class={styles.layout__center}
      aria-label="Intelligence visualization"
    >
      <div class={styles["layout__center-grid"]} aria-hidden="true"></div>
      <div class={styles["layout__center-content"]}>
        {#if children}{@render children()}{/if}
      </div>
    </section>

    <!-- Right panel: metadata / telemetry (AC #12) -->
    <section class={styles.layout__right} aria-label="Right panel">
      <div class={styles["layout__right-header"]}>
        <h2 class={styles["layout__right-title"]}>RIGHT PANEL</h2>
      </div>
      <div class={styles["layout__right-content"]}>
        {#if right}{@render right()}{/if}
      </div>
    </section>
  </main>
</div>
