import { test, expect } from "@playwright/test";

/**
 * Visual regression smoke tests.
 *
 * Each test loads a single Storybook story in iframe mode, waits for
 * fonts + images to settle, then snapshots the full canvas.
 *
 * To add coverage for a new story, just add a row to the STORIES array.
 * Story IDs match Storybook's auto-generated kebab IDs:
 *   "Components/Button" + "Primary" → "components-button--primary"
 */

const STORIES: Array<{ id: string; name: string }> = [
  // Button
  { id: "components-button--primary", name: "button-primary" },
  { id: "components-button--secondary", name: "button-secondary" },
  { id: "components-button--variant-matrix", name: "button-variant-matrix" },
  { id: "components-button--loading", name: "button-loading" },
  // TextField
  { id: "components-textfield--basic", name: "textfield-basic" },
  { id: "components-textfield--with-helper-text", name: "textfield-helper" },
  { id: "components-textfield--error", name: "textfield-error" },
  { id: "components-textfield--multiline", name: "textfield-multiline" },
  // Avatar
  { id: "components-avatar--sizes", name: "avatar-sizes" },
  { id: "components-avatar--rings", name: "avatar-rings" },
  { id: "components-avatar--initials", name: "avatar-initials" },
  // Banner
  { id: "components-banner--default", name: "banner-default" },
  { id: "components-banner--with-subtitle", name: "banner-with-subtitle" },
  { id: "components-banner--in-a-carousel", name: "banner-in-carousel" },
  // ArticleCard
  { id: "components-articlecard--small", name: "articlecard-small" },
  { id: "components-articlecard--big", name: "articlecard-big" },
  { id: "components-articlecard--placeholder", name: "articlecard-placeholder" },
  { id: "components-articlecard--no-cover", name: "articlecard-no-cover" },
];

for (const { id, name } of STORIES) {
  test(`visual: ${name}`, async ({ page }) => {
    await page.goto(`/iframe.html?id=${id}&viewMode=story`);
    // Wait for the Storybook root + any images to be ready
    await page.waitForSelector("#storybook-root", { state: "attached" });
    await page.evaluate(async () => {
      // Wait for web fonts (PingFang TC isn't a web font in CI, but the
      // story stylesheets reference it — if the document.fonts API is
      // present, give it a tick to settle the layout).
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
      // Wait for any pending <img> loads.
      await Promise.all(
        Array.from(document.images)
          .filter((i) => !i.complete)
          .map(
            (i) =>
              new Promise<void>((resolve) => {
                i.addEventListener("load", () => resolve(), { once: true });
                i.addEventListener("error", () => resolve(), { once: true });
              })
          )
      );
    });
    // Final settle pause for layout.
    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
    });
  });
}
