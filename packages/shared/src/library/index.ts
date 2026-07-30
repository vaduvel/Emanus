import type { Lesson } from "../domain.js"
import { DOCTRINE_HAR_LESSONS } from "./doctrineHar2.js"
import { DOCTRINE_VESNICIA_LESSONS } from "./doctrineVesnicia2.js"
import { PILDE_TATAL_LESSONS } from "./pildeTatal2.js"
import { PILDE_FIUL_LESSONS } from "./pildeFiul2.js"

export * from "./doctrineHar.js"
export * from "./doctrineHar2.js"
export * from "./doctrineVesnicia.js"
export * from "./doctrineVesnicia2.js"
export * from "./pildeTatal.js"
export * from "./pildeTatal2.js"
export * from "./pildeFiul.js"
export * from "./pildeFiul2.js"

/*
 * Biblioteca Emanus — raftul de cursuri, dupa SUBIECT, nu dupa cine e omul.
 *
 * Reguli (docs/21, docs/22, decizii din chat):
 * 1. Nimeni nu se autoclasifica pentru a ajunge la conținut. Vârsta e un
 *    FILTRU opțional pe un raft, niciodată o poartă de intrare.
 * 2. Temele de durere (rușine, neiertare, anxietate, singurătate, recădere)
 *    NU intră în bibliotecă. Alea sunt camerele din `paths/` și se intră pe
 *    ușă, cu parcurs. Altfel se dublează aplicația.
 * 3. Nicio măsurare în UI: nu există procent parcurs, nivel sau punctaj.
 *    `state` de mai jos e pentru NOI (ce e scris, ce nu), nu se arată ca notă.
 * 4. Raftul de creatori apare în UI abia când validarea doctrinară există
 *    (docs/14, docs/22 §10.2). Până atunci `gated: true` îl ține ascuns.
 * 5. Regula 10 din chat: nicio lecție scrisă nu rămâne nelegată. Un curs are
 *    `lessonIds` și `state: "live"` în același commit în care se scrie.
 * 6. Pildele sunt sursa unică de adevăr (docs/16): când o pildă apare în alt
 *    curs, nu se re-explică — se leagă la fișa ei de aici.
 */

/** Ce stare are un curs în producție. Nu se afișează ca progres al omului. */
export type CourseState =
  | "live" // scris și legat, se poate deschide
  | "partial" // scris parțial
  | "planned" // doar programa, încă nescris

export type LibraryCourse = {
  id: string
  title: string
  /** Pentru cine e util, spus ca situație, nu ca etichetă de identitate. */
  forWhom: string
  /** Câte lecții are cursul complet, după programă. */
  plannedLessons: number
  /** Lecțiile scrise, în ordine. Gol = încă nescris. */
  lessonIds: string[]
  state: CourseState
  /** Documentul din care se scrie cursul. */
  source?: string
  /** Filtru opțional de vârstă, doar acolo unde chiar schimbă limbajul. */
  ageHint?: "0-5" | "6-11" | "12-18" | "adult" | "bunici"
}

export type LibraryShelf = {
  id: string
  title: string
  /** O propoziție care spune la ce folosește raftul, în limbaj de om. */
  blurb: string
  courses: LibraryCourse[]
  /** Ascuns până există moderare / validare umană. */
  gated?: boolean
}

/* ------------------------------------------------------------------ *
 * 1. Temelia — ce a făcut Dumnezeu pentru tine
 * ------------------------------------------------------------------ */

const shelfTemelie: LibraryShelf = {
  id: "lib_temelie",
  title: "Temelia",
  blurb: "De la zero: cine e Dumnezeu, ce a făcut Iisus și ce înseamnă asta pentru tine.",
  courses: [
    {
      id: "lib_fundamentul",
      title: "Fundamentul",
      forWhom: "Nu știi de unde să începi, sau vrei să reașezi ce ai auzit pe apucate.",
      plannedLessons: 7,
      lessonIds: ["doctrina_l1", "doctrina_l2", "doctrina_l3"],
      state: "partial",
      source: "docs/06-curs-fundamentul.md",
    },
    {
      id: "lib_intoarcerea",
      title: "Întoarcerea",
      forWhom: "Ai înțeles că ceva nu e în ordine și vrei să știi ce faci mai departe.",
      plannedLessons: 5,
      lessonIds: [],
      state: "planned",
      source: "docs/17-modul-intoarcerea.md",
    },
  ],
}

