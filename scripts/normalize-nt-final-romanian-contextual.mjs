#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const DIRS = [
  path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered"),
  path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-first"),
]
const ledgerPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-romanian-contextual-ledger.json")
function fail(message) { console.error(`[NT final Romanian contextual] ${message}`); process.exit(1) }

// Every operation below comes from an inspected sentence in the final corpus.
// The same ASCII token may be correct elsewhere (e.g. infinitive "a sta"), so
// these edits are bound to the exact book/chapter/field or unit field.
const OPS = [
  // sta -> stă (14 inspected finite forms)
  ["ioan",1,null,"literaryContext","sta","stă",1],
  ["ioan",1,"ioan-1-1-5","teaching","sta","stă",1],
  ["ioan",1,"ioan-1-6-13","teaching","sta","stă",1],
  ["ioan",1,"ioan-1-6-13","forYourHeart","sta","stă",1],
  ["ioan",1,"ioan-1-14-18","teaching","sta","stă",1],
  ["ioan",1,"ioan-1-19-34","teaching","sta","stă",2],
  ["ioan",2,null,"literaryContext","sta","stă",1],
  ["ioan",6,"ioan-6-60-71","teaching","sta","stă",1],
  ["ioan",10,"ioan-10-19-30","teaching","sta","stă",1],
  ["ioan",11,null,"literaryContext","sta","stă",1],
  ["ioan",11,null,"prayer","sta","stă",1],
  ["ioan",11,"ioan-11-28-46","teaching","sta","stă",1],
  ["ioan",12,"ioan-12-1-19","teaching","sta","stă",1],

  // intra -> intră (10 inspected finite forms; infinitives remain untouched)
  ["ioan",1,null,"literaryContext","intra","intră",1],
  ["ioan",1,"ioan-1-6-13","teaching","intra","intră",1],
  ["ioan",2,"ioan-2-1-12","teaching","intra","intră",1],
  ["ioan",4,"ioan-4-27-42","teaching","intra","intră",1],
  ["ioan",5,"ioan-5-1-18","teaching","intra","intră",1],
  ["ioan",12,null,"summary","intra","intră",1],
  ["ioan",12,"ioan-12-1-19","teaching","intra","intră",1],
  ["ioan",13,"ioan-13-18-30","teaching","intra","intră",1],
  ["evrei",9,"evrei-9-1-10-source-first","teaching","intra","intră",1],
  ["evrei",9,"evrei-9-23-28-source-first","teaching","intra","intră",1],

  // afla -> află (6 inspected finite forms)
  ["marcu",8,null,"historicalContext","afla","află",1],
  ["luca",24,null,"historicalContext","afla","află",1],
  ["ioan",1,null,"historicalContext","afla","află",1],
  ["ioan",4,"ioan-4-1-26","teaching","afla","află",1],
  ["fapte",13,null,"historicalContext","afla","află",1],
  ["fapte",28,null,"historicalContext","afla","află",1],

  // persoana: only the inspected indefinite noun is wrong; definite forms stay.
  ["ioan",1,null,"historicalContext","persoana","persoană",1],

  // cauta -> caută (9 inspected present/imperative forms; no infinitives in this set)
  ["ioan",6,"ioan-6-1-21","forYourHeart","cauta","caută",1],
  ["ioan",7,"ioan-7-1-24","teaching","cauta","caută",1],
  ["ioan",8,"ioan-8-1-20","teaching","cauta","caută",1],
  ["ioan",9,"ioan-9-1-12","teaching","cauta","caută",1],
  ["ioan",9,"ioan-9-35-41","teaching","cauta","caută",1],
  ["ioan",9,"ioan-9-35-41","forYourHeart","cauta","caută",1],
  ["ioan",12,"ioan-12-1-19","forYourHeart","cauta","caută",1],
  ["ioan",12,"ioan-12-20-36","forYourHeart","cauta","caută",1],
  ["ioan",12,"ioan-12-37-50","forYourHeart","cauta","caută",1],

  // Final finite-verb sweep from contextual batches 03-05.
  ["marcu",7,"marcu-7-14-23","teaching","declara","declară",1],
  ["ioan",8,null,"literaryContext","continua","continuă",1],
  ["ioan",9,null,"literaryContext","continua","continuă",1],
  ["ioan",10,null,"literaryContext","continua","continuă",1],
  ["ioan",8,"ioan-8-1-20","teaching","umbla","umblă",1],
  ["ioan",10,"ioan-10-31-42","forYourHeart","arunca","aruncă",1],
  ["ioan",5,"ioan-5-1-18","teaching","compara","compară",1],
  ["ioan",7,"ioan-7-1-24","teaching","mira","miră",1],
  ["ioan",3,"ioan-3-22-36","forYourHeart","creste","crește",1],
  ["ioan",7,null,"literaryContext","creste","crește",1],
  ["ioan",9,"ioan-9-35-41","teaching","creste","crește",1],
  ["ioan",1,"ioan-1-14-18","teaching","mustra","mustră",1],
  ["ioan",11,"ioan-11-28-46","heading","striga","strigă",1],
  ["ioan",1,"ioan-1-14-18","teaching","suna","sună",1],
]

