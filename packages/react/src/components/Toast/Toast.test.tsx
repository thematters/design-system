import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { ToastProvider, useToast } from "./Toast";

function Trigger({
  variant,
  text = "hello",
  action,
  duration,
}: {
  variant?: "normal" | "positive" | "warn" | "negative";
  text?: string;
  action?: { label: string; onClick: () => void };
  duration?: number;
}) {
  const { show, dismissAll } = useToast();
  return (
    <div>
      <button onClick={() => show({ text, variant, action, duration })}>show</button>
      <button onClick={() => dismissAll()}>clear</button>
    </div>
  );
}

describe("Toast", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("throws if useToast is called outside provider", () => {
    const Boom = () => {
      useToast();
      return null;
    };
    const spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    expect(() => render(<Boom />)).toThrow(/ToastProvider/);
    spy.mockRestore();
  });

  it("renders a toast when show() is called", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>
    );
    await user.click(screen.getByText("show"));
    expect(await screen.findByText("hello")).toBeInTheDocument();
  });

  it("renders negative toasts with role=alert", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <ToastProvider>
        <Trigger variant="negative" text="error happened" />
      </ToastProvider>
    );
    await user.click(screen.getByText("show"));
    const toast = await screen.findByText("error happened");
    expect(toast.closest('[role="alert"], [role="status"]')).toHaveAttribute("role", "alert");
  });

  it("renders normal/positive toasts with role=status", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <ToastProvider>
        <Trigger variant="positive" text="saved" />
      </ToastProvider>
    );
    await user.click(screen.getByText("show"));
    const toast = await screen.findByText("saved");
    expect(toast.closest('[role="alert"], [role="status"]')).toHaveAttribute("role", "status");
  });

  it("auto-dismisses after duration", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <ToastProvider>
        <Trigger duration={1000} />
      </ToastProvider>
    );
    await user.click(screen.getByText("show"));
    expect(screen.getByText("hello")).toBeInTheDocument();
    await act(async () => {
      vi.advanceTimersByTime(1500);
    });
    expect(screen.queryByText("hello")).not.toBeInTheDocument();
  });

  it("duration=0 means sticky", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <ToastProvider>
        <Trigger duration={0} />
      </ToastProvider>
    );
    await user.click(screen.getByText("show"));
    await act(async () => {
      vi.advanceTimersByTime(60000);
    });
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("close button dismisses the toast", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <ToastProvider>
        <Trigger duration={0} />
      </ToastProvider>
    );
    await user.click(screen.getByText("show"));
    await user.click(screen.getByRole("button", { name: "關閉" }));
    await act(async () => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.queryByText("hello")).not.toBeInTheDocument();
  });

  it("action button fires onClick", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const onAction = vi.fn();
    render(
      <ToastProvider>
        <Trigger duration={0} action={{ label: "復原", onClick: onAction }} />
      </ToastProvider>
    );
    await user.click(screen.getByText("show"));
    await user.click(screen.getByRole("button", { name: "復原" }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("respects limit by dropping oldest", async () => {
    function Multi() {
      const { show } = useToast();
      return (
        <button
          onClick={() => {
            show({ text: "a", duration: 0 });
            show({ text: "b", duration: 0 });
            show({ text: "c", duration: 0 });
          }}
        >
          spam
        </button>
      );
    }
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <ToastProvider limit={2}>
        <Multi />
      </ToastProvider>
    );
    await user.click(screen.getByText("spam"));
    expect(screen.queryByText("a")).not.toBeInTheDocument();
    expect(screen.getByText("b")).toBeInTheDocument();
    expect(screen.getByText("c")).toBeInTheDocument();
  });

  it("dedupes by id", async () => {
    function Dedupe() {
      const { show } = useToast();
      return (
        <button
          onClick={() => {
            show({ id: "save", text: "saving…", duration: 0 });
            show({ id: "save", text: "saved", duration: 0 });
          }}
        >
          go
        </button>
      );
    }
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <ToastProvider>
        <Dedupe />
      </ToastProvider>
    );
    await user.click(screen.getByText("go"));
    expect(screen.queryByText("saving…")).not.toBeInTheDocument();
    expect(screen.getByText("saved")).toBeInTheDocument();
  });

  it("dismissAll clears every toast", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <ToastProvider>
        <Trigger duration={0} />
      </ToastProvider>
    );
    await user.click(screen.getByText("show"));
    await user.click(screen.getByText("show"));
    await user.click(screen.getByText("clear"));
    await act(async () => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.queryByText("hello")).not.toBeInTheDocument();
  });

  it("has no axe violations: positive variant", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { baseElement } = render(
      <ToastProvider>
        <Trigger variant="positive" text="saved" duration={0} />
      </ToastProvider>
    );
    await user.click(screen.getByText("show"));
    expect(await axe(baseElement)).toHaveNoViolations();
  });

  it("has no axe violations: negative with action", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { baseElement } = render(
      <ToastProvider>
        <Trigger
          variant="negative"
          text="something broke"
          duration={0}
          action={{ label: "重試", onClick: () => undefined }}
        />
      </ToastProvider>
    );
    await user.click(screen.getByText("show"));
    expect(await axe(baseElement)).toHaveNoViolations();
  });
});
