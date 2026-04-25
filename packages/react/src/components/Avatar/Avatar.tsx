/**
 * Avatar — Matters Design System 1.5
 *
 * Source spec: components/others/avatar/spec.md
 * Figma node:  3278:8803 (Design System 1.5, JDKpHezhllOvJF42xbKcNN)
 *
 * Generalises the Figma source's Style × Size × logbook variant matrix:
 *  - Style → `ring` prop ("none" | "architect" | "civicLiker" | "both")
 *  - Size  → `size` prop ("xs" | "sm" | "md" | "lg")
 *  - logbook badge → `badge` slot (any ReactNode, drops in bottom-right)
 *
 * Phase 4 keeps it framework-light: an `<img>` with an initials fallback
 * if `src` is absent or fails to load.
 */
import { forwardRef, useState } from "react";
import type { ImgHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Avatar.module.css";

export type AvatarSize = "xs" | "sm" | "md" | "lg";
export type AvatarRing = "none" | "architect" | "civicLiker" | "both";

export interface AvatarProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt" | "className" | "size"
> {
  /** Image URL. When missing or failing to load, falls back to initials. */
  src?: string;
  /** Required for accessibility — descriptive name of the user. */
  alt: string;
  /** Visual size. Default `md`. */
  size?: AvatarSize;
  /** Decorative ring around the avatar. */
  ring?: AvatarRing;
  /**
   * Bottom-right corner overlay (e.g. logbook badge, online dot, mention bell).
   * Sized at 40% of the avatar; pass either an SVG icon or a small image.
   */
  badge?: ReactNode;
  /**
   * Initials shown when `src` is absent or fails to load.
   * Defaults to the first 1–2 chars of `alt`. Pass empty string to suppress.
   */
  initials?: string;
  /** Pass-through className on the root. */
  className?: string;
}

const ringClass: Record<AvatarRing, string | undefined> = {
  none: undefined,
  architect: styles.ringArchitect,
  civicLiker: styles.ringCivicLiker,
  both: styles.ringBoth,
};

function defaultInitials(alt: string): string {
  const cleaned = alt.trim();
  if (!cleaned) return "?";
  // For CJK names, take the last 1–2 characters (more recognisable).
  // For latin names, first letter of first + last word.
  const isCJK = /[一-鿿㐀-䶿]/.test(cleaned);
  if (isCJK) {
    return cleaned.slice(-2);
  }
  const parts = cleaned.split(/\s+/);
  if (parts.length === 1) return parts[0]!.slice(0, 2);
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).slice(0, 2);
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt, size = "md", ring = "none", badge, initials, className, ...rest },
  ref
) {
  const [errored, setErrored] = useState(false);
  const showFallback = !src || errored;
  const fallbackText = initials ?? defaultInitials(alt);

  return (
    <span
      ref={ref}
      className={clsx(
        styles.root,
        styles[size],
        ring !== "none" && styles.ring,
        ringClass[ring],
        className
      )}
    >
      {showFallback ? (
        <span className={styles.fallback} role="img" aria-label={alt}>
          {fallbackText}
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          className={styles.image}
          onError={() => setErrored(true)}
          {...rest}
        />
      )}
      {badge && (
        <span className={styles.badge} aria-hidden="true">
          {badge}
        </span>
      )}
    </span>
  );
});

Avatar.displayName = "Avatar";
