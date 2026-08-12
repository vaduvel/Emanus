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

// This is the git-blob SHA of the exact 96-candidate report that was manually reviewed.
// If the candidate set changes, this resolver refuses to make decisions until it is reviewed again.
const EXPECTED_FINDINGS_GIT_BLOB = "9a87f28f88704d26ebb723225130d77d72346f0e"
const EXPECTED = { books: 15, chapters: 191, units: 762, findings: 96 }

function fail(message) { console.error(`[NT subtle resolver] ${message}`); process.exit(1) }
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }
function gitBlobSha(raw) {
  const body = Buffer.from(raw, "utf8")
  return crypto.createHash("sha1").update(Buffer.concat([Buffer.from(`blob ${body.length}\0`), body])).digest("hex")
}
function norm(value) { return String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() }
function sentenceParts(value) { return String(value ?? "").split(/(?<=[.!?])\s+/u).map((s) => s.trim()).filter(Boolean) }

function selector(bookId, chapter, field, contains, rationale) { return { bookId, chapter, field, contains, rationale } }

// Explicit KEEP decisions. These are not generic exceptions: each one was reviewed as
// direct textual/historical context or as a source-consistent statement that should survive.
const KEEP = [
  selector("matei",1,"historicalContext","Iudeea se afla","direct-historical-context"),
  selector("matei",22,"units[0].teaching","refuză haina","direct-parable-logic"),
  selector("matei",27,"units[1].teaching","spălarea rituală","direct-pilate-account"),
  selector("marcu",1,"units[1].teaching","nu își permite familiaritate","source-consistent-john-ministry"),
  selector("marcu",11,"literaryContext","confruntare deschisă","direct-literary-context"),
  selector("marcu",13,"units[0].teaching","nu un calendar","source-consistent-eschatology"),
  selector("luca",4,"units[0].teaching","slujească mai larg","source-consistent-ministry-application"),
  selector("luca",9,"units[0].teaching","program de prosperitate","source-consistent-anti-prosperity"),
  selector("luca",9,"units[4].teaching","nu autorizează judecata imediată","direct-jesus-rebuke"),
  selector("luca",10,"units[0].teaching","construi un nume","source-consistent-ministry-principle"),
  selector("luca",15,"historicalContext","rușinoasă și degradantă","direct-cultural-context"),
  selector("luca",20,"literaryContext","autoritățile religioase și politice","direct-literary-context"),
  selector("luca",21,"units[1].teaching","în fața autorităților","direct-passage-teaching"),
  selector("luca",22,"units[4].teaching","nu prin forță","direct-kingdom-contrast"),
  selector("luca",23,"literaryContext","autorități religioase și civile","direct-literary-context"),
  selector("luca",23,"historicalContext","autoritățile Romei","direct-historical-context"),
  selector("fapte",2,"units[3].teaching","este voluntară","source-consistent-voluntary-giving"),
  selector("fapte",4,"summary","opoziție din partea autorităților","direct-summary"),
  selector("fapte",4,"units[1].teaching","autoritatea supremă","direct-apostolic-principle"),
  selector("fapte",22,"units[2].teaching","drepturi legale","direct-paul-citizenship"),
  selector("fapte",23,"summary","autoritățile iudaice și romane","direct-summary"),
  selector("fapte",25,"units[0].teaching","siguranța sa și cadrul legal","direct-paul-appeal"),
  selector("fapte",25,"units[1].teaching","autoritatea romană","direct-passage-context"),
  selector("romani",13,"summary","fără a le absolutiza","source-consistent-authority-under-god"),
  selector("romani",13,"prayer","autoritățile fără idolatrie","source-consistent-authority-under-god"),
  selector("1-corinteni",6,"historicalContext","forurile juridice romane","direct-historical-context"),
  selector("1-corinteni",6,"units[0].teaching","corect juridic","source-consistent-cross-principle"),
  selector("1-corinteni",16,"units[1].teaching","fără intimidare","source-consistent-apostolic-conduct"),
  selector("2-corinteni",4,"units[1].forYourHeart","povestea finală","direct-hope-application"),
  selector("2-corinteni",10,"units[0].teaching","refuză să lupte prin intimidare","source-consistent-spiritual-weapons"),
  selector("2-corinteni",12,"literaryContext","construiască identitatea","source-consistent-thorn-context"),
  selector("coloseni",4,"units[2].teaching","statutul juridic","direct-onesimus-context"),
  selector("1-tesaloniceni",4,"units[3].teaching","calcule de date","source-consistent-eschatology"),
  selector("filimon",1,"units[0].teaching","fără amenințări","direct-paul-appeal-style")
]

