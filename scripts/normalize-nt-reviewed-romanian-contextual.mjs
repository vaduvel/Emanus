#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered-manifest.json")
const ledgerPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-romanian-contextual-fix-ledger.json")

function fail(message) { console.error(`[NT Romanian contextual] ${message}`); process.exit(1) }
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }

const RULES = [
  // Verbs: infinitive after "a"; otherwise these reviewed occurrences are present/imperative forms.
  [/\ba arata\b/giu, "a arăta", "infinitive-arata"],
  [/\bArata\b/gu, "Arată", "present-arata"],
  [/\barata\b/gu, "arată", "present-arata"],
  [/\ba lasa\b/giu, "a lăsa", "infinitive-lasa"],
  [/\bLasa\b/gu, "Lasă", "present-lasa"],
  [/\blasa\b/gu, "lasă", "present-lasa"],

  // Nouns whose current reviewed occurrences are definite/specific.
  [/\bLegatura\b/gu, "Legătura", "definite-legatura"],
  [/\blegatura\b/gu, "legătura", "definite-legatura"],
  [/\bbiruinta\b/giu, "biruința", "definite-biruinta"],
  [/\bcu usurinta\b/giu, "cu ușurință", "idiom-cu-usurinta"],

  // curata: explicit verbal contexts first, then the remaining reviewed occurrences are adjectival.
  [/\bcurata(?=\s+și\s+arată\b)/giu, "curăță", "verb-curata"],
  [/\bcurata(?=\s+(?:casa|templul|păcatul|pacatul)\b)/giu, "curăță", "verb-curata"],
  [/\bcurata\b/giu, "curată", "adjective-curata"],

  // simpla can be a correct definite pre-nominal form ("simpla citare").
  // Change only contexts that prove the post-nominal/indefinite adjective `simplă`.
  [/\bo simpla\b/giu, "o simplă", "indefinite-simpla"],
  [/\bmai simpla\b/giu, "mai simplă", "comparative-simpla"],
  [/\b(chemare|lumea) simpla\b/giu, "$1 simplă", "postnominal-simpla"],
  [/\bschema simpla\b/giu, "schemă simplă", "postnominal-schema-simpla"],
  [/\bcauza simpla\b/giu, "cauză simplă", "postnominal-cauza-simpla"],
  [/\bordine simpla\b/giu, "ordine simplă", "postnominal-ordine-simpla"],

  // adevărata/adevărată: preserve definite pre-nominal uses and explicitly
  // normalize the reviewed post-nominal uses from the current corpus.
  [/\badevarata\s+intalnire\b/giu, "adevărata întâlnire", "prenominal-adevarata"],
  [/\badevarata\s+ei\b/giu, "adevărata ei", "prenominal-adevarata"],
  [/\badevarata\s+(slobozire|vedere|marime)\b/giu, "adevărata $1", "prenominal-adevarata-reviewed"],
  [/\b(Lumina|lumina|ramanere|rămânere|omenitatea|ucenicia|zdrobirea|Credinta|credinta|Inchinarea|închinarea) adevarata\b/gu, "$1 adevărată", "postnominal-adevarata"],
  [/\b(foamea|hrana|ucenicie|Dragostea|Smerenia|Ravna) adevarata\b/gu, "$1 adevărată", "postnominal-adevarata-reviewed"],
  [/\bsetea noastra adevarata\b/giu, "setea noastră adevărată", "possessive-adevarata-reviewed"],
  [/\bcea mai adevarata vorba\b/giu, "cea mai adevărată vorbă", "superlative-adevarata-reviewed"],
  [/\bunitatea ei adevarata\b/giu, "unitatea ei adevărată", "possessive-adevarata-reviewed"],

  // viață/viața: grammar is explicit from each reviewed local construction.
  [/\bo viata\b/giu, "o viață", "indefinite-viata"],
  [/\bdin viata\b/giu, "din viața", "definite-viata"],
  [/\bviata ta\b/giu, "viața ta", "definite-viata"],
  [/\bviata aceasta\b/giu, "viața aceasta", "definite-viata"],
  [/\bviata și lumina\b/giu, "viața și lumina", "definite-viata"],
  [/\bCuvântul, viata, lumina\b/gu, "Cuvântul, viața, lumina", "coordinate-definite-viata"],
  [/\bÎn El era viata\b/gu, "În El era viața", "definite-viata"],
  [/\bviata deplina\b/giu, "viață deplină", "lexical-indefinite-viata"],
  [/\bviata dinlauntru\b/giu, "viață dinlăuntru", "indefinite-viata"],
  [/\bautoritatea, viata și judecata\b/giu, "autoritatea, viața și judecata", "coordinate-definite-viata"],
  [/\ba da viata\b/giu, "a da viață", "infinitive-indefinite-viata"],
  [/\bDa-ne viata\b/gu, "Dă-ne viață", "imperative-indefinite-viata"],
  [/\bda viata\b/giu, "dă viață", "present-indefinite-viata"],
  [/\bmasori viata\b/giu, "măsori viața", "object-definite-viata"],
  [/\bviata în Sine\b/giu, "viață în Sine", "lexical-indefinite-viata"],
  [/\bViata neimprumutata\b/gu, "Viață neîmprumutată", "lexical-indefinite-viata"],
  [/\bpentru viata vesnica\b/giu, "pentru viața veșnică", "definite-eternal-life"],
  [/\bpentru viata\b/giu, "pentru viață", "indefinite-viata"],
  [/\bviata nu este\b/giu, "viața nu este", "subject-definite-viata"],
  [/\bizvor de viata\b/giu, "izvor de viață", "genitive-indefinite-viata"],
  [/\bviata care curge\b/giu, "viața care curge", "relative-definite-viata"],
  [/\bdupa viata lui Dumnezeu\b/giu, "după viața lui Dumnezeu", "genitive-definite-viata"],
  [/\bși viata pentru om\b/giu, "și viață pentru om", "coordinate-indefinite-viata"],
  [/\beste viata\b/giu, "este viața", "predicate-definite-viata"],
  [/\bîn viata noastra\b/giu, "în viața noastră", "possessive-definite-viata"],
  [/\bviata data cu belsug\b/giu, "viața dată cu belșug", "participle-definite-viata"],
  [/\bÎnvierea și Viata\b/gu, "Învierea și Viața", "title-definite-viata"],
  [/\bînvierea și viata\b/giu, "învierea și viața", "coordinate-definite-viata"],
  [/\bse castige viata\b/giu, "se câștige viața", "object-definite-viata"],
  [/^viata vesnica\./giu, "viață veșnică.", "lexical-eternal-life"],
  [/\bViata data acum\b/gu, "Viață dată acum", "lexical-indefinite-viata"],
  [/\bare viata(?=\s+veșnică\b)/giu, "are viață", "indefinite-eternal-life"],
  [/\bviata(?=\s+veșnică\b)/giu, "viață", "indefinite-eternal-life"],
  [/\baduce viata\b/giu, "aduce viață", "indefinite-viata"],
  [/\bcautam viata\b/giu, "căutăm viața", "definite-viata"],
  [/^viata\./giu, "viață.", "lexical-viata"],

  // credință/credința: article status is explicit from the reviewed construction.
  [/\bo credinta\b/giu, "o credință", "indefinite-credinta"],
  [/\bla credinta\b/giu, "la credință", "indefinite-credinta"],
  [/\bniciun fel de credinta\b/giu, "niciun fel de credință", "indefinite-credinta-reviewed"],
  [/\bcredinta trezita\b/giu, "credința trezită", "definite-credinta-reviewed"],
  [/\bcredinta oamenilor\b/giu, "credința oamenilor", "definite-credinta-reviewed"],
  [/\bda-ne credinta slujbasului imparatesc\b/giu, "dă-ne credința slujbașului împărătesc", "definite-credinta-reviewed"],
  [/\bse coace credinta\b/giu, "se coace credința", "subject-definite-credinta-reviewed"],
  [/\bcredinta ta\b/giu, "credința ta", "possessive-definite-credinta-reviewed"],
  [/\bcere credinta\b/giu, "cere credință", "indefinite-credinta-reviewed"],
  [/\bprin credinta\b/giu, "prin credință", "prepositional-indefinite-credinta-reviewed"],
  [/\bcu credinta\b/giu, "cu credință", "prepositional-indefinite-credinta-reviewed"],
  [/\bCredinta matura\b/gu, "Credința matură", "subject-definite-credinta-reviewed"],
  [/\bintre credinta și impotrivire\b/giu, "între credință și împotrivire", "contrast-indefinite-credinta-reviewed"],
  [/\bcredinta Martei\b/giu, "credința Martei", "genitive-definite-credinta-reviewed"],
  [/\bcredinta celor\b/giu, "credința celor", "genitive-definite-credinta-reviewed"],
  [/\blipsa de credinta\b/giu, "lipsă de credință", "genitive-indefinite-credinta-reviewed"],
  [/\bCredinta în Hristos\b/gu, "Credința în Hristos", "subject-definite-credinta-reviewed"],
  [/\bCredinta ta\b/gu, "Credința ta", "possessive-definite-credinta-reviewed"],
  [/\bprin privire și credinta\b/giu, "prin privire și credință", "indefinite-credinta"],
  [/\bCredinta(?=\s+(?:nu|adev|care)\b)/gu, "Credința", "definite-credinta"],
  [/\bcredinta(?=\s+(?:nu|lor|adev|care)\b)/gu, "credința", "definite-credinta"],
  [/\bpentru credinta lor\b/giu, "pentru credința lor", "definite-credinta"],
]

