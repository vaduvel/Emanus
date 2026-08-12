#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const BOOK = path.join(ROOT, "docs/data/biblia-explicata/nt-final-source-first/23-1-ioan.json")
const EVIDENCE = path.join(ROOT, "docs/data/biblia-explicata/nt-source-evidence.json")
const SPEC = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-review-spec/23-1-ioan.json")
const OFFICIAL_TRANSCRIPT = path.join(ROOT, "docs/data/biblia-explicata/nt-official-transcripts/1-ioan-vbv-05.json")
const OUTDIR = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-review-manual")
const OUT = path.join(OUTDIR, "23-1-ioan.json")

const TTB_EVIDENCE_ID = "ev-ttb-1john-transcript"
const TTB_URL = "https://sermonindex.net/speakers/zac-poonen/through-the-bible-1-john/"
const TTB_OFFICIAL = "https://www.cfcindia.com/bible"
const TTB_SHA256 = "sha256:f2e07021a6659ff3b04080bc286787f4bdf2d958239c6f3ddd4dfb473882cd8c"

const VBV_EVIDENCE_ID = "ev-vbv-1john-05"
const VBV_SOURCE_ID = "1-ioan-vbv-05"
const VBV_PAGE = "https://www.cfcindia.com/verse-by-verse/051john-chapter-51-to-chapter-521"
const VBV_AUDIO = "https://www.cfcindia.org/resources/en/study-series/verse-by-verse/nt23-1john-chapter-5-1-to-chapter-5-21.mp3"
const VBV_AUDIO_SHA256 = "sha256:233643a3de1ef9e14a1317f7494436fab16f40d021dc49efb83bb7f3f804d118"
const VBV_TRANSCRIPT_SHA256 = "sha256:e0cdae5ddd0469b2d0de7c0de3da5db5207558f7e3e083e8fa93fc5af3e819d3"
const VBV_SOURCE_RANGE = "1 John 5:1-5:21"
const VBV_WORD_COUNT = 12504
const VBV_UNIT_IDS = new Set([
  "1-ioan-5-1-5-source-first",
  "1-ioan-5-6-12-source-first",
  "1-ioan-5-13-17-source-first",
  "1-ioan-5-18-21-source-first",
])
const REVIEWER = "GPT-5.6 Sol manual sentence-level semantic review against exact exported transcript representation"

const sha = (value) => `sha256:${crypto.createHash("sha256").update(String(value)).digest("hex")}`
const snap = (unit, teaching = unit.teaching, forYourHeart = unit.forYourHeart) => JSON.stringify({
  heading: String(unit.heading ?? ""),
  teaching: String(teaching ?? ""),
  forYourHeart: String(forYourHeart ?? ""),
})
const canon = (value) => Array.isArray(value)
  ? value.map(canon)
  : (value && typeof value === "object"
      ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, canon(value[key])]))
      : value)
const fail = (message) => {
  console.error(`[1 Ioan final manual semantic review] ${message}`)
  process.exit(1)
}

for (const filePath of [BOOK, EVIDENCE, SPEC, OFFICIAL_TRANSCRIPT]) {
  if (!fs.existsSync(filePath)) fail(`missing ${path.relative(ROOT, filePath)}`)
}

const book = JSON.parse(fs.readFileSync(BOOK, "utf8"))
const evidence = JSON.parse(fs.readFileSync(EVIDENCE, "utf8"))
const review = JSON.parse(fs.readFileSync(SPEC, "utf8"))
const officialTranscript = JSON.parse(fs.readFileSync(OFFICIAL_TRANSCRIPT, "utf8"))
if (book.id !== "1-ioan") fail(`expected 1-ioan book, got ${book.id}`)
if (!review || Array.isArray(review) || typeof review !== "object") fail("semantic review spec must be an object keyed by unit id")

