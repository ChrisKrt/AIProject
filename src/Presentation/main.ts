/**
 * main.ts – Application entry point.
 *
 * Initializes the Bundeswehr design token theme and mounts the root
 * AppShell Svelte component. The theme-switcher reads from localStorage to
 * restore the last-used theme, or defaults to "marine".
 *
 * Global design-system CSS (tokens + themes) is imported here so that
 * CSS custom properties are available to all components (ADR-012).
 *
 * WebAwesome web components are registered here once for the entire app
 * (ADR-010). Only the components actually used are imported (tree-shaking).
 */
import { mount } from "svelte";
import { ThemeSwitcher } from "./DesignSystem/tokens/theme-switcher.js";
import "./DesignSystem/tokens/index.css";
// WebAwesome base stylesheet + default theme (ADR-010)
import "@awesome.me/webawesome/dist/styles/webawesome.css";
import "@awesome.me/webawesome/dist/styles/themes/default.css";
// Register only the WebAwesome components used in the shell
import "@awesome.me/webawesome/dist/components/button/button.js";
import "@awesome.me/webawesome/dist/components/icon/icon.js";
import "@awesome.me/webawesome/dist/components/input/input.js";
import "@awesome.me/webawesome/dist/components/badge/badge.js";
import "@awesome.me/webawesome/dist/components/tooltip/tooltip.js";
import AppShell from "./components/app-shell/AppShell.svelte";

// Initialize the theme from persisted preference or OS default.
// Sets data-theme on document.documentElement before the shell renders,
// preventing flash of unstyled content.
ThemeSwitcher.initTheme();

mount(AppShell, { target: document.getElementById("app")! });


