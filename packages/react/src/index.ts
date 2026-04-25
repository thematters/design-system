// Public API surface for @matters/design-system-react.
// Phase 1: Button. Phase 2: TextField, Dialog, Toast.
// Phase 4: Avatar, Banner, ArticleCard.

export { Button, getButtonClassName } from "./components/Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./components/Button";

export { TextField } from "./components/TextField";
export type { TextFieldProps, TextAreaFieldProps } from "./components/TextField";

export { Dialog } from "./components/Dialog";
export type { DialogProps, DialogSize } from "./components/Dialog";

export { ToastProvider, useToast } from "./components/Toast";
export type { ToastInput, ToastVariant, ToastProviderProps } from "./components/Toast";

export { Avatar } from "./components/Avatar";
export type { AvatarProps, AvatarSize, AvatarRing } from "./components/Avatar";

export { Banner } from "./components/Banner";
export type { BannerProps, BannerLinkProps } from "./components/Banner";

export { ArticleCard } from "./components/ArticleCard";
export type {
  ArticleCardProps,
  ArticleCardPlaceholderProps,
  ArticleCardSize,
  ArticleCardAuthor,
} from "./components/ArticleCard";
