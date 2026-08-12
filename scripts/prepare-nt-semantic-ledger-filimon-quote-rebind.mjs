#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const LEDGER = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-review-ledger.json")
const ARTIFACT = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-review-manual/18-filimon.json")
const UNIT_ID = "filimon-1-17-22"
const OLD_HASH = "sha256:27719248fe98b8dec8cf584ad7b8a9cb06c14b137f09bc0b0635f3db6cf3bf20"
const NEW_HASH = "sha256:3a901e6f948310f95206ee9d68651a45f7b6a64410c591602c75b73ba563087c"
const TRANSCRIPT_SHA = "sha256:a59755f7cf6d8cb097aeb2b1e20feff31c2abfaa214034387b021fc97c6a847a"
const AUDIO_SHA = "sha256:16bad5430e50089a7bd8304b7ecb7bfacbe7eae58c7d82328822fd9515fc0c47"
const FINAL_QUOTE = "«primește-l așa cum m-ai primi pe mine»"

const fail = (message) => {
  console.error(`[Filimon semantic ledger quote rebind] ${message}`)
  process.exit(1)
}
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

for (const file of [LEDGER, ARTIFACT]) if (!fs.existsSync(file)) fail(`missing ${path.relative(ROOT, file)}`)
const ledger = JSON.parse(fs.readFileSync(LEDGER, "utf8"))
const artifact = JSON.parse(fs.readFileSync(ARTIFACT, "utf8"))
if (ledger.schema !== "emanus-nt-semantic-review-ledger-v1" || !Array.isArray(ledger.decisions)) fail("unexpected ledger schema")
if (artifact.schema !== "emanus-nt-semantic-review-book-v1" || artifact.bookId !== "filimon" || !Array.isArray(artifact.decisions)) fail("unexpected Filimon artifact schema")

const incoming = artifact.decisions.filter((d) => d.bookId === "filimon" && d.chapter === 1 && d.unitId === UNIT_ID)
if (incoming.length !== 1) fail(`expected one incoming ${UNIT_ID} decision, found ${incoming.length}`)
const next = incoming[0]
if (next.status !== "approved-against-transcript") fail("incoming decision status drifted")
if (next.action !== "rewrite") fail(`incoming action must be technical rewrite, got ${next.action}`)
if (next.reviewedTeachingSha256 !== NEW_HASH) fail(`incoming reviewed hash drifted: ${next.reviewedTeachingSha256}`)
if (typeof next.revisedTeaching !== "string" || !next.revisedTeaching.includes(FINAL_QUOTE)) fail("incoming teaching lacks exact final Biblia Emanus quote")
if (!Array.isArray(next.transcriptEvidence) || next.transcriptEvidence.length !== 1) fail("incoming transcript evidence shape drifted")
const evidence = next.transcriptEvidence[0]
if (evidence.officialSourceUrl !== "https://www.cfcindia.com/through-the-bible/titus-philemon") fail("incoming official source URL drifted")
if (evidence.transcriptSourceUrl !== "https://www.cfcindia.org/resources/en/study-series/through-the-bible/60-titus-and-philemon.mp3") fail("incoming official audio URL drifted")
if (evidence.transcriptSha256 !== TRANSCRIPT_SHA) fail("incoming Filimon transcript SHA drifted")
if (evidence.officialAudioSha256 !== AUDIO_SHA) fail("incoming official audio SHA drifted")
if (evidence.reviewedSectionWordCount !== 1729) fail("incoming reviewed section word count drifted")

const indexes = []
for (let i = 0; i < ledger.decisions.length; i += 1) {
  const d = ledger.decisions[i]
  if (d.bookId === "filimon" && d.chapter === 1 && d.unitId === UNIT_ID) indexes.push(i)
}
if (indexes.length !== 1) fail(`expected one ledger ${UNIT_ID} decision, found ${indexes.length}`)
const index = indexes[0]
const previous = ledger.decisions[index]

if (same(previous, next)) {
  console.log(`Filimon semantic ledger quote rebind: ${UNIT_ID} already matches final quote-bound decision.`)
} else {
  const predecessorValid =
    previous.status === "approved-against-transcript" &&
    previous.action === "keep" &&
    previous.reviewedTeachingSha256 === OLD_HASH &&
    previous.rationale === "Copy-ul curent păstrează complet centrul transcriptului: primește-l ca pe mine, pune datoria în contul meu, paralela cu mijlocirea lui Hristos și contrastul dintre slujitorul care ajută financiar și cel care exploatează convertiții." &&
    previous.reviewer === "GPT-5.6 Sol manual sentence-level semantic review against persisted official CFC audio transcript" &&
    previous.reviewedOn === "2026-08-10" &&
    Array.isArray(previous.transcriptEvidence) && previous.transcriptEvidence.length === 1 &&
    previous.transcriptEvidence[0]?.transcriptSha256 === TRANSCRIPT_SHA &&
    previous.transcriptEvidence[0]?.officialAudioSha256 === AUDIO_SHA &&
    previous.transcriptEvidence[0]?.reviewedSectionWordCount === 1729

  if (!predecessorValid) fail("existing ledger decision is not the exact allowed pre-quote-normalization predecessor")
  ledger.decisions[index] = next
  ledger.count = ledger.decisions.length
  fs.writeFileSync(LEDGER, JSON.stringify(ledger, null, 2) + "\n", "utf8")
  console.log(`Filimon semantic ledger quote rebind: replaced exact predecessor ${OLD_HASH} -> ${NEW_HASH}; ledger count ${ledger.count}.`)
}
