/**
 * Toast — Matters Design System 1.5
 *
 * Source spec:  components/feedback/toast/spec.md
 * Figma node:   2341:14260 (Design System 1.5, JDKpHezhllOvJF42xbKcNN)
 *
 * API model: <ToastProvider> + useToast() hook with imperative show().
 * No imperative singleton (avoid SSR / multi-tree pitfalls).
 *
 * States map directly to DS function tokens:
 *   normal   → --color-grey-black
 *   positive → --color-function-positive
 *   warn     → --color-function-warn
 *   negative → --color-function-negative
 *
 * Auto-dismiss after `duration` ms (default 5000). Hovering pauses; leaving resumes.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import styles from "./Toast.module.css";

export type ToastVariant = "normal" | "positive" | "warn" | "negative";

export interface ToastInput {
  text: ReactNode;
  variant?: ToastVariant;
  /** ms before auto-dismiss. 0 = sticky. Default 5000. */
  duration?: number;
  /** Optional inline action ("undo", "view"). */
  action?: { label: string; onClick: () => void };
  /** Show a close X. Default true. */
  closable?: boolean;
  /** Optional icon shown next to the text. */
  icon?: ReactNode;
  /** Custom id for deduping. Toast with same id replaces an existing one. */
  id?: string;
}

interface ToastRecord extends ToastInput {
  id: string;
  createdAt: number;
}

interface ToastContextValue {
  show: (input: ToastInput) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export interface ToastProviderProps {
  children: ReactNode;
  /** Maximum simultaneous toasts. Older ones drop off. Default 5. */
  limit?: number;
  /** Default duration applied when toast.duration is undefined. Default 5000ms. */
  defaultDuration?: number;
  /** Override portal container. Default: document.body. */
  portalContainer?: Element | DocumentFragment;
}

export function ToastProvider({
  children,
  limit = 5,
  defaultDuration = 5000,
  portalContainer,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const [exiting, setExiting] = useState<Set<string>>(new Set());
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const remainingDurations = useRef<Map<string, number>>(new Map());

  const clearTimer = useCallback((id: string) => {
    const t = timers.current.get(id);
    if (t) {
      clearTimeout(t);
      timers.current.delete(id);
    }
  }, []);

  const dismiss = useCallback(
    (id: string) => {
      clearTimer(id);
      setExiting((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
      // Remove after exit animation
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
        setExiting((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }, 160);
    },
    [clearTimer]
  );

  const armTimer = useCallback(
    (id: string, ms: number) => {
      if (ms <= 0) return;
      remainingDurations.current.set(id, ms);
      clearTimer(id);
      const handle = setTimeout(() => dismiss(id), ms);
      timers.current.set(id, handle);
    },
    [clearTimer, dismiss]
  );

  const show = useCallback(
    (input: ToastInput) => {
      const id = input.id ?? `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const record: ToastRecord = {
        ...input,
        id,
        createdAt: Date.now(),
      };
      setToasts((prev) => {
        const filtered = prev.filter((t) => t.id !== id);
        const merged = [...filtered, record];
        if (merged.length > limit) {
          // Drop oldest
          const dropped = merged.slice(0, merged.length - limit);
          dropped.forEach((d) => clearTimer(d.id));
          return merged.slice(-limit);
        }
        return merged;
      });
      const ms = input.duration === undefined ? defaultDuration : input.duration;
      armTimer(id, ms);
      return id;
    },
    [armTimer, clearTimer, defaultDuration, limit]
  );

  const dismissAll = useCallback(() => {
    toasts.forEach((t) => dismiss(t.id));
  }, [toasts, dismiss]);

  // Cleanup all timers on unmount
  useEffect(() => {
    const t = timers.current;
    return () => {
      t.forEach((handle) => clearTimeout(handle));
      t.clear();
    };
  }, []);

  const value = useMemo(() => ({ show, dismiss, dismissAll }), [show, dismiss, dismissAll]);

  const viewport =
    typeof document !== "undefined"
      ? createPortal(
          <div
            className={styles.viewport}
            role="region"
            aria-label="通知"
            aria-live="polite"
            aria-relevant="additions"
          >
            {toasts.map((t) => (
              <ToastNode
                key={t.id}
                toast={t}
                exiting={exiting.has(t.id)}
                onDismiss={() => dismiss(t.id)}
                onPause={() => clearTimer(t.id)}
                onResume={() => {
                  const remaining = remainingDurations.current.get(t.id);
                  if (remaining && remaining > 0) armTimer(t.id, remaining);
                }}
              />
            ))}
          </div>,
          portalContainer ?? document.body
        )
      : null;

  return (
    <ToastContext.Provider value={value}>
      {children}
      {viewport}
    </ToastContext.Provider>
  );
}
ToastProvider.displayName = "ToastProvider";

interface ToastNodeProps {
  toast: ToastRecord;
  exiting: boolean;
  onDismiss: () => void;
  onPause: () => void;
  onResume: () => void;
}

function ToastNode({ toast, exiting, onDismiss, onPause, onResume }: ToastNodeProps) {
  const { variant = "normal", text, action, closable = true, icon } = toast;
  const isFunctional = variant === "positive" || variant === "warn" || variant === "negative";

  return (
    <div
      role={variant === "negative" ? "alert" : "status"}
      aria-live={variant === "negative" ? "assertive" : "polite"}
      className={clsx(styles.toast, styles[variant], exiting && styles.exiting)}
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      onFocus={onPause}
      onBlur={onResume}
    >
      <div className={styles.content}>
        {icon && (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        )}
        {!icon && isFunctional && (
          <span className={styles.icon} aria-hidden="true">
            <DefaultVariantIcon variant={variant} />
          </span>
        )}
        <span className={styles.text}>{text}</span>
      </div>
      {(action || closable) && (
        <div className={styles.actionGroup}>
          {action && (
            <button type="button" className={styles.action} onClick={action.onClick}>
              {action.label}
            </button>
          )}
          {action && closable && <span className={styles.split} aria-hidden="true" />}
          {closable && (
            <button type="button" className={styles.close} aria-label="關閉" onClick={onDismiss}>
              <CloseIcon />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function DefaultVariantIcon({ variant }: { variant: ToastVariant }) {
  // Simple ⚠ for warn / negative, ✓ for positive
  if (variant === "positive") {
    return (
      <svg viewBox="0 0 22 22">
        <path
          d="M5 11l4 4 8-8"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 22 22">
      <path
        d="M11 3L1 19h20L11 3z M11 9v5 M11 16v.01"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 22 22" aria-hidden="true">
      <path d="M5 5l12 12 M17 5L5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a <ToastProvider>. Wrap your app root with it.");
  }
  return ctx;
}
