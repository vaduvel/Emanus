import type { LucideIcon, LucideProps } from "lucide-react"

export type { LucideIcon }

export interface IconProps extends Omit<LucideProps, "ref"> {
  /** The Lucide icon component to render. */
  icon: LucideIcon
  /** Accessible label. When omitted, the icon is treated as decorative. */
  label?: string
}

/**
 * Thin wrapper around Lucide icons so the whole app shares a consistent
 * stroke weight and a11y behaviour. No emoji anywhere in the DS.
 */
export function Icon({ icon: LucideGlyph, label, size = 20, strokeWidth = 1.75, ...rest }: IconProps) {
  return (
    <LucideGlyph
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      {...rest}
    />
  )
}
