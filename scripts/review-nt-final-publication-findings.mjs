#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const reportPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-publication-review.json")
function fail(message) { console.error(`[NT final publication findings review] ${message}`); process.exit(1) }
if (!fs.existsSync(reportPath)) fail("final publication review report missing")
const report = JSON.parse(fs.readFileSync(reportPath, "utf8"))
if (report.schema !== "emanus-nt-final-publication-review-v1" || !Array.isArray(report.findings)) fail("unexpected review report schema")

const retained = []
const reviewedExceptions = Array.isArray(report.reviewedExceptions) ? [...report.reviewedExceptions] : []
const validReference = /^.+\s\d+(?::\d+)?(?:[-,]\d+(?::\d+)?)*$/u
const realAiMeta = /\b(?:ChatGPT|OpenAI)\b|\bmodel de limbaj\b/i
const uppercaseAi = /\bAI\b/u

for (const finding of report.findings) {
  if (finding.code === "cross-reference-format") {
    const match = String(finding.message ?? "").match(/^Unusual cross-reference format:\s*(.+)\.$/u)
    const ref = match?.[1]?.trim() ?? ""
    if (ref && validReference.test(ref)) {
      reviewedExceptions.push({
        wave: finding.wave,
        code: finding.code,
        location: finding.location,
        value: ref,
        disposition: "accepted-valid-biblical-reference-syntax",
        rationale: "Reviewed parser exception. The reference uses a valid compact Bible-reference form: single-chapter-book verse range, whole chapter, comma-separated verses, or a cross-chapter range.",
      })
      continue
    }
  }

  if (finding.code === "ai-meta-leak") {
    const excerpt = String(finding.excerpt ?? "")
    if (!realAiMeta.test(excerpt) && !uppercaseAi.test(excerpt)) {
      reviewedExceptions.push({
        wave: finding.wave,
        code: finding.code,
        location: finding.location,
        excerpt: excerpt.slice(0, 240),
        disposition: "false-positive-romanian-ai-verb",
        rationale: "The case-insensitive raw scanner matched Romanian «ai» (verb a avea), not the uppercase AI acronym or AI-product metadata. No reader-facing AI attribution is present.",
      })
      continue
    }
  }

  retained.push(finding)
}

const countsBySeverity = retained.reduce((acc, item) => { acc[item.severity] = (acc[item.severity] ?? 0) + 1; return acc }, {})
const countsByWave = retained.reduce((acc, item) => { acc[item.wave] = (acc[item.wave] ?? 0) + 1; return acc }, {})
report.findings = retained
report.reviewedExceptions = reviewedExceptions
report.findingsByWave = countsByWave
report.counts = {
  ...(report.counts ?? {}),
  blockers: countsBySeverity.blocker ?? 0,
  reviewFindings: countsBySeverity.review ?? 0,
  infoFindings: countsBySeverity.info ?? 0,
  reviewedExceptions: reviewedExceptions.length,
}
report.status = report.counts.blockers === 0 && report.counts.reviewFindings === 0 ? "clean" : (report.counts.blockers > 0 ? "blocked" : "review")
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + "\n", "utf8")
console.log(`NT final publication findings review: ${reviewedExceptions.length} explicit reviewed exceptions / ${retained.length} findings remain.`)
