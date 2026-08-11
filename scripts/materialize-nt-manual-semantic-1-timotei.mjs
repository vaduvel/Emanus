#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const BOOK = path.join(ROOT, "docs/data/biblia-explicata/nt-final-source-first/15-1-timotei.json")
const SPEC = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-review-spec/15-1-timotei.json")
const OUTDIR = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-review-manual")
const OUT = path.join(OUTDIR, "15-1-timotei.json")
const TRANSCRIPT_DIR = path.join(ROOT, "docs/data/biblia-explicata/nt-official-transcripts")
const OFFICIAL_SOURCE = "https://www.cfcindia.com/verse-by-verse/1-Timothy"
const MODEL = "faster-whisper small.en / CTranslate2 int8 CPU"
const REVIEWER = "GPT-5.6 Sol manual sentence-level semantic review against persisted official CFC Verse-by-Verse audio transcripts"

const EPISODES = {
  "01": {
    sourceId: "1-timotei-vbv-01",
    officialAudioUrl: "https://www.cfcindia.org/resources/en/study-series/verse-by-verse/nt15-1timothy-chapter-1-1-to-chapter-2-9.mp3",
    officialAudioSha256: "sha256:12159f14a78125e2e63d948bbcdcd46af7c68d018ea90d3663d4edba91377e45",
    sourceRange: "1 Timothy 1:1-2:9",
    transcriptSha256: "sha256:1fbf354216273f79b6c6acf117742ccaab1ce43f2ab71b2f9483fd2d04b3f47f",
    wordCount: 13906,
    segmentCount: 484,
    requiredPhrases: [
      "the goal of all our teaching",
      "law is not made for a righteous man",
      "considered me faithful",
      "christ jesus came into the world to save sinners",
      "fight the good fight",
      "give thanks for all men",
      "one mediator between god and men",
      "men in every place to pray"
    ]
  },
  "02": {
    sourceId: "1-timotei-vbv-02",
    officialAudioUrl: "https://www.cfcindia.org/resources/en/study-series/verse-by-verse/nt15-1timothy-chapter-2-8-to-chapter-4-2.mp3",
    officialAudioSha256: "sha256:d0db63f07c0226073d21d6289e99ee3ba66313f1e6e3d720298900b259ce60aa",
    sourceRange: "1 Timothy 2:8-4:2",
    transcriptSha256: "sha256:63e18f8982f1bb90777118382f418265c3c03cf4752830c6e0d535f8d61cbd20",
    wordCount: 13168,
    segmentCount: 1021,
    requiredPhrases: [
      "lifting up holy hands",
      "a woman can pray and prophesy",
      "i do not allow a woman to teach",
      "elders always in the plural",
      "emphasis was primarily on character and maturity",
      "deacons are primarily responsible for the material aspects",
      "pillar and support of the truth",
      "great mystery of godliness",
      "some will fall away from the faith"
    ]
  },
  "03": {
    sourceId: "1-timotei-vbv-03",
    officialAudioUrl: "https://www.cfcindia.org/resources/en/study-series/verse-by-verse/nt15-1timothy-chapter-4-3-to-chapter-5-13.mp3",
    officialAudioSha256: "sha256:8fa81720f8c0a95bb5501d8925c81daf8163625fae5b212360f9572226f42e25",
    sourceRange: "1 Timothy 4:1-5:13",
    transcriptSha256: "sha256:b3375158a2903ff651bcbaadfe4c2b86d0a5d4bbe5850487bb3e3f43a0695ae9",
    wordCount: 12691,
    segmentCount: 1050,
    requiredPhrases: [
      "beginning at verse 1",
      "forbidding of marriage",
      "discipline yourself for the purpose of godliness",
      "let no one look down on your youth",
      "older man",
      "widows",
      "worse than an unbeliever"
    ]
  },
  "04": {
    sourceId: "1-timotei-vbv-04",
    officialAudioUrl: "https://www.cfcindia.org/resources/en/study-series/verse-by-verse/nt15-1timothy-chapter-5-11-to-chapter-6-21.mp3",
    officialAudioSha256: "sha256:38376f36d95b06b3b02404ce69b3b9064b97f1b84377a047473b6837bc7f6870",
    sourceRange: "1 Timothy 5:11-6:21",
    transcriptSha256: "sha256:784184cd57cb2e4c587726cda3af49c850a5bb529f4fd303d6f6105eeb48bb82",
    wordCount: 13247,
    segmentCount: 857,
    requiredPhrases: [
      "younger widows",
      "elders who rule well",
      "love of money",
      "godliness is a means of great gain",
      "fight the good fight of faith",
      "pontius pilate",
      "rich in this present world",
      "whatever has been entrusted to you"
    ]
  }
}

