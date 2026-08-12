#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const decisionsPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-subtle-editorial-decisions.json")
const outputPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-editorial-traceability-audit.json")

function fail(message) { console.error(`[NT editorial traceability] ${message}`); process.exit(1) }
function unitIndexFromField(field) {
  const match = String(field ?? "").match(/^units\[(\d+)\]/u)
  return match ? Number(match[1]) : null
}
function uniqueAnchors(anchors) {
  const map = new Map()
  for (const anchor of anchors ?? []) {
    if (!anchor?.evidenceId || !anchor?.sourceId || !anchor?.locator) continue
    const key = `${anchor.evidenceId}\u0000${anchor.sourceId}\u0000${anchor.locator}`
    if (!map.has(key)) map.set(key, anchor)
  }
  return [...map.values()]
}

if (!fs.existsSync(corpusDir) || !fs.existsSync(decisionsPath)) fail("final corpus or decisions ledger missing")
const books = new Map()
for (const file of fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()) {
  const book = JSON.parse(fs.readFileSync(path.join(corpusDir, file), "utf8"))
  books.set(book.id, book)
}
const ledger = JSON.parse(fs.readFileSync(decisionsPath, "utf8"))
const decisions = Array.isArray(ledger.decisions) ? ledger.decisions : []
const results = []
let removedNotApplicable = 0
let contextAnchored = 0
let pending = 0

for (const decision of decisions) {
  if (decision.action === "remove-modern-editorial") {
    removedNotApplicable += 1
    results.push({
      bookId: decision.bookId, chapter: decision.chapter, field: decision.field, sentence: decision.sentence,
      action: decision.action, traceabilityState: "not-applicable-removed",
      rationale: "The sentence is removed from public copy; no source anchor is required to justify preserving it.",
    })
    continue
  }
  const book = books.get(decision.bookId)
  const chapter = book?.chapters?.find((item) => item.number === decision.chapter)
  if (!chapter) {
    pending += 1
    results.push({ ...decision, traceabilityState: "missing-final-chapter-context", contextAnchors: [] })
    continue
  }
  const unitIndex = unitIndexFromField(decision.field)
  let anchors = []
  if (unitIndex !== null) {
    anchors = uniqueAnchors(chapter.units?.[unitIndex]?.sourceAnchors ?? [])
  } else {
    anchors = uniqueAnchors((chapter.units ?? []).flatMap((unit) => unit.sourceAnchors ?? []))
  }
  if (anchors.length) {
    contextAnchored += 1
    results.push({
      bookId: decision.bookId, chapter: decision.chapter, field: decision.field, sentence: decision.sentence,
      action: decision.action, rationale: decision.rationale,
      traceabilityState: "source-context-anchored",
      note: "This verifies a reproducible source context for the retained/re-written copy; it does not claim a byte-level hash of third-party source content.",
      contextAnchors: anchors,
    })
  } else {
    pending += 1
    results.push({
      bookId: decision.bookId, chapter: decision.chapter, field: decision.field, sentence: decision.sentence,
      action: decision.action, rationale: decision.rationale,
      traceabilityState: "pending-source-context",
      contextAnchors: [],
    })
  }
}

const report = {
  schema: "emanus-nt-editorial-traceability-audit-v1",
  status: pending ? "source-context-review-required" : "clean",
  policy: "Removed modern-editorial copy is not required to have a preservation source. Every retained or rewritten reviewed sentence must have reproducible source context in the final chapter/unit. Source-context anchoring is not represented as semantic proof or as a byte hash of third-party material.",
  counts: { decisions: decisions.length, removedNotApplicable, contextAnchored, pending },
  findings: results,
}
fs.writeFileSync(outputPath, JSON.stringify(report, null, 2) + "\n", "utf8")
console.log(`NT editorial traceability: ${contextAnchored} retained/rewritten context-anchored, ${removedNotApplicable} removed N/A, ${pending} pending.`)
