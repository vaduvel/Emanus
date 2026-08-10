#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dataDir = path.join(ROOT, "docs", "data", "biblia-explicata")
const ledgerPath = path.join(dataDir, "nt-semantic-review-ledger.json")
const layers = [
  { dir: path.join(dataDir, "nt-reviewed-recovered"), manifest: path.join(dataDir, "nt-reviewed-recovered-manifest.json") },
  { dir: path.join(dataDir, "nt-source-first"), manifest: path.join(dataDir, "nt-source-first-manifest.json") },
]

function fail(message) { console.error(`[NT semantic review apply] ${message}`); process.exit(1) }
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha256(value) { return `sha256:${crypto.createHash("sha256").update(String(value ?? "")).digest("hex")}` }
function snapshot(unit) {
  return JSON.stringify({ heading: String(unit.heading ?? ""), teaching: String(unit.teaching ?? ""), forYourHeart: String(unit.forYourHeart ?? "") })
}
function fileSha(raw) { return crypto.createHash("sha256").update(raw).digest("hex") }

if (!fs.existsSync(ledgerPath)) {
  console.log("NT semantic review apply: ledger absent; 0 decisions applied.")
  process.exit(0)
}
const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"))
if (ledger.schema !== "emanus-nt-semantic-review-ledger-v1" || !Array.isArray(ledger.decisions)) fail("invalid semantic review ledger")
const seen = new Set()
let applied = 0
let rewritten = 0
const touched = new Map()

for (const decision of ledger.decisions) {
  const key = `${decision.bookId}\u0000${decision.chapter}\u0000${decision.unitId}`
  if (seen.has(key)) fail(`duplicate decision ${decision.bookId} ${decision.unitId}`)
  seen.add(key)
  if (decision.status !== "approved-against-transcript") fail(`${decision.unitId}: unsupported decision status ${decision.status}`)
  if (!/^sha256:[0-9a-f]{64}$/i.test(decision.reviewedTeachingSha256 ?? "")) fail(`${decision.unitId}: reviewedTeachingSha256 missing/invalid`)
  if (!Array.isArray(decision.transcriptEvidence) || !decision.transcriptEvidence.length) fail(`${decision.unitId}: transcriptEvidence missing`)
  if (typeof decision.rationale !== "string" || !decision.rationale.trim()) fail(`${decision.unitId}: rationale missing`)

  const matches = []
  for (const layer of layers) {
    if (!fs.existsSync(layer.dir)) continue
    for (const name of fs.readdirSync(layer.dir).filter((item) => item.endsWith(".json"))) {
      const full = path.join(layer.dir, name)
      const book = JSON.parse(fs.readFileSync(full, "utf8"))
      if (book.id !== decision.bookId) continue
      const chapter = (book.chapters ?? []).find((item) => item.number === decision.chapter)
      const unit = (chapter?.units ?? []).find((item) => item.id === decision.unitId)
      if (unit) matches.push({ layer, full, book, unit })
    }
  }
  if (matches.length !== 1) fail(`${decision.unitId}: expected exactly one source-layer unit, found ${matches.length}`)
  const { layer, full, book, unit } = matches[0]

  if (decision.action === "rewrite") {
    if (typeof decision.revisedTeaching !== "string" || !decision.revisedTeaching.trim()) fail(`${decision.unitId}: rewrite lacks revisedTeaching`)
    unit.teaching = decision.revisedTeaching
    if (Object.prototype.hasOwnProperty.call(decision, "revisedForYourHeart")) {
      if (decision.revisedForYourHeart !== null && typeof decision.revisedForYourHeart !== "string") fail(`${decision.unitId}: invalid revisedForYourHeart`)
      if (decision.revisedForYourHeart) unit.forYourHeart = decision.revisedForYourHeart
      else delete unit.forYourHeart
    }
    rewritten += 1
  } else if (decision.action !== "keep") {
    fail(`${decision.unitId}: action must be keep or rewrite`)
  }

  const currentHash = sha256(snapshot(unit))
  if (currentHash !== decision.reviewedTeachingSha256) {
    fail(`${decision.unitId}: semantic decision stale after applying action; ${currentHash} != ${decision.reviewedTeachingSha256}`)
  }

  unit.sourceFidelity = {
    ...(unit.sourceFidelity ?? {}),
    semanticReview: {
      status: "approved-against-transcript",
      reviewedTeachingSha256: decision.reviewedTeachingSha256,
      transcriptEvidence: decision.transcriptEvidence,
      rationale: decision.rationale,
      reviewer: decision.reviewer ?? "AI-assisted semantic transcript review",
      reviewedOn: decision.reviewedOn ?? null,
      ...(decision.supplementalResearch ? { supplementalResearch: decision.supplementalResearch } : {}),
    },
  }
  fs.writeFileSync(full, stable(book), "utf8")
  touched.set(layer.manifest, layer.dir)
  applied += 1
}

for (const [manifestPath, dir] of touched.entries()) {
  if (!fs.existsSync(manifestPath)) fail(`missing manifest ${path.basename(manifestPath)}`)
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
  for (const entry of manifest.books ?? []) {
    const file = fs.readdirSync(dir).find((name) => name.endsWith(`-${entry.id}.json`))
    if (!file) continue
    const raw = fs.readFileSync(path.join(dir, file), "utf8")
    entry.sha256 = fileSha(raw)
    const parsed = JSON.parse(raw)
    entry.units = (parsed.chapters ?? []).reduce((sum, chapter) => sum + (chapter.units?.length ?? 0), 0)
  }
  manifest.semanticReview = {
    status: "partial-or-complete",
    appliedDecisions: ledger.decisions.length,
    ledgerSchema: ledger.schema,
  }
  fs.writeFileSync(manifestPath, stable(manifest), "utf8")
}

console.log(`NT semantic review apply: ${applied} decisions applied; ${rewritten} units rewritten.`)
