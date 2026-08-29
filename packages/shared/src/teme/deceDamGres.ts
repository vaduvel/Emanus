import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 6 din docs/41-module-teme-poonen.md: "De ce dăm greș".
 * Temele 22, 23, 24 și 72.
 *
 * Sursa: Zac Poonen, "Basic Christian Teachings", capitolele 22-24 și 72 (cfcindia.com).
 * Tradus fidel din textul autorului. Vezi docs/42-sursa-si-atribuire-poonen.md.
 *
 * NOTA: prima versiune a acestui fișier a fost compusă fără citirea textului-sursă
 * și a fost înlocuită integral. Conținutul de mai jos vine din capitolele citite.
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
        prompt: "Unde ești acum?",
        options: [
          { id: `${p}c1`, label: "Cad în același loc de ani de zile." },
          { id: `${p}c2`, label: "Uneori birui, uneori nu." },
          { id: `${p}c3`, label: "Vreau să cresc, nu să repet clasa." },
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
        "Harul este ajutorul care vine înainte de cădere, nu doar mila care te ridică după.",
        "Cere ajutor în clipa ispitei, și vei vedea harul venind să te poarte prin ea.",
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
    title: "Cel dintâi motiv: lipsa fricii de Dumnezeu",
    refs: ["Matei 1:21", "Ioan 8:11", "Proverbe 9:10", "Proverbe 4:18"],
    ref: "Matei 1:21",
    hook: "Este o deosebire între a fi iertat și a fi mântuit. Mulți nu ar ști să o explice.",
    word: "Îi vei pune numele Isus, pentru că El va mântui pe poporul Lui de păcatele sale.",
    truth: [
      "Să zicem că s-a săpat o groapă adâncă în fața casei mele și i-am spus copilului să nu se apropie. El nu ascultă și cade în ea. Strigă: tată, ajută-mă. Dacă îi spun de sus: te iert, fiule, la revedere, și plec - l-am iertat? Da. L-am scăpat? Nu.",
      "Așa a fost în Vechiul Testament: oamenii puteau fi iertați, dar nu izbăviți de puterea păcatului. Pe cea dintâi pagină a Noului Testament citim: Îl vei numi Isus, pentru că El va mântui pe poporul Lui de păcatele sale - nu doar le va ierta păcatele.",
      "Femeii prinse în preacurvie Isus i-a spus două lucruri: nici Eu nu te osândesc, și: du-te și să nu mai păcătuiești. Aceasta este Evanghelia cu amândouă fețele ei: milă și har, iertare și biruință. Dacă lipsește una, Evanghelia este neîntreagă.",
      "Înseamnă că nu vom mai păcătui niciodată? Nu. Cum deosebești un porc de o pisică? Nu prin aceea că pisica nu cade în noroi, căci și ea poate cădea. Ci prin aceea că una se tăvălește cu plăcere, iar cealaltă sare afară îndată și se curăță.",
      "Știi dacă ești născut din nou după atitudinea ta la cădere. Dacă te doare și vrei să te ridici și să fii curat, Dumnezeu a lucrat în inima ta. Dacă te bucuri că nu te-a văzut nimeni și nu vrei să lași lucrul acela, ești doar religios.",
      "Viața creștină este o viață de creștere, ca a unui copil la școală: într-un an învață adunarea, în altul scăderea, apoi înmulțirea. Nu este voia lui Dumnezeu să fii biruit de mânie sau de gânduri necurate douăzeci și cinci de ani la rând.",
      "Calea celor neprihăniți este ca lumina zorilor, care crește tot mai luminoasă până la miezul zilei. Niciodată nu se întunecă.",
      "De ce cad unii mereu în aceeași clasă? Un motiv de temelie este lipsa fricii de Dumnezeu. Frica de Domnul este începutul înțelepciunii, alfabetul ei. Și tot acolo scrie: frica de Domnul este urârea răului.",
      "De ce nu cazi în anumite păcate când este un alt credincios în cameră, dar cazi când ești singur? Pentru că te temi de părerea acelui om. Când ești singur, în cameră este Dumnezeu; când intră el, este și omul. Dacă prezența lui te oprește și prezența lui Dumnezeu nu, înseamnă că te temi de om mai mult decât de Dumnezeu.",
    ],
    wrongA: "Iertarea și mântuirea sunt același lucru.",
    right: "Iertarea privește vina; mântuirea este izbăvirea de puterea păcatului, și amândouă ne sunt date.",
    wrongB: "Un om născut din nou nu mai cade niciodată.",
    explanation:
      "Copilul din groapă poate fi iertat și totuși lăsat în groapă. Evanghelia întreagă îl și scoate afară.",
    step: "Cere-I lui Dumnezeu, cu cuvintele tale, să te ajute să te temi de El și să plângi de fiecare dată când cazi.",
    prayer: "Doamne, ajută-mă să mă tem de Tine mai mult decât de oameni. Vreau să trăiesc înaintea feței Tale.",
    journal: "Ce faci când ești singur și n-ai face dacă ar intra cineva pe ușă?",
    memory: "El va mântui pe poporul Lui de păcatele sale.",
  }),
  make({
    id: "esec_l2",
    order: 2,
    title: "Al doilea motiv: nu credem că păcatul este grav",
    refs: ["Romani 1:17", "Iuda 24", "Romani 6:15", "Geneza 3:23"],
    ref: "Iuda 1:24",
    hook: "Dumnezeu ne-a dat fiecăruia un loc numai al nostru: viața gândurilor. Nimeni nu poate intra acolo, nici soțul, nici soția. Tocmai acolo ne încearcă Dumnezeu.",
    word: "Iar Aceluia care poate să vă păzească de orice cădere...",
    truth: [
      "Închipuie-ți că gândurile tale s-ar auzi tare, ca vorbele. Ai fi mai cu băgare de seamă? Atunci de ce nu ești cu băgare de seamă când sunt tăcute? Înseamnă că nu-ți pasă că aude Dumnezeu, ci doar că nu aud oamenii.",
      "În Romani 1 este numit un păcat: oamenii se închină făpturii mai mult decât Făcătorului. Se închină părerii omului mai mult decât părerii lui Dumnezeu. Toți suntem, în temeiul nostru, așa.",
      "Al doilea motiv al căderii este necredința. Dacă nu crezi că Isus te poate păzi de cădere, nu se va întâmpla în viața ta. Dacă nu crezi că păcatul este un lucru grav, nu vei birui păcatul.",
      "Adam și Eva aveau o singură poruncă, nu zece. Și au călcat-o. Le-a dat Dumnezeu o a doua șansă? Nu. I-a scos îndată din grădină. Pentru că este Dumnezeu neîndurător? Nu există în tot universul cineva mai plin de îndurare decât El. Atunci de ce? Pentru că păcatul este grav.",
      "Câte păcate a făcut Adam până să fie scos din fața lui Dumnezeu - douăzeci, o sută? Nici măcar două. Unul singur.",
      "Scriptura întreabă: să păcătuim măcar o dată, ca să se înmulțească harul? Te-ai întrebat vreodată așa: să păcătuiesc măcar o dată?",
      "Al doilea exemplu este din Noul Testament. De ce a murit Isus? Din pricina păcatului. Dacă un singur om ar fi făcut un singur păcat în toată istoria, crezi că Isus ar fi coborât să moară pentru el? Cred că da.",
      "Când a murit Isus, timp de trei ceasuri soarele s-a întunecat. La amiază s-a făcut ca la miezul nopții. De ce? Pentru că Tatăl Și-a întors fața de la Fiul Său. În toată veșnicia așa ceva nu se mai întâmplase.",
      "Dacă ai avea o pată de lepră pe mână, ai trece-o cu vederea sau ai fugi la doctor? Dacă ai simți o durere în stomac și te-ai teme că este cancer, ai amâna? Câți dintre noi cred că păcatul este mai grav decât toate acestea?",
    ],
    wrongA: "Un singur păcat nu înseamnă mare lucru.",
    right: "Un singur păcat a fost de ajuns ca Adam să fie scos din fața lui Dumnezeu.",
    wrongB: "Dumnezeu a fost aspru cu Adam pentru că era la început.",
    explanation:
      "Mulți nu au biruit păcatul fiindcă nu au văzut cât este de grav. Când crezi Cuvântul, începi să iei păcatul în serios.",
    step: "Ia în serios un păcat pe care îl tratai ca pe un fleac și du-te cu el la Dumnezeu, astăzi.",
    prayer: "Doamne, cred că mă poți păzi de cădere. Deschide-mi ochii să văd cât de grav este păcatul.",
    journal: "Ce păcat ai învățat să-l numești mic?",
    memory: "Aceluia care poate să vă păzească de orice cădere.",
  }),
  make({
    id: "esec_l3",
    order: 3,
    title: "Fugi, roagă-te, fii gata să suferi",
    refs: ["2 Timotei 2:22", "Evrei 4:15", "Evrei 5:7", "1 Petru 4:1-2"],
    ref: "2 Timotei 2:22",
    hook: "Al treilea motiv al căderii: nu am înțeles că firea noastră este cu totul neputincioasă să facă voia lui Dumnezeu.",
    word: "Fugi de poftele tinereții și urmărește neprihănirea, credința, dragostea, pacea.",
    truth: [
      "Cu puterea noastră nu putem birui păcatul niciodată. Oricâtă hotărâre și oricâtă disciplină ai avea, păcatul este prea adânc înfipt în firea noastră. Este ca și cum ai încerca să deprinzi un porc să fie curat: cu bătaie sau cu răsplată, îl ții curat o vreme, dar lăsat singur se întoarce la firea lui.",
      "Dacă vezi lucrul acesta, vei face două lucruri. Întâi, vei fugi de ispită și nu te vei mai băga singur în primejdie. Cine se expune ispitei? Cel care nu-și simte slăbiciunea. Cine și-o simte, fuge.",
      "De aceea a scris Pavel chiar unui om evlavios ca Timotei: fugi de poftele tinereții, fugi de dragostea de bani, fugi de idolatrie, fugi de curvie. Fugi, fugi, fugi. Multe păcate le-am birui dacă am asculta doar de îndemnul acesta.",
      "Al doilea lucru: cel care își vede slăbiciunea se roagă stăruitor. Rugăciunea este un semn de slăbiciune. Când se roagă de obicei oamenii? Când sunt în mare nevoie și nu-i mai poate ajuta nimeni. Iar Isus ne-a învățat să ne rugăm: nu ne duce în ispită.",
      "Isus a fost ispitit în toate lucrurile ca și noi, dar n-a păcătuit. Și totuși Se ruga. De ce trebuia să Se roage? Cu cât ne credem mai tari, cu atât ne rugăm mai puțin.",
      "S-a rugat toată noaptea înainte să-Și aleagă cei doisprezece apostoli. Nu voia să greșească. Este scris că S-a rugat cu strigăte mari și cu lacrimi. Când te-ai rugat tu ultima dată cu strigăte mari și cu lacrimi?",
      "Adevărata smerenie este să-ți recunoști slăbiciunea firii. Toți suntem slabi, dar nu toți suntem la fel de conștienți de asta.",
      "Al patrulea motiv al căderii: nu ne înarmăm cu gândul de a suferi. Nu este vorba de suferință trupească; altfel spitalele ar fi pline de oameni care au isprăvit cu păcatul.",
      "Este o atitudine a minții care spune: mai bine sufer lepădându-mă de mine decât să gust chiar și o clipă plăcerea unui singur gând păcătos. Când ești ispitit, ori te lași și guști o plăcere, ori te împotrivești - și împotrivirea aduce o suferință. Despre aceea este vorba.",
      "Despre Isus se spune că a fost ascultător până la moarte. Adică: mai degrabă mor decât să nu ascult de Tatăl Meu în cel mai mic lucru.",
    ],
    wrongA: "Un creștin matur poate sta lângă ispită fără primejdie.",
    right: "Cine își cunoaște slăbiciunea fuge de ispită și strigă după ajutor.",
    wrongB: "Suferința trupească ne curăță de păcat.",
    explanation:
      "Pavel i-a scris chiar lui Timotei să fugă. Înarmarea dinainte înseamnă să te hotărăști că preferi suferința lepădării de sine plăcerii păcatului.",
    step: "Numește locul, ecranul sau împrejurarea de care trebuie să fugi, și scoate-o din drumul tău azi.",
    prayer: "Doamne, sunt slab. Nu mă duce în ispită și dă-mi putere să fug și să strig după ajutor.",
    journal: "De ce ispită te apropii singur, deși știi că te doboară?",
    memory: "Fugi de poftele tinereții și urmărește neprihănirea.",
  }),
  make({
    id: "esec_l4",
    order: 4,
    title: "Planul lui Dumnezeu pentru cei care au dat greș",
    refs: ["Geneza 1:1-3", "Geneza 1:31", "Apocalipsa 13:8", "Luca 15:22", "Matei 20:1-16"],
    ref: "Geneza 1:31",
    hook: "Mulți simt că și-au încurcat viața atât de rău încât se întreabă: ce mai pot face acum pentru Dumnezeu? Este un cuvânt de nădejde pentru ei.",
    word: "Dumnezeu S-a uitat la tot ce făcuse, și iată că erau foarte bune.",
    truth: [
      "Uită-te cum începe Biblia. La început, Dumnezeu a făcut cerurile și pământul - și tot ce face El este desăvârșit. Apoi unii îngeri au căzut, și citim că pământul a ajuns pustiu și gol și întunecat.",
      "Ce a făcut Dumnezeu? Nu a lăsat pământul așa. Duhul Sfânt a început să Se miște deasupra lui, Cuvântul a ieșit, și Dumnezeu a refăcut pământul. Din masa aceea fără chip a făcut ceva atât de frumos încât la sfârșit a putut spune: este foarte bine.",
      "Aceasta este învățătura din capitolul întâi al Bibliei: chiar dacă diavolul ți-a făcut viața praf, dacă te predai Cuvântului lui Dumnezeu și Duhului Sfânt, El poate scoate ceva minunat din ea, oricât ai fi căzut.",
      "Dumnezeu a avut un plan desăvârșit pentru Adam și Eva, iar în planul acela nu era mâncatul din pomul oprit. Ei au mâncat și au stricat planul. Logica ne-ar spune: acum trebuie să se mulțumească cu al doilea plan.",
      "Dar Dumnezeu vine la ei și le spune că va trimite o sămânță a femeii, care va zdrobi capul șarpelui. Vorbește despre Hristos.",
      "Acum răspunde: a fost moartea lui Hristos parte din planul desăvârșit al lui Dumnezeu din veșnicie, sau nu? Scriptura spune că Mielul a fost înjunghiat de la întemeierea lumii. Cine ar îndrăzni să spună că Golgota a fost planul al doilea al lui Dumnezeu?",
      "Și totuși, după logică, Hristos a trebuit să moară doar fiindcă Adam și Eva au căzut. Mintea noastră nu poate cuprinde lucrul acesta: că acolo unde omul a dat greș, Dumnezeu tot Își poate împlini planul desăvârșit.",
      "Dumnezeu, care știe sfârșitul de la început, planuiește în tăcere și în dragoste, ținând seama de căderile noastre. Știe că vom cădea. A ținut seama de asta.",
      "Multe dintre căderile noastre, deși nu sunt planul Lui, sunt îngăduite ca să ne învețe ceva. Smerenia, din păcate, nu o învățăm decât prin multe căderi. O parte din pregătirea lui Petru pentru slujire a fost căderea: lepădarea de trei ori l-a zdrobit, și zdrobirea aceea era voia lui Dumnezeu.",
      "Una dintre cele mai mari greutăți pe care le are Dumnezeu cu noi este să ne binecuvânteze fără ca binecuvântarea să ne umfle de mândrie. Dacă birui mânia și te umfli de mândrie, ai căzut într-o groapă mai adâncă decât mânia. Biruința adevărată este întotdeauna însoțită de smerenie.",
      "Fiul risipitor a pierdut ani și banii tatălui, și la întoarcere a primit haina cea mai bună și locul cel mai bun. Lucrătorii tocmiți la ceasul al unsprezecelea pierduseră unsprezece ceasuri din douăsprezece - și au fost plătiți cei dintâi.",
      "Nimeni nu este atât de pierdut încât Dumnezeu să nu mai poată face ceva cu el. Isus a venit să nimicească lucrările diavolului și poate dezlega toate nodurile pe care ți le-a făcut în viață.",
    ],
    wrongA: "După căderile mele, îmi mai rămâne doar planul al doilea al lui Dumnezeu.",
    right: "Dumnezeu a ținut seama dinainte de căderile mele și tot Își poate împlini planul desăvârșit cu mine.",
    wrongB: "Dacă oricum Dumnezeu drege totul, nu contează dacă păcătuiesc.",
    explanation:
      "Nu se spune că omul poate păcătui liniștit. Se spune că, dacă ai căzut, Dumnezeu nu este împiedicat să-Și împlinească planul cu viața ta. Se va face după credința ta.",
    step: "Dă-I lui Dumnezeu, azi, restul vieții tale - nu ce a mai rămas din trecut, ci tot ce vine.",
    prayer: "Doamne, ia harăbabura pe care am făcut-o și scoate ceva slăvit din ea. Cred că la Tine nimic nu este cu neputință.",
    journal: "Ce crezi că ai stricat pentru totdeauna? Spune-I lui Dumnezeu că Îl crezi în stare să refacă.",
    memory: "Dumnezeu S-a uitat la tot ce făcuse, și iată că erau foarte bune.",
  }),
]
