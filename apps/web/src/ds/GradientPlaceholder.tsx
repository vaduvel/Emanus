import type { CSSProperties } from "react"
import type { LucideIcon } from "lucide-react"
import { ImageIcon } from "lucide-react"

type Variant = "mesh" | "hero" | "crisis" | "gold"

export interface GradientPlaceholderProps {
  /** Aspect ratio, e.g. "16 / 9" or "1 / 1". Ignored if `height` is set. */
  ratio?: string
  height?: number | string
  variant?: Variant
  /** Short label describing the future asset (art / animation). */
  label?: string
  icon?: LucideIcon
  radius?: string
  className?: string
  style?: CSSProperties
}

/**
 * A branded gradient stands in wherever real illustration or animation will
 * live. Swap these out once custom assets are generated at the end.
 */
export function GradientPlaceholder({
  ratio = "16 / 9",
  height,
  variant = "mesh",
  label,
  icon: IconGlyph = ImageIcon,
  radius,
  className,
  style,
}: GradientPlaceholderProps) {
  const cls = ["ds-gradient", variant !== "mesh" ? `ds-gradient--${variant}` : null, className]
    .filter(Boolean)
    .join(" ")
  const resolved: CSSProperties = {
    aspectRatio: height ? undefined : ratio,
    height,
    borderRadius: radius,
    ...style,
  }
  return (
    <div className={cls} style={resolved} role="img" aria-label={label ?? "Placeholder vizual"}>
      {label ? (
        <span className="ds-gradient__tag">
          <IconGlyph size={14} strokeWidth={2} aria-hidden />
          {label}
        </span>
      ) : null}
    </div>
  )
}
