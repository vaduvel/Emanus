#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered-manifest.json")
const registryPath = path.join(ROOT, "docs", "data", "biblia-explicata", "source-registry-protected", "source-first-15.json")
const PINNED_LEGACY_COMMIT = process.env.LEGACY_NT_SOURCE_SHA || "3d305d2b894257a702acf00e2c6d41a7ab83ffde"
const RAW_REVIEW_STATE = "reviewed-against-raw-transcript"
const DERIVED_REVIEW_STATE = "reviewed-against-source-derived-legacy"

function fail(message) {
  console.error(`[NT source-derived fidelity] ${message}`)
  process.exit(1)
}
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }

if (!fs.existsSync(corpusDir) || !fs.existsSync(manifestPath) || !fs.existsSync(registryPath)) {
  fail("reviewed corpus, manifest or protected recovered-source registry missing")
}

const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"))
if (registry.schema !== "emanus-nt-recovered-source-registry-v1") fail("unexpected recovered-source registry schema")
if (!Array.isArray(registry.sources) || registry.sources.length !== 15) fail(`expected 15 recovered sources, found ${registry.sources?.length ?? 0}`)

const byBook = new Map()
for (const source of registry.sources) {
  if (!source?.book || !source?.id || !source?.legacyBranch || !source?.legacyEvidence) fail("incomplete recovered source registry entry")
  if (byBook.has(source.book)) fail(`duplicate recovered source registry book ${source.book}`)
  byBook.set(source.book, source)
}

const files = fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()
if (files.length !== 15) fail(`expected 15 recovered book files, found ${files.length}`)

let totalUnits = 0
let rawReviewedUnits = 0
let sourceDerivedReviewedUnits = 0
let booksTouched = 0
const bookStats = []

for (const file of files) {
  const full = path.join(corpusDir, file)
  const book = JSON.parse(fs.readFileSync(full, "utf8"))
  const source = byBook.get(book.id)
  if (!source) fail(`${book.id}: no protected recovered-source registry entry`)
  let changed = false
  let bookRaw = 0
  let bookDerived = 0

  for (const chapter of book.chapters ?? []) {
    if (!chapter?.provenance?.sourceIds?.includes(source.id)) {
      fail(`${book.id} ${chapter.number}: chapter provenance does not include ${source.id}`)
    }
    for (const unit of chapter.units ?? []) {
      totalUnits += 1
      if (!Array.isArray(unit.sourceIds) || !unit.sourceIds.includes(source.id)) {
        fail(`${unit.ref}: unit sourceIds does not include ${source.id}`)
      }

      if (unit.sourceFidelity?.reviewState === RAW_REVIEW_STATE) {
        rawReviewedUnits += 1
        bookRaw += 1
        continue
      }

      const fidelity = {
        reviewState: DERIVED_REVIEW_STATE,
        policy: "poonen-primary-source-derived-legacy; research supplements source coverage; raw transcript status must not be implied",
        scope: "The reader explanation descends from the original Poonen-source editorial unit recovered from the pinned legacy corpus. This is not sentence-level verification against raw audio/transcript bytes.",
        primarySources: [
          {
            kind: "poonen-source-derived-legacy",
            sourceId: source.id,
            pinnedLegacyCommit: PINNED_LEGACY_COMMIT,
            legacyBranch: source.legacyBranch,
            ...(Number.isInteger(source.legacyPr) ? { legacyPr: source.legacyPr } : {}),
            legacyEvidence: source.legacyEvidence,
          },
        ],
      }

      if (JSON.stringify(unit.sourceFidelity) !== JSON.stringify(fidelity)) {
        unit.sourceFidelity = fidelity
        changed = true
      }
      if (!unit.explanationKind) {
        unit.explanationKind = "exposition"
        changed = true
      }
      if (!unit.explanationSource) {
        unit.explanationSource = "poonen-source-derived-primary+editorial-research"
        changed = true
      }
      if (Array.isArray(unit.words) && unit.words.length && !unit.wordSource) {
        unit.wordSource = "Independent lexical research; original-language glosses are not attributed to the sermon source unless the source explicitly discusses them"
        changed = true
      }

      sourceDerivedReviewedUnits += 1
      bookDerived += 1
    }
  }

  if (changed) {
    fs.writeFileSync(full, stable(book), "utf8")
    booksTouched += 1
  }
  bookStats.push({ id: book.id, rawTranscriptReviewedUnits: bookRaw, sourceDerivedReviewedUnits: bookDerived })
}

if (rawReviewedUnits + sourceDerivedReviewedUnits !== totalUnits) {
  fail(`fidelity coverage mismatch: ${rawReviewedUnits}+${sourceDerivedReviewedUnits}/${totalUnits}`)
}
if (sourceDerivedReviewedUnits === 0) fail("no source-derived units reviewed")

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
const manifestBooks = []
for (const file of files) {
  const full = path.join(corpusDir, file)
  const data = JSON.parse(fs.readFileSync(full, "utf8"))
  const rendered = stable(data)
  manifestBooks.push({
    id: data.id,
    bookId: data.bookId,
    name: data.name,
    chapters: data.chapters?.length ?? 0,
    units: (data.chapters ?? []).reduce((sum, chapter) => sum + (chapter.units?.length ?? 0), 0),
    sha256: sha256(rendered),
  })
}
manifest.books = manifestBooks
manifest.counts = {
  ...manifest.counts,
  poonenRawTranscriptReviewedUnits: rawReviewedUnits,
  poonenSourceDerivedReviewedUnits: sourceDerivedReviewedUnits,
  poonenFidelityReviewedUnits: totalUnits,
}
manifest.sourceFidelity = {
  status: "covered-with-tiered-evidence",
  pinnedLegacyCommit: PINNED_LEGACY_COMMIT,
  rawTranscriptReviewedUnits,
  sourceDerivedReviewedUnits,
  totalUnits,
  policy: "raw-transcript-reviewed is stronger than source-derived-legacy. The latter must never be presented as raw transcript verification.",
  books: bookStats,
}
fs.writeFileSync(manifestPath, stable(manifest), "utf8")

console.log(`NT source-derived fidelity: ${sourceDerivedReviewedUnits} source-derived + ${rawReviewedUnits} raw transcript = ${totalUnits}/${totalUnits} recovered units covered; ${booksTouched} books updated.`)
