// Catalogul devoționalului: adună lunile scrise într-un singur șir (docs/27 §2.4).
//
// De ce există fișierul ăsta: conținutul unui an nu încape într-un fișier care să
// mai poată fi citit de om. Fiecare lună trăiește în fișierul ei
// (`devotional-luna-0X.ts`), iar aici doar se înlănțuie, în ordine.
//
// Regula rămâne cea din D-004: nu se publică zile fără verset-ancoră. Aplicația
// nu promite 365 de zile, ci atâtea câte sunt scrise — `devotionalDaysAvailable()`
// spune adevărul, nu o cifră de marketing.
import { DEVOTIONAL_DAYS, type DevotionalDay } from "./devotional.js"
import { DEVOTIONAL_DAYS_LUNA_2 } from "./devotional-luna-02.js"

/** Toate zilele scrise până acum, sortate după numărul zilei. */
export const DEVOTIONAL_DAYS_ALL: DevotionalDay[] = [
  ...DEVOTIONAL_DAYS,
  ...DEVOTIONAL_DAYS_LUNA_2,
].sort((a, b) => a.dayNumber - b.dayNumber)

export function devotionalDay(dayNumber: number): DevotionalDay | null {
  return DEVOTIONAL_DAYS_ALL.find((d) => d.dayNumber === dayNumber) ?? null
}

/** Câte zile de conținut există efectiv (nu 365 până se scrie tot). */
export function devotionalDaysAvailable(): number {
  return DEVOTIONAL_DAYS_ALL.length
}

/**
 * Verificare de siguranță, folosită în teste: nicio zi dublată și nicio gaură
 * în numerotare. O gaură ar bloca pe cineva la mijlocul anului.
 */
export function devotionalCatalogIssues(): string[] {
  const issues: string[] = []
  const seen = new Set<number>()
  DEVOTIONAL_DAYS_ALL.forEach((day, i) => {
    if (seen.has(day.dayNumber)) issues.push(`ziua ${day.dayNumber} apare de două ori`)
    seen.add(day.dayNumber)
    if (day.dayNumber !== i + 1) issues.push(`ziua ${day.dayNumber} nu e pe poziția ${i + 1}`)
    if (!day.verseRef.trim() || !day.verseText.trim()) issues.push(`ziua ${day.dayNumber} nu are verset-ancoră`)
  })
  return issues
}
