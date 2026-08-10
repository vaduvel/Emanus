#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first-manifest.json")
const bindingPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-canonical-binding.json")
const sourceEvidencePath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-evidence.json")
const editorialRawPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-subtle-editorial-refined-findings.json")
const editorialDecisionsPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-subtle-editorial-decisions.json")
const editorialTraceabilityPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-editorial-traceability-audit.json")
const thinAuditPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-thin-unit-audit.json")
const quoteAuditPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-embedded-quote-audit.json")
const languageAuditPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-romanian-language-audit.json")
const lexiconAuditPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-lexicon-audit.json")
const blockerReportPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-publication-blockers.json")

function fail(message) { console.error(`[NT publication readiness] ${message}`); process.exit(1) }
function readJson(file, label) { if (!fs.existsSync(file)) return { missing: true, label }; return JSON.parse(fs.readFileSync(file, "utf8")) }
function pushBlocker(blockers, id, count, message, details = {}) { if (!count) return; blockers.push({ id, count, message, ...details }) }

if (!fs.existsSync(corpusDir) || !fs.existsSync(manifestPath)) fail("final NT corpus/manifest missing")
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
const binding = readJson(bindingPath, "canonical binding")
const sourceEvidence = readJson(sourceEvidencePath, "source evidence")
const editorialRaw = readJson(editorialRawPath, "editorial raw audit")
const editorialDecisions = readJson(editorialDecisionsPath, "editorial decisions")
const editorialTraceability = readJson(editorialTraceabilityPath, "editorial traceability audit")
const thinAudit = readJson(thinAuditPath, "thin-unit audit")
const quoteAudit = readJson(quoteAuditPath, "embedded quote audit")
const languageAudit = readJson(languageAuditPath, "Romanian language audit")
const lexiconAudit = readJson(lexiconAuditPath, "lexicon audit")

const bindingByChapter = new Map((binding.chapters ?? []).map((entry) => [`${entry.bookId}.${entry.chapter}`, entry]))
const evidenceById = new Map((sourceEvidence.records ?? []).map((entry) => [entry.id, entry]))
const wholeChapterSummaries = []
const empty = []
const missingAnchors = []
const invalidAnchors = []
let units = 0

