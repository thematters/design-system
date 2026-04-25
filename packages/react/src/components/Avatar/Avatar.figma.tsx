/**
 * Code Connect mapping for Avatar.
 *
 * Figma source has size variant "72" only; React port adds smaller sizes.
 * Style maps to our `ring` prop. Logbook flag becomes a `badge` (Code Connect
 * cannot synthesise the badge content directly — designers will see a hint
 * to pass `badge` themselves).
 */
import figma from "@figma/code-connect";
import { Avatar } from "./Avatar";

figma.connect(
  Avatar,
  "https://www.figma.com/design/JDKpHezhllOvJF42xbKcNN/Design-System-1.5?node-id=3278-8803",
  {
    props: {
      ring: figma.enum("Style", {
        Standard: "none",
        "Matters Architect": "architect",
        "Civic Liker": "civicLiker",
        "Civic Liker & Architect": "both",
      }),
      // Figma `logbook=true` means the badge slot should be filled.
      hasLogbookBadge: figma.boolean("logbook"),
    },
    example: ({ ring, hasLogbookBadge }) => (
      <Avatar
        size="lg"
        alt="User name"
        src="https://placeholder.example/avatar.jpg"
        ring={ring}
        // When logbook=true, the consumer fills the badge slot.
        // Replace this with the canonical logbook icon component when available.
        badge={hasLogbookBadge ? <span>📔</span> : undefined}
      />
    ),
  }
);
