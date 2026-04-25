import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders an <img> with the given src + alt", () => {
    render(<Avatar src="https://example.com/u.png" alt="某用戶" />);
    const img = screen.getByRole("img", { name: "某用戶" });
    expect(img).toHaveAttribute("src", "https://example.com/u.png");
  });

  it("falls back to initials when src is missing", () => {
    render(<Avatar alt="豆泥" />);
    const fallback = screen.getByRole("img", { name: "豆泥" });
    // Last 2 CJK chars
    expect(fallback).toHaveTextContent("豆泥");
  });

  it("computes default initials from a latin name (first + last)", () => {
    render(<Avatar alt="Bean Mash" />);
    expect(screen.getByText("BM")).toBeInTheDocument();
  });

  it("uses last 2 chars for CJK names", () => {
    render(<Avatar alt="馬特市民某甲" />);
    expect(screen.getByText("某甲")).toBeInTheDocument();
  });

  it("respects an explicit `initials` override", () => {
    render(<Avatar alt="Some User" initials="??" />);
    expect(screen.getByText("??")).toBeInTheDocument();
  });

  it("falls back to initials on image load error", () => {
    render(<Avatar src="https://broken.example/x.png" alt="豆泥" />);
    const img = screen.getByRole("img", { name: "豆泥" });
    fireEvent.error(img);
    // After error, role=img maps to the fallback span
    expect(screen.getByRole("img", { name: "豆泥" }).tagName).toBe("SPAN");
  });

  it("renders a badge when provided", () => {
    render(<Avatar alt="豆泥" badge={<span data-testid="logbook">📔</span>} />);
    expect(screen.getByTestId("logbook")).toBeInTheDocument();
  });

  it("forwards refs to the root <span>", () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(<Avatar ref={ref} alt="X" />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("has no axe violations: with image", async () => {
    const { container } = render(<Avatar src="https://example.com/u.png" alt="某用戶" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations: fallback initials", async () => {
    const { container } = render(<Avatar alt="豆泥" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations: with ring + badge", async () => {
    const { container } = render(
      <Avatar
        src="https://example.com/u.png"
        alt="架構師豆泥"
        ring="architect"
        badge={<span>★</span>}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