const ledger = []
function normalize(value, location) {
  if (typeof value !== "string" || !value) return value
  let out = value
  for (const [pattern, replacement, rule] of RULES) {
    out = out.replace(pattern, (...args) => {
      const match = args[0]
      let after
      if (typeof replacement === "string" && replacement.includes("$1")) {
        after = replacement.replace("$1", args[1] ?? "")
      } else {
        after = replacement
      }
      if (after !== match) ledger.push({ location, rule, before: match, after })
      return after
    })
  }
  return out
}
function normalizeChapter(bookId, chapter) {
  const prefix = `${bookId}.${chapter.number}`
  for (const key of ["title", "summary", "literaryContext", "historicalContext", "prayer"]) {
    if (typeof chapter[key] === "string") chapter[key] = normalize(chapter[key], `${prefix}.${key}`)
  }
  for (let i = 0; i < (chapter.units ?? []).length; i += 1) {
    const unit = chapter.units[i]
    for (const key of ["heading", "teaching", "forYourHeart"]) {
      if (typeof unit[key] === "string") unit[key] = normalize(unit[key], `${prefix}.units[${i}].${key}`)
    }
    for (let wi = 0; wi < (unit.words ?? []).length; wi += 1) {
      if (typeof unit.words[wi].meaning === "string") unit.words[wi].meaning = normalize(unit.words[wi].meaning, `${prefix}.units[${i}].words[${wi}].meaning`)
    }
  }
}

