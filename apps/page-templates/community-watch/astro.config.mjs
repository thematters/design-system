import { defineConfig } from "astro/config";

// Set SITE_URL / BASE_PATH at build time when deploying to a subpath
// (e.g. GitHub Pages user/repo). Default = root.
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
