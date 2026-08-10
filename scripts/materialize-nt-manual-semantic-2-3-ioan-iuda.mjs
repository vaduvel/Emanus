#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const EVIDENCE = path.join(ROOT, "docs/data/biblia-explicata/nt-source-evidence.json")
const OUTDIR = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-review-manual")
const OFFICIAL = "https://www.cfcindia.com/bible"
const REVIEWER = "GPT-5.6 Sol manual sentence-level semantic review against exact exported transcript representation"

const CONFIG = [
  {
    bookId: "2-ioan",
    bookFile: "24-2-ioan.json",
    specFile: "24-2-ioan.json",
    evidenceId: "ev-ttb-2john",
    transcriptSourceUrl: "https://www.sermonindex.net/speakers/zac-poonen/through-the-bible-2-john-3-john-jude/",
    transcriptSha256: "sha256:8b6b0c02ff17dce065d45f7a72d0672fb9a184bd88060e81485b2807e53826fd",
    expected: { total: 4, rewrite: 1, keep: 3 },
  },
  {
    bookId: "3-ioan",
    bookFile: "25-3-ioan.json",
    specFile: "25-3-ioan.json",
    evidenceId: "ev-ttb-3john",
    transcriptSourceUrl: "https://www.sermonindex.net/speakers/zac-poonen/through-the-bible-2-john-3-john-jude/",
    transcriptSha256: "sha256:8b6b0c02ff17dce065d45f7a72d0672fb9a184bd88060e81485b2807e53826fd",
    expected: { total: 4, rewrite: 2, keep: 2 },
  },
  {
    bookId: "iuda",
    bookFile: "26-iuda.json",
    specFile: "26-iuda.json",
    evidenceId: "ev-ttb-jude",
    transcriptSourceUrl: "https://www.sermonindex.net/speakers/zac-poonen/through-the-bible-2-3-john-jude/",
    transcriptSha256: "sha256:2d86dcfdcdc6d769690ddbc5d0d3019a070055103557cfcf8b410ad946adea87",
    expected: { total: 5, rewrite: 5, keep: 0 },
  },
]

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
  console.error(`[2/3 Ioan + Iuda manual semantic review] ${message}`)
  process.exit(1)
}

if (!fs.existsSync(EVIDENCE)) fail(`missing ${path.relative(ROOT, EVIDENCE)}`)
const evidence = JSON.parse(fs.readFileSync(EVIDENCE, "utf8"))
const evidenceById = new Map((evidence.records ?? []).map((record) => [record.id, record]))
fs.mkdirSync(OUTDIR, { recursive: true })

let totalDecisions = 0
let totalRewrites = 0
let totalKeeps = 0

