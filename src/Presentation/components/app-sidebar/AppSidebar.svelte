<script lang="ts">
  /**
   * AppSidebar – Vertical icon navigation sidebar.
   *
   * Renders a 64px-wide left sidebar with icon+label navigation buttons (AC #7, #8).
   * Active item is highlighted with an accent-color left border (AC #9).
   * Uses glassmorphism consistent with the header (AC #10).
   * Collapses on small screens via CSS media query (AC #11).
   *
   * Accessibility:
   * - Uses semantic <aside> element (AC #24)
   * - aria-current="true" marks the active item (AC #25)
   * - Buttons have descriptive aria-label values (AC #23)
   */
  import { SidebarItem } from "../../../Application/navigation/SidebarItem.js";
  import type { INavigationPort } from "../../../Application/ports/INavigationPort.js";
  import styles from "./AppSidebar.module.css";

  /** Icon name and label for each sidebar navigation item. */
  interface SidebarNavItem {
    readonly item: SidebarItem;
    readonly icon: string;
    readonly label: string;
  }

  const SIDEBAR_NAV_ITEMS: readonly SidebarNavItem[] = [
    { item: SidebarItem.IMINT, icon: "layer-group", label: "IMINT" },
    { item: SidebarItem.SIGINT, icon: "tower-broadcast", label: "SIGINT" },
  ] as const;

  interface Props {
    /** Navigation port injected by the parent shell. */
    navigationPort: INavigationPort;
    /** Optional CSS class applied to the sidebar root element. */
    class?: string;
  }

  const { navigationPort, class: className }: Props = $props();

  let activeSidebarItem = $state<SidebarItem>(SidebarItem.IMINT);

  // $effect syncs state with the navigation port and returns unsubscribe
  // as the cleanup function, which Svelte calls on destroy.
  $effect(() => {
    activeSidebarItem = navigationPort.getActiveSidebarItem();
    return navigationPort.subscribe(() => {
      activeSidebarItem = navigationPort.getActiveSidebarItem();
    });
  });

  /** Handle sidebar item selection. */
  function handleItemClick(item: SidebarItem): void {
    navigationPort.setActiveSidebarItem(item);
  }
</script>

<aside
  class={`${styles.sidebar} ${className || ""}`.trim()}
  aria-label="Module navigation"
>
  <div class={styles.sidebar__logo} aria-hidden="true">
    <wa-icon name="compass" class={styles["sidebar__logo-icon"]}></wa-icon>
  </div>

  <nav
    class={styles.sidebar__nav}
    aria-label="Intelligence discipline navigation"
  >
    {#each SIDEBAR_NAV_ITEMS as { item, icon, label }}
      <wa-tooltip content={label} placement="right">
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <wa-button
          class="{styles['sidebar__item']} {activeSidebarItem === item
            ? styles['sidebar__item--active']
            : ''}"
          appearance="plain"
          aria-label="{label} module"
          aria-current={activeSidebarItem === item ? "true" : "false"}
          onclick={() => handleItemClick(item)}
        >
          <wa-icon name={icon} aria-hidden="true"></wa-icon>
          <span class={styles["sidebar__item-label"]}>{label}</span>
        </wa-button>
      </wa-tooltip>
    {/each}
  </nav>
</aside>
