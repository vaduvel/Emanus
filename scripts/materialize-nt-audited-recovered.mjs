#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const inputDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-recovered")
const outputDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-audited-recovered")
const registryPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-registry", "source-first-15.json")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-audited-recovered-manifest.json")
const ledgerPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-audited-recovered-ledger.json")

const EXPECTED = { books: 15, chapters: 191, units: 762 }

function fail(message) {
  console.error(`[NT audited recovery] ${message}`)
  process.exit(1)
}
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function hash(value) { return crypto.createHash("sha256").update(value).digest("hex") }

if (!fs.existsSync(inputDir)) fail("missing nt-recovered")
if (!fs.existsSync(registryPath)) fail("missing source-first-15.json")
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"))
const sourceByBook = new Map(registry.sources.map((source) => [source.book, source]))

const MODERN_NAMES = /\b(?:Zac\s+Poonen|Poonen|CFC|Christian Fellowship Church|Christian Fellowship|SermonIndex|Allen Nolan|Nolan|Robert Breaker|Breaker|Mohler)\b/gi

// These are not general doctrinal words. They are signatures of the model-added
// safety/editorial layer in the legacy branch. Remove only the sentence that contains
// one of these signatures; never delete an entire unit automatically.
const STRONG_EDITORIAL_SENTENCE_PATTERNS = [
  /\b(?:victimă|victimei|victimele|victimelor)\b/i,
  /\bconsimțăm(?:ânt|ântul|ântului)\b/i,
  /\b(?:ajutor|îngrijire|tratament)\s+(?:medical|psihologic|psihiatric|profesionist|competent)\b/i,
  /\b(?:diagnostic|criză)\s+(?:spiritual|medical|psihic|neurologic)\b/i,
  /\b(?:epilepsie|boală mintală|boală psihică|criză neurologică)\b/i,
  /\b(?:raportarea|raportează|raportare)\s+(?:răului|abuzului|infracțiun)/i,
  /\bprotec(?:ție|ția|ției)\s+(?:legală|juridică|a victimei|a copilului|și autoritatea|și ajutorul)/i,
  /\b(?:infracțiune|infracțiuni|infracțiunilor)\b/i,
  /\b(?:abuz|abuzul|abuzului|abuzuri|abuziv|abuzivă)\b/i,
  /\b(?:coerciție|coerciția|coerciției)\b/i,
  /\batingerea sexuală\b/i,
  /\bsecret periculos\b/i,
  /\blimitele personale și consimțământul\b/i,
  /\bnu (?:justifică|legitimează) sclavia\b/i,
  /\bnu (?:autorizează|justifică) (?:controlul|dominația|degradarea|violența)/i,
  /\bnicio chemare la supunere nu autorizează\b/i,
  /\bnu obligă (?:o|nicio) victim/i,
  /\bnu cere (?:unei|unei) victime/i,
  /\bnu îi cere să ascundă răul\b/i,
  /\bnu pune vina pe credința părintelui\b/i,
  /\bnu inventa un diagnostic spiritual\b/i,
  /\bajutor sigur când există abuz\b/i,
  /\bnu merge singur.*(?:abuz|pericol)/i,
  /\bcaută imediat siguranță și ajutor\b/i,
  /\bsiguranța și ajutorul competent\b/i,
  /\bprotejarea lor de manipulare, rușinare/i,
  /\bpăzește familia, copiii și lucrătorii de orice abuz\b/i,
  /\bcredința nu înlocuiește (?:evaluarea|ajutorul|tratamentul)/i,
]

const META_SENTENCE_PATTERNS = [
  /\bRCCV\b/i,
  /\bEmanus afișează\b/i,
  /\b(?:overlay|reader|transcrierea brută|în această explicație|această unitate editorială)\b/i,
]

