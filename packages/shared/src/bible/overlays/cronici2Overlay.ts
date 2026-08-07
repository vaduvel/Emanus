import {
  assertCompleteOverlay,
  transcriptFocusedChapters,
  type ExplainedBookOverlay,
  type ExplainedOverlayChapter,
} from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/chronicles-ezra.txt"
const p = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })

const focused: Record<number, ExplainedOverlayChapter> = {
  15: {
    number: 15,
    title: "Asa caută pe DOMNUL și primește chemarea de a rămâne cu El",
    summary: "Prorocul Azaria îl încurajează pe Asa: DOMNUL este cu cei care sunt cu El. Regele îndepărtează idolii și întărește legământul.",
    units: [
      {
        from: 1, to: 19,
        heading: "Un început bun trebuie continuat",
        teaching: "Poonen amintește începutul lui Asa ca exemplu al unui om care, în strâmtorare, s-a întors la DOMNUL și L-a căutat. Capitolul păstrează chemarea profetică la curaj și la o inimă care Îl caută pe Dumnezeu. Transcriptul pregătește însă contrastul din capitolul următor: un început de dependență nu garantează că omul va continua la fel.",
        source: p("Asa ... in their distress they turned to the Lord and they sought him"),
        forYourHeart: "Nu trăi numai din amintirea unei perioade în care te-ai sprijinit pe Dumnezeu. Credincioșia trebuie reînnoită în următoarea criză.",
      },
    ],
  },
  16: {
    number: 16,
    title: "Asa se sprijină pe Siria, iar văzătorul îi spune ce a pierdut",
    summary: "Asa caută o alianță politică împotriva lui Baeșa și îl închide pe Hanani când acesta îl confruntă. Capitolul conține declarația despre ochii DOMNULUI care străbat tot pământul.",
    units: [
      {
        from: 1, to: 10,
        heading: "Ochii DOMNULUI caută inimi întregi",
        teaching: "Poonen contrastează trecutul lui Asa, când se sprijinise pe DOMNUL, cu această criză, când se sprijină pe împăratul Siriei. El se oprește în mod special la 2 Cronici 16:9: ochii DOMNULUI străbat tot pământul ca să Se arate tare pentru cei a căror inimă este întreagă față de El. Pentru Poonen, slujirea nu trebuie construită prin alergarea după oameni potriviți, ci prin credincioșie și încrederea că Dumnezeu vede și aduce oamenii pe care îi caută.",
        source: p("second chronicles 16 9 ... eyes of the Lord moved to and fro throughout the whole earth"),
        words: [
          {
            original: "שָׁלֵם",
            transliteration: "șalem",
            language: "ebraica",
            meaning: "întreg, complet, nedivizat. În 16:9 descrie inima orientată fără împărțire spre Dumnezeu, nu perfecțiunea fără greșeală.",
            verseRef: "2 Cronici 16:9",
            lexicalSource: "WLC-OSHB",
          },
        ],
      },
      {
        from: 11, to: 14,
        heading: "Un om care respinge mustrarea poate încheia mai slab decât a început",
        teaching: "După confruntare, Asa se mânie pe văzător și apasă și pe alți oameni. Transcriptul folosește povestea pentru avertismentul că un om care a avut credință reală poate deveni defensiv și autosuficient mai târziu. Textul despre boala lui nu este folosit pentru a condamna medicina; problema explicită a narațiunii este direcția inimii lui și refuzul de a-L căuta pe DOMNUL.",
        source: p("Asa ... did not trust the Lord ... compromised"),
      },
    ],
  },
  18: {
    number: 18,
    title: "Mica nu își ajustează mesajul la consensul celor mulți",
    summary: "Iosafat intră într-o alianță cu Ahab. Sute de proroci susțin campania, dar Mica refuză să repete mesajul majorității și spune numai ceea ce primește de la DOMNUL.",
    units: [
      {
        from: 1, to: 34,
        heading: "«Ce-mi va spune DOMNUL, aceea voi vorbi»",
        teaching: "Poonen se oprește la presiunea pusă asupra lui Mica să își armonizeze mesajul cu al celorlalți proroci. Răspunsul lui este simplu: nu va repeta consensul doar pentru că este consens. Pentru transcript aceasta definește slujirea profetică: ascultarea de Dumnezeu mai presus de dorința de a fi acceptat de lideri sau de grup. Episodul nu justifică automat pe orice voce minoritară; adevărul nu este stabilit nici de majoritate, nici de singurătate, ci de fidelitatea față de Dumnezeu și cuvântul Lui.",
        source: p("Micaiah ... what the Lord tells me I'll speak ... not going to repeat what everybody else is saying"),
        forYourHeart: "Nu întreba mai întâi ce spune tabăra ta. Întreabă dacă ceea ce spui poate sta în lumină înaintea lui Dumnezeu și a Scripturii.",
      },
    ],
  },
  32: {
    number: 32,
    title: "Ezechia primește izbăvire, vindecare și apoi este testat prin succes",
    summary: "După amenințarea lui Sanherib și vindecarea lui Ezechia, capitolul spune că inima regelui se înalță și că Dumnezeu îl lasă pentru o vreme ca să fie încercat în legătură cu solii Babilonului.",
    units: [
      {
        from: 1, to: 23,
        heading: "Primejdia este întâmpinată prin pregătire și rugăciune",
        teaching: "Capitolul reia invazia Asiriei și izbăvirea descrisă în Împărați. Transcriptul nu repetă toate detaliile, ci se concentrează mai târziu pe testul inimii lui Ezechia. Prima parte rămâne în cadrul narațiunii: regele organizează apărarea, încurajează poporul și se roagă împreună cu Isaia.",
        source: { kind: "biblia-emanus", note: "rezumat narativ fără doctrină adăugată" },
      },
      {
        from: 24, to: 33,
        heading: "Un miracol mare poate deveni ocazia unei mândrii mari",
        teaching: "Poonen se oprește la vindecarea lui Ezechia și la semnul extraordinar asociat ei, apoi la solii veniți să întrebe despre minune. 2 Cronici spune că Dumnezeu l-a lăsat singur pentru a-l încerca și a face cunoscut ce era în inima lui. Transcriptul folosește scena ca avertisment: poți mărturisi despre o lucrare reală a lui Dumnezeu într-un mod care mută gloria spre tine. Ezechia se smerește, dar finalul vieții lui păstrează această avertizare.",
        source: p("chapter 32 ... Hezekiah ... God left Hezekiah alone to test him"),
        forYourHeart: "După o intervenție mare a lui Dumnezeu, păzește mai atent cine ajunge în centrul poveștii pe care o spui.",
      },
    ],
  },
  33: {
    number: 33,
    title: "Manase se smerește în robie și se întoarce la Dumnezeu",
    summary: "După ani de idolatrie și rău, Manase este dus în robie. În necaz se smerește, se roagă, este adus înapoi și îndepărtează idolii.",
    units: [
      {
        from: 1, to: 20,
        heading: "Cronici păstrează pocăința pe care Împărați nu o povestește",
        teaching: "Poonen evidențiază tocmai diferența dintre relatări: 2 Cronici consemnează că Manase, după ce a fost prins și dus la Babilon, s-a smerit mult înaintea Dumnezeului părinților săi, s-a rugat și a fost restaurat. Apoi îndepărtează dumnezeii străini. Pentru Poonen, această consemnare arată cât de important este faptul pocăinței finale; un trecut foarte rău nu face întoarcerea imposibilă.",
        source: p("chapter 33 verse 13 ... Manasseh ... repented ... removed the foreign gods"),
        forYourHeart: "Nu folosi gravitatea trecutului ca argument că întoarcerea nu mai are rost. Pocăința adevărată se vede și în ceea ce scoți din viață după ce te întorci.",
      },
    ],
  },
  36: {
    number: 36,
    title: "Iuda merge în exil, iar țara își primește sabatele",
    summary: "Ultimii regi resping avertismentele până când Ierusalimul este distrus și poporul dus în Babilon. Cronici leagă cei șaptezeci de ani și de sabatele pe care țara nu le primise.",
    units: [
      {
        from: 11, to: 21,
        heading: "Avertismente batjocorite până când nu mai există remediu",
        teaching: "Textul descrie o acumulare: DOMNUL trimite mesageri, poporul îi batjocorește, iar mânia ajunge la punctul în care narațiunea spune că nu mai este remediu. Poonen se oprește la versetul 21 și la cei șaptezeci de ani, legând exilul de sabatele neglijate ale țării. Nu orice necaz de șaptezeci de ani trebuie interpretat prin această schemă; este explicația pe care Cronici o oferă pentru acest exil istoric.",
        source: p("chapter 36 verse 21 ... sent to Babylon for 70 years ... did not give the land their sabbath"),
      },
      {
        from: 22, to: 23,
        heading: "Cartea se încheie cu porunca lui Cirus: «să se suie»",
        teaching: "După judecată apare o deschidere: Cirus proclamă întoarcerea și reconstruirea Casei. Aceleași versete vor deschide cartea Ezra, legând exilul de restaurare.",
        source: { kind: "biblia-emanus", note: "rezumat narativ fără doctrină adăugată" },
      },
    ],
  },
}

const CRONICI2_OVERLAY: ExplainedBookOverlay = {
  bookId: "2-cronici",
  bibleEmanusBookId: "2CH",
  name: "2 Cronici",
  testament: "vt",
  order: 14,
  transcript,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: transcriptFocusedChapters("2 Cronici", 36, focused),
}

export const CRONICI2_EXPLAINED = assertCompleteOverlay(CRONICI2_OVERLAY, 36)
