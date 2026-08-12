#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const DATA = path.join(ROOT, "docs", "data", "biblia-explicata")
const corpusDir = path.join(DATA, "nt-final-source-first")
const manifestPath = path.join(DATA, "nt-final-source-first-manifest.json")
const bindingPath = path.join(DATA, "nt-canonical-binding.json")
const blockersPath = path.join(DATA, "nt-publication-blockers.json")
const EXPECTED = { books: 27, chapters: 260, units: 970 }

function fail(message) {
  console.error(`[NT publication promotion] ${message}`)
  process.exit(1)
}
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function readJson(file, label) {
  if (!fs.existsSync(file)) fail(`missing ${label}: ${file}`)
  try { return JSON.parse(fs.readFileSync(file, "utf8")) } catch (error) { fail(`invalid ${label}: ${error.message}`) }
}
function writeJson(file, value) { fs.writeFileSync(file, stable(value), "utf8") }

const manifest = readJson(manifestPath, "final source-first manifest")
const binding = readJson(bindingPath, "canonical binding")
const blockers = readJson(blockersPath, "publication blocker report")

if (binding.releaseState !== "final" || binding.publicationReady !== true) {
  fail(`canonical binding is not final/publication-ready: ${binding.releaseState ?? "unknown"}`)
}
if (blockers.status !== "clear" || Number(blockers.counts?.blockerClasses ?? -1) !== 0) {
  fail(`publication blockers are not clear: ${blockers.status ?? "unknown"} (${blockers.counts?.blockerClasses ?? "?"})`)
}
if (Number(blockers.counts?.semanticFidelityPending ?? -1) !== 0) fail("semantic fidelity still has pending units")
if (manifest.counts?.books !== EXPECTED.books || manifest.counts?.chapters !== EXPECTED.chapters || manifest.counts?.units !== EXPECTED.units) {
  fail(`manifest totals are not ${EXPECTED.books}/${EXPECTED.chapters}/${EXPECTED.units}`)
}
if (manifest.status !== "in_review" && !(manifest.status === "published" && manifest.publicationReady === true)) {
  fail(`unexpected manifest state: ${manifest.status}/${manifest.publicationReady}`)
}

const files = fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()
if (files.length !== EXPECTED.books) fail(`source-first books ${files.length}/${EXPECTED.books}`)

let chapters = 0
let units = 0
const publishedBooks = []
for (const file of files) {
  const filePath = path.join(corpusDir, file)
  const book = readJson(filePath, file)
  if (!Array.isArray(book.chapters)) fail(`${file}: chapters missing`)
  if (book.status !== "in_review" && !(book.status === "published" && book.publicationReady === true)) {
    fail(`${file}: unexpected book state ${book.status}/${book.publicationReady}`)
  }
  for (const chapter of book.chapters) {
    chapters += 1
    units += Array.isArray(chapter.units) ? chapter.units.length : 0
    if (chapter.status !== "in_review" && chapter.status !== "published") fail(`${file} chapter ${chapter.number}: invalid status`)
  }

  const promoted = {
    ...book,
    status: "published",
    publicationReady: true,
    public: true,
    chapters: book.chapters.map((chapter) => ({ ...chapter, status: "published" })),
  }
  const rendered = stable(promoted)
  fs.writeFileSync(filePath, rendered, "utf8")
  publishedBooks.push({
    order: promoted.order,
    id: promoted.id,
    bookId: promoted.bookId,
    name: promoted.name,
    sourceClass: promoted.sourceClass,
    chapters: promoted.chapters.length,
    units: promoted.chapters.reduce((sum, chapter) => sum + chapter.units.length, 0),
    status: "published",
    publicationReady: true,
    public: true,
    sha256: crypto.createHash("sha256").update(rendered).digest("hex"),
  })
}

if (chapters !== EXPECTED.chapters || units !== EXPECTED.units) fail(`source-first totals are ${chapters}/${units}, expected ${EXPECTED.chapters}/${EXPECTED.units}`)

const promotedManifest = {
  ...manifest,
  status: "published",
  publicationReady: true,
  public: true,
  books: publishedBooks.sort((a, b) => a.order - b.order),
}
writeJson(manifestPath, promotedManifest)
console.log(`NT final publication promoted: ${publishedBooks.length}/${chapters}/${units} (books/chapters/units).`)
console.log(`Canonical text: ${binding.canonicalTextVersion} / ${binding.releaseState}.`)
