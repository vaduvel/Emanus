#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const outputPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-romanian-language-audit.json")

const REQUIRED_DIACRITICS = new Map([
  ["cuvant", "cuvânt"], ["cuvantul", "cuvântul"], ["tatal", "tatăl"],
  ["intai", "întâi"], ["intaia", "întâia"], ["invatator", "învățător"], ["invatatura", "învățătură"],
  ["imparatie", "împărăție"], ["imparatia", "împărăția"], ["credinta", "credință"], ["pacat", "păcat"],
  ["pacate", "păcate"], ["mantuire", "mântuire"], ["mantuit", "mântuit"], ["inceput", "început"],
  ["vesnic", "veșnic"], ["vesnicia", "veșnicia"], ["adevar", "adevăr"], ["adevarat", "adevărat"],
  ["nastere", "naștere"], ["sange", "sânge"], ["pamant", "pământ"], ["pamantesc", "pământesc"],
  ["ramane", "rămâne"], ["raman", "rămân"], ["raspuns", "răspuns"], ["fara", "fără"],
  ["inainte", "înainte"], ["inapoi", "înapoi"], ["intelege", "înțelege"], ["intelegere", "înțelegere"],
  ["marturisire", "mărturisire"], ["marturie", "mărturie"], ["marturia", "mărturia"],
  ["Botezatorul", "Botezătorul"], ["botezatorul", "botezătorul"], ["fagaduise", "făgăduise"],
  ["fagaduit", "făgăduit"], ["fagaduinta", "făgăduință"], ["curata", "curată"],
])
const TYPO_PATTERNS = [
  [/\bmangaie-re\b/giu, "mângâiere"],
  [/\bmangaere\b/giu, "mângâiere"],
  [/\bomensec\b/giu, "omenesc"],
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

if (!fs.existsSync(corpusDir)) throw new Error("missing final NT corpus")
const findings = []
for (const file of fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()) {
  const book = JSON.parse(fs.readFileSync(path.join(corpusDir, file), "utf8"))
  for (const chapter of book.chapters ?? []) {
    for (const [field, value] of fields(chapter)) {
      for (const [wrong, expected] of REQUIRED_DIACRITICS) {
        const regex = new RegExp(`\\b${wrong}\\b`, "giu")
        const matches = value.match(regex)
        if (matches?.length) findings.push({ bookId: book.id, book: book.name, chapter: chapter.number, field, kind: "missing-diacritics", token: wrong, expected, occurrences: matches.length })
      }
      for (const [pattern, expected] of TYPO_PATTERNS) {
        const matches = value.match(pattern)
        if (matches?.length) findings.push({ bookId: book.id, book: book.name, chapter: chapter.number, field, kind: "known-typo", token: matches[0], expected, occurrences: matches.length })
      }
    }
  }
}

const report = {
  schema: "emanus-nt-romanian-language-audit-v1",
  status: findings.length ? "manual-edit-required" : "clean",
  policy: "Reader-facing Romanian must use standard diacritics and contain no known corruption tokens. Only unambiguous missing-diacritic forms are flagged automatically; ambiguous Romanian morphology is left for manual review.",
  count: findings.reduce((sum, finding) => sum + finding.occurrences, 0),
  findingGroups: findings.length,
  findings,
}
fs.writeFileSync(outputPath, JSON.stringify(report, null, 2) + "\n", "utf8")
console.log(`NT Romanian language audit: ${report.count} suspect occurrences in ${findings.length} groups.`)
