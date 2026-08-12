#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered-manifest.json")
const targetFile = path.join(dir, "02-marcu.json")
const TRANSCRIPT_COMMIT = "fe97a4dee2849aaf4573a1046397b5194a171b4e"

function fail(message) { console.error(`[NT Poonen fidelity Mark 13] ${message}`); process.exit(1) }
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }

const EPISODES = {
  38: { passage: "Marcu 12:35-13:6", path: ".research/marcu-poonen/transcripts/038-dEy3ONcd3vk.txt", blobSha: "a9e1767dbeddd4b3bf0bdd956ca5822f87fd220e" },
  39: { passage: "Marcu 13:7-13:18", path: ".research/marcu-poonen/transcripts/039-vDBMUbPdddk.txt", blobSha: "240ebdd835eb89c0a2629d6e80e7693c11700c40" },
  40: { passage: "Marcu 13:19-13:37", path: ".research/marcu-poonen/transcripts/040-xrz0ZlWhC-M.txt", blobSha: "60b935b08ca92d65b9d386f3f55e2951b326b1ae" },
}

const PATCHES = [
  {
    chapter: 13, from: 1, to: 13, episodes: [38, 39],
    explanationSource: "poonen-transcript-primary+canonical-exegesis",
    researchSources: ["Daniel 9:27", "2 Tesaloniceni 2:9-12", "1 Timotei 4:1", "Luca 21:12-19"],
    teaching: `Ucenicii sunt impresionați de pietrele și clădirile Templului. Isus le răspunde că nu va rămâne piatră pe piatră. Ceea ce este exterior, monumental și religios poate dispărea; ceea ce Dumnezeu a lucrat în caracter și în viața lăuntrică rămâne. În Noul Legământ, splendoarea unei clădiri, muzica, îmbrăcămintea sau chiar predicarea impresionantă nu sunt măsura realității spirituale. Dumnezeu caută conținutul vieții.

Când ucenicii Îl întreabă despre viitor, primul avertisment al lui Isus este: «Să nu vă înșele cineva.» Expunerea vede înșelarea ca unul dintre marile pericole ale zilelor din urmă: nu numai falsul grosolan, ci convertiri false, sfințenie falsă, vindecări false, daruri false și lucrări care vin în Numele lui Isus fără caracterul Lui. Dumnezeu îngăduie chiar și prezența duhurilor înșelătoare ca test prin care cei ce iubesc adevărul sunt despărțiți de cei care doresc numai religia. 2 Tesaloniceni 2 leagă înșelarea de refuzul iubirii adevărului.

Războaiele, cutremurele și foametea sunt numite «începutul durerilor», nu calendarul prin care putem calcula ziua. În această expunere, ele sunt privite ca semne care se intensifică spre instaurarea Împărăției lui Hristos pe pământ, iar poziția doctrinară este premilenialistă. Dar Isus mută imediat accentul de la curiozitate la pregătire: ucenicii vor fi dați tribunalelor, bătuți și duși înaintea conducătorilor ca mărturie.

Evanghelia trebuie vestită tuturor popoarelor. În persecuție, Isus promite că Duhul Sfânt va da cuvintele necesare. Promisiunea nu încurajează lenea obișnuită sau refuzul pregătirii responsabile, ci îi asigură pe ucenicii aduși pe neașteptate înaintea autorităților că nu vor fi abandonați. Dumnezeu poate da atunci curajul și cuvântul potrivit.

Presiunea va ajunge până la trădări în familie și ură generală față de cei care poartă Numele Lui. Ispita va fi compromisul pentru salvarea vieții, reputației și confortului. «Cine va răbda până la sfârșit va fi mântuit.» Marcu 13 nu este dat în primul rând ca material pentru specialiști în profeție, ci ca pregătire pentru ucenici care trebuie să rămână adevărați când costul fidelității crește.`,
    forYourHeart: "Nu face din profeție o colecție de indicii și pierde porunca principală. Iubește adevărul, cunoaște Cuvântul, caută puterea Duhului și pregătește-te să rămâi credincios sub presiune.",
  },
  {
    chapter: 13, from: 14, to: 27, episodes: [39, 40],
    explanationSource: "poonen-transcript-primary+canonical-exegesis",
    researchSources: ["Daniel 9:27", "Daniel 11-12", "Matei 24:15-31", "Ioan 17:14-15", "1 Tesaloniceni 4:16-17", "Apocalipsa 12-13"],
    teaching: `«Urâciunea pustiirii» preia limbajul lui Daniel și marchează o criză extremă. Expunerea o leagă de un eveniment final în jurul unui templu din Ierusalim și de Antihrist, posibil printr-o imagine sau manifestare idolatră. Dar chiar predica refuză să transforme detaliul într-o obsesie speculativă: ceea ce este necesar va deveni mai clar pentru ucenicii întregi la inimă când timpul se apropie. Important este că ceva urât de Dumnezeu ajunge într-un loc în care nu ar trebui să stea.

Când criza vine, fuga trebuie să fie imediată. Omul de pe acoperiș să nu se întoarcă după bunuri, iar cel din câmp să nu se întoarcă după haină. Pregătirea pentru o asemenea zi începe acum prin desprinderea inimii de lucrurile materiale. Omul care nu poate renunța astăzi la ceea ce posedă va găsi mult mai greu să lase totul când ascultarea devine urgentă.

Isus vorbește despre un necaz fără precedent și spune că zilele vor fi scurtate «din pricina celor aleși». În această expunere, acest lucru arată că ucenicii lui Hristos — Biserica, cei aleși — sunt încă pe pământ în timpul necazului final. Poziția doctrinară este explicit împotriva unei răpiri secrete înainte de necaz. Hristos nu promite că Își va scoate poporul din orice persecuție, ci că îl va păstra de rău și îi va da har să rămână credincios.

Falși hristoși și falși profeți vor arăta semne și minuni și vor încerca să-i înșele chiar pe cei aleși. Puterea supranaturală nu este deci criteriul final al adevărului. Isus ne-a avertizat dinainte tocmai pentru ca minunea, charisma sau afirmația «Hristos este aici, în secret» să nu înlocuiască Cuvântul Lui.

Ordinea prezentată în această expunere este clară: «după necazul acela», semnele cosmice preced apariția vizibilă a Fiului Omului cu putere și slavă; apoi sunt adunați cei aleși. Venirea nu este ascunsă. Este evenimentul public al Regelui. Predica leagă această adunare și de învierea celor morți în Hristos și întâlnirea cu Domnul descrisă în 1 Tesaloniceni 4.

Aceasta este poziția escatologică a sursei și trebuie păstrată ca atare. Cercetarea canonică poate verifica raportul dintre Marcu 13, Matei 24, 1 Tesaloniceni și Apocalipsa, dar nu trebuie să rescrie poziția sursei într-o neutralitate artificială. În același timp, cronologia interpretativă nu trebuie prezentată drept sens lexical al unui cuvânt grecesc.`,
    forYourHeart: "Pregătirea pentru necaz nu începe cu un grafic profetic, ci cu o inimă desprinsă de lucruri, iubitoare de adevăr și gata să rămână credincioasă chiar când ascultarea costă.",
  },
  {
    chapter: 13, from: 28, to: 37, episodes: [40],
    explanationSource: "poonen-transcript-primary+canonical-exegesis",
    researchSources: ["Romani 11:25-29", "Fapte 1:6-8", "1 Tesaloniceni 5:1-8"],
    teaching: `Smochinul îi învață să recunoască apropierea anotimpului fără să pretindă cunoașterea zilei. În această expunere, smochinul este legat de Israel și revenirea poporului evreu în țară și Ierusalim este privită ca un semn profetic al apropierii revenirii lui Hristos. Aceasta este o identificare interpretativă a predicii; textul lui Marcu însuși folosește imaginea sigură a unei ramuri care anunță vara, iar cercetarea canonică trebuie să evalueze separat aplicarea ei la Israel.

«Generația aceasta nu va trece...» este citită aici în legătură cu generația care vede aceste semne. Predica insistă asupra apropierii venirii, dar Isus refuză orice dată: nimeni nu cunoaște ziua sau ceasul. A spune că El este aproape nu înseamnă a calcula anul.

Cuvintele Lui sunt mai stabile decât cerul și pământul. Apoi apare o afirmație uimitoare: în timpul vieții Sale pământești, nici Fiul nu cunoștea ziua sau ceasul. Expunerea leagă aceasta de smerirea reală a întrupării: Fiul etern, egal cu Tatăl, a venit ca Om și a acceptat limitările vieții omenești, fără a folosi independent prerogativele divine pentru Sine. Această explicație cristologică trebuie tratată cu grijă teologică, dar accentul predicii este auto-golirea și dependența Lui de Tatăl.

Și din nou concluzia nu este «calculați», ci «vegheați». Fiecare slujitor primește o lucrare și trebuie să cunoască responsabilitatea încredințată lui. Veghea înseamnă atenție față de păcat, ispită, înșelare și adormirea spirituală. Somnul spiritual apare când lumea eternă nu mai are greutate și omul trăiește ca într-un vis dominat de lucruri materiale.

Isus repetă porunca de a veghea. Poți înțelege greșit unele detalii ale profeției și totuși să fii pregătit; poți construi o schemă foarte sofisticată și totuși să fii nepregătit. Scopul capitolului este un popor curat, treaz, ocupat cu lucrarea dată de Stăpân și gata să-L întâmpine.`,
    forYourHeart: "Nu încerca să afli ceea ce Tatăl nu ți-a dat ca dată. Află ce lucrare ți-a dat, rămâi treaz față de păcat și trăiește astăzi ca un om care Îl așteaptă cu adevărat.",
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
  if (Array.isArray(unit.words) && unit.words.length) unit.wordSource = "Lexical research tracked separately against SBLGNT/STEPBible TBESG; eschatological chronology and typology are interpretive claims, not lexical definitions"
  unit.sourceFidelity = {
    reviewState: "reviewed-against-raw-transcript",
    policy: "poonen-primary-research-only-where-source-is-thin",
    primarySources,
    ...(patch.researchSources?.length ? { supplementalResearch: { kind: "canonical-exegesis", sources: patch.researchSources, rule: "checks canonical fit while preserving the source's explicit eschatological position" } } : {}),
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
console.log(`NT Poonen fidelity Mark 13: ${reviewed.length} units reviewed; ${reviewedUnits} total raw-transcript-reviewed units.`)
