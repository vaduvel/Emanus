#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered-manifest.json")
const targetFile = path.join(dir, "02-marcu.json")
const TRANSCRIPT_COMMIT = "fe97a4dee2849aaf4573a1046397b5194a171b4e"

function fail(message) { console.error(`[NT Poonen fidelity Mark 6] ${message}`); process.exit(1) }
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }

const EPISODES = {
  15: { passage: "Marcu 5:35-6:5", path: ".research/marcu-poonen/transcripts/015-l2-ArpMDzrk.txt", blobSha: "1814725eb72c54a4e9e8cd539fb51d98d47339b4" },
  16: { passage: "Marcu 6:6-6:29", path: ".research/marcu-poonen/transcripts/016-SZmyzS-qbbY.txt", blobSha: "bc732ec65e13fa19327ad7e3001cccf0c94fcb0c" },
  17: { passage: "Marcu 6:30-6:44", path: ".research/marcu-poonen/transcripts/017-uALqaRYfqkk.txt", blobSha: "e7ceb1c5807ea75dcf4a0b28ca04ae093664015c" },
  18: { passage: "Marcu 6:45-7:8", path: ".research/marcu-poonen/transcripts/018-_TqQrGVqOL8.txt", blobSha: "bdbe342a553a155e52223f8daf179b34a7a075ad" },
}

