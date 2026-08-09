#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const outputPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-romanian-language-audit.json")

// These tokens are invalid in normal Romanian reader-facing prose without diacritics.
// `expected` is guidance for a human editor, not an automatic replacement. Some forms
// have more than one correct diacritized form depending on grammar (for example
// `credinta` -> `credință` / `credința`, `arata` -> `arată` / `arăta`).
const MISSING_DIACRITICS = new Map([
  ["si", "și"], ["in", "în"], ["il", "îl / Îl"], ["isi", "își"], ["daca", "dacă"], ["fara", "fără"],
  ["cuvant", "cuvânt"], ["cuvantul", "cuvântul"], ["tatal", "tatăl"], ["intai", "întâi"], ["dintai", "dintâi"], ["intaia", "întâia"],
  ["invatator", "învățător"], ["invatatura", "învățătură"], ["imparatie", "împărăție"], ["imparatia", "împărăția"],
  ["credinta", "credință / credința"], ["pacat", "păcat"], ["pacate", "păcate"], ["mantuire", "mântuire"], ["mantuit", "mântuit"],
  ["incepe", "începe"], ["inceput", "început"], ["vesnic", "veșnic"], ["vesnicia", "veșnicia"], ["adevar", "adevăr"],
  ["adevarat", "adevărat"], ["adevarata", "adevărată / adevărata"], ["nastere", "naștere"], ["nascut", "născut"], ["sange", "sânge"],
  ["pamant", "pământ"], ["pamantesc", "pământesc"], ["ramane", "rămâne"], ["raman", "rămân"], ["raspuns", "răspuns"],
  ["inainte", "înainte"], ["inapoi", "înapoi"], ["intelege", "înțelege"], ["intelegere", "înțelegere"],
  ["marturisire", "mărturisire"], ["marturie", "mărturie"], ["marturia", "mărturia"], ["botezatorul", "botezătorul"],
  ["fagaduise", "făgăduise"], ["fagaduit", "făgăduit"], ["fagaduinta", "făgăduință"], ["facut", "făcut"], ["facatorului", "Făcătorului"],
  ["arata", "arată / arăta"], ["urmareste", "urmărește"], ["doua", "două"], ["miscari", "mișcări"], ["nouasprezece", "nouăsprezece"],
  ["randul", "rândul"], ["randurile", "rândurile"], ["preoti", "preoți"], ["aseaza", "așază"], ["asteptau", "așteptau"],
  ["asteptarea", "așteptarea"], ["ratiunii", "rațiunii"], ["raspicat", "răspicat"], ["capatul", "capătul"],
  ["usurinta", "ușurință / ușurința"], ["aceeasi", "aceeași"], ["lasa", "lasă / lăsa"], ["inalte", "înalte"], ["decat", "decât"],
  ["incurcatura", "încurcătură"], ["crestin", "creștin"], ["crestine", "creștine"], ["fapturii", "făpturii"],
  ["legatura", "legătură / legătura"], ["vietii", "vieții"], ["viata", "viață / viața"], ["intuneric", "întuneric"], ["amandoua", "amândouă"],
  ["inteles", "înțeles"], ["biruinta", "biruință / biruința"], ["simpla", "simplă"], ["daruieste", "dăruiește"], ["descopera", "descoperă"],
  ["curata", "curată / curăță"], ["stapanire", "stăpânire"], ["stapanit", "stăpânit"], ["inviere", "înviere"], ["invierea", "învierea"],
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
      for (const [wrong, expected] of MISSING_DIACRITICS) {
        const escaped = wrong.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        const regex = new RegExp(`\\b${escaped}\\b`, "giu")
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
  schema: "emanus-nt-romanian-language-audit-v2",
  status: findings.length ? "manual-edit-required" : "clean",
  policy: "Reader-facing Romanian must use standard diacritics. This audit flags likely missing-diacritic tokens but does not guess context-sensitive replacements. Automatic fixes are limited to context-free corruption tokens in a separate script.",
  count: findings.reduce((sum, finding) => sum + finding.occurrences, 0),
  findingGroups: findings.length,
  findings,
}
fs.writeFileSync(outputPath, JSON.stringify(report, null, 2) + "\n", "utf8")
console.log(`NT Romanian language audit: ${report.count} suspect occurrences in ${findings.length} groups.`)
