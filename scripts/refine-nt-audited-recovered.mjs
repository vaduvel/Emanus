#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const inputDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-audited-recovered")
const outputDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-audited-recovered-refined")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-audited-recovered-refined-manifest.json")
const ledgerPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-audited-recovered-refined-ledger.json")
const EXPECTED = { books: 15, chapters: 191, units: 762 }

function fail(message) {
  console.error(`[NT refined recovery] ${message}`)
  process.exit(1)
}
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function hash(value) { return crypto.createHash("sha256").update(value).digest("hex") }
function norm(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
}
function splitSentences(paragraph) {
  return String(paragraph).split(/(?<=[.!?])\s+(?=[„"A-ZĂÂÎȘȚ0-9])/u)
}

// High-confidence signatures of the legacy model-added safety/editorial layer.
// These are intentionally narrower than a general "nu înseamnă" scan so that
// source doctrine is not removed merely because it uses negative language.
const DROP = [
  /\b112\b/,
  /\bpolitie\b|\bpolitiei\b/,
  /\bajutor (?:sigur|profesionist|specializat|competent|imediat)\b/,
  /\bcauta (?:ajutor|sprijin|protectie|siguranta)\b/,
  /\bcere (?:ajutor|sprijin|protectie)\b/,
  /\bsprijin (?:sigur|profesionist|specializat|medical|psihologic|juridic)\b/,
  /\blimite (?:sanatoase|personale)\b/,
  /\bspatiu sigur\b|\bmediu sigur\b/,
  /\bfara teama de represalii\b/,
  /\b(?:control|controleze|controlul).{0,90}\b(?:constiint|bani|finante|relatii|accesul|viata altuia)\b/,
  /\b(?:constiint|bani|finante|relatii).{0,90}\b(?:control|controleze|controlul)\b/,
  /\b(?:presiune|manipulare|exploatare) financiara\b/,
  /\b(?:tratament|ingrijire|evaluare|ajutor|sprijin).{0,50}\b(?:medical|psihologic|psihiatric|clinic|neurologic)\b/,
  /\b(?:medical|psihologic|psihiatric|clinic|neurologic).{0,50}\b(?:tratament|ingrijire|evaluare|ajutor|sprijin)\b/,
  /\b(?:terapeut|psiholog|psihiatru|specialist medical|servicii medicale)\b/,
  /\b(?:boala mintala|boala psihica|tulburare psihica|criza neurologica|epilepsie)\b/,
  /\b(?:autovatamare|auto-vatamare).{0,90}\b(?:ajutor|sprijin|siguranta|imediat)\b/,
  /\b(?:sinucidere|sinucigas).{0,90}\b(?:ajutor|sprijin|siguranta|destinul|diagnostic)\b/,
  /\bconsimtamant\b/,
  /\batingere sexuala\b|\bcontact sexual\b/,
  /\bcoercitie sexuala\b|\bconstrangere sexuala\b/,
  /\bantisemitism\b/,
  /\b(?:rasism|superioritate etnica|dispret etnic)\b/,
  /\btulburari alimentare\b|\bfoamete fortata\b/,
  /\bnu.{0,70}\b(?:autorizeaza|justifica|legitimeaza)\b.{0,120}\b(?:violenta|control|dominare|umilire|intimidare|constrangere|coercitie|represalii|razbunare|atingere|abuz)\b/,
  /\bnu.{0,60}\b(?:inseamna|cere)\b.{0,120}\b(?:supunere oarba|tacere in pericol|acceptarea raului|renuntarea la siguranta|ignorarea pericolului)\b/,
  /\b(?:protejeaza|protejarea|protectia).{0,90}\b(?:copil|victim|persoana vulnerabila|siguranta)\b/,
  /\b(?:autoritatile|autoritatilor).{0,100}\b(?:siguranta|pericol|abuz|protectie|infractiune)\b/,
  /\b(?:siguranta|pericol|abuz|protectie|infractiune).{0,100}\b(?:autoritatile|autoritatilor)\b/,
  /\bnu.{0,70}\bforteaza\b.{0,90}\b(?:iertarea|reconcilierea|contactul|relatia)\b/,
  /\bnu.{0,90}\b(?:obliga|cere).{0,90}\b(?:ramana|ramanerea).{0,60}\b(?:pericol|rau|situatie)\b/,
  /\b(?:dreptul|drepturi).{0,90}\b(?:siguranta|protectie juridica|ajutor juridic)\b/,
  /\b(?:presiune religioasa|presiune de grup).{0,80}\b(?:bani|donatii|sexual|relatii)\b/,
]

const EMPTY_HEADING_OVERRIDES = new Map([
  ["luca.13.Luca 13:1-9", "Pocăință și rod înaintea lui Dumnezeu"],
  ["2-corinteni.11.2 Corinteni 11:16-21", "Îi suportați pe cei care vă robesc"],
])

function shouldDrop(sentence) {
  const text = norm(sentence)
  return DROP.some((pattern) => pattern.test(text))
}

const ledger = []
function cleanString(value, location) {
  if (typeof value !== "string" || !value.trim()) return value
  const out = []
  for (const paragraph of value.split(/\n\n+/)) {
    const kept = []
    for (const sentence of splitSentences(paragraph)) {
      if (shouldDrop(sentence)) {
        ledger.push({ location, kind: "removed-high-confidence-modern-editorial", before: sentence.trim() })
      } else {
        kept.push(sentence)
      }
    }
    const joined = kept.join(" ").trim()
    if (joined) out.push(joined)
  }
  return out.join("\n\n").trim()
}
function cleanOptional(value, location) {
  const cleaned = cleanString(value, location)
  return typeof cleaned === "string" && cleaned.trim() ? cleaned : undefined
}
function cleanHeading(sourceId, chapterNumber, unit, location) {
  const cleaned = cleanString(unit.heading, location)
  if (typeof cleaned === "string" && cleaned.trim()) return cleaned
  const replacement = EMPTY_HEADING_OVERRIDES.get(`${sourceId}.${chapterNumber}.${unit.ref}`)
  if (!replacement) return cleaned
  ledger.push({ location, kind: "filled-known-empty-heading", before: cleaned ?? "", after: replacement })
  return replacement
}

if (!fs.existsSync(inputDir)) fail("missing nt-audited-recovered")
fs.rmSync(outputDir, { recursive: true, force: true })
fs.mkdirSync(outputDir, { recursive: true })

const files = fs.readdirSync(inputDir).filter((name) => name.endsWith(".json")).sort()
let books = 0
let chapters = 0
let units = 0
const manifestBooks = []
for (const file of files) {
  const source = JSON.parse(fs.readFileSync(path.join(inputDir, file), "utf8"))
  const refinedChapters = source.chapters.map((chapter) => {
    chapters += 1
    const prefix = `${source.id}.${chapter.number}`
    const refinedUnits = chapter.units.map((unit, index) => {
      units += 1
      const teaching = cleanString(unit.teaching, `${prefix}.units[${index}].teaching`)
      if (!teaching || teaching.length < 80) fail(`${prefix} ${unit.ref}: refinement emptied/over-thinned teaching`)
      const out = {
        ...unit,
        heading: cleanHeading(source.id, chapter.number, unit, `${prefix}.units[${index}].heading`),
        teaching,
      }
      const heart = cleanOptional(unit.forYourHeart, `${prefix}.units[${index}].forYourHeart`)
      if (heart) out.forYourHeart = heart
      else delete out.forYourHeart
      if (Array.isArray(unit.words)) out.words = unit.words.map((word, wi) => ({ ...word, meaning: cleanString(word.meaning, `${prefix}.units[${index}].words[${wi}].meaning`) }))
      return out
    })
    const historicalContext = cleanOptional(chapter.historicalContext, `${prefix}.historicalContext`)
    const prayer = cleanOptional(chapter.prayer, `${prefix}.prayer`)
    return {
      ...chapter,
      title: cleanString(chapter.title, `${prefix}.title`),
      summary: cleanString(chapter.summary, `${prefix}.summary`),
      ...(chapter.literaryContext ? { literaryContext: cleanString(chapter.literaryContext, `${prefix}.literaryContext`) } : {}),
      ...(historicalContext ? { historicalContext } : {}),
      units: refinedUnits,
      ...(prayer ? { prayer } : {}),
      reviewState: "source-first-refined-recovery",
      provenance: { ...chapter.provenance, subtleEditorialRefined: true },
    }
  })
  const payload = { ...source, schema: "emanus-nt-audited-recovered-refined-v1", chapters: refinedChapters }
  const rendered = stable(payload)
  fs.writeFileSync(path.join(outputDir, file), rendered, "utf8")
  books += 1
  manifestBooks.push({ id: source.id, bookId: source.bookId, name: source.name, chapters: refinedChapters.length, units: refinedChapters.reduce((n, c) => n + c.units.length, 0), sha256: hash(rendered) })
}
if (books !== EXPECTED.books || chapters !== EXPECTED.chapters || units !== EXPECTED.units) fail(`totals ${books}/${EXPECTED.books}, ${chapters}/${EXPECTED.chapters}, ${units}/${EXPECTED.units}`)
fs.writeFileSync(manifestPath, stable({
  schema: "emanus-nt-audited-recovered-refined-manifest-v1",
  status: "in_review",
  publicationReady: false,
  counts: { books, chapters, units, removals: ledger.length },
  books: manifestBooks,
}), "utf8")
fs.writeFileSync(ledgerPath, stable({ schema: "emanus-nt-audited-recovered-refined-ledger-v1", changes: ledger }), "utf8")
console.log(`NT refined recovery: ${books} books / ${chapters} chapters / ${units} units; ${ledger.length} additional high-confidence editorial changes applied.`)
