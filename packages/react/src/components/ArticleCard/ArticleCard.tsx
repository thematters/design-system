/**
 * ArticleCard — Matters Design System 1.5
 *
 * Source spec: components/card/article-card/spec.md
 * Figma node:  4853:994 (Design System 1.5, JDKpHezhllOvJF42xbKcNN)
 *
 * Lays out a single article in a list (follow feed, archive, search results,
 * tag pages). The Figma source has Big (Desktop) and Small (Mobile) sizes
 * plus a Placeholder skeleton state — both shipped here.
 *
 * Phase 4 deliberately keeps the metadata row as a free-form `meta` slot
 * rather than hardcoding 編輯選擇 / 選集 / 七日書 / 圍爐 badges. Those are
 * Matters business semantics that change over time; the card stays generic.
 */
import { forwardRef } from "react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./ArticleCard.module.css";
import { Avatar } from "../Avatar";
import type { AvatarRing } from "../Avatar";

export type ArticleCardSize = "small" | "big";

export interface ArticleCardAuthor {
  name: string;
  /** Avatar image URL (omit to fall back to initials). */
  avatarUrl?: string;
  /** Optional ring decoration on the avatar — passes through to <Avatar>. */
  avatarRing?: AvatarRing;
  /** Profile link. When present, the author block becomes clickable. */
  href?: string;
}

interface CommonProps {
  /** Article title (≤ 2 lines clamp). */
  title: ReactNode;
  /** Article summary / dek (≤ 2 lines clamp). */
  summary?: ReactNode;
  /** Author info — name + optional avatar URL + optional profile link. */
  author: ArticleCardAuthor;
  /** Pre-formatted relative or absolute time string ("3 分鐘前", "2024-04-25"). */
  publishedAt?: ReactNode;
  /** Cover image URL. Omit for text-only cards. */
  coverImageUrl?: string;
  /** Cover alt text — defaults to "" (decorative). */
  coverImageAlt?: string;
  /** Visual size. Default "small". */
  size?: ArticleCardSize;
  /** Free-form slot for tags / chips / collection links. Rendered between author row and the More button. */
  meta?: ReactNode;
  /** Render a More-actions kebab. Set to a click handler or `false`. */
  onMoreClick?: () => void;
  /** Pass-through className. */
  className?: string;
}

export interface ArticleCardProps extends CommonProps {
  /** Render the entire card as an `<a>` so the title links to the article. */
  href?: string;
  /** Loading skeleton state. When true, content props are ignored. */
  placeholder?: false;
}

export interface ArticleCardPlaceholderProps {
  size?: ArticleCardSize;
  className?: string;
  placeholder: true;
}

type AnyProps = ArticleCardProps | ArticleCardPlaceholderProps;

/** Three-dot icon used by the optional More button. */
function MoreIcon() {
  return (
    <svg viewBox="0 0 22 22" aria-hidden="true" width="22" height="22">
      <circle cx="5" cy="11" r="1.5" fill="currentColor" />
      <circle cx="11" cy="11" r="1.5" fill="currentColor" />
      <circle cx="17" cy="11" r="1.5" fill="currentColor" />
    </svg>
  );
}

export const ArticleCard = forwardRef<HTMLDivElement | HTMLAnchorElement, AnyProps>(
  function ArticleCard(props, ref) {
    const size = props.size ?? "small";

    if ((props as ArticleCardPlaceholderProps).placeholder) {
      const { className } = props as ArticleCardPlaceholderProps;
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          className={clsx(styles.root, styles.placeholder, size === "big" && styles.big, className)}
          role="status"
          aria-busy="true"
          aria-label="文章載入中"
        >
          <div className={styles.content}>
            <div className={styles.text}>
              <div className={clsx(styles.titleSkel)} />
              <div className={clsx(styles.lineSkel)} />
              <div className={clsx(styles.lineSkel, styles.short)} />
            </div>
            <div className={styles.cover} />
          </div>
        </div>
      );
    }

    const {
      title,
      summary,
      author,
      publishedAt,
      coverImageUrl,
      coverImageAlt = "",
      meta,
      onMoreClick,
      href,
      className,
      ...rest
    } = props as ArticleCardProps;

    const cardContent = (
      <>
        {/* head row */}
        <div className={styles.head}>
          {author.href ? (
            <a className={styles.author} href={author.href} onClick={(e) => e.stopPropagation()}>
              <Avatar size="xs" src={author.avatarUrl} alt={author.name} ring={author.avatarRing} />
              <span>{author.name}</span>
            </a>
          ) : (
            <span className={styles.author}>
              <Avatar size="xs" src={author.avatarUrl} alt={author.name} ring={author.avatarRing} />
              <span>{author.name}</span>
            </span>
          )}
          {publishedAt && (
            <>
              <span className={styles.dot} aria-hidden="true">
                ·
              </span>
              <time>{publishedAt}</time>
            </>
          )}
        </div>

        {/* content row */}
        <div className={styles.content}>
          <div className={styles.text}>
            <h3 className={styles.title}>{title}</h3>
            {summary && <p className={styles.summary}>{summary}</p>}
          </div>
          {coverImageUrl && (
            <img
              className={styles.cover}
              src={coverImageUrl}
              alt={coverImageAlt}
              aria-hidden={coverImageAlt ? undefined : true}
            />
          )}
        </div>

        {/* footer row (only if there's actually meta or a more button) */}
        {(meta || onMoreClick) && (
          <div className={styles.footer}>
            <div className={styles.meta}>{meta}</div>
            {onMoreClick && (
              <button
                type="button"
                className={styles.moreButton}
                aria-label="更多動作"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onMoreClick();
                }}
              >
                <MoreIcon />
              </button>
            )}
          </div>
        )}
      </>
    );

    const rootClass = clsx(styles.root, size === "big" && styles.big, className);

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={rootClass}
          href={href}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {cardContent}
        </a>
      );
    }

    return (
      <div ref={ref as React.Ref<HTMLDivElement>} className={rootClass}>
        {cardContent}
      </div>
    );
  }
);

ArticleCard.displayName = "ArticleCard";
