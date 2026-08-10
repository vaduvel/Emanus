#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dataDir = path.join(ROOT, "docs", "data", "biblia-explicata")
const corpusDir = path.join(dataDir, "nt-final-source-first")
const evidencePath = path.join(dataDir, "nt-lexicon-source-evidence.json")

function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }
if (!fs.existsSync(corpusDir) || !fs.existsSync(evidencePath)) throw new Error("final corpus/evidence missing")
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"))
const byId = new Map((evidence.entries ?? []).map((entry) => [entry.reviewId, entry]))
const unresolved = []

for (const file of fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()) {
  const book = JSON.parse(fs.readFileSync(path.join(corpusDir, file), "utf8"))
  for (const chapter of book.chapters ?? []) {
    for (const unit of chapter.units ?? []) {
      for (const word of unit.words ?? []) {
        const meaning = String(word.meaning ?? "")
        const reviewId = sha256(`${book.id}\u0000${chapter.number}\u0000${unit.ref}\u0000${word.original}\u0000${meaning}`)
        const ev = byId.get(reviewId)
        if (!ev || !Array.isArray(ev.candidates) || ev.candidates.length === 0) {
          unresolved.push({
            bookId: book.id,
            chapter: chapter.number,
            ref: unit.ref,
            original: word.original,
            meaning,
            problem: ev?.morphgntProblem ?? "missing-evidence-record",
          })
        }
      }
    }
  }
}

if (unresolved.length) {
  console.error(`[NT lexicon evidence preflight] ${unresolved.length} unresolved retained entries:`)
  for (const item of unresolved) console.error(JSON.stringify(item))
  process.exit(1)
}
console.log(`NT lexicon evidence preflight: all retained entries have at least one pinned lexical candidate.`)
