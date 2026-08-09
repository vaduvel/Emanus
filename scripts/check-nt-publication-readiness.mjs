#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first-manifest.json")
const bindingPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-canonical-binding.json")
const editorialPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-subtle-editorial-refined-findings.json")
const quoteAuditPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-embedded-quote-audit.json")
const languageAuditPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-romanian-language-audit.json")
const lexiconAuditPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-lexicon-audit.json")
const blockerReportPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-publication-blockers.json")

function fail(message) {
  console.error(`[NT publication readiness] ${message}`)
  process.exit(1)
}
function readJson(file, label) {
  if (!fs.existsSync(file)) return { missing: true, label }
  return JSON.parse(fs.readFileSync(file, "utf8"))
}
function wordCount(value) {
  return String(value ?? "").trim().split(/\s+/u).filter(Boolean).length
}
function pushBlocker(blockers, id, count, message, details = {}) {
  if (!count) return
  blockers.push({ id, count, message, ...details })
}

if (!fs.existsSync(corpusDir) || !fs.existsSync(manifestPath)) fail("final NT corpus/manifest missing")
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
const binding = readJson(bindingPath, "canonical binding")
const editorial = readJson(editorialPath, "editorial audit")
const quoteAudit = readJson(quoteAuditPath, "embedded quote audit")
const languageAudit = readJson(languageAuditPath, "Romanian language audit")
const lexiconAudit = readJson(lexiconAuditPath, "lexicon audit")

const bindingByChapter = new Map((binding.chapters ?? []).map((entry) => [`${entry.bookId}.${entry.chapter}`, entry]))
const wholeChapterSummaries = []
const thin = []
const empty = []
const missingAnchors = []
let units = 0

for (const file of fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()) {
  const book = JSON.parse(fs.readFileSync(path.join(corpusDir, file), "utf8"))
  for (const chapter of book.chapters ?? []) {
    const bound = bindingByChapter.get(`${book.bookId}.${chapter.number}`)
    for (const unit of chapter.units ?? []) {
      units += 1
      const words = wordCount(unit.teaching)
      if (words < 45) thin.push({ bookId: book.id, chapter: chapter.number, ref: unit.ref, words })
      if (typeof unit.heading !== "string" || !unit.heading.trim()) empty.push({ bookId: book.id, chapter: chapter.number, ref: unit.ref })
      const anchors = Array.isArray(unit.sourceAnchors) ? unit.sourceAnchors : []
      if (!anchors.length || anchors.some((anchor) =>
        typeof anchor?.sourceId !== "string" || !anchor.sourceId ||
        typeof anchor?.locator !== "string" || !anchor.locator ||
        typeof anchor?.evidenceSha256 !== "string" || !/^sha256:[0-9a-f]{64}$/i.test(anchor.evidenceSha256)
      )) missingAnchors.push({ bookId: book.id, chapter: chapter.number, ref: unit.ref })
    }
    if (book.sourceClass === "rebuilt-poonen-source-first" && chapter.units?.length === 1 && bound) {
      const unit = chapter.units[0]
      if (unit.verseStart === 1 && unit.verseEnd === bound.lastVerseNumber) wholeChapterSummaries.push({ bookId: book.id, chapter: chapter.number, ref: unit.ref })
    }
  }
}

const blockers = []
if (binding.missing) pushBlocker(blockers, "canonical-binding-missing", 1, "Canonical binding is missing.")
else if (binding.releaseState !== "final" || binding.publicationReady !== true) pushBlocker(blockers, "canonical-text-not-final", 1, `Canonical text is ${binding.releaseState ?? "unknown"}, not final.`, { canonicalTextVersion: binding.canonicalTextVersion ?? null, corpusSha256: binding.corpusSha256 ?? null })

if (editorial.missing) pushBlocker(blockers, "editorial-audit-missing", 1, "Editorial audit is missing.")
else if (editorial.status !== "resolved" || Number(editorial.count ?? 0) !== 0) pushBlocker(blockers, "unresolved-editorial-findings", Number(editorial.count ?? 1), `${editorial.count ?? "?"} editorial findings remain unresolved.`, { status: editorial.status })

pushBlocker(blockers, "whole-chapter-summary-units", wholeChapterSummaries.length, `${wholeChapterSummaries.length} rebuilt chapters are still one whole-chapter unit.`, { examples: wholeChapterSummaries.slice(0, 20) })
pushBlocker(blockers, "thin-explanation-units", thin.length, `${thin.length} explanation units are under 45 words.`, { examples: thin.slice(0, 20) })
pushBlocker(blockers, "empty-unit-headings", empty.length, `${empty.length} explanation units have empty headings.`, { examples: empty.slice(0, 20) })
pushBlocker(blockers, "missing-source-anchors", missingAnchors.length, `${missingAnchors.length}/${units} units lack reproducible sourceAnchors.`, { examples: missingAnchors.slice(0, 20) })

for (const [audit, label, id] of [[quoteAudit, "embedded quote", "embedded-quote-audit"], [languageAudit, "Romanian language", "romanian-language-audit"], [lexiconAudit, "lexicon", "lexicon-audit"]]) {
  if (audit.missing) pushBlocker(blockers, `${id}-missing`, 1, `${label} audit is missing.`)
  else if (audit.status !== "clean") pushBlocker(blockers, id, Number(audit.count ?? audit.findings?.length ?? 1), `${label} audit is ${audit.status ?? "unresolved"}.`, { status: audit.status })
}

const report = {
  schema: "emanus-nt-publication-blockers-v1",
  status: blockers.length ? "blocked" : "clear",
  manifestStatus: manifest.status,
  manifestPublicationReady: manifest.publicationReady,
  counts: {
    blockerClasses: blockers.length,
    books: manifest.counts?.books ?? null,
    chapters: manifest.counts?.chapters ?? null,
    units,
    wholeChapterSummaryUnits: wholeChapterSummaries.length,
    thinUnits: thin.length,
    emptyHeadings: empty.length,
    missingSourceAnchors: missingAnchors.length,
    unresolvedEditorialFindings: editorial.count ?? null,
    embeddedQuoteFindings: quoteAudit.count ?? null,
    romanianLanguageFindings: languageAudit.count ?? null,
    lexiconFindings: lexiconAudit.count ?? null,
  },
  blockers,
}
fs.writeFileSync(blockerReportPath, JSON.stringify(report, null, 2) + "\n", "utf8")

const requestedReady = manifest.publicationReady === true || manifest.status === "published"
if (requestedReady && blockers.length) {
  fail(`manifest requests publication but ${blockers.length} blocker classes remain; see nt-publication-blockers.json`)
}
if (!requestedReady && manifest.status !== "in_review") fail(`non-ready corpus must be status=in_review, got ${manifest.status}`)

if (blockers.length) {
  console.log(`NT PUBLICATION BLOCKED (${blockers.length} blocker classes). See ${path.relative(ROOT, blockerReportPath)}.`)
  for (const blocker of blockers) console.log(`- ${blocker.id}: ${blocker.message}`)
  process.exit(0)
}

if (!requestedReady) fail("all blockers cleared but manifest was not explicitly promoted")
console.log("NT PUBLICATION READY: all editorial, canonical-text, source-traceability, language, quote and lexicon gates are clean.")
