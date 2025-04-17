import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://westonharper.com",
  markdown: {
    shikiConfig: {
      themes: {
        light: "catppuccin-frappe",
        dark: "catppuccin-mocha",
      },
    },
  },
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
