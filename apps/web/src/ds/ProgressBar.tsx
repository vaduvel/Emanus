export interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showValue?: boolean
}

export function ProgressBar({ value, max = 100, label, showValue = false }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className="ds-progress">
      {(label || showValue) && (
        <div className="ds-progress__meta">
          {label ? <span>{label}</span> : <span />}
          {showValue ? <span>{Math.round(value)}/{max}</span> : null}
        </div>
      )}
      <div
        className="ds-progress__track"
        role="progressbar"
        aria-valuenow={Math.round(value)}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div className="ds-progress__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