// Final strict corrections after inspecting the persisted official CFC chapter-5 transcript.
// 1) Avoid an exact quotation that the provisional BE quote fixer corrupts.
const loveUnit = review["1-ioan-4-7-21-source-first"]
if (!loveUnit || loveUnit.action !== "rewrite") fail("1-ioan-4-7-21-source-first reviewed rewrite missing")
loveUnit.rationale = "Copy-ul curent păstrează faptul că Dumnezeu devine vizibil prin dragostea dintre credincioși și că dragostea alungă frica, dar transcriptul dezvoltă material 1 Ioan 4:17: așa cum este Hristos, tot așa suntem chemați să trăim și noi în lumea aceasta, cu îndrăzneală și fără frică. Sursa concretizează și mărturia bisericii și a casei: oamenii ar trebui să guste prin viața noastră ceva din caracterul lui Isus și din atmosfera cerului. Formularea este intenționat parafrazată, nu citată, pentru a nu fi legată de wording-ul canonic provizoriu."
loveUnit.revisedTeaching = "Dumnezeu este dragoste și Și-a arătat dragostea trimițându-L pe Fiul ca să trăim prin El. Nimeni nu L-a văzut pe Dumnezeu; când Isus a fost pe pământ, oamenii au putut vedea în El cum este Tatăl, iar acum Dumnezeu trebuie făcut vizibil prin trupul lui Hristos, prin credincioșii care se iubesc. O biserică și o casă creștină ar trebui să lase oamenii să guste ceva din caracterul lui Isus și din atmosfera cerului. Ioan spune că, așa cum este Hristos, tot așa suntem chemați să trăim și noi în lumea aceasta: cu îndrăzneală și cu autoritate asupra celui rău, nu sub frică. Dragostea desăvârșită alungă frica pentru că ne odihnim în dragostea lui Dumnezeu. Iar testul foarte concret rămâne fratele pe care îl vedem: dacă nu putem iubi persoana de lângă noi, nu putem pretinde credibil că Îl iubim pe Dumnezeul pe care nu-L vedem."

// 2) VBV 05 gives material detail that the earlier TTB-only keep decision omitted.
const prayerUnit = review["1-ioan-5-13-17-source-first"]
if (!prayerUnit) fail("1-ioan-5-13-17-source-first review missing")
prayerUnit.action = "rewrite"
prayerUnit.rationale = "Transcriptul oficial VBV 05 dezvoltă material această unitate dincolo de copy-ul anterior: rugăciunea după voia lui Dumnezeu nu Îi schimbă mintea, ci ne adâncește relația cu Tatăl; ascultarea și dreptatea vieții sunt legate de îndrăzneala în rugăciune; iar când un frate cade, răspunsul folositor este mijlocirea, nu critica sau bârfa. Sursa spune cu prudență că nu definește exhaustiv păcatul spre moarte, dar îl leagă de împietrirea față de lucrarea de convingere a Duhului Sfânt."
prayerUnit.revisedTeaching = "Ioan scrie ca cei care cred în Numele Fiului lui Dumnezeu să știe că au viața veșnică și, din această relație de copii ai lui Dumnezeu, să aibă îndrăzneală în rugăciune. A cere după voia Lui nu înseamnă să-L convingem pe Dumnezeu să facă ceva ce nu voia, ci să căutăm voia Lui revelată și, prin rugăciune, să ne adâncim părtășia cu Tatăl. Ascultarea contează: o viață care păzește poruncile lui Dumnezeu susține această îndrăzneală, nu o viață de neascultare voită. Când vedem un frate căzând în păcat, răspunsul folositor nu este critica sau bârfa, ci mijlocirea: cerem ca Dumnezeu să-i dea viață și restaurare. Ioan vorbește și despre păcatul care duce la moarte; sursa nu pretinde o definiție exhaustivă, dar îl leagă de o atitudine împietrită față de puterea Duhului Sfânt care convinge de păcat. Pentru fratele care nu este în această împietrire, chemarea noastră este să ne rugăm, nu să-l condamnăm."

