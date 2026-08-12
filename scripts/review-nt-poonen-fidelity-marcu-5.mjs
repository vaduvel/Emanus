#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered-manifest.json")
const targetFile = path.join(dir, "02-marcu.json")
const TRANSCRIPT_COMMIT = "fe97a4dee2849aaf4573a1046397b5194a171b4e"

function fail(message) { console.error(`[NT Poonen fidelity Mark 5] ${message}`); process.exit(1) }
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }

const EPISODES = {
  13: { passage: "Marcu 5:1-5:20", path: ".research/marcu-poonen/transcripts/013-TWjQoUvD2YA.txt", blobSha: "a798d71b5a995517c82b389de1c144aee7ec7e88" },
  14: { passage: "Marcu 5:21-5:34", path: ".research/marcu-poonen/transcripts/014-hzpePp4ahdU.txt", blobSha: "657a9b4122d2dd1032d0291cdf99d9f26095436e" },
  15: { passage: "Marcu 5:35-6:5", path: ".research/marcu-poonen/transcripts/015-l2-ArpMDzrk.txt", blobSha: "1814725eb72c54a4e9e8cd539fb51d98d47339b4" },
}

const PATCHES = [
  {
    chapter: 5, from: 1, to: 20, episodes: [13],
    teaching: `Pe celălalt țărm, Isus întâlnește un om stăpânit de duhuri necurate, pe care lanțurile și puterea oamenilor nu-l puteau ține. El nu mersese prin țară căutând oameni demonizați ca să-Și construiască o lucrare în jurul lor; îi elibera pe cei pe care îi întâlnea în cursul slujirii. Nici nu ridică glasul ca și cum volumul ar produce autoritate și nici nu poartă o conversație lungă cu duhurile. Întreabă numele și poruncește. Autoritatea nu stă în zgomot, ci în viața și puterea spirituală din spatele cuvântului.

Duhurile Îl recunosc și se tem de El. Pentru ucenic, crucea schimbă raportul cu împărăția întunericului: Hristos a biruit puterile răului, iar cel care umblă în lumină nu este chemat să trăiască în frica demonilor. Siguranța nu vine din încrederea în propria tărie, ci din biruința Domnului și din apartenența la El. Întunericul trebuie luat în serios, dar nu tratat ca și cum ar fi egal cu Hristos.

Când duhurile intră în turma de porci și animalele pier, locuitorii văd omul eliberat, îmbrăcat și întreg la minte, dar Îl roagă pe Isus să plece. Pierderea economică a ajuns pentru ei mai importantă decât recuperarea unui om. Pasajul pune astfel o valoare incomparabilă pe persoana omenească: un singur suflet valorează mai mult decât averea pe care o putem pierde pentru ca acel om să fie salvat. În această expunere, episodul porcilor subliniază și deosebirea dintre valoarea eternă a omului și valoarea creaturilor sau bunurilor materiale.

Omul eliberat vrea să rămână cu Isus, dar primește altă însărcinare: să meargă acasă și să spună ce i-a făcut Domnul și cum a avut milă de el. El pleacă și mărturisește în Decapole. Mărturia lui nu este o tehnică de eliberare, ci povestea milei primite. Cine a fost scos din robie are ceva real de spus despre Cel care l-a eliberat.`,
    forYourHeart: "Nu te teme de întuneric ca și cum Hristos n-ar fi biruit. Umblă în lumină, rămâi sub autoritatea Lui și prețuiește omul mai mult decât lucrurile pe care le poți pierde.",
  },
  {
    chapter: 5, from: 21, to: 34, episodes: [14],
    teaching: `Iair vine cu o nevoie urgentă, iar Isus acceptă întreruperea. Slujirea Lui nu este rigidă față de planul zilei. O nevoie neprevăzută poate fi chiar lucrul pe care Tatăl îl așază înaintea noastră. De aceea un slujitor al lui Dumnezeu trebuie să învețe să deosebească între distragerile inutile și întreruperile prin care poate ajuta un om.

Pe drum apare încă o întrerupere: femeia bolnavă de doisprezece ani. Marcu spune că suferise mult, cheltuise tot și ajunsese mai rău după tratamentele primite. Aceasta este experiența ei, nu o condamnare a medicinei. Dumnezeu poate folosi medici, intervenții și tratamente, iar mulți oameni primesc ajutor real prin ele. Credința nu cere disprețuirea mijloacelor medicale; episodul arată doar că această femeie ajunsese la capătul ajutorului pe care îl găsise.

Ea crede că dacă se atinge de haina lui Isus va fi vindecată. Nu haina conține puterea care o vindecă. Isus spune limpede: credința ei a făcut diferența. Mulți oameni Îl îmbulzesc și Îi ating hainele, dar una singură Îl atinge prin credință. Apropierea fizică, participarea la o mulțime religioasă sau auzirea mesajului nu sunt același lucru cu încrederea personală în Domnul.

Principiul este mai larg decât această vindecare: primim de la Dumnezeu prin credință. El nu devine dator să împlinească orice rezultat fizic pe care îl cerem, iar expunerea însăși păstrează această limită — Dumnezeu vindecă trupul acolo unde aceasta este voia Lui. Dar promisiunea rămâne că omul care Își pune nădejdea în Dumnezeu nu este abandonat. Femeia intră în mulțime ca o suferindă anonimă și pleacă auzind cuvântul «fiică», vindecată și în pace.`,
    forYourHeart: "Nu te mulțumi să fii aproape de lucrurile lui Dumnezeu. Apropie-te de El cu credință, spune-I adevărul despre nevoia ta și lasă rezultatul în voia Lui.",
  },
  {
    chapter: 5, from: 35, to: 43, episodes: [15],
    teaching: `În timp ce Isus încă vorbește, vestea vine din casa lui Iair: fetița a murit. Răspunsul Lui este imediat: «Nu te teme; crede numai.» Nu există o situație care să depășească puterea Domnului, iar frica nu trebuie lăsată să decidă în locul credinței.

Isus îi ia cu El numai pe Petru, Iacov și Ioan. În momentele acestea nu caută o mulțime mare care să creeze impresia unei rugăciuni puternice. Lucrează cu oameni receptivi și cu credință. Numărul celor care se roagă nu Îl impresionează pe Dumnezeu; credința, frica de Dumnezeu și realitatea relației cu El sunt mai importante decât mărimea adunării.

La casă, plânsul și zarva sunt mari. Isus îi scoate pe cei care râd de cuvântul Lui și intră cu părinții și cei trei ucenici. Apoi îi vorbește fetiței cu autoritate: «Talita, cumi.» Nu avem aici o formulă magică, ci autoritatea Persoanei care vorbește. Fetița se ridică. Minunea este unul dintre semnele prin care Tatăl Îl atestă pe Isus înaintea lui Israel ca Mesia; asemenea lucrări rămân sub suveranitatea lui Dumnezeu și nu pot fi transformate într-o tehnică prin care omul Îi dictează când să învie un mort.

După minune, Isus poruncește cu strictețe să nu se facă publicitate și cere să i se dea fetiței să mănânce. El nu caută renume prin darul pe care tocmai l-a manifestat. Vindecările și minunile nu sunt centrul misiunii Lui; El a venit să caute și să mântuiască pe cei pierduți. În timp ce oamenii ar fi putut fi absorbiți de spectacol, El Se gândește la nevoia simplă a copilului care trebuie hrănit.`,
    forYourHeart: "Când o veste îți spune că nu mai există nicio speranță, nu lăsa frica să devină stăpân. Încrede-te în Domnul și caută credință reală, nu spectacol religios.",
  },
]

