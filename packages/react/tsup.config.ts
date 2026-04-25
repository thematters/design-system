import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  // CSS Modules: tsup bundles per-component .module.css automatically and
  // emits a single dist/styles.css concatenation alongside scoped class refs.
  injectStyle: false,
  loader: {
    ".css": "css",
  },
  // Single concatenated stylesheet at dist/styles.css for opt-in import.
  // Component-level CSS is scoped via CSS Modules at build time (handled by tsup).
  splitting: false,
  treeshake: true,
});
