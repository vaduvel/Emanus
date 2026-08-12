#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-first")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-first-manifest.json")
const evidencePath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-evidence.json")
const registryPath = path.join(ROOT, "docs", "data", "biblia-explicata", "source-registry-protected", "source-first-12.json")

function fail(message) {
  console.error(`[NT source-first fidelity] ${message}`)
  process.exit(1)
}
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }

for (const required of [corpusDir, manifestPath, evidencePath, registryPath]) {
  if (!fs.existsSync(required)) fail(`missing ${path.relative(ROOT, required)}`)
}

const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"))
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"))
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
if (!Array.isArray(evidence.records)) fail("source evidence records missing")
if (!Array.isArray(registry.sources)) fail("protected source registry missing sources")

const evidenceById = new Map(evidence.records.map((record) => [record.evidenceId ?? record.id, record]))
const sourceById = new Map(registry.sources.map((source) => [source.id, source]))
const files = fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()
if (files.length !== 12) fail(`expected 12 rebuilt book files, found ${files.length}`)

let units = 0
let chapters = 0
let anchoredUnits = 0
const verificationLevels = new Map()
const bookStats = []

for (const file of files) {
  const full = path.join(corpusDir, file)
  const book = JSON.parse(fs.readFileSync(full, "utf8"))
  let bookUnits = 0
  let bookAnchored = 0

  for (const chapter of book.chapters ?? []) {
    chapters += 1
    for (const unit of chapter.units ?? []) {
      units += 1
      bookUnits += 1
      if (!Array.isArray(unit.sourceIds) || !unit.sourceIds.length) fail(`${unit.ref}: sourceIds missing`)
      if (!Array.isArray(unit.sourceAnchors) || !unit.sourceAnchors.length) fail(`${unit.ref}: sourceAnchors missing`)

      const primarySources = unit.sourceAnchors.map((anchor, index) => {
        if (!anchor?.sourceId || !anchor?.locator || !anchor?.evidenceId || !anchor?.evidenceSha256 || !anchor?.verificationLevel) {
          fail(`${unit.ref}: incomplete sourceAnchor[${index}]`)
        }
        if (!unit.sourceIds.includes(anchor.sourceId)) fail(`${unit.ref}: anchor source ${anchor.sourceId} is absent from sourceIds`)
        const source = sourceById.get(anchor.sourceId)
        if (!source) fail(`${unit.ref}: unknown protected source ${anchor.sourceId}`)
        const record = evidenceById.get(anchor.evidenceId)
        if (!record) fail(`${unit.ref}: unknown evidence ${anchor.evidenceId}`)
        if (record.sourceId !== anchor.sourceId) fail(`${unit.ref}: evidence/source mismatch for ${anchor.evidenceId}`)
        if (record.evidenceSha256 !== anchor.evidenceSha256) fail(`${unit.ref}: evidence hash mismatch for ${anchor.evidenceId}`)
        if (record.locator !== anchor.locator) fail(`${unit.ref}: evidence locator mismatch for ${anchor.evidenceId}`)
        const count = verificationLevels.get(anchor.verificationLevel) ?? 0
        verificationLevels.set(anchor.verificationLevel, count + 1)
        return {
          kind: source.kind,
          sourceId: anchor.sourceId,
          locator: anchor.locator,
          evidenceId: anchor.evidenceId,
          evidenceSha256: anchor.evidenceSha256,
          verificationLevel: anchor.verificationLevel,
          ...(source.officialUrl ? { officialUrl: source.officialUrl } : {}),
        }
      })

      unit.explanationKind = unit.explanationKind ?? "exposition"
      unit.explanationSource = unit.explanationSource ?? "poonen-source-locator-primary+canonical-research"
      if (Array.isArray(unit.words) && unit.words.length && !unit.wordSource) {
        unit.wordSource = "Independent lexical research; source-locator fidelity does not make lexical glosses claims of the sermon source"
      }
      unit.sourceFidelity = {
        reviewState: "reviewed-against-source-locators",
        policy: "Poonen/CFC is primary where the source develops the passage; source locator evidence is preserved; this state is not raw-audio/transcript-byte verification.",
        primarySources,
      }
      anchoredUnits += 1
      bookAnchored += 1
    }
  }

  fs.writeFileSync(full, stable(book), "utf8")
  bookStats.push({ id: book.id, units: bookUnits, sourceLocatorReviewedUnits: bookAnchored })
}

if (units !== 208) fail(`expected 208 source-first units, found ${units}`)
if (anchoredUnits !== units) fail(`source-locator coverage ${anchoredUnits}/${units}`)
if (chapters !== 69) fail(`expected 69 source-first chapters, found ${chapters}`)

const manifestBooks = []
for (const file of files) {
  const full = path.join(corpusDir, file)
  const data = JSON.parse(fs.readFileSync(full, "utf8"))
  const raw = stable(data)
  const existing = (manifest.books ?? []).find((entry) => entry.id === data.id) ?? {}
  manifestBooks.push({
    ...existing,
    id: data.id,
    bookId: data.bookId,
    name: data.name,
    chapters: data.chapters?.length ?? 0,
    units: (data.chapters ?? []).reduce((sum, chapter) => sum + (chapter.units?.length ?? 0), 0),
    sha256: sha256(raw),
  })
}
manifest.books = manifestBooks
manifest.counts = {
  ...manifest.counts,
  sourceLocatorReviewedUnits: anchoredUnits,
  sourceFidelityReviewedUnits: anchoredUnits,
}
manifest.sourceFidelity = {
  status: "source-locator-reviewed",
  units: anchoredUnits,
  chapters,
  policy: "Every rebuilt unit is bound to validated source evidence locators. This is a provenance/review tier, not a claim that third-party source bytes are stored or hashed locally.",
  verificationLevels: Object.fromEntries([...verificationLevels.entries()].sort(([a], [b]) => a.localeCompare(b))),
  books: bookStats,
}
fs.writeFileSync(manifestPath, stable(manifest), "utf8")

console.log(`NT source-first fidelity: ${anchoredUnits}/${units} units across ${chapters} chapters bound to validated source locators.`)
