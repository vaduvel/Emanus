import type { HTMLAttributes } from "react"

type Tone = "neutral" | "accent" | "gold" | "success" | "danger"

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
  dot?: boolean
}

export function Badge({ tone = "neutral", dot = false, className, children, ...rest }: BadgeProps) {
  const cls = [
    "ds-badge",
    tone !== "neutral" ? `ds-badge--${tone}` : null,
    dot ? "ds-badge--dot" : null,
    className,
  ]
    .filter(Boolean)
    .join(" ")
  return (
    <span className={cls} {...rest}>
      {children}
    </span>
  )
}
