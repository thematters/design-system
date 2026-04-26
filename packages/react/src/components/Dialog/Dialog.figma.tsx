/**
 * Code Connect mapping for Dialog.
 *
 * Figma source variants:
 *   - action1 (boolean) → primary action slot   → Dialog.ActionPrimary
 *   - action2 (boolean) → secondary action slot → Dialog.ActionSecondary
 *   - action3 (boolean) → tertiary action slot  → Dialog.ActionSecondary
 *   - title  (text)     → Dialog.Title content
 *   - text   (text)     → Dialog.Description content
 *
 * Code uses a composition model: <Dialog> + Dialog.Title / Dialog.Description /
 * Dialog.Body / Dialog.Actions. The `open` and `onClose` props are runtime-only
 * concerns, so the snippet shows them as call-site placeholders.
 *
 * Booleans are mapped to JSX action elements (or undefined) via the
 * second-argument value mapping; this keeps the example free of inline
 * ternaries, which the Code Connect parser does not support.
 */
import figma from "@figma/code-connect";
import { Dialog } from "./Dialog";

figma.connect(
  Dialog,
  "https://www.figma.com/design/JDKpHezhllOvJF42xbKcNN/Design-System-1.5?node-id=3404-1953",
  {
    props: {
      title: figma.textContent("title"),
      description: figma.textContent("text"),
      primaryAction: figma.boolean("action1", {
        true: <Dialog.ActionPrimary>確認</Dialog.ActionPrimary>,
        false: undefined,
      }),
      secondaryAction: figma.boolean("action2", {
        true: <Dialog.ActionSecondary>稍後</Dialog.ActionSecondary>,
        false: undefined,
      }),
      tertiaryAction: figma.boolean("action3", {
        true: <Dialog.ActionSecondary>取消</Dialog.ActionSecondary>,
        false: undefined,
      }),
    },
    example: ({ title, description, primaryAction, secondaryAction, tertiaryAction }) => (
      <Dialog open onClose={() => {}}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>
        <Dialog.Actions>
          {tertiaryAction}
          {secondaryAction}
          {primaryAction}
        </Dialog.Actions>
      </Dialog>
    ),
  }
);
