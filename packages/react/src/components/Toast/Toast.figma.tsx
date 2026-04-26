/**
 * Code Connect mapping for Toast.
 *
 * IMPORTANT: Toasts are imperative in code — there's no JSX-level
 * <Toast /> render entry; consumers wrap the app in <ToastProvider> and
 * call `useToast().show({ ... })` from event handlers. The Figma component
 * is purely presentational, so we connect the closest renderable surface
 * (ToastProvider) and the example illustrates the hook call site as a
 * comment-tagged snippet.
 *
 * Figma source variants → React `ToastInput` shape:
 *   - state  (Normal/Positive/Warn/Negative) → variant ("normal" | "positive" | "warn" | "negative")
 *   - action (boolean)                       → presence of `action` field (label + onClick)
 *   - type   (Lettering / Icon)              → "Icon" means an icon-only Toast,
 *                                              i.e. caller passes `icon` and a short text/aria label.
 *                                              "Lettering" is the default text Toast.
 *   - text   (text content)                  → `text`
 */
import figma from "@figma/code-connect";
import { ToastProvider } from "./Toast";

figma.connect(
  ToastProvider,
  "https://www.figma.com/design/JDKpHezhllOvJF42xbKcNN/Design-System-1.5?node-id=2341-14260",
  {
    props: {
      text: figma.textContent("text"),
      variant: figma.enum("state", {
        Normal: "normal",
        Positive: "positive",
        Warn: "warn",
        Negative: "negative",
      }),
      hasAction: figma.boolean("action"),
      iconOnly: figma.enum("type", { Icon: true, Lettering: false }),
    },
    // Toast has no JSX render entry; the renderable surface is ToastProvider
    // (mounted once near the app root). Inside any descendant, call
    // `useToast().show({ ... })` to dispatch one. We surface the variant
    // mapping as a JSX comment so designers reading the snippet see the
    // exact useToast call shape they should write.
    example: () => (
      <ToastProvider>
        {/*
          // Toast is imperative — call from any descendant component:
          //
          // const { show } = useToast();
          // show({
          //   text: "已儲存",                        // ← Figma `text`
          //   variant: "positive",                  // ← Figma `state` (normal | positive | warn | negative)
          //   action: { label: "復原", onClick: () => {} },  // ← Figma `action=on`
          //   icon: <YourIcon />,                   // ← Figma `type=Icon`
          // });
        */}
      </ToastProvider>
    ),
  }
);
