import type { Lesson } from "../domain.js"
import { DOCTRINE_LESSONS, doctrinaL1, doctrinaL2, doctrinaL3 } from "./doctrina.js"
import { neiertareL1, neiertareL2, neiertareL3 } from "./neiertareA.js"
import { neiertareL4, neiertareL5 } from "./neiertareB.js"
import { neiertareL6, neiertareL7 } from "./neiertareC.js"

export * from "./doctrina.js"

/*
 * Uși, camere și parcursuri personal-generalizate.
 * Referință: docs/21-cum-lucreaza-Dumnezeu.md și docs/20-parcursuri-personal-generalizate.md
 *
 * Modelul întreg stă pe un singur câmp salvat despre om: `pathId`.
 * Fără profil, fără scoruri, fără chestionar, fără memorie per utilizator.
 *
 * PRINCIPIUL: Dumnezeu întâlnește omul în mijlocul durerii lui. Nu există sală
 * de așteptare și nu există etape de trecut înainte de întâlnire. Omul intră
 * prin durerea lui, iar adevărul despre cine e Dumnezeu i se spune PRIN rană.
 *
 * GENERALIZAREA: nu grupăm după durere — durerile sunt infinite. Grupăm după
 * minciuna de dedesubt; alea sunt șapte. Durerea e simptomul, minciuna e boala.
 * Ușile rămân multe și în cuvintele omului; camerele sunt puține.
 */

/** Cele șapte minciuni despre Dumnezeu din care iese aproape orice durere. */
export interface Room {
  id: string
  /** Numele camerei, cum îl vede omul. */
  title: string
  /** Minciuna pe care o crede omul care intră aici. Nu se afișează ca etichetă. */
  lie: string
  /** Parcursul scris pentru camera asta; null = încă nescris. */
  pathId: string | null
}

export const ROOMS: Room[] = [
  {
    id: "c1",
    title: "Nu mă vrea așa cum sunt",
    lie: "Sunt prea murdar pentru El.",
    pathId: null,
  },
  {
    id: "c2",
    title: "Nu e bun / m-a lăsat",
    lie: "Dacă era bun, nu s-ar fi întâmplat.",
    pathId: "path_neiertare",
  },
  {
    id: "c3",
    title: "Nu e real / nu se poate ști",
    lie: "Poate e doar o poveste.",
    pathId: "path_temelie",
  },
  {
    id: "c4",
    title: "E departe, nu mă aude",
    lie: "Am rămas singur pe drum.",
    pathId: null,
  },
  {
    id: "c5",
    title: "Nu mă pot schimba",
    lie: "Sunt defect, asta sunt.",
    pathId: null,
  },
  {
    id: "c6",
    title: "Trebuie să merit",
    lie: "Mă iubește cât de bun sunt.",
    pathId: null,
  },
  {
    id: "c7",
    title: "Sunt singur în asta",
    lie: "Nimeni nu înțelege și nimănui nu-i pasă.",
    pathId: null,
  },
]

export function getRoom(roomId: string | null | undefined): Room | undefined {
  if (!roomId) return undefined
  return ROOMS.find((r) => r.id === roomId)
}

export interface Door {
  id: string
  /** Spus în cuvinte de om, nu religioase. Omul își vede propria propoziție. */
  label: string
  /** Camera în care duce ușa. `null` doar pentru ușile de explorare. */
  roomId: string | null
}

/*
 * Cele 31 de uși. (docs/21 §3)
 * Omul nu alege o cameră — alege o propoziție. Nu află niciodată că e pe același
 * culoar cu alți patru. Ordinea e intenționat amestecată între camere, ca lista
 * să nu arate ca niște categorii.
 */
