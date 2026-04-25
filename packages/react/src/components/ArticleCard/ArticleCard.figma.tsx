/**
 * Code Connect mapping for ArticleCard.
 *
 * Figma variants:
 *   - Device      → maps to `size` ("big" / "small")
 *   - PhotoSize   → confirms the size choice (matches Device)
 *   - State       → "Placeholder" → set placeholder=true
 *   - Type        → "Follow" is the default; future Type variants TBD
 */
import figma from "@figma/code-connect";
import { ArticleCard } from "./ArticleCard";

figma.connect(
  ArticleCard,
  "https://www.figma.com/design/JDKpHezhllOvJF42xbKcNN/Design-System-1.5?node-id=4853-994",
  {
    variant: { State: "Default" },
    props: {
      size: figma.enum("Device", { Mobile: "small", Desktop: "big" }),
    },
    example: ({ size }) => (
      <ArticleCard
        size={size}
        title="文章標題"
        summary="文章摘要 …"
        author={{ name: "作者名" }}
        publishedAt="3 分鐘前"
        coverImageUrl="https://placeholder.example/cover.jpg"
        coverImageAlt=""
      />
    ),
  }
);

// Placeholder variant.
figma.connect(
  ArticleCard,
  "https://www.figma.com/design/JDKpHezhllOvJF42xbKcNN/Design-System-1.5?node-id=4853-994",
  {
    variant: { State: "Placeholder" },
    props: {
      size: figma.enum("Device", { Mobile: "small", Desktop: "big" }),
    },
    example: ({ size }) => <ArticleCard placeholder size={size} />,
  }
);
