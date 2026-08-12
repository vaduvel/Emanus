#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered-manifest.json")
const targetFile = path.join(dir, "02-marcu.json")
const TRANSCRIPT_COMMIT = "fe97a4dee2849aaf4573a1046397b5194a171b4e"

function fail(message) { console.error(`[NT Poonen fidelity Mark 12] ${message}`); process.exit(1) }
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }

const EPISODES = {
  35: { passage: "Marcu 11:27-12:12", path: ".research/marcu-poonen/transcripts/035-u4QOplvDwP8.txt", blobSha: "ec43eebaa4f883569021b9869411d08d6580756a" },
  36: { passage: "Marcu 12:13-12:17", path: ".research/marcu-poonen/transcripts/036-P0PvHHB8mxo.txt", blobSha: "fac057b89bfa7c2882ed1275e80588c5a95f87b9" },
  37: { passage: "Marcu 12:18-12:34", path: ".research/marcu-poonen/transcripts/037-XcrRon5nKDI.txt", blobSha: "09027119cd50c625efd8b2b82b10ad3d2e56cc9f" },
  38: { passage: "Marcu 12:35-13:6", path: ".research/marcu-poonen/transcripts/038-dEy3ONcd3vk.txt", blobSha: "a9e1767dbeddd4b3bf0bdd956ca5822f87fd220e" },
}

