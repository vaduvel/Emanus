#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered-manifest.json")

function fail(message) {
  console.error(`[NT Poonen fidelity review] ${message}`)
  process.exit(1)
}
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }

const MARCU_TRANSCRIPT_COMMIT = "fe97a4dee2849aaf4573a1046397b5194a171b4e"
const EPISODES = {
  1: {
    passage: "Marcu 1:1-11",
    path: ".research/marcu-poonen/transcripts/001-5ewEvSACYlk.txt",
    blobSha: "4282092b612a05edb395244a7b55b87bb96675b5",
  },
  2: {
    passage: "Marcu 1:12-20",
    path: ".research/marcu-poonen/transcripts/002-i6C3Eeaou-0.txt",
    blobSha: "18f4aa579476e7a6dc9b2e9434db9dc2141e9a53",
  },
  3: {
    passage: "Marcu 1:21-31",
    path: ".research/marcu-poonen/transcripts/003-3X21sa1JBhc.txt",
    blobSha: "ca2916bd88ed3944828109f7e2949af79519799f",
  },
  4: {
    passage: "Marcu 1:32-2:12",
    path: ".research/marcu-poonen/transcripts/004-BemX5OISVuI.txt",
    blobSha: "53d67a6f533fb228ddde11b79f09ed10ec2f4c95",
  },
}

