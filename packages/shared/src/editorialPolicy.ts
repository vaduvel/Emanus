import type { Lesson } from "./domain.js"

export type LessonSafety = NonNullable<Lesson["safety"]>

const ABUSE_NOTICE =
  "Lecția atinge abuzul, controlul sau pericolul. Poți opri oricând. Nu confrunta singur o persoană periculoasă și nu folosi lecția în locul protecției, autorităților sau ajutorului competent."
const SEXUAL_VIOLENCE_NOTICE =
  "Lecția atinge constrângerea sexuală, trauma sau încălcarea consimțământului. Poți opri oricând și nu trebuie să scrii detalii. Ce ți s-a făcut nu devine păcatul tău."
const DEPENDENCY_NOTICE =
  "Lecția atinge dependența, compulsia sau recăderea. Poți opri oricând. Sevrajul și riscul medical cer evaluare de specialitate; rugăciunea și pocăința nu înlocuiesc tratamentul."
const MENTAL_HEALTH_NOTICE =
  "Lecția atinge depresia, trauma sau gândurile de autovătămare. Poți opri oricând. Dacă nu ești în siguranță sau te gândești să îți faci rău, folosește acum ecranul de ajutor."

/**
 * Lista este editorială și intenționată. Nu o înlocuim cu detecție după cuvinte:
 * multe lecții numesc abuzul doar pentru a-l delimita, fără să ceară omului să
 * intre în propria traumă.
 */
export const LESSON_SAFETY_POLICIES: Readonly<Record<string, LessonSafety>> = {
  rusine_l1: {
    topic: "abuse",
    notice:
      "Lecția poate atinge o faptă gravă, avortul, infidelitatea sau răul făcut împotriva ta. Scrie numai cât poți duce în siguranță și nu lua legătura cu un agresor.",
  },
  rusine_l5: { topic: "abuse", notice: ABUSE_NOTICE },
  neiertare_o1: {
    topic: "abuse",
    notice:
      "Lecția vorbește despre răni, nedreptate și abuz. Nu îți cere să contactezi persoana care te-a rănit și nu îți cere să rămâi într-un loc periculos.",
  },
  neiertare_o2: {
    topic: "abuse",
    notice:
      "Lecția te invită să numești o rană. Scrie numai cât poți duce în siguranță acum; poți opri conversația oricând și poți cere ajutor.",
  },
  neiertare_l6: {
    topic: "abuse",
    notice:
      "Iertarea din această lecție nu înseamnă împăcare, contact cu agresorul, renunțarea la dreptate sau întoarcerea într-un loc periculos.",
  },
  suferinta_l1: {
    topic: "mental_health",
    notice:
      "Lecția atinge pierderea, boala și durerea care poate copleși. Poți opri oricând. Dacă nu ești în siguranță sau te gândești să îți faci rău, folosește acum ecranul de ajutor.",
  },
  suferinta_l5: {
    topic: "mental_health",
    notice:
      "Lecția vorbește despre funcționare, boală și ajutor. Simptomele noi, severe sau urgente cer evaluare medicală; rugăciunea nu înlocuiește tratamentul.",
  },
  schimbare_l1: { topic: "dependency", notice: DEPENDENCY_NOTICE },
  schimbare_l5: { topic: "dependency", notice: DEPENDENCY_NOTICE },
  schimbare_l6: { topic: "mental_health", notice: MENTAL_HEALTH_NOTICE },
  impreuna_l3: { topic: "violence", notice: ABUSE_NOTICE },
  impreuna_l4: { topic: "abuse", notice: ABUSE_NOTICE },
  umblare_l6: { topic: "mental_health", notice: MENTAL_HEALTH_NOTICE },
  biserica_l4: { topic: "abuse", notice: ABUSE_NOTICE },
  pilda_robul_datornic: { topic: "abuse", notice: ABUSE_NOTICE },
  rug_inceput_l7: { topic: "abuse", notice: ABUSE_NOTICE },
  casnicie_l4: { topic: "sexual_violence", notice: SEXUAL_VIOLENCE_NOTICE },
  casnicie_l6: { topic: "violence", notice: ABUSE_NOTICE },
  bani_l3: { topic: "dependency", notice: DEPENDENCY_NOTICE },
  barbat_lupta_l4: { topic: "dependency", notice: DEPENDENCY_NOTICE },
  barbat_lupta_l7: { topic: "self_harm", notice: MENTAL_HEALTH_NOTICE },
  femeie_lupta_l7: { topic: "mental_health", notice: MENTAL_HEALTH_NOTICE },
  femeie_relatii_l6: { topic: "violence", notice: ABUSE_NOTICE },
  sot_hristos_l4: { topic: "sexual_violence", notice: SEXUAL_VIOLENCE_NOTICE },
  sot_hristos_l7: { topic: "violence", notice: ABUSE_NOTICE },
  sotie_legamant_l4: { topic: "sexual_violence", notice: SEXUAL_VIOLENCE_NOTICE },
  sotie_legamant_l7: { topic: "violence", notice: ABUSE_NOTICE },
  mama_fara_pierdere_l3: { topic: "self_harm", notice: MENTAL_HEALTH_NOTICE },
  sexualitate_l3: { topic: "dependency", notice: DEPENDENCY_NOTICE },
  sexualitate_l5: { topic: "sexual_violence", notice: SEXUAL_VIOLENCE_NOTICE },
  sexualitate_l6: { topic: "sexual_violence", notice: SEXUAL_VIOLENCE_NOTICE },
  limite_l4: { topic: "violence", notice: ABUSE_NOTICE },
  limite_l5: { topic: "abuse", notice: ABUSE_NOTICE },
  siguranta_l1: { topic: "abuse", notice: ABUSE_NOTICE },
  siguranta_l2: { topic: "abuse", notice: ABUSE_NOTICE },
  siguranta_l3: { topic: "violence", notice: ABUSE_NOTICE },
  siguranta_l4: { topic: "abuse", notice: ABUSE_NOTICE },
  siguranta_l5: { topic: "abuse", notice: ABUSE_NOTICE },
  siguranta_l6: { topic: "violence", notice: ABUSE_NOTICE },
  partener_l5: { topic: "violence", notice: ABUSE_NOTICE },
  spirit_discern_l4: {
    topic: "mental_health",
    notice:
      "Lecția discută suferința psihică și limbajul despre posesie. Nu pune singur un diagnostic spiritual sau medical. În pericol ori criză, caută imediat ajutor competent.",
  },
}

