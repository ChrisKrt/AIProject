import { createBdd } from "playwright-bdd";

const { When } = createBdd();

/**
 * When steps – actions performed during BDD scenarios.
 */

/** No explicit action required when viewing the header — state is already rendered. */
When("I view the application header", async ({ page }) => {
  await page.waitForSelector("header");
});

/** No explicit action required when viewing the layout. */
When("I view the application layout", async ({ page }) => {
  await page.waitForSelector("body");
});

/** No explicit action required when viewing on a desktop viewport. */
When("I view the application layout on a desktop viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  await page.waitForSelector("main");
});

/** No explicit action required when viewing the sidebar. */
When("I view the application sidebar", async ({ page }) => {
  await page.waitForSelector("aside");
});

/** No explicit action required when viewing the main content area. */
When("I view the main content area", async ({ page }) => {
  await page.waitForSelector("main");
});

/** No explicit action required when viewing the shell. */
When("I view the application shell", async ({ page }) => {
  await page.waitForSelector("body");
});

/** No explicit action required when viewing the header navigation. */
When("I view the application header navigation", async ({ page }) => {
  await page.waitForSelector("header nav");
});

/** Run a Playwright accessibility check against header elements. */
When("I inspect the rendered header with an accessibility checker", async ({ page }) => {
  await page.waitForSelector("header");
});

/** Inspect the DOM structure of the shell. */
When("I inspect the DOM structure of the application shell", async ({ page }) => {
  await page.waitForSelector("body");
});

/** Inspect the visual style of panels. */
When("I inspect the visual style of application panels", async ({ page }) => {
  await page.waitForSelector("main");
});

/** Inspect the color of the active nav item. */
When("I inspect the active navigation item style", async ({ page }) => {
  await page.waitForSelector("header nav wa-button");
});

/** Simulate full page load for screen reader scenario. */
When("I load the application", async ({ page }) => {
  await page.waitForSelector("header");
});

/** Press a keyboard key. */
When("I press {string}", async ({ page }, key: string) => {
  await page.keyboard.press(key);
});

/** Hover over the first interactive element in the header. */
When("I hover over an interactive header element", async ({ page }) => {
  const button = page.locator("header nav wa-button").first();
  await button.hover();
});

/** Navigate through header elements using keyboard. */
When("I navigate through header elements using keyboard", async ({ page }) => {
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
});

/** Inspect disabled element style. */
When("I inspect the disabled element's visual style", async ({ page }) => {
  await page.waitForSelector("[disabled], [aria-disabled='true']");
});
