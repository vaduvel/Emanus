#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered-manifest.json")
const targetFile = path.join(dir, "02-marcu.json")
const TRANSCRIPT_COMMIT = "fe97a4dee2849aaf4573a1046397b5194a171b4e"

function fail(message) { console.error(`[NT Poonen fidelity Mark 3-4] ${message}`); process.exit(1) }
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }

const EPISODES = {
  6: { passage: "Marcu 2:21-3:6", path: ".research/marcu-poonen/transcripts/006-UXTXXCPjHuw.txt", blobSha: "694dbfdece92921fd55791d6911deca3bf88eb00" },
  7: { passage: "Marcu 3:7-3:30", path: ".research/marcu-poonen/transcripts/007-RjRF6ieduhk.txt", blobSha: "51aa91f97bcff803c3606bb57f03d00c06355097" },
  8: { passage: "Marcu 3:31-4:19", path: ".research/marcu-poonen/transcripts/008-KHvfy8YSHys.txt", blobSha: "e468c6aa106a637973bdbdd7851be307be6cbd58" },
  9: { passage: "Marcu 4:20", path: ".research/marcu-poonen/transcripts/009-Nl4iYhC6qlg.txt", blobSha: "5648f4b9cd45ef8bde2bb43089ac3408c54deb90" },
  10: { passage: "Marcu 4:21-4:25", path: ".research/marcu-poonen/transcripts/010-Xfu-18zRitk.txt", blobSha: "2fec8a2d1e4b9af98169cb66872608a1e454faee" },
  11: { passage: "Marcu 4:26-4:32", path: ".research/marcu-poonen/transcripts/011-Fr_vjTPbrGo.txt", blobSha: "6dffb4d9cf8e7b546ec29b76b204998ec6aa8382" },
  12: { passage: "Marcu 4:33-4:41", path: ".research/marcu-poonen/transcripts/012-lHUlEid6b1M.txt", blobSha: "96c2960ef456cdfaf3e3810bc70c83339d742db0" },
}

