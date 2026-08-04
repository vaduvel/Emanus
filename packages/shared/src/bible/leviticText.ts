import { LEVITIC_TEXT_1 } from "./leviticText1.js"
import { LEVITIC_TEXT_2 } from "./leviticText2.js"
import { LEVITIC_TEXT_3 } from "./leviticText3.js"
import { LEVITIC_TEXT_4 } from "./leviticText4.js"
import { LEVITIC_TEXT_5 } from "./leviticText5.js"
import { LEVITIC_TEXT_6 } from "./leviticText6.js"
import { LEVITIC_TEXT_7 } from "./leviticText7.js"
import { LEVITIC_TEXT_8 } from "./leviticText8.js"
import { LEVITIC_TEXT_9 } from "./leviticText9.js"
import { LEVITIC_TEXT_10 } from "./leviticText10.js"
import { LEVITIC_TEXT_11 } from "./leviticText11.js"
import { LEVITIC_TEXT_12 } from "./leviticText12.js"

/*
 * Textul biblic al cărții Levitic, adunat pe capitole.
 *
 * Structura rămâne aceeași chiar dacă textul se schimbă: se înlocuiesc doar
 * șirurile din fișierele leviticTextN.ts, nu numărul intrărilor și nu cheile.
 */

const LEVITIC_TEXT: Record<number, readonly string[]> = {
  ...LEVITIC_TEXT_1,
  ...LEVITIC_TEXT_2,
  ...LEVITIC_TEXT_3,
  ...LEVITIC_TEXT_4,
  ...LEVITIC_TEXT_5,
  ...LEVITIC_TEXT_6,
  ...LEVITIC_TEXT_7,
  ...LEVITIC_TEXT_8,
  ...LEVITIC_TEXT_9,
  ...LEVITIC_TEXT_10,
  ...LEVITIC_TEXT_11,
  ...LEVITIC_TEXT_12,
}

export function leviticVerseCount(chapter: number): number {
  const verses = LEVITIC_TEXT[chapter]
  if (!verses) {
    throw new Error(`[Levitic ${chapter}] lipsește textul biblic în leviticText.ts.`)
  }
  return verses.length
}

export function leviticPassage(chapter: number, from: number, to: number): string {
  const verses = LEVITIC_TEXT[chapter]
  if (!verses) {
    throw new Error(`[Levitic ${chapter}] lipsește textul biblic în leviticText.ts.`)
  }
  if (from < 1 || to > verses.length || to < from) {
    throw new Error(
      `[Levitic ${chapter}] interval cerut în afara textului: ${from}-${to}; capitolul are ${verses.length} versete.`,
    )
  }
  return verses.slice(from - 1, to).join(" ")
}
