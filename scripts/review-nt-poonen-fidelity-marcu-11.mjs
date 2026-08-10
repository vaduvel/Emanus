#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered-manifest.json")
const targetFile = path.join(dir, "02-marcu.json")
const TRANSCRIPT_COMMIT = "fe97a4dee2849aaf4573a1046397b5194a171b4e"

function fail(message) { console.error(`[NT Poonen fidelity Mark 11] ${message}`); process.exit(1) }
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }

const EPISODES = {
  32: { passage: "Marcu 10:46-11:10", path: ".research/marcu-poonen/transcripts/032-diS_8aor1Pc.txt", blobSha: "fc77350c95b46bd0543983c3fbcae44f969b52a3" },
  33: { passage: "Marcu 11:11-11:17", path: ".research/marcu-poonen/transcripts/033-2qIjx7n5zFk.txt", blobSha: "0d6bc874576df1ed7e83d9b5d212518341815e22" },
  34: { passage: "Marcu 11:18-11:26", path: ".research/marcu-poonen/transcripts/034-TZaci4Bggz4.txt", blobSha: "9c5cdcb7205c08f1e4fd79e5a3606143303dbafa" },
  35: { passage: "Marcu 11:27-12:12", path: ".research/marcu-poonen/transcripts/035-u4QOplvDwP8.txt", blobSha: "ec43eebaa4f883569021b9869411d08d6580756a" },
}

