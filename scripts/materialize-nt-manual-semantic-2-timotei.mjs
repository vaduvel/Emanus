#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const BOOK = path.join(ROOT, "docs/data/biblia-explicata/nt-final-source-first/16-2-timotei.json")
const EVIDENCE = path.join(ROOT, "docs/data/biblia-explicata/nt-source-evidence.json")
const SPEC = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-review-spec/16-2-timotei.json")
const OUTDIR = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-review-manual")
const OUT = path.join(OUTDIR, "16-2-timotei.json")
const OFFICIAL = "https://www.cfcindia.com/bible"
const TRANSCRIPT = "https://sermonindex.net/speakers/zac-poonen/through-the-bible-2-timothy-2/"
const TRANSCRIPT_SHA256 = "sha256:ca722919a0bf77d4baac515ebaf65e62f39de98a1865cd36c892fbf7735cde04"
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
  console.error(`[2 Timotei manual semantic review] ${message}`)
  process.exit(1)
}

for (const filePath of [BOOK, EVIDENCE, SPEC]) {
  if (!fs.existsSync(filePath)) fail(`missing ${path.relative(ROOT, filePath)}`)
}

const book = JSON.parse(fs.readFileSync(BOOK, "utf8"))
const evidence = JSON.parse(fs.readFileSync(EVIDENCE, "utf8"))
const REVIEW = JSON.parse(fs.readFileSync(SPEC, "utf8"))
if (book.id !== "2-timotei") fail(`expected 2-timotei book, got ${book.id}`)
if (!REVIEW || Array.isArray(REVIEW) || typeof REVIEW !== "object") fail("semantic review spec must be an object keyed by unit id")

const ids = Object.keys(REVIEW)
const rewriteCount = ids.filter((id) => REVIEW[id]?.action === "rewrite").length
const keepCount = ids.filter((id) => REVIEW[id]?.action === "keep").length
if (ids.length !== 14 || rewriteCount !== 6 || keepCount !== 8) {
  fail(`expected frozen 14-decision review (6 rewrite / 8 keep), got ${ids.length} (${rewriteCount} rewrite / ${keepCount} keep)`)
}
for (const id of ids) {
  const item = REVIEW[id]
  if (!["keep", "rewrite"].includes(item?.action)) fail(`${id}: invalid action`)
  if (typeof item?.rationale !== "string" || !item.rationale.trim()) fail(`${id}: missing rationale`)
  if (item.action === "rewrite" && (typeof item.revisedTeaching !== "string" || item.revisedTeaching.trim().length < 80)) {
    fail(`${id}: rewrite missing substantial revisedTeaching`)
  }
}

const evidenceById = new Map((evidence.records ?? []).map((record) => [record.id, record]))
const units = new Map()
for (const chapter of book.chapters ?? []) {
  for (const unit of chapter.units ?? []) units.set(unit.id, { chapter: chapter.number, unit })
}
if (units.size !== ids.length) fail(`expected ${ids.length} 2 Timotei units, found ${units.size}`)
for (const id of ids) if (!units.has(id)) fail(`missing reviewed unit ${id}`)
for (const id of units.keys()) if (!REVIEW[id]) fail(`unreviewed 2 Timotei unit ${id}`)

const decisions = []
for (const id of ids) {
  const spec = REVIEW[id]
  const located = units.get(id)
  const unit = located.unit
  if (located.chapter !== spec.chapter) fail(`${id}: chapter drift`)

  const current = sha(snap(unit))
  if (current !== spec.expectedCurrentSnapshotSha256) {
    fail(`${id}: reviewed pre-edit snapshot drifted; ${current} != ${spec.expectedCurrentSnapshotSha256}`)
  }

  const transcriptAnchors = (unit.sourceAnchors ?? [])
    .map((anchor) => ({ anchor, record: evidenceById.get(anchor.evidenceId) }))
    .filter(({ record }) => record?.sourceUrl === TRANSCRIPT)
  if (transcriptAnchors.length !== 1) {
    fail(`${id}: expected exactly one exact Through The Bible transcript evidence anchor, found ${transcriptAnchors.length}`)
  }
  const { anchor, record } = transcriptAnchors[0]
  if (anchor.verificationLevel !== "source-locator-reviewed" || record.verificationLevel !== "source-locator-reviewed") {
    fail(`${id}: transcript locator is not source-locator-reviewed`)
  }
  if (record.officialSeriesUrl !== OFFICIAL) fail(`${id}: official series provenance drifted`)
  if (typeof record.locator !== "string" || !record.locator.startsWith("Full Transcript")) fail(`${id}: invalid transcript locator`)
  if (anchor.evidenceSha256 !== record.evidenceSha256) fail(`${id}: source anchor/evidence hash mismatch`)

  const transcriptPayload = {
    officialSourceUrl: OFFICIAL,
    transcriptSourceUrl: TRANSCRIPT,
    sourceRange: record.locator,
    transcriptSha256: TRANSCRIPT_SHA256,
  }
  const transcriptEvidence = [{
    ...transcriptPayload,
    evidenceSha256: sha(JSON.stringify(canon(transcriptPayload))),
  }]

  const teaching = spec.action === "rewrite" ? spec.revisedTeaching : unit.teaching
  const forYourHeart = Object.prototype.hasOwnProperty.call(spec, "revisedForYourHeart")
    ? spec.revisedForYourHeart
    : unit.forYourHeart
  if (typeof teaching !== "string" || teaching.trim().length < 80) fail(`${id}: final teaching too short`)
  if (/\b(?:Poonen|CFC|SermonIndex)\b/i.test(teaching)) fail(`${id}: source attribution leaked into reader copy`)

  const decision = {
    bookId: "2-timotei",
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
  bookId: "2-timotei",
  reviewMode: "manual-sentence-level-against-exact-exported-transcript-representation",
  decisions,
}, null, 2) + "\n", "utf8")

console.log(`2 Timotei manual semantic review: ${decisions.length} decisions (${decisions.filter((d) => d.action === "rewrite").length} rewrite / ${decisions.filter((d) => d.action === "keep").length} keep).`)
