import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 14 din docs/41-module-teme-poonen.md:
 * "Iertare, minciunile celui rău, voia lui Dumnezeu".
 * Temele 64, 66, 68, 69, 70, 71.
 *
 * Sursa: Zac Poonen, "Basic Christian Teachings", capitolele 64, 66, 68-71 (cfcindia.com).
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

const COURSE_ID = "teme_c14_voia_lui"

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
        prompt: "Unde te afli acum?",
        options: [
          { id: `${p}c1`, label: "Port ceva împotriva cuiva." },
          { id: `${p}c2`, label: "Nu știu ce vrea Dumnezeu de la mine." },
          { id: `${p}c3`, label: "Vreau să umblu în voia Lui desăvârșită." },
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
        "Eu știu gândurile pe care le am cu privire la voi: gânduri de pace, ca să vă dau un viitor și o nădejde.",
        "Duhul Sfânt întoarce inimile spre Dumnezeu; dar nu silește pe nimeni să umble în planul Lui.",
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

export const IERTARE_SI_VOIA_LUI_DUMNEZEU_LESSONS: Lesson[] = [
  make({
    id: "voia_l1",
    order: 1,
    title: "Neiertarea și amărăciunea",
    refs: ["2 Corinteni 2:10-11", "Evrei 12:15", "Coloseni 3:13", "Apocalipsa 12:10"],
    ref: "2 Corinteni 2:11",
    hook: "Când nu ierți, Satana capătă un câștig asupra ta. Nu suntem în neștiință despre planurile lui.",
    word: "Ca să nu lăsăm pe Satana să aibă un câștig de la noi; căci nu suntem în neștiință despre planurile lui.",
    truth: [
      "În Corint era un om care trăia într-un păcat greu și a fost scos afară din adunare. Când a fost scos, și-a dat seama cât de grav este păcatul și s-a pocăit. Cât ședea în adunare și frânngea pâinea, nu văzuse.",
      "Dar atunci corintenii au trecut la cealaltă margine: la început îngăduiseră păcatul, apoi s-au făcut farisei și nu mai voiau să-l primească, deși se pocăise cu adevărat. Pavel le-a scris: pedeapsa aceasta îi este de ajuns; iertați-l și mângâiați-l, ca să nu fie doborât de prea multă întristare.",
      "Și a adăugat: ca să nu lăsăm pe Satana să aibă un câștig de la noi. Iată învățătura: când nu ierți pe cineva, Satana capătă un câștig asupra ta.",
      "Să ne temem de Satana mai mult ca înșelător decât ca prigonitor. Prigoana nu ne face atâta rău cât ne face înșelăciunea. El va îngriji cu grijă să ții în inimă o purtare amară și neiertătoare, ca să te poată nimici la urmă.",
      "Scriptura vorbește de o rădăcină de amărăciune. Când pui o sămânță în pământ, ea prinde rădăcină înainte să iasă la suprafață. Nimic nu se vede încă. Dacă n-o smulgi, va aduce necaz - și mulți vor fi spurcați prin ea.",
      "Este molipsitoare ca vărsatul de vânt sau ca oftica. Cel care are amărăciune în inimă merge și le spune altora. Creștinătatea este plină de așa ceva.",
      "Deci ia seama pe cine asculți. Te-ai feri să iei lepra de la cineva. Aceasta este mai grea. De ce primești în casă un bârfitor și un clevetitor, îi dai ceai și biscuiți și asculți ce vrea Satana să-ți spună prin el?",
      "Satana este numit pârâtul fraților noștri. Când pârăște înaintea lui Dumnezeu, crezi că născocește? Nu; el spune ce ai făcut cu adevărat. Pâririle lui sunt adevărate în întregime.",
      "De aici învățăm ceva însemnat: când cineva vine și-ți spune o poveste despre altul, chiar dacă este adevărată în întregime, omul acela poate fi un pârât al fraților - în deplină părtășie cu Satana, care face lucrul acesta zi și noapte.",
      "De aceea este scris: dacă unul are pricină să se plângă de altul, iertați-vă unul pe altul, cum v-a iertat și Hristos.",
      "Poate spui: eu am iertat. Dar tocmai faptul că mergi și-ți spui păsul cuiva, ca să-i pară rău de tine, arată că în adânc n-ai iertat.",
      "Și pe cine nimicești? Îți închipui că îi strici numele celuilalt. Dar dacă omul acela Îl iubește pe Dumnezeu din toată inima, Dumnezeu va face și răul acesta să lucreze spre binele lui. Cel care este nimicit ești tu.",
      "Isus Se roagă pentru frații care au căzut; Satana îi pârăște. Poți alege: părtășie cu Isus, rugându-te pentru ei, sau părtășie cu Satana, pârânadu-i.",
    ],
    wrongA: "Dacă ce spun despre altul este adevărat, nu este păcat.",
    right: "Chiar dacă este adevărat în întregime, cine pârăște este în părtășie cu pârâtul fraților.",
    wrongB: "Amărăciunea mă privește numai pe mine.",
    explanation:
      "Rădăcina de amărăciune spurcă pe mulți și îi dă Satanei un câștig asupra ta.",
    step: "Nu asculta azi nicio poveste despre cineva care nu este de față.",
    prayer: "Doamne, smulge din mine rădăcina de amărăciune și învață-mă să mă rog pentru cei care au căzut.",
    journal: "Cui i-ai povestit ce ți-a făcut cineva, în loc să te rogi?",
    memory: "Ca să nu lăsăm pe Satana să aibă un câștig de la noi.",
  }),
  make({
    id: "voia_l2",
    order: 2,
    title: "Nu crede minciunile Satanei",
    refs: ["Ioan 6:37", "1 Ioan 1:7", "Evrei 8:12", "Matei 3:17", "Matei 4:3"],
    ref: "Ioan 6:37",
    hook: "Îndată după ce glasul din cer a spus: acesta este Fiul Meu preaiubit, diavolul a venit și a întrebat: dacă ești Fiul lui Dumnezeu...",
    word: "Pe cel ce vine la Mine, nu-l voi izgoni afară.",
    truth: [
      "Cerul este un loc al adevărului. Isus este adevărul, Duhul Lui este Duhul adevărului. Dumnezeu desparte între cei ce iubesc adevărul și cei ce nu-l iubesc. Sunt credincioși care mint când au un câștig din asta, și credincioși care nu mint niciodată, oricât i-ar costa. Șed astăzi în aceeași clădire, dar nu vor ședea împreună în cer.",
      "Cea dintâi lucrare a Satanei este să te lipsească de încredințarea mântuirii. Mie mi-au trebuit ani. Îl primisem pe Domnul poate de o sută de ori, între treisprezece și nouăsprezece ani, și nu știam dacă sunt mântuit. Apoi am citit: pe cel ce vine la Mine nu-l voi izgoni afară. Și am spus: Doamne, am venit la Tine de o sută de ori; astăzi cred că nu m-ai izgonit. De atunci încredințarea aceea nu m-a mai părăsit.",
      "A doua minciună: că Dumnezeu ți-a iertat cele mai multe păcate, dar nu și pe cele grele. Mulți trăiesc sub osândă din pricina acestei înșelăciuni. Dacă umblăm în lumină - adică suntem cinstiți înaintea lui Dumnezeu - sângele lui Isus ne curățește de orice păcat.",
      "A treia minciună: chiar dacă te-a iertat, ori de câte ori Se uită la tine Își amintește ce ai făcut. Dar El spune: nu-Mi voi mai aduce aminte de păcatele lor. Când Se uită la tine, este ca și cum n-ai fi păcătuit niciodată - dacă ai fost cinstit cu El.",
      "Vezi când a fost ispitit Isus: îndată după ce glasul din cer a spus - acesta este Fiul Meu preaiubit - a venit diavolul cu: dacă ești Fiul lui Dumnezeu. Așa vine și la noi. Ce vei crede: simțirile pe care ți le dă el sau Cuvântul neschimbător al lui Dumnezeu? Simțirile vin și trec și toate însală.",
      "Altă minciună: că ești primit de Dumnezeu pe temeiul faptelor tale. Nu; suntem primiți pe temeiul pocăinței și al credinței în Hristos.",
      "Să zicem că într-o dimineață n-ai avut vreme să citești Biblia și ai plecat la lucru. Vei avea vreun accident în ziua aceea? Diavolul îți va spune că poate. Aceasta este superstiție. Singurul lucru care rupe părtășia cu Dumnezeu este păcatul făcut cu bună știință.",
      "Gândiți-vă la minciunile despre viitor. Ce este îngrijorarea? Rodul minciunilor pe care ni le spune diavolul despre ce se va întâmpla. Cred că nouă zeci și nouă la sută din lucrurile de care ne temem nu se întâmplă niciodată.",
      "Gândiți-vă la ce v-a îngrijorat în anii trecuți. Nu s-au întâmplat. Dar ați pierdut vreme, somn și putere suf‐letească. Cine a făcut asta? Satana.",
      "Să luăm hotărârea de azi că nu-l mai lăsăm să ne păcălească. Vom iubi adevărul și vom da pe față înșelăciunea lui.",
    ],
    wrongA: "Simțirile mele îmi arată dacă sunt copil al lui Dumnezeu.",
    right: "Cuvântul neschimbător al lui Dumnezeu, nu simțirile, îmi dă încredințarea.",
    wrongB: "Sunt primit de Dumnezeu după cât de bine mi-am făcut datoriile duhovnicești.",
    explanation:
      "Simțirile vin și trec și toate însală; Cuvântul rămâne.",
    step: "Scrie azi minciuna pe care ți-o repetă vrăjmașul și așază lângă ea un verset.",
    prayer: "Doamne, cred Cuvântul Tău mai mult decât simțirile mele.",
    journal: "De ce te-ai îngrijorat anul trecut și nu s-a întâmplat?",
    memory: "Pe cel ce vine la Mine, nu-l voi izgoni afară.",
  }),
  make({
    id: "voia_l3",
    order: 3,
    title: "Voia Lui desăvârșită: cele dintâi două întrebări",
    refs: ["Romani 12:2", "Ieremia 29:11", "2 Timotei 3:16-17", "1 Ioan 3:21"],
    ref: "Romani 12:2",
    hook: "Când îți croiești singur viața, o croiești ca un orb. Nu știi nici ce va fi mâine.",
    word: "Să vă prefaceți prin înnoirea minții voastre, ca să puteți deosebi bine voia lui Dumnezeu: cea bună, plăcută și desăvârșită.",
    truth: [
      "Dumnezeu are, pentru viața ta, un plan desăvârșit, din clipa în care ai fost născut din nou și până la sfârșitul zilelor tale: unde să locuiești, cu cine să te căsătorești, ce lucru să faci, ce încercări să treci, ce slujire să ai în Trupul Lui.",
      "Dar nu-l vei cunoaște niciodată dacă nu-l dorești. Dumnezeu nu silește pe nimeni să umble în planul acesta. Nu-i oprește nici pe cei care vor să meargă în iad.",
      "Duhul Sfânt lucrează întorcând inimile spre Dumnezeu. Dar dacă vede că nu-ți pasă cu adevărat, te va lăsa în pace. Poate va stăruit de câteva ori; dacă vede că nu vrei, fiindcă n-ai mai câștiga atâția bani, te lasă. Iar în veșnicie vei avea multe păreri de rău.",
      "Când îți croiești singur viața, o croiești ca un orb. Ești cu totul orb față de viitor. Nu este bine ca un asemenea om să aibă o călăuză cu ochii deschiși, care vede departe?",
      "Dacă aș ști tot ce mi se va întâmpla, dacă m-aș cunoaște pe mine cum mă cunoaște Dumnezeu și aș avea înțelepciunea Lui, planul pe care mi l-aș face ar fi tocmai planul pe care mi l-a făcut El.",
      "Căci El spune: Eu știu gândurile pe care le am cu privire la voi: gânduri de pace și nu de nenorocire, ca să vă dau un viitor și o nădejde.",
      "Iată dar douăsprezece întrebări care ne ajută să deosebim voia Lui. Cea dintâi: lucrul acesta pe care îl am în gând este împotriva vreunei învățături a lui Isus și a apostolilor sau împotriva duhului Noului Testament, după cât știu eu?",
      "Dacă un lucru este oprit în Scriptură, nu mai trebuie să te gândești a doua oară. Să mint aici? Scriptura spune limpede. Am vreo îndreptățire să nu-l iert pe omul acesta? Nu. În asemenea lucruri nici nu trebuie să te rogi.",
      "Toată Scriptura este insuflată de Dumnezeu și de folos ca să învețe, să mustre, să îndrepte, ca omul lui Dumnezeu să fie desăvârșit și cu totul destoinic pentru orice lucrare bună.",
      "Dacă nu cunoști învățătura Noului Testament, vor fi multe împrejurări în care nu vei ști voia Lui. Dar dacă ți-ai petrecut viața ascultând de tot ce ai văzut în Scriptură, Dumnezeu va avea grijă să nu rătăcești nici în lucruri mari ca însurătoarea.",
      "A doua întrebare: este ceva ce pot face cu cugetul curat? Cugetul nu este o călăuză desăvârșită, dar este o călăuză foarte bună: dacă inima nu ne osândește, avem îndrăzneală la Dumnezeu.",
      "Și ia seama: poți să-ți omori cugetul. Când cugetul te oprește și tu îl faci să tacă și mergi înainte, după câteva ori nu te mai tulbură - fiindcă l-ai omorât.",
    ],
    wrongA: "Dumnezeu mă va duce în voia Lui chiar dacă nu o caut.",
    right: "Dumnezeu nu silește pe nimeni; voia Lui desăvârșită o află cine o dorește și o caută.",
    wrongB: "Cugetul poate fi trecut cu vederea fără urmări.",
    explanation:
      "Cugetul nesocotit de câteva ori încetează să mai vorbească; l-ai omorât.",
    step: "Ia azi hotărârea pe care o amâni și trece-o prin cele două întrebări.",
    prayer: "Doamne, vreau voia Ta desăvârșită, nu doar pe cea îngăduită.",
    journal: "Ce lucru faci cu cugetul tulburat?",
    memory: "Ca să puteți deosebi voia lui Dumnezeu: cea bună, plăcută și desăvârșită.",
  }),
  make({
    id: "voia_l4",
    order: 4,
    title: "Întrebările trei până la șapte",
    refs: ["1 Corinteni 10:31", "Coloseni 3:17", "2 Corinteni 9:8", "2 Timotei 2:15", "1 Corinteni 10:23"],
    ref: "1 Corinteni 10:31",
    hook: "Pot să-I ofer și lui Isus țigara aceasta și să-L rog să fumeze împreună cu mine? Iată a patra întrebare.",
    word: "Fie că mâncați, fie că beți, fie că faceți altceva, să faceți totul pentru slava lui Dumnezeu.",
    truth: [
      "Oamenii sunt grijulii să-și așeze banii unde aduc cel mai mare câștig; dar nu sunt grijulii cu viața lor. Dacă Dumnezeu îți dă șaptezeci sau optzeci de ani, cu atât mai mult ar trebui să-i așezi acolo unde aduc cel mai mare câștig - iar câștigul acela nu se numără în bani, ci în folos pentru Împărăția Lui.",
      "A treia întrebare: este ceva ce pot face pentru slava lui Dumnezeu? Doamne, pot privi lucrul acesta pentru slava Ta? Pot merge acolo pentru slava Ta? Dacă nu poți spune cinstit că da, chiar de pare nevinovat, lasă-l.",
      "A patra: este ceva ce pot face în părtășie cu Isus? Pot să stau cu El și să facem asta împreună? De pildă, se cade unui credincios să fumeze? Poți să-I întinzi și Lui o țigară? Ori să bea? Ar sta El cu tine la băutură?",
      "Este un film pe care simți că Isus l-ar privi cu tine? Atunci privește-l. Este ceva la televizor care ți se pare bun - l-ar privi Isus cu tine? Atunci privește-l; altfel, ocolește-l. Căci scris este: orice faceți, cu vorba sau cu fapta, să faceți totul în Numele Domnului Isus.",
      "A cincea: pot să-I cer lui Dumnezeu să mă binecuvânteze în timp ce fac asta? Poate lucrul este la margine și nu ești sigur. Dumnezeu dă har pentru orice faptă bună. Întreabă-te dacă poți cere binecuvântarea Lui peste ce faci; dacă nu, oprește-te.",
      "A șasea: îmi va toci asta ascuțișul duhovnicesc? Sunt multe lucruri îngăduite - muzică, sportul, o petrecere a vremii, unele emisiuni bune. Nu este niciun rău în ele. Dar când se trece peste măsură, omul se face rob lor și își pierde ascuțișul. Așa a făcut Satana nefolositori mulți credincioși.",
      "A șaptea: este de folos duhovnicește și zidește? Toate lucrurile îmi sunt îngăduite, dar nu toate sunt de folos; toate îmi sunt îngăduite, dar nu mă voi lăsa biruit de nimic.",
      "Deci întrebarea nu este numai dacă este îngăduit. Mulți creștini trăiesc numai la nivelul acesta: este îngăduit sau nu? Aceea este voia îngăduită a lui Dumnezeu. Dacă vrei voia Lui desăvârșită, mai pune o întrebare: este de folos duhovnicește și mă zidește?",
      "Să nu înțelegi greșit: nu numai citirea Bibliei, rugăciunea și adunările sunt de folos duhovnicesc. Avem trup și el are nevoile lui. Uneori somnul este lucrul cel mai spre slava lui Dumnezeu; alteori o ieșire cu copiii este lucrul cel mai ziditor. Isus a dormit și a mâncat bine. Nu suntem pustnici.",
    ],
    wrongA: "Dacă un lucru este îngăduit, este și voia Lui desăvârșită.",
    right: "Voia îngăduită întreabă dacă este îngăduit; voia desăvârșită întreabă dacă este de folos și zidește.",
    wrongB: "Numai rugăciunea și postul sunt de folos duhovnicesc.",
    explanation:
      "Uneori somnul sau o ieșire cu copiii este lucrul cel mai spre slava lui Dumnezeu.",
    step: "Trece azi o obișnuință a ta prin întrebarea: îmi tocește ascuțișul duhovnicesc?",
    prayer: "Doamne, vreau să fac totul pentru slava Ta și în părtășie cu Tine.",
    journal: "Ce lucru îngăduit a ajuns să te stăpânească?",
    memory: "Să faceți totul pentru slava lui Dumnezeu.",
  }),
  make({
    id: "voia_l5",
    order: 5,
    title: "Întrebările opt până la douăsprezece",
    refs: ["1 Ioan 2:28", "Proverbe 11:14", "Romani 14:13", "1 Ioan 2:27", "Romani 8:6"],
    ref: "1 Ioan 2:28",
    hook: "Aș fi bucuros dacă Isus S-ar întoarce tocmai în clipa în care fac lucrul acesta?",
    word: "Rămâneți în El, pentru ca atunci când Se va arăta El, să avem îndrăzneală și să nu rămânem de rușine.",
    truth: [
      "În Legământul cel Nou, Dumnezeu nu ne vorbește mai ales prin prooroci sau prin glasuri din cer, ci prin mintea înnoită.",
      "A opta întrebare: aș fi bucuros dacă m-ar găsi făcând lucrul acesta în clipa în care Isus Se întoarce? Sunt oameni care se vor da înapoi de rușine înaintea Lui. Și să nu-ți închipui că, dacă este o lucrare creștinească, negreșit ar fi bucuros; sunt multe feluri de lucrări, și trebuie să știi ce vrea El anume de la tine.",
      "A noua, mai ales pentru cei tineri în Domnul: ce cred despre asta frații mai înțelepți și mai copți? Când nu este chibzuință, poporul cade; dar biruința vine prin marele număr de sfetnici. Nu trebuie să ne facem robii părerii lor, dar este bine să le cerem sfatul.",
      "A zecea: dacă ar afla alții, ar aduce lucrul acesta necinste Numelui lui Dumnezeu sau mi-ar strica mărturia? Poate este ceva ce nimeni n-ar afla. Nu asta este întrebarea. Dacă ar afla, ar fi necinstit Numele Lui? Atunci ocolește-l cu totul; este un lucru întunecos, tocmai fiindcă vrei să-l ascunzi.",
      "A unsprezecea: dacă ar afla alții, i-ar face să se poticnească? Vei spune că Nu sunt păzitorul fratelui meu, ca și Cain. Ba ești. Pavel a spus că nu va mânca nici carne, dacă prin aceasta face pe altul să se poticnească.",
      "Să nu ne mai judecăm unii pe alții, ci mai bine să nu puneți nimic înaintea fratelui vostru care să-l facă să se poticnească. Și: luați seama ca nu cumva slobozenia voastră să ajungă o piatră de poticnire pentru cei slabi.",
      "Și suntem îndemnați să căutăm ce este bine nu numai înaintea Domnului, ci și înaintea oamenilor.",
      "A douăsprezecea și cea din urmă: sunt slobod în duhul meu s-o fac? Ungerea pe care ați primit-o vă învață despre toate lucrurile. Este mărturia Duhului Sfânt în duhul nostru că lucrul acesta este după voia lui Dumnezeu.",
      "Când ai trecut prin toate cele douăsprezece întrebări și ai primit răspunsurile bune, poți merge înainte, căci umblarea după Duhul este viață și pace. Vei avea pace în duh în timp ce înaintezi și vei împlini voia Lui desăvârșită.",
    ],
    wrongA: "Ce fac în ascuns nu privește mărturia mea.",
    right: "Dacă s-ar afla și ar necinsti Numele Lui, lucrul acela nu trebuie făcut deloc.",
    wrongB: "Nu sunt răspunzător dacă altul se poticnește.",
    explanation:
      "Pavel a spus că nu va mânca nici carne, dacă prin aceasta face pe altul să se poticnească.",
    step: "Alege o hotărâre și trece-o azi prin toate cele douăsprezece întrebări.",
    prayer: "Doamne, vreau să fiu găsit făcând ce Îți place, oricând Te-ai întoarce.",
    journal: "Ce faci și n-ai vrea să se afle?",
    memory: "Rămâneți în El, ca să avem îndrăzneală când Se va arăta El.",
  }),
  make({
    id: "voia_l6",
    order: 6,
    title: "Supunerea față de autoritate",
    refs: ["Faptele Apostolilor 5:29", "Luca 2:51", "Romani 13:1-2", "Evrei 13:17"],
    ref: "Luca 2:51",
    hook: "Cine era desăvârșit în casa din Nazaret? Nu Iosif și nu Maria. Și totuși Isus S-a supus lor treizeci de ani.",
    word: "Și le era supus.",
    truth: [
      "Păcatul s-a născut în univers când un înger creat s-a răzvrătit împotriva autorității lui Dumnezeu. Lucifer era căpetenia îngerilor; a hotărât că nu se va supune Ziditorului și a fost aruncat afară din cer.",
      "Trebuie să ascultăm mai mult de Dumnezeu decât de oameni. Dacă cineva îți cere ceva împotriva Cuvântului, nu ești dator să-l asculți, fie că este autoritate acasă, la lucru sau în biserică. O soție poate spune nu soțului dacă acesta îi cere să ucidă sau să-și dea trupul în preacurvie. Și un copil poate spune nu părinților în asemenea lucruri.",
      "Dar când spun ce a vorbit Dumnezeu, nu înțeleg ce simți tu că ți-a spus în inimă. Dacă ești sub o autoritate pe care Dumnezeu a așezat-o peste tine și ea îți spune să nu te duci undeva, nu te duce, chiar dacă simți altfel.",
      "Când Isus a venit pe pământ ca să nimicească lucrările diavolului, Dumnezeu L-a ținut sub autoritatea lui Iosif și a Mariei treizeci de ani - nu o săptămână - ca prunc, ca tânăr și ca bărbat în putere.",
      "Satana este cel dintâi răzvrătit. El îi îndeamnă pe copii să se răzvrătească împotriva părinților, pe elevi împotriva învățătorilor, pe lucrători împotriva stăpânilor. A-ți cere drepturile cuvenite este îngăduit; a te răzvrăti împotriva autorității este rău.",
      "Sunt trei așezări de autoritate: casa, unde părinții sunt peste copii; societatea, cu stăpânirea, cu poliția și cu cel de la locul de muncă; și biserica, unde Dumnezeu așează prezbiteri.",
      "Cine era desăvârșit în casa din Nazaret? Iosif și Maria erau o pereche din Vechiul Testament, cu frământările lor. Erau departe de desăvârșire. Isus a trăit supus unei autorități nedesăvârșite treizeci de ani.",
      "Dacă I se cerea să facă ceva când era obosit, Se scula și făcea, fără să cârtească. Dacă I se părea că o hotărâre a lor nu este dreaptă, tot asculta - dacă nu era împotriva voii lui Dumnezeu.",
      "Voi, tinerilor, cât timp locuiți în casa părintească și atârnați de ei, urmați pilda lui Isus. Nu are însemnătate că părinții voștri fac greșeli; și părinții Lui pământești făceau. Dumnezeu nu ne cere să ne supunem unei autorități desăvârșite - nu există nicăieri așa ceva. El ne încearcă smerenia cerându-ne să ne supunem unora nedesăvârșite.",
      "La fel în societate: orice suflet să fie supus stăpânirilor, căci nu este stăpânire care să nu vină de la Dumnezeu. Cine nu-și plătește birurile se răzvrătește împotriva autorității.",
      "La fel în biserică: ascultați de mai-marii voștri, căci ei priveghează asupra sufletelor voastre. Nu înseamnă să te supui unui om nedreptățit duhovnicește. La părinți și la stăpânire n-ai de ales; dar dacă vezi că în biserica ta cârmuirea nu este duhovnicească, poți să te muți. Iar când ai găsit una duhovnicească, supune-te ei.",
    ],
    wrongA: "Mă supun numai unei autorități desăvârșite.",
    right: "Dumnezeu ne încearcă smerenia cerându-ne să ne supunem unor autorități nedesăvârșite.",
    wrongB: "Trebuie să ascult orbește orice mi se cere.",
    explanation:
      "Trebuie să ascultăm mai mult de Dumnezeu decât de oameni - dar numai în ce a spus El limpede în Cuvânt.",
    step: "Fă azi, fără cârtire, un lucru cerut de cel pus peste tine.",
    prayer: "Doamne, scoate din mine duhul de răzvrătire și învață-mă supunerea Ta.",
    journal: "Față de ce autoritate te răzvrătești în inimă?",
    memory: "Și le era supus.",
  }),
]
