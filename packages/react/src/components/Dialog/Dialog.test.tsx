import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { useState } from "react";
import { Dialog } from "./Dialog";

function Harness({ initial = false }: { initial?: boolean }) {
  const [open, setOpen] = useState(initial);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Dialog.Title>標題</Dialog.Title>
        <Dialog.Description>說明文字</Dialog.Description>
        <Dialog.Body>內容區塊</Dialog.Body>
        <Dialog.Actions>
          <Dialog.ActionSecondary onClick={() => setOpen(false)}>取消</Dialog.ActionSecondary>
          <Dialog.ActionPrimary onClick={() => setOpen(false)}>確定</Dialog.ActionPrimary>
        </Dialog.Actions>
      </Dialog>
    </>
  );
}

describe("Dialog", () => {
  describe("rendering", () => {
    it("renders nothing when closed", () => {
      render(<Harness />);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("renders into a portal when open", () => {
      render(<Harness initial />);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("wires aria-labelledby to Dialog.Title automatically", async () => {
      render(<Harness initial />);
      const dialog = await screen.findByRole("dialog");
      const labelledBy = dialog.getAttribute("aria-labelledby");
      expect(labelledBy).toBeTruthy();
      expect(document.getElementById(labelledBy!)).toHaveTextContent("標題");
    });

    it("wires aria-describedby to Dialog.Description", async () => {
      render(<Harness initial />);
      const dialog = await screen.findByRole("dialog");
      const describedBy = dialog.getAttribute("aria-describedby");
      expect(describedBy).toBeTruthy();
      expect(document.getElementById(describedBy!)).toHaveTextContent("說明文字");
    });
  });

  describe("close behaviour", () => {
    it("calls onClose when Escape pressed", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(
        <Dialog open onClose={onClose}>
          <Dialog.Title>X</Dialog.Title>
        </Dialog>
      );
      await user.keyboard("{Escape}");
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("does not close on Escape when closeOnEscape=false", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(
        <Dialog open onClose={onClose} closeOnEscape={false}>
          <Dialog.Title>X</Dialog.Title>
        </Dialog>
      );
      await user.keyboard("{Escape}");
      expect(onClose).not.toHaveBeenCalled();
    });

    it("calls onClose when backdrop is clicked", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      const { container } = render(
        <Dialog open onClose={onClose}>
          <Dialog.Title>X</Dialog.Title>
        </Dialog>
      );
      // The backdrop is the parent of the panel; in the portal it's at body level.
      const backdrop = document.querySelector('[class*="backdrop"]') as HTMLElement;
      expect(backdrop).toBeTruthy();
      await user.click(backdrop);
      expect(onClose).toHaveBeenCalled();
      // unused variable guard
      void container;
    });

    it("does not close on backdrop click when closeOnBackdropClick=false", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(
        <Dialog open onClose={onClose} closeOnBackdropClick={false}>
          <Dialog.Title>X</Dialog.Title>
        </Dialog>
      );
      const backdrop = document.querySelector('[class*="backdrop"]') as HTMLElement;
      await user.click(backdrop);
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe("focus management", () => {
    it("locks body scroll while open", () => {
      const before = document.body.style.overflow;
      const { rerender } = render(
        <Dialog open onClose={() => undefined}>
          <Dialog.Title>X</Dialog.Title>
        </Dialog>
      );
      expect(document.body.style.overflow).toBe("hidden");
      rerender(
        <Dialog open={false} onClose={() => undefined}>
          <Dialog.Title>X</Dialog.Title>
        </Dialog>
      );
      expect(document.body.style.overflow).toBe(before);
    });

    it("returns focus to the previously focused element on close", async () => {
      const user = userEvent.setup();
      render(<Harness />);
      const opener = screen.getByRole("button", { name: "Open" });
      opener.focus();
      await user.click(opener);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      await user.keyboard("{Escape}");
      // After unmount, focus should be back on the opener
      expect(opener).toHaveFocus();
    });

    it("traps Tab focus inside the dialog", async () => {
      const user = userEvent.setup();
      render(
        <Dialog open onClose={() => undefined}>
          <Dialog.Title>X</Dialog.Title>
          <Dialog.Actions>
            <Dialog.ActionSecondary>A</Dialog.ActionSecondary>
            <Dialog.ActionPrimary>B</Dialog.ActionPrimary>
          </Dialog.Actions>
        </Dialog>
      );
      // Wait for initial focus to land
      await act(async () => {
        await new Promise((r) => setTimeout(r, 10));
      });
      const a = screen.getByRole("button", { name: "A" });
      const b = screen.getByRole("button", { name: "B" });
      a.focus();
      await user.tab();
      expect(b).toHaveFocus();
      await user.tab();
      // Should wrap to first
      expect(a).toHaveFocus();
      // Shift-tab from first wraps to last
      await user.tab({ shift: true });
      expect(b).toHaveFocus();
    });
  });

  describe("a11y semantics", () => {
    it("has no axe violations: confirm dialog", async () => {
      const { baseElement } = render(
        <Dialog open onClose={() => undefined}>
          <Dialog.Title>確認刪除</Dialog.Title>
          <Dialog.Description>這個操作不可復原。</Dialog.Description>
          <Dialog.Actions>
            <Dialog.ActionSecondary>取消</Dialog.ActionSecondary>
            <Dialog.ActionPrimary>刪除</Dialog.ActionPrimary>
          </Dialog.Actions>
        </Dialog>
      );
      expect(await axe(baseElement)).toHaveNoViolations();
    });

    it("has no axe violations: with aria-label fallback (no Dialog.Title)", async () => {
      const { baseElement } = render(
        <Dialog open onClose={() => undefined} aria-label="Quick info">
          <Dialog.Body>Just an FYI.</Dialog.Body>
        </Dialog>
      );
      expect(await axe(baseElement)).toHaveNoViolations();
    });
  });
});
