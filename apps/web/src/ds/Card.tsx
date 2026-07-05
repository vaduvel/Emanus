import type { HTMLAttributes } from "react"

type Variant = "default" | "elevated" | "soft"

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant
  interactive?: boolean
  flush?: boolean
}

export function Card({ variant = "default", interactive = false, flush = false, className, children, ...rest }: CardProps) {
  const cls = [
    "ds-card",
    variant !== "default" ? `ds-card--${variant}` : null,
    interactive ? "ds-card--interactive" : null,
    flush ? "ds-card--flush" : null,
    className,
  ]
    .filter(Boolean)
    .join(" ")
  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  )
}
