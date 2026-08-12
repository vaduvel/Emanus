#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const BOOK = path.join(ROOT, "docs/data/biblia-explicata/nt-final-source-first/20-iacov.json")
const SPEC = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-review-spec/20-iacov.json")
const OFFICIAL_TRANSCRIPT = path.join(ROOT, "docs/data/biblia-explicata/nt-official-transcripts/iacov-ttb.json")
const OUTDIR = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-review-manual")
const OUT = path.join(OUTDIR, "20-iacov.json")

const OFFICIAL_SOURCE = "https://www.cfcindia.com/through-the-bible/james"
const OFFICIAL_AUDIO = "https://www.cfcindia.org/resources/en/study-series/through-the-bible/65.james.mp3"
const AUDIO_SHA256 = "sha256:4de64ec4056e0d016ba69c47a113950bbf5dd53b0e724a008c8dbdce6a613698"
const TRANSCRIPT_SHA256 = "sha256:37094945179caa599fec8b61779995a808094f4024866371947ce820788cedff"
const WORD_COUNT = 8915
const SEGMENT_COUNT = 967
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
  console.error(`[Iacov manual semantic review] ${message}`)
  process.exit(1)
}

for (const filePath of [BOOK, SPEC, OFFICIAL_TRANSCRIPT]) {
  if (!fs.existsSync(filePath)) fail(`missing ${path.relative(ROOT, filePath)}`)
}

const book = JSON.parse(fs.readFileSync(BOOK, "utf8"))
const review = JSON.parse(fs.readFileSync(SPEC, "utf8"))
const transcript = JSON.parse(fs.readFileSync(OFFICIAL_TRANSCRIPT, "utf8"))
if (book.id !== "iacov") fail(`expected iacov book, got ${book.id}`)
if (!review || Array.isArray(review) || typeof review !== "object") fail("semantic review spec must be an object keyed by unit id")

const ids = Object.keys(review)
const rewriteCount = ids.filter((id) => review[id]?.action === "rewrite").length
const keepCount = ids.filter((id) => review[id]?.action === "keep").length
if (ids.length !== 15 || rewriteCount !== 7 || keepCount !== 8) {
  fail(`expected frozen 15-decision review (7 rewrite / 8 keep), got ${ids.length} (${rewriteCount} rewrite / ${keepCount} keep)`)
}
for (const id of ids) {
  const item = review[id]
  if (!["keep", "rewrite"].includes(item?.action)) fail(`${id}: invalid action`)
  if (!Number.isInteger(item?.chapter)) fail(`${id}: missing chapter`)
  if (typeof item?.rationale !== "string" || !item.rationale.trim()) fail(`${id}: missing rationale`)
  if (typeof item?.expectedCurrentSnapshotSha256 !== "string" || !/^sha256:[0-9a-f]{64}$/.test(item.expectedCurrentSnapshotSha256)) {
    fail(`${id}: missing frozen expectedCurrentSnapshotSha256`)
  }
  if (item.action === "rewrite" && (typeof item.revisedTeaching !== "string" || item.revisedTeaching.trim().length < 120)) {
    fail(`${id}: rewrite missing substantial revisedTeaching`)
  }
}

