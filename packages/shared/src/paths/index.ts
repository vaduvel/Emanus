import type { Lesson } from "../domain.js"
import { DOCTRINE_LESSONS, doctrinaL1, doctrinaL2, doctrinaL3 } from "./doctrina.js"
import { neiertareL1, neiertareL2, neiertareL3 } from "./neiertareA.js"
import { neiertareL4, neiertareL5 } from "./neiertareB.js"
import { neiertareL6, neiertareL7 } from "./neiertareC.js"
import { neiertareO1, neiertareO2 } from "./neiertareOpen.js"
import { rusineL1, rusineL2, rusineL3, rusineL4 } from "./rusineA.js"
import { rusineL5, rusineL6, rusineL7 } from "./rusineB.js"
import { umblareL1, umblareL2, umblareL3 } from "./umblareA.js"
import { umblareL4, umblareL5, umblareL6, umblareL7 } from "./umblareB.js"

export * from "./doctrina.js"
export * from "./neiertareOpen.js"
export * from "./rusineA.js"
export * from "./rusineB.js"
export * from "./umblareA.js"
export * from "./umblareB.js"

/*
 * Uși, camere și parcursuri personal-generalizate.
 * Referință: docs/21-cum-lucreaza-Dumnezeu.md și docs/20-parcursuri-personal-generalizate.md
 * Siguranță și limite: docs/22-siguranta.md (are prioritate).
 *
 * Modelul întreg stă pe un singur câmp salvat despre om: `pathId`.
 * Fără profil, fără scoruri, fără chestionar, fără memorie per utilizator.
 *
 * PRINCIPIUL: Dumnezeu întâlnește omul în mijlocul durerii lui. Nu există sală
 * de așteptare și nu există etape de trecut înainte de întâlnire. Omul intră
 * prin durerea lui, iar adevărul despre cine e Dumnezeu i se spune PRIN rană.
 *
 * GENERALIZAREA: nu grupăm după durere — durerile sunt infinite. Grupăm după
 * tiparul spiritual de dedesubt; alea sunt șapte. Ușile rămân multe și în
 * cuvintele omului; camerele sunt puține.
 *
 * ATENȚIE, limită asumată: cele șapte tipare sunt un instrument de orientare
 * inițială, NU un diagnostic. O durere poate avea și cauze medicale, relaționale
 * sau sociale. Nu spunem niciodată omului "boala ta e că nu crezi X" — ar fi o
 * vină în plus pusă pe cineva care deja suferă. Vezi docs/22-siguranta.md.
 *
 * TREI INTRĂRI, nu două (docs/21 §3):
 *   1. vine cu o durere        → camera lui (c1…c7)
 *   2. vine de la zero         → path_temelie
 *   3. vine să-și întărească relația → path_umblare
 */

/** Cele șapte tipare spirituale dominante din care iese aproape orice durere. */
export interface Room {
  id: string
  /** Numele camerei, cum îl vede omul. */
  title: string
  /** Ce crede omul care intră aici. Nu se afișează niciodată ca etichetă. */
  lie: string
  /** Parcursul scris pentru camera asta; null = încă nescris. */
  pathId: string | null
}

