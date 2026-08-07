export type VtExplainedFormat = "legacy-full" | "transcript-overlay"

export interface VtExplainedCoverageEntry {
  order: number
  id: string
  name: string
  format: VtExplainedFormat
  status: "in_review"
  sourceFamily: "allen-nolan" | "poonen-transcript" | "poonen-official"
}

export const VT_EXPLAINED_COVERAGE: readonly VtExplainedCoverageEntry[] = [
  { order: 1, id: "geneza", name: "Geneza", format: "legacy-full", status: "in_review", sourceFamily: "allen-nolan" },
  { order: 2, id: "exod", name: "Exodul", format: "legacy-full", status: "in_review", sourceFamily: "poonen-transcript" },
  { order: 3, id: "levitic", name: "Leviticul", format: "legacy-full", status: "in_review", sourceFamily: "poonen-transcript" },
  { order: 4, id: "numeri", name: "Numeri", format: "legacy-full", status: "in_review", sourceFamily: "poonen-transcript" },
  { order: 5, id: "deuteronom", name: "Deuteronomul", format: "legacy-full", status: "in_review", sourceFamily: "poonen-transcript" },
  { order: 6, id: "iosua", name: "Iosua", format: "legacy-full", status: "in_review", sourceFamily: "poonen-transcript" },
  { order: 7, id: "judecatori", name: "Judecători", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-transcript" },
  { order: 8, id: "rut", name: "Rut", format: "legacy-full", status: "in_review", sourceFamily: "poonen-transcript" },
  { order: 9, id: "1-samuel", name: "1 Samuel", format: "legacy-full", status: "in_review", sourceFamily: "poonen-transcript" },
  { order: 10, id: "2-samuel", name: "2 Samuel", format: "legacy-full", status: "in_review", sourceFamily: "poonen-transcript" },
  { order: 11, id: "1-imparati", name: "1 Împărați", format: "legacy-full", status: "in_review", sourceFamily: "poonen-transcript" },
  { order: 12, id: "2-imparati", name: "2 Împărați", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-transcript" },
  { order: 13, id: "1-cronici", name: "1 Cronici", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-transcript" },
  { order: 14, id: "2-cronici", name: "2 Cronici", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-transcript" },
  { order: 15, id: "ezra", name: "Ezra", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-transcript" },
  { order: 16, id: "neemia", name: "Neemia", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-transcript" },
  { order: 17, id: "estera", name: "Estera", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-transcript" },
  { order: 18, id: "iov", name: "Iov", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-transcript" },
  { order: 19, id: "psalmi", name: "Psalmii", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-transcript" },
  { order: 20, id: "proverbe", name: "Proverbele", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-transcript" },
  { order: 21, id: "eclesiastul", name: "Eclesiastul", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-transcript" },
  { order: 22, id: "cantarea-cantarilor", name: "Cântarea Cântărilor", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-transcript" },
  { order: 23, id: "isaia", name: "Isaia", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-transcript" },
  { order: 24, id: "ieremia", name: "Ieremia", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-transcript" },
  { order: 25, id: "plangerile", name: "Plângerile lui Ieremia", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-transcript" },
  { order: 26, id: "ezechiel", name: "Ezechiel", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-transcript" },
  { order: 27, id: "daniel", name: "Daniel", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-transcript" },
  { order: 28, id: "osea", name: "Osea", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-official" },
  { order: 29, id: "ioel", name: "Ioel", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-official" },
  { order: 30, id: "amos", name: "Amos", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-official" },
  { order: 31, id: "obadia", name: "Obadia", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-official" },
  { order: 32, id: "iona", name: "Iona", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-official" },
  { order: 33, id: "mica", name: "Mica", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-official" },
  { order: 34, id: "naum", name: "Naum", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-official" },
  { order: 35, id: "habacuc", name: "Habacuc", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-official" },
  { order: 36, id: "tefania", name: "Țefania", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-official" },
  { order: 37, id: "hagai", name: "Hagai", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-official" },
  { order: 38, id: "zaharia", name: "Zaharia", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-official" },
  { order: 39, id: "maleahi", name: "Maleahi", format: "transcript-overlay", status: "in_review", sourceFamily: "poonen-official" },
]

if (VT_EXPLAINED_COVERAGE.length !== 39) {
  throw new Error(`[Biblia explicată VT] acoperire invalidă: ${VT_EXPLAINED_COVERAGE.length}/39 cărți.`)
}

VT_EXPLAINED_COVERAGE.forEach((book, index) => {
  if (book.order !== index + 1) {
    throw new Error(`[Biblia explicată VT] ordine invalidă la ${book.name}.`)
  }
})
