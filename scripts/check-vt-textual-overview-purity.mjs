#!/usr/bin/env node

import { BIBLE_BOOKS } from "../packages/shared/dist/bible/index.js"
import { IMPARATI1 } from "../packages/shared/dist/bible/imparati1.js"
import { VT_EXPLAINED_FULL_OVERLAYS } from "../packages/shared/dist/bible/overlays/fullCoverage.js"

const violations = []

function flag(where, label, value) {
  violations.push({ where, label, value: String(value ?? "").replace(/\s+/g, " ").slice(0, 420) })
}

const forbidden = [
  ["product/editorial meta", /\bEmanus\b|\boverlay(?:-ul)?\b|\btranscript(?:ul|ului|e)?\b/iu],
  ["modern/contemporary application", /\bmodern(?:ă|e|i)?\b|\bcontemporan(?:ă|e|i)?\b|\bastăzi\b/iu],
  ["Christian/church application", /\bcreștin(?:ă|e|i)?\b|\bbiseric(?:ă|ii|ile|ilor)\b|\bcredincios(?:ul|ului|i|ii)?\b/iu],
  ["explicit doctrinal framing", /\bdoctrin(?:ă|ar|ară|are)\b|\bteologi(?:e|c|că)\b/iu],
  ["application framing", /\baplic(?:ă|ăm|are|area|abil|abilă)\b|\bpentru noi\b|\bîn viața noastră\b/iu],
  ["normative transfer caveat", /\bnu (?:constituie|devine|devin|este|sunt).{0,45}\b(?:mandat|model|metodă|poruncă|regulă)\b/iu],
  ["transfer/safety caveat", /\bnu (?:se )?transfer(?:ă|ăm)\b|\bnu autorizează\b|\bnu justifică\b/iu],
  ["cross-testament interpretation", /\bNoul Testament\b|\bIisus\b|\bHristos\b|\bapostol(?:ul|ii)?\b/iu],
]

function checkUnit(bookName, chapterNumber, unit, legacy = false) {
  if (unit.explanationKind !== "textual-overview") return
  const where = legacy
    ? `${bookName} ${chapterNumber} ${unit.ref}`
    : `${bookName} ${chapterNumber}:${unit.from}-${unit.to}`

  if (unit.forYourHeart) flag(where, "forYourHeart prezent", unit.forYourHeart)
  if (unit.words?.length) flag(where, "lexicon prezent", JSON.stringify(unit.words))
  if (!legacy && unit.source?.kind !== "biblia-emanus") {
    flag(where, `source.kind=${unit.source?.kind ?? "missing"}`, unit.teaching)
  }

  for (const [label, pattern] of forbidden) {
    if (pattern.test(unit.teaching ?? "")) flag(where, label, unit.teaching)
  }
}

for (const book of [...BIBLE_BOOKS, IMPARATI1]) {
  for (const chapter of book.chapters) {
    for (const unit of chapter.units) checkUnit(book.name, chapter.number, unit, true)
  }
}

for (const book of VT_EXPLAINED_FULL_OVERLAYS) {
  for (const chapter of book.chapters) {
    for (const unit of chapter.units) checkUnit(book.name, chapter.number, unit, false)
  }
}

if (violations.length) {
  console.error(`[VT textual-overview purity] FAIL — ${violations.length} semnale în completări care trebuie să rămână strict textuale:`)
  violations.forEach((item, index) => {
    console.error(`\n${index + 1}. ${item.where} — ${item.label}`)
    console.error(`   ${item.value}`)
  })
  process.exit(1)
}

console.log("[VT textual-overview purity] PASS — toate completările textual-overview rămân rezumate textuale, fără doctrină/aplicație/lexicon adăugate.")
