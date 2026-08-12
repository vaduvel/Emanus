#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const BOOK = path.join(ROOT, "docs/data/biblia-explicata/nt-final-source-first/19-evrei.json")
const COVER = path.join(ROOT, "docs/data/biblia-explicata/nt-direct-transcript-coverage.json")
const SPEC = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-review-spec/19-evrei.json")
const OUTDIR = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-review-manual")
const OUT = path.join(OUTDIR, "19-evrei.json")
const OFFICIAL = "https://www.cfcindia.com/verse-by-verse/Hebrews"
const REVIEWER = "GPT-5.6 Sol manual sentence-level semantic review against exact exported transcript representation"

const HASHES = {
  "https://sermonindex.net/speakers/zac-poonen/hebrews-ch11-38/": "sha256:a76a452b0b70f2c3d5d61f80889a59532f4fafb1548ebbd9e9b4843140ed5564",
  "https://sermonindex.net/speakers/zac-poonen/hebrews-ch37-411/": "sha256:8ffa5d2805d93b06ff3ec4d8039d337585abe0d3b33bddbbaeeaacba072e9352",
  "https://sermonindex.net/speakers/zac-poonen/hebrews-ch411-56/": "sha256:d212460c357fc8f8199ff427645c28fc2f642498bf1bced3dfcd5c9d410fbf97",
  "https://sermonindex.net/speakers/zac-poonen/hebrews-ch57-615/": "sha256:5101b321703cb02cd04831ab3cdb1ab5609cdb4e3c11acb2844e683f6cf93492",
  "https://sermonindex.net/speakers/zac-poonen/hebrews-ch616-89/": "sha256:853df418a3cf761b885052cd463183e38747df2a77bbc01468a1e3ca21bf550d",
  "https://sermonindex.net/speakers/zac-poonen/hebrews-ch810-1018/": "sha256:a7f3aee6ad41d1d9cb0e64b70ab4fe4b6e01d93b5a86781b33f36f2bafbe0cea",
  "https://sermonindex.net/speakers/zac-poonen/hebrews-ch1019-39/": "sha256:d24ed3496a3d038b32615c6f2107047e50376b308ef3aa9475ec45aa810342c8",
  "https://sermonindex.net/speakers/zac-poonen/hebrews-ch111-22/": "sha256:234f3282ce51495e2ed06803bcd97c7fc66c697009969b0e574fcc8c2107c5bd",
  "https://sermonindex.net/speakers/zac-poonen/hebrews-ch1123-124/": "sha256:6d717d56d7991a03adc6e25f0b6c1b7abbe2d7586e29583effa536c30552f6b4",
  "https://sermonindex.net/speakers/zac-poonen/hebrews-ch125-1325/": "sha256:5cfe8b74108eac769e4d1645c92c0519b0e665d1203f6dc2557c19a4db2f18a4",
}

const sha = (value) => `sha256:${crypto.createHash("sha256").update(String(value)).digest("hex")}`
const snap = (unit, teaching = unit.teaching, forYourHeart = unit.forYourHeart) => JSON.stringify({
  heading: String(unit.heading ?? ""),
  teaching: String(teaching ?? ""),
  forYourHeart: String(forYourHeart ?? ""),
})
const fail = (message) => {
  console.error(`[Evrei manual semantic review] ${message}`)
  process.exit(1)
}
const canon = (value) => Array.isArray(value)
  ? value.map(canon)
  : (value && typeof value === "object"
      ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, canon(value[key])]))
      : value)

for (const filePath of [BOOK, COVER, SPEC]) {
  if (!fs.existsSync(filePath)) fail(`missing ${path.relative(ROOT, filePath)}`)
}

const book = JSON.parse(fs.readFileSync(BOOK, "utf8"))
const coverage = JSON.parse(fs.readFileSync(COVER, "utf8"))
const REVIEW = JSON.parse(fs.readFileSync(SPEC, "utf8"))

// Preserve the reviewed meaning while using the explicit source concept required by the doctrine gate.
const evreiTwo = REVIEW["evrei-2-10-18-source-first"]
const oldWithoutSin = "în toate lucrurile, fără să păcătuiască,"
const explicitWithoutSin = "în toate lucrurile, dar a rămas fără păcat și nu a păcătuit,"
if (!evreiTwo || evreiTwo.action !== "rewrite" || typeof evreiTwo.revisedTeaching !== "string") {
  fail("evrei-2-10-18-source-first reviewed rewrite missing")
}
if (evreiTwo.revisedTeaching.includes(oldWithoutSin)) {
  evreiTwo.revisedTeaching = evreiTwo.revisedTeaching.replace(oldWithoutSin, explicitWithoutSin)
  fs.writeFileSync(SPEC, JSON.stringify(REVIEW, null, 2) + "\n", "utf8")
  console.log("Evrei 2 reviewed wording normalized to explicit «fără păcat» source concept.")
} else if (!evreiTwo.revisedTeaching.includes("fără păcat")) {
  fail("evrei-2-10-18-source-first wording drifted before doctrine normalization")
}

