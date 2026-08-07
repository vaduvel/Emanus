import { assertCompleteOverlay, type ExplainedBookOverlay } from "../explainedOverlay.js"

const sourceUrl = "https://www.cfcindia.com/through-the-bible/zephaniah-haggai"
const p = (section: string) => ({ kind: "poonen-official" as const, sourceUrl, section })

const HAGAI_OVERLAY: ExplainedBookOverlay = {
  bookId: "hagai",
  bibleEmanusBookId: "HAG",
  name: "Hagai",
  testament: "vt",
  order: 37,
  transcript: sourceUrl,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: [
    {
      number: 1,
      title: "Cercetați-vă căile și terminați Casa",
      summary: "Poporul își terminase propriile case, dar amâna reconstruirea templului. Hagai îi cheamă să-și cerceteze prioritățile și să reia lucrarea.",
      units: [{
        from: 1,
        to: 15,
        heading: "Complete the Temple",
        teaching: "Tema oficială Poonen este «terminați templul». Hagai repetă chemarea de a lua seama la propriile căi și confruntă amânarea unei însărcinări pe care poporul o primise deja. Textul nu este o formulă prin care finanțarea unei clădiri religioase produce automat prosperitate; vorbește despre mandatul concret de reconstruire al comunității post-exilice.",
        source: p("Complete the Temple"),
        words: [{
          original: "שִׂימוּ לְבַבְכֶם עַל־דַּרְכֵיכֶם",
          transliteration: "simu levavkhem al-darkheikhem",
          language: "ebraica",
          meaning: "«puneți-vă inima asupra căilor voastre» — cercetați atent direcția în care trăiți.",
          verseRef: "Hagai 1:5",
          lexicalSource: "WLC-OSHB",
        }],
      }],
    },
    {
      number: 2,
      title: "Slava Casei, ascultarea și promisiunea pentru Zorobabel",
      summary: "Capitolul încurajează constructorii, vorbește despre curăție și ascultare și se încheie cu o promisiune pentru Zorobabel.",
      units: [{
        from: 1,
        to: 9,
        heading: "The Temple Shall Be Glorious",
        teaching: "Cei care își aminteau templul vechi puteau socoti noua lucrare mică. Hagai îi cheamă la curaj pentru că DOMNUL este cu ei și vorbește despre slava viitoare a Casei. Emanus păstrează promisiunea fără a impune o schemă escatologică suplimentară.",
        source: p("The Temple Shall Be Glorious"),
      }, {
        from: 10,
        to: 19,
        heading: "The Obedient Shall Be Blessed",
        teaching: "Secțiunea oficială Poonen este «cei ascultători vor fi binecuvântați». Hagai leagă binecuvântarea de întoarcerea comunității la ascultarea concretă. Promisiunea nu este un contract universal de câștig financiar pentru orice proiect religios.",
        source: p("The Obedient Shall Be Blessed"),
      }, {
        from: 20,
        to: 23,
        heading: "Zerubbabel Shall Be Honoured",
        teaching: "Mesajul final îl numește pe Zorobabel slujitor ales și inel de pecete. În genealogia lui Matei, Zorobabel apare în linia mesianică. Pasajul rămâne o promisiune adresată lui Zorobabel în această istorie, nu un titlu generic pentru lideri moderni.",
        source: p("Zerubbabel Shall Be Honoured"),
      }],
    },
  ],
}

export const HAGAI_EXPLAINED = assertCompleteOverlay(HAGAI_OVERLAY, 2)
