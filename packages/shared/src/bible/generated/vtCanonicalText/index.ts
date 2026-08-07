// GENERATED de scripts/materialize-vt-overlay-texts.py.
import { JUDECATORI_TEXT } from "./judecatoriText.js"
import { IMPARATI2_TEXT } from "./imparati2Text.js"
import { CRONICI1_TEXT } from "./cronici1Text.js"
import { CRONICI2_TEXT } from "./cronici2Text.js"
import { EZRA_TEXT } from "./ezraText.js"
import { NEEMIA_TEXT } from "./neemiaText.js"
import { ESTERA_TEXT } from "./esteraText.js"
import { IOV_TEXT } from "./iovText.js"
import { PSALMI_TEXT } from "./psalmiText.js"
import { PROVERBE_TEXT } from "./proverbeText.js"
import { ECLESIASTUL_TEXT } from "./eclesiastulText.js"
import { CANTAREA_CANTARILOR_TEXT } from "./cantarea-cantarilorText.js"
import { ISAIA_TEXT } from "./isaiaText.js"
import { IEREMIA_TEXT } from "./ieremiaText.js"
import { PLANGERILE_TEXT } from "./plangerileText.js"
import { EZECHIEL_TEXT } from "./ezechielText.js"
import { DANIEL_TEXT } from "./danielText.js"

export interface CanonicalOverlayTextBook {
  bookId: string
  bibleEmanusBookId: string
  name: string
  order: number
  chapterCount: number
  verseCount: number
  chapters: Readonly<Record<number, readonly string[]>>
}

export const VT_CANONICAL_TEXT_BOOKS: readonly CanonicalOverlayTextBook[] = [
  { bookId: "judecatori", bibleEmanusBookId: "JDG", name: "Judecători", order: 7, chapterCount: 21, verseCount: 618, chapters: JUDECATORI_TEXT },
  { bookId: "imparati2", bibleEmanusBookId: "2KI", name: "2 Împărați", order: 12, chapterCount: 25, verseCount: 719, chapters: IMPARATI2_TEXT },
  { bookId: "cronici1", bibleEmanusBookId: "1CH", name: "1 Cronici", order: 13, chapterCount: 29, verseCount: 942, chapters: CRONICI1_TEXT },
  { bookId: "cronici2", bibleEmanusBookId: "2CH", name: "2 Cronici", order: 14, chapterCount: 36, verseCount: 822, chapters: CRONICI2_TEXT },
  { bookId: "ezra", bibleEmanusBookId: "EZR", name: "Ezra", order: 15, chapterCount: 10, verseCount: 280, chapters: EZRA_TEXT },
  { bookId: "neemia", bibleEmanusBookId: "NEH", name: "Neemia", order: 16, chapterCount: 13, verseCount: 406, chapters: NEEMIA_TEXT },
  { bookId: "estera", bibleEmanusBookId: "EST", name: "Estera", order: 17, chapterCount: 10, verseCount: 167, chapters: ESTERA_TEXT },
  { bookId: "iov", bibleEmanusBookId: "JOB", name: "Iov", order: 18, chapterCount: 42, verseCount: 1070, chapters: IOV_TEXT },
  { bookId: "psalmi", bibleEmanusBookId: "PSA", name: "Psalmii", order: 19, chapterCount: 150, verseCount: 2461, chapters: PSALMI_TEXT },
  { bookId: "proverbe", bibleEmanusBookId: "PRO", name: "Proverbele", order: 20, chapterCount: 31, verseCount: 915, chapters: PROVERBE_TEXT },
  { bookId: "eclesiastul", bibleEmanusBookId: "ECC", name: "Eclesiastul", order: 21, chapterCount: 12, verseCount: 222, chapters: ECLESIASTUL_TEXT },
  { bookId: "cantarea-cantarilor", bibleEmanusBookId: "SNG", name: "Cântarea Cântărilor", order: 22, chapterCount: 8, verseCount: 117, chapters: CANTAREA_CANTARILOR_TEXT },
  { bookId: "isaia", bibleEmanusBookId: "ISA", name: "Isaia", order: 23, chapterCount: 66, verseCount: 1292, chapters: ISAIA_TEXT },
  { bookId: "ieremia", bibleEmanusBookId: "JER", name: "Ieremia", order: 24, chapterCount: 52, verseCount: 1364, chapters: IEREMIA_TEXT },
  { bookId: "plangerile", bibleEmanusBookId: "LAM", name: "Plângerile lui Ieremia", order: 25, chapterCount: 5, verseCount: 154, chapters: PLANGERILE_TEXT },
  { bookId: "ezechiel", bibleEmanusBookId: "EZK", name: "Ezechiel", order: 26, chapterCount: 48, verseCount: 1273, chapters: EZECHIEL_TEXT },
  { bookId: "daniel", bibleEmanusBookId: "DAN", name: "Daniel", order: 27, chapterCount: 12, verseCount: 357, chapters: DANIEL_TEXT },
] as const

export const VT_CANONICAL_TEXT_BY_BOOK = new Map(
  VT_CANONICAL_TEXT_BOOKS.map((book) => [book.bookId, book] as const),
)

export const VT_CANONICAL_TEXT_BLOCKED = [
  { bookId: "osea", bibleEmanusBookId: "HOS", name: "Osea", order: 28, chapterCount: 14, reason: "Biblia Emanus translation not yet available/approved" }},
  { bookId: "ioel", bibleEmanusBookId: "JOL", name: "Ioel", order: 29, chapterCount: 3, reason: "Biblia Emanus translation not yet available/approved" }},
  { bookId: "amos", bibleEmanusBookId: "AMO", name: "Amos", order: 30, chapterCount: 9, reason: "Biblia Emanus translation not yet available/approved" }},
  { bookId: "obadia", bibleEmanusBookId: "OBA", name: "Obadia", order: 31, chapterCount: 1, reason: "Biblia Emanus translation not yet available/approved" }},
  { bookId: "iona", bibleEmanusBookId: "JON", name: "Iona", order: 32, chapterCount: 4, reason: "Biblia Emanus translation not yet available/approved" }},
  { bookId: "mica", bibleEmanusBookId: "MIC", name: "Mica", order: 33, chapterCount: 7, reason: "Biblia Emanus translation not yet available/approved" }},
  { bookId: "naum", bibleEmanusBookId: "NAM", name: "Naum", order: 34, chapterCount: 3, reason: "Biblia Emanus translation not yet available/approved" }},
  { bookId: "habacuc", bibleEmanusBookId: "HAB", name: "Habacuc", order: 35, chapterCount: 3, reason: "Biblia Emanus translation not yet available/approved" }},
  { bookId: "tefania", bibleEmanusBookId: "ZEP", name: "Țefania", order: 36, chapterCount: 3, reason: "Biblia Emanus translation not yet available/approved" }},
  { bookId: "hagai", bibleEmanusBookId: "HAG", name: "Hagai", order: 37, chapterCount: 2, reason: "Biblia Emanus translation not yet available/approved" }},
  { bookId: "zaharia", bibleEmanusBookId: "ZEC", name: "Zaharia", order: 38, chapterCount: 14, reason: "Biblia Emanus translation not yet available/approved" }},
  { bookId: "maleahi", bibleEmanusBookId: "MAL", name: "Maleahi", order: 39, chapterCount: 4, reason: "Biblia Emanus translation not yet available/approved" }},
] as const
