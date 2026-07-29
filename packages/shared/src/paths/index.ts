import type { Lesson } from "../domain.js"
import { DOCTRINE_LESSONS } from "./doctrina.js"
import { neiertareL1, neiertareL2, neiertareL3 } from "./neiertareA.js"
import { neiertareL4, neiertareL5 } from "./neiertareB.js"
import { neiertareL6, neiertareL7 } from "./neiertareC.js"

export * from "./doctrina.js"

/*
 * Uși și parcursuri personal-generalizate.
 * Referință: docs/20-parcursuri-personal-generalizate.md
 *
 * Modelul întreg stă pe un singur câmp salvat despre om: `pathId`.
 * Fără profil, fără scoruri, fără memorie per utilizator.
 */

export interface Door {
  id: string
  /** Spus în cuvinte de om, nu religioase. */
  label: string
  /** null = parcurs încă nescris; se oferă parcursul de început. */
  pathId: string | null
}

export const DOORS: Door[] = [
  { id: "neiertare", label: "Nu pot ierta pe cineva", pathId: "path_neiertare" },
  { id: "doliu", label: "Am pierdut pe cineva", pathId: null },
  { id: "frica", label: "Mi-e frică tot timpul", pathId: null },
  { id: "uscaciune", label: "Nu mai simt nimic", pathId: null },
  { id: "dependenta", label: "Sunt prins într-un lucru de care nu scap", pathId: null },
  { id: "casnicie", label: "Familia mea se destramă", pathId: null },
  { id: "forma", label: "Merg la biserică de ani de zile și nu s-a schimbat nimic", pathId: null },
  { id: "indoiala", label: "Nu știu dacă Dumnezeu există", pathId: null },
  { id: "rusine", label: "Mi-e rușine de ce am făcut", pathId: null },
  { id: "singuratate", label: "Sunt singur", pathId: null },
  { id: "inceput", label: "Vreau doar să-L cunosc", pathId: null },
]

/** Ieșirea obligatorie din ecranul de uși. */
export const DOOR_NONE_LABEL = "Niciuna nu e a mea."

export interface PathDef {
  id: string
  doorId: string
  title: string
  /** Ce primește omul. O propoziție, fără promisiuni pe care nu le putem ține. */
  promise: string
  lessons: Lesson[]
  /** Ziua dintre lecții. Index aliniat cu lessons: practices[i] urmează după lessons[i]. */
  practices: string[]
}

export const pathNeiertare: PathDef = {
  id: "path_neiertare",
  doorId: "neiertare",
  title: "Când nu poți ierta",
  promise:
    "Șapte lecții, una la două zile. Nu îți cerem să uiți și nu îți cerem să spui că n-a fost grav.",
  lessons: [
    neiertareL1,
    neiertareL2,
    neiertareL3,
    neiertareL4,
    neiertareL5,
    neiertareL6,
    neiertareL7,
  ],
  practices: [
    "Ieri I-ai spus ce ți s-a făcut. Azi nu adăuga nimic. Citește versetul de două ori și stai un minut în liniște.",
    "Azi observă doar: de câte ori Îl bănuiești pe Dumnezeu că nu-ți vrea binele. Nu te certa cu gândul. Doar numără-l.",
    "Ai cerut iertare cuiva peste care s-a scurs amărăciunea? Dacă nu, azi e ziua. Două propoziții, fără explicații.",
    "Spune încă o dată, cu voce tare: numele lui, și «nu știa ce face». A doua oară sună altfel.",
    "Hârtia cu ce îți datorează — mai e la tine? Citește-o o dată și pune-o la loc. Mâine facem ceva cu ea.",
    "Azi roagă-te pentru el o dată. O propoziție. Dacă nu-ți iese, spune-I lui Dumnezeu că nu-ți iese.",
    "Ai terminat drumul. Azi doar mulțumește. Și scrie undeva o rugăciune la care aștepți răspuns.",
  ],
}

export const PATHS: PathDef[] = [pathNeiertare]

export function getPath(pathId: string | null | undefined): PathDef | undefined {
  if (!pathId) return undefined
  return PATHS.find((p) => p.id === pathId)
}

export function getPathLesson(pathId: string, lessonId: string): Lesson | undefined {
  return getPath(pathId)?.lessons.find((l) => l.id === lessonId)
}

export function findLessonAnywhere(lessonId: string): Lesson | undefined {
  for (const p of PATHS) {
    const l = p.lessons.find((x) => x.id === lessonId)
    if (l) return l
  }
  return DOCTRINE_LESSONS.find((l) => l.id === lessonId)
}

/*
 * Ritmul. Decizie de produs, nu limitare tehnică:
 * o lecție la două zile, cu o zi de pus în practică la mijloc.
 * Transformarea are nevoie de ziua dintre. Nu se poate "da binge".
 */
export type DayKind = "lesson" | "practice" | "done_today" | "path_complete"

export interface DayPlan {
  kind: DayKind
  /** Indexul lecției de azi sau al celei tocmai terminate (0-based). */
  lessonIndex: number
  lesson?: Lesson
  practiceText?: string
}

/**
 * @param path parcursul ales
 * @param lessonsDone câte lecții a terminat
 * @param daysSinceLastLesson zile calendaristice de la ultima lecție; null dacă n-a făcut niciuna
 */
export function planToday(
  path: PathDef,
  lessonsDone: number,
  daysSinceLastLesson: number | null,
): DayPlan {
  if (lessonsDone >= path.lessons.length) {
    return { kind: "path_complete", lessonIndex: path.lessons.length - 1 }
  }
  if (daysSinceLastLesson === null) {
    return { kind: "lesson", lessonIndex: 0, lesson: path.lessons[0] }
  }
  if (daysSinceLastLesson === 0) {
    return {
      kind: "done_today",
      lessonIndex: lessonsDone - 1,
      practiceText: path.practices[lessonsDone - 1],
    }
  }
  if (daysSinceLastLesson === 1) {
    return {
      kind: "practice",
      lessonIndex: lessonsDone - 1,
      practiceText: path.practices[lessonsDone - 1],
    }
  }
  return { kind: "lesson", lessonIndex: lessonsDone, lesson: path.lessons[lessonsDone] }
}

/*
 * Doctrina generală, în paralel. (docs/20 §6)
 * Se deschide DUPĂ lecția 5 din parcursul personal — nu înainte.
 * Nimeni nu învață despre canonul Scripturii înainte să afle că e iubit.
 * Apoi: o lecție de doctrină la fiecare trei lecții personale.
 */
export const DOCTRINE_UNLOCK_AFTER = 5

export function doctrineAllowance(lessonsDone: number, pathLength: number): number {
  if (lessonsDone < DOCTRINE_UNLOCK_AFTER) return 0
  if (lessonsDone >= pathLength) return DOCTRINE_LESSONS.length
  return Math.floor((lessonsDone - DOCTRINE_UNLOCK_AFTER) / 3) + 1
}

export function nextDoctrineLesson(
  lessonsDone: number,
  pathLength: number,
  doctrineDone: number,
): Lesson | undefined {
  if (doctrineDone >= doctrineAllowance(lessonsDone, pathLength)) return undefined
  return DOCTRINE_LESSONS[doctrineDone]
}