if (!fs.existsSync(dir) || !fs.existsSync(manifestPath)) fail("reviewed recovered corpus/manifest missing")
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
const manifestBooks = []
let books = 0
let chapters = 0
let units = 0
for (const file of fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort()) {
  const full = path.join(dir, file)
  const book = JSON.parse(fs.readFileSync(full, "utf8"))
  for (const chapter of book.chapters ?? []) {
    normalizeChapter(book.id, chapter)
    chapters += 1
    units += chapter.units?.length ?? 0
  }
  const rendered = stable(book)
  fs.writeFileSync(full, rendered, "utf8")
  books += 1
  manifestBooks.push({ id: book.id, bookId: book.bookId, name: book.name, chapters: book.chapters.length, units: book.chapters.reduce((sum, chapter) => sum + (chapter.units?.length ?? 0), 0), sha256: sha256(rendered) })
}
if (books !== manifest.counts?.books || chapters !== manifest.counts?.chapters || units !== manifest.counts?.units) fail(`manifest totals changed unexpectedly: ${books}/${chapters}/${units}`)
manifest.books = manifestBooks
manifest.counts = { ...manifest.counts, romanianContextualFixes: ledger.length }
fs.writeFileSync(manifestPath, stable(manifest), "utf8")
fs.writeFileSync(ledgerPath, stable({ schema: "emanus-nt-romanian-contextual-fix-ledger-v2", policy: "only explicitly reviewed grammatical contexts; unresolved ambiguous forms remain audit blockers", count: ledger.length, fixes: ledger }), "utf8")
console.log(`NT Romanian contextual normalization: ${ledger.length} reviewed replacements.`)
