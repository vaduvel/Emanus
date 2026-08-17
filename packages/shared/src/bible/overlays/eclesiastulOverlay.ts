import {
  assertCompleteOverlay,
  transcriptFocusedChapters,
  type ExplainedBookOverlay,
  type ExplainedOverlayChapter,
} from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/ecclesiastes.txt"
const p = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })

const focused: Record<number, ExplainedOverlayChapter> = {
  1: {
    number: 1,
    title: "«Deșertăciunea deșertăciunilor» și perspectiva omului «sub soare»",
    summary: "Poonen deschide cartea prin expresiile «deșertăciune» și «sub soare» și o contrastează cu înțelepciunea spirituală din Proverbe.",
    units: [{
      from: 1, to: 18,
      heading: "Inteligența nu poate produce singură cunoașterea lui Dumnezeu",
      teaching: "Poonen citește Eclesiastul ca mărturie a limitelor înțelepciunii omenești atunci când viața este privită numai «sub soare». Solomon fusese extraordinar de inteligent, dar inteligența nu îl putea conduce singură la realitatea spirituală. Transcriptul contrastează capul cu inima smerită, nu pentru a condamna rațiunea, ci pentru a spune că rațiunea nu poate înlocui revelația și ascultarea. Afirmațiile pesimiste din carte trebuie citite în cadrul acestei perspective și al concluziei finale, nu extrase izolat ca doctrina completă a Scripturii despre sensul vieții.",
      source: p("under the Sun ... human wisdom ... intelligence ... humility"),
      words: [{
        original: "הֲבֵל הֲבָלִים",
        transliteration: "havel havalim",
        language: "ebraica",
        meaning: "literal imagine de abur/suflare, redată adesea «deșertăciunea deșertăciunilor»; exprimă caracterul trecător, insesizabil și frustrant al vieții privite sub soare.",
        verseRef: "Eclesiastul 1:2",
        lexicalSource: "WLC-OSHB",
      }],
    }],
  },
  2: {
    number: 2,
    title: "Plăcere, proiecte, avere și realizări care nu pot purta greutatea sensului final",
    summary: "Solomon testează plăcerea, construcțiile, bogăția și munca și constată că ele nu pot oferi avantajul ultim pe care îl caută.",
    units: [{
      from: 1, to: 26,
      heading: "Darurile bune devin goale când li se cere să fie Dumnezeu",
      teaching: "Poonen rezumă primele două capitole ca explorare a golului din cunoaștere, plăcere, realizări și muncă atunci când omul caută în ele sensul ultim. Textul nu spune că munca, bucuria, casa sau priceperea sunt rele; chiar capitolul vorbește despre primirea bucuriei ca dar. Problema este încercarea de a obține prin ele ceea ce numai Dumnezeu poate da.",
      source: p("first two chapters ... emptiness of all knowledge pleasure achievements and labors"),
      forYourHeart: "Întreabă-te nu numai dacă un lucru este bun, ci dacă i-ai cerut să îți dea identitatea și sensul pe care nu le poate purta.",
    }],
  },
  3: {
    number: 3,
    title: "Un timp pentru fiecare lucru și eternitatea pusă în inimă",
    summary: "Capitolul descrie vremurile vieții și contrastul dintre timpul limitat al omului și lucrarea lui Dumnezeu.",
    units: [{
      from: 1, to: 22,
      heading: "Timpurile vieții nu sunt toate sub controlul omului",
      teaching: "Poonen include capitolele 3–6 în demonstrația că omul «sub soare» vede limitele și repetarea vieții. Celebrul poem despre timp nu cere să declarăm orice faptă morală bună pentru că «are timpul ei»; perechile descriu realități ale existenței și limitele omului. Versetul despre eternitatea pusă în inimă arată tocmai că omul simte mai mult decât poate cuprinde prin experiența temporală.",
      source: p("chapter 3 ... everything is vanity ... time appointed for everything"),
    }],
  },
  5: {
    number: 5,
    title: "Apropie-te de Dumnezeu cu grijă în cuvinte și nu face jurăminte pripite",
    summary: "Capitolul avertizează asupra vorbirii religioase grăbite și asupra iluziei că acumularea banilor produce satisfacție.",
    units: [{
      from: 1, to: 20,
      heading: "Religia poate deveni și ea deșertăciune când gura o ia înaintea inimii",
      teaching: "În logica generală a transcriptului, Eclesiastul arată cât de ușor religiozitatea de cap poate coexista cu o inimă neformată. Capitolul însuși avertizează să nu te grăbești cu gura înaintea lui Dumnezeu și să nu faci promisiuni pe care nu le împlinești. Apoi arată că iubirea de bani nu este săturată de bani. Overlay-ul păstrează aceste avertismente directe fără a transforma sărăcia sau bogăția în indicator automat al spiritualității.",
      source: p("preacher ... head ... no preparation of the heart"),
    }],
  },
  7: {
    number: 7,
    title: "Un nume bun, corectarea și limitele concluziilor lui Solomon",
    summary: "Capitolele 7–9 adună multă înțelepciune practică, dar și observații care trebuie citite în cadrul experienței personale și limitate a Predicatorului.",
    units: [{
      from: 1, to: 29,
      heading: "Înțelepciunea practică nu face fiecare generalizare a autorului universală",
      teaching: "Poonen spune că în capitolele 7–9 există mult sfat practic și se oprește la «un nume bun este mai bun». El observă și afirmația foarte negativă din 7:28 despre femei. Acea propoziție nu trebuie folosită ca doctrină biblică despre inferioritatea femeii: este concluzia limitată a unui bărbat a cărui viață relațională fusese profund dezordonată, iar restul Scripturii prezintă numeroase femei înțelepte și vrednice. Chiar următorul verset mută verdictul spre omenire: Dumnezeu i-a făcut pe oameni drepți, dar ei au căutat multe invenții.",
      source: p("chapter 7 to 9 ... practical advice ... not found a single wise woman"),
      forYourHeart: "Nu transforma dezamăgirea unui om în verdict asupra unui sex, grup sau popor. Scriptura trebuie citită ca întreg.",
    }],
  },
  12: {
    number: 12,
    title: "Finalul: teme-te de Dumnezeu și păzește poruncile Lui",
    summary: "Cartea se încheie prin aducerea vieții înaintea lui Dumnezeu și a judecății Lui.",
    units: [{
      from: 1, to: 14,
      heading: "Concluzia cărții și limita motivației prin frica de judecată",
      teaching: "Poonen se oprește la ultimele două versete: «teme-te de Dumnezeu și păzește poruncile Lui». El observă însă că Predicatorul argumentează prin judecata viitoare, în timp ce Noul Testament adâncește motivația ascultării prin iubirea față de Hristos. Aceasta nu face concluzia Eclesiastului falsă; judecata lui Dumnezeu este reală. Poonen subliniază diferența dintre ascultarea motivată numai de frică și ascultarea născută din iubire.",
      source: p("last two verses of Ecclesiastes 12 ... fear God and keep his commandments ... judgment"),
      forYourHeart: "Frica de consecință poate opri un pas rău, dar maturitatea creștină caută mai mult: să asculți pentru că Îl iubești pe Cel care ți-a dat viața.",
    }],
  },
}

const ECLESIASTUL_OVERLAY: ExplainedBookOverlay = {
  bookId: "eclesiastul",
  bibleEmanusBookId: "ECC",
  name: "Eclesiastul",
  testament: "vt",
  order: 21,
  transcript,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: transcriptFocusedChapters("Eclesiastul", 12, focused),
}

export const ECLESIASTUL_EXPLAINED = assertCompleteOverlay(ECLESIASTUL_OVERLAY, 12)