// 3) VBV 05 explicitly balances Christ keeping the believer with the believer keeping himself.
const keepingUnit = review["1-ioan-5-18-21-source-first"]
if (!keepingUnit || keepingUnit.action !== "rewrite") fail("1-ioan-5-18-21-source-first reviewed rewrite missing")
keepingUnit.rationale = "Transcriptul oficial VBV 05 cere păstrarea împreună a celor două laturi din versetul 18: Isus este în stare să-l păzească pe cel născut din Dumnezeu, iar credinciosul este chemat să se păzească pe sine. Sursa leagă explicit această cooperare de Iuda 21 și 24, arătând că nimeni din afară nu ne poate smulge din mâna lui Dumnezeu, dar noi putem părăsi voit locul dependenței și ascultării. Finalul despre idoli este partea practică a responsabilității noastre: dacă păstrăm în inimă lucruri care iau locul lui Dumnezeu, nu putem transforma promisiunea păzirii Lui într-o siguranță pasivă. TTB adaugă corect că și lucruri religioase bune pot deveni preocupări idolatre dacă înlocuiesc viața și părtășia cu Dumnezeu."
keepingUnit.revisedTeaching = "Ioan încheie ținând împreună responsabilitatea lui Dumnezeu și responsabilitatea noastră. Cel născut din Dumnezeu nu este chemat să trăiască sub stăpânirea păcatului: Isus este în stare să-l păzească de cădere, dar credinciosul este și el chemat să se păzească pe sine, rămânând supus Domnului. Nimeni — nici omul, nici demonul — nu ne poate smulge din mâna Tatălui, însă aceasta nu transformă credinciosul într-o mașină fără voință; el trebuie să rămână de bunăvoie în dragostea și ascultarea lui Dumnezeu. Tocmai de aceea avertismentul final este: păziți-vă de idoli. Idol poate fi banul, familia, slujba, confortul, plăcerea, onoarea sau orice alt lucru care ia primul loc în inimă; chiar și lucruri religioase bune pot deveni preocupări care Îl înlocuiesc pe Dumnezeu. Dacă păstrăm asemenea idoli, nu putem folosi promisiunea că Dumnezeu ne păzește drept scuză pentru pasivitate. Când ne păzim inima și rămânem vital uniți cu Fiul, ne sprijinim pe puterea Lui de a ne păzi, iar cel rău nu ne poate revendica drept ai lui."

fs.writeFileSync(SPEC, JSON.stringify(review, null, 2) + "\n", "utf8")

const ids = Object.keys(review)
const rewriteCount = ids.filter((id) => review[id]?.action === "rewrite").length
const keepCount = ids.filter((id) => review[id]?.action === "keep").length
if (ids.length !== 14 || rewriteCount !== 11 || keepCount !== 3) {
  fail(`expected final 14-decision review (11 rewrite / 3 keep), got ${ids.length} (${rewriteCount} rewrite / ${keepCount} keep)`)
}
for (const id of ids) {
  const item = review[id]
  if (!["keep", "rewrite"].includes(item?.action)) fail(`${id}: invalid action`)
  if (typeof item?.rationale !== "string" || !item.rationale.trim()) fail(`${id}: missing rationale`)
  if (item.action === "rewrite" && (typeof item.revisedTeaching !== "string" || item.revisedTeaching.trim().length < 80)) {
    fail(`${id}: rewrite missing substantial revisedTeaching`)
  }
}

const evidenceById = new Map((evidence.records ?? []).map((record) => [record.id, record]))
const ttbRecord = evidenceById.get(TTB_EVIDENCE_ID)
if (!ttbRecord) fail(`missing source evidence ${TTB_EVIDENCE_ID}`)
if (ttbRecord.sourceUrl !== TTB_URL) fail(`TTB transcript URL drifted: ${ttbRecord.sourceUrl}`)
if (ttbRecord.officialSeriesUrl !== TTB_OFFICIAL) fail(`TTB official provenance drifted: ${ttbRecord.officialSeriesUrl}`)
if (ttbRecord.verificationLevel !== "source-locator-reviewed") fail("TTB evidence is not source-locator-reviewed")
if (typeof ttbRecord.locator !== "string" || !ttbRecord.locator.startsWith("Full Transcript")) fail("TTB transcript locator drifted")

