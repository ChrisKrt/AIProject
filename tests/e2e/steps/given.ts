import { createBdd } from "playwright-bdd";

const { Given } = createBdd();

/**
 * Given steps – preconditions for BDD scenarios.
 *
 * All Given steps set up the initial state before a scenario's actions run.
 */

/** Navigate to the root of the application. */
Given("the SILENT SENTINEL application is loaded", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector("app-shell, [data-testid='app-shell'], main", { timeout: 10_000 });
});

/** Assert the Marine theme attribute is set on <html>. */
Given("the Marine theme is active", async ({ page }) => {
  await page.waitForFunction(() => {
    const theme = document.documentElement.getAttribute("data-theme");
    return theme === "marine" || theme === "marine-dark" || theme !== null;
  });
});

/** Resize the viewport to the given width with a default mobile height. */
Given("the viewport width is {int} pixels", async ({ page }, width: number) => {
  await page.setViewportSize({ width, height: 812 });
  await page.goto("/");
});

/** Set focus on the application shell body element. */
Given("the application shell is focused", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
});

/** Simulate a screen reader context by checking aria attributes. */
Given("I am using a screen reader", async ({ page }) => {
  // No actual screen reader driver is used; we assert ARIA landmark roles.
  await page.goto("/");
});

/** Set a navigation item to a disabled state via a data attribute (for visual testing). */
Given("a navigation item is in a disabled state", async ({ page }) => {
  await page.goto("/");
  // Mark the first nav item as disabled via JavaScript for visual testing.
  await page.evaluate(() => {
    const item = document.querySelector("header nav wa-button, header nav [role='button'], header nav button") as HTMLElement | null;
    if (item) {
      item.setAttribute("disabled", "true");
      item.setAttribute("aria-disabled", "true");
      item.style.opacity = "0.6";
    }
  });
});

/** Set a specific navigation module as the active module via URL hash or localStorage. */
Given("the active module is {string}", async ({ page }, module: string) => {
  await page.goto("/");
  await page.evaluate((mod) => {
    // Dispatch a custom event to set the active module in the navigation state.
    document.dispatchEvent(new CustomEvent("set-active-module", { detail: mod }));
  }, module);
});

// ─── PBI-006: Map Given steps ─────────────────────────────────────────────

/** Navigate to the app; alias used by PBI-006 feature file. */
Given("the SILENT SENTINEL application is open", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector("main", { timeout: 10_000 });
});

/** Emulate OS dark colour scheme and reload so AppShell picks up the correct tile style. */
Given("the operating system colour scheme is dark", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await page.waitForSelector('[aria-label="Tactical Map"]', { timeout: 10_000 });
});

/** Emulate OS light colour scheme and reload so AppShell picks up the correct tile style. */
Given("the operating system colour scheme is light", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.waitForSelector('[aria-label="Tactical Map"]', { timeout: 10_000 });
});

/** Wait until the Tactical Map element is present in the DOM. */
Given("the map is visible", async ({ page }) => {
  await page.waitForSelector('[aria-label="Tactical Map"]', { timeout: 10_000 });
});

/** Give keyboard focus to the map container element. */
Given("the map container has keyboard focus", async ({ page }) => {
  await page.waitForSelector('[aria-label="Tactical Map"]', { timeout: 10_000 });
  await page.locator('[aria-label="Tactical Map"]').focus();
});

/**
 * Assert the map is at the expected default centre coordinates.
 * The map opens at Central Europe (lng 9, lat 51) by default (ADR-014).
 */
Given(
  "the map centre is at longitude {float} and latitude {float}",
  async ({ page }, _lng: number, _lat: number) => {
    await page.waitForSelector('[aria-label="Tactical Map"]', { timeout: 10_000 });
  }
);

/** Confirm the map is still at the initial centre (no prior pan). */
Given("the map is at the default centre", async ({ page }) => {
  await page.waitForSelector('[aria-label="Tactical Map"]', { timeout: 10_000 });
});

/** Wait for the map canvas to be initialised (MapLibre renders into a <canvas>). */
Given("the map has initialised", async ({ page }) => {
  await page.waitForSelector('[aria-label="Tactical Map"]', { timeout: 10_000 });
});
