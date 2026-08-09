#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const refinedDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-audited-recovered-refined")
const reviewedDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered-manifest.json")
const decisionsPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-subtle-editorial-decisions.json")
const beDir = path.join(ROOT, "docs", "data", "biblia-emanus")
const EXPECTED = { books: 15, chapters: 191, units: 762, rawFindings: 96 }

const RULES = [
  ["authority-boundary", /\b(?:niciun|nicio|nu)\b[^.!?]{0,120}\b(?:lider|conducator|slujitor|prezbiter|pastor|autoritate)\b[^.!?]{0,160}\b(?:dreptul|control|controleze|constrang|domina|manipul)/i],
  ["not-authorize", /\bnu\b[^.!?]{0,100}\b(?:autorizeaza|justifica|legitimeaza|permite)\b/i],
  ["not-mean-modern", /\bnu inseamna\b[^.!?]{0,180}\b(?:control|supunere oarba|tacere|izolare|acceptarea|tolerarea|renuntarea)/i],
  ["modern-help", /\b(?:cere ajutor|ajutor sigur|ajutor competent|specialist|consilier|terapeut|autoritatile|autoritatilor|politie|juridic|legal)\b/i],
  ["modern-boundaries", /\b(?:limite sanatoase|limite personale|granite personale|spatiu sigur|siguranta personala)\b/i],
  ["financial-control", /\b(?:controleze|controlul)\b[^.!?]{0,120}\b(?:banii|finantele|relatiile|constiinta)/i],
  ["anti-shame", /\b(?:rusinare|umilire|degradare|intimidare)\b/i],
]

const GLOBAL_FORBIDDEN = [
  /\b(?:Zac\s+Poonen|Poonen|CFC|Christian Fellowship|SermonIndex|Allen Nolan|Robert Breaker|Mohler)\b/i,
  /\bRCCV\b/i,
  /\b(?:o posibilă lectură|o interpretare posibilă|poate fi interpretat|creștinii interpretează diferit|există mai multe interpretări|nu impunem această interpretare)\b/i,
  /O citire verset cu verset nu urmărește doar acumularea de informații/i,
  /Sensul fiecărei afirmații trebuie păstrat în curgerea capitolului/i,
  /Aplicația rămâne sub caracterul lui Isus/i,
]

function fail(message) { console.error(`[NT reviewed recovery gate] ${message}`); process.exit(1) }
function hash(value) { return crypto.createHash("sha256").update(value).digest("hex") }
function norm(value) { return String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() }
function sentences(value) { return String(value ?? "").split(/(?<=[.!?])\s+/u).map((s) => s.trim()).filter(Boolean) }
function publicFields(chapter) {
  return [
    ["summary", chapter.summary], ["literaryContext", chapter.literaryContext], ["historicalContext", chapter.historicalContext], ["prayer", chapter.prayer],
    ...(chapter.units ?? []).flatMap((unit, index) => [
      [`units[${index}].heading`, unit.heading], [`units[${index}].teaching`, unit.teaching], [`units[${index}].forYourHeart`, unit.forYourHeart],
      ...((unit.words ?? []).map((word, wi) => [`units[${index}].words[${wi}].meaning`, word.meaning])),
    ]),
  ].filter(([, value]) => typeof value === "string")
}
function inspectBe(bookId, chapter) {
  const file = path.join(beDir, `${bookId}.${chapter}.json`)
  if (!fs.existsSync(file)) fail(`${bookId}.${chapter}: BE missing`)
  const be = JSON.parse(fs.readFileSync(file, "utf8"))
  if (be.translation !== "BE" || be.status !== "published" || be.public !== true) fail(`${bookId}.${chapter}: BE not published/public`)
  const main = new Set(be.verses.map((verse) => verse.number))
  const critical = (be.referenceNotes ?? []).filter((note) => Number.isInteger(note?.number) && !main.has(note.number)).map((note) => {
    if (note.status !== "not-in-critical-main-text" || note.resolutionStatus !== "resolved") fail(`${bookId}.${chapter}:${note.number}: unresolved critical slot`)
    return note.number
  }).sort((a, b) => a - b)
  return { verseEntryCount: be.verses.length, lastVerseNumber: Math.max(...main, ...critical), criticalReferenceNumbers: critical }
}
function decisionKey(item) { return `${item.bookId}\u0000${item.chapter}\u0000${item.field}\u0000${item.sentence}` }

if (![refinedDir, reviewedDir, manifestPath, decisionsPath].every(fs.existsSync)) fail("reviewed/refined outputs missing")
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
const decisionsFile = JSON.parse(fs.readFileSync(decisionsPath, "utf8"))
if (manifest.status !== "in_review" || manifest.publicationReady !== false) fail("reviewed corpus must remain in_review")
for (const key of ["books", "chapters", "units", "rawFindings"]) if (manifest.counts?.[key] !== EXPECTED[key]) fail(`manifest ${key} ${manifest.counts?.[key]}/${EXPECTED[key]}`)
if (decisionsFile.rawFindings !== EXPECTED.rawFindings || !Array.isArray(decisionsFile.decisions)) fail("decision ledger does not cover reviewed report")
const decisions = new Map(decisionsFile.decisions.map((item) => [decisionKey(item), item]))
const keepDecisions = new Set(decisionsFile.decisions.filter((item) => item.action === "keep-reviewed").map(decisionKey))

