import type { Meta, StoryObj } from "@storybook/react";
import { ArticleCard } from "./ArticleCard";

const meta: Meta<typeof ArticleCard> = {
  title: "Components/ArticleCard",
  component: ArticleCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Matters DS 1.5 — ArticleCard (Card/Article-Card, Figma node 4853:994). Spec: `components/card/article-card/spec.md`. Generic feed card; Matters business badges (編輯選擇 / 選集 / 七日書 / 圍爐) live in the `meta` slot rather than as built-in props.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof ArticleCard>;

const sample = {
  title: "標題：用 Phase 4 把馬特市的 ArticleCard 寫成共享 React 元件",
  summary:
    "Phase 4 把 ArticleCard、Avatar、Banner 三個元件寫進 @matters/design-system-react，並接上 Figma Code Connect。從此 designer 改 Figma、工程師改 code，雙向 traceable。",
  author: {
    name: "豆泥",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
    href: "/@mashbean",
  },
  publishedAt: "3 分鐘前",
  coverImageUrl:
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop",
  coverImageAlt: "山景",
};

export const Small: Story = {
  args: { ...sample, size: "small" },
  render: (args) => (
    <div style={{ width: 375 }}>
      <ArticleCard {...args} />
    </div>
  ),
};

export const Big: Story = {
  args: { ...sample, size: "big" },
  render: (args) => (
    <div style={{ width: 752 }}>
      <ArticleCard {...args} />
    </div>
  ),
};

export const NoCover: Story = {
  args: { ...sample, coverImageUrl: undefined },
  render: (args) => (
    <div style={{ width: 480 }}>
      <ArticleCard {...args} />
    </div>
  ),
};

export const Placeholder: Story = {
  render: () => (
    <div style={{ width: 480 }}>
      <ArticleCard placeholder />
      <ArticleCard placeholder size="big" />
    </div>
  ),
};

export const AsLink: Story = {
  args: { ...sample, href: "/articles/abc" },
  render: (args) => (
    <div style={{ width: 480 }}>
      <ArticleCard {...args} />
    </div>
  ),
};

export const WithMetaAndMoreButton: Story = {
  args: {
    ...sample,
    href: "/articles/abc",
    onMoreClick: () => alert("open menu"),
    meta: (
      <>
        <span style={{ color: "var(--color-function-positive)" }}>編輯選擇</span>
        <span style={{ color: "var(--color-primary-500)" }}>選集：Matters Lab</span>
        <span style={{ color: "var(--color-grey-grey-darker)" }}>圍爐：開源實驗室</span>
      </>
    ),
  },
  render: (args) => (
    <div style={{ width: 752 }}>
      <ArticleCard {...args} size="big" />
    </div>
  ),
};

export const Feed: Story = {
  render: () => (
    <div style={{ width: 480 }}>
      <ArticleCard {...sample} href="/a" />
      <ArticleCard {...sample} href="/b" title="第二篇文章標題" coverImageUrl={undefined} />
      <ArticleCard placeholder />
      <ArticleCard
        {...sample}
        href="/c"
        title="第四篇"
        coverImageUrl="https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&h=400&fit=crop"
      />
    </div>
  ),
};
