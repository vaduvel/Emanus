#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const recoveredDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered")
const rebuiltDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-first")
const evidencePath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-evidence.json")
const outputDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first-manifest.json")

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
const EXPECTED = { books: 27, chapters: 260 }
const RECOVERED_COVERAGE_EVIDENCE_KINDS = new Set(["official-episode-range", "official-source-coverage", "supporting-transcript-range"])

function fail(message) { console.error(`[NT final source-first] ${message}`); process.exit(1) }
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function hash(value) { return crypto.createHash("sha256").update(value).digest("hex") }
function readBooks(dir, sourceClass) {
  if (!fs.existsSync(dir)) fail(`missing ${dir}`)
  const map = new Map()
  for (const file of fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort()) {
    const data = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"))
    if (map.has(data.id)) fail(`duplicate ${data.id} in ${dir}`)
    map.set(data.id, { data, sourceClass })
  }
  return map
}
function pointAtOrBefore(chapterA, verseA, chapterB, verseB) {
  return chapterA < chapterB || (chapterA === chapterB && verseA <= verseB)
}
function evidenceCoversVerse(record, chapter, verse) {
  return pointAtOrBefore(record.coverageStartChapter, record.coverageStartVerse, chapter, verse) &&
    pointAtOrBefore(chapter, verse, record.coverageEndChapter, record.coverageEndVerse)
}

if (!fs.existsSync(evidencePath)) fail("missing nt-source-evidence.json; run materialize-nt-source-evidence.mjs first")
const evidenceRegistry = JSON.parse(fs.readFileSync(evidencePath, "utf8"))
const recoveredEvidenceBySource = new Map()
for (const record of evidenceRegistry.records ?? []) {
  if (!RECOVERED_COVERAGE_EVIDENCE_KINDS.has(record.evidenceKind)) continue
  if (![record.coverageStartChapter, record.coverageStartVerse, record.coverageEndChapter, record.coverageEndVerse].every(Number.isInteger)) continue
  const bucket = recoveredEvidenceBySource.get(record.sourceId) ?? []
  bucket.push(record)
  recoveredEvidenceBySource.set(record.sourceId, bucket)
}
for (const bucket of recoveredEvidenceBySource.values()) {
  bucket.sort((a, b) => a.coverageStartChapter - b.coverageStartChapter || a.coverageStartVerse - b.coverageStartVerse || String(a.id).localeCompare(String(b.id)))
}
function recoveredAnchorsForUnit(unit, chapterNumber) {
  if (!Number.isInteger(unit.verseStart) || !Number.isInteger(unit.verseEnd) || unit.verseEnd < unit.verseStart) return []
  const candidates = [...new Map(
    (unit.sourceIds ?? [])
      .flatMap((sourceId) => recoveredEvidenceBySource.get(sourceId) ?? [])
      .filter((record) => {
        const startsBeforeUnitEnds = pointAtOrBefore(record.coverageStartChapter, record.coverageStartVerse, chapterNumber, unit.verseEnd)
        const endsAfterUnitStarts = pointAtOrBefore(chapterNumber, unit.verseStart, record.coverageEndChapter, record.coverageEndVerse)
        return startsBeforeUnitEnds && endsAfterUnitStarts
      })
      .map((record) => [record.id, record]),
  ).values()]
  if (!candidates.length) return []
  for (let verse = unit.verseStart; verse <= unit.verseEnd; verse += 1) {
    if (!candidates.some((record) => evidenceCoversVerse(record, chapterNumber, verse))) return []
  }
  return candidates.map((record) => ({
    sourceId: record.sourceId,
    locator: record.locator,
    evidenceId: record.id,
    evidenceSha256: record.evidenceSha256,
    verificationLevel: record.verificationLevel,
  }))
}

const audited = readBooks(recoveredDir, "audited-recovered-poonen")
const rebuilt = readBooks(rebuiltDir, "rebuilt-poonen-source-first")
if (audited.size !== 15) fail(`reviewed recovered books ${audited.size}/15`)
if (rebuilt.size !== 12) fail(`rebuilt books ${rebuilt.size}/12`)
fs.rmSync(outputDir, { recursive: true, force: true })
fs.mkdirSync(outputDir, { recursive: true })

