import {
  assertCompleteOverlay,
  transcriptFocusedChapters,
  type ExplainedBookOverlay,
  type ExplainedOverlayChapter,
} from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/jeremiah-lamentations.txt"
const p = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })
const n = { kind: "biblia-emanus" as const, note: "rezumat narativ fără doctrină adăugată" as const }

const focused: Record<number, ExplainedOverlayChapter> = {
  1: {
    number: 1,
    title: "Profetul plânge împreună cu cetatea pe care a avertizat-o",
    summary: "După căderea Ierusalimului, Ieremia nu spune «v-am spus eu», ci intră în durerea poporului și o exprimă în lamentație.",
    units: [{
      from: 1, to: 22,
      heading: "A spune adevărul înainte de judecată nu anulează compasiunea după dezastru",
      teaching: "Poonen evidențiază identificarea lui Ieremia cu oamenii pe care îi mustrase ani întregi. El nu privește de la distanță ruina și nu se bucură că avertismentele lui s-au confirmat. Plângerile arată că slujirea profetică sănătoasă poate rosti judecata cu fermitate și totuși poate plânge când oamenii suferă consecințele. Textul numește și păcatele Ierusalimului; compasiunea nu cere negarea responsabilității.",
      source: p("Lamentations ... he identified with the people ... sits alone in her mourning"),
      forYourHeart: "Dacă te bucuri când omul pe care l-ai avertizat cade, ai câștigat disputa și ai pierdut ceva din inima profetului.",
    }],
  },
  3: {
    number: 3,
    title: "În mijlocul întunericului: îndurările sunt noi în fiecare dimineață",
    summary: "Capitolul trece prin apăsare profundă și ajunge la o întoarcere deliberată a minții spre dragostea statornică și fidelitatea lui Dumnezeu.",
    units: [{
      from: 1, to: 66,
      heading: "Speranța nu neagă ruina; o privește din interiorul milei lui Dumnezeu",
      teaching: "Poonen se oprește la 3:22–23: iubirea statornică a DOMNULUI nu se sfârșește, îndurările Lui sunt noi în fiecare dimineață și mare este credincioșia Lui. El aplică aceasta iertării și unui nou început. Formularea lui că Dumnezeu ne privește «ca și cum n-am fi păcătuit» trebuie înțeleasă în lumina iertării, nu ca ștergere a consecințelor, memoriei sau nevoii de reparare. Același capitol continuă cu cercetarea căilor și întoarcerea la DOMNUL.",
      source: p("Chapter three, verse 22 ... mercies are new every morning ... great is his faithfulness"),
      words: [{
        original: "חֲסָדֵי יְהוָה",
        transliteration: "hasdei YHWH",
        language: "ebraica",
        meaning: "bunătățile/îndurările statornice ale DOMNULUI, din familia lexicală חֶסֶד (hesed), iubire loială de legământ.",
        verseRef: "Plângerile 3:22",
        lexicalSource: "WLC-OSHB",
      }],
      forYourHeart: "Un nou început nu înseamnă să pretinzi că ieri n-a existat; înseamnă că mila lui Dumnezeu îți permite să te întorci astăzi.",
    }],
  },
  5: {
    number: 5,
    title: "«Întoarce-ne la Tine» — rugăciunea care încheie lamentația",
    summary: "Ultimul capitol aduce înaintea lui Dumnezeu rușinea, pierderea și suferința comunității și cere restaurare.",
    units: [{
      from: 1, to: 22,
      heading: "Durerea colectivă este adusă înaintea tronului, nu ascunsă",
      teaching: "Transcriptul nu dezvoltă separat fiecare verset al capitolului 5. Biblia Emanus păstrează rugăciunea unei comunități devastate, iar finalul cere ca DOMNUL să o întoarcă pentru a se putea întoarce. Overlay-ul nu adaugă o teorie despre fiecare suferință colectivă; păstrează lamentația ca rugăciune de memorie, adevăr și restaurare.",
      source: n,
    }],
  },
}

const PLANGERILE_OVERLAY: ExplainedBookOverlay = {
  bookId: "plangerile",
  bibleEmanusBookId: "LAM",
  name: "Plângerile lui Ieremia",
  testament: "vt",
  order: 25,
  transcript,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: transcriptFocusedChapters("Plângerile", 5, focused),
}

export const PLANGERILE_EXPLAINED = assertCompleteOverlay(PLANGERILE_OVERLAY, 5)
