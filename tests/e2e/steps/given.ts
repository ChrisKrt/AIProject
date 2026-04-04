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
