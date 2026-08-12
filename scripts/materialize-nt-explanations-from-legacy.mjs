#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"
import crypto from "node:crypto"

const ROOT = process.cwd()
const args = process.argv.slice(2)
const valueOf = (name, fallback = undefined) => {
  const index = args.indexOf(name)
  return index >= 0 ? args[index + 1] : fallback
}

const legacyRoot = path.resolve(valueOf("--legacy-root", path.join(ROOT, "..", "nt-legacy")))
const legacyIndex = path.join(legacyRoot, "packages", "shared", "dist", "bible", "index.js")
const emanusDir = path.join(ROOT, "docs", "data", "biblia-emanus")
const outputDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-recovered")
const sourceOutputDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-registry")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-recovery-manifest.json")
const reportPath = path.join(ROOT, "docs", "biblia-explicata", "NT-RECOVERY-REPORT.md")

const CANON = [
  ["matei", "MAT", "Matei", 28], ["marcu", "MRK", "Marcu", 16], ["luca", "LUK", "Luca", 24],
  ["ioan", "JHN", "Ioan", 21], ["fapte", "ACT", "Faptele Apostolilor", 28], ["romani", "ROM", "Romani", 16],
  ["1-corinteni", "1CO", "1 Corinteni", 16], ["2-corinteni", "2CO", "2 Corinteni", 13], ["galateni", "GAL", "Galateni", 6],
  ["efeseni", "EPH", "Efeseni", 6], ["filipeni", "PHP", "Filipeni", 4], ["coloseni", "COL", "Coloseni", 4],
  ["1-tesaloniceni", "1TH", "1 Tesaloniceni", 5], ["2-tesaloniceni", "2TH", "2 Tesaloniceni", 3], ["1-timotei", "1TI", "1 Timotei", 6],
  ["2-timotei", "2TI", "2 Timotei", 4], ["tit", "TIT", "Tit", 3], ["filimon", "PHM", "Filimon", 1],
  ["evrei", "HEB", "Evrei", 13], ["iacov", "JAS", "Iacov", 5], ["1-petru", "1PE", "1 Petru", 5],
  ["2-petru", "2PE", "2 Petru", 3], ["1-ioan", "1JN", "1 Ioan", 5], ["2-ioan", "2JN", "2 Ioan", 1],
  ["3-ioan", "3JN", "3 Ioan", 1], ["iuda", "JUD", "Iuda", 1], ["apocalipsa", "REV", "Apocalipsa", 22],
]

const RECOVERABLE_IDS = new Set([
  "matei", "marcu", "luca", "ioan", "fapte", "romani", "1-corinteni", "2-corinteni",
  "galateni", "efeseni", "filipeni", "coloseni", "1-tesaloniceni", "tit", "filimon",
])
const QUARANTINED_IDS = new Set([
  "2-tesaloniceni", "1-timotei", "2-timotei", "evrei", "iacov", "1-petru", "2-petru",
  "1-ioan", "2-ioan", "3-ioan", "iuda", "apocalipsa",
])
const EXPECTED = { books: 27, chapters: 260, verses: 7941, recoverableChapters: 191, quarantinedChapters: 69 }

function fail(message) {
  console.error(`[NT recovery] ${message}`)
  process.exit(1)
}
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }
function jsonStable(value) { return JSON.stringify(value, null, 2) + "\n" }

