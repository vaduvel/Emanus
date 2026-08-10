#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered-manifest.json")
const targetFile = path.join(dir, "02-marcu.json")
const TRANSCRIPT_COMMIT = "fe97a4dee2849aaf4573a1046397b5194a171b4e"

function fail(message) { console.error(`[NT Poonen fidelity Mark 8] ${message}`); process.exit(1) }
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }

const EPISODES = {
  21: { passage: "Marcu 7:31-8:10", path: ".research/marcu-poonen/transcripts/021-MZJzcxtKzKM.txt", blobSha: "602165042dffc6e500afb16ec423d0c8caebe42a" },
  22: { passage: "Marcu 8:11-8:26", path: ".research/marcu-poonen/transcripts/022-uGphatpNfQs.txt", blobSha: "9dc29d21b48a9314dd9cbb0a5b3dc989a3a88a3d" },
  23: { passage: "Marcu 8:27-8:38", path: ".research/marcu-poonen/transcripts/023-ZnBXW12bd90.txt", blobSha: "f49e2f6ae3434d056ae4c86dee7d13d935f4ecfa" },
}

const PATCHES = [
  {
    chapter: 8, from: 1, to: 10, episodes: [21],
    teaching: `Mulțimea rămâne cu Isus trei zile și ajunge fără mâncare. El nu vede numai interesul lor spiritual, ci și slăbiciunea trupului: «Mi-e milă de mulțime.» Un om spiritual nu devine atât de preocupat de predică încât să uite nevoia fizică a celor cărora le slujește. Compasiunea lui Hristos privește omul întreg.

Ucenicii fuseseră deja martori la hrănirea celor cinci mii și totuși întreabă din nou de unde ar putea veni pâinea în pustiu. Necredința uită repede lucrările trecute ale lui Dumnezeu și tratează noua nevoie ca și cum El nu ar mai fi același. Omul spiritual învață să spună: Dumnezeul care a purtat de grijă atunci poate purta de grijă și acum.

Isus ia cele șapte pâini, mulțumește, le frânge și le dă ucenicilor ca să le împartă. Același tipar reapare: ceea ce punem pe altar trebuie binecuvântat de Dumnezeu și apoi frânt înainte să devină hrană pentru alții. Frângerea lovește mândria, autosuficiența și sentimentul că suntem mari. Nu este suficient să fim oameni «buni»; Dumnezeu ne face și mici, ca darul să nu fie otrăvit de ego.

Mulțimea mănâncă și se satură. La sfârșit rămân șapte coșuri, iar surplusul este strâns. Abundența nu dă dreptul la risipă. Principiul se aplică banilor, timpului și resurselor: tocmai omul care primește mult trebuie să învețe să nu arunce fragmentele pe care Dumnezeu i le-a dat pentru folosire.`,
    forYourHeart: "Adu-ți aminte de purtarea de grijă trecută, pune-I Domnului tot ce ai și lasă-L să frângă autosuficiența. Nu risipi ceea ce rămâne doar pentru că ai primit din belșug.",
  },
  {
    chapter: 8, from: 11, to: 21, episodes: [22],
    teaching: `Fariseii Îi cer lui Isus un semn din cer ca să-L pună la încercare. El suspină și refuză. Dorința după o demonstrație supranaturală nu este automat spiritualitate. Isus nu este magicianul unei scene religioase și nu folosește puterea lui Dumnezeu ca să satisfacă curiozitatea sau ca să-Și construiască reputația. Minunile Lui pornesc din compasiune pentru nevoia omului, nu din dorința de spectacol.

În altă parte, semnul fundamental indicat este moartea și învierea Fiului Omului. Centrul mărturiei creștine nu este o succesiune de demonstrații care să-l impresioneze pe sceptic, ci Hristos care a intrat în moarte și a biruit-o.

În corabie, Isus îi avertizează pe ucenici cu privire la «aluatul fariseilor» și «aluatul lui Irod». În această expunere, primul este ipocrizia religioasă: exteriorul corect care ascunde o viață lăuntrică stricată. Al doilea este compromisul lumesc, păcatul și imoralitatea pe care Irod le întruchipase. Ucenicul trebuie să se ferească atât de corupția ascunsă sub religie, cât și de corupția care se afișează deschis.

Ucenicii aud «aluat» și se gândesc imediat la pâinea pe care au uitat-o. Mintea ocupată de lucrurile pământești poate transforma chiar și Cuvântul lui Dumnezeu într-un mesaj despre preocupările ei. De aceea două persoane pot citi aceleași versete și una să caute pe Hristos, iar alta justificare pentru lăcomie, confort sau ambiție. Ceea ce dorim în adânc influențează ceea ce pretindem că găsim în Scriptură. Isus îi trimite înapoi la cele două minuni cu pâini și îi întreabă: «Tot nu înțelegeți?»`,
    forYourHeart: "Nu cere semne ca să-ți hrănești curiozitatea și nu citi Biblia ca să găsești justificare pentru ceea ce ai decis deja să dorești. Păzește-te de ipocrizie și de compromis în aceeași măsură.",
  },
  {
    chapter: 8, from: 22, to: 26, episodes: [22],
    teaching: `La Betsaida, Isus ia un orb de mână și îl scoate afară din sat înainte să-l vindece. Expunerea leagă acest gest de împietrirea Betsaidei, cetate mustrată în alte Evanghelii pentru că văzuse multe lucrări și nu se pocăise. Omul este scos din mediul care refuzase lumina și, după vindecare, primește porunca să nu se întoarcă în sat. Aplicarea este un avertisment împotriva părtășiei care ne ține legați de un sistem religios nepocăit.

Vindecarea este neobișnuită: după prima atingere, omul vede, dar neclar — oamenii îi par ca niște copaci care umblă. Isus nu-i cere să declare că vede perfect. Omul spune cinstit ce experimentează, iar Domnul îl atinge din nou. Abia apoi vede limpede.

Aceasta demască ideea că «credința» înseamnă să spui că ești vindecat când nu ești. O afirmație falsă nu devine credință fiindcă este rostită religios. Isus primește adevărul spus de om și continuă să lucreze. Dacă vederea este numai parțială, răspunsul sănătos este să-I cerem Domnului o atingere mai adâncă, nu să numim claritate ceea ce încă este confuzie.

Expunerea aplică imaginea și spiritual: avem nevoie să vedem clar diferența dintre oameni și lucruri. Lucrurile sunt pentru folosit; oamenii sunt pentru iubit. Când punem banii, proprietatea sau obiectele pe același nivel cu persoanele, vederea noastră are încă nevoie de vindecare.`,
    forYourHeart: "Fii sincer cu Dumnezeu despre cât vezi și cât nu vezi. Nu numi vindecat ceea ce încă doare și nu pune lucrurile pe același nivel cu oamenii.",
  },
  {
    chapter: 8, from: 27, to: 30, episodes: [23],
    teaching: `Pe drum spre Cezareea lui Filip, Isus întreabă ce spun oamenii despre El, apoi face întrebarea personală: «Dar voi cine spuneți că sunt?» Petru răspunde: «Tu ești Hristosul.» O astfel de cunoaștere nu este rezultatul inteligenței religioase. În relatarea paralelă, Isus spune că Tatăl i-a descoperit lui Petru ceea ce carnea și sângele nu puteau produce. El dorea ca ucenicii care umblau cu El să ajungă la revelație, nu numai la informație.

Imediat după mărturisire, Isus le poruncește să nu spună nimănui. Mai târziu, după înviere, îi va trimite în toată lumea să vestească. Același adevăr putea fi greșit spus la timpul nepotrivit. Spiritualitatea nu înseamnă numai să cunoști lucrul corect, ci și să înțelegi timpul lui Dumnezeu pentru a-l spune și a-l face.

Petru primise lumină reală despre identitatea lui Hristos, dar capitolul va arăta că revelația într-un domeniu nu îl făcuse automat matur în toate celelalte. Putem cunoaște adevărat cine este Isus și totuși să avem nevoie de multă lumină despre calea Lui.`,
    forYourHeart: "Cere nu doar răspunsul corect, ci revelație și călăuzire pentru momentul corect. Lumina primită ieri nu înlocuiește dependența de Duhul astăzi.",
  },
  {
    chapter: 8, from: 31, to: 38, episodes: [23],
    teaching: `După ce ucenicii încep să înțeleagă cine este El, Isus le vorbește deschis despre suferință, respingere, moarte și înviere. Nu le spusese aceasta de la început; acum era timpul potrivit. Petru Îl ia deoparte și Îl mustră. Face aceasta cu o inimă care Îl iubește, dar o intenție bună poate fi complet greșită când nu înțelege căile lui Dumnezeu.

Isus răspunde foarte sever: «Înapoia Mea, Satano!», pentru că Petru gândea interesele omului, nu interesele lui Dumnezeu. Firea caută conservarea de sine, onoarea, confortul și evitarea suferinței; Duhul conduce pe calea pe care a mers Isus, calea crucii și a morții față de viața centrată pe sine. Diferența dintre gândirea lui Dumnezeu și gândirea omului nu este o mică abatere, ci poate fi ca distanța dintre cer și pământ.

Chemarea ucenicului este clară: să se lepede de sine, să-și ia crucea și să-L urmeze. Lepădarea de sine nu este ura față de propria existență, ci refuzul de a lăsa viața adamică, centrată pe propriul câștig, propria onoare, propriul confort și propria plăcere, să conducă. Crucea pune în practică acel refuz: viața centrată pe sine este dată morții pentru ca viața lui Hristos să se formeze în noi.

În 8:35–37, expunerea observă explicit că termenul grecesc tradus prin «viață/suflet» se referă la viața sufletească, la persoana și viața de sine pe care omul încearcă s-o păstreze. Această observație trebuie verificată lexical separat, dar accentul predicii este limpede: omul care își organizează viața ca să-și păstreze sinele ajunge să piardă tocmai scopul pentru care i-a fost dat sufletul. Câștigarea lumii, a banilor, a poziției sau chiar a unei slujiri impresionante nu poate compensa un caracter care rămâne egoist și netransformat.

Miza este transformarea persoanei în asemănarea cu Hristos. Calea pierderii de sine devine calea adevăratului câștig; calea smereniei devine calea înălțării lui Dumnezeu. De aceea Isus încheie și cu avertismentul despre rușinea de El și de cuvintele Lui. Ucenicul nu este chemat să-și ascundă identitatea pentru a-și proteja reputația la serviciu, în familie sau înaintea lumii. Cel care nu S-a rușinat să moară pentru noi este vrednic să fie mărturisit fără rușine.`,
    forYourHeart: "Nu lăsa o inimă bine intenționată să te convingă să ocolești crucea. Întreabă unde îți aperi onoarea, confortul sau câștigul și alege acolo interesele lui Dumnezeu.",
    sermonExplainsGreek: true,
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
    unit.wordSource = patch.sermonExplainsGreek
      ? "The sermon explicitly discusses the Greek soul-life distinction in Mark 8:35-37; lexical claims still require independent verification against SBLGNT/STEPBible TBESG"
      : "Lexical research tracked separately against SBLGNT/STEPBible TBESG; Greek glosses are not attributed to the sermon source unless explicitly stated there"
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
console.log(`NT Poonen fidelity Mark 8: ${reviewed.length} units reviewed; ${reviewedUnits} total raw-transcript-reviewed units.`)
