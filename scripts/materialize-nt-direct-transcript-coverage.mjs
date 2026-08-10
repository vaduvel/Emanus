#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dataDir = path.join(ROOT, "docs", "data", "biblia-explicata")
const corpusDir = path.join(dataDir, "nt-final-source-first")
const evidencePath = path.join(dataDir, "nt-source-evidence.json")
const cataloguePath = path.join(dataDir, "nt-poonen-transcript-catalogue.json")
const source12Path = path.join(dataDir, "source-registry-protected", "source-first-12.json")
const outputPath = path.join(dataDir, "nt-direct-transcript-coverage.json")

function fail(message) { console.error(`[NT direct transcript coverage] ${message}`); process.exit(1) }
function sha256(value) { return `sha256:${crypto.createHash("sha256").update(String(value)).digest("hex")}` }
function point(chapter, verse) { return chapter * 1000 + verse }

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
  const normalized=String(title??"").replace(/^\s*\(/,"").trim()
  for (const [id,re] of BOOK_ALIASES) if (re.test(normalized)) return id
  return null
}
function parseRange(title) {
  const bookId=bookFromTitle(title)
  if (!bookId) return null
  const s=String(title)
  let m=s.match(/(?:ch\.?\s*)?(\d+)\s*:\s*(\d+)\s*(?:-|to)\s*(\d+)\s*:\s*(\d+)/i)
  if (m) return {bookId,startChapter:+m[1],startVerse:+m[2],endChapter:+m[3],endVerse:+m[4]}
  m=s.match(/(?:ch\.?\s*)?(\d+)\s*:\s*(\d+)\s*(?:-|to)\s*(\d+)(?!\s*:)/i)
  if (m) return {bookId,startChapter:+m[1],startVerse:+m[2],endChapter:+m[1],endVerse:+m[3]}
  return null
}
function officialFromUnit(unit, evidenceById, source12) {
  const urls=[]
  for (const anchor of unit.sourceAnchors ?? []) {
    const record=evidenceById.get(anchor.evidenceId)
    if (!record) continue
    for (const candidate of [record.officialSeriesUrl, record.sourceUrl]) {
      if (typeof candidate === "string" && /^https:\/\/(?:www\.)?cfcindia\.com\//i.test(candidate)) urls.push(candidate)
    }
  }
  const preferred=[...new Set(urls)].find((url)=>/\/verse-by-verse\//i.test(url))
  if (preferred) return preferred
  const source=source12.find((item)=>(item.books??[]).includes(unit.__bookId) && item.kind==="poonen-verse-by-verse")
  if (source?.officialUrl) return source.officialUrl
  return [...new Set(urls)][0] ?? null
}

for (const p of [corpusDir,evidencePath,cataloguePath,source12Path]) if (!fs.existsSync(p)) fail(`missing ${path.relative(ROOT,p)}`)
const evidence=JSON.parse(fs.readFileSync(evidencePath,"utf8"))
const evidenceById=new Map((evidence.records??[]).map((r)=>[r.id,r]))
const catalogue=JSON.parse(fs.readFileSync(cataloguePath,"utf8"))
const source12=(JSON.parse(fs.readFileSync(source12Path,"utf8")).sources??[])
const ranges=[]
for (const item of catalogue.items??[]) {
  const parsed=parseRange(item.title)
  if (!parsed) continue
  ranges.push({...parsed,url:item.url,title:item.title,startPoint:point(parsed.startChapter,parsed.startVerse),endPoint:point(parsed.endChapter,parsed.endVerse)})
}

const entries=[]
const byBook={}
let pending=0,direct=0,raw=0,noOfficial=0
for (const file of fs.readdirSync(corpusDir).filter((n)=>n.endsWith('.json')).sort()) {
  const book=JSON.parse(fs.readFileSync(path.join(corpusDir,file),'utf8'))
  const counts={units:0,raw:0,directTranscript:0,pending:0,noOfficial:0}
  for (const chapter of book.chapters??[]) for (const unit of chapter.units??[]) {
    counts.units++
    if (unit.sourceFidelity?.reviewState==='reviewed-against-raw-transcript') {raw++;counts.raw++;continue}
    const us=point(chapter.number,unit.verseStart), ue=point(chapter.number,unit.verseEnd)
    const candidates=ranges.filter((r)=>r.bookId===book.id && r.startPoint<=us && r.endPoint>=ue)
      .sort((a,b)=>(a.endPoint-a.startPoint)-(b.endPoint-b.startPoint) || a.url.localeCompare(b.url))
    if (!candidates.length) {pending++;counts.pending++;continue}
    const best=candidates[0]
    unit.__bookId=book.id
    const official=officialFromUnit(unit,evidenceById,source12)
    delete unit.__bookId
    if (!official) {noOfficial++;counts.noOfficial++;pending++;counts.pending++;continue}
    const payload={bookId:book.id,chapter:chapter.number,unitId:unit.id,ref:unit.ref,officialSourceUrl:official,transcriptRepresentationUrl:best.url,transcriptTitle:best.title,transcriptRange:`${best.startChapter}:${best.startVerse}-${best.endChapter}:${best.endVerse}`,verification:"catalogue-range-contains-entire-unit",catalogueSourcePageSha256:catalogue.sourcePageSha256}
    entries.push({...payload,coverageEvidenceSha256:sha256(JSON.stringify(payload,Object.keys(payload).sort()))})
    direct++;counts.directTranscript++
  }
  byBook[book.id]=counts
}
fs.writeFileSync(outputPath,JSON.stringify({
  schema:"emanus-nt-direct-transcript-coverage-v1",
  policy:"A direct transcript representation is assigned only when a parsed Verse-by-Verse transcript range for the same NT book contains the entire explanation unit range. The smallest containing range is selected deterministically. No fuzzy title match and no partial-range approval is allowed. Official CFC Verse-by-Verse attribution is retained separately.",
  catalogueSourcePageSha256:catalogue.sourcePageSha256,
  counts:{units:raw+direct+pending,rawTranscriptReviewed:raw,directTranscriptAddressable:direct,pendingTranscriptRecovery:pending,noOfficialSource:noOfficial,parsedTranscriptRanges:ranges.length},
  byBook,
  entries,
},null,2)+"\n","utf8")
console.log(`NT direct transcript coverage: ${raw} raw + ${direct} direct-range addressable; ${pending} pending; ${noOfficial} direct candidates lacked official CFC source.`)
