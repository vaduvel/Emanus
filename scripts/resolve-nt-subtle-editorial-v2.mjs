#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const inputDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-audited-recovered-refined")
const findingsPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-subtle-editorial-refined-findings.json")
const outputDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered")
const decisionsPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-subtle-editorial-decisions.json")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered-manifest.json")

const EXPECTED_FINDINGS_GIT_BLOB = "9a87f28f88704d26ebb723225130d77d72346f0e"
const EXPECTED = { books: 15, chapters: 191, units: 762, rawFindings: 96, uniqueCandidates: 95 }

function fail(message) { console.error(`[NT subtle resolver v2] ${message}`); process.exit(1) }
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }
function gitBlobSha(raw) {
  const body = Buffer.from(raw, "utf8")
  return crypto.createHash("sha1").update(Buffer.concat([Buffer.from(`blob ${body.length}\0`), body])).digest("hex")
}
function sentenceParts(value) { return String(value ?? "").split(/(?<=[.!?])\s+/u).map((s) => s.trim()).filter(Boolean) }
function selector(bookId, chapter, field, contains, rationale) { return { bookId, chapter, field, contains, rationale } }
function matches(finding, rule) {
  return finding.bookId === rule.bookId && finding.chapter === rule.chapter && finding.field === rule.field && finding.sentence.includes(rule.contains)
}
function findRule(finding, rules) {
  const hits = rules.filter((rule) => matches(finding, rule))
  if (hits.length > 1) fail(`ambiguous rule: ${finding.bookId} ${finding.chapter} ${finding.field}`)
  return hits[0]
}
function parseField(root, field) {
  const tokens = []
  const regex = /([A-Za-z]+)|\[(\d+)\]/g
  let match
  while ((match = regex.exec(field))) tokens.push(match[1] ?? Number(match[2]))
  if (!tokens.length) fail(`invalid field path ${field}`)
  let parent = root
  for (let i = 0; i < tokens.length - 1; i += 1) {
    parent = parent?.[tokens[i]]
    if (parent == null) fail(`missing field path ${field}`)
  }
  return { parent, key: tokens[tokens.length - 1] }
}
function replaceSentence(value, sentence, replacement) {
  const parts = sentenceParts(value)
  const index = parts.indexOf(sentence)
  if (index < 0) fail(`reviewed sentence no longer exists in target field: ${sentence}`)
  if (replacement) parts[index] = replacement
  else parts.splice(index, 1)
  return parts.join(" ").trim()
}