function loadEmanusChapter(code, chapter) {
  const file = path.join(emanusDir, `${code}.${chapter}.json`)
  if (!fs.existsSync(file)) fail(`lipsește Biblia Emanus ${code}.${chapter}.json`)
  const data = JSON.parse(fs.readFileSync(file, "utf8"))
  if (data.translation !== "BE") fail(`${code}.${chapter}: translation != BE`)
  if (data.status !== "published" || data.public !== true) fail(`${code}.${chapter}: Biblia Emanus nu este published/public`)
  if (data.bookId !== code || data.chapter !== chapter) fail(`${code}.${chapter}: metadata Biblia Emanus invalidă`)
  if (!Array.isArray(data.verses) || data.verses.length === 0) fail(`${code}.${chapter}: verses lipsă`)

  const verseNumbers = []
  const mainVerseNumbers = new Set()
  let previous = 0
  for (const verse of data.verses) {
    if (!verse || !Number.isInteger(verse.number) || verse.number <= previous) {
      fail(`${code}.${chapter}: numerotare BE neordonată sau invalidă`)
    }
    if (typeof verse.text !== "string" || !verse.text.trim()) fail(`${code}.${chapter}:${verse.number}: text BE gol`)
    previous = verse.number
    verseNumbers.push(verse.number)
    mainVerseNumbers.add(verse.number)
  }

  const criticalReferenceNumbers = []
  for (const note of Array.isArray(data.referenceNotes) ? data.referenceNotes : []) {
    if (!Number.isInteger(note?.number) || note.number < 1 || mainVerseNumbers.has(note.number)) continue
    if (note.status !== "not-in-critical-main-text" || note.resolutionStatus !== "resolved") {
      fail(`${code}.${chapter}:${note.number}: slot absent din text fără rezoluție critică explicită`)
    }
    if (typeof note.displayNote !== "string" || !note.displayNote.trim()) {
      fail(`${code}.${chapter}:${note.number}: referenceNote critic fără displayNote`)
    }
    criticalReferenceNumbers.push(note.number)
  }
  criticalReferenceNumbers.sort((a, b) => a - b)

  const lastVerseNumber = Math.max(...verseNumbers, ...criticalReferenceNumbers)
  const criticalSet = new Set(criticalReferenceNumbers)
  for (let number = 1; number <= lastVerseNumber; number += 1) {
    if (!mainVerseNumbers.has(number) && !criticalSet.has(number)) {
      fail(`${code}.${chapter}:${number}: gol de numerotare fără referenceNote critic rezolvat`)
    }
  }

  return {
    verseEntryCount: data.verses.length,
    lastVerseNumber,
    criticalReferenceNumbers,
    criticalSet,
  }
}

function parseRange(ref, chapterNumber) {
  const match = String(ref ?? "").match(/\b(\d+):(\d+)(?:-(\d+))?\s*$/)
  if (!match) fail(`referință imposibil de interpretat: ${ref}`)
  const chapter = Number(match[1])
  const from = Number(match[2])
  const to = Number(match[3] ?? match[2])
  if (chapter !== chapterNumber) fail(`referință pe capitol greșit: ${ref}; capitol obiect=${chapterNumber}`)
  if (!Number.isInteger(from) || !Number.isInteger(to) || from < 1 || to < from) fail(`interval invalid: ${ref}`)
  return [from, to]
}

function cleanUnit(unit, chapterNumber, binding) {
  const [verseStart, verseEnd] = parseRange(unit.ref, chapterNumber)
  if (verseEnd > binding.lastVerseNumber) fail(`${unit.ref}: depășește numerotarea Biblia Emanus (${binding.lastVerseNumber})`)
  const criticalReferenceNumbers = []
  for (let number = verseStart; number <= verseEnd; number += 1) {
    if (binding.criticalSet.has(number)) criticalReferenceNumbers.push(number)
  }
  return {
    id: unit.id,
    ref: unit.ref,
    verseStart,
    verseEnd,
    ...(criticalReferenceNumbers.length ? { criticalReferenceNumbers } : {}),
    heading: unit.heading,
    teaching: unit.teaching,
    ...(Array.isArray(unit.words) && unit.words.length ? { words: unit.words } : {}),
    ...(Array.isArray(unit.crossRefs) && unit.crossRefs.length ? { crossRefs: unit.crossRefs } : {}),
    ...(typeof unit.forYourHeart === "string" && unit.forYourHeart.trim() ? { forYourHeart: unit.forYourHeart } : {}),
  }
}

function copySourceRegistry() {
  const legacyData = path.join(legacyRoot, "docs", "data")
  fs.rmSync(sourceOutputDir, { recursive: true, force: true })
  fs.mkdirSync(sourceOutputDir, { recursive: true })
  const copied = []
  if (!fs.existsSync(legacyData)) return copied
  for (const name of fs.readdirSync(legacyData).sort()) {
    if (!name.endsWith(".json") || !name.toLowerCase().includes("poonen")) continue
    fs.copyFileSync(path.join(legacyData, name), path.join(sourceOutputDir, name))
    copied.push(name)
  }
  return copied
}

if (!fs.existsSync(legacyIndex)) fail(`nu există ${legacyIndex}; compilează mai întâi @emanus/shared pe agent/complete-new-testament`)
const legacyModule = await import(pathToFileURL(legacyIndex).href + `?t=${Date.now()}`)
const legacyBooks = (legacyModule.BIBLE_BOOKS ?? []).filter((book) => book?.testament === "nt")
if (legacyBooks.length !== EXPECTED.books) fail(`catalog legacy NT ${legacyBooks.length}/${EXPECTED.books}`)

