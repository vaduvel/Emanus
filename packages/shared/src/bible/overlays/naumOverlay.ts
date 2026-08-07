import { assertCompleteOverlay, type ExplainedBookOverlay } from "../explainedOverlay.js"

const sourceUrl = "https://www.cfcindia.com/through-the-bible/nahum-habakkuk"
const p = (section: string) => ({ kind: "poonen-official" as const, sourceUrl, section })

const NAUM_OVERLAY: ExplainedBookOverlay = {
  bookId: "naum",
  bibleEmanusBookId: "NAM",
  name: "Naum",
  testament: "vt",
  order: 34,
  transcript: sourceUrl,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: [
    {
      number: 1,
      title: "Dumnezeu este încet la mânie, dar nu declară răul nevinovat",
      summary: "Naum vorbește despre judecata Ninivei la mult timp după pocăința din zilele lui Iona. Capitolul ține împreună răbdarea, puterea și dreptatea lui Dumnezeu.",
      units: [{
        from: 1, to: 15,
        heading: "God's Anger and Vengeance",
        teaching: "Tema distinctivă Poonen pentru Naum este «mânia și răzbunarea lui Dumnezeu». Capitolul nu descrie o mânie impulsivă: spune și că DOMNUL este încet la mânie, mare în putere și bun, un loc de refugiu în ziua necazului. Răzbunarea din text este a lui Dumnezeu și nu poate fi transferată credinciosului ca drept de răzbunare personală, etnică sau religioasă.",
        source: p("God's Anger and Vengeance / Determination to Destroy Nineveh"),
        words: [{
          original: "נֹקֵם",
          transliteration: "noqem",
          language: "ebraica",
          meaning: "cel care răzbună/face dreptate împotriva răului; în Naum 1:2 acțiunea aparține DOMNULUI, nu răzbunării private.",
          verseRef: "Naum 1:2",
          lexicalSource: "WLC-OSHB",
        }],
      }],
    },
    {
      number: 2,
      title: "Căderea cetății care părea de neclintit",
      summary: "Naum descrie atacul, panica și golirea Ninivei în imagini rapide de război.",
      units: [{
        from: 1, to: 13,
        heading: "Determination to Destroy Nineveh",
        teaching: "Prima secțiune oficială Poonen descrie hotărârea de a distruge Ninive. Imperiul care impusese frică altora nu este invulnerabil. Descrierea poetică a luptei este profeție de judecată asupra unui imperiu concret și nu un manual de tactică ori un model de violență pentru biserică.",
        source: p("Determination to Destroy Nineveh"),
      }],
    },
    {
      number: 3,
      title: "De ce cade Ninive: sânge, minciună, jaf și exploatare",
      summary: "Ultimul capitol numește motivele judecății și încheie fără promisiunea restaurării cetății asiriene.",
      units: [{
        from: 1, to: 19,
        heading: "Reason for Nineveh's Destruction",
        teaching: "A doua secțiune Poonen este «motivul distrugerii Ninivei». Textul numește cetatea sângeroasă, plină de minciună și jaf și descrie puterea folosită pentru exploatarea popoarelor. Judecata nu este capriciu și nici ostilitate rasială; este răspuns moral la o structură violentă care a persistat după generația ce se smerise în vremea lui Iona.",
        source: p("Reason for Nineveh's Destruction"),
        forYourHeart: "Pocăința unei generații nu poate fi folosită de următoarea ca imunitate în timp ce repetă răul.",
      }],
    },
  ],
}

export const NAUM_EXPLAINED = assertCompleteOverlay(NAUM_OVERLAY, 3)
