import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Matters DS 1.5 — Avatar (Others/Avatar, Figma node 3278:8803). Spec: `components/others/avatar/spec.md`. The Figma source's Style variants (Architect / Civic Liker / both) become the `ring` prop; the logbook badge becomes a generic `badge` slot.",
      },
    },
  },
  args: {
    alt: "豆泥",
    size: "md",
    ring: "none",
  },
  argTypes: {
    size: { control: "inline-radio", options: ["xs", "sm", "md", "lg"] },
    ring: { control: "inline-radio", options: ["none", "architect", "civicLiker", "both"] },
  },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

const sampleSrc =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop";

export const Image: Story = { args: { src: sampleSrc } };

export const Initials: Story = { args: {} };

export const InitialsLatin: Story = { args: { alt: "Bean Mash" } };

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Avatar size="xs" alt="豆泥" src={sampleSrc} />
      <Avatar size="sm" alt="豆泥" src={sampleSrc} />
      <Avatar size="md" alt="豆泥" src={sampleSrc} />
      <Avatar size="lg" alt="豆泥" src={sampleSrc} />
    </div>
  ),
};

export const Rings: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <Avatar size="lg" alt="標準" src={sampleSrc} ring="none" />
      <Avatar size="lg" alt="Architect" src={sampleSrc} ring="architect" />
      <Avatar size="lg" alt="Civic Liker" src={sampleSrc} ring="civicLiker" />
      <Avatar size="lg" alt="both" src={sampleSrc} ring="both" />
    </div>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <Avatar
        size="lg"
        alt="豆泥 logbook"
        src={sampleSrc}
        badge={
          <span
            style={{
              background: "#FFA94D",
              width: "100%",
              height: "100%",
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
            }}
          >
            📔
          </span>
        }
      />
      <Avatar
        size="md"
        alt="豆泥 online"
        src={sampleSrc}
        badge={
          <span
            style={{
              background: "var(--color-function-positive)",
              width: "100%",
              height: "100%",
              borderRadius: 999,
            }}
          />
        }
      />
    </div>
  ),
};

export const ImageError: Story = {
  args: {
    src: "https://nonexistent.invalid/x.png",
    alt: "豆泥",
  },
};
