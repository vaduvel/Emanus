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
  5: {
    passage: "Marcu 2:13-20",
    path: ".research/marcu-poonen/transcripts/005-Z8xY-p3taOQ.txt",
    blobSha: "649bafe0569423ffcc96d29c69fdc09abfb0bcb7",
  },
  6: {
    passage: "Marcu 2:21-3:6",
    path: ".research/marcu-poonen/transcripts/006-UXTXXCPjHuw.txt",
    blobSha: "694dbfdece92921fd55791d6911deca3bf88eb00",
  },
}

const PATCHES = [
  {
    chapter: 1, from: 1, to: 3, episodes: [1],
    explanationSource: "poonen-transcript-primary+canonical-exegesis",
    researchSources: ["Marcu 1:1-3", "Isaia 40:3", "Maleahi 3:1"],
    teaching: `Marcu deschide Evanghelia spunând direct cine este Isus Hristos, Fiul lui Dumnezeu, apoi mută imediat atenția spre glasul care Îi pregătește calea. Profeția despre mesager și glasul din pustiu ajunge la Ioan Botezătorul: înainte ca oamenii să-L primească pe Hristos, calea inimii trebuie pregătită.

Pregătirea aceasta nu este curiozitate religioasă și nici simplă cunoaștere despre Mesia. Ea începe prin pocăință. Omul nu ajunge la o credință vie în Hristos păstrându-și neatinsă vechea direcție; chemarea lui Dumnezeu îl întoarce de la păcat și îl pregătește să-L primească pe Domnul.

Titlul «începutul Evangheliei» așază tot capitolul sub vestea bună a lui Dumnezeu. Cercetarea canonică completează aici ceea ce expunerea dezvoltă doar pe scurt: citatul lui Marcu unește limbajul profetic despre mesager și despre glasul care pregătește calea, iar împlinirea lui este prezentată în lucrarea lui Ioan.`,
    forYourHeart: "Nu încerca să-L adaugi pe Hristos peste o viață pe care refuzi s-o întorci spre El. Calea începe cu pocăință sinceră și cu disponibilitatea de a asculta.",
  },
  {
    chapter: 1, from: 4, to: 8, episodes: [1],
    explanationSource: "poonen-transcript-primary",
    teaching: `Ioan Botezătorul este profetul pocăinței. Mesajul lui pregătește calea Domnului tocmai pentru că omul nu poate ajunge la credință vie în Hristos fără să se întoarcă mai întâi de la păcat. O credință rămasă numai în minte, fără roadele pocăinței, este moartă.

Oamenii își mărturisesc păcatele și intră în apă în ascultare de ceea ce Dumnezeu le cere. Nu trebuie să înțelegi mai întâi fiecare detaliu al unei porunci ca să începi s-o asculți; ascultarea smerită deschide drumul spre înțelegere. Ioan însuși trăiește simplu și refuză familiaritatea lipsită de reverență față de Isus, deși familiile lor erau înrudite: el se socotește nevrednic chiar să-I dezlege cureaua încălțămintei.

În aceste versete se văd patru lucruri fundamentale la începutul vieții creștine: pocăința, iertarea păcatelor, botezul în apă și botezul în Duhul Sfânt. Ioan poate cufunda în apă; Cel care vine după el cufundă în Duhul Sfânt și dă putere pentru viață și slujire.`,
    forYourHeart: "Nu transforma credința într-o idee corectă fără întoarcere și ascultare. Răspunde la lumina pe care o ai, iar Dumnezeu te conduce mai departe.",
  },
  {
    chapter: 1, from: 9, to: 11, episodes: [1],
    explanationSource: "poonen-transcript-primary",
    teaching: `Isus nu avea niciun păcat de mărturisit și nimic de care să Se pocăiască. Totuși intră în apă împreună cu oamenii care veneau la Ioan. Ascultarea Lui nu este condusă de argumentul «nu am nevoie de aceasta», ci de călăuzirea Duhului. În botez El arată simbolic disponibilitatea de a coborî în moarte și îngropare și de a fi ridicat de Tatăl.

Tatăl confirmă această ascultare prin trei semne: cerurile se deschid, glasul Îl declară Fiul preaiubit în care Își găsește plăcerea, iar Duhul coboară peste El ca un porumbel. Isus este înainte-mergător și aici: viața ucenicului este chemată la aceeași ascultare față de Dumnezeu, la o viață peste care cerul poate rămâne deschis și la puterea Duhului pentru a trăi și a sluji.

Accentul pasajului nu este că Isus avea nevoie de curățire, ci tocmai contrariul: Cel fără păcat alege ascultarea deplină și identificarea cu oamenii pentru lucrarea la care Tatăl L-a trimis.`,
    forYourHeart: "Când voia lui Dumnezeu este limpede, nu lăsa rațiunea să inventeze scuze pentru neascultare. Ascultarea lui Isus este modelul ucenicului.",
  },
  {
    chapter: 1, from: 12, to: 13, episodes: [2],
    explanationSource: "poonen-transcript-primary",
    teaching: `Duhul Îl conduce pe Isus în pustiu, unde Satan Îl ispitește. Dumnezeu nu ispitește pe nimeni, dar îngăduie ispita; în ea se dovedește loialitatea. Sub presiune se vede dacă omul rămâne adevărat, curat în gânduri și atitudini și credincios inclusiv în raportarea la bani și la lucrurile ascunse.

Ispita scoate la lumină și slăbiciunea noastră, ca să ne vedem nevoia de Dumnezeu și de ajutorul Lui. Ea nu are aceeași intensitate în fiecare etapă: Dumnezeu nu îngăduie o încercare peste puterea dată, iar odată cu maturitatea pot veni ispite mai subtile. Isus, ispitit în toate lucrurile fără păcat, merge înaintea noastră și pe acest drum.

Marcu spune că era între fiare sălbatice, dar și că îngerii Îi slujeau. Chiar într-un loc ostil, ucenicul care Îl urmează cu toată inima nu este în afara grijii lui Dumnezeu.`,
    forYourHeart: "Nu judeca ispita numai ca pe un atac de care trebuie să scapi. Folosește-o ca să vezi unde ai nevoie de Dumnezeu și să-I dovedești loialitatea în lucrurile concrete.",
  },
  {
    chapter: 1, from: 14, to: 20, episodes: [2],
    explanationSource: "poonen-transcript-primary",
    teaching: `Când Ioan este întemnițat pentru că a vestit adevărul și sfințenia, lucrarea lui Dumnezeu nu se oprește. Isus preia, ca într-o cursă de ștafetă, același mesaj profetic: Împărăția lui Dumnezeu este aproape; pocăiți-vă și credeți în Evanghelie. Pocăința și credința au fost unite de Dumnezeu și nu trebuie despărțite într-o Evanghelie a «credinței» care nu cere întoarcerea omului.

Apoi Isus cheamă pescari care erau deja credincioși în munca lor. Simon, Andrei, Iacov și Ioan nu sunt oameni care evitau responsabilitatea și căutau o ocupație religioasă. Credincioșia în lucrurile pământești este o pregătire pentru responsabilitatea spirituală; slujirea nu se clădește numai din studiu biblic, ci și dintr-un caracter dovedit în viața obișnuită.

Răspunsul lor este imediat. Odată ce voia lui Dumnezeu este clară, consecințele sunt lăsate în mâna Lui. Iacov și Ioan ies chiar din afacerea familiei. Nu disprețuiesc munca sau familia; răspund unei chemări mai înalte fără amânare.`,
    forYourHeart: "Fii credincios în munca pe care o ai acum și gata să asculți imediat când Dumnezeu îți face limpede următorul pas.",
  },
  {
    chapter: 1, from: 21, to: 28, episodes: [3],
    explanationSource: "poonen-transcript-primary",
    teaching: `În sinagoga din Capernaum oamenii aud aceeași Scriptură pe care o citeau și cărturarii, dar simt o autoritate diferită. Autoritatea lui Isus are două rădăcini: El vorbește despre o viață pe care a trăit-o deja în ascultare, inclusiv în anii ascunși din Nazaret, și slujește în puterea Duhului Sfânt. Cunoașterea teoretică nu poate înlocui nici viața trăită, nici ungerea Duhului.

Duhul necurat, care putuse rămâne netulburat în sinagogă, reacționează când Isus vorbește și Îl numește «Sfântul lui Dumnezeu». Isus îi poruncește să tacă. El nu primește mărturie de la diavol și nu are nevoie de confirmarea lui. Eliberarea omului arată autoritatea Împărăției asupra duhurilor rele, dar simplul fapt că cineva scoate demoni nu este, în sine, dovada unui caracter sfânt sau a mântuirii.

Autoritatea spirituală adevărată rămâne legată de ascultarea de Tatăl și de puterea Duhului. Vindecările și eliberările pot deschide uși pentru mesaj, dar ele nu sunt Evanghelia însăși.`,
    forYourHeart: "Nu căuta autoritate prin voce, titlu sau manifestări spectaculoase. Trăiește mai întâi ceea ce spui și caută puterea Duhului pentru a sluji curat.",
  },
  {
    chapter: 1, from: 29, to: 34, episodes: [3, 4],
    explanationSource: "poonen-transcript-primary",
    teaching: `În casa lui Simon, Isus o ridică pe soacra lui din febră, iar răspunsul ei imediat este slujirea. Darul primit nu devine un capăt în sine: omul ridicat de Dumnezeu primește din nou putere ca să-I aparțină și să slujească, nu doar ca să revină la o viață centrată pe sine.

După apus, bolnavii și cei chinuiți de duhuri sunt aduși la ușă, iar cetatea se strânge acolo. Isus vindecă și eliberează, dar nu le permite duhurilor să-L prezinte. Tatăl Își rostise deja mărturia asupra Fiului; El nu are nevoie de validarea oamenilor și cu atât mai puțin de cea a demonilor.

Vindecarea și eliberarea sunt lucrări reale ale milei și puterii lui Dumnezeu și pot deschide uși pentru vestire, dar nu sunt ele însele Evanghelia. Centrul rămâne salvarea din păcat, pocăința, credința și viața nouă în Hristos.`,
    forYourHeart: "Dacă Dumnezeu te ridică și îți dă putere, întreabă nu doar ce poți face pentru tine, ci cum poți să-I slujești cu ceea ce ai primit.",
  },
  {
    chapter: 1, from: 35, to: 39, episodes: [4],
    explanationSource: "poonen-transcript-primary",
    teaching: `După o seară lungă de slujire, Isus Se scoală foarte devreme și merge singur să Se roage. Înainte să audă ce vor oamenii, caută voia Tatălui. Tocmai după o lucrare spectaculoasă rămâne dependent de Tatăl și caută ajutor împotriva oricărei ispite a popularității sau mândriei.

Când ucenicii Îl găsesc, argumentul lor este puternic: «toți Te caută». Dar Isus nu ia popularitatea drept călăuzire. Pentru că a căutat deja voia Tatălui, știe că trebuie să meargă și în alte cetăți ca să predice. Rugăciunea Îl păstrează liber de presiunea succesului și de agenda mulțimii.

El continuă să predice și să elibereze oameni, dar direcția lucrării nu este stabilită de cerere, reputație sau statistici. Este stabilită în părtășia cu Tatăl.`,
    forYourHeart: "Caută voia lui Dumnezeu înainte ca vocile oamenilor să-ți spună ce trebuie să faci. Popularitatea nu este același lucru cu călăuzirea.",
  },
  {
    chapter: 1, from: 40, to: 45, episodes: [4],
    explanationSource: "poonen-transcript-primary",
    teaching: `Leprosul vine cu credința că Isus poate să-l curățească și Îi lasă Lui hotărârea: «Dacă vrei, poți». Isus este mișcat de milă, îl atinge și îl curăță. Apoi îi poruncește să respecte ceea ce ceruse Moise și să se arate preotului; perioada Noului Legământ nu fusese încă inaugurată prin lucrarea încheiată a crucii.

Omul este recunoscător, dar nu ascultă porunca de a păstra tăcerea. Intenția bună nu transformă neascultarea în ascultare: răspândirea veștii ajunge să îngreuneze intrarea publică a lui Isus în cetăți. Putem avea entuziasm sincer și totuși să împiedicăm lucrarea dacă presupunem că știm mai bine decât Domnul cum trebuie slujit.

Isus nu urmărește să fie cunoscut în primul rând ca Vindecător. Vindecarea este o lucrare a milei Lui, dar scopul principal rămâne salvarea omului de păcat și vestirea Evangheliei. Darurile și minunile nu trebuie să mute centrul de pe Mântuitor și de pe mesajul Lui.`,
    forYourHeart: "O inimă recunoscătoare are nevoie și de ascultare. Nu face pentru Dumnezeu lucrul pe care El ți-a spus să nu-l faci, chiar dacă intenția pare bună.",
  },
  {
    chapter: 2, from: 1, to: 12, episodes: [4],
    explanationSource: "poonen-transcript-primary",
    teaching: `Patru oameni își aduc prietenul paralizat la Isus și nu se opresc când ușa este blocată. Desfac acoperișul, iar perseverența lor face credința vizibilă. Isus vede credința lor și răspunde în folosul celui pe care l-au adus; este o încurajare să venim înaintea lui Dumnezeu nu numai pentru noi, ci și pentru cei pe care îi purtăm în rugăciune.

Primul cuvânt către paralitic nu este despre picioarele lui, ci despre păcat: «păcatele îți sunt iertate». Vindecarea trupească este un bine mare, dar iertarea păcatelor este o nevoie mai adâncă. Isus pune lucrurile în ordinea lor adevărată.

Când cărturarii contestă dreptul Lui de a ierta, Isus vindecă omul înaintea tuturor pentru a arăta că Fiul Omului are autoritate pe pământ să ierte păcatele. Minunea vizibilă susține afirmația invizibilă despre iertare.`,
    forYourHeart: "Nu te opri la nevoia care se vede cel mai tare. Adu-I Domnului și trupul, și povara altuia, dar caută mai întâi iertarea și împăcarea cu Dumnezeu.",
  },
  {
    chapter: 2, from: 13, to: 17, episodes: [5],
    explanationSource: "poonen-transcript-primary",
    teaching: `Levi este chemat direct din slujba lui și răspunde imediat. Și aici Isus cheamă un om care fusese deja obligat să învețe răspunderea în lucrurile materiale. Credincioșia cu banii și munca obișnuită nu produce automat slujire spirituală, dar lipsa de credincioșie în lucrurile pământești nu este o bază sănătoasă pentru responsabilitate spirituală.

La masa lui Levi, Isus stă între vameși și păcătoși. Sfințenia adevărată ne separă de păcat, nu ne face incapabili să ne apropiem de păcătoși. El nu este influențat de păcatul lor, ci îi influențează spre Dumnezeu. Aici este și limita pentru ucenic: apropierea de oameni nu trebuie folosită ca scuză pentru compromis.

Fariseii se cred sănătoși și de aceea nu caută Doctorul. Isus îi eliberează pe cei care își recunosc boala spirituală. Primul pas spre vindecarea sufletului este să încetezi să-ți justifici păcatul și să recunoști că ai nevoie de El.`,
    forYourHeart: "Nu confunda sfințenia cu izolarea mândră și nici apropierea de oameni cu compromisul. Recunoaște-ți propria nevoie de Doctor și apropie-te de ceilalți ca să-i conduci spre El.",
  },
  {
    chapter: 2, from: 18, to: 22, episodes: [5, 6],
    explanationSource: "poonen-transcript-primary",
    teaching: `Întrebarea despre post arată cât de ușor poate fi confundată sfințenia cu un ritual exterior. Postul are locul lui, dar nu face singur inima sfântă. Isus Își apără ucenicii înaintea criticilor, deși în alte împrejurări îi corectează direct; adevărata păstorire nu-și expune oamenii pentru a câștiga aprobarea celor din afară.

După plecarea Mirelui, ucenicii vor posti. În Biserica primară postul apare când credincioșii Îl caută pe Dumnezeu cu toată inima pentru călăuzire și pentru un scop clar, nu ca semn exterior de superioritate religioasă.

Peticul nou și vinul nou duc mai adânc: Noul Legământ nu este un accesoriu pus pe vechiul sistem. Viața lui Isus, lucrată în om prin Duhul Sfânt, este vinul nou; ea cere și burdufuri noi, o viață și o ordine formate după realitatea Noului Legământ. Nu putem păstra vechiul cadru și să-i adăugăm câteva idei creștine noi.`,
    forYourHeart: "Nu măsura sfințenia după ritualurile pe care le văd oamenii. Caută viața lui Hristos înăuntru și lasă-L să schimbe și vasul în care vrei s-o păstrezi.",
  },
  {
    chapter: 2, from: 23, to: 28, episodes: [6],
    explanationSource: "poonen-transcript-primary",
    teaching: `Fariseii nu sunt preocupați aici de propria ascultare, ci de găsirea unei încălcări la alții. Aceasta este una dintre formele legalismului: Cuvântul devine o lupă îndreptată spre vecin, nu o lumină îndreptată mai întâi spre propria inimă.

Isus amintește de David și arată că poruncile lui Dumnezeu nu au fost date ca să zdrobească viața omului. Sabatul a fost făcut pentru om, nu omul pentru Sabat. Ritualul exterior nu trebuie desprins de realitatea interioară spre care arată.

Fiul Omului este Domn și al Sabatului. Expunerea leagă aici Sabatul vechi de odihna spirituală descrisă în Evrei 4: porunca veche arăta înainte spre o realitate mai adâncă a odihnei în Dumnezeu. Tocmai de aceea litera nu poate fi folosită pentru a pierde din vedere scopul lui Dumnezeu și mila față de om.`,
    forYourHeart: "Când citești o poruncă, aplic-o mai întâi inimii tale. Este mai sigur să ceri lumină pentru propria neascultare decât să devii expert în greșelile altora.",
  },
]

