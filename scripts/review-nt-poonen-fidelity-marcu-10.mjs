#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered-manifest.json")
const targetFile = path.join(dir, "02-marcu.json")
const TRANSCRIPT_COMMIT = "fe97a4dee2849aaf4573a1046397b5194a171b4e"

function fail(message) { console.error(`[NT Poonen fidelity Mark 10] ${message}`); process.exit(1) }
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }

const EPISODES = {
  28: { passage: "Marcu 10:1-10:12", path: ".research/marcu-poonen/transcripts/028-sdTy0vQ188U.txt", blobSha: "92bfbe8362aef2d5e5f1475ae698bdfd7a36ffad" },
  29: { passage: "Marcu 10:13-10:22", path: ".research/marcu-poonen/transcripts/029-NlKvWX_MbQI.txt", blobSha: "4df8c552c46d0298a95fbe23a023f802190e67b4" },
  30: { passage: "Marcu 10:23-10:34", path: ".research/marcu-poonen/transcripts/030-p2CTVCHu8TM.txt", blobSha: "14addaf38e2d91dba2dad122c99f93c7ad968bb6" },
  31: { passage: "Marcu 10:35-10:45", path: ".research/marcu-poonen/transcripts/031-_m24ZNAt7fo.txt", blobSha: "8ee76fa68b15e6416d32a422b5a2c76fea644fdb" },
  32: { passage: "Marcu 10:46-11:10", path: ".research/marcu-poonen/transcripts/032-diS_8aor1Pc.txt", blobSha: "fc77350c95b46bd0543983c3fbcae44f969b52a3" },
}

const PATCHES = [
  {
    chapter: 10, from: 1, to: 12, episodes: [28],
    explanationSource: "poonen-transcript-primary+canonical-exegesis",
    researchSources: ["Geneza 1:27", "Geneza 2:24", "Deuteronom 24:1-4", "Matei 5:31-32", "Matei 19:3-12"],
    teaching: `Fariseii Îl întreabă pe Isus despre divorț nu pentru că vor sincer lumină, ci ca să-L prindă în conflict cu Legea. El nu răspunde rămânând la nivelul concesiei din Deuteronom, ci merge înapoi înainte de cădere, la intenția Creatorului: Dumnezeu a făcut bărbat și femeie, omul își lasă tatăl și mama, se lipește de soția lui și cei doi devin un singur trup. Ceea ce Dumnezeu unește nu trebuie tratat ca un contract de consum care poate fi desfăcut după conveniență.

Isus spune că Moise a permis certificatul de despărțire din cauza împietririi inimii. Expunerea vede aici o diferență fundamentală între concesiile Vechiului Legământ și standardul Noului Legământ. Legea veche a pus garduri în jurul unui popor cu inima încă împietrită; promisiunea nouă este o inimă schimbată, în care Duhul scrie voia lui Dumnezeu. De aceea faptul că anumite lucruri au fost tolerate în vechea economie nu înseamnă că ele exprimă idealul creației sau standardul pentru omul înnoit.

«A lăsa pe tată și pe mamă» nu anulează grija față de părinți. Descrie transferul centrului relațional: după căsătorie, soțul și soția formează o nouă unitate, iar părinții, copiii, serviciul, averea sau orice altă relație nu trebuie să intre între cei pe care Dumnezeu i-a unit. Unitatea conjugală cere și o desprindere emoțională sănătoasă de controlul familiei de origine, fără abandonarea responsabilității față de ea.

În casă, Isus spune direct că divorțul urmat de o altă căsătorie înseamnă adulter. În această expunere, standardul este păstrat foarte strict: legământul căsătoriei este pentru viață, iar recăsătorirea cât timp partenerul trăiește nu este tratată ca o ieșire normală dintr-o căsătorie ruptă. Predica interpretează și clauza din Matei într-un mod restrictiv, legat de imoralitatea descoperită la începutul unirii, și nu o folosește ca permisiune generală pentru recăsătorire. Aceasta este o concluzie interpretativă a expunerii; sensul lexical al lui «porneia» și raportul dintre textele sinoptice trebuie verificate separat în stratul de cercetare, fără a pretinde că termenul grecesc în sine dovedește automat întreaga construcție doctrinară.

În orice caz, punctul central al lui Marcu rămâne fără echivoc: Isus mută discuția de la găsirea unei portițe juridice la fidelitatea față de proiectul lui Dumnezeu din creație și la o inimă care nu mai caută cum să scape de legământ.`,
    forYourHeart: "Nu porni de la întrebarea «cât îmi este permis să rup?». Pornește de la ceea ce Dumnezeu a vrut să unească și cere-I o inimă moale, credincioasă și gata să iubească după standardul Lui.",
  },
  {
    chapter: 10, from: 13, to: 31, episodes: [29, 30],
    teaching: `După cuvintele despre căsătorie, oamenii Îi aduc lui Isus copii, iar ucenicii îi opresc. Isus Se mânie și îi cheamă la El. Dumnezeu nu seamănă cu liderii religioși care au timp numai pentru adulți importanți. Dragostea lui Isus pentru copii este parte din caracterul Lui, iar Împărăția trebuie primită cu ceva din smerenia și dependența copilului. El îi ia în brațe și îi binecuvântează; predica observă că nu îi botează, ci îi binecuvântează, folosind aceasta ca model pentru copii înainte de credința personală.

Apoi vine omul bogat, moral și serios, care dorește viața veșnică. Isus enumeră porunci pe care omul spune că le-a păzit și îl privește cu dragoste. Problema lui nu este o viață exterioară scandaloasă, ci lucrul care îi stăpânește inima. Chemarea «vinde tot, dă săracilor și urmează-Mă» nu este prezentată ca o formulă identică pentru orice credincios. Isus nu a cerut aceasta fiecărui om bogat. Pentru acesta este operația radicală necesară tocmai fiindcă iubirea banilor îi cuprinsese viața.

Averea primită de la Dumnezeu nu este dată numai pentru autosatisfacție. Omul bogat își imaginase poate că respectase porunca împotriva poftei fiindcă nu râvnise bunul vecinului; Isus descoperă însă atașamentul lui de ceea ce considera exclusiv «al lui». În fața alegerii dintre comoara de pe pământ și comoara din cer, el pleacă trist. Isus nu-i cere să doneze banii Lui sau organizației Lui; îi cere să scape de stăpânirea lor și apoi să vină fără ei să-L urmeze.

De aceea bogăția face intrarea în Împărăție dificilă. În această expunere «bogat» este extins dincolo de bani la orice lucru în care omul se simte mare: talent, inteligență, frumusețe, poziție, familie, reputație sau dreptate proprie. Nu aceste daruri trebuie distruse, ci mândria și autosuficiența legate de ele. Cămila trebuie, ca imagine, să devină mică. Ce este imposibil omului poate face Dumnezeu: El poate smeri omul până când nu-și mai pune încrederea în ceea ce lumea admiră.

Petru compară renunțarea ucenicilor cu plecarea omului bogat. Isus spune că Dumnezeu nu rămâne dator nimănui: cine pierde relații, casă sau bunuri pentru El și pentru Evanghelie primește o familie spirituală și purtarea de grijă a lui Dumnezeu, dar «împreună cu persecuții». Urmarea Lui nu este o schemă de îmbogățire. Și avertismentul rămâne: mulți dintre cei care par primii acum pot fi ultimii atunci când motivele, viața ascunsă și caracterul sunt scoase la lumină. Dumnezeu vede inima, nu numai sacrificiul vizibil.`,
    forYourHeart: "Primește Împărăția cu mâinile goale. Întreabă ce lucru bun, dar iubit prea mult, te face mare în ochii tăi și te împiedică să-L urmezi liber pe Hristos.",
  },
  {
    chapter: 10, from: 32, to: 45, episodes: [30, 31],
    teaching: `Drumul urcă spre Ierusalim, iar Isus merge înainte cu hotărâre, știind că Îl așteaptă condamnarea, batjocura, scuiparea, biciuirea și moartea. El nu Se retrage fiindcă suferința, umilirea și moartea se află în voia Tatălui. A-L urma înseamnă și aceasta: când ascultarea cere moarte față de reputație, ego, dorința de a răspunde loviturii sau confortul personal, ucenicul își fixează fața spre voia lui Dumnezeu, nu spre conservarea sinelui. Crucea este urmată de înviere, dar drumul spre înviere nu ocolește moartea.

Chiar după această vestire, Iacov și Ioan cer locurile din dreapta și stânga în slavă. Dorința poate suna spiritual — nu cer onoare pe pământ, ci «în slavă» — și totuși rădăcina poate rămâne iubirea poziției. Aici apare o distincție esențială: Satan a dorit asemănarea cu Dumnezeu în poziție, autoritate și onoare; Duhul Sfânt ne cheamă la asemănarea cu Dumnezeu în caracter, sfințenie, smerenie și dragoste.

Isus nu le spune numai că au cerut greșit, ci le arată calea către adevărata apropiere de El: paharul și botezul suferinței. În această predică sunt deosebite botezul în apă, botezul în Duhul Sfânt și «botezul» suferinței. Primele două sunt prezentate ca intrări decisive, iar participarea la suferința și smerirea lui Hristos continuă de-a lungul vieții. Iacov și Ioan se cred capabili; Isus știe că, prin har, vor ajunge într-adevăr să bea paharul, deși atunci încă nu-și cunosc slăbiciunea.

Când ceilalți zece se indignează, nu înseamnă că sunt mai curați; este posibil să fi dorit aceleași locuri și să fie supărați că ceilalți au întrebat primii. Isus cheamă toată grupa și opune modelul Împărăției modelului conducătorilor care «stăpânesc peste» oameni. Măreția nu constă în a avea oameni sub autoritatea ta, ci în a deveni slujitorul lor. Autoritatea pe care Tatăl I-a dat-o Fiului este folosită pentru a da viață, nu pentru autoînălțare.

Fiul Omului nu a venit să I se slujească, ci să slujească și să-Și dea viața ca răscumpărare pentru mulți. Aceasta este măsura conducerii creștine: cât de mult din caracterul, smerenia și slujirea lui Hristos se vede, nu cât de aproape stă omul de centrul scenei.`,
    forYourHeart: "Nu cere locul de lângă Hristos pentru onoarea lui. Cere caracterul Lui și acceptă calea Lui: smerire, slujire, cruce și viață dată pentru alții.",
  },
  {
    chapter: 10, from: 46, to: 52, episodes: [32],
    teaching: `Bartimeu este orb și cerșetor. Expunerea îl folosește ca imagine a stării noastre naturale: săraci spiritual și orbi față de valorile veșnice, chiar dacă ochii ne sunt larg deschiși spre bani, onoare, plăcere și lucrurile care satisfac firea. Primul pas este să recunoaștem că nu avem în noi înșine vederea și bogăția de care avem nevoie.

Isus trece pe lângă el, iar Bartimeu strigă. Harul nu îl forțează pe fiecare cerșetor să primească; omul trebuie să cheme Numele Domnului. Când mulțimea încearcă să-l reducă la tăcere, el strigă și mai tare. Tot astfel, glasurile care spun «ai păcătuit prea mult», «Dumnezeu nu te mai ascultă» sau «situația ta este prea rea» nu trebuie lăsate să închidă rugăciunea. Cât timp omul trăiește, chemarea la pocăință și întoarcere rămâne deschisă.

Isus Se oprește și îl cheamă. Apoi îl întreabă: «Ce vrei să fac pentru tine?» Cerșetorul spusese deja «ai milă», dar Isus îl conduce la o cerere precisă. Rugăciunea vagă poate ascunde faptul că nici noi nu știm ce cerem. După începutul vieții cu Dumnezeu, când ne vedem păcatul trebuie să-l numim concret: mânia, pofta, iubirea banilor, mândria, egoismul, iritarea — nu numai să rostim formule generale.

Bartimeu cere vederea și o primește prin credință. Apoi folosește vederea tocmai pentru a-L urma pe Isus pe drum. Darurile, sănătatea, energia, banii și lumina spirituală nu sunt date ca să vedem mai clar lumea după care să poftim, ci ca să-L vedem și să-L urmăm mai limpede pe Domnul.`,
    forYourHeart: "Nu lăsa glasurile de condamnare să-ți oprească strigătul. Spune-I Domnului concret ce ai nevoie și folosește ce primești ca să-L urmezi mai aproape.",
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
  unit.explanationSource = patch.explanationSource ?? "poonen-transcript-primary"
  if (Array.isArray(unit.words) && unit.words.length) {
    unit.wordSource = "Lexical research tracked separately against SBLGNT/STEPBible TBESG; Greek glosses are not attributed to the sermon source unless explicitly stated there"
  }
  unit.sourceFidelity = {
    reviewState: "reviewed-against-raw-transcript",
    policy: "poonen-primary-research-only-where-source-is-thin",
    primarySources,
    ...(patch.researchSources?.length ? {
      supplementalResearch: {
        kind: "canonical-exegesis",
        sources: patch.researchSources,
        rule: "supplements and checks the source; interpretive conclusions are not relabeled as lexical facts",
      },
    } : {}),
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
console.log(`NT Poonen fidelity Mark 10: ${reviewed.length} units reviewed; ${reviewedUnits} total raw-transcript-reviewed units.`)
