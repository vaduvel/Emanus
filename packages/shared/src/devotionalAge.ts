// Faza G (docs/27 §6): varianta pe vârstă a devoționalului și Legământul
// familiei.
//
// Regula: textul de bază rămâne cel scris pentru adult. Varianta pe vârstă se
// folosește DOAR dacă ziua respectivă are `ageVariants` scrise de om; nu se
// generează și nu se simplifică automat un text biblic (docs/27 §1.2).
// Versetul-ancoră nu se schimbă niciodată între variante (D-004).
import type { DevotionalAgeVariant, DevotionalDay } from "./devotional.js"
import { FAMILY_THEMES, type FamilyThemeOption } from "./family.js"

export type DevotionalAgeMode = "adult" | "kids6_11" | "teens12_18"

export interface DevotionalAgeModeOption {
  id: DevotionalAgeMode
  label: string
  hint: string
}

export const DEVOTIONAL_AGE_MODES: DevotionalAgeModeOption[] = [
  {
    id: "adult",
    label: "Pentru mine",
    hint: "Textul așa cum a fost scris.",
  },
  {
    id: "kids6_11",
    label: "Cu copilul",
    hint: "Același verset, spus pe înțelesul unui copil.",
  },
  {
    id: "teens12_18",
    label: "Cu adolescentul",
    hint: "Același verset, fără limbaj bisericesc.",
  },
]

export function devotionalAgeModeById(
  id: string,
): DevotionalAgeModeOption | undefined {
  return DEVOTIONAL_AGE_MODES.find((m) => m.id === id)
}

/**
 * Întoarce ziua așa cum trebuie afișată pentru modul cerut.
 * Dacă nu există variantă scrisă, se întoarce ziua de bază, neatinsă.
 */
export function devotionalDayForAge(
  day: DevotionalDay,
  mode: DevotionalAgeMode,
): DevotionalDay {
  if (mode === "adult") return day
  const variant = day.ageVariants?.[mode] as DevotionalAgeVariant | undefined
  if (!variant) return day
  return {
    ...day,
    meditation: variant.meditation,
    question: variant.question,
    prayer: variant.prayer,
    step: variant.step,
  }
}

/** Spune dacă ziua chiar are text scris pentru modul cerut. */
export function devotionalHasAgeVariant(
  day: DevotionalDay,
  mode: DevotionalAgeMode,
): boolean {
  if (mode === "adult") return true
  return Boolean(day.ageVariants?.[mode])
}

// ---------------------------------------------------------------------------
// Legământul familiei (docs/27 §6, faza G; temele vin din family.ts)
// ---------------------------------------------------------------------------

export interface FamilyCovenantStep {
  id: string
  title: string
  body: string
}

/** Cei patru pași prin care o familie își face legământul. Scurți intenționat. */
export const FAMILY_COVENANT_STEPS: FamilyCovenantStep[] = [
  {
    id: "cine",
    title: "Cine suntem",
    body: "Scrieți numele celor care fac legământul. Nu trebuie să fie toată casa; începe cine vrea.",
  },
  {
    id: "tema",
    title: "Ce alegem",
    body: "Alegeți o singură temă pentru perioada asta. Una, nu cinci.",
  },
  {
    id: "promisiune",
    title: "Ce promitem",
    body: "Scrieți într-o propoziție ce veți face concret, în fiecare zi sau în fiecare săptămână.",
  },
  {
    id: "cadere",
    title: "Ce facem când cădem",
    body: "Stabiliți dinainte ce se întâmplă când uitați o zi: se reia, nu se renunță și nu se reproșează.",
  },
]

export const FAMILY_COVENANT_VERSE_REF = "Iosua 24:15"
export const FAMILY_COVENANT_VERSE_TEXT =
  "Eu și casa mea vom sluji Domnului."

export interface FamilyCovenantDraft {
  names: string[]
  themeId: string
  promise: string
  onFall: string
}

export const FAMILY_COVENANT_EMPTY_DRAFT: FamilyCovenantDraft = {
  names: [],
  themeId: "",
  promise: "",
  onFall: "Reluăm a doua zi, fără reproșuri.",
}

export interface FamilyCovenantIssue {
  field: keyof FamilyCovenantDraft
  message: string
}

/** Verifică dacă legământul poate fi salvat. Regulile sunt blajine și clare. */
export function familyCovenantIssues(
  draft: FamilyCovenantDraft,
): FamilyCovenantIssue[] {
  const issues: FamilyCovenantIssue[] = []
  const names = draft.names.map((n) => n.trim()).filter(Boolean)
  if (names.length < 2) {
    issues.push({
      field: "names",
      message: "Un legământ se face cu cineva. Scrie cel puțin două nume.",
    })
  }
  if (!FAMILY_THEMES.some((t) => t.id === draft.themeId)) {
    issues.push({ field: "themeId", message: "Alegeți o temă." })
  }
  if (draft.promise.trim().length < 10) {
    issues.push({
      field: "promise",
      message: "Scrieți promisiunea într-o propoziție întreagă.",
    })
  }
  if (!draft.onFall.trim()) {
    issues.push({
      field: "onFall",
      message: "Scrieți ce faceți când uitați o zi.",
    })
  }
  return issues
}

/** Textul final, gata de citit cu voce tare și de pus pe frigider. */
export function familyCovenantText(
  draft: FamilyCovenantDraft,
  theme?: FamilyThemeOption,
): string {
  const names = draft.names.map((n) => n.trim()).filter(Boolean)
  const who = names.length > 1
    ? names.slice(0, -1).join(", ") + " și " + names[names.length - 1]
    : names[0] ?? "Noi"
  const chosen = theme ?? FAMILY_THEMES.find((t) => t.id === draft.themeId)
  const lines = [
    who + ", împreună, facem legământul acesta înaintea lui Dumnezeu.",
    chosen ? "Tema noastră: " + chosen.title + ". " + chosen.focus : "",
    "Promitem: " + draft.promise.trim(),
    "Când cădem: " + draft.onFall.trim(),
    "„" + FAMILY_COVENANT_VERSE_TEXT + "” (" + FAMILY_COVENANT_VERSE_REF + ")",
  ]
  return lines.filter(Boolean).join("\n")
}
