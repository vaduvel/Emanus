#!/usr/bin/env node

import crypto from "node:crypto"
import fs from "node:fs"
import path from "node:path"
import { FINAL_ROMANIAN_READER_SAFE_REPLACEMENTS } from "./nt-final-romanian-wave.mjs"

const ROOT = process.cwd()
const DATA = path.join(ROOT, "docs", "data", "biblia-explicata")
const CORPUS = path.join(DATA, "nt-final-source-first")
const MANIFEST = path.join(DATA, "nt-final-source-first-manifest.json")
const OUT = path.join(DATA, "nt-final-reader-diacritic-rebind.json")

// This is the exact raw state produced by the deterministic materialization
// pipeline. Any different count means the upstream reader copy drifted and
// must be reviewed before this script is allowed to write.
const EXPECTED_INITIAL_STATES = [
  { in: 101, viata: 2, credinta: 0, afara: 4 },
  // Source-first materialization may already have consumed the two purely
  // diacritic-only groups; the remaining run is still deterministic.
  { in: 0, viata: 0, credinta: 0, afara: 4 },
]
// JavaScript's `\b` is ASCII-only even with the Unicode flag. Using it here
// also matched the `in` inside Romanian words such as `pocăință` and `puțin`.
const IN_PATTERN = /(?<!în\s)(?<!de\s)(?<!din\s)(?<![\p{L}\p{N}_])in(?![\p{L}\p{N}_])/giu
const VIATA_PATTERN = /(?<![\p{L}\p{N}_])viata(?![\p{L}\p{N}_])/giu
const CREDINTA_PATTERN = /(?<![\p{L}\p{N}_])credinta(?![\p{L}\p{N}_])/giu
const AFARA_PATTERN = /(?<!în\s)(?<![\p{L}\p{N}_])afara(?![\p{L}\p{N}_])/giu

function fail(message) {
  console.error(`[NT final reader diacritics] ${message}`)
  process.exit(1)
}
function sha(value) {
  return `sha256:${crypto.createHash("sha256").update(String(value ?? "")).digest("hex")}`
}
function stripRomanianDiacritics(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[șȘ]/g, (match) => match === "Ș" ? "S" : "s")
    .replace(/[țȚ]/g, (match) => match === "Ț" ? "T" : "t")
    .replace(/[ăâĂÂ]/g, (match) => match === match.toUpperCase() ? "A" : "a")
    .replace(/[îÎ]/g, (match) => match === "Î" ? "I" : "i")
    .normalize("NFC")
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
function tokenPattern(token) {
  const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  return new RegExp(`(?<![\\p{L}\\p{N}_])${escaped}(?![\\p{L}\\p{N}_])`, "giu")
}
function reconcileManifestDigests() {
  if (!fs.existsSync(MANIFEST)) fail("missing final source-first manifest")
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"))
  if (manifest.schema !== "emanus-nt-final-source-first-manifest-v1" || !Array.isArray(manifest.books)) {
    fail("unexpected final source-first manifest schema")
  }

  for (const file of fs.readdirSync(CORPUS).filter((name) => name.endsWith(".json")).sort()) {
    const full = path.join(CORPUS, file)
    const book = JSON.parse(fs.readFileSync(full, "utf8"))
    const entry = manifest.books.find((item) => item.id === book.id)
    if (!entry) fail(`manifest book missing: ${book.id}`)
    entry.sha256 = crypto.createHash("sha256").update(fs.readFileSync(full)).digest("hex")
  }

  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n", "utf8")
}

