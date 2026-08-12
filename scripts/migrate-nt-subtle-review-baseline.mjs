#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const reportPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-subtle-editorial-refined-findings.json")
const baselinePath = path.join(ROOT, "docs", "data", "biblia-explicata", "source-registry-protected", "nt-subtle-reviewed-baseline.json")

function fail(message) { console.error(`[NT subtle baseline migration] ${message}`); process.exit(1) }
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function signature(bookId, chapter, field, rule, sentence) { return [bookId, String(chapter), field, rule, sentence].join("\u0000") }
function sigFinding(finding) { return signature(finding.bookId, finding.chapter, finding.field, finding.rule, finding.sentence) }
function digest(items) { return crypto.createHash("sha256").update(items.join("\n")).digest("hex") }

const EXPECTED_REMOVED = [
  signature("galateni", 2, "units[3].teaching", "modern-help", "Confruntarea are scopul restaurării adevărului, nu umilirea. Responsabilitatea, siguranța și protecția persoanelor vulnerabile rămân compatibile cu fidelitatea față de Evanghelie."),
  signature("filipeni", 3, "units[3].teaching", "anti-shame", "Trupul nu este rău și nu trebuie disprețuit. El este fragil și va fi transformat de Hristos; de aceea postul sau controlul alimentației nu trebuie folosite ca autoflagelare ori impuse altora. Credința nu justifică rușinarea corpului, înfometarea sau ignorarea unei tulburări alimentare. Va fi transformat și făcut asemenea trupului slavei lui Hristos."),
].sort()

const EXPECTED_ADDED = [
  signature("galateni", 2, "units[3].teaching", "modern-help", "Confruntarea are scopul restaurării adevărului, nu umilirea. Responsabilitatea și dreptatea rămân compatibile cu fidelitatea față de Evanghelie."),
  signature("filipeni", 3, "units[3].teaching", "anti-shame", "Trupul nu este rău și nu trebuie disprețuit. Va fi transformat și făcut asemenea trupului slavei lui Hristos."),
].sort()

if (![reportPath, baselinePath].every(fs.existsSync)) fail("report/baseline missing")
const report = JSON.parse(fs.readFileSync(reportPath, "utf8"))
const baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8"))
const oldSet = new Set(baseline.candidateSignatures)
const current = report.findings.map(sigFinding).sort()
const currentSet = new Set(current)
const removed = [...oldSet].filter((item) => !currentSet.has(item)).sort()
const added = current.filter((item) => !oldSet.has(item)).sort()

if (JSON.stringify(removed) !== JSON.stringify(EXPECTED_REMOVED) || JSON.stringify(added) !== JSON.stringify(EXPECTED_ADDED)) {
  console.error(`Expected exact reviewed drift of 2 removed / 2 added; got ${removed.length}/${added.length}.`)
  for (const item of removed) console.error(`OLD> ${item.replaceAll("\u0000", " | ")}`)
  for (const item of added) console.error(`NEW> ${item.replaceAll("\u0000", " | ")}`)
  process.exit(1)
}

const next = {
  ...baseline,
  rawFindings: current.length,
  semanticSha256: digest(current),
  candidateSignatures: current,
  reviewMigration: {
    reason: "Second high-confidence cleanup changed exactly two reviewed candidate sentences. Galatians 2 remains remove-modern-editorial; Philippians 3 now contains only the direct resurrection-body statement and is keep-reviewed.",
    removedSignatures: EXPECTED_REMOVED,
    addedSignatures: EXPECTED_ADDED,
  },
}
fs.writeFileSync(baselinePath, stable(next), "utf8")
console.log(`NT subtle baseline migrated after exact reviewed drift: ${baseline.semanticSha256} -> ${next.semanticSha256}`)
