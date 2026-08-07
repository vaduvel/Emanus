import {
  assertCompleteOverlay,
  transcriptFocusedChapters,
  type ExplainedBookOverlay,
  type ExplainedOverlayChapter,
} from "../explainedOverlay.js"

const sourceUrl = "https://www.cfcindia.com/through-the-bible/hosea-joel"
const p = (section: string) => ({ kind: "poonen-official" as const, sourceUrl, section })

const focused: Record<number, ExplainedOverlayChapter> = {
  1: {
    number: 1,
    title: "Viața profetului devine imaginea infidelității lui Israel",
    summary: "Osea primește o însărcinare familială dureroasă prin care mesajul despre adulterul spiritual al lui Israel devine personal și vizibil.",
    units: [{
      from: 1, to: 11,
      heading: "Hosea's Training",
      teaching: "Tema oficială Poonen pentru începutul cărții este «pregătirea lui Osea». Textul îl introduce într-o chemare care îl face să simtă în propria viață ceva din durerea legământului trădat. Emanus nu transformă această însărcinare profetică unică într-o poruncă pentru cineva de a intra într-o relație nesigură ori abuzivă pentru a demonstra o lecție spirituală.",
      source: p("Hosea's Training"),
    }],
  },
  2: {
    number: 2,
    title: "Adulter spiritual, disciplină și promisiunea unei noi logodne",
    summary: "Israel aleargă după alți iubiți, dar Dumnezeu descrie atât consecințele infidelității, cât și chemarea spre restaurare.",
    units: [{
      from: 1, to: 23,
      heading: "Israel's Spiritual Adultery",
      teaching: "Poonen rezumă această parte prin «adulterul spiritual al lui Israel». Limbajul conjugal explică idolatria ca infidelitate de legământ, nu ca simplă schimbare de preferință religioasă. Finalul capitolului întoarce însă imaginea spre restaurare: Dumnezeu vorbește din nou despre logodire în dreptate, milă și credincioșie.",
      source: p("Israel's Spiritual Adultery"),
      words: [{
        original: "חֶסֶד",
        transliteration: "hesed",
        language: "ebraica",
        meaning: "bunătate statornică, iubire loială de legământ; apare în promisiunea noii relații din Osea 2:19.",
        verseRef: "Osea 2:19",
        lexicalSource: "WLC-OSHB",
      }],
    }],
  },
  4: {
    number: 4,
    title: "Lipsa cunoașterii lui Dumnezeu și răspunderea liderilor",
    summary: "Capitolul trece de la imaginea familiei profetului la o acuzație directă împotriva poporului și a preoților.",
    units: [{
      from: 1, to: 19,
      heading: "The Judgement of God",
      teaching: "Tema Poonen pentru secțiunea de mijloc este judecata lui Dumnezeu. Osea 4 arată de ce: adevărul, mila și cunoașterea lui Dumnezeu lipsesc, iar liderii religioși contribuie la degradare. «Poporul Meu piere din lipsă de cunoștință» nu este laudă pentru acumularea de informație; contextul este cunoașterea lui Dumnezeu care produce fidelitate morală.",
      source: p("The Judgement of God"),
    }],
  },
  6: {
    number: 6,
    title: "«Milă voiesc, nu jertfă»",
    summary: "Întoarcerea superficială este confruntată, iar Dumnezeu spune că dorește iubire statornică și cunoașterea Lui mai mult decât ritual.",
    units: [{
      from: 1, to: 11,
      heading: "Ritualul nu înlocuiește hesed",
      teaching: "În centrul acuzației apare 6:6: Dumnezeu dorește bunătate statornică și cunoașterea Lui, nu jertfă folosită ca substitut pentru acestea. Iisus va cita versetul în Evanghelii. Textul nu desființează prin aceasta toate formele de închinare; condamnă ritualul separat de caracter și milă.",
      source: p("Israel's Spiritual Adultery"),
      words: [{
        original: "חֶסֶד חָפַצְתִּי",
        transliteration: "hesed hafațti",
        language: "ebraica",
        meaning: "«milă/iubire statornică am dorit»; accentul cade pe fidelitatea de legământ, nu pe ritualul gol.",
        verseRef: "Osea 6:6",
        lexicalSource: "WLC-OSHB",
      }],
    }],
  },
  11: {
    number: 11,
    title: "Iubirea lui Dumnezeu pentru fiul care s-a depărtat",
    summary: "Dumnezeu își amintește chemarea lui Israel din Egipt și vorbește cu o tandrețe care stă lângă judecata meritată.",
    units: [{
      from: 1, to: 12,
      heading: "The Love of God for Israel",
      teaching: "Ultima temă oficială Poonen pentru Osea este «iubirea lui Dumnezeu pentru Israel». Capitolul 11 este una dintre expresiile cele mai puternice ale acestei teme: poporul se depărtează, dar Dumnezeu vorbește despre compasiunea Lui și despre refuzul de a acționa ca un om dominat de mânie. Dragostea nu neagă sfințenia și consecințele; explică de ce judecata nu este ultimul cuvânt al cărții.",
      source: p("The Love of God for Israel"),
    }],
  },
  14: {
    number: 14,
    title: "Întoarce-te la DOMNUL; vindecarea apostaziei și iubirea oferită de bunăvoie",
    summary: "Cartea se încheie cu o chemare explicită la întoarcere și cu promisiunea lui Dumnezeu de vindecare și rodire.",
    units: [{
      from: 1, to: 9,
      heading: "Judecata nu anulează invitația finală",
      teaching: "Osea nu se termină cu adulterul sau cu pedeapsa, ci cu «întoarce-te». Dumnezeu promite să vindece abaterea și să iubească de bunăvoie. Aceasta închide exact arcul tematic Poonen: pregătirea profetului, adulterul spiritual, judecata și iubirea neschimbătoare a lui Dumnezeu.",
      source: p("The Love of God for Israel"),
      forYourHeart: "Când Dumnezeu numește păcatul, scopul chemării nu este să te țină în rușine, ci să te întorci la El.",
    }],
  },
}

const OSEA_OVERLAY: ExplainedBookOverlay = {
  bookId: "osea",
  bibleEmanusBookId: "HOS",
  name: "Osea",
  testament: "vt",
  order: 28,
  transcript: sourceUrl,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: transcriptFocusedChapters("Osea", 14, focused),
}

export const OSEA_EXPLAINED = assertCompleteOverlay(OSEA_OVERLAY, 14)
