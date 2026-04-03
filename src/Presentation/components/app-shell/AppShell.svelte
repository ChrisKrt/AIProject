<script lang="ts">
  /**
   * AppShell – Root application shell component.
   *
   * Composes all structural shell components:
   * - <AppHeader> – Global navigation header
   * - <AppSidebar> – Vertical icon navigation sidebar
   * - <MainLayout> – Three-section content layout
   * - <BottomStatusBar> – System status footer
   *
   * Bootstraps the navigation state (NavigationState + NavigationAdapter),
   * injects the navigation port into child components, and initializes the
   * active theme from the design token theme-switcher.
   *
   * The shell renders a full-screen background using a CSS gradient to meet
   * offline requirements (ADR-001) without depending on external image URLs.
   *
   * Accessibility:
   * - Region changes are announced via aria-live regions in child components (AC #25)
   * - Semantic elements: header, aside, main, footer (AC #24)
   */
  import { onDestroy } from "svelte";
  import { NavigationState } from "../../../Application/navigation/NavigationState.js";
  import { NavigationAdapter } from "../../../Infrastructure/navigation/NavigationAdapter.js";
  import AppHeader from "../app-header/AppHeader.svelte";
  import AppSidebar from "../app-sidebar/AppSidebar.svelte";
  import MainLayout from "../main-layout/MainLayout.svelte";
  import BottomStatusBar from "../bottom-status-bar/BottomStatusBar.svelte";
  import styles from "./AppShell.module.css";

  const navigationState = new NavigationState();
  const navigationAdapter = new NavigationAdapter(navigationState);
  const navigationPort = navigationAdapter.getPort();

  // Release BroadcastChannel resources when the shell is unmounted.
  onDestroy(() => navigationAdapter.dispose());
</script>

<div class={styles.shell}>
  <AppHeader {navigationPort} class={styles.shell__header} />

  <div class={styles.shell__body}>
    <AppSidebar {navigationPort} />
    <MainLayout />
  </div>

  <BottomStatusBar class={styles.shell__status} />
</div>
