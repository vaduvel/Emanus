#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const inputDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-recovered")
const dir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-audited-recovered")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-audited-recovered-manifest.json")
const ledgerPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-audited-recovered-ledger.json")
const registryPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-registry", "source-first-15.json")
const beDir = path.join(ROOT, "docs", "data", "biblia-emanus")
const EXPECTED = { books: 15, chapters: 191, units: 762 }

const PUBLIC_FORBIDDEN = [
  /\b(?:Zac\s+Poonen|Poonen|CFC|Christian Fellowship|SermonIndex|Allen Nolan|Nolan|Robert Breaker|Breaker|Mohler)\b/i,
  /\bRCCV\b/i,
  /\bEmanus afișează\b/i,
  /\b(?:overlay|reader|transcrierea brută|în această explicație|această unitate editorială)\b/i,
  /\b(?:victimă|victimei|victimele|victimelor)\b/i,
  /\bconsimțăm(?:ânt|ântul|ântului)\b/i,
  /\b(?:ajutor|îngrijire|tratament)\s+(?:medical|psihologic|psihiatric|profesionist|competent)\b/i,
  /\b(?:diagnostic|criză)\s+(?:spiritual|medical|psihic|neurologic)\b/i,
  /\b(?:epilepsie|boală mintală|boală psihică|criză neurologică)\b/i,
  /\b(?:raportarea|raportează|raportare)\s+(?:răului|abuzului|infracțiun)/i,
  /\b(?:infracțiune|infracțiuni|infracțiunilor)\b/i,
  /\b(?:abuz|abuzul|abuzului|abuzuri|abuziv|abuzivă)\b/i,
  /\b(?:coerciție|coerciția|coerciției)\b/i,
  /\batingerea sexuală\b/i,
  /\bsecret periculos\b/i,
]

function fail(message) {
  console.error(`[NT audited recovery gate] ${message}`)
  process.exit(1)
}
function hash(value) { return crypto.createHash("sha256").update(value).digest("hex") }
function publicStrings(chapter) {
  const strings = [chapter.title, chapter.summary, chapter.literaryContext, chapter.historicalContext, chapter.prayer]
  for (const unit of chapter.units ?? []) {
    strings.push(unit.heading, unit.teaching, unit.forYourHeart)
    for (const word of unit.words ?? []) strings.push(word.meaning)
  }
  return strings.filter((value) => typeof value === "string")
}
function inspectBe(bookId, chapter) {
  const file = path.join(beDir, `${bookId}.${chapter}.json`)
  if (!fs.existsSync(file)) fail(`${bookId}.${chapter}: missing BE`)
  const be = JSON.parse(fs.readFileSync(file, "utf8"))
  if (be.translation !== "BE" || be.status !== "published" || be.public !== true) fail(`${bookId}.${chapter}: BE not published`)
  const main = new Set(be.verses.map((verse) => verse.number))
  const critical = (be.referenceNotes ?? [])
    .filter((note) => Number.isInteger(note?.number) && !main.has(note.number))
    .map((note) => {
      if (note.status !== "not-in-critical-main-text" || note.resolutionStatus !== "resolved") fail(`${bookId}.${chapter}:${note.number}: unresolved critical reference`)
      return note.number
    }).sort((a, b) => a - b)
  return { verseEntryCount: be.verses.length, lastVerseNumber: Math.max(...main, ...critical), criticalReferenceNumbers: critical }
}

if (!fs.existsSync(dir) || !fs.existsSync(manifestPath) || !fs.existsSync(ledgerPath) || !fs.existsSync(registryPath)) fail("audited recovery outputs missing")
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"))
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"))
const sourceIds = new Set(registry.sources.map((source) => source.id))
for (const [key, value] of Object.entries(EXPECTED)) if (manifest.counts?.[key] !== value) fail(`manifest ${key} ${manifest.counts?.[key]}/${value}`)
if (manifest.status !== "in_review" || manifest.publicationReady !== false) fail("manifest must remain in_review and non-public")

const removedCharsByLocation = new Map()
for (const change of ledger.changes ?? []) {
  if (change.kind !== "removed-legacy-editorial-sentence" || typeof change.location !== "string" || typeof change.before !== "string") continue
  removedCharsByLocation.set(change.location, (removedCharsByLocation.get(change.location) ?? 0) + change.before.length)
}

const inputById = new Map()
for (const file of fs.readdirSync(inputDir).filter((name) => name.endsWith(".json"))) {
  const book = JSON.parse(fs.readFileSync(path.join(inputDir, file), "utf8"))
  if (book.recoveryClass === "recovered-needs-source-audit") inputById.set(book.id, book)
}

const files = fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort()
if (files.length !== EXPECTED.books) fail(`files ${files.length}/${EXPECTED.books}`)
let chapters = 0
let units = 0
let recoveredTeachingChars = 0
let auditedTeachingChars = 0
let ledgerVerifiedLargeRemovals = 0

