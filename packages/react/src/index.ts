// Public API surface for @matters/design-system-react.
// Phase 1: Button. Phase 2: TextField, Dialog, Toast.

export { Button, getButtonClassName } from "./components/Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./components/Button";

export { TextField } from "./components/TextField";
export type { TextFieldProps, TextAreaFieldProps } from "./components/TextField";

export { Dialog } from "./components/Dialog";
export type { DialogProps, DialogSize } from "./components/Dialog";

export { ToastProvider, useToast } from "./components/Toast";
export type { ToastInput, ToastVariant, ToastProviderProps } from "./components/Toast";
