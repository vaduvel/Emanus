#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dataDir = path.join(ROOT, "docs", "data", "biblia-explicata")
const unmatchedPath = path.join(dataDir, "nt-lexicon-source-evidence-unmatched.json")
const sourcesPath = path.join(dataDir, "nt-lexicon-review-sources.json")
const outputPath = path.join(dataDir, "nt-tflsj-unmatched-inspection.json")

function fail(message) {
  console.error(`[NT TFLSJ inspection] ${message}`)
  process.exit(1)
}
function gitBlobSha(buffer) {
  const header = Buffer.from(`blob ${buffer.length}\0`, "utf8")
  return crypto.createHash("sha1").update(header).update(buffer).digest("hex")
}
function normalizeGreek(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/gu, "")
    .toLowerCase()
    .replace(/ς/gu, "σ")
    .replace(/[^\p{Script=Greek}]+/gu, "")
}
function greekTokens(value) {
  return [...String(value ?? "").matchAll(/[\p{Script=Greek}\u0300-\u036f]+/gu)]
    .map((match) => normalizeGreek(match[0]))
    .filter(Boolean)
}
function rawGithubUrl(source) {
  const encodedPath = source.path.split("/").map(encodeURIComponent).join("/")
  return `https://raw.githubusercontent.com/${source.repository}/${source.commitSha}/${encodedPath}`
}
function targetLemmas(entry) {
  const problem = String(entry.morphgntProblem ?? "")
  const resolved = problem.match(/^resolved-lemma-not-in-tbesg:(.+)$/u)
  if (resolved) return [normalizeGreek(resolved[1])]
  const multiple = problem.match(/^surface-has-\d+-lemmas:(.+)$/u)
  if (multiple) return [normalizeGreek(multiple[1])]
  const originalTokens = greekTokens(entry.original)
  const normalized = normalizeGreek(entry.normalizedLemma)
  return [...new Set([normalized, ...originalTokens].filter(Boolean))]
}

if (!fs.existsSync(unmatchedPath) || !fs.existsSync(sourcesPath)) fail("unmatched evidence/source registry missing")
const unmatched = JSON.parse(fs.readFileSync(unmatchedPath, "utf8"))
const sources = JSON.parse(fs.readFileSync(sourcesPath, "utf8"))
const source = (sources.sources ?? []).find((entry) => entry.id === "stepbible-tflsj")
if (!source?.repository || !source?.commitSha || !source?.path || !source?.blobSha) fail("pinned TFLSJ source missing")

const response = await fetch(rawGithubUrl(source), { redirect: "follow" })
if (!response.ok) fail(`failed to fetch TFLSJ: HTTP ${response.status}`)
const buffer = Buffer.from(await response.arrayBuffer())
const actualBlobSha = gitBlobSha(buffer)
if (actualBlobSha !== source.blobSha) fail(`TFLSJ blob mismatch: ${actualBlobSha} != ${source.blobSha}`)
const lines = buffer.toString("utf8").split(/\r?\n/u)

const entries = []
for (const entry of unmatched.entries ?? []) {
  const targets = targetLemmas(entry)
  const matches = []
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    if (!line.trim()) continue
    const tokens = new Set(greekTokens(line))
    if (!targets.some((target) => tokens.has(target))) continue
    matches.push({
      lineNumber: index + 1,
      raw: line.length > 1600 ? `${line.slice(0, 1600)}…` : line,
    })
    if (matches.length >= 8) break
  }
  entries.push({
    reviewId: entry.reviewId,
    bookId: entry.bookId,
    chapter: entry.chapter,
    ref: entry.ref,
    original: entry.original,
    meaning: entry.meaning,
    morphgntProblem: entry.morphgntProblem ?? null,
    targets,
    matchCountSampled: matches.length,
    matches,
  })
}

fs.writeFileSync(outputPath, JSON.stringify({
  schema: "emanus-nt-tflsj-unmatched-inspection-v1",
  source: {
    id: source.id,
    repository: source.repository,
    commitSha: source.commitSha,
    path: source.path,
    blobSha: source.blobSha,
    verifiedBlobSha: actualBlobSha,
  },
  count: entries.length,
  entries,
}, null, 2) + "\n", "utf8")
console.log(`NT TFLSJ inspection: ${entries.length} unmatched entries inspected against verified blob ${actualBlobSha}.`)
