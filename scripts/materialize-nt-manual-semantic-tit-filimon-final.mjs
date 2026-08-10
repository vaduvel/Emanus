#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT=process.cwd()
const TRANSCRIPT=path.join(ROOT,"docs/data/biblia-explicata/nt-official-transcripts/titus-filimon-ttb.json")
const OUTDIR=path.join(ROOT,"docs/data/biblia-explicata/nt-semantic-review-manual")
const OFFICIAL_SOURCE="https://www.cfcindia.com/through-the-bible/titus-philemon"
const OFFICIAL_AUDIO="https://www.cfcindia.org/resources/en/study-series/through-the-bible/60-titus-and-philemon.mp3"
const AUDIO_SHA="sha256:16bad5430e50089a7bd8304b7ecb7bfacbe7eae58c7d82328822fd9515fc0c47"
const FULL_SHA="sha256:af8d35fbf3fc44322e5172c6a1e5041b387280eb0a6b08a978d629731d192632"
const REVIEWER="GPT-5.6 Sol manual sentence-level semantic review against persisted official CFC audio transcript"
const CONFIG=[
  {bookId:"tit",file:"17-tit.json",spec:"17-tit.json",section:"titus",expected:{total:12,rewrite:8,keep:4}},
  {bookId:"filimon",file:"18-filimon.json",spec:"18-filimon.json",section:"filimon",expected:{total:5,rewrite:0,keep:5}},
]
const sha=v=>`sha256:${crypto.createHash("sha256").update(String(v)).digest("hex")}`
const snap=(u,t=u.teaching,h=u.forYourHeart)=>JSON.stringify({heading:String(u.heading??""),teaching:String(t??""),forYourHeart:String(h??"")})
const canon=v=>Array.isArray(v)?v.map(canon):(v&&typeof v==="object"?Object.fromEntries(Object.keys(v).sort().map(k=>[k,canon(v[k])])):v)
const norm=v=>String(v??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()
const fail=m=>{console.error(`[Tit/Filimon final semantic review] ${m}`);process.exit(1)}

if(!fs.existsSync(TRANSCRIPT)) fail("missing persisted official transcript")
const tr=JSON.parse(fs.readFileSync(TRANSCRIPT,"utf8"))
const expected={schema:"emanus-nt-official-audio-transcript-v1",sourceId:"titus-filimon-ttb",officialSourceUrl:OFFICIAL_SOURCE,officialAudioUrl:OFFICIAL_AUDIO,officialAudioSha256:AUDIO_SHA,transcriptSha256:FULL_SHA,wordCount:8931,segmentCount:315,transcriptionModel:"faster-whisper small.en / CTranslate2 int8 CPU",language:"en"}
for(const [k,v] of Object.entries(expected)) if(tr[k]!==v) fail(`transcript ${k} drifted: ${tr[k]} != ${v}`)
if(!Array.isArray(tr.segments)||tr.segments.length!==315) fail("transcript segment array drifted")

const transition=tr.segments.findIndex(s=>{const t=String(s.text??"").toLowerCase();return t.includes("letter of paul to titus")&&(t.includes("letter to phil")||t.includes("letter to philh"))})
if(transition<0) fail("explicit Titus to Filimon transition missing")
const rawSections={titus:tr.segments.slice(0,transition),filimon:tr.segments.slice(transition)}
const sections={}
for(const [name,segs] of Object.entries(rawSections)){
  const text=segs.map(s=>String(s.text??"").trim()).filter(Boolean).join("\n")+"\n"
  sections[name]={text,normalized:norm(text),sha:sha(text),words:text.split(/\s+/).filter(Boolean).length,start:segs[0]?.start,end:segs.at(-1)?.end}
}
if(sections.titus.words<6500||sections.filimon.words<1300) fail(`section sizes suspicious: Titus=${sections.titus.words}, Filimon=${sections.filimon.words}`)
const markerGroups={
  titus:[
    ["truth which is according to godliness"],["always elders"],["interested in money"],["hygienic doctrine"],["bad motive"],["workers at home"],["pilfering"],["godly authority"],["not gossiping"],["second warning"]
  ],
  filimon:[
    ["rich man philh"],["takes advantage of his authority","take advantage of his authority"],["onesimus"],["charge it to my account"],["help poor people"],["social cause"],["build the church"],["brother"]
  ]
}
for(const [name,groups] of Object.entries(markerGroups)){
  for(const group of groups){
    if(!group.some(p=>sections[name].normalized.includes(norm(p)))) fail(`${name}: reviewed transcript marker group missing: ${group.join(" OR ")}`)
  }
}

fs.mkdirSync(OUTDIR,{recursive:true})
let all=[]
for(const cfg of CONFIG){
  const bookPath=path.join(ROOT,"docs/data/biblia-explicata/nt-final-source-first",cfg.file)
  const specPath=path.join(ROOT,"docs/data/biblia-explicata/nt-semantic-review-spec",cfg.spec)
  if(!fs.existsSync(bookPath)||!fs.existsSync(specPath)) fail(`${cfg.bookId}: missing book/spec`)
  const book=JSON.parse(fs.readFileSync(bookPath,"utf8")); const spec=JSON.parse(fs.readFileSync(specPath,"utf8"))
  if(book.id!==cfg.bookId||spec.schema!=="emanus-manual-review-spec-v2"||spec.bookId!==cfg.bookId||!spec.decisions) fail(`${cfg.bookId}: schema/book drift`)
  const ids=Object.keys(spec.decisions), rw=ids.filter(id=>spec.decisions[id]?.action==="rewrite").length, kp=ids.filter(id=>spec.decisions[id]?.action==="keep").length
  if(ids.length!==cfg.expected.total||rw!==cfg.expected.rewrite||kp!==cfg.expected.keep) fail(`${cfg.bookId}: expected ${cfg.expected.total} ${cfg.expected.rewrite}/${cfg.expected.keep}, got ${ids.length} ${rw}/${kp}`)
  const units=new Map(); for(const ch of book.chapters??[]) for(const unit of ch.units??[]) units.set(unit.id,{chapter:ch.number,unit})
  if(units.size!==ids.length) fail(`${cfg.bookId}: current unit set drifted ${units.size}/${ids.length}`)
  const sec=sections[cfg.section]; const decisions=[]
  for(const id of ids){
    const s=spec.decisions[id], loc=units.get(id); if(!loc) fail(`${cfg.bookId}: missing unit ${id}`)
    if(loc.chapter!==s.chapter) fail(`${id}: chapter drift`)
    if(typeof s.expectedCurrentSnapshotSha256!=="string") fail(`${id}: missing bound expectedCurrentSnapshotSha256`)
    const currentSha=sha(snap(loc.unit)); if(currentSha!==s.expectedCurrentSnapshotSha256) fail(`${id}: pre-semantic reader copy drifted; ${currentSha} != ${s.expectedCurrentSnapshotSha256}`)
    if(!["keep","rewrite"].includes(s.action)||!String(s.rationale??"").trim()) fail(`${id}: invalid decision`)
    const teaching=s.action==="rewrite"?s.revisedTeaching:loc.unit.teaching
    if(typeof teaching!=="string"||teaching.trim().length<80) fail(`${id}: final teaching too short`)
    if(/\b(?:Poonen|CFC|Word4AllTime|SermonIndex)\b/i.test(teaching)) fail(`${id}: source name leaked into reader copy`)
    if(!(loc.unit.sourceIds??[]).length||!(loc.unit.sourceAnchors??[]).length) fail(`${id}: provenance missing`)
    const sourceRange=`${cfg.section==="titus"?"Titus 1:1-3:15":"Philemon 1:1-25"}; official shared study segment ${sec.start}-${sec.end}s`
    const ep={officialSourceUrl:OFFICIAL_SOURCE,transcriptSourceUrl:OFFICIAL_AUDIO,sourceRange,transcriptSha256:sec.sha}
    const d={bookId:cfg.bookId,chapter:s.chapter,unitId:id,status:"approved-against-transcript",action:s.action,reviewedTeachingSha256:sha(snap(loc.unit,teaching)),transcriptEvidence:[{...ep,evidenceSha256:sha(JSON.stringify(canon(ep))),officialAudioSha256:AUDIO_SHA,parentTranscriptSha256:FULL_SHA,transcriptionModel:tr.transcriptionModel,reviewedSectionWordCount:sec.words}],rationale:s.rationale,reviewer:REVIEWER,reviewedOn:"2026-08-10"}
    if(s.action==="rewrite") d.revisedTeaching=teaching
    decisions.push(d)
  }
  fs.writeFileSync(path.join(OUTDIR,cfg.file),JSON.stringify({schema:"emanus-nt-semantic-review-book-v1",bookId:cfg.bookId,reviewMode:"manual-sentence-level-against-derived-book-segment-of-persisted-official-cfc-audio-transcript",decisions},null,2)+"\n","utf8")
  all.push(...decisions)
  console.log(`${cfg.bookId}: ${decisions.length} decisions (${rw} rewrite / ${kp} keep); section=${sec.words} words sha=${sec.sha}.`)
}
if(all.length!==17||all.filter(d=>d.action==="rewrite").length!==8||all.filter(d=>d.action==="keep").length!==9) fail("batch totals drifted")
console.log("Tit+Filimon final semantic batch: 17 decisions (8 rewrite / 9 keep).")
