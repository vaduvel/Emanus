#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dataDir = path.join(ROOT, "docs", "data", "biblia-explicata")
const evidencePath = path.join(dataDir, "nt-lexicon-source-evidence.json")
const sourcesPath = path.join(dataDir, "nt-lexicon-review-sources.json")

function fail(message) { console.error(`[NT TFLSJ fallback] ${message}`); process.exit(1) }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }
function gitBlobSha(buffer) {
  const header = Buffer.from(`blob ${buffer.length}\0`, "utf8")
  return crypto.createHash("sha1").update(header).update(buffer).digest("hex")
}
function exactGreek(value) {
  return String(value ?? "").normalize("NFC").toLowerCase().replace(/ς/gu, "σ").replace(/[^\p{Script=Greek}\p{M}]+/gu, "")
}
function greekTokens(value) {
  return [...String(value ?? "").normalize("NFD").matchAll(/[\p{Script=Greek}\u0300-\u036f]+/gu)]
    .map((match) => match[0].normalize("NFC"))
    .filter((token) => exactGreek(token))
}
function rawUrl(source) {
  return `https://raw.githubusercontent.com/${source.repository}/${source.commitSha}/${source.path.split("/").map(encodeURIComponent).join("/")}`
}

const ALIASES = new Map([
  [exactGreek("βατταλογέω"), ["βατταλογέω", "βαττολογέω"]],
  [exactGreek("λεγιών"), ["λεγιών", "λεγεών"]],
])

if (!fs.existsSync(evidencePath) || !fs.existsSync(sourcesPath)) fail("lexical evidence/source registry missing")
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"))
const registry = JSON.parse(fs.readFileSync(sourcesPath, "utf8"))
const source = (registry.sources ?? []).find((item) => item.id === "stepbible-tflsj")
if (!source?.repository || !source?.commitSha || !source?.path || !source?.blobSha) fail("pinned TFLSJ source missing")

const response = await fetch(rawUrl(source), { redirect: "follow" })
if (!response.ok) fail(`failed to fetch TFLSJ: HTTP ${response.status}`)
const buffer = Buffer.from(await response.arrayBuffer())
const actualBlobSha = gitBlobSha(buffer)
if (actualBlobSha !== source.blobSha) fail(`TFLSJ blob mismatch: ${actualBlobSha} != ${source.blobSha}`)
const lines = buffer.toString("utf8").split(/\r?\n/u)

function targetLemma(entry) {
  const problem = String(entry.morphgntProblem ?? "")
  const resolved = /^resolved-lemma-not-in-tbesg:(.+)$/u.exec(problem)
  if (resolved) return resolved[1].normalize("NFC")
  const tokens = greekTokens(entry.original)
  return tokens.length === 1 ? tokens[0] : null
}
function candidateLines(lemma) {
  const key = exactGreek(lemma)
  const aliases = (ALIASES.get(key) ?? [lemma]).map(exactGreek)
  const matches = []
  for (let index = 0; index < lines.length; index += 1) {
    const raw = lines[index]
    if (!raw.trim()) continue
    const head = raw.slice(0, 320)
    const tokens = greekTokens(head).map(exactGreek)
    if (!tokens.length) continue
    const firstFew = tokens.slice(0, 5)
    if (!aliases.some((alias) => firstFew.includes(alias))) continue
    matches.push({ lineNumber: index + 1, raw })
    if (matches.length > 8) break
  }
  return matches
}

let resolvedCount = 0
for (const entry of evidence.entries ?? []) {
  if (entry.candidateCount !== 0) continue
  const lemma = targetLemma(entry)
  if (!lemma) continue
  const matches = candidateLines(lemma)
  if (matches.length !== 1) continue
  const match = matches[0]
  entry.candidates = [{
    sourceId: source.id,
    sourceCommitSha: source.commitSha,
    sourceBlobSha: source.blobSha,
    sourceLocator: `TFLSJ line ${match.lineNumber}`,
    canonicalLemma: lemma,
    strongId: null,
    transliteration: null,
    morphology: null,
    briefGloss: null,
    matchKind: "tflsj-exact-lemma-fallback",
    lineSha256: `sha256:${sha256(match.raw)}`,
    rawLine: match.raw,
  }]
  entry.candidateCount = 1
  entry.fallbackSource = source.id
  resolvedCount += 1
}

const matched = (evidence.entries ?? []).filter((entry) => entry.candidateCount > 0).length
const unique = (evidence.entries ?? []).filter((entry) => entry.candidateCount === 1).length
const ambiguous = (evidence.entries ?? []).filter((entry) => entry.candidateCount > 1).length
const unmatched = (evidence.entries ?? []).length - matched
evidence.counts = { ...(evidence.counts ?? {}), matched, unique, ambiguous, unmatched, tflsjResolved: resolvedCount }
evidence.fallbackLexicalSource = {
  id: source.id,
  repository: source.repository,
  commitSha: source.commitSha,
  path: source.path,
  blobSha: source.blobSha,
  verifiedBlobSha: actualBlobSha,
  license: source.license,
}
fs.writeFileSync(evidencePath, JSON.stringify(evidence, null, 2) + "\n", "utf8")
console.log(`NT TFLSJ fallback: ${resolvedCount} entries resolved / ${unmatched} still unmatched.`)
