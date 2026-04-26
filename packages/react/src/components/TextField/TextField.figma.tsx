/**
 * Code Connect mapping for TextField.
 *
 * Figma source variants:
 *   - showTitle  → boolean: render the label row.
 *                  Mapped to a `label` prop value (string or undefined).
 *   - showBottom → boolean: render the helper text row.
 *                  Mapped to a `helperText` prop value (string or undefined).
 *
 * The `figma.boolean` second-argument value mapping converts the boolean
 * variant directly into the prop value, so the example stays free of
 * inline ternaries (which the Code Connect parser does not support).
 */
import figma from "@figma/code-connect";
import { TextField } from "./TextField";

figma.connect(
  TextField,
  "https://www.figma.com/design/JDKpHezhllOvJF42xbKcNN/Design-System-1.5?node-id=3307-19338",
  {
    props: {
      label: figma.boolean("showTitle", {
        true: "標題",
        false: undefined,
      }),
      helperText: figma.boolean("showBottom", {
        true: "輔助說明文字",
        false: undefined,
      }),
    },
    example: ({ label, helperText }) => (
      <TextField label={label} placeholder="請輸入內容" helperText={helperText} />
    ),
  }
);
