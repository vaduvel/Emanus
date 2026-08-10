#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first-manifest.json")
function fail(message) { console.error(`[NT final traceability metadata] ${message}`); process.exit(1) }
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }

if (!fs.existsSync(corpusDir) || !fs.existsSync(manifestPath)) fail("final corpus/manifest missing")
const files = fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()
if (files.length !== 27) fail(`expected 27 books, found ${files.length}`)
let totalUnits = 0
let anchoredUnits = 0
const bookDigests = new Map()
for (const file of files) {
  const full = path.join(corpusDir, file)
  const book = JSON.parse(fs.readFileSync(full, "utf8"))
  for (const chapter of book.chapters ?? []) {
    const units = chapter.units ?? []
    totalUnits += units.length
    const complete = units.length > 0 && units.every((unit) => Array.isArray(unit.sourceAnchors) && unit.sourceAnchors.length > 0)
    anchoredUnits += units.filter((unit) => Array.isArray(unit.sourceAnchors) && unit.sourceAnchors.length > 0).length
    chapter.provenance = {
      ...(chapter.provenance ?? {}),
      sourceLocatorAnchorsComplete: complete,
      sourceTraceabilityComplete: complete,
    }
  }
  const rendered = stable(book)
  fs.writeFileSync(full, rendered, "utf8")
  bookDigests.set(book.id, sha256(rendered))
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
if (!Array.isArray(manifest.books) || manifest.books.length !== files.length) fail("manifest books missing")
manifest.sourceTraceabilityComplete = totalUnits > 0 && anchoredUnits === totalUnits
manifest.counts = {
  ...(manifest.counts ?? {}),
  totalUnitsWithSourceLocatorAnchors: anchoredUnits,
  totalUnitsWithoutSourceLocatorAnchors: totalUnits - anchoredUnits,
}
manifest.books = manifest.books.map((book) => {
  const digest = bookDigests.get(book.id)
  if (!digest) fail(`manifest references unknown book ${book.id}`)
  return { ...book, sha256: digest }
})
fs.writeFileSync(manifestPath, stable(manifest), "utf8")
console.log(`NT final traceability metadata: ${anchoredUnits}/${totalUnits} units anchored; manifest complete=${manifest.sourceTraceabilityComplete}.`)
