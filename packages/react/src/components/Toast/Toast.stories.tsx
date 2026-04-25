import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider, useToast } from "./Toast";
import { Button } from "../Button";

const meta: Meta = {
  title: "Components/Toast",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Matters DS 1.5 — Toast (Feedback/Toast, Figma node 2341:14260). Spec: `components/feedback/toast/spec.md`. Imperative API via `useToast()` inside `<ToastProvider>`. Variants map to function tokens: positive/warn/negative/normal.",
      },
    },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj;

function Demo({
  variant,
  text,
}: {
  variant: "normal" | "positive" | "warn" | "negative";
  text: string;
}) {
  const { show } = useToast();
  return (
    <Button variant="secondary" onClick={() => show({ text, variant })}>
      Show {variant}
    </Button>
  );
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Demo variant="normal" text="這是一般通知" />
      <Demo variant="positive" text="儲存成功" />
      <Demo variant="warn" text="注意：你的草稿尚未發佈" />
      <Demo variant="negative" text="網路錯誤，請重試" />
    </div>
  ),
};

export const WithAction: Story = {
  render: function WithAction() {
    const { show } = useToast();
    return (
      <Button
        onClick={() =>
          show({
            text: "已刪除",
            variant: "normal",
            action: {
              label: "復原",
              onClick: () =>
                show({
                  text: "已復原",
                  variant: "positive",
                  duration: 2000,
                }),
            },
          })
        }
      >
        刪除（含復原 action）
      </Button>
    );
  },
};

export const Sticky: Story = {
  render: function Sticky() {
    const { show, dismissAll } = useToast();
    return (
      <div style={{ display: "flex", gap: 12 }}>
        <Button
          onClick={() =>
            show({
              text: "這個 toast 不會自己消失（duration: 0）",
              variant: "warn",
              duration: 0,
            })
          }
        >
          Sticky toast
        </Button>
        <Button variant="secondary" onClick={dismissAll}>
          清掉全部
        </Button>
      </div>
    );
  },
};

export const Dedupe: Story = {
  render: function Dedupe() {
    const { show } = useToast();
    return (
      <Button
        onClick={() => {
          show({ id: "save", text: "儲存中…", variant: "normal", duration: 0 });
          setTimeout(() => {
            show({ id: "save", text: "儲存成功", variant: "positive", duration: 2000 });
          }, 1500);
        }}
      >
        Dedupe by id (saving → saved)
      </Button>
    );
  },
};

export const Spam: Story = {
  render: function Spam() {
    const { show } = useToast();
    return (
      <Button
        onClick={() => {
          for (let i = 1; i <= 8; i++) {
            show({ text: `Toast #${i}`, variant: "normal" });
          }
        }}
      >
        Spam 8（limit=5 會掉最舊的）
      </Button>
    );
  },
};