const vbvRecord = evidenceById.get(VBV_EVIDENCE_ID)
if (!vbvRecord) fail(`missing source evidence ${VBV_EVIDENCE_ID}`)
if (vbvRecord.verificationLevel !== "source-locator-reviewed") fail("VBV 05 evidence is not source-locator-reviewed")
if (typeof vbvRecord.locator !== "string" || !vbvRecord.locator.includes("Chapter 5:1") || !vbvRecord.locator.includes("5:21")) {
  fail(`VBV 05 locator drifted: ${vbvRecord.locator}`)
}

const transcriptChecks = {
  schema: "emanus-nt-official-audio-transcript-v1",
  bookId: "1-ioan",
  sourceId: VBV_SOURCE_ID,
  officialSourceUrl: VBV_PAGE,
  officialAudioUrl: VBV_AUDIO,
  officialAudioSha256: VBV_AUDIO_SHA256,
  sourceRange: VBV_SOURCE_RANGE,
  transcriptSha256: VBV_TRANSCRIPT_SHA256,
  wordCount: VBV_WORD_COUNT,
}
for (const [field, expected] of Object.entries(transcriptChecks)) {
  if (officialTranscript[field] !== expected) fail(`official transcript ${field} drifted; ${officialTranscript[field]} != ${expected}`)
}
if (!Array.isArray(officialTranscript.segments) || officialTranscript.segments.length < 1000) fail("official transcript segments missing/truncated")
const vbvText = officialTranscript.segments.map((segment) => String(segment.text ?? "")).join(" ").toLowerCase()
for (const phrase of [
  "came by water and blood",
  "water refers to his baptism",
  "blood of the cross",
  "freeing you from sin's power",
  "god has given us eternal life",
  "hardened attitude towards the convicting power of the holy spirit",
  "he who is born of god keeps himself",
  "keep yourselves in the love of god",
  "anything that takes the place of god in your life",
]) {
  if (!vbvText.includes(phrase)) fail(`official transcript no longer contains reviewed phrase: ${phrase}`)
}

const units = new Map()
for (const chapter of book.chapters ?? []) {
  for (const unit of chapter.units ?? []) units.set(unit.id, { chapter: chapter.number, unit })
}
if (units.size !== ids.length) fail(`expected ${ids.length} 1 Ioan units, found ${units.size}`)
for (const id of ids) if (!units.has(id)) fail(`missing reviewed unit ${id}`)
for (const id of units.keys()) if (!review[id]) fail(`unreviewed 1 Ioan unit ${id}`)

