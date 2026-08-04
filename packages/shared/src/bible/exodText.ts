import { EXOD_TEXT_1_TO_4 } from "./exodText1to4.js"
import { EXOD_TEXT_5 } from "./exodText5.js"
import { EXOD_TEXT_6 } from "./exodText6.js"
import { EXOD_TEXT_7 } from "./exodText7.js"
import { EXOD_TEXT_8 } from "./exodText8.js"
import { EXOD_TEXT_9 } from "./exodText9.js"
import { EXOD_TEXT_10 } from "./exodText10.js"
import { EXOD_TEXT_11 } from "./exodText11.js"
import { EXOD_TEXT_12 } from "./exodText12.js"
import { EXOD_TEXT_13 } from "./exodText13.js"
import { EXOD_TEXT_14 } from "./exodText14.js"
import { EXOD_TEXT_15 } from "./exodText15.js"

/*
 * Textul biblic al cărții Exod, păstrat separat de explicație.
 *
 * Fișierul acesta nu ține versete: doar adună părțile de text și dă cele două
 * helpere folosite de fișierele de capitol. Structura rămâne aceeași chiar dacă
 * textul se schimbă: se înlocuiesc doar șirurile din fișierele exodTextN.ts.
 */

const EXOD_TEXT: Record<number, readonly string[]> = {
  ...EXOD_TEXT_1_TO_4,
  ...EXOD_TEXT_5,
  ...EXOD_TEXT_6,
  ...EXOD_TEXT_7,
  ...EXOD_TEXT_8,
  ...EXOD_TEXT_9,
  ...EXOD_TEXT_10,
  ...EXOD_TEXT_11,
  ...EXOD_TEXT_12,
  ...EXOD_TEXT_13,
  ...EXOD_TEXT_14,
  ...EXOD_TEXT_15,
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