const byId = new Map(legacyBooks.map((book) => [book.id, book]))
const outputBooks = []
let totalChapters = 0
let totalVerses = 0
let recoverableChapters = 0
let quarantinedChapters = 0
let totalUnits = 0
let totalCriticalReferenceSlots = 0

fs.rmSync(outputDir, { recursive: true, force: true })
fs.mkdirSync(outputDir, { recursive: true })

for (let order = 0; order < CANON.length; order += 1) {
  const [id, code, canonicalName, expectedChapters] = CANON[order]
  const legacy = byId.get(id)
  if (!legacy) fail(`lipsește cartea legacy ${id}`)
  if (!Array.isArray(legacy.chapters) || legacy.chapters.length !== expectedChapters) fail(`${id}: capitole ${legacy.chapters?.length ?? 0}/${expectedChapters}`)

  const recoveryClass = RECOVERABLE_IDS.has(id)
    ? "recovered-needs-source-audit"
    : QUARANTINED_IDS.has(id)
      ? "quarantined-generic-completion"
      : fail(`${id}: carte fără clasă de recuperare`)

  const chapters = []
  let bookVerses = 0
  let bookUnits = 0
  let bookCriticalSlots = 0
  for (let index = 0; index < legacy.chapters.length; index += 1) {
    const number = index + 1
    const chapter = legacy.chapters[index]
    if (chapter.number !== number) fail(`${id}: capitole necontinue la ${number}`)
    const binding = loadEmanusChapter(code, number)
    const units = (chapter.units ?? []).map((unit) => cleanUnit(unit, number, binding))
    if (!units.length) fail(`${id} ${number}: units gol`)

    let expectedNext = 1
    for (const unit of units) {
      if (unit.verseStart !== expectedNext) fail(`${id} ${number}: acoperire discontinuă; așteptat ${expectedNext}, găsit ${unit.verseStart}`)
      expectedNext = unit.verseEnd + 1
    }
    if (expectedNext !== binding.lastVerseNumber + 1) fail(`${id} ${number}: acoperire numerică ${expectedNext - 1}/${binding.lastVerseNumber}`)

    chapters.push({
      number,
      title: chapter.title,
      summary: chapter.summary,
      literaryContext: chapter.literaryContext,
      historicalContext: chapter.historicalContext,
      units,
      prayer: chapter.prayer,
      status: recoveryClass === "recovered-needs-source-audit" ? "in_review" : "quarantined",
      emanusTextBinding: {
        translation: "BE",
        bookId: code,
        chapter: number,
        verseEntryCount: binding.verseEntryCount,
        lastVerseNumber: binding.lastVerseNumber,
        criticalReferenceNumbers: binding.criticalReferenceNumbers,
      },
    })
    totalChapters += 1
    totalVerses += binding.verseEntryCount
    totalUnits += units.length
    totalCriticalReferenceSlots += binding.criticalReferenceNumbers.length
    bookVerses += binding.verseEntryCount
    bookUnits += units.length
    bookCriticalSlots += binding.criticalReferenceNumbers.length
    if (recoveryClass === "recovered-needs-source-audit") recoverableChapters += 1
    else quarantinedChapters += 1
  }

  const payload = {
    schema: "emanus-nt-explanation-recovery-v1",
    id,
    bookId: code,
    name: canonicalName,
    testament: "nt",
    order: 40 + order,
    recoveryClass,
    sourceBranch: "agent/complete-new-testament",
    sourcePolicy: recoveryClass === "recovered-needs-source-audit"
      ? "Conținut editorial recuperat. Nu se publică până la audit source-first Poonen/CFC capitol cu capitol."
      : "Completion generic detectat. Nu se publică și nu se promovează la source-first; trebuie reconstruit din sursa Poonen/CFC.",
    textPolicy: "Textul biblic legacy nu este copiat. Intervalele sunt validate exclusiv față de Biblia Emanus BE publicată, inclusiv sloturile critice rezolvate.",
    chapters,
  }
  const rendered = jsonStable(payload)
  fs.writeFileSync(path.join(outputDir, `${String(order + 1).padStart(2, "0")}-${id}.json`), rendered, "utf8")
  outputBooks.push({ order: 40 + order, id, bookId: code, name: canonicalName, recoveryClass, chapters: expectedChapters, verses: bookVerses, units: bookUnits, criticalReferenceSlots: bookCriticalSlots, sha256: sha256(rendered) })
}

