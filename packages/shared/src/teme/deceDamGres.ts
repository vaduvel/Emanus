import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 6 din docs/41-module-teme-poonen.md: "De ce dam gres".
 * Temele 22, 23, 24 si 72.
 *
 * Sursa: Zac Poonen, "Basic Christian Teachings", capitolele 22-24 si 72 (cfcindia.com).
 * Tradus fidel din textul autorului. Vezi docs/42-sursa-si-atribuire-poonen.md.
 *
 * NOTA: prima versiune a acestui fisier a fost compusa fara citirea textului-sursa
 * si a fost inlocuita integral. Continutul de mai jos vine din capitolele citite.
 *
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

const COURSE_ID = "teme_c6_esec"

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
        prompt: "Unde esti acum?",
        options: [
          { id: `${p}c1`, label: "Cad in acelasi loc de ani de zile." },
          { id: `${p}c2`, label: "Uneori birui, uneori nu." },
          { id: `${p}c3`, label: "Vreau sa cresc, nu sa repet clasa." },
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
        question: "Care este raspunsul asezat?",
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
        "Harul este ajutorul care vine inainte de cadere, nu doar mila care te ridica dupa.",
        "Cere ajutor in clipa ispitei, si vei vedea harul venind sa te poarte prin ea.",
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

export const DE_CE_DAM_GRES_LESSONS: Lesson[] = [
  make({
    id: "esec_l1",
    order: 1,
    title: "Cel dintai motiv: lipsa fricii de Dumnezeu",
    refs: ["Matei 1:21", "Ioan 8:11", "Proverbe 9:10", "Proverbe 4:18"],
    ref: "Matei 1:21",
    hook: "Este o deosebire intre a fi iertat si a fi mantuit. Multi nu ar sti sa o explice.",
    word: "Ii vei pune numele Isus, pentru ca El va mantui pe poporul Lui de pacatele sale.",
    truth: [
      "Sa zicem ca s-a sapat o groapa adanca in fata casei mele si i-am spus copilului sa nu se apropie. El nu asculta si cade in ea. Striga: tata, ajuta-ma. Daca ii spun de sus: te iert, fiule, la revedere, si plec - l-am iertat? Da. L-am scapat? Nu.",
      "Asa a fost in Vechiul Testament: oamenii puteau fi iertati, dar nu izbaviti de puterea pacatului. Pe cea dintai pagina a Noului Testament citim: Il vei numi Isus, pentru ca El va mantui pe poporul Lui de pacatele sale - nu doar le va ierta pacatele.",
      "Femeii prinse in preacurvie Isus i-a spus doua lucruri: nici Eu nu te osandesc, si: du-te si sa nu mai pacatuiesti. Aceasta este Evanghelia cu amandoua fetele ei: mila si har, iertare si biruinta. Daca lipseste una, Evanghelia este neintreaga.",
      "Inseamna ca nu vom mai pacatui niciodata? Nu. Cum deosebesti un porc de o pisica? Nu prin aceea ca pisica nu cade in noroi, caci si ea poate cadea. Ci prin aceea ca una se tavaleste cu placere, iar cealalta sare afara indata si se curata.",
      "Stii daca esti nascut din nou dupa atitudinea ta la cadere. Daca te doare si vrei sa te ridici si sa fii curat, Dumnezeu a lucrat in inima ta. Daca te bucuri ca nu te-a vazut nimeni si nu vrei sa lasi lucrul acela, esti doar religios.",
      "Viata crestina este o viata de crestere, ca a unui copil la scoala: intr-un an invata adunarea, in altul scaderea, apoi inmultirea. Nu este voia lui Dumnezeu sa fii biruit de manie sau de ganduri necurate douazeci si cinci de ani la rand.",
      "Calea celor neprihaniti este ca lumina zorilor, care creste tot mai luminoasa pana la miezul zilei. Niciodata nu se intuneca.",
      "De ce cad unii mereu in aceeasi clasa? Un motiv de temelie este lipsa fricii de Dumnezeu. Frica de Domnul este inceputul intelepciunii, alfabetul ei. Si tot acolo scrie: frica de Domnul este urarea raului.",
      "De ce nu cazi in anumite pacate cand este un alt credincios in camera, dar cazi cand esti singur? Pentru ca te temi de parerea acelui om. Cand esti singur, in camera este Dumnezeu; cand intra el, este si omul. Daca prezenta lui te opreste si prezenta lui Dumnezeu nu, inseamna ca te temi de om mai mult decat de Dumnezeu.",
    ],
    wrongA: "Iertarea si mantuirea sunt acelasi lucru.",
    right: "Iertarea priveste vina; mantuirea este izbavirea de puterea pacatului, si amandoua ne sunt date.",
    wrongB: "Un om nascut din nou nu mai cade niciodata.",
    explanation:
      "Copilul din groapa poate fi iertat si totusi lasat in groapa. Evanghelia intreaga il si scoate afara.",
    step: "Cere-I lui Dumnezeu, cu cuvintele tale, sa te ajute sa te temi de El si sa plangi de fiecare data cand cazi.",
    prayer: "Doamne, ajuta-ma sa ma tem de Tine mai mult decat de oameni. Vreau sa traiesc inaintea fetei Tale.",
    journal: "Ce faci cand esti singur si n-ai face daca ar intra cineva pe usa?",
    memory: "El va mantui pe poporul Lui de pacatele sale.",
  }),
  make({
    id: "esec_l2",
    order: 2,
    title: "Al doilea motiv: nu credem ca pacatul este grav",
    refs: ["Romani 1:17", "Iuda 24", "Romani 6:15", "Geneza 3:23"],
    ref: "Iuda 1:24",
    hook: "Dumnezeu ne-a dat fiecaruia un loc numai al nostru: viata gandurilor. Nimeni nu poate intra acolo, nici sotul, nici sotia. Tocmai acolo ne incearca Dumnezeu.",
    word: "Iar Aceluia care poate sa va pazeasca de orice cadere...",
    truth: [
      "Inchipuie-ti ca gandurile tale s-ar auzi tare, ca vorbele. Ai fi mai cu bagare de seama? Atunci de ce nu esti cu bagare de seama cand sunt tacute? Inseamna ca nu-ti pasa ca aude Dumnezeu, ci doar ca nu aud oamenii.",
      "In Romani 1 este numit un pacat: oamenii se inchina fapturii mai mult decat Facatorului. Se inchina parerii omului mai mult decat parerii lui Dumnezeu. Toti suntem, in temeiul nostru, asa.",
      "Al doilea motiv al caderii este necredinta. Daca nu crezi ca Isus te poate pazi de cadere, nu se va intampla in viata ta. Daca nu crezi ca pacatul este un lucru grav, nu vei birui pacatul.",
      "Adam si Eva aveau o singura porunca, nu zece. Si au calcat-o. Le-a dat Dumnezeu o a doua sansa? Nu. I-a scos indata din gradina. Pentru ca este Dumnezeu neindurator? Nu exista in tot universul cineva mai plin de indurare decat El. Atunci de ce? Pentru ca pacatul este grav.",
      "Cate pacate a facut Adam pana sa fie scos din fata lui Dumnezeu - douazeci, o suta? Nici macar doua. Unul singur.",
      "Scriptura intreaba: sa pacatuim macar o data, ca sa se inmulteasca harul? Te-ai intrebat vreodata asa: sa pacatuiesc macar o data?",
      "Al doilea exemplu este din Noul Testament. De ce a murit Isus? Din pricina pacatului. Daca un singur om ar fi facut un singur pacat in toata istoria, crezi ca Isus ar fi coborat sa moara pentru el? Cred ca da.",
      "Cand a murit Isus, timp de trei ceasuri soarele s-a intunecat. La amiaza s-a facut ca la miezul noptii. De ce? Pentru ca Tatal Si-a intors fata de la Fiul Sau. In toata vesnicia asa ceva nu se mai intamplase.",
      "Daca ai avea o pata de lepra pe mana, ai trece-o cu vederea sau ai fugi la doctor? Daca ai simti o durere in stomac si te-ai teme ca este cancer, ai amana? Cati dintre noi cred ca pacatul este mai grav decat toate acestea?",
    ],
    wrongA: "Un singur pacat nu inseamna mare lucru.",
    right: "Un singur pacat a fost de ajuns ca Adam sa fie scos din fata lui Dumnezeu.",
    wrongB: "Dumnezeu a fost aspru cu Adam pentru ca era la inceput.",
    explanation:
      "Multi nu au biruit pacatul fiindca nu au vazut cat este de grav. Cand crezi Cuvantul, incepi sa iei pacatul in serios.",
    step: "Ia in serios un pacat pe care il tratai ca pe un fleac si du-te cu el la Dumnezeu, astazi.",
    prayer: "Doamne, cred ca ma poti pazi de cadere. Deschide-mi ochii sa vad cat de grav este pacatul.",
    journal: "Ce pacat ai invatat sa-l numesti mic?",
    memory: "Aceluia care poate sa va pazeasca de orice cadere.",
  }),
  make({
    id: "esec_l3",
    order: 3,
    title: "Fugi, roaga-te, fii gata sa suferi",
    refs: ["2 Timotei 2:22", "Evrei 4:15", "Evrei 5:7", "1 Petru 4:1-2"],
    ref: "2 Timotei 2:22",
    hook: "Al treilea motiv al caderii: nu am inteles ca firea noastra este cu totul neputincioasa sa faca voia lui Dumnezeu.",
    word: "Fugi de poftele tineretii si urmareste neprihanirea, credinta, dragostea, pacea.",
    truth: [
      "Cu puterea noastra nu putem birui pacatul niciodata. Oricata hotarare si oricata disciplina ai avea, pacatul este prea adanc infipt in firea noastra. Este ca si cum ai incerca sa deprinzi un porc sa fie curat: cu bataie sau cu rasplata, il tii curat o vreme, dar lasat singur se intoarce la firea lui.",
      "Daca vezi lucrul acesta, vei face doua lucruri. Intai, vei fugi de ispita si nu te vei mai baga singur in primejdie. Cine se expune ispitei? Cel care nu-si simte slabiciunea. Cine si-o simte, fuge.",
      "De aceea a scris Pavel chiar unui om evlavios ca Timotei: fugi de poftele tineretii, fugi de dragostea de bani, fugi de idolatrie, fugi de curvie. Fugi, fugi, fugi. Multe pacate le-am birui daca am asculta doar de indemnul acesta.",
      "Al doilea lucru: cel care isi vede slabiciunea se roaga staruitor. Rugaciunea este un semn de slabiciune. Cand se roaga de obicei oamenii? Cand sunt in mare nevoie si nu-i mai poate ajuta nimeni. Iar Isus ne-a invatat sa ne rugam: nu ne duce in ispita.",
      "Isus a fost ispitit in toate lucrurile ca si noi, dar n-a pacatuit. Si totusi Se ruga. De ce trebuia sa Se roage? Cu cat ne credem mai tari, cu atat ne rugam mai putin.",
      "S-a rugat toata noaptea inainte sa-Si aleaga cei doisprezece apostoli. Nu voia sa greseasca. Este scris ca S-a rugat cu strigate mari si cu lacrimi. Cand te-ai rugat tu ultima data cu strigate mari si cu lacrimi?",
      "Adevarata smerenie este sa-ti recunosti slabiciunea firii. Toti suntem slabi, dar nu toti suntem la fel de constienti de asta.",
      "Al patrulea motiv al caderii: nu ne inarmam cu gandul de a suferi. Nu este vorba de suferinta trupeasca; altfel spitalele ar fi pline de oameni care au ispravit cu pacatul.",
      "Este o atitudine a mintii care spune: mai bine sufar lepadandu-ma de mine decat sa gust chiar si o clipa placerea unui singur gand pacatos. Cand esti ispitit, ori te lasi si gusti o placere, ori te impotrivesti - si impotrivirea aduce o suferinta. Despre aceea este vorba.",
      "Despre Isus se spune ca a fost ascultator pana la moarte. Adica: mai degraba mor decat sa nu ascult de Tatal Meu in cel mai mic lucru.",
    ],
    wrongA: "Un crestin matur poate sta langa ispita fara primejdie.",
    right: "Cine isi cunoaste slabiciunea fuge de ispita si striga dupa ajutor.",
    wrongB: "Suferinta trupeasca ne curata de pacat.",
    explanation:
      "Pavel i-a scris chiar lui Timotei sa fuga. Inarmarea dinainte inseamna sa te hotarasti ca preferi suferinta lepadarii de sine placerii pacatului.",
    step: "Numeste locul, ecranul sau imprejurarea de care trebuie sa fugi, si scoate-o din drumul tau azi.",
    prayer: "Doamne, sunt slab. Nu ma duce in ispita si da-mi putere sa fug si sa strig dupa ajutor.",
    journal: "De ce ispita te apropii singur, desi stii ca te doboara?",
    memory: "Fugi de poftele tineretii si urmareste neprihanirea.",
  }),
  make({
    id: "esec_l4",
    order: 4,
    title: "Planul lui Dumnezeu pentru cei care au dat gres",
    refs: ["Geneza 1:1-3", "Geneza 1:31", "Apocalipsa 13:8", "Luca 15:22", "Matei 20:1-16"],
    ref: "Geneza 1:31",
    hook: "Multi simt ca si-au incurcat viata atat de rau incat se intreaba: ce mai pot face acum pentru Dumnezeu? Este un cuvant de nadejde pentru ei.",
    word: "Dumnezeu S-a uitat la tot ce facuse, si iata ca erau foarte bune.",
    truth: [
      "Uita-te cum incepe Biblia. La inceput, Dumnezeu a facut cerurile si pamantul - si tot ce face El este desavarsit. Apoi unii ingeri au cazut, si citim ca pamantul a ajuns pustiu si gol si intunecat.",
      "Ce a facut Dumnezeu? Nu a lasat pamantul asa. Duhul Sfant a inceput sa Se miste deasupra lui, Cuvantul a iesit, si Dumnezeu a refacut pamantul. Din masa aceea fara chip a facut ceva atat de frumos incat la sfarsit a putut spune: este foarte bine.",
      "Aceasta este invatatura din capitolul intai al Bibliei: chiar daca diavolul ti-a facut viata praf, daca te predai Cuvantului lui Dumnezeu si Duhului Sfant, El poate scoate ceva minunat din ea, oricat ai fi cazut.",
      "Dumnezeu a avut un plan desavarsit pentru Adam si Eva, iar in planul acela nu era mancatul din pomul oprit. Ei au mancat si au stricat planul. Logica ne-ar spune: acum trebuie sa se multumeasca cu al doilea plan.",
      "Dar Dumnezeu vine la ei si le spune ca va trimite o samanta a femeii, care va zdrobi capul sarpelui. Vorbeste despre Hristos.",
      "Acum raspunde: a fost moartea lui Hristos parte din planul desavarsit al lui Dumnezeu din vesnicie, sau nu? Scriptura spune ca Mielul a fost injunghiat de la intemeierea lumii. Cine ar indrazni sa spuna ca Golgota a fost planul al doilea al lui Dumnezeu?",
      "Si totusi, dupa logica, Hristos a trebuit sa moara doar fiindca Adam si Eva au cazut. Mintea noastra nu poate cuprinde lucrul acesta: ca acolo unde omul a dat gres, Dumnezeu tot Isi poate implini planul desavarsit.",
      "Dumnezeu, care stie sfarsitul de la inceput, planuieste in tacere si in dragoste, tinand seama de caderile noastre. Stie ca vom cadea. A tinut seama de asta.",
      "Multe dintre caderile noastre, desi nu sunt planul Lui, sunt ingaduite ca sa ne invete ceva. Smerenia, din pacate, nu o invatam decat prin multe caderi. O parte din pregatirea lui Petru pentru slujire a fost caderea: lepadarea de trei ori l-a zdrobit, si zdrobirea aceea era voia lui Dumnezeu.",
      "Una dintre cele mai mari greutati pe care le are Dumnezeu cu noi este sa ne binecuvinteze fara ca binecuvantarea sa ne umfle de mandrie. Daca birui mania si te umfli de mandrie, ai cazut intr-o groapa mai adanca decat mania. Biruinta adevarata este intotdeauna insotita de smerenie.",
      "Fiul risipitor a pierdut ani si banii tatalui, si la intoarcere a primit haina cea mai buna si locul cel mai bun. Lucratorii tocmiti la ceasul al unsprezecelea pierdusera unsprezece ceasuri din douasprezece - si au fost platiti cei dintai.",
      "Nimeni nu este atat de pierdut incat Dumnezeu sa nu mai poata face ceva cu el. Isus a venit sa nimiceasca lucrarile diavolului si poate dezlega toate nodurile pe care ti le-a facut in viata.",
    ],
    wrongA: "Dupa caderile mele, imi mai ramane doar planul al doilea al lui Dumnezeu.",
    right: "Dumnezeu a tinut seama dinainte de caderile mele si tot Isi poate implini planul desavarsit cu mine.",
    wrongB: "Daca oricum Dumnezeu drege totul, nu conteaza daca pacatuiesc.",
    explanation:
      "Nu se spune ca omul poate pacatui linistit. Se spune ca, daca ai cazut, Dumnezeu nu este impiedicat sa-Si implineasca planul cu viata ta. Se va face dupa credinta ta.",
    step: "Da-I lui Dumnezeu, azi, restul vietii tale - nu ce a mai ramas din trecut, ci tot ce vine.",
    prayer: "Doamne, ia harababura pe care am facut-o si scoate ceva slavit din ea. Cred ca la Tine nimic nu este cu neputinta.",
    journal: "Ce crezi ca ai stricat pentru totdeauna? Spune-I lui Dumnezeu ca Il crezi in stare sa refaca.",
    memory: "Dumnezeu S-a uitat la tot ce facuse, si iata ca erau foarte bune.",
  }),
]
