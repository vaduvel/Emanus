import {
  assertCompleteOverlay,
  transcriptFocusedChapters,
  type ExplainedBookOverlay,
  type ExplainedOverlayChapter,
} from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/song-of-solomon.txt"
const p = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })

const focused: Record<number, ExplainedOverlayChapter> = {
  1: {
    number: 1,
    title: "Iubire, apreciere și începutul unei devoțiuni care trebuie să crească",
    summary: "Poonen citește cartea în două planuri: iubirea conjugală reală și, ca aplicație spirituală, relația dintre Hristos și Biserică.",
    units: [{
      from: 1, to: 17,
      heading: "Sexualitatea în căsătorie nu este necurată, iar iubirea nu poate fi înlocuită de folosirea celuilalt",
      teaching: "Poonen începe prin a respinge rușinea față de sexualitatea creată de Dumnezeu și prin a sublinia iubirea, aprecierea și comunicarea dintre soț și soție. El folosește apoi poemul ca imagine a devotamentului față de Hristos. Cele două niveluri trebuie păstrate distincte: sensul literar este poezia iubirii dintre bărbat și femeie; aplicația Hristos–Biserică este o lectură spirituală creștină, nu motiv pentru a șterge sensul conjugal. Poonen observă și 1:6 — «via mea nu mi-am păzit-o» — ca avertisment pentru slujitorul ocupat cu lucrarea altora, dar neglijent cu propria viață.",
      source: p("basically teaches two things ... marriage ... Christ and the church ... own vineyard"),
      forYourHeart: "O slujire care te face să-ți neglijezi propria umblare cu Dumnezeu nu este maturitate. Iar într-o căsătorie, aprecierea și comunicarea nu sunt ornamente, ci parte din iubire.",
    }],
  },
  2: {
    number: 2,
    title: "Iubirea încă spune mai întâi «iubitul meu este al meu»",
    summary: "Poonen descrie capitolele 2–7 ca proces de creștere, cu apropiere, distanță, căutare și restaurare.",
    units: [{
      from: 1, to: 17,
      heading: "Dragostea tânără trebuie să crească dincolo de ceea ce primește",
      teaching: "Poonen observă în 2:16 ordinea «iubitul meu este al meu și eu sunt a lui» și o compară cu formularea maturizată din capitolul 6. Pentru el, la început iubirea se gândește mai mult la ce primește; pe parcurs învață să se dăruiască. În plan conjugal, aceasta nu cere pierderea limitelor sau a identității personale; iubirea matură este reciprocă și nu justifică controlul.",
      source: p("chapter two to chapter seven ... growth of love ... my beloved is mine and I am his"),
    }],
  },
  6: {
    number: 6,
    title: "«Eu sunt a iubitului meu» — ordinea iubirii se schimbă",
    summary: "După suișurile și coborâșurile relației, declarația din capitolul 6 pune mai întâi apartenența de cel iubit.",
    units: [{
      from: 1, to: 13,
      heading: "De la posesie spre dăruire",
      teaching: "Poonen contrastează 6:3 cu 2:16: acum apare mai întâi «eu sunt a iubitului meu». El vede aceasta ca progres de la iubirea centrată pe ce primesc la iubirea care se dă. Ca aplicație spirituală, credinciosul ajunge să întrebe mai puțin ce poate primi de la Dumnezeu și mai mult ce poate primi Dumnezeu din viața lui.",
      source: p("chapter six verse three ... I am my beloved's first ... progression"),
    }],
  },
  8: {
    number: 8,
    title: "Iubirea matură: puternică, statornică și fără preț de cumpărare",
    summary: "Poonen vede capitolul 8 drept culmea creșterii iubirii și îl aplică devotamentului matur față de Hristos.",
    units: [{
      from: 1, to: 14,
      heading: "Iubirea nu mai întreabă în primul rând «ce primesc?»",
      teaching: "Poonen descrie capitolul 8 drept iubire matură: nu interesul pentru binecuvântare, sănătate, prosperitate sau chiar slujire este centrul, ci persoana iubită. Textul spune că iubirea este puternică și că ape mari nu o pot stinge, iar averea nu o poate cumpăra. Aceasta nu romantizează gelozia abuzivă sau dependența nesănătoasă; poemul laudă o iubire care nu este de vânzare și nu este redusă la utilitate.",
      source: p("chapter eight ... mature love ... love the Lord for who He is"),
      words: [{
        original: "אַהֲבָה",
        transliteration: "ahavah",
        language: "ebraica",
        meaning: "iubire; în 8:6–7 este descrisă ca puternică și imposibil de cumpărat cu averea unei case.",
        verseRef: "Cântarea Cântărilor 8:6",
        lexicalSource: "WLC-OSHB",
      }],
      forYourHeart: "Maturizarea iubirii se vede când persoana nu mai este doar sursa lucrurilor de care ai nevoie, ci cineva căruia vrei să-i faci bine.",
    }],
  },
}

const CANTAREA_OVERLAY: ExplainedBookOverlay = {
  bookId: "cantarea-cantarilor",
  bibleEmanusBookId: "SNG",
  name: "Cântarea Cântărilor",
  testament: "vt",
  order: 22,
  transcript,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: transcriptFocusedChapters("Cântarea Cântărilor", 8, focused),
}

export const CANTAREA_CANTARILOR_EXPLAINED = assertCompleteOverlay(CANTAREA_OVERLAY, 8)
