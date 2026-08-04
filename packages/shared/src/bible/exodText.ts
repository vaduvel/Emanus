import { EXOD_TEXT_1_TO_4 } from "./exodText1to4.js"

/*
 * Textul biblic al cărții Exod, păstrat separat de explicație.
 * Traducerea: Cornilescu, editia corectata (RCCV), în ortografie modernă.
 *
 * Fișierul acesta nu ține versete: doar adună părțile de text și dă cele două
 * helpere folosite de fișierele de capitol. Fiecare grup de capitole stă în
 * fișierul lui (exodText1to4.ts, exodText5.ts, ...), ca adăugarea unui capitol
 * nou să nu ceară rescrierea întregului text al cărții.
 */

const EXOD_TEXT: Record<number, readonly string[]> = {
  ...EXOD_TEXT_1_TO_4,
}

/** Câte versete are capitolul cerut. Aruncă dacă textul nu a fost încă adăugat. */
export function exodVerseCount(chapter: number): number {
  const verses = EXOD_TEXT[chapter]
  if (!verses) {
    throw new Error(`[Exod ${chapter}] lipsește textul biblic în exodText.ts.`)
  }
  return verses.length
}

/** Textul versetelor de la `from` până la `to`, inclusiv, legate cu spațiu. */
export function exodPassage(chapter: number, from: number, to: number): string {
  const verses = EXOD_TEXT[chapter]
  if (!verses) {
    throw new Error(`[Exod ${chapter}] lipsește textul biblic în exodText.ts.`)
  }
  if (from < 1 || to > verses.length || to < from) {
    throw new Error(
      `[Exod ${chapter}] interval cerut în afara textului: ${from}-${to}; capitolul are ${verses.length} versete.`,
    )
  }
  return verses.slice(from - 1, to).join(" ")
}
