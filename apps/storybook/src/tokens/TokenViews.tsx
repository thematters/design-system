/**
 * Token visualisation primitives used by the Tokens MDX docs.
 * Pulls live values from @matters/design-system-tokens so the docs stay in
 * sync with whatever ships in tokens.json.
 */
import { tokens } from "@matters/design-system-tokens";
import { ColorChip } from "./ColorChip";

type TokenLeaf = { value: string; description?: string };

function isLeaf(v: unknown): v is TokenLeaf {
  return !!v && typeof v === "object" && "value" in (v as Record<string, unknown>);
}

function kebab(s: string) {
  return s
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

function flat(
  obj: Record<string, unknown>,
  prefix: string[] = []
): Array<{ path: string[]; value: string; description?: string }> {
  const out: Array<{ path: string[]; value: string; description?: string }> = [];
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith("$")) continue;
    if (isLeaf(v)) {
      out.push({ path: [...prefix, k], value: v.value, description: v.description });
    } else if (v && typeof v === "object") {
      out.push(...flat(v as Record<string, unknown>, [...prefix, k]));
    }
  }
  return out;
}

function cssVar(parts: string[]) {
  return "--" + parts.map(kebab).join("-");
}

// ---------------- Color scales ----------------

interface ColorScaleProps {
  /** Path within `tokens.color`, e.g. ["primary"] for the purple scale. */
  path: string[];
  title?: string;
}

export function ColorScale({ path, title }: ColorScaleProps) {
  let node: unknown = tokens.color;
  for (const seg of path) {
    if (!node || typeof node !== "object") break;
    node = (node as Record<string, unknown>)[seg];
  }
  if (!node || typeof node !== "object") {
    return (
      <div style={{ color: "var(--color-function-negative)" }}>
        ColorScale: path not found — color.{path.join(".")}
      </div>
    );
  }
  const leaves = flat(node as Record<string, unknown>, ["color", ...path]);
  return (
    <section style={{ margin: "24px 0" }}>
      {title && <h3 style={{ margin: "0 0 8px" }}>{title}</h3>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: 12,
        }}
      >
        {leaves.map((l) => (
          <ColorChip key={l.path.join(".")} name={cssVar(l.path)} value={l.value} />
        ))}
      </div>
    </section>
  );
}

// ---------------- Spacing ----------------

export function SpacingScale() {
  const leaves = flat(tokens.spacing as Record<string, unknown>, ["space"]);
  return (
    <table style={{ borderCollapse: "collapse", width: "100%", margin: "16px 0" }}>
      <thead>
        <tr>
          <th style={th}>Token</th>
          <th style={th}>Value</th>
          <th style={th}>Visual</th>
        </tr>
      </thead>
      <tbody>
        {leaves.map((l) => (
          <tr key={l.path.join(".")}>
            <td style={td}>
              <code>{cssVar(l.path)}</code>
            </td>
            <td style={td}>
              <code>{l.value}</code>
            </td>
            <td style={td}>
              <div
                style={{
                  background: "var(--color-brand-new-purple)",
                  height: 16,
                  width: l.value,
                  borderRadius: 2,
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ---------------- Effects (shadows) ----------------

export function ShadowScale() {
  const leaves = flat(tokens.effect as Record<string, unknown>, ["shadow"]);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 16,
        margin: "16px 0",
      }}
    >
      {leaves.map((l) => (
        <div
          key={l.path.join(".")}
          style={{
            background: "white",
            borderRadius: 8,
            padding: 16,
            boxShadow: l.value,
            border: "1px solid var(--color-grey-grey-lighter)",
          }}
        >
          <code style={{ fontSize: 12 }}>{cssVar(l.path)}</code>
          <div style={{ fontSize: 11, color: "var(--color-grey-grey-darker)", marginTop: 4 }}>
            {l.value}
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------- Typography utility classes ----------------

interface TextClassRowProps {
  scope: "system" | "article";
  name: string;
  weight: string;
  def: { fontFamily: string; fontWeight: number; fontSize: string; lineHeight: string };
}

function TextClassRow({ scope, name, weight, def }: TextClassRowProps) {
  const cls = `ds-text-${kebab(scope)}-${kebab(name)}-${kebab(weight)}`;
  return (
    <tr>
      <td style={td}>
        <code style={{ fontSize: 12 }}>.{cls}</code>
      </td>
      <td style={{ ...td, ...def, lineHeight: def.lineHeight }}>Matters 馬特市</td>
      <td style={{ ...td, fontSize: 12, color: "var(--color-grey-grey-darker)" }}>
        {def.fontFamily} · {def.fontWeight} · {def.fontSize}/{def.lineHeight}
      </td>
    </tr>
  );
}

export function TypographyTable({ scope }: { scope: "system" | "article" }) {
  const tree = (
    tokens.typography as unknown as Record<string, Record<string, Record<string, unknown>>>
  )[scope];
  if (!tree) return null;
  const rows: Array<{ name: string; weight: string; def: TextClassRowProps["def"] }> = [];
  for (const [name, weights] of Object.entries(tree)) {
    if (name.startsWith("$")) continue;
    for (const [weight, def] of Object.entries(weights)) {
      rows.push({ name, weight, def: def as TextClassRowProps["def"] });
    }
  }
  return (
    <table style={{ borderCollapse: "collapse", width: "100%", margin: "16px 0" }}>
      <thead>
        <tr>
          <th style={th}>Class</th>
          <th style={th}>Sample</th>
          <th style={th}>Family · Weight · Size/Line</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <TextClassRow
            key={`${r.name}-${r.weight}`}
            scope={scope}
            name={r.name}
            weight={r.weight}
            def={r.def}
          />
        ))}
      </tbody>
    </table>
  );
}

// ---------------- shared table styling ----------------

const th: React.CSSProperties = {
  textAlign: "left",
  padding: "8px 12px",
  borderBottom: "2px solid var(--color-grey-grey-light)",
  fontSize: 13,
  color: "var(--color-grey-grey-darker)",
  fontWeight: 500,
};

const td: React.CSSProperties = {
  padding: "8px 12px",
  borderBottom: "1px solid var(--color-grey-grey-lighter)",
  fontSize: 14,
  verticalAlign: "middle",
};
