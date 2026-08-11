#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const BOOK = path.join(ROOT, "docs/data/biblia-explicata/nt-final-source-first/20-iacov.json")
const SPEC = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-review-spec/20-iacov.json")

const sha = (value) => `sha256:${crypto.createHash("sha256").update(String(value)).digest("hex")}`
const snap = (unit) => JSON.stringify({
  heading: String(unit.heading ?? ""),
  teaching: String(unit.teaching ?? ""),
  forYourHeart: String(unit.forYourHeart ?? ""),
})
const fail = (message) => {
  console.error(`[Iacov snapshot binder] ${message}`)
  process.exit(1)
}

for (const filePath of [BOOK, SPEC]) if (!fs.existsSync(filePath)) fail(`missing ${path.relative(ROOT, filePath)}`)
const book = JSON.parse(fs.readFileSync(BOOK, "utf8"))
const spec = JSON.parse(fs.readFileSync(SPEC, "utf8"))
if (book.id !== "iacov") fail(`expected iacov book, got ${book.id}`)
const units = new Map()
for (const chapter of book.chapters ?? []) {
  for (const unit of chapter.units ?? []) units.set(unit.id, { chapter: chapter.number, unit })
}
const ids = Object.keys(spec)
if (ids.length !== 15) fail(`expected 15 frozen review decisions, got ${ids.length}`)
if (units.size !== 15) fail(`expected 15 Iacov units, found ${units.size}`)
for (const id of ids) {
  const located = units.get(id)
  if (!located) fail(`missing reviewed unit ${id}`)
  if (located.chapter !== spec[id]?.chapter) fail(`${id}: chapter drift`)
  spec[id].expectedCurrentSnapshotSha256 = sha(snap(located.unit))
}
fs.writeFileSync(SPEC, JSON.stringify(spec, null, 2) + "\n", "utf8")
console.log(`Iacov snapshot binder: froze ${ids.length} presemantic unit snapshots.`)
