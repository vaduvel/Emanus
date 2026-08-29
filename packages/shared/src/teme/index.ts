import type { Lesson } from "../domain.js"
import { ORIGINEA_RAULUI_LESSONS } from "./origineaRaului.js"
import { DE_CE_A_MURIT_HRISTOS_LESSONS } from "./deCeAMuritHristos.js"
import { CUVANTUL_HRANA_SI_ARMA_LESSONS } from "./cuvantulHranaSiArma.js"
import { RELIGIOZITATE_SAU_VIATA_LESSONS } from "./religiozitateSauViata.js"
import { FAPTELE_MOARTE_SI_HARUL_LESSONS } from "./fapteleMoarteSiHarul.js"
import { DE_CE_DAM_GRES_LESSONS } from "./deceDamGres.js"
import { LAUDA_CA_ARMA_LESSONS } from "./laudaCaArma.js"
import { SCOPUL_SI_SMERENIA_LESSONS } from "./scopulSiSmerenia.js"
import { CUM_A_TRAIT_ISUS_LESSONS } from "./cumATraitIsus.js"
import { TATAL_SI_BANII_LESSONS } from "./tatalSiBanii.js"
import { CASA_SOT_SOTIE_COPII_LESSONS } from "./casaSotSotieCopii.js"
import { TATAL_NOSTRU_LESSONS } from "./tatalNostruPasCuPas.js"
import { PACATELE_CARE_NE_DISTRUG_LESSONS } from "./pacateleCareNeDistrug.js"
import { IERTARE_SI_VOIA_LUI_DUMNEZEU_LESSONS } from "./iertareSiVoiaLuiDumnezeu.js"

/**
 * Modulele de teme după Zac Poonen, "Basic Christian Teachings" (cele 72 de teme).
 * Vezi docs/41-module-teme-poonen.md pentru mapare și docs/42-sursa-si-atribuire-poonen.md
 * pentru sursa și atribuire. Conținutul este tradus fidel din textul autorului.
 *
 * Toate cursurile sunt in_review: așteaptă citirea finală a unui om.
 */

export type TemeCourseState = "in_review" | "published"

export type TemeCourse = {
  id: string
  title: string
  forWhom: string
  plannedLessons: number
  lessonIds: string[]
  state: TemeCourseState
  source: string
}

export const TEME_LESSONS: Lesson[] = [
  ...ORIGINEA_RAULUI_LESSONS,
  ...DE_CE_A_MURIT_HRISTOS_LESSONS,
  ...CUVANTUL_HRANA_SI_ARMA_LESSONS,
  ...RELIGIOZITATE_SAU_VIATA_LESSONS,
  ...FAPTELE_MOARTE_SI_HARUL_LESSONS,
  ...DE_CE_DAM_GRES_LESSONS,
  ...LAUDA_CA_ARMA_LESSONS,
  ...SCOPUL_SI_SMERENIA_LESSONS,
  ...CUM_A_TRAIT_ISUS_LESSONS,
  ...TATAL_SI_BANII_LESSONS,
  ...CASA_SOT_SOTIE_COPII_LESSONS,
  ...TATAL_NOSTRU_LESSONS,
  ...PACATELE_CARE_NE_DISTRUG_LESSONS,
  ...IERTARE_SI_VOIA_LUI_DUMNEZEU_LESSONS,
]

const ids = (lessons: Lesson[]) => lessons.map((l) => l.id)

