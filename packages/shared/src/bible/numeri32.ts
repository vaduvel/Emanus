import { numeriChapter, teaching } from "./numeriHelpers.js"
import { numeriPassage } from "./numeriText.js"
import { NUMERI_STATUSES } from "./numeriPublication.js"

/*
 * Cartea Numeri, explicată pe unități de sens.
 *
 * Textul biblic: păstrat separat în numeriText.ts (fișierele numeriTextN.ts).
 * Explicația: scrisă pentru Emanus după cercetarea textului. Nu se copiază
 * formularea niciunui predicator sau comentator.
 */

export const NUMERI_32 = numeriChapter({
  number: 32,
  title: "Numeri 32 — Moștenirea lui Ruben, Gad și Manase la est de Iordan",
  summary:
    "Fiii lui Ruben și Gad, având turme numeroase, cer teritoriul cucerit deja la est de Iordan. Moise se mânie la început, temându-se de o repetare a necredinței de la Cadeș-Barnea, dar acceptă cererea sub condiția clară că bărbații lor înarmați vor trece înaintea DOMNULUI și vor lupta împreună cu restul lui Israel pentru cucerirea Canaanului.",
  literaryContext:
    "Acest capitol reprezintă primul exemplu concret de împărțire teritorială înainte de trecerea Iordanului, pregătind modelul care va fi urmat mai târziu de împărțirea prin sorți în Canaan (Numeri 26, Iosua 13-21). El arată că moștenirea făgăduită nu se limita strict la teritoriul de dincolo de Iordan.",
  historicalContext:
    "Galaadul și Basanul, teritoriile lui Sihon și Og cucerite deja în Numeri 21, erau regiuni fertile, potrivite pentru creșterea vitelor — explicând atracția specială pentru semințiile lui Ruben și Gad, cunoscute pentru turmele lor numeroase.",
  units: [
    {
      id: "numeri-32-1-5",
      ref: "Numeri 32:1-5",
      heading: "Cererea lui Ruben și Gad pentru Galaad",
      text: numeriPassage(32, 1, 5),
      teaching: teaching(
        "Fiii lui Ruben și Gad, având „mari turme de vite, foarte numeroase”, observă că teritoriul deja cucerit de la Sihon și Og — țara Iazerului și a Galaadului — este ideal pentru creșterea animalelor lor. Cererea lor este directă și motivată practic: „nu ne trece Iordanul!”",
        "Enumerarea celor nouă cetăți — Atarot, Dibon, Iazer, Nimra, Heșbon, Eleale, Sebam, Nebo, Beon — arată că cererea lor nu era vagă, ci bazată pe cunoașterea concretă a terenului deja văzut de soldații care au participat la cucerirea acestei regiuni.",
      ),
      words: [],
      crossRefs: ["Numeri 21:21-35"],
      forYourHeart:
        "O cerere motivată de nevoi practice reale nu este în sine greșită; problema apare doar când ea pune în pericol angajamentul față de misiunea comună a poporului.",
    },
    {
      id: "numeri-32-6-15",
      ref: "Numeri 32:6-15",
      heading: "Mustrarea lui Moise și amintirea Cadeș-Barnea",
      text: numeriPassage(32, 6, 15),
      teaching: teaching(
        "Moise reacționează dur, temându-se că cererea lor va repeta tragedia de la Cadeș-Barnea: „Așa au făcut părinții voștri când i-am trimis din Cadeș-Barnea să iscodească țara”. Descurajarea inimii fiilor lui Israel a costat întreaga generație 40 de ani de umblărie în pustie.",
        "Avertismentul lui Moise este solemn: „dacă vă întoarceți de la El, El îl va lăsa din nou în pustie și veți aduce pierzarea peste tot poporul acesta”. Moise nu se opune dorinței lor în sine, ci se teme de aparența că două seminții își vor căuta interesul propriu în timp ce restul lui Israel încă nu are odihnă.",
      ),
      words: [],
      crossRefs: ["Numeri 14:1-4,26-35"],
      forYourHeart:
        "Un conducător înțelept înțelege că o cerere aparent inocentă poate reactiva vechi păcate ale poporului, dacă nu se cercetează cu grijă motivele din spatele ei.",
    },
    {
      id: "numeri-32-16-19",
      ref: "Numeri 32:16-19",
      heading: "Promisiunea lui Ruben și Gad",
      text: numeriPassage(32, 16, 19),
      teaching: teaching(
        "Răspunsul lor înlătură temerea lui Moise: nu cer să se retragă din misiunea comună, ci se oferă să meargă „înarmați înaintea fiilor lui Israel până îi vom duce la locul lor”, lăsând copiii și turmele în cetățile fortificate între timp.",
        "Angajamentul lor este total: „nu ne vom întoarce în casele noastre până ce fiecare din fiii lui Israel nu își va fi luat moștenirea” — acesta este răspunsul care schimbă percepția lui Moise despre cererea lor, arătând solidaritate deplină cu restul poporului.",
      ),
      words: [],
      crossRefs: [],
      forYourHeart:
        "O cerere personală devine acceptabilă când este însoțită de un angajament clar de a nu abandona responsabilitatea față de ceilalți din comunitate.",
    },
    {
      id: "numeri-32-20-24",
      ref: "Numeri 32:20-24",
      heading: "Condițiile lui Moise",
      text: numeriPassage(32, 20, 24),
      teaching: teaching(
        "Moise acceptă cererea, dar o transformă într-un legământ cu condiții precise: bărbații lor înarmați trebuie să treacă Iordanul „înaintea DOMNULUI” până la victoria completă, și doar după aceea vor fi „nevinovați față de DOMNUL și față de Israel”.",
        "Avertismentul final este fără echivoc: „dacă nu veți face așa... să știți că păcatul vostru vă va ajunge!” — o formulă care va rămâne călcătoare în conștiința biblică despre inevitabilitatea consecințelor păcatelor neispașite.",
      ),
      words: [],
      crossRefs: ["Galateni 6:7"],
      forYourHeart:
        "Un acord între credincioși cere transparență și condiții clare, nu doar bune intenții declarate; „păcatul vostru vă va ajunge” dacă promisiunea nu este ținută.",
    },
    {
      id: "numeri-32-25-30",
      ref: "Numeri 32:25-30",
      heading: "Acordul final și porunca lui Moise",
      text: numeriPassage(32, 25, 30),
      teaching: teaching(
        "Fiii lui Gad și Ruben confirmă: „robii tăi vor face cum poruncește stăpânul nostru”, detaliind planul precis: familiile și turmele rămân în Galaad, iar bărbații înarmați trec la război. Moise transmite îngăduința oficială preotului Eleazar, lui Iosua și căpeteniilor.",
        "Este important că Moise repetă condiția încă o dată către urmașii lui în conducere — Eleazar și Iosua — pentru că el nu va mai fi în viață când promisiunea va trebui împlinită; acordul trebuia să supraviețuiască propriei sale conduceri.",
      ),
      words: [],
      crossRefs: [],
      forYourHeart:
        "Înțelegerile importante trebuie transmise clar urmașilor în conducere, pentru ca ele să fie respectate chiar după plecarea celui care le-a făcut.",
    },
    {
      id: "numeri-32-31-33",
      ref: "Numeri 32:31-33",
      heading: "Confirmarea și darul teritoriului",
      text: numeriPassage(32, 31, 33),
      teaching: teaching(
        "Fiii lui Gad și Ruben confirmă solemn: „ce a spus DOMNUL robilor tăi, aceea vom face!”, iar Moise le dă — lor și jumătății seminției lui Manase, care se alătură fără să fi cerut explicit — împărățiile lui Sihon și Og, cu toate cetățile și hotarele lor.",
        "Includerea jumătății lui Manase, fără nicio cerere anterioară menționată în text, arată că această împărțire teritorială a fost extinsă după nevoile suplimentare identificate în timpul negocierii, nu doar limitată la primii doi petiționari.",
      ),
      words: [],
      crossRefs: ["Numeri 21:33-35"],
      forYourHeart:
        "Dumnezeu poate extinde înțelepciunea Sa o împărțire de binecuvântare dincolo de cererea inițială, pentru cei care se alătură cu aceeași inimă credincioasă.",
    },
    {
      id: "numeri-32-34-38",
      ref: "Numeri 32:34-38",
      heading: "Cetățile zidite de Gad și Ruben",
      text: numeriPassage(32, 34, 38),
      teaching: teaching(
        "Fiii lui Gad zidesc Dibonul, Atarotul, Aroerul, Atrot-Șofanul, Iazerul, Iogbeha, Bet-Nimra și Bet-Haran ca cetăți fortificate cu ocoluri pentru turme; fiii lui Ruben zidesc Heșbonul, Eleale, Chiriat-Aimul, Nebo și Baal-Meon, ale cărui nume păgâne au fost schimbate.",
        "Această schimbare a numelor cetăților legate de zeități păgâne (precum Baal-Meon) arată o intenție de a purifica identitatea locurilor cucerite, integrându-le în noua stăpânire a lui Israel fără să păstreze amintirea zeilor canaaniți.",
      ),
      words: [],
      crossRefs: [],
      forYourHeart:
        "Chiar și numele locurilor pe care le locuim pot fi purificate de trecutul lor idolatru, atunci când le supunem DOMNULUI și le folosim pentru slujirea Lui.",
    },
    {
      id: "numeri-32-39-42",
      ref: "Numeri 32:39-42",
      heading: "Machir, Iair și Nobah cuceresc Galaad",
      text: numeriPassage(32, 39, 42),
      teaching: teaching(
        "Trei războinici din familia lui Manase — Machir, Iair și Nobah — sunt menționați individual pentru cuceririle lor: Machir izgonește amoriții din Galaad și primește acest teritoriu direct de la Moise, Iair își ia satele proprii, și Nobah cucerește Chenatul, punându-i propriul nume.",
        "Aceste acțiuni individuale, distincte de acordul general al semințiilor, arată că moștenirea nu a fost doar o împărțire administrativă abstractă, ci a implicat curaj și inițiativă personală din partea unor oameni concreți, ale căror numele au rămas legate de teritoriile cucerite.",
      ),
      words: [],
      crossRefs: ["1 Cronici 2:21-23"],
      forYourHeart:
        "Moștenirea pe care Dumnezeu ne-o dă nu vine adesea fără efort personal; El binecuvântează curajul și inițiativa celor care se ridică să ia în stăpânire ceea ce li s-a făgăduit.",
    },
  ],
  prayer:
    "Doamne, învață-mă să cercetez cu grijă motivele din spatele cererilor mele, ca să nu pun în pericol angajamentul față de comunitate din pricina intereselor mele personale.\n\nDă-mi curajul de a-mi ține promisiunile făcute ție și celor din jurul meu, chiar când împlinirea lor cere timp și sacrificiu.\n\nMulțumescu-Ți că poți extinde binecuvântarea Ta dincolo de cererea mea inițială, pentru toți cei care se alătură cu o inimă credincioasă. Amin.",
  status: NUMERI_STATUSES[32],
})
