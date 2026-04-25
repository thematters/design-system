import { defineConfig, devices } from "@playwright/test";

/**
 * Visual regression for the Storybook docs site.
 *
 * Snapshots are pinned to Linux (CI baseline). Local macOS / Windows runs
 * will have anti-aliasing / sub-pixel diffs that fail the comparison; if
 * you need to update snapshots, run the workflow_dispatch job
 * `.github/workflows/visual-regression.yml` with `update=true` so CI
 * regenerates the baselines.
 *
 * Storybook is built once in CI before the test suite runs and served
 * via `pnpm --filter @matters/design-system-storybook preview` (the
 * webServer hook below). Locally you can either:
 *   1. `pnpm build:storybook && pnpm test:visual`
 *   2. Run a separate Storybook dev server and skip the webServer hook
 */
export default defineConfig({
  testDir: "./tests/visual",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",

  expect: {
    toHaveScreenshot: {
      // Anti-aliasing varies slightly even within Linux runs; allow a
      // tiny tolerance to keep the suite stable.
      maxDiffPixelRatio: 0.01,
      // Animations are disabled in tests, but image loading async ⇒
      // disableAnimations alone isn't enough — we add full-page settle.
      animations: "disabled",
    },
  },

  use: {
    baseURL: process.env.STORYBOOK_URL ?? "http://localhost:6006",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    // Serves the pre-built static Storybook output. Run
    // `pnpm build:storybook` first.
    command: "pnpm dlx http-server apps/storybook/storybook-static -p 6006 -s",
    url: "http://localhost:6006/iframe.html?id=welcome--page",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },

  snapshotPathTemplate: "{testDir}/__snapshots__/{testFilePath}/{arg}-{platform}{ext}",
});
