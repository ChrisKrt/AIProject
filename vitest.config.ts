import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte({ hot: !process.env["VITEST"] })],
  resolve: {
    conditions: ["browser"],
  },
  test: {
    environment: "happy-dom",
    include: ["src/**/*.spec.ts"],
    globals: true,
    setupFiles: ["./tests/unit/setup.ts"],
  },
});
