import type { CSSProperties, ElementType, HTMLAttributes } from "react"

type SpaceStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16

function space(step: SpaceStep): string | undefined {
  return step === 0 ? "0" : `var(--space-${step})`
}

interface StackProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  gap?: SpaceStep
  align?: CSSProperties["alignItems"]
  justify?: CSSProperties["justifyContent"]
}

export function Stack({ as: As = "div", gap = 3, align, justify, style, className, ...rest }: StackProps) {
  const merged: CSSProperties = { gap: space(gap), alignItems: align, justifyContent: justify, ...style }
  return <As className={["ds-stack", className].filter(Boolean).join(" ")} style={merged} {...rest} />
}

interface RowProps extends StackProps {
  wrap?: boolean
}

export function Row({ as: As = "div", gap = 3, align = "center", justify, wrap = false, style, className, ...rest }: RowProps) {
  const merged: CSSProperties = { gap: space(gap), alignItems: align, justifyContent: justify, ...style }
  const cls = ["ds-row", wrap ? "ds-row--wrap" : null, className].filter(Boolean).join(" ")
  return <As className={cls} style={merged} {...rest} />
}

export function Spacer() {
  return <span className="ds-spacer" aria-hidden />
}
