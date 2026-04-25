/**
 * Button stories — Matters DS 1.5.
 *
 * Mirror of `components/buttons/normal/spec.md`. Keep visual coverage in
 * sync: every variant × size, plus icon-only / loading / disabled / form.
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const ArrowRight = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Matters DS 1.5 — Button (Buttons/Normal). See `components/buttons/normal/spec.md` for the design source.",
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "tertiary"] },
    size: { control: "select", options: ["large", "medium", "small"] },
    iconOnly: { control: "boolean" },
    fullWidth: { control: "boolean" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    children: "送出",
    variant: "primary",
    size: "medium",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const Secondary: Story = { args: { variant: "secondary", children: "取消" } };

export const Tertiary: Story = { args: { variant: "tertiary", children: "略過" } };

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button {...args} size="large">
        Large
      </Button>
      <Button {...args} size="medium">
        Medium
      </Button>
      <Button {...args} size="small">
        Small
      </Button>
    </div>
  ),
};

export const WithLeftIcon: Story = {
  args: {
    children: "下一步",
    leftIcon: ArrowRight,
  },
};

export const IconOnly: Story = {
  args: {
    iconOnly: true,
    "aria-label": "下一步",
    leftIcon: ArrowRight,
    children: "(hidden)",
  } as never,
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "儲存中",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "已停用",
  },
};

export const InAForm: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("submitted");
      }}
      style={{ display: "flex", gap: 12, alignItems: "center" }}
    >
      <input
        type="text"
        defaultValue="hello"
        style={{
          padding: "8px 12px",
          border: "1px solid var(--color-grey-grey-light)",
          borderRadius: 8,
        }}
      />
      <Button type="submit">送出</Button>
      <Button type="reset" variant="secondary">
        重置
      </Button>
    </form>
  ),
};

export const FullWidth: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ width: 320, padding: 24, background: "#fafafa" }}>
      <Button fullWidth>登入</Button>
    </div>
  ),
};

export const VariantMatrix: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <table style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th />
          <th style={{ padding: 12 }}>Large</th>
          <th style={{ padding: 12 }}>Medium</th>
          <th style={{ padding: 12 }}>Small</th>
        </tr>
      </thead>
      <tbody>
        {(["primary", "secondary", "tertiary"] as const).map((variant) => (
          <tr key={variant}>
            <th style={{ textAlign: "right", padding: 12 }}>{variant}</th>
            {(["large", "medium", "small"] as const).map((size) => (
              <td key={size} style={{ padding: 12 }}>
                <Button variant={variant} size={size}>
                  按鈕
                </Button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
