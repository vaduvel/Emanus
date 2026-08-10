#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import { UNAMBIGUOUS_ROMANIAN_DIACRITICS } from "./nt-romanian-diacritics.mjs"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const outputPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-romanian-language-audit.json")

// Context-sensitive raw forms. Unlike the shared deterministic map, these can
// have more than one correct Romanian result depending on grammar.
const CONTEXTUAL_MISSING_DIACRITICS = new Map([
  ["credinta", "credință / credința"],
  ["adevarata", "adevărată / adevărata"],
  ["arata", "arată / arăta"],
  ["usurinta", "ușurință / ușurința"],
  ["lasa", "lasă / lăsa"],
  ["legatura", "legătură / legătura"],
  ["viata", "viață / viața"],
  ["biruinta", "biruință / biruința"],
  ["curata", "curată / curăță"],
])

// `simpla` is special: the spelling is correct in definite pre-nominal uses
// such as "simpla citare" / "simpla folosire". Flag only contexts that prove
// the intended adjective is the diacritized `simplă`.
const CONTEXTUAL_PATTERNS = [
  {
    token: "simpla",
    expected: "simplă",
    pattern: /\b(?:o|mai)\s+simpla\b|\b(?:schema|schemă|cauza|cauză|ordine|chemare|lumea)\s+simpla\b/giu,
  },
]

function fields(chapter) {
  return [
    ["title", chapter.title], ["summary", chapter.summary], ["literaryContext", chapter.literaryContext], ["historicalContext", chapter.historicalContext], ["prayer", chapter.prayer],
    ...(chapter.units ?? []).flatMap((unit, index) => [
      [`units[${index}].heading`, unit.heading], [`units[${index}].teaching`, unit.teaching], [`units[${index}].forYourHeart`, unit.forYourHeart],
      ...((unit.words ?? []).map((word, wordIndex) => [`units[${index}].words[${wordIndex}].meaning`, word.meaning])),
    ]),
  ].filter(([, value]) => typeof value === "string" && value.trim())
}
function contextFor(value, token) {
  const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const regex = new RegExp(`(?<![\\p{L}\\p{N}_])${escaped}(?![\\p{L}\\p{N}_])`, "iu")
  const match = regex.exec(value)
  if (!match) return null
  const start = Math.max(0, match.index - 55)
  const end = Math.min(value.length, match.index + match[0].length + 55)
  return `${start > 0 ? "…" : ""}${value.slice(start, end).replace(/\s+/g, " ").trim()}${end < value.length ? "…" : ""}`
}
function pushTokenFinding(findings, book, chapter, field, value, wrong, expected, kind = "missing-diacritics") {
  const escaped = wrong.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const regex = new RegExp(`(?<![\\p{L}\\p{N}_])${escaped}(?![\\p{L}\\p{N}_])`, "giu")
  const matches = value.match(regex)
  if (matches?.length) findings.push({ bookId: book.id, book: book.name, chapter: chapter.number, field, kind, token: wrong, expected, occurrences: matches.length, context: contextFor(value, wrong) })
}

if (!fs.existsSync(corpusDir)) throw new Error("missing final NT corpus")
const findings = []
for (const file of fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()) {
  const book = JSON.parse(fs.readFileSync(path.join(corpusDir, file), "utf8"))
  for (const chapter of book.chapters ?? []) {
    for (const [field, value] of fields(chapter)) {
      for (const [wrong, expected] of UNAMBIGUOUS_ROMANIAN_DIACRITICS) {
        pushTokenFinding(findings, book, chapter, field, value, wrong, expected)
      }
      for (const [wrong, expected] of CONTEXTUAL_MISSING_DIACRITICS) {
        pushTokenFinding(findings, book, chapter, field, value, wrong, expected)
      }
      for (const rule of CONTEXTUAL_PATTERNS) {
        const matches = value.match(rule.pattern)
        if (matches?.length) findings.push({
          bookId: book.id,
          book: book.name,
          chapter: chapter.number,
          field,
          kind: "contextual-missing-diacritics",
          token: rule.token,
          expected: rule.expected,
          occurrences: matches.length,
          context: contextFor(value, rule.token),
        })
      }
    }
  }
}

const tokenSummaryMap = new Map()
for (const finding of findings) {
  const key = `${finding.kind}\u0000${String(finding.token).toLowerCase()}\u0000${finding.expected}`
  const current = tokenSummaryMap.get(key) ?? { kind: finding.kind, token: String(finding.token).toLowerCase(), expected: finding.expected, occurrences: 0, groups: 0, samples: [] }
  current.occurrences += finding.occurrences
  current.groups += 1
  if (finding.context && current.samples.length < 12) current.samples.push({ bookId: finding.bookId, chapter: finding.chapter, field: finding.field, context: finding.context })
  tokenSummaryMap.set(key, current)
}
const tokenSummary = [...tokenSummaryMap.values()].sort((a, b) => b.occurrences - a.occurrences || a.token.localeCompare(b.token, "ro"))

const report = {
  schema: "emanus-nt-romanian-language-audit-v4",
  status: findings.length ? "manual-edit-required" : "clean",
  policy: "Reader-facing Romanian must use standard diacritics. Deterministic and audit rules share one registry; context-sensitive forms are handled separately, and valid definite forms such as 'simpla citare' are not false positives.",
  count: findings.reduce((sum, finding) => sum + finding.occurrences, 0),
  findingGroups: findings.length,
  tokenSummary,
  findings,
}
fs.writeFileSync(outputPath, JSON.stringify(report, null, 2) + "\n", "utf8")
console.log(`NT Romanian language audit: ${report.count} suspect occurrences in ${findings.length} groups across ${tokenSummary.length} token classes.`)
