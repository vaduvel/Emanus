#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const inputPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-embedded-quote-candidates.json")
const outputPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-embedded-quote-strong-candidates.json")

function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }
if (!fs.existsSync(inputPath)) throw new Error("missing nt-embedded-quote-candidates.json")
const report = JSON.parse(fs.readFileSync(inputPath, "utf8"))
const strong = (report.findings ?? [])
  .filter((finding) => finding.best && finding.best.score >= 0.72 && (finding.bestMargin == null || finding.bestMargin >= 0.05))
  .map((finding) => ({
    reviewId: sha256(`${finding.bookId}\u0000${finding.chapter}\u0000${finding.field}\u0000${finding.quote}`),
    quoteSha256: `sha256:${sha256(finding.quote)}`,
    bookId: finding.bookId,
    canonicalBookId: finding.canonicalBookId,
    chapter: finding.chapter,
    field: finding.field,
    quote: finding.quote,
    wordCount: finding.wordCount,
    best: finding.best,
    alternatives: finding.alternatives,
    bestMargin: finding.bestMargin,
  }))
fs.writeFileSync(outputPath, JSON.stringify({
  schema: "emanus-nt-embedded-quote-strong-candidates-v1",
  policy: "Review batch only. Strong same-chapter Biblia Emanus candidates are diagnostic, not automatic replacements. Each decision must confirm that the quoted span is intended as Scripture and that the selected BE wording is the correct local passage.",
  sourceCount: report.count,
  count: strong.length,
  entries: strong,
}, null, 2) + "\n", "utf8")
console.log(`NT strong BE quote review batch: ${strong.length}/${report.count}.`)
