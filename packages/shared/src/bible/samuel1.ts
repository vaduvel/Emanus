import type { BibleBook } from "./types.js"
import { reviewSamuel1Explanations } from "./samuel1ExplanationReview.js"
import { restoreSamuel1PoonenFidelity } from "./samuel1PoonenFidelityReview.js"
import { SAMUEL1_1 } from "./samuel1_1.js"
import { SAMUEL1_2, SAMUEL1_3, SAMUEL1_4 } from "./samuel1_2_4.js"
import { SAMUEL1_5, SAMUEL1_6, SAMUEL1_7, SAMUEL1_8 } from "./samuel1_5_8.js"
import { SAMUEL1_9, SAMUEL1_10, SAMUEL1_11, SAMUEL1_12 } from "./samuel1_9_12.js"
import { SAMUEL1_13, SAMUEL1_14, SAMUEL1_15, SAMUEL1_16 } from "./samuel1_13_16.js"
import { SAMUEL1_17, SAMUEL1_18, SAMUEL1_19, SAMUEL1_20 } from "./samuel1_17_20.js"
import { SAMUEL1_21, SAMUEL1_22, SAMUEL1_23, SAMUEL1_24 } from "./samuel1_21_24.js"
import { SAMUEL1_25, SAMUEL1_26, SAMUEL1_27, SAMUEL1_28 } from "./samuel1_25_28.js"
import { SAMUEL1_29, SAMUEL1_30, SAMUEL1_31 } from "./samuel1_29_31.js"

export {
  SAMUEL1_1,
  SAMUEL1_2,
  SAMUEL1_3,
  SAMUEL1_4,
  SAMUEL1_5,
  SAMUEL1_6,
  SAMUEL1_7,
  SAMUEL1_8,
  SAMUEL1_9,
  SAMUEL1_10,
  SAMUEL1_11,
  SAMUEL1_12,
  SAMUEL1_13,
  SAMUEL1_14,
  SAMUEL1_15,
  SAMUEL1_16,
  SAMUEL1_17,
  SAMUEL1_18,
  SAMUEL1_19,
  SAMUEL1_20,
  SAMUEL1_21,
  SAMUEL1_22,
  SAMUEL1_23,
  SAMUEL1_24,
  SAMUEL1_25,
  SAMUEL1_26,
  SAMUEL1_27,
  SAMUEL1_28,
  SAMUEL1_29,
  SAMUEL1_30,
  SAMUEL1_31,
}

const chapters = restoreSamuel1PoonenFidelity(
  reviewSamuel1Explanations([
    SAMUEL1_1,
    SAMUEL1_2,
    SAMUEL1_3,
    SAMUEL1_4,
    SAMUEL1_5,
    SAMUEL1_6,
    SAMUEL1_7,
    SAMUEL1_8,
    SAMUEL1_9,
    SAMUEL1_10,
    SAMUEL1_11,
    SAMUEL1_12,
    SAMUEL1_13,
    SAMUEL1_14,
    SAMUEL1_15,
    SAMUEL1_16,
    SAMUEL1_17,
    SAMUEL1_18,
    SAMUEL1_19,
    SAMUEL1_20,
    SAMUEL1_21,
    SAMUEL1_22,
    SAMUEL1_23,
    SAMUEL1_24,
    SAMUEL1_25,
    SAMUEL1_26,
    SAMUEL1_27,
    SAMUEL1_28,
    SAMUEL1_29,
    SAMUEL1_30,
    SAMUEL1_31,
  ]),
)

export const SAMUEL1: BibleBook = {
  id: "1-samuel",
  name: "1 Samuel",
  testament: "vt",
  order: 9,
  blurb:
    "Cartea trecerii de la Samuel la Saul și David: rugăciune, ascultare, împărăție, gelozie și formarea în ascuns a omului după inima lui Dumnezeu.",
  chapters,
}