for (const file of fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()) {
  const book = JSON.parse(fs.readFileSync(path.join(corpusDir, file), "utf8"))
  for (const chapter of book.chapters ?? []) {
    const bound = bindingByChapter.get(`${book.bookId}.${chapter.number}`)
    for (const unit of chapter.units ?? []) {
      units += 1
      if (typeof unit.heading !== "string" || !unit.heading.trim()) empty.push({ bookId: book.id, chapter: chapter.number, ref: unit.ref })
      const anchors = Array.isArray(unit.sourceAnchors) ? unit.sourceAnchors : []
      if (!anchors.length) {
        missingAnchors.push({ bookId: book.id, chapter: chapter.number, ref: unit.ref })
      } else {
        for (const anchor of anchors) {
          const formatValid = typeof anchor?.sourceId === "string" && anchor.sourceId && typeof anchor?.locator === "string" && anchor.locator && typeof anchor?.evidenceId === "string" && anchor.evidenceId && typeof anchor?.evidenceSha256 === "string" && /^sha256:[0-9a-f]{64}$/i.test(anchor.evidenceSha256)
          if (!formatValid) {
            invalidAnchors.push({ bookId: book.id, chapter: chapter.number, ref: unit.ref, evidenceId: anchor?.evidenceId ?? null, reason: "invalid-anchor-format" })
            continue
          }
          const evidence = evidenceById.get(anchor.evidenceId)
          if (!evidence) {
            invalidAnchors.push({ bookId: book.id, chapter: chapter.number, ref: unit.ref, evidenceId: anchor.evidenceId, reason: "evidence-record-missing" })
            continue
          }
          if (evidence.sourceId !== anchor.sourceId || evidence.locator !== anchor.locator || evidence.evidenceSha256 !== anchor.evidenceSha256) invalidAnchors.push({ bookId: book.id, chapter: chapter.number, ref: unit.ref, evidenceId: anchor.evidenceId, reason: "anchor-evidence-mismatch" })
        }
      }
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
if (sourceEvidence.missing) pushBlocker(blockers, "source-evidence-missing", 1, "Source evidence registry is missing.")

let editorialClassificationUnresolved = null
if (editorialRaw.missing) {
  pushBlocker(blockers, "editorial-audit-missing", 1, "Editorial raw audit is missing.")
} else if (editorialDecisions.missing) {
  editorialClassificationUnresolved = Number(editorialRaw.count ?? 1)
  pushBlocker(blockers, "editorial-decisions-missing", editorialClassificationUnresolved, "Editorial candidates exist but the reviewed decisions ledger is missing.")
} else {
  const raw = Number(editorialRaw.count ?? -1)
  const decisions = Array.isArray(editorialDecisions.decisions) ? editorialDecisions.decisions : []
  const unique = Number(editorialDecisions.uniqueCandidateSentences ?? -1)
  const actions = editorialDecisions.actionCounts ?? {}
  const decided = Object.values(actions).reduce((sum, value) => sum + Number(value ?? 0), 0)
  const validActions = decisions.every((item) => ["keep-reviewed", "remove-modern-editorial", "rewrite-reviewed"].includes(item.action) && typeof item.rationale === "string" && item.rationale.trim())
  if (editorialDecisions.rawFindings !== raw || unique !== decisions.length || decided !== decisions.length || !validActions) {
    editorialClassificationUnresolved = raw >= 0 ? raw : 1
    pushBlocker(blockers, "editorial-decisions-incomplete", editorialClassificationUnresolved, "Editorial decisions do not completely and validly cover the raw findings ledger.", { rawFindings: raw, uniqueCandidateSentences: unique, decisions: decisions.length, decided })
  } else editorialClassificationUnresolved = 0
}

let editorialSourceTraceabilityPending = null
if (editorialTraceability.missing) {
  pushBlocker(blockers, "editorial-traceability-audit-missing", 1, "Final editorial source-context traceability audit is missing.")
} else {
  editorialSourceTraceabilityPending = Number(editorialTraceability.counts?.pending ?? 0)
  pushBlocker(blockers, "editorial-source-traceability-pending", editorialSourceTraceabilityPending, `${editorialSourceTraceabilityPending} retained or rewritten editorial decisions lack reproducible final source context.`, { status: editorialTraceability.status ?? null, examples: (editorialTraceability.findings ?? []).filter((item) => item.traceabilityState === "pending-source-context" || item.traceabilityState === "missing-final-chapter-context").slice(0, 20) })
}

pushBlocker(blockers, "whole-chapter-summary-units", wholeChapterSummaries.length, `${wholeChapterSummaries.length} rebuilt chapters are still one whole-chapter unit.`, { examples: wholeChapterSummaries.slice(0, 20) })
if (thinAudit.missing) {
  pushBlocker(blockers, "thin-unit-audit-missing", 1, "Editorial sufficiency audit is missing.")
} else if (thinAudit.status !== "clean") {
  const thinCount = Number(thinAudit.count ?? thinAudit.findings?.length ?? 1)
  pushBlocker(blockers, "thin-explanation-units", thinCount, `${thinCount} explanation units fail the editorial sufficiency gate.`, { policy: thinAudit.policy ?? null, thresholds: thinAudit.thresholds ?? null, examples: (thinAudit.findings ?? []).slice(0, 20) })
}
pushBlocker(blockers, "empty-unit-headings", empty.length, `${empty.length} explanation units have empty headings.`, { examples: empty.slice(0, 20) })
pushBlocker(blockers, "missing-source-anchors", missingAnchors.length, `${missingAnchors.length}/${units} units lack sourceAnchors.`, { examples: missingAnchors.slice(0, 20) })
pushBlocker(blockers, "invalid-source-anchors", invalidAnchors.length, `${invalidAnchors.length} source anchors do not match the evidence registry.`, { examples: invalidAnchors.slice(0, 20) })

for (const [audit, label, id] of [[quoteAudit, "embedded quote", "embedded-quote-audit"], [languageAudit, "Romanian language", "romanian-language-audit"], [lexiconAudit, "lexicon", "lexicon-audit"]]) {
  if (audit.missing) pushBlocker(blockers, `${id}-missing`, 1, `${label} audit is missing.`)
  else if (audit.status !== "clean") pushBlocker(blockers, id, Number(audit.count ?? audit.findings?.length ?? 1), `${label} audit is ${audit.status ?? "unresolved"}.`, { status: audit.status })
}

const report = {
  schema: "emanus-nt-publication-blockers-v3",
  status: blockers.length ? "blocked" : "clear",
  manifestStatus: manifest.status,
  manifestPublicationReady: manifest.publicationReady,
  counts: {
    blockerClasses: blockers.length,
    books: manifest.counts?.books ?? null,
    chapters: manifest.counts?.chapters ?? null,
    units,
    wholeChapterSummaryUnits: wholeChapterSummaries.length,
    thinUnits: thinAudit.missing ? null : Number(thinAudit.count ?? null),
    conciseUnitsAccepted: thinAudit.missing ? null : Number(thinAudit.conciseAccepted ?? 0),
    emptyHeadings: empty.length,
    missingSourceAnchors: missingAnchors.length,
    invalidSourceAnchors: invalidAnchors.length,
    rawEditorialFindings: editorialRaw.count ?? null,
    editorialClassificationUnresolved,
    editorialSourceTraceabilityPending,
    embeddedQuoteFindings: quoteAudit.count ?? null,
    romanianLanguageFindings: languageAudit.count ?? null,
    lexiconFindings: lexiconAudit.count ?? null,
  },
  blockers,
}
fs.writeFileSync(blockerReportPath, JSON.stringify(report, null, 2) + "\n", "utf8")

const requestedReady = manifest.publicationReady === true || manifest.status === "published"
if (requestedReady && blockers.length) fail(`manifest requests publication but ${blockers.length} blocker classes remain; see nt-publication-blockers.json`)
if (!requestedReady && manifest.status !== "in_review") fail(`non-ready corpus must be status=in_review, got ${manifest.status}`)
if (blockers.length) {
  console.log(`NT PUBLICATION BLOCKED (${blockers.length} blocker classes). See ${path.relative(ROOT, blockerReportPath)}.`)
  for (const blocker of blockers) console.log(`- ${blocker.id}: ${blocker.message}`)
  process.exit(0)
}
if (!requestedReady) fail("all blockers cleared but manifest was not explicitly promoted")
console.log("NT PUBLICATION READY: all editorial, canonical-text, source-traceability, language, quote and lexicon gates are clean.")
