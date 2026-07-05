import { useId } from "react"
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react"
import type { LucideIcon } from "lucide-react"

interface BaseProps {
  label?: string
  hint?: string
  error?: string
  required?: boolean
}

export interface InputProps extends BaseProps, Omit<InputHTMLAttributes<HTMLInputElement>, "required"> {
  icon?: LucideIcon
}

export function Field({ label, hint, error, required, icon: IconGlyph, id, className, ...rest }: InputProps) {
  const autoId = useId()
  const fieldId = id ?? autoId
  const wrapCls = ["ds-field__wrap", IconGlyph ? "ds-field__wrap--icon" : null].filter(Boolean).join(" ")
  const rootCls = ["ds-field", error ? "ds-field--error" : null, className].filter(Boolean).join(" ")
  return (
    <div className={rootCls}>
      {label ? (
        <label className="ds-field__label" htmlFor={fieldId}>
          {label}
          {required ? <span className="ds-field__req">*</span> : null}
        </label>
      ) : null}
      <div className={wrapCls}>
        {IconGlyph ? (
          <span className="ds-field__icon">
            <IconGlyph size={18} strokeWidth={1.75} aria-hidden />
          </span>
        ) : null}
        <input id={fieldId} className="ds-input" aria-invalid={error ? true : undefined} {...rest} />
      </div>
      {error ? (
        <span className="ds-field__hint ds-field__hint--error">{error}</span>
      ) : hint ? (
        <span className="ds-field__hint">{hint}</span>
      ) : null}
    </div>
  )
}

export interface TextAreaProps extends BaseProps, Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "required"> {}

export function TextArea({ label, hint, error, required, id, className, ...rest }: TextAreaProps) {
  const autoId = useId()
  const fieldId = id ?? autoId
  const rootCls = ["ds-field", error ? "ds-field--error" : null, className].filter(Boolean).join(" ")
  return (
    <div className={rootCls}>
      {label ? (
        <label className="ds-field__label" htmlFor={fieldId}>
          {label}
          {required ? <span className="ds-field__req">*</span> : null}
        </label>
      ) : null}
      <textarea id={fieldId} className="ds-textarea" aria-invalid={error ? true : undefined} {...rest} />
      {error ? (
        <span className="ds-field__hint ds-field__hint--error">{error}</span>
      ) : hint ? (
        <span className="ds-field__hint">{hint}</span>
      ) : null}
    </div>
  )
}
