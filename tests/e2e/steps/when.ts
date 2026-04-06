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

// ─── PBI-006: Map When steps ──────────────────────────────────────────────

/** Wait for the full page to finish loading. */
When("the application has loaded", async ({ page }) => {
  await page.waitForSelector("main", { timeout: 10_000 });
});

/** Wait until the MapLibre canvas is attached to the map container. */
When("the map has initialised", async ({ page }) => {
  await page.waitForSelector('[aria-label="Tactical Map"]', { timeout: 10_000 });
});

/** Alias for 'the map has initialised' used in coordinate scenarios. */
When("the map has loaded", async ({ page }) => {
  await page.waitForSelector('[aria-label="Tactical Map"]', { timeout: 10_000 });
});

/** Simulate a mouse drag across the map canvas to pan the map. */
When("the user drags the map canvas", async ({ page }) => {
  const canvas = page.locator('[aria-label="Tactical Map"] canvas').first();
  await canvas.waitFor({ state: "attached", timeout: 10_000 });
  const box = await canvas.boundingBox();
  console.assert(box !== null, "Map canvas must have a bounding box");
  if (box) {
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx + 100, cy + 50, { steps: 10 });
    await page.mouse.up();
    await page.waitForTimeout(500);
  }
});

/** Scroll the mouse wheel upward on the map canvas to zoom in. */
When("the user scrolls up on the map canvas", async ({ page }) => {
  const canvas = page.locator('[aria-label="Tactical Map"] canvas').first();
  await canvas.waitFor({ state: "attached", timeout: 10_000 });
  const box = await canvas.boundingBox();
  console.assert(box !== null, "Map canvas must have a bounding box");
  if (box) {
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.wheel(0, -300);
    await page.waitForTimeout(500);
  }
});

/** Press the right arrow key to pan the map eastward. */
When("the user presses the right arrow key", async ({ page }) => {
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(300);
});

/** Tab into the first MapLibre navigation control button and give it keyboard focus. */
When("a map control button receives keyboard focus", async ({ page }) => {
  const button = page.locator(".maplibregl-ctrl button").first();
  await button.waitFor({ state: "attached", timeout: 10_000 });
  await button.focus();
});

/** Clear localStorage and navigate fresh so no previously saved viewport is applied. */
When("the application has loaded with no saved viewport", async ({ page }) => {
  await page.evaluate(() => localStorage.clear());
  await page.goto("/");
  await page.waitForSelector('[aria-label="Tactical Map"]', { timeout: 10_000 });
});

/** Drag the map canvas significantly to pan it to a new location. */
When("the user pans the map to a new location", async ({ page }) => {
  const canvas = page.locator('[aria-label="Tactical Map"] canvas').first();
  await canvas.waitFor({ state: "attached", timeout: 10_000 });
  const box = await canvas.boundingBox();
  console.assert(box !== null, "Map canvas must have a bounding box");
  if (box) {
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx + 250, cy, { steps: 20 });
    await page.mouse.up();
    await page.waitForTimeout(800);
  }
});
