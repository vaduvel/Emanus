#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const outputPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-lexicon-audit.json")

function fail(message) {
  console.error(`[NT lexicon audit] ${message}`)
  process.exit(1)
}
if (!fs.existsSync(corpusDir)) fail("missing final NT corpus")

const findings = []
const KNOWN_RULES = [
  { original: "λεγιών", forbidden: /cohort/i, reason: "legiunea nu este cohortă" },
  { original: "ὀργή", forbidden: /durere/i, reason: "ὀργή este mânie/indignare; mâhnirea este o idee distinctă în context" },
  { original: "βαπτίζω", forbidden: /(?:botezul nu este|stropire|romani\s+6)/i, reason: "câmpul lexical trebuie separat de concluzia doctrinară" },
]
const DOCTRINAL_IN_LEXICON = /\b(?:singura interpretare|dovedește că|botezul nu este|răpirea|premilen|complementarian|femeile nu|prezbiterii trebuie)\b/i

let entries = 0
for (const file of fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()) {
  const book = JSON.parse(fs.readFileSync(path.join(corpusDir, file), "utf8"))
  for (const chapter of book.chapters ?? []) {
    for (const unit of chapter.units ?? []) {
      for (const word of unit.words ?? []) {
        entries += 1
        const meaning = String(word.meaning ?? "")
        if (!meaning.trim()) findings.push({ bookId: book.id, chapter: chapter.number, ref: unit.ref, original: word.original, kind: "empty-meaning" })
        for (const rule of KNOWN_RULES) {
          if (word.original === rule.original && rule.forbidden.test(meaning)) findings.push({ bookId: book.id, chapter: chapter.number, ref: unit.ref, original: word.original, kind: "known-lexical-error", reason: rule.reason, meaning })
        }
        if (DOCTRINAL_IN_LEXICON.test(meaning)) findings.push({ bookId: book.id, chapter: chapter.number, ref: unit.ref, original: word.original, kind: "lexical-doctrinal-category-mix", meaning })
      }
    }
  }
}

const report = {
  schema: "emanus-nt-lexicon-audit-v1",
  status: findings.length ? "manual-source-check-required" : "clean",
  policy: "Lexical fields define the Greek/Hebrew term. Poonen/Emanus doctrinal conclusions remain in teaching, not disguised as uncontested lexical meaning.",
  entries,
  count: findings.length,
  findings,
}
fs.writeFileSync(outputPath, JSON.stringify(report, null, 2) + "\n", "utf8")
console.log(`NT lexicon audit: ${entries} entries / ${findings.length} unresolved.`)
