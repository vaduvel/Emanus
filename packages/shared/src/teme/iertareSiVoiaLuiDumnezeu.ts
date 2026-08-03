import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 14 din docs/41-module-teme-poonen.md:
 * "Iertare, minciunile celui rau, voia lui Dumnezeu".
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
          { id: `${p}c1`, label: "Port ceva impotriva cuiva." },
          { id: `${p}c2`, label: "Nu stiu ce vrea Dumnezeu de la mine." },
          { id: `${p}c3`, label: "Vreau sa umblu in voia Lui desavarsita." },
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
        "Eu stiu gandurile pe care le am cu privire la voi: ganduri de pace, ca sa va dau un viitor si o nadejde.",
        "Duhul Sfant intoarce inimile spre Dumnezeu; dar nu sileste pe nimeni sa umble in planul Lui.",
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
    title: "Neiertarea si amaraciunea",
    refs: ["2 Corinteni 2:10-11", "Evrei 12:15", "Coloseni 3:13", "Apocalipsa 12:10"],
    ref: "2 Corinteni 2:11",
    hook: "Cand nu ierti, Satana capata un castig asupra ta. Nu suntem in nestiinta despre planurile lui.",
    word: "Ca sa nu lasam pe Satana sa aiba un castig de la noi; caci nu suntem in nestiinta despre planurile lui.",
    truth: [
      "In Corint era un om care traia intr-un pacat greu si a fost scos afara din adunare. Cand a fost scos, si-a dat seama cat de grav este pacatul si s-a pocait. Cat sedea in adunare si franngea painea, nu vazuse.",
      "Dar atunci corintenii au trecut la cealalta margine: la inceput ingaduisera pacatul, apoi s-au facut farisei si nu mai voiau sa-l primeasca, desi se pocaise cu adevarat. Pavel le-a scris: pedeapsa aceasta ii este de ajuns; iertati-l si mangaiati-l, ca sa nu fie doborat de prea multa intristare.",
      "Si a adaugat: ca sa nu lasam pe Satana sa aiba un castig de la noi. Iata invatatura: cand nu ierti pe cineva, Satana capata un castig asupra ta.",
      "Sa ne temem de Satana mai mult ca inselator decat ca prigonitor. Prigoana nu ne face atata rau cat ne face inselaciunea. El va ingriji cu grija sa tii in inima o purtare amara si neiertatoare, ca sa te poata nimici la urma.",
      "Scriptura vorbeste de o radacina de amaraciune. Cand pui o samanta in pamant, ea prinde radacina inainte sa iasa la suprafata. Nimic nu se vede inca. Daca n-o smulgi, va aduce necaz - si multi vor fi spurcati prin ea.",
      "Este molipsitoare ca varsatul de vant sau ca oftica. Cel care are amaraciune in inima merge si le spune altora. Crestinatatea este plina de asa ceva.",
      "Deci ia seama pe cine asculti. Te-ai feri sa iei lepra de la cineva. Aceasta este mai grea. De ce primesti in casa un barfitor si un clevetitor, ii dai ceai si biscuiti si asculti ce vrea Satana sa-ti spuna prin el?",
      "Satana este numit paratul fratilor nostri. Cand paraste inaintea lui Dumnezeu, crezi ca nascoceste? Nu; el spune ce ai facut cu adevarat. Paririle lui sunt adevarate in intregime.",
      "De aici invatam ceva insemnat: cand cineva vine si-ti spune o poveste despre altul, chiar daca este adevarata in intregime, omul acela poate fi un parat al fratilor - in deplina partasie cu Satana, care face lucrul acesta zi si noapte.",
      "De aceea este scris: daca unul are pricina sa se planga de altul, iertati-va unul pe altul, cum v-a iertat si Hristos.",
      "Poate spui: eu am iertat. Dar tocmai faptul ca mergi si-ti spui pasul cuiva, ca sa-i para rau de tine, arata ca in adanc n-ai iertat.",
      "Si pe cine nimicesti? Iti inchipui ca ii strici numele celuilalt. Dar daca omul acela Il iubeste pe Dumnezeu din toata inima, Dumnezeu va face si raul acesta sa lucreze spre binele lui. Cel care este nimicit esti tu.",
      "Isus Se roaga pentru fratii care au cazut; Satana ii paraste. Poti alege: partasie cu Isus, rugandu-te pentru ei, sau partasie cu Satana, paranadu-i.",
    ],
    wrongA: "Daca ce spun despre altul este adevarat, nu este pacat.",
    right: "Chiar daca este adevarat in intregime, cine paraste este in partasie cu paratul fratilor.",
    wrongB: "Amaraciunea ma priveste numai pe mine.",
    explanation:
      "Radacina de amaraciune spurca pe multi si ii da Satanei un castig asupra ta.",
    step: "Nu asculta azi nicio poveste despre cineva care nu este de fata.",
    prayer: "Doamne, smulge din mine radacina de amaraciune si invata-ma sa ma rog pentru cei care au cazut.",
    journal: "Cui i-ai povestit ce ti-a facut cineva, in loc sa te rogi?",
    memory: "Ca sa nu lasam pe Satana sa aiba un castig de la noi.",
  }),
  make({
    id: "voia_l2",
    order: 2,
    title: "Nu crede minciunile Satanei",
    refs: ["Ioan 6:37", "1 Ioan 1:7", "Evrei 8:12", "Matei 3:17", "Matei 4:3"],
    ref: "Ioan 6:37",
    hook: "Indata dupa ce glasul din cer a spus: acesta este Fiul Meu preaiubit, diavolul a venit si a intrebat: daca esti Fiul lui Dumnezeu...",
    word: "Pe cel ce vine la Mine, nu-l voi izgoni afara.",
    truth: [
      "Cerul este un loc al adevarului. Isus este adevarul, Duhul Lui este Duhul adevarului. Dumnezeu desparte intre cei ce iubesc adevarul si cei ce nu-l iubesc. Sunt credinciosi care mint cand au un castig din asta, si credinciosi care nu mint niciodata, oricat i-ar costa. Sed astazi in aceeasi cladire, dar nu vor sedea impreuna in cer.",
      "Cea dintai lucrare a Satanei este sa te lipseasca de incredintarea mantuirii. Mie mi-au trebuit ani. Il primisem pe Domnul poate de o suta de ori, intre treisprezece si nouasprezece ani, si nu stiam daca sunt mantuit. Apoi am citit: pe cel ce vine la Mine nu-l voi izgoni afara. Si am spus: Doamne, am venit la Tine de o suta de ori; astazi cred ca nu m-ai izgonit. De atunci incredintarea aceea nu m-a mai parasit.",
      "A doua minciuna: ca Dumnezeu ti-a iertat cele mai multe pacate, dar nu si pe cele grele. Multi traiesc sub osanda din pricina acestei inselaciuni. Daca umblam in lumina - adica suntem cinstiti inaintea lui Dumnezeu - sangele lui Isus ne curateste de orice pacat.",
      "A treia minciuna: chiar daca te-a iertat, ori de cate ori Se uita la tine Isi aminteste ce ai facut. Dar El spune: nu-Mi voi mai aduce aminte de pacatele lor. Cand Se uita la tine, este ca si cum n-ai fi pacatuit niciodata - daca ai fost cinstit cu El.",
      "Vezi cand a fost ispitit Isus: indata dupa ce glasul din cer a spus - acesta este Fiul Meu preaiubit - a venit diavolul cu: daca esti Fiul lui Dumnezeu. Asa vine si la noi. Ce vei crede: simtirile pe care ti le da el sau Cuvantul neschimbator al lui Dumnezeu? Simtirile vin si trec si toate insala.",
      "Alta minciuna: ca esti primit de Dumnezeu pe temeiul faptelor tale. Nu; suntem primiti pe temeiul pocaintei si al credintei in Hristos.",
      "Sa zicem ca intr-o dimineata n-ai avut vreme sa citesti Biblia si ai plecat la lucru. Vei avea vreun accident in ziua aceea? Diavolul iti va spune ca poate. Aceasta este superstitie. Singurul lucru care rupe partasia cu Dumnezeu este pacatul facut cu buna stiinta.",
      "Ganditi-va la minciunile despre viitor. Ce este ingrijorarea? Rodul minciunilor pe care ni le spune diavolul despre ce se va intampla. Cred ca noua zeci si noua la suta din lucrurile de care ne temem nu se intampla niciodata.",
      "Ganditi-va la ce v-a ingrijorat in anii trecuti. Nu s-au intamplat. Dar ati pierdut vreme, somn si putere sufleteasca. Cine a facut asta? Satana.",
      "Sa luam hotararea de azi ca nu-l mai lasam sa ne pacaleasca. Vom iubi adevarul si vom da pe fata inselaciunea lui.",
    ],
    wrongA: "Simtirile mele imi arata daca sunt copil al lui Dumnezeu.",
    right: "Cuvantul neschimbator al lui Dumnezeu, nu simtirile, imi da incredintarea.",
    wrongB: "Sunt primit de Dumnezeu dupa cat de bine mi-am facut datoriile duhovnicesti.",
    explanation:
      "Simtirile vin si trec si toate insala; Cuvantul ramane.",
    step: "Scrie azi minciuna pe care ti-o repeta vrajmasul si asaza langa ea un verset.",
    prayer: "Doamne, cred Cuvantul Tau mai mult decat simtirile mele.",
    journal: "De ce te-ai ingrijorat anul trecut si nu s-a intamplat?",
    memory: "Pe cel ce vine la Mine, nu-l voi izgoni afara.",
  }),
  make({
    id: "voia_l3",
    order: 3,
    title: "Voia Lui desavarsita: cele dintai doua intrebari",
    refs: ["Romani 12:2", "Ieremia 29:11", "2 Timotei 3:16-17", "1 Ioan 3:21"],
    ref: "Romani 12:2",
    hook: "Cand iti croiesti singur viata, o croiesti ca un orb. Nu stii nici ce va fi maine.",
    word: "Sa va prefaceti prin innoirea mintii voastre, ca sa puteti deosebi bine voia lui Dumnezeu: cea buna, placuta si desavarsita.",
    truth: [
      "Dumnezeu are, pentru viata ta, un plan desavarsit, din clipa in care ai fost nascut din nou si pana la sfarsitul zilelor tale: unde sa locuiesti, cu cine sa te casatoresti, ce lucru sa faci, ce incercari sa treci, ce slujire sa ai in Trupul Lui.",
      "Dar nu-l vei cunoaste niciodata daca nu-l doresti. Dumnezeu nu sileste pe nimeni sa umble in planul acesta. Nu-i opreste nici pe cei care vor sa mearga in iad.",
      "Duhul Sfant lucreaza intorcand inimile spre Dumnezeu. Dar daca vede ca nu-ti pasa cu adevarat, te va lasa in pace. Poate va staruit de cateva ori; daca vede ca nu vrei, fiindca n-ai mai castiga atatia bani, te lasa. Iar in vesnicie vei avea multe pareri de rau.",
      "Cand iti croiesti singur viata, o croiesti ca un orb. Esti cu totul orb fata de viitor. Nu este bine ca un asemenea om sa aiba o calauza cu ochii deschisi, care vede departe?",
      "Daca as sti tot ce mi se va intampla, daca m-as cunoaste pe mine cum ma cunoaste Dumnezeu si as avea intelepciunea Lui, planul pe care mi l-as face ar fi tocmai planul pe care mi l-a facut El.",
      "Caci El spune: Eu stiu gandurile pe care le am cu privire la voi: ganduri de pace si nu de nenorocire, ca sa va dau un viitor si o nadejde.",
      "Iata dar douasprezece intrebari care ne ajuta sa deosebim voia Lui. Cea dintai: lucrul acesta pe care il am in gand este impotriva vreunei invataturi a lui Isus si a apostolilor sau impotriva duhului Noului Testament, dupa cat stiu eu?",
      "Daca un lucru este oprit in Scriptura, nu mai trebuie sa te gandesti a doua oara. Sa mint aici? Scriptura spune limpede. Am vreo indreptatire sa nu-l iert pe omul acesta? Nu. In asemenea lucruri nici nu trebuie sa te rogi.",
      "Toata Scriptura este insuflata de Dumnezeu si de folos ca sa invete, sa mustre, sa indrepte, ca omul lui Dumnezeu sa fie desavarsit si cu totul destoinic pentru orice lucrare buna.",
      "Daca nu cunosti invatatura Noului Testament, vor fi multe imprejurari in care nu vei sti voia Lui. Dar daca ti-ai petrecut viata ascultand de tot ce ai vazut in Scriptura, Dumnezeu va avea grija sa nu ratacesti nici in lucruri mari ca insuratoarea.",
      "A doua intrebare: este ceva ce pot face cu cugetul curat? Cugetul nu este o calauza desavarsita, dar este o calauza foarte buna: daca inima nu ne osandeste, avem indrazneala la Dumnezeu.",
      "Si ia seama: poti sa-ti omori cugetul. Cand cugetul te opreste si tu il faci sa taca si mergi inainte, dupa cateva ori nu te mai tulbura - fiindca l-ai omorat.",
    ],
    wrongA: "Dumnezeu ma va duce in voia Lui chiar daca nu o caut.",
    right: "Dumnezeu nu sileste pe nimeni; voia Lui desavarsita o afla cine o doreste si o cauta.",
    wrongB: "Cugetul poate fi trecut cu vederea fara urmari.",
    explanation:
      "Cugetul nesocotit de cateva ori inceteaza sa mai vorbeasca; l-ai omorat.",
    step: "Ia azi hotararea pe care o amani si trece-o prin cele doua intrebari.",
    prayer: "Doamne, vreau voia Ta desavarsita, nu doar pe cea ingaduita.",
    journal: "Ce lucru faci cu cugetul tulburat?",
    memory: "Ca sa puteti deosebi voia lui Dumnezeu: cea buna, placuta si desavarsita.",
  }),
  make({
    id: "voia_l4",
    order: 4,
    title: "Intrebarile trei pana la sapte",
    refs: ["1 Corinteni 10:31", "Coloseni 3:17", "2 Corinteni 9:8", "2 Timotei 2:15", "1 Corinteni 10:23"],
    ref: "1 Corinteni 10:31",
    hook: "Pot sa-I ofer si lui Isus tigara aceasta si sa-L rog sa fumeze impreuna cu mine? Iata a patra intrebare.",
    word: "Fie ca mancati, fie ca beti, fie ca faceti altceva, sa faceti totul pentru slava lui Dumnezeu.",
    truth: [
      "Oamenii sunt grijulii sa-si asaze banii unde aduc cel mai mare castig; dar nu sunt grijulii cu viata lor. Daca Dumnezeu iti da saptezeci sau optzeci de ani, cu atat mai mult ar trebui sa-i asezi acolo unde aduc cel mai mare castig - iar castigul acela nu se numara in bani, ci in folos pentru Imparatia Lui.",
      "A treia intrebare: este ceva ce pot face pentru slava lui Dumnezeu? Doamne, pot privi lucrul acesta pentru slava Ta? Pot merge acolo pentru slava Ta? Daca nu poti spune cinstit ca da, chiar de pare nevinovat, lasa-l.",
      "A patra: este ceva ce pot face in partasie cu Isus? Pot sa stau cu El si sa facem asta impreuna? De pilda, se cade unui credincios sa fumeze? Poti sa-I intinzi si Lui o tigara? Ori sa bea? Ar sta El cu tine la bautura?",
      "Este un film pe care simti ca Isus l-ar privi cu tine? Atunci priveste-l. Este ceva la televizor care ti se pare bun - l-ar privi Isus cu tine? Atunci priveste-l; altfel, ocoleste-l. Caci scris este: orice faceti, cu vorba sau cu fapta, sa faceti totul in Numele Domnului Isus.",
      "A cincea: pot sa-I cer lui Dumnezeu sa ma binecuvanteze in timp ce fac asta? Poate lucrul este la margine si nu esti sigur. Dumnezeu da har pentru orice fapta buna. Intreaba-te daca poti cere binecuvantarea Lui peste ce faci; daca nu, opreste-te.",
      "A sasea: imi va toci asta ascutisul duhovnicesc? Sunt multe lucruri ingaduite - muzica, sportul, o petrecere a vremii, unele emisiuni bune. Nu este niciun rau in ele. Dar cand se trece peste masura, omul se face rob lor si isi pierde ascutisul. Asa a facut Satana nefolositori multi credinciosi.",
      "A saptea: este de folos duhovniceste si zideste? Toate lucrurile imi sunt ingaduite, dar nu toate sunt de folos; toate imi sunt ingaduite, dar nu ma voi lasa biruit de nimic.",
      "Deci intrebarea nu este numai daca este ingaduit. Multi crestini traiesc numai la nivelul acesta: este ingaduit sau nu? Aceea este voia ingaduita a lui Dumnezeu. Daca vrei voia Lui desavarsita, mai pune o intrebare: este de folos duhovniceste si ma zideste?",
      "Sa nu intelegi gresit: nu numai citirea Bibliei, rugaciunea si adunarile sunt de folos duhovnicesc. Avem trup si el are nevoile lui. Uneori somnul este lucrul cel mai spre slava lui Dumnezeu; alteori o iesire cu copiii este lucrul cel mai ziditor. Isus a dormit si a mancat bine. Nu suntem pustnici.",
    ],
    wrongA: "Daca un lucru este ingaduit, este si voia Lui desavarsita.",
    right: "Voia ingaduita intreaba daca este ingaduit; voia desavarsita intreaba daca este de folos si zideste.",
    wrongB: "Numai rugaciunea si postul sunt de folos duhovnicesc.",
    explanation:
      "Uneori somnul sau o iesire cu copiii este lucrul cel mai spre slava lui Dumnezeu.",
    step: "Trece azi o obisnuinta a ta prin intrebarea: imi toceste ascutisul duhovnicesc?",
    prayer: "Doamne, vreau sa fac totul pentru slava Ta si in partasie cu Tine.",
    journal: "Ce lucru ingaduit a ajuns sa te stapaneasca?",
    memory: "Sa faceti totul pentru slava lui Dumnezeu.",
  }),
  make({
    id: "voia_l5",
    order: 5,
    title: "Intrebarile opt pana la douasprezece",
    refs: ["1 Ioan 2:28", "Proverbe 11:14", "Romani 14:13", "1 Ioan 2:27", "Romani 8:6"],
    ref: "1 Ioan 2:28",
    hook: "As fi bucuros daca Isus S-ar intoarce tocmai in clipa in care fac lucrul acesta?",
    word: "Ramaneti in El, pentru ca atunci cand Se va arata El, sa avem indrazneala si sa nu ramanem de rusine.",
    truth: [
      "In Legamantul cel Nou, Dumnezeu nu ne vorbeste mai ales prin prooroci sau prin glasuri din cer, ci prin mintea innoita.",
      "A opta intrebare: as fi bucuros daca m-ar gasi facand lucrul acesta in clipa in care Isus Se intoarce? Sunt oameni care se vor da inapoi de rusine inaintea Lui. Si sa nu-ti inchipui ca, daca este o lucrare crestineasca, negresit ar fi bucuros; sunt multe feluri de lucrari, si trebuie sa stii ce vrea El anume de la tine.",
      "A noua, mai ales pentru cei tineri in Domnul: ce cred despre asta fratii mai intelepti si mai copti? Cand nu este chibzuinta, poporul cade; dar biruinta vine prin marele numar de sfetnici. Nu trebuie sa ne facem robii parerii lor, dar este bine sa le cerem sfatul.",
      "A zecea: daca ar afla altii, ar aduce lucrul acesta necinste Numelui lui Dumnezeu sau mi-ar strica marturia? Poate este ceva ce nimeni n-ar afla. Nu asta este intrebarea. Daca ar afla, ar fi necinstit Numele Lui? Atunci ocoleste-l cu totul; este un lucru intunecos, tocmai fiindca vrei sa-l ascunzi.",
      "A unsprezecea: daca ar afla altii, i-ar face sa se poticneasca? Vei spune ca Nu sunt pazitorul fratelui meu, ca si Cain. Ba esti. Pavel a spus ca nu va manca nici carne, daca prin aceasta face pe altul sa se poticneasca.",
      "Sa nu ne mai judecam unii pe altii, ci mai bine sa nu puneti nimic inaintea fratelui vostru care sa-l faca sa se poticneasca. Si: luati seama ca nu cumva slobozenia voastra sa ajunga o piatra de poticnire pentru cei slabi.",
      "Si suntem indemnati sa cautam ce este bine nu numai inaintea Domnului, ci si inaintea oamenilor.",
      "A douasprezecea si cea din urma: sunt slobod in duhul meu s-o fac? Ungerea pe care ati primit-o va invata despre toate lucrurile. Este marturia Duhului Sfant in duhul nostru ca lucrul acesta este dupa voia lui Dumnezeu.",
      "Cand ai trecut prin toate cele douasprezece intrebari si ai primit raspunsurile bune, poti merge inainte, caci umblarea dupa Duhul este viata si pace. Vei avea pace in duh in timp ce inaintezi si vei implini voia Lui desavarsita.",
    ],
    wrongA: "Ce fac in ascuns nu priveste marturia mea.",
    right: "Daca s-ar afla si ar necinsti Numele Lui, lucrul acela nu trebuie facut deloc.",
    wrongB: "Nu sunt raspunzator daca altul se poticneste.",
    explanation:
      "Pavel a spus ca nu va manca nici carne, daca prin aceasta face pe altul sa se poticneasca.",
    step: "Alege o hotarare si treci-o azi prin toate cele douasprezece intrebari.",
    prayer: "Doamne, vreau sa fiu gasit facand ce Iti place, oricand Te-ai intoarce.",
    journal: "Ce faci si n-ai vrea sa se afle?",
    memory: "Ramaneti in El, ca sa avem indrazneala cand Se va arata El.",
  }),
  make({
    id: "voia_l6",
    order: 6,
    title: "Supunerea fata de autoritate",
    refs: ["Faptele Apostolilor 5:29", "Luca 2:51", "Romani 13:1-2", "Evrei 13:17"],
    ref: "Luca 2:51",
    hook: "Cine era desavarsit in casa din Nazaret? Nu Iosif si nu Maria. Si totusi Isus S-a supus lor treizeci de ani.",
    word: "Si le era supus.",
    truth: [
      "Pacatul s-a nascut in univers cand un inger creat s-a razvratit impotriva autoritatii lui Dumnezeu. Lucifer era capetenia ingerilor; a hotarat ca nu se va supune Ziditorului si a fost aruncat afara din cer.",
      "Trebuie sa ascultam mai mult de Dumnezeu decat de oameni. Daca cineva iti cere ceva impotriva Cuvantului, nu esti dator sa-l asculti, fie ca este autoritate acasa, la lucru sau in biserica. O sotie poate spune nu sotului daca acesta ii cere sa ucida sau sa-si dea trupul in preacurvie. Si un copil poate spune nu parintilor in asemenea lucruri.",
      "Dar cand spun ce a vorbit Dumnezeu, nu inteleg ce simti tu ca ti-a spus in inima. Daca esti sub o autoritate pe care Dumnezeu a asezat-o peste tine si ea iti spune sa nu te duci undeva, nu te duce, chiar daca simti altfel.",
      "Cand Isus a venit pe pamant ca sa nimiceasca lucrarile diavolului, Dumnezeu L-a tinut sub autoritatea lui Iosif si a Mariei treizeci de ani - nu o saptamana - ca prunc, ca tanar si ca barbat in putere.",
      "Satana este cel dintai razvratit. El ii indeamna pe copii sa se razvrateasca impotriva parintilor, pe elevi impotriva invatatorilor, pe lucratori impotriva stapanilor. A-ti cere drepturile cuvenite este ingaduit; a te razvrati impotriva autoritatii este rau.",
      "Sunt trei asezari de autoritate: casa, unde parintii sunt peste copii; societatea, cu stapanirea, cu politia si cu cel de la locul de munca; si biserica, unde Dumnezeu aseaza prezbiteri.",
      "Cine era desavarsit in casa din Nazaret? Iosif si Maria erau o pereche din Vechiul Testament, cu framantarile lor. Erau departe de desavarsire. Isus a trait supus unei autoritati nedesavarsite treizeci de ani.",
      "Daca I se cerea sa faca ceva cand era obosit, Se scula si facea, fara sa cartesca. Daca I se parea ca o hotarare a lor nu este dreapta, tot asculta - daca nu era impotriva voii lui Dumnezeu.",
      "Voi, tinerilor, cat timp locuiti in casa parinteasca si atarnati de ei, urmati pilda lui Isus. Nu are insemnatate ca parintii vostri fac greseli; si parintii Lui pamantesti faceau. Dumnezeu nu ne cere sa ne supunem unei autoritati desavarsite - nu exista nicaieri asa ceva. El ne incearca smerenia cerandu-ne sa ne supunem unora nedesavarsite.",
      "La fel in societate: orice suflet sa fie supus stapanirilor, caci nu este stapanire care sa nu vina de la Dumnezeu. Cine nu-si plateste birurile se razvrateste impotriva autoritatii.",
      "La fel in biserica: ascultati de mai-marii vostri, caci ei privegheaza asupra sufletelor voastre. Nu inseamna sa te supui unui om nedreptatit duhovniceste. La parinti si la stapanire n-ai de ales; dar daca vezi ca in biserica ta carmuirea nu este duhovniceasca, poti sa te muti. Iar cand ai gasit una duhovniceasca, supune-te ei.",
    ],
    wrongA: "Ma supun numai unei autoritati desavarsite.",
    right: "Dumnezeu ne incearca smerenia cerandu-ne sa ne supunem unor autoritati nedesavarsite.",
    wrongB: "Trebuie sa ascult orbeste orice mi se cere.",
    explanation:
      "Trebuie sa ascultam mai mult de Dumnezeu decat de oameni - dar numai in ce a spus El limpede in Cuvant.",
    step: "Fa azi, fara cartire, un lucru cerut de cel pus peste tine.",
    prayer: "Doamne, scoate din mine duhul de razvratire si invata-ma supunerea Ta.",
    journal: "Fata de ce autoritate te razvratesti in inima?",
    memory: "Si le era supus.",
  }),
]