const PATCHES = [
  {
    from: 1, to: 3, episode: 1,
    explanationSource: "poonen-transcript-primary+canonical-exegesis",
    researchSources: ["Marcu 1:1-3", "Isaia 40:3", "Maleahi 3:1"],
    teaching: `Marcu deschide Evanghelia spunând direct cine este Isus Hristos, Fiul lui Dumnezeu, apoi mută imediat atenția spre glasul care Îi pregătește calea. Profeția despre mesager și glasul din pustiu ajunge la Ioan Botezătorul: înainte ca oamenii să-L primească pe Hristos, calea inimii trebuie pregătită.

Pregătirea aceasta nu este curiozitate religioasă și nici simplă cunoaștere despre Mesia. Ea începe prin pocăință. Omul nu ajunge la o credință vie în Hristos păstrându-și neatinsă vechea direcție; chemarea lui Dumnezeu îl întoarce de la păcat și îl pregătește să-L primească pe Domnul.

Titlul «începutul Evangheliei» așază tot capitolul sub vestea bună a lui Dumnezeu. Cercetarea canonică completează aici ceea ce expunerea dezvoltă doar pe scurt: citatul lui Marcu unește limbajul profetic despre mesager și despre glasul care pregătește calea, iar împlinirea lui este prezentată în lucrarea lui Ioan.`,
    forYourHeart: "Nu încerca să-L adaugi pe Hristos peste o viață pe care refuzi s-o întorci spre El. Calea începe cu pocăință sinceră și cu disponibilitatea de a asculta.",
  },
  {
    from: 4, to: 8, episode: 1,
    explanationSource: "poonen-transcript-primary",
    teaching: `Ioan Botezătorul este profetul pocăinței. Mesajul lui pregătește calea Domnului tocmai pentru că omul nu poate ajunge la credință vie în Hristos fără să se întoarcă mai întâi de la păcat. O credință rămasă numai în minte, fără roadele pocăinței, este moartă.

Oamenii își mărturisesc păcatele și intră în apă în ascultare de ceea ce Dumnezeu le cere. Nu trebuie să înțelegi mai întâi fiecare detaliu al unei porunci ca să începi s-o asculți; ascultarea smerită deschide drumul spre înțelegere. Ioan însuși trăiește simplu și refuză familiaritatea lipsită de reverență față de Isus, deși familiile lor erau înrudite: el se socotește nevrednic chiar să-I dezlege cureaua încălțămintei.

În aceste versete se văd patru lucruri fundamentale la începutul vieții creștine: pocăința, iertarea păcatelor, botezul în apă și botezul în Duhul Sfânt. Ioan poate cufunda în apă; Cel care vine după el cufundă în Duhul Sfânt și dă putere pentru viață și slujire.`,
    forYourHeart: "Nu transforma credința într-o idee corectă fără întoarcere și ascultare. Răspunde la lumina pe care o ai, iar Dumnezeu te conduce mai departe.",
  },
  {
    from: 9, to: 11, episode: 1,
    explanationSource: "poonen-transcript-primary",
    teaching: `Isus nu avea niciun păcat de mărturisit și nimic de care să Se pocăiască. Totuși intră în apă împreună cu oamenii care veneau la Ioan. Ascultarea Lui nu este condusă de argumentul «nu am nevoie de aceasta», ci de călăuzirea Duhului. În botez El arată simbolic disponibilitatea de a coborî în moarte și îngropare și de a fi ridicat de Tatăl.

Tatăl confirmă această ascultare prin trei semne: cerurile se deschid, glasul Îl declară Fiul preaiubit în care Își găsește plăcerea, iar Duhul coboară peste El ca un porumbel. Isus este înainte-mergător și aici: viața ucenicului este chemată la aceeași ascultare față de Dumnezeu, la o viață peste care cerul poate rămâne deschis și la puterea Duhului pentru a trăi și a sluji.

Accentul pasajului nu este că Isus avea nevoie de curățire, ci tocmai contrariul: Cel fără păcat alege ascultarea deplină și identificarea cu oamenii pentru lucrarea la care Tatăl L-a trimis.`,
    forYourHeart: "Când voia lui Dumnezeu este limpede, nu lăsa rațiunea să inventeze scuze pentru neascultare. Ascultarea lui Isus este modelul ucenicului.",
  },
  {
    from: 12, to: 13, episode: 2,
    explanationSource: "poonen-transcript-primary",
    teaching: `Duhul Îl conduce pe Isus în pustiu, unde Satan Îl ispitește. Dumnezeu nu ispitește pe nimeni, dar îngăduie ispita; în ea se dovedește loialitatea. Sub presiune se vede dacă omul rămâne adevărat, curat în gânduri și atitudini și credincios inclusiv în raportarea la bani și la lucrurile ascunse.

Ispita scoate la lumină și slăbiciunea noastră, ca să ne vedem nevoia de Dumnezeu și de ajutorul Lui. Ea nu are aceeași intensitate în fiecare etapă: Dumnezeu nu îngăduie o încercare peste puterea dată, iar odată cu maturitatea pot veni ispite mai subtile. Isus, ispitit în toate lucrurile fără păcat, merge înaintea noastră și pe acest drum.

Marcu spune că era între fiare sălbatice, dar și că îngerii Îi slujeau. Chiar într-un loc ostil, ucenicul care Îl urmează cu toată inima nu este în afara grijii lui Dumnezeu.`,
    forYourHeart: "Nu judeca ispita numai ca pe un atac de care trebuie să scapi. Folosește-o ca să vezi unde ai nevoie de Dumnezeu și să-I dovedești loialitatea în lucrurile concrete.",
  },
  {
    from: 14, to: 20, episode: 2,
    explanationSource: "poonen-transcript-primary",
    teaching: `Când Ioan este întemnițat pentru că a vestit adevărul și sfințenia, lucrarea lui Dumnezeu nu se oprește. Isus preia, ca într-o cursă de ștafetă, același mesaj profetic: Împărăția lui Dumnezeu este aproape; pocăiți-vă și credeți în Evanghelie. Pocăința și credința au fost unite de Dumnezeu și nu trebuie despărțite într-o Evanghelie a «credinței» care nu cere întoarcerea omului.

Apoi Isus cheamă pescari care erau deja credincioși în munca lor. Simon, Andrei, Iacov și Ioan nu sunt oameni care evitau responsabilitatea și căutau o ocupație religioasă. Credincioșia în lucrurile pământești este o pregătire pentru responsabilitatea spirituală; slujirea nu se clădește numai din studiu biblic, ci și dintr-un caracter dovedit în viața obișnuită.

Răspunsul lor este imediat. Odată ce voia lui Dumnezeu este clară, consecințele sunt lăsate în mâna Lui. Iacov și Ioan ies chiar din afacerea familiei. Nu disprețuiesc munca sau familia; răspund unei chemări mai înalte fără amânare.`,
    forYourHeart: "Fii credincios în munca pe care o ai acum și gata să asculți imediat când Dumnezeu îți face limpede următorul pas.",
  },
  {
    from: 21, to: 28, episode: 3,
    explanationSource: "poonen-transcript-primary",
    teaching: `În sinagoga din Capernaum oamenii aud aceeași Scriptură pe care o citeau și cărturarii, dar simt o autoritate diferită. Autoritatea lui Isus are două rădăcini: El vorbește despre o viață pe care a trăit-o deja în ascultare, inclusiv în anii ascunși din Nazaret, și slujește în puterea Duhului Sfânt. Cunoașterea teoretică nu poate înlocui nici viața trăită, nici ungerea Duhului.

Duhul necurat, care putuse rămâne netulburat în sinagogă, reacționează când Isus vorbește și Îl numește «Sfântul lui Dumnezeu». Isus îi poruncește să tacă. El nu primește mărturie de la diavol și nu are nevoie de confirmarea lui. Eliberarea omului arată autoritatea Împărăției asupra duhurilor rele, dar simplul fapt că cineva scoate demoni nu este, în sine, dovada unui caracter sfânt sau a mântuirii.

Autoritatea spirituală adevărată rămâne legată de ascultarea de Tatăl și de puterea Duhului. Vindecările și eliberările pot deschide uși pentru mesaj, dar ele nu sunt Evanghelia însăși.`,
    forYourHeart: "Nu căuta autoritate prin voce, titlu sau manifestări spectaculoase. Trăiește mai întâi ceea ce spui și caută puterea Duhului pentru a sluji curat.",
  },
  {
    from: 29, to: 31, episode: 3,
    explanationSource: "poonen-transcript-primary",
    teaching: `Soacra lui Simon este ridicată din febră și, imediat ce este bine, începe să le slujească. În vindecările lui Isus vedem puterea Lui reală asupra bolii; în relatările Evangheliilor vindecarea este prezentată ca o lucrare concretă, nu ca o sugestie psihologică.

Răspunsul femeii arată și scopul potrivit al unui dar primit de la Dumnezeu: este ridicată și folosește puterea primităă pentru slujire. Viața, sănătatea și resursele nu ne sunt date numai ca să ne întoarcem la preocupările noastre, ci ca să-I aparținem Domnului și să-I slujim.`,
    forYourHeart: "Dacă Dumnezeu te ridică și îți dă putere, întreabă nu doar «ce pot face pentru mine?», ci «cum pot să-I slujesc cu ce am primit?»."
  },
  {
    from: 32, to: 34, episode: 4,
    explanationSource: "poonen-transcript-primary",
    teaching: `După apus, oamenii aduc bolnavi și oameni chinuiți de demoni, iar cetatea se strânge la ușă. Isus vindecă și eliberează, dar nu le permite duhurilor să vorbească despre identitatea Lui. Nu caută mărturia demonilor și nici nu-Și clădește identitatea pe aprobarea oamenilor; Tatăl spusese deja că Își găsește plăcerea în Fiul Lui.

Minunile au un loc real în lucrarea Lui, dar nu devin centrul Evangheliei. Ele pot deschide uși și pot arăta mila și puterea lui Dumnezeu; mesajul principal rămâne chemarea la pocăință, credință și viața nouă pe care Hristos o aduce.`,
    forYourHeart: "Nu-ți clădi siguranța pe aplauzele oamenilor sau pe lucrurile spectaculoase. Caută înainte de toate mărturia lui Dumnezeu asupra vieții tale.",
  },
  {
    from: 35, to: 39, episode: 4,
    explanationSource: "poonen-transcript-primary",
    teaching: `După o seară lungă de slujire, Isus Se scoală foarte devreme și merge singur să Se roage. Înainte să audă ce vor oamenii, caută voia Tatălui. Tocmai după o lucrare spectaculoasă are nevoie să rămână dependent de Tatăl și să biruiască orice ispită a popularității sau mândriei.

Când ucenicii Îl găsesc, argumentul lor este puternic: «toți Te caută». Dar Isus nu ia popularitatea drept călăuzire. Pentru că a căutat deja voia Tatălui, știe că trebuie să meargă și în alte cetăți ca să predice. Rugăciunea Îl păstrează liber de presiunea succesului și de agenda mulțimii.

El continuă să predice și să elibereze oameni, dar direcția lucrării nu este stabilită de cerere, reputație sau statistici. Este stabilită în părtășia cu Tatăl.`,
    forYourHeart: "Caută voia lui Dumnezeu înainte ca vocile oamenilor să-ți spună ce «trebuie» să faci. Popularitatea nu este același lucru cu călăuzirea.",
  },
  {
    from: 40, to: 45, episode: 4,
    explanationSource: "poonen-transcript-primary",
    teaching: `Leprosul vine cu credința că Isus poate să-l curățească și Îi lasă Lui hotărârea: «Dacă vrei, poți». Isus este mișcat de milă, îl atinge și îl curăță. Apoi îi poruncește să respecte ceea ce ceruse Moise și să se arate preotului, pentru că Noul Legământ nu fusese încă întemeiat prin cruce.

Omul este recunoscător, dar nu ascultă porunca de a păstra tăcerea. Intenția bună nu transformă neascultarea în ascultare: răspândirea veștii ajunge să îngreuneze intrarea publică a lui Isus în cetăți. Putem avea entuziasm sincer și totuși să împiedicăm lucrarea dacă presupunem că știm mai bine decât Domnul cum trebuie slujit.

Isus nu urmărește să fie cunoscut în primul rând ca Vindecător. Vindecarea este o lucrare a milei Lui, dar scopul principal rămâne salvarea omului de păcat și vestirea Evangheliei. Darurile și minunile nu trebuie să mute centrul de pe Mântuitor și de pe mesajul Lui.`,
    forYourHeart: "O inimă recunoscătoare are nevoie și de ascultare. Nu face «pentru Dumnezeu» lucrul pe care El ți-a spus să nu-l faci, chiar dacă intenția pare bună.",
  },
]

