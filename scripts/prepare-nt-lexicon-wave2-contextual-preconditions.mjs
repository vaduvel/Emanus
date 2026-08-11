#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import vm from "node:vm"

const ROOT = process.cwd()
const WAVE2 = path.join(ROOT, "scripts", "review-nt-lexicon-editorial-fixes-wave-2.mjs")
const CORPUS_DIRS = [
  path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered"),
  path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-first"),
]

function fail(message) {
  console.error(`[NT lexicon wave2 contextual preconditions] ${message}`)
  process.exit(1)
}
function stripDiacritics(value) {
  return String(value)
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[șş]/gu, "s")
    .replace(/[țţ]/gu, "t")
    .normalize("NFC")
}
function loadWave2Update() {
  const source = fs.readFileSync(WAVE2, "utf8")
  const marker = "const UPDATE = ["
  const start = source.indexOf(marker)
  if (start < 0) fail("wave2 UPDATE array marker missing")
  const open = source.indexOf("[", start)
  const nextMarker = source.indexOf("\nconst REMOVE", open)
  if (nextMarker < 0) fail("wave2 REMOVE marker missing")
  const close = source.lastIndexOf("]", nextMarker)
  if (close < open) fail("wave2 UPDATE array close missing")
  const arraySource = source.slice(open, close + 1)
  let updates
  try {
    updates = vm.runInNewContext(`(${arraySource})`, Object.create(null), { timeout: 1000 })
  } catch (error) {
    fail(`could not parse source-controlled wave2 UPDATE array: ${error}`)
  }
  if (!Array.isArray(updates) || updates.length !== 41) fail(`expected exactly 41 wave2 UPDATE entries, found ${updates?.length}`)
  return updates
}
function findTargets(op) {
  const hits = []
  for (const dir of CORPUS_DIRS) {
    if (!fs.existsSync(dir)) continue
    for (const file of fs.readdirSync(dir).filter((name) => name.endsWith(".json"))) {
      const full = path.join(dir, file)
      const book = JSON.parse(fs.readFileSync(full, "utf8"))
      if (book.id !== op.bookId) continue
      const chapter = (book.chapters ?? []).find((item) => Number(item.number) === Number(op.chapter))
      if (!chapter) continue
      for (const unit of chapter.units ?? []) {
        if (unit.ref !== op.ref) continue
        for (const word of unit.words ?? []) {
          if (word.original === op.original) hits.push({ full, book, word })
        }
      }
    }
  }
  return hits
}

const updates = loadWave2Update()
let changed = 0
let alreadyExact = 0
const changedRows = []
for (const op of updates) {
  if (typeof op.before !== "string" || typeof op.after !== "string") fail(`${op.ref} ${op.original}: malformed wave2 strings`)
  const hits = findTargets(op)
  if (hits.length !== 1) fail(`${op.ref} ${op.original}: expected exactly one pre-wave2 target, found ${hits.length}`)
  const hit = hits[0]
  const current = String(hit.word.meaning ?? "")
  if (current === op.before) {
    alreadyExact += 1
    continue
  }
  // This bridge may repair only Unicode diacritics for the exact lexical target.
  // Word order, whitespace, punctuation and base letters must already match the
  // explicitly reviewed wave-2 `before` value. Any semantic drift remains fatal.
  if (stripDiacritics(current) !== stripDiacritics(op.before)) {
    fail(`${op.ref} ${op.original}: precondition differs by more than diacritics; current=${JSON.stringify(current)} expected=${JSON.stringify(op.before)}`)
  }
  hit.word.meaning = op.before
  fs.writeFileSync(hit.full, JSON.stringify(hit.book, null, 2) + "\n", "utf8")
  changed += 1
  changedRows.push({ ref: op.ref, original: op.original, before: current, exactApprovedPrecondition: op.before })
}

if (changed + alreadyExact !== 41) fail(`reconciliation accounting drift: ${changed}+${alreadyExact} != 41`)
console.log(`NT lexicon wave2 contextual preconditions: ${changed} diacritics-only reconciliations + ${alreadyExact} already exact = 41/41.`)
for (const row of changedRows) console.log(`LEXICON_PRECONDITION ${row.ref} ${row.original}: ${JSON.stringify(row.before)} -> ${JSON.stringify(row.exactApprovedPrecondition)}`)
