import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Banner } from "./Banner";

const SRC = "https://example.com/banner.jpg";

describe("Banner", () => {
  it("renders title + image", () => {
    render(<Banner title="Logbook 2022" imageSrc={SRC} />);
    expect(screen.getByRole("heading", { name: "Logbook 2022" })).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<Banner title="x" subtitle="hello world" imageSrc={SRC} />);
    expect(screen.getByText("hello world")).toBeInTheDocument();
  });

  it("hides indicator when totalSlides is missing", () => {
    render(<Banner title="x" imageSrc={SRC} />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("renders pagination dots with aria-current on the active one", () => {
    render(<Banner title="x" imageSrc={SRC} totalSlides={4} currentSlide={2} />);
    const list = screen.getByRole("list");
    const items = list.querySelectorAll("li");
    expect(items).toHaveLength(4);
    expect(items[2]).toHaveAttribute("aria-current", "true");
    expect(items[0]).not.toHaveAttribute("aria-current");
  });

  it("does not render dots if totalSlides <= 1", () => {
    render(<Banner title="x" imageSrc={SRC} totalSlides={1} currentSlide={0} />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("renders as <a> when href is provided", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn((e: React.MouseEvent) => e.preventDefault());
    render(<Banner title="Read more" imageSrc={SRC} href="/articles/123" onClick={onClick} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/articles/123");
    await user.click(link);
    expect(onClick).toHaveBeenCalled();
  });

  it("hides decorative image from a11y tree when imageAlt is empty", () => {
    render(<Banner title="x" imageSrc={SRC} />);
    const img = document.querySelector("img");
    expect(img).toHaveAttribute("aria-hidden", "true");
  });

  it("includes meaningful alt when provided", () => {
    render(<Banner title="x" imageSrc={SRC} imageAlt="Snowy mountain" />);
    expect(screen.getByRole("img", { name: "Snowy mountain" })).toBeInTheDocument();
  });

  it("has no axe violations: basic", async () => {
    const { container } = render(<Banner title="Logbook" imageSrc={SRC} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations: as link with carousel dots", async () => {
    const { container } = render(
      <Banner
        title="Logbook"
        subtitle="Phase 4 launch"
        imageSrc={SRC}
        href="/x"
        totalSlides={3}
        currentSlide={1}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
