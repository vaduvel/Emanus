import type { ButtonHTMLAttributes } from "react"
import type { LucideIcon } from "lucide-react"

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
  icon?: LucideIcon
}

export function Chip({ selected = false, icon: IconGlyph, className, children, type = "button", ...rest }: ChipProps) {
  const cls = ["ds-chip", selected ? "ds-chip--selected" : null, className].filter(Boolean).join(" ")
  return (
    <button type={type} className={cls} aria-pressed={selected} {...rest}>
      {IconGlyph ? <IconGlyph size={15} strokeWidth={1.9} aria-hidden /> : null}
      {children}
    </button>
  )
}
