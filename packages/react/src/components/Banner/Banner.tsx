/**
 * Banner — Matters Design System 1.5
 *
 * Source spec: components/others/banner/spec.md
 * Figma node:  5251:1856 (Design System 1.5, JDKpHezhllOvJF42xbKcNN)
 *
 * A single banner slide: full-bleed background image + title overlay +
 * optional carousel-style pagination dots. The Figma source has Mobile
 * (387×90) and Desktop (264×100) variants; the React port stretches to
 * its container and exposes `density` for the tighter mobile padding.
 */
import { forwardRef } from "react";
import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Banner.module.css";

interface CommonProps {
  /** Banner title (kept to ≤2 lines with ellipsis). */
  title: ReactNode;
  /** Optional secondary line (smaller, slightly translucent). */
  subtitle?: ReactNode;
  /** Background image URL. Required for the visual to make sense. */
  imageSrc: string;
  /** Image alt text — describes the *image content*, not the banner. */
  imageAlt?: string;
  /** Pagination — total slides in the parent carousel. Omit to hide dots. */
  totalSlides?: number;
  /** Pagination — index (0-based) of the currently-shown slide. */
  currentSlide?: number;
  /** Tighter padding (matches Figma Mobile variant). Default false. */
  compact?: boolean;
  /** Pass-through className. */
  className?: string;
}

export interface BannerProps
  extends CommonProps, Omit<HTMLAttributes<HTMLDivElement>, keyof CommonProps | "title"> {
  href?: undefined;
}

export interface BannerLinkProps
  extends CommonProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | "title"> {
  /** When provided, the banner renders as `<a>` and the entire card is clickable. */
  href: string;
}

type AnyBannerProps = BannerProps | BannerLinkProps;

function isLink(p: AnyBannerProps): p is BannerLinkProps {
  return typeof (p as BannerLinkProps).href === "string";
}

export const Banner = forwardRef<HTMLDivElement | HTMLAnchorElement, AnyBannerProps>(
  function Banner(props, ref) {
    const {
      title,
      subtitle,
      imageSrc,
      imageAlt = "",
      totalSlides,
      currentSlide,
      compact,
      className,
      ...rest
    } = props as AnyBannerProps;

    const showDots =
      typeof totalSlides === "number" && typeof currentSlide === "number" && totalSlides > 1;

    const content = (
      <>
        <img
          src={imageSrc}
          alt={imageAlt}
          // Image is purely decorative when alt is empty; let the title carry the meaning.
          className={styles.image}
          aria-hidden={imageAlt ? undefined : true}
        />
        {showDots && (
          <ol
            className={styles.indicator}
            aria-label={`Slide ${currentSlide! + 1} of ${totalSlides}`}
          >
            {Array.from({ length: totalSlides }).map((_, i) => (
              <li
                key={i}
                className={clsx(styles.dot, i === currentSlide && styles.active)}
                aria-current={i === currentSlide ? "true" : undefined}
              />
            ))}
          </ol>
        )}
        <div>
          <h3 className={styles.title}>{title}</h3>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </>
    );

    const rootClass = clsx(styles.root, compact && styles.compact, className);

    if (isLink(props)) {
      const linkRest = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={rootClass}
          href={props.href}
          {...linkRest}
        >
          {content}
        </a>
      );
    }

    const divRest = rest as HTMLAttributes<HTMLDivElement>;
    return (
      <div ref={ref as React.Ref<HTMLDivElement>} className={rootClass} {...divRest}>
        {content}
      </div>
    );
  }
);

Banner.displayName = "Banner";
