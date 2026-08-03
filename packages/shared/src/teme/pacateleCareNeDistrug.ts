import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 13 din docs/41-module-teme-poonen.md: "Pacatele care ne distrug".
 * Temele 59, 60, 61, 62, 63, 65, 67.
 *
 * Sursa: Zac Poonen, "Basic Christian Teachings", capitolele 59-63, 65, 67 (cfcindia.com).
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

const COURSE_ID = "teme_c13_pacate"

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
        prompt: "Ce vezi in tine?",
        options: [
          { id: `${p}c1`, label: "Nu credeam ca este pacat." },
          { id: `${p}c2`, label: "Stiu ca este, dar il tin ascuns." },
          { id: `${p}c3`, label: "Vreau sa fiu izbavit de tot." },
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
        "Numele Isus inseamna Mantuitor: El a venit sa mantuiasca pe poporul Lui de pacatele lor.",
        "Ferice de cei flamanzi si insetati dupa neprihanire, caci ei vor fi saturati.",
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

export const PACATELE_CARE_NE_DISTRUG_LESSONS: Lesson[] = [
  make({
    id: "pacat_l1",
    order: 1,
    title: "Fatarnicia",
    refs: ["Matei 1:21", "Matei 23:13", "Marcu 7:6", "Matei 25:1-13", "Faptele Apostolilor 5"],
    ref: "Marcu 7:6",
    hook: "Isus n-a vorbit niciodata asa unei curve sau unui ucigas. Dar oamenilor religiosi ai vremii Lui le-a spus: vai de voi, fatarnicilor.",
    word: "Norodul acesta Ma cinsteste cu buzele, dar inima lui este departe de Mine.",
    truth: [
      "Vei chema Numele Lui Isus, pentru ca El va mantui pe poporul Lui de pacatele sale. Daca vrei sa stii ce inseamna a fi mantuit de pacat, trebuie sa stii ce este pacatul.",
      "Daca socotim ca pacat numai betia, jocurile de noroc si desfranarea, atunci multi oameni nici n-ar avea nevoie de Isus. Dar Isus a vorbit despre alte pacate, care nici nu sunt scrise in cele Zece Porunci.",
      "Pacatul nu este mai intai pe dinafara. Un pom de mango ramane pom de mango si daca nu face roade. Pacatul este in inima; din inima ies gandurile rele, uciderile si preacurviile.",
      "Gandurile lui Dumnezeu despre pacat nu sunt gandurile noastre. Iar cel dintai in randul acestora este fatarnicia.",
      "In Vechiul Testament aproape ca nu gasesti osandirea fatarniciei. Prooroci vorbeau impotriva preacurviei, a idolilor, a lacomiei. Dar cand a venit Isus, El a vorbit mai mult decat orice impotriva fatarniciei.",
      "Pe femeia prinsa in preacurvie n-a vrut s-o ucida cu pietre; i-a scapat viata. Pe talharul de langa El pe cruce l-a iertat. Dar pe carturari si pe farisei i-a osandit pe fata: vai de voi, fatarnicilor - de sapte ori in Matei 23 - si i-a numit pui de naparci.",
      "De ce? Fiindca ziceau lucruri frumoase cu buzele, in timp ce inima lor era departe de El. Ce aveau mai mult decat ei curvele si ucigasii? Nimic pe dinafara - dar erau cinstiti. Ucigasul nu se prefacea ca este sfant.",
      "A fi fatarnic inseamna a fi mincinos: sa dai altora impresia ca esti duhovnicesc cand nu esti.",
      "Ganditi-va la cele zece fecioare. Pe dinafara erau la fel: aceleasi haine albe, aceleasi candele aprinse. Deosebirea era inauntru: cinci aveau untdelemn de rezerva. Viata din afara nu ne pregateste pentru venirea Domnului; trebuie sa fie si o viata ascunsa cu Dumnezeu.",
      "Care a fost cel dintai pacat judecat in biserica de la inceput? Nu uciderea, nici preacurvia. Anania si Safira n-au inselat pe nimeni si n-au facut rau nimanui; s-au prefacut doar ca sunt cu totul daruiti Domnului. Si au murit.",
    ],
    wrongA: "Cele mai grele pacate sunt uciderea si preacurvia.",
    right: "Isus a asezat fatarnicia deasupra tuturor: prefacerea ca esti sfant cand nu esti.",
    wrongB: "Daca viata mea de afara este in randuiala, sunt gata pentru venirea Lui.",
    explanation:
      "Cinci fecioare au ramas afara tocmai fiindca nu aveau viata ascunsa - vasul cu untdelemn.",
    step: "Spune azi cuiva un lucru adevarat despre tine, in loc de impresia pe care o lasi de obicei.",
    prayer: "Doamne, nu mai vreau sa joc teatru. Fa-ma acelasi si acasa, si in adunare.",
    journal: "Unde lasi impresia ca esti mai duhovnicesc decat esti?",
    memory: "Norodul acesta Ma cinsteste cu buzele, dar inima lui este departe de Mine.",
  }),
  make({
    id: "pacat_l2",
    order: 2,
    title: "Mandria",
    refs: ["Luca 18:9-14", "1 Petru 5:5", "1 Corinteni 4:7", "Filipeni 2:8"],
    ref: "1 Petru 5:5",
    hook: "Mandria l-a facut pe diavol diavol. Pana atunci era un inger desavarsit. N-a trebuit nici o secunda.",
    word: "Dumnezeu sta impotriva celor mandri, dar celor smeriti le da har.",
    truth: [
      "Este pacatul mai grav decat boala? Daca Isus ti-ar spune: te scap ori de toate pacatele, ori de toate bolile - ce ai alege? Cei mai multi ar alege sanatatea, fiindca n-au inteles cat de grav este pacatul.",
      "Pustiirea pe care o face pacatul in suflet nu se vede. Este ca la fumator: plamanii i se strica si el nu vede. Daca ar vedea, s-ar lasa.",
      "Isus a spus pilda celor doi oameni care s-au suit la Templu. Fariseul a spus: Dumnezeule, Iti multumesc ca nu sunt ca ceilalti oameni. Vamesul a spus: Dumnezeule, ai mila de mine, pacatosul. Isus a spus ca vamesul s-a pogorat acasa socotit neprihanit. Care a fost pacatul fariseului? Mandria.",
      "Dumnezeu sta impotriva celor mandri. Oriunde gaseste mandrie, El lupta impotriva ei, fiindca este impotriva firii Lui.",
      "Noua nu ni se face sila de mandrie, fiindca este parte din firea noastra. Suntem ca porcul care se tavaleste in mocirla si i se pare bine. Dar Isus S-a smerit, S-a coborat din cer si S-a facut rob, si a aratat astfel cum este firea lui Dumnezeu.",
      "Cand esti mandru de ceva - de frumusetea ta, de mintea ta, de casa ta, de ce ai izbutit, de locul tau in societate, de neamul din care te tragi - este pacat. Nu este niciun rau in a fi frumos sau destept; raul este sa fii mandru de asta.",
      "Multi vor sa fie mantuiti de iad. Dar Biblia aproape ca nu vorbeste despre mantuirea de iad, ci despre mantuirea de pacat. Daca esti mantuit de pacat, esti mantuit de iad de la sine.",
      "Ce lucru ai pe care sa nu-l fi primit? Sanatatea, chipul, mintea, casa, slujba, locul tau - n-ai ales niciunul. Vei zice: am agonisit multe. Da, fiindca Dumnezeu ti-a dat sanatate. Daca erai paralizat sau orb, n-ai fi izbutit nimic.",
      "Si cunostinta Bibliei poate fi pricina de mandrie. Un predicator care se intoarce acasa si se felicita ca este cautat pretutindeni este cel mai mare pacatos - nu pentru predica, ci pentru mandrie.",
      "Ori de cate ori privim de sus pe altii, suntem mandri. Ganditi-va la fiul cel mare din pilda: se uita de sus la fratele lui. Poti fi mandru chiar si de sfintenia ta sau de biserica de care apartii.",
    ],
    wrongA: "Mandria nu este pacat, fiindca nu este in cele Zece Porunci.",
    right: "Mandria este firea Satanei; Dumnezeu ii sta impotriva oriunde o gaseste.",
    wrongB: "Am ceva cu care ma pot lauda pe drept.",
    explanation:
      "Ce lucru ai pe care sa nu-l fi primit? Toate sunt daruri.",
    step: "Recunoaste azi, inaintea cuiva, un lucru la care esti mai slab decat el.",
    prayer: "Doamne, arata-mi unde este mandrie in mine si mantuieste-ma de ea.",
    journal: "Cu ce te-ai laudat in gand saptamana aceasta?",
    memory: "Dumnezeu sta impotriva celor mandri.",
  }),
  make({
    id: "pacat_l3",
    order: 3,
    title: "Egoismul",
    refs: ["Luca 10:30-37", "Luca 16:19-31", "Faptele Apostolilor 20:35", "Iacov 2:15-17"],
    ref: "Faptele Apostolilor 20:35",
    hook: "Preotul si levitul se grabeau spre slujba de la Templu. Au trecut pe partea cealalta a drumului si l-au lasat acolo.",
    word: "Este mai ferice sa dai decat sa primesti.",
    truth: [
      "Oamenii religiosi pot fi uneori foarte egoisti. Poti fi destul de religios cat sa fii preot sau episcop si sa fii cu totul egoist.",
      "Ne nastem toti egoisti. Copiii nu stiu de la sine sa imparta jucariile; se bat pentru cea mai mare bucata de prajitura. Cand crestem, nu ne mai batem asa de fatis, dar tot o vrem; egoismul s-a facut doar mai ascuns si mai iscusit.",
      "Daca Isus te-a mantuit numai de jocuri de noroc si de betie, ce fel de mantuire este aceea? Iti pot arata zece oameni din lume care nu fac nici ei asta, fara sa-L aiba pe Hristos.",
      "Egoismul poate fi si in privinta mantuirii: eu sunt mantuit, familia mea este mantuita, ceilalti nu ma privesc. Nu vorbesc de oameni de la zece mii de kilometri, ci de cei cu care lucrezi, de vecinii tai, de rudele tale.",
      "Daca spun ca sunt partas firii lui Dumnezeu si sunt tot egoist, ma amagesc singur, fiindca firea lui Dumnezeu este cu totul lipsita de egoism. Isus n-a cautat niciodata ce era al Lui; a venit in intregime pentru altii.",
      "Cel care se gandeste mereu la ce primeste este un om egoist. Cel care se gandeste sa dea este cel caruia ii pasa de altii. Ce da? Ce are el insusi - fie lucruri materiale, fie duhovnicesti.",
      "Bogatul din pilda avea la poarta pe Lazar, care ii era frate dupa Avraam. Trecea pe langa el si nu l-a ajutat niciodata. A murit si s-a dus in iad. De ce? Fiindca n-a avut credinta.",
      "De unde stim ca n-a avut credinta? Iacov spune: daca un frate este gol si lipsit de hrana zilnica, iar voi ii ziceti: duceti-va in pace, si nu-i dati cele trebuincioase trupului, la ce foloseste? O astfel de credinta este moarta.",
      "Tot ce avem ne este dat de Dumnezeu, ca sa se vada daca impartim cu altii sau traim numai pentru noi. Si tot asa este si duhovniceste: ce mi-a dat Dumnezeu ma face dator fata de cei din jurul meu.",
      "Cel darnic va fi saturat, si cine uda pe altii va fi udat si el.",
    ],
    wrongA: "Egoismul este firesc si nu este pacat.",
    right: "Egoismul este pacat; firea lui Dumnezeu este cu totul lipsita de egoism.",
    wrongB: "Este mai ferice sa primesti decat sa dai.",
    explanation:
      "Bogatul n-a mers in iad pentru bogatie, ci pentru ca nu avea credinta - iar dovada era ca nu-i pasa de nimeni.",
    step: "Da azi cuiva, fara sa afle nimeni, ceva de care are nevoie.",
    prayer: "Doamne, scoate din mine viata traita numai pentru mine.",
    journal: "Pe cine ai vazut in lipsa si ai trecut pe partea cealalta?",
    memory: "Este mai ferice sa dai decat sa primesti.",
  }),
  make({
    id: "pacat_l4",
    order: 4,
    title: "Ura",
    refs: ["1 Ioan 3:15", "Matei 15:18-19", "Matei 18:28", "Matei 5:6"],
    ref: "1 Ioan 3:15",
    hook: "Iata scanarea inimii tale: te bucuri putin cand aude ca i s-a intamplat ceva rau? Te intristezi putin cand afli ca i-a mers bine?",
    word: "Oricine uraste pe fratele sau este un ucigas.",
    truth: [
      "Multi nu socotesc ura ca pacat. Noul Testament spune: oricine uraste pe fratele sau este un ucigas. Atat de grav este. Poate n-ai prilejul sa ucizi; poate te temi ca vei fi prins. Dar nu te-ar deranja daca l-ar lovi o nenorocire.",
      "Zici: eu nu urasc pe nimeni. Atunci intreaba-te: cineva ti-a facut rau, te-a inselat, ti-a stricat numele, te-a impins la o parte la slujba. Spui ca l-ai iertat. Dar cand auzi ca i s-a intamplat o nenorocire, simti o bucurie mica? Aceea arata ca il urasti.",
      "N-ai fi niciodata bucuros de o nenorocire cazuta peste copilul tau. De ce te bucuri cand cade peste omul pe care spui ca l-ai iertat?",
      "Sau invers: auzi ca i-a mers bine, ca a fost inaltat in slujba, si te simti putin nemultumit. Si asta arata ca il urasti. N-ai fi nemultumit daca fiul tau ar iesi cel dintai in clasa; dar daca iese fiul altuia?",
      "Aceasta este ca o scanare a inimii. La spital, scanarea arata ce nu se vede: doctorul spune ca ai o umflatura acolo, chiar daca tu te simti bine. Aici scanarea spune ca ai o umflatura numita amaraciune. Scoate-o.",
      "Ura are multi copii: amaraciunea, gelozia, mania, duhul care nu iarta. Toti se nasc din mama aceasta.",
      "Dumnezeu este dragoste. Care este atunci firea Satanei? Ura. Cand ai ura in inima, esti in partasie cu Satana, fie ca stii, fie ca nu.",
      "Iti poti stapani mania si iti poti tine amaraciunea inauntru - dar asta este ca o incuietoare: gunoiul ramane. Daca boala este inauntru, te ucide chiar daca nu se vede pe dinafara. Si cine stie daca este acolo? Tu insuti.",
      "Isus a vorbit despre omul care l-a apucat de gat pe tovarasul sau pentru o datorie mica, dupa ce lui i se iertase una uriasa. Nu este vorba sa tai roada, ci sa faci pomul bun.",
      "Din inima ies gandurile rele si uciderile - acestea spurca pe om. Radacina amaraciunii, radacina geloziei, radacina duhului care nu iarta - acestea trebuie curatate.",
      "Ferice de cei flamanzi si insetati dupa neprihanire, caci ei vor fi saturati. Nu ajunge o rugaciune slaba. Daca ai afla ca ai lepra, ai alerga din spital in spital. Cand vei dori tot asa sa fii izbavit de ura, Isus te va izbavi.",
    ],
    wrongA: "Cat timp nu arat nimic pe dinafara, nu este pacat.",
    right: "Ura este ucidere in inima; ea se vede dupa cum te bucuri sau te intristezi de ce li se intampla altora.",
    wrongB: "Este destul sa-mi stapanesc mania.",
    explanation:
      "Nu taia roada; fa pomul bun. Radacina trebuie curatata.",
    step: "Cere-I azi lui Dumnezeu binele - anume, pe nume - pentru omul care ti-a facut rau.",
    prayer: "Doamne, curata-mi inima de ura si de toti copiii ei.",
    journal: "A cui izbanda te-a intristat?",
    memory: "Oricine uraste pe fratele sau este un ucigas.",
  }),
  make({
    id: "pacat_l5",
    order: 5,
    title: "Necredinta",
    refs: ["Marcu 4:40", "Evrei 3:12", "Romani 8:28", "Matei 10:29-31"],
    ref: "Evrei 3:12",
    hook: "Cand Isus i-a mustrat pe ucenici, cea mai aspra mustrare a fost pentru un singur pacat: necredinta.",
    word: "Luati seama dar, fratilor, ca niciunul dintre voi sa n-aiba o inima rea si necredincioasa.",
    truth: [
      "Cand furtuna umplea corabia, ucenicii L-au trezit: Invatatorule, nu-Ti pasa ca pierim? El a certat vantul si le-a spus: cum de nu aveti credinta?",
      "Necredinta nu este socotita pacat de nimeni in lume. Trist este ca nici credinciosii n-o socotesc pacat, ci o slabiciune: n-am destula credinta, frate. Dar nu este slabiciune; Isus a mustrat-o ca pacat.",
      "Este numita inima rea si necredincioasa. Intelegem ca o inima preacurvara este rea, sau una ucigasa. Dar cine spune ca o inima necredincioasa este o inima rea? Si totusi asa scrie - si te poate face sa te departezi de Dumnezeul cel viu.",
      "De sapte ori i-a mustrat Isus pe ucenici pentru necredinta, chiar si dupa inviere. Nu ca ar fi biruit celelalte pacate - se certau inca cine este cel mai mare. Dar El i-a mustrat pentru necredinta.",
      "Necredinta este pacat fiindca este o jignire adusa lui Dumnezeu. Daca tatal tau ti-ar scrie ca ti-a pus bani in cont pentru taxe, iar tu ai spune: nu sunt sigur ca a facut-o, poate ma amageste - nu l-ai jigni?",
      "Crezi ca, atunci cand spune nicidecum n-am sa te las, nicidecum nu te voi parasi, chiar asa este? Crezi ca toate lucrurile lucreaza impreuna spre binele celor ce iubesc pe Dumnezeu - inclusiv raul pe care ti-l fac oamenii? Daca ai crede, nu l-ai mai uri pe acel om.",
      "De ce se tem atatia credinciosi de diavolul? Fiindca nu cred ca a fost biruit la cruce. Scriptura spune ca prin moarte a nimicit puterea diavolului. Daca ai crede, nu te-ai mai teme nici de el, nici de vrajitorie.",
      "Credinta si frica sunt potrivnice. Nu pot locui in aceeasi inima. Cand intra credinta, iese frica - ca lumina care alunga intunericul.",
      "Iov a spus: El stie ce cale am urmat. Adica: Dumnezeu cunoaste orice amanunt din ce mi se intampla. Crezi asta?",
      "Nici o vrabie nu cade pe pamant fara stirea Tatalui vostru, iar voua pana si perii din cap va sunt numarati. Nimeni nu-si poate numara perii din cap - dar Tatal stie numarul lor.",
      "Cand nu te increzi in El, Il jignesti. Inchipuie-ti ca intri noaptea in camera copilului tau de patru ani si il gasesti treaz, speriat, spunand: mi-a fost frica sa nu vii sa-mi faci rau. Cum te-ai simti? Asa Se simte Dumnezeu cand crezi ca El iti va face rau.",
      "Sa tinem minte aceste cinci: fatarnicia, mandria, egoismul, ura si necredinta. Cere-I lui Isus sa te mantuiasca de toate cinci.",
    ],
    wrongA: "Necredinta este doar o slabiciune.",
    right: "Necredinta este pacat: este o jignire adusa lui Dumnezeu, care a vorbit.",
    wrongB: "Pot avea in acelasi timp si credinta, si frica.",
    explanation:
      "Cand intra credinta, iese frica, asa cum lumina alunga intunericul.",
    step: "Ia azi o fagaduinta din Cuvant si spune-I: Doamne, o cred, asa cum ai spus.",
    prayer: "Doamne, iarta-mi necredinta. Cred; ajuta necredintei mele.",
    journal: "Ce ai spus Cuvantului lui Dumnezeu ca nu se poate?",
    memory: "Sa n-aiba niciunul dintre voi o inima rea si necredincioasa.",
  }),
  make({
    id: "pacat_l6",
    order: 6,
    title: "Minciuna",
    refs: ["Ioan 8:44", "Matei 5:37", "Ieremia 3:13", "Geneza 3:4", "Apocalipsa 22:15"],
    ref: "Ioan 8:44",
    hook: "Cel dintai pacat pomenit in Biblie si cel din urma pacat pomenit in Biblie sunt acelasi: minciuna.",
    word: "Ori de cate ori spune o minciuna, vorbeste din ale lui, caci este mincinos si tatal minciunii.",
    truth: [
      "Isus le-a spus unora care crezusera in El: voi aveti de tata pe diavolul. Este o credinta doar cu mintea, care lasa omul copil al diavolului. Nu-i insulta; le spunea un adevar, ca sa poata fi izbaviti. Pana nu recunoastem ce suntem, Dumnezeu nu ne poate izbavi.",
      "Cum Dumnezeu este dragoste si Satana este ura, tot asa Isus este adevarul si diavolul este mincinos. Cand spui o minciuna, ii dai Satanei inima si limba ta ca sa nasca un copil numit minciuna.",
      "Isus a spus: felul vostru de vorbire sa fie: da, da; nu, nu; ce trece peste acestea vine de la cel rau. Si a spus sa nu juram deloc. Cand un om jura, ce spune de fapt? Ca de obicei minte, dar acum spune adevarul. Nu trebuie sa fie nicio deosebire intre ce spui sub juramant si ce spui fara.",
      "Ce cere Dumnezeu de la noi cand venim la El? Nu desavarsirea, nu curatia, nu bunatatea - ci cinstea. Numai recunoaste-ti nelegiuirea, spune Domnul.",
      "Ce virtute avea femeia prinsa in preacurvie? Cinstea. Iar talharul de pe cruce a spus: noi primim rasplata cuvenita. Celalalt n-a vrut sa recunoasca. N-a mers in iad fiindca era talhar, ci fiindca era necinstit.",
      "Raiul nu este facut pentru oameni desavarsiti, ci pentru oameni cinstiti.",
      "Cel dintai pacat pomenit in Biblie nu este al Evei, ci al Satanei: hotarat ca nu veti muri. Aceasta este cea dintai minciuna: poti sa nu asculti de Dumnezeu si nu vei fi pedepsit. Cu ea a inselat el tot neamul omenesc pana azi.",
      "Pentru ca nu se aduce repede la indeplinire hotararea data impotriva faptelor rele, de aceea este plina inima oamenilor de dorinta sa faca rau. Fiindca Dumnezeu nu pedepseste indata, oamenii cred ca au scapat. N-au scapat; judecata inca n-a venit.",
      "Cel din urma pacat pomenit in Biblie: afara sunt toti cei ce iubesc minciuna si traiesc in minciuna.",
      "Petru i-a spus lui Anania: pentru ce ai mintit pe Duhul Sfant? Cel dintai pacat judecat in biserica de la inceput a fost minciuna.",
      "De aceea, unul dintre cele mai insemnate lucruri pe care le avem de invatat pe copiii nostri este sa nu minta. Ei se nasc cu firea noastra si mint de mici. Trebuie sa vada la noi ca ne tinem cuvantul, sau ca le lamurim de ce n-am putut.",
      "Adevarul este o virtute pentru care trebuie sa te lupti din toata inima. Duhul Sfant este Duhul adevarului: cere-I sa te umple si sa omoare deprinderea minciunii in toata vorbirea ta.",
    ],
    wrongA: "Dumnezeu cere de la mine mai intai curatia.",
    right: "Cel dintai lucru pe care il cere Dumnezeu este cinstea.",
    wrongB: "O minciuna mica nu strica nimanui.",
    explanation:
      "Talharul iertat nu era mai bun, ci mai cinstit. Raiul este facut pentru oameni cinstiti.",
    step: "Indreapta azi o vorba pe care ai spus-o altfel decat a fost.",
    prayer: "Duhule al adevarului, umple-ma si scoate din vorbirea mea orice minciuna.",
    journal: "Unde ai infrumusetat adevarul in ultima vreme?",
    memory: "Este mincinos si tatal minciunii.",
  }),
  make({
    id: "pacat_l7",
    order: 7,
    title: "Mania",
    refs: ["Efeseni 4:26-27", "Marcu 3:5", "Geneza 4:6-7", "1 Samuel 18:7-8"],
    ref: "Efeseni 4:26",
    hook: "Este o manie care nu este pacat si o manie care este. Deosebirea sta intr-un singur lucru: pentru cine te-ai maniat.",
    word: "Maniati-va si nu pacatuiti. Sa n-apuna soarele peste mania voastra.",
    truth: [
      "Cand Isus a vazut in sinagoga lipsa de mila a fariseilor fata de omul cu mana uscata, S-a uitat la ei cu manie, mahnit de impietrirea inimii lor. Nu Si-a pierdut stapanirea de sine; daca Si-ar fi pierdut-o, n-ar fi fost mahnit. Si cand a vazut pe zarafi facand bani in Numele credintei, i-a scos afara - iarasi fara sa-Si piarda stapanirea.",
      "Omul plin de Duhul este plin de infranare. El poate fi maniat cand vede oameni fara mila fata de cei ce sufera sau oameni care fac bani in numele credintei. Mania aceasta, care priveste slava lui Dumnezeu si binele altora, nu este pacat.",
      "Dar mania care ma priveste pe mine - ca m-a inselat cineva, ca mi-a stricat planurile, ca m-a suparat - este intotdeauna pacat. Cand L-au palmuit pe Isus si I-au smuls parul din barba, El nu S-a maniat. I-a iertat.",
      "Apoi Scriptura spune: daca totusi pacatuiesti asa, vezi ca mania sa nu ramana la tine mai mult de douasprezece ceasuri. Dumnezeu stie ca multi credinciosi nu vor avea biruinta asupra maniei, fiindca nu sunt destul de hotarati - si le da o masura mai mica: sa n-apuna soarele.",
      "Pe atunci ziua tinea de la sase dimineata pana la apus, iar noaptea de la apus pana la rasarit. Deci cuvantul pentru noi este: sa nu te culci cu mania nedescurcata in inima.",
      "Cat de grijulii sunt oamenii sa se spele pe dinti inainte de culcare, ca sa nu ramana firimituri care sa le strice dintii. Cu cat mai mult ar trebui sa veghem sa nu ramana in inima amaraciune necuratata cand adormim. Sotul si sotia sa aseze lucrurile inainte de culcare.",
      "Ce sa mai spunem despre credinciosii care poarta manie si amaraciune zile, luni si ani? Trebuie sa spunem ca n-au frica de Dumnezeu si nu cinstesc Cuvantul Lui.",
      "Cand lasi mania sa ramana in inima, dai prilej diavolului. Ii dai un loc de sprijin ca sa te stapaneasca si sa aduca invalmaseala in viata ta.",
      "Cel dintai pacat pomenit dupa ce omul a iesit din Eden este mania. Cain s-a maniat foarte tare si i s-a posomorat fata. Cand un om este maniat, se vede pe fata lui; Dumnezeu ne-a facut asa incat nu se poate ascunde.",
      "Domnul i-a spus: de ce te-ai maniat? Daca faci bine, nu vei fi bine primit? Pacatul pandeste la usa si dorinta lui se tine dupa tine, dar tu sa-l stapanesti. Aici este cea dintai predica despre biruinta asupra pacatului, tinuta de Dumnezeu Insusi. Cain n-a ascultat si a ajuns ucigas.",
      "Mania lui a iesit din gelozie: Dumnezeu il binecuvanta pe Abel, cel mai tanar, si el n-a putut rabda. Esti gelos pe cineva mai tanar decat tine, pe care Domnul il binecuvanteaza?",
      "La fel Saul: cand femeile cantau ca David a batut zecile de mii, s-a maniat foarte tare. A doua zi a venit peste el un duh rau si a aruncat cu sulita ca sa-l ucida pe David. Este primejdios sa lasi mania sa staruie.",
      "Cauta-L pe Dumnezeu din toata inima ca sa fii cu totul izbavit de manie. De cate ori aluneci, striga la El: Doamne, am pacatuit, izbaveste-ma cu totul.",
    ],
    wrongA: "Orice manie este pacat.",
    right: "Mania pentru slava lui Dumnezeu si binele altora nu este pacat; mania pentru mine insumi este intotdeauna pacat.",
    wrongB: "Pot amana impacarea cateva zile.",
    explanation:
      "Masura cea mai larga ingaduita este apusul soarelui. Dincolo de el, dai prilej diavolului.",
    step: "Nu te culca azi pana nu asezi lucrul care a ramas nedescurcat.",
    prayer: "Doamne, izbaveste-ma cu totul de mania care porneste din mine insumi.",
    journal: "Cu ce manie te-ai culcat in ultima vreme?",
    memory: "Sa n-apuna soarele peste mania voastra.",
  }),
]
