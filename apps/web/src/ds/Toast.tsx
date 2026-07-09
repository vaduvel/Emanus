import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react"
import type { ReactNode } from "react"
import { Check, Info, TriangleAlert } from "lucide-react"

type ToastTone = "neutral" | "success" | "danger"

interface ToastItem {
  id: number
  message: string
  tone: ToastTone
}

interface ToastApi {
  show: (message: string, tone?: ToastTone) => void
}

const ToastContext = createContext<ToastApi | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  const nextId = useRef(1)

  const dismiss = useCallback((id: number) => {
    setItems((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const show = useCallback(
    (message: string, tone: ToastTone = "neutral") => {
      const id = nextId.current++
      setItems((prev) => [...prev, { id, message, tone }])
      window.setTimeout(() => dismiss(id), 3200)
    },
    [dismiss],
  )

  const api = useMemo<ToastApi>(() => ({ show }), [show])

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="ds-toast-viewport">
        {items.map((t) => (
          <div key={t.id} className={`ds-toast${t.tone !== "neutral" ? ` ds-toast--${t.tone}` : ""}`} role="status">
            {t.tone === "success" ? (
              <Check size={18} strokeWidth={2} aria-hidden />
            ) : t.tone === "danger" ? (
              <TriangleAlert size={18} strokeWidth={2} aria-hidden />
            ) : (
              <Info size={18} strokeWidth={2} aria-hidden />
            )}
            <span className="ds-toast__body">{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>")
  return ctx
}
