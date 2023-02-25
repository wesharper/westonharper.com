import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";

export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), tailwind(), prefetch()],
});