/* ------------------------------------------------------------------ *
 * 2. Întrebări mari — doctrina generală (docs/15)
 * Regula de ton: se corectează înțelegerea, niciodată instituția.
 * Nu apar cuvintele ortodox / penticostal / baptist / catolic / sectă.
 * ------------------------------------------------------------------ */

const shelfIntrebari: LibraryShelf = {
  id: "lib_intrebari",
  title: "Întrebări mari",
  blurb: "Lucrurile care te opresc să crezi, luate pe rând și cinstit — inclusiv unde nu avem răspuns.",
  courses: [
    {
      id: "doctrine_c2_har",
      title: "Religie sau credință — ce mă mântuiește?",
      forWhom: "Ai crescut cu ideea că ești creștin din naștere, sau că faptele bune se cântăresc la final.",
      plannedLessons: 6,
      lessonIds: [
        "har_d_l1",
        "har_d_l2",
        "har_d_l3",
        "har_d_l4",
        "har_d_l5",
        "har_d_l6",
      ],
      state: "live",
      source: "docs/15-doctrina-generala.md §Cursul 2",
    },
    {
      id: "doctrine_c4_vesnicia",
      title: "Ce urmează după moarte?",
      forWhom: "Nu știi ce e raiul, ce e iadul, sau dacă poți fi sigur de ceva.",
      plannedLessons: 5,
      lessonIds: [
        "vesnicia_l1",
        "vesnicia_l2",
        "vesnicia_l3",
        "vesnicia_l4",
        "vesnicia_l5",
      ],
      state: "live",
      source: "docs/15-doctrina-generala.md §Cursul 4",
    },
    {
      id: "doctrine_c1_biblia",
      title: "Pot să am încredere în Biblie?",
      forWhom: "Ți s-a spus că e o carte scrisă de oameni, rescrisă de nu știu câte ori.",
      plannedLessons: 6,
      lessonIds: [],
      state: "planned",
      source: "docs/15-doctrina-generala.md §Cursul 1",
    },
    {
      id: "doctrine_c3_biserica",
      title: "Cine e Biserica lui Iisus?",
      forWhom: "Dacă fiecare zice altceva, cine are dreptate? Sau ai fost rănit acolo.",
      plannedLessons: 5,
      lessonIds: [],
      state: "planned",
      source: "docs/15-doctrina-generala.md §Cursul 3",
    },
    {
      id: "lib_alte_credinte",
      title: "Energii, horoscop, karma",
      forWhom: "Ai luat de peste tot câte puțin și nu mai știi ce se bate cap în cap.",
      plannedLessons: 5,
      lessonIds: [],
      state: "planned",
    },
  ],
}

/* ------------------------------------------------------------------ *
 * 3. Cuvântul — cum se citește Biblia
 * Pildele sunt împărțite în patru cursuri, ca în docs/16.
 * ------------------------------------------------------------------ */

