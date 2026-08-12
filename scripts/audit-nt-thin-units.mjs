#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const outputPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-thin-unit-audit.json")

const MIN_TEACHING_WORDS = 30
const CONCISE_TEACHING_WORDS = 40
const MIN_READER_WORDS_WHEN_CONCISE = 50

function fail(message) { console.error(`[NT thin-unit audit] ${message}`); process.exit(1) }
function wordCount(value) { return String(value ?? "").trim().split(/\s+/u).filter(Boolean).length }

function assess(unit) {
  const teachingWords = wordCount(unit.teaching)
  const heartWords = wordCount(unit.forYourHeart)
  const readerWords = teachingWords + heartWords
  if (teachingWords < MIN_TEACHING_WORDS) {
    return { thin: true, reason: "teaching-below-hard-minimum", teachingWords, heartWords, readerWords }
  }
  if (teachingWords < CONCISE_TEACHING_WORDS && readerWords < MIN_READER_WORDS_WHEN_CONCISE) {
    return { thin: true, reason: "concise-teaching-with-insufficient-reader-context", teachingWords, heartWords, readerWords }
  }
  return { thin: false, reason: null, teachingWords, heartWords, readerWords }
}

if (!fs.existsSync(corpusDir)) fail("missing final NT corpus")
const findings = []
let units = 0
let conciseAccepted = 0
for (const file of fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()) {
  const book = JSON.parse(fs.readFileSync(path.join(corpusDir, file), "utf8"))
  for (const chapter of book.chapters ?? []) {
    for (let unitIndex = 0; unitIndex < (chapter.units ?? []).length; unitIndex += 1) {
      const unit = chapter.units[unitIndex]
      units += 1
      const assessment = assess(unit)
      if (!assessment.thin) {
        if (assessment.teachingWords < 45) conciseAccepted += 1
        continue
      }
      findings.push({
        bookId: book.id,
        bookName: book.name,
        chapter: chapter.number,
        unitIndex,
        unitId: unit.id,
        ref: unit.ref,
        verseStart: unit.verseStart,
        verseEnd: unit.verseEnd,
        heading: unit.heading ?? "",
        teaching: unit.teaching ?? "",
        forYourHeart: unit.forYourHeart ?? null,
        ...assessment,
        sourceKind: unit.sourceKind ?? null,
        sourceIds: unit.sourceIds ?? [],
        sourceAnchors: unit.sourceAnchors ?? [],
      })
    }
  }
}
const report = {
  schema: "emanus-nt-thin-unit-audit-v2",
  status: findings.length ? "manual-source-expansion-required" : "clean",
  policy: "Editorial sufficiency is not a magic 45-word teaching threshold. Teaching below 30 words is always blocked. Teaching of 30-39 words is accepted only when teaching + forYourHeart reaches 50 reader-facing words. Teaching of 40+ words is accepted as a concise explanation. Any remaining thin unit must be expanded from its passage and reviewed source context; generic filler is forbidden.",
  thresholds: {
    minTeachingWords: MIN_TEACHING_WORDS,
    conciseTeachingWords: CONCISE_TEACHING_WORDS,
    minReaderWordsWhenConcise: MIN_READER_WORDS_WHEN_CONCISE,
  },
  units,
  conciseAccepted,
  count: findings.length,
  findings,
}
fs.writeFileSync(outputPath, JSON.stringify(report, null, 2) + "\n", "utf8")
console.log(`NT thin-unit audit: ${findings.length}/${units} editorially thin; ${conciseAccepted} concise units accepted by reader-context rule.`)
