#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered-manifest.json")
const ledgerPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-thin-unit-expansion-ledger.json")

function fail(message) { console.error(`[NT thin-unit expansion] ${message}`); process.exit(1) }
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }
function wordCount(value) { return String(value ?? "").trim().split(/\s+/u).filter(Boolean).length }

// These are deliberately small, passage-bound expansions for the units that
// still fail the editorial-sufficiency audit after reader-facing context is
// counted. They are NOT generic filler and are NOT represented as quotations
// from the sermon source. Each addition states an observation explicit in the
// unit's own verse range.
const PATCHES = new Map([
  ["fapte-4-23-31", {
    ref: "Fapte 4:23-31",
    appendTeaching: "Răspunsul lor este comunitar: se ridică împreună spre Dumnezeu, iar cererea centrală privește mărturia despre Isus, nu protejarea confortului lor.",
    basis: "Fapte 4:24-31 — rugăciune comună pentru îndrăzneală și mărturie",
  }],
  ["fapte-5-12-16", {
    ref: "Fapte 5:12-16",
    appendTeaching: "Pasajul leagă minunile de creșterea numărului celor care cred în Domnul; semnul nu este scopul final, ci slujește mărturiei.",
    basis: "Fapte 5:12-16 — semnele și adăugarea credincioșilor la Domnul",
  }],
  ["romani-12-14-21", {
    ref: "Romani 12:14-21",
    appendTeaching: "Pavel merge până la binele concret făcut vrăjmașului flămând sau însetat; biruința creștină nu copiază răul pe care îl condamnă.",
    basis: "Romani 12:19-21 — bine făcut vrăjmașului și biruirea răului prin bine",
  }],
  ["1-corinteni-4-14-21", {
    ref: "1 Corinteni 4:14-21",
    appendTeaching: "De aceea îi poate chema să-i urmeze exemplul și îl trimite pe Timotei să le amintească felul său de viață în Hristos.",
    basis: "1 Corinteni 4:16-17 — imitarea exemplului și trimiterea lui Timotei",
  }],
  ["1-corinteni-7-1-9", {
    ref: "1 Corinteni 7:1-9",
    appendTeaching: "Pavel leagă înfrânarea temporară de acord reciproc, rugăciune și revenirea împreună, tocmai pentru a nu transforma spiritualitatea într-un pretext pentru neglijarea celuilalt.",
    basis: "1 Corinteni 7:5 — acord reciproc, timp limitat și revenire împreună",
  }],
  ["1-corinteni-13-4-7", {
    ref: "1 Corinteni 13:4-7",
    appendTeaching: "În loc să se hrănească din nedreptate, dragostea se bucură împreună cu adevărul și continuă să poarte, să creadă, să spere și să rabde.",
    basis: "1 Corinteni 13:6-7 — adevăr, purtare, credință, speranță și răbdare",
  }],
  ["1-corinteni-16-1-4", {
    ref: "1 Corinteni 16:1-4",
    appendTeaching: "Colecta are astfel atât ritm personal, cât și răspundere comunitară: darul este pregătit din timp și încredințat unor oameni aprobați.",
    basis: "1 Corinteni 16:2-4 — punere deoparte și delegați aprobați",
  }],
  ["2-corinteni-1-23-24", {
    ref: "2 Corinteni 1:23-24",
    appendTeaching: "Pavel precizează că nu stăpânește peste credința lor; slujitorii lucrează împreună pentru bucuria lor, iar ei stau prin credință.",
    basis: "2 Corinteni 1:24 — nu stăpânire peste credință, ci împreună-lucrare pentru bucurie",
  }],
  ["2-corinteni-2-5-11", {
    ref: "2 Corinteni 2:5-11",
    appendTeaching: "Scopul corectării este câștigarea și întărirea celui pocăit. Când iertarea este refuzată după pocăință, întristarea poate deveni o nouă capcană pe care Pavel o leagă de planurile Satanei.",
    basis: "2 Corinteni 2:7-11 — iertare, mângâiere, confirmarea dragostei și planurile Satanei",
  }],
  ["2-corinteni-6-14-18", {
    ref: "2 Corinteni 6:14-18",
    appendTeaching: "Întrebările lui Pavel pun în contrast dreptatea cu fărădelegea, lumina cu întunericul și templul lui Dumnezeu cu idolii. Centrul pasajului este loialitatea față de Dumnezeu.",
    basis: "2 Corinteni 6:14-18 — contrastele textului și identitatea templului lui Dumnezeu",
  }],
  ["2-corinteni-11-16-21", {
    ref: "2 Corinteni 11:16-21",
    appendTeaching: "Ironia lui Pavel scoate la lumină contrastul: ei suportau dominația agresivă, în timp ce îl considerau slab pe apostolul care refuza să-i trateze astfel.",
    basis: "2 Corinteni 11:19-21 — tolerarea celor dominatori și ironia despre slăbiciunea lui Pavel",
  }],
  ["efeseni-6-1-4", {
    ref: "Efeseni 6:1-4",
    appendTeaching: "Chemarea copiilor la ascultare este pusă lângă porunca adresată direct taților: să nu-și întărâte copiii. Textul limitează astfel autoritatea chiar în momentul în care o afirmă.",
    basis: "Efeseni 6:1-4 — ascultarea copiilor și interdicția de a-i întărâta",
  }],
  ["filipeni-2-1-4", {
    ref: "Filipeni 2:1-4",
    appendTeaching: "Unitatea descrisă aici nu șterge persoanele, ci mută centrul de greutate de la interesul propriu la grija concretă pentru ceilalți.",
    basis: "Filipeni 2:3-4 — smerenie și privirea la interesele celorlalți",
  }],
  ["filipeni-2-19-24", {
    ref: "Filipeni 2:19-24",
    appendTeaching: "Pavel îl numește încercat: grija lui nu este o impresie de moment, ci un caracter dovedit prin slujirea împreună pentru Evanghelie.",
    basis: "Filipeni 2:20-22 — grijă sinceră și caracter încercat în slujirea Evangheliei",
  }],
])

