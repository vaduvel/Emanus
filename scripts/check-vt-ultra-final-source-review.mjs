#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

import { BIBLE_BOOKS } from "../packages/shared/dist/bible/index.js"
import { IMPARATI1 } from "../packages/shared/dist/bible/imparati1.js"
import { VT_EXPLAINED_FULL_OVERLAYS } from "../packages/shared/dist/bible/overlays/fullCoverage.js"
import { PUBLICATION_BIBLE_BOOKS } from "../packages/shared/dist/bible/publicationBibleFinal.js"
import { BIBLIA_EMANUS_TRANSLATION } from "../packages/shared/dist/bible/types.js"

const EXPECTED_BOOKS = 39
const EXPECTED_CHAPTERS = 929
const EXPECTED_VERSES = 23145

function need(condition, message) {
  if (!condition) throw new Error(`[VT ultra-final] ${message}`)
}

function text(value) {
  return typeof value === "string" ? value.trim() : ""
}

function normalize(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLocaleLowerCase("ro-RO")
    .replace(/[„”«»“”‘’'"`]/g, " ")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
}

const SOURCE_STOPWORDS = new Set([
  "chapter", "chapters", "verse", "verses", "through", "bible", "poonen", "cfc",
  "this", "that", "with", "from", "into", "about", "there", "their", "they", "them",
  "then", "when", "where", "which", "will", "would", "could", "should", "have", "has",
  "had", "were", "was", "are", "the", "and", "for", "not", "but", "you", "your",
])

const READER_STOPWORDS = new Set([
  "aceasta", "acesta", "această", "acestei", "expunere", "expunerea", "explicație", "explicația",
  "poonen", "zac", "transcript", "transcriptul", "transcriptului", "cfc", "india", "through", "bible",
  "spune", "subliniază", "arată", "explică", "observă", "citește", "vede", "urmărește", "aplică",
])

const DILUTION_PATTERNS = [
  ["self-reference Emanus", /\bEmanus\b/iu],
  ["overlay/editorial meta", /\boverlay(?:-ul)?\b|\beditorial(?:ă|e)?\b/iu],
  ["multiple interpretations", /\bmai multe (?:interpretări|lecturi|modele)\b/iu],
  ["interpreted differently", /\binterpretat(?:ă|e|i)? diferit\b/iu],
  ["possible reading", /\bo posibilă (?:lectură|interpretare)\b/iu],
  ["not doctrine", /\bnu (?:este|sunt|devine|devin).{0,55}\bdoctrin(?:ă|ar)\b/iu],
  ["not doctrinal condition", /\bnu.{0,45}\bcondiți(?:e|a) doctrinară\b/iu],
  ["mark as interpretation", /\b(?:marchează|marcăm|etichetează|etichetăm).{0,55}\binterpret/iu],
  ["do not transform", /\bnu transform(?:ă|ăm).{0,80}\b/iu],
  ["text does not authorize", /\btextul nu autorizează\b/iu],
  ["not a formula/regime/promise", /\bnu este (?:o|un) (?:formulă|regim|promisiune)\b/iu],
  ["not universal", /\bnu.{0,45}\buniversal(?:ă|e)?\b/iu],
  ["do not diagnose/use", /\bnu trebuie (?:diagnosticat(?:ă)?|folosit(?:ă)?|înțeles|înțeleasă)\b/iu],
  ["different Christian models", /\b(?:tradițiile|modelele) creștine.{0,80}\b(?:difer|interpret)/iu],
]

const PUBLIC_UNCERTAINTY_PATTERNS = [
  ["possible reading introduced", /\bo posibilă lectură\b/iu],
  ["possible interpretation introduced", /\bo posibilă interpretare\b/iu],
]

const transcriptCache = new Map()

function transcriptText(relativePath) {
  if (transcriptCache.has(relativePath)) return transcriptCache.get(relativePath)
  need(relativePath.startsWith(".research/poonen-through-the-bible-OT/transcripts/"), `cale transcript neașteptată: ${relativePath}`)
  const absolutePath = path.resolve(process.cwd(), relativePath)
  need(fs.existsSync(absolutePath), `transcript lipsă: ${relativePath}`)
  const content = normalize(fs.readFileSync(absolutePath, "utf8"))
  transcriptCache.set(relativePath, content)
  return content
}

function sourceAnchorTokens(anchor) {
  return [...new Set(normalize(anchor).split(" "))].filter(
    (token) => token.length >= 4 && !SOURCE_STOPWORDS.has(token) && !/^\d+$/.test(token),
  )
}

function assertAnchorGrounded(book, chapter, unit) {
  const source = unit.source
  const anchor = text(source.anchor)
  need(anchor, `${book.name} ${chapter.number} ${unit.from}-${unit.to}: anchor Poonen gol`)
  const transcript = transcriptText(source.transcript)
  const tokens = sourceAnchorTokens(anchor)
  need(tokens.length >= 2, `${book.name} ${chapter.number} ${unit.from}-${unit.to}: anchor prea vag: ${anchor}`)
  const hits = tokens.filter((token) => transcript.includes(token))
  const required = Math.min(4, Math.max(2, Math.ceil(tokens.length * 0.35)))
  need(
    hits.length >= required,
    `${book.name} ${chapter.number} ${unit.from}-${unit.to}: anchor slab ancorat în transcript (${hits.length}/${tokens.length}; necesar ${required})`,
  )
}

function assertNoSourceDilution(where, value) {
  const content = text(value)
  if (!content) return
  for (const [label, pattern] of DILUTION_PATTERNS) {
    need(!pattern.test(content), `${where}: posibilă diluare/editorializare (${label}) — ${content.slice(0, 220)}`)
  }
}

function meaningfulReaderTokens(value) {
  return [...new Set(normalize(value).split(" "))].filter(
    (token) => token.length >= 4 && !READER_STOPWORDS.has(token) && !/^\d+$/.test(token),
  )
}

function assertReaderPreservesSource(where, internalText, publicText) {
  const sourceTokens = meaningfulReaderTokens(internalText)
  const publicTokens = new Set(meaningfulReaderTokens(publicText))
  if (sourceTokens.length >= 12) {
    const retained = sourceTokens.filter((token) => publicTokens.has(token)).length
    const ratio = retained / sourceTokens.length
    need(ratio >= 0.78, `${where}: neutralizarea publică a pierdut prea mult conținut-sursă (${retained}/${sourceTokens.length}, ${(ratio * 100).toFixed(1)}%)`)
  }

  for (const [label, pattern] of PUBLIC_UNCERTAINTY_PATTERNS) {
    if (!pattern.test(internalText)) {
      need(!pattern.test(publicText), `${where}: sanitizerul a introdus ${label}`)
    }
  }
}

function publicBookFor(book) {
  const found = PUBLICATION_BIBLE_BOOKS.find(
    (item) => item.testament === "vt" && item.order === book.order,
  )
  need(found, `${book.name}: carte lipsă din catalogul public final`)
  return found
}

const stats = {
  books: 0,
  chapters: 0,
  publicVerses: 0,
  poonenOverlayUnits: 0,
  poonenOfficialUnits: 0,
  poonenLegacyUnits: 0,
  canonicalExegesisUnits: 0,
  textualOverviewUnits: 0,
  duplicateTeachings: 0,
}

const teachingOwners = new Map()

function recordTeaching(where, value) {
  const normalized = normalize(value)
  if (normalized.length < 220) return
  const owners = teachingOwners.get(normalized) ?? []
  owners.push(where)
  teachingOwners.set(normalized, owners)
}

const legacyBooks = [...BIBLE_BOOKS, IMPARATI1].sort((a, b) => a.order - b.order)
const overlayBooks = [...VT_EXPLAINED_FULL_OVERLAYS].sort((a, b) => a.order - b.order)
const allBooks = [...legacyBooks, ...overlayBooks].sort((a, b) => a.order - b.order)

need(allBooks.length === EXPECTED_BOOKS, `număr cărți ${allBooks.length}/${EXPECTED_BOOKS}`)
need(allBooks.reduce((sum, book) => sum + book.chapters.length, 0) === EXPECTED_CHAPTERS, `număr capitole diferit de ${EXPECTED_CHAPTERS}`)

for (const book of overlayBooks) {
  const publicBook = publicBookFor(book)
  need(publicBook.translation === BIBLIA_EMANUS_TRANSLATION, `${book.name}: traducerea publică nu este Biblia Emanus`)

  for (const chapter of book.chapters) {
    const publicChapter = publicBook.chapters.find((item) => item.number === chapter.number)
    need(publicChapter, `${book.name} ${chapter.number}: capitol public lipsă`)

    for (const unit of chapter.units) {
      const where = `${book.name} ${chapter.number}:${unit.from}-${unit.to}`
      recordTeaching(where, unit.teaching)

      if (unit.source?.kind === "poonen") {
        stats.poonenOverlayUnits += 1
        need(unit.explanationKind === "exposition", `${where}: unitate Poonen care nu este exposition`)
        assertAnchorGrounded(book, chapter, unit)
        assertNoSourceDilution(`${where} teaching`, unit.teaching)
        assertNoSourceDilution(`${where} heading`, unit.heading)
        assertNoSourceDilution(`${where} application`, unit.forYourHeart)

        const publicUnit = publicChapter.units.find(
          (item) => item.verseStart === unit.from && item.verseEnd === unit.to,
        )
        need(publicUnit, `${where}: unitatea Poonen nu mai poate fi mapată exact în reader`)
        assertReaderPreservesSource(where, unit.teaching, publicUnit.teaching)
      } else if (unit.source?.kind === "poonen-official") {
        stats.poonenOfficialUnits += 1
        need(unit.explanationKind === "exposition", `${where}: poonen-official care nu este exposition`)
        need(text(unit.source.sourceUrl), `${where}: sourceUrl poonen-official lipsă`)
        need(text(unit.source.section), `${where}: section poonen-official lipsă`)
        assertNoSourceDilution(`${where} teaching`, unit.teaching)
      } else if (unit.source?.kind === "canonical-exegesis") {
        stats.canonicalExegesisUnits += 1
      }

      if (unit.explanationKind === "textual-overview") {
        stats.textualOverviewUnits += 1
        need(unit.source?.kind === "biblia-emanus", `${where}: textual-overview fără source=biblia-emanus`)
        need(!text(unit.forYourHeart), `${where}: textual-overview cu aplicație pastorală`)
        need(!(unit.words?.length > 0), `${where}: textual-overview cu studiu lexical`)
      }
    }
  }
}

for (const book of legacyBooks) {
  const publicBook = publicBookFor(book)
  need(publicBook.translation === BIBLIA_EMANUS_TRANSLATION, `${book.name}: traducerea publică nu este Biblia Emanus`)

  for (const chapter of book.chapters) {
    const publicChapter = publicBook.chapters.find((item) => item.number === chapter.number)
    need(publicChapter, `${book.name} ${chapter.number}: capitol public lipsă`)

    for (const unit of chapter.units) {
      const where = `${book.name} ${chapter.number} ${unit.ref}`
      recordTeaching(where, unit.teaching)
      if (/\bPoonen\b/iu.test(unit.explanationSource ?? "")) {
        stats.poonenLegacyUnits += 1
        need(unit.explanationKind === "exposition", `${where}: provenance Poonen fără exposition`)
        assertNoSourceDilution(`${where} teaching`, unit.teaching)
        assertNoSourceDilution(`${where} heading`, unit.heading)
        assertNoSourceDilution(`${where} application`, unit.forYourHeart)

        const publicUnit = publicChapter.units.find((item) => item.ref === unit.ref)
        need(publicUnit, `${where}: unitatea legacy Poonen lipsește din reader`)
        assertReaderPreservesSource(where, unit.teaching, publicUnit.teaching)
      }

      if (unit.explanationKind === "textual-overview") {
        stats.textualOverviewUnits += 1
        need(!text(unit.forYourHeart), `${where}: textual-overview legacy cu aplicație pastorală`)
        need(!(unit.words?.length > 0), `${where}: textual-overview legacy cu studiu lexical`)
      }
    }
  }
}

const publicOt = PUBLICATION_BIBLE_BOOKS.filter((book) => book.testament === "vt").sort((a, b) => a.order - b.order)
need(publicOt.length === EXPECTED_BOOKS, `catalog public VT ${publicOt.length}/${EXPECTED_BOOKS}`)
need(publicOt.reduce((sum, book) => sum + book.chapters.length, 0) === EXPECTED_CHAPTERS, `catalog public nu are ${EXPECTED_CHAPTERS} capitole`)

const publicForbidden = /\b(?:Zac\s+)?Poonen\b|\bCFC India\b|\bThrough The Bible\b|\btranscript(?:ul|ului|e)?\b/iu
const publicEditorialMeta = /\bo posibilă lectură\b|\bo posibilă interpretare\b|\boverlay(?:-ul)?\b/iu

for (const book of publicOt) {
  stats.books += 1
  need(book.order === stats.books, `ordine publică VT discontinuuă la ${book.name}: ${book.order}`)
  need(book.translation === BIBLIA_EMANUS_TRANSLATION, `${book.name}: traducere finală incorectă`)

  for (const chapter of book.chapters) {
    stats.chapters += 1
    need(chapter.status === "published", `${book.name} ${chapter.number}: status public ${chapter.status}`)
    for (const unit of chapter.units) {
      need(Number.isInteger(unit.verseStart) && Number.isInteger(unit.verseEnd), `${unit.ref}: interval explicit lipsă`)
      need(unit.verseStart >= 1 && unit.verseEnd >= unit.verseStart, `${unit.ref}: interval explicit invalid`)
      stats.publicVerses += unit.verseEnd - unit.verseStart + 1
      for (const [label, value] of [
        ["heading", unit.heading],
        ["teaching", unit.teaching],
        ["application", unit.forYourHeart],
      ]) {
        if (!value) continue
        need(!publicForbidden.test(value), `${unit.ref} ${label}: provenance modern expus public`)
        need(!publicEditorialMeta.test(value), `${unit.ref} ${label}: limbaj editorial/diluant expus public`)
      }
      need(!unit.explanationSource, `${unit.ref}: explanationSource expus public`)
    }
  }
}

need(stats.chapters === EXPECTED_CHAPTERS, `capitole publice parcurse ${stats.chapters}/${EXPECTED_CHAPTERS}`)
need(stats.publicVerses === EXPECTED_VERSES, `versete acoperite de unități publice ${stats.publicVerses}/${EXPECTED_VERSES}`)
need(stats.poonenOverlayUnits + stats.poonenOfficialUnits + stats.poonenLegacyUnits > 0, "nicio unitate Poonen detectată")

const duplicateGroups = [...teachingOwners.entries()].filter(([, owners]) => owners.length > 1)
stats.duplicateTeachings = duplicateGroups.length
if (duplicateGroups.length) {
  console.warn(`[VT ultra-final] WARN — ${duplicateGroups.length} grupuri de teaching identic >=220 caractere; necesită doar inspecție dacă nu sunt repetări intenționate.`)
  duplicateGroups.slice(0, 20).forEach(([, owners]) => console.warn(`  - ${owners.join(" | ")}`))
}

console.log(
  `[VT ultra-final] PASS — ${stats.books}/${EXPECTED_BOOKS} cărți, ${stats.chapters}/${EXPECTED_CHAPTERS} capitole, ${stats.publicVerses}/${EXPECTED_VERSES} versete; ` +
    `${stats.poonenOverlayUnits} unități Poonen overlay, ${stats.poonenOfficialUnits} poonen-official, ${stats.poonenLegacyUnits} legacy Poonen, ` +
    `${stats.canonicalExegesisUnits} canonical-exegesis, ${stats.textualOverviewUnits} textual-overview. ` +
    `Fără diluare editorială detectată în unitățile Poonen și fără incertitudine introdusă de sanitizer în reader.`,
)
