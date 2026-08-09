#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"
import { NT_SOURCE_EVIDENCE_BLUEPRINTS } from "./nt-source-evidence-blueprints.mjs"
import { NT_SOURCE_EVIDENCE_WAVE_A } from "./nt-source-evidence-wave-a.mjs"
import { NT_SOURCE_EVIDENCE_WAVE_B } from "./nt-source-evidence-wave-b.mjs"
import { NT_SOURCE_EVIDENCE_WAVE_C } from "./nt-source-evidence-wave-c.mjs"
import { NT_SOURCE_EVIDENCE_WAVE_D } from "./nt-source-evidence-wave-d.mjs"

const ROOT = process.cwd()
const outputPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-evidence.json")
const sourceRegistryDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-registry")

const RECOVERED_EPISODE_REGISTRIES = [
  ["matei", "legacy-poonen-matthew", "matei-poonen-playlist.json"],
  ["marcu", "legacy-poonen-mark", "marcu-poonen-playlist.json"],
  ["luca", "legacy-poonen-luke", "luca-poonen-source.json"],
  ["fapte", "legacy-poonen-acts", "fapte-poonen-source.json"],
  ["romani", "legacy-poonen-romans", "romani-poonen-source.json"],
  ["1-corinteni", "legacy-poonen-1cor", "1-corinteni-poonen-source.json"],
  ["2-corinteni", "legacy-poonen-2cor", "2-corinteni-poonen-source.json"],
  ["galateni", "legacy-poonen-galatians", "galateni-poonen-source.json"],
  ["efeseni", "legacy-poonen-ephesians", "efeseni-poonen-source.json"],
  ["filipeni", "legacy-poonen-philippians", "filipeni-poonen-source.json"],
  ["coloseni", "legacy-poonen-colossians", "coloseni-poonen-source.json"],
  ["1-tesaloniceni", "legacy-poonen-1thess", "1-tesaloniceni-poonen-source.json"],
  ["filimon", "legacy-poonen-philemon", "filimon-poonen-source.json"],
]

function fail(message) { console.error(`[NT source evidence] ${message}`); process.exit(1) }
function stableRecord(value) { return JSON.stringify(value, Object.keys(value).sort(), 0) }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }
function parseRange(value, label) {
  const match = String(value ?? "").match(/(\d+):(\d+)\s*-\s*(\d+):(\d+)/u)
  if (!match) fail(`${label}: cannot parse passage range ${JSON.stringify(value)}`)
  const [, startChapter, startVerse, endChapter, endVerse] = match
  const coverage = {
    coverageStartChapter: Number(startChapter), coverageStartVerse: Number(startVerse),
    coverageEndChapter: Number(endChapter), coverageEndVerse: Number(endVerse),
  }
  if (coverage.coverageStartChapter > coverage.coverageEndChapter || (coverage.coverageStartChapter === coverage.coverageEndChapter && coverage.coverageStartVerse > coverage.coverageEndVerse)) fail(`${label}: invalid passage range ${value}`)
  return coverage
}
function recoveredEpisodeBlueprints() {
  const out = []
  for (const [bookId, sourceId, fileName] of RECOVERED_EPISODE_REGISTRIES) {
    const file = path.join(sourceRegistryDir, fileName)
    if (!fs.existsSync(file)) continue
    const registry = JSON.parse(fs.readFileSync(file, "utf8"))
    if (!Array.isArray(registry.episodes) || !registry.episodes.length) continue
    const officialSeriesUrl = registry.canonicalPage ?? registry.playlistUrl
    if (!officialSeriesUrl) fail(`${fileName}: canonical/playlist URL missing`)
    for (const episode of registry.episodes) {
      const ordinal = episode.number ?? episode.position
      const passage = episode.range ?? episode.passage
      if (!Number.isInteger(ordinal) || !passage || !episode.title) fail(`${fileName}: invalid episode metadata`)
      const coverage = parseRange(passage, `${fileName} episode ${ordinal}`)
      const sourceUrl = episode.audioUrl ?? episode.url ?? officialSeriesUrl
      out.push({
        id: `ev-recovered-${bookId}-episode-${String(ordinal).padStart(3, "0")}`,
        sourceId, sourceUrl, officialSeriesUrl, sourceTitle: episode.title,
        locator: `Episode ${ordinal}: ${passage}`, evidenceKind: "official-episode-range",
        verificationLevel: "official-episode-range-registry",
        claimSummary: `Registrul sursei oficiale indică faptul că episodul ${ordinal} acoperă ${passage}.`,
        ...coverage,
      })
    }
  }
  return out
}

const allBlueprints = [
  ...NT_SOURCE_EVIDENCE_BLUEPRINTS,
  ...NT_SOURCE_EVIDENCE_WAVE_A,
  ...NT_SOURCE_EVIDENCE_WAVE_B,
  ...NT_SOURCE_EVIDENCE_WAVE_C,
  ...NT_SOURCE_EVIDENCE_WAVE_D,
  ...recoveredEpisodeBlueprints(),
]
const ids = new Set()
const records = allBlueprints.map((input) => {
  if (!input?.id || !input.sourceId || !input.sourceUrl || !input.locator || !input.claimSummary) fail(`invalid evidence record ${input?.id ?? "<missing-id>"}`)
  if (ids.has(input.id)) fail(`duplicate evidence id ${input.id}`)
  ids.add(input.id)
  const payload = {
    id: input.id, sourceId: input.sourceId, sourceUrl: input.sourceUrl,
    ...(input.officialSeriesUrl ? { officialSeriesUrl: input.officialSeriesUrl } : {}),
    sourceTitle: input.sourceTitle, locator: input.locator, evidenceKind: input.evidenceKind,
    verificationLevel: input.verificationLevel, claimSummary: input.claimSummary,
    ...(Number.isInteger(input.coverageStartChapter) ? {
      coverageStartChapter: input.coverageStartChapter, coverageStartVerse: input.coverageStartVerse,
      coverageEndChapter: input.coverageEndChapter, coverageEndVerse: input.coverageEndVerse,
    } : {}),
  }
  return { ...payload, evidenceSha256: `sha256:${sha256(stableRecord(payload))}` }
})

const recoveredEpisodeRecords = records.filter((record) => record.evidenceKind === "official-episode-range").length
const output = {
  schema: "emanus-nt-source-evidence-v1",
  policy: "Each evidenceSha256 hashes the stable local evidence record (source URL + locator + reviewed or registry-derived claim). It is not represented as a hash of third-party source bytes. Final source traceability also requires the locator to remain independently reviewable.",
  count: records.length,
  recoveredEpisodeRecords,
  records,
}
fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n", "utf8")
console.log(`NT source evidence materialized: ${records.length} locator records (${recoveredEpisodeRecords} recovered-book episode records).`)
