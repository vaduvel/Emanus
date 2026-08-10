#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const BOOK = path.join(ROOT, "docs/data/biblia-explicata/nt-final-source-first/23-1-ioan.json")
const SPEC = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-review-spec/23-1-ioan.json")

const sha = (value) => `sha256:${crypto.createHash("sha256").update(String(value)).digest("hex")}`
const snap = (unit) => JSON.stringify({
  heading: String(unit.heading ?? ""),
  teaching: String(unit.teaching ?? ""),
  forYourHeart: String(unit.forYourHeart ?? ""),
})

if (!fs.existsSync(BOOK) || !fs.existsSync(SPEC)) {
  console.error("[1 Ioan snapshot diagnostic] missing book or review spec")
  process.exit(1)
}

const book = JSON.parse(fs.readFileSync(BOOK, "utf8"))
const review = JSON.parse(fs.readFileSync(SPEC, "utf8"))
const units = new Map()
for (const chapter of book.chapters ?? []) {
  for (const unit of chapter.units ?? []) units.set(unit.id, unit)
}

const drifts = []
for (const [id, spec] of Object.entries(review)) {
  const unit = units.get(id)
  if (!unit) {
    drifts.push({ id, problem: "missing-unit" })
    continue
  }
  const snapshot = snap(unit)
  const currentSha = sha(snapshot)
  if (currentSha !== spec.expectedCurrentSnapshotSha256) {
    drifts.push({
      id,
      expectedSha: spec.expectedCurrentSnapshotSha256,
      currentSha,
      snapshot: JSON.parse(snapshot),
    })
  }
}

console.log(`[1 Ioan snapshot diagnostic] ${drifts.length} drift(s) across ${Object.keys(review).length} reviewed units.`)
for (const drift of drifts) {
  console.log("--- 1 IOAN SNAPSHOT DRIFT ---")
  console.log(JSON.stringify(drift, null, 2))
}
if (drifts.length) process.exit(1)
console.log("All 1 Ioan reviewed pre-edit snapshots are stable.")
