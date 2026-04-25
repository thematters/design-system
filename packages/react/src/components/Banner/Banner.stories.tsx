import type { Meta, StoryObj } from "@storybook/react";
import { Banner } from "./Banner";

const meta: Meta<typeof Banner> = {
  title: "Components/Banner",
  component: Banner,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Matters DS 1.5 — Banner (Others/Banner, Figma node 5251:1856). Spec: `components/others/banner/spec.md`. Single carousel slide; the parent owns auto-advance / swipe.",
      },
    },
  },
  args: {
    title: "Logbook 創作接龍｜與 Matty 一起，在區塊鏈上刻下你的 2022 預言書",
    imageSrc: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=300&fit=crop",
    imageAlt: "Snowy mountain landscape",
  },
};
export default meta;

type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 480 }}>
      <Banner {...args} />
    </div>
  ),
};

export const WithSubtitle: Story = {
  args: { subtitle: "Phase 4 launch · 點此進入" },
  render: (args) => (
    <div style={{ width: 480 }}>
      <Banner {...args} />
    </div>
  ),
};

export const Compact: Story = {
  args: { compact: true, title: "Mobile compact 模式" },
  render: (args) => (
    <div style={{ width: 387 }}>
      <Banner {...args} />
    </div>
  ),
};

export const AsLink: Story = {
  args: { href: "https://matters.town" },
  render: (args) => (
    <div style={{ width: 480 }}>
      <Banner {...args} />
    </div>
  ),
};

export const InACarousel: Story = {
  args: { totalSlides: 6, currentSlide: 2 },
  render: (args) => (
    <div style={{ width: 480 }}>
      <Banner {...args} />
    </div>
  ),
};
