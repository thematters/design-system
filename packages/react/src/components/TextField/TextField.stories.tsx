import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./TextField";
import { useState } from "react";

const Search = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm5-1l4 4"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Matters DS 1.5 — Text field (Inputs/Text field, Figma node 3307:19338). Spec: `components/inputs/text-field/spec.md`. Figma palette remap: Logo/Matters Green → `--color-brand-new-purple` per PM 2026-04-24 decision.",
      },
    },
  },
  args: {
    label: "標題",
    placeholder: "請輸入內容",
  },
  argTypes: {
    error: { control: "text" },
    helperText: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Basic: Story = {};

export const WithHelperText: Story = {
  args: {
    label: "Email",
    helperText: "我們不會把這個 email 給任何人。",
    placeholder: "you@example.com",
  },
};

export const Error: Story = {
  args: {
    label: "Email",
    value: "not-an-email",
    error: "格式不對，請輸入合法的 email。",
  },
};

export const Required: Story = {
  args: {
    label: "暱稱",
    showRequired: true,
    placeholder: "至少 2 個字",
  },
};

export const WithLabelAction: Story = {
  args: {
    label: "密碼",
    type: "password",
    placeholder: "********",
    labelAction: { label: "忘記密碼？", onClick: () => alert("redirect to /forgot") },
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: "搜尋",
    placeholder: "搜尋作者、文章、標籤",
    leftIcon: Search,
  },
};

export const Disabled: Story = {
  args: {
    label: "Email",
    value: "locked@matters.town",
    disabled: true,
  },
};

export const Multiline: Story = {
  args: {
    label: "自我介紹",
    helperText: "最多 280 字。",
    placeholder: "說點什麼…",
    multiline: true,
  },
};

export const Controlled: Story = {
  render: function Controlled() {
    const [v, setV] = useState("");
    return (
      <TextField
        label="受控輸入"
        value={v}
        onChange={(e) => setV(e.target.value)}
        helperText={`目前長度：${v.length}`}
      />
    );
  },
};

export const InAForm: Story = {
  render: function FormStory() {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("submitted");
        }}
        style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 360 }}
      >
        <TextField label="Email" type="email" required showRequired />
        <TextField
          label="密碼"
          type="password"
          required
          showRequired
          labelAction={{ label: "忘記密碼？" }}
        />
        <button type="submit">登入</button>
      </form>
    );
  },
};
