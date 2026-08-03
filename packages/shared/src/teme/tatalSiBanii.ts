import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 10 din docs/41-module-teme-poonen.md: "Tatăl, înțelepciunea și banii".
 * Temele 43-48.
 *
 * Sursa: Zac Poonen, "Basic Christian Teachings", capitolele 43-48 (cfcindia.com).
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

const COURSE_ID = "teme_c10_tatal_banii"

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
        prompt: "Unde te găsești?",
        options: [
          { id: `${p}c1`, label: "Sunt neliniștit și mă tem de ziua de mâine." },
          { id: `${p}c2`, label: "Alerg după mai mult, fără să recunosc." },
          { id: `${p}c3`, label: "Vreau să așez lucrurile la locul lor." },
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
        "Isus a spus: nu vă voi lăsa orfani. Duhul Sfânt vine să te încredințeze că Dumnezeu îți este Tată.",
        "Dumnezeu dă cu dărnicie și fără mustrare, celui ce cere cu credință.",
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

export const TATAL_SI_BANII_LESSONS: Lesson[] = [
  make({
    id: "bani_l1",
    order: 1,
    title: "Nu ești orfan",
    refs: ["Ioan 14:18", "Ioan 1:18", "Matei 6:26", "Matei 6:9"],
    ref: "Ioan 14:18",
    hook: "Lumea este plină de orfani duhovnicești: oameni care nu-L au pe Dumnezeu ca Tată. De aici vine toată neliniștea.",
    word: "Nu vă voi lăsa orfani; Mă voi întoarce la voi.",
    truth: [
      "Un orfan este cel care nu are tată și mamă. Este mare deosebire între un copil crescut în dragostea unui tată și a unei mame și un copil care n-a avut niciodată așa ceva.",
      "Când lipsește dragostea aceasta, omul se apără mereu. Simte că lumea este împotriva lui. Ajunge închis în sine, deznădăjduit, invidios pe cei care au mai mult, stăpânitor în prietenii. Poate rămâne așa și la patruzeci sau cincizeci de ani.",
      "Duhovnicește, lumea este plină de orfani, fiindcă oamenii nu-L au pe Dumnezeu ca Tată. De aceea se luptă, se apără, sunt stăpânitori. Iubesc banii fiindcă sunt nesiguri; nu au un Tată ceresc.",
      "Isus a căutat mereu să-i facă pe ucenici să înțeleagă că Dumnezeu este un Tată iubitor. I-a învățat să se roage: Tatăl nostru. Nimeni din Vechiul Testament nu se putea ruga așa.",
      "Nimeni n-a văzut vreodată pe Dumnezeu; Fiul ni L-a făcut cunoscut. Este ca un copil care n-a văzut niciodată un elefant și i se cere să-l deseneze; nimeni nu s-ar gândi la o trompă. Așa sunt și părerile oamenilor despre Dumnezeu: toate greșite. Numai Cel venit din cer ne poate spune cum este Dumnezeu.",
      "Cei mai mulți și-L închipuie pe Dumnezeu ca pe un polițist care stă la colț și așteaptă să te prindă cu o greșeală. De frica aceasta se folosesc preoți și predicatori, spunând că trebuie să-L îmblânzești dând bani.",
      "Care tată umblă să scoată bani de la copiii lui mici? Un tată caută mereu să-i ajute: să-i hrănească, să-i îmbrace, să-i dea învățătură, și nu primește nimic în schimb. Așa este Dumnezeu.",
      "Isus a spus: uitați-vă la păsările cerului, cine le hrănește? Câte păsări moarte de foame vezi pe drum? Aproape niciuna. Și nu sunteți voi cu mult mai de preț decât ele?",
      "Când ești neliniștit, devii iritabil și lovești înapoi în cei despre care bănuiești că te lovesc. Cel care este în siguranță în Dumnezeu nu se tulbură de ce spun oamenii.",
      "Dacă pe drum latră un câine de după poartă, te apuci să te cerți cu el? Tot atât de fără minte este să te cerți cu cine te acuză sau răspândește povești despre tine. Când Îl numeau căpetenia dracilor, Isus i-a lăsat în pace.",
    ],
    wrongA: "Dumnezeu stă cu ochii pe mine, gata să mă pedepsească.",
    right: "Dumnezeu îți este Tată: te iubește, te cunoaște și Se îngrijește de tine.",
    wrongB: "Ca să mă primească Dumnezeu, trebuie să dau bani.",
    explanation:
      "Toată neliniștea, teama și încordarea vin din faptul că trăim ca niște orfani, deși avem un Tată.",
    step: "Când cineva te vorbește de rău azi, lasă-l în pace, ca pe câinele de după poartă.",
    prayer: "Doamne, dă-mi încredințarea că îmi ești Tată și scoate din mine neliniștea de orfan.",
    journal: "Unde te aperi, fiindcă simți că nu are cine să te apere?",
    memory: "Nu vă voi lăsa orfani; Mă voi întoarce la voi.",
  }),
  make({
    id: "bani_l2",
    order: 2,
    title: "Dumnezeu îți poate da înțelepciune",
    refs: ["Iacov 1:5", "Iacov 1:6-7", "Matei 7:11", "Proverbe 18:24"],
    ref: "Iacov 1:5",
    hook: "Este mare deosebire între a ști Biblia și a-L cunoaște pe Dumnezeu. Înțelepciunea nu este cunoașterea unei cărți, ci a lui Dumnezeu.",
    word: "Dacă vreunuia dintre voi îi lipsește înțelepciunea, s-o ceară de la Dumnezeu, care dă tuturor cu mână largă și fără mustrare, și ea îi va fi dată.",
    truth: [
      "Dumnezeu a făcut pregătire pentru fiecare nevoie a noastră. I-a dat lui Adam foamea și i-a dat și hrana; i-a dat setea și i-a dat și apa; i-a dat nevoia de odihnă și a rânduit noaptea.",
      "Ce învățăm din asta? Că dacă este în inima noastră o dorință pusă de Dumnezeu și încă neîmplinită, undeva există și împlinirea ei.",
      "Una dintre cele mai mari nevoi ale noastre este să nu ne mai simțim singuri. Poți locui într-o casă cu mulți copii și să te simți singur. Poți fi într-o biserică mare și să te simți singur.",
      "Dacă vrei să-ți găsești răspunsul la singurătate numai în prieteni, vei fi dezamăgit într-o zi. Este un prieten mai apropiat decât un frate.",
      "Un orfan care are o nevoie merge la un unchi ca un cerșetor și nu știe dacă va fi ajutat. Dar un copil își poate cere orice de la tatăl lui. Când ai un tată, ești în siguranță.",
      "Când L-ai găsit pe Dumnezeu ca Tată, nu mai poți fi singur niciodată, fiindcă legătura este mereu deschisă. Îl poți chema oriunde ai fi. El știe nevoia ta înainte să I-o spui.",
      "Ce este înțelepciunea? Este altceva decât cunoștința. Poți ști chimie și să ai probleme; poți ști Biblia și să ai probleme. Sunt atâția oameni cu multă cunoștință biblică și totuși neliniștiți, certăreți, invidioși.",
      "Înțelepciunea este cunoașterea lui Dumnezeu, care ne ajută să găsim o dezlegare practică la o problemă anume.",
      "Închipuie-ți că ai fost despărțit de tatăl tău douăzeci și cinci de ani și ai citit o carte despre viața lui. Știi despre el, dar nu-l cunoști. Un copil care a crescut cinci ani lângă tatăl lui, fără nicio carte, îl cunoaște mai bine. Mulți citesc Biblia ca pe o biografie a Tatălui, fără să-L cunoască pe Tatăl.",
      "Dacă voi, care sunteți răi, știți să dați daruri bune copiilor voștri, cu cât mai mult Tatăl vostru din ceruri. Ceri o lingură, îți dă o găleată; și nu te va certa niciodată, nu-ți va spune: cum de nu știi singur?",
      "Este o singură condiție: să ceri cu credință. Dacă nu ceri cu credință, nu vei primi. Poate tocmai de aceea n-ai găsit încă dezlegarea. Nu te ruga în general; spune lucrul anume.",
    ],
    wrongA: "Cunoștința Bibliei îmi dezleagă problemele practice.",
    right: "Înțelepciunea este cunoașterea lui Dumnezeu care aduce o dezlegare practică; se cere și se primește prin credință.",
    wrongB: "Dumnezeu mă va certa dacă vin cu lucruri mărunte.",
    explanation:
      "Dumnezeu dă cu mână largă și fără mustrare - dar celui ce cere crezând.",
    step: "Numește azi, în rugăciune, un lucru anume și cere dezlegare, crezând.",
    prayer: "Doamne, nu vreau doar să știu despre Tine. Vreau să Te cunosc și să primesc înțelepciune de la Tine.",
    journal: "Ce problemă ai purtat singur, fără să I-o ceri Lui anume?",
    memory: "Dacă vreunuia dintre voi îi lipsește înțelepciunea, s-o ceară de la Dumnezeu.",
  }),
  make({
    id: "bani_l3",
    order: 3,
    title: "Dumnezeu și banii sunt doi stăpâni",
    refs: ["Luca 16:13", "Luca 16:14", "Matei 23:3"],
    ref: "Luca 16:13",
    hook: "Cei doi stăpâni din vorbele lui Isus nu sunt Dumnezeu și Satana. Sunt Dumnezeu și Mamona.",
    word: "Nicio slugă nu poate sluji la doi stăpâni. Nu puteți sluji lui Dumnezeu și lui Mamona.",
    truth: [
      "Dacă cei doi stăpâni ar fi Dumnezeu și Satana, nici n-ar mai fi nevoie să vorbim despre asta. Toată lumea știe că nu poți sluji la amândoi.",
      "Cei doi stăpâni de aici sunt Dumnezeu și Mamona - banii și bogățiile. Și ce spune despre ei? Pe unul îl vei urî și pe celălalt îl vei iubi; de unul te vei lipi și pe celălalt îl vei nesocoti.",
      "Banii sunt un slujitor bun, dar un stăpân îngrozitor. La fel este și focul. Focul ținut sub stăpânire pe aragaz este un slujitor minunat; scăpat de sub stăpânire, arde toată casa.",
      "Nu suntem împotriva banilor, cum nu suntem împotriva focului. Dar cine umblă cu foc trebuie să fie cu băgare de seamă. Ești tu la fel de atent cu banii pe cât ești cu focul? Ar trebui să fii și mai atent, fiindcă banii sunt mai primejdioși.",
      "Nu propovăduim viața de pustnic sau de călugăr. Dumnezeu n-a chemat pe toți să lase slujba; poate unul din o mie este chemat la lucrarea cu normă întreagă. Ceilalți nouăsute nouăzeci și nouă muncesc - dar trebuie să știe să umble cu banii.",
      "Închipuie-ți o femeie care are un slujitor în grădină și ajunge să-l iubească mai mult decât pe soțul ei. Ceva s-a stricat. Nu înseamnă că trebuie să dea afară grădinarul, ci să-l țină la locul lui.",
      "Poți să spui că legătura ta cu Dumnezeu și cu banii este așa: pe unul îl urăști și pe celălalt îl iubești?",
      "Nu poți avea o poziție neutră față de bani, cum nu poți avea față de Satana. Ori îi iubești, ori îi urăști.",
      "Fariseii aveau învățătura curată și erau peste măsură de religioși. Dar este scris că iubeau banii - și tocmai asta dovedea că Îl urâau pe Dumnezeu.",
      "Dumnezeu și Mamona sunt ca cei doi poli ai unui magnet: dacă ești atras de unul, ești respins de celălalt.",
      "Care este atunci dezlegarea? Uită-te la Isus. A muncit ca tâmplar și Și-a câștigat pâinea, dar nu Se lipise de ea. Spune-I: Doamne, vreau să am față de lucruri aceeași inimă pe care ai avut-o Tu.",
    ],
    wrongA: "Cei doi stăpâni sunt Dumnezeu și Satana.",
    right: "Cei doi stăpâni sunt Dumnezeu și banii; nu poți fi neutru față de ei.",
    wrongB: "Ca să fii curat, trebuie să scapi de bani.",
    explanation:
      "Banii sunt un slujitor bun și un stăpân îngrozitor. Ține-i la locul de slujitor.",
    step: "Uită-te azi la o cheltuială și întreabă: cine poruncește aici, eu sau banii?",
    prayer: "Doamne, vreau să Te iubesc pe Tine și să țin banii la locul de slugă.",
    journal: "Ce hotărâre ai luat în ultima vreme pornind de la bani, nu de la Dumnezeu?",
    memory: "Nu puteți sluji lui Dumnezeu și lui Mamona.",
  }),
  make({
    id: "bani_l4",
    order: 4,
    title: "Iubirea de bani",
    refs: ["1 Timotei 6:10", "1 Timotei 6:9", "Deuteronom 8:18", "Geneza 13"],
    ref: "1 Timotei 6:10",
    hook: "Nu banii sunt rădăcina tuturor relelor, ci iubirea de bani. Și nu scapi de ea predicând împotriva ei.",
    word: "Căci iubirea de bani este rădăcina tuturor relelor.",
    truth: [
      "Dacă nu așezăm lucrul acesta la locul lui, nu vom crește niciodată. Cred că aceasta este una dintre pricinile de căpetenie pentru care mulți credincioși rămân ca niște copii care nu se mai fac mari.",
      "Cum putem ajunge să-L iubim pe Dumnezeu mai mult decât banii? Predicând mereu împotriva banilor? Nu merge. O predică negativă naște doar farisei, care își închipuie că ei urăsc banii și că ceilalți nu sunt ca ei.",
      "Gândiți-vă la o fată îndrăgostită de un tânăr care nu este bun. Părinții îi spun să-l lase; nu se întâmplă nimic. Se întâlnesc pe ascuns, și dragostea ei crește.",
      "Apoi, într-o zi, întâlnește un alt tânăr, mai bun în toate privințele. Deodată inima i se umple de dragoste pentru acesta și nu mai vrea să-l vadă pe cel dintâi. Ce n-au izbutit părinții în ani, a izbutit acest om într-o clipă.",
      "Așa se scoate afară dragostea de bani: inima trebuie umplută cu o altă dragoste. Este ca lumina care alungă întunericul dintr-o odaie.",
      "Deci nu predicăm un mesaj negativ. Îl înălțăm pe Hristos. Când vezi cine este El cu adevărat și Îl iubești cu toată inima, lipirea de bani dispare de la sine.",
      "Dar dacă fata spune că-l iubește pe al doilea și în ascuns tot îi scrie celui dintâi? Este o prefăcătorie. Aceasta este starea multor credincioși: duminică dimineața cântăm Domnului cântări ca niște scrisori de dragoste, iar toată săptămâna alergăm după cel dintâi.",
      "Te bucuri peste măsură când primești pe neașteptate mulți bani? Tânjești să faci tot mai mulți? Dacă da, atunci iubești banii și slujești lui Mamona.",
      "Nu este niciun rău în a câștiga mult. Poți avea un venit mare și să-L iubești pe Dumnezeu. Nu conta cât câștigi, ci dacă alergi după bani.",
      "Mulți cred, din nechibzuință, că dacă au mai mulți bani, este semn că Dumnezeu i-a binecuvântat. Unii chiar își doresc să câștige la loterie. Loteriile sunt unul dintre mijloacele Satanei de a-i atrage pe oameni la închinarea înaintea banilor: câștigi din dezamăgirea altor o sută de mii de oameni. Crezi că Isus ar cumpăra un bilet de loterie?",
      "Binecuvântarea lui Dumnezeu nu se vede în lucrurile materiale. Isus a fost sărac și a fost cel mai binecuvântat. Petru a spus: argint și aur n-am. Pavel a fost sărac și a muncit cu mâinile.",
      "Avraam n-a umblat să se îmbogățească și Dumnezeu l-a binecuvântat. Lot a vrut să se îmbogățească; s-a dus în Sodoma și s-a nimicit pe sine. Balaam a vrut să se îmbogățească predicând și și-a pierdut chemarea. Ghehazi a vrut să se îmbogățească și a moștenit lepra. Iuda a vrut niște bani și s-a pierdut. Dima putea fi ca Pavel, dar a alergat după bani.",
    ],
    wrongA: "Banii sunt rădăcina tuturor relelor.",
    right: "Iubirea de bani este rădăcina; se scoate afară doar când inima este umplută cu dragostea pentru Hristos.",
    wrongB: "Cine are mai mulți bani este mai binecuvântat de Dumnezeu.",
    explanation:
      "Nu contează cât câștigi, ci dacă alergi după bani. Lumina alungă întunericul; dragostea nouă o alungă pe cea veche.",
    step: "Cere-I azi lui Dumnezeu să-ți arate frumusețea lui Hristos, nu doar să-ți taie pofta.",
    prayer: "Doamne Isuse, vreau să Te iubesc cu toată inima și să fiu izbăvit de răul iubirii de bani.",
    journal: "Ce te-a bucurat mai tare în ultima lună: un câștig sau Dumnezeu?",
    memory: "Iubirea de bani este rădăcina tuturor relelor.",
  }),
  make({
    id: "bani_l5",
    order: 5,
    title: "Dă înapoi ce este al altora",
    refs: ["Matei 22:21", "Luca 19:8", "Romani 13:8", "1 Timotei 6:9"],
    ref: "Matei 22:21",
    hook: "Isus n-a spus întâi: dați lui Dumnezeu. A spus întâi: dați Cezarului. Întâi dreptate, apoi credincioșie.",
    word: "Dați dar Cezarului ce este al Cezarului, și lui Dumnezeu ce este al lui Dumnezeu.",
    truth: [
      "Satana nu ne spune de la început unde duce drumul. Ne dă mai întâi un pic din gustul bogăției, cum face cel care vinde droguri: dă la început puțin, pe gratis, unui copil la școală. După ce a prins gustul, vrea mai mult.",
      "Mulți credincioși și-au vândut dreptul de întâi născut pentru un blid de linte, ca Esau. Gândiți-vă ce părere de rău vor avea în veșnicie.",
      "Un om cu judecată nu aleargă după avere peste nevoile lui, așa cum nu sare de la etajul zece. Cel care sare își spune: alții s-au rănit, eu nu mă voi răni.",
      "Sunt două lucruri care te scapă. Cel dintâi: dreptatea în bani. Dă înapoi ce este al altora. Aici Cezar înseamnă un alt om sau statul.",
      "Dacă ai împrumutat bani, nu-i da lui Dumnezeu; Dumnezeu nu-i vrea. Dă-i înapoi celui de la care i-ai luat, chiar dacă au trecut douăzeci și cinci de ani.",
      "Poate n-au fost împrumutați, ci furați: un lucru de la birou, un medicament de la spital, o carte pe care n-ai mai dat-o înapoi, o unealtă. Dă-le înapoi. Ai călătorit cu trenul fără bilet? Plătește drumul acela.",
      "La fel și cu statul. Dacă ai ascuns cât ai câștigat, socotește și dă înapoi. Dacă ai trecut lucruri prin vamă fără să plătești, sau, și mai rău, ai dat mită vameșului, socotește taxa și plătește-o statului. Mita nu înseamnă că ai plătit statului; aceia au intrat în buzunarul lui.",
      "Zacheu a spus: dau înapoi împătrit. S-a gândit și la dobândă. Iar pentru cei cărora nu le mai știa adresa, a spus: dau săracilor. Așa să faci și tu: bisericii sau săracilor.",
      "Chiar dacă datoria este foarte mare, nu te descuraja. Începe cu puțin în fiecare lună. Dumnezeu te binecuvântează din ziua în care începi să plătești, nu după ce ai terminat de plătit. El vede inima gata să îndrepte lucrurile.",
      "Nu folosește la nimic să ai în casă o plăcuță cu Dumnezeu să binecuvânteze casa aceasta, dacă în casa aceea sunt lucruri luate pe nedrept. Scriptura spune: să nu datorați nimănui nimic.",
      "Dacă ai fie și un singur ban câștigat pe nedrept, banul acela va fi un blestem pentru tine și pentru copiii tăi. Nu vei fi gata pentru venirea Domnului dacă n-ai așezat lucrurile aici, pe pământ.",
    ],
    wrongA: "Ce am luat pe nedrept pot da lui Dumnezeu, ca să se acopere.",
    right: "Întâi dai înapoi omului sau statului ce este al lui; abia apoi dai lui Dumnezeu.",
    wrongB: "Dacă datoria este prea mare, nu are rost să încep.",
    explanation:
      "Dumnezeu nu primește banii Cezarului. El vede inima gata să îndrepte, chiar dacă plata ține cincisprezece ani.",
    step: "Scrie azi o listă cu tot ce datorezi cuiva și începe cu cea dintâi plată, oricât de mică.",
    prayer: "Doamne, arată-mi tot ce țin pe nedrept și dă-mi curajul să dau înapoi.",
    journal: "Ce nu ai dat înapoi și ai socotit că s-a uitat?",
    memory: "Dați Cezarului ce este al Cezarului, și lui Dumnezeu ce este al lui Dumnezeu.",
  }),
  make({
    id: "bani_l6",
    order: 6,
    title: "A da totul lui Dumnezeu",
    refs: ["Luca 16:11", "Ioan 17:10", "1 Corinteni 10:26", "Deuteronom 8:18"],
    ref: "Ioan 17:10",
    hook: "În Vechiul Testament era zece la sută, fiindcă erau slujitori. Noi nu suntem slujitori, ci mireasă. Soții au cont comun.",
    word: "Tot ce este al Meu este al Tău, și ce este al Tău este al Meu.",
    truth: [
      "Să nu datorați nimănui nimic. Feriți-vă de împrumuturi cât se poate. Fiți mulțumiți cu ce vă dă Dumnezeu și trăiți în venitul acela. Reclamele spun: cumpără acum, plătește mai târziu. Iată altă deviză: strânge acum și cumpără mai târziu.",
      "Când iei un împrumut pentru o casă sau pentru o mașină, ai ceva de arătat pentru banii aceia; dacă nu poți plăti, ți se ia lucrul. Dar când te împrumuți pentru ceva care se duce - de pildă o nuntă - intri în robie.",
      "Robia credincioșilor față de Mamona se vede cel mai limpede la nunți: lăcomia și căutarea cinstei se arată fără rușine. Gândiți-vă la obiceiul zestrei. Cine cere zestre înainte de a ști dacă aceasta este fata pe care i-o dă Dumnezeu face de rușine Numele lui Hristos.",
      "Nu este niciun rău într-o nuntă frumoasă, dacă ai din ce. Isus Însuși a făcut vin la o nuntă. Dar să te împrumuți ca să faci o nuntă mare și să rămâi dator ani de zile este un început fără minte. Te temi de ce vor spune oamenii? Întreabă-te ce va spune Dumnezeu.",
      "După dreptate vine credincioșia: dă lui Dumnezeu ce este al lui Dumnezeu. Cât înseamnă asta? În Vechiul Testament, zece la sută. Isus a spus: dacă nu te lepezi de tot ce ai, nu poți fi ucenicul Meu. Tot înseamnă o sută la sută.",
      "Ce ai zice de o soție care spune soțului: îți dau zece la sută din venitul meu, restul îl dau altcuiva? Este aceasta o legătură de tovărășie?",
      "În Vechiul Testament oamenii nu erau logodiți cu Dumnezeu cum suntem noi cu Hristos. Erau slujitori, iar un slujitor poate da zece la sută. Stăpânul și sluga au conturi deosebite; soțul și soția au cont comun.",
      "Isus i-a spus Tatălui: tot ce este al Meu este al Tău. Așa spunem și noi: Doamne, tot ce am este al Tău. Și El ce răspunde? Tot ce este al Meu este și al vostru.",
      "Al Domnului este pământul cu tot ce este pe el. Odată ce vezi lucrul acesta, nu-ți mai închipui că-I faci lui Dumnezeu o mare favoare când Îi dai; Îi dai ce este al Lui.",
      "Domnul este Cel ce-ți dă putere să câștigi bogății. Puteai fi paralizat, puteai fi bolnav, puteai fi slab la minte și n-ai fi câștigat nimic.",
      "A da o sută la sută nu înseamnă să dai tot pentru lucrare și să trăiești pe stradă. Dumnezeu vrea să ai casă cuviincioasă, hrană, îmbrăcăminte și școală pentru copii. Înseamnă să recunoști că ești un ispravnic care umblă cu banii Altuia și să-L întrebi: Doamne, cât să cheltuiesc pentru mine?",
      "Dacă n-ați fost credincioși în bogățiile nedrepte, cine vă va încredința adevăratele bogății? Când suntem credincioși, Dumnezeu ne dă în schimb bogățiile cerului: descoperire în Cuvântul Lui și asemănare cu Hristos.",
    ],
    wrongA: "Zeciuiala de zece la sută împlinește ce cere Dumnezeu.",
    right: "Totul este al Lui; noi suntem ispravnici și Îl întrebăm cât să cheltuim pentru noi.",
    wrongB: "A da totul înseamnă să rămâi fără casă și fără hrană.",
    explanation:
      "Mulți sunt săraci duhovnicește tocmai fiindcă nu sunt nici drepți, nici credincioși în bani.",
    step: "Fă azi socoteala unei cheltuieli și întreabă-L pe Dumnezeu dacă este de trebuință.",
    prayer: "Doamne, tot ce am este al Tău. Învață-mă să nu risipesc și să dau socoteală cu bucurie.",
    journal: "Ce cheltuială ai face altfel dacă ai ști că umbli cu banii lui Dumnezeu?",
    memory: "Tot ce este al Meu este al Tău, și ce este al Tău este al Meu.",
  }),
]
