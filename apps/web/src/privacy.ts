import { cloudEnabled } from "./cloud"

export function privateWritingNotice(): string {
  return cloudEnabled()
    ? "Ce scrii este privat. Se păstrează pe dispozitiv și în copia ta de siguranță, accesibilă numai contului tău."
    : "Ce scrii este privat și rămâne numai pe acest dispozitiv."
}

/**
 * Lecțiile vechi au câteva promisiuni hardcodate despre stocarea numai pe
 * telefon. Le corectăm la afișare, până când toate textele sunt migrate la
 * componenta unică de confidențialitate.
 */
export function truthfulPrivacyCopy(text: string): string {
  const notice = privateWritingNotice()
  const patterns = [
    /Ce scrii aici rămâne în telefonul tău[^.]*\.?/giu,
    /Ce scrii aici rămâne doar pe telefonul tău[^.]*\.?/giu,
    /Rămâne doar pe telefonul tău[^.]*\.?/giu,
    /Nu se trimite nicăieri[^.]*\.?/giu,
  ]
  return patterns.reduce((value, pattern) => value.replace(pattern, notice), text)
}
