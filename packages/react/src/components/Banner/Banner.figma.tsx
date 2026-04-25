/**
 * Code Connect mapping for Banner.
 *
 * Figma `device=Mobile` maps to our `compact` flag (smaller padding).
 */
import figma from "@figma/code-connect";
import { Banner } from "./Banner";

figma.connect(
  Banner,
  "https://www.figma.com/design/JDKpHezhllOvJF42xbKcNN/Design-System-1.5?node-id=5251-1856",
  {
    props: {
      compact: figma.enum("Device", { Mobile: true, Desktop: false }),
    },
    example: ({ compact }) => (
      <Banner
        title="Banner title"
        imageSrc="https://placeholder.example/banner.jpg"
        imageAlt=""
        compact={compact}
      />
    ),
  }
);
