import {
  assertCompleteOverlay,
  transcriptFocusedChapters,
  type ExplainedBookOverlay,
  type ExplainedOverlayChapter,
} from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/job.txt"
const p = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })

const focused: Record<number, ExplainedOverlayChapter> = {
  1: {
    number: 1,
    title: "Iov este numit neprihănit înainte ca suferința lui să înceapă",
    summary: "Cartea deschide cortina asupra unei discuții cerești pe care Iov nu o cunoaște. Dumnezeu îl descrie pe Iov drept om integru, iar acuzatorul contestă motivele credincioșiei lui.",
    units: [
      {
        from: 1,
        to: 5,
        heading: "Verdictul de început trebuie ținut minte când vin acuzațiile",
        teaching: "Poonen începe cartea prin problema suferinței și insistă asupra primelor cuvinte despre Iov: este integru, drept, se teme de Dumnezeu și se abate de la rău. Această evaluare vine înaintea dezastrelor și împiedică lectura greșită în care suferința ar fi dovada că Iov trăia în păcat ascuns. Cartea va arăta defecte și nevoia lui de smerire, dar cauza inițială a încercării nu este prezentată ca pedeapsă pentru o viață dublă.",
        source: p("Job 1-1 ... blameless, upright, fearing God, turning away from evil"),
        forYourHeart: "Nu folosi suferința altuia ca probă că Dumnezeu îl condamnă. În Iov, cititorul știe de la început ceva ce prietenii nu știu.",
      },
      {
        from: 6,
        to: 22,
        heading: "Acuzatorul nu poate trece dincolo de limita îngăduită",
        teaching: "Poonen se oprește la imaginea «gardului» pe care Satan spune că Dumnezeu l-a pus în jurul lui Iov, casei și bunurilor lui. El vede aici o mare mângâiere: acuzatorul nu acționează independent de suveranitatea lui Dumnezeu. În narațiune, permisiunea este limitată. Aceasta nu înseamnă că putem explica fiecare tragedie personală printr-o scenă identică nevăzută; Iov ne oferă acces la această situație particulară pentru a arăta că suferința nu este în afara stăpânirii lui Dumnezeu.",
        source: p("you have made a hedge around him ... Satan had to ask God for permission"),
        forYourHeart: "Poți să nu cunoști motivul încercării și totuși să știi că răul nu este suveran.",
      },
    ],
  },
  2: {
    number: 2,
    title: "Suferința ajunge în trup, dar viața lui Iov rămâne sub limită",
    summary: "Acuzatorul primește voie să lovească sănătatea lui Iov, dar nu să-i ia viața. Soția îl împinge spre renunțare, iar prietenii vin și stau o vreme în tăcere.",
    units: [
      {
        from: 1,
        to: 10,
        heading: "Încercarea se adâncește fără ca Dumnezeu să fi pierdut controlul",
        teaching: "Poonen continuă tema limitelor: Satan primește permisiune asupra trupului lui Iov, dar viața lui trebuie cruțată. El remarcă și presiunea venită din propria casă. Totuși este important să nu generalizăm comentariile dure ale transcriptului despre soția lui Iov la femei sau la soții care se prăbușesc sub traumă; ea pierduse și ea copiii și bunurile familiei. Textul consemnează cuvântul ei greșit, nu o doctrină despre caracterul tuturor soțiilor aflate în suferință.",
        source: p("God gave permission ... his body ... wife"),
      },
      {
        from: 11,
        to: 13,
        heading: "Cel mai bun lucru făcut de prieteni la început este să stea cu el în tăcere",
        teaching: "Prietenii vin, plâng și stau șapte zile fără să vorbească. Abia după ce încep explicațiile vor apărea acuzațiile pe care Dumnezeu le va corecta la final. Narațiunea oferă o imagine puternică a prezenței înaintea teoriei.",
        source: p("Job's three friends ... came ... adversity"),
        forYourHeart: "Înainte să explici durerea altuia, întreabă dacă nu cumva primul dar de care are nevoie este prezența ta.",
      },
    ],
  },
  3: {
    number: 3,
    title: "Iov își blestemă ziua nașterii, nu pe Dumnezeu",
    summary: "După tăcerea îndelungată, Iov dă glas unei dureri extreme și dorește să nu se fi născut. Cartea nu ascunde limbajul întunecat al unui om zdrobit.",
    units: [
      {
        from: 1,
        to: 26,
        heading: "Lamentația lui Iov trebuie citită în lumina revelației pe care el nu o avea",
        teaching: "Poonen spune că putem înțelege de ce Iov se plânge atât: el nu vede scena cerească pe care cititorul a văzut-o în capitolele 1–2. Transcriptul avertizează însă să nu transformăm fiecare plângere a lui Iov într-un model complet pentru credinciosul care a primit mai multă revelație. Capitolul rămâne totodată o mărturie că Scriptura nu cenzurează cuvintele unui om aflat în durere extremă.",
        source: p("we can understand why Job complains so much ... much less was given to Job"),
        forYourHeart: "Dacă cineva vorbește dintr-o durere copleșitoare, nu-i trata fiecare propoziție ca teză doctrinară. Ascultă omul și ține minte că suferința poate îngusta ceea ce vede.",
      },
    ],
  },
  4: {
    number: 4,
    title: "Încep discursurile prietenilor: multe cuvinte religioase, un diagnostic greșit",
    summary: "Elifaz începe prima rundă de dezbateri. De aici până în capitolul 31, Iov și prietenii lui trec prin trei cicluri de discursuri.",
    units: [
      {
        from: 1,
        to: 21,
        heading: "Nu transforma discursurile prietenilor în verdictul lui Dumnezeu",
        teaching: "Poonen dă o regulă de lectură esențială pentru capitolele 4–31: la final, în Iov 42:7, DOMNUL îi spune lui Elifaz că el și cei doi prieteni nu au vorbit drept despre Dumnezeu cum a vorbit Iov. De aceea afirmațiile lor nu pot fi citate automat ca doctrină doar pentru că se află în Biblie. Scriptura le consemnează fidel cuvintele, inclusiv presupunerea repetată că suferința lui Iov dovedește păcat ascuns, tocmai pentru ca cititorul să vadă eroarea.",
        source: p("three rounds ... chapter 3 to chapter 31 ... you have not been right in what you said about me"),
        forYourHeart: "Un argument poate suna biblic și totuși aplica adevărul într-un mod fals. Verifică nu numai propoziția, ci și felul în care este folosită asupra omului din fața ta.",
      },
    ],
  },
  19: {
    number: 19,
    title: "În mijlocul acuzațiilor, Iov mărturisește speranța că Răscumpărătorul lui trăiește",
    summary: "Iov descrie izolarea și rușinea pe care le trăiește, dar rostește una dintre cele mai puternice afirmații de speranță ale cărții despre Răscumpărătorul său viu.",
    units: [
      {
        from: 23,
        to: 27,
        heading: "Răscumpărătorul viu în mijlocul unei situații pe care Iov nu o poate explica",
        teaching: "Transcriptul tratează Iov ca om care, deși nu avea Scriptura și nu înțelegea motivul încercării, se agață de Dumnezeu în mijlocul confuziei. Afirmația despre Răscumpărător nu rezolvă dezbaterea cu prietenii, dar arată că speranța lui Iov nu este redusă la recuperarea bunurilor sau la aprobarea oamenilor.",
        source: p("Job ... godly man ... God does not forsake him"),
        words: [
          {
            original: "גֹּאֲלִי",
            transliteration: "go'ali",
            language: "ebraica",
            meaning: "«răscumpărătorul meu / ruda mea răscumpărătoare», de la rădăcina גאל. În context exprimă speranța lui Iov că există Cineva care îi va apăra cauza.",
            verseRef: "Iov 19:25",
            lexicalSource: "WLC-OSHB",
          },
        ],
      },
    ],
  },
  32: {
    number: 32,
    title: "Elihu intră în discuție după ce cei trei prieteni au tăcut",
    summary: "Un om mai tânăr, Elihu, spune că a așteptat din respect pentru vârstă, apoi începe o intervenție care va continua până în capitolul 37.",
    units: [
      {
        from: 1,
        to: 22,
        heading: "Zelul și vocabularul nu înlocuiesc experiența încercării",
        teaching: "Poonen vede în Elihu un om inteligent și indignat atât pe Iov, cât și pe prietenii lui, dar folosește viața lui ca avertisment că slujirea fără trecere prin încercare poate rămâne superficială. Cartea nu redă o mustrare explicită a lui Dumnezeu adresată lui Elihu, deci nu trebuie să afirmăm mai mult decât spune textul; overlay-ul păstrează observația lui Poonen ca aplicație, nu ca verdict inspirat asupra fiecărei propoziții a lui Elihu.",
        source: p("if you don't have experience of trial and suffering, your ministry will be very shallow ... Elihu"),
      },
    ],
  },
  38: {
    number: 38,
    title: "DOMNUL răspunde din furtună, dar nu îi explică lui Iov scena din capitolele 1–2",
    summary: "După toate discursurile omenești, Dumnezeu vorbește. Răspunsul Lui îl conduce pe Iov prin creație și prin limitele cunoașterii omenești.",
    units: [
      {
        from: 1,
        to: 41,
        heading: "Dumnezeu nu răspunde cu teoria pe care cititorul o așteaptă",
        teaching: "Poonen observă că atunci când Dumnezeu vorbește, nu îi oferă lui Iov explicația detaliată despre Satan, pierderi și cauze. Îi arată în schimb măreția creației și cât de puțin controlează sau înțelege omul. Scopul nu este batjocorirea suferindului, ci reașezarea lui înaintea Dumnezeului a cărui înțelepciune depășește ceea ce Iov poate vedea.",
        source: p("God replies to Job ... he doesn't talk about his suffering ..."),
        forYourHeart: "Uneori Dumnezeu nu răspunde întrebării «de ce?» în forma în care ai cerut. El poate răspunde mai întâi întrebării mai adânci: «Cine este Dumnezeul în mâna Căruia mă aflu?»",
      },
    ],
  },
  40: {
    number: 40,
    title: "Iov își pune mâna la gură",
    summary: "În fața întrebărilor lui Dumnezeu, Iov recunoaște micimea propriului răspuns. Dumnezeu continuă să îl confrunte cu diferența dintre puterea Creatorului și puterea omului.",
    units: [
      {
        from: 1,
        to: 24,
        heading: "Întâlnirea cu Dumnezeu micșorează nevoia de a câștiga disputa",
        teaching: "În lectura lui Poonen, drumul cărții îl aduce pe Iov spre un punct în care nu mai încearcă să își dovedească dreptatea înaintea tuturor. Nu înseamnă că acuzațiile prietenilor devin corecte; Dumnezeu însuși le va respinge. Înseamnă că Iov ajunge să vadă ceva despre Dumnezeu și despre sine care este mai mare decât victoria într-o dezbatere.",
        source: p("God's brief message ... bring Job ..."),
      },
    ],
  },
  42: {
    number: 42,
    title: "Iov se smerește, prietenii sunt mustrați, iar Dumnezeu restaurează",
    summary: "Iov mărturisește că vorbise despre lucruri prea minunate pentru el. Dumnezeu îi mustră pe prieteni, le cere să meargă la Iov, iar Iov se roagă pentru ei. Finalul vorbește despre restaurare și despre compasiunea DOMNULUI.",
    units: [
      {
        from: 1,
        to: 6,
        heading: "«Acum ochiul meu Te-a văzut»",
        teaching: "Poonen se oprește la Iov 42:6 și la smerirea lui Iov. Pocăința nu confirmă diagnosticul prietenilor că toate nenorocirile lui fuseseră pedeapsa pentru păcate ascunse. Dumnezeu tocmai va spune că prietenii au vorbit greșit despre El. Iov se pocăiește de felul în care a vorbit despre lucruri pe care nu le înțelegea și ajunge la o cunoaștere mai adâncă a lui Dumnezeu.",
        source: p("42, 6 ... dust and ashes ... repent"),
      },
      {
        from: 7,
        to: 17,
        heading: "Dumnezeu îi corectează pe acuzatori, iar Iov se roagă pentru ei",
        teaching: "Versetul 7 este controlul doctrinar asupra discursurilor prietenilor: Dumnezeu spune că nu au vorbit drept despre El. Poonen observă apoi că Iov se roagă pentru cei care îl acuzaseră și că restaurarea lui este consemnată în același final. Iacov va folosi Iov ca exemplu al răbdării și va spune că sfârșitul lucrării DOMNULUI arată compasiunea și mila Lui. Dublarea bunurilor nu trebuie transformată într-o schemă de prosperitate garantată pentru orice suferință credincioasă.",
        source: p("Lord said ... you have not been right ... Job prayed for his friends ... restored his fortunes"),
        forYourHeart: "Nu trebuie să spui că acuzatorii au avut dreptate ca să te rogi pentru ei. Iertarea poate merge împreună cu adevărul despre ceea ce au spus greșit.",
      },
    ],
  },
}

const IOV_OVERLAY: ExplainedBookOverlay = {
  bookId: "iov",
  bibleEmanusBookId: "JOB",
  name: "Iov",
  testament: "vt",
  order: 18,
  transcript,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: transcriptFocusedChapters("Iov", 42, focused),
}

export const IOV_EXPLAINED = assertCompleteOverlay(IOV_OVERLAY, 42)
