import type { CSSProperties } from "react"

type Variant = "box" | "text" | "circle"

export interface SkeletonProps {
  variant?: Variant
  width?: number | string
  height?: number | string
  radius?: string
  style?: CSSProperties
}

export function Skeleton({ variant = "box", width, height, radius, style }: SkeletonProps) {
  const cls = ["ds-skeleton", variant !== "box" ? `ds-skeleton--${variant}` : null].filter(Boolean).join(" ")
  const resolved: CSSProperties = {
    width,
    height: height ?? (variant === "text" ? undefined : width),
    borderRadius: radius,
    ...style,
  }
  return <span className={cls} style={resolved} aria-hidden />
}
