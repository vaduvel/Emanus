#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const DIRS = [
  path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered"),
  path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-first"),
]

function fail(message) {
  console.error(`[NT lexicon editorial fixes wave 3] ${message}`)
  process.exit(1)
}

const UPDATE = [
  {
    bookId: "matei", chapter: 10, ref: "Matei 10:24-33",
    original: "φοβέομαι", originalAfter: "φοβεῖσθε",
    before: "a se teme; după obiect și context, poate fi groază ori respect sfânt.",
    after: "nu vă temeți / vă temeți; formă a verbului φοβέομαι, «a se teme»."
  },
  {
    bookId: "ioan", chapter: 5, ref: "Ioan 5:19-30",
    original: "ζωὴ ἐν ἑαυτῷ", originalAfter: "ζωὴν ἐν ἑαυτῷ",
    before: "viață în Sine; ζωή = viață, ἐν = în, ἑαυτῷ = în Sine/în el însuși.",
    after: "viață în Sine; ζωή = viață, ἐν = în, ἑαυτῷ = în Sine/în el însuși."
  },
  {
    bookId: "ioan", chapter: 12, ref: "Ioan 12:37-50",
    original: "δόξα τῶν ἀνθρώπων", originalAfter: "τὴν δόξαν τῶν ἀνθρώπων",
    before: "slava oamenilor. Aprobarea omeneasca iubita mai mult decât cinstea lui Dumnezeu.",
    after: "slava oamenilor; în context, aprobarea omenească iubită mai mult decât cinstea lui Dumnezeu."
  },
  {
    bookId: "ioan", chapter: 13, ref: "Ioan 13:31-38",
    original: "ἐντολή καινή", originalAfter: "ἐντολὴν καινὴν",
    before: "porunca noua. Porunca iubirii în masura lui Hristos.",
    after: "poruncă nouă; ἐντολή = poruncă, καινός = nou."
  },
  {
    bookId: "ioan", chapter: 15, ref: "Ioan 15:12-17",
    original: "τίθημι τὴν ψυχήν", originalAfter: "τὴν ψυχὴν αὐτοῦ θῇ",
    before: "a-și pune viața. Limbaj al jertfirii de sine.",
    after: "să-și pună viața; θῇ este formă a verbului τίθημι, «a pune», iar ψυχή poate însemna aici «viață»."
  },
  {
    bookId: "ioan", chapter: 19, ref: "Ioan 19:17-30",
    original: "παραδίδωμι τὸ πνεῦμα", originalAfter: "παρέδωκεν τὸ πνεῦμα",
    before: "a da, a preda duhul; παραδίδωμι = a da/preda, πνεῦμα = duh/spirit.",
    after: "a dat/a predat duhul; παρέδωκεν este formă a verbului παραδίδωμι, «a da/preda», iar πνεῦμα = duh/spirit."
  }
]

const REMOVE = [
  {
    bookId: "marcu", chapter: 1, ref: "Marcu 1:40-45",
    original: "σπλαγχνίζομαι",
    meaning: "a avea milă, a simți compasiune profundă; în context, mila lui Isus față de omul necurat.",
    reason: "Text-critical dependency: MorphGNT SBLGNT 6.12 reads ὀργισθείς at Mark 1:41. Do not publish a lexical note for σπλαγχνίζομαι until the final Emanus NT textual decision is frozen."
  }
]

const files = []
for (const dir of DIRS) {
  if (!fs.existsSync(dir)) fail(`missing corpus ${path.relative(ROOT, dir)}`)
  for (const name of fs.readdirSync(dir).filter((item) => item.endsWith(".json"))) files.push(path.join(dir, name))
}

function targets(op) {
  const hits = []
  for (const file of files) {
    const book = JSON.parse(fs.readFileSync(file, "utf8"))
    if (book.id !== op.bookId) continue
    const chapter = (book.chapters ?? []).find((item) => item.number === op.chapter)
    if (!chapter) continue
    for (const unit of chapter.units ?? []) {
      if (unit.ref !== op.ref) continue
      for (let index = 0; index < (unit.words ?? []).length; index += 1) {
        const word = unit.words[index]
        if (word.original === op.original) hits.push({ file, book, unit, index, word })
      }
    }
  }
  return hits
}

let updated = 0
let removed = 0
for (const op of UPDATE) {
  const hits = targets(op)
  if (hits.length !== 1) fail(`${op.ref} ${op.original}: expected exactly one target, found ${hits.length}`)
  const hit = hits[0]
  if (hit.word.meaning !== op.before) fail(`${op.ref} ${op.original}: current meaning changed unexpectedly: ${hit.word.meaning}`)
  hit.word.original = op.originalAfter
  hit.word.meaning = op.after
  fs.writeFileSync(hit.file, JSON.stringify(hit.book, null, 2) + "\n", "utf8")
  updated += 1
}
for (const op of REMOVE) {
  const hits = targets(op)
  if (hits.length !== 1) fail(`${op.ref} ${op.original}: expected exactly one removal target, found ${hits.length}`)
  const hit = hits[0]
  if (hit.word.meaning !== op.meaning) fail(`${op.ref} ${op.original}: current removal meaning changed unexpectedly: ${hit.word.meaning}`)
  hit.unit.words.splice(hit.index, 1)
  fs.writeFileSync(hit.file, JSON.stringify(hit.book, null, 2) + "\n", "utf8")
  removed += 1
}

console.log(`NT lexicon editorial fixes wave 3: ${updated} exact passage-form notes aligned / ${removed} text-critical lexical note deferred to final canonical freeze.`)