export function safetyPolicyForLesson(lessonId: string): LessonSafety | undefined {
  return LESSON_SAFETY_POLICIES[lessonId]
}

interface VerseInterval {
  start: number
  end: number
}

interface ParsedBibleReference {
  book: string
  chapter: number
  wholeChapter: boolean
  verses: VerseInterval[]
}

const SINGLE_CHAPTER_BOOKS = new Set([
  "obadia",
  "filimon",
  "2 ioan",
  "3 ioan",
  "iuda",
])

const BOOK_ALIASES: Readonly<Record<string, string>> = {
  "1 regi": "1 imparati",
  "2 regi": "2 imparati",
  psalmul: "psalm",
  psalmi: "psalm",
  deuteronomul: "deuteronom",
  proverbele: "proverbe",
  faptele: "fapte",
  "faptele apostolilor": "fapte",
}

function normalizeBook(book: string): string {
  const normalized = book
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/\s+/gu, " ")
    .trim()
  return BOOK_ALIASES[normalized] ?? normalized
}

function parseBibleReference(reference: string): ParsedBibleReference | null {
  const match = reference.trim().match(/^(.+?)\s+(\d+)(?::(.+))?$/u)
  if (!match) return null

  const book = normalizeBook(match[1] ?? "")
  let chapter = Number(match[2])
  let verseSpec = match[3]
  if (!verseSpec && SINGLE_CHAPTER_BOOKS.has(book)) {
    verseSpec = String(chapter)
    chapter = 1
  }
  if (!book || !Number.isInteger(chapter) || chapter <= 0) return null
  if (!verseSpec) return { book, chapter, wholeChapter: true, verses: [] }

  const verses: VerseInterval[] = []
  for (const part of verseSpec.split(",")) {
    const range = part.trim().match(/^(\d+)(?:-(\d+))?$/u)
    if (!range) return null
    const first = Number(range[1])
    const second = Number(range[2] ?? range[1])
    if (first <= 0 || second <= 0) return null
    verses.push({ start: Math.min(first, second), end: Math.max(first, second) })
  }
  return { book, chapter, wholeChapter: false, verses }
}

export function bibleReferenceIsCovered(
  reference: string,
  anchors: readonly string[],
): boolean {
  const target = parseBibleReference(reference)
  if (!target) return false
  const candidates = anchors
    .map(parseBibleReference)
    .filter((item): item is ParsedBibleReference => Boolean(item))
    .filter(
      (item) => item.book === target.book && item.chapter === target.chapter,
    )
  if (target.wholeChapter) return candidates.some((item) => item.wholeChapter)
  return target.verses.every((targetVerse) =>
    candidates.some(
      (anchor) =>
        anchor.wholeChapter ||
        anchor.verses.some(
          (verse) =>
            verse.start <= targetVerse.start && verse.end >= targetVerse.end,
        ),
    ),
  )
}

export function lessonBiblicalAnchorErrors(lesson: Lesson): string[] {
  const errors: string[] = []
  if (lesson.anchorRefs.length === 0) errors.push("nu are temeiuri biblice")
  for (const anchor of lesson.anchorRefs) {
    if (!parseBibleReference(anchor)) errors.push(`are temeiul invalid „${anchor}”`)
  }
  if (!lesson.memoryVerseRef.trim()) {
    errors.push("nu are referință pentru versetul de memorat")
  } else if (!bibleReferenceIsCovered(lesson.memoryVerseRef, lesson.anchorRefs)) {
    errors.push(
      `nu acoperă versetul de memorat ${lesson.memoryVerseRef} în anchorRefs`,
    )
  }
  for (const step of lesson.steps) {
    if (!step.scripture) continue
    if (!step.scripture.text.trim()) {
      errors.push(`are citatul gol în pasul ${step.id}`)
    }
    if (!bibleReferenceIsCovered(step.scripture.ref, lesson.anchorRefs)) {
      errors.push(
        `nu acoperă referința ${step.scripture.ref} din pasul ${step.id} în anchorRefs`,
      )
    }
  }
  return errors
}