const PATCHES = [
  {
    chapter: 12, from: 1, to: 12, episodes: [35],
    teaching: `Pilda viei continuă răspunsul lui Isus către conducătorii care Îi contestau autoritatea. Stăpânul este Dumnezeu, via este poporul pus sub grija Lui, iar lucrătorii uită adevărul fundamental: via nu le aparține. Este încredințată lor și trebuie să aducă rod pentru proprietar. Același principiu se aplică vieții noastre: trupul, timpul, banii, darurile și posibilitățile nu sunt proprietate absolută, ci lucruri primite de la Dumnezeu pentru administrare.

Stăpânul trimite slujitori după rod, iar vierii îi bat, îi rușinează și îi omoară. Expunerea îi vede aici pe prorocii trimiși repetat lui Israel. În cele din urmă vine fiul preaiubit. Vierii cred că, dacă îl omoară pe moștenitor, moștenirea va deveni a lor. Isus vorbește astfel despre propria respingere și moarte cu doar câteva zile înainte ca liderii să împlinească pilda.

Judecata este severă: stăpânul îi nimicește pe vierii necredincioși și dă via altora. Predica aplică aceasta ca avertisment și Bisericii. Faptul că Dumnezeu a chemat cândva un popor sau o comunitate nu înseamnă că necredincioșia ulterioară nu poate aduce respingere. «Suntem Biserica» nu este o imunitate spirituală; rămânerea până la sfârșit și rodirea contează.

Piatra lepădată de zidari devine piatra din capul unghiului. Hristos este standardul după care se aliniază întreaga clădire. Întrebarea decisivă nu este dacă avem o tradiție religioasă puternică, ci dacă viața este aliniată cu caracterul și calea Lui. Când Dumnezeu cere rodul din ceea ce ne-a încredințat, putem răspunde cu smerenie sau putem repeta atitudinea vierilor care au ajuns să creadă că darul primit le aparține.`,
    forYourHeart: "Privește-ți viața ca pe o vie încredințată, nu ca pe proprietate absolută. Ce rod primește Dumnezeu din timpul, banii, darurile și relațiile pe care ți le-a dat?",
  },
  {
    chapter: 12, from: 13, to: 27, episodes: [36, 37],
    explanationSource: "poonen-transcript-primary+canonical-exegesis",
    researchSources: ["Romani 13:1-7", "1 Corinteni 6:19-20", "1 Ioan 5:14-15"],
    teaching: `Fariseii și irodienii vin cu lingușire înainte de capcană: Îl laudă pe Isus ca adevărat și nepărtinitor, fără să creadă sincer ceea ce spun. Lingușirea este o plasă pentru omul care iubește aprecierea. Isus nu trăiește din părerea oamenilor și nu cade în capcană. El depinde de Tatăl și primește înțelepciunea de a răspunde: «Dați cezarului ce este al cezarului și lui Dumnezeu ce este al lui Dumnezeu.»

Principiul are o aplicație foarte concretă. Banii, taxele, datoriile și respectul care aparțin legal autorității nu pot fi reetichetate «pentru Dumnezeu» ca să scăpăm de obligație. Noul Testament îi cheamă pe credincioși la o conduită exemplară față de autorități, chiar când conducătorii nu sunt oameni evlavioși. Supunerea nu face statul absolut — ascultarea de Dumnezeu rămâne mai presus când omul cere păcat — dar nu avem voie să numim spiritualitate evaziunea, frauda sau disprețul față de autoritatea legitimă.

După ce dăm celuilalt ceea ce îi aparține, ceea ce suntem și ceea ce avem îi aparține lui Dumnezeu. În această expunere, Noul Legământ nu este redus la o zi din șapte și o zecime din venit. Omul răscumpărat «nu mai este al lui»: trupul, energia, timpul și resursele sunt ale Celui care l-a creat, l-a păstrat și l-a cumpărat cu preț. «Dați lui Dumnezeu ce este al lui Dumnezeu» ajunge astfel la întreaga persoană.

Saducheii încearcă apoi să ridiculizeze învierea printr-o situație artificială. Isus le spune că greșesc pentru că nu cunosc nici Scripturile, nici puterea lui Dumnezeu. Cele două trebuie ținute împreună. Cuvântul fără puterea Duhului poate deveni o cale ferată perfect lustruită pe care nu se mișcă nimic; zelul spiritual fără șinele Scripturii deraiază. Duhul Sfânt nu conduce contrar Cuvântului pe care El l-a inspirat.

În înviere, relațiile nu continuă sub forma căsătoriei pământești; oamenii sunt asemenea îngerilor în această privință. Iar Isus dovedește realitatea învierii chiar din formularea dată lui Moise: Dumnezeu spune «Eu sunt Dumnezeul lui Avraam, Isaac și Iacov», nu «am fost». Argumentul arată cât de atent tratează Isus fiecare cuvânt al Scripturii. Cunoașterea sănătoasă are nevoie atât de textul lui Dumnezeu, cât și de puterea Lui.`,
    forYourHeart: "Dă fiecăruia ce îi aparține și dă-I lui Dumnezeu întreaga ta viață. Nu alege între Scriptură și Duhul Sfânt: caută să fii plin de amândouă.",
  },
  {
    chapter: 12, from: 28, to: 34, episodes: [37],
    teaching: `Un cărturar întreabă care poruncă este cea mai mare. Isus nu alege una într-un mod care să le micșoreze pe celelalte, ci concentrează întreaga Lege în două direcții inseparabile: să-L iubești pe Dumnezeu cu toată inima, sufletul, mintea și puterea și să-ți iubești aproapele ca pe tine însuți.

Primele porunci privesc relația cu Dumnezeu, iar celelalte relația cu oamenii. Dragostea adevărată pentru Dumnezeu și dragostea divină pentru frate sunt două fețe ale aceleiași realități. Ioan va spune mai târziu că omul care pretinde că-L iubește pe Dumnezeu și își urăște fratele minte. Nu putem despărți verticala religioasă de felul în care tratăm concret persoanele de lângă noi.

Cărturarul înțelege și răspunde bine: această dragoste valorează mai mult decât toate arderile-de-tot și jertfele. Isus îi spune: «Nu ești departe de Împărăția lui Dumnezeu.» Răspunsul corect și cunoașterea corectă îl apropie, dar nu îl introduc automat în Împărăție. Adevărul cunoscut trebuie ascultat.

Aceasta este una dintre cele mai periculoase distanțe: «nu departe». Omul poate înțelege bine doctrina, poate aprecia răspunsurile lui Isus și poate vedea superioritatea dragostei față de ritual, dar totuși să nu fi predat inima în ascultare. Cunoașterea trebuie să devină viață.`,
    forYourHeart: "Nu te mulțumi că ești aproape de adevăr sau că îl poți explica. Întreabă dacă dragostea față de Dumnezeu și față de oameni a devenit ascultare reală.",
  },
  {
    chapter: 12, from: 35, to: 44, episodes: [38],
    explanationSource: "poonen-transcript-primary+canonical-exegesis",
    researchSources: ["Psalmul 110:1", "2 Samuel 24:24", "2 Corinteni 8:1-5", "2 Corinteni 9:7"],
    teaching: `După ce adversarii nu mai îndrăznesc să-L întrebe, Isus pune El întrebarea: cum poate Mesia să fie fiul lui David dacă David Îl numește «Domnul meu»? Răspunsul creștin ține împreună cele două adevăruri: Hristos există din veșnicie ca Domn și, în întrupare, vine în linia lui David. Psalmul 110 nu descrie numai un descendent omenesc, ci pe Cel care este mai mare decât David.

Apoi Isus avertizează împotriva cărturarilor care iubesc hainele distinctive, saluturile respectuoase, locurile dintâi și onoarea publică. Problema nu este locul fizic pe un scaun, ci iubirea lui. Darul, poziția sau responsabilitatea pot fi primite de la Dumnezeu; pofta după recunoaștere este străină de caracterul lui Hristos. Aceiași oameni pot devora casele văduvelor și apoi acoperi totul cu rugăciuni lungi. Religia care exploatează pe cel slab și compensează prin impresie publică primește o judecată mai mare.

Predica aplică testul și rugăciunii: dacă rugăciunea publică este mai bogată, mai pasionată și mai «spirituală» decât viața secretă cu Dumnezeu, apare ipocrizia. Omul lui Dumnezeu are mai multă realitate în odaie decât pe platformă, nu invers.

În contrast apare văduva săracă. Bogații dau sume mari din surplus; ea pune doi bănuți, tot ce avea pentru trai. Isus spune că ea a dat mai mult. Cerul nu măsoară darul numai prin cantitate, ci prin sacrificiu, inimă și cât din om însuși este în dar. David refuzase să-I aducă lui Dumnezeu ceva ce nu-l costa, iar Noul Testament vorbește despre dăruire fără constrângere, cu bucurie.

Mai întâi ne dăm pe noi înșine Domnului; apoi banii capătă sens spiritual. În această expunere, calitatea dăruirii cântărește mai mult decât procentul. Văduva nu este mare pentru că suma ei ar impresiona oamenii, ci fiindcă darul reprezenta viața ei. Isus vede ceea ce statisticile religioase nu pot măsura.`,
    forYourHeart: "Nu încerca să-L impresionezi pe Dumnezeu prin mărimea vizibilă a lucrării sau darului. Dă-I mai întâi persoana ta și lasă sacrificiul, bucuria și motivația curată să dea greutate la ceea ce oferi.",
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
  if (Array.isArray(unit.words) && unit.words.length) unit.wordSource = "Lexical research tracked separately against SBLGNT/STEPBible TBESG; doctrinal applications are not relabeled as lexical facts"
  unit.sourceFidelity = {
    reviewState: "reviewed-against-raw-transcript",
    policy: "poonen-primary-research-only-where-source-is-thin",
    primarySources,
    ...(patch.researchSources?.length ? { supplementalResearch: { kind: "canonical-exegesis", sources: patch.researchSources, rule: "supplements and checks the sermon source without attributing research claims to it" } } : {}),
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
console.log(`NT Poonen fidelity Mark 12: ${reviewed.length} units reviewed; ${reviewedUnits} total raw-transcript-reviewed units.`)
