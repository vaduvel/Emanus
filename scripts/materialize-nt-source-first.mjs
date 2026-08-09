#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"
import { NT_SOURCE_FIRST_BLUEPRINTS } from "./nt-source-first-blueprints.mjs"

const ROOT = process.cwd()
const recoveredDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-recovered")
const sourceDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-first")
const registryPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-registry", "source-first-12.json")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-first-manifest.json")

const EXPECTED = { books: 12, chapters: 69 }

function fail(message) {
  console.error(`[NT source-first] ${message}`)
  process.exit(1)
}
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }

if (!fs.existsSync(registryPath)) fail("lipsește source-first-12.json")
if (!fs.existsSync(recoveredDir)) fail("lipsește nt-recovered; rulează mai întâi recovery")
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"))
const sourceIds = new Set(registry.sources.map((source) => source.id))

const recoveredFiles = fs.readdirSync(recoveredDir).filter((name) => name.endsWith(".json")).sort()
const recoveredById = new Map()
for (const file of recoveredFiles) {
  const data = JSON.parse(fs.readFileSync(path.join(recoveredDir, file), "utf8"))
  recoveredById.set(data.id, { file, data })
}

fs.rmSync(sourceDir, { recursive: true, force: true })
fs.mkdirSync(sourceDir, { recursive: true })

let totalChapters = 0
const books = []
for (const [id, blueprint] of Object.entries(NT_SOURCE_FIRST_BLUEPRINTS)) {
  const recoveredEntry = recoveredById.get(id)
  if (!recoveredEntry) fail(`${id}: lipsește din recovery`)
  const recovered = recoveredEntry.data
  if (recovered.recoveryClass !== "quarantined-generic-completion") fail(`${id}: nu este carte generică în recovery`)
  if (!Array.isArray(blueprint.sources) || blueprint.sources.length === 0) fail(`${id}: sources gol`)
  for (const sourceId of blueprint.sources) if (!sourceIds.has(sourceId)) fail(`${id}: source ID necunoscut ${sourceId}`)
  if (!Array.isArray(blueprint.chapters) || blueprint.chapters.length !== recovered.chapters.length) {
    fail(`${id}: blueprint chapters ${blueprint.chapters?.length ?? 0}/${recovered.chapters.length}`)
  }

  const chapters = blueprint.chapters.map((chapterBlueprint, index) => {
    const recoveredChapter = recovered.chapters[index]
    const number = index + 1
    if (recoveredChapter.number !== number) fail(`${id}: recovery necontinuu la cap. ${number}`)
    const binding = recoveredChapter.emanusTextBinding
    if (!binding || binding.translation !== "BE") fail(`${id} ${number}: binding BE absent`)
    const criticalReferenceNumbers = Array.isArray(binding.criticalReferenceNumbers) ? binding.criticalReferenceNumbers : []
    const ref = `${recovered.name} ${number}:1-${binding.lastVerseNumber}`
    const unit = {
      id: `${id}-${number}-source-first`,
      ref,
      verseStart: 1,
      verseEnd: binding.lastVerseNumber,
      ...(criticalReferenceNumbers.length ? { criticalReferenceNumbers } : {}),
      heading: chapterBlueprint.title,
      teaching: chapterBlueprint.teaching,
      sourceKind: "poonen-source-first",
      sourceIds: blueprint.sources,
    }
    return {
      number,
      title: `${recovered.name} ${number} — ${chapterBlueprint.title}`,
      summary: chapterBlueprint.summary,
      units: [unit],
      status: "in_review",
      reviewState: "source-first-rebuilt",
      emanusTextBinding: binding,
      provenance: {
        sourcePolicy: "poonen-source-first",
        sourceIds: blueprint.sources,
        legacyGenericContentUsed: false,
      },
    }
  })

  const payload = {
    schema: "emanus-nt-source-first-v1",
    id,
    bookId: recovered.bookId,
    name: recovered.name,
    testament: "nt",
    order: recovered.order,
    status: "in_review",
    publicationReady: false,
    replacementFor: "quarantined-generic-completion",
    chapters,
  }
  const rendered = stable(payload)
  const fileName = recoveredEntry.file
  fs.writeFileSync(path.join(sourceDir, fileName), rendered, "utf8")
  totalChapters += chapters.length
  books.push({ id, bookId: recovered.bookId, name: recovered.name, chapters: chapters.length, sources: blueprint.sources, sha256: sha256(rendered) })
}

if (books.length !== EXPECTED.books) fail(`books ${books.length}/${EXPECTED.books}`)
if (totalChapters !== EXPECTED.chapters) fail(`chapters ${totalChapters}/${EXPECTED.chapters}`)

const manifest = {
  schema: "emanus-nt-source-first-manifest-v1",
  status: "in_review",
  publicationReady: false,
  doctrinePolicy: "Where Poonen/CFC develops the passage, preserve doctrine, interpretation, typology and application without dilution. Modern-source provenance stays internal.",
  genericCompletionAllowed: false,
  counts: { books: books.length, chapters: totalChapters, units: totalChapters },
  books,
}
fs.writeFileSync(manifestPath, stable(manifest), "utf8")
console.log(`NT source-first materialized: ${books.length} books / ${totalChapters} chapters; generic completion retained only in quarantine input.`)
