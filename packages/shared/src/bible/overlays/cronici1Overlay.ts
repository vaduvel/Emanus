import {
  assertCompleteOverlay,
  transcriptFocusedChapters,
  type ExplainedBookOverlay,
  type ExplainedOverlayChapter,
} from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/chronicles-ezra.txt"
const p = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })

const focused: Record<number, ExplainedOverlayChapter> = {
  1: {
    number: 1,
    title: "De la Adam: Dumnezeu nu vede numai mulțimi, ci nume",
    summary: "Cronici începe cu genealogii care vor conduce spre David și spre comunitatea lui Israel. Poonen folosește primele nouă capitole pentru a sublinia atenția lui Dumnezeu față de persoana concretă.",
    units: [
      {
        from: 1,
        to: 1,
        heading: "Adam — începutul unei liste de persoane cunoscute pe nume",
        teaching: "Poonen observă că primele nouă capitole pot părea doar liste, dar numele individuale transmit ceva important: Dumnezeu nu vorbește doar despre mase anonime. El cunoaște persoana, familia și istoria fiecăruia. Transcriptul aplică această idee credinciosului: numele nu se pierde într-o statistică, iar Dumnezeu cunoaște drumul vieții în detaliu.",
        source: p("first nine chapters ... God is interested in individuals"),
        forYourHeart: "Genealogia pe care tu nici nu o cunoști în întregime nu Îl încurcă pe Dumnezeu. Nu ești un număr într-o mulțime înaintea Lui.",
      },
    ],
  },
  4: {
    number: 4,
    title: "Iabeț: un nume legat de durere și o rugăciune pentru o viață lărgită de Dumnezeu",
    summary: "În mijlocul unei genealogii, narațiunea se oprește pentru două versete asupra lui Iabeț, descris ca mai cu vază decât frații lui și ca om care a strigat către Dumnezeul lui Israel.",
    units: [
      {
        from: 9,
        to: 10,
        heading: "Durerea nu trebuie disprețuită, iar binecuvântarea nu este o formulă de prosperitate",
        teaching: "Poonen observă jocul dintre numele Iabeț și durerea menționată de mama lui, apoi subliniază că omul devine cunoscut printr-o rugăciune: cere binecuvântare, lărgirea hotarului, mâna lui Dumnezeu și păzire de rău. El aplică spiritual cererea ca dorință de creștere și de puterea lui Dumnezeu. Textul nu spune că orice suferință produce automat maturitate și nici că această rugăciune garantează prosperitate materială.",
        source: p("Jabez ... more honorable ... pain and suffering ... enlarge my border"),
        words: [
          {
            original: "יַעְבֵּץ",
            transliteration: "Ya'beț",
            language: "ebraica",
            meaning: "numele este legat în verset printr-un joc de cuvinte de rădăcina asociată durerii/tristeții; textul însuși explică numirea prin «l-am născut cu durere».",
            verseRef: "1 Cronici 4:9",
            lexicalSource: "WLC-OSHB",
          },
        ],
        forYourHeart: "Poți cere lui Dumnezeu creștere fără să transformi rugăciunea într-o tehnică de obținere a confortului. Cere ca mâna Lui să fie cu tine și ca răul să nu te stăpânească.",
      },
    ],
  },
  12: {
    number: 12,
    title: "Oamenii care s-au alăturat lui David când încă era respins",
    summary: "David primește oameni care îl susțin înainte ca tronul lui să fie sigur. Poonen se oprește asupra discernământului de a recunoaște lucrarea lui Dumnezeu într-un om încă respins.",
    units: [
      {
        from: 16,
        to: 18,
        heading: "Amasai recunoaște că Dumnezeu este cu David",
        teaching: "Poonen contrastează oamenii care se alipesc de David după succes cu cei care îl recunosc în vremea peșterii și a persecuției. Amasai declară pace și sprijin pentru că vede că Dumnezeul lui David îl ajută. Aplicația transcriptului este discernământul spiritual, dar aceasta nu devine permisiune pentru cultul personalității: criteriul nu este carisma sau popularitatea unui lider, ci rodul, adevărul și aprobarea lui Dumnezeu.",
        source: p("joined David when he was being persecuted ... Amasai ... your God helps you"),
        forYourHeart: "Nu confunda aprobarea mulțimii cu aprobarea lui Dumnezeu. Dar nici nu te lega de un om doar fiindcă se declară persecutat; cercetează adevărul și rodul.",
      },
    ],
  },
  13: {
    number: 13,
    title: "David își consultă conducătorii",
    summary: "Înainte de aducerea chivotului, David vorbește cu căpeteniile și cu adunarea. Poonen folosește scena pentru a descrie conducerea care nu decide totul singură.",
    units: [
      {
        from: 1,
        to: 4,
        heading: "Conducerea evlavioasă ascultă și discută",
        teaching: "Poonen remarcă faptul că David se consultă cu căpeteniile și cu liderii, iar adunarea recunoaște împreună că planul este bun. Pentru el aceasta contrastează cu liderul care spune unilateral «am decis, voi executați». Consultarea nu transformă majoritatea în autoritate supremă și nu înlocuiește porunca lui Dumnezeu; chiar povestea chivotului arată că un consens bun poate folosi o metodă greșită dacă nu este cercetat Cuvântul.",
        source: p("David consulted ... every leader ... true godly man will not do things single-handedly"),
      },
    ],
  },
  22: {
    number: 22,
    title: "David pregătește lucrarea pe care nu el o va termina",
    summary: "Dumnezeu nu îi dă lui David sarcina construirii templului, dar David adună materiale, organizează lucrătorii și îl pregătește pe Solomon pentru responsabilitate.",
    units: [
      {
        from: 1,
        to: 19,
        heading: "Poți susține cu toată inima o slujire dată altuia",
        teaching: "Poonen revine la una dintre temele lui preferate din viața lui David: Dumnezeu îi spune că nu el va zidi casa, dar David nu se retrage ofensat. Pregătește fier, lemn, piatră, aur, argint și oameni pentru ca Solomon să poată lucra. Lecția transcriptului este generozitatea față de o lucrare care nu îți va purta numele. David îi spune apoi generației următoare să-și pună inima și sufletul în căutarea DOMNULUI.",
        source: p("chapter 22 ... not going to build the house ... made all the preparation ... set your heart and soul"),
        forYourHeart: "Poți lucra cu bucurie pentru ceva ce altcineva va inaugura? Împărăția lui Dumnezeu este mai mare decât dreptul nostru de a primi creditul final.",
      },
    ],
  },
  28: {
    number: 28,
    title: "David îi încredințează lui Solomon planul și responsabilitatea",
    summary: "Înaintea conducătorilor, David explică alegerea lui Solomon și îi transmite planurile pentru templu și organizarea slujirii.",
    units: [
      {
        from: 1,
        to: 21,
        heading: "Chemarea altuia nu este o pierdere pentru tine",
        teaching: "Poonen citește capitolul 28 în continuitate cu pregătirea lui David: regele spune public că Dumnezeu l-a ales pe Solomon pentru lucrarea pe care el însuși ar fi dorit să o facă. David transferă planuri, resurse și încurajare. Accentul rămâne pe disponibilitatea de a pregăti următorul slujitor, nu pe păstrarea controlului până la moarte.",
        source: p("chapter 28 ... he chose my son Solomon ... I prepared all these things"),
      },
    ],
  },
  29: {
    number: 29,
    title: "David dă din averea lui și recunoaște că totul vine de la Dumnezeu",
    summary: "David oferă din propriile comori pentru templu, poporul dă de bunăvoie, iar rugăciunea lui recunoaște că bogăția, puterea și chiar darurile aduse vin din mâna lui Dumnezeu.",
    units: [
      {
        from: 1,
        to: 9,
        heading: "Afectiunea pentru casa lui Dumnezeu se vede și în ceea ce ești gata să dai",
        teaching: "Transcriptul leagă capitolul 29 de pregătirile lui David și de faptul că el nu cere poporului ceva ce refuză să facă personal. Dă din propriile comori și apoi îi vede pe conducători oferind de bunăvoie. Generozitatea nu cumpără favoarea lui Dumnezeu; ea arată unde este așezată inima.",
        source: p("chapter 29 ... gave such a lot of gold and silver and bronze"),
      },
      {
        from: 10,
        to: 30,
        heading: "«Din mâna Ta am primit și din mâna Ta Îți dăm»",
        teaching: "Rugăciunea finală a lui David pune limita oricărei mândrii în dărnicie: ceea ce poporul aduce îi aparține deja lui Dumnezeu. Cronici încheie viața lui David nu prin templul construit de el, ci printr-o generație pregătită și prin recunoașterea stăpânirii lui Dumnezeu.",
        source: p("David ... temple ... prepared ... before he died"),
        forYourHeart: "Când dai timp, bani sau muncă, amintește-ți că nu Îl faci dator pe Dumnezeu. Întorci din ceea ce ai primit deja.",
      },
    ],
  },
}

const CRONICI1_OVERLAY: ExplainedBookOverlay = {
  bookId: "1-cronici",
  bibleEmanusBookId: "1CH",
  name: "1 Cronici",
  testament: "vt",
  order: 13,
  transcript,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: transcriptFocusedChapters("1 Cronici", 29, focused),
}

export const CRONICI1_EXPLAINED = assertCompleteOverlay(CRONICI1_OVERLAY, 29)
