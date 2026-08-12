#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-audited-recovered-refined")
const reportPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-subtle-editorial-refined-findings.json")

const RULES = [
  ["authority-boundary", /\b(?:niciun|nicio|nu)\b[^.!?]{0,120}\b(?:lider|conducator|slujitor|prezbiter|pastor|autoritate)\b[^.!?]{0,160}\b(?:dreptul|control|controleze|constrang|domina|manipul)/i],
  ["not-authorize", /\bnu\b[^.!?]{0,100}\b(?:autorizeaza|justifica|legitimeaza|permite)\b/i],
  ["not-mean-modern", /\bnu inseamna\b[^.!?]{0,180}\b(?:control|supunere oarba|tacere|izolare|acceptarea|tolerarea|renuntarea)/i],
  ["modern-help", /\b(?:cere ajutor|ajutor sigur|ajutor competent|specialist|consilier|terapeut|autoritatile|autoritatilor|politie|juridic|legal)\b/i],
  ["modern-boundaries", /\b(?:limite sanatoase|limite personale|granite personale|spatiu sigur|siguranta personala)\b/i],
  ["financial-control", /\b(?:controleze|controlul)\b[^.!?]{0,120}\b(?:banii|finantele|relatiile|constiinta)/i],
  ["anti-shame", /\b(?:rusinare|umilire|degradare|intimidare)\b/i],
]

function norm(text) {
  return String(text ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}
function sentences(text) {
  return String(text ?? "").split(/(?<=[.!?])\s+/u).map((s) => s.trim()).filter(Boolean)
}

if (!fs.existsSync(corpusDir)) {
  console.error("Missing nt-audited-recovered-refined")
  process.exit(1)
}
const findings = []
for (const file of fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()) {
  const book = JSON.parse(fs.readFileSync(path.join(corpusDir, file), "utf8"))
  for (const chapter of book.chapters ?? []) {
    const fields = [
      ["summary", chapter.summary], ["literaryContext", chapter.literaryContext], ["historicalContext", chapter.historicalContext], ["prayer", chapter.prayer],
      ...(chapter.units ?? []).flatMap((unit, index) => [
        [`units[${index}].heading`, unit.heading],
        [`units[${index}].teaching`, unit.teaching],
        [`units[${index}].forYourHeart`, unit.forYourHeart],
      ]),
    ]
    for (const [field, value] of fields) {
      if (typeof value !== "string") continue
      for (const sentence of sentences(value)) {
        const normalized = norm(sentence)
        for (const [rule, pattern] of RULES) {
          if (pattern.test(normalized)) findings.push({ bookId: book.id, book: book.name, chapter: chapter.number, field, rule, sentence })
        }
      }
    }
  }
}
fs.writeFileSync(reportPath, JSON.stringify({
  schema: "emanus-nt-subtle-editorial-refined-audit-v1",
  status: findings.length ? "manual-source-check-required" : "clean",
  policy: "Residual candidates after high-confidence cleanup. Verify each against Poonen/CFC or direct historical/textual context before accepting or removing it.",
  count: findings.length,
  findings,
}, null, 2) + "\n", "utf8")
console.log(`NT refined subtle editorial audit: ${findings.length} residual candidates.`)
for (const finding of findings) console.log(`${finding.bookId} ${finding.chapter} ${finding.rule}: ${finding.sentence}`)
