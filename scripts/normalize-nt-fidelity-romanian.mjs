#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered")

function fail(message) {
  console.error(`[NT fidelity Romanian] ${message}`)
  process.exit(1)
}

if (!fs.existsSync(corpusDir)) fail("reviewed recovered corpus missing")

const readerKeys = new Set(["title", "summary", "literaryContext", "historicalContext", "heading", "teaching", "forYourHeart", "prayer", "meaning"])
let replacements = 0
const touched = []

function visit(value, key, trace) {
  if (typeof value === "string") {
    if (!readerKeys.has(key)) return value
    const count = [...value.matchAll(/\bdoua\b/gu)].length
    if (!count) return value
    replacements += count
    touched.push({ trace, count })
    return value.replace(/\bdoua\b/gu, "două")
  }
  if (Array.isArray(value)) return value.map((item, index) => visit(item, key, `${trace}[${index}]`))
  if (value && typeof value === "object") {
    const output = {}
    for (const [childKey, childValue] of Object.entries(value)) {
      output[childKey] = visit(childValue, childKey, `${trace}.${childKey}`)
    }
    return output
  }
  return value
}

for (const file of fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()) {
  const full = path.join(corpusDir, file)
  const before = JSON.parse(fs.readFileSync(full, "utf8"))
  const after = visit(before, "root", file)
  if (JSON.stringify(before) !== JSON.stringify(after)) {
    fs.writeFileSync(full, JSON.stringify(after, null, 2) + "\n", "utf8")
  }
}

if (replacements !== 3) fail(`expected exactly 3 post-fidelity 'doua' reader-copy fixes, found ${replacements}`)
console.log(`NT fidelity Romanian normalization: ${replacements} replacements in ${touched.length} reader fields.`)