let totalChapters = 0
let totalUnits = 0
let passageRebuiltChapters = 0
let recoveredUnitsWithSourceLocatorAnchors = 0
let recoveredUnitsWithoutSourceLocatorAnchors = 0
const manifestBooks = []
for (let index = 0; index < CANON.length; index += 1) {
  const [id, bookId, name, expectedChapters] = CANON[index]
  const entry = audited.get(id) ?? rebuilt.get(id)
  if (!entry) fail(`missing canonical book ${id}`)
  if (audited.has(id) && rebuilt.has(id)) fail(`book ${id} exists in both source layers`)
  const source = entry.data
  if (source.bookId !== bookId || source.name !== name) fail(`${id}: canonical metadata mismatch`)
  if (!Array.isArray(source.chapters) || source.chapters.length !== expectedChapters) fail(`${id}: chapters ${source.chapters?.length ?? 0}/${expectedChapters}`)
  const chapters = source.chapters.map((chapter, chapterIndex) => {
    if (chapter.number !== chapterIndex + 1) fail(`${id}: non-contiguous chapter numbering`)
    if (chapter.status !== "in_review") fail(`${id} ${chapter.number}: must remain in_review before final release review`)
    if (entry.sourceClass === "audited-recovered-poonen" && chapter.provenance?.subtleEditorialClassificationComplete !== true) fail(`${id} ${chapter.number}: modern-editorial classification is incomplete`)
    const sourceUnits = chapter.units ?? []
    if (!sourceUnits.length) fail(`${id} ${chapter.number}: no explanation units`)
    const units = sourceUnits.map((unit) => {
      if (entry.sourceClass !== "audited-recovered-poonen") return unit
      const existing = Array.isArray(unit.sourceAnchors) ? unit.sourceAnchors : []
      const anchors = existing.length ? existing : recoveredAnchorsForUnit(unit, chapter.number)
      if (anchors.length) recoveredUnitsWithSourceLocatorAnchors += 1
      else recoveredUnitsWithoutSourceLocatorAnchors += 1
      return anchors.length ? { ...unit, sourceAnchors: anchors } : unit
    })
    totalUnits += units.length
    if (entry.sourceClass === "rebuilt-poonen-source-first" && chapter.reviewState === "source-first-passage-rebuilt") passageRebuiltChapters += 1
    return {
      ...chapter,
      units,
      provenance: {
        ...chapter.provenance,
        ...(entry.sourceClass === "audited-recovered-poonen" ? {
          sourceLocatorAnchorsComplete: units.every((unit) => Array.isArray(unit.sourceAnchors) && unit.sourceAnchors.length > 0),
        } : {}),
      },
      finalSourceClass: entry.sourceClass,
    }
  })
  const payload = {
    schema: "emanus-nt-final-source-first-v1", id, bookId, name, testament: "nt", order: 40 + index,
    status: "in_review", publicationReady: false, sourceClass: entry.sourceClass, chapters,
  }
  const rendered = stable(payload)
  const fileName = `${String(index + 1).padStart(2, "0")}-${id}.json`
  fs.writeFileSync(path.join(outputDir, fileName), rendered, "utf8")
  totalChapters += chapters.length
  manifestBooks.push({ order: 40 + index, id, bookId, name, sourceClass: entry.sourceClass, chapters: chapters.length, units: chapters.reduce((sum, chapter) => sum + chapter.units.length, 0), sha256: hash(rendered) })
}
if (manifestBooks.length !== EXPECTED.books || totalChapters !== EXPECTED.chapters || totalUnits < EXPECTED.chapters) fail(`totals ${manifestBooks.length}/${EXPECTED.books} books, ${totalChapters}/${EXPECTED.chapters} chapters, ${totalUnits} units`)
const manifest = {
  schema: "emanus-nt-final-source-first-manifest-v1",
  status: "in_review",
  publicationReady: false,
  canonicalText: "Biblia Emanus (BE)",
  doctrinePolicy: "Poonen/CFC source-first. Where the source develops the passage, preserve doctrine, interpretation, typology and application without dilution. Modern provenance remains internal.",
  genericCompletionAllowed: false,
  legacyBibleTextAllowed: false,
  sourceTraceabilityComplete: false,
  counts: {
    books: manifestBooks.length,
    chapters: totalChapters,
    units: totalUnits,
    auditedRecoveredBooks: 15,
    rebuiltSourceFirstBooks: 12,
    modernEditorialClassifiedRecoveredBooks: 15,
    passageRebuiltSourceFirstChapters: passageRebuiltChapters,
    chapterSummaryOnlySourceFirstChapters: 69 - passageRebuiltChapters,
    recoveredUnitsWithSourceLocatorAnchors,
    recoveredUnitsWithoutSourceLocatorAnchors,
  },
  books: manifestBooks,
}
fs.writeFileSync(manifestPath, stable(manifest), "utf8")
console.log(`NT final source-first materialized: ${manifestBooks.length} books / ${totalChapters} chapters / ${totalUnits} units.`)
console.log(`Rebuilt-book passage chapters: ${passageRebuiltChapters}/69; whole-chapter summaries remaining: ${69 - passageRebuiltChapters}.`)
console.log(`Recovered source locator anchors: ${recoveredUnitsWithSourceLocatorAnchors} anchored / ${recoveredUnitsWithoutSourceLocatorAnchors} still missing.`)
console.log("Publication remains blocked until source traceability and all other readiness blockers are clear.")
