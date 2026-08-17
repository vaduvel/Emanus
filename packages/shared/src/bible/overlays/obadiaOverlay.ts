import { assertCompleteOverlay, type ExplainedBookOverlay } from "../explainedOverlay.js"

const sourceUrl = "https://www.cfcindia.com/through-the-bible/amos-obadiah"
const p = (section: string) => ({ kind: "poonen-official" as const, sourceUrl, section })

const OBADIA_OVERLAY: ExplainedBookOverlay = {
  bookId: "obadia",
  bibleEmanusBookId: "OBA",
  name: "Obadia",
  testament: "vt",
  order: 31,
  transcript: sourceUrl,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: [
    {
      number: 1,
      title: "Mândria Edomului, răul făcut fratelui și Împărăția care va fi a DOMNULUI",
      summary: "Obadia confruntă Edomul pentru mândrie și pentru felul în care s-a purtat când Ierusalimul a căzut, apoi încheie cu restaurarea și domnia DOMNULUI.",
      units: [{
        from: 1, to: 14,
        heading: "Pride and Its Results — Judgement of Edom",
        teaching: "Tema distinctivă Poonen pentru Obadia este «mândria și rezultatele ei». Edom se simte sigur în înălțimea locuinței sale, dar textul mută problema din geografie în inimă: «mândria inimii tale te-a înșelat». Mândria se vede apoi în lipsa de solidaritate și în bucuria față de nenorocirea fratelui. Profeția asupra Edomului nu trebuie folosită pentru ostilitate etnică modernă; verdictul privește faptele și mândria descrise de text.",
        source: p("Pride and Its Results / Judgement of Edom"),
        words: [{
          original: "זְדוֹן",
          transliteration: "zedon",
          language: "ebraica",
          meaning: "mândrie, aroganță; în Obadia 1:3 este forța interioară care îl înșală pe Edom în falsa lui siguranță.",
          verseRef: "Obadia 1:3",
          lexicalSource: "WLC-OSHB",
        }],
      }, {
        from: 15, to: 21,
        heading: "Restoration of Israel",
        teaching: "Structura oficială Poonen încheie cartea cu «restaurarea lui Israel». Ziua DOMNULUI întoarce asupra faptelor omului ceea ce a făcut, iar finalul mută privirea spre izbăvire și declarația că Împărăția va fi a DOMNULUI. Aceasta nu dă cititorului dreptul la răzbunare personală; textul lasă judecata și domnia în mâna lui Dumnezeu.",
        source: p("Restoration of Israel"),
      }],
    },
  ],
}

export const OBADIA_EXPLAINED = assertCompleteOverlay(OBADIA_OVERLAY, 1)
