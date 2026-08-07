import {
  assertCompleteOverlay,
  transcriptFocusedChapters,
  type ExplainedBookOverlay,
  type ExplainedOverlayChapter,
} from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/nehemiah-esther.txt"
const p = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })
const n = { kind: "biblia-emanus" as const, note: "rezumat narativ fără doctrină adăugată" as const }

const focused: Record<number, ExplainedOverlayChapter> = {
  1: {
    number: 1,
    title: "O împărăție fastuoasă și o criză la curtea persană",
    summary: "Ahașveroș își expune bogăția, organizează un ospăț mare și intră în conflict cu împărăteasa Vasti. Cartea pregătește astfel locul în care Estera va ajunge mai târziu.",
    units: [
      {
        from: 1, to: 22,
        heading: "Dumnezeu nu este numit, dar povestea începe să așeze circumstanțele",
        teaching: "Poonen observă că numele lui Dumnezeu nu apare în Estera. El propune o explicație spirituală legată de faptul că acești iudei au rămas în Persia, dar textul biblic nu spune explicit că acesta este motivul absenței Numelui. Overlay-ul păstrează aici numai faptul literar sigur: Dumnezeu nu este numit direct, iar evenimentele se desfășoară într-o curte persană în care providența va fi văzută prin succesiunea circumstanțelor.",
        source: p("book of Esther ... name of God never appears"),
      },
    ],
  },
  2: {
    number: 2,
    title: "Estera ajunge împărăteasă, iar Mardoheu descoperă un complot",
    summary: "Estera este adusă în sistemul curții și ajunge împărăteasă. Mardoheu află de un complot împotriva regelui, iar fapta lui este consemnată în cronici.",
    units: [
      {
        from: 1, to: 23,
        heading: "Fapta credincioasă este consemnată înainte să fie răsplătită",
        teaching: "Poonen amintește complotul descoperit de Mardoheu și faptul că investigația confirmă informația. Răsplata nu vine imediat; consemnarea va deveni importantă abia mai târziu. Transcriptul mai numește drept compromis faptul că Estera ajunge soția unui împărat păgân. Aceasta este interpretarea lui Poonen, nu o condamnare explicită formulată de carte; textul însuși nu oferă un verdict moral direct asupra Esterei pentru situația în care ajunge.",
        source: p("plot was investigated chapter 2 verse 23"),
        forYourHeart: "Nu toate faptele bune primesc recunoaștere imediată. Faptul că o faptă nu este răsplătită acum nu înseamnă că a fost uitată.",
      },
    ],
  },
  3: {
    number: 3,
    title: "Mardoheu nu se pleacă înaintea lui Haman, iar mânia unui om amenință un popor",
    summary: "Haman este înălțat, Mardoheu refuză să i se plece, iar Haman transformă conflictul personal într-un plan de exterminare a iudeilor.",
    units: [
      {
        from: 1, to: 15,
        heading: "Orgoliul rănit caută o răzbunare disproporționată",
        teaching: "Poonen subliniază că Mardoheu avea principii pe care nu era gata să le abandoneze: nu se pleacă înaintea lui Haman. Haman nu se mulțumește să-l pedepsească pe Mardoheu, ci vrea să distrugă întregul popor. Textul expune cât de departe poate merge puterea când orgoliul personal primește instrumente politice.",
        source: p("Mordecai ... would not bow down ... Haman got very angry with all the Jews"),
        forYourHeart: "Când o ofensă personală te face să dorești răul unui grup întreg, mânia a trecut deja dincolo de dreptate.",
      },
    ],
  },
  4: {
    number: 4,
    title: "«Cine știe dacă nu pentru o vreme ca aceasta?»",
    summary: "Mardoheu îi cere Esterei să folosească poziția pe care o are. Estera cheamă iudeii la post și hotărăște să intre la împărat chiar cu riscul vieții.",
    units: [
      {
        from: 1, to: 17,
        heading: "Poziția poate fi o oportunitate de responsabilitate, nu o garanție de siguranță",
        teaching: "Poonen se oprește la avertismentul lui Mardoheu: palatul nu o va proteja automat pe Estera, iar izbăvirea poporului nu depinde în ultimă instanță de ea. «Cine știe» păstrează modestia afirmației: Mardoheu nu pretinde o revelație directă, ci vede posibilitatea ca poziția ei să fie tocmai oportunitatea acestei crize. Estera răspunde prin post și asumarea riscului.",
        source: p("chapter 4 ... if you remain silent ... deliverance will come ... for this particular time"),
        forYourHeart: "Întreabă nu doar ce avantaj îți oferă poziția, ci ce responsabilitate față de alții vine odată cu ea.",
      },
    ],
  },
  5: {
    number: 5,
    title: "Estera înaintează cu răbdare, iar Haman nu se poate bucura cât timp Mardoheu nu i se pleacă",
    summary: "Estera este primită de împărat și pregătește două ospețe. Haman se laudă cu statutul lui, dar recunoaște că toate acestea nu îi sunt de ajuns cât timp Mardoheu rămâne în picioare.",
    units: [
      {
        from: 1, to: 14,
        heading: "O inimă dominată de orgoliu nu se poate bucura de ceea ce are",
        teaching: "Poonen citează mărturisirea lui Haman din final: bogăția, poziția și invitația specială nu îi aduc satisfacție cât timp un singur om refuză să i se plece. Orgoliul transformă o viață plină de privilegii într-o obsesie pentru persoana care nu îl validează.",
        source: p("Esther 5 ... all of this doesn't satisfy me as long as ... Mordecai not bowing down"),
        forYourHeart: "Dacă o singură persoană care nu te admiră poate anula toate darurile pe care le ai, problema nu este lipsa recunoașterii, ci puterea pe care i-ai dat-o orgoliului.",
      },
    ],
  },
  6: {
    number: 6,
    title: "În noaptea în care Haman pregătește spânzurătoarea, împăratul nu poate dormi",
    summary: "Insomnia împăratului duce la citirea cronicilor și la descoperirea faptului că Mardoheu nu fusese răsplătit. Haman intră tocmai când regele caută o cale de a-l onora.",
    units: [
      {
        from: 1, to: 14,
        heading: "Providența lucrează prin sincronizări pe care personajele nu le controlează",
        teaching: "Poonen pune accent puternic pe timp: Mardoheu doarme fără să știe că se construiește spânzurătoarea, împăratul nu poate dormi, se citește exact înregistrarea potrivită, iar Haman intră când regele tocmai se gândește la răsplătirea lui Mardoheu. Cartea nu numește direct pe Dumnezeu, dar succesiunea evenimentelor arată o providență pe care oamenii nu o orchestrează.",
        source: p("Mordecai was fast asleep ... at that very moment ... timing"),
        forYourHeart: "Nu trebuie să cunoști toate comploturile ca Dumnezeu să poată lucra. Fidelitatea ta nu depinde de accesul la toate informațiile ascunse.",
      },
    ],
  },
  7: {
    number: 7,
    title: "Estera îl demască pe Haman, iar planul lui se întoarce asupra lui",
    summary: "La al doilea ospăț, Estera își dezvăluie identitatea și planul de exterminare. Haman este executat pe spânzurătoarea pregătită pentru Mardoheu.",
    units: [
      {
        from: 1, to: 10,
        heading: "Planul ascuns este adus în fața autorității",
        teaching: "Poonen descrie scena ca momentul în care mesele se întorc: Estera expune planul, iar instrumentul pregătit pentru Mardoheu devine locul execuției lui Haman. Narațiunea aparține sistemului juridic și politic persan; nu este o permisiune pentru răzbunare privată sau pentru a cere moartea adversarilor moderni.",
        source: p("Esther exposed Haman ... hanged on the gallows which he had made for Mordecai"),
      },
    ],
  },
  8: {
    number: 8,
    title: "Decretul nu poate fi retras, dar este emis un contra-decret",
    summary: "Mardoheu primește poziția lui Haman, iar Estera cere din nou ajutor. Pentru că decretul inițial nu poate fi revocat, este emis un nou decret care le permite iudeilor să se apere.",
    units: [
      {
        from: 1, to: 17,
        heading: "Izbăvirea folosește chiar structurile sistemului în care poporul trăiește",
        teaching: "Transcriptul vede în Estera grija lui Dumnezeu pentru un popor aflat în Persia, chiar dacă Poonen îi critică pentru confort și compromis. Este important să separăm faptul sigur de interpretarea lui: cartea arată protecție și răsturnare providențială; nu afirmă explicit că toți iudeii rămași în Persia erau neascultători.",
        source: p("he cares for them ... protected them from death"),
      },
    ],
  },
  9: {
    number: 9,
    title: "Ziua hotărâtă pentru distrugere devine zi de izbăvire și Purim",
    summary: "Iudeii se apără împotriva celor care caută să-i omoare, iar victoria este transformată într-o sărbătoare anuală a izbăvirii.",
    units: [
      {
        from: 1, to: 32,
        heading: "Memoria izbăvirii este păstrată pentru generațiile următoare",
        teaching: "Capitolul descrie violență într-un cadru de autoapărare autorizată prin decret imperial și apoi instituirea Purimului. Overlay-ul nu transformă uciderile într-un model de violență religioasă modernă. Punctul sigur păstrat este răsturnarea zilei de teamă într-o zi de odihnă și memorie.",
        source: n,
      },
    ],
  },
  10: {
    number: 10,
    title: "Mardoheu ajunge al doilea după împărat și caută binele poporului său",
    summary: "Cartea se încheie cu poziția lui Mardoheu și cu descrierea lui ca om care caută binele poporului și vorbește pentru pacea neamului său.",
    units: [
      {
        from: 1, to: 3,
        heading: "Finalul păstrează responsabilitatea față de binele altora",
        teaching: "Poonen nu dezvoltă separat capitolul final. Biblia Emanus păstrează imaginea lui Mardoheu în poziție înaltă, dar orientat spre binele poporului său. Aceasta închide firul deschis când poziția Esterei și a lui Mardoheu a devenit responsabilitate în timpul crizei.",
        source: n,
      },
    ],
  },
}

const ESTERA_OVERLAY: ExplainedBookOverlay = {
  bookId: "estera",
  bibleEmanusBookId: "EST",
  name: "Estera",
  testament: "vt",
  order: 17,
  transcript,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: transcriptFocusedChapters("Estera", 10, focused),
}

export const ESTERA_EXPLAINED = assertCompleteOverlay(ESTERA_OVERLAY, 10)
