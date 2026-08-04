import type { BibleBook } from "./types.js"
import { EXOD_1 } from "./exod1.js"
import { EXOD_2 } from "./exod2.js"
import { EXOD_3 } from "./exod3.js"
import { EXOD_4 } from "./exod4.js"
import { EXOD_5 } from "./exod5.js"
import { EXOD_6 } from "./exod6.js"
import { EXOD_7 } from "./exod7.js"
import { EXOD_8 } from "./exod8.js"
import { EXOD_9 } from "./exod9.js"
import { EXOD_10 } from "./exod10.js"
import { EXOD_11 } from "./exod11.js"
import { EXOD_12 } from "./exod12.js"
import { EXOD_13 } from "./exod13.js"
import { EXOD_14 } from "./exod14.js"
import { EXOD_15 } from "./exod15.js"
import { EXOD_16 } from "./exod16.js"
import { EXOD_17 } from "./exod17.js"
import { EXOD_18 } from "./exod18.js"
import { EXOD_19 } from "./exod19.js"
import { EXOD_20 } from "./exod20.js"
import { EXOD_21 } from "./exod21.js"
import { EXOD_22 } from "./exod22.js"
import { EXOD_23 } from "./exod23.js"
import { EXOD_24 } from "./exod24.js"
import { EXOD_25 } from "./exod25.js"
import { EXOD_26 } from "./exod26.js"
import { EXOD_27 } from "./exod27.js"
import { EXOD_28 } from "./exod28.js"
import { EXOD_29 } from "./exod29.js"
import { EXOD_30 } from "./exod30.js"
import { EXOD_31 } from "./exod31.js"
import { EXOD_32 } from "./exod32.js"
import { EXOD_33 } from "./exod33.js"
import { EXOD_34 } from "./exod34.js"
import { EXOD_35 } from "./exod35.js"
import { EXOD_36 } from "./exod36.js"
import { EXOD_37 } from "./exod37.js"
import { EXOD_38 } from "./exod38.js"
import { EXOD_39 } from "./exod39.js"

/*
 * Cartea Exod (Ieșirea).
 *
 * Textul biblic stă în exodText.ts (fișierele exodTextN.ts).
 * Explicația stă în fișierele de capitol: exod1.ts, exod2.ts, exod3.ts, ...
 *
 * Fișierul acesta doar adună cartea. Fiecare capitol nou se importă aici și se
 * adaugă în lista `chapters`, ca să nu mai fie nevoie de atins index.ts.
 */

export { EXOD_1 } from "./exod1.js"
export { EXOD_2 } from "./exod2.js"
export { EXOD_3 } from "./exod3.js"
export { EXOD_4 } from "./exod4.js"
export { EXOD_5 } from "./exod5.js"
export { EXOD_6 } from "./exod6.js"
export { EXOD_7 } from "./exod7.js"
export { EXOD_8 } from "./exod8.js"
export { EXOD_9 } from "./exod9.js"
export { EXOD_10 } from "./exod10.js"
export { EXOD_11 } from "./exod11.js"
export { EXOD_12 } from "./exod12.js"
export { EXOD_13 } from "./exod13.js"
export { EXOD_14 } from "./exod14.js"
export { EXOD_15 } from "./exod15.js"
export { EXOD_16 } from "./exod16.js"
export { EXOD_17 } from "./exod17.js"
export { EXOD_18 } from "./exod18.js"
export { EXOD_19 } from "./exod19.js"
export { EXOD_20 } from "./exod20.js"
export { EXOD_21 } from "./exod21.js"
export { EXOD_22 } from "./exod22.js"
export { EXOD_23 } from "./exod23.js"
export { EXOD_24 } from "./exod24.js"
export { EXOD_25 } from "./exod25.js"
export { EXOD_26 } from "./exod26.js"
export { EXOD_27 } from "./exod27.js"
export { EXOD_28 } from "./exod28.js"
export { EXOD_29 } from "./exod29.js"
export { EXOD_30 } from "./exod30.js"
export { EXOD_31 } from "./exod31.js"
export { EXOD_32 } from "./exod32.js"
export { EXOD_33 } from "./exod33.js"
export { EXOD_34 } from "./exod34.js"
export { EXOD_35 } from "./exod35.js"
export { EXOD_36 } from "./exod36.js"
export { EXOD_37 } from "./exod37.js"
export { EXOD_38 } from "./exod38.js"
export { EXOD_39 } from "./exod39.js"

export const EXOD: BibleBook = {
  id: "exod",
  name: "Exod",
  testament: "vt",
  order: 2,
  blurb:
    "Cartea ieșirii din robie. În ebraică se numește „Numele”, fiindcă începe cu oameni chemați pe nume. Aici Dumnezeu Se coboară în suferința unui popor, Își descoperă Numele, scoate cu mână tare, dă Legea și vine să locuiască în mijlocul alor Săi.",
  chapters: [
    EXOD_1,
    EXOD_2,
    EXOD_3,
    EXOD_4,
    EXOD_5,
    EXOD_6,
    EXOD_7,
    EXOD_8,
    EXOD_9,
    EXOD_10,
    EXOD_11,
    EXOD_12,
    EXOD_13,
    EXOD_14,
    EXOD_15,
    EXOD_16,
    EXOD_17,
    EXOD_18,
    EXOD_19,
    EXOD_20,
    EXOD_21,
    EXOD_22,
    EXOD_23,
    EXOD_24,
    EXOD_25,
    EXOD_26,
    EXOD_27,
    EXOD_28,
    EXOD_29,
    EXOD_30,
    EXOD_31,
    EXOD_32,
    EXOD_33,
    EXOD_34,
    EXOD_35,
    EXOD_36,
    EXOD_37,
    EXOD_38,
    EXOD_39,
  ],
}