const refinedById = new Map()
for (const file of fs.readdirSync(refinedDir).filter((name) => name.endsWith(".json"))) {
  const book = JSON.parse(fs.readFileSync(path.join(refinedDir, file), "utf8")); refinedById.set(book.id, book)
}
const files = fs.readdirSync(reviewedDir).filter((name) => name.endsWith(".json")).sort()
if (files.length !== EXPECTED.books) fail(`files ${files.length}/${EXPECTED.books}`)

let chapters = 0
let units = 0
let beforeTeachingChars = 0
let afterTeachingChars = 0
const residual = []
for (const file of files) {
  const raw = fs.readFileSync(path.join(reviewedDir, file), "utf8")
  const book = JSON.parse(raw)
  const beforeBook = refinedById.get(book.id)
  if (!beforeBook) fail(`${book.id}: refined input missing`)
  const manifestBook = manifest.books.find((entry) => entry.id === book.id)
  if (!manifestBook || manifestBook.sha256 !== hash(raw)) fail(`${book.id}: manifest/digest mismatch`)
  if (book.schema !== "emanus-nt-reviewed-recovered-v1") fail(`${book.id}: schema invalid`)
  if (book.chapters.length !== beforeBook.chapters.length) fail(`${book.id}: chapter count changed`)

  for (let ci = 0; ci < book.chapters.length; ci += 1) {
    const chapter = book.chapters[ci]
    const beforeChapter = beforeBook.chapters[ci]
    chapters += 1
    if (chapter.reviewState !== "source-first-manually-resolved-recovery" || chapter.provenance?.subtleEditorialReviewResolved !== true) fail(`${book.id} ${chapter.number}: manual review state missing`)
    if (chapter.units.length !== beforeChapter.units.length) fail(`${book.id} ${chapter.number}: unit count changed`)
    const canonical = inspectBe(book.bookId, chapter.number)
    const binding = chapter.emanusTextBinding
    if (!binding || binding.translation !== "BE" || binding.bookId !== book.bookId || binding.chapter !== chapter.number) fail(`${book.id} ${chapter.number}: BE binding invalid`)
    if (binding.verseEntryCount !== canonical.verseEntryCount || binding.lastVerseNumber !== canonical.lastVerseNumber || JSON.stringify(binding.criticalReferenceNumbers ?? []) !== JSON.stringify(canonical.criticalReferenceNumbers)) fail(`${book.id} ${chapter.number}: BE binding mismatch`)

    for (let ui = 0; ui < chapter.units.length; ui += 1) {
      const unit = chapter.units[ui]
      const beforeUnit = beforeChapter.units[ui]
      units += 1
      if (unit.ref !== beforeUnit.ref || unit.verseStart !== beforeUnit.verseStart || unit.verseEnd !== beforeUnit.verseEnd || JSON.stringify(unit.criticalReferenceNumbers ?? []) !== JSON.stringify(beforeUnit.criticalReferenceNumbers ?? [])) fail(`${book.id} ${chapter.number}: unit structure changed ${unit.ref}`)
      if (typeof unit.teaching !== "string" || unit.teaching.trim().length < 80) fail(`${book.id} ${chapter.number}: teaching too thin ${unit.ref}`)
      beforeTeachingChars += beforeUnit.teaching.length
      afterTeachingChars += unit.teaching.length
    }

    for (const [field, value] of publicFields(chapter)) {
      for (const pattern of GLOBAL_FORBIDDEN) if (pattern.test(value)) fail(`${book.id} ${chapter.number}: forbidden public pattern ${pattern}`)
      for (const sentence of sentences(value)) {
        const normalized = norm(sentence)
        for (const [rule, pattern] of RULES) {
          if (!pattern.test(normalized)) continue
          residual.push({ bookId: book.id, chapter: chapter.number, field, rule, sentence })
        }
      }
    }
  }
}
if (chapters !== EXPECTED.chapters || units !== EXPECTED.units) fail(`totals ${chapters}/${EXPECTED.chapters} chapters, ${units}/${EXPECTED.units} units`)

// Every residual signal must be one that was manually reviewed and explicitly kept.
for (const finding of residual) {
  const key = decisionKey(finding)
  if (!keepDecisions.has(key)) fail(`unreviewed residual: ${finding.bookId} ${finding.chapter} ${finding.field} ${finding.rule}: ${finding.sentence}`)
}
// Every keep decision should still correspond to at least one residual rule hit; otherwise the audit/decision model drifted.
const residualKeys = new Set(residual.map(decisionKey))
for (const key of keepDecisions) if (!residualKeys.has(key)) fail(`keep-reviewed decision no longer maps to residual candidate: ${key}`)

// Removed/rewritten reviewed sentences must be absent verbatim.
const allPublicText = files.map((file) => fs.readFileSync(path.join(reviewedDir, file), "utf8")).join("\n")
for (const item of decisionsFile.decisions) {
  if (item.action === "keep-reviewed") continue
  if (allPublicText.includes(item.sentence)) fail(`reviewed ${item.action} sentence still present: ${item.bookId} ${item.chapter} ${item.sentence}`)
}

const retention = afterTeachingChars / beforeTeachingChars
if (retention < 0.80) fail(`manual-resolution teaching retention too low ${(retention * 100).toFixed(2)}%`)
console.log(`NT reviewed recovery gate OK: ${files.length} books / ${chapters} chapters / ${units} units.`)
console.log(`Manual candidate resolution: ${decisionsFile.rawFindings} raw findings; residual rule hits=${residual.length}, all explicitly keep-reviewed.`)
console.log(`Teaching retention from refined layer: ${(retention * 100).toFixed(2)}%.`)