function regexFor(token) {
  const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  return new RegExp(`(?<![\\p{L}\\p{N}_])${escaped}(?![\\p{L}\\p{N}_])`, "giu")
}
function preserveCase(match, replacement) {
  if (match === match.toUpperCase()) return replacement.toUpperCase()
  if (match[0] === match[0].toUpperCase()) return replacement[0].toUpperCase() + replacement.slice(1)
  return replacement
}
function locate(bookId, chapterNumber, unitId, field) {
  const hits = []
  for (const dir of DIRS) {
    if (!fs.existsSync(dir)) fail(`missing corpus ${path.relative(ROOT, dir)}`)
    for (const name of fs.readdirSync(dir).filter((item) => item.endsWith(".json"))) {
      const full = path.join(dir, name)
      const book = JSON.parse(fs.readFileSync(full, "utf8"))
      if (book.id !== bookId) continue
      const chapter = (book.chapters ?? []).find((item) => item.number === chapterNumber)
      if (!chapter) continue
      if (unitId === null) {
        if (typeof chapter[field] === "string") hits.push({ full, book, target: chapter, field })
      } else {
        const unit = (chapter.units ?? []).find((item) => item.id === unitId)
        if (unit && typeof unit[field] === "string") hits.push({ full, book, target: unit, field })
      }
    }
  }
  return hits
}

const ledger = []
const changedFiles = new Set()
for (const [bookId, chapterNumber, unitId, field, before, after, expectedCount] of OPS) {
  const hits = locate(bookId, chapterNumber, unitId, field)
  if (hits.length !== 1) fail(`${bookId} ${chapterNumber} ${unitId ?? field}: expected one source target, found ${hits.length}`)
  const hit = hits[0]
  const regex = regexFor(before)
  const matches = [...hit.target[field].matchAll(regex)]
  if (matches.length === 0) {
    const appliedRegex = regexFor(after)
    const appliedMatches = [...hit.target[field].matchAll(appliedRegex)]
    if (appliedMatches.length === expectedCount) {
      ledger.push({ bookId, chapter: chapterNumber, unitId, field, before, after, count: expectedCount, alreadyApplied: true })
      continue
    }
    if (appliedMatches.length === 0) {
      ledger.push({ bookId, chapter: chapterNumber, unitId, field, before, after, count: 0, alreadySatisfied: true })
      continue
    }
  }
  if (matches.length !== expectedCount) fail(`${bookId} ${chapterNumber} ${unitId ?? field}.${field}: expected ${expectedCount} '${before}' occurrence(s), found ${matches.length}`)
  hit.target[field] = hit.target[field].replace(regex, (match) => preserveCase(match, after))
  fs.writeFileSync(hit.full, JSON.stringify(hit.book, null, 2) + "\n", "utf8")
  changedFiles.add(hit.full)
  ledger.push({ bookId, chapter: chapterNumber, unitId, field, before, after, count: expectedCount })
}

const total = ledger.reduce((sum, item) => sum + item.count, 0)
fs.writeFileSync(ledgerPath, JSON.stringify({
  schema: "emanus-nt-final-romanian-contextual-ledger-v1",
  policy: "Location-bound corrections after sentence-level review. Homographs remain unchanged everywhere not explicitly listed.",
  operationCount: ledger.length,
  replacementCount: total,
  filesChanged: changedFiles.size,
  fixes: ledger,
}, null, 2) + "\n", "utf8")
console.log(`NT final Romanian contextual fixes: ${total} replacements across ${ledger.length} reviewed locations / ${changedFiles.size} files.`)
