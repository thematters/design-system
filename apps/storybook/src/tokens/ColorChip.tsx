import type { ReactNode } from "react";

interface ColorChipProps {
  name: string;
  value: string;
  note?: ReactNode;
  deprecated?: boolean;
}

/** Visual swatch + token name + hex, used in Tokens MDX docs. */
export function ColorChip({ name, value, note, deprecated }: ColorChipProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: 12,
        border: "1px solid var(--color-grey-grey-light, #ddd)",
        borderRadius: 8,
        opacity: deprecated ? 0.7 : 1,
      }}
    >
      <div
        style={{
          background: value,
          height: 56,
          borderRadius: 6,
          border: "1px solid rgba(0,0,0,0.05)",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <code
          style={{
            fontSize: 12,
            color: "var(--color-grey-black, #111)",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          {name}
        </code>
        <code
          style={{
            fontSize: 11,
            color: "var(--color-grey-grey-darker, #666)",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          {value}
          {deprecated && " · DEPRECATED"}
        </code>
        {note && (
          <div
            style={{
              fontSize: 12,
              color: "var(--color-grey-grey-darker, #666)",
              marginTop: 2,
            }}
          >
            {note}
          </div>
        )}
      </div>
    </div>
  );
}
