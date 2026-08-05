import { DEUTERONOM_TEXT_1 } from "./deuteronomText1.js"
import { DEUTERONOM_TEXT_2 } from "./deuteronomText2.js"
import { DEUTERONOM_TEXT_3 } from "./deuteronomText3.js"
import { DEUTERONOM_TEXT_4 } from "./deuteronomText4.js"
import { DEUTERONOM_TEXT_5 } from "./deuteronomText5.js"
import { DEUTERONOM_TEXT_6 } from "./deuteronomText6.js"
import { DEUTERONOM_TEXT_7 } from "./deuteronomText7.js"
import { DEUTERONOM_TEXT_8 } from "./deuteronomText8.js"
import { DEUTERONOM_TEXT_9 } from "./deuteronomText9.js"
import { DEUTERONOM_TEXT_10 } from "./deuteronomText10.js"
import { DEUTERONOM_TEXT_11 } from "./deuteronomText11.js"
import { DEUTERONOM_TEXT_12 } from "./deuteronomText12.js"
import { DEUTERONOM_TEXT_13 } from "./deuteronomText13.js"
import { DEUTERONOM_TEXT_14 } from "./deuteronomText14.js"
import { DEUTERONOM_TEXT_15 } from "./deuteronomText15.js"
import { DEUTERONOM_TEXT_16 } from "./deuteronomText16.js"
import { DEUTERONOM_TEXT_17 } from "./deuteronomText17.js"
import { DEUTERONOM_TEXT_18 } from "./deuteronomText18.js"
import { DEUTERONOM_TEXT_19 } from "./deuteronomText19.js"
import { DEUTERONOM_TEXT_20 } from "./deuteronomText20.js"
import { DEUTERONOM_TEXT_21 } from "./deuteronomText21.js"
import { DEUTERONOM_TEXT_22 } from "./deuteronomText22.js"
import { DEUTERONOM_TEXT_23 } from "./deuteronomText23.js"
import { DEUTERONOM_TEXT_24 } from "./deuteronomText24.js"
import { DEUTERONOM_TEXT_25 } from "./deuteronomText25.js"
import { DEUTERONOM_TEXT_26 } from "./deuteronomText26.js"
import { DEUTERONOM_TEXT_27 } from "./deuteronomText27.js"
import { DEUTERONOM_TEXT_28 } from "./deuteronomText28.js"
import { DEUTERONOM_TEXT_29 } from "./deuteronomText29.js"
import { DEUTERONOM_TEXT_30 } from "./deuteronomText30.js"
import { DEUTERONOM_TEXT_31 } from "./deuteronomText31.js"
import { DEUTERONOM_TEXT_32 } from "./deuteronomText32.js"
import { DEUTERONOM_TEXT_33 } from "./deuteronomText33.js"
import { DEUTERONOM_TEXT_34 } from "./deuteronomText34.js"

/*
 * Textul biblic al c\u0103r\u021bii Deuteronom, adunat pe capitole.
 *
 * Sursa: Biblia Emanus (BE), docs/data/biblia-emanus/DEU.*.json.
 * Structura r\u0103m\u00e2ne aceea\u015fi chiar dac\u0103 textul se schimb\u0103: se \u00eenlocuiesc doar
 * \u015firurile din fi\u015fierele deuteronomTextN.ts, nu num\u0103rul intr\u0103rilor \u0219i nu cheile.
 */

const DEUTERONOM_TEXT: Record<number, readonly string[]> = {
  ...DEUTERONOM_TEXT_1,
  ...DEUTERONOM_TEXT_2,
  ...DEUTERONOM_TEXT_3,
  ...DEUTERONOM_TEXT_4,
  ...DEUTERONOM_TEXT_5,
  ...DEUTERONOM_TEXT_6,
  ...DEUTERONOM_TEXT_7,
  ...DEUTERONOM_TEXT_8,
  ...DEUTERONOM_TEXT_9,
  ...DEUTERONOM_TEXT_10,
  ...DEUTERONOM_TEXT_11,
  ...DEUTERONOM_TEXT_12,
  ...DEUTERONOM_TEXT_13,
  ...DEUTERONOM_TEXT_14,
  ...DEUTERONOM_TEXT_15,
  ...DEUTERONOM_TEXT_16,
  ...DEUTERONOM_TEXT_17,
  ...DEUTERONOM_TEXT_18,
  ...DEUTERONOM_TEXT_19,
  ...DEUTERONOM_TEXT_20,
  ...DEUTERONOM_TEXT_21,
  ...DEUTERONOM_TEXT_22,
  ...DEUTERONOM_TEXT_23,
  ...DEUTERONOM_TEXT_24,
  ...DEUTERONOM_TEXT_25,
  ...DEUTERONOM_TEXT_26,
  ...DEUTERONOM_TEXT_27,
  ...DEUTERONOM_TEXT_28,
  ...DEUTERONOM_TEXT_29,
  ...DEUTERONOM_TEXT_30,
  ...DEUTERONOM_TEXT_31,
  ...DEUTERONOM_TEXT_32,
  ...DEUTERONOM_TEXT_33,
  ...DEUTERONOM_TEXT_34,
}

export function deuteronomVerseCount(chapter: number): number {
  const verses = DEUTERONOM_TEXT[chapter]
  if (!verses) {
    throw new Error(`[Deuteronom ${chapter}] lipse\u015fte textul biblic \u00een deuteronomText.ts.`)
  }
  return verses.length
}

export function deuteronomPassage(chapter: number, from: number, to: number): string {
  const verses = DEUTERONOM_TEXT[chapter]
  if (!verses) {
    throw new Error(`[Deuteronom ${chapter}] lipse\u015fte textul biblic \u00een deuteronomText.ts.`)
  }
  if (from < 1 || to > verses.length || to < from) {
    throw new Error(
      `[Deuteronom ${chapter}] interval cerut \u00een afara textului: ${from}-${to}; capitolul are ${verses.length} versete.`,
    )
  }
  return verses.slice(from - 1, to).join(" ")
}

export { DEUTERONOM_TEXT }
