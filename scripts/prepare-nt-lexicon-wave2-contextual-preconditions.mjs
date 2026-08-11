#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const CORPUS_DIRS = [
  path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered"),
  path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-first"),
]

function fail(message) {
  console.error(`[NT lexicon wave2 contextual preconditions] ${message}`)
  process.exit(1)
}

const FIXES = [
  {
    bookId: "ioan",
    chapter: 2,
    ref: "Ioan 2:1-12",
    original: "δόξα",
    before: "slava. Frumusetea și greutatea dumnezeiasca aratate in Fiul.",
    after: "slava. Frumusetea și greutatea dumnezeiasca aratate în Fiul.",
    rationale: "Standalone `in` is the Romanian preposition in this exact lexical sentence, not the noun `in` (flax).",
  },
  {
    bookId: "ioan",
    chapter: 5,
    ref: "Ioan 5:19-30",
    original: "ζωὴ ἐν ἑαυτῷ",
    before: "viata in Sine. Viață neîmprumutată, proprie dumnezeirii.",
    after: "viata în Sine. Viață neîmprumutată, proprie dumnezeirii.",
    rationale: "Standalone `in` is the Romanian preposition in the exact phrase `viața în Sine`; the lexical wave will perform the separately reviewed final wording replacement.",
  },
]

function findTargets(op) {
  const hits = []
  for (const dir of CORPUS_DIRS) {
    if (!fs.existsSync(dir)) continue
    for (const file of fs.readdirSync(dir).filter((name) => name.endsWith(".json"))) {
      const full = path.join(dir, file)
      const book = JSON.parse(fs.readFileSync(full, "utf8"))
      if (book.id !== op.bookId) continue
      const chapter = (book.chapters ?? []).find((item) => Number(item.number) === op.chapter)
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

let changed = 0
for (const op of FIXES) {
  const hits = findTargets(op)
  // Exactly one of the two deterministic corpora should own this target at this pipeline stage.
  if (hits.length !== 1) fail(`${op.ref} ${op.original}: expected exactly one target, found ${hits.length}`)
  const hit = hits[0]
  if (hit.word.meaning === op.after) {
    console.log(`${op.ref} ${op.original}: contextual precondition already current.`)
    continue
  }
  if (hit.word.meaning !== op.before) {
    fail(`${op.ref} ${op.original}: unexpected precondition text: ${hit.word.meaning}`)
  }
  hit.word.meaning = op.after
  fs.writeFileSync(hit.full, JSON.stringify(hit.book, null, 2) + "\n", "utf8")
  changed += 1
  console.log(`${op.ref} ${op.original}: ${op.rationale}`)
}

console.log(`NT lexicon wave2 contextual preconditions: ${changed}/${FIXES.length} exact changes applied.`)
