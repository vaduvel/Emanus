import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { ChevronRight, Lock } from "lucide-react"

export interface ListRowProps {
  title: ReactNode
  subtitle?: ReactNode
  /** Leading Lucide icon; ignored when `lead` is provided. */
  icon?: LucideIcon
  /** Custom leading node (avatar, number, etc). */
  lead?: ReactNode
  /** Trailing meta text shown before the chevron. */
  meta?: ReactNode
  active?: boolean
  locked?: boolean
  chevron?: boolean
  onClick?: () => void
}

export function ListRow({
  title,
  subtitle,
  icon: IconGlyph,
  lead,
  meta,
  active = false,
  locked = false,
  chevron,
  onClick,
}: ListRowProps) {
  const cls = [
    "ds-row-item",
    active ? "ds-row-item--active" : null,
    locked ? "ds-row-item--locked" : null,
  ]
    .filter(Boolean)
    .join(" ")
  const showChevron = chevron ?? Boolean(onClick)
  const leadNode = lead ?? (
    <span className="ds-row-item__lead">
      {locked ? <Lock size={16} strokeWidth={1.9} aria-hidden /> : IconGlyph ? <IconGlyph size={18} strokeWidth={1.9} aria-hidden /> : null}
    </span>
  )
  const inner = (
    <>
      {leadNode}
      <span className="ds-row-item__body">
        <span className="ds-row-item__title">{title}</span>
        {subtitle ? <span className="ds-row-item__sub">{subtitle}</span> : null}
      </span>
      {(meta || showChevron) && (
        <span className="ds-row-item__trail">
          {meta}
          {showChevron ? <ChevronRight size={18} strokeWidth={1.9} aria-hidden /> : null}
        </span>
      )}
    </>
  )
  if (onClick && !locked) {
    return (
      <button type="button" className={cls} onClick={onClick}>
        {inner}
      </button>
    )
  }
  return <div className={cls}>{inner}</div>
}