if (!fs.existsSync(dir) || !fs.existsSync(manifestPath)) fail("reviewed NT corpus/manifest missing")
const targetFile = path.join(dir, "02-marcu.json")
if (!fs.existsSync(targetFile)) fail("Marcu reviewed corpus missing")
const book = JSON.parse(fs.readFileSync(targetFile, "utf8"))
const chapter = (book.chapters ?? []).find((item) => item.number === 1)
if (!chapter) fail("Marcu 1 missing")

const reviewed = []
for (const patch of PATCHES) {
  const unit = (chapter.units ?? []).find((item) => item.verseStart === patch.from && item.verseEnd === patch.to)
  if (!unit) fail(`Marcu 1:${patch.from}-${patch.to}: target unit missing`)
  const episode = EPISODES[patch.episode]
  if (!episode) fail(`Marcu 1:${patch.from}-${patch.to}: transcript episode missing`)
  unit.teaching = patch.teaching
  unit.forYourHeart = patch.forYourHeart
  unit.explanationKind = "exposition"
  unit.explanationSource = patch.explanationSource
  if (Array.isArray(unit.words) && unit.words.length) {
    unit.wordSource = patch.from === 4 && patch.to === 8
      ? "Poonen transcript for βαπτίζω; lexical review tracked separately against SBLGNT/STEPBible TBESG"
      : "Lexical research tracked separately against SBLGNT/STEPBible TBESG"
  }
  unit.sourceFidelity = {
    reviewState: "reviewed-against-raw-transcript",
    policy: "poonen-primary-research-only-where-source-is-thin",
    primarySource: {
      kind: "poonen-transcript",
      commitSha: MARCU_TRANSCRIPT_COMMIT,
      path: episode.path,
      blobSha: episode.blobSha,
      passage: episode.passage,
    },
    ...(patch.researchSources?.length ? {
      supplementalResearch: {
        kind: "canonical-exegesis",
        sources: patch.researchSources,
        rule: "supplements source coverage; must not be represented as Poonen wording",
      },
    } : {}),
  }
  reviewed.push({ ref: unit.ref, episode: patch.episode, explanationSource: patch.explanationSource })
}

