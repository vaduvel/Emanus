#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const evidencePath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-evidence.json")
const outputPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-semantic-review-index.json")

function fail(message) { console.error(`[NT semantic review index] ${message}`); process.exit(1) }
if (!fs.existsSync(corpusDir) || !fs.existsSync(evidencePath)) fail("final corpus/source evidence missing")
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"))
const byId = new Map((evidence.records ?? []).map((item) => [item.id, item]))
const transcriptLike = (url) => /sermonindex\.net\/speakers\/zac-poonen\//i.test(String(url ?? ""))

const rows = []
const groups = new Map()
const byBook = {}
for (const file of fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()) {
  const book = JSON.parse(fs.readFileSync(path.join(corpusDir, file), "utf8"))
  const counts = { units: 0, raw: 0, transcriptAddressable: 0, needsTranscriptRecovery: 0 }
  for (const chapter of book.chapters ?? []) {
    for (const unit of chapter.units ?? []) {
      counts.units += 1
      if (unit.sourceFidelity?.reviewState === "reviewed-against-raw-transcript") {
        counts.raw += 1
        continue
      }
      const records = (unit.sourceAnchors ?? []).map((anchor) => byId.get(anchor.evidenceId)).filter(Boolean)
      const transcriptRecords = records.filter((record) => transcriptLike(record.sourceUrl))
      const urls = [...new Set(transcriptRecords.map((record) => record.sourceUrl))]
      const row = {
        bookId: book.id,
        chapter: chapter.number,
        unitId: unit.id,
        ref: unit.ref,
        sourceReviewState: unit.sourceFidelity?.reviewState ?? null,
        evidenceIds: (unit.sourceAnchors ?? []).map((anchor) => anchor.evidenceId),
        transcriptUrls: urls,
        transcriptAddressable: urls.length > 0,
      }
      rows.push(row)
      if (urls.length) {
        counts.transcriptAddressable += 1
        for (const url of urls) {
          const key = url
          const group = groups.get(key) ?? { transcriptUrl: url, units: [] }
          group.units.push({ bookId: book.id, chapter: chapter.number, unitId: unit.id, ref: unit.ref })
          groups.set(key, group)
        }
      } else counts.needsTranscriptRecovery += 1
    }
  }
  byBook[book.id] = counts
}
const transcriptAddressable = rows.filter((row) => row.transcriptAddressable).length
const needsTranscriptRecovery = rows.length - transcriptAddressable
const output = {
  schema: "emanus-nt-semantic-review-index-v1",
  policy: "Discovery only. A transcript URL makes a unit review-addressable but does not approve semantic fidelity. Official CFC source attribution remains primary; SermonIndex is transcript representation only.",
  counts: {
    pendingUnits: rows.length,
    transcriptAddressable,
    needsTranscriptRecovery,
    transcriptGroups: groups.size,
  },
  byBook,
  transcriptGroups: [...groups.values()].sort((a,b) => a.transcriptUrl.localeCompare(b.transcriptUrl)),
  unitsNeedingTranscriptRecovery: rows.filter((row) => !row.transcriptAddressable),
}
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n", "utf8")
console.log(`NT semantic review index: ${transcriptAddressable}/${rows.length} pending units already have transcript URLs; ${needsTranscriptRecovery} need transcript recovery; ${groups.size} transcript groups.`)
