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
  ],
}