const rendered = stable(book)
fs.writeFileSync(targetFile, rendered, "utf8")

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
const manifestBooks = []
let reviewedUnits = 0
for (const file of fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort()) {
  const full = path.join(dir, file)
  const data = JSON.parse(fs.readFileSync(full, "utf8"))
  const fileRendered = stable(data)
  reviewedUnits += (data.chapters ?? []).reduce(
    (sum, ch) => sum + (ch.units ?? []).filter((unit) => unit.sourceFidelity?.reviewState === "reviewed-against-raw-transcript").length,
    0,
  )
  manifestBooks.push({
    id: data.id,
    bookId: data.bookId,
    name: data.name,
    chapters: data.chapters?.length ?? 0,
    units: (data.chapters ?? []).reduce((sum, ch) => sum + (ch.units?.length ?? 0), 0),
    sha256: sha256(fileRendered),
  })
}
manifest.books = manifestBooks
manifest.counts = { ...manifest.counts, poonenRawTranscriptReviewedUnits: reviewedUnits }
fs.writeFileSync(manifestPath, stable(manifest), "utf8")

console.log(`NT Poonen fidelity review: ${reviewed.length} Marcu 1 units checked against raw transcripts; ${reviewedUnits} total raw-transcript-reviewed units in corpus.`)