const decisions = []
for (const id of ids) {
  const spec = review[id]
  const located = units.get(id)
  const unit = located.unit
  if (located.chapter !== spec.chapter) fail(`${id}: chapter drift`)

  const current = sha(snap(unit))
  const approvedTeaching = spec.action === "rewrite" ? spec.revisedTeaching : unit.teaching
  const approvedHeart = Object.prototype.hasOwnProperty.call(spec, "revisedForYourHeart")
    ? spec.revisedForYourHeart
    : unit.forYourHeart
  const approved = sha(snap(unit, approvedTeaching, approvedHeart))
  const snapshotMatchesOriginal = current === spec.expectedCurrentSnapshotSha256
  const snapshotMatchesFrozenRewrite = spec.action === "rewrite" && current === approved
  if (!snapshotMatchesOriginal && !snapshotMatchesFrozenRewrite) {
    fail(`${id}: reviewed snapshot drifted; ${current} is neither original ${spec.expectedCurrentSnapshotSha256} nor frozen rewrite ${approved}`)
  }

  let transcriptEvidence
  if (VBV_UNIT_IDS.has(id)) {
    const anchors = (unit.sourceAnchors ?? []).filter((anchor) => anchor.evidenceId === VBV_EVIDENCE_ID)
    if (anchors.length !== 1) fail(`${id}: expected exactly one ${VBV_EVIDENCE_ID} anchor, found ${anchors.length}`)
    if (anchors[0].verificationLevel !== "source-locator-reviewed") fail(`${id}: VBV anchor is not source-locator-reviewed`)
    if (anchors[0].evidenceSha256 !== vbvRecord.evidenceSha256) fail(`${id}: VBV anchor/evidence hash mismatch`)

    const payload = {
      officialSourceUrl: VBV_PAGE,
      transcriptSourceUrl: VBV_AUDIO,
      sourceRange: VBV_SOURCE_RANGE,
      transcriptSha256: VBV_TRANSCRIPT_SHA256,
    }
    transcriptEvidence = [{
      ...payload,
      evidenceSha256: sha(JSON.stringify(canon(payload))),
      officialAudioSha256: VBV_AUDIO_SHA256,
      transcriptionModel: officialTranscript.transcriptionModel,
    }]
  } else {
    const anchors = (unit.sourceAnchors ?? []).filter((anchor) => anchor.evidenceId === TTB_EVIDENCE_ID)
    if (anchors.length !== 1) fail(`${id}: expected exactly one ${TTB_EVIDENCE_ID} anchor, found ${anchors.length}`)
    if (anchors[0].verificationLevel !== "source-locator-reviewed") fail(`${id}: TTB anchor is not source-locator-reviewed`)
    if (anchors[0].evidenceSha256 !== ttbRecord.evidenceSha256) fail(`${id}: TTB anchor/evidence hash mismatch`)

    const payload = {
      officialSourceUrl: TTB_OFFICIAL,
      transcriptSourceUrl: TTB_URL,
      sourceRange: ttbRecord.locator,
      transcriptSha256: TTB_SHA256,
    }
    transcriptEvidence = [{ ...payload, evidenceSha256: sha(JSON.stringify(canon(payload))) }]
  }

  const teaching = spec.action === "rewrite" ? spec.revisedTeaching : unit.teaching
  const forYourHeart = Object.prototype.hasOwnProperty.call(spec, "revisedForYourHeart")
    ? spec.revisedForYourHeart
    : unit.forYourHeart
  if (typeof teaching !== "string" || teaching.trim().length < 80) fail(`${id}: final teaching too short`)
  if (/\b(?:Poonen|CFC|SermonIndex)\b/i.test(teaching)) fail(`${id}: source attribution leaked into reader copy`)

  const decision = {
    bookId: "1-ioan",
    chapter: spec.chapter,
    unitId: id,
    status: "approved-against-transcript",
    action: spec.action,
    reviewedTeachingSha256: sha(snap(unit, teaching, forYourHeart)),
    transcriptEvidence,
    rationale: spec.rationale,
    reviewer: REVIEWER,
    reviewedOn: "2026-08-10",
  }
  if (spec.action === "rewrite") {
    decision.revisedTeaching = teaching
    if (Object.prototype.hasOwnProperty.call(spec, "revisedForYourHeart")) decision.revisedForYourHeart = forYourHeart
  }
  decisions.push(decision)
}

fs.mkdirSync(OUTDIR, { recursive: true })
fs.writeFileSync(OUT, JSON.stringify({
  schema: "emanus-nt-semantic-review-book-v1",
  bookId: "1-ioan",
  reviewMode: "manual-sentence-level-against-exact-exported-transcript-representation",
  decisions,
}, null, 2) + "\n", "utf8")

console.log(`1 Ioan final manual semantic review: ${decisions.length} decisions (${decisions.filter((d) => d.action === "rewrite").length} rewrite / ${decisions.filter((d) => d.action === "keep").length} keep).`)
