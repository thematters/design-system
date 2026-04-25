import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { TextField } from "./TextField";

describe("TextField", () => {
  describe("rendering", () => {
    it("renders an input with the given label", () => {
      render(<TextField label="Email" />);
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
    });

    it("links label and input via htmlFor/id", () => {
      render(<TextField label="Email" />);
      const input = screen.getByLabelText("Email");
      const label = screen.getByText("Email") as HTMLLabelElement;
      expect(label.tagName).toBe("LABEL");
      expect(label).toHaveAttribute("for", input.id);
    });

    it("uses provided id over generated one", () => {
      render(<TextField label="X" id="my-input" />);
      expect(screen.getByLabelText("X")).toHaveAttribute("id", "my-input");
    });

    it("renders helper text when error is absent", () => {
      render(<TextField label="X" helperText="Choose wisely" />);
      expect(screen.getByText("Choose wisely")).toBeInTheDocument();
    });

    it("renders <textarea> when multiline=true", () => {
      render(<TextField label="Bio" multiline />);
      const ta = screen.getByLabelText("Bio");
      expect(ta.tagName).toBe("TEXTAREA");
    });

    it("forwards refs to <input>", () => {
      const ref = { current: null as HTMLInputElement | null };
      render(<TextField label="X" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe("interaction", () => {
    it("typing fires onChange", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<TextField label="X" onChange={onChange} />);
      await user.type(screen.getByLabelText("X"), "hi");
      expect(onChange).toHaveBeenCalled();
      expect(screen.getByLabelText<HTMLInputElement>("X").value).toBe("hi");
    });

    it("disabled input cannot be typed into", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<TextField label="X" disabled onChange={onChange} />);
      await user.type(screen.getByLabelText("X"), "x");
      expect(onChange).not.toHaveBeenCalled();
    });

    it("labelAction button fires onClick", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<TextField label="Password" labelAction={{ label: "忘記密碼？", onClick }} />);
      await user.click(screen.getByRole("button", { name: "忘記密碼？" }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("error state", () => {
    it("hides helper text in favour of error message", () => {
      render(<TextField label="X" helperText="Helper" error="Bad input" />);
      expect(screen.queryByText("Helper")).not.toBeInTheDocument();
      expect(screen.getByText("Bad input")).toBeInTheDocument();
    });

    it("sets aria-invalid when error present", () => {
      render(<TextField label="X" error="Nope" />);
      expect(screen.getByLabelText("X")).toHaveAttribute("aria-invalid", "true");
    });

    it("error message is announced via role=alert", () => {
      render(<TextField label="X" error="Bad" />);
      expect(screen.getByRole("alert")).toHaveTextContent("Bad");
    });

    it("aria-describedby points to error id when error is present", () => {
      render(<TextField label="X" id="f1" error="bad" helperText="ignored" />);
      const input = screen.getByLabelText("X");
      expect(input).toHaveAttribute("aria-describedby", expect.stringContaining("f1-error"));
    });

    it("aria-describedby points to helper id when only helper is present", () => {
      render(<TextField label="X" id="f2" helperText="hint" />);
      const input = screen.getByLabelText("X");
      expect(input).toHaveAttribute("aria-describedby", "f2-helper");
    });
  });

  describe("a11y semantics", () => {
    it("required mark is decorative (aria-hidden)", () => {
      render(<TextField label="Email" showRequired />);
      // role-based query uses the accessible name (which excludes aria-hidden text)
      expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument();
    });

    it("hides label visually with labelHidden but keeps it accessible", () => {
      render(<TextField label="Search" labelHidden />);
      expect(screen.getByLabelText("Search")).toBeInTheDocument();
    });

    it("has no axe violations: basic", async () => {
      const { container } = render(<TextField label="Email" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no axe violations: with helper text", async () => {
      const { container } = render(<TextField label="Email" helperText="we won't share" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no axe violations: error state", async () => {
      const { container } = render(<TextField label="Email" error="Required" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no axe violations: textarea", async () => {
      const { container } = render(<TextField label="Bio" multiline />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
