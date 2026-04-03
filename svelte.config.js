import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/**
 * Svelte configuration.
 *
 * Uses vitePreprocess to support TypeScript in <script lang="ts"> blocks
 * and standard CSS processing. Aligns with ADR-003 (Client-Side Rendering).
 *
 * @type {import('@sveltejs/vite-plugin-svelte').SvelteConfig}
 */
const config = {
  preprocess: vitePreprocess(),
};

export default config;
