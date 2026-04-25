/**
 * Code Connect mapping for Button.
 * Run `pnpm figma:connect:publish` (with FIGMA_ACCESS_TOKEN set) to push.
 */
import figma from "@figma/code-connect";
import { Button } from "./Button";

figma.connect(
  Button,
  "https://www.figma.com/design/JDKpHezhllOvJF42xbKcNN/Design-System-1.5?node-id=3371-23079",
  {
    props: {
      children: figma.textContent("button text"),
      variant: figma.enum("Type", {
        Primary: "primary",
        Secondary: "secondary",
        Tertiary: "tertiary",
      }),
      size: figma.enum("Size", {
        Large: "large",
        Medium: "medium",
        Small: "small",
      }),
      iconOnly: figma.enum("Show Text", { On: false, Off: true }),
    },
    example: ({ children, variant, size, iconOnly }) => (
      <Button variant={variant} size={size} iconOnly={iconOnly}>
        {children}
      </Button>
    ),
  }
);