export const ROOMS: Room[] = [
  {
    id: "c1",
    title: "Nu mă vrea așa cum sunt",
    lie: "Sunt prea murdar pentru El.",
    pathId: "path_acasa",
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
  /** Camera în care duce ușa. `null` doar pentru ușile de la capătul listei. */
  roomId: string | null
  /** Doar pentru ușile fără cameră: drumul către care duc direct. */
  pathId?: string
  /** True pentru cele 10 propoziții arătate înainte de "Arată-mi tot". */
  common?: boolean
}

/*
 * Cele 31 de uși. (docs/21 §3)
 * Omul nu alege o cameră — alege o propoziție. Nu află niciodată că e pe același
 * culoar cu alți patru. Ordinea e intenționat amestecată între camere, ca lista
 * să nu arate ca niște categorii.
 *
 * `common: true` = intră în primele 10 de pe ecran. Restul se văd la
 * "Arată-mi tot". 31 de opțiuni deodată obosesc pe telefon.
 */
export const DOORS: Door[] = [
  { id: "rusine", label: "Am făcut lucruri de care mi-e rușine", roomId: "c1", common: true },
  { id: "neiertare", label: "Mi s-a făcut ceva și nu pot ierta", roomId: "c2", common: true },
  { id: "indoiala", label: "Nu știu dacă există Dumnezeu", roomId: "c3", common: true },
  { id: "perete", label: "Mă rog și parcă vorbesc în perete", roomId: "c4", common: true },
  { id: "dependenta", label: "Nu mă pot lăsa de un lucru", roomId: "c5", common: true },
  { id: "anxietate", label: "Trăiesc cu anxietate", roomId: "c5", common: true },
  { id: "doliu", label: "Am pierdut pe cineva", roomId: "c2", common: true },
  { id: "merit", label: "Fac tot ce trebuie și tot nu-mi ajunge", roomId: "c6", common: true },
  { id: "singuratate", label: "Nu am pe nimeni", roomId: "c7", common: true },
  { id: "nu_inteleg", label: "Sunt creștin, dar nu înțeleg ce citesc", roomId: "c3", common: true },
  { id: "obisnuinta", label: "Merg la biserică din obișnuință", roomId: "c6" },
  { id: "avort", label: "Am făcut un avort", roomId: "c1" },
  { id: "biblia_inventata", label: "Cred că Biblia e inventată de oameni", roomId: "c3" },
  { id: "recadere", label: "Am promis de o sută de ori și tot cad", roomId: "c5" },
  { id: "uscaciune", label: "Nu mai simt nimic când mă rog", roomId: "c4" },
  { id: "familie_respinge", label: "Familia mea nu mă înțelege", roomId: "c7" },
  { id: "boala", label: "Sunt bolnav sau e bolnav cineva drag", roomId: "c2" },
  { id: "infidelitate", label: "Mi-am înșelat soțul sau soția", roomId: "c1" },
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

export const COMMON_DOORS: Door[] = DOORS.filter((d) => d.common)
export const MORE_DOORS: Door[] = DOORS.filter((d) => !d.common)

/*
 * Ușile de la capătul listei: cine nu vine cu o rană anume. (docs/21 §3)
 * Nu îl forțăm într-o durere pe care nu o are.
 *
 * Sunt DOUĂ feluri de oameni aici și nu au nevoie de același lucru:
 *   - cel care nu știe nimic → De la zero (temelia)
 *   - cel care merge de ani și vrea mai adânc → Umblarea
 * Înainte aveam un singur drum pentru amândoi, adică îl trimiteam pe al doilea
 * la clasa întâia.
 */
export const EXPLORE_DOORS: Door[] = [
  { id: "inceput", label: "Vreau doar să-L cunosc", roomId: null, pathId: "path_temelie" },
  {
    id: "umblare",
    label: "Merg cu El, dar vreau mai aproape",
    roomId: null,
    pathId: "path_umblare",
  },
  { id: "nu_stiu", label: "Nu știu. Arată-mi tu.", roomId: null, pathId: "path_temelie" },
]

export const ALL_DOORS: Door[] = [...DOORS, ...EXPLORE_DOORS]

export function getDoor(doorId: string | null | undefined): Door | undefined {
  if (!doorId) return undefined
  return ALL_DOORS.find((d) => d.id === doorId)
}

/** Drumul dat omului a cărui cameră nu e scrisă încă. */
export const FALLBACK_PATH_ID = "path_temelie"

/**
 * Nicio ușă nu e fundătură. (docs/21 §7 pct. 5)
 * Dacă parcursul camerei nu e scris încă, omul primește temelia — cu un rând
 * onest, nu cu un "în lucru" care îl trimite acasă.
 */
export function resolveDoorPath(doorId: string): string {
  const door = getDoor(doorId)
  if (door?.pathId) return door.pathId
  return getRoom(door?.roomId)?.pathId ?? FALLBACK_PATH_ID
}

/** True dacă ușa duce în drumul ei propriu, nu într-un înlocuitor. */
export function doorHasOwnRoom(doorId: string): boolean {
  const door = getDoor(doorId)
  if (door?.pathId) return true
  return getRoom(door?.roomId)?.pathId != null
}

export function doorsForRoom(roomId: string): Door[] {
  return DOORS.filter((d) => d.roomId === roomId)
}

export interface PathDef {
  id: string
  /** Camera căreia îi aparține parcursul; null pentru drumurile fără cameră. */
  roomId: string | null
  title: string
  /** Ce primește omul. O propoziție, fără promisiuni pe care nu le putem ține. */
  promise: string
  lessons: Lesson[]
  /** Ziua dintre lecții. Index aliniat cu lessons: practices[i] urmează după lessons[i]. */
  practices: string[]
}

/*
 * Camera 1: "Nu mă vrea așa cum sunt".
 * Intră aici rușinea, pornografia, infidelitatea, avortul, "sunt prea departe".
 *
 * ORDINEA (docs/21 §2): camera NU începe cu păcatul omului, ci cu faptul că El
 * S-a mișcat primul, când omul era încă murdar (Romani 5:8; Luca 15:20).
 * Cine crede că trebuie să se curețe înainte de a veni nu va veni niciodată.
 * Mărturisirea vine abia în lecția 5, după ce omul știe că nu e aruncat afară.
 *
 * SIGURANȚĂ: lecțiile 5 și 6 ating abuz, avort și autovătămare. Primul pas al
 * fiecăreia e avertisment cu numere reale (docs/22 §2). Lecția 5 spune explicit
 * că ce i s-a FĂCUT omului nu e păcatul lui și că nu ia legătura cu agresorul.
 */
export const pathAcasa: PathDef = {
  id: "path_acasa",
  roomId: "c1",
  title: "Drumul înapoi",
  promise:
    "Șapte lecții, una la două zile. Nu îți cerem să povestești nimănui ce ai făcut și nu îți cerem să promiți nimic.",
  lessons: [rusineL1, rusineL2, rusineL3, rusineL4, rusineL5, rusineL6, rusineL7],
  practices: [
    "Azi nu adaugă nimic. Când te prinzi că vrei să te cureți înainte să vii, spune o dată: «El a alergat primul».",
    "Azi doar observă: de câte ori spui «sunt» în loc de «am făcut». Nu te certa cu gândul — tradu-l într-o faptă anume.",
    "Azi, când îți revine fapta în minte, spune cu voce tare, o singură dată: «s-a plătit». Nu de zece ori.",
    "Azi ascultă cum te numești tu pe tine. Când vine eticheta, răspunde-i: «asta am făcut, nu asta sunt».",
    "Ieri ai spus cu voce tare ce ascundeai. Azi nu adaugă nimic. Dacă vrei să spui și unui om, gândește-te o zi — nu e obligatoriu și nu e o condiție.",
    "Azi citește singur Romani 8, primele patru versete. Încet. Dacă gândul te ține treaz nopțile, sună 116 123 — nu e lipsă de credință.",
    "Ai terminat drumul. Azi caută omul căruia îi poți spune «m-am întors» când se întâmplă. Și scrie undeva o rugăciune la care aștepți răspuns.",
  ],
}

/*
 * Camera 2: "Nu e bun / m-a lăsat".
 * Intră aici doliul, boala, nedreptatea, divorțul, neiertarea, "unde era El?".
 *
 * ORDINEA CONTEAZĂ (docs/21 §2): camera începe cu cele două lecții despre cine e
 * Dumnezeu, spuse PRIN rana asta — "nu El ți-a făcut asta" (Iacov 1:17) și
 * "n-a privit de departe" (Ioan 11:35; Matei 27:46). Omul nedreptățit nu poate
 * ierta cât timp Îl bănuiește pe Dumnezeu că a fost de partea celui care l-a
 * rănit. Aceeași lumină, alt geam.
 *
 * DE FĂCUT: lecțiile 3-9 (fostele 1-7) își păstrează `order` 1-7 din vechea
 * numerotare, iar `neiertare_l1` mai conține prezentarea "Sunt Daniel", care
 * acum se face în `neiertare_o1`. De curățat la o trecere separată; ordinea
 * reală a drumului e array-ul `lessons`, nu `order`.
 */
export const pathNeiertare: PathDef = {
  id: "path_neiertare",
  roomId: "c2",
  title: "Când nu poți ierta",
  promise:
    "Nouă lecții, una la două zile. Nu îți cerem să uiți și nu îți cerem să spui că n-a fost grav.",
  lessons: [
    neiertareO1,
    neiertareO2,
    neiertareL1,
    neiertareL2,
    neiertareL3,
    neiertareL4,
    neiertareL5,
    neiertareL6,
    neiertareL7,
  ],
  practices: [
    "Azi nu adăuga nimic. Când te prinzi că Îl bănuiești, spune o dată: «nu Tu mi-ai făcut asta». Atât.",
    "Azi citește singur Ioan 11, de la versetul 17 la 44. Încet. Uită-te doar la ce face Iisus cu oamenii rămași în urmă.",
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

/*
 * UMBLAREA — M7. A treia intrare.
 *
 * Pentru cine nu vine cu o rană, ci vine să întărească o relație care există.
 * Nu e o cameră: nu vindecăm nimic aici, ridicăm ștacheta. Presupunem experiență,
 * deci intrăm în text, în context și în metodă.
 *
 * E și drumul de după: cine termină camera lui în două-trei săptămâni ajunge
 * exact aici, altfel rămâne cu un ecran gol.
 */
export const pathUmblare: PathDef = {
  id: "path_umblare",
  roomId: null,
  title: "Umblarea",
  promise:
    "Șapte lecții pentru cine merge deja cu El: cum se ascultă, cum se citește, ce faci când nu simți nimic.",
  lessons: [umblareL1, umblareL2, umblareL3, umblareL4, umblareL5, umblareL6, umblareL7],
  practices: [
    "Azi, după ce termini de vorbit cu El, nu te ridica. Cinci minute fără să ceri nimic.",
    "Un singur paragraf, trecut prin cele patru întrebări, în scris. Nu un capitol.",
    "Lucrul mic pe care îl amâni — fă-l azi. Dacă nu poți singur, spune-I: «vreau, dar nu pot».",
    "Zece minute cu El fără să ceri și fără să citești. Doar spune-I de ce Îl iubești.",
    "O oră fără telefon, treaz, cu El. Când vine lista, scrie-o și taci.",
    "Azi fă exact ce ai face dacă ai simți. Și spune-I: «nu simt nimic și totuși sunt aici».",
    "Ai terminat drumul. Azi caută omul căruia îi spui cele trei propoziții. Întreabă-l ce mai face.",
  ],
}

export const PATHS: PathDef[] = [pathAcasa, pathNeiertare, pathTemelie, pathUmblare]

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