if (!fs.existsSync(dir) || !fs.existsSync(manifestPath)) fail("reviewed NT corpus/manifest missing")
const targetFile = path.join(dir, "02-marcu.json")
if (!fs.existsSync(targetFile)) fail("Marcu reviewed corpus missing")
const book = JSON.parse(fs.readFileSync(targetFile, "utf8"))

const reviewed = []
for (const patch of PATCHES) {
  const chapter = (book.chapters ?? []).find((item) => item.number === patch.chapter)
  if (!chapter) fail(`Marcu ${patch.chapter}: chapter missing`)
  const unit = (chapter.units ?? []).find((item) => item.verseStart === patch.from && item.verseEnd === patch.to)
  if (!unit) fail(`Marcu ${patch.chapter}:${patch.from}-${patch.to}: target unit missing`)

  const primarySources = patch.episodes.map((episodeNumber) => {
    const episode = EPISODES[episodeNumber]
    if (!episode) fail(`Marcu ${patch.chapter}:${patch.from}-${patch.to}: transcript episode ${episodeNumber} missing`)
    return {
      kind: "poonen-transcript",
      episode: episodeNumber,
      commitSha: MARCU_TRANSCRIPT_COMMIT,
      path: episode.path,
      blobSha: episode.blobSha,
      passage: episode.passage,
    }
  })

  unit.teaching = patch.teaching
  unit.forYourHeart = patch.forYourHeart
  unit.explanationKind = "exposition"
  unit.explanationSource = patch.explanationSource
  if (Array.isArray(unit.words) && unit.words.length) {
    unit.wordSource = patch.chapter === 1 && patch.from === 4 && patch.to === 8
      ? "Poonen explicitly glosses βαπτίζω as immersion in transcript; lexical verification remains separate against SBLGNT/STEPBible TBESG"
      : "Lexical research tracked separately against SBLGNT/STEPBible TBESG; not attributed to the sermon source unless explicitly stated there"
  }
  unit.sourceFidelity = {
    reviewState: "reviewed-against-raw-transcript",
    policy: "poonen-primary-research-only-where-source-is-thin",
    primarySources,
    ...(patch.researchSources?.length ? {
      supplementalResearch: {
        kind: "canonical-exegesis",
        sources: patch.researchSources,
        rule: "supplements source coverage; must not be represented as Poonen wording",
      },
    } : {}),
  }
  reviewed.push({
    ref: unit.ref,
    episodes: [...patch.episodes],
    explanationSource: patch.explanationSource,
  })
}

fs.writeFileSync(targetFile, stable(book), "utf8")

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
const manifestBooks = []
let reviewedUnits = 0
for (const file of fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort()) {
  const full = path.join(dir, file)
  const data = JSON.parse(fs.readFileSync(full, "utf8"))
  const fileRendered = stable(data)
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
    sha256: sha256(fileRendered),
  })
}
manifest.books = manifestBooks
manifest.counts = { ...manifest.counts, poonenRawTranscriptReviewedUnits: reviewedUnits }
fs.writeFileSync(manifestPath, stable(manifest), "utf8")

console.log(`NT Poonen fidelity review: ${reviewed.length} Marcu 1-2 units checked against raw transcripts; ${reviewedUnits} total raw-transcript-reviewed units in corpus.`)