// KEEP means the candidate was reviewed as direct textual/historical context or a
// non-safety doctrinal/application statement worth preserving. It does NOT imply
// source traceability is complete; sourceAnchors are enforced by a separate gate.
const KEEP = [
  selector("matei", 1, "historicalContext", "Logodna iudaică era un legământ juridic", "direct-historical-context"),
  selector("matei", 22, "units[0].teaching", "omul fără haină de nuntă", "direct-parable-logic"),
  selector("matei", 27, "units[1].teaching", "Spălarea mâinilor", "direct-pilate-account"),
  selector("marcu", 1, "units[1].teaching", "nu își permite nicio familiaritate", "source-consistent-john-ministry"),
  selector("marcu", 11, "literaryContext", "Conflictul cu autoritățile", "direct-literary-context"),
  selector("marcu", 13, "units[0].teaching", "nu un calendar care permite calcule", "source-consistent-eschatology"),
  selector("luca", 4, "units[0].teaching", "Mesajul rămâne actual", "source-consistent-ministry-application"),
  selector("luca", 9, "units[0].teaching", "Minunea nu justifică promisiuni de prosperitate", "source-consistent-anti-prosperity"),
  selector("luca", 9, "units[4].teaching", "Respingerea nu ne autorizează să dorim judecata imediată", "direct-jesus-rebuke"),
  selector("luca", 10, "units[0].teaching", "Nevoia mare nu justifică independența", "source-consistent-ministry-principle"),
  selector("luca", 15, "historicalContext", "munca la porci reprezenta degradare profundă", "direct-cultural-context"),
  selector("luca", 20, "literaryContext", "După curățirea templului", "direct-literary-context"),
  selector("luca", 21, "units[1].teaching", "Isus promite cuvinte și înțelepciune", "direct-passage-teaching"),
  selector("luca", 22, "units[4].teaching", "nu permite ucenicilor să-I apere Împărăția prin forță", "direct-kingdom-contrast"),
  selector("luca", 23, "literaryContext", "Procesul religios din capitolul anterior", "direct-literary-context"),
  selector("luca", 23, "historicalContext", "Numai Roma putea aplica", "direct-historical-context"),
  selector("fapte", 2, "units[3].teaching", "Dărnicia este liberă", "source-consistent-voluntary-giving"),
  selector("fapte", 4, "summary", "Petru și Ioan mărturisesc cu îndrăzneală", "direct-summary"),
  selector("fapte", 4, "units[1].teaching", "ascultarea de Dumnezeu", "direct-apostolic-principle"),
  selector("fapte", 22, "units[2].teaching", "cetățean roman necondamnat", "direct-paul-citizenship"),
  selector("fapte", 23, "summary", "salvat de un complot", "direct-summary"),
  selector("fapte", 25, "units[0].teaching", "nu se oferă voluntar complotului", "direct-paul-appeal"),
  selector("fapte", 25, "units[1].teaching", "Autoritățile pot considera mesajul", "direct-passage-context"),
  selector("romani", 13, "summary", "fără a face din stat o autoritate absolută", "source-consistent-authority-under-god"),
  selector("romani", 13, "prayer", "curaj să Te ascult mai presus de orice om", "source-consistent-authority-under-god"),
  selector("1-corinteni", 6, "historicalContext", "Procesele publice din lumea romană", "direct-historical-context"),
  selector("1-corinteni", 6, "units[0].teaching", "corecți juridic", "source-consistent-cross-principle"),
  selector("1-corinteni", 16, "units[1].teaching", "Timotei trebuia primit fără intimidare", "source-consistent-apostolic-conduct"),
  selector("2-corinteni", 4, "units[2].forYourHeart", "Recunoaște durerea prezentă", "direct-hope-application"),
  selector("2-corinteni", 10, "units[0].teaching", "Pavel refuză să lupte prin intimidare", "source-consistent-spiritual-weapons"),
  selector("2-corinteni", 12, "literaryContext", "lauda paradoxală cu suferințele", "source-consistent-thorn-context"),
  selector("coloseni", 4, "units[2].teaching", "statutul său juridic", "direct-onesimus-context"),
  selector("1-tesaloniceni", 4, "units[3].teaching", "Textul nu permite stabilirea datelor", "source-consistent-eschatology"),
  selector("filimon", 1, "units[0].teaching", "nu cu amenințare, presiune sau rușinare publică", "direct-paul-appeal-style"),
]

const REWRITE = [
  {
    ...selector("fapte", 11, "units[2].teaching", "Dărnicia este voluntară și proporțională", "preserve-core-remove-modern-financial-guard"),
    replacement: "Dărnicia este voluntară și proporțională.",
  },
  {
    ...selector("filipeni", 1, "units[4].heading", "O singură inimă, fără intimidare", "remove-modern-heading-guard"),
    replacement: "O singură inimă",
  },
]

if (!fs.existsSync(findingsPath) || !fs.existsSync(inputDir)) fail("findings/refined corpus missing")
const findingsRaw = fs.readFileSync(findingsPath, "utf8")
const blob = gitBlobSha(findingsRaw)
if (blob !== EXPECTED_FINDINGS_GIT_BLOB) fail(`candidate report changed: git blob ${blob}, expected ${EXPECTED_FINDINGS_GIT_BLOB}; new manual classification required`)
const report = JSON.parse(findingsRaw)
if (report.count !== EXPECTED.rawFindings || report.findings?.length !== EXPECTED.rawFindings) fail(`raw findings ${report.findings?.length ?? 0}/${EXPECTED.rawFindings}`)

const unique = new Map()
for (const finding of report.findings) {
  const key = `${finding.bookId}\u0000${finding.chapter}\u0000${finding.field}\u0000${finding.sentence}`
  if (!unique.has(key)) unique.set(key, finding)
}
if (unique.size !== EXPECTED.uniqueCandidates) fail(`unique candidates ${unique.size}/${EXPECTED.uniqueCandidates}`)

for (const rule of [...KEEP, ...REWRITE]) {
  if (!report.findings.some((finding) => matches(finding, rule))) fail(`stale reviewed selector: ${rule.bookId} ${rule.chapter} ${rule.field} :: ${rule.contains}`)
}

