/**
 * Type declarations for the Bundeswehr theme-switcher module.
 */

/** Available Bundeswehr operational theme identifiers. */
export type ThemeId = "bundeswehr-heer" | "marine" | "wueste" | "arktis";

/** Options accepted by {@link ThemeSwitcher.setTheme}. */
export interface SetThemeOptions {
  /** Whether to persist the selection to localStorage. Defaults to true. */
  persist?: boolean;
}

export declare const ThemeSwitcher: {
  /**
   * Set the active theme on the document root element.
   * @throws {Error} If themeId is not a valid theme.
   */
  setTheme(themeId: ThemeId, options?: SetThemeOptions): void;

  /** Return the currently active theme ID. */
  getTheme(): ThemeId;

  /** Return all valid theme identifiers. */
  getAvailableThemes(): ThemeId[];

  /**
   * Initialize the theme from localStorage persistence, falling back to
   * the default theme. Call once on application startup.
   */
  initTheme(): void;

  readonly VALID_THEMES: readonly ThemeId[];
  readonly DEFAULT_THEME: ThemeId;
};
