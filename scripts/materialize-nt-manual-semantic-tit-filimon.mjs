#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"
import { execFileSync } from "node:child_process"

const ROOT = process.cwd()
const TRANSCRIPT_PATH = path.join(ROOT, "docs/data/biblia-explicata/nt-official-transcripts/titus-filimon-ttb.json")
const OUTDIR = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-review-manual")
const OFFICIAL_SOURCE = "https://www.cfcindia.com/through-the-bible/titus-philemon"
const OFFICIAL_AUDIO = "https://www.cfcindia.org/resources/en/study-series/through-the-bible/60-titus-and-philemon.mp3"
const AUDIO_SHA256 = "sha256:16bad5430e50089a7bd8304b7ecb7bfacbe7eae58c7d82328822fd9515fc0c47"
const TRANSCRIPT_SHA256 = "sha256:af8d35fbf3fc44322e5172c6a1e5041b387280eb0a6b08a978d629731d192632"
const WORD_COUNT = 8931
const SEGMENT_COUNT = 315
const REVIEWER = "GPT-5.6 Sol manual sentence-level semantic review against persisted official CFC audio transcript"

const CONFIG = [
  { bookId:"tit", file:"17-tit.json", spec:"17-tit.json", expectedBlob:"84186d034a6b8f038756f7543177659dcf5d8e13", expected:{total:12,rewrite:8,keep:4}, section:"titus" },
  { bookId:"filimon", file:"18-filimon.json", spec:"18-filimon.json", expectedBlob:"bd70b740fe08c69d2dfc2df39675dad95fc24559", expected:{total:5,rewrite:0,keep:5}, section:"filimon" },
]

const sha = value => `sha256:${crypto.createHash("sha256").update(String(value)).digest("hex")}`
const canon = value => Array.isArray(value) ? value.map(canon) : (value && typeof value === "object" ? Object.fromEntries(Object.keys(value).sort().map(k=>[k,canon(value[k])])) : value)
const snap = (unit, teaching=unit.teaching, heart=unit.forYourHeart) => JSON.stringify({heading:String(unit.heading??""),teaching:String(teaching??""),forYourHeart:String(heart??"")})
const markerNorm = value => String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()
const fail = msg => { console.error(`[Tit/Filimon semantic review] ${msg}`); process.exit(1) }

if (!fs.existsSync(TRANSCRIPT_PATH)) fail("missing persisted Titus/Filimon transcript")
const transcript = JSON.parse(fs.readFileSync(TRANSCRIPT_PATH,"utf8"))
const expectedTranscript = {
  schema:"emanus-nt-official-audio-transcript-v1", sourceId:"titus-filimon-ttb", officialSourceUrl:OFFICIAL_SOURCE,
  officialAudioUrl:OFFICIAL_AUDIO, officialAudioSha256:AUDIO_SHA256, transcriptSha256:TRANSCRIPT_SHA256,
  wordCount:WORD_COUNT, segmentCount:SEGMENT_COUNT, transcriptionModel:"faster-whisper small.en / CTranslate2 int8 CPU", language:"en"
}
for (const [k,v] of Object.entries(expectedTranscript)) if (transcript[k] !== v) fail(`transcript ${k} drifted: ${transcript[k]} != ${v}`)
if (!Array.isArray(transcript.segments) || transcript.segments.length !== SEGMENT_COUNT) fail("transcript segments drifted")

const transition = transcript.segments.findIndex(s => {
  const t=String(s.text??"").toLowerCase()
  return t.includes("letter of paul to titus") && (t.includes("letter to phil") || t.includes("letter to philh"))
})
if (transition < 0) fail("explicit Titus→Filimon transition missing")
const sections = { titus: transcript.segments.slice(0,transition), filimon: transcript.segments.slice(transition) }
const sectionMeta = {}
for (const [name,segs] of Object.entries(sections)) {
  const text=segs.map(s=>String(s.text??"").trim()).filter(Boolean).join("\n")+"\n"
  sectionMeta[name]={
    text, normalizedText:markerNorm(text), sha256:sha(text), words:text.split(/\s+/).filter(Boolean).length,
    start:segs[0]?.start, end:segs.at(-1)?.end,
  }
}
if (sectionMeta.titus.words < 6500 || sectionMeta.filimon.words < 1300) fail(`section sizes suspicious: Titus ${sectionMeta.titus.words}, Filimon ${sectionMeta.filimon.words}`)
const required={
  titus:["truth which is according to godliness","always elders","interested in money","hygienic doctrine","bad motive","workers at home","pilfering","godly authority","not gossiping","second warning"],
  filimon:["rich man philh","take advantage of his authority","onesimus","charge it to my account","help poor people","social cause","build the church","brother"]
}
for (const [name,phrases] of Object.entries(required)) {
  const normalized=sectionMeta[name].normalizedText
  for (const p of phrases) {
    const needle=markerNorm(p)
    if (!normalized.includes(needle)) fail(`${name} section missing reviewed phrase after punctuation normalization: ${p}`)
  }
}

