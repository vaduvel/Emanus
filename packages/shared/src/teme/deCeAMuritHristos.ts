import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 2 din docs/41-module-teme-poonen.md: "De ce a murit Hristos si darul Duhului".
 * Temele 6-9 din seria de baza a lui Zac Poonen.
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
        prompt: "Unde te asezi acum?",
        options: [
          { id: `${p}c1`, label: "Nu stiam ca e asa." },
          { id: `${p}c2`, label: "Am auzit, dar nu am primit." },
          { id: `${p}c3`, label: "Vreau sa primesc azi." },
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
        "Dumnezeu a purtat de grija si trecutului, si viitorului tau.",
        "Mila se ocupa de ce a fost. Harul, prin Duhul Sfant, te intareste pentru ce vine.",
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
    title: "De ce a trebuit sa moara Hristos",
    refs: ["Romani 6:23", "Isaia 64:6", "Romani 10:9"],
    ref: "Romani 6:23",
    hook: "Multi cred ca este de ajuns sa mergi la Dumnezeu si sa spui: imi pare rau. Dar pe ce temei te-ar putea ierta?",
    word: "Plata pacatului este moartea, dar darul fara plata al lui Dumnezeu este viata vesnica in Isus Hristos, Domnul nostru.",
    truth: [
      "Dumnezeu este un Tata iubitor si plin de bunatate. Dar, oricat de iubitor ar fi, nu poate trece cu vederea razvratirea si pacatul nostru, pentru ca este si sfant. Echilibrul acesta intre sfintenia si dragostea lui Dumnezeu nu este inteles de multi.",
      "Inchipuie-ti ca ai fost dus in fata judecatii, iar judecatorul este chiar tatal tau, care te iubeste nespus. Poate el spune: te iubesc, fiule, te declar liber? Cat timp sta acolo ca judecator, ar fi nedrept sa te lase sa pleci.",
      "Dar ce poate face tatal acela pentru tine? Te poate pedepsi cu toata asprimea legii. Sa zicem o amenda de o suta de mii. Si apoi poate cobori de pe scaunul de judecata, isi poate scoate roba, poate veni la tine ca tata si poate scrie un cec din banii lui munciti, ca sa plateasca amenda.",
      "Atunci nu mai este nicio nedreptate: te-a pedepsit cu toata pedeapsa legii si apoi a platit El insusi pedeapsa aceea. Acesta este singurul fel in care Dumnezeu ne poate ierta pacatul.",
      "Pedeapsa pacatului nu este suferinta trupeasca, nici boala, nici saracia. Pedeapsa pacatului este moartea vesnica, adica despartirea de Dumnezeu pentru totdeauna.",
      "Faptele noastre bune sunt ca o haina murdara inaintea lui Dumnezeu. Un elev cu 25 la suta la matematica se poate crede stralucit fata de cel cu 5 la suta. Poate fi adevarat, dar amandoi au picat si amandoi raman in aceeasi clasa la anul. Fata de masura lui Dumnezeu, care este suta la suta, toti am ramas mai jos.",
      "Fiul din sala de judecata nu este liber pana nu ia cecul din mana tatalui. Nu este de ajuns ca tatal l-a scris. Fiul trebuie sa-l ia. Asta asteapta Dumnezeu de la om.",
      "De unde stim ca jertfa lui Hristos a fost primita de Dumnezeul cel sfant? Dovada este ca dupa trei zile a inviat din morti. Omul a cucerit spatiul si multe boli, dar nu a cucerit niciodata moartea. Isus Hristos este singurul care a biruit-o.",
    ],
    wrongA: "Daca imi pare destul de rau, Dumnezeu ma poate ierta pur si simplu.",
    right: "Iertarea este dreapta doar pentru ca pedeapsa a fost platita de Hristos, iar eu trebuie sa o primesc.",
    wrongB: "Faptele mele bune pot acoperi ce am gresit.",
    explanation:
      "Vestea buna crestina nu incepe cu fii bun si nu minti. Incepe cu: nu poti fi bun, iar vinovatia trecutului trebuie mai intai inlaturata. Vechea datorie trebuie stearsa, si a fost stearsa la cruce.",
    step: "Spune-I cu gura ta, azi: multumesc ca ai murit pentru mine; primesc iertarea pe care nu o pot plati.",
    prayer: "Doamne, nu pot plati pentru pacatele mele. Primesc ce ai platit Tu. Isus Hristos este de acum Domnul meu.",
    journal: "Ce incerci inca sa platesti singur inaintea lui Dumnezeu?",
    memory: "Plata pacatului este moartea, dar darul lui Dumnezeu este viata vesnica.",
  }),
  make({
    id: "crucea_l2",
    order: 2,
    title: "Pocainta",
    refs: ["1 Tesaloniceni 1:9", "Apocalipsa 3:20", "Matei 3:8"],
    ref: "1 Tesaloniceni 1:9",
    hook: "Pocainta inseamna o intoarcere la stanga imprejur. Nu poti fi unit cu Hristos daca nu spui si tu da.",
    word: "V-ati intors de la idoli la Dumnezeu, ca sa slujiti Dumnezeului celui viu si adevarat.",
    truth: [
      "A fi unit cu Hristos seamana cu o casatorie. Un barbat poate spune ca vrea sa se insoare, dar casatoria nu are loc pana cand si fata nu spune: si eu vreau. El a spus deja da, cand a murit pe cruce si a inviat. Acum asteapta raspunsul tau.",
      "A trai cu o religie nu este acelasi lucru cu a trai cu Dumnezeu. Oamenii au de obicei o religie pentru ca s-au nascut in ea. Hristos nu a venit sa inceapa o religie noua si nici sa ne invete randuieli si mersul la biserica duminica. A venit sa ne aduca intr-o legatura cu Dumnezeu ca Tata.",
      "A te pocai inseamna, simplu, a te intoarce. La parada militara se comanda stanga imprejur, si soldatii se intorc o suta optzeci de grade. Ne nastem cu spatele la Dumnezeu si cu fata spre lume.",
      "Biblia numeste pocainta o intoarcere la Dumnezeu de la idoli. Daca ne inchinam la altceva decat la adevaratul Dumnezeu - bani, propria persoana, o slujba, o casa, o masina, un om iubit - acel lucru devine idol si ne intoarce de la Dumnezeu.",
      "Ne putem insela usor, crezand ca ne-am pocait pentru ca am rostit cuvintele. Dar Biblia spune sa aducem roade vrednice de pocainta. Daca ai furat bani, ii vei da inapoi. Daca ai inselat statul la impozite, vei restitui. Daca ai calatorit cu trenul fara bilet, vei plati.",
      "Multi se intorc la Dumnezeu doar cu vorbe. Religia lor nu ii costa niciodata nimic. Sa te intorci si sa dai inapoi banii luati pe nedrept este umilitor, dar tocmai asta dovedeste ca vrei cu adevarat sa lasi vechiul fel de viata.",
      "De ce ne este atat de greu sa spunem zece-cincisprezece cuvinte de iertare cuiva? Din pricina mandriei.",
      "Pocainta nu inseamna sa-ti lasi slujba si sa te faci pustnic. Nu este atat lepadarea de lucrurile pamantesti, cat lepadarea de atasarea de ele. Nu este pacat sa folosesti ce ne da viata de azi; este pacat sa iubesti acele lucruri mai mult decat pe Dumnezeu.",
    ],
    wrongA: "Pocainta inseamna sa spun lui Dumnezeu ca imi pare rau.",
    right: "Pocainta este o intoarcere reala, cu roade: adevar spus si indreptare acolo unde am gresit fata de oameni.",
    wrongB: "Pocainta inseamna sa renunt la casa, familie si slujba.",
    explanation:
      "Daca spun lui Dumnezeu ca imi pare rau, dar nu vreau sa indrept fata de om ce am stricat fata de om, inseamna ca vreau iertare ieftina. Iertarea nu a fost ieftina: L-a costat pe Dumnezeu pe Fiul Sau.",
    step: "Numeste un lucru concret de indreptat - un ban de dat inapoi sau o cerere de iertare - si fa-l in urmatoarele sapte zile.",
    prayer: "Doamne, Tu singur esti vrednic de inchinare. Imi pare rau ca mi-am trait viata inchinandu-ma lucrurilor facute. Vreau sa ma intorc la Tine.",
    journal: "Ce ai de indreptat fata de un om, nu doar fata de Dumnezeu?",
    memory: "V-ati intors de la idoli la Dumnezeu.",
  }),
  make({
    id: "crucea_l3",
    order: 3,
    title: "Credinta",
    refs: ["Efeseni 2:8", "Matei 9:27-29", "Efeseni 1:3"],
    ref: "Matei 9:29",
    hook: "Doi orbi au venit la Isus. El voia sa-i vindece, ei voiau sa fie vindecati. Si totusi le-a pus o intrebare in plus: credeti ca pot face lucrul acesta?",
    word: "Atunci S-a atins de ochii lor si a zis: Faca-vi-se dupa credinta voastra.",
    truth: [
      "Harul este mana lui Dumnezeu intinsa ca sa ne dea ajutorul, binecuvantarea, iertarea si puterea Lui. Credinta este mana noastra ridicata ca sa ia din mana Lui. Daca ti-as intinde o Biblie, ca s-o primesti trebuie sa intinzi mana.",
      "Nu trebuie sa muncim ca sa castigam iertarea. Este mult prea scumpa ca sa fie castigata cu fapte sau cu bani. Tocmai de aceea Dumnezeu o da fara plata.",
      "Daca unul dintre orbii aceia ar fi raspuns: nu prea sunt sigur, Doamne - ar fi plecat tot orb. Dorea sa vada, Isus dorea sa-l vindece, si totusi nu ar fi primit. Ce lipsea? Credinta.",
      "Ia aminte la ce a spus Isus: nu dupa dorinta voastra, nici macar dupa dorinta Mea, ci dupa credinta voastra.",
      "Plouă afara. Unul iese cu o cana, altul cu o galeata, altul cu un butoi. Cine se intoarce cu mai multa apa? Nu poti spune ca Dumnezeu a fost partinitor. Tu ai iesit cu o cana.",
      "Binecuvantarile lui Dumnezeu sunt ca o masa intinsa. Nimeni nu ti le pune in farfurie. Trebuie sa mergi la masa si sa iei. Daca iei putin, aceasta a fost alegerea ta.",
      "Dumnezeu nu asculta o formula magica. Un tata nu se uita daca copilul lui repeta cuvintele corect sau daca are gramatica buna. Asculta inima copilului. La fel, Dumnezeu asculta inima ta mai mult decat cuvintele tale.",
    ],
    wrongA: "Daca eu doresc si Dumnezeu doreste, primesc automat.",
    right: "Ramane o intrebare in plus: crezi ca El o va face pentru tine?",
    wrongB: "Credinta se dovedeste prin cuvintele potrivite in rugaciune.",
    explanation:
      "Credinta Il cinsteste pe Dumnezeu. Cand spui cred, spui de fapt: Doamne, cred ca esti vrednic de incredere si ca ce ai spus este adevarat.",
    step: "Numeste in scris un singur lucru pe care Dumnezeu l-a fagaduit in Cuvantul Sau si spune-I ca il primesti azi.",
    prayer: "Doamne Isuse, cred ca ai murit pentru mine si ca imi ierti pacatele acum. Cred ca imi vei da si ce am nevoie mai departe.",
    journal: "Cu ce ai iesit tu in ploaie pana acum: cu o cana, cu o galeata sau cu un butoi?",
    memory: "Faca-vi-se dupa credinta voastra.",
  }),
  make({
    id: "crucea_l4",
    order: 4,
    title: "Darul Duhului Sfant",
    refs: ["Faptele Apostolilor 2:38", "Evrei 4:16", "Ioan 16:7"],
    ref: "Faptele Apostolilor 2:38",
    hook: "Avem doua feluri de probleme: una cu trecutul - vina, esecul, pacatele - si una cu viitorul. Voi cadea iar si iar in aceleasi locuri?",
    word: "Pocaiti-va si fiecare din voi sa fie botezat in Numele lui Isus Hristos, spre iertarea pacatelor voastre; apoi veti primi darul Sfantului Duh.",
    truth: [
      "Dumnezeu a purtat de grija pentru amandoua. Pentru trecut, prin moartea lui Hristos. Pentru viitor, prin darul Duhului Sfant.",
      "Cand Isus era pe pamant, putea intari oamenii doar din afara si putea fi intr-un singur loc odata. Daca era in Galileea, nu era in Ierusalim. De aceea a spus ca este mai bine sa plece: ca sa trimita Duhul Sfant sa locuiasca in inimile lor, oriunde s-ar afla.",
      "Si e mai mult decat atat: nu doar oriunde ar fi, ci Isus inauntrul lor, nu in afara. Desi a fost cu ucenicii trei ani si jumatate, i-a invatat si i-a mustrat, la sfarsit tot se certau intre ei cine va fi mai mare. Problema dinauntru nu putea fi rezolvata cat timp Isus era pe dinafara.",
      "Prezenta trupeasca a lui Isus rezolva problemele din afara: furtuna, lipsa de paine, vinul de la nunta. Problema dinauntru, care este mult mai grava, nu putea fi rezolvata asa.",
      "Cum primim darul acesta? Exact la fel ca iertarea pacatelor. Nu este o conditie in plus si nu este o diploma de nivel inalt. Este inceputul vietii crestine.",
      "Este ca si cum cineva ti-a platit deja o enciclopedie in doua volume. Daca ai venit acasa cu un singur volum, te intorci la magazin si iei si al doilea. Este platit. Este gratuit.",
      "Mila si harul nu sunt acelasi lucru. Mila priveste iertarea pacatelor, adica trecutul. Harul priveste puterea pe care Dumnezeu ne-o da ca sa fim biruitori in zilele care vin, adica viitorul.",
    ],
    wrongA: "Duhul Sfant se primeste dupa multi ani de viata crestina.",
    right: "Iertarea si darul Duhului se primesc amandoua la inceput, prin aceeasi credinta.",
    wrongB: "Duhul Sfant este pentru cei care il merita prin sfintenie.",
    explanation:
      "Niciunul dintre noi nu merita nici cel mai mic dintre darurile lui Dumnezeu. De aceea se primesc prin credinta, nu prin vrednicie.",
    step: "Vino la Dumnezeu fara sovaiala si cere-I sa te umple cu Duhul Sau pentru zilele care vin, nu doar sa-ti ierte trecutul.",
    prayer: "Doamne, cred ca ai rezolvat trecutul meu. Astazi cred si ca ma vei intari pentru viitor. Umple-ma cu Duhul Tau.",
    journal: "Traiesti ca un om iertat de trecut, dar fara putere pentru maine? Unde se vede asta?",
    memory: "Veti primi iertarea pacatelor si darul Sfantului Duh.",
  }),
]
