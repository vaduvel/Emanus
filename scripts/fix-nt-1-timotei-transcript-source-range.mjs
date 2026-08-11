#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const transcriptPath = path.join(ROOT, "docs/data/biblia-explicata/nt-official-transcripts/1-timotei-vbv-03.json")
const statusPath = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-manual-review-status.json")
const OLD_RANGE = "1 Timothy 4:3-5:13"
const NEW_RANGE = "1 Timothy 4:1-5:13"
const TRANSCRIPT_SHA = "sha256:b3375158a2903ff651bcbaadfe4c2b86d0a5d4bbe5850487bb3e3f43a0695ae9"
const AUDIO_SHA = "sha256:8fa81720f8c0a95bb5501d8925c81daf8163625fae5b212360f9572226f42e25"
const OPENING = "We turn today to 1 Timothy and chapter 4, beginning at verse 1."

const fail = (message) => {
  console.error(`[1 Timotei transcript range fix] ${message}`)
  process.exit(1)
}
for (const p of [transcriptPath, statusPath]) if (!fs.existsSync(p)) fail(`missing ${path.relative(ROOT, p)}`)

const transcript = JSON.parse(fs.readFileSync(transcriptPath, "utf8"))
if (transcript.schema !== "emanus-nt-official-audio-transcript-v1") fail("unexpected transcript schema")
if (transcript.bookId !== "1-timotei" || transcript.sourceId !== "1-timotei-vbv-03") fail("unexpected transcript identity")
if (transcript.transcriptSha256 !== TRANSCRIPT_SHA) fail(`transcript SHA drifted: ${transcript.transcriptSha256}`)
if (transcript.officialAudioSha256 !== AUDIO_SHA) fail(`audio SHA drifted: ${transcript.officialAudioSha256}`)
if (transcript.wordCount !== 12691 || transcript.segmentCount !== 1050) fail("transcript size metadata drifted")
if (transcript.segments?.[0]?.text !== OPENING) fail(`opening no longer proves verse 1 coverage: ${transcript.segments?.[0]?.text}`)
if (![OLD_RANGE, NEW_RANGE].includes(transcript.sourceRange)) fail(`unexpected transcript sourceRange: ${transcript.sourceRange}`)
transcript.sourceRange = NEW_RANGE
fs.writeFileSync(transcriptPath, JSON.stringify(transcript, null, 2) + "\n", "utf8")

const status = JSON.parse(fs.readFileSync(statusPath, "utf8"))
if (status.currentBook === "1-timotei") {
  const matches = (status.officialAudioSources ?? []).filter((s) => s.id === "1-timotei-vbv-03")
  if (matches.length !== 1) fail(`expected one status source 1-timotei-vbv-03, found ${matches.length}`)
  if (![OLD_RANGE, NEW_RANGE].includes(matches[0].sourceRange)) fail(`unexpected status sourceRange: ${matches[0].sourceRange}`)
  matches[0].sourceRange = NEW_RANGE
  status.manualDecisionsFrozen = 22
  status.lastVerifiedCoverage = {
    ...(status.lastVerifiedCoverage ?? {}),
    note: "Iacov is closed at 15/15 semantic decisions (7 material rewrites / 8 keep). Filimon remains 5/5 semantically valid after the fail-closed final Biblia Emanus quote rebind. 1 Timotei has four persisted official CFC Verse-by-Verse transcripts covering 1:1-6:21 and 22 frozen manual semantic decisions awaiting hash-bound materialization."
  }
  fs.writeFileSync(statusPath, JSON.stringify(status, null, 2) + "\n", "utf8")
  console.log(`1 Timotei transcript range fix: ${OLD_RANGE} -> ${NEW_RANGE}; transcript SHA unchanged ${TRANSCRIPT_SHA}; active status kept at 22 decisions.`)
} else {
  console.log(`1 Timotei transcript range fix: ${OLD_RANGE} -> ${NEW_RANGE}; transcript SHA unchanged ${TRANSCRIPT_SHA}; active semantic book is ${status.currentBook ?? "<none>"}, so its status was left untouched.`)
}
