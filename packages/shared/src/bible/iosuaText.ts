import { IOSUA_TEXT_1 } from "./iosuaText1.js"
import { IOSUA_TEXT_2 } from "./iosuaText2.js"
import { IOSUA_TEXT_3 } from "./iosuaText3.js"
import { IOSUA_TEXT_4 } from "./iosuaText4.js"
import { IOSUA_TEXT_5 } from "./iosuaText5.js"
import { IOSUA_TEXT_6 } from "./iosuaText6.js"
import { IOSUA_TEXT_7 } from "./iosuaText7.js"
import { IOSUA_TEXT_8 } from "./iosuaText8.js"
import { IOSUA_TEXT_9 } from "./iosuaText9.js"
import { IOSUA_TEXT_10 } from "./iosuaText10.js"
import { IOSUA_TEXT_11 } from "./iosuaText11.js"
import { IOSUA_TEXT_12 } from "./iosuaText12.js"
import { IOSUA_TEXT_13 } from "./iosuaText13.js"
import { IOSUA_TEXT_14 } from "./iosuaText14.js"
import { IOSUA_TEXT_15 } from "./iosuaText15.js"
import { IOSUA_TEXT_16 } from "./iosuaText16.js"
import { IOSUA_TEXT_17 } from "./iosuaText17.js"
import { IOSUA_TEXT_18 } from "./iosuaText18.js"
import { IOSUA_TEXT_19 } from "./iosuaText19.js"
import { IOSUA_TEXT_20 } from "./iosuaText20.js"
import { IOSUA_TEXT_21 } from "./iosuaText21.js"
import { IOSUA_TEXT_22 } from "./iosuaText22.js"
import { IOSUA_TEXT_23 } from "./iosuaText23.js"
import { IOSUA_TEXT_24 } from "./iosuaText24.js"

/*
 * Textul biblic al cartii Iosua, adunat pe capitole.
 *
 * Sursa: Biblia Emanus (BE), docs/data/biblia-emanus/JOS.*.json.
 * Structura ramane aceeasi chiar daca textul se schimba: se inlocuiesc doar
 * sirurile din fisierele iosuaTextN.ts, nu numarul intrarilor si nu cheile.
 */

const IOSUA_TEXT: Record<number, readonly string[]> = {
  ...IOSUA_TEXT_1,
  ...IOSUA_TEXT_2,
  ...IOSUA_TEXT_3,
  ...IOSUA_TEXT_4,
  ...IOSUA_TEXT_5,
  ...IOSUA_TEXT_6,
  ...IOSUA_TEXT_7,
  ...IOSUA_TEXT_8,
  ...IOSUA_TEXT_9,
  ...IOSUA_TEXT_10,
  ...IOSUA_TEXT_11,
  ...IOSUA_TEXT_12,
  ...IOSUA_TEXT_13,
  ...IOSUA_TEXT_14,
  ...IOSUA_TEXT_15,
  ...IOSUA_TEXT_16,
  ...IOSUA_TEXT_17,
  ...IOSUA_TEXT_18,
  ...IOSUA_TEXT_19,
  ...IOSUA_TEXT_20,
  ...IOSUA_TEXT_21,
  ...IOSUA_TEXT_22,
  ...IOSUA_TEXT_23,
  ...IOSUA_TEXT_24,
}

export function iosuaVerseCount(chapter: number): number {
  const verses = IOSUA_TEXT[chapter]
  if (!verses) {
    throw new Error(`[Iosua ${chapter}] lipseste textul biblic in iosuaText.ts.`)
  }
  return verses.length
}

export function iosuaPassage(chapter: number, from: number, to: number): string {
  const verses = IOSUA_TEXT[chapter]
  if (!verses) {
    throw new Error(`[Iosua ${chapter}] lipseste textul biblic in iosuaText.ts.`)
  }
  if (from < 1 || to > verses.length || to < from) {
    throw new Error(
      `[Iosua ${chapter}] interval cerut in afara textului: ${from}-${to}; capitolul are ${verses.length} versete.`,
    )
  }
  return verses.slice(from - 1, to).join(" ")
}

export { IOSUA_TEXT }