const PATCHES = [
  {
    chapter: 11, from: 1, to: 11, episodes: [32],
    explanationSource: "poonen-transcript-primary+canonical-exegesis",
    researchSources: ["Zaharia 9:9", "Psalmul 118:25-26"],
    teaching: `Isus intră în Ierusalim nu pe calul unui cuceritor, ci pe un măgăruș. Gestul împlinește profeția despre Împăratul smerit și face vizibilă natura Împărăției Lui: puterea lui Dumnezeu nu are nevoie de pompa pe care lumea o asociază cu măreția.

În această expunere, măgărușul devine și o imagine a omului pe care Domnul îl poate folosi. Animalul nu are cu ce să se laude pentru onoarea de a-L purta pe Rege; gloria aparține Celui care stă pe el. La fel, omul care își recunoaște nimicnicia, lipsa de înțelepciune și dependența poate auzi: «Domnul are nevoie de el.» Dar mai întâi trebuie dezlegat de lucrurile care îl țin legat de lume, bani, păcat și ambiție.

Aceasta este tipologia expunerii, nu sensul lexical al «măgărușului». Textul însuși spune clar că Isus intră smerit, iar cercetarea canonică leagă gestul de Zaharia 9:9. Mulțimea strigă «Osana» și Îl primește cu limbaj regal, dar adevărata măreție a Regelui nu stă în hainele așternute pe drum. El merge spre cruce.

După intrare, Isus intră în Templu, privește totul și pleacă fiindcă este târziu. Această privire tăcută pregătește acțiunea de a doua zi. El nu reacționează impulsiv la ceea ce vede; Se întoarce după ce a așteptat înaintea Tatălui.`,
    forYourHeart: "Nu căuta să fii calul impresionant al unei lucrări. Lasă-te dezlegat de ceea ce te ține și fii mulțumit să porți gloria Altcuiva.",
  },
  {
    chapter: 11, from: 12, to: 26, episodes: [33, 34],
    explanationSource: "poonen-transcript-primary+canonical-exegesis",
    researchSources: ["Geneza 3:7,21", "Isaia 56:7", "Ieremia 7:11", "1 Ioan 5:14-15"],
    teaching: `A doua zi, Isus caută rod într-un smochin plin de frunze și nu găsește. În această expunere, smochinul este citit tipologic în două direcții. Frunzele trimit la încercarea lui Adam și Eva de a-și acoperi goliciunea prin propria soluție, imagine a dreptății omenești care nu poate înlocui acoperirea dată de Dumnezeu. Smochinul este legat și de Israel: multă formă religioasă, dar lipsa rodului pe care Dumnezeu îl căuta. Aceste legături sunt tipologia predicii; faptul direct din Marcu este judecata nerodirii.

Apoi Isus intră în Templu și îi scoate pe cei care cumpără, vând și schimbă bani. Acțiunea nu este o izbucnire de temperament. Cu o zi înainte văzuse aceeași situație și plecase. Acum acționează deliberat, după ce a așteptat înaintea Tatălui. Blândețea lui Isus nu înseamnă pasivitate față de păcat. El poate răsturna mesele când casa de rugăciune este transformată într-un loc de câștig.

Schimbarea banilor și vânzarea animalelor puteau răspunde unor nevoi reale ale închinătorilor; păcatul era folosirea lucrării religioase pentru profit personal. Expunerea aplică aceasta fără menajamente: a folosi darul spiritual, Numele lui Hristos sau slujirea pentru bani, prestigiu și poziție înseamnă a transforma casa Tatălui într-o peșteră de tâlhari. Munca pentru profit are locul ei în piață; slujirea lui Dumnezeu nu trebuie folosită ca mecanism de îmbogățire și autoînălțare.

Când ucenicii văd mai târziu smochinul uscat, Isus îi învață despre credință. Efectul nu fusese vizibil imediat, dar lucrarea începuse de la rădăcină. Rugăciunea prin credință nu cere întotdeauna un rezultat instantaneu. Uneori Dumnezeu ne învață să perseverăm și să trăim înainte de vedere.

Dar promisiunea despre muntele mutat nu este un cec pentru dorința proprie. În această expunere, trebuie mai întâi să deosebim un obstacol pus de Dumnezeu ca să oprească propria noastră voie de un obstacol al celui rău care stă împotriva voii lui Dumnezeu. Discernământul vine când propria voie este predată. 1 Ioan completează principiul: avem încredere când cerem potrivit voii Lui. Ghetsimani arată chiar în viața lui Isus că credința nu este tehnica de a îndepărta un «pahar» pe care Tatăl a decis să-l păstreze.

Și rugăciunea este legată de iertare. Nu putem cere cu mâini ridicate și, în același timp, să păstrăm refuzul de a ierta. Mila primită trebuie să ne transforme în oameni care oferă iertare. Aceasta nu înseamnă negarea adevărului sau anularea responsabilității, ci renunțarea la datoria personală a răzbunării și la inima care refuză harul altuia.`,
    forYourHeart: "Nu confunda credința cu forțarea voii tale. Predă-ți voia, deosebește obstacolul și roagă-te cu încredere pentru ceea ce Dumnezeu vrea — cu o inimă care iartă.",
  },
  {
    chapter: 11, from: 27, to: 33, episodes: [35],
    teaching: `Preoții, cărturarii și bătrânii Îl întreabă cu ce autoritate a curățit Templul. Isus nu răspunde automat oricărei întrebări. Când un ucenic sincer caută lumină, El explică; când întrebarea este o capcană, curiozitate sau încercare de a găsi o vină, poate răspunde printr-o întrebare care descoperă inima celui care întreabă.

El îi întreabă dacă botezul lui Ioan era din cer sau de la oameni. Conducătorii nu caută adevărul, ci calculează consecințele fiecărui răspuns. Dacă spun «din cer», trebuie să explice de ce nu au crezut. Dacă spun «de la oameni», se tem de mulțime. Aleg formula diplomatică «Nu știm», deși problema nu era lipsa de informație. Reputația și poziția ajung mai importante decât adevărul.

Expunerea vede aici spiritul diplomatului religios: omul știe ce este adevărat, dar își modelează răspunsul ca să păstreze simultan aprobarea mai multor grupuri. Când această protejare a poziției cere minciună, religiozitatea nu schimbă natura faptei. Hristos este Adevărul, iar poporul care Îi poartă caracterul trebuie să curețe din gură și din inimă minciuna folosită pentru autoprotecție.

Isus refuză să le dea răspunsul cerut. Autoritatea Lui nu este supusă tribunalului unor oameni care au respins deja lumina pe care Dumnezeu le-o dăduse prin Ioan. Problema lor nu era lipsa dovezii, ci lipsa supunerii față de adevărul deja cunoscut.`,
    forYourHeart: "Nu folosi «nu știu» când adevărul ți-ar costa reputația. Cere-I lui Dumnezeu o inimă simplă, fără diplomația care protejează poziția prin jumătăți de adevăr.",
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
    return { kind: "poonen-transcript", episode: episodeNumber, commitSha: TRANSCRIPT_COMMIT, path: episode.path, blobSha: episode.blobSha, passage: episode.passage }
  })
  unit.teaching = patch.teaching
  unit.forYourHeart = patch.forYourHeart
  unit.explanationKind = "exposition"
  unit.explanationSource = patch.explanationSource ?? "poonen-transcript-primary"
  if (Array.isArray(unit.words) && unit.words.length) unit.wordSource = "Lexical research tracked separately against SBLGNT/STEPBible TBESG; typology and sermon applications are not relabeled as lexical facts"
  unit.sourceFidelity = {
    reviewState: "reviewed-against-raw-transcript",
    policy: "poonen-primary-research-only-where-source-is-thin",
    primarySources,
    ...(patch.researchSources?.length ? { supplementalResearch: { kind: "canonical-exegesis", sources: patch.researchSources, rule: "supplements/checks source; sermon typology remains explicitly interpretive" } } : {}),
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
  reviewedUnits += (data.chapters ?? []).reduce((sum, chapter) => sum + (chapter.units ?? []).filter((unit) => unit.sourceFidelity?.reviewState === "reviewed-against-raw-transcript").length, 0)
  manifestBooks.push({ id: data.id, bookId: data.bookId, name: data.name, chapters: data.chapters?.length ?? 0, units: (data.chapters ?? []).reduce((sum, chapter) => sum + (chapter.units?.length ?? 0), 0), sha256: sha256(rendered) })
}
manifest.books = manifestBooks
manifest.counts = { ...manifest.counts, poonenRawTranscriptReviewedUnits: reviewedUnits }
fs.writeFileSync(manifestPath, stable(manifest), "utf8")
console.log(`NT Poonen fidelity Mark 11: ${reviewed.length} units reviewed; ${reviewedUnits} total raw-transcript-reviewed units.`)
