import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

/**
 * Playwright BDD configuration.
 *
 * Uses playwright-bdd to link Gherkin feature files in backlog/assets/
 * to TypeScript step definitions in tests/e2e/steps/.
 * The test server is Vite running on localhost:5173 (ADR-009).
 */
const testDir = defineBddConfig({
  features: "backlog/assets/*.feature",
  steps: "tests/e2e/steps/*.ts",
});

export default defineConfig({
  testDir,

  /* Run tests in parallel within a file */
  fullyParallel: true,

  /* Fail the build on CI if test.only or describe.only is used */
  forbidOnly: !!process.env["CI"],

  /* Retry failed tests once on CI */
  retries: process.env["CI"] ? 1 : 0,

  /* Reporter: use dot on CI, list locally */
  reporter: process.env["CI"] ? "dot" : "list",

  use: {
    /* Application URL served by Vite dev server */
    baseURL: "http://localhost:5173",

    /* Capture screenshot on failure */
    screenshot: "only-on-failure",

    /* Capture video on first retry */
    video: "retain-on-failure",

    /* Trace on first retry for debugging */
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  /* Start Vite dev server before the test suite */
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env["CI"],
    timeout: 30_000,
  },
});
