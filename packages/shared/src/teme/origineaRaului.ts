import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 1 din docs/41-module-teme-poonen.md: "Originea raului si puterea alegerii".
 * Temele 1-5 din seria de baza a lui Zac Poonen.
 *
 * Sursa: Zac Poonen, "Basic Christian Teachings", capitolele 1-5 (cfcindia.com).
 * Continutul este tradus fidel din textul autorului: ideile, doctrina, argumentele
 * si ilustratiile ii apartin lui si sunt pastrate ca atare, fara modificare.
 * Vezi docs/42-sursa-si-atribuire-poonen.md pentru nota de drepturi de autor.
 *
 * Stare: in_review. Nu devine public inaintea reviziei umane finale.
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

const COURSE_ID = "teme_c1_origine"

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
        prompt: "Unde te asezi acum?",
        options: [
          { id: `${p}c1`, label: "Nu m-am gandit niciodata la asta." },
          { id: `${p}c2`, label: "M-am intrebat, dar n-am avut raspuns." },
          { id: `${p}c3`, label: "Vreau sa inteleg temeinic." },
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
        "Dumnezeu nu ti-a aratat aceste lucruri ca sa te lase singur cu ele.",
        "Hristos a venit nu doar sa ne arate ce este bine, ci si sa ne ajute sa alegem binele.",
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

export const ORIGINEA_RAULUI_LESSONS: Lesson[] = [
  make({
    id: "origine_l1",
    order: 1,
    title: "Originea raului",
    refs: ["Ezechiel 28:12-15", "1 Ioan 3:8", "Geneza 1:1"],
    ref: "Ezechiel 28:15",
    hook: "Cum a inceput raul intr-o lume creata de un Dumnezeu desavarsit de bun si plin de intelepciune? De ce a ingaduit Dumnezeu ca raul sa existe si sa se raspandeasca atat de mult?",
    word: "Ai fost fara prihana in caile tale, din ziua cand ai fost facut, pana in ziua cand s-a gasit nelegiuirea in tine.",
    truth: [
      "Mintea noastra nu ne poate spune singura cum este Dumnezeu. Un caine nu poate intelege un om, pentru ca omul este mai sus decat el in randul faptu­rilor. La fel, nu-L putem intelege pe Dumnezeu daca nu ni Se descopera El insusi. Si S-a descoperit, in Cuvantul Sau.",
      "Dumnezeu i-a creat pe ingeri si pe oameni cu voie libera. Spre deosebire de stele, plante si copaci, ei pot alege daca asculta sau nu. De aceea o stea sau un copac nu pot deveni rele: nu au libertatea de a alege.",
      "Dumnezeu ar fi putut face omul ca pe un robot, care nu greseste niciodata, dar asculta orbeste. Nu a vrut asa. Un robot nu poate fi copilul nimanui. Orice tata ar spune: mai bine un fiu neascultator al meu, decat un robot ascultator.",
      "Intre ingeri era unul care era capetenie: Lucifer. A fost creat desavarsit in intelepciune si frumusete si i s-a dat o pozitie inalta. Dar au inceput sa se ridice in el ganduri de mandrie, de razvratire si de nemultumire fata de locul pe care i-l randuise Dumnezeu.",
      "Raul incepe intotdeauna in inima. Chiar si o crima este intai plangita in inima si abia apoi iese in fapta. Asa a fost si cu Lucifer. Dar de indata ce raul s-a ridicat in inima lui, Dumnezeu l-a vazut, si l-a alungat din prezenta Sa.",
      "Raul nu este in afara controlului lui Dumnezeu. Este ceva ce El a stiut ca vine, a ingaduit, a primit si pentru care a pregatit o rezolvare. Rezolvarea este in Isus Hristos.",
    ],
    wrongA: "Dumnezeu a creat raul ca sa ne incerce.",
    right: "Raul a aparut din libertatea de a alege, pe care Dumnezeu a dat-o ca sa poata avea copii, nu roboti.",
    wrongB: "Raul exista pentru ca Dumnezeu nu il poate opri.",
    explanation:
      "Voia libera este cea dintai conditie pentru ca cineva sa fie o fiinta morala. Fara ea nu exista nici bine ales, nici copii ai lui Dumnezeu, ci doar masini care se supun.",
    step: "Scrie in cateva randuri raspunsul tau de pana acum la intrebarea de ce exista raul si compara-l cu ce ai citit azi.",
    prayer: "Doamne, nu Te pot intelege cu mintea mea. Descopera-mi-Te Tu, asa cum ai facut-o in Cuvantul Tau.",
    journal: "Ce te-a facut pana acum sa te indoiesti de bunatatea lui Dumnezeu?",
    memory: "Ai fost fara prihana in caile tale, pana in ziua cand s-a gasit nelegiuirea in tine.",
  }),
  make({
    id: "origine_l2",
    order: 2,
    title: "Dumnezeu face raul sa lucreze spre bine",
    refs: ["1 Ioan 3:8", "Romani 8:28", "Geneza 50:20"],
    ref: "1 Ioan 3:8",
    hook: "Daca raul a inceput cu caderea lui Lucifer, de ce nu l-a nimicit Dumnezeu pe loc? De ce nu il distruge pe Satana, ca sa nu mai fim chinuiti?",
    word: "Fiul lui Dumnezeu S-a aratat ca sa nimiceasca lucrarile diavolului.",
    truth: [
      "Intelepciunea lui Dumnezeu este ca un ocean, iar mintea noastra este ca o cana mica. Incape putin din ea. Dar cu putinul acela putem intelege ceva.",
      "Daca viata pe pamant ar fi fost usoara si comoda, oamenii nu s-ar mai gandi la vesnicie. Omul nu a fost facut doar pentru scurta lui viata de aici. Trupul piere, dar sufletul dinauntru nu moare niciodata.",
      "Dumnezeu este atat de puternic incat poate face pana si raul sa lucreze la implinirea scopurilor Sale. Nu El a creat raul. Dar cand ingerii si omul au ales raul, Dumnezeu a hotarat sa il foloseasca pentru scopurile Lui.",
      "Poonen povesteste despre un om de afaceri care se departase de Dumnezeu pe masura ce ii mergea bine. Batranii bisericii au incercat sase ani sa-l intoarca, fara folos. Apoi un sarpe veninos l-a muscat pe cel mai mic dintre fiii lui, si copilul s-a imbolnavit greu.",
      "Cand doctorii au pierdut orice nadejde, tatal a chemat un batran al bisericii sa se roage. Iar acela s-a rugat asa: multumesc ca ai trimis sarpele acesta sa muste copilul, pentru ca ce n-am putut eu in sase ani, a facut sarpele intr-o clipa. Acum vindeca-l, si da ca familia asta sa nu mai aiba nevoie de alti serpi ca sa-si aduca aminte de Tine.",
      "Muscatura de sarpe este rea. Dar in cazul acela Dumnezeu a folosit-o spre bine. La fel se intampla si cu bolile: sunt oameni care nu s-au gandit la Dumnezeu patruzeci de ani si incep sa se gandeasca abia in spital.",
      "Am pornit cu totii in viata cu un ghem de ata infasurat frumos. Cu anii, l-am incurcat in zece mii sau zece milioane de noduri. Vestea buna este ca Isus Hristos poate dezlega fiecare nod.",
    ],
    wrongA: "Suferinta este intotdeauna pedeapsa pentru un pacat anume.",
    right: "Dumnezeu nu face raul, dar il poate intoarce spre bine si il foloseste ca sa ne intoarca la El.",
    wrongB: "Daca Dumnezeu ar fi bun, nu ar ingadui nicio suferinta.",
    explanation:
      "Nu se spune ca raul este bun. Se spune ca Dumnezeu este atat de puternic incat poate scoate bine din ceea ce Satana a facut spre distrugere. Asa Il face de rusine pe cel rau, iar si iar.",
    step: "Numeste un lucru greu din viata ta si intreaba-te cinstit daca te-a apropiat sau te-a departat de Dumnezeu.",
    prayer: "Doamne Isuse, Tu ai venit sa nimicesti lucrarile diavolului. Nimiceste-le si in viata mea.",
    journal: "Ce nod din ghemul vietii tale ti se pare cel mai imposibil de dezlegat?",
    memory: "Fiul lui Dumnezeu S-a aratat ca sa nimiceasca lucrarile diavolului.",
  }),
  make({
    id: "origine_l3",
    order: 3,
    title: "Puterea alegerii",
    refs: ["Geneza 2:16-17", "Geneza 3:1-7", "Evrei 5:14"],
    ref: "Geneza 2:16",
    hook: "De ce se poarta unii oameni ca animalele? Pentru ca ii intereseaza doar nevoile trupului si viata de aici, nu si lucrurile lui Dumnezeu si vesnicia.",
    word: "Poti sa mananci dupa placere din orice pom din gradina; dar din pomul cunostintei binelui si raului sa nu mananci.",
    truth: [
      "Faptul ca suntem mai destepti decat animalele nu ne face neaparat mai buni decat ele. Este mare deosebire intre a fi mai destept si a fi mai bun. Oameni invatati si inteligenti sunt adesea robi ai lacomiei, ai poftei, ai maniei si ai egoismului.",
      "In om este o parte mai adanca decat mintea si decat sufletul: duhul. Duhul este cel care ne face constienti ca exista Dumnezeu. Niciun animal nu are asa ceva.",
      "Ca sa afli daca fiul tau este ascultator, nu-i spui: fa tot ce vrei pana ne intoarcem. Ii spui: poti face orice in casa asta, in afara de un singur lucru. Abia o singura oprelistea arata daca asculta sau nu.",
      "Asa a facut si Dumnezeu. I-a asezat pe Adam si pe Eva intr-o gradina si le-a spus ca pot manca din orice pom, afara de unul singur. Nu a plantat o mie de pomi si le-a interzis noua sute nouazeci si noua. Ar fi fost greu. Nu a fost asa.",
      "Ispita este necesara ca omul sa devina sfant. Cand spune nu ispitei, devine sfant. Cand spune da, pacatuieste. Alegerea aceea era necesara.",
      "Este mare deosebire intre nevinovatie si sfintenie. Nevinovatia se vede la un prunc: nu stie nici binele, nici raul. Adam, desi era ca un om in toata firea, era intr-un fel ca un prunc. Trebuia sa aleaga sa refuze raul si sa-L aleaga pe Dumnezeu, ca sa ajunga barbat duhovnicesc si matur.",
      "De fiecare data cand spui nu unei ispite, iti cladesti caracterul. Omul care esti astazi este rezultatul tuturor hotararilor pe care le-ai luat pana acum. Nu putem face nimic in privinta trecutului, dar putem face ceva in privinta viitorului.",
    ],
    wrongA: "Daca as fi ferit de ispite, as fi un om mai bun.",
    right: "Caracterul se cladeste tocmai prin ispita atragatoare careia ii spui nu.",
    wrongB: "Alegerile mici de azi nu conteaza pentru cine voi fi.",
    explanation:
      "Nu exista virtute in alegerea binelui daca nu exista si o alegere alternativa, la fel de atragatoare. De aceea pomul oprit era frumos, nu hidos.",
    step: "Alege o ispita concreta careia sa-i spui nu astazi, cu buna stiinta, si observa ce se cladeste in tine.",
    prayer: "Doamne, nu pot schimba anii trecuti, dar vreau sa fac ceva cu cei care vin. Ajuta-ma sa aleg ce Iti place Tie.",
    journal: "Care hotarare din trecutul tau te-a format cel mai mult, in bine sau in rau?",
    memory: "Poti sa mananci din orice pom din gradina; dar din pomul acela sa nu mananci.",
  }),
  make({
    id: "origine_l4",
    order: 4,
    title: "Pacatul vine din necredinta",
    refs: ["Geneza 3:1-6", "Evrei 3:18-19", "Romani 14:23"],
    ref: "Evrei 3:19",
    hook: "Adam si Eva au pacatuit, in fond, pentru ca nu au crezut ca Dumnezeu este bun, ca ii iubeste si ca poruncile Lui sunt spre binele lor.",
    word: "Vedem dar ca n-au putut sa intre din pricina necredintei lor.",
    truth: [
      "Asa vine Satana intotdeauna. Cand ispiteste pe cineva la rau, nu-i spune niciodata despre urmari. Cand ispiteste pe un om la prima bautura, nu-i spune cum va ajunge rob bauturii, cum isi va risipi banii, cum isi va distruge familia. Ii spune doar ca ii va face placere.",
      "Ispita ofera intotdeauna o placere oprita. Dar omul cu judecata se gandeste la urmari. Daca te gandesti la ce va iesi din fapta ta, sunt multe lucruri pe care nu le vei face.",
      "Adam si Eva au luat in ziua aceea o hotarare cu urmari pentru toata viata, nu doar pentru ei, ci si pentru copiii si nepotii lor. Toate hotararile noastre au urmari. Culegem ce semanam. Si invers: daca semeni bine, copiii tai vor culege rodul bun.",
      "Dumnezeu i-a iubit. Le daduse trupul, sanatatea, viata, gradina, si i-i daduse unul altuia. Ar fi trebuit sa gandeasca: Dumnezeu este atat de bun, daca ne opreste de la ceva, trebuie sa fie pentru un motiv foarte bun. Daca ar fi avut credinta aceasta, nu s-ar fi ratacit.",
      "Pacatul incepe cu necredinta in dragostea desavarsita a lui Dumnezeu. De acolo vine neascultarea. De aceea, in Biblie, credinta in Dumnezeu si ascultarea de poruncile Lui merg intotdeauna impreuna. La fel merg impreuna si necredinta, si neascultarea.",
      "Cand copiii sunt mici, nu vor sa mearga la scoala. Uneori plang. Poate cred ca tata si mama sunt aspri. Dar noi stim ce este bine pentru ei. La fel, daca putem crede in Dumnezeu, vom intelege ca tot ce ne spune este spre binele nostru.",
    ],
    wrongA: "Pacatul este in primul rand o fapta rea pe dinafara.",
    right: "Pacatul incepe cu necredinta ca Dumnezeu este bun si ca poruncile Lui sunt spre binele meu.",
    wrongB: "Daca m-as stradui mai mult, as inceta sa pacatuiesc.",
    explanation:
      "Neascultarea este rodul necredintei, asa cum ascultarea este rodul credintei. Cine crede cu adevarat ca tot ce a oprit Dumnezeu ii face rau, se va bucura sa se fereasca de toate.",
    step: "Numeste o porunca a lui Dumnezeu pe care o ocolesti si intreaba-te ce anume nu crezi despre bunatatea Lui in punctul acela.",
    prayer: "Doamne Isuse, ajuta-ma sa las tot ce imi spui sa las si sa fac tot ce imi spui sa fac. Cred ca esti un Dumnezeu bun.",
    journal: "In ce parte a vietii tale te porti ca si cum Dumnezeu ti-ar vrea raul?",
    memory: "N-au putut sa intre din pricina necredintei lor.",
  }),
  make({
    id: "origine_l5",
    order: 5,
    title: "Rolul constiintei",
    refs: ["Luca 11:34-36", "1 Ioan 1:9", "1 Timotei 4:2"],
    ref: "Luca 11:34",
    hook: "Cel mai mare dar pe care l-a asezat Dumnezeu in launtrul omului este ceva la care ne gandim rar. Si fiindca il trecem cu vederea, aduce multa suferinta in viata noastra.",
    word: "Ochiul este lumina trupului tau. Daca ochiul tau este sanatos, tot trupul tau este plin de lumina.",
    truth: [
      "Constiinta ne arata unde ramanem sub masura lui Dumnezeu. Nu este o calauza desavarsita, dar este cea dintai. Constiinta copiilor mici este foarte gingasa: unui copil ii este greu sa minta fara sa i se citeasca pe fata.",
      "Pe masura ce crestem, omoram atat de mult glasul acesta incat poate veni o zi cand mintim fara sa clipim. Atunci putem spune ca ne-a murit constiinta.",
      "Constiinta este ca durerea. Putini isi dau seama ce mare binecuvantare este durerea. Ea ne spune ca ceva nu este in regula. Daca iti intra un cui in talpa, durerea te face sa te asezi si sa-l scoti; altfel piciorul s-ar infecta.",
      "Ganditi-va la cei bolnavi de lepra. Lepra ucide nervii si distruge simtirea pielii. Un lepros poate calca pe un cui si sa nu stie. Poonen spune ca a auzit de leprosi carora sobolanii le-au ros degetele de la picioare in timpul noptii, iar ei n-au simtit nimic. Este oare o stare buna aceea in care nu simti durere?",
      "Daca nesocotesti glasul constiintei, nu moare dintr-o data. Dar dupa o vreme nu te va mai mustra deloc. Atunci ne imbolnavim de lepra duhovniceasca: nu mai simtim nimic la pacat.",
      "Isus a spus sa ne pastram constiinta asa cum ne pastram ochii. Pe trup putem purta praf zile intregi fara sa patim ceva. Dar un singur fir de praf in ochi il poate vatama repede. De aceea a facut Dumnezeu ochiul sa fie spalat neincetat de lacrimi, de mii de ori pe zi.",
      "A pastra constiinta curata inseamna: cand ai gresit, recunosti si indrepti. Daca ai ranit pe cineva, mergi si-i ceri iertare. Daca ai pacatuit impotriva lui Dumnezeu, Ii marturisesti. Doar cel care isi da seama ca este bolnav merge la doctor.",
    ],
    wrongA: "Daca nu ma mai mustra constiinta, inseamna ca sunt in regula.",
    right: "Constiinta este ca durerea: cand nu mai simte, nu e semn de sanatate, ci de amortire.",
    wrongB: "Faptele bune si daniile imi pot curata constiinta.",
    explanation:
      "Nicio fapta buna si niciun ban dat saracilor nu curata constiinta de pacat. Doar recunoasterea, marturisirea si iertarea primita de la Hristos o fac.",
    step: "Adu-ti aminte de un lucru pe care constiinta ti l-a semnalat si l-ai trecut cu vederea. Recunoaste-l azi si, daca ai ranit pe cineva, indreapta.",
    prayer: "Doamne, trezeste-mi constiinta acolo unde am amortit-o si da-mi curajul sa indrept ce am stricat.",
    journal: "La ce lucru nu te mai mustra constiinta, desi stii ca ar trebui?",
    memory: "Daca ochiul tau este sanatos, tot trupul tau este plin de lumina.",
  }),
]
