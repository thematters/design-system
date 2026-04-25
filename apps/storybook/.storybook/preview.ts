import type { Preview } from "@storybook/react";
// Mount the design system tokens globally so every story has access to
// canonical CSS custom properties.
import "@matters/design-system-tokens/tokens.css";
import "./preview.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#fff" },
        { name: "grey-lighter", value: "var(--color-grey-grey-lighter)" },
        { name: "dark", value: "#0f172a" },
      ],
    },
    a11y: {
      // axe options: keep defaults; per-story overrides via parameters.a11y.
    },
  },
  tags: ["autodocs"],
};

export default preview;
