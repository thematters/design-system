import { defineConfig } from "astro/config";

const site = process.env.SITE_URL ?? "https://example.com";
const rawBase = process.env.BASE_PATH ?? "/";
const base = rawBase === "/" ? "/" : `/${rawBase.replace(/^\/+|\/+$/g, "")}`;

export default defineConfig({
  site,
  base,
  output: "static",
  trailingSlash: "always",
  build: { format: "directory" },
});