const EVIDENCE_MAP = {
  "1-timotei-1-1-7-source-first": ["01"],
  "1-timotei-1-8-11-source-first": ["01"],
  "1-timotei-1-12-17-source-first": ["01"],
  "1-timotei-1-18-20-source-first": ["01"],
  "1-timotei-2-1-7-source-first": ["01"],
  "1-timotei-2-8-10-source-first": ["01", "02"],
  "1-timotei-2-11-15-source-first": ["02"],
  "1-timotei-3-1-7-source-first": ["02"],
  "1-timotei-3-8-13-source-first": ["02"],
  "1-timotei-3-14-16-source-first": ["02"],
  "1-timotei-4-1-5-source-first": ["02", "03"],
  "1-timotei-4-6-10-source-first": ["03"],
  "1-timotei-4-11-16-source-first": ["03"],
  "1-timotei-5-1-2-source-first": ["03"],
  "1-timotei-5-3-16-source-first": ["03", "04"],
  "1-timotei-5-17-20-source-first": ["04"],
  "1-timotei-5-21-25-source-first": ["04"],
  "1-timotei-6-1-2-source-first": ["04"],
  "1-timotei-6-3-10-source-first": ["04"],
  "1-timotei-6-11-16-source-first": ["04"],
  "1-timotei-6-17-19-source-first": ["04"],
  "1-timotei-6-20-21-source-first": ["04"]
}

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
  console.error(`[1 Timotei manual semantic review] ${message}`)
  process.exit(1)
}

for (const p of [BOOK, SPEC]) if (!fs.existsSync(p)) fail(`missing ${path.relative(ROOT, p)}`)
const book = JSON.parse(fs.readFileSync(BOOK, "utf8"))
const reviewFile = JSON.parse(fs.readFileSync(SPEC, "utf8"))
if (book.id !== "1-timotei") fail(`expected 1-timotei book, got ${book.id}`)
if (reviewFile.schema !== "emanus-manual-review-spec-v2" || reviewFile.bookId !== "1-timotei" || !reviewFile.decisions) fail("unexpected review spec")
const review = reviewFile.decisions
const ids = Object.keys(review)
const rewriteCount = ids.filter((id) => review[id]?.action === "rewrite").length
const keepCount = ids.filter((id) => review[id]?.action === "keep").length
if (ids.length !== 22 || rewriteCount !== 12 || keepCount !== 10) {
  fail(`expected frozen 22-decision review (12 rewrite / 10 keep), got ${ids.length} (${rewriteCount} rewrite / ${keepCount} keep)`)
}
if (Object.keys(EVIDENCE_MAP).length !== 22) fail("evidence map does not cover 22 units")
for (const id of ids) {
  const item = review[id]
  if (!["keep", "rewrite"].includes(item?.action)) fail(`${id}: invalid action`)
  if (!Number.isInteger(item?.chapter)) fail(`${id}: missing chapter`)
  if (typeof item?.rationale !== "string" || !item.rationale.trim()) fail(`${id}: missing rationale`)
  if (typeof item?.expectedCurrentSnapshotSha256 !== "string" || !/^sha256:[0-9a-f]{64}$/.test(item.expectedCurrentSnapshotSha256)) fail(`${id}: missing frozen expectedCurrentSnapshotSha256`)
  if (item.action === "rewrite" && (typeof item.revisedTeaching !== "string" || item.revisedTeaching.trim().length < 120)) fail(`${id}: rewrite missing substantial revisedTeaching`)
  if (!EVIDENCE_MAP[id]) fail(`${id}: missing evidence map`)
}

