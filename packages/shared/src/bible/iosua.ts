import type { BibleBook } from "./types.js"
import { IOSUA_1 } from "./iosua1.js"
import { IOSUA_2 } from "./iosua2.js"
import { IOSUA_3 } from "./iosua3.js"
import { IOSUA_4 } from "./iosua4.js"
import { IOSUA_5 } from "./iosua5.js"
import { IOSUA_6 } from "./iosua6.js"
import { IOSUA_7 } from "./iosua7.js"
import { IOSUA_8 } from "./iosua8.js"
import { IOSUA_9 } from "./iosua9.js"
import { IOSUA_10 } from "./iosua10.js"
import { IOSUA_11 } from "./iosua11.js"
import { IOSUA_12 } from "./iosua12.js"
import { IOSUA_13 } from "./iosua13.js"
import { IOSUA_14 } from "./iosua14.js"
import { IOSUA_15 } from "./iosua15.js"
import { IOSUA_16 } from "./iosua16.js"
import { IOSUA_17 } from "./iosua17.js"
import { IOSUA_18 } from "./iosua18.js"
import { IOSUA_19 } from "./iosua19.js"
import { IOSUA_20 } from "./iosua20.js"
import { IOSUA_21 } from "./iosua21.js"
import { IOSUA_22 } from "./iosua22.js"
import { IOSUA_23 } from "./iosua23.js"
import { IOSUA_24 } from "./iosua24.js"

/*
 * Cartea Iosua.
 *
 * Textul biblic sta in iosuaText.ts (fisierul central, cu iosuaPassage).
 * Explicatia sta in fisierele de capitol: iosua1.ts, iosua2.ts, ...
 *
 * Fisierul acesta doar aduna cartea. Toate cele douazeci si patru de capitole
 * sunt importate aici si asezate in lista `chapters`, ca sa nu fie nevoie de
 * atins index.ts pentru fiecare capitol in parte.
 */

export { IOSUA_1 } from "./iosua1.js"
export { IOSUA_2 } from "./iosua2.js"
export { IOSUA_3 } from "./iosua3.js"
export { IOSUA_4 } from "./iosua4.js"
export { IOSUA_5 } from "./iosua5.js"
export { IOSUA_6 } from "./iosua6.js"
export { IOSUA_7 } from "./iosua7.js"
export { IOSUA_8 } from "./iosua8.js"
export { IOSUA_9 } from "./iosua9.js"
export { IOSUA_10 } from "./iosua10.js"
export { IOSUA_11 } from "./iosua11.js"
export { IOSUA_12 } from "./iosua12.js"
export { IOSUA_13 } from "./iosua13.js"
export { IOSUA_14 } from "./iosua14.js"
export { IOSUA_15 } from "./iosua15.js"
export { IOSUA_16 } from "./iosua16.js"
export { IOSUA_17 } from "./iosua17.js"
export { IOSUA_18 } from "./iosua18.js"
export { IOSUA_19 } from "./iosua19.js"
export { IOSUA_20 } from "./iosua20.js"
export { IOSUA_21 } from "./iosua21.js"
export { IOSUA_22 } from "./iosua22.js"
export { IOSUA_23 } from "./iosua23.js"
export { IOSUA_24 } from "./iosua24.js"

export const IOSUA: BibleBook = {
  id: "iosua",
  name: "Iosua",
  testament: "vt",
  order: 6,
  blurb:
    "Cartea intrarii in tara fagaduita. Iosua conduce poporul peste Iordan, Ierihonul cade, Israel cucereste tara prin puterea DOMNULUI, iar pamantul este impartit intre semintii. Cartea se incheie cu chemarea lui Iosua la Sihem: alegeti astazi cui vreti sa slujiti.",
  chapters: [
    IOSUA_1,
    IOSUA_2,
    IOSUA_3,
    IOSUA_4,
    IOSUA_5,
    IOSUA_6,
    IOSUA_7,
    IOSUA_8,
    IOSUA_9,
    IOSUA_10,
    IOSUA_11,
    IOSUA_12,
    IOSUA_13,
    IOSUA_14,
    IOSUA_15,
    IOSUA_16,
    IOSUA_17,
    IOSUA_18,
    IOSUA_19,
    IOSUA_20,
    IOSUA_21,
    IOSUA_22,
    IOSUA_23,
    IOSUA_24,
  ],
}
