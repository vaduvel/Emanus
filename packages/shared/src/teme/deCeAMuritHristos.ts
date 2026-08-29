import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 2 din docs/41-module-teme-poonen.md: "De ce a murit Hristos și darul Duhului".
 * Temele 6-9 din seria de bază a lui Zac Poonen.
 *
 * Sursa: Zac Poonen, "Basic Christian Teachings", capitolele 6-9 (cfcindia.com).
 * Tradus fidel din textul autorului. Vezi docs/42-sursa-si-atribuire-poonen.md.
 * Stare: in_review.
 */

type Input = {
  id: string
  order: number
  title: string
  refs: string[]
  ref: string
  hook: string
  word: string
  truth: string[]
  wrongA: string
  wrongB: string
  right: string
  explanation: string
  step: string
  prayer: string
  journal: string
  memory: string
}

const COURSE_ID = "teme_c2_crucea"

const b = (...text: string[]) => text.map((line) => ({ from: "guide" as const, text: line }))

function make(i: Input): Lesson {
  const p = i.id.replace(/_/g, "")
  const steps: LessonStep[] = [
    { id: `${p}h`, type: "hook", order: 1, bubbles: b(i.hook) },
    {
      id: `${p}c`,
      type: "choice",
      order: 2,
      choice: {
        prompt: "Unde te așezi acum?",
        options: [
          { id: `${p}c1`, label: "Nu știam că e așa." },
          { id: `${p}c2`, label: "Am auzit, dar nu am primit." },
          { id: `${p}c3`, label: "Vreau să primesc azi." },
        ],
      },
    },
    { id: `${p}s`, type: "scripture", order: 3, scripture: { text: i.word, ref: i.ref } },
    { id: `${p}t`, type: "truth_simple", order: 4, bubbles: b(...i.truth) },
    {
      id: `${p}q`,
      type: "quiz",
      order: 5,
      quiz: {
        question: "Care este răspunsul așezat?",
        options: [
          { text: i.wrongA, correct: false },
          { text: i.right, correct: true },
          { text: i.wrongB, correct: false },
        ],
        explanation: i.explanation,
      },
    },
    {
      id: `${p}a`,
      type: "how_god_helps",
      order: 6,
      bubbles: b(
        "Dumnezeu a purtat de grijă și trecutului, și viitorului tău.",
        "Mila se ocupă de ce a fost. Harul, prin Duhul Sfânt, te întărește pentru ce vine.",
      ),
    },
    { id: `${p}p`, type: "step", order: 7, bubbles: b(i.step) },
    { id: `${p}r`, type: "prayer", order: 8, bubbles: b(i.prayer) },
    { id: `${p}j`, type: "journal", order: 9, journalPrompt: i.journal },
    { id: `${p}m`, type: "memory_verse", order: 10, scripture: { text: i.memory, ref: i.ref } },
  ]
  return {
    id: i.id,
    courseId: COURSE_ID,
    order: i.order,
    title: i.title,
    estMinutes: 9,
    anchorRefs: i.refs,
    memoryVerseRef: i.ref,
    steps,
  }
}