fs.mkdirSync(OUTDIR,{recursive:true})
let grand=[]
for (const cfg of CONFIG) {
  const bookPath=path.join(ROOT,"docs/data/biblia-explicata/nt-final-source-first",cfg.file)
  const specPath=path.join(ROOT,"docs/data/biblia-explicata/nt-semantic-review-spec",cfg.spec)
  if (!fs.existsSync(bookPath)||!fs.existsSync(specPath)) fail(`${cfg.bookId}: missing book/spec`)
  const blob=execFileSync("git",["hash-object",bookPath],{cwd:ROOT,encoding:"utf8"}).trim()
  if (blob !== cfg.expectedBlob) fail(`${cfg.bookId}: pre-review book blob drifted: ${blob} != ${cfg.expectedBlob}`)
  const book=JSON.parse(fs.readFileSync(bookPath,"utf8")); const spec=JSON.parse(fs.readFileSync(specPath,"utf8"))
  if (spec.schema!=="emanus-manual-review-spec-v2"||spec.bookId!==cfg.bookId||spec.expectedBookGitBlobSha1!==cfg.expectedBlob) fail(`${cfg.bookId}: spec metadata drifted`)
  const review=spec.decisions??{}; const ids=Object.keys(review)
  const rw=ids.filter(id=>review[id]?.action==="rewrite").length, kp=ids.filter(id=>review[id]?.action==="keep").length
  if(ids.length!==cfg.expected.total||rw!==cfg.expected.rewrite||kp!==cfg.expected.keep) fail(`${cfg.bookId}: expected ${cfg.expected.total} (${cfg.expected.rewrite}/${cfg.expected.keep}), got ${ids.length} (${rw}/${kp})`)
  const units=new Map(); for(const ch of book.chapters??[]) for(const unit of ch.units??[]) units.set(unit.id,{chapter:ch.number,unit})
  if(units.size!==ids.length) fail(`${cfg.bookId}: unit count ${units.size} != ${ids.length}`)
  const meta=sectionMeta[cfg.section]
  const decisions=[]
  for(const id of ids){
    const s=review[id], loc=units.get(id); if(!loc) fail(`${cfg.bookId}: missing ${id}`); if(loc.chapter!==s.chapter) fail(`${id}: chapter drift`)
    if(!["keep","rewrite"].includes(s.action)||!String(s.rationale??"").trim()) fail(`${id}: invalid review decision`)
    const teaching=s.action==="rewrite"?s.revisedTeaching:loc.unit.teaching
    if(typeof teaching!=="string"||teaching.trim().length<80) fail(`${id}: final teaching too short`)
    if(/\b(?:Poonen|CFC|Word4AllTime|SermonIndex)\b/i.test(teaching)) fail(`${id}: source name leaked`)
    const sourceIds=loc.unit.sourceIds??[]; if(!sourceIds.length||(loc.unit.sourceAnchors??[]).length<1) fail(`${id}: source provenance missing`)
    const payload={officialSourceUrl:OFFICIAL_SOURCE,transcriptSourceUrl:OFFICIAL_AUDIO,sourceRange:`${cfg.section==="titus"?"Titus 1:1-3:15":"Philemon 1:1-25"}; official shared study segment ${meta.start}-${meta.end}s`,transcriptSha256:meta.sha256}
    const d={bookId:cfg.bookId,chapter:s.chapter,unitId:id,status:"approved-against-transcript",action:s.action,reviewedTeachingSha256:sha(snap(loc.unit,teaching)),transcriptEvidence:[{...payload,evidenceSha256:sha(JSON.stringify(canon(payload))),officialAudioSha256:AUDIO_SHA256,parentTranscriptSha256:TRANSCRIPT_SHA256,transcriptionModel:transcript.transcriptionModel,reviewedSectionWordCount:meta.words}],rationale:s.rationale,reviewer:REVIEWER,reviewedOn:"2026-08-10"}
    if(s.action==="rewrite") d.revisedTeaching=teaching
    decisions.push(d)
  }
  fs.writeFileSync(path.join(OUTDIR,cfg.file),JSON.stringify({schema:"emanus-nt-semantic-review-book-v1",bookId:cfg.bookId,reviewMode:"manual-sentence-level-against-derived-book-segment-of-persisted-official-cfc-audio-transcript",decisions},null,2)+"\n")
  grand.push(...decisions)
  console.log(`${cfg.bookId}: ${decisions.length} decisions (${rw} rewrite / ${kp} keep); section ${meta.words} words sha ${meta.sha256}`)
}
if(grand.length!==17||grand.filter(d=>d.action==="rewrite").length!==8||grand.filter(d=>d.action==="keep").length!==9) fail("batch totals drifted")
console.log(`Tit+Filimon semantic batch: 17 decisions (8 rewrite / 9 keep).`)