for (const file of files) {
  const raw = fs.readFileSync(path.join(dir, file), "utf8")
  const book = JSON.parse(raw)
  const originalBook = inputById.get(book.id)
  if (!originalBook) fail(`${file}: original recovered book missing`)
  const manifestBook = manifest.books.find((entry) => entry.id === book.id)
  if (!manifestBook || manifestBook.sha256 !== hash(raw)) fail(`${file}: manifest/digest mismatch`)
  if (book.schema !== "emanus-nt-audited-recovered-v1" || book.status !== "in_review" || book.publicationReady !== false) fail(`${file}: book policy invalid`)
  if (book.chapters.length !== originalBook.chapters.length) fail(`${file}: chapter count changed`)

  for (let i = 0; i < book.chapters.length; i += 1) {
    const chapter = book.chapters[i]
    const original = originalBook.chapters[i]
    chapters += 1
    if (chapter.number !== i + 1 || chapter.status !== "in_review" || chapter.reviewState !== "source-first-audited-recovery") fail(`${file} ${i + 1}: chapter state invalid`)
    if (chapter.provenance?.sourcePolicy !== "poonen-source-first" || chapter.provenance?.legacyGenericContentUsed !== false || chapter.provenance?.editorialSafetyLayerRetained !== false) fail(`${file} ${i + 1}: provenance policy invalid`)
    if (!Array.isArray(chapter.provenance?.sourceIds) || chapter.provenance.sourceIds.length !== 1 || !sourceIds.has(chapter.provenance.sourceIds[0])) fail(`${file} ${i + 1}: source provenance invalid`)

    const canonical = inspectBe(book.bookId, chapter.number)
    const binding = chapter.emanusTextBinding
    if (!binding || binding.translation !== "BE" || binding.bookId !== book.bookId || binding.chapter !== chapter.number) fail(`${file} ${chapter.number}: BE binding invalid`)
    if (binding.verseEntryCount !== canonical.verseEntryCount || binding.lastVerseNumber !== canonical.lastVerseNumber || JSON.stringify(binding.criticalReferenceNumbers ?? []) !== JSON.stringify(canonical.criticalReferenceNumbers)) fail(`${file} ${chapter.number}: BE binding changed`)

    if (!Array.isArray(chapter.units) || chapter.units.length !== original.units.length) fail(`${file} ${chapter.number}: unit count changed`)
    let expectedNext = 1
    for (let j = 0; j < chapter.units.length; j += 1) {
      const unit = chapter.units[j]
      const originalUnit = original.units[j]
      units += 1
      if (unit.verseStart !== originalUnit.verseStart || unit.verseEnd !== originalUnit.verseEnd || unit.ref !== originalUnit.ref) fail(`${file} ${chapter.number}: unit range/ref changed`)
      if (unit.verseStart !== expectedNext) fail(`${file} ${chapter.number}: coverage gap at ${expectedNext}`)
      expectedNext = unit.verseEnd + 1
      if (unit.sourceKind !== "poonen-source-first-recovered" || JSON.stringify(unit.sourceIds) !== JSON.stringify(chapter.provenance.sourceIds)) fail(`${file} ${chapter.number}: unit source provenance invalid`)
      if (typeof unit.teaching !== "string" || unit.teaching.trim().length < 80) fail(`${file} ${chapter.number}: teaching too thin at ${unit.ref}`)

      const originalChars = originalUnit.teaching?.length ?? 0
      const auditedChars = unit.teaching.length
      recoveredTeachingChars += originalChars
      auditedTeachingChars += auditedChars
      if (originalChars >= 180 && auditedChars / originalChars < 0.45) {
        const location = `${book.id}.${chapter.number}.units[${j}].teaching`
        const removedChars = removedCharsByLocation.get(location) ?? 0
        const deletedChars = originalChars - auditedChars
        const deletionIsLedgerProven = auditedChars >= 180 && removedChars >= deletedChars * 0.85
        if (!deletionIsLedgerProven) {
          fail(`${file} ${chapter.number}: too much unproven teaching removed at ${unit.ref} (${auditedChars}/${originalChars}; ledger ${removedChars})`)
        }
        ledgerVerifiedLargeRemovals += 1
      }
    }
    if (expectedNext !== canonical.lastVerseNumber + 1) fail(`${file} ${chapter.number}: coverage incomplete`)

    for (const text of publicStrings(chapter)) {
      for (const pattern of PUBLIC_FORBIDDEN) if (pattern.test(text)) fail(`${file} ${chapter.number}: forbidden public copy ${pattern}`)
    }
    const stack = [chapter]
    while (stack.length) {
      const current = stack.pop()
      if (!current || typeof current !== "object") continue
      if (Object.prototype.hasOwnProperty.call(current, "text")) fail(`${file} ${chapter.number}: legacy Bible text copied`)
      for (const value of Object.values(current)) if (value && typeof value === "object") stack.push(value)
    }
  }
}

if (chapters !== EXPECTED.chapters || units !== EXPECTED.units) fail(`totals ${chapters}/${EXPECTED.chapters} chapters, ${units}/${EXPECTED.units} units`)
const retention = auditedTeachingChars / recoveredTeachingChars
if (retention < 0.80) fail(`global teaching retention too low: ${(retention * 100).toFixed(2)}%`)
console.log(`NT audited recovery gate OK: ${files.length} books / ${chapters} chapters / ${units} units.`)
console.log(`Teaching retained after removal of source labels and legacy editorial safety copy: ${(retention * 100).toFixed(2)}%.`)
console.log(`Large removals accepted only with ledger proof: ${ledgerVerifiedLargeRemovals}.`)
console.log("No modern source names, RCCV text, generic completion, or flagged legacy safety boilerplate remains in public explanation copy.")