const shelfCuvantul: LibraryShelf = {
  id: "lib_cuvantul",
  title: "Cuvântul",
  blurb: "Cum se citește, de unde se începe și ce înseamnă ce citești.",
  courses: [
    {
      id: "parables_c1_tatal",
      title: "Pildele — cine e Tatăl",
      forWhom: "Le-ai auzit de mic și tot nu știi ce cer de la tine.",
      plannedLessons: 5,
      lessonIds: [
        "pilda_risipitor",
        "pilda_oaia",
        "pilda_vamesul",
        "pilda_lucratorii",
        "pilda_robul_datornic",
      ],
      state: "live",
      source: "docs/16-modul-pilde.md §Cursul 1",
    },
    {
      id: "parables_c3_fiul",
      title: "Pildele — cum trăiește un fiu",
      forWhom: "Înțelegi ce a făcut Iisus și întrebi: bun, și acum concret ce fac?",
      plannedLessons: 5,
      lessonIds: [
        "pilda_samariteanul",
        "pilda_talantii",
        "pilda_doi_fii",
        "pilda_casa_stanca",
        "pilda_smochinul",
      ],
      state: "live",
      source: "docs/16-modul-pilde.md §Cursul 3",
    },
    {
      id: "parables_c2_imparatia",
      title: "Pildele — ce e Împărăția și cine intră",
      forWhom: "Auzi „Împărăția lui Dumnezeu" și nu știi la ce se referă.",
      plannedLessons: 5,
      lessonIds: [],
      state: "planned",
      source: "docs/16-modul-pilde.md §Cursul 2",
    },
    {
      id: "parables_c4_vesnicia",
      title: "Pildele — bani, moarte și ce rămâne",
      forWhom: "Te întrebi ce rămâne din ce strângi și ce contează la capăt.",
      plannedLessons: 5,
      lessonIds: [],
      state: "planned",
      source: "docs/16-modul-pilde.md §Cursul 4",
    },
    {
      id: "lib_carti",
      title: "Cărțile Bibliei, una câte una",
      forWhom: "Ai deschis la Geneza, ai ajuns la Levitic și te-ai oprit.",
      plannedLessons: 12,
      lessonIds: [],
      state: "planned",
    },
    {
      id: "lib_trasee",
      title: "Trasee scurte de citire",
      forWhom: "Vrei să citești, dar ai nevoie de un capăt și de un final.",
      plannedLessons: 4,
      lessonIds: [],
      state: "planned",
    },
  ],
}

/* ------------------------------------------------------------------ *
 * 4. Rugăciunea
 * ------------------------------------------------------------------ */

const shelfRugaciune: LibraryShelf = {
  id: "lib_rugaciune",
  title: "Rugăciunea",
  blurb: "Cum se vorbește cu El, mai ales când nu ai cuvinte și când nu primești răspuns.",
  courses: [
    {
      id: "lib_rug_inceput",
      title: "Când nu știi ce să spui",
      forWhom: "Te blochezi după „Doamne" și îți pare că spui prostii.",
      plannedLessons: 5,
      lessonIds: [],
      state: "planned",
      source: "docs/Emanus — Ritmul zilnic & Rugăciunea",
    },
    {
      id: "lib_rug_psalmi",
      title: "Psalmii ca școală de rugăciune",
      forWhom: "Vrei să te rogi cinstit, inclusiv când ești supărat pe El.",
      plannedLessons: 5,
      lessonIds: [],
      state: "planned",
    },
    {
      id: "lib_rug_mijlocire",
      title: "Postul și mijlocirea",
      forWhom: "Te rogi pentru cineva de mult și nu se schimbă nimic.",
      plannedLessons: 4,
      lessonIds: [],
      state: "planned",
    },
  ],
}

/* ------------------------------------------------------------------ *
 * 5. Casa — căsnicie, copii, familie
 * ------------------------------------------------------------------ */