if (totalChapters !== EXPECTED.chapters) fail(`capitole ${totalChapters}/${EXPECTED.chapters}`)
if (totalVerses !== EXPECTED.verses) fail(`versete Biblia Emanus ${totalVerses}/${EXPECTED.verses}`)
if (recoverableChapters !== EXPECTED.recoverableChapters) fail(`capitole recuperabile ${recoverableChapters}/${EXPECTED.recoverableChapters}`)
if (quarantinedChapters !== EXPECTED.quarantinedChapters) fail(`capitole carantinate ${quarantinedChapters}/${EXPECTED.quarantinedChapters}`)

const copiedSources = copySourceRegistry()
const manifest = {
  schema: "emanus-nt-explanation-recovery-manifest-v1",
  generatedFrom: "agent/complete-new-testament",
  canonicalText: "Biblia Emanus (BE)",
  status: "in_review",
  publicationBlocked: true,
  rule: "Poonen/CFC source-first. Conținutul generic nu poate fi publicat.",
  counts: {
    books: outputBooks.length, chapters: totalChapters, verses: totalVerses, units: totalUnits,
    criticalReferenceSlots: totalCriticalReferenceSlots, recoverableBooks: RECOVERABLE_IDS.size,
    recoverableChapters, quarantinedBooks: QUARANTINED_IDS.size, quarantinedChapters,
  },
  sourceRegistryFiles: copiedSources,
  books: outputBooks,
}
fs.mkdirSync(path.dirname(manifestPath), { recursive: true })
fs.writeFileSync(manifestPath, jsonStable(manifest), "utf8")

const recoverableRows = outputBooks.filter((book) => book.recoveryClass === "recovered-needs-source-audit")
const quarantinedRows = outputBooks.filter((book) => book.recoveryClass === "quarantined-generic-completion")
const report = `# NT explicat — raport de recuperare curată\n\n` +
  `## Verdict intermediar\n\n` +
  `Catalogul legacy \`agent/complete-new-testament\` conține structural **${outputBooks.length}/27 cărți, ${totalChapters}/260 capitole**. ` +
  `Textul biblic vechi nu este importat. Fiecare interval este validat față de **Biblia Emanus BE publicată (${totalVerses} versete NT)**, iar numerele absente din textul critic sunt acceptate numai când BE le păstrează ca note critice rezolvate.\n\n` +
  `- **${recoverableRows.length} cărți / ${recoverableChapters} capitole**: conținut editorial recuperat, obligatoriu de auditat source-first Poonen/CFC înainte de publicare.\n` +
  `- **${quarantinedRows.length} cărți / ${quarantinedChapters} capitole**: completion generic; rămâne în carantină și trebuie reconstruit direct din sursa Poonen/CFC.\n` +
  `- **${totalCriticalReferenceSlots} sloturi numerice critice** sunt păstrate ca referințe, nu transformate în versete BE.\n` +
  `- **Publicare: BLOCATĂ** până la auditul integral 27/27 și 260/260.\n\n` +
  `## Regula doctrinară\n\n` +
  `Unde Zac Poonen/CFC dezvoltă pasajul, explicația finală păstrează doctrina, interpretarea, tipologia și aplicația lui fără diluare sau relativizare. ` +
  `Numele sursei rămâne în provenance intern; reader-ul public nu îl expune. În golurile reale ale sursei se poate folosi numai rezumat textual sau exegeza canonică verificată, clar separată.\n\n` +
  `## Recuperabile, dar încă nepublicabile\n\n` + recoverableRows.map((book) => `- ${book.name}: ${book.chapters} capitole, ${book.units} unități`).join("\n") +
  `\n\n## Carantină — de refăcut din Poonen/CFC\n\n` + quarantinedRows.map((book) => `- ${book.name}: ${book.chapters} capitole, ${book.units} unități legacy generice`).join("\n") +
  `\n\n## Următoarea poartă\n\nFiecare capitol trebuie să primească provenance source-first și verdict editorial. Nicio carte nu devine \`published\` doar pentru că are acoperire structurală completă.\n`
fs.mkdirSync(path.dirname(reportPath), { recursive: true })
fs.writeFileSync(reportPath, report, "utf8")

console.log(`NT recovery OK: ${outputBooks.length} books / ${totalChapters} chapters / ${totalVerses} BE verses / ${totalUnits} units`)
console.log(`Critical reference slots preserved: ${totalCriticalReferenceSlots}`)
console.log(`Recoverable: ${recoverableRows.length} books / ${recoverableChapters} chapters`)
console.log(`Quarantined generic completion: ${quarantinedRows.length} books / ${quarantinedChapters} chapters`)
