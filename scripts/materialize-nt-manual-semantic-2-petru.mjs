#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const BOOK = path.join(ROOT, "docs/data/biblia-explicata/nt-final-source-first/22-2-petru.json")
const EVIDENCE = path.join(ROOT, "docs/data/biblia-explicata/nt-source-evidence.json")
const SPEC = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-review-spec/22-2-petru.json")
const OFFICIAL_TRANSCRIPT = path.join(ROOT, "docs/data/biblia-explicata/nt-official-transcripts/2-petru-ttb.json")
const OUTDIR = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-review-manual")
const OUT = path.join(OUTDIR, "22-2-petru.json")

const EVIDENCE_ID = "ev-ttb-peter-transcript"
const OFFICIAL_SOURCE = "https://www.cfcindia.com/through-the-bible/1-peter-2-peter"
const OFFICIAL_SERIES = "https://www.cfcindia.com/bible"
const OFFICIAL_AUDIO = "https://www.cfcindia.org/resources/en/study-series/through-the-bible/66-1peter-and-2peter.mp3"
const AUDIO_SHA256 = "sha256:2333b5b9a08e6d5c4eaf462a262af056dd3ed771855a8faa1603996e5ec733a5"
const TRANSCRIPT_SHA256 = "sha256:7dd96cd1b728dace6d3fd6652b271726270d88dd10f14a00a6c9786aac08a400"
const SOURCE_RANGE = "1 Peter 1:1-2 Peter 3:18; semantic review target: complete 2 Peter section"
const WORD_COUNT = 8399
const SEGMENT_COUNT = 802
const REVIEWER = "GPT-5.6 Sol manual sentence-level semantic review against persisted official CFC audio transcript"

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
  console.error(`[2 Petru manual semantic review] ${message}`)
  process.exit(1)
}

for (const filePath of [BOOK, EVIDENCE, SPEC, OFFICIAL_TRANSCRIPT]) {
  if (!fs.existsSync(filePath)) fail(`missing ${path.relative(ROOT, filePath)}`)
}

const book = JSON.parse(fs.readFileSync(BOOK, "utf8"))
const evidence = JSON.parse(fs.readFileSync(EVIDENCE, "utf8"))
const review = JSON.parse(fs.readFileSync(SPEC, "utf8"))
const transcript = JSON.parse(fs.readFileSync(OFFICIAL_TRANSCRIPT, "utf8"))
if (book.id !== "2-petru") fail(`expected 2-petru book, got ${book.id}`)
if (!review || Array.isArray(review) || typeof review !== "object") fail("semantic review spec must be an object keyed by unit id")

const ids = Object.keys(review)
const rewriteCount = ids.filter((id) => review[id]?.action === "rewrite").length
const keepCount = ids.filter((id) => review[id]?.action === "keep").length
if (ids.length !== 9 || rewriteCount !== 5 || keepCount !== 4) {
  fail(`expected frozen 9-decision review (5 rewrite / 4 keep), got ${ids.length} (${rewriteCount} rewrite / ${keepCount} keep)`)
}
for (const id of ids) {
  const item = review[id]
  if (!["keep", "rewrite"].includes(item?.action)) fail(`${id}: invalid action`)
  if (typeof item?.rationale !== "string" || !item.rationale.trim()) fail(`${id}: missing rationale`)
  if (item.action === "rewrite" && (typeof item.revisedTeaching !== "string" || item.revisedTeaching.trim().length < 80)) {
    fail(`${id}: rewrite missing substantial revisedTeaching`)
  }
}

const expectedTranscript = {
  schema: "emanus-nt-official-audio-transcript-v1",
  bookId: "2-petru",
  sourceId: "2-petru-ttb",
  officialSourceUrl: OFFICIAL_SOURCE,
  officialAudioUrl: OFFICIAL_AUDIO,
  officialAudioSha256: AUDIO_SHA256,
  sourceRange: SOURCE_RANGE,
  transcriptionModel: "faster-whisper small.en / CTranslate2 int8 CPU",
  language: "en",
  transcriptSha256: TRANSCRIPT_SHA256,
  wordCount: WORD_COUNT,
  segmentCount: SEGMENT_COUNT,
}
for (const [field, expected] of Object.entries(expectedTranscript)) {
  if (transcript[field] !== expected) fail(`official transcript ${field} drifted; ${transcript[field]} != ${expected}`)
}
if (!Array.isArray(transcript.segments) || transcript.segments.length !== SEGMENT_COUNT) {
  fail(`official transcript segments drifted; ${transcript.segments?.length} != ${SEGMENT_COUNT}`)
}