if (!fs.existsSync(targetFile) || !fs.existsSync(manifestPath)) fail("reviewed Marcu corpus/manifest missing")
const book = JSON.parse(fs.readFileSync(targetFile, "utf8"))
const reviewed = []

for (const patch of PATCHES) {
  const chapter = (book.chapters ?? []).find((item) => item.number === patch.chapter)
  if (!chapter) fail(`Marcu ${patch.chapter}: chapter missing`)
  const unit = (chapter.units ?? []).find((item) => item.verseStart === patch.from && item.verseEnd === patch.to)
  if (!unit) fail(`Marcu ${patch.chapter}:${patch.from}-${patch.to}: target unit missing`)
  const primarySources = patch.episodes.map((episodeNumber) => {
    const episode = EPISODES[episodeNumber]
    if (!episode) fail(`Marcu ${patch.chapter}:${patch.from}-${patch.to}: episode ${episodeNumber} missing`)
    return {
      kind: "poonen-transcript",
      episode: episodeNumber,
      commitSha: TRANSCRIPT_COMMIT,
      path: episode.path,
      blobSha: episode.blobSha,
      passage: episode.passage,
    }
  })
  unit.teaching = patch.teaching
  unit.forYourHeart = patch.forYourHeart
  unit.explanationKind = "exposition"
  unit.explanationSource = "poonen-transcript-primary"
  if (Array.isArray(unit.words) && unit.words.length) {
    unit.wordSource = "Lexical research tracked separately against SBLGNT/STEPBible TBESG; Greek glosses are not attributed to the sermon source unless explicitly stated there"
  }
  unit.sourceFidelity = {
    reviewState: "reviewed-against-raw-transcript",
    policy: "poonen-primary-research-only-where-source-is-thin",
    primarySources,
  }
  reviewed.push({ ref: unit.ref, episodes: [...patch.episodes] })
}

fs.writeFileSync(targetFile, stable(book), "utf8")
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
const manifestBooks = []
let reviewedUnits = 0
for (const file of fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort()) {
  const full = path.join(dir, file)
  const data = JSON.parse(fs.readFileSync(full, "utf8"))
  const rendered = stable(data)
  reviewedUnits += (data.chapters ?? []).reduce(
    (sum, chapter) => sum + (chapter.units ?? []).filter((unit) => unit.sourceFidelity?.reviewState === "reviewed-against-raw-transcript").length,
    0,
  )
  manifestBooks.push({
    id: data.id,
    bookId: data.bookId,
    name: data.name,
    chapters: data.chapters?.length ?? 0,
    units: (data.chapters ?? []).reduce((sum, chapter) => sum + (chapter.units?.length ?? 0), 0),
    sha256: sha256(rendered),
  })
}
manifest.books = manifestBooks
manifest.counts = { ...manifest.counts, poonenRawTranscriptReviewedUnits: reviewedUnits }
fs.writeFileSync(manifestPath, stable(manifest), "utf8")
console.log(`NT Poonen fidelity Mark 5: ${reviewed.length} units reviewed; ${reviewedUnits} total raw-transcript-reviewed units.`)
