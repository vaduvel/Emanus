#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const BOOK = path.join(ROOT, "docs/data/biblia-explicata/nt-final-source-first/21-1-petru.json")
const SPEC = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-review-spec/21-1-petru.json")
const ARTIFACT = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-review-manual/21-1-petru.json")
const LEDGER = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-review-ledger.json")
const UNIT_ID = "1-petru-4-1-6-source-first"
const OLD = "Ucenicul se înarmează cu aceeași hotărâre: «mai bine sufăr decât să păcătuiesc»."
const NEW = "Ucenicul se înarmează cu aceeași hotărâre și alege cu toată inima că este mai bine să sufere decât să păcătuiască."

const fail = (message) => { console.error(`[1 Petru quote normalization] ${message}`); process.exit(1) }
const sha = (value) => `sha256:${crypto.createHash("sha256").update(String(value)).digest("hex")}`
const snap = (unit, teaching, forYourHeart = unit.forYourHeart) => JSON.stringify({
  heading: String(unit.heading ?? ""),
  teaching: String(teaching ?? ""),
  forYourHeart: String(forYourHeart ?? ""),
})
const sortDecisions = (items) => [...items].sort((a, b) =>
  String(a.bookId).localeCompare(String(b.bookId)) || Number(a.chapter) - Number(b.chapter) || String(a.unitId).localeCompare(String(b.unitId)),
)

for (const p of [BOOK, SPEC, ARTIFACT, LEDGER]) if (!fs.existsSync(p)) fail(`missing ${path.relative(ROOT,p)}`)
const book = JSON.parse(fs.readFileSync(BOOK,"utf8"))
const spec = JSON.parse(fs.readFileSync(SPEC,"utf8"))
const artifact = JSON.parse(fs.readFileSync(ARTIFACT,"utf8"))
const ledger = JSON.parse(fs.readFileSync(LEDGER,"utf8"))

const specUnit = spec[UNIT_ID]
if (!specUnit || specUnit.action !== "rewrite" || typeof specUnit.revisedTeaching !== "string") fail("target review spec missing")
if (specUnit.revisedTeaching.includes(OLD)) {
  specUnit.revisedTeaching = specUnit.revisedTeaching.replace(OLD, NEW)
  fs.writeFileSync(SPEC, JSON.stringify(spec,null,2)+"\n","utf8")
} else if (!specUnit.revisedTeaching.includes(NEW)) {
  fail("target review wording drifted before normalization")
}

const located = (book.chapters ?? []).flatMap(ch => (ch.units ?? []).map(unit => ({chapter:ch.number,unit}))).find(x => x.unit.id === UNIT_ID)
if (!located) fail("target corpus unit missing")
const decision = (artifact.decisions ?? []).find(d => d.unitId === UNIT_ID)
if (!decision || decision.action !== "rewrite") fail("target artifact decision missing")
if (decision.revisedTeaching.includes(OLD)) decision.revisedTeaching = decision.revisedTeaching.replace(OLD, NEW)
else if (!decision.revisedTeaching.includes(NEW)) fail("target artifact wording drifted before normalization")
decision.reviewedTeachingSha256 = sha(snap(located.unit, decision.revisedTeaching, decision.revisedForYourHeart ?? located.unit.forYourHeart))
fs.writeFileSync(ARTIFACT, JSON.stringify(artifact,null,2)+"\n","utf8")

const target = sortDecisions(artifact.decisions ?? [])
if (target.length !== 15 || target.filter(d=>d.action==="rewrite").length !== 8 || target.filter(d=>d.action==="keep").length !== 7) {
  fail("final 1 Petru artifact count drifted")
}
const existing = sortDecisions((ledger.decisions ?? []).filter(d => d.bookId === "1-petru"))
if (JSON.stringify(existing) === JSON.stringify(target)) {
  console.log("1 Petru ledger already matches quote-normalized artifact.")
  process.exit(0)
}
if (existing.length) {
  if (existing.length !== 15 || existing.filter(d=>d.action==="rewrite").length !== 8 || existing.filter(d=>d.action==="keep").length !== 7) {
    fail(`unexpected existing 1 Petru ledger shape: ${existing.length}`)
  }
  const oldDecision = existing.find(d => d.unitId === UNIT_ID)
  if (!oldDecision?.revisedTeaching?.includes("«mai bine sufăr decât să păcătuiesc»")) {
    fail("existing 1 Petru ledger does not match the exact superseded quote signature")
  }
  ledger.decisions = ledger.decisions.filter(d => d.bookId !== "1-petru")
  ledger.count = ledger.decisions.length
  fs.writeFileSync(LEDGER, JSON.stringify(ledger,null,2)+"\n","utf8")
  console.log("Removed 15 superseded 1 Petru decisions after exact quote-signature verification; merge will install normalized artifact.")
} else {
  console.log("No existing 1 Petru ledger decisions; normalized artifact ready for first merge.")
}