export const DOORS: Door[] = [
  { id: "rusine", label: "Am făcut lucruri de care mi-e rușine", roomId: "c1" },
  { id: "neiertare", label: "Mi s-a făcut ceva și nu pot ierta", roomId: "c2" },
  { id: "indoiala", label: "Nu știu dacă există Dumnezeu", roomId: "c3" },
  { id: "perete", label: "Mă rog și parcă vorbesc în perete", roomId: "c4" },
  { id: "dependenta", label: "Nu mă pot lăsa de un lucru", roomId: "c5" },
  { id: "obisnuinta", label: "Merg la biserică din obișnuință", roomId: "c6" },
  { id: "singuratate", label: "Nu am pe nimeni", roomId: "c7" },
  { id: "doliu", label: "Am pierdut pe cineva", roomId: "c2" },
  { id: "avort", label: "Am făcut un avort", roomId: "c1" },
  { id: "biblia_inventata", label: "Cred că Biblia e inventată de oameni", roomId: "c3" },
  { id: "recadere", label: "Am promis de o sută de ori și tot cad", roomId: "c5" },
  { id: "uscaciune", label: "Nu mai simt nimic când mă rog", roomId: "c4" },
  { id: "merit", label: "Fac tot ce trebuie și tot nu-mi ajunge", roomId: "c6" },
  { id: "familie_respinge", label: "Familia mea nu mă înțelege", roomId: "c7" },
  { id: "boala", label: "Sunt bolnav sau e bolnav cineva drag", roomId: "c2" },
  { id: "infidelitate", label: "Mi-am înșelat soțul sau soția", roomId: "c1" },
  { id: "anxietate", label: "Trăiesc cu anxietate", roomId: "c5" },
  { id: "nu_inteleg", label: "Sunt creștin, dar nu înțeleg ce citesc", roomId: "c3" },
  { id: "flacara", label: "Am fost aproape de Dumnezeu cândva", roomId: "c4" },
  { id: "frica_pedeapsa", label: "Mi-e frică să nu mă pedepsească", roomId: "c6" },
  { id: "respins_biserica", label: "M-am simțit respins în biserică", roomId: "c7" },
  { id: "de_ce_permis", label: "Nu înțeleg de ce a permis Dumnezeu asta", roomId: "c2" },
  { id: "pornografie", label: "Mă lupt cu pornografia", roomId: "c1" },
  { id: "tristete", label: "Nu mai am chef de nimic", roomId: "c5" },
  { id: "alte_credinte", label: "Am crezut alte lucruri înainte (energii, karma, univers)", roomId: "c3" },
  { id: "cum_citesc", label: "Nu știu cum să citesc Biblia", roomId: "c4" },
  { id: "epuizat_slujire", label: "Sunt obosit de slujire", roomId: "c6" },
  { id: "nou_venit", label: "Sunt nou și nu cunosc pe nimeni", roomId: "c7" },
  { id: "divort", label: "Am trecut printr-un divorț", roomId: "c2" },
  { id: "prea_departe", label: "Cred că sunt prea departe ca să mă mai întorc", roomId: "c1" },
  { id: "furie", label: "Mă enervez și rănesc oamenii din jur", roomId: "c5" },
]

/*
 * Ușile de la capătul listei: omul fără durere anume. (docs/21 §3)
 * Nu îl forțăm într-o rană pe care nu o are. Pentru el, lecțiile despre cine e
 * Dumnezeu nu sunt un preambul — sunt chiar drumul lui.
 */
export const EXPLORE_DOORS: Door[] = [
  { id: "inceput", label: "Vreau doar să-L cunosc", roomId: null },
  { id: "nu_stiu", label: "Nu știu. Arată-mi tu.", roomId: null },
]

export const ALL_DOORS: Door[] = [...DOORS, ...EXPLORE_DOORS]

export function getDoor(doorId: string | null | undefined): Door | undefined {
  if (!doorId) return undefined
  return ALL_DOORS.find((d) => d.id === doorId)
}

/** Drumul dat omului care n-are încă o cameră scrisă, sau care doar explorează. */
export const FALLBACK_PATH_ID = "path_temelie"

/**
 * Nicio ușă nu e fundătură. (docs/21 §7 pct. 5)
 * Dacă parcursul camerei nu e scris încă, omul primește temelia — cu un rând
 * onest, nu cu un "în lucru" care îl trimite acasă.
 */
