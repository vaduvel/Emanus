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
import { EXOD_TEXT_16 } from "./exodText16.js"
import { EXOD_TEXT_17 } from "./exodText17.js"
import { EXOD_TEXT_18 } from "./exodText18.js"
import { EXOD_TEXT_19 } from "./exodText19.js"
import { EXOD_TEXT_20 } from "./exodText20.js"
import { EXOD_TEXT_21 } from "./exodText21.js"
import { EXOD_TEXT_22 } from "./exodText22.js"
import { EXOD_TEXT_23 } from "./exodText23.js"
import { EXOD_TEXT_24 } from "./exodText24.js"
import { EXOD_TEXT_25 } from "./exodText25.js"
import { EXOD_TEXT_26 } from "./exodText26.js"
import { EXOD_TEXT_27 } from "./exodText27.js"
import { EXOD_TEXT_28 } from "./exodText28.js"
import { EXOD_TEXT_29 } from "./exodText29.js"
import { EXOD_TEXT_30 } from "./exodText30.js"

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
  ...EXOD_TEXT_16,
  ...EXOD_TEXT_17,
  ...EXOD_TEXT_18,
  ...EXOD_TEXT_19,
  ...EXOD_TEXT_20,
  ...EXOD_TEXT_21,
  ...EXOD_TEXT_22,
  ...EXOD_TEXT_23,
  ...EXOD_TEXT_24,
  ...EXOD_TEXT_25,
  ...EXOD_TEXT_26,
  ...EXOD_TEXT_27,
  ...EXOD_TEXT_28,
  ...EXOD_TEXT_29,
  ...EXOD_TEXT_30,
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
