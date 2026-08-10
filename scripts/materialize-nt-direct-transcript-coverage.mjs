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
const bookRegistryDir = path.join(dataDir, "nt-source-registry")
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
const REGISTRY_FILE_BOOK = new Map([
  ["matei-poonen-playlist.json","matei"], ["marcu-poonen-playlist.json","marcu"], ["luca-poonen-source.json","luca"],
  ["fapte-poonen-source.json","fapte"], ["romani-poonen-source.json","romani"], ["1-corinteni-poonen-source.json","1-corinteni"],
  ["2-corinteni-poonen-source.json","2-corinteni"], ["galateni-poonen-source.json","galateni"], ["efeseni-poonen-source.json","efeseni"],
  ["filipeni-poonen-source.json","filipeni"], ["coloseni-poonen-source.json","coloseni"], ["1-tesaloniceni-poonen-source.json","1-tesaloniceni"],
  ["filimon-poonen-source.json","filimon"],
])
function bookFromTitle(title) {
  const normalized=String(title??"").replace(/^\s*\(/,"").trim()
  for (const [id,re] of BOOK_ALIASES) if (re.test(normalized)) return id
  return null
}
function parseRange(title) {
  const bookId=bookFromTitle(title)
  if (!bookId) return null
  const s=String(title)
  // Strict range parser: both endpoints must be explicit. Some catalogue titles
  // repeat "Ch" before the second endpoint (for example Ch1:1-Ch2:21).
  // Supporting that spelling is deterministic range parsing, not fuzzy matching.
  const chapterPrefix = String.raw`(?:ch(?:apter)?\.?\s*)?`
  let m=s.match(new RegExp(`${chapterPrefix}(\\d+)\\s*:\\s*(\\d+)\\s*(?:-|to)\\s*${chapterPrefix}(\\d+)\\s*:\\s*(\\d+)`, "i"))
  if (m) return {bookId,startChapter:+m[1],startVerse:+m[2],endChapter:+m[3],endVerse:+m[4]}
  m=s.match(new RegExp(`${chapterPrefix}(\\d+)\\s*:\\s*(\\d+)\\s*(?:-|to)\\s*(\\d+)(?!\\s*:)`, "i"))
  if (m) return {bookId,startChapter:+m[1],startVerse:+m[2],endChapter:+m[1],endVerse:+m[3]}
  return null
}
function allowedPinnedOfficial(url) {
  if (typeof url !== "string" || !/^https:\/\//i.test(url)) return false
  return /^(?:https:\/\/(?:www\.)?cfcindia\.(?:com|org)\/|https:\/\/(?:www\.)?youtube\.com\/playlist\?list=)/i.test(url)
}
function collectRegistryOfficialUrls() {
  const result=new Map()
  if (!fs.existsSync(bookRegistryDir)) return result
  for (const name of fs.readdirSync(bookRegistryDir).filter((n)=>n.endsWith('.json')).sort()) {
    const bookId=REGISTRY_FILE_BOOK.get(name)
    if (!bookId) continue
    const data=JSON.parse(fs.readFileSync(path.join(bookRegistryDir,name),'utf8'))
    const candidates=[data.canonicalPage,data.playlistUrl,data.officialSeriesUrl,data.poonen?.officialSeriesUrl]
      .filter(allowedPinnedOfficial)
    if (!candidates.length) continue
    const current=result.get(bookId)??[]
    result.set(bookId,[...new Set([...current,...candidates])])
  }
  return result
}
function officialFromUnit(unit, evidenceById, source12, registryOfficialUrls) {
  const urls=[]
  for (const anchor of unit.sourceAnchors ?? []) {
    const record=evidenceById.get(anchor.evidenceId)
    if (!record) continue
    for (const candidate of [record.officialSeriesUrl, record.sourceUrl]) if (allowedPinnedOfficial(candidate)) urls.push(candidate)
  }
  const unique=[...new Set(urls)]
  const cfcVbv=unique.find((url)=>/cfcindia\.com\/verse-by-verse\//i.test(url))
  if (cfcVbv) return {url:cfcVbv, resolution:"unit-anchor-cfc-vbv"}
  const source=source12.find((item)=>(item.books??[]).includes(unit.__bookId) && item.kind==="poonen-verse-by-verse")
  if (allowedPinnedOfficial(source?.officialUrl)) return {url:source.officialUrl,resolution:"protected-source-registry-vbv"}
  const registryUrls=registryOfficialUrls.get(unit.__bookId)??[]
  const registryCfc=registryUrls.find((url)=>/cfcindia\.(?:com|org)\//i.test(url))
  if (registryCfc) return {url:registryCfc,resolution:"pinned-book-registry-cfc"}
  const registryPlaylist=registryUrls.find((url)=>/youtube\.com\/playlist\?list=/i.test(url))
  if (registryPlaylist) return {url:registryPlaylist,resolution:"pinned-book-registry-youtube-playlist"}
  if (unique.length) return {url:unique[0],resolution:"unit-anchor-pinned-official"}
  return null
}

for (const p of [corpusDir,evidencePath,cataloguePath,source12Path]) if (!fs.existsSync(p)) fail(`missing ${path.relative(ROOT,p)}`)
const evidence=JSON.parse(fs.readFileSync(evidencePath,"utf8"))
const evidenceById=new Map((evidence.records??[]).map((r)=>[r.id,r]))
const catalogue=JSON.parse(fs.readFileSync(cataloguePath,"utf8"))
const source12=(JSON.parse(fs.readFileSync(source12Path,"utf8")).sources??[])
const registryOfficialUrls=collectRegistryOfficialUrls()
const ranges=[]
for (const item of catalogue.items??[]) {
  const parsed=parseRange(item.title)
  if (!parsed) continue
  ranges.push({...parsed,url:item.url,title:item.title,startPoint:point(parsed.startChapter,parsed.startVerse),endPoint:point(parsed.endChapter,parsed.endVerse)})
}

const entries=[]
const byBook={}
const officialResolutionCounts={}
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
    const official=officialFromUnit(unit,evidenceById,source12,registryOfficialUrls)
    delete unit.__bookId
    if (!official) {noOfficial++;counts.noOfficial++;pending++;counts.pending++;continue}
    officialResolutionCounts[official.resolution]=(officialResolutionCounts[official.resolution]??0)+1
    const payload={bookId:book.id,chapter:chapter.number,unitId:unit.id,ref:unit.ref,officialSourceUrl:official.url,officialSourceResolution:official.resolution,transcriptRepresentationUrl:best.url,transcriptTitle:best.title,transcriptRange:`${best.startChapter}:${best.startVerse}-${best.endChapter}:${best.endVerse}`,verification:"catalogue-range-contains-entire-unit",catalogueSourcePageSha256:catalogue.sourcePageSha256}
    entries.push({...payload,coverageEvidenceSha256:sha256(JSON.stringify(payload,Object.keys(payload).sort()))})
    direct++;counts.directTranscript++
  }
  byBook[book.id]=counts
}
fs.writeFileSync(outputPath,JSON.stringify({
  schema:"emanus-nt-direct-transcript-coverage-v2",
  policy:"A direct transcript representation is assigned only when a parsed Verse-by-Verse transcript range for the same NT book contains the entire explanation unit range. The smallest containing range is selected deterministically. No fuzzy title match and no partial-range approval is allowed. Official attribution must already exist in unit evidence, the protected source registry, or a pinned per-book source registry; no official URL is invented.",
  catalogueSourcePageSha256:catalogue.sourcePageSha256,
  counts:{units:raw+direct+pending,rawTranscriptReviewed:raw,directTranscriptAddressable:direct,pendingTranscriptRecovery:pending,noOfficialSource:noOfficial,parsedTranscriptRanges:ranges.length},
  officialResolutionCounts,
  pinnedBookRegistryOfficialUrls:Object.fromEntries([...registryOfficialUrls.entries()]),
  byBook,
  entries,
},null,2)+"\n","utf8")
console.log(`NT direct transcript coverage: ${raw} raw + ${direct} direct-range addressable; ${pending} pending; ${noOfficial} direct candidates lacked pinned official source.`)
console.log(`Official source resolution: ${JSON.stringify(officialResolutionCounts)}`)