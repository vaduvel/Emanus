#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered-manifest.json")
const targetFile = path.join(dir, "02-marcu.json")
const TRANSCRIPT_COMMIT = "fe97a4dee2849aaf4573a1046397b5194a171b4e"

function fail(message) { console.error(`[NT Poonen fidelity Mark 9] ${message}`); process.exit(1) }
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }

const EPISODES = {
  24: { passage: "Marcu 9:1-9:8", path: ".research/marcu-poonen/transcripts/024-aQq1wg1N2y4.txt", blobSha: "023e6d3ffcf585a7823b196fb3a408ae287ae163" },
  25: { passage: "Marcu 9:9-9:29", path: ".research/marcu-poonen/transcripts/025-KzveBj3iHM0.txt", blobSha: "6c849cdfbc2c36ae9fc0935b1cde413ad3217a4e" },
  26: { passage: "Marcu 9:30-9:40", path: ".research/marcu-poonen/transcripts/026-ZtV7QkeZnIs.txt", blobSha: "60cd74ae6ac56fe830cde1c1a2fda5152c1651fe" },
  27: { passage: "Marcu 9:41-9:50", path: ".research/marcu-poonen/transcripts/027-xsgLNx09FSo.txt", blobSha: "f3b109f7f53dca06153e2c013b95aff1146849f9" },
}

