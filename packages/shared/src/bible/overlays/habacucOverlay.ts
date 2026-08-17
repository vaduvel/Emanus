import { assertCompleteOverlay, type ExplainedBookOverlay } from "../explainedOverlay.js"

const sourceUrl = "https://www.cfcindia.com/through-the-bible/nahum-habakkuk"
const p = (section: string) => ({ kind: "poonen-official" as const, sourceUrl, section })

const HABACUC_OVERLAY: ExplainedBookOverlay = {
  bookId: "habacuc",
  bibleEmanusBookId: "HAB",
  name: "Habacuc",
  testament: "vt",
  order: 35,
  transcript: sourceUrl,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: [
    {
      number: 1,
      title: "Profetul întreabă de ce răul continuă, iar răspunsul lui Dumnezeu ridică o întrebare și mai grea",
      summary: "Habacuc pornește din conflictul credinței: de ce Dumnezeu pare să tolereze nedreptatea? Răspunsul că va folosi Babilonul îl face să întrebe cum poate un Dumnezeu sfânt folosi un popor și mai violent.",
      units: [{
        from: 1, to: 4,
        heading: "First Question",
        teaching: "Structura oficială Poonen începe cu prima întrebare a lui Habacuc. Profetul nu ascunde violența și nedreptatea pe care le vede și nici nu pretinde că credința înseamnă lipsa întrebărilor. El își aduce nedumerirea înaintea lui Dumnezeu, nu o transformă în cinism final.",
        source: p("First Question"),
      }, {
        from: 5, to: 11,
        heading: "God's Answer",
        teaching: "Răspunsul anunță ridicarea caldeenilor. Habacuc află că Dumnezeu lucrează într-un mod pe care el nu l-ar fi anticipat, dar aceasta nu declară violența Babilonului bună; capitolul următor va spune că și Babilonul va răspunde pentru mândria și răul lui.",
        source: p("God's Answer"),
      }, {
        from: 12, to: 17,
        heading: "Second Question",
        teaching: "A doua întrebare este mai profundă: cum poate Cel sfânt să privească folosirea unui imperiu mai rău pentru a disciplina pe Iuda? Habacuc nu rezolvă tensiunea printr-o formulă, ci așteaptă răspunsul lui Dumnezeu. Cartea validează întrebarea reverentă fără a-l pune pe om în poziția de judecător final al lui Dumnezeu.",
        source: p("Second Question"),
      }],
    },
    {
      number: 2,
      title: "Cel drept va trăi prin credință, iar mândria imperiului primește vaiurile ei",
      summary: "Dumnezeu îi răspunde profetului: viziunea are vremea ei, mândria nu este dreaptă, iar cel drept trăiește prin credință. Urmează vaiuri împotriva exploatării Babilonului.",
      units: [{
        from: 1, to: 5,
        heading: "God's Answer — «cel drept va trăi prin credința lui»",
        teaching: "Centrul răspunsului este Habacuc 2:4, citat în Romani, Galateni și Evrei. Credința nu înseamnă că profetul primește imediat explicația tuturor evenimentelor, ci că trăiește în fidelitate în timp ce așteaptă împlinirea cuvântului. Versetul nu este formulă de succes material, ci contrast cu sufletul îngâmfat.",
        source: p("God's Answer / Conflict and Triumph of Faith"),
        words: [{
          original: "אֱמוּנָתוֹ",
          transliteration: "emunato",
          language: "ebraica",
          meaning: "credința/fidelitatea lui; termenul din Habacuc 2:4 stă la baza citărilor neotestamentare despre viața prin credință.",
          verseRef: "Habacuc 2:4",
          lexicalSource: "WLC-OSHB",
        }],
      }, {
        from: 6, to: 20,
        heading: "Imperiul folosit de Dumnezeu nu scapă de judecata lui Dumnezeu",
        teaching: "Vaiurile împotriva jafului, câștigului nedrept, violenței, umilirii și idolatriei răspund direct temerii profetului: Babilonul nu este declarat drept doar pentru că este folosit temporar în istorie. Instrumentul rămâne responsabil moral pentru propriile fapte.",
        source: p("God's Answer"),
      }],
    },
    {
      number: 3,
      title: "De la întrebare la laudă: «totuși mă voi bucura în DOMNUL»",
      summary: "Habacuc încheie nu pentru că împrejurările s-au schimbat deja, ci pentru că perspectiva lui asupra lui Dumnezeu s-a adâncit.",
      units: [{
        from: 1, to: 19,
        heading: "Habakkuk's Praise",
        teaching: "Ultima secțiune oficială Poonen este «lauda lui Habacuc». Profetul își amintește lucrările lui Dumnezeu, tremură înaintea judecății și ajunge la una dintre cele mai clare declarații ale credinței care nu depinde de recoltă: chiar dacă smochinul nu înflorește și turmele lipsesc, se va bucura în DOMNUL. Aceasta nu cere negarea foametei sau a pierderii, ci refuzul de a face prosperitatea condiția existenței lui Dumnezeu.",
        source: p("Habakkuk's Praise"),
        forYourHeart: "Credința triumfă nu când pretinde că hambarul este plin, ci când poate spune adevărul despre hambarul gol și totuși Îl păstrează pe Dumnezeu ca speranță.",
      }],
    },
  ],
}

export const HABACUC_EXPLAINED = assertCompleteOverlay(HABACUC_OVERLAY, 3)
