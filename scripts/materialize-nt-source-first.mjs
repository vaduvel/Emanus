#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"
import { NT_SOURCE_FIRST_BLUEPRINTS } from "./nt-source-first-blueprints.mjs"
import { NT_SOURCE_FIRST_PASSAGE_OVERRIDES } from "./nt-source-first-passage-overrides.mjs"
import { NT_SOURCE_FIRST_WAVE_A_OVERRIDES } from "./nt-source-first-wave-a-overrides.mjs"
import { NT_SOURCE_FIRST_WAVE_B_OVERRIDES } from "./nt-source-first-wave-b-overrides.mjs"
import { NT_SOURCE_FIRST_WAVE_C_OVERRIDES } from "./nt-source-first-wave-c-overrides.mjs"
import { NT_SOURCE_FIRST_WAVE_D_OVERRIDES } from "./nt-source-first-wave-d-overrides.mjs"

const ROOT = process.cwd()
const recoveredDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-recovered")
const sourceDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-first")
const registryPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-registry", "source-first-12.json")
const evidencePath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-evidence.json")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-first-manifest.json")

const EXPECTED = { books: 12, chapters: 69 }

function fail(message) { console.error(`[NT source-first] ${message}`); process.exit(1) }
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }

if (!fs.existsSync(registryPath)) fail("lipsește source-first-12.json")
if (!fs.existsSync(recoveredDir)) fail("lipsește nt-recovered; rulează mai întâi recovery")
if (!fs.existsSync(evidencePath)) fail("lipsește nt-source-evidence.json; rulează materialize-nt-source-evidence.mjs")
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"))
const sourceIds = new Set(registry.sources.map((source) => source.id))
const evidenceRegistry = JSON.parse(fs.readFileSync(evidencePath, "utf8"))
const evidenceById = new Map((evidenceRegistry.records ?? []).map((record) => [record.id, record]))

const recoveredFiles = fs.readdirSync(recoveredDir).filter((name) => name.endsWith(".json")).sort()
const recoveredById = new Map()
for (const file of recoveredFiles) {
  const data = JSON.parse(fs.readFileSync(path.join(recoveredDir, file), "utf8"))
  recoveredById.set(data.id, { file, data })
}

fs.rmSync(sourceDir, { recursive: true, force: true })
fs.mkdirSync(sourceDir, { recursive: true })

function resolveAnchors(anchorIds, allowedSourceIds, label) {
  if (!Array.isArray(anchorIds) || !anchorIds.length) return []
  return anchorIds.map((evidenceId) => {
    const evidence = evidenceById.get(evidenceId)
    if (!evidence) fail(`${label}: evidence ID necunoscut ${evidenceId}`)
    if (!allowedSourceIds.includes(evidence.sourceId)) fail(`${label}: evidence ${evidenceId} folosește sourceId nepermis ${evidence.sourceId}`)
    if (!/^sha256:[0-9a-f]{64}$/i.test(evidence.evidenceSha256 ?? "")) fail(`${label}: evidence hash invalid ${evidenceId}`)
    return {
      sourceId: evidence.sourceId,
      locator: evidence.locator,
      evidenceId,
      evidenceSha256: evidence.evidenceSha256,
      verificationLevel: evidence.verificationLevel,
    }
  })
}

