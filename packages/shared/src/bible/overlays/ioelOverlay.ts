import { assertCompleteOverlay, type ExplainedBookOverlay } from "../explainedOverlay.js"

const sourceUrl = "https://www.cfcindia.com/through-the-bible/hosea-joel"
const p = (section: string) => ({ kind: "poonen-official" as const, sourceUrl, section })

const IOEL_OVERLAY: ExplainedBookOverlay = {
  bookId: "ioel",
  bibleEmanusBookId: "JOL",
  name: "Ioel",
  testament: "vt",
  order: 29,
  transcript: sourceUrl,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: [
    {
      number: 1,
      title: "Devastarea prezentă și chemarea de a te trezi",
      summary: "O invazie de lăcuste și o criză națională devin cadrul chemării lui Ioel la plâns, post și întoarcere.",
      units: [{
        from: 1, to: 20,
        heading: "Present Judgement",
        teaching: "Structura oficială Poonen numește prima parte «judecata prezentă». Ioel nu tratează dezastrul ca simplu fundal, ci cheamă bătrânii, preoții și întregul popor să se trezească și să strige către DOMNUL. Emanus păstrează această explicație în contextul profeției; nu transformă orice calamitate naturală modernă într-o judecată divină identificată fără revelație biblică explicită.",
        source: p("Present Judgement"),
      }],
    },
    {
      number: 2,
      title: "Ziua DOMNULUI, întoarcerea din toată inima și promisiunea Duhului",
      summary: "Ioel cheamă poporul să-și sfâșie inima, nu doar hainele, apoi vorbește despre revărsarea Duhului peste orice făptură.",
      units: [{
        from: 1, to: 17,
        heading: "Repentance Precedes Outpouring of Spirit",
        teaching: "Tema oficială Poonen leagă pocăința de revărsarea Duhului. Textul spune «întoarceți-vă la Mine din toată inima» și «sfâșiați-vă inimile, nu hainele». Accentul este pe întoarcerea reală, nu pe performanța religioasă exterioară.",
        source: p("Repentance Precedes Outpouring of Spirit"),
      }, {
        from: 18, to: 32,
        heading: "Duhul turnat peste fii, fiice, bătrâni, tineri și slujitori",
        teaching: "Ioel promite revărsarea Duhului peste orice făptură și include explicit sexe, generații și poziții sociale diferite. Petru citează acest pasaj în Fapte 2. Emanus păstrează această ancoră neotestamentară; pasajul nu garantează că orice afirmație profetică făcută de un credincios este corectă și nu elimină nevoia discernământului.",
        source: p("Repentance Precedes Outpouring of Spirit"),
        words: [{
          original: "רוּחִי",
          transliteration: "ruhi",
          language: "ebraica",
          meaning: "«Duhul Meu»; forma posesivă din promisiunea lui Dumnezeu de a turna Duhul Său peste orice făptură.",
          verseRef: "Ioel 2:28",
          lexicalSource: "WLC-OSHB",
        }],
      }],
    },
    {
      number: 3,
      title: "Ziua DOMNULUI și judecata neamurilor",
      summary: "Ultimul capitol privește spre judecată, refugiu pentru poporul lui Dumnezeu și restaurarea Sionului.",
      units: [{
        from: 1, to: 21,
        heading: "Coming Day of Lord",
        teaching: "Tema finală Poonen este «Ziua DOMNULUI care vine». Ioel descrie judecata neamurilor și pe DOMNUL ca refugiu. Imaginile de război și judecată aparțin acțiunii lui Dumnezeu în profeție și nu oferă bisericii un mandat de război religios, răzbunare sau violență împotriva adversarilor.",
        source: p("Coming Day of Lord"),
      }],
    },
  ],
}

export const IOEL_EXPLAINED = assertCompleteOverlay(IOEL_OVERLAY, 3)