const shelfCasa: LibraryShelf = {
  id: "lib_casa",
  title: "Casa",
  blurb: "Ce se întâmplă cu credința acolo unde te vede lumea cel mai puțin.",
  courses: [
    {
      id: "lib_casnicie",
      title: "Căsnicia",
      forWhom: "Sunteți doi oameni obosiți care nu mai vorbesc despre nimic important.",
      plannedLessons: 6,
      lessonIds: [],
      state: "planned",
      source: "docs/12-continut-parinti.md",
    },
    {
      id: "lib_partener_necredincios",
      title: "Când partenerul nu crede",
      forWhom: "Tu ai venit la Iisus, el sau ea nu. Și doare zilnic.",
      plannedLessons: 4,
      lessonIds: [],
      state: "planned",
    },
    {
      id: "lib_cresc_copii",
      title: "Cresc copii de credință",
      forWhom: "Vrei să le dai ce nu ai avut, fără să le impui nimic.",
      plannedLessons: 5,
      lessonIds: [],
      state: "planned",
      source: "docs/12-continut-parinti.md",
    },
    {
      id: "lib_copil_departe",
      title: "Când copilul se îndepărtează",
      forWhom: "L-ai crescut în biserică și acum nu vrea să audă.",
      plannedLessons: 4,
      lessonIds: [],
      state: "planned",
    },
    {
      id: "lib_mostenirea",
      title: "Moștenirea pe care o las",
      forWhom: "Ai ajuns la vârsta la care te întrebi ce rămâne după tine.",
      plannedLessons: 5,
      lessonIds: [],
      state: "planned",
      source: "docs/13-continut-bunici.md",
      ageHint: "bunici",
    },
  ],
}

/* ------------------------------------------------------------------ *
 * 6. Viața de zi cu zi — bani, muncă, timp
 * ------------------------------------------------------------------ */

const shelfViata: LibraryShelf = {
  id: "lib_viata",
  title: "Viața de zi cu zi",
  blurb: "Bani, muncă, timp, cinste — acolo unde Scriptura se aplică sau nu se aplică deloc.",
  courses: [
    {
      id: "lib_bani",
      title: "Bani și datorii",
      forWhom: "Ai rate, ai frică de mâine și ți-e rușine să vorbești despre asta.",
      plannedLessons: 5,
      lessonIds: [],
      state: "planned",
      source: "docs/11-continut-barbati.md",
    },
    {
      id: "lib_munca",
      title: "Muncă și rost",
      forWhom: "Muncești mult și tot pare că nu însemni nimic.",
      plannedLessons: 5,
      lessonIds: [],
      state: "planned",
    },
    {
      id: "lib_integritate",
      title: "Cinstea când nu te vede nimeni",
      forWhom: "Se fură mărunt în jurul tău și pare normal.",
      plannedLessons: 4,
      lessonIds: [],
      state: "planned",
    },
    {
      id: "lib_timp",
      title: "Timpul și oboseala",
      forWhom: "Nu ai zece minute, dar ai două ore pe telefon.",
      plannedLessons: 4,
      lessonIds: [],
      state: "planned",
    },
  ],
}

/* ------------------------------------------------------------------ *
 * 7. Pentru cei mici — parcurs de făcut împreună cu părintele
 * Vârsta e filtru pe raftul ăsta, pentru că schimbă chiar formatul.
 * ------------------------------------------------------------------ */

const shelfCeiMici: LibraryShelf = {
  id: "lib_cei_mici",
  title: "Pentru cei mici",
  blurb: "De parcurs împreună cu copilul. Nu îl lăsăm singur cu întrebările mari.",
  courses: [
    {
      id: "lib_micii_facut",
      title: "Dumnezeu m-a făcut",
      forWhom: "Copil de 2-5 ani, cu tine lângă el.",
      plannedLessons: 5,
      lessonIds: [],
      state: "planned",
      source: "docs/08-continut-bebelusi.md",
      ageHint: "0-5",
    },
    {
      id: "lib_copii_cine_sunt",
      title: "Cine sunt eu?",
      forWhom: "Copil de 6-11 ani, singur sau cu tine.",
      plannedLessons: 5,
      lessonIds: [],
      state: "planned",
      source: "docs/09-continut-copii.md",
      ageHint: "6-11",
    },
    {
      id: "lib_copii_emotii",
      title: "Când mi-e frică sau sunt supărat",
      forWhom: "Copil care se închide și nu spune ce are.",
      plannedLessons: 4,
      lessonIds: [],
      state: "planned",
      source: "docs/09-continut-copii.md",
      ageHint: "6-11",
    },
    {
      id: "lib_teens_identitate",
      title: "Cine sunt eu, de fapt?",
      forWhom: "Adolescent prins între comparație și presiune.",
      plannedLessons: 5,
      lessonIds: [],
      state: "planned",
      source: "docs/02-programa-curriculum.md",
      ageHint: "12-18",
    },
    {
      id: "lib_teens_indoieli",
      title: "Pot să cred cu adevărat?",
      forWhom: "Adolescent cu întrebări la care nimeni nu i-a răspuns cinstit.",
      plannedLessons: 5,
      lessonIds: [],
      state: "planned",
      ageHint: "12-18",
    },
  ],
}

