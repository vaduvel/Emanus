#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dataDir = path.join(ROOT, "docs", "data", "biblia-explicata")
const evidencePath = path.join(dataDir, "nt-source-evidence.json")
const cataloguePath = path.join(dataDir, "nt-poonen-transcript-catalogue.json")
const mappingPath = path.join(dataDir, "nt-transcript-episode-mapping.json")

function fail(message) { console.error(`[NT transcript mapping] ${message}`); process.exit(1) }
function sha256(value) { return `sha256:${crypto.createHash("sha256").update(String(value)).digest("hex")}` }

const BOOK_ALIASES = [
  ["1-corinteni", /(?:^|\()1\s*corinthians\)?/i], ["2-corinteni", /(?:^|\()2\s*corinthians\)?/i],
  ["1-tesaloniceni", /(?:^|\()1\s*thessalonians\)?/i], ["2-tesaloniceni", /(?:^|\()2\s*thessalonians\)?/i],
  ["1-timotei", /(?:^|\()1\s*timothy\)?/i], ["2-timotei", /(?:^|\()2\s*timothy\)?/i],
  ["1-petru", /(?:^|\()1\s*peter\)?/i], ["2-petru", /(?:^|\()2\s*peter\)?/i],
  ["1-ioan", /(?:^|\()1\s*john\)?/i], ["2-ioan", /(?:^|\()2\s*john\)?/i], ["3-ioan", /(?:^|\()3\s*john\)?/i],
  ["matei", /(?:^|\()matthew\)?/i], ["marcu", /(?:^|\()mark\)?/i], ["luca", /(?:^|\()luke\)?/i], ["ioan", /(?:^|\()john\)?/i],
  ["fapte", /(?:^|\()acts\)?/i], ["romani", /(?:^|\()romans\)?/i], ["galateni", /(?:^|\()galatians\)?/i],
  ["efeseni", /(?:^|\()ephesians\)?/i], ["filipeni", /(?:^|\()philippians\)?/i], ["coloseni", /(?:^|\()colossians\)?/i],
  ["tit", /(?:^|\()titus\)?/i], ["filimon", /(?:^|\()philemon\)?/i], ["evrei", /(?:^|\()hebrews\)?/i], ["iacov", /(?:^|\()james\)?/i],
  ["iuda", /(?:^|\()jude\)?/i], ["apocalipsa", /(?:^|\()revelation\)?/i],
]

function bookFromTitle(title) {
  const normalized = String(title).replace(/^\s*\(/, "").trim()
  for (const [id, regex] of BOOK_ALIASES) if (regex.test(normalized)) return id
  return null
}
function parseTitleRange(title) {
  const bookId = bookFromTitle(title)
  if (!bookId) return null
  const s = String(title)
  // Common SermonIndex VBV titles: "(Romans) Romans 1:1-1:32", "(Matthew) ch.12:31-13:13", "Hebrews ch.1:1-3:8".
  let m = s.match(/(?:ch\.?\s*)?(\d+)\s*:\s*(\d+)\s*(?:-|to)\s*(\d+)\s*:\s*(\d+)/i)
  if (m) return { bookId, startChapter:+m[1], startVerse:+m[2], endChapter:+m[3], endVerse:+m[4] }
  m = s.match(/(?:ch\.?\s*)?(\d+)\s*:\s*(\d+)\s*(?:-|to)\s*(\d+)(?!\s*:)/i)
  if (m) return { bookId, startChapter:+m[1], startVerse:+m[2], endChapter:+m[1], endVerse:+m[3] }
  return null
}
function recoveredBookId(record) {
  const m = String(record.id ?? "").match(/^ev-recovered-(.+?)-episode-\d+$/)
  return m?.[1] ?? null
}
function exactKey(bookId, sc, sv, ec, ev) { return `${bookId}:${sc}:${sv}-${ec}:${ev}` }

if (!fs.existsSync(evidencePath) || !fs.existsSync(cataloguePath)) fail("source evidence/catalogue missing")
const evidence = JSON.parse(fs.readFileSync(evidencePath,"utf8"))
const catalogue = JSON.parse(fs.readFileSync(cataloguePath,"utf8"))
if (!Array.isArray(evidence.records) || !Array.isArray(catalogue.items)) fail("invalid inputs")

const catalogByKey = new Map()
const parsedCatalogue = []
for (const item of catalogue.items) {
  const parsed = parseTitleRange(item.title)
  if (!parsed) continue
  const key = exactKey(parsed.bookId, parsed.startChapter, parsed.startVerse, parsed.endChapter, parsed.endVerse)
  const arr = catalogByKey.get(key) ?? []
  arr.push(item)
  catalogByKey.set(key, arr)
  parsedCatalogue.push({ ...parsed, url:item.url, title:item.title, key })
}

let eligible=0, matched=0, ambiguous=0, unmatched=0
const mappings=[]
for (const record of evidence.records) {
  const bookId=recoveredBookId(record)
  if (!bookId || !Number.isInteger(record.coverageStartChapter)) continue
  eligible += 1
  const key=exactKey(bookId,record.coverageStartChapter,record.coverageStartVerse,record.coverageEndChapter,record.coverageEndVerse)
  const candidates=catalogByKey.get(key) ?? []
  if (candidates.length===1) {
    matched += 1
    const candidate=candidates[0]
    record.transcriptRepresentationUrl=candidate.url
    record.transcriptRepresentationTitle=candidate.title
    record.transcriptMappingVerification="exact-book-and-range-title-match"
    record.transcriptCatalogueSourcePageSha256=catalogue.sourcePageSha256
    mappings.push({evidenceId:record.id,bookId,key,status:"matched",officialSourceUrl:record.sourceUrl,transcriptUrl:candidate.url,transcriptTitle:candidate.title})
  } else if (candidates.length>1) {
    ambiguous += 1
    mappings.push({evidenceId:record.id,bookId,key,status:"ambiguous",candidates})
  } else {
    unmatched += 1
    mappings.push({evidenceId:record.id,bookId,key,status:"unmatched",officialSourceUrl:record.sourceUrl,sourceTitle:record.sourceTitle})
  }
}

// Recompute stable evidence hashes because transcript representation metadata becomes part of the reviewable evidence record.
for (const record of evidence.records) {
  const { evidenceSha256: _old, ...payload } = record
  record.evidenceSha256=sha256(JSON.stringify(payload,Object.keys(payload).sort()))
}
fs.writeFileSync(evidencePath,JSON.stringify(evidence,null,2)+"\n","utf8")
fs.writeFileSync(mappingPath,JSON.stringify({
  schema:"emanus-nt-transcript-episode-mapping-v1",
  policy:"Only exact book + start/end chapter/verse matches between official recovered episode coverage and pinned SermonIndex transcript catalogue are accepted automatically. Ambiguous or unmatched records require separate recovery; no fuzzy match is accepted.",
  catalogueSourcePageSha256:catalogue.sourcePageSha256,
  counts:{eligible,matched,ambiguous,unmatched,parsedCatalogue:parsedCatalogue.length},
  mappings,
},null,2)+"\n","utf8")
console.log(`NT transcript mapping: ${matched}/${eligible} exact; ${ambiguous} ambiguous; ${unmatched} unmatched; ${parsedCatalogue.length} catalog ranges parsed.`)
