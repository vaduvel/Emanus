import type { BibleBook } from "./types.js"
import { DEUTERONOM_1 } from "./deuteronom1.js"
import { DEUTERONOM_2 } from "./deuteronom2.js"
import { DEUTERONOM_3 } from "./deuteronom3.js"
import { DEUTERONOM_4 } from "./deuteronom4.js"
import { DEUTERONOM_5 } from "./deuteronom5.js"
import { DEUTERONOM_6 } from "./deuteronom6.js"
import { DEUTERONOM_7 } from "./deuteronom7.js"
import { DEUTERONOM_8 } from "./deuteronom8.js"
import { DEUTERONOM_9 } from "./deuteronom9.js"
import { DEUTERONOM_10 } from "./deuteronom10.js"
import { DEUTERONOM_11 } from "./deuteronom11.js"
import { DEUTERONOM_12 } from "./deuteronom12.js"
import { DEUTERONOM_13 } from "./deuteronom13.js"
import { DEUTERONOM_14 } from "./deuteronom14.js"
import { DEUTERONOM_15 } from "./deuteronom15.js"
import { DEUTERONOM_16 } from "./deuteronom16.js"
import { DEUTERONOM_17 } from "./deuteronom17.js"
import { DEUTERONOM_18 } from "./deuteronom18.js"
import { DEUTERONOM_19 } from "./deuteronom19.js"
import { DEUTERONOM_20 } from "./deuteronom20.js"
import { DEUTERONOM_21 } from "./deuteronom21.js"
import { DEUTERONOM_22 } from "./deuteronom22.js"
import { DEUTERONOM_23 } from "./deuteronom23.js"
import { DEUTERONOM_24 } from "./deuteronom24.js"
import { DEUTERONOM_25 } from "./deuteronom25.js"
import { DEUTERONOM_26 } from "./deuteronom26.js"
import { DEUTERONOM_27 } from "./deuteronom27.js"
import { DEUTERONOM_28 } from "./deuteronom28.js"
import { DEUTERONOM_29 } from "./deuteronom29.js"
import { DEUTERONOM_30 } from "./deuteronom30.js"
import { DEUTERONOM_31 } from "./deuteronom31.js"
import { DEUTERONOM_32 } from "./deuteronom32.js"
import { DEUTERONOM_33 } from "./deuteronom33.js"
import { DEUTERONOM_34 } from "./deuteronom34.js"

/*
 * Cartea Deuteronom.
 *
 * Textul biblic sta in deuteronomText.ts (fisierul central, cu deuteronomPassage).
 * Explicatia sta in fisierele de capitol: deuteronom1.ts, deuteronom2.ts, ...
 *
 * Fisierul acesta doar aduna cartea. Toate cele treizeci si patru de capitole
 * sunt importate aici si asezate in lista `chapters`, ca sa nu fie nevoie de
 * atins index.ts pentru fiecare capitol in parte.
 */

export { DEUTERONOM_1 } from "./deuteronom1.js"
export { DEUTERONOM_2 } from "./deuteronom2.js"
export { DEUTERONOM_3 } from "./deuteronom3.js"
export { DEUTERONOM_4 } from "./deuteronom4.js"
export { DEUTERONOM_5 } from "./deuteronom5.js"
export { DEUTERONOM_6 } from "./deuteronom6.js"
export { DEUTERONOM_7 } from "./deuteronom7.js"
export { DEUTERONOM_8 } from "./deuteronom8.js"
export { DEUTERONOM_9 } from "./deuteronom9.js"
export { DEUTERONOM_10 } from "./deuteronom10.js"
export { DEUTERONOM_11 } from "./deuteronom11.js"
export { DEUTERONOM_12 } from "./deuteronom12.js"
export { DEUTERONOM_13 } from "./deuteronom13.js"
export { DEUTERONOM_14 } from "./deuteronom14.js"
export { DEUTERONOM_15 } from "./deuteronom15.js"
export { DEUTERONOM_16 } from "./deuteronom16.js"
export { DEUTERONOM_17 } from "./deuteronom17.js"
export { DEUTERONOM_18 } from "./deuteronom18.js"
export { DEUTERONOM_19 } from "./deuteronom19.js"
export { DEUTERONOM_20 } from "./deuteronom20.js"
export { DEUTERONOM_21 } from "./deuteronom21.js"
export { DEUTERONOM_22 } from "./deuteronom22.js"
export { DEUTERONOM_23 } from "./deuteronom23.js"
export { DEUTERONOM_24 } from "./deuteronom24.js"
export { DEUTERONOM_25 } from "./deuteronom25.js"
export { DEUTERONOM_26 } from "./deuteronom26.js"
export { DEUTERONOM_27 } from "./deuteronom27.js"
export { DEUTERONOM_28 } from "./deuteronom28.js"
export { DEUTERONOM_29 } from "./deuteronom29.js"
export { DEUTERONOM_30 } from "./deuteronom30.js"
export { DEUTERONOM_31 } from "./deuteronom31.js"
export { DEUTERONOM_32 } from "./deuteronom32.js"
export { DEUTERONOM_33 } from "./deuteronom33.js"
export { DEUTERONOM_34 } from "./deuteronom34.js"

export const DEUTERONOM: BibleBook = {
  id: "deuteronom",
  name: "Deuteronom",
  testament: "vt",
  order: 5,
  blurb:
    "Cartea celei de-a doua rostiri a Legii, pe malul Iordanului. Moise recapituleaza istoria, reia legile legămantului si le adanceste, avertizeaza cu binecuvântari si blesteme fara precedent, si isi incheie viata cu o binecuvântare finala si cu o privire asupra tarii pe care nu o va calca. Cartea se termina cu chemarea centrala: alege viața.",
  chapters: [
    DEUTERONOM_1,
    DEUTERONOM_2,
    DEUTERONOM_3,
    DEUTERONOM_4,
    DEUTERONOM_5,
    DEUTERONOM_6,
    DEUTERONOM_7,
    DEUTERONOM_8,
    DEUTERONOM_9,
    DEUTERONOM_10,
    DEUTERONOM_11,
    DEUTERONOM_12,
    DEUTERONOM_13,
    DEUTERONOM_14,
    DEUTERONOM_15,
    DEUTERONOM_16,
    DEUTERONOM_17,
    DEUTERONOM_18,
    DEUTERONOM_19,
    DEUTERONOM_20,
    DEUTERONOM_21,
    DEUTERONOM_22,
    DEUTERONOM_23,
    DEUTERONOM_24,
    DEUTERONOM_25,
    DEUTERONOM_26,
    DEUTERONOM_27,
    DEUTERONOM_28,
    DEUTERONOM_29,
    DEUTERONOM_30,
    DEUTERONOM_31,
    DEUTERONOM_32,
    DEUTERONOM_33,
    DEUTERONOM_34,
  ],
}
