export type VtExplainedFormat = "legacy-full" | "full-overlay"

export interface VtExplainedCoverageEntry {
  order: number
  id: string
  name: string
  format: VtExplainedFormat
  coverage: "full"
  /** Statusul explicației, independent de stadiul traducerii biblice afișate. */
  status: "published"
  sourceFamily: "allen-nolan" | "poonen-transcript" | "poonen-official"
}

const legacy = (
  order: number,
  id: string,
  name: string,
  sourceFamily: VtExplainedCoverageEntry["sourceFamily"],
): VtExplainedCoverageEntry => ({
  order,
  id,
  name,
  format: "legacy-full",
  coverage: "full",
  status: "published",
  sourceFamily,
})

const overlay = (
  order: number,
  id: string,
  name: string,
  sourceFamily: VtExplainedCoverageEntry["sourceFamily"],
): VtExplainedCoverageEntry => ({
  order,
  id,
  name,
  format: "full-overlay",
  coverage: "full",
  status: "published",
  sourceFamily,
})

export const VT_EXPLAINED_COVERAGE: readonly VtExplainedCoverageEntry[] = [
  legacy(1, "geneza", "Geneza", "allen-nolan"),
  legacy(2, "exod", "Exodul", "poonen-transcript"),
  legacy(3, "levitic", "Leviticul", "poonen-transcript"),
  legacy(4, "numeri", "Numeri", "poonen-transcript"),
  legacy(5, "deuteronom", "Deuteronomul", "poonen-transcript"),
  legacy(6, "iosua", "Iosua", "poonen-transcript"),
  overlay(7, "judecatori", "Judecători", "poonen-transcript"),
  legacy(8, "rut", "Rut", "poonen-transcript"),
  legacy(9, "1-samuel", "1 Samuel", "poonen-transcript"),
  legacy(10, "2-samuel", "2 Samuel", "poonen-transcript"),
  legacy(11, "1-imparati", "1 Împărați", "poonen-transcript"),
  overlay(12, "2-imparati", "2 Împărați", "poonen-transcript"),
  overlay(13, "1-cronici", "1 Cronici", "poonen-transcript"),
  overlay(14, "2-cronici", "2 Cronici", "poonen-transcript"),
  overlay(15, "ezra", "Ezra", "poonen-transcript"),
  overlay(16, "neemia", "Neemia", "poonen-transcript"),
  overlay(17, "estera", "Estera", "poonen-transcript"),
  overlay(18, "iov", "Iov", "poonen-transcript"),
  overlay(19, "psalmi", "Psalmii", "poonen-transcript"),
  overlay(20, "proverbe", "Proverbele", "poonen-transcript"),
  overlay(21, "eclesiastul", "Eclesiastul", "poonen-transcript"),
  overlay(22, "cantarea-cantarilor", "Cântarea Cântărilor", "poonen-transcript"),
  overlay(23, "isaia", "Isaia", "poonen-transcript"),
  overlay(24, "ieremia", "Ieremia", "poonen-transcript"),
  overlay(25, "plangerile", "Plângerile lui Ieremia", "poonen-transcript"),
  overlay(26, "ezechiel", "Ezechiel", "poonen-transcript"),
  overlay(27, "daniel", "Daniel", "poonen-transcript"),
  overlay(28, "osea", "Osea", "poonen-official"),
  overlay(29, "ioel", "Ioel", "poonen-official"),
  overlay(30, "amos", "Amos", "poonen-official"),
  overlay(31, "obadia", "Obadia", "poonen-official"),
  overlay(32, "iona", "Iona", "poonen-official"),
  overlay(33, "mica", "Mica", "poonen-official"),
  overlay(34, "naum", "Naum", "poonen-official"),
  overlay(35, "habacuc", "Habacuc", "poonen-official"),
  overlay(36, "tefania", "Țefania", "poonen-official"),
  overlay(37, "hagai", "Hagai", "poonen-official"),
  overlay(38, "zaharia", "Zaharia", "poonen-official"),
  overlay(39, "maleahi", "Maleahi", "poonen-official"),
]

if (VT_EXPLAINED_COVERAGE.length !== 39) {
  throw new Error(`[Biblia explicată VT] acoperire invalidă: ${VT_EXPLAINED_COVERAGE.length}/39 cărți.`)
}

VT_EXPLAINED_COVERAGE.forEach((book, index) => {
  if (book.order !== index + 1) {
    throw new Error(`[Biblia explicată VT] ordine invalidă la ${book.name}.`)
  }
  if (book.coverage !== "full") {
    throw new Error(`[Biblia explicată VT] ${book.name} nu are acoperire completă.`)
  }
  if (book.status !== "published") {
    throw new Error(`[Biblia explicată VT] ${book.name} nu are explicația aprobată pentru publicare.`)
  }
})
