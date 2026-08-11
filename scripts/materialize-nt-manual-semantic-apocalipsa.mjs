#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const DATA = path.join(ROOT, "docs", "data", "biblia-explicata")
const WORKDIR = path.join(DATA, "nt-semantic-review-work")
const FINAL_BOOK = path.join(DATA, "nt-final-source-first", "27-apocalipsa.json")
const SOURCE_BOOK = path.join(DATA, "nt-source-first", "27-apocalipsa.json")
const PACK = path.join(DATA, "nt-addressable-wave2-review-pack", "apocalipsa")
const OUT = path.join(DATA, "nt-semantic-review-manual", "27-apocalipsa.json")
const OFFICIAL = "https://www.cfcindia.com/verse-by-verse/Revelation"
const REVIEWER = "GPT-5.6 Sol manual sentence-level semantic review against complete persisted Revelation transcript representations"
const REVIEWED_ON = "2026-08-11"
const PENDING_RECOVERY = "apocalipsa-10-1-7-source-first"
const EXPECTED = { bookUnits: 54, approved: 53, directApproved: 52, recoveredApproved: 1, rewrite: 41, keep: 12 }

const sha = (value) => `sha256:${crypto.createHash("sha256").update(String(value)).digest("hex")}`
const snap = (unit, teaching = unit.teaching, forYourHeart = unit.forYourHeart) => JSON.stringify({ heading: String(unit.heading ?? ""), teaching: String(teaching ?? ""), forYourHeart: String(forYourHeart ?? "") })
const canon = (value) => Array.isArray(value) ? value.map(canon) : (value && typeof value === "object" ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, canon(value[key])])) : value)
const fail = (message) => { console.error(`[Apocalipsa manual semantic review] ${message}`); process.exit(1) }
const read = (file) => { if (!fs.existsSync(file)) fail(`missing ${path.relative(ROOT, file)}`); return JSON.parse(fs.readFileSync(file, "utf8")) }
const rankWorkFile = (name) => name === "27-apocalipsa-wave2-wip.json" ? 1 : Number(name.match(/^27-apocalipsa-wave2-wip-(\d+)\.json$/)?.[1] ?? Number.MAX_SAFE_INTEGER)
function indexBook(file) {
  const book = read(file)
  if (book.id !== "apocalipsa") fail(`${path.basename(file)}: expected book id apocalipsa, got ${book.id}`)
  const units = new Map()
  for (const chapter of book.chapters ?? []) for (const unit of chapter.units ?? []) {
    if (units.has(unit.id)) fail(`${path.basename(file)}: duplicate unit ${unit.id}`)
    units.set(unit.id, { chapter: Number(chapter.number), unit })
  }
  return { book, units }
}
function validateChunkSequence(meta, label) {
  const chunks = meta.chunks ?? []
  if (!chunks.length) fail(`${label}: no transcript chunks`)
  let expectedStart = 1
  for (const descriptor of chunks) {
    if (descriptor.startWord !== expectedStart) fail(`${label}: non-contiguous chunk start ${descriptor.startWord}, expected ${expectedStart}`)
    if (!Number.isInteger(descriptor.endWord) || descriptor.endWord < descriptor.startWord) fail(`${label}: invalid chunk range`)
    const chunk = read(path.join(DATA, "nt-addressable-wave2-review-pack", descriptor.file))
    if (chunk.schema !== "emanus-nt-addressable-wave2-transcript-chunk-v1" || chunk.bookId !== "apocalipsa") fail(`${descriptor.file}: invalid chunk metadata`)
    if (chunk.startWord !== descriptor.startWord || chunk.endWord !== descriptor.endWord) fail(`${descriptor.file}: chunk range drift`)
    if (chunk.transcriptSha256 !== meta.transcriptSha256) fail(`${descriptor.file}: transcript SHA drift`)
    const words = String(chunk.text ?? "").trim().split(/\s+/).filter(Boolean)
    if (words.length !== descriptor.endWord - descriptor.startWord + 1) fail(`${descriptor.file}: chunk word count drift`)
    expectedStart = descriptor.endWord + 1
  }
  if (expectedStart - 1 !== meta.wordCount) fail(`${label}: chunks cover ${expectedStart - 1}/${meta.wordCount} words`)
}
function evidenceForTranscript(transcript, officialSourceUrl, label) {
  if (typeof officialSourceUrl !== "string" || !/^https:\/\//.test(officialSourceUrl)) fail(`${label}: invalid official source URL`)
  if (typeof transcript.transcriptUrl !== "string" || !/^https:\/\//.test(transcript.transcriptUrl)) fail(`${label}: invalid transcript URL`)
  if (!/^sha256:[0-9a-f]{64}$/i.test(transcript.transcriptSha256 ?? "")) fail(`${label}: invalid transcript SHA`)
  if (!Number.isInteger(transcript.wordCount) || transcript.wordCount <= 0) fail(`${label}: invalid transcript word count`)
  validateChunkSequence(transcript, label)
  const payload = { officialSourceUrl, transcriptSourceUrl: transcript.transcriptUrl, sourceRange: `Complete persisted Revelation representation ${transcript.representation}; ${transcript.wordCount} words; contiguous chunks 1-${transcript.wordCount}`, transcriptSha256: transcript.transcriptSha256 }
  return { ...payload, evidenceSha256: sha(JSON.stringify(canon(payload))) }
}

const workFiles = fs.readdirSync(WORKDIR).filter((name) => /^27-apocalipsa-wave2-wip(?:-\d+)?\.json$/.test(name)).sort((a, b) => rankWorkFile(a) - rankWorkFile(b) || a.localeCompare(b))
if (!workFiles.length) fail("no Apocalipsa WIP review files found")
const specs = new Map()
let directDeclared = 0
let recoveredDeclared = 0
for (const name of workFiles) {
  const data = read(path.join(WORKDIR, name))
  if (data.schema !== "emanus-nt-semantic-review-work-v1" || data.bookId !== "apocalipsa" || data.status !== "work-in-progress-not-ledger-eligible") fail(`${name}: unexpected WIP metadata`)
  directDeclared += Number(data.reviewedDirectUnits ?? 0)
  recoveredDeclared += Number(data.reviewedRecoveredUnits ?? 0)
  for (const [unitId, spec] of Object.entries(data.decisions ?? {})) {
    if (specs.has(unitId)) { if (JSON.stringify(specs.get(unitId)) !== JSON.stringify(spec)) fail(`${unitId}: conflicting WIP decisions`); continue }
    if (!Number.isInteger(spec?.chapter) || !["keep", "rewrite"].includes(spec?.action)) fail(`${unitId}: invalid decision metadata`)
    if (!/^sha256:[0-9a-f]{64}$/i.test(spec?.expectedCurrentSnapshotSha256 ?? "")) fail(`${unitId}: expected snapshot SHA missing/invalid`)
    if (typeof spec?.rationale !== "string" || !spec.rationale.trim()) fail(`${unitId}: rationale missing`)
    if (spec.action === "rewrite" && (typeof spec.revisedTeaching !== "string" || spec.revisedTeaching.trim().length < 80)) fail(`${unitId}: rewrite lacks substantial revisedTeaching`)
    specs.set(unitId, spec)
  }
}
const rewriteCount = [...specs.values()].filter((spec) => spec.action === "rewrite").length
const keepCount = [...specs.values()].filter((spec) => spec.action === "keep").length
if (specs.size !== EXPECTED.approved || rewriteCount !== EXPECTED.rewrite || keepCount !== EXPECTED.keep) fail(`expected ${EXPECTED.approved} decisions (${EXPECTED.rewrite} rewrite / ${EXPECTED.keep} keep), got ${specs.size} (${rewriteCount} rewrite / ${keepCount} keep)`)
if (specs.has(PENDING_RECOVERY)) fail(`${PENDING_RECOVERY}: must remain excluded until complete-source recovery is finished`)
if (directDeclared < EXPECTED.directApproved || recoveredDeclared < EXPECTED.recoveredApproved) fail(`WIP declarations are incomplete: direct=${directDeclared}, recovered=${recoveredDeclared}`)

const final = indexBook(FINAL_BOOK)
const source = indexBook(SOURCE_BOOK)
if (final.units.size !== EXPECTED.bookUnits || source.units.size !== EXPECTED.bookUnits) fail(`expected ${EXPECTED.bookUnits} Apocalipsa units, got final/source ${final.units.size}/${source.units.size}`)
const accounted = new Set([...specs.keys(), PENDING_RECOVERY])
if (accounted.size !== EXPECTED.bookUnits) fail(`review accounting covers ${accounted.size}/${EXPECTED.bookUnits} unique units`)
for (const unitId of final.units.keys()) if (!accounted.has(unitId)) fail(`unaccounted final unit ${unitId}`)
for (const unitId of source.units.keys()) if (!accounted.has(unitId)) fail(`unaccounted source-first unit ${unitId}`)

const decisions = []
let directApproved = 0
let recoveredApproved = 0
for (const [unitId, spec] of specs.entries()) {
  const finalLocated = final.units.get(unitId)
  const sourceLocated = source.units.get(unitId)
  if (!finalLocated || !sourceLocated || finalLocated.chapter !== spec.chapter || sourceLocated.chapter !== spec.chapter) fail(`${unitId}: corpus/chapter drift`)
  const finalPreHash = sha(snap(finalLocated.unit))
  const sourcePreHash = sha(snap(sourceLocated.unit))
  if (finalPreHash !== spec.expectedCurrentSnapshotSha256) fail(`${unitId}: final snapshot drifted; ${finalPreHash} != ${spec.expectedCurrentSnapshotSha256}`)
  if (sourcePreHash !== spec.expectedCurrentSnapshotSha256) fail(`${unitId}: source-first snapshot drifted; ${sourcePreHash} != ${spec.expectedCurrentSnapshotSha256}`)

  let transcriptEvidence
  const inspectionPath = path.join(PACK, "units", `${unitId}.json`)
  if (fs.existsSync(inspectionPath)) {
    const inspection = read(inspectionPath)
    if (inspection.schema !== "emanus-nt-addressable-wave2-unit-inspection-v1" || inspection.unitId !== unitId || inspection.snapshotSha256 !== spec.expectedCurrentSnapshotSha256) fail(`${unitId}: unit inspection drifted`)
    const transcripts = inspection.transcripts ?? []
    if (!transcripts.length) fail(`${unitId}: direct unit has no complete transcript representation`)
    transcriptEvidence = transcripts.map((item) => evidenceForTranscript(item, inspection.officialSourceUrl, `${unitId} representation ${item.representation}`))
    directApproved += 1
  } else {
    if (!Number.isInteger(spec.recoveryRepresentation)) fail(`${unitId}: non-direct decision lacks recoveryRepresentation`)
    const meta = read(path.join(PACK, String(spec.recoveryRepresentation).padStart(2, "0"), "meta.json"))
    if (meta.schema !== "emanus-nt-addressable-wave2-representation-meta-v1" || meta.bookId !== "apocalipsa" || meta.representation !== spec.recoveryRepresentation) fail(`${unitId}: recovery representation metadata drifted`)
    transcriptEvidence = [evidenceForTranscript(meta, OFFICIAL, `${unitId} recovery representation ${meta.representation}`)]
    recoveredApproved += 1
  }

  const teaching = spec.action === "rewrite" ? spec.revisedTeaching : finalLocated.unit.teaching
  const forYourHeart = Object.prototype.hasOwnProperty.call(spec, "revisedForYourHeart") ? spec.revisedForYourHeart : finalLocated.unit.forYourHeart
  if (typeof teaching !== "string" || teaching.trim().length < 80) fail(`${unitId}: final teaching too short`)
  if (/\b(?:Poonen|CFC|SermonIndex)\b/i.test(teaching)) fail(`${unitId}: source attribution leaked into reader copy`)
  const decision = { bookId: "apocalipsa", chapter: spec.chapter, unitId, status: "approved-against-transcript", action: spec.action, reviewedTeachingSha256: sha(snap(finalLocated.unit, teaching, forYourHeart)), transcriptEvidence, rationale: spec.rationale, reviewer: REVIEWER, reviewedOn: REVIEWED_ON }
  if (spec.action === "rewrite") { decision.revisedTeaching = teaching; if (Object.prototype.hasOwnProperty.call(spec, "revisedForYourHeart")) decision.revisedForYourHeart = forYourHeart }
  decisions.push(decision)
}
if (directApproved !== EXPECTED.directApproved || recoveredApproved !== EXPECTED.recoveredApproved) fail(`expected ${EXPECTED.directApproved} direct + ${EXPECTED.recoveredApproved} recovered approvals, got ${directApproved} + ${recoveredApproved}`)

decisions.sort((a, b) => a.chapter - b.chapter || a.unitId.localeCompare(b.unitId))
fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, JSON.stringify({ schema: "emanus-nt-semantic-review-book-v1", bookId: "apocalipsa", reviewMode: "manual-sentence-level-against-complete-persisted-transcript-representations-with-fail-closed-source-recovery", coverage: { bookUnits: EXPECTED.bookUnits, approvedUnits: decisions.length, directApprovedUnits: directApproved, recoveredApprovedUnits: recoveredApproved, rewrite: rewriteCount, keep: keepCount, sourceRecoveryPending: [PENDING_RECOVERY] }, decisions }, null, 2) + "\n", "utf8")
console.log(`Apocalipsa semantic review frozen: ${decisions.length}/${EXPECTED.bookUnits} units (${rewriteCount} rewrite / ${keepCount} keep); ${PENDING_RECOVERY} remains source-recovery pending.`)
