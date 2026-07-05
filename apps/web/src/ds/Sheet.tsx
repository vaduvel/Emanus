import { useEffect } from "react"
import type { ReactNode } from "react"
import { X } from "lucide-react"

export interface SheetProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function Sheet({ open, onClose, title, children }: SheetProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="ds-sheet__backdrop" onClick={onClose} role="presentation">
      <div className="ds-sheet" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className="ds-sheet__grip" aria-hidden />
        {title ? (
          <div className="ds-row" style= justifyContent: "space-between", alignItems: "flex-start" >
            <h2 className="ds-sheet__title">{title}</h2>
            <button type="button" className="ds-btn ds-btn--ghost ds-btn--sm" onClick={onClose} aria-label="Închide">
              <X size={18} strokeWidth={1.9} aria-hidden />
            </button>
          </div>
        ) : null}
        {children}
      </div>
    </div>
  )
}