const PATCHES = [
  {
    chapter: 9, from: 1, to: 13, episodes: [24, 25],
    teaching: `Isus spune că unii dintre cei care stau acolo nu vor muri înainte să vadă Împărăția lui Dumnezeu venită cu putere. În această expunere, cuvintele nu sunt împinse până la a doua venire, fiindcă oamenii aceia au murit demult, ci sunt legate de venirea Duhului Sfânt la Cincizecime. Isus promisese că ucenicii vor primi putere când Duhul Sfânt va veni peste ei. Împărăția este guvernarea lui Dumnezeu: puterea Duhului și stăpânirea lui Dumnezeu asupra vieții nu trebuie despărțite. Omul care cere puterea Duhului, dar refuză ca Dumnezeu să-i conducă banii, timpul, limba, ambițiile și toate domeniile vieții, cere putere fără Împărăție.

După ce le vorbise despre cruce, Isus îi duce pe Petru, Iacov și Ioan pe munte și este schimbat la față. Ordinea este importantă: mai întâi calea crucii, apoi slava. O «slavă» care ocolește moartea față de sine este contrafacere. Strălucirea hainelor nu poate fi produsă de niciun înălbitor pământesc; tot astfel, gloria lui Dumnezeu în caracter nu este simpla rafinare a firii omenești, ci ceva supranatural pe care Dumnezeu îl împărtășește.

Moise și Ilie apar ca reprezentanți ai Legii și Profeților. Petru propune trei corturi și, fără să înțeleagă, Îl pune pe Isus pe același nivel cu cei doi mari slujitori. Atunci glasul Tatălui Îl separă pe Fiul de orice alt om: «Acesta este Fiul Meu preaiubit; pe El să-L ascultați.» Noul Legământ nu ne cheamă să așezăm între noi și Hristos un profet, apostol, pastor sau alt om admirat. Dumnezeu poate folosi slujitori, dar mediatorul este unul singur, iar ucenicul trebuie să ajungă să-L cunoască pe Isus personal și să-I audă glasul prin Cuvânt și Duh.

Coborând de pe munte, Isus le interzice din nou publicitatea până după înviere. El nu atrage oamenii prin spectacole supranaturale, ci prin mesajul eliberării de păcat, sfințeniei și părtășiei cu Dumnezeu. Întrebarea despre Ilie Îl duce din nou la suferință: Ioan Botezătorul venise în duhul și puterea lui Ilie și fusese respins. În această expunere, profeția din Maleahi este văzută ca având o împlinire în Ioan și o dimensiune finală prin mărturia credincioasă care pregătește venirea Domnului. Accentul rămâne însă același: slava nu se înțelege corect fără calea suferinței și a crucii.`,
    forYourHeart: "Nu cere puterea Duhului fără guvernarea lui Dumnezeu. Pune-L pe Isus deasupra oricărui om admirat și nu căuta slava pe o cale care ocolește crucea.",
  },
  {
    chapter: 9, from: 14, to: 29, episodes: [25],
    teaching: `La poalele muntelui, ucenicii întâlnesc un copil chinuit de un duh pe care ei nu îl pot scoate. Ei primiseră deja autoritate asupra duhurilor rele, dar darul primit nu lucrează mecanic. Necredința poate lăsa nefolosit ceea ce Dumnezeu a pus la dispoziție. Isus îi include în mustrarea adresată generației necredincioase și nu evită corectarea publică atunci când aceasta este necesară pentru creșterea lor.

Aici se vede și testul inimii celui corectat. Omul care își iubește reputația mai mult decât sfințirea se ofensează când este mustrat. Omul care dorește să fie schimbat primește chiar și o corectare dureroasă dacă ea îl conduce spre credință și ascultare mai adâncă.

Tatăl copilului spune: «Dacă poți face ceva...» Isus întoarce problema spre credința lui: «Dacă poți crede...» Tatăl nu pretinde o credință mare pe care nu o are. Spune cinstit: «Cred; ajută necredinței mele!» Isus primește această sinceritate. O credință mică și reală este mai sănătoasă decât o declarație grandioasă și falsă.

Expunerea aplică aici credința părintelui și la nevoia fizică a copilului, fără a transforma aceasta într-o tehnică prin care un părinte ar putea produce mântuirea copilului sau ar controla orice rezultat. Ideea principală este că necredința nu trebuie tratată ca ceva inevitabil, iar promisiunile lui Dumnezeu trebuie primite cu încredere smerită.

Duhul îl aruncă pe băiat la pământ; Isus îl ridică. Predica folosește contrastul pentru a avertiza împotriva fascinației pentru manifestările în care oamenii sunt aruncați la pământ și împotriva presupunerii că orice fenomen spectaculos vine de la Hristos. După eliberare, ucenicii întreabă în privat de ce au eșuat. Isus le vorbește despre rugăciune; unele tradiții manuscrise adaugă și postul. Rugăciunea și postul nu cumpără putere, ci pregătesc o inimă dependentă de Dumnezeu și capabilă să creadă.`,
    forYourHeart: "Nu pretinde o credință pe care n-o ai. Spune-I Domnului adevărul și cere-I ajutor. Primește corectarea fără să-ți aperi reputația și cultivă dependența de El prin rugăciune.",
  },
  {
    chapter: 9, from: 30, to: 37, episodes: [26],
    teaching: `Isus îi învață din nou că Fiul Omului va fi dat în mâinile oamenilor, ucis și înviat. Ucenicii nu înțeleg, dar se tem să întrebe. Aceasta este o pierdere inutilă: când Scriptura sau calea lui Dumnezeu nu sunt clare, răspunsul sănătos este să căutăm lumină, nu să păstrăm tăcerea din teamă sau rușine.

Și mai izbitor este subiectul pe care îl discută ei în locul crucii: cine este cel mai mare. Isus vorbește despre dăruire și suferință, iar firea lor se ocupă de rang și conducere. Evangheliile nu idealizează începuturile apostolilor. Ei au aceleași ambiții și slăbiciuni omenești pe care le cunoaștem și noi, iar tocmai transformarea lor ulterioară ne încurajează că Dumnezeu poate schimba oameni obișnuiți.

Isus răstoarnă definiția măreției: cine vrea să fie întâi trebuie să fie cel din urmă și slujitorul tuturor. Apoi ia un copil și îl pune în mijloc. Chemarea nu este la copilărie în gândire, ci la smerenie și dependență. Copilul mic nu se bazează pe propria capacitate; depinde de tatăl lui. În Împărăție, această neputință recunoscută este mai valoroasă decât autosuficiența impresionantă.

Expunerea formulează contrastul direct: Dumnezeu nu caută în primul rând abilitatea noastră, ci disponibilitatea. Sentimentul propriei puteri, al propriei competențe și al propriei voințe trebuie frânt până când omul poate spune sincer: «Nu pot de la mine; depind de Tatăl.» Isus Însuși trăiește această dependență, spunând că Fiul nu face nimic de la Sine, ci ceea ce vede pe Tatăl făcând. În adevărata Biserică, cel mai mare nu este cel mai vizibil sau mai înzestrat, ci cel mai smerit.`,
    forYourHeart: "Când nu înțelegi, întreabă. Când vrei să fii mare, coboară. Oferă-I lui Dumnezeu disponibilitatea și slăbiciunea recunoscută, nu o imagine de autosuficiență.",
  },
  {
    chapter: 9, from: 38, to: 50, episodes: [26, 27],
    teaching: `Ioan îi spune lui Isus că au încercat să oprească un om care scotea demoni în Numele Lui pentru că «nu ne urma pe noi». Expunerea vede aici și posibilitatea geloziei: cu puțin înainte, ucenicii înșiși eșuaseră într-o astfel de lucrare. Este ușor să găsim rapid defecte doctrinare sau de grup la cineva care poate face ceea ce noi nu putem. Discernământul rămâne necesar — există contrafaceri și există oameni care fac lucrări spectaculoase fără o viață sfântă — dar critica nu trebuie alimentată de invidie sau spirit sectar. Isus spune să nu-l oprească și îi învață să recunoască lucrarea care nu este împotriva Lui.

Apoi trece de la o lucrare mare la un pahar cu apă. Dumnezeu nu rămâne dator nimănui. Un act mic făcut sincer pentru Hristos nu-și pierde răsplata. Dar motivul contează: lucrări mult mai impresionante pot rămâne fără răsplată când sunt făcute pentru onoarea proprie. În Împărăție, Dumnezeu cântărește nu numai mărimea lucrării, ci inima din spatele ei.

Avertismentul despre a face să cadă un «micuț» este extrem de sever. Cuvintele, bârfa, clevetirea și exemplul nostru pot răni un copil sau un credincios tânăr și îi pot îndepărta de Dumnezeu. Ucenicul întreg la inimă nu întreabă numai «am dreptul să fac aceasta?», ci și «zidește? poate împiedica pe altul?» Pavel va aplica același principiu când este gata să renunțe chiar la un lucru permis dacă prin el îl face pe altul să cadă. Libertatea creștină nu este libertatea de a trăi numai pentru drepturile mele.

Isus folosește apoi imagini radicale despre mână, picior și ochi. Nu poruncește mutilarea literală, ci arată cât de violent trebuie refuzat păcatul: ar fi mai bine să pierdem ceva la fel de folositor ca un mădular decât să păstrăm păcatul care ne distruge. Ochii nu ne sunt luați ca să nu mai putem fi ispitiți; Dumnezeu dorește biruință în timp ce avem posibilitatea de a ceda. Atitudinea lui Isus față de ascultare este: mai bine moarte decât păcat.

Eternitatea cântărește mai mult decât confortul vieții prezente. Imaginea gheenei face păcatul «nespus de păcătos», nu un inconvenient tolerabil. Focul purificării acceptate acum și judecata viitoare nu trebuie confundate, dar avertismentul cere o alegere reală: să lăsăm sarea sfințeniei să lucreze în noi și, în același timp, să trăim în pace unii cu alții.`,
    forYourHeart: "Nu critica din gelozie, nu trăi numai după drepturile tale și nu trata păcatul ca pe un lucru mic. Alege ce zidește pe alții și taie fără compromis ceea ce te trage departe de Dumnezeu.",
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
console.log(`NT Poonen fidelity Mark 9: ${reviewed.length} units reviewed; ${reviewedUnits} total raw-transcript-reviewed units.`)