for (const cfg of CONFIG) {
  const bookPath = path.join(ROOT, "docs/data/biblia-explicata/nt-final-source-first", cfg.bookFile)
  const specPath = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-review-spec", cfg.specFile)
  for (const filePath of [bookPath, specPath]) {
    if (!fs.existsSync(filePath)) fail(`${cfg.bookId}: missing ${path.relative(ROOT, filePath)}`)
  }

  const book = JSON.parse(fs.readFileSync(bookPath, "utf8"))
  const review = JSON.parse(fs.readFileSync(specPath, "utf8"))
  if (book.id !== cfg.bookId) fail(`${cfg.bookId}: book id drifted to ${book.id}`)
  if (!review || Array.isArray(review) || typeof review !== "object") fail(`${cfg.bookId}: semantic review spec must be an object`)

  const ids = Object.keys(review)
  const rewriteCount = ids.filter((id) => review[id]?.action === "rewrite").length
  const keepCount = ids.filter((id) => review[id]?.action === "keep").length
  if (ids.length !== cfg.expected.total || rewriteCount !== cfg.expected.rewrite || keepCount !== cfg.expected.keep) {
    fail(`${cfg.bookId}: expected ${cfg.expected.total} decisions (${cfg.expected.rewrite} rewrite / ${cfg.expected.keep} keep), got ${ids.length} (${rewriteCount} rewrite / ${keepCount} keep)`)
  }
  for (const id of ids) {
    const item = review[id]
    if (!["keep", "rewrite"].includes(item?.action)) fail(`${id}: invalid action`)
    if (typeof item?.rationale !== "string" || !item.rationale.trim()) fail(`${id}: missing rationale`)
    if (item.action === "rewrite" && (typeof item.revisedTeaching !== "string" || item.revisedTeaching.trim().length < 80)) {
      fail(`${id}: rewrite missing substantial revisedTeaching`)
    }
  }

  const record = evidenceById.get(cfg.evidenceId)
  if (!record) fail(`${cfg.bookId}: missing source evidence ${cfg.evidenceId}`)
  if (record.sourceUrl !== cfg.transcriptSourceUrl) {
    fail(`${cfg.bookId}: transcript source URL drifted; ${record.sourceUrl} != ${cfg.transcriptSourceUrl}`)
  }
  if (record.officialSeriesUrl !== OFFICIAL) fail(`${cfg.bookId}: official series provenance drifted`)
  if (record.verificationLevel !== "source-locator-reviewed") fail(`${cfg.bookId}: source evidence is not source-locator-reviewed`)
  if (typeof record.locator !== "string" || !record.locator.startsWith("Full Transcript")) fail(`${cfg.bookId}: invalid transcript locator`)

  const units = new Map()
  for (const chapter of book.chapters ?? []) {
    for (const unit of chapter.units ?? []) units.set(unit.id, { chapter: chapter.number, unit })
  }
  if (units.size !== ids.length) fail(`${cfg.bookId}: expected ${ids.length} units, found ${units.size}`)
  for (const id of ids) if (!units.has(id)) fail(`${cfg.bookId}: missing reviewed unit ${id}`)
  for (const id of units.keys()) if (!review[id]) fail(`${cfg.bookId}: unreviewed unit ${id}`)

  const decisions = []
  for (const id of ids) {
    const spec = review[id]
    const located = units.get(id)
    const unit = located.unit
    if (located.chapter !== spec.chapter) fail(`${id}: chapter drift`)

    const current = sha(snap(unit))
    if (current !== spec.expectedCurrentSnapshotSha256) {
      fail(`${id}: reviewed pre-edit snapshot drifted; ${current} != ${spec.expectedCurrentSnapshotSha256}`)
    }

    const anchors = (unit.sourceAnchors ?? []).filter((anchor) => anchor.evidenceId === cfg.evidenceId)
    if (anchors.length !== 1) fail(`${id}: expected exactly one ${cfg.evidenceId} source anchor, found ${anchors.length}`)
    const anchor = anchors[0]
    if (anchor.verificationLevel !== "source-locator-reviewed") fail(`${id}: unit anchor is not source-locator-reviewed`)
    if (anchor.evidenceSha256 !== record.evidenceSha256) fail(`${id}: source anchor/evidence hash mismatch`)

    const transcriptPayload = {
      officialSourceUrl: OFFICIAL,
      transcriptSourceUrl: cfg.transcriptSourceUrl,
      sourceRange: record.locator,
      transcriptSha256: cfg.transcriptSha256,
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
      bookId: cfg.bookId,
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

  const out = path.join(OUTDIR, cfg.bookFile)
  fs.writeFileSync(out, JSON.stringify({
    schema: "emanus-nt-semantic-review-book-v1",
    bookId: cfg.bookId,
    reviewMode: "manual-sentence-level-against-exact-exported-transcript-representation",
    decisions,
  }, null, 2) + "\n", "utf8")

  totalDecisions += decisions.length
  totalRewrites += decisions.filter((d) => d.action === "rewrite").length
  totalKeeps += decisions.filter((d) => d.action === "keep").length
  console.log(`${cfg.bookId} manual semantic review: ${decisions.length} decisions (${decisions.filter((d) => d.action === "rewrite").length} rewrite / ${decisions.filter((d) => d.action === "keep").length} keep).`)
}

if (totalDecisions !== 13 || totalRewrites !== 8 || totalKeeps !== 5) {
  fail(`batch totals drifted: ${totalDecisions} decisions (${totalRewrites} rewrite / ${totalKeeps} keep)`)
}
console.log(`2/3 Ioan + Iuda manual semantic review batch: ${totalDecisions} decisions (${totalRewrites} rewrite / ${totalKeeps} keep).`)