export function resolveDoorPath(doorId: string): string {
  const room = getRoom(getDoor(doorId)?.roomId)
  return room?.pathId ?? FALLBACK_PATH_ID
}

/** True dacă ușa duce în camera ei proprie, nu în temelie. */
export function doorHasOwnRoom(doorId: string): boolean {
  return getRoom(getDoor(doorId)?.roomId)?.pathId != null
}

export function doorsForRoom(roomId: string): Door[] {
  return DOORS.filter((d) => d.roomId === roomId)
}

export interface PathDef {
  id: string
  /** Camera căreia îi aparține parcursul; null pentru temelie. */
  roomId: string | null
  title: string
  /** Ce primește omul. O propoziție, fără promisiuni pe care nu le putem ține. */
  promise: string
  lessons: Lesson[]
  /** Ziua dintre lecții. Index aliniat cu lessons: practices[i] urmează după lessons[i]. */
  practices: string[]
}

/*
 * Camera 2: "Nu e bun / m-a lăsat".
 * Intră aici doliul, boala, nedreptatea, divorțul, neiertarea, "unde era El?".
 *
 * DE SCRIS (docs/21 §7 pct. 2): cele două lecții de deschidere ale camerei —
 * cine e Dumnezeu, spus prin rana asta: "nu El ți-a făcut asta" (Iacov 1:17;
 * Ioan 10:10). Azi lecția 2 acoperă parțial partea asta, dar camera trebuie să
 * înceapă cu ea, nu s-o strecoare la mijloc. Aceeași lumină, alt geam.
 */
export const pathNeiertare: PathDef = {
  id: "path_neiertare",
  roomId: "c2",
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

/*
 * Temelia. Camera 3 ("nu e real") și, până se scriu celelalte camere, drumul
 * oricui a apăsat o ușă a cărei cameră nu e gata. Și drumul propriu al omului
 * care spune "vreau doar să-L cunosc" — pentru el nu e supliment, e drumul.
 */
export const pathTemelie: PathDef = {
  id: "path_temelie",
  roomId: "c3",
  title: "De la zero",
  promise:
    "Trei lecții, una la două zile. Fără presupunerea că știi ceva dinainte și fără să te facă nimeni să te simți prost că întrebi.",
  lessons: [doctrinaL1, doctrinaL2, doctrinaL3],
  practices: [
    "Azi citește singur zece versete din Evanghelia după Ioan, capitolul 1. Nu trebuie să înțelegi tot. Doar citește-le.",
    "Azi observă de câte ori încerci să meriți ceva: la muncă, acasă, în cap. Nu schimba nimic. Doar observă.",
    "Ai terminat. Azi spune-I, cu cuvintele tale, ce crezi și ce încă nu crezi. Nu Se supără de partea a doua.",
  ],
}

export const PATHS: PathDef[] = [pathNeiertare, pathTemelie]

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

/** Drumurile pe care le poate începe cineva care tocmai a terminat `pathId`. */
export function otherPaths(pathId: string | null | undefined): PathDef[] {
  return PATHS.filter((p) => p.id !== pathId)
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
  /**
   * Câte zile a lipsit, dacă a lipsit mult (>= ABSENCE_DAYS).
   * Nu e o mustrare și nu se afișează ca statistică — e doar semnalul că ecranul
   * trebuie să-l primească altfel pe omul care se întoarce. (docs/20 §1)
   */
  awayDays?: number
}

/** De la câte zile de tăcere considerăm că omul "se întoarce", nu "continuă". */
export const ABSENCE_DAYS = 5

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
  const away =
    daysSinceLastLesson !== null && daysSinceLastLesson >= ABSENCE_DAYS
      ? daysSinceLastLesson
      : undefined

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
  return {
    kind: "lesson",
    lessonIndex: lessonsDone,
    lesson: path.lessons[lessonsDone],
    awayDays: away,
  }
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
