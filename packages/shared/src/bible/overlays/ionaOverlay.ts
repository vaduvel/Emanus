import { assertCompleteOverlay, type ExplainedBookOverlay } from "../explainedOverlay.js"

const sourceUrl = "https://www.cfcindia.com/through-the-bible/jonah-micah"
const p = (section: string) => ({ kind: "poonen-official" as const, sourceUrl, section })

const IONA_OVERLAY: ExplainedBookOverlay = {
  bookId: "iona",
  bibleEmanusBookId: "JON",
  name: "Iona",
  testament: "vt",
  order: 32,
  transcript: sourceUrl,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: [
    {
      number: 1,
      title: "Prima trimitere și fuga în direcția opusă",
      summary: "Iona este trimis la Ninive, dar coboară spre Iope și pleacă spre Tarsis. Furtuna îl aduce față în față cu consecința fugii sale.",
      units: [{
        from: 1, to: 17,
        heading: "First Commission",
        teaching: "Structura oficială Poonen numește prima jumătate a cărții «prima însărcinare». Iona primește o poruncă limpede, dar încearcă să fugă de misiunea către un popor dușman. Tema distinctivă Poonen pentru carte este «iubirea lui Dumnezeu pentru toate națiunile»: rezistența profetului contrastează cu preocuparea lui Dumnezeu pentru Ninive. Cererea lui Iona de a fi aruncat în mare aparține narațiunii și nu este model pentru auto-vătămare sau pentru a refuza ajutorul în criză.",
        source: p("First Commission / God's Love for All Nations"),
      }],
    },
    {
      number: 2,
      title: "Rugăciune din adânc și izbăvire",
      summary: "Din pântecele peștelui, Iona se roagă folosind limbajul Psalmilor și recunoaște că mântuirea vine de la DOMNUL.",
      units: [{
        from: 1, to: 10,
        heading: "Harul îl urmărește chiar și pe profetul care a fugit",
        teaching: "Prima însărcinare nu se termină prin abandonarea lui Iona. El este păstrat în mijlocul consecinței fugii și ajunge la mărturisirea că izbăvirea este a DOMNULUI. Semnul peștelui va fi folosit de Iisus ca analogie pentru moartea și învierea Sa. Cartea nu oferă o explicație biologică detaliată a minunii; accentul narativ este suveranitatea lui Dumnezeu asupra mării, creaturii și vieții profetului.",
        source: p("First Commission"),
      }],
    },
    {
      number: 3,
      title: "A doua trimitere: Ninive aude și se smerește",
      summary: "Cuvântul DOMNULUI vine din nou la Iona. De data aceasta merge la Ninive, iar oamenii răspund prin post și întoarcere de la rău.",
      units: [{
        from: 1, to: 10,
        heading: "Second Commission",
        teaching: "Poonen structurează a doua jumătate drept «a doua însărcinare». Dumnezeu nu doar îl restaurează pe Iona, ci îl trimite din nou. Ninive răspunde într-un mod pe care profetul nu îl dorea. Pocăința cetății este legată în text de întoarcerea de la calea rea și de la violență, nu numai de haine, cenușă și post.",
        source: p("Second Commission"),
        forYourHeart: "Un eșec real nu înseamnă neapărat că Dumnezeu nu te mai poate chema la ascultare; dar a doua chemare cere tot ascultare, nu doar ușurarea că ai fost iertat.",
      }],
    },
    {
      number: 4,
      title: "Profetul este mânios tocmai pentru că Dumnezeu este milos",
      summary: "Iona recunoaște că știa caracterul milos al lui Dumnezeu și se supără că Ninive nu este distrusă. Dumnezeu îl învață prin planta care crește și se usucă.",
      units: [{
        from: 1, to: 11,
        heading: "God's Love for All Nations",
        teaching: "Tema distinctivă Poonen ajunge la punctul ei maxim: Iona cunoaște că Dumnezeu este milostiv, îndurător și bogat în bunătate, dar nu vrea ca această milă să ajungă la dușmanii lui. Finalul lasă întrebarea lui Dumnezeu deschisă: dacă Iona are milă de o plantă, cu atât mai mult Dumnezeu are dreptul să aibă milă de o cetate plină de oameni. Aceasta nu minimalizează răul imperial al Ninivei; arată că mila lui Dumnezeu poate chema la pocăință chiar pe cei pe care profetul îi preferă judecați.",
        source: p("God's Love for All Nations"),
        words: [{
          original: "רַב־חֶסֶד",
          transliteration: "rav-hesed",
          language: "ebraica",
          meaning: "bogat/mare în iubire statornică și milă; Iona folosește chiar caracterul milos al lui Dumnezeu ca explicație pentru motivul fugii sale.",
          verseRef: "Iona 4:2",
          lexicalSource: "WLC-OSHB",
        }],
        forYourHeart: "Este posibil să iubești dreptatea în teorie și totuși să fii supărat când Dumnezeu arată milă persoanei pe care tu ai exclus-o din speranță.",
      }],
    },
  ],
}

export const IONA_EXPLAINED = assertCompleteOverlay(IONA_OVERLAY, 4)