/* ------------------------------------------------------------------ *
 * 8. De la creatori — ascuns până există validare doctrinară umană
 * ------------------------------------------------------------------ */

const shelfCreatori: LibraryShelf = {
  id: "lib_creatori",
  title: "De la creatori",
  blurb: "Cursuri scrise de oameni care duc mai departe ce au primit. Fiecare trece prin validare înainte să apară aici.",
  gated: true,
  courses: [
    {
      id: "lib_creator_pilot",
      title: "Curs-pilot de creator",
      forWhom: "Ai venit din materialul cuiva și vrei să continui cu el.",
      plannedLessons: 5,
      lessonIds: [],
      state: "planned",
      source: "docs/07-sablon-curs-creatori.md",
    },
  ],
}

/* ------------------------------------------------------------------ */

export const SHELVES: LibraryShelf[] = [
  shelfTemelie,
  shelfIntrebari,
  shelfCuvantul,
  shelfRugaciune,
  shelfCasa,
  shelfViata,
  shelfCeiMici,
  shelfCreatori,
]

/** Rafturile vizibile acum în aplicație. */
export function visibleShelves(): LibraryShelf[] {
  return SHELVES.filter((s) => !s.gated)
}

export function getShelf(id: string): LibraryShelf | undefined {
  return SHELVES.find((s) => s.id === id)
}

export const ALL_LIBRARY_COURSES: LibraryCourse[] = SHELVES.flatMap(
  (s) => s.courses,
)

export function getLibraryCourse(id: string): LibraryCourse | undefined {
  return ALL_LIBRARY_COURSES.find((c) => c.id === id)
}

/** Un curs se poate deschide doar dacă are cel puțin o lecție scrisă. */
export function courseIsOpen(c: LibraryCourse): boolean {
  return c.lessonIds.length > 0
}

/** Prima lecție nedeschisă dintr-un curs, după lecțiile deja făcute. */
export function nextCourseLesson(
  c: LibraryCourse,
  lessonsDone: string[],
): string | null {
  for (const id of c.lessonIds) {
    if (!lessonsDone.includes(id)) return id
  }
  return null
}

/**
 * Toate lecțiile de bibliotecă scrise până acum. Playerul le caută aici când
 * lecția nu face parte din niciun parcurs.
 */
export const LIBRARY_LESSONS: Lesson[] = [
  ...DOCTRINE_HAR_LESSONS,
  ...DOCTRINE_VESNICIA_LESSONS,
  ...PILDE_TATAL_LESSONS,
  ...PILDE_FIUL_LESSONS,
]

export function findLibraryLesson(id: string): Lesson | undefined {
  return LIBRARY_LESSONS.find((l) => l.id === id)
}

/** Lecțiile unui curs de bibliotecă, în ordine. */
export function libraryCourseLessons(courseId: string): Lesson[] {
  const course = getLibraryCourse(courseId)
  if (!course) return []
  const out: Lesson[] = []
  for (const id of course.lessonIds) {
    const l = findLibraryLesson(id)
    if (l) out.push(l)
  }
  return out
}

/**
 * Ce se scrie mai departe, în ordinea deciziilor din docs/15 §Ordinea de
 * scriere, docs/16 §Ordinea de scriere și din chat. Lista e pentru noi.
 */
export const WRITING_ORDER: string[] = [
  "parables_c2_imparatia",
  "parables_c4_vesnicia",
  "doctrine_c1_biblia",
  "doctrine_c3_biserica",
  "lib_rug_inceput",
  "lib_casnicie",
  "lib_bani",
]