let totalChapters = 0
let totalUnits = 0
const books = []
for (const [id, blueprint] of Object.entries(NT_SOURCE_FIRST_BLUEPRINTS)) {
  const recoveredEntry = recoveredById.get(id)
  if (!recoveredEntry) fail(`${id}: lipsește din recovery`)
  const recovered = recoveredEntry.data
  if (recovered.recoveryClass !== "quarantined-generic-completion") fail(`${id}: nu este carte generică în recovery`)
  if (!Array.isArray(blueprint.sources) || blueprint.sources.length === 0) fail(`${id}: sources gol`)
  for (const sourceId of blueprint.sources) if (!sourceIds.has(sourceId)) fail(`${id}: source ID necunoscut ${sourceId}`)
  if (!Array.isArray(blueprint.chapters) || blueprint.chapters.length !== recovered.chapters.length) fail(`${id}: blueprint chapters ${blueprint.chapters?.length ?? 0}/${recovered.chapters.length}`)

  const override = NT_SOURCE_FIRST_WAVE_D_OVERRIDES[id] ?? NT_SOURCE_FIRST_WAVE_C_OVERRIDES[id] ?? NT_SOURCE_FIRST_WAVE_B_OVERRIDES[id] ?? NT_SOURCE_FIRST_WAVE_A_OVERRIDES[id] ?? NT_SOURCE_FIRST_PASSAGE_OVERRIDES[id]
  const chapters = blueprint.chapters.map((chapterBlueprint, index) => {
    const recoveredChapter = recovered.chapters[index]
    const number = index + 1
    if (recoveredChapter.number !== number) fail(`${id}: recovery necontinuu la cap. ${number}`)
    const binding = recoveredChapter.emanusTextBinding
    if (!binding || binding.translation !== "BE") fail(`${id} ${number}: binding BE absent`)
    const criticalReferenceNumbers = Array.isArray(binding.criticalReferenceNumbers) ? binding.criticalReferenceNumbers : []
    const unitBlueprints = override?.chapters?.[number]

    let units
    let reviewState
    if (Array.isArray(unitBlueprints) && unitBlueprints.length) {
      let expectedNext = 1
      units = unitBlueprints.map((item, unitIndex) => {
        if (!Number.isInteger(item.from) || !Number.isInteger(item.to) || item.from !== expectedNext || item.to < item.from || item.to > binding.lastVerseNumber) {
          fail(`${id} ${number}: invalid passage override at unit ${unitIndex + 1}; expected start ${expectedNext}`)
        }
        expectedNext = item.to + 1
        const unitCritical = criticalReferenceNumbers.filter((verse) => verse >= item.from && verse <= item.to)
        const anchors = resolveAnchors(item.sourceAnchorIds, blueprint.sources, `${id} ${number}:${item.from}-${item.to}`)
        if (!anchors.length) fail(`${id} ${number}:${item.from}-${item.to}: passage override requires sourceAnchorIds`)
        return {
          id: `${id}-${number}-${item.from}-${item.to}-source-first`,
          ref: `${recovered.name} ${number}:${item.from}-${item.to}`,
          verseStart: item.from,
          verseEnd: item.to,
          ...(unitCritical.length ? { criticalReferenceNumbers: unitCritical } : {}),
          heading: item.heading,
          teaching: item.teaching,
          sourceKind: "poonen-source-first",
          sourceIds: [...new Set(anchors.map((anchor) => anchor.sourceId))],
          sourceAnchors: anchors,
        }
      })
      if (expectedNext !== binding.lastVerseNumber + 1) fail(`${id} ${number}: passage override coverage ${expectedNext - 1}/${binding.lastVerseNumber}`)
      reviewState = "source-first-passage-rebuilt"
    } else {
      units = [{
        id: `${id}-${number}-source-first`,
        ref: `${recovered.name} ${number}:1-${binding.lastVerseNumber}`,
        verseStart: 1,
        verseEnd: binding.lastVerseNumber,
        ...(criticalReferenceNumbers.length ? { criticalReferenceNumbers } : {}),
        heading: chapterBlueprint.title,
        teaching: chapterBlueprint.teaching,
        sourceKind: "poonen-source-first",
        sourceIds: blueprint.sources,
      }]
      reviewState = "source-first-rebuilt"
    }
    totalUnits += units.length
    return {
      number,
      title: `${recovered.name} ${number} — ${chapterBlueprint.title}`,
      summary: chapterBlueprint.summary,
      units,
      status: "in_review",
      reviewState,
      emanusTextBinding: binding,
      provenance: {
        sourcePolicy: "poonen-source-first",
        sourceIds: blueprint.sources,
        passageSourceAnchorsComplete: reviewState === "source-first-passage-rebuilt",
        legacyGenericContentUsed: false,
      },
    }
  })

  const payload = {
    schema: "emanus-nt-source-first-v2",
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
  books.push({
    id,
    bookId: recovered.bookId,
    name: recovered.name,
    chapters: chapters.length,
    units: chapters.reduce((sum, chapter) => sum + chapter.units.length, 0),
    passageRebuiltChapters: chapters.filter((chapter) => chapter.reviewState === "source-first-passage-rebuilt").length,
    sources: blueprint.sources,
    sha256: sha256(rendered),
  })
}

if (books.length !== EXPECTED.books) fail(`books ${books.length}/${EXPECTED.books}`)
if (totalChapters !== EXPECTED.chapters) fail(`chapters ${totalChapters}/${EXPECTED.chapters}`)

const manifest = {
  schema: "emanus-nt-source-first-manifest-v2",
  status: "in_review",
  publicationReady: false,
  doctrinePolicy: "Where Poonen/CFC develops the passage, preserve doctrine, interpretation, typology and application without dilution. Modern-source provenance stays internal.",
  genericCompletionAllowed: false,
  counts: {
    books: books.length,
    chapters: totalChapters,
    units: totalUnits,
    passageRebuiltChapters: books.reduce((sum, book) => sum + book.passageRebuiltChapters, 0),
    chapterSummaryOnlyChapters: totalChapters - books.reduce((sum, book) => sum + book.passageRebuiltChapters, 0),
  },
  books,
}
fs.writeFileSync(manifestPath, stable(manifest), "utf8")
console.log(`NT source-first materialized: ${books.length} books / ${totalChapters} chapters / ${totalUnits} units.`)
console.log(`Passage rebuilt: ${manifest.counts.passageRebuiltChapters}; chapter-summary only: ${manifest.counts.chapterSummaryOnlyChapters}.`)
