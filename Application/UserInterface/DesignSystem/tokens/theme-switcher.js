/**
 * Theme Switcher – Runtime theme management for the Bundeswehr Design Token System.
 *
 * Provides methods to switch between the four operational themes,
 * persist the user's selection, and detect the active theme.
 *
 * Available themes:
 *   - bundeswehr-heer  (Olivgrün/Braun – Standard)
 *   - marine           (Marineblau/Stahlgrau)
 *   - wueste           (Wüstensand/Terrakotta)
 *   - arktis           (Eisblau/Schnee)
 */

const VALID_THEMES = [
  "bundeswehr-heer",
  "marine",
  "wueste",
  "arktis",
];

const STORAGE_KEY = "bw-app-theme";
const DEFAULT_THEME = "bundeswehr-heer";

/**
 * Set the active theme on the document root element.
 *
 * @param {string} themeId - One of the valid theme identifiers.
 * @param {object} [options] - Optional settings.
 * @param {boolean} [options.persist=true] - Store the selection in localStorage.
 * @throws {Error} If the provided themeId is not a valid theme.
 */
function setTheme(themeId, options = { persist: true }) {
  if (!VALID_THEMES.includes(themeId)) {
    throw new Error(
      `Unknown theme "${themeId}". Valid themes: ${VALID_THEMES.join(", ")}`
    );
  }

  document.documentElement.setAttribute("data-theme", themeId);

  if (options.persist) {
    try {
      localStorage.setItem(STORAGE_KEY, themeId);
    } catch {
      // localStorage may be unavailable (e.g., private browsing)
    }
  }
}

/**
 * Get the currently active theme identifier.
 *
 * @returns {string} The active theme ID, or the default if none is set.
 */
function getTheme() {
  return (
    document.documentElement.getAttribute("data-theme") || DEFAULT_THEME
  );
}

/**
 * Return the list of all valid theme identifiers.
 *
 * @returns {string[]} Array of theme IDs.
 */
function getAvailableThemes() {
  return [...VALID_THEMES];
}

/**
 * Initialize the theme from persisted storage, falling back to the default.
 * Call this function once when the application starts.
 */
function initTheme() {
  let stored = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    // localStorage unavailable
  }

  const theme =
    stored && VALID_THEMES.includes(stored) ? stored : DEFAULT_THEME;
  setTheme(theme, { persist: false });
}

export const ThemeSwitcher = {
  setTheme,
  getTheme,
  getAvailableThemes,
  initTheme,
  VALID_THEMES,
  DEFAULT_THEME,
};
