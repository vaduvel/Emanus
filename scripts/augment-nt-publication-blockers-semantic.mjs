#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const reportPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-publication-blockers.json")
const semanticPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-semantic-fidelity-audit.json")

function fail(message) {
  console.error(`[NT semantic publication blockers] ${message}`)
  process.exit(1)
}
if (!fs.existsSync(reportPath)) fail("base publication blocker report is missing")
if (!fs.existsSync(semanticPath)) fail("semantic fidelity audit is missing")

const report = JSON.parse(fs.readFileSync(reportPath, "utf8"))
const semantic = JSON.parse(fs.readFileSync(semanticPath, "utf8"))
const pending = Number(semantic.counts?.pendingSemanticReview ?? 0)
const rawReviewed = Number(semantic.counts?.rawTranscriptReviewed ?? 0)
const semanticReviewed = Number(semantic.counts?.semanticTranscriptReviewed ?? 0)
const stale = Number(semantic.counts?.staleSemanticReview ?? 0)

const blockers = Array.isArray(report.blockers) ? report.blockers.filter((item) => item.id !== "semantic-source-fidelity-pending") : []
if (pending > 0) {
  blockers.push({
    id: "semantic-source-fidelity-pending",
    count: pending,
    message: `${pending}/${semantic.counts?.units ?? report.counts?.units ?? 0} explanation units still lack hash-bound semantic review against transcript content.`,
    rawTranscriptReviewed: rawReviewed,
    semanticTranscriptReviewed: semanticReviewed,
    staleSemanticReview: stale,
    examples: (semantic.findings ?? []).slice(0, 20),
  })
}
report.blockers = blockers
report.status = blockers.length ? "blocked" : "clear"
report.counts = {
  ...(report.counts ?? {}),
  blockerClasses: blockers.length,
  semanticFidelityPending: pending,
  rawTranscriptReviewed: rawReviewed,
  semanticTranscriptReviewed: semanticReviewed,
  staleSemanticReview: stale,
}
report.semanticFidelityAudit = {
  schema: semantic.schema,
  status: semantic.status,
  policy: semantic.policy,
}
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + "\n", "utf8")
console.log(`NT semantic publication blocker augmentation: ${pending} pending; ${blockers.length} total blocker classes.`)

const requestedReady = report.manifestPublicationReady === true || report.manifestStatus === "published"
if (requestedReady && pending > 0) fail("publication requested while semantic source fidelity is incomplete")
