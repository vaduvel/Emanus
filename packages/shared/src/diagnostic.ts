// Diagnostic inițial (workbook §10): un chestionar scurt care setează baseline-ul
// radarului de creștere pe cele 6 axe. Definit ca date, per categorie de vârstă.
import { GROWTH_AXES } from "./domain.js"
import type { AgeCategoryId, GrowthAxisId } from "./domain.js"

export interface DiagnosticQuestion {
  id: string
  axis: GrowthAxisId
  prompt: string
}

// Likert 1..5 (1 = deloc adevărat, 5 = complet adevărat) — câte un enunț pe axă.
export const TEEN_DIAGNOSTIC: DiagnosticQuestion[] = [
  {
    id: "d_identity",
    axis: "identity",
    prompt: "Știu cine sunt, iar valoarea mea nu depinde de like-uri sau de părerea altora.",
  },
  {
    id: "d_emotional_peace",
    axis: "emotional_peace",
    prompt: "Chiar și când e greu, găsesc liniște și nu mă las copleșit de anxietate.",
  },
  {
    id: "d_relationships",
    axis: "relationships",
    prompt: "Am relații sănătoase și știu să pun limite și să iert.",
  },
  {
    id: "d_living_faith",
    axis: "living_faith",
    prompt: "Credința mea e vie zi de zi, nu doar duminica.",
  },
  {
    id: "d_character",
    axis: "character",
    prompt: "Aleg să fac ce e bine chiar și atunci când nimeni nu se uită.",
  },
  {
    id: "d_freedom",
    axis: "freedom",
    prompt: "Sunt liber de obiceiuri care mă trag în jos.",
  },
]

export const DIAGNOSTICS: Partial<Record<AgeCategoryId, DiagnosticQuestion[]>> = {
  teens12_18: TEEN_DIAGNOSTIC,
}

export function getDiagnostic(categoryId: AgeCategoryId): DiagnosticQuestion[] {
  return DIAGNOSTICS[categoryId] ?? TEEN_DIAGNOSTIC
}

/** Likert 1..5 -> scor 0..100. */
export function likertToScore(value: number): number {
  const v = Math.max(1, Math.min(5, Math.round(value)))
  return Math.round(((v - 1) / 4) * 100)
}

/** Din răspunsuri {questionId: 1..5} calculează baseline-ul mediu per axă (0..100). */
export function computeBaseline(
  categoryId: AgeCategoryId,
  answers: Record<string, number>,
): Array<{ axis: GrowthAxisId; score: number }> {
  const qs = getDiagnostic(categoryId)
  const byAxis = new Map<GrowthAxisId, number[]>()
  for (const q of qs) {
    const a = answers[q.id]
    if (typeof a === "number") {
      const arr = byAxis.get(q.axis) ?? []
      arr.push(likertToScore(a))
      byAxis.set(q.axis, arr)
    }
  }
  return GROWTH_AXES.map((axis) => {
    const arr = byAxis.get(axis) ?? []
    const score = arr.length ? Math.round(arr.reduce((s, n) => s + n, 0) / arr.length) : 20
    return { axis, score }
  })
}