if (!fs.existsSync(CORPUS)) fail("missing final NT corpus")
const previous = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : null
const alreadyApplied = [
  "emanus-nt-final-reader-diacritic-rebind-v1",
  "emanus-nt-final-reader-diacritic-rebind-v2",
].includes(previous?.schema)
const totals = { in: 0, viata: 0, credinta: 0, afara: 0, readerSafe: 0 }
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
      const counts = { in: 0, viata: 0, credinta: 0, afara: 0 }

      let result = replaceAndCount(current, IN_PATTERN, (match) => preserveCase(match, "în", "În", "ÎN"))
      current = result.text
      counts.in = result.count

      result = replaceAndCount(current, VIATA_PATTERN, (match) => preserveCase(match, "viața", "Viața", "VIAȚA"))
      current = result.text
      counts.viata = result.count

      result = replaceAndCount(current, CREDINTA_PATTERN, (match) => preserveCase(match, "credința", "Credința", "CREDINȚA"))
      current = result.text
      counts.credinta = result.count

      result = replaceAndCount(current, AFARA_PATTERN, (match) => preserveCase(match, "afară", "Afară", "AFARĂ"))
      current = result.text
      counts.afara = result.count

      for (const [wrong, expected] of FINAL_ROMANIAN_READER_SAFE_REPLACEMENTS) {
        result = replaceAndCount(current, tokenPattern(wrong), (match) => preserveCase(
          match,
          expected.toLowerCase(),
          expected[0].toUpperCase() + expected.slice(1),
          expected.toUpperCase(),
        ))
        current = result.text
        counts.readerSafe = (counts.readerSafe ?? 0) + result.count
      }

      if (stripRomanianDiacritics(before) !== stripRomanianDiacritics(current)) {
        fail(`${book.id} ${chapter.number} ${item.field}: automatic reader repair changed more than Romanian diacritics`)
      }

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
    changedBooks.set(book.id, { full, rendered })
  }
}

const appliedCount = Object.values(totals).reduce((sum, value) => sum + value, 0)
if (appliedCount) {
  const coreAppliedCount = totals.in + totals.viata + totals.credinta + totals.afara
  const matchesKnownState = EXPECTED_INITIAL_STATES.some((expected) =>
    Object.keys(expected).every((token) => totals[token] === expected[token])
  )
  if (coreAppliedCount && !matchesKnownState) {
    fail(`unexpected initial repair state: ${JSON.stringify(totals)}; expected one of ${JSON.stringify(EXPECTED_INITIAL_STATES)}`)
  }
} else if (!alreadyApplied) {
  fail("final corpus is normalized, but the rebind artifact is missing; rematerialize the corpus before rerunning")
}

if (appliedCount) {
  for (const { full, rendered } of changedBooks.values()) {
    fs.writeFileSync(full, rendered, "utf8")
  }
  reconcileManifestDigests()
  const priorTotals = previous?.schema === "emanus-nt-final-reader-diacritic-rebind-v2"
    ? previous.totals ?? {}
    : {}
  const cumulativeTotals = Object.fromEntries(
    Object.keys(totals).map((key) => [key, Number(priorTotals[key] ?? 0) + totals[key]]),
  )
  const cumulativeOperations = [
    ...(previous?.schema === "emanus-nt-final-reader-diacritic-rebind-v2" ? previous.operations ?? [] : []),
    ...operations,
  ]
  const cumulativeSemanticRebinds = [
    ...(previous?.schema === "emanus-nt-final-reader-diacritic-rebind-v2" ? previous.semanticRebinds ?? [] : []),
    ...semanticRebinds,
  ]
  const cumulativeBooks = [...new Set([
    ...(previous?.schema === "emanus-nt-final-reader-diacritic-rebind-v2" ? previous.changedBooks ?? [] : []),
    ...changedBooks.keys(),
  ])].sort()
  const cumulativeAppliedCount = Object.values(cumulativeTotals).reduce((sum, value) => sum + value, 0)

  fs.writeFileSync(OUT, JSON.stringify({
    schema: "emanus-nt-final-reader-diacritic-rebind-v2",
    policy: "Fail-closed post-ledger restoration of Romanian diacritics. Every automatic field change must remain byte-identical after stripping Romanian diacritics; words and punctuation cannot change in this stage.",
    appliedCount: cumulativeAppliedCount,
    totals: cumulativeTotals,
    changedBooks: cumulativeBooks,
    operationCount: cumulativeOperations.length,
    semanticRebindCount: cumulativeSemanticRebinds.length,
    operations: cumulativeOperations,
    semanticRebinds: cumulativeSemanticRebinds,
  }, null, 2) + "\n", "utf8")
  console.log(`NT final reader diacritics: ${appliedCount} repairs in ${operations.length} fields; ${semanticRebinds.length} semantic hash rebinds.`)
} else {
  // A rerun may have no text changes while a previous partial repro still has
  // stale manifest digests. Reconcile bookkeeping from the actual corpus;
  // this never changes reader-facing text.
  reconcileManifestDigests()
  console.log("NT final reader diacritics: already applied; 0 residual repairs.")
}
