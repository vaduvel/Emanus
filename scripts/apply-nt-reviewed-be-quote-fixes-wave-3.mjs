#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first-manifest.json")
const beDir = path.join(ROOT, "docs", "data", "biblia-emanus")
const ledgerPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-embedded-quote-reviewed-fix-wave-3-ledger.json")

function fail(message) { console.error(`[NT reviewed BE quote fixes wave 3] ${message}`); process.exit(1) }
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }
function norm(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/gu, "")
    .toLowerCase()
    .replace(/[„”«»"'’.,;:!?()[\]{}—–-]/gu, " ")
    .replace(/\s+/gu, " ")
    .trim()
}
function resolveField(chapter, field) {
  const match = /^units\[(\d+)\]\.(teaching|forYourHeart)$/.exec(field)
  if (match) {
    const unit = chapter.units?.[Number(match[1])]
    if (!unit) fail(`missing ${field}`)
    return { owner: unit, key: match[2] }
  }
  if (!["title", "summary", "literaryContext", "historicalContext", "prayer"].includes(field)) fail(`unsupported field ${field}`)
  return { owner: chapter, key: field }
}
function getBook(files, bookId, canonicalBookId) {
  const file = files.find((name) => name.endsWith(`-${bookId}.json`))
  if (!file) fail(`missing book ${bookId}`)
  const full = path.join(corpusDir, file)
  const book = JSON.parse(fs.readFileSync(full, "utf8"))
  if (book.bookId !== canonicalBookId) fail(`${bookId}: canonical book mismatch`)
  return { full, book }
}
function exactFix(files, fix, ledger) {
  const { full, book } = getBook(files, fix.bookId, fix.canonicalBookId)
  const chapter = book.chapters?.find((item) => item.number === fix.chapter)
  if (!chapter) fail(`${fix.bookId} ${fix.chapter}: chapter missing`)
  const beFile = path.join(beDir, `${fix.canonicalBookId}.${fix.chapter}.json`)
  if (!fs.existsSync(beFile)) fail(`missing BE ${fix.canonicalBookId}.${fix.chapter}`)
  const be = JSON.parse(fs.readFileSync(beFile, "utf8"))
  const beText = norm((be.verses ?? []).map((verse) => verse.text).join(" "))
  if (!beText.includes(norm(fix.after))) fail(`${fix.bookId} ${fix.chapter} ${fix.field}: exact replacement absent from current BE: ${fix.after}`)
  const { owner, key } = resolveField(chapter, fix.field)
  const value = owner[key]
  const occurrences = typeof value === "string" ? value.split(fix.before).length - 1 : 0
  if (occurrences !== 1) fail(`${fix.bookId} ${fix.chapter} ${fix.field}: expected one exact-fix target, found ${occurrences}`)
  owner[key] = value.replace(fix.before, fix.after)
  fs.writeFileSync(full, stable(book), "utf8")
  ledger.push({ ...fix, action: "exact-be-rewrite", beforeSha256: `sha256:${sha256(fix.before)}`, afterSha256: `sha256:${sha256(fix.after)}` })
}
function unquote(files, item, ledger) {
  const { full, book } = getBook(files, item.bookId, item.canonicalBookId)
  const chapter = book.chapters?.find((entry) => entry.number === item.chapter)
  if (!chapter) fail(`${item.bookId} ${item.chapter}: chapter missing`)
  const { owner, key } = resolveField(chapter, item.field)
  const value = owner[key]
  if (typeof value !== "string") fail(`${item.bookId} ${item.chapter} ${item.field}: target not string`)
  const forms = [`„${item.quote}”`, `«${item.quote}»`, `"${item.quote}"`]
  let found = 0
  let next = value
  for (const form of forms) {
    const count = next.split(form).length - 1
    if (count) {
      next = next.split(form).join(item.quote)
      found += count
    }
  }
  if (found !== 1) fail(`${item.bookId} ${item.chapter} ${item.field}: expected exactly one quoted paraphrase wrapper for '${item.quote}', found ${found}`)
  owner[key] = next
  fs.writeFileSync(full, stable(book), "utf8")
  ledger.push({ ...item, action: "remove-quotation-marks-from-paraphrase", quoteSha256: `sha256:${sha256(item.quote)}` })
}

const EXACT_FIXES = [
  { bookId: "marcu", canonicalBookId: "MRK", chapter: 4, field: "units[7].teaching", before: "de ce vă este frică?", after: "De ce sunteți fricoși?" },
  { bookId: "marcu", canonicalBookId: "MRK", chapter: 10, field: "units[1].teaching", before: "vinde tot, dă săracilor și urmează-Mă", after: "du-te, vinde tot ce ai și dă săracilor, iar tu vei avea o comoară în cer; apoi vino și urmează-Mă!" },
  { bookId: "marcu", canonicalBookId: "MRK", chapter: 13, field: "units[2].teaching", before: "Generația aceasta nu va trece...", after: "generația aceasta nicidecum nu va trece" },
  { bookId: "marcu", canonicalBookId: "MRK", chapter: 16, field: "units[2].teaching", before: "Cine crede și este botezat...", after: "Cel care crede și este botezat" },
  { bookId: "luca", canonicalBookId: "LUK", chapter: 1, field: "units[2].forYourHeart", before: "Sunt al Domnului; fie-mi după cuvântul Tău", after: "Iată roaba Domnului; să-mi fie după cuvântul tău" },
  { bookId: "luca", canonicalBookId: "LUK", chapter: 9, field: "units[2].teaching", before: "Acesta este Fiul Meu ales; de El să ascultați", after: "Acesta este Fiul Meu preaiubit. Ascultați-L!" },
  { bookId: "luca", canonicalBookId: "LUK", chapter: 17, field: "units[3].teaching", before: "Unul va fi luat și altul lăsat", after: "unul va fi luat și celălalt va rămâne" },
  { bookId: "luca", canonicalBookId: "LUK", chapter: 23, field: "units[1].teaching", before: "astăzi vei fi cu Mine în rai", after: "astăzi vei fi cu Mine în Paradis" },
  { bookId: "fapte", canonicalBookId: "ACT", chapter: 24, field: "units[2].teaching", before: "Acum pleacă; te voi chema când voi avea timp.", after: "Deocamdată du-te; când voi găsi un prilej, te voi chema." },
  { bookId: "1-corinteni", canonicalBookId: "1CO", chapter: 12, field: "units[1].teaching", before: "nu am nevoie de tine", after: "N-am nevoie de tine" },
  { bookId: "1-corinteni", canonicalBookId: "1CO", chapter: 14, field: "units[2].teaching", before: "Duhurile prorocilor sunt supuse prorocilor", after: "duhurile profeților sunt supuse profeților" },
  { bookId: "1-corinteni", canonicalBookId: "1CO", chapter: 16, field: "units[2].teaching", before: "Vegheați, stați tari, fiți curajoși", after: "Vegheați, stați tari în credință, purtați-vă bărbătește, fiți tari" },
  { bookId: "filipeni", canonicalBookId: "PHP", chapter: 2, field: "units[2].teaching", before: "Duceți până la capăt mântuirea", after: "duceți până la capăt propria voastră mântuire" },
  { bookId: "coloseni", canonicalBookId: "COL", chapter: 2, field: "units[4].teaching", before: "nu lua, nu gusta, nu atinge", after: "Nu atinge, nu gusta, nu pipăi" },
  { bookId: "tit", canonicalBookId: "TIT", chapter: 1, field: "units[2].teaching", before: "ca să fie sănătoși în credință", after: "pentru ca ei să fie sănătoși în credință" },
  { bookId: "filimon", canonicalBookId: "PHM", chapter: 1, field: "units[3].teaching", before: "Primește-l ca pe mine însumi", after: "primește-l așa cum m-ai primi pe mine" },
  { bookId: "1-ioan", canonicalBookId: "1JN", chapter: 1, field: "units[1].teaching", before: "dacă zicem că nu avem păcat, ne înșelăm", after: "Dacă spunem că nu avem păcat, ne amăgim pe noi înșine" }
]

const UNQUOTES = [
  { bookId: "matei", canonicalBookId: "MAT", chapter: 5, field: "literaryContext", quote: "ați auzit... dar Eu vă spun" },
  { bookId: "matei", canonicalBookId: "MAT", chapter: 11, field: "units[0].teaching", quote: "Ferice de acela pentru care Eu nu voi fi un prilej de poticnire" },
  { bookId: "matei", canonicalBookId: "MAT", chapter: 14, field: "units[2].teaching", quote: "Eu sunt; nu vă temeți" },
  { bookId: "matei", canonicalBookId: "MAT", chapter: 16, field: "historicalContext", quote: "a lega și a dezlega" },
  { bookId: "matei", canonicalBookId: "MAT", chapter: 26, field: "units[0].teaching", quote: "Pe săraci îi aveți totdeauna" },
  { bookId: "matei", canonicalBookId: "MAT", chapter: 26, field: "units[2].teaching", quote: "Duhul este plin de râvnă, dar carnea este neputincioasă" },
  { bookId: "marcu", canonicalBookId: "MRK", chapter: 9, field: "units[3].teaching", quote: "nu ne urma pe noi" },
  { bookId: "marcu", canonicalBookId: "MRK", chapter: 10, field: "units[0].teaching", quote: "A lăsa pe tată și pe mamă" },
  { bookId: "marcu", canonicalBookId: "MRK", chapter: 12, field: "units[1].teaching", quote: "nu mai este al lui" },
  { bookId: "marcu", canonicalBookId: "MRK", chapter: 12, field: "units[1].teaching", quote: "Dați lui Dumnezeu ce este al lui Dumnezeu" },
  { bookId: "marcu", canonicalBookId: "MRK", chapter: 14, field: "units[2].teaching", quote: "nu ce voiesc Eu, ci ce voiești Tu" },
  { bookId: "marcu", canonicalBookId: "MRK", chapter: 14, field: "units[2].teaching", quote: "Vegheați și rugați-vă ca să nu intrați în ispită." },
  { bookId: "luca", canonicalBookId: "LUK", chapter: 3, field: "units[2].forYourHeart", quote: "El trebuie să crească, iar eu să mă micșorez" },
  { bookId: "luca", canonicalBookId: "LUK", chapter: 7, field: "units[3].teaching", quote: "sunt cel mai mare păcătos" },
  { bookId: "luca", canonicalBookId: "LUK", chapter: 8, field: "units[4].teaching", quote: "Nu mai supăra pe Învățătorul" },
  { bookId: "luca", canonicalBookId: "LUK", chapter: 9, field: "units[0].teaching", quote: "Dați-le voi să mănânce" },
  { bookId: "fapte", canonicalBookId: "ACT", chapter: 18, field: "units[0].teaching", quote: "Nu te teme... Eu sunt cu tine" },
  { bookId: "1-corinteni", canonicalBookId: "1CO", chapter: 11, field: "literaryContext", quote: "totul pentru slava lui Dumnezeu" },
  { bookId: "filipeni", canonicalBookId: "PHP", chapter: 1, field: "units[3].forYourHeart", quote: "Pentru mine, a trăi este…" }
]

if (!fs.existsSync(corpusDir) || !fs.existsSync(manifestPath)) fail("final corpus/manifest missing")
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
const files = fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()
const ledger = []

for (const fix of EXACT_FIXES) exactFix(files, fix, ledger)
for (const item of UNQUOTES) unquote(files, item, ledger)

for (const entry of manifest.books ?? []) {
  const file = files.find((name) => name.endsWith(`-${entry.id}.json`))
  if (!file) fail(`manifest book missing ${entry.id}`)
  const raw = fs.readFileSync(path.join(corpusDir, file), "utf8")
  entry.sha256 = sha256(raw)
  const parsed = JSON.parse(raw)
  entry.units = (parsed.chapters ?? []).reduce((sum, chapter) => sum + (chapter.units?.length ?? 0), 0)
}
fs.writeFileSync(manifestPath, stable(manifest), "utf8")
fs.writeFileSync(ledgerPath, stable({
  schema: "emanus-nt-embedded-quote-reviewed-fix-wave-3-ledger-v1",
  policy: "Exact reader quotations are aligned only to exact wording present in the current provisional Biblia Emanus chapter. Where the provisional Bible wording is corrupted or the explanation intentionally paraphrases a biblical idea, quotation marks are removed without changing the explanatory claim; these locations must be reconsidered when the final canonical text is frozen.",
  count: ledger.length,
  changes: ledger,
}), "utf8")
console.log(`NT reviewed BE quote fixes wave 3: ${ledger.length}/${EXACT_FIXES.length + UNQUOTES.length}.`)
