import type { ButtonHTMLAttributes } from "react"
import type { LucideIcon } from "lucide-react"
import { Loader2 } from "lucide-react"

type Variant = "primary" | "secondary" | "ghost" | "gold" | "danger"
type Size = "sm" | "md" | "lg"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  block?: boolean
  loading?: boolean
  iconLeft?: LucideIcon
  iconRight?: LucideIcon
}

export function Button({
  variant = "primary",
  size = "md",
  block = false,
  loading = false,
  iconLeft: IconLeft,
  iconRight: IconRight,
  className,
  children,
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  const glyph = size === "sm" ? 16 : 18
  const cls = [
    "ds-btn",
    `ds-btn--${variant}`,
    `ds-btn--${size}`,
    block ? "ds-btn--block" : null,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button type={type} className={cls} disabled={disabled || loading} {...rest}>
      {loading ? (
        <Loader2 className="ds-btn__spin" size={glyph} strokeWidth={2} aria-hidden />
      ) : IconLeft ? (
        <IconLeft size={glyph} strokeWidth={1.9} aria-hidden />
      ) : null}
      {children ? <span className="ds-btn__label">{children}</span> : null}
      {!loading && IconRight ? <IconRight size={glyph} strokeWidth={1.9} aria-hidden /> : null}
    </button>
  )
}
