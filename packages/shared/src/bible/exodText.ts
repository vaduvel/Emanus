import { EXOD_TEXT_1_TO_4 } from "./exodText1to4.js"
import { EXOD_TEXT_5 } from "./exodText5.js"
import { EXOD_TEXT_6 } from "./exodText6.js"
import { EXOD_TEXT_7 } from "./exodText7.js"

/*
 * Textul biblic al cărții Exod, păstrat separat de explicație.
 * Traducerea: Cornilescu, editia corectata (RCCV), în ortografie modernă.
 *
 * Fișierul acesta nu ține versete: doar adună părțile de text și dă cele două
 * helpere folosite de fișierele de capitol.
 */

const EXOD_TEXT: Record<number, readonly string[]> = {
  ...EXOD_TEXT_1_TO_4,
  ...EXOD_TEXT_5,
  ...EXOD_TEXT_6,
  ...EXOD_TEXT_7,
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