const PATCHES = [
  {
    chapter: 3, from: 1, to: 6, episodes: [6],
    teaching: `În sinagogă, fariseii nu privesc mai întâi omul cu mâna paralizată, ci caută o ocazie să-L acuze pe Isus. Aici se vede pericolul legalismului: porunca lui Dumnezeu este folosită pentru a judeca pe altul, în timp ce nevoia omului aflat chiar înaintea noastră nu ne mai mișcă. Când religia apără regula și devine indiferentă la suferință, a pierdut inima Celui care a dat porunca.

Isus întreabă dacă în Sabat este îngăduit să faci bine sau rău, să salvezi o viață sau s-o pierzi. Ei tac. Apoi El privește cu mânie, dar Marcu spune în același timp că este mâhnit de împietrirea inimii lor. Mânia Lui nu izvorăște dintr-o ofensă personală; este indignarea sfântă față de împietrirea care nu se bucură când un om este ajutat.

Deosebirea aceasta este esențială. Mânia care apare pentru că eu am fost jignit, trecut cu vederea sau nedreptățit este de altă natură decât indignarea pentru onoarea lui Dumnezeu și pentru răul făcut altuia. Fariseii ar fi putut să se pocăiască atunci când au văzut minunea. În schimb, ca să-și păstreze poziția și reputația, ies și încep să plănuiască nimicirea Lui. Lumina primită, dacă este refuzată, poate întări și mai mult inima.`,
    forYourHeart: "Nu folosi Cuvântul ca să găsești greșeli la ceilalți. Lasă-L mai întâi să-ți arate unde o regulă, o reputație sau mândria te-au făcut indiferent față de omul de lângă tine.",
  },
  {
    chapter: 3, from: 7, to: 12, episodes: [7],
    teaching: `Mulțimile vin din multe regiuni pentru că au auzit ce face Isus, iar cei suferinzi caută să-L atingă. În mijlocul acestei lucrări, duhurile necurate cad înaintea Lui și strigă că este Fiul lui Dumnezeu. Marcu arată din nou același lucru: Isus le poruncește să tacă.

Aceasta este deja a treia oară în primele capitole când El refuză mărturia demonilor. Faptul că o putere spirituală spune ceva adevărat nu transformă acea mărturie într-o autoritate pentru credință. Isus nu are nevoie ca identitatea Lui să fie confirmată de dușman. Tatăl Își spusese deja cuvântul despre Fiul Său.

Pentru ucenic, lecția este simplă: adevărul nu devine mai adevărat fiindcă este rostit într-un context spectaculos. Credința se sprijină pe Dumnezeu și pe Cuvântul Lui, nu pe glasul duhurilor, pe senzațional sau pe validarea venită dintr-o sursă greșită.`,
    forYourHeart: "Nu căuta confirmarea spirituală de oriunde. Este suficient ceea ce Dumnezeu a spus; adevărul Lui nu are nevoie de aprobarea întunericului.",
  },
  {
    chapter: 3, from: 13, to: 19, episodes: [7],
    teaching: `Isus îi cheamă pe cei pe care îi voiește și dintre ucenici rânduiește doisprezece. Ordinea scopului lor este importantă: mai întâi «să fie cu El», apoi să fie trimiși să predice și să aibă autoritate asupra duhurilor rele. Temelia slujirii nu este activitatea, ci părtășia cu Domnul. Autoritatea spirituală se pierde când omul încearcă să lucreze pentru Hristos fără să rămână cu Hristos.

Alegerea celor doisprezece nu este prezentată ca o decizie grăbită. Luca arată că Isus petrecuse noaptea în rugăciune, căutând voia Tatălui. El trăia ca Om în dependență de Tatăl, iar slujirea Lui curgea din această ascultare.

În listă apare și Iuda Iscarioteanul. Expunerea subliniază o nuanță importantă: Iuda nu trebuie imaginat ca un trădător fals din prima clipă, ales doar pentru a juca un rol. El a început alături de ceilalți și a devenit trădător. Tocmai de aceea este un avertisment real: un început sincer și apropierea de lucrare nu garantează un sfârșit credincios dacă inima nu continuă să rămână cu Domnul.`,
    forYourHeart: "Înainte să întrebi ce poți face pentru Dumnezeu, întreabă dacă rămâi cu El. Chemarea la părtășie vine înaintea chemării la lucrare.",
  },
  {
    chapter: 3, from: 20, to: 30, episodes: [7],
    teaching: `Mulțimea este atât de mare încât Isus și ucenicii nici nu mai pot mânca. Rudele Lui consideră că Și-a pierdut mințile. Expunerea vede aici costul unei vieți care pune nevoia altora înaintea propriului confort: o asemenea dăruire poate părea nebunie chiar unor oameni religioși care sunt obișnuiți să ajute numai când le este convenabil.

Aceasta nu înseamnă că orice om criticat pentru o decizie nechibzuită este automat un profet. Faptul că cineva este neînțeles nu dovedește că are dreptate. Criteriul rămâne voia lui Dumnezeu. Dar când conștiința este curată înaintea Lui, trebuie acceptat că uneori nici rudele și nici liderii religioși nu vor înțelege ascultarea deplină.

Cărturarii merg mai departe și atribuie lucrarea lui Isus lui Satan. Isus arată că o împărăție dezbinată nu poate sta. Satan nu-și distruge singur propria împărăție. Imaginea omului tare arată autoritatea lui Hristos asupra lui: El a venit să lege puterea vrăjmașului, iar crucea este biruința decisivă prin care credinciosul nu mai trebuie să trăiască sub stăpânirea lui.

Avertismentul despre hula împotriva Duhului Sfânt privește împotrivirea conștientă și voită față de lucrarea Duhului, atunci când omul știe ce respinge și totuși numește rău ceea ce Dumnezeu face. Un om care dorește încă sincer să se pocăiască nu trebuie împins în deznădejde: însăși dorința de întoarcere arată că inima nu a ajuns în acea împietrire deliberată și finală.`,
    forYourHeart: "Nu confunda respingerea oamenilor cu aprobarea lui Dumnezeu, dar nici aprobarea oamenilor cu voia Lui. Păstrează o inimă care se pocăiește repede și care nu numește întuneric ceea ce Duhul luminează.",
  },
  {
    chapter: 3, from: 31, to: 35, episodes: [8],
    teaching: `Când mama și frații Lui Îl caută, Isus definește o relație mai adâncă decât rudenia de sânge: «oricine face voia lui Dumnezeu» este fratele, sora și mama Lui. Expunerea pune accentul radical pe această prioritate. În Împărăție, legătura trupească nu poate primi un loc mai înalt decât ascultarea de Dumnezeu.

Aceasta nu este dispreț față de familie. Maria însăși este un exemplu de supunere față de voia lui Dumnezeu. Dar apropierea spirituală de Hristos nu se moștenește biologic și nu se primește prin privilegiu familial. Noul Legământ deschide o familie în care oamenii intră prin relația lor cu Dumnezeu și prin facerea voii Lui.

De aceea ucenicul trebuie să-L pună pe Hristos înaintea oricărei presiuni de familie care l-ar împiedica să asculte. Frații și surorile care fac voia lui Dumnezeu devin o familie spirituală reală, nu o simplă metaforă religioasă.`,
    forYourHeart: "Iubește-ți familia, dar nu pune niciun om în locul în care trebuie să stea Dumnezeu. Cea mai adâncă apropiere de Hristos se trăiește prin ascultare.",
  },
  {
    chapter: 4, from: 1, to: 9, episodes: [8],
    teaching: `În pilda semănătorului, sămânța este Cuvântul lui Dumnezeu, iar pământul este inima omului. Sămânța bună ajunge în locuri diferite și rezultatele sunt diferite nu pentru că mesajul se schimbă, ci pentru că inima care îl primește este diferită.

Unele inimi sunt ca drumul, unde Cuvântul rămâne la suprafață și poate fi luat imediat. Altele au un strat subțire de pământ: răspund repede, dar fără rădăcină. Altele lasă spinii să crească împreună cu sămânța până când viața este sufocată. Numai pământul bun ajunge să aducă rod.

Chemarea «cine are urechi de auzit să audă» nu privește numai capacitatea de a înțelege o predică. În Scriptură, auzirea adevărată este legată de răspunsul inimii. Pilda ne mută atenția de la calitatea predicatorului la starea terenului din noi.`,
    forYourHeart: "Nu întreba numai dacă ai auzit Cuvântul. Întreabă ce a putut face în tine după ce l-ai auzit.",
  },
  {
    chapter: 4, from: 10, to: 12, episodes: [8],
    teaching: `Ucenicii Îl întreabă pe Isus despre pilde, iar El le spune că lor le este dat să cunoască taina Împărăției. Diferența nu este că ei ar fi fost intelectual mai străluciți. Mulți oameni mai educați decât acești pescari puteau auzi aceleași cuvinte și totuși să rămână fără înțelegere spirituală.

Cuvântul lui Dumnezeu nu este cunoscut numai prin minte. Omul poate avea un intelect puternic și un duh orb sau, dimpotrivă, poate avea puțină educație și o inimă sensibilă față de Dumnezeu. Ascultarea și dorința sinceră de a face voia Lui deschid înțelegerea pe care simpla analiză nu o poate produce.

De aceea pildele descoperă și ascund în același timp. Celui care dorește ucenicia îi deschid adevărul; celui care vrea numai informație îi pot rămâne la nivel de poveste. Lumina spirituală crește când răspundem la lumina deja primită.`,
    forYourHeart: "Cere mai mult decât informație biblică. Cere o inimă care vrea să facă voia lui Dumnezeu, pentru că acolo se deschide înțelegerea.",
  },
  {
    chapter: 4, from: 13, to: 20, episodes: [8, 9],
    teaching: `Isus explică cele trei feluri de pământ rău. Primul pierde Cuvântul repede: Satan îl ia prin uitare, neatenție, distragere sau îndoială. Al doilea răspunde numai la suprafață; ascultarea ține cât timp nu costă. Când vine presiunea, persecuția sau prețul concret al ascultării, lipsa rădăcinii devine vizibilă. Al treilea poate părea cel mai sănătos, pentru că nu este sufocat neapărat de lucruri evident rele. Grijile vieții, înșelăciunea bogățiilor și dorința după alte lucruri legitime pot ocupa inima până când Cuvântul nu mai aduce rod.

Apoi există și trei măsuri de pământ bun: treizeci, șaizeci și o sută. Toate aud, primesc și aduc rod, dar nu cu aceeași măsură. Expunerea leagă diferența de atitudinea inimii. Un om poate trăi întrebând mereu care este minimumul necesar ca să fie în regulă; altul Îi aparține lui Dumnezeu fără rezervă și întreabă care este maximumul pe care îl poate oferi din dragoste Celui care S-a dat pe Sine pentru el.

Aceasta este diferența dintre corectitudinea calculată și dragostea Noului Legământ. Omul de o sută de ori nu caută să cumpere răsplata lui Dumnezeu și nici să-și câștige mântuirea; el răspunde cu dăruire deplină. În timp, diferența dintre o inimă rezervată și una predată se vede tot mai mult în asemănarea cu Hristos și în rod.`,
    forYourHeart: "Nu trăi întrebând cât de puțin poți da și totuși să fii în regulă. Dragostea întreabă cât de deplin Îi poți aparține Celui care S-a dat deplin pentru tine.",
  },
  {
    chapter: 4, from: 21, to: 25, episodes: [10],
    teaching: `Când Cuvântul aduce în noi viața lui Isus, acea viață devine lumină. O lampă nu este aprinsă ca să fie ascunsă. Mărturia poate fi acoperită de rușinea de a fi cunoscut ca ucenic, de frica oamenilor, de preocuparea excesivă pentru afaceri și carieră sau de lene și lipsă de responsabilitate spirituală. Niciuna dintre acestea nu trebuie să stingă chemarea de a trăi vizibil ca ucenic al lui Hristos.

Isus spune și că ceea ce este ascuns va fi scos la lumină. Expunerea aplică aceasta foarte serios păcatelor și nedreptăților ținute în secret: ceea ce nu este adus la lumină prin pocăință și îndreptare nu poate fi ascuns pentru totdeauna. Iertarea lui Dumnezeu este reală pentru păcatul mărturisit și părăsit; tocmai de aceea frica sănătoasă de Dumnezeu ne cheamă să punem în ordine ceea ce poate fi pus în ordine acum.

«Luați seama la ce auziți.» Noul Legământ nu lucrează prin constrângere exterioară, ci prin răspuns voluntar. Cine este credincios cu puțina lumină, cu puținele resurse și cu puțina înțelegere pe care le are primește mai mult. Dumnezeu ne încredințează adevărate bogății spirituale pe măsura credincioșiei dovedite în lucrurile deja primite.`,
    forYourHeart: "Nu ascunde lumina prin frică, ocupație sau lene. Fii credincios cu ceea ce ți-a dat Dumnezeu azi; mai multă lumină se dă celui care umblă în lumina pe care o are.",
  },
  {
    chapter: 4, from: 26, to: 29, episodes: [11],
    teaching: `Împărăția este asemenea seminței care crește în timp ce omul doarme și se trezește fără să poată produce el însuși creșterea. După ce inima a fost arată prin smerenie și pocăință și Cuvântul a fost primit cu sinceritate și ascultare, viața spirituală nu se maturizează prin tensiune continuă și introspecție obsesivă. Dumnezeu este Cel care sfințește și dă creșterea.

Aceasta nu înseamnă pasivitate. Omul pregătește pământul, seamănă și răspunde la lumină. Dar nu poate fabrica viața, așa cum nu poate trage de un fir de grâu ca să-l facă să crească. Chemarea este să privim la Isus, să răspundem sincer și să avem încredere în lucrarea lui Dumnezeu.

Creșterea vie este lentă și stabilă: întâi firul, apoi spicul, apoi grâul matur. Maturitatea nu se măsoară numai prin cunoștință, ci prin capacitatea de a te da pe tine pentru ca și alții să ajungă la viață și maturitate. Secerișul amintește că dezvoltarea are și un termen: Hristos va veni, iar scopul lui Dumnezeu este un popor ajuns la rod copt.`,
    forYourHeart: "Fă partea ascultării fără să încerci să produci singur creșterea. Privește la Isus și lasă-L pe Dumnezeu să ducă la maturitate ceea ce ai primit de la El.",
  },
  {
    chapter: 4, from: 30, to: 32, episodes: [11],
    teaching: `Grăuntele de muștar pornește foarte mic și ajunge foarte mare. În această expunere, pilda este citită și ca avertisment pentru expresia exterioară a Împărăției pe pământ: Dumnezeu urmărește înainte de toate calitatea, nu mărimea obținută cu orice preț.

O biserică nu trebuie să rămână numeric mică din principiu. Problema apare când dorința de a deveni mare pentru a impresiona îi face pe oameni să sacrifice ucenicia, sfințenia și adevărul. Atunci creșterea exterioară poate depăși sănătatea lăuntrică.

Păsările care ajung în ramuri sunt legate aici de păsările din pilda semănătorului, unde Isus le identifică cu Satan care ia Cuvântul. Aplicarea este un avertisment: acolo unde cantitatea devine mai importantă decât fidelitatea, influențe străine pot găsi loc în interior. Ambiția sănătoasă nu este să impresionăm oamenii prin dimensiune, ci să-I fim plăcuți lui Dumnezeu prin calitate și ascultare.`,
    forYourHeart: "Nu măsura lucrarea lui Dumnezeu numai prin numere. Întreabă dacă ceea ce crește rămâne curat, ascultător și plăcut Lui.",
  },
  {
    chapter: 4, from: 33, to: 34, episodes: [12],
    teaching: `Isus vorbește mulțimii în pilde după cât puteau auzi, dar ucenicilor le explică lucrurile în particular. Expunerea subliniază că Dumnezeu nu urmărește să ofere aceeași măsură de lumină unui om care vrea numai informație și unuia care a ales ucenicia.

Calificarea ucenicilor nu era superioritatea intelectuală. Ei Îl urmaseră pe Domnul și își desprinseseră inima de lucrurile care i-ar fi împiedicat să-I aparțină. Adevărata înțelegere spirituală vine într-o inimă smerită, frântă și temătoare de Dumnezeu. Mintea este folosită, dar nu poate produce singură revelația.

Chiar un învățător nu poate transfera altuia vederea spirituală. Poate explica formulări și doctrină, dar Dumnezeu este Cel care dă înțelegerea lăuntrică. De aceea adevărul auzit public trebuie să fie explicat în inima ucenicului, în părtășia lui personală cu Dumnezeu.`,
    forYourHeart: "Nu te mulțumi să poți explica o doctrină. Cere ca Dumnezeu să o facă lumină trăită în tine prin smerenie, teamă de El și ascultare.",
  },
  {
    chapter: 4, from: 35, to: 41, episodes: [12],
    teaching: `După ce Isus le-a explicat ucenicilor pildele, îi duce într-o situație în care cunoștința lor este testată practic. Furtuna umple corabia, El pare că doarme, iar oamenii care tocmai primiseră explicații spirituale ajung la panică și Îl întreabă dacă Îi pasă că pier.

Aici se descoperă diferența dintre înțelegerea adevărului și credința trăită. Dumnezeu îngăduie uneori vântul, valurile și impresia că nu răspunde tocmai pentru a scoate la lumină cât de mult ne încredem de fapt în grija Lui. Când totul este liniștit, este ușor să credem că avem credință.

Isus este în odihnă în timp ce furtuna încă există. Ucenicii ajung la odihnă numai după ce El liniștește marea. Aceasta este diferența dintre credință și umblarea prin vedere. Credința știe, înainte ca împrejurarea să se schimbe, că Dumnezeu rămâne pe tron și nu-i abandonează pe ai Lui.

De aceea întrebarea lui Isus nu este numai despre vreme: «de ce vă este frică?». Cunoașterea trebuie să crească împreună cu încrederea în Dumnezeu. Scopul furtunii nu este doar să vedem o minune, ci să învățăm odihna pe care Hristos o avea înainte ca valurile să se oprească.`,
    forYourHeart: "Nu aștepta să se liniștească toate ca să te odihnești în Dumnezeu. Credința începe să se odihnească în timp ce valurile încă lovesc corabia.",
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
console.log(`NT Poonen fidelity Mark 3-4: ${reviewed.length} units reviewed; ${reviewedUnits} total raw-transcript-reviewed units.`)
