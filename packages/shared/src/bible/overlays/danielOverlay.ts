import {
  assertCompleteOverlay,
  transcriptFocusedChapters,
  type ExplainedBookOverlay,
  type ExplainedOverlayChapter,
} from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/daniel.txt"
const p = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })

const focused: Record<number, ExplainedOverlayChapter> = {
  1: {
    number: 1,
    title: "Daniel hotărăște să nu se întineze într-o țară străină",
    summary: "Poonen prezintă Daniel ca o carte foarte relevantă pentru perioade de presiune și persecuție: Dumnezeu este suveran, iar omul credincios refuză compromisul.",
    units: [{
      from: 1, to: 21,
      heading: "Suveranitatea lui Dumnezeu și hotărârea conștiinței",
      teaching: "Poonen pune alături două expresii: «DOMNUL a dat» — Dumnezeu rămâne suveran chiar când Babilonul pare să câștige — și «Daniel s-a hotărât» să nu se întineze. Ascultarea lui începe într-o chestiune concretă de hrană și legământ, iar poziția unui tânăr îi întărește și pe ceilalți trei. Dieta de zece zile nu este o formulă creștină de sănătate sau un regim superior universal; testul aparține restricțiilor legământului lui Daniel și problemei concrete a compromisului.",
      source: p("chapter 1 ... Lord gave ... Daniel made up his mind not to defile himself"),
      forYourHeart: "Nu poți controla cine conduce Babilonul, dar poți decide ce faci cu propria conștiință.",
    }],
  },
  2: {
    number: 2,
    title: "Daniel se roagă cu prietenii și refuză să-și atribuie revelația",
    summary: "Nebucadnețar cere atât visul, cât și interpretarea. Daniel caută mila lui Dumnezeu împreună cu prietenii, primește descoperirea și Îi dă lui Dumnezeu gloria.",
    units: [{
      from: 1, to: 30,
      heading: "Rugăciune în părtășie, laudă și smerenie înainte de interpretare",
      teaching: "Poonen subliniază calmul lui Daniel și faptul că nu se izolează: îi cheamă pe Hanania, Mișael și Azaria să se roage împreună. Când răspunsul vine, primul lui răspuns este laudă, iar apoi spune împăratului că taina nu i-a fost descoperită datorită unei înțelepciuni superioare proprii. Aceasta este o protecție importantă împotriva slujirii care transformă darul în imagine personală.",
      source: p("chapter 2 ... fellowship in prayer ... not due to my cleverness"),
    }, {
      from: 31, to: 49,
      heading: "Statuia și împărăția pe care Dumnezeu o va ridica",
      teaching: "Poonen urmărește interpretarea clasică din transcript: aurul Babilon, argintul Medo-Persia, bronzul Grecia, fierul Roma, apoi împărăția lui Dumnezeu reprezentată de piatra care zdrobește statuia. El merge mai departe spre o interpretare escatologică a fierului și lutului, inclusiv posibilitatea unor zece regate și Europa. Aceste detalii sunt interpretarea lui Poonen și nu sunt declarate doctrină Emanus, deoarece textul nu numește Europa și există mai multe modele creștine de interpretare a ultimelor elemente ale viziunii.",
      source: p("statue ... gold silver bronze iron ... ten kingdoms ... possibly in Europe"),
    }],
  },
  3: {
    number: 3,
    title: "Trei oameni nu se pleacă atunci când toată câmpia se pleacă",
    summary: "Șadrac, Meșac și Abed-Nego refuză închinarea chipului de aur și sunt aruncați în cuptor, unde nu sunt singuri.",
    units: [{
      from: 1, to: 30,
      heading: "Credință care nu condiționează ascultarea de rezultatul dorit",
      teaching: "Poonen spune că pentru el miracolul cel mai mare nu este doar supraviețuirea focului, ci faptul că atunci când toți se pleacă, trei oameni rămân în picioare. Răspunsul lor este decisiv: Dumnezeu poate izbăvi, dar «chiar dacă nu», ei nu se vor închina idolului. Transcriptul aplică apoi focul încercării ca loc în care legăturile ard. Această imagine nu cere oamenilor să rămână voluntar în abuz sau pericol evitabil; situația celor trei este persecuție pentru refuzul idolatriei.",
      source: p("chapter 3 ... greatest miracle ... everybody bowed down three people did not bow down"),
      forYourHeart: "Credința matură spune nu numai «Dumnezeu mă poate salva», ci și «nu voi numi răul bine chiar dacă rezultatul nu este cel dorit».",
    }],
  },
  4: {
    number: 4,
    title: "Nebucadnețar este smerit după avertismente repetate",
    summary: "Împăratul primește un vis care îi avertizează mândria, dar continuă să se glorifice până când este smerit și ajunge să recunoască domnia Celui Preaînalt.",
    units: [{
      from: 1, to: 37,
      heading: "Puterea nu schimbă faptul că omul primește totul sub suveranitatea lui Dumnezeu",
      teaching: "Poonen vede capitolele 2–4 ca avertismente repetate pentru Nebucadnețar. În capitolul 4, mândria regelui ajunge la punctul în care atribuie Babilonul propriei puteri, iar judecata anunțată vine. Restaurarea este legată de recunoașterea stăpânirii lui Dumnezeu. Afecțiunea regelui nu trebuie diagnosticată medical din text sau folosită pentru stigmatizarea tulburărilor psihice moderne; narațiunea o prezintă ca judecată particulară asupra acestui rege.",
      source: p("Daniel chapter 2 ... chapter 3 ... chapter 4 ... three times God had warned him"),
    }],
  },
  5: {
    number: 5,
    title: "Scrisul de pe zid și împărăția cântărită",
    summary: "Belșațar profanează vasele templului, iar în timpul ospățului apare scrisul care anunță sfârșitul împărăției.",
    units: [{
      from: 1, to: 31,
      heading: "Ceea ce omul tratează ca spectacol poate fi sfânt înaintea lui Dumnezeu",
      teaching: "Poonen leagă capitolul de schimbarea de putere către Darius și de sfârșitul Babilonului. Mesajul «cântărit și găsit prea ușor» arată evaluarea pe care puterea omenească nu o poate evita. Overlay-ul nu transformă orice eșec politic într-o judecată direct identificată fără revelație; aici textul însuși oferă interpretarea.",
      source: p("chapter 5 ... Babylon was destroyed and Darius the Mede took over"),
    }],
  },
  6: {
    number: 6,
    title: "Daniel continuă să se roage când rugăciunea devine ilegală",
    summary: "Sub Darius, adversarii folosesc fidelitatea lui Daniel ca singurul punct prin care îl pot ataca. El continuă ritmul de rugăciune și este aruncat în groapa cu lei.",
    units: [{
      from: 1, to: 28,
      heading: "Integritatea care lasă adversarilor doar credința ca acuzație",
      teaching: "Poonen urmărește Daniel ca om care trăiește prin schimbări de imperii fără să-și schimbe loialitatea față de Dumnezeu. Capitolul 6 arată că adversarii nu găsesc corupție administrativă și trebuie să construiască o lege împotriva practicii lui religioase. Daniel nu își începe rugăciunea ca provocare politică; continuă ceea ce făcea înainte. Izbăvirea din groapă este un act particular al lui Dumnezeu și nu o promisiune că fiecare martir va fi scăpat fizic.",
      source: p("chapter 6 ... time of Darius"),
    }],
  },
  7: {
    number: 7,
    title: "Fiarele împărățiilor și Fiul Omului",
    summary: "Viziunea schimbă imaginea imperiilor de la metale prețioase la fiare și ajunge la Cel ca un Fiu al Omului care primește o domnie veșnică.",
    units: [{
      from: 1, to: 28,
      heading: "Împărățiile trec, domnia Fiului Omului rămâne",
      teaching: "Poonen citește viziunile lui Daniel în linie escatologică și vede împărățiile pământești urmate de domnia lui Hristos. Titlul «Fiul Omului» devine esențial în Evanghelii pentru Iisus. Detaliile de identificare ale coarnelor și cronologiilor sunt interpretate diferit în tradițiile creștine; Emanus păstrează ceea ce textul și Noul Testament susțin clar și etichetează schemele suplimentare drept interpretare.",
      source: p("vision ... kingdoms ... coming of Christ"),
    }],
  },
  9: {
    number: 9,
    title: "Daniel citește Ieremia și transformă cronologia în rugăciune",
    summary: "Când înțelege din Ieremia că cei șaptezeci de ani se apropie de sfârșit, Daniel nu așteaptă pasiv, ci se roagă și mărturisește păcatul poporului.",
    units: [{
      from: 1, to: 27,
      heading: "Profeția adevărată produce rugăciune, nu doar calcule",
      teaching: "Poonen spune că mișcarea întoarcerii din Babilon a început prin rugăciunea lui Daniel. El citește cei șaptezeci de ani din Ieremia și se identifică în mărturisire cu poporul. A doua parte a capitolului, cu cele șaptezeci de săptămâni, are mai multe interpretări creștine privind cronologia exactă; overlay-ul nu transformă o schemă escatologică particulară într-o condiție doctrinară.",
      source: p("chapter 9 ... praying because the 70 years are over ... started the ball rolling"),
      forYourHeart: "Cunoașterea profeției nu trebuie să te facă spectator al calendarului, ci om care se roagă și se pocăiește.",
    }],
  },
  10: {
    number: 10,
    title: "Rugăciunea lui Daniel și conflictul nevăzut",
    summary: "Daniel postește și primește o viziune în care mesagerul vorbește despre opoziție spirituală legată de Persia.",
    units: [{
      from: 1, to: 21,
      heading: "Există realități nevăzute, dar textul nu ne dă o hartă completă a lor",
      teaching: "Poonen numește capitolul 10 o imagine a luptei din locurile cerești. Mesagerul spune că răspunsul a fost legat de o confruntare cu «căpetenia Persiei». Textul susține existența unui conflict spiritual, dar nu autorizează construirea unor doctrine detaliate despre «demoni teritoriali» sau tehnici prin care credincioșii ar identifica și comanda entități spirituale pe regiuni.",
      source: p("chapter 10 speaks about a struggle in the heavenlies"),
    }],
  },
  12: {
    number: 12,
    title: "Înviere, încercare și chemarea lui Daniel să meargă până la sfârșit",
    summary: "Ultimul capitol vorbește despre o vreme de strâmtorare, despre înviere și despre lucruri pecetluite până la vremea sfârșitului.",
    units: [{
      from: 1, to: 13,
      heading: "Unele lucruri sunt descoperite, altele rămân pecetluite",
      teaching: "Poonen se oprește la 12:2 și vorbește despre înviere — unii pentru viață veșnică, alții pentru rușine. El citește pasajele despre strâmtorare în schema sa despre Antihrist și persecuția finală. Emanus păstrează certitudinea învierii și a judecății din text, dar marchează cronologia și identificările escatologice detaliate ca interpretări. Finalul către Daniel este sobru: «du-te până va veni sfârșitul»; omul nu primește toate datele, dar este chemat să rămână credincios.",
      source: p("chapter 12 ... two resurrections ... go your way in the end"),
    }],
  },
}

const DANIEL_OVERLAY: ExplainedBookOverlay = {
  bookId: "daniel",
  bibleEmanusBookId: "DAN",
  name: "Daniel",
  testament: "vt",
  order: 27,
  transcript,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: transcriptFocusedChapters("Daniel", 12, focused),
}

export const DANIEL_EXPLAINED = assertCompleteOverlay(DANIEL_OVERLAY, 12)
