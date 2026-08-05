import { NUMERI_TEXT_1 } from "./numeriText1.js"
import { NUMERI_TEXT_2 } from "./numeriText2.js"
import { NUMERI_TEXT_3 } from "./numeriText3.js"
import { NUMERI_TEXT_4 } from "./numeriText4.js"
import { NUMERI_TEXT_5 } from "./numeriText5.js"
import { NUMERI_TEXT_6 } from "./numeriText6.js"
import { NUMERI_TEXT_7 } from "./numeriText7.js"
import { NUMERI_TEXT_8 } from "./numeriText8.js"
import { NUMERI_TEXT_9 } from "./numeriText9.js"
import { NUMERI_TEXT_10 } from "./numeriText10.js"
import { NUMERI_TEXT_11 } from "./numeriText11.js"
import { NUMERI_TEXT_12 } from "./numeriText12.js"
import { NUMERI_TEXT_13 } from "./numeriText13.js"
import { NUMERI_TEXT_14 } from "./numeriText14.js"
import { NUMERI_TEXT_15 } from "./numeriText15.js"
import { NUMERI_TEXT_16 } from "./numeriText16.js"
import { NUMERI_TEXT_17 } from "./numeriText17.js"
import { NUMERI_TEXT_18 } from "./numeriText18.js"
import { NUMERI_TEXT_19 } from "./numeriText19.js"
import { NUMERI_TEXT_20 } from "./numeriText20.js"
import { NUMERI_TEXT_21 } from "./numeriText21.js"
import { NUMERI_TEXT_22 } from "./numeriText22.js"
import { NUMERI_TEXT_23 } from "./numeriText23.js"
import { NUMERI_TEXT_24 } from "./numeriText24.js"
import { NUMERI_TEXT_25 } from "./numeriText25.js"
import { NUMERI_TEXT_26 } from "./numeriText26.js"
import { NUMERI_TEXT_27 } from "./numeriText27.js"
import { NUMERI_TEXT_28 } from "./numeriText28.js"
import { NUMERI_TEXT_29 } from "./numeriText29.js"
import { NUMERI_TEXT_30 } from "./numeriText30.js"
import { NUMERI_TEXT_31 } from "./numeriText31.js"
import { NUMERI_TEXT_32 } from "./numeriText32.js"
import { NUMERI_TEXT_33 } from "./numeriText33.js"
import { NUMERI_TEXT_34 } from "./numeriText34.js"
import { NUMERI_TEXT_35 } from "./numeriText35.js"
import { NUMERI_TEXT_36 } from "./numeriText36.js"

/*
 * Textul biblic al c\u0103r\u021bii Numeri, adunat pe capitole.
 *
 * Sursa: Biblia Emanus (BE), docs/data/biblia-emanus/NUM.*.json.
 * Structura r\u0103m\u00e2ne aceea\u015fi chiar dac\u0103 textul se schimb\u0103: se \u00eenlocuiesc doar
 * \u015firurile din fi\u015fierele numeriTextN.ts, nu num\u0103rul intr\u0103rilor \u0219i nu cheile.
 */

const NUMERI_TEXT: Record<number, readonly string[]> = {
  ...NUMERI_TEXT_1,
  ...NUMERI_TEXT_2,
  ...NUMERI_TEXT_3,
  ...NUMERI_TEXT_4,
  ...NUMERI_TEXT_5,
  ...NUMERI_TEXT_6,
  ...NUMERI_TEXT_7,
  ...NUMERI_TEXT_8,
  ...NUMERI_TEXT_9,
  ...NUMERI_TEXT_10,
  ...NUMERI_TEXT_11,
  ...NUMERI_TEXT_12,
  ...NUMERI_TEXT_13,
  ...NUMERI_TEXT_14,
  ...NUMERI_TEXT_15,
  ...NUMERI_TEXT_16,
  ...NUMERI_TEXT_17,
  ...NUMERI_TEXT_18,
  ...NUMERI_TEXT_19,
  ...NUMERI_TEXT_20,
  ...NUMERI_TEXT_21,
  ...NUMERI_TEXT_22,
  ...NUMERI_TEXT_23,
  ...NUMERI_TEXT_24,
  ...NUMERI_TEXT_25,
  ...NUMERI_TEXT_26,
  ...NUMERI_TEXT_27,
  ...NUMERI_TEXT_28,
  ...NUMERI_TEXT_29,
  ...NUMERI_TEXT_30,
  ...NUMERI_TEXT_31,
  ...NUMERI_TEXT_32,
  ...NUMERI_TEXT_33,
  ...NUMERI_TEXT_34,
  ...NUMERI_TEXT_35,
  ...NUMERI_TEXT_36,
}

export function numeriVerseCount(chapter: number): number {
  const verses = NUMERI_TEXT[chapter]
  if (!verses) {
    throw new Error(`[Numeri ${chapter}] lipse\u015fte textul biblic \u00een numeriText.ts.`)
  }
  return verses.length
}

export function numeriPassage(chapter: number, from: number, to: number): string {
  const verses = NUMERI_TEXT[chapter]
  if (!verses) {
    throw new Error(`[Numeri ${chapter}] lipse\u015fte textul biblic \u00een numeriText.ts.`)
  }
  if (from < 1 || to > verses.length || to < from) {
    throw new Error(
      `[Numeri ${chapter}] interval cerut \u00een afara textului: ${from}-${to}; capitolul are ${verses.length} versete.`,
    )
  }
  return verses.slice(from - 1, to).join(" ")
}

export { NUMERI_TEXT }
