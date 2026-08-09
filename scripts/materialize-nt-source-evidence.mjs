#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"
import { NT_SOURCE_EVIDENCE_BLUEPRINTS } from "./nt-source-evidence-blueprints.mjs"
import { NT_SOURCE_EVIDENCE_WAVE_A } from "./nt-source-evidence-wave-a.mjs"
import { NT_SOURCE_EVIDENCE_WAVE_B } from "./nt-source-evidence-wave-b.mjs"

const ROOT = process.cwd()
const outputPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-evidence.json")

function fail(message) { console.error(`[NT source evidence] ${message}`); process.exit(1) }
function stableRecord(value) { return JSON.stringify(value, Object.keys(value).sort(), 0) }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }

const allBlueprints = [...NT_SOURCE_EVIDENCE_BLUEPRINTS, ...NT_SOURCE_EVIDENCE_WAVE_A, ...NT_SOURCE_EVIDENCE_WAVE_B]
const ids = new Set()
const records = allBlueprints.map((input) => {
  if (!input?.id || !input.sourceId || !input.sourceUrl || !input.locator || !input.claimSummary) fail(`invalid evidence record ${input?.id ?? "<missing-id>"}`)
  if (ids.has(input.id)) fail(`duplicate evidence id ${input.id}`)
  ids.add(input.id)
  const payload = {
    id: input.id,
    sourceId: input.sourceId,
    sourceUrl: input.sourceUrl,
    ...(input.officialSeriesUrl ? { officialSeriesUrl: input.officialSeriesUrl } : {}),
    sourceTitle: input.sourceTitle,
    locator: input.locator,
    evidenceKind: input.evidenceKind,
    verificationLevel: input.verificationLevel,
    claimSummary: input.claimSummary,
  }
  return { ...payload, evidenceSha256: `sha256:${sha256(stableRecord(payload))}` }
})

const output = {
  schema: "emanus-nt-source-evidence-v1",
  policy: "Each evidenceSha256 hashes the stable local evidence record (source URL + locator + reviewed paraphrased claim). It is not represented as a hash of third-party source bytes. Final source traceability also requires the locator to remain independently reviewable.",
  count: records.length,
  records,
}
fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n", "utf8")
console.log(`NT source evidence materialized: ${records.length} reviewed locator records.`)