const expectedTranscript = {
  schema: "emanus-nt-official-audio-transcript-v1",
  bookId: "iacov",
  sourceId: "iacov-ttb",
  officialSourceUrl: OFFICIAL_SOURCE,
  officialAudioUrl: OFFICIAL_AUDIO,
  officialAudioSha256: AUDIO_SHA256,
  sourceRange: "James 1:1-5:20",
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
const transcriptText = transcript.segments.map((segment) => String(segment.text ?? "").trim()).filter(Boolean).join("\n") + "\n"
const transcriptTextLower = transcriptText.toLowerCase()
const requiredPhrases = [
  "faith must produce works",
  "consider it all joy",
  "the fact that the temptation comes doesn't mean it's sin",
  "quick to hear and slow to speak",
  "your godliness is worth zero",
  "mercy must win",
  "faith without works is dead",
  "your tongue is the test of your spirituality",
  "bitter jealousy",
  "selfish ambition",
  "friendship with this world system",
  "humility, humility, humility",
  "don't speak evil against others",
  "pay your servants properly",
  "sometimes god wants us to persist in prayer",
  "if you find a man in sin and you turn him",
]
for (const phrase of requiredPhrases) {
  if (!transcriptTextLower.includes(phrase)) fail(`official Iacov transcript no longer contains reviewed phrase: ${phrase}`)
}

const units = new Map()
for (const chapter of book.chapters ?? []) {
  for (const unit of chapter.units ?? []) units.set(unit.id, { chapter: chapter.number, unit })
}
if (units.size !== ids.length) fail(`expected ${ids.length} Iacov units, found ${units.size}`)
for (const id of ids) if (!units.has(id)) fail(`missing reviewed unit ${id}`)
for (const id of units.keys()) if (!review[id]) fail(`unreviewed Iacov unit ${id}`)

const transcriptPayload = {
  officialSourceUrl: OFFICIAL_SOURCE,
  transcriptSourceUrl: OFFICIAL_AUDIO,
  sourceRange: "James 1:1-5:20; complete official Through the Bible study",
  transcriptSha256: TRANSCRIPT_SHA256,
}
const baseTranscriptEvidence = {
  ...transcriptPayload,
  evidenceSha256: sha(JSON.stringify(canon(transcriptPayload))),
  officialAudioSha256: AUDIO_SHA256,
  transcriptionModel: transcript.transcriptionModel,
  reviewedSectionStartSeconds: transcript.segments[0]?.start,
  reviewedSectionEndSeconds: transcript.segments.at(-1)?.end,
  reviewedSectionWordCount: WORD_COUNT,
}

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

  if (!(unit.sourceIds ?? []).includes("ttb-james")) fail(`${id}: missing ttb-james source family`)
  const anchors = (unit.sourceAnchors ?? []).filter((anchor) => anchor.sourceId === "ttb-james")
  if (anchors.length < 1) fail(`${id}: missing ttb-james source anchor`)
  for (const anchor of anchors) {
    if (anchor.verificationLevel !== "source-locator-reviewed") fail(`${id}: ttb-james anchor is not source-locator-reviewed`)
  }

  const teaching = spec.action === "rewrite" ? spec.revisedTeaching : unit.teaching
  const forYourHeart = Object.prototype.hasOwnProperty.call(spec, "revisedForYourHeart")
    ? spec.revisedForYourHeart
    : unit.forYourHeart
  if (typeof teaching !== "string" || teaching.trim().length < 80) fail(`${id}: final teaching too short`)
  if (/\b(?:Poonen|CFC|SermonIndex)\b/i.test(teaching)) fail(`${id}: source attribution leaked into reader copy`)

  const decision = {
    bookId: "iacov",
    chapter: spec.chapter,
    unitId: id,
    status: "approved-against-transcript",
    action: spec.action,
    reviewedTeachingSha256: sha(snap(unit, teaching, forYourHeart)),
    transcriptEvidence: [{ ...baseTranscriptEvidence }],
    rationale: spec.rationale,
    reviewer: REVIEWER,
    reviewedOn: "2026-08-11",
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
  bookId: "iacov",
  reviewMode: "manual-sentence-level-against-persisted-official-cfc-through-the-bible-audio-transcript",
  decisions,
}, null, 2) + "\n", "utf8")

console.log(`Iacov manual semantic review: ${decisions.length} decisions (${decisions.filter((d) => d.action === "rewrite").length} rewrite / ${decisions.filter((d) => d.action === "keep").length} keep); official transcript ${WORD_COUNT} words, sha ${TRANSCRIPT_SHA256}.`)
