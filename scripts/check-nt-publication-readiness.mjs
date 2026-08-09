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

if (!fs.existsSync(corpusDir) || !fs.existsSync(manifestPath)) fail("final NT corpus/manifest missing")
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
const binding = readJson(bindingPath, "canonical binding")
const editorial = readJson(editorialPath, "editorial audit")
const quoteAudit = readJson(quoteAuditPath, "embedded quote audit")
const languageAudit = readJson(languageAuditPath, "Romanian language audit")
const lexiconAudit = readJson(lexiconAuditPath, "lexicon audit")

const bindingByChapter = new Map((binding.chapters ?? []).map((entry) => [`${entry.bookId}.${entry.chapter}`, entry]))
let wholeChapterSummaryUnits = 0
let thinUnits = 0
let emptyHeadings = 0
let unitsMissingSourceAnchors = 0
let units = 0

for (const file of fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()) {
  const book = JSON.parse(fs.readFileSync(path.join(corpusDir, file), "utf8"))
  for (const chapter of book.chapters ?? []) {
    const bound = bindingByChapter.get(`${book.bookId}.${chapter.number}`)
    for (const unit of chapter.units ?? []) {
      units += 1
      if (wordCount(unit.teaching) < 45) thinUnits += 1
      if (typeof unit.heading !== "string" || !unit.heading.trim()) emptyHeadings += 1
      const anchors = Array.isArray(unit.sourceAnchors) ? unit.sourceAnchors : []
      if (!anchors.length || anchors.some((anchor) =>
        typeof anchor?.sourceId !== "string" || !anchor.sourceId ||
        typeof anchor?.locator !== "string" || !anchor.locator ||
        typeof anchor?.evidenceSha256 !== "string" || !/^sha256:[0-9a-f]{64}$/i.test(anchor.evidenceSha256)
      )) unitsMissingSourceAnchors += 1
    }
    if (book.sourceClass === "rebuilt-poonen-source-first" && chapter.units?.length === 1 && bound) {
      const unit = chapter.units[0]
      if (unit.verseStart === 1 && unit.verseEnd === bound.lastVerseNumber) wholeChapterSummaryUnits += 1
    }
  }
}

const blockers = []
if (binding.missing) blockers.push("canonical binding missing")
else if (binding.releaseState !== "final" || binding.publicationReady !== true) blockers.push(`canonical text is ${binding.releaseState ?? "unknown"}, not final`)

if (editorial.missing) blockers.push("editorial audit missing")
else if (editorial.status !== "resolved" || Number(editorial.count ?? 0) !== 0) blockers.push(`${editorial.count ?? "?"} unresolved editorial findings`)

if (wholeChapterSummaryUnits) blockers.push(`${wholeChapterSummaryUnits} rebuilt chapters are still one whole-chapter unit`)
if (thinUnits) blockers.push(`${thinUnits} explanation units are under 45 words`)
if (emptyHeadings) blockers.push(`${emptyHeadings} explanation units have empty headings`)
if (unitsMissingSourceAnchors) blockers.push(`${unitsMissingSourceAnchors}/${units} units lack reproducible sourceAnchors`)

for (const [audit, label] of [[quoteAudit, "embedded quote"], [languageAudit, "Romanian language"], [lexiconAudit, "lexicon"]]) {
  if (audit.missing) blockers.push(`${label} audit missing`)
  else if (audit.status !== "clean") blockers.push(`${label} audit is ${audit.status ?? "unresolved"} (${audit.count ?? audit.findings?.length ?? "?"})`)
}

const requestedReady = manifest.publicationReady === true || manifest.status === "published"
if (requestedReady && blockers.length) {
  fail(`manifest requests publication but blockers remain:\n- ${blockers.join("\n- ")}`)
}
if (!requestedReady && manifest.status !== "in_review") fail(`non-ready corpus must be status=in_review, got ${manifest.status}`)

if (blockers.length) {
  console.log(`NT PUBLICATION BLOCKED (${blockers.length} blocker classes):`)
  for (const blocker of blockers) console.log(`- ${blocker}`)
  console.log("This is expected while the manifest remains in_review/publicationReady=false.")
  process.exit(0)
}

if (!requestedReady) fail("all blockers cleared but manifest was not explicitly promoted")
console.log("NT PUBLICATION READY: all editorial, canonical-text, source-traceability, language, quote and lexicon gates are clean.")