const REWRITE = [
  {
    ...selector("fapte",11,"units[2].teaching","Dărnicia este voluntară și proporțională","preserve-source-core-remove-modern-financial-guard"),
    replacement: "Dărnicia este voluntară și proporțională."
  },
  {
    ...selector("filipeni",1,"units[0].heading","O singură inimă, fără intimidare","remove-modern-heading-guard"),
    replacement: "O singură inimă"
  }
]

function matches(finding, rule) {
  return finding.bookId === rule.bookId && finding.chapter === rule.chapter && finding.field === rule.field && finding.sentence.includes(rule.contains)
}
function findRule(finding, rules) {
  const matchesFound = rules.filter((rule) => matches(finding, rule))
  if (matchesFound.length > 1) fail(`ambiguous decision rules for ${finding.bookId} ${finding.chapter} ${finding.field}: ${finding.sentence}`)
  return matchesFound[0]
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
  if (index < 0) fail(`sentence not found in target field: ${sentence}`)
  if (replacement) parts[index] = replacement
  else parts.splice(index, 1)
  return parts.join(" ").trim()
}

if (!fs.existsSync(findingsPath) || !fs.existsSync(inputDir)) fail("findings/refined corpus missing")
const findingsRaw = fs.readFileSync(findingsPath, "utf8")
const blob = gitBlobSha(findingsRaw)
if (blob !== EXPECTED_FINDINGS_GIT_BLOB) fail(`candidate report changed: git blob ${blob}, expected ${EXPECTED_FINDINGS_GIT_BLOB}; manual review required`)
const report = JSON.parse(findingsRaw)
if (report.count !== EXPECTED.findings || report.findings?.length !== EXPECTED.findings) fail(`findings ${report.findings?.length ?? 0}/${EXPECTED.findings}`)

const unique = new Map()
for (const finding of report.findings) {
  const key = `${finding.bookId}\u0000${finding.chapter}\u0000${finding.field}\u0000${finding.sentence}`
  if (!unique.has(key)) unique.set(key, finding)
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
  if (keep && rewrite) fail(`both KEEP and REWRITE matched ${finding.bookId} ${finding.chapter} ${finding.field}`)
  let action = "remove-modern-editorial"
  let rationale = "manual-review-modern-editorial-not-required-by-source-or-direct-context"
  let replacement = null
  if (keep) {
    action = "keep-reviewed"
    rationale = keep.rationale
  } else if (rewrite) {
    action = "rewrite-reviewed"
    rationale = rewrite.rationale
    replacement = rewrite.replacement
  }
  decisions.push({ ...finding, action, rationale, ...(replacement ? { replacement } : {}) })
}

// Every explicit selector must match at least one reviewed candidate; stale selectors are forbidden.
for (const rule of [...KEEP, ...REWRITE]) {
  if (!report.findings.some((finding) => matches(finding, rule))) fail(`stale decision selector: ${rule.bookId} ${rule.chapter} ${rule.field} ${rule.contains}`)
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
    chapter.reviewState = "source-first-manually-resolved-recovery"
    chapter.provenance = { ...chapter.provenance, subtleEditorialReviewResolved: true }
    chapters += 1
    units += chapter.units?.length ?? 0
  }
  const rendered = stable({ ...book, schema: "emanus-nt-reviewed-recovered-v1" })
  const file = fileById.get(id)
  fs.writeFileSync(path.join(outputDir, file), rendered, "utf8")
  manifestBooks.push({ id, bookId: book.bookId, name: book.name, chapters: book.chapters.length, units: book.chapters.reduce((sum, c) => sum + c.units.length, 0), sha256: sha256(rendered) })
}
if (chapters !== EXPECTED.chapters || units !== EXPECTED.units) fail(`totals ${chapters}/${EXPECTED.chapters} chapters, ${units}/${EXPECTED.units} units`)

const actionCounts = decisions.reduce((acc, item) => { acc[item.action] = (acc[item.action] ?? 0) + 1; return acc }, {})
fs.writeFileSync(decisionsPath, stable({
  schema: "emanus-nt-subtle-editorial-decisions-v1",
  reviewedCandidateReportGitBlob: EXPECTED_FINDINGS_GIT_BLOB,
  rawFindings: report.findings.length,
  uniqueCandidateSentences: unique.size,
  actionCounts,
  decisions,
}), "utf8")
fs.writeFileSync(manifestPath, stable({
  schema: "emanus-nt-reviewed-recovered-manifest-v1",
  status: "in_review",
  publicationReady: false,
  counts: { books: books.size, chapters, units, rawFindings: report.findings.length, uniqueCandidateSentences: unique.size, ...actionCounts },
  books: manifestBooks,
}), "utf8")
console.log(`NT subtle editorial review resolved: ${report.findings.length} raw findings / ${unique.size} unique sentences.`)
console.log(JSON.stringify(actionCounts))