const transcripts = {}
for (const [key, expected] of Object.entries(EPISODES)) {
  const p = path.join(TRANSCRIPT_DIR, `${expected.sourceId}.json`)
  if (!fs.existsSync(p)) fail(`missing ${path.relative(ROOT, p)}`)
  const transcript = JSON.parse(fs.readFileSync(p, "utf8"))
  const fields = {
    schema: "emanus-nt-official-audio-transcript-v1",
    bookId: "1-timotei",
    sourceId: expected.sourceId,
    officialSourceUrl: OFFICIAL_SOURCE,
    officialAudioUrl: expected.officialAudioUrl,
    officialAudioSha256: expected.officialAudioSha256,
    sourceRange: expected.sourceRange,
    transcriptionModel: MODEL,
    language: "en",
    transcriptSha256: expected.transcriptSha256,
    wordCount: expected.wordCount,
    segmentCount: expected.segmentCount
  }
  for (const [field, value] of Object.entries(fields)) if (transcript[field] !== value) fail(`${expected.sourceId}: ${field} drifted; ${transcript[field]} != ${value}`)
  if (!Array.isArray(transcript.segments) || transcript.segments.length !== expected.segmentCount) fail(`${expected.sourceId}: segment array drifted`)
  const transcriptText = transcript.segments.map((s) => String(s.text ?? "").trim()).filter(Boolean).join("\n") + "\n"
  if (sha(transcriptText) !== expected.transcriptSha256) fail(`${expected.sourceId}: recomputed transcript SHA drifted`)
  const lower = transcriptText.toLowerCase()
  for (const phrase of expected.requiredPhrases) if (!lower.includes(phrase)) fail(`${expected.sourceId}: reviewed phrase missing: ${phrase}`)
  transcripts[key] = { transcript, first: transcript.segments[0], last: transcript.segments.at(-1) }
}
if (transcripts["03"].first?.text !== "We turn today to 1 Timothy and chapter 4, beginning at verse 1.") fail("episode 03 no longer proves 4:1 coverage")

const units = new Map()
for (const chapter of book.chapters ?? []) for (const unit of chapter.units ?? []) units.set(unit.id, { chapter: chapter.number, unit })
if (units.size !== 22) fail(`expected 22 current 1 Timotei units, found ${units.size}`)
for (const id of ids) if (!units.has(id)) fail(`missing reviewed unit ${id}`)
for (const id of units.keys()) if (!review[id]) fail(`unreviewed 1 Timotei unit ${id}`)

const decisions = []
for (const id of ids) {
  const spec = review[id]
  const located = units.get(id)
  const unit = located.unit
  if (located.chapter !== spec.chapter) fail(`${id}: chapter drift`)
  const current = sha(snap(unit))
  if (current !== spec.expectedCurrentSnapshotSha256) fail(`${id}: reviewed pre-edit snapshot drifted; ${current} != ${spec.expectedCurrentSnapshotSha256}`)
  if (!(unit.sourceIds ?? []).includes("vbv-1timothy")) fail(`${id}: missing vbv-1timothy source family`)
  const vbvAnchors = (unit.sourceAnchors ?? []).filter((anchor) => anchor.sourceId === "vbv-1timothy")
  if (vbvAnchors.length < 1) fail(`${id}: missing vbv-1timothy source anchor`)
  for (const anchor of vbvAnchors) if (anchor.verificationLevel !== "source-locator-reviewed") fail(`${id}: VBV anchor is not source-locator-reviewed`)

  const transcriptEvidence = EVIDENCE_MAP[id].map((key) => {
    const expected = EPISODES[key]
    const { transcript, first, last } = transcripts[key]
    const payload = {
      officialSourceUrl: OFFICIAL_SOURCE,
      transcriptSourceUrl: expected.officialAudioUrl,
      sourceRange: expected.sourceRange,
      transcriptSha256: expected.transcriptSha256
    }
    return {
      ...payload,
      evidenceSha256: sha(JSON.stringify(canon(payload))),
      officialAudioSha256: expected.officialAudioSha256,
      transcriptionModel: transcript.transcriptionModel,
      reviewedSectionStartSeconds: first?.start,
      reviewedSectionEndSeconds: last?.end,
      reviewedSectionWordCount: expected.wordCount
    }
  })

  const teaching = spec.action === "rewrite" ? spec.revisedTeaching : unit.teaching
  const forYourHeart = Object.prototype.hasOwnProperty.call(spec, "revisedForYourHeart") ? spec.revisedForYourHeart : unit.forYourHeart
  if (typeof teaching !== "string" || teaching.trim().length < 80) fail(`${id}: final teaching too short`)
  if (/\b(?:Poonen|CFC|SermonIndex|Word4AllTime)\b/i.test(teaching)) fail(`${id}: source attribution leaked into reader copy`)
  const decision = {
    bookId: "1-timotei",
    chapter: spec.chapter,
    unitId: id,
    status: "approved-against-transcript",
    action: spec.action,
    reviewedTeachingSha256: sha(snap(unit, teaching, forYourHeart)),
    transcriptEvidence,
    rationale: spec.rationale,
    reviewer: REVIEWER,
    reviewedOn: "2026-08-11"
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
  bookId: "1-timotei",
  reviewMode: "manual-sentence-level-against-four-persisted-official-cfc-verse-by-verse-audio-transcripts",
  decisions
}, null, 2) + "\n", "utf8")
console.log(`1 Timotei manual semantic review: ${decisions.length} decisions (${rewriteCount} rewrite / ${keepCount} keep); four exact official VBV transcripts verified.`)