export const DE_CE_A_MURIT_HRISTOS_LESSONS: Lesson[] = [
  make({
    id: "crucea_l1",
    order: 1,
    title: "De ce a trebuit să moară Hristos",
    refs: ["Romani 6:23", "Isaia 64:6", "Romani 10:9"],
    ref: "Romani 6:23",
    hook: "Mulți cred că este de ajuns să mergi la Dumnezeu și să spui: îmi pare rău. Dar pe ce temei te-ar putea ierta?",
    word: "Plata păcatului este moartea, dar darul fără plată al lui Dumnezeu este viața veșnică în Isus Hristos, Domnul nostru.",
    truth: [
      "Dumnezeu este un Tată iubitor și plin de bunătate. Dar, oricât de iubitor ar fi, nu poate trece cu vederea răzvrătirea și păcatul nostru, pentru că este și sfânt. Echilibrul acesta între sfințenia și dragostea lui Dumnezeu nu este înțeles de mulți.",
      "Închipuie-ți că ai fost dus în fața judecății, iar judecătorul este chiar tatăl tău, care te iubește nespus. Poate el spune: te iubesc, fiule, te declar liber? Cât timp stă acolo ca judecător, ar fi nedrept să te lase să pleci.",
      "Dar ce poate face tatăl acela pentru tine? Te poate pedepsi cu toată asprimea legii. Să zicem o amendă de o sută de mii. Și apoi poate coborî de pe scaunul de judecată, își poate scoate roba, poate veni la tine ca tată și poate scrie un cec din banii lui munciți, ca să plătească amenda.",
      "Atunci nu mai este nicio nedreptate: te-a pedepsit cu toată pedeapsa legii și apoi a plătit El însuși pedeapsa aceea. Acesta este singurul fel în care Dumnezeu ne poate ierta păcatul.",
      "Pedeapsa păcatului nu este suferința trupească, nici boala, nici sărăcia. Pedeapsa păcatului este moartea veșnică, adică despărțirea de Dumnezeu pentru totdeauna.",
      "Faptele noastre bune sunt ca o haină murdară înaintea lui Dumnezeu. Un elev cu 25 la sută la matematică se poate crede strălucit față de cel cu 5 la sută. Poate fi adevărat, dar amândoi au picat și amândoi rămân în aceeași clasă la anul. Față de măsura lui Dumnezeu, care este sută la sută, toți am rămas mai jos.",
      "Fiul din sala de judecată nu este liber până nu ia cecul din mâna tatălui. Nu este de ajuns că tatăl l-a scris. Fiul trebuie să-l ia. Asta așteaptă Dumnezeu de la om.",
      "De unde știm că jertfa lui Hristos a fost primită de Dumnezeul cel sfânt? Dovada este că după trei zile a înviat din morți. Omul a cucerit spațiul și multe boli, dar nu a cucerit niciodată moartea. Isus Hristos este singurul care a biruit-o.",
    ],
    wrongA: "Dacă îmi pare destul de rău, Dumnezeu mă poate ierta pur și simplu.",
    right: "Iertarea este dreaptă doar pentru că pedeapsa a fost plătită de Hristos, iar eu trebuie să o primesc.",
    wrongB: "Faptele mele bune pot acoperi ce am greșit.",
    explanation:
      "Vestea bună creștină nu începe cu fii bun și nu minți. Începe cu: nu poți fi bun, iar vinovăția trecutului trebuie mai întâi înlăturată. Vechea datorie trebuie ștearsă, și a fost ștearsă la cruce.",
    step: "Spune-I cu gura ta, azi: mulțumesc că ai murit pentru mine; primesc iertarea pe care nu o pot plăti.",
    prayer: "Doamne, nu pot plăti pentru păcatele mele. Primesc ce ai plătit Tu. Isus Hristos este de acum Domnul meu.",
    journal: "Ce încerci încă să plătești singur înaintea lui Dumnezeu?",
    memory: "Plata păcatului este moartea, dar darul lui Dumnezeu este viața veșnică.",
  }),
  make({
    id: "crucea_l2",
    order: 2,
    title: "Pocăința",
    refs: ["1 Tesaloniceni 1:9", "Apocalipsa 3:20", "Matei 3:8"],
    ref: "1 Tesaloniceni 1:9",
    hook: "Pocăința înseamnă o întoarcere la stânga împrejur. Nu poți fi unit cu Hristos dacă nu spui și tu da.",
    word: "V-ați întors de la idoli la Dumnezeu, ca să slujiți Dumnezeului celui viu și adevărat.",
    truth: [
      "A fi unit cu Hristos seamănă cu o căsătorie. Un bărbat poate spune că vrea să se însoare, dar căsătoria nu are loc până când și fata nu spune: și eu vreau. El a spus deja da, când a murit pe cruce și a înviat. Acum așteaptă răspunsul tău.",
      "A trăi cu o religie nu este același lucru cu a trăi cu Dumnezeu. Oamenii au de obicei o religie pentru că s-au născut în ea. Hristos nu a venit să înceapă o religie nouă și nici să ne învețe rânduieli și mersul la biserică duminica. A venit să ne aducă într-o legătură cu Dumnezeu ca Tată.",
      "A te pocăi înseamnă, simplu, a te întoarce. La parada militară se comandă stânga împrejur, și soldații se întorc o sută optzeci de grade. Ne naștem cu spatele la Dumnezeu și cu fața spre lume.",
      "Biblia numește pocăința o întoarcere la Dumnezeu de la idoli. Dacă ne închinăm la altceva decât la adevăratul Dumnezeu - bani, propria persoană, o slujbă, o casă, o mașină, un om iubit - acel lucru devine idol și ne întoarce de la Dumnezeu.",
      "Ne putem înșela ușor, crezând că ne-am pocăit pentru că am rostit cuvintele. Dar Biblia spune să aducem roade vrednice de pocăință. Dacă ai furat bani, îi vei da înapoi. Dacă ai înșelat statul la impozite, vei restitui. Dacă ai călătorit cu trenul fără bilet, vei plăti.",
      "Mulți se întorc la Dumnezeu doar cu vorbe. Religia lor nu îi costă niciodată nimic. Să te întorci și să dai înapoi banii luați pe nedrept este umilitor, dar tocmai asta dovedește că vrei cu adevărat să lași vechiul fel de viață.",
      "De ce ne este atât de greu să spunem zece-cincisprezece cuvinte de iertare cuiva? Din pricina mândriei.",
      "Pocăința nu înseamnă să-ți lași slujba și să te faci pustnic. Nu este atât lepădarea de lucrurile pământești, cât lepădarea de atașarea de ele. Nu este păcat să folosești ce ne dă viața de azi; este păcat să iubești acele lucruri mai mult decât pe Dumnezeu.",
    ],
    wrongA: "Pocăința înseamnă să spun lui Dumnezeu că îmi pare rău.",
    right: "Pocăința este o întoarcere reală, cu roade: adevăr spus și îndreptare acolo unde am greșit față de oameni.",
    wrongB: "Pocăința înseamnă să renunț la casă, familie și slujbă.",
    explanation:
      "Dacă spun lui Dumnezeu că îmi pare rău, dar nu vreau să îndrept față de om ce am stricat față de om, înseamnă că vreau iertare ieftină. Iertarea nu a fost ieftină: L-a costat pe Dumnezeu pe Fiul Său.",
    step: "Numește un lucru concret de îndreptat - un ban de dat înapoi sau o cerere de iertare - și fă-l în următoarele șapte zile.",
    prayer: "Doamne, Tu singur ești vrednic de închinare. Îmi pare rău că mi-am trăit viața închinându-mă lucrurilor făcute. Vreau să mă întorc la Tine.",
    journal: "Ce ai de îndreptat față de un om, nu doar față de Dumnezeu?",
    memory: "V-ați întors de la idoli la Dumnezeu.",
  }),
  make({
    id: "crucea_l3",
    order: 3,
    title: "Credința",
    refs: ["Efeseni 2:8", "Matei 9:27-29", "Efeseni 1:3"],
    ref: "Matei 9:29",
    hook: "Doi orbi au venit la Isus. El voia să-i vindece, ei voiau să fie vindecați. Și totuși le-a pus o întrebare în plus: credeți că pot face lucrul acesta?",
    word: "Atunci S-a atins de ochii lor și a zis: Făcă-vi-se după credința voastră.",
    truth: [
      "Harul este mâna lui Dumnezeu întinsă ca să ne dea ajutorul, binecuvântarea, iertarea și puterea Lui. Credința este mâna noastră ridicată ca să ia din mâna Lui. Dacă ți-aș întinde o Biblie, ca s-o primești trebuie să întinzi mâna.",
      "Nu trebuie să muncim ca să câștigăm iertarea. Este mult prea scumpă ca să fie câștigată cu fapte sau cu bani. Tocmai de aceea Dumnezeu o dă fără plată.",
      "Dacă unul dintre orbii aceia ar fi răspuns: nu prea sunt sigur, Doamne - ar fi plecat tot orb. Dorea să vadă, Isus dorea să-l vindece, și totuși nu ar fi primit. Ce lipsea? Credința.",
      "Ia aminte la ce a spus Isus: nu după dorința voastră, nici măcar după dorința Mea, ci după credința voastră.",
      "Plouă afară. Unul iese cu o cană, altul cu o găleată, altul cu un butoi. Cine se întoarce cu mai multă apă? Nu poți spune că Dumnezeu a fost părtinitor. Tu ai ieșit cu o cană.",
      "Binecuvântările lui Dumnezeu sunt ca o masă întinsă. Nimeni nu ți le pune în farfurie. Trebuie să mergi la masă și să iei. Dacă iei puțin, aceasta a fost alegerea ta.",
      "Dumnezeu nu ascultă o formulă magică. Un tată nu se uită dacă copilul lui repetă cuvintele corect sau dacă are gramatica bună. Ascultă inima copilului. La fel, Dumnezeu ascultă inima ta mai mult decât cuvintele tale.",
    ],
    wrongA: "Dacă eu doresc și Dumnezeu dorește, primesc automat.",
    right: "Rămâne o întrebare în plus: crezi că El o va face pentru tine?",
    wrongB: "Credința se dovedește prin cuvintele potrivite în rugăciune.",
    explanation:
      "Credința Îl cinstește pe Dumnezeu. Când spui cred, spui de fapt: Doamne, cred că ești vrednic de încredere și că ce ai spus este adevărat.",
    step: "Numește în scris un singur lucru pe care Dumnezeu l-a făgăduit în Cuvântul Său și spune-I că îl primești azi.",
    prayer: "Doamne Isuse, cred că ai murit pentru mine și că îmi ierți păcatele acum. Cred că îmi vei da și ce am nevoie mai departe.",
    journal: "Cu ce ai ieșit tu în ploaie până acum: cu o cană, cu o găleată sau cu un butoi?",
    memory: "Făcă-vi-se după credința voastră.",
  }),
  make({
    id: "crucea_l4",
    order: 4,
    title: "Darul Duhului Sfânt",
    refs: ["Faptele Apostolilor 2:38", "Evrei 4:16", "Ioan 16:7"],
    ref: "Faptele Apostolilor 2:38",
    hook: "Avem două feluri de probleme: una cu trecutul - vina, eșecul, păcatele - și una cu viitorul. Voi cădea iar și iar în aceleași locuri?",
    word: "Pocăiți-vă și fiecare din voi să fie botezat în Numele lui Isus Hristos, spre iertarea păcatelor voastre; apoi veți primi darul Sfântului Duh.",
    truth: [
      "Dumnezeu a purtat de grijă pentru amândouă. Pentru trecut, prin moartea lui Hristos. Pentru viitor, prin darul Duhului Sfânt.",
      "Când Isus era pe pământ, putea întări oamenii doar din afară și putea fi într-un singur loc odată. Dacă era în Galileea, nu era în Ierusalim. De aceea a spus că este mai bine să plece: ca să trimită Duhul Sfânt să locuiască în inimile lor, oriunde s-ar afla.",
      "Și e mai mult decât atât: nu doar oriunde ar fi, ci Isus înăuntrul lor, nu în afară. Deși a fost cu ucenicii trei ani și jumătate, i-a învățat și i-a mustrat, la sfârșit tot se certau între ei cine va fi mai mare. Problema dinăuntru nu putea fi rezolvată cât timp Isus era pe dinafară.",
      "Prezența trupească a lui Isus rezolva problemele din afară: furtuna, lipsa de pâine, vinul de la nuntă. Problema dinăuntru, care este mult mai gravă, nu putea fi rezolvată așa.",
      "Cum primim darul acesta? Exact la fel ca iertarea păcatelor. Nu este o condiție în plus și nu este o diplomă de nivel înalt. Este începutul vieții creștine.",
      "Este ca și cum cineva ți-a plătit deja o enciclopedie în două volume. Dacă ai venit acasă cu un singur volum, te întorci la magazin și iei și al doilea. Este plătit. Este gratuit.",
      "Mila și harul nu sunt același lucru. Mila privește iertarea păcatelor, adică trecutul. Harul privește puterea pe care Dumnezeu ne-o dă ca să fim biruitori în zilele care vin, adică viitorul.",
    ],
    wrongA: "Duhul Sfânt se primește după mulți ani de viață creștină.",
    right: "Iertarea și darul Duhului se primesc amândouă la început, prin aceeași credință.",
    wrongB: "Duhul Sfânt este pentru cei care îl merită prin sfințenie.",
    explanation:
      "Niciunul dintre noi nu merită nici cel mai mic dintre darurile lui Dumnezeu. De aceea se primesc prin credință, nu prin vrednicie.",
    step: "Vino la Dumnezeu fără șovăială și cere-I să te umple cu Duhul Său pentru zilele care vin, nu doar să-ți ierte trecutul.",
    prayer: "Doamne, cred că ai rezolvat trecutul meu. Astăzi cred și că mă vei întări pentru viitor. Umple-mă cu Duhul Tău.",
    journal: "Trăiești ca un om iertat de trecut, dar fără putere pentru mâine? Unde se vede asta?",
    memory: "Veți primi iertarea păcatelor și darul Sfântului Duh.",
  }),
]
