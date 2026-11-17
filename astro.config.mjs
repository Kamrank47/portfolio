import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://kamranhashmi.pages.dev",
  output: "static",
  build: {
    inlineStylesheets: "auto",
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
