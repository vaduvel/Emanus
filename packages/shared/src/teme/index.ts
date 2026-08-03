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

/**
 * Modulele de teme traduse din Zac Poonen, "Basic Christian Teachings".
 * Planul complet: docs/41-module-teme-poonen.md
 * Sursa si atribuirea: docs/42-sursa-si-atribuire-poonen.md
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
]

export const TEME_COURSES: TemeCourse[] = [
  {
    id: "teme_c1_origine",
    title: "Originea raului si puterea alegerii",
    forWhom: "Oricine se intreaba de unde vine raul si de ce alegem gresit",
    plannedLessons: 5,
    lessonIds: ORIGINEA_RAULUI_LESSONS.map((l) => l.id),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 1-5",
  },
  {
    id: "teme_c2_crucea",
    title: "De ce a murit Hristos si darul Duhului",
    forWhom: "Cine vrea sa inteleaga temelia mantuirii",
    plannedLessons: 4,
    lessonIds: DE_CE_A_MURIT_HRISTOS_LESSONS.map((l) => l.id),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 6-9",
  },
  {
    id: "teme_c3_cuvantul",
    title: "Cuvantul: hrana, arma si innoirea mintii",
    forWhom: "Cine vrea sa se hraneasca zilnic din Scriptura",
    plannedLessons: 3,
    lessonIds: CUVANTUL_HRANA_SI_ARMA_LESSONS.map((l) => l.id),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 10-12",
  },
  {
    id: "teme_c4_religiozitate",
    title: "Religiozitate sau viata",
    forWhom: "Cine simte ca are forma, dar nu are viata",
    plannedLessons: 4,
    lessonIds: RELIGIOZITATE_SAU_VIATA_LESSONS.map((l) => l.id),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 13-16",
  },
  {
    id: "teme_c5_fapte_moarte",
    title: "Faptele moarte si harul",
    forWhom: "Cine slujeste din datorie, din frica sau pentru rasplata",
    plannedLessons: 5,
    lessonIds: FAPTELE_MOARTE_SI_HARUL_LESSONS.map((l) => l.id),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 17-21",
  },
  {
    id: "teme_c6_esec",
    title: "De ce dam gres",
    forWhom: "Cine cade mereu in acelasi loc",
    plannedLessons: 4,
    lessonIds: DE_CE_DAM_GRES_LESSONS.map((l) => l.id),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 22-24 si 72",
  },
  {
    id: "teme_c7_lauda",
    title: "Lauda ca arma",
    forWhom: "Cine trece prin stramtorare si nu stie ce sa faca",
    plannedLessons: 6,
    lessonIds: LAUDA_CA_ARMA_LESSONS.map((l) => l.id),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 25-30",
  },
  {
    id: "teme_c8_smerenia",
    title: "Scopul lui Dumnezeu si smerenia lui Hristos",
    forWhom: "Cine vrea sa stie pentru ce a fost facut si cum se creste",
    plannedLessons: 4,
    lessonIds: SCOPUL_SI_SMERENIA_LESSONS.map((l) => l.id),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 31-34",
  },
  {
    id: "teme_c9_cum_a_trait",
    title: "Cum a trait Isus",
    forWhom: "Cine vrea sa vada, pas cu pas, viata pe care o cere Dumnezeu",
    plannedLessons: 8,
    lessonIds: CUM_A_TRAIT_ISUS_LESSONS.map((l) => l.id),
    state: "in_review",
    source: "Zac Poonen, Basic Christian Teachings, temele 35-42",
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
