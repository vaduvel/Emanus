#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const recoveredDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-recovered")
const reportPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-recovered-audit-findings.json")

const RECOVERABLE = new Set([
  "matei", "marcu", "luca", "ioan", "fapte", "romani", "1-corinteni", "2-corinteni",
  "galateni", "efeseni", "filipeni", "coloseni", "1-tesaloniceni", "tit", "filimon",
])

const RULES = [
  ["modern-source-attribution", /\b(?:Poonen|CFC|Christian Fellowship|SermonIndex)\b/i],
  ["editorial-abuse-balancer", /\b(?:abuz|victim|consimțăm|raportarea răului|protecția legală|protecție juridică|siguranța victim|siguranța copil|coerci|constrângere)\b/i],
  ["editorial-medical-balancer", /\b(?:îngrijire medicală|tratament medical|ajutor medical|psihologic|psihiatric|diagnostic medical)\b/i],
  ["editorial-financial-balancer", /\b(?:manipulare financiară|presiune financiară|exploatare financiară)\b/i],
  ["editorial-eschatology-balancer", /\b(?:panică escatologică|fixarea de date|teorii conspiraționiste|cronologii disputate)\b/i],
  ["reader-meta", /\b(?:Emanus|overlay|reader|editorial|sursa spune|transcrierea|în această explicație|această unitate)\b/i],
  ["relativizer", /\b(?:o posibilă lectură|poate fi interpretat|o interpretare posibilă|creștinii interpretează diferit|există mai multe interpretări|nu impunem această interpretare)\b/i],
  ["legacy-text-name", /\bRCCV\b/i],
]

function collectStrings(value, pointer = "$") {
  const out = []
  if (typeof value === "string") return [{ pointer, value }]
  if (Array.isArray(value)) {
    value.forEach((entry, index) => out.push(...collectStrings(entry, `${pointer}[${index}]`)))
    return out
  }
  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      if (["sourceBranch", "sourcePolicy", "textPolicy", "recoveryClass", "emanusTextBinding"].includes(key)) continue
      out.push(...collectStrings(child, `${pointer}.${key}`))
    }
  }
  return out
}

if (!fs.existsSync(recoveredDir)) {
  console.error("Missing nt-recovered. Run recovery first.")
  process.exit(1)
}

const findings = []
let scannedBooks = 0
let scannedChapters = 0
let scannedUnits = 0
for (const file of fs.readdirSync(recoveredDir).filter((name) => name.endsWith(".json")).sort()) {
  const book = JSON.parse(fs.readFileSync(path.join(recoveredDir, file), "utf8"))
  if (!RECOVERABLE.has(book.id)) continue
  scannedBooks += 1
  for (const chapter of book.chapters) {
    scannedChapters += 1
    scannedUnits += chapter.units?.length ?? 0
    const strings = collectStrings({
      title: chapter.title,
      summary: chapter.summary,
      literaryContext: chapter.literaryContext,
      historicalContext: chapter.historicalContext,
      units: chapter.units,
      prayer: chapter.prayer,
    })
    for (const { pointer, value } of strings) {
      for (const [rule, pattern] of RULES) {
        if (!pattern.test(value)) continue
        findings.push({
          bookId: book.id,
          book: book.name,
          chapter: chapter.number,
          rule,
          pointer,
          excerpt: value.replace(/\s+/g, " ").slice(0, 360),
        })
      }
    }
  }
}

const grouped = {}
for (const finding of findings) grouped[finding.rule] = (grouped[finding.rule] ?? 0) + 1
const report = {
  schema: "emanus-nt-recovered-adversarial-audit-v1",
  status: findings.length ? "findings-require-source-review" : "clean",
  policy: "Findings are candidates, not automatic deletions. Verify each against Poonen/CFC before changing doctrine. Public source names must be removed without weakening the source claim.",
  scanned: { books: scannedBooks, chapters: scannedChapters, units: scannedUnits },
  countsByRule: grouped,
  findings,
}
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + "\n", "utf8")
console.log(`Recovered NT audit: ${scannedBooks} books / ${scannedChapters} chapters / ${scannedUnits} units; ${findings.length} candidate findings.`)
for (const [rule, count] of Object.entries(grouped).sort()) console.log(`${rule}: ${count}`)
