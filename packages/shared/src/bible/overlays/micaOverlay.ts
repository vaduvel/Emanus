import {
  assertCompleteOverlay,
  transcriptFocusedChapters,
  type ExplainedBookOverlay,
  type ExplainedOverlayChapter,
} from "../explainedOverlay.js"

const sourceUrl = "https://www.cfcindia.com/through-the-bible/jonah-micah"
const p = (section: string) => ({ kind: "poonen-official" as const, sourceUrl, section })
const n = {
  kind: "biblia-emanus" as const,
  note: "rezumat narativ fără doctrină adăugată" as const,
}

const focused: Record<number, ExplainedOverlayChapter> = {
  1: {
    number: 1,
    title: "Judecata asupra Samariei și Iudei",
    summary: "Mica deschide cu DOMNUL ca martor împotriva poporului și cu anunțarea judecății asupra Samariei și Iudei.",
    units: [{
      from: 1, to: 16,
      heading: "Judgment on Samaria and Judah",
      teaching: "Prima secțiune oficială Poonen este judecata asupra Samariei și Iudei. Privilegiul religios al celor două regate nu îi scoate de sub evaluarea lui Dumnezeu. Textul numește idolatria și consecințele ei; narațiunea profetică nu autorizează comunități moderne să identifice fiecare catastrofă ca judecată directă fără o revelație explicită comparabilă.",
      source: p("Judgment on Samaria and Judah"),
    }],
  },
  2: {
    number: 2,
    title: "Ogoarele sunt răpite, adevărul este redus la tăcere, dar rămășița este adunată",
    summary: "Mica confruntă oameni care transformă puterea economică în mijloc de a lua case și moșteniri. Când profeția devine incomodă, mesajul cerut este unul plăcut; capitolul se încheie însă cu imaginea adunării rămășiței.",
    units: [
      {
        from: 1, to: 5,
        heading: "Răul planificat noaptea devine confiscare dimineața",
        teaching: "Primele versete descriu nelegiuirea ca plan deliberat: oamenii o gândesc în așternut și o execută când se face ziuă pentru că au puterea s-o facă. Exemplele sunt concrete — poftesc ogoare și case, apoi le iau, apăsând omul împreună cu moștenirea lui. Judecata anunțată răspunde chiar acestei folosiri a puterii pentru confiscare.",
        source: n,
      },
      {
        from: 6, to: 11,
        heading: "«Nu prorociți» — mesajul incomod este respins, iar minciuna devine preferată",
        teaching: "Când profetul numește răul și consecința lui, răspunsul este cererea de a nu mai proroci astfel de lucruri. Textul continuă cu alte forme de exploatare: haina este luată de la omul pașnic, femeile sunt izgonite din case, iar copiii pierd ceea ce le fusese dat. Contrastul final este tăios: un profet care ar vorbi despre vin și băutură ar fi exact mesagerul pe care un asemenea popor l-ar prefera.",
        source: n,
      },
      {
        from: 12, to: 13,
        heading: "Rămășița este strânsă, iar Împăratul merge înaintea ei",
        teaching: "După acuzațiile și amenințările capitolului, ultimele două versete schimbă imaginea: Iacov este strâns, rămășița lui Israel este adunată ca o turmă, iar drumul este deschis înaintea ei. Textul încheie cu Împăratul mergând înainte și cu DOMNUL în frunte, astfel încât verdictul asupra exploatării nu este ultimul tablou al capitolului.",
        source: n,
      },
    ],
  },
  3: {
    number: 3,
    title: "Conducători care urăsc binele și profeți care vorbesc după plată",
    summary: "Mica confruntă liderii politici și religioși care exploatează poporul și adaptează mesajul la interes.",
    units: [{
      from: 1, to: 12,
      heading: "Corrupt Leaders and God's Authority",
      teaching: "Tema distinctivă Poonen pentru Mica este «lideri corupți și autoritatea lui Dumnezeu». Capitolul 3 explică foarte concret corupția: conducători care distorsionează dreptatea, preoți care învață pentru plată și profeți care prorocesc pentru bani, în timp ce declară că DOMNUL este cu ei. Autoritatea religioasă nu transformă exploatarea în slujire.",
      source: p("Corrupt Leaders and God's Authority"),
      forYourHeart: "Când banii sau loialitatea față de lider decid mesajul, autoritatea lui Dumnezeu a fost deja înlocuită de alt stăpân.",
    }],
  },
  4: {
    number: 4,
    title: "Muntele DOMNULUI și o împărăție în care sabia nu este centrul",
    summary: "După judecată, Mica vede neamurile venind la învățătura DOMNULUI și descrie o lume în care armele sunt transformate pentru cultivare.",
    units: [{
      from: 1, to: 13,
      heading: "Coming Kingdom and King",
      teaching: "A doua secțiune Poonen este «Împărăția și Împăratul care vin». Mica 4 vede neamurile căutând căile lui Dumnezeu și transformarea săbiilor în fiare de plug. Imaginile despre conflictul final din același capitol trebuie ținute alături de această țintă a păcii și nu folosite ca mandat pentru militarizarea bisericii.",
      source: p("Coming Kingdom and King"),
    }],
  },
  5: {
    number: 5,
    title: "Betleemul și Conducătorul promis",
    summary: "Mica vorbește despre un Conducător care va ieși din Betleem și va păstori în puterea DOMNULUI.",
    units: [{
      from: 1, to: 15,
      heading: "Împăratul venit dintr-un loc mic",
      teaching: "Tema «Împărăția și Împăratul» ajunge la profeția din 5:2, pe care Matei o folosește în relatarea nașterii lui Iisus. Mărimea redusă a Betleemului contrastează cu importanța Conducătorului promis. Lectura mesianică este ancorată în Noul Testament; nu transformă celelalte imagini militare ale capitolului în ordine pentru comunitatea creștină.",
      source: p("Coming Kingdom and King"),
    }],
  },
  6: {
    number: 6,
    title: "Controversa lui Dumnezeu cu poporul și ce cere DOMNUL",
    summary: "Dumnezeu își amintește fidelitatea, poporul întreabă ce jertfă ar fi suficientă, iar profetul răspunde prin dreptate, milă și smerenie.",
    units: [{
      from: 1, to: 16,
      heading: "God's Controversy with His People",
      teaching: "Ultima secțiune oficială Poonen este «controversa lui Dumnezeu cu poporul Său». Mica 6 respinge escaladarea ritualului ca soluție — mii de berbeci sau chiar sacrificiul copilului — și formulează 6:8: să faci dreptate, să iubești mila și să umbli smerit cu Dumnezeu. Versetul nu reduce întreaga credință la trei sloganuri, dar arată ce nu poate fi înlocuit prin religie spectaculoasă.",
      source: p("God's Controversy with His People"),
      words: [{
        original: "מִשְׁפָּט ... חֶסֶד ... הַצְנֵעַ",
        transliteration: "mișpat ... hesed ... hațnea",
        language: "ebraica",
        meaning: "dreptate; iubire statornică/milă; umblare smerită/modestă — triada etică din Mica 6:8.",
        verseRef: "Mica 6:8",
        lexicalSource: "WLC-OSHB",
      }],
    }],
  },
  7: {
    number: 7,
    title: "Cine este un Dumnezeu ca Tine, care iartă?",
    summary: "Cartea se încheie cu așteptare în Dumnezeu, mărturisirea păcatului și celebrarea milei Lui.",
    units: [{
      from: 1, to: 20,
      heading: "Mânia nu este ținută pentru totdeauna, pentru că El Își găsește plăcerea în milă",
      teaching: "Finalul controversei nu este cinismul, ci caracterul lui Dumnezeu: El iartă, trece peste fărădelege și Își găsește plăcerea în bunătate. Promisiunea este legată de legământul cu Avraam și Iacov. Mila nu declară răul imaginar; ea îl confruntă și apoi arată că Dumnezeu nu este definit de plăcerea de a condamna.",
      source: p("God's Controversy with His People"),
    }],
  },
}

const MICA_OVERLAY: ExplainedBookOverlay = {
  bookId: "mica",
  bibleEmanusBookId: "MIC",
  name: "Mica",
  testament: "vt",
  order: 33,
  transcript: sourceUrl,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: transcriptFocusedChapters("Mica", 7, focused),
}

export const MICA_EXPLAINED = assertCompleteOverlay(MICA_OVERLAY, 7)
