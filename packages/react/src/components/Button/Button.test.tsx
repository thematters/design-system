import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Button, getButtonClassName } from "./Button";

describe("Button", () => {
  describe("rendering", () => {
    it("renders children as label", () => {
      render(<Button>送出</Button>);
      expect(screen.getByRole("button", { name: "送出" })).toBeInTheDocument();
    });

    it("defaults to type='button' (not 'submit')", () => {
      render(<Button>X</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("respects an explicit type override", () => {
      render(<Button type="submit">確定</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("forwards refs to the underlying <button>", () => {
      const ref = { current: null as HTMLButtonElement | null };
      render(<Button ref={ref}>X</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("merges custom className without dropping internal classes", () => {
      render(<Button className="custom-cls">X</Button>);
      const btn = screen.getByRole("button");
      expect(btn.className).toContain("custom-cls");
      // Should still have at least one DS class (variant or size)
      expect(btn.className.split(" ").length).toBeGreaterThan(1);
    });
  });

  describe("interaction", () => {
    it("calls onClick when clicked", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<Button onClick={onClick}>X</Button>);
      await user.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("is reachable via keyboard (tab + space/enter)", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<Button onClick={onClick}>X</Button>);
      await user.tab();
      expect(screen.getByRole("button")).toHaveFocus();
      await user.keyboard("{Enter}");
      expect(onClick).toHaveBeenCalledTimes(1);
      await user.keyboard(" ");
      expect(onClick).toHaveBeenCalledTimes(2);
    });

    it("does not fire onClick when disabled", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Button disabled onClick={onClick}>
          X
        </Button>
      );
      await user.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });

    it("does not fire onClick when loading", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Button loading onClick={onClick}>
          X
        </Button>
      );
      await user.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("a11y semantics", () => {
    it("sets aria-busy and aria-disabled when loading", () => {
      render(<Button loading>儲存中</Button>);
      const btn = screen.getByRole("button");
      expect(btn).toHaveAttribute("aria-busy", "true");
      expect(btn).toHaveAttribute("aria-disabled", "true");
    });

    it("preserves the visible label while loading (so SR users keep context)", () => {
      render(<Button loading>儲存中</Button>);
      expect(screen.getByRole("button", { name: "儲存中" })).toBeInTheDocument();
    });

    it("propagates aria-label for icon-only buttons", () => {
      render(
        <Button iconOnly aria-label="關閉" leftIcon={<svg data-testid="x" />}>
          (hidden)
        </Button>
      );
      expect(screen.getByRole("button", { name: "關閉" })).toBeInTheDocument();
    });

    it("warns in dev when iconOnly is missing aria-label", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
      render(
        <Button iconOnly leftIcon={<svg />}>
          X
        </Button>
      );
      expect(warn).toHaveBeenCalledWith(expect.stringContaining("iconOnly"));
      warn.mockRestore();
    });

    it("has no axe violations: primary / medium", async () => {
      const { container } = render(<Button>送出</Button>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no axe violations: secondary / large / disabled", async () => {
      const { container } = render(
        <Button variant="secondary" size="large" disabled>
          取消
        </Button>
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no axe violations: icon-only with aria-label", async () => {
      const { container } = render(
        <Button iconOnly aria-label="設定" leftIcon={<svg />}>
          (hidden)
        </Button>
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("getButtonClassName helper", () => {
    it("returns a class string covering variant + size", () => {
      const cls = getButtonClassName({ variant: "secondary", size: "small" });
      expect(typeof cls).toBe("string");
      expect(cls.length).toBeGreaterThan(0);
    });

    it("appends a passed className", () => {
      const cls = getButtonClassName({ className: "my-link" });
      expect(cls).toContain("my-link");
    });
  });
});
