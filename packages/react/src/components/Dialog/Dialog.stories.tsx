import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Dialog } from "./Dialog";
import { Button } from "../Button";
import { TextField } from "../TextField";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Matters DS 1.5 — Dialog (Feedback/Dialog, Figma node 3404:1953). Spec: `components/feedback/dialog/spec.md`. Self-contained focus trap + scroll lock + portal; no Radix dependency.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Confirm: Story = {
  render: function Confirm() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>刪除文章</Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <Dialog.Title>確定要刪除嗎？</Dialog.Title>
          <Dialog.Description>這個操作不可復原。文章將從 IPFS 上 unpin。</Dialog.Description>
          <Dialog.Actions>
            <Dialog.ActionSecondary onClick={() => setOpen(false)}>取消</Dialog.ActionSecondary>
            <Dialog.ActionPrimary
              onClick={() => {
                alert("deleted");
                setOpen(false);
              }}
            >
              確定刪除
            </Dialog.ActionPrimary>
          </Dialog.Actions>
        </Dialog>
      </>
    );
  },
};

export const ThreeActions: Story = {
  render: function ThreeActions() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>儲存草稿</Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <Dialog.Title>還沒發佈耶</Dialog.Title>
          <Dialog.Description>你寫了一半的內容要怎麼處理？</Dialog.Description>
          <Dialog.Actions>
            <Dialog.ActionSecondary onClick={() => setOpen(false)}>取消</Dialog.ActionSecondary>
            <Dialog.ActionSecondary onClick={() => setOpen(false)}>放棄</Dialog.ActionSecondary>
            <Dialog.ActionPrimary onClick={() => setOpen(false)}>存草稿</Dialog.ActionPrimary>
          </Dialog.Actions>
        </Dialog>
      </>
    );
  },
};

export const WithForm: Story = {
  render: function WithForm() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    return (
      <>
        <Button onClick={() => setOpen(true)}>編輯個人資料</Button>
        <Dialog open={open} onClose={() => setOpen(false)} size="medium">
          <Dialog.Title>編輯個人資料</Dialog.Title>
          <Dialog.Body>
            <TextField
              label="顯示名稱"
              value={name}
              onChange={(e) => setName(e.target.value)}
              showRequired
            />
          </Dialog.Body>
          <Dialog.Actions>
            <Dialog.ActionSecondary onClick={() => setOpen(false)}>取消</Dialog.ActionSecondary>
            <Dialog.ActionPrimary
              disabled={!name}
              onClick={() => {
                alert(`saved ${name}`);
                setOpen(false);
              }}
            >
              儲存
            </Dialog.ActionPrimary>
          </Dialog.Actions>
        </Dialog>
      </>
    );
  },
};

export const NonDismissable: Story = {
  render: function NonDismissable() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>同意條款</Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          closeOnBackdropClick={false}
          closeOnEscape={false}
        >
          <Dialog.Title>請先同意條款</Dialog.Title>
          <Dialog.Description>
            繼續使用前請閱讀並同意服務條款。Escape / 點 backdrop 都不會關掉這個 dialog。
          </Dialog.Description>
          <Dialog.Actions>
            <Dialog.ActionPrimary onClick={() => setOpen(false)}>我同意</Dialog.ActionPrimary>
          </Dialog.Actions>
        </Dialog>
      </>
    );
  },
};

export const Sizes: Story = {
  render: function Sizes() {
    const [size, setSize] = useState<"small" | "medium" | "large" | null>(null);
    return (
      <div style={{ display: "flex", gap: 12 }}>
        <Button onClick={() => setSize("small")}>Small (default)</Button>
        <Button onClick={() => setSize("medium")}>Medium</Button>
        <Button onClick={() => setSize("large")}>Large</Button>
        {size && (
          <Dialog open onClose={() => setSize(null)} size={size}>
            <Dialog.Title>Size: {size}</Dialog.Title>
            <Dialog.Description>
              寬度：small=375px, medium=480px, large=640px。手機尺寸下變成 bottom sheet。
            </Dialog.Description>
            <Dialog.Actions>
              <Dialog.ActionPrimary onClick={() => setSize(null)}>關閉</Dialog.ActionPrimary>
            </Dialog.Actions>
          </Dialog>
        )}
      </div>
    );
  },
};