const PATCHES = [
  {
    chapter: 6, from: 1, to: 6, episodes: [15, 16],
    teaching: `În Nazaret, oamenii aud înțelepciunea lui Isus și cunosc lucrările Lui, dar familiaritatea devine o piedică: «Nu este Acesta tâmplarul?» Omul pe care l-au văzut crescând li se pare prea obișnuit ca să primească de la ei credință și onoare. Un proroc poate fi primit pretutindeni și totuși disprețuit tocmai între cei care cred că îl cunosc cel mai bine.

Expunerea citește numirea fraților și a surorilor lui Isus în sensul familial obișnuit al textului și vede aici o familie numeroasă în care El crescuse ca tâmplar înaintea lucrării publice. Accentul spiritual nu este însă o dispută despre rudenie, ci pericolul familiarității: apropierea exterioară de lucrurile lui Dumnezeu nu produce automat credință.

Marcu spune că Isus Se miră de necredința lor. În alt loc Se miră de credință. Acestea sunt cele două răspunsuri omenești care Îl uimesc în Evanghelii. Necredința nu Îi ia lui Hristos puterea, dar închide omul față de ceea ce ar fi putut primi. De aceea El face puține lucrări acolo și merge mai departe prin sate, învățând. Disprețul față de Cuvânt și față de Cel care îl aduce ne poate lăsa săraci chiar când Dumnezeu este aproape.`,
    forYourHeart: "Nu lăsa obișnuința cu Biblia, biserica sau oamenii lui Dumnezeu să înlocuiască credința. Primește adevărul pentru ceea ce este, nu după cât de familiar îți pare mesagerul.",
  },
  {
    chapter: 6, from: 7, to: 13, episodes: [16],
    teaching: `Isus îi trimite pe cei doisprezece doi câte doi. Slujirea Noului Legământ nu este concepută în jurul unui singur om mare, ca și cum părtășia ar fi numai un accesoriu. Doi ucenici care trăiesc în unitate trebuie să arate, prin relația lor și prin lucrarea lor, ceva din trupul lui Hristos. Autoritatea asupra duhurilor necurate este primită, nu fabricată prin personalitate sau tehnică.

Instrucțiunile despre a merge fără pâine, bani sau bagaj aparțin acestei trimiteri speciale în Israel. Expunerea observă că mai târziu, în Luca 22, Isus le spune acelorași ucenici să ia pungă și traistă. Așadar, fidelitatea biblică nu înseamnă să transformăm fiecare detaliu al unei misiuni temporare într-o lege permanentă pentru orice lucrător creștin.

Mesajul lor central este pocăința. Ei nu predică o credință despărțită de întoarcerea omului de la păcat. În același timp scot demoni și ung bolnavi cu untdelemn. Untdelemnul este tratat aici ca semn al Duhului Sfânt: puterea nu aparține ucenicului și nici obiectului, ci lui Dumnezeu. Ei au primit fără plată și trebuie să slujească fără a transforma darul într-un mijloc de câștig sau prestigiu.`,
    forYourHeart: "Nu căuta o slujire independentă și nu transforma o instrucțiune dată într-un context precis într-o lege pentru toți. Păstrează părtășia, pocăința și dependența de Duhul în centru.",
  },
  {
    chapter: 6, from: 14, to: 29, episodes: [16],
    teaching: `Când faima lui Isus ajunge la Irod, conștiința lui vinovată îl duce imediat la Ioan Botezătorul, pe care îl omorâse. Irod știa că Ioan era drept și sfânt. Îl asculta, se tulbura și chiar îi plăcea să-l audă. Dar plăcerea de a asculta un proroc puternic nu este dovadă de spiritualitate. Omul poate fi mișcat, fascinat și chiar convins în conștiință fără să rupă păcatul pe care Cuvântul îl condamnă.

Irod este tras în două direcții: glasul conștiinței și adevărul spus de Ioan într-o parte, iar presiunea soției, pofta de onoare și jurământul făcut înaintea invitaților în cealaltă. Când vine momentul deciziei, el alege aprobarea oamenilor. Îi pare rău, dar regretul nu îl oprește să dea ordinul uciderii unui om despre care știa că este drept.

Aceasta este tragedia unei conștiințe ascultate numai până în punctul în care ascultarea devine costisitoare. Irod a avut lumină, a avut avertizare și a avut timp. În cele din urmă, dorința de a nu-și pierde fața înaintea oamenilor a fost mai puternică decât teama de Dumnezeu. Moartea lui Ioan nu arată înfrângerea prorocului; arată unde poate ajunge un om care amână mereu să răspundă adevărului.`,
    forYourHeart: "Nu confunda emoția produsă de un mesaj cu pocăința. Când adevărul îți atinge conștiința, ascultă înainte ca onoarea, relațiile sau presiunea oamenilor să devină glasul mai puternic.",
  },
  {
    chapter: 6, from: 30, to: 44, episodes: [17],
    teaching: `Apostolii se întorc după slujire, iar Isus îi cheamă într-un loc retras ca să se odihnească. Activitatea neîntreruptă nu este o dovadă de spiritualitate. Trupul are nevoie de odihnă, iar duhul are nevoie să se retragă din mulțime pentru părtășie și reîmprospătare înaintea Tatălui. Uneori lucrarea cere să sari peste o masă; nu aceasta trebuie să devină însă rutina care sfârșește prin a distruge lucrătorul.

Când mulțimea ajunge înaintea lor, Isus vede mai adânc decât nevoia fizică: oamenii sunt ca niște oi fără păstor. Compasiunea Lui caută păstori care nu lucrează ca simbriașii pentru ceea ce pot lua de la turmă, ci oameni gata să-și dea viața pentru ea. De aceea începe prin a-i învăța multe lucruri, apoi Se ocupă și de foamea lor. Mila Lui privește omul întreg.

Cinci pâini și doi pești sunt ridicol de puțini în raport cu mulțimea. Tocmai aici se vede principiul slujirii: resursele limitate, dacă sunt date complet Domnului, pot fi suficiente prin binecuvântarea Lui. Nu banii sunt răspunsul suprem, iar capacitatea noastră nu este măsura lucrării pe care Dumnezeu o poate face.

Pâinea este mai întâi binecuvântată, apoi frântă și apoi dată ucenicilor pentru mulțime. Expunerea vede aici un tipar pentru slujitor: predarea totală trebuie urmată de ungerea lui Dumnezeu și de frângerea omului. Binecuvântarea fără frângere poate lăsa eul în centru. Ucenicii primesc de la Isus, merg la oameni, apoi se întorc la El pentru mai mult. Slujirea nu trăiește dintr-un depozit personal, ci din această mișcare repetată între Domnul și oameni.

La sfârșit se strâng douăsprezece coșuri. Abundența nu justifică risipa. Isus îi învață să păstreze ceea ce a rămas, iar cei care au slujit altora descoperă că Domnul știe și să poarte grijă de ei.`,
    forYourHeart: "Odihnește-te când trebuie, dă-I Domnului tot ce ai și nu disprețui puținul. Întoarce-te mereu la El ca să ai ce duce din nou oamenilor.",
  },
  {
    chapter: 6, from: 45, to: 52, episodes: [18],
    teaching: `Isus îi trimite pe ucenici în corabie și apoi Se retrage pe munte să Se roage. Ei sunt exact pe drumul poruncit de El și totuși vântul le este împotrivă. Greutatea nu dovedește automat că omul a ieșit din voia lui Dumnezeu. Uneori opoziția vine tocmai pe drumul ascultării; cel care merge cu lumea poate avea curentul în aceeași direcție, în timp ce ucenicul întâlnește vânt potrivnic.

În timp ce ei se chinuie la vâsle, Isus este singur la rugăciune și îi vede. Expunerea leagă imaginea de lucrarea Lui de mijlocire: Hristos nu i-a abandonat când nu era vizibil în corabie. El vine la ei pe mare, arătând că are stăpânire tocmai peste forțele care îi înspăimântă. Cuvântul Lui este: «Îndrăzniți! Eu sunt. Nu vă temeți!»

El nu le dă numai o încurajare de la distanță, ci intră în corabie. Vântul se oprește atunci când El hotărăște. Dumnezeu poate folosi împotrivirea ca să dezvolte puterea spirituală, dar nu îngăduie încercarea fără limită; știe și când trebuie să reducă presiunea.

Marcu spune că nu pricepuseră minunea pâinilor și că inima lor era împietrită. Aici împietrirea este legată de necredință: după ce Dumnezeu a lucrat în trecut, omul se poartă în noua criză ca și cum El l-ar abandona de data aceasta. Credința aduce în prezent memoria credincioșiei lui Dumnezeu.`,
    forYourHeart: "Vântul împotrivă nu înseamnă că Domnul te-a pierdut din vedere. Adu-ți aminte ce a făcut deja și ascultă din nou cuvântul Lui: nu te teme.",
  },
  {
    chapter: 6, from: 53, to: 56, episodes: [18],
    teaching: `La Ghenezaret oamenii Îl recunosc pe Isus și îi aduc pe bolnavi oriunde aud că este. Ei cer măcar să se atingă de marginea hainei Lui, iar Marcu spune că aceia care se atingeau erau vindecați.

Episodul trebuie citit împreună cu femeia din capitolul 5. Puterea nu stă în materialul hainei. Mulți pot ajunge fizic aproape de Isus fără să primească ceea ce caută; atingerea care contează este atingerea credinței. Expunerea vede aici încă o dată principiul încrederii personale în Domnul, nu o metodă sacramentală sau magică legată de un obiect.

Același Isus care răspunde nevoilor trupești tocmai petrecuse timp în rugăciune și îi învățase pe ucenici despre necredință. Minunile nu sunt desprinse de relația cu Dumnezeu. Credința nu transformă vindecarea într-un drept pe care omul îl poate impune, dar ne îndreaptă spre Persoana de la care vine orice ajutor adevărat.`,
    forYourHeart: "Nu căuta puterea într-un obiect, într-o formulă sau într-o atmosferă. Apropie-te de Domnul Însuși cu credință.",
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
console.log(`NT Poonen fidelity Mark 6: ${reviewed.length} units reviewed; ${reviewedUnits} total raw-transcript-reviewed units.`)
