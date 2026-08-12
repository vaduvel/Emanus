#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first-manifest.json")
const reportPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-publication-review.json")

function fail(message) { console.error(`[NT final publication review] ${message}`); process.exit(1) }
function normalize(value) {
  return String(value ?? "")
    .normalize("NFC")
    .toLowerCase()
    .replace(/[„”«»“”'’`]/g, " ")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
}
function words(value) { return normalize(value).split(" ").filter(Boolean) }
function sentences(value) {
  return String(value ?? "")
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+/u)
    .map((item) => item.trim())
    .filter(Boolean)
}
function shingles(value, size = 5) {
  const tokens = words(value)
  const out = new Set()
  for (let i = 0; i + size <= tokens.length; i += 1) out.add(tokens.slice(i, i + size).join(" "))
  return out
}
function jaccard(a, b) {
  if (!a.size || !b.size) return 0
  let overlap = 0
  for (const item of a) if (b.has(item)) overlap += 1
  return overlap / (a.size + b.size - overlap)
}
function add(findings, wave, severity, code, location, message, detail = {}) {
  findings.push({ wave, severity, code, location, message, ...detail })
}

if (!fs.existsSync(corpusDir) || !fs.existsSync(manifestPath)) fail("final corpus/manifest missing")
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
const files = fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()
if (files.length !== 27) fail(`expected 27 final NT files, found ${files.length}`)

const findings = []
const units = []
const chapters = []
const publicFields = []
let anchoredUnits = 0
let missingForYourHeart = 0
let missingCrossRefs = 0
let missingWords = 0
let missingLiteraryContext = 0
let missingHistoricalContext = 0
let missingPrayer = 0
let safetySentenceCount = 0
const fidelityCounts = {}
const explanationKindCounts = {}

const metaPatterns = [
  ["source-name-leak", /\b(?:Zac\s+Poonen|Poonen|CFC|Christian Fellowship|SermonIndex|RCCV)\b/i],
  ["internal-provenance-leak", /\b(?:source[- ]first|source locator|sourceIds?|evidenceSha|raw transcript|transcriere brută|legacy branch|pinned legacy|reviewed-against|editorial ledger)\b/i],
  // Keep the acronym case-sensitive: Romanian "ca ai..." is ordinary prose.
  ["ai-meta-leak", /\b(?:ChatGPT|OpenAI|model de limbaj|ca (?:un )?AI)\b/],
  ["placeholder", /\b(?:TODO|TBD|FIXME|LOREM|PLACEHOLDER)\b/i],
  ["url-in-reader-copy", /https?:\/\//i],
  ["mojibake", /(?:�|Ã.|Â.|â€|\uFFFD)/u],
]
const safetyPattern = /\b(?:nu (?:ne )?autorizează|nu justifică|nu (?:ne )?permite|nu înseamnă|nu garantează|nu promite)\b/i
const allowedFidelity = new Set(["reviewed-against-raw-transcript", "reviewed-against-source-derived-legacy", "reviewed-against-source-locators"])
const allowedKinds = new Set(["exposition", "canonical-exegesis", "textual-overview"])

for (const file of files) {
  const full = path.join(corpusDir, file)
  const book = JSON.parse(fs.readFileSync(full, "utf8"))
  const manifestPublished = manifest.status === "published" && manifest.publicationReady === true
  const expectedStatus = manifestPublished ? "published" : "in_review"
  if (book.status !== expectedStatus || book.publicationReady !== manifestPublished) add(findings, "wave-1-coherence", "blocker", "book-publication-state", book.id, `Final corpus publication state must match manifest (${expectedStatus}).`)
  for (const chapter of book.chapters ?? []) {
    const chapterLoc = `${book.id} ${chapter.number}`
    chapters.push({ book, chapter, location: chapterLoc })
    const chapterUnits = chapter.units ?? []
    const chapterAnchorsComplete = chapterUnits.length > 0 && chapterUnits.every((unit) => Array.isArray(unit.sourceAnchors) && unit.sourceAnchors.length > 0)
    if (!chapterAnchorsComplete) add(findings, "wave-1-coherence", "blocker", "chapter-source-anchors-incomplete", chapterLoc, "At least one unit has no source anchor.")
    if (chapter.provenance?.sourceLocatorAnchorsComplete === false && chapterAnchorsComplete) add(findings, "wave-1-coherence", "blocker", "stale-source-locator-flag", chapterLoc, "sourceLocatorAnchorsComplete=false contradicts the actual anchored units.")
    if (chapter.provenance?.sourceTraceabilityComplete === false && chapterAnchorsComplete) add(findings, "wave-1-coherence", "blocker", "stale-source-traceability-flag", chapterLoc, "sourceTraceabilityComplete=false contradicts the final anchored corpus.")

    const chapterFieldEntries = [
      ["title", chapter.title], ["summary", chapter.summary], ["literaryContext", chapter.literaryContext],
      ["historicalContext", chapter.historicalContext], ["prayer", chapter.prayer],
    ]
    if (!String(chapter.literaryContext ?? "").trim()) missingLiteraryContext += 1
    if (!String(chapter.historicalContext ?? "").trim()) missingHistoricalContext += 1
    if (!String(chapter.prayer ?? "").trim()) missingPrayer += 1
    for (const [field, value] of chapterFieldEntries) if (typeof value === "string" && value.trim()) publicFields.push({ location: `${chapterLoc}.${field}`, value })

    for (const unit of chapterUnits) {
      const location = `${unit.ref} [${unit.id}]`
      const anchorOk = Array.isArray(unit.sourceAnchors) && unit.sourceAnchors.length > 0
      if (anchorOk) anchoredUnits += 1
      const fidelity = unit.sourceFidelity?.reviewState ?? "missing"
      fidelityCounts[fidelity] = (fidelityCounts[fidelity] ?? 0) + 1
      if (!allowedFidelity.has(fidelity)) add(findings, "wave-1-coherence", "blocker", "invalid-source-fidelity-state", location, `Unexpected source fidelity state: ${fidelity}.`)
      if (!Array.isArray(unit.sourceFidelity?.primarySources) || !unit.sourceFidelity.primarySources.length) add(findings, "wave-1-coherence", "blocker", "missing-primary-source-record", location, "sourceFidelity.primarySources is missing.")
      const anchorSourceIds = new Set((unit.sourceAnchors ?? []).map((item) => item.sourceId).filter(Boolean))
      if (!(unit.sourceIds ?? []).some((sourceId) => anchorSourceIds.has(sourceId))) add(findings, "wave-1-coherence", "blocker", "source-id-anchor-disjoint", location, "No sourceIds entry is represented by the unit source anchors.")
      const kind = unit.explanationKind ?? "missing"
      explanationKindCounts[kind] = (explanationKindCounts[kind] ?? 0) + 1
      if (!allowedKinds.has(kind)) add(findings, "wave-1-coherence", "blocker", "invalid-explanation-kind", location, `Unexpected explanationKind: ${kind}.`)
      if (!String(unit.explanationSource ?? "").trim()) add(findings, "wave-1-coherence", "blocker", "missing-explanation-source", location, "Internal explanationSource is missing.")
      if (!String(unit.heading ?? "").trim() || !String(unit.teaching ?? "").trim()) add(findings, "wave-4-completeness", "blocker", "missing-reader-core", location, "Heading or teaching is missing.")

      if (!String(unit.forYourHeart ?? "").trim()) missingForYourHeart += 1
      if (!Array.isArray(unit.crossRefs) || !unit.crossRefs.length) missingCrossRefs += 1
      if (!Array.isArray(unit.words) || !unit.words.length) missingWords += 1
      if (String(unit.forYourHeart ?? "").trim() && normalize(unit.forYourHeart) === normalize(unit.teaching)) add(findings, "wave-4-completeness", "blocker", "application-duplicates-teaching", location, "forYourHeart duplicates teaching verbatim.")
      if (Array.isArray(unit.crossRefs)) {
        const seen = new Set()
        for (const ref of unit.crossRefs) {
          const key = normalize(ref)
          if (seen.has(key)) add(findings, "wave-4-completeness", "review", "duplicate-cross-reference", location, `Duplicate cross-reference: ${ref}.`)
          seen.add(key)
          if (!/^.+\s\d+:\d+(?:-\d+)?$/u.test(String(ref).trim())) add(findings, "wave-4-completeness", "review", "cross-reference-format", location, `Unusual cross-reference format: ${ref}.`)
        }
      }
      for (const word of unit.words ?? []) {
        if (!String(word.original ?? "").trim() || !String(word.transliteration ?? "").trim() || !String(word.meaning ?? "").trim()) add(findings, "wave-4-completeness", "blocker", "incomplete-word-study", location, "An original-language note is missing original/transliteration/meaning.")
      }

      const readerEntries = [["heading", unit.heading], ["teaching", unit.teaching], ["forYourHeart", unit.forYourHeart]]
      for (const word of unit.words ?? []) readerEntries.push(["wordMeaning", word.meaning])
      for (const [field, value] of readerEntries) if (typeof value === "string" && value.trim()) publicFields.push({ location: `${location}.${field}`, value })
      for (const sentence of sentences(unit.teaching)) if (safetyPattern.test(sentence)) safetySentenceCount += 1
      units.push({ bookId: book.id, chapter: chapter.number, location, ref: unit.ref, id: unit.id, teaching: unit.teaching, forYourHeart: unit.forYourHeart, heading: unit.heading })
    }
  }
}

// Wave 2 — reader-facing contamination and text hygiene.
for (const entry of publicFields) {
  for (const [code, pattern] of metaPatterns) if (pattern.test(entry.value)) add(findings, "wave-2-reader-copy", "blocker", code, entry.location, `Reader-facing copy matches ${code}.`, { excerpt: entry.value.slice(0, 240) })
  const open = (entry.value.match(/«/g) ?? []).length
  const close = (entry.value.match(/»/g) ?? []).length
  if (open !== close) add(findings, "wave-2-reader-copy", "blocker", "unbalanced-romanian-quotes", entry.location, `Unbalanced Romanian quotes: ${open} opening / ${close} closing.`)
  if (/`/.test(entry.value)) add(findings, "wave-2-reader-copy", "review", "backtick-in-reader-copy", entry.location, "Backtick found in reader-facing copy.")
  if (/\t/.test(entry.value)) add(findings, "wave-2-reader-copy", "review", "tab-in-reader-copy", entry.location, "Tab found in reader-facing copy.")
  if (/<\/?[A-Za-z][^>]*>/.test(entry.value)) add(findings, "wave-2-reader-copy", "review", "html-in-reader-copy", entry.location, "HTML-like markup found in reader-facing copy.")
}

// Wave 3 — exact and near duplicate copy across the whole NT.
for (const field of ["teaching", "forYourHeart"]) {
  const buckets = new Map()
  for (const unit of units) {
    const value = String(unit[field] ?? "").trim()
    if (!value) continue
    const key = normalize(value)
    if (words(value).length < 12) continue
    const bucket = buckets.get(key) ?? []
    bucket.push(unit.location)
    buckets.set(key, bucket)
  }
  for (const locations of buckets.values()) if (locations.length > 1) add(findings, "wave-3-repetition", field === "teaching" ? "blocker" : "review", `exact-duplicate-${field}`, locations[0], `${field} is duplicated across ${locations.length} units.`, { locations: locations.slice(0, 12) })
}
const chapterTextBuckets = new Map()
for (const item of chapters) {
  for (const [field, value] of [["summary", item.chapter.summary], ["prayer", item.chapter.prayer]]) {
    if (!String(value ?? "").trim() || words(value).length < 12) continue
    const key = `${field}:${normalize(value)}`
    const bucket = chapterTextBuckets.get(key) ?? []
    bucket.push(item.location)
    chapterTextBuckets.set(key, bucket)
  }
}
for (const [key, locations] of chapterTextBuckets) if (locations.length > 1) add(findings, "wave-3-repetition", "review", "duplicate-chapter-copy", locations[0], `${key.split(":", 1)[0]} is duplicated across chapters.`, { locations: locations.slice(0, 12) })

const sentenceBuckets = new Map()
for (const unit of units) {
  for (const sentence of sentences(unit.teaching)) {
    if (words(sentence).length < 10) continue
    const key = normalize(sentence)
    const bucket = sentenceBuckets.get(key) ?? new Set()
    bucket.add(unit.location)
    sentenceBuckets.set(key, bucket)
  }
}
for (const [sentence, locationsSet] of sentenceBuckets) {
  const locations = [...locationsSet]
  if (locations.length >= 5) add(findings, "wave-3-repetition", "review", "repeated-editorial-sentence", locations[0], `A sentence recurs in ${locations.length} units.`, { normalizedSentence: sentence, locations: locations.slice(0, 12) })
}

// Conservative near-duplicate scan: only same-book units; synoptic parallels across books are allowed.
const shinglesByUnit = units.map((unit) => ({ ...unit, tokenCount: words(unit.teaching).length, shingles: shingles(unit.teaching) }))
for (let i = 0; i < shinglesByUnit.length; i += 1) {
  const a = shinglesByUnit[i]
  if (a.tokenCount < 45) continue
  for (let j = i + 1; j < shinglesByUnit.length; j += 1) {
    const b = shinglesByUnit[j]
    if (a.bookId !== b.bookId || b.tokenCount < 45) continue
    const lengthRatio = Math.min(a.tokenCount, b.tokenCount) / Math.max(a.tokenCount, b.tokenCount)
    if (lengthRatio < 0.72) continue
    const score = jaccard(a.shingles, b.shingles)
    if (score >= 0.82) add(findings, "wave-3-repetition", "review", "near-duplicate-teaching", a.location, `Two teachings in ${a.bookId} are highly similar (${score.toFixed(3)}).`, { other: b.location, score: Number(score.toFixed(3)) })
  }
}

// Wave 5 — global publication coherence.
const computedTraceability = anchoredUnits === units.length
if (manifest.sourceTraceabilityComplete !== computedTraceability) add(findings, "wave-5-publication-coherence", "blocker", "manifest-traceability-flag-mismatch", "manifest", `manifest.sourceTraceabilityComplete=${manifest.sourceTraceabilityComplete} but computed=${computedTraceability}.`)
if (manifest.counts?.books !== files.length || manifest.counts?.chapters !== chapters.length || manifest.counts?.units !== units.length) add(findings, "wave-5-publication-coherence", "blocker", "manifest-count-mismatch", "manifest", "Manifest counts do not match the full corpus.", { manifestCounts: manifest.counts, computed: { books: files.length, chapters: chapters.length, units: units.length } })

const countsBySeverity = findings.reduce((acc, item) => { acc[item.severity] = (acc[item.severity] ?? 0) + 1; return acc }, {})
const countsByWave = findings.reduce((acc, item) => { acc[item.wave] = (acc[item.wave] ?? 0) + 1; return acc }, {})
const report = {
  schema: "emanus-nt-final-publication-review-v1",
  status: (countsBySeverity.blocker ?? 0) === 0 && (countsBySeverity.review ?? 0) === 0 ? "clean" : ((countsBySeverity.blocker ?? 0) > 0 ? "blocked" : "review"),
  scope: "Cap-to-cap final publication review over every final NT book/chapter/unit after source-first materialization.",
  counts: {
    books: files.length,
    chapters: chapters.length,
    units: units.length,
    publicFields: publicFields.length,
    anchoredUnits,
    missingForYourHeart,
    missingCrossRefs,
    missingWords,
    missingLiteraryContext,
    missingHistoricalContext,
    missingPrayer,
    safetySentenceCount,
    blockers: countsBySeverity.blocker ?? 0,
    reviewFindings: countsBySeverity.review ?? 0,
    infoFindings: countsBySeverity.info ?? 0,
  },
  sourceFidelity: fidelityCounts,
  explanationKinds: explanationKindCounts,
  findingsByWave: countsByWave,
  findings,
}
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + "\n", "utf8")
console.log(`NT final publication review: ${files.length} books / ${chapters.length} chapters / ${units.length} units / ${publicFields.length} reader fields.`)
console.log(`Findings: ${report.counts.blockers} blockers / ${report.counts.reviewFindings} review / ${report.counts.infoFindings} info.`)
console.log(`Coverage: ${anchoredUnits}/${units.length} units source-anchored; fidelity=${JSON.stringify(fidelityCounts)}.`)
