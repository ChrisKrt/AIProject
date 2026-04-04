import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { VitePWA } from "vite-plugin-pwa";
import { fileURLToPath } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  root: ".",
  publicDir: "public",
  build: {
    outDir: "dist",
    target: "es2022",
    sourcemap: true,
  },
  plugins: [
    svelte(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt"],
      manifest: {
        name: "SILENT SENTINEL",
        short_name: "SENTINEL",
        description: "Tactical Intelligence Analysis Platform",
        theme_color: "#0F172A",
        background_color: "#0F172A",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@app": fileURLToPath(new URL("./src/Application", import.meta.url)),
      "@infra": fileURLToPath(new URL("./src/Infrastructure", import.meta.url)),
      "@ui": fileURLToPath(new URL("./src/Presentation", import.meta.url)),
    },
  },
});
