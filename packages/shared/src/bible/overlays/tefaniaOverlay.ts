import { assertCompleteOverlay, type ExplainedBookOverlay } from "../explainedOverlay.js"

const sourceUrl = "https://www.cfcindia.com/through-the-bible/zephaniah-haggai"
const p = (section: string) => ({ kind: "poonen-official" as const, sourceUrl, section })

const TEFANIA_OVERLAY: ExplainedBookOverlay = {
  bookId: "tefania",
  bibleEmanusBookId: "ZEP",
  name: "Țefania",
  testament: "vt",
  order: 36,
  transcript: sourceUrl,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: [
    {
      number: 1,
      title: "Ziua DOMNULUI și severitatea judecății",
      summary: "Țefania anunță judecată asupra idolatriei, indiferenței și nedreptății și descrie apropierea Zilei DOMNULUI.",
      units: [{
        from: 1, to: 18,
        heading: "Judgement in the Day of the Lord",
        teaching: "Prima secțiune oficială Poonen este «judecata în Ziua DOMNULUI». Țefania confruntă atât idolatria explicită, cât și atitudinea celor care spun că DOMNUL nu va face nici bine, nici rău. Tema distinctivă Poonen — «severitatea și bunătatea lui Dumnezeu» — cere să nu separăm sfințenia de milă. Imaginile acestei judecăți nu autorizează violență religioasă modernă și nu dau omului dreptul să stabilească arbitrar cine se află sub o astfel de sentință.",
        source: p("Severity and Goodness / Judgement in the Day of the Lord"),
      }],
    },
    {
      number: 2,
      title: "Căutați pe DOMNUL, căutați dreptatea și smerenia",
      summary: "Înaintea zilei mâniei, cei smeriți sunt chemați să-L caute pe DOMNUL, iar profeția trece prin judecăți asupra popoarelor vecine.",
      units: [{
        from: 1, to: 15,
        heading: "Salvation in the Day of the Lord",
        teaching: "A doua secțiune Poonen este «mântuirea în Ziua DOMNULUI». Chemarea nu este la speculație despre calendar, ci la căutarea DOMNULUI, a dreptății și a smereniei. Judecățile asupra națiunilor nu trebuie mutate în ostilități etnice moderne; ele aparțin mesajului profetic concret al lui Țefania.",
        source: p("Salvation in the Day of the Lord"),
        words: [{
          original: "עֲנָוָה",
          transliteration: "anavah",
          language: "ebraica",
          meaning: "smerenie/blândețe; în Țefania 2:3 este căutată împreună cu dreptatea înaintea DOMNULUI.",
          verseRef: "Țefania 2:3",
          lexicalSource: "WLC-OSHB",
        }],
      }],
    },
    {
      number: 3,
      title: "De la cetatea răzvrătită la rămășița smerită și bucuria lui Dumnezeu",
      summary: "Ultimul capitol confruntă liderii corupți, apoi privește spre o rămășiță curățită și spre Dumnezeu care Se bucură de poporul restaurat.",
      units: [{
        from: 1, to: 8,
        heading: "Severitatea față de corupția care refuză corectarea",
        teaching: "Țefania numește conducători, judecători, profeți și preoți care folosesc greșit autoritatea. Severitatea din carte nu este arbitrară, ci răspunde corupției persistente și refuzului disciplinei.",
        source: p("Severity and Goodness"),
      }, {
        from: 9, to: 20,
        heading: "Bunătatea: rămășiță smerită, prezență și cântare",
        teaching: "Partea finală arată cealaltă față a temei Poonen: Dumnezeu curăță, adună și rămâne în mijlocul poporului. Imaginea din 3:17 — DOMNUL Se bucură de popor și Se veselește cu cântare — împiedică lectura cărții ca și cum Dumnezeu ar fi definit numai de mânie. Restaurarea nu este negarea păcatului, ci lucrarea Lui după judecată și întoarcere.",
        source: p("Salvation in the Day of the Lord / Severity and Goodness"),
        forYourHeart: "Sfințenia lui Dumnezeu nu trebuie micșorată pentru a vorbi despre iubirea Lui, iar iubirea Lui nu trebuie uitată când citim avertismentele.",
      }],
    },
  ],
}

export const TEFANIA_EXPLAINED = assertCompleteOverlay(TEFANIA_OVERLAY, 3)