if (!fs.existsSync(dir) || !fs.existsSync(manifestPath)) fail("reviewed recovered corpus/manifest missing")
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
const ledger = []
const seen = new Set()
const manifestBooks = []
let books = 0
let chapters = 0
let units = 0

for (const file of fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort()) {
  const full = path.join(dir, file)
  const book = JSON.parse(fs.readFileSync(full, "utf8"))
  for (const chapter of book.chapters ?? []) {
    chapters += 1
    for (const unit of chapter.units ?? []) {
      units += 1
      const patch = PATCHES.get(unit.id)
      if (!patch) continue
      if (seen.has(unit.id)) fail(`duplicate target unit ${unit.id}`)
      seen.add(unit.id)
      if (unit.ref !== patch.ref) fail(`${unit.id}: ref drift ${unit.ref} != ${patch.ref}`)
      if (typeof unit.teaching !== "string" || !unit.teaching.trim()) fail(`${unit.id}: teaching missing`)
      if (unit.teaching.includes(patch.appendTeaching)) continue
      const beforeWords = wordCount(unit.teaching)
      unit.teaching = `${unit.teaching.trim()}\n\n${patch.appendTeaching}`
      const afterWords = wordCount(unit.teaching)
      ledger.push({
        bookId: book.id,
        chapter: chapter.number,
        unitId: unit.id,
        ref: unit.ref,
        basis: patch.basis,
        beforeTeachingWords: beforeWords,
        afterTeachingWords: afterWords,
        addition: patch.appendTeaching,
        policy: "direct-passage-editorial-sufficiency",
      })
    }
  }
  const rendered = stable(book)
  fs.writeFileSync(full, rendered, "utf8")
  books += 1
  manifestBooks.push({
    id: book.id,
    bookId: book.bookId,
    name: book.name,
    chapters: book.chapters.length,
    units: book.chapters.reduce((sum, chapter) => sum + (chapter.units?.length ?? 0), 0),
    sha256: sha256(rendered),
  })
}

for (const id of PATCHES.keys()) if (!seen.has(id)) fail(`target unit not found: ${id}`)
if (books !== manifest.counts?.books || chapters !== manifest.counts?.chapters || units !== manifest.counts?.units) fail(`manifest totals changed unexpectedly: ${books}/${chapters}/${units}`)
manifest.books = manifestBooks
manifest.counts = { ...manifest.counts, passageBoundThinUnitExpansions: ledger.length }
fs.writeFileSync(manifestPath, stable(manifest), "utf8")
fs.writeFileSync(ledgerPath, stable({
  schema: "emanus-nt-thin-unit-expansion-ledger-v1",
  policy: "Only the 14 units that failed the editorial-sufficiency audit are expanded. Additions are explicit observations from the unit's own verse range, are not represented as sermon quotations, and generic word-count filler is forbidden.",
  targetCount: PATCHES.size,
  appliedCount: ledger.length,
  expansions: ledger,
}), "utf8")
console.log(`NT thin-unit passage-bound expansions: ${ledger.length}/${PATCHES.size}.`)
