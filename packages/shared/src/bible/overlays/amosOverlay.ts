import {
  assertCompleteOverlay,
  transcriptFocusedChapters,
  type ExplainedBookOverlay,
  type ExplainedOverlayChapter,
} from "../explainedOverlay.js"

const sourceUrl = "https://www.cfcindia.com/through-the-bible/amos-obadiah"
const p = (section: string) => ({ kind: "poonen-official" as const, sourceUrl, section })

const focused: Record<number, ExplainedOverlayChapter> = {
  1: {
    number: 1,
    title: "Judecata începe asupra neamurilor din jur",
    summary: "Amos rostește sentințe împotriva mai multor popoare înainte ca mesajul să ajungă direct la Iuda și Israel.",
    units: [{
      from: 1, to: 15,
      heading: "Judgement",
      teaching: "Structura oficială Poonen începe cu «Judgement». Amos nu folosește alegerea lui Israel ca scut împotriva dreptății lui Dumnezeu; cartea lărgește mai întâi perspectiva asupra răului dintre neamuri. Judecata aparține lui Dumnezeu și nu este mandat pentru comunități religioase moderne să pedepsească violent alte popoare.",
      source: p("Judgement"),
    }],
  },
  2: {
    number: 2,
    title: "Privilegiul nu micșorează responsabilitatea lui Israel",
    summary: "După judecarea vecinilor, profeția se întoarce spre Iuda și Israel și numește nedreptatea, exploatarea și coruperea darurilor lui Dumnezeu.",
    units: [{
      from: 1, to: 16,
      heading: "Privilege Brings Dangers and Responsibility",
      teaching: "Titlul tematic Poonen pentru Amos este «privilegiul aduce pericole și responsabilitate». Israel primise revelație și izbăvire, dar tocmai aceste privilegii măresc răspunderea, nu oferă imunitate. Capitolul numește vânzarea celui drept pentru bani și călcarea celor săraci. Apartenența la poporul lui Dumnezeu nu poate fi folosită pentru a normaliza nedreptatea.",
      source: p("Privilege Brings Dangers and Responsibility"),
    }],
  },
  5: {
    number: 5,
    title: "Căutați pe DOMNUL și trăiți; lăsați dreptatea să curgă",
    summary: "Amos confruntă cultul separat de dreptate și cheamă poporul să caute binele și pe DOMNUL.",
    units: [{
      from: 1, to: 27,
      heading: "Why Israel was being Judged",
      teaching: "A doua temă oficială Poonen este motivul pentru care Israel era judecat. Amos 5 răspunde prin viața publică și religioasă: oamenii urăsc mustrarea, apasă pe sărac și țin sărbători pe care Dumnezeu le respinge când dreptatea lipsește. «Să curgă dreptatea ca apele» nu opune închinarea dreptății, ci refuză închinarea care coexistă liniștit cu exploatarea.",
      source: p("Why Israel was being Judged"),
      words: [{
        original: "מִשְׁפָּט",
        transliteration: "mișpat",
        language: "ebraica",
        meaning: "judecată dreaptă, dreptate aplicată; în Amos 5:24 este ceva ce trebuie să curgă continuu, nu doar o declarație religioasă.",
        verseRef: "Amos 5:24",
        lexicalSource: "WLC-OSHB",
      }],
      forYourHeart: "Dacă devoțiunea ta nu schimbă felul în care tratezi omul mai slab, Amos nu te lasă să separi cele două domenii.",
    }],
  },
  7: {
    number: 7,
    title: "Viziunile judecății și conflictul dintre Amos și Amația",
    summary: "Amos vede lăcuste, foc și firul cu plumb, apoi este atacat de preotul Amația pentru mesajul său.",
    units: [{
      from: 1, to: 17,
      heading: "Visions of Judgement",
      teaching: "Tema finală Poonen include «viziuni ale judecății». Amos mijlocește în primele două viziuni, iar apoi primește imaginea firului cu plumb care arată că evaluarea vine după standardul lui Dumnezeu. Conflictul cu Amația arată tensiunea dintre mesajul profetic și instituția care vrea liniște. Aceasta nu înseamnă că orice persoană care se ceartă cu un lider religios este automat profet; cuvântul trebuie verificat prin Scriptură și adevăr.",
      source: p("Visions of Judgement and Promises of Restoration"),
    }],
  },
  9: {
    number: 9,
    title: "Judecata nu este ultimul cuvânt: cortul lui David este ridicat",
    summary: "Finalul trece de la imposibilitatea de a fugi de judecată la promisiunea restaurării.",
    units: [{
      from: 1, to: 15,
      heading: "Promises of Restoration",
      teaching: "Structura oficială Poonen încheie Amos cu «promisiuni de restaurare». După judecată, Dumnezeu vorbește despre ridicarea cortului căzut al lui David. Faptele Apostolilor 15 citează această secțiune în discuția despre includerea neamurilor. Restaurarea nu șterge severitatea avertismentelor precedente, ci arată că scopul lui Dumnezeu trece dincolo de ruină.",
      source: p("Visions of Judgement and Promises of Restoration"),
    }],
  },
}

const AMOS_OVERLAY: ExplainedBookOverlay = {
  bookId: "amos",
  bibleEmanusBookId: "AMO",
  name: "Amos",
  testament: "vt",
  order: 30,
  transcript: sourceUrl,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: transcriptFocusedChapters("Amos", 9, focused),
}

export const AMOS_EXPLAINED = assertCompleteOverlay(AMOS_OVERLAY, 9)
