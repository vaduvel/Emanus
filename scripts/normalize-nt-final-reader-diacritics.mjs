#!/usr/bin/env node

import crypto from "node:crypto"
import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const DATA = path.join(ROOT, "docs", "data", "biblia-explicata")
const CORPUS = path.join(DATA, "nt-final-source-first")
const MANIFEST = path.join(DATA, "nt-final-source-first-manifest.json")
const OUT = path.join(DATA, "nt-final-reader-diacritic-rebind.json")

const EXPECTED_INITIAL = { in: 583, viata: 5, credinta: 1 }
const IN_PATTERN = /(?<!\bîn\s)(?<!\bde\s)(?<!\bdin\s)\bin\b/giu

function fail(message) {
  console.error(`[NT final reader diacritics] ${message}`)
  process.exit(1)
}
function sha(value) {
  return `sha256:${crypto.createHash("sha256").update(String(value ?? "")).digest("hex")}`
}
function snapshot(unit) {
  return JSON.stringify({
    heading: String(unit.heading ?? ""),
    teaching: String(unit.teaching ?? ""),
    forYourHeart: String(unit.forYourHeart ?? ""),
  })
}
function fields(chapter) {
  return [
    ["title", chapter], ["summary", chapter], ["literaryContext", chapter],
    ["historicalContext", chapter], ["prayer", chapter],
    ...(chapter.units ?? []).flatMap((unit, unitIndex) => [
      [`units[${unitIndex}].heading`, unit, "heading", unit],
      [`units[${unitIndex}].teaching`, unit, "teaching", unit],
      [`units[${unitIndex}].forYourHeart`, unit, "forYourHeart", unit],
      ...((unit.words ?? []).map((word, wordIndex) => [
        `units[${unitIndex}].words[${wordIndex}].meaning`, word, "meaning", null,
      ])),
    ]),
  ].map(([field, holder, explicitKey, unit]) => ({
    field,
    holder,
    key: explicitKey ?? field,
    unit: unit ?? null,
  })).filter(({ holder, key }) => typeof holder?.[key] === "string" && holder[key].trim())
}
function preserveCase(match, lower, capital, upper) {
  if (match === match.toUpperCase()) return upper
  if (match[0] === match[0].toUpperCase()) return capital
  return lower
}
function replaceAndCount(value, pattern, replacer) {
  let count = 0
  const text = value.replace(pattern, (match) => {
    count += 1
    return replacer(match)
  })
  return { text, count }
}

if (!fs.existsSync(CORPUS)) fail("missing final NT corpus")
const previous = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : null
const alreadyApplied = previous?.schema === "emanus-nt-final-reader-diacritic-rebind-v1"
const totals = { in: 0, viata: 0, credinta: 0 }
const operations = []
const semanticRebinds = []
const changedBooks = new Map()

for (const file of fs.readdirSync(CORPUS).filter((name) => name.endsWith(".json")).sort()) {
  const full = path.join(CORPUS, file)
  const book = JSON.parse(fs.readFileSync(full, "utf8"))
  let bookChanged = false

  for (const chapter of book.chapters ?? []) {
    const affectedUnits = new Map()
    for (const item of fields(chapter)) {
      const before = item.holder[item.key]
      let current = before
      const counts = { in: 0, viata: 0, credinta: 0 }

      let result = replaceAndCount(current, IN_PATTERN, (match) => preserveCase(match, "în", "În", "ÎN"))
      current = result.text
      counts.in = result.count

      result = replaceAndCount(current, /\bviata\b/giu, (match) => preserveCase(match, "viața", "Viața", "VIAȚA"))
      current = result.text
      counts.viata = result.count

      result = replaceAndCount(current, /\bcredinta\b/giu, (match) => preserveCase(match, "credința", "Credința", "CREDINȚA"))
      current = result.text
      counts.credinta = result.count

      for (const key of Object.keys(totals)) totals[key] += counts[key]
      const count = Object.values(counts).reduce((sum, value) => sum + value, 0)
      if (!count) continue

      if (item.unit && !affectedUnits.has(item.unit.id)) {
        const semantic = item.unit.sourceFidelity?.semanticReview
        const beforeSha = sha(snapshot(item.unit))
        if (semantic?.status === "approved-against-transcript" && semantic.reviewedTeachingSha256 !== beforeSha) {
          fail(`${item.unit.id}: approved semantic hash is stale before diacritic repair`)
        }
        affectedUnits.set(item.unit.id, {
          unit: item.unit,
          semanticBefore: semantic?.status === "approved-against-transcript" ? beforeSha : null,
        })
      }

      item.holder[item.key] = current
      bookChanged = true
      operations.push({
        bookId: book.id,
        chapter: Number(chapter.number),
        field: item.field,
        unitId: item.unit?.id ?? null,
        counts,
        beforeSha256: sha(before),
        afterSha256: sha(current),
      })
    }

    for (const { unit, semanticBefore } of affectedUnits.values()) {
      if (!semanticBefore) continue
      const semanticAfter = sha(snapshot(unit))
      unit.sourceFidelity.semanticReview.reviewedTeachingSha256 = semanticAfter
      semanticRebinds.push({
        bookId: book.id,
        chapter: Number(chapter.number),
        unitId: unit.id,
        beforeSha256: semanticBefore,
        afterSha256: semanticAfter,
        policy: "Romanian diacritics only; words and punctuation are otherwise byte-identical.",
      })
    }
  }

  if (bookChanged) {
    const rendered = JSON.stringify(book, null, 2) + "\n"
    fs.writeFileSync(full, rendered, "utf8")
    changedBooks.set(book.id, rendered)
  }
}

const appliedCount = Object.values(totals).reduce((sum, value) => sum + value, 0)
if (!alreadyApplied) {
  for (const [token, expected] of Object.entries(EXPECTED_INITIAL)) {
    if (totals[token] !== expected) fail(`expected ${expected} ${token} repairs, found ${totals[token]}`)
  }
} else if (appliedCount !== 0) {
  fail(`existing rebind artifact requires an idempotent rerun, but ${appliedCount} repairs remained`)
}

if (appliedCount) {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"))
  if (manifest.schema !== "emanus-nt-final-source-first-manifest-v1" || !Array.isArray(manifest.books)) {
    fail("unexpected final source-first manifest schema")
  }
  for (const [bookId, rendered] of changedBooks) {
    const entry = manifest.books.find((item) => item.id === bookId)
    if (!entry) fail(`manifest book missing: ${bookId}`)
    entry.sha256 = sha(rendered).slice("sha256:".length)
  }
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n", "utf8")
  fs.writeFileSync(OUT, JSON.stringify({
    schema: "emanus-nt-final-reader-diacritic-rebind-v1",
    policy: "Fail-closed repair of the raw Romanian forms independently confirmed by the final reader-copy audit: preposition in -> în, and exact contextual forms viata -> viața and credinta -> credința. Clear noun uses of in (flax/linen) are excluded by syntax.",
    appliedCount,
    totals,
    changedBooks: [...changedBooks.keys()].sort(),
    operationCount: operations.length,
    semanticRebindCount: semanticRebinds.length,
    operations,
    semanticRebinds,
  }, null, 2) + "\n", "utf8")
  console.log(`NT final reader diacritics: ${appliedCount} repairs in ${operations.length} fields; ${semanticRebinds.length} semantic hash rebinds.`)
} else {
  console.log("NT final reader diacritics: already applied; 0 residual repairs.")
}