const transcriptText = transcript.segments.map((segment) => String(segment.text ?? "")).join(" ").toLowerCase()
const requiredPhrases = [
  "2 peter",
  "partaking of god's own nature",
  "everything necessary for life and godliness",
  "god has revealed in the scriptures",
  "through the holy spirit",
  "he forgets what type of sinner he was",
  "what type of pit god pulled us out from",
  "doctrines are right who are false teachers",
  "their sensuality",
  "greedy for money",
  "they never partook of god's nature",
  "that cleanliness was only on the outside",
  "he wants all people to come to repentance",
  "names are in the book of life",
  "be diligent to be found without spot",
  "grow in grace",
]
for (const phrase of requiredPhrases) {
  if (!transcriptText.includes(phrase)) fail(`official transcript no longer contains reviewed phrase: ${phrase}`)
}
const secondPeterStart = transcript.segments.findIndex((segment) => /\b2 peter\b/i.test(String(segment.text ?? "")))
if (secondPeterStart < 0) fail("could not locate explicit 2 Peter transition in official transcript")
const secondPeterSegments = transcript.segments.slice(secondPeterStart)
const secondPeterWords = secondPeterSegments.reduce((sum, segment) => sum + String(segment.text ?? "").trim().split(/\s+/).filter(Boolean).length, 0)
if (secondPeterWords < 1400) fail(`2 Peter transcript section unexpectedly short: ${secondPeterWords} words`)

const evidenceById = new Map((evidence.records ?? []).map((record) => [record.id, record]))
const record = evidenceById.get(EVIDENCE_ID)
if (!record) fail(`missing source evidence ${EVIDENCE_ID}`)
if (record.sourceUrl !== OFFICIAL_SOURCE) fail(`official source URL drifted; ${record.sourceUrl}`)
if (record.officialSeriesUrl !== OFFICIAL_SERIES) fail(`official series URL drifted; ${record.officialSeriesUrl}`)
if (record.sourceTitle !== "Through the Bible - 1 Peter & 2 Peter") fail(`source title drifted; ${record.sourceTitle}`)
if (record.evidenceKind !== "official-audio-study-locator") fail(`evidence kind drifted; ${record.evidenceKind}`)
if (record.verificationLevel !== "source-locator-reviewed") fail(`verification level drifted; ${record.verificationLevel}`)
if (typeof record.locator !== "string" || !record.locator.includes("complete 2 Peter discussion")) fail(`source locator drifted; ${record.locator}`)

const units = new Map()
for (const chapter of book.chapters ?? []) {
  for (const unit of chapter.units ?? []) units.set(unit.id, { chapter: chapter.number, unit })
}
if (units.size !== ids.length) fail(`expected ${ids.length} 2 Petru units, found ${units.size}`)
for (const id of ids) if (!units.has(id)) fail(`missing reviewed unit ${id}`)
for (const id of units.keys()) if (!review[id]) fail(`unreviewed 2 Petru unit ${id}`)

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

  const anchors = (unit.sourceAnchors ?? []).filter((anchor) => anchor.evidenceId === EVIDENCE_ID)
  if (anchors.length !== 1) fail(`${id}: expected exactly one ${EVIDENCE_ID} anchor, found ${anchors.length}`)
  const anchor = anchors[0]
  if (anchor.verificationLevel !== "source-locator-reviewed") fail(`${id}: source anchor is not source-locator-reviewed`)
  if (anchor.evidenceSha256 !== record.evidenceSha256) fail(`${id}: source anchor/evidence hash mismatch`)

  const transcriptPayload = {
    officialSourceUrl: OFFICIAL_SOURCE,
    transcriptSourceUrl: OFFICIAL_AUDIO,
    sourceRange: SOURCE_RANGE,
    transcriptSha256: TRANSCRIPT_SHA256,
  }
  const transcriptEvidence = [{
    ...transcriptPayload,
    evidenceSha256: sha(JSON.stringify(canon(transcriptPayload))),
    officialAudioSha256: AUDIO_SHA256,
    transcriptionModel: transcript.transcriptionModel,
    reviewedSectionStartSeconds: secondPeterSegments[0].start,
    reviewedSectionEndSeconds: secondPeterSegments.at(-1)?.end,
    reviewedSectionWordCount: secondPeterWords,
  }]

  const teaching = spec.action === "rewrite" ? spec.revisedTeaching : unit.teaching
  const forYourHeart = Object.prototype.hasOwnProperty.call(spec, "revisedForYourHeart")
    ? spec.revisedForYourHeart
    : unit.forYourHeart
  if (typeof teaching !== "string" || teaching.trim().length < 80) fail(`${id}: final teaching too short`)
  if (/\b(?:Poonen|CFC|SermonIndex)\b/i.test(teaching)) fail(`${id}: source attribution leaked into reader copy`)

  const decision = {
    bookId: "2-petru",
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
  bookId: "2-petru",
  reviewMode: "manual-sentence-level-against-persisted-official-cfc-audio-transcript",
  decisions,
}, null, 2) + "\n", "utf8")

console.log(`2 Petru manual semantic review: ${decisions.length} decisions (${decisions.filter((d) => d.action === "rewrite").length} rewrite / ${decisions.filter((d) => d.action === "keep").length} keep); official 2 Petru section ${secondPeterWords} words.`)