const books = new Map()
const fileById = new Map()
for (const file of fs.readdirSync(inputDir).filter((name) => name.endsWith(".json")).sort()) {
  const book = JSON.parse(fs.readFileSync(path.join(inputDir, file), "utf8"))
  books.set(book.id, book)
  fileById.set(book.id, file)
}
if (books.size !== EXPECTED.books) fail(`books ${books.size}/${EXPECTED.books}`)

const decisions = []
for (const finding of unique.values()) {
  const keep = findRule(finding, KEEP)
  const rewrite = findRule(finding, REWRITE)
  if (keep && rewrite) fail(`conflicting reviewed actions: ${finding.bookId} ${finding.chapter} ${finding.field}`)
  let action = "remove-modern-editorial"
  let rationale = "classified-modern-editorial-not-required-by-direct-textual-or-historical-context"
  let replacement = null
  if (keep) {
    action = "keep-reviewed"
    rationale = keep.rationale
  } else if (rewrite) {
    action = "rewrite-reviewed"
    rationale = rewrite.rationale
    replacement = rewrite.replacement
  }
  decisions.push({ ...finding, action, rationale, sourceTraceabilityState: "pending-source-anchor", ...(replacement ? { replacement } : {}) })
}

for (const decision of decisions) {
  if (decision.action === "keep-reviewed") continue
  const book = books.get(decision.bookId)
  if (!book) fail(`missing book ${decision.bookId}`)
  const chapter = book.chapters.find((item) => item.number === decision.chapter)
  if (!chapter) fail(`missing ${decision.bookId} ${decision.chapter}`)
  const { parent, key } = parseField(chapter, decision.field)
  const current = parent[key]
  if (typeof current !== "string") fail(`target not string ${decision.bookId} ${decision.chapter} ${decision.field}`)
  const updated = replaceSentence(current, decision.sentence, decision.action === "rewrite-reviewed" ? decision.replacement : null)
  if (updated) parent[key] = updated
  else delete parent[key]
}

fs.rmSync(outputDir, { recursive: true, force: true })
fs.mkdirSync(outputDir, { recursive: true })
const manifestBooks = []
let chapters = 0
let units = 0
for (const [id, book] of books) {
  for (const chapter of book.chapters) {
    chapter.reviewState = "subtle-modern-editorial-classified"
    chapter.provenance = { ...chapter.provenance, subtleEditorialClassificationComplete: true, sourceTraceabilityComplete: false }
    chapters += 1
    units += chapter.units?.length ?? 0
  }
  const rendered = stable({ ...book, schema: "emanus-nt-reviewed-recovered-v2" })
  const file = fileById.get(id)
  fs.writeFileSync(path.join(outputDir, file), rendered, "utf8")
  manifestBooks.push({ id, bookId: book.bookId, name: book.name, chapters: book.chapters.length, units: book.chapters.reduce((sum, c) => sum + c.units.length, 0), sha256: sha256(rendered) })
}
if (chapters !== EXPECTED.chapters || units !== EXPECTED.units) fail(`totals ${chapters}/${EXPECTED.chapters} chapters, ${units}/${EXPECTED.units} units`)

const actionCounts = decisions.reduce((acc, item) => { acc[item.action] = (acc[item.action] ?? 0) + 1; return acc }, {})
const decided = Object.values(actionCounts).reduce((sum, value) => sum + value, 0)
if (decided !== EXPECTED.uniqueCandidates) fail(`decisions ${decided}/${EXPECTED.uniqueCandidates}`)

fs.writeFileSync(decisionsPath, stable({
  schema: "emanus-nt-subtle-editorial-decisions-v2",
  reviewedCandidateReportGitBlob: EXPECTED_FINDINGS_GIT_BLOB,
  rawFindings: report.findings.length,
  uniqueCandidateSentences: unique.size,
  classificationScope: "modern-editorial-only; source traceability remains separately blocked",
  actionCounts,
  decisions,
}), "utf8")
fs.writeFileSync(manifestPath, stable({
  schema: "emanus-nt-reviewed-recovered-manifest-v2",
  status: "in_review",
  publicationReady: false,
  sourceTraceabilityComplete: false,
  counts: { books: books.size, chapters, units, rawFindings: report.findings.length, uniqueCandidateSentences: unique.size, ...actionCounts },
  books: manifestBooks,
}), "utf8")
console.log(`NT modern-editorial classification complete: ${report.findings.length} raw / ${unique.size} unique.`)
console.log(JSON.stringify(actionCounts))
console.log("Source traceability remains blocked until sourceAnchors are present and verified.")