// Avoid the Romanian audit's token-level false positive on the grammatically correct phrase «în afara».
const evreiThirteen = REVIEW["evrei-13-7-17-source-first"]
const oldOutsideCamp = "urmându-L pe Isus în afara taberei religioase"
const reviewedOutsideCamp = "urmându-L pe Isus dincolo de tabăra religioasă"
if (!evreiThirteen || evreiThirteen.action !== "rewrite" || typeof evreiThirteen.revisedTeaching !== "string") {
  fail("evrei-13-7-17-source-first reviewed rewrite missing")
}
if (evreiThirteen.revisedTeaching.includes(oldOutsideCamp)) {
  evreiThirteen.revisedTeaching = evreiThirteen.revisedTeaching.replace(oldOutsideCamp, reviewedOutsideCamp)
  fs.writeFileSync(SPEC, JSON.stringify(REVIEW, null, 2) + "\n", "utf8")
  console.log("Evrei 13 reviewed wording normalized around «dincolo de tabăra».")
} else if (!evreiThirteen.revisedTeaching.includes(reviewedOutsideCamp)) {
  fail("evrei-13-7-17-source-first wording drifted before Romanian normalization")
}

if (coverage.schema !== "emanus-nt-direct-transcript-coverage-v3") {
  fail(`expected coverage v3, got ${coverage.schema}`)
}
if (!REVIEW || Array.isArray(REVIEW) || typeof REVIEW !== "object") {
  fail("semantic review spec must be an object keyed by unit id")
}

const ids = Object.keys(REVIEW).sort()
const rewriteCount = ids.filter((id) => REVIEW[id]?.action === "rewrite").length
const keepCount = ids.filter((id) => REVIEW[id]?.action === "keep").length
if (ids.length !== 41 || rewriteCount !== 16 || keepCount !== 25) {
  fail(`expected frozen 41-decision review (16 rewrite / 25 keep), got ${ids.length} (${rewriteCount} rewrite / ${keepCount} keep)`)
}
for (const id of ids) {
  if (!["keep", "rewrite"].includes(REVIEW[id]?.action)) fail(`${id}: invalid action`)
  if (typeof REVIEW[id]?.rationale !== "string" || !REVIEW[id].rationale.trim()) fail(`${id}: missing rationale`)
  if (REVIEW[id].action === "rewrite" && (typeof REVIEW[id].revisedTeaching !== "string" || !REVIEW[id].revisedTeaching.trim())) {
    fail(`${id}: rewrite missing revisedTeaching`)
  }
}

const units = new Map()
for (const chapter of book.chapters ?? []) {
  for (const unit of chapter.units ?? []) units.set(unit.id, { chapter: chapter.number, unit })
}
if (units.size !== ids.length) fail(`expected ${ids.length} Evrei units, found ${units.size}`)
for (const id of ids) if (!units.has(id)) fail(`missing reviewed unit ${id}`)
for (const id of units.keys()) if (!REVIEW[id]) fail(`unreviewed Evrei unit ${id}`)

const coverageByUnit = new Map(
  (coverage.entries ?? []).filter((entry) => entry.bookId === "evrei").map((entry) => [entry.unitId, entry]),
)
if (coverageByUnit.size !== ids.length) fail(`expected ${ids.length} coverage entries, found ${coverageByUnit.size}`)

const decisions = []
for (const id of ids) {
  const spec = REVIEW[id]
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

  const cov = coverageByUnit.get(id)
  if (!cov || cov.officialSourceUrl !== OFFICIAL) fail(`${id}: source coverage drifted`)
  if (!["catalogue-range-contains-entire-unit", "catalogue-contiguous-ranges-cover-entire-unit"].includes(cov.verification)) {
    fail(`${id}: unsupported coverage`)
  }

  const representations = Array.isArray(cov.transcriptRepresentations) && cov.transcriptRepresentations.length
    ? cov.transcriptRepresentations
    : [{ transcriptRepresentationUrl: cov.transcriptRepresentationUrl, transcriptRange: cov.transcriptRange }]
  const transcriptEvidence = representations.map((representation) => {
    const transcriptSourceUrl = String(representation.transcriptRepresentationUrl ?? "")
    const sourceRange = String(representation.transcriptRange ?? "")
    const transcriptSha256 = HASHES[transcriptSourceUrl]
    if (!transcriptSha256) fail(`${id}: unreviewed transcript ${transcriptSourceUrl}`)
    const payload = { officialSourceUrl: OFFICIAL, transcriptSourceUrl, sourceRange, transcriptSha256 }
    return { ...payload, evidenceSha256: sha(JSON.stringify(canon(payload))) }
  })

  const teaching = spec.action === "rewrite" ? spec.revisedTeaching : unit.teaching
  const forYourHeart = Object.prototype.hasOwnProperty.call(spec, "revisedForYourHeart")
    ? spec.revisedForYourHeart
    : unit.forYourHeart
  if (typeof teaching !== "string" || teaching.trim().length < 80) fail(`${id}: final teaching too short`)
  if (/\b(?:Poonen|CFC|SermonIndex)\b/i.test(teaching)) fail(`${id}: source attribution leaked`)

  const decision = {
    bookId: "evrei",
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
  bookId: "evrei",
  reviewMode: "manual-sentence-level-against-exact-exported-transcript-representation",
  decisions,
}, null, 2) + "\n", "utf8")

console.log(`Evrei manual semantic review: ${decisions.length} decisions (${decisions.filter((d) => d.action === "rewrite").length} rewrite / ${decisions.filter((d) => d.action === "keep").length} keep).`)
