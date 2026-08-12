#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const BOOK = path.join(ROOT, "docs/data/biblia-explicata/nt-final-source-first/15-1-timotei.json")
const SPEC = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-review-spec/15-1-timotei.json")

const sha = (value) => `sha256:${crypto.createHash("sha256").update(String(value)).digest("hex")}`
const snap = (unit) => JSON.stringify({
  heading: String(unit.heading ?? ""),
  teaching: String(unit.teaching ?? ""),
  forYourHeart: String(unit.forYourHeart ?? ""),
})
const fail = (message) => {
  console.error(`[1 Timotei snapshot binder] ${message}`)
  process.exit(1)
}
for (const p of [BOOK, SPEC]) if (!fs.existsSync(p)) fail(`missing ${path.relative(ROOT, p)}`)
const book = JSON.parse(fs.readFileSync(BOOK, "utf8"))
const spec = JSON.parse(fs.readFileSync(SPEC, "utf8"))
if (book.id !== "1-timotei") fail(`expected 1-timotei book, got ${book.id}`)
if (spec.schema !== "emanus-manual-review-spec-v2" || spec.bookId !== "1-timotei" || !spec.decisions) fail("unexpected review spec")
const decisions = spec.decisions
const ids = Object.keys(decisions)
if (ids.length !== 22) fail(`expected 22 frozen decisions, got ${ids.length}`)
const units = new Map()
for (const chapter of book.chapters ?? []) for (const unit of chapter.units ?? []) units.set(unit.id, { chapter: chapter.number, unit })
if (units.size !== 22) fail(`expected 22 current units, got ${units.size}`)
for (const id of ids) {
  const located = units.get(id)
  if (!located) fail(`missing reviewed unit ${id}`)
  if (located.chapter !== decisions[id]?.chapter) fail(`${id}: chapter drift`)
  decisions[id].expectedCurrentSnapshotSha256 = sha(snap(located.unit))
}
fs.writeFileSync(SPEC, JSON.stringify(spec, null, 2) + "\n", "utf8")
console.log(`1 Timotei snapshot binder: froze ${ids.length} exact presemantic reader-copy snapshots.`)
