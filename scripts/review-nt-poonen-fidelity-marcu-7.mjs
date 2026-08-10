#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered-manifest.json")
const targetFile = path.join(dir, "02-marcu.json")
const TRANSCRIPT_COMMIT = "fe97a4dee2849aaf4573a1046397b5194a171b4e"

function fail(message) { console.error(`[NT Poonen fidelity Mark 7] ${message}`); process.exit(1) }
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }

const EPISODES = {
  19: { passage: "Marcu 7:1-7:13", path: ".research/marcu-poonen/transcripts/019-YyiGTG48_7Y.txt", blobSha: "008f2117a5bb77343f658a8c86d20fed6bdaa82a" },
  20: { passage: "Marcu 7:14-7:30", path: ".research/marcu-poonen/transcripts/020-HWe6VooFIXI.txt", blobSha: "57946244ae2c382e96cad52d26f1c1fec6bbe54a" },
  21: { passage: "Marcu 7:31-8:10", path: ".research/marcu-poonen/transcripts/021-MZJzcxtKzKM.txt", blobSha: "602165042dffc6e500afb16ec423d0c8caebe42a" },
}

const PATCHES = [
  {
    chapter: 7, from: 1, to: 13, episodes: [19],
    teaching: `Fariseii îi critică pe ucenici pentru că mănâncă fără spălarea rituală a mâinilor. Obiceiul putea fi folositor ca igienă, dar problema începe când un obicei bun este ridicat la rangul de poruncă și cerut altora ca și cum Dumnezeu Însuși l-ar fi cerut. A adăuga la Cuvânt, a scoate din el sau a supraaccentua o parte până când alta dispare sunt căi prin care tradiția ajunge să ia locul adevărului.

Rădăcina nu este numai o interpretare slabă a Scripturii. Isus îi numește fățarnici. Buzele Îl onorează pe Dumnezeu, dar inima poate iubi banii, poziția, lumea sau onoarea. Când inima este împărțită, studiul biblic poate rămâne intelectual și totuși să ajungă la concluzii spirituale greșite. De aceea problema nu se rezolvă numai prin mai multă informație; omul trebuie să judece ipocrizia din propria inimă și să caute luminarea Duhului asupra sensului și spiritului Cuvântului.

Isus arată trei trepte ale alunecării: porunca lui Dumnezeu este mai întâi neglijată, apoi dată la o parte pentru tradiție și, în cele din urmă, anulată practic. Exemplul este «Corban». Un om putea declara bunurile dedicate lui Dumnezeu și apoi folosi această etichetă religioasă ca să evite grija față de părinții săi. Ce pare foarte spiritual poate fi, în realitate, o metodă de a ocoli ascultarea costisitoare.

A-L pune pe Dumnezeu mai presus de familie nu înseamnă a refuza responsabilitatea față de părinți. Isus nu Și-a lăsat familia să-I conducă misiunea, dar pe cruce S-a îngrijit de mama Lui. Adevărata spiritualitate nu folosește consacrarea drept pretext pentru a scăpa de obligațiile pe care Dumnezeu le-a poruncit.`,
    forYourHeart: "Întreabă-te dacă ai transformat o preferință bună într-o poruncă pentru alții sau dacă folosești un limbaj spiritual ca să eviți o ascultare incomodă. Standardul rămâne Cuvântul lui Dumnezeu.",
  },
  {
    chapter: 7, from: 14, to: 23, episodes: [20],
    teaching: `Isus mută discuția de la mâini și mâncare la inimă. Ceea ce intră în stomac nu pătrunde în centrul moral al omului; Marcu explică faptul că, prin aceasta, Isus declara toate alimentele curate. Restricțiile alimentare ale Vechiului Legământ arătau spre o realitate spirituală mai adâncă, iar Noul Legământ aduce accentul pe curăția inimii.

Aceasta nu înseamnă că igiena sau sănătatea trupului nu contează. O mâncare contaminată poate îmbolnăvi trupul. Isus vorbește însă despre o întinare incomparabil mai gravă: răul primit și păstrat în inimă. Gândurile rele, imoralitatea, furtul, uciderea, adulterul, lăcomia, viclenia, invidia, defăimarea și mândria nu intră în om din farfurie; ele pornesc din lăuntru.

Acțiunile încep în gând. Ispita bate la ușa inimii prin dorințele firii, iar păcatul se naște când omul primește, savurează și consimte la ceea ce știe că este rău. De aceea curăția inimii cere mai multă atenție decât igiena exterioară. Putem fi foarte exacți cu lucrurile care afectează trupul și foarte neglijenți cu amărăciunea, pofta, mândria sau invidia care corup viața lăuntrică.

Biruința nu vine numai din încordare. Inima trebuie întărită prin har. Isus a fost ispitit și totuși nu a primit păcatul în inimă; El ne cheamă să-L urmăm și ne dă prin Duhul Sfânt puterea de a refuza ceea ce caută intrare.`,
    forYourHeart: "Păzește-ți inima mai atent decât îți păzești masa. Judecă gândul rău înainte să devină dorință hrănită, cuvânt sau faptă, și caută harul lui Dumnezeu pentru o inimă curată.",
  },
  {
    chapter: 7, from: 24, to: 30, episodes: [20],
    teaching: `În ținutul Tirului, o femeie dintre neamuri cade la picioarele lui Isus și Îl roagă pentru fiica ei. Răspunsul despre copiii care trebuie hrăniți mai întâi și despre căței o așază într-un loc în care nu poate veni cu pretenții. Ea nu se apără, nu revendică un drept și nu se supără. Acceptă locul smerit și răspunde cu credință: chiar și cățeii primesc firimiturile copiilor.

Aici se întâlnesc smerenia și credința. Omul începe să primească harul când încetează să-I spună lui Dumnezeu ce merită și recunoaște că nu merită nimic. Tocmai această femeie, care nu se prezintă ca având drepturi de copil al lui Israel, primește ceea ce mulți dintre cei privilegiați nu primeau din cauza mândriei.

Cuvintele aspre nu înseamnă dispreț. Isus mersese o distanță mare până în regiunea aceea și, în relatare, această femeie este motivul central al opririi. El nu parcurge drumul ca s-o umilească, ci ca s-o ajute, însă o conduce într-un loc al smereniei în care credința ei poate răspunde.

Din cauza răspunsului ei, Isus îi spune că duhul a ieșit din fiica ei. Ea se întoarce acasă și găsește copilul eliberat. Harul lui Dumnezeu nu este atras de pretenție, ci primit de o inimă smerită care Îl crede.`,
    forYourHeart: "Renunță la argumentul «merit». Vino cu smerenie și credință. Harul nu este salariul omului bun, ci darul lui Dumnezeu pentru cel care se încrede în El.",
  },
  {
    chapter: 7, from: 31, to: 37, episodes: [21],
    teaching: `În Decapole, oamenii aduc la Isus un om surd care vorbește cu greu. Isus îl ia deoparte din mulțime. Nu îl transformă într-un spectacol, ci îi acordă atenție personală. Îi atinge urechile și limba și Se identifică într-un mod foarte concret cu nevoia lui. Ar fi putut vindeca printr-un cuvânt de la distanță, dar aici atingerea arată compasiune și apropiere.

Privind spre cer, Isus oftează și spune: «Efata» — «Deschide-te». Urechile se deschid și vorbirea se limpezește. Minunile lui Isus sunt prezentate ca lucrări supranaturale reale, nu ca autosugestie. În această vindecare rezultatul este imediat și complet.

Totuși Isus poruncește din nou să nu-I fie făcută publicitate. Vindecarea nu este scopul principal pentru care a venit. El nu vrea ca lucrarea de mântuire și chemarea la pocăință să fie înghițite de reputația de făcător de minuni.

Mulțimea spune: «Toate le face bine.» La nivelul lor, spun aceasta pentru că au văzut o vindecare. Credința Noului Legământ merge mai departe: poate spune că El face toate lucrurile bine și atunci când o boală rămâne, când un «țepuș» nu este îndepărtat sau când împrejurările nu se schimbă după dorința noastră. Bunătatea Lui nu este dovedită numai de rezultatul fizic pe care îl vedem acum.`,
    forYourHeart: "Poți spune că El face toate lucrurile bine numai după ce primești răspunsul dorit? Credința învață să se încreadă în bunătatea Lui și când suferința nu dispare imediat.",
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
    unit.wordSource = "Lexical research tracked separately against SBLGNT/STEPBible TBESG; Greek/Aramaic glosses are not attributed to the sermon source unless explicitly stated there"
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
console.log(`NT Poonen fidelity Mark 7: ${reviewed.length} units reviewed; ${reviewedUnits} total raw-transcript-reviewed units.`)
