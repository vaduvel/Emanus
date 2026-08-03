import type { Lesson } from "../domain.js"
import { ORIGINEA_RAULUI_LESSONS } from "./origineaRaului.js"
import { DE_CE_A_MURIT_HRISTOS_LESSONS } from "./deCeAMuritHristos.js"
import { CUVANTUL_HRANA_SI_ARMA_LESSONS } from "./cuvantulHranaSiArma.js"
import { RELIGIOZITATE_SAU_VIATA_LESSONS } from "./religiozitateSauViata.js"
import { FAPTELE_MOARTE_SI_HARUL_LESSONS } from "./fapteleMoarteSiHarul.js"
import { DE_CE_DAM_GRES_LESSONS } from "./deceDamGres.js"

/**
 * Module de teme, scrise pe baza seriei "Basic Christian Teachings" a lui Zac Poonen.
 * Continutul este tradus fidel din textul autorului.
 * Sursa si nota de drepturi: docs/42-sursa-si-atribuire-poonen.md
 * Planul complet al celor 14 module: docs/41-module-teme-poonen.md
 */

export type TemeCourseState = "in_review" | "published"

export type TemeCourse = {
  id: string
  title: string
  forWhom: string
  plannedLessons: number
  lessonIds: string[]
  state: TemeCourseState
  /** temele din serie pe care le acopera modulul */
  source: string
}

export const TEME_LESSONS: Lesson[] = [
  ...ORIGINEA_RAULUI_LESSONS,
  ...DE_CE_A_MURIT_HRISTOS_LESSONS,
  ...CUVANTUL_HRANA_SI_ARMA_LESSONS,
  ...RELIGIOZITATE_SAU_VIATA_LESSONS,
  ...FAPTELE_MOARTE_SI_HARUL_LESSONS,
  ...DE_CE_DAM_GRES_LESSONS,
]

export const TEME_COURSES: TemeCourse[] = [
  {
    id: "teme_c1_origine",
    title: "Originea raului si puterea alegerii",
    forWhom: "Pentru cine se intreaba de ce exista raul si de ce conteaza alegerile lui",
    plannedLessons: 5,
    lessonIds: ORIGINEA_RAULUI_LESSONS.map((l) => l.id),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 1-5",
  },
  {
    id: "teme_c2_crucea",
    title: "De ce a murit Hristos si darul Duhului",
    forWhom: "Pentru cine vrea temelia: cruce, pocainta, credinta, Duhul Sfant",
    plannedLessons: 4,
    lessonIds: DE_CE_A_MURIT_HRISTOS_LESSONS.map((l) => l.id),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 6-9",
  },
  {
    id: "teme_c3_cuvantul",
    title: "Cuvantul: hrana, arma si innoirea mintii",
    forWhom: "Pentru cine citeste Biblia si nu vede nicio schimbare",
    plannedLessons: 3,
    lessonIds: CUVANTUL_HRANA_SI_ARMA_LESSONS.map((l) => l.id),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 10-12",
  },
  {
    id: "teme_c4_religiozitate",
    title: "Religiozitate sau viata",
    forWhom: "Pentru cine face totul corect si simte ca lipseste ceva",
    plannedLessons: 4,
    lessonIds: RELIGIOZITATE_SAU_VIATA_LESSONS.map((l) => l.id),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 13-16",
  },
  {
    id: "teme_c5_fapte_moarte",
    title: "Faptele moarte si harul",
    forWhom: "Pentru cine slujeste mult si se simte gol",
    plannedLessons: 5,
    lessonIds: FAPTELE_MOARTE_SI_HARUL_LESSONS.map((l) => l.id),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 17-21",
  },
  {
    id: "teme_c6_esec",
    title: "De ce dam gres",
    forWhom: "Pentru cine cade in acelasi loc de ani de zile",
    plannedLessons: 4,
    lessonIds: DE_CE_DAM_GRES_LESSONS.map((l) => l.id),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 22-24 si 72",
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