function splitSentences(paragraph) {
  return paragraph.split(/(?<=[.!?])\s+(?=[„"A-ZĂÂÎȘȚ0-9])/u)
}

function cleanModernAttribution(text) {
  // Preserve the verb and therefore the source claim; hide only the modern proper name.
  return text
    .replace(/\bZac\s+Poonen\b/g, "Explicația")
    .replace(/\bPoonen\b/g, "Explicația")
    .replace(/\bAllen Nolan\b/g, "Explicația")
    .replace(/\bRobert Breaker\b/g, "Explicația")
    .replace(/\bMohler\b/g, "Explicația")
    .replace(/\bChristian Fellowship Church\b/g, "sursa internă")
    .replace(/\bChristian Fellowship\b/g, "sursa internă")
    .replace(/\bCFC\b/g, "sursa internă")
    .replace(/\bSermonIndex\b/g, "sursa internă")
}

function shouldDropSentence(sentence) {
  return STRONG_EDITORIAL_SENTENCE_PATTERNS.some((pattern) => pattern.test(sentence)) ||
    META_SENTENCE_PATTERNS.some((pattern) => pattern.test(sentence))
}

const ledger = []
function cleanString(value, location) {
  if (typeof value !== "string" || !value.trim()) return value
  const paragraphs = value.split(/\n\n+/)
  const cleanedParagraphs = []
  for (const paragraph of paragraphs) {
    const kept = []
    for (const sentence of splitSentences(paragraph)) {
      if (shouldDropSentence(sentence)) {
        ledger.push({ location, kind: "removed-legacy-editorial-sentence", before: sentence.trim() })
        continue
      }
      const rewritten = cleanModernAttribution(sentence)
      if (rewritten !== sentence) {
        ledger.push({ location, kind: "hidden-modern-source-name", before: sentence.trim(), after: rewritten.trim() })
      }
      kept.push(rewritten)
    }
    const joined = kept.join(" ").trim()
    if (joined) cleanedParagraphs.push(joined)
  }
  return cleanedParagraphs.join("\n\n").trim()
}

function cleanOptional(value, location) {
  const cleaned = cleanString(value, location)
  return typeof cleaned === "string" && cleaned.trim() ? cleaned : undefined
}

const files = fs.readdirSync(inputDir).filter((name) => name.endsWith(".json")).sort()
fs.rmSync(outputDir, { recursive: true, force: true })
fs.mkdirSync(outputDir, { recursive: true })
const manifestBooks = []
let totalBooks = 0
let totalChapters = 0
let totalUnits = 0

for (const file of files) {
  const sourceBook = JSON.parse(fs.readFileSync(path.join(inputDir, file), "utf8"))
  if (sourceBook.recoveryClass !== "recovered-needs-source-audit") continue
  const source = sourceByBook.get(sourceBook.id)
  if (!source) fail(`${sourceBook.id}: no recovered source registry entry`)

  const chapters = sourceBook.chapters.map((chapter) => {
    const prefix = `${sourceBook.id}.${chapter.number}`
    const units = chapter.units.map((unit, unitIndex) => {
      const teaching = cleanString(unit.teaching, `${prefix}.units[${unitIndex}].teaching`)
      if (!teaching) fail(`${prefix}: cleaning emptied teaching for ${unit.ref}`)
      const cleaned = {
        ...unit,
        heading: cleanString(unit.heading, `${prefix}.units[${unitIndex}].heading`),
        teaching,
        sourceKind: "poonen-source-first-recovered",
        sourceIds: [source.id],
      }
      const heart = cleanOptional(unit.forYourHeart, `${prefix}.units[${unitIndex}].forYourHeart`)
      if (heart) cleaned.forYourHeart = heart
      else delete cleaned.forYourHeart
      if (Array.isArray(unit.words)) {
        cleaned.words = unit.words.map((word, wordIndex) => ({
          ...word,
          meaning: cleanString(word.meaning, `${prefix}.units[${unitIndex}].words[${wordIndex}].meaning`),
        }))
      }
      return cleaned
    })

    let historicalContext = cleanOptional(chapter.historicalContext, `${prefix}.historicalContext`)
    if (sourceBook.id === "marcu" && chapter.number === 16) {
      historicalContext = "Cele mai timpurii manuscrise nu sunt toate identice la finalul cărții: unele se încheie la 16:8, iar altele păstrează 16:9–20. Finalul lung este tratat ca variantă textuală marcată, fără a altera numerotarea și politica critică a textului principal."
      ledger.push({ location: `${prefix}.historicalContext`, kind: "critical-text-context-rebound-to-be" })
    }

    return {
      number: chapter.number,
      title: cleanString(chapter.title, `${prefix}.title`),
      summary: cleanString(chapter.summary, `${prefix}.summary`),
      ...(chapter.literaryContext ? { literaryContext: cleanString(chapter.literaryContext, `${prefix}.literaryContext`) } : {}),
      ...(historicalContext ? { historicalContext } : {}),
      units,
      ...(cleanOptional(chapter.prayer, `${prefix}.prayer`) ? { prayer: cleanOptional(chapter.prayer, `${prefix}.prayer`) } : {}),
      status: "in_review",
      reviewState: "source-first-audited-recovery",
      emanusTextBinding: chapter.emanusTextBinding,
      provenance: {
        sourcePolicy: "poonen-source-first",
        sourceIds: [source.id],
        legacyBranch: source.legacyBranch,
        ...(source.legacyPr ? { legacyPr: source.legacyPr } : {}),
        legacyGenericContentUsed: false,
        editorialSafetyLayerRetained: false,
      },
    }
  })

  const payload = {
    schema: "emanus-nt-audited-recovered-v1",
    id: sourceBook.id,
    bookId: sourceBook.bookId,
    name: sourceBook.name,
    testament: "nt",
    order: sourceBook.order,
    status: "in_review",
    publicationReady: false,
    chapters,
  }
  const rendered = stable(payload)
  fs.writeFileSync(path.join(outputDir, file), rendered, "utf8")
  totalBooks += 1
  totalChapters += chapters.length
  totalUnits += chapters.reduce((sum, chapter) => sum + chapter.units.length, 0)
  manifestBooks.push({
    id: payload.id,
    bookId: payload.bookId,
    name: payload.name,
    chapters: chapters.length,
    units: chapters.reduce((sum, chapter) => sum + chapter.units.length, 0),
    sourceId: source.id,
    sha256: hash(rendered),
  })
}

if (totalBooks !== EXPECTED.books || totalChapters !== EXPECTED.chapters || totalUnits !== EXPECTED.units) {
  fail(`totals ${totalBooks}/${EXPECTED.books} books, ${totalChapters}/${EXPECTED.chapters} chapters, ${totalUnits}/${EXPECTED.units} units`)
}

const manifest = {
  schema: "emanus-nt-audited-recovered-manifest-v1",
  status: "in_review",
  publicationReady: false,
  doctrinePolicy: "Recovered Poonen/CFC teaching preserved. Only modern source-name attribution and identified legacy editorial/safety additions are removed. No generic completion is admitted.",
  counts: { books: totalBooks, chapters: totalChapters, units: totalUnits, ledgerChanges: ledger.length },
  books: manifestBooks,
}
fs.writeFileSync(manifestPath, stable(manifest), "utf8")
fs.writeFileSync(ledgerPath, stable({ schema: "emanus-nt-audited-recovered-ledger-v1", changes: ledger }), "utf8")
console.log(`NT audited recovery materialized: ${totalBooks} books / ${totalChapters} chapters / ${totalUnits} units; ${ledger.length} explicit copy changes.`)
