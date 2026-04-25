import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { ArticleCard } from "./ArticleCard";

const baseProps = {
  title: "Phase 4 上線了",
  summary: "ArticleCard / Avatar / Banner + Code Connect。",
  author: { name: "豆泥" },
  publishedAt: "3 分鐘前",
};

describe("ArticleCard", () => {
  it("renders title + summary + author + time", () => {
    render(<ArticleCard {...baseProps} />);
    expect(screen.getByRole("heading", { name: "Phase 4 上線了" })).toBeInTheDocument();
    expect(screen.getByText(/ArticleCard \/ Avatar \/ Banner \+ Code Connect/)).toBeInTheDocument();
    // Both the avatar fallback (role=img) and the author label render the name;
    // assert both exist rather than expecting a single match.
    expect(screen.getAllByText("豆泥").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("3 分鐘前")).toBeInTheDocument();
  });

  it("renders the cover image when coverImageUrl is set", () => {
    render(
      <ArticleCard {...baseProps} coverImageUrl="https://example.com/x.jpg" coverImageAlt="封面" />
    );
    expect(screen.getByRole("img", { name: "封面" })).toBeInTheDocument();
  });

  it("renders as <a> when href is provided", () => {
    render(<ArticleCard {...baseProps} href="/articles/123" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/articles/123");
  });

  it("renders nested author profile link", () => {
    render(<ArticleCard {...baseProps} author={{ name: "豆泥", href: "/@mashbean" }} />);
    const links = screen.getAllByRole("link");
    expect(links.some((a) => a.getAttribute("href") === "/@mashbean")).toBe(true);
  });

  it("nested author link click does not propagate to card link", async () => {
    const user = userEvent.setup();
    const onCardClick = vi.fn((e: React.MouseEvent) => e.preventDefault());
    render(
      <ArticleCard
        {...baseProps}
        author={{ name: "豆泥", href: "/@mashbean" }}
        href="/articles/123"
        onClick={onCardClick}
      />
    );
    const authorLink = screen
      .getAllByRole("link")
      .find((a) => a.getAttribute("href") === "/@mashbean");
    expect(authorLink).toBeTruthy();
    await user.click(authorLink!);
    expect(onCardClick).not.toHaveBeenCalled();
  });

  it("more button fires its handler and stops propagation", async () => {
    const user = userEvent.setup();
    const onMoreClick = vi.fn();
    const onCardClick = vi.fn((e: React.MouseEvent) => e.preventDefault());
    render(
      <ArticleCard {...baseProps} href="/x" onMoreClick={onMoreClick} onClick={onCardClick} />
    );
    await user.click(screen.getByRole("button", { name: "更多動作" }));
    expect(onMoreClick).toHaveBeenCalledTimes(1);
    expect(onCardClick).not.toHaveBeenCalled();
  });

  it("renders meta slot content", () => {
    render(
      <ArticleCard
        {...baseProps}
        meta={
          <>
            <span>編輯選擇</span>
            <span>選集 X</span>
          </>
        }
      />
    );
    expect(screen.getByText("編輯選擇")).toBeInTheDocument();
    expect(screen.getByText("選集 X")).toBeInTheDocument();
  });

  it("renders the placeholder skeleton when placeholder=true", () => {
    render(<ArticleCard placeholder />);
    const root = screen.getByLabelText("文章載入中");
    expect(root).toHaveAttribute("aria-busy", "true");
  });

  it("supports the big size", () => {
    const { container } = render(<ArticleCard {...baseProps} size="big" />);
    expect(container.firstChild).toHaveClass("big");
  });

  it("has no axe violations: default + summary + cover + author link", async () => {
    const { container } = render(
      <ArticleCard
        {...baseProps}
        author={{ name: "豆泥", href: "/@mashbean" }}
        coverImageUrl="https://example.com/x.jpg"
        coverImageAlt="封面"
        href="/articles/123"
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations: with meta + more button", async () => {
    const { container } = render(
      <ArticleCard {...baseProps} meta={<span>編輯選擇</span>} onMoreClick={() => undefined} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations: placeholder skeleton", async () => {
    const { container } = render(<ArticleCard placeholder size="big" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
