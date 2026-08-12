#!/usr/bin/env node
import fs from "node:fs"
const s = fs.readFileSync("apps/web/src/screens/Bible.tsx", "utf8")
const required = [
  'found.literaryContext?.trim() && <details className="bctx">',
  'found.historicalContext?.trim() && <details className="bctx">',
  'found.prayer?.trim() && <div className="bprayer">',
  'unit.words && unit.words.length > 0',
  'unit.crossRefs && unit.crossRefs.length > 0',
  'unit.forYourHeart && <div className="bheart">',
]
const missing = required.filter((needle) => !s.includes(needle))
if (missing.length) {
  console.error(`NT optional UI gate failed: ${missing.join(" | ")}`)
  process.exit(1)
}
console.log("NT optional UI gate: empty optional sections are hidden.")
