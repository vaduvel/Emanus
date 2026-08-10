#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const RECOVERED_DIR = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered")
const SOURCE_FIRST_DIR = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-first")

const READER_KEYS = new Set([
  "title",
  "summary",
  "literaryContext",
  "historicalContext",
  "heading",
  "teaching",
  "forYourHeart",
  "prayer",
  "meaning",
])

const FORBIDDEN = /\b(?:Zac\s+Poonen|Poonen|CFC|Christian Fellowship|SermonIndex|Allen Nolan|Nolan|Robert Breaker|Breaker|Mohler)\b/iu

const APPROVED_REPLACEMENTS = [
  {
    before: "sunt tratate de Poonen ca lucrări supranaturale reale ale Duhului",
    after: "sunt tratate în această expunere ca lucrări supranaturale reale ale Duhului",
  },
]

function fail(message) {
  console.error(`[NT reader-source sanitizer] ${message}`)
  process.exit(1)
}

function sanitize(value, key, trace, changes) {
  if (typeof value === "string") {
    if (!READER_KEYS.has(key)) return value
    let next = value
    for (const replacement of APPROVED_REPLACEMENTS) {
      const count = next.split(replacement.before).length - 1
      if (count > 0) {
        next = next.split(replacement.before).join(replacement.after)
        changes.push({ trace, before: replacement.before, after: replacement.after, count })
      }
    }
    const match = next.match(FORBIDDEN)
    if (match) fail(`${trace}: forbidden modern source name remains in reader copy: ${match[0]}`)
    return next
  }

  if (Array.isArray(value)) {
    return value.map((item, index) => sanitize(item, key, `${trace}[${index}]`, changes))
  }

  if (value && typeof value === "object") {
    const out = {}
    for (const [childKey, childValue] of Object.entries(value)) {
      out[childKey] = sanitize(childValue, childKey, `${trace}.${childKey}`, changes)
    }
    return out
  }

  return value
}

let filesChecked = 0
const changes = []
for (const dir of [RECOVERED_DIR, SOURCE_FIRST_DIR]) {
  if (!fs.existsSync(dir)) fail(`missing corpus directory ${path.relative(ROOT, dir)}`)
  for (const file of fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort()) {
    const full = path.join(dir, file)
    const before = JSON.parse(fs.readFileSync(full, "utf8"))
    const after = sanitize(before, "root", `${path.basename(dir)}/${file}`, changes)
    fs.writeFileSync(full, JSON.stringify(after, null, 2) + "\n", "utf8")
    filesChecked += 1
  }
}

const totalReplacements = changes.reduce((sum, change) => sum + change.count, 0)
if (totalReplacements !== 1) {
  fail(`expected exactly 1 approved reader-source replacement in current corpus, found ${totalReplacements}`)
}

console.log(`NT reader-source sanitizer: ${filesChecked} files checked; ${totalReplacements} approved replacement; no forbidden source names remain in reader copy.`)
