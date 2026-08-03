import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 12 din docs/41-module-teme-poonen.md: "Tatal nostru, pas cu pas".
 * Temele 53-58.
 *
 * Sursa: Zac Poonen, "Basic Christian Teachings", capitolele 53-58 (cfcindia.com).
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

const COURSE_ID = "teme_c12_rugaciunea"

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
        prompt: "Cum te rogi acum?",
        options: [
          { id: `${p}c1`, label: "Mai mult cer decat vorbesc." },
          { id: `${p}c2`, label: "Spun cuvinte, dar fara inima." },
          { id: `${p}c3`, label: "Vreau sa invat sa vorbesc cu Tatal." },
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
        "Tatal tau stie de ce ai nevoie mai inainte ca sa-I ceri tu.",
        "Rugaciunea nu-L instiinteaza pe Dumnezeu; ea arata ca atarnam de El.",
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

export const TATAL_NOSTRU_LESSONS: Lesson[] = [
  make({
    id: "rug_l1",
    order: 1,
    title: "Nu ca fatarnicii",
    refs: ["Matei 6:5", "Matei 6:6", "Matei 23:13"],
    ref: "Matei 6:6",
    hook: "Cuvantul fatarnic inseamna actor. Actorul urca pe scena si se face ca este cineva care nu este in viata de toate zilele.",
    word: "Ci tu, cand te rogi, intra in odaita ta, incuie-ti usa si roaga-te Tatalui tau care este in ascuns.",
    truth: [
      "Am fost facuti ca sa vorbim cu Dumnezeu si sa-L auzim vorbindu-ne. Nimanui nu i-ar placea sa aiba un copil surd si mut. Esti tu unul dintre crestinii surzi si muti, care nu vorbesc niciodata cu Tatal si nu aud niciodata ce le spune El?",
      "Rugaciunea nu este o randuiala si nici o formula repetata. Este un copil care vorbeste cu tatal lui.",
      "Isus a spus ca la rugaciune nu cuprinsul este lucrul cel mai insemnat, ci starea inimii. De aceea, inainte sa le spuna cum sa se roage, le-a spus cum sa nu se roage.",
      "Scena unui om religios fatarnic este sala de adunare. Duminica se imbraca frumos si joaca rolul omului sfant. Cand se intoarce acasa, redevine cine este.",
      "Noi am crede ca cele mai mari pacate sunt uciderea, preacurvia si furtul. Isus a asezat deasupra tuturor un altul: fatarnicia. Pe curvele care s-au pocait nu le-a osandit; pe talharul de langa El l-a primit. Dar pe fatarnici i-a numit pui de naparți.",
      "Rugaciunea este ca o convorbire la telefon. Cand suni, te asiguri intai ca celalalt te aude. La fel, cel dintai lucru este sa stii ca Dumnezeu te asculta. Si tot ca la telefon: nu numai vorbesti, ci si asculti.",
      "Pentru multi, rugaciunea este doar o lista de cumparaturi: da-mi asta, da-mi cealalta. Ce ai zice de un copil care vine la tatal lui numai cand vrea ceva si nu-l intereseaza nicio alta vorba?",
      "Cel dintai lucru pe care l-a spus Isus: nu juca teatru. Nu te ruga ca sa fii vazut de oameni. Unii sunt atat de rusinosi incat nu se roaga niciodata in public - o margine. Altii se roaga rugaciuni lungi si plicticoase in public - cealalta margine. Cui se roaga acestia? Nu lui Dumnezeu.",
      "Intreaba-te data viitoare cand te rogi in public: ma rog eu asa si cand sunt singur? Ai aceeasi povara in odaia ta, sau numai in adunare?",
      "Daca ai facut asa - si, daca suntem cinstiti, toti am facut - mergi acasa si spune: Doamne, iarta-ma, rugaciunea mea a fost un pacat, fiindca I-am adus-o omului.",
    ],
    wrongA: "Rugaciunea buna se cunoaste dupa cuvintele alese.",
    right: "Rugaciunea se masoara dupa starea inimii, nu dupa cuvinte si nu dupa cine te aude.",
    wrongB: "Cine nu se roaga in public nu se roaga cu adevarat.",
    explanation:
      "Isus a osandit jocul de teatru religios mai tare decat pacatele pe care le stie toata lumea.",
    step: "Roaga-te azi ceva ce n-ai spune niciodata cu glas tare in fata altora.",
    prayer: "Doamne, scoate din mine dorinta de a fi vazut. Vreau sa vorbesc cu Tine, nu cu oamenii.",
    journal: "Ce spui in rugaciunea publica si nu spui cand esti singur?",
    memory: "Roaga-te Tatalui tau care este in ascuns.",
  }),
  make({
    id: "rug_l2",
    order: 2,
    title: "Nu cu multa vorbarie",
    refs: ["Matei 6:7-8", "Luca 18:1-7", "Luca 11:5-8", "Matei 14:30"],
    ref: "Matei 6:7",
    hook: "Cat de lunga trebuie sa fie rugaciunea ta ca sa fie ascultata? Petru s-a rugat doua secunde: Doamne, scapa-ma.",
    word: "Cand va rugati, sa nu bolborositi aceleasi vorbe, ca paganii.",
    truth: [
      "Daca te rogi si postesti si apoi spui altora ca ai postit trei zile sau sapte zile, Isus a spus despre acestia ca si-au luat rasplata. Au vrut cinstea de la oameni si au primit-o. De la Dumnezeu nu mai primesc nimic.",
      "Iar celalalt, care nu spune nimanui, se inchide in odaie si se roaga Tatalui in ascuns, nu primeste nimic de la oameni, dar primeste rasplata deplina de la Dumnezeu.",
      "Omul este din fire religios. Ne place sa aratam cat ne rugam, cat postim, cati bani dam pentru lucrarea Domnului, ce jertfe am facut. Isus a spus: bagati de seama sa nu spuneti nimanui nimic din acestea.",
      "Al doilea lucru: nu bolborositi aceleasi vorbe, ca paganii, care isi inchipuie ca, daca spun multe cuvinte, vor fi ascultati. Ei cred ca Dumnezeu este surd si nu aude daca spui o data.",
      "Multi cred ca Dumnezeu asculta pe cine se roaga un ceas si nu asculta pe cine se roaga un minut. De unde vine gandul acesta? Cand Petru se scufunda in mare, a strigat: Doamne, scapa-ma. Rugaciunea aceea a tinut doua secunde si a fost ascultata.",
      "Nu este vorba nici de lungime, nici de repetare - ci de repetarea fara inteles. In Ghetsimani, Isus a spus de trei ori acelasi lucru, dar din inima. Cand ai o povara, o duci inaintea lui Dumnezeu iar si iar, pana se ridica.",
      "Vaduva a mers mereu la judecator cu acelasi cuvant: fa-mi dreptate. Iar omul a batut mereu la usa vecinului pana i-a deschis. Isus ne-a invatat tocmai staruinta aceasta.",
      "Poti insa lua chiar rugaciunea Tatal nostru si s-o repeti ca un papagal de douazeci de ori. Va asculta Dumnezeu mai mult daca altul o spune de cincizeci de ori? Isus a spus limpede ca acesta este un gand pagan. Inima hotaraste ce aude Dumnezeu.",
      "Si inca ceva: Tatal vostru stie de ce aveti trebuinta mai inainte ca sa-I cereti voi. Cand te rogi, nu-I dai lui Dumnezeu o stire noua.",
      "Unii isi inchipuie ca rugaciunea inseamna sa-L induplecam pe Dumnezeu sa aiba mila de cineva fata de care ar fi impietrit. Este fara sens. Dumnezeu are pentru fiecare om mai multa mila decat vom avea noi vreodata.",
      "Ne rugam ca sa aratam ca atarnam de El si ca El este Cel care implineste toate nevoile noastre.",
    ],
    wrongA: "Cu cat ma rog mai mult timp, cu atat sunt mai ascultat.",
    right: "Inima hotaraste, nu numarul cuvintelor; staruinta din inima este altceva decat bolboroseala.",
    wrongB: "Rugaciunea Il instiinteaza pe Dumnezeu despre nevoile noastre.",
    explanation:
      "Rugaciunea lui Petru a tinut doua secunde si a fost ascultata; iar staruinta vaduvei era din inima.",
    step: "Spune-I azi lui Dumnezeu, in cateva cuvinte simple, lucrul care te apasa cu adevarat.",
    prayer: "Doamne, nu vreau vorbe multe. Vreau o inima adevarata inaintea Ta.",
    journal: "Ce spui in rugaciune fara sa mai gandesti ce spui?",
    memory: "Tatal vostru stie de ce aveti trebuinta mai inainte ca sa-I cereti voi.",
  }),
  make({
    id: "rug_l3",
    order: 3,
    title: "Tatal nostru care esti in ceruri",
    refs: ["Matei 6:9", "Iacov 1:6-7", "Evrei 11:6", "Romani 12:2"],
    ref: "Matei 6:9",
    hook: "In cele dintai patru cuvinte ale rugaciunii sunt doua temeiuri care iti intaresc credinta: ne iubeste si poate totul.",
    word: "Tatal nostru care esti in ceruri!",
    truth: [
      "Una dintre cerintele cele mai insemnate pentru rugaciunea ascultata este credinta. Cine se indoieste seamana cu valul marii, tulburat de vant; un astfel de om sa nu se astepte sa primeasca ceva de la Domnul.",
      "Multi spun: m-am rugat, presupun ca Dumnezeu a auzit. Intrebarea este: te-ai rugat cu credinta? Cine se apropie de Dumnezeu trebuie sa creada ca El este si ca rasplateste pe cei ce-L cauta.",
      "De aceea ne-a invatat Isus sa incepem cu Tatal nostru: nu este directorul unei mari intreprinderi, la usa caruia astepti sa fii primit, nici un mare conducator religios cu lista de asteptare. Este un Tata iubitor.",
      "Si care esti in ceruri: Cel care carmuieste peste tot universul. Deci nu numai Cineva care ne iubeste, ci Cineva care are toata puterea.",
      "Cand vrei sa-I ceri ceva, opreste-te si intreaba-te cu Cine vorbesti. Odata ce stii ca vorbesti cu Cel care te iubeste desavarsit si care are toata puterea, esti gata sa te rogi.",
      "Banuiesc ca foarte multe rugaciuni ale crestinilor nu primesc niciodata raspuns - poate noua din zece - fiindca nu este credinta in ele.",
      "In rugaciunea aceasta sunt sase cereri. Cele dintai trei privesc pe Dumnezeu: sfinteasca-se Numele Tau, vie Imparatia Ta, faca-se voia Ta. Celelalte trei privesc nevoile noastre.",
      "Deci, inainte de nevoile noastre, Isus ne-a invatat sa ne rugam pentru slava lui Dumnezeu, pentru Imparatia si pentru voia Lui. Astfel ne-a invatat sa-L punem pe Dumnezeu cel dintai. Chiar daca nevoia ta este mare, ea ramane a doua.",
      "Necazul intregului neam omenesc, din zilele lui Adam, este ca suntem asezati in jurul nostru insine. Mereu ne gandim ce castig avem de aici, cum ma ajuta pe mine si pe familia mea.",
      "Aceasta este innoirea mintii: sa privim totul mai intai din punctul de vedere al lui Dumnezeu, nu din al nostru.",
    ],
    wrongA: "Rugaciunea incepe cu nevoia mea, fiindca este cea mai arzatoare.",
    right: "Rugaciunea incepe cu Dumnezeu: Numele, Imparatia si voia Lui; nevoile vin dupa.",
    wrongB: "Credinta nu are legatura cu primirea raspunsului.",
    explanation:
      "Cine se indoieste sa nu se astepte sa primeasca ceva de la Domnul.",
    step: "Incepe azi rugaciunea numai cu Dumnezeu; abia dupa cinci minute spune-ti nevoia.",
    prayer: "Tatal nostru care esti in ceruri, cred ca ma iubesti si ca poti totul.",
    journal: "Cu ce imagine despre Dumnezeu te-ai rugat pana acum?",
    memory: "Tatal nostru care esti in ceruri!",
  }),
  make({
    id: "rug_l4",
    order: 4,
    title: "Numele, Imparatia si voia Lui",
    refs: ["Matei 6:9-10", "Ioan 12:27-28", "Ioan 6:38", "Psalmul 34:19"],
    ref: "Ioan 12:28",
    hook: "Isus, sub cea mai grea apasare, a spus: ce voi zice? Tata, izbaveste-Ma din ceasul acesta? Nu. Tata, proslaveste Numele Tau.",
    word: "Tata, proslaveste Numele Tau!",
    truth: [
      "Multa vreme oamenii au crezut ca pamantul este centrul universului si toate socotelile le ieseau gresit. Asa este si duhovniceste: Dumnezeu nu ne-a facut sa fim asezati in jurul nostru insine.",
      "Cea dintai cerere este: sfinteasca-se Numele Tau. Nu inseamna ca oamenii sa-L cinsteasca pe Isus ca pe un om mare; inseamna ca oamenii sa se plece cu totul inaintea Domniei Lui.",
      "Si sa inceapa cu cei care se numesc crestini: sa-L puna cu totul pe cel dintai loc in viata lor.",
      "Nu ajunge sa spui cuvintele; trebuie sa fie povara inimii tale: Doamne, cea dintai povara a mea este ca Numele Tau sa fie proslavit in viata mea, in familia mea, in biserica noastra si in tara noastra.",
      "Cand a fost sub cea mai grea apasare, Isus a spus: acum sufletul Meu este tulburat. Si ce voi zice? Tata, izbaveste-Ma din ceasul acesta? A ales sa spuna: Tata, proslaveste Numele Tau. Putea sa Se roage sa fie crutat, si atunci noi am fi ramas pierduti in pacatele noastre.",
      "A doua cerere: vie Imparatia Ta. Astazi nu prea mai avem imparati; un cuvant mai potrivit ar fi carmuire. Doamne, vie carmuirea Ta - in lume, in biserica si in viata mea.",
      "A treia cerere: faca-se voia Ta, precum in cer asa si pe pamant. Isus a spus ca a venit din cer nu ca sa faca voia Lui, ci voia Celui ce L-a trimis.",
      "Cum se face voia lui Dumnezeu in cer? Ingerii asculta indata. Nu spun: mai asteapta putin, Doamne, am ceva mai insemnat de facut.",
      "Omul face asa. Dumnezeu ii spune sa se duca sa-si ceara iertare, sa se boteze sau sa dea inapoi banii luati pe nedrept, iar el asteapta zile, saptamani, luni.",
      "Ingerii asculta indata, cu bucurie si pe deplin. Nu umbla cu fata lunga, plangandu-se de partea lor. Asa suntem chemati sa ascultam si noi.",
      "Sunt multe necazuri pentru cel neprihanit, dar Domnul il scapa din toate. Si lumea are necazuri, dar nu are cine s-o scape. Noi avem un Tata in ceruri.",
    ],
    wrongA: "Imparatia Lui priveste lumea, nu viata mea de zi cu zi.",
    right: "Cele trei cereri incep cu mine: Numele Lui cinstit, carmuirea Lui si voia Lui in viata mea.",
    wrongB: "Pot amana ascultarea pana imi vine bine.",
    explanation:
      "Ascultarea din cer este indata, bucuroasa si deplina. Aceasta cerem sa fie si pe pamant.",
    step: "Fa azi, in ceasul urmator, lucrul pe care il amani de saptamani.",
    prayer: "Tata, proslaveste Numele Tau in viata mea, chiar daca ma costa.",
    journal: "Ce ti-a spus Dumnezeu si inca astepti?",
    memory: "Tata, proslaveste Numele Tau!",
  }),
  make({
    id: "rug_l5",
    order: 5,
    title: "Painea noastra cea de toate zilele",
    refs: ["Matei 6:11", "Filipeni 4:19", "Matei 6:10"],
    ref: "Matei 6:11",
    hook: "In toata rugaciunea aceasta nu apar cuvintele eu, mie si al meu. Nici macar o data.",
    word: "Painea noastra cea de toate zilele da-ne-o noua astazi.",
    truth: [
      "Daca incepi cu adevarat sa te rogi asa, ajungi un om duhovnicesc: dorinta ta cea dintai este ca Numele lui Dumnezeu sa fie proslavit, nu daca faci bani sau daca ti se vindeca durerea de spate.",
      "Multe necazuri nu se dezleaga niciodata daca nu-L pui pe Dumnezeu cel dintai. Nu spun ca nu vei avea necazuri; spun ca Dumnezeu va lucra si te va face biruitor in mijlocul lor.",
      "Cuvintele eu, mie si al meu nu se afla in rugaciunea aceasta. Dupa ce am cautat Numele, Imparatia si voia lui Dumnezeu, urmatorul lucru este sa nu ne gandim numai la noi, ci si la ceilalti copii ai Tatalui.",
      "Iti este foame? Roaga-te pentru painea ta. Dar nu uita ca mai sunt copii ai lui Dumnezeu carora le este foame. De aceea a spus: painea noastra, iarta-ne noua, izbaveste-ne pe noi.",
      "Nu ne-a invatat sa cerem paine pentru un an intreg. Sa fii multumit daca Dumnezeu ti-a dat destul pentru ziua de azi. Nu inseamna ca este rau sa pui deoparte pentru maine; poti face planuri, dar sa fii multumitor.",
      "Si nu ne-a invatat sa cerem lucruri de prisos: nu inghetata zilnica, nici prajitura zilnica, ci painea cea de toate zilele - hrana simpla care tine trupul in putere.",
      "Tatal stie ca avem nevoie de paine. Atunci de ce nu ne-o da fara sa cerem? Fiindca vrea sa avem legatura cu El si bucuria unei rugaciuni ascultate.",
      "De aceea multumim inainte de masa. Nu ca sa aiba mancarea alt gust, ci ca sa recunoastem ca Dumnezeu a dat-o. Cei fara Dumnezeu se asaza la masa fara sa multumeasca nimanui.",
      "Deci nu este niciun rau in a te ruga pentru lucruri materiale de trebuinta: imbracaminte, o casa in care sa locuiesti, scoala pentru copii.",
      "Bagati de seama unde este asezata cererea aceasta: indata dupa faca-se voia Ta. Adica: vreau sa se faca voia Ta pe pamant si, ca s-o pot face, da-mi painea cea de toate zilele, ca sa am putere.",
      "Unii spun ca este nepotrivit sa te rogi pentru lucruri materiale. Suna evlavios, dar este impotriva invataturii lui Isus, care ne-a invatat sa cerem painea inainte chiar de iertare si de izbavire.",
    ],
    wrongA: "Este nepotrivit sa te rogi pentru lucruri materiale.",
    right: "Ne rugam pentru ce ne este de trebuinta, ca sa avem putere sa facem voia Lui - si ne rugam pentru toti, nu doar pentru noi.",
    wrongB: "Rugaciunea aceasta ne indeamna sa cerem belsug.",
    explanation:
      "Cererea pentru paine sta indata dupa faca-se voia Ta: cerem ca sa putem asculta.",
    step: "Roaga-te azi pentru painea unui om pe care il stii in lipsa - si du-i ceva.",
    prayer: "Doamne, da-ne noua astazi painea de care avem trebuinta, ca sa facem voia Ta.",
    journal: "Pentru cine altcineva te-ai rugat saptamana aceasta?",
    memory: "Painea noastra cea de toate zilele da-ne-o noua astazi.",
  }),
  make({
    id: "rug_l6",
    order: 6,
    title: "Iarta-ne si izbaveste-ne",
    refs: ["Matei 6:12-13", "Matei 6:14-15", "Matei 18:23-35", "2 Timotei 2:22"],
    ref: "Matei 6:14",
    hook: "Dintre toate cele sase cereri, Isus a ales una singura ca s-o repete la sfarsit: iertarea celor care ne-au gresit.",
    word: "Daca iertati oamenilor greselile lor, si Tatal vostru cel ceresc va va ierta voua.",
    truth: [
      "Avem doua feluri de nevoi: unele privesc trecutul, altele viitorul. Pentru trecut ne trebuie iertare; pentru viitor ne trebuie ajutor ca sa biruim raul din firea noastra.",
      "Nu trebuie sa faci o lista cu toate pacatele tale; nimeni n-ar putea. Recunoastem ca suntem pacatosi si Ii cerem sa ne ierte, precum si noi iertam gresitilor nostri. Aceasta este singura conditie.",
      "Isus a spus pilda imparatului care a iertat unui rob o datorie uriasă. Omul acela a iesit sarind de bucurie, a intalnit un tovaras care ii datora o nimica toata, l-a apucat de gat si l-a aruncat in temnita.",
      "Ce a facut imparatul cand a auzit? L-a chemat inapoi: eu ti-am iertat toata datoria si tu n-ai putut ierta atata? Si l-a dat pe mana chinuitorilor. Isus a incheiat: tot asa va face si Tatal Meu cel ceresc, daca nu iertati.",
      "Unul dintre cele mai mari pacate intalnite astazi intre crestini este duhul care nu iarta. Aici este singurul loc unde Isus a spus ca pacatele tale nu vor fi iertate; ba chiar iertarea data poate fi luata inapoi.",
      "Ganditi-va o clipa: daca este pe pamant un om pe care nu l-ai iertat, Tatal tau ceresc nu te iarta pe tine.",
      "Dumnezeu nu-ti cere sa uiti ce ti-au facut oamenii. Iti cere sa ierti. Spune-I: Doamne, il iert pe omul acesta; nu mai tin nimic impotriva lui.",
      "Apoi vine: nu ne duce in ispita, ci izbaveste-ne de cel rau. Nu incerca sa faci pe viteazul. Scriptura spune: fugi de idolatrie, fugi de poftele tineretii. Nu te aseza singur in locul unde poti fi ispitit fara rost.",
      "Aici este marturisirea ca nu ma pot izbavi singur, cum nu-mi pot castiga nici iertarea. Nu ma pot izbavi prin hotarare sau prin stapanire de sine. Il rog pe singurul care are putere.",
      "Si iarasi nu este numai despre mine: izbaveste-ne pe noi, pentru Imparatia Ta si pentru slava Ta. Numele Tau este necinstit cand crestinii fac rau.",
      "Rugaciunea se incheie cum a inceput - cu Dumnezeu: a Ta este Imparatia si puterea si slava. Este rugaciunea unui om smerit, care recunoaste ca Dumnezeu este totul si el este nimic. Cand vine raspunsul, nu ne luam noi cinstea.",
      "Iar Amin este un cuvant evreiesc care inseamna: asa sa fie. Este o marturisire de credinta. Cum a inceput rugaciunea cu credinta, tot cu credinta se incheie.",
      "Nu trebuie sa repetam rugaciunea aceasta de fiecare data. Isus a spus: iata dar cum trebuie sa va rugati. Adica: incepeti asezandu-L pe Dumnezeu in mijloc, rugati-va cu credinta si incheiati dandu-I Lui slava.",
    ],
    wrongA: "Iertarea inseamna sa uiti ce ti s-a facut.",
    right: "Iertarea inseamna sa nu mai tii nimic impotriva omului; Dumnezeu nu-ti cere sa uiti.",
    wrongB: "Ma pot izbavi de rau prin hotarare si stapanire de sine.",
    explanation:
      "Daca este un singur om pe pamant pe care nu l-ai iertat, Tatal nu te iarta pe tine.",
    step: "Numeste azi, inaintea lui Dumnezeu, omul pe care nu l-ai iertat - si iarta-l.",
    prayer: "Doamne, iarta-ma cum si eu iert. Nu ma duce in ispita si izbaveste-ma de cel rau.",
    journal: "Pe cine tii inca sub datorie in inima ta?",
    memory: "Daca iertati oamenilor greselile lor, si Tatal vostru cel ceresc va va ierta voua.",
  }),
]
