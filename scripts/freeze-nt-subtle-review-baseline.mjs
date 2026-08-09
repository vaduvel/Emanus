#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const reportPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-subtle-editorial-refined-findings.json")
const baselinePath = path.join(ROOT, "docs", "data", "biblia-explicata", "source-registry-protected", "nt-subtle-reviewed-baseline.json")

function fail(message) { console.error(`[NT subtle baseline] ${message}`); process.exit(1) }
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function signature(finding) {
  return [finding.bookId, String(finding.chapter), finding.field, finding.rule, finding.sentence].join("\u0000")
}
function digest(signatures) {
  return crypto.createHash("sha256").update(signatures.join("\n")).digest("hex")
}

if (!fs.existsSync(reportPath)) fail("reviewed candidate report missing before regeneration")
const report = JSON.parse(fs.readFileSync(reportPath, "utf8"))
if (report.count !== 96 || !Array.isArray(report.findings) || report.findings.length !== 96) fail(`expected manually reviewed 96 findings, got ${report.findings?.length ?? 0}`)
const signatures = report.findings.map(signature).sort()
const payload = {
  schema: "emanus-nt-subtle-reviewed-baseline-v1",
  meaning: "Exact semantic candidate set manually reviewed before source-first publication. Serialization differences are irrelevant; any changed candidate tuple requires a new review.",
  rawFindings: report.findings.length,
  semanticSha256: digest(signatures),
  candidateSignatures: signatures,
}

if (fs.existsSync(baselinePath)) {
  const existing = JSON.parse(fs.readFileSync(baselinePath, "utf8"))
  if (existing.semanticSha256 !== payload.semanticSha256 || JSON.stringify(existing.candidateSignatures) !== JSON.stringify(payload.candidateSignatures)) {
    fail("existing protected baseline differs from the reviewed report")
  }
  console.log(`NT subtle review baseline unchanged: ${payload.rawFindings} findings / ${payload.semanticSha256}`)
} else {
  fs.mkdirSync(path.dirname(baselinePath), { recursive: true })
  fs.writeFileSync(baselinePath, stable(payload), "utf8")
  console.log(`NT subtle review baseline frozen: ${payload.rawFindings} findings / ${payload.semanticSha256}`)
}
