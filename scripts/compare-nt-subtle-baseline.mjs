#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const reportPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-subtle-editorial-refined-findings.json")
const baselinePath = path.join(ROOT, "docs", "data", "biblia-explicata", "source-registry-protected", "nt-subtle-reviewed-baseline.json")

function fail(message) { console.error(`[NT subtle baseline compare] ${message}`); process.exit(1) }
function signature(finding) { return [finding.bookId, String(finding.chapter), finding.field, finding.rule, finding.sentence].join("\u0000") }
function digest(signatures) { return crypto.createHash("sha256").update(signatures.join("\n")).digest("hex") }
function render(signatureValue) {
  const [bookId, chapter, field, rule, sentence] = signatureValue.split("\u0000")
  return `${bookId} ${chapter} ${field} ${rule}: ${sentence}`
}

if (![reportPath, baselinePath].every(fs.existsSync)) fail("report/baseline missing")
const report = JSON.parse(fs.readFileSync(reportPath, "utf8"))
const baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8"))
const current = report.findings.map(signature).sort()
const reviewed = [...baseline.candidateSignatures].sort()
const currentSet = new Set(current)
const reviewedSet = new Set(reviewed)
const removed = reviewed.filter((item) => !currentSet.has(item))
const added = current.filter((item) => !reviewedSet.has(item))
console.log(`reviewed=${reviewed.length} current=${current.length}`)
console.log(`reviewedSemantic=${baseline.semanticSha256}`)
console.log(`currentSemantic=${digest(current)}`)
console.log(`removed=${removed.length} added=${added.length}`)
for (const item of removed) console.log(`OLD> ${render(item)}`)
for (const item of added) console.log(`NEW> ${render(item)}`)
if (removed.length || added.length) process.exit(2)
console.log("NT subtle candidate set is semantically unchanged.")