export const TEME_COURSES: TemeCourse[] = [
  {
    id: "teme_c1_origine",
    title: "Originea răului și puterea alegerii",
    forWhom: "Pentru oricine întreabă de unde vine răul",
    plannedLessons: ORIGINEA_RAULUI_LESSONS.length,
    lessonIds: ids(ORIGINEA_RAULUI_LESSONS),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 1-5",
  },
  {
    id: "teme_c2_crucea",
    title: "De ce a murit Hristos și darul Duhului",
    forWhom: "Pentru cine vrea temelia",
    plannedLessons: DE_CE_A_MURIT_HRISTOS_LESSONS.length,
    lessonIds: ids(DE_CE_A_MURIT_HRISTOS_LESSONS),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 6-9",
  },
  {
    id: "teme_c3_cuvantul",
    title: "Cuvântul: hrană, armă și înnoirea minții",
    forWhom: "Pentru cine vrea să citească altfel Biblia",
    plannedLessons: CUVANTUL_HRANA_SI_ARMA_LESSONS.length,
    lessonIds: ids(CUVANTUL_HRANA_SI_ARMA_LESSONS),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 10-12",
  },
  {
    id: "teme_c4_religiozitate",
    title: "Religiozitate sau viață",
    forWhom: "Pentru cine se satură de formă fără putere",
    plannedLessons: RELIGIOZITATE_SAU_VIATA_LESSONS.length,
    lessonIds: ids(RELIGIOZITATE_SAU_VIATA_LESSONS),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 13-16",
  },
  {
    id: "teme_c5_fapte_moarte",
    title: "Faptele moarte și harul",
    forWhom: "Pentru cine se ostenește și nu are pace",
    plannedLessons: FAPTELE_MOARTE_SI_HARUL_LESSONS.length,
    lessonIds: ids(FAPTELE_MOARTE_SI_HARUL_LESSONS),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 17-21",
  },
  {
    id: "teme_c6_esec",
    title: "De ce dăm greș",
    forWhom: "Pentru cine cade mereu în același loc",
    plannedLessons: DE_CE_DAM_GRES_LESSONS.length,
    lessonIds: ids(DE_CE_DAM_GRES_LESSONS),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 22-24 și 72",
  },
  {
    id: "teme_c7_lauda",
    title: "Lauda ca armă",
    forWhom: "Pentru cine trece prin strâmtorare",
    plannedLessons: LAUDA_CA_ARMA_LESSONS.length,
    lessonIds: ids(LAUDA_CA_ARMA_LESSONS),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 25-30",
  },
  {
    id: "teme_c8_smerenia",
    title: "Scopul lui Dumnezeu și smerenia lui Hristos",
    forWhom: "Pentru cine vrea să știe de ce a fost făcut",
    plannedLessons: SCOPUL_SI_SMERENIA_LESSONS.length,
    lessonIds: ids(SCOPUL_SI_SMERENIA_LESSONS),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 31-34",
  },
  {
    id: "teme_c9_cum_a_trait",
    title: "Cum a trăit Isus",
    forWhom: "Pentru cine vrea să-I calce pe urme",
    plannedLessons: CUM_A_TRAIT_ISUS_LESSONS.length,
    lessonIds: ids(CUM_A_TRAIT_ISUS_LESSONS),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 35-42",
  },
  {
    id: "teme_c10_tatal_banii",
    title: "Tatăl, înțelepciunea și banii",
    forWhom: "Pentru cine duce grija zilei de mâine",
    plannedLessons: TATAL_SI_BANII_LESSONS.length,
    lessonIds: ids(TATAL_SI_BANII_LESSONS),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 43-48",
  },
  {
    id: "teme_c11_casa",
    title: "Casa: soț, soție, copii",
    forWhom: "Pentru familii",
    plannedLessons: CASA_SOT_SOTIE_COPII_LESSONS.length,
    lessonIds: ids(CASA_SOT_SOTIE_COPII_LESSONS),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 49-52",
  },
  {
    id: "teme_c12_rugaciunea",
    title: "Tatăl nostru, pas cu pas",
    forWhom: "Pentru cine vrea să învețe să se roage",
    plannedLessons: TATAL_NOSTRU_LESSONS.length,
    lessonIds: ids(TATAL_NOSTRU_LESSONS),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 53-58",
  },
  {
    id: "teme_c13_pacate",
    title: "Păcatele care ne distrug",
    forWhom: "Pentru cine vrea să vadă păcatul cum îl vede Isus",
    plannedLessons: PACATELE_CARE_NE_DISTRUG_LESSONS.length,
    lessonIds: ids(PACATELE_CARE_NE_DISTRUG_LESSONS),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 59-63, 65, 67",
  },
  {
    id: "teme_c14_voia_lui",
    title: "Iertare, minciunile celui rău, voia lui Dumnezeu",
    forWhom: "Pentru cine are hotărâri de luat",
    plannedLessons: IERTARE_SI_VOIA_LUI_DUMNEZEU_LESSONS.length,
    lessonIds: ids(IERTARE_SI_VOIA_LUI_DUMNEZEU_LESSONS),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 64, 66, 68-71",
  },
]

export function findTemeCourse(id: string): TemeCourse | undefined {
  return TEME_COURSES.find((c) => c.id === id)
}

export function findTemeLesson(id: string): Lesson | undefined {
  return TEME_LESSONS.find((l) => l.id === id)
}

export function temeCourseLessons(courseId: string): Lesson[] {
  return TEME_LESSONS.filter((l) => l.courseId === courseId).sort((a, b) => a.order - b.order)
}
