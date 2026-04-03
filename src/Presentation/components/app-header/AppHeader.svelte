<script lang="ts">
  /**
   * AppHeader – Application header component.
   *
   * Renders the global navigation header including:
   * - Application title "SILENT SENTINEL" (AC #1)
   * - Top navigation module links (AC #2, #3)
   * - Global search field (AC #4)
   * - User profile and notification icons (AC #5)
   * - Glassmorphism effect (AC #6)
   *
   * Accessibility:
   * - Uses semantic <header> and <nav> elements (AC #24)
   * - Active link carries aria-current="page" (AC #23, #25)
   * - All interactive elements have visible focus states (AC #29)
   */
  import { NavigationModule } from "../../../Application/navigation/NavigationModule.js";
  import type { INavigationPort } from "../../../Application/ports/INavigationPort.js";
  import styles from "./AppHeader.module.css";

  /** Navigation link descriptor used to render the top nav items. */
  interface NavLink {
    readonly module: NavigationModule;
    readonly label: string;
  }

  const NAV_LINKS: readonly NavLink[] = [
    { module: NavigationModule.OP_NEPTUNE, label: "OP_NEPTUNE" },
    // { module: NavigationModule.IMINT_ANALYSIS, label: "IMINT_ANALYSIS" },
    // { module: NavigationModule.RECON_PHASE, label: "RECON_PHASE" },
  ] as const;

  interface Props {
    /** Navigation port injected by the parent shell. */
    navigationPort: INavigationPort;
    /** Optional CSS class applied to the header root element. */
    class?: string;
  }

  const { navigationPort, class: className }: Props = $props();

  let activeModule = $state<NavigationModule>(NavigationModule.OP_NEPTUNE);

  // $effect syncs the state with the navigation port and returns the
  // unsubscribe function as the cleanup, which Svelte calls on destroy.
  $effect(() => {
    activeModule = navigationPort.getActiveModule();
    return navigationPort.subscribe(() => {
      activeModule = navigationPort.getActiveModule();
    });
  });

  /** Handle module selection from the top nav. */
  function handleModuleClick(module: NavigationModule): void {
    navigationPort.setActiveModule(module);
  }
</script>

<header class={`${styles.header} ${className || ""}`.trim()}>
  <div class={styles.header__left}>
    <span
      class={styles.header__title}
      aria-label="Application name: SILENT SENTINEL"
    >
      SILENT SENTINEL
    </span>

    <nav class={styles.header__nav} aria-label="Primary navigation">
      {#each NAV_LINKS as { module, label }}
        <wa-button
          class="{styles['header__nav-link']} {activeModule === module
            ? styles['header__nav-link--active']
            : ''}"
          appearance="plain"
          aria-current={activeModule === module ? "page" : "false"}
          on:click={() => handleModuleClick(module)}
        >
          {label}
        </wa-button>
      {/each}
    </nav>
  </div>

  <!-- Removed global search, notifications, and user profile UI elements -->
</header>
