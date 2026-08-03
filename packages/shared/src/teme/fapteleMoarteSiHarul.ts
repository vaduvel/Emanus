import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 5 din docs/41-module-teme-poonen.md: "Faptele moarte si harul".
 * Temele 17-21.
 *
 * Sursa: Zac Poonen, "Basic Christian Teachings", capitolele 17-21 (cfcindia.com).
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

const COURSE_ID = "teme_c5_fapte_moarte"

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
        prompt: "Cum stai cu lucrul acesta?",
        options: [
          { id: `${p}c1`, label: "Nu m-am cercetat niciodata asa." },
          { id: `${p}c2`, label: "Recunosc ceva din mine aici." },
          { id: `${p}c3`, label: "Vreau sa ma curat de faptele moarte." },
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
        "Sangele lui Hristos nu ne curata doar de pacate, ci si de faptele moarte, ca sa slujim Dumnezeului celui viu.",
        "Sub har, pacatul nu mai are stapanire peste tine.",
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

export const FAPTELE_MOARTE_SI_HARUL_LESSONS: Lesson[] = [
  make({
    id: "fmoarte_l1",
    order: 1,
    title: "Ce sunt faptele moarte",
    refs: ["Evrei 6:1", "Evrei 9:14", "2 Corinteni 9:7", "Deuteronomul 28:47"],
    ref: "Evrei 9:14",
    hook: "In Vechiul Testament sunt doar fapte bune si fapte rele. In Noul Testament mai apare ceva: faptele moarte. Si tocmai ele sunt cele mai inselatoare.",
    word: "Cu cat mai mult sangele lui Hristos va curati cugetul vostru de faptele moarte, ca sa slujiti Dumnezeului celui viu!",
    truth: [
      "Faptele firii pamantesti - curvia, cearta, gelozia, izbucnirile de manie - sunt atat de vadit pacatoase incat constiinta ne spune indata. Nu sunt primejdioase in sensul ca nu ne pot insela.",
      "Faptele moarte sunt mai inselatoare. Sunt fapte care par bune pe dinafara, dar izvorasc dintr-un motiv stricat. De aceea sunt ca niste haine murdare inaintea lui Dumnezeu.",
      "Este ca si cum un om plin de lepra ti-ar intinde un mar de cea mai buna calitate cu mana lui bolnava. Ai manca marul? Marul poate fi bun, dar este atins de boala din mana aceea. Asa este cand aducem lui Dumnezeu ceva bun, dar molipsit de un motiv gresit.",
      "Poate fi o rugaciune, poate fi un cantec la o adunare, iar tinta ta sa fie cinstea pentru tine. Ce este atunci - fapta buna sau rea? Este o fapta moarta.",
      "Se stie ca sangele lui Isus ne curateste de orice pacat. Mai putin se stie ca sangele lui Hristos trebuie sa ne curete si de faptele moarte, inainte de a putea sluji Dumnezeului celui viu.",
      "Cea dintai insusire a faptelor moarte: lucruri facute fara bucurie. Facute de sila, din nevoie sau de frica pedepsei. Ca un copil pus sa-si faca tema cu amenintarea betei, care se aseaza posac la masa. Tema este un lucru bun, dar facuta silit.",
      "Asa dau multi zeciuiala: nu cu bucurie, ci pentru ca li s-a spus ca altfel vor fi pedepsiti cu vreo boala. Crezi ca Il intereseaza pe Dumnezeu asemenea tehnici prin care oamenii sunt siliti sa dea bani? Departe de asta. Scriptura spune ca Dumnezeu iubeste pe cel ce da cu bucurie.",
      "Israelitii au ajuns robi in mai multe randuri fiindca nu I-au slujit Domnului cu bucurie si cu inima buna, pentru belsugul de bunuri pe care li-l daduse.",
      "A doua insusire: lucruri facute fara dragoste. Intr-o casa de tineri casatoriti, sotia face totul din dragoste: gateste, spala, are grija de casa. Dupa douazeci de ani, in aceeasi casa, tot gateste, tot spala, dar nu mai este din dragoste.",
      "Ce a intrebat Domnul de trei ori pe Petru, cand l-a asezat din nou? O singura intrebare: Ma iubesti? A spus: daca Ma iubiti, veti pazi poruncile Mele - nu daca va temeti de Mine. Ce se face din frica este fapta moarta. Ce se face din dragoste este fapta vie.",
    ],
    wrongA: "Faptele moarte sunt de fapt pacate pe fata.",
    right: "Sunt fapte bune pe dinafara, izvorate dintr-un motiv stricat: fara bucurie, fara dragoste.",
    wrongB: "Daca lucrul facut este bun, motivul nu conteaza.",
    explanation:
      "In Noul Testament sunt trei feluri de lucrari: bune, rele si moarte. De faptele moarte Scriptura ne cheama sa ne pocaim.",
    step: "Alege o lucrare pe care o faci pentru Dumnezeu si intreaba-te cinstit: o fac cu bucurie si din dragoste, sau de sila?",
    prayer: "Doamne, curateste-mi cugetul de faptele moarte, ca sa pot sluji Dumnezeului celui viu.",
    journal: "Ce faci de mult timp din obisnuinta, desi la inceput faceai din dragoste?",
    memory: "Sangele lui Hristos va curati cugetul vostru de faptele moarte.",
  }),
  make({
    id: "fmoarte_l2",
    order: 2,
    title: "Fara ravna, fara credinta, pentru cinste",
    refs: ["Apocalipsa 3:15-19", "Romani 12:11", "Romani 14:22", "Luca 16:15"],
    ref: "Apocalipsa 3:16",
    hook: "Lumea spune: mai bine ceva decat nimic. Domnul, se pare, nu crede asta. El spune: as vrea sa fii rece sau in clocot.",
    word: "Fiindca esti caldicel, nici rece, nici in clocot, am sa te vars din gura Mea.",
    truth: [
      "A treia insusire a faptelor moarte: lucruri facute fara ravna. Domnul i-a spus adunarii din Laodiceea: esti caldicel, nu esti aprins, esti cu jumatate de inima. As vrea sa fii ori rece, ori in clocot. Si la urma a zis: fii plin de ravna.",
      "Cand Il lauzi pe Domnul, unul spune aleluia si altul spune aleluia, si intre cei doi poate fi o lume de deosebire. La unul iese din adancul inimii; celalalt a rostit cuvantul potrivit. Nu este pacat sa spui aleluia, dar la el este fapta moarta.",
      "Stii ce este o adunare de rugaciune moarta? Nu una in care s-au cerut lucruri pacatoase. S-au cerut lucruri bune, dar fara viata.",
      "In Vechiul Testament nu exista expresia ascultarea credintei. Era doar ascultare. In Noul Testament, Pavel o repeta. Se spune ca o credinta fara fapte este moarta; putem spune si ca faptele fara credinta sunt moarte, pentru ca fara credinta este cu neputinta sa fim placuti lui Dumnezeu.",
      "La ce foloseste o adunare de rugaciune de un ceas in care nu crezi niciun lucru pe care il ceri? Un minut de rugaciune cu credinta este mai primit inaintea lui Dumnezeu decat o noapte intreaga de rugaciune care este doar un obicei.",
      "Credinta inseamna si incredintare personala. Cand faci ceva doar ca sa imiti pe altul, sau numai fiindca un om al lui Dumnezeu invata asa, fara incredintarea ta, este fapta moarta. Imitatia aduce intotdeauna moarte.",
      "Israelitii au trecut Marea Rosie prin credinta. Egiptenii i-au imitat si s-au inecat. Ce le-a adus imitatia? Moartea. Este scris pentru avertizarea noastra.",
      "Dumnezeu nu vrea sa fii ca altcineva; vrea sa fii tu insuti. Te-a facut cu firea ta, cu trecutul tau si cu cresterea ta. Fii multumitor si fa ce poti tu. Asta Ii este mult mai placut decat daca incerci sa imiti pe altul.",
      "A cincea insusire: lucrari facute pentru castig sau cinste personala. Domnul i-a spus celui din Sardes: ai numele ca traiesti. Orice facem ca sa impresionam un om este fapta moarta. O lucrare vie se face ca sa fie vazuta de Dumnezeu, in ascuns, fara ca stanga sa stie ce face dreapta.",
      "Nebucadnetar se plimba pe acoperisul palatului si spunea: iata ce imparatie mare am zidit eu. Cand privesti lucrarea ta si spui ce grozav este ce am facut, zidesti Babilon.",
    ],
    wrongA: "Cantitatea rugaciunii cantareste cel mai mult.",
    right: "Un minut de rugaciune cu credinta pretuieste mai mult decat o noapte fara credinta.",
    wrongB: "E bine sa imit lucrarea unui om al lui Dumnezeu.",
    explanation:
      "Ce este inalt in ochii oamenilor este uraciune inaintea lui Dumnezeu. Nu forma lucrarii hotaraste, ci ravna, credinta si motivul din spatele ei.",
    step: "Fa astazi o singura fapta buna despre care sa nu afle nimeni.",
    prayer: "Doamne, aprinde-ma. Nu vreau sa fiu caldicel si nu vreau sa lucrez ca sa fiu vazut.",
    journal: "Ce faci in viata ta duhovniceasca doar din imitatie, fara incredintare proprie?",
    memory: "Fiindca esti caldicel, am sa te vars din gura Mea.",
  }),
  make({
    id: "fmoarte_l3",
    order: 3,
    title: "Din constiinta incarcata, din frica, pentru rasplata",
    refs: ["Romani 2:15", "Ioan 14:15", "Matei 19:27", "Matei 20:1-16"],
    ref: "Ioan 14:15",
    hook: "Sunt lucruri bune pe care le facem doar ca sa ne linistim constiinta, ca sa scapam de frica pedepsei sau ca sa primim o rasplata. Toate acestea sunt fapte moarte.",
    word: "Daca Ma iubiti, veti pazi poruncile Mele.",
    truth: [
      "A sasea insusire: lucruri facute doar ca sa-ti linistesti constiinta. Dimineata iti spune constiinta ca n-ai citit Biblia. Deschizi doua minute, citesti un psalm sau cateva proverbe si inchizi. Constiinta s-a linistit si poti pleca la lucru impacat, poate si de teama sa nu pati ceva pe drum. Aceasta nu este viata duhovniceasca, este superstitie.",
      "Este ca si cand pun oamenii Biblia sub perna ca sa aiba vise curate. Tot superstitie.",
      "Este insa o deosebire intre acestea si disciplina. Nu citim Biblia doar cand avem chef. Nu mergi la lucru doar cand ai chef si nu-ti trimiti copiii la scoala doar cand ai chef. Disciplina este un lucru foarte bun in viata crestina. Dar una este disciplina si alta este sa faci ceva doar ca sa-ti amutesti constiinta.",
      "Un predicator te poate infierbanta: milioane pier fara Hristos, tu de ce stai? Iti lasi slujba si pleci fara chemare de la Dumnezeu, iar dupa o vreme esti doar amaragit. Ai lucrat din emotia unei clipe sau ca sa scapi de o constiinta vinovata.",
      "A saptea insusire: lucruri facute de frica judecatii lui Dumnezeu. Asa i-a putut face Dumnezeu pe cei mai multi israeliti sa asculte: daca nu asculti, vei fi blestemat in cetate si la camp. Asa ii facem si noi pe copii sa asculte.",
      "A asculta de frica pedepsei este mai bine decat neascultarea. Dar Isus a spus: daca Ma iubiti, veti pazi poruncile Mele - nu: daca nu vreti sa fiti pedepsiti, pazi-le.",
      "Isus nu S-a ferit de minciuna fiindca s-ar fi temut ca este prins, ci fiindca minciuna Il necinsteste pe Tatal si este impotriva firii lui Dumnezeu.",
      "A opta insusire: lucruri facute ca sa capeti o rasplata. Asa lucram cu copiii: daca termini tema, iti dau o ciocolata.",
      "Petru L-a intrebat pe Isus: noi am lasat totul si Te-am urmat, ce va fi cu noi? Iar Isus i-a raspuns cu pilda lucratorilor viei. Cei dintai s-au tocmit dinainte pentru plata. Cei din urma au venit fara nicio invoiala. Si tocmai ei au fost platiti intai, primind pentru un ceas cat au primit ceilalti pentru douasprezece.",
      "Acolo raspundea Domnul la intrebarea lui Petru: daca lucrezi gandindu-te la ce vei primi, vei fi cel din urma. Daca lucrezi cu bucurie, fara sa te gandesti la rasplata, vei fi cel dintai.",
    ],
    wrongA: "Frica de pedeapsa este un motiv bun ca sa ascult.",
    right: "Dumnezeu cauta ascultarea care izvoraste din dragoste si multumire, nu din frica sau din pofta de rasplata.",
    wrongB: "Disciplina zilnica este ea insasi o fapta moarta.",
    explanation:
      "Faptele moarte sunt mai bune decat cele rele, dar Dumnezeu ne cheama sa ne pocaim si de ele. Calitatea inseamna pentru El mult mai mult decat cantitatea.",
    step: "Inainte de urmatoarea ta faptura de ascultare, opreste-te si intreaba: o fac din frica, pentru rasplata sau din dragoste?",
    prayer: "Doamne, nu vreau sa Iti slujesc de frica si nici pentru plata. Vreau sa Te iubesc si de acolo sa vina ascultarea.",
    journal: "Ce faci in viata ta crestina doar ca sa nu te mustre constiinta?",
    memory: "Daca Ma iubiti, veti pazi poruncile Mele.",
  }),
  make({
    id: "fmoarte_l4",
    order: 4,
    title: "Fara crucea zilnica si din gandirea mea",
    refs: ["2 Corinteni 4:10", "Matei 5:14", "Ioan 5:30", "Luca 10:38-42"],
    ref: "2 Corinteni 4:10",
    hook: "Slujirea ta este apa turnata dintr-un pahar sau este revarsarea unui pahar care se umple mereu? Este un rau care curge sau o pompa de mana?",
    word: "Purtam intotdeauna cu noi, in trupul nostru, omorarea Domnului Isus, pentru ca si viata lui Isus sa se arate in trupul nostru.",
    truth: [
      "A noua insusire a faptelor moarte: lucruri facute fara purtarea crucii in fiecare zi.",
      "Daca te intreb cine este lumina lumii, cei mai multi ar raspunde: Isus. Dar Isus a spus: cat sunt in lume, sunt Lumina lumii. Iar in rugaciunea Lui a spus Tatalui: Eu nu mai sunt in lume. Ucenicilor le-a spus: voi sunteti lumina lumii.",
      "Oamenii din lume nu pot vedea viata lui Isus in Isus, pentru ca El este in cer. Unde o pot vedea? In tine si in mine. Daca nu o vad la noi, nu o vor vedea nicaieri: in felul cum reactionam, cum umblam cu banii, cum vorbim cu oamenii.",
      "Este mare deosebire intre a turna apa dintr-un pahar si un pahar care este umplut pana da pe dinafara. Slujirea ta pentru Domnul este ceva ce torni sau este revarsarea unei vieti pline de viata lui Isus?",
      "La multi crestini slujirea seamana cu o pompa de mana: pompezi si iar pompezi si iese putina apa. La Isus nu era asa; era o revarsare.",
      "Daca doar ne stapanim limba sa nu vorbim cu manie si fata sa nu se posomorasca, dar inauntru clocotim, atunci nu facem decat stapanire de sine, pe care o poate face si un pagan. Nu ai nevoie de Duhul Sfant pentru asta. Duhul a venit sa aduca o moarte inauntru, ca din launtrul nostru sa curga bunatatea lui Isus, fara clocot inauntru.",
      "A zecea insusire: lucruri care izvorasc din gandirea noastra omeneasca. Cel mai bun exemplu este slujirea Martei in Betania. Isus si ucenicii erau flamanzi, si ea a socotit ca este un lucru bun sa faca de mancare.",
      "Dar cel mai important lucru la un slujitor este sa faca exact ce ii spune stapanul sau, nu ce i se pare lui potrivit.",
      "Despre Isus este scris ca nu facea nimic de la Sine. Astepta sa auda ce voia Tatal, nu ce Ii venea Lui sa faca.",
      "Avraam a vrut sa-L ajute pe Dumnezeu si a iesit un Ismael, care a adus multa incurcatura. Ismaelii sunt faptele moarte pe care le fac multi crestini azi, dorind sincer sa-L ajute pe Dumnezeu, dar fara sa caute voia Lui.",
      "Ce sa facem atunci - sa stam si sa nu facem nimic? Dimpotriva. Sa-L cautam pe Dumnezeu. Daca Il iubesti, nu este nimic daca gresesti pe drum.",
    ],
    wrongA: "Orice lucru bun pe care il vad de facut este voia lui Dumnezeu.",
    right: "Slujitorul face ce ii spune Stapanul, nu ce i se pare lui bun.",
    wrongB: "Stapanirea de sine este dovada vietii lui Hristos in mine.",
    explanation:
      "Cuvantul lui Dumnezeu desparte sufletul de duh. Lucrarile sufletesti, izvorate din ratiunea mea, sunt fapte moarte, oricat de bune ar parea.",
    step: "Inainte sa incepi urmatorul lucru bun, opreste-te si intreaba-L pe Dumnezeu daca El ti l-a dat de facut.",
    prayer: "Doamne, nu vreau sa nasc Ismaeli. Invata-ma sa astept, ca Isus, sa aud ce vrei Tu.",
    journal: "Ce ai inceput ca sa-L ajuti pe Dumnezeu, fara sa-L intrebi?",
    memory: "Purtam in trupul nostru omorarea Domnului Isus, ca si viata Lui sa se arate in noi.",
  }),
  make({
    id: "fmoarte_l5",
    order: 5,
    title: "Legea si harul",
    refs: ["Romani 6:14", "Evrei 4:16", "Matei 11:11", "Evrei 10:19-20"],
    ref: "Romani 6:14",
    hook: "Pacatul nu va mai stapani peste voi, pentru ca nu sunteti sub Lege, ci sub har. Aici este, intr-o singura propozitie, toata deosebirea dintre cele doua legaminte.",
    word: "Caci pacatul nu va mai stapani asupra voastra, pentru ca nu sunteti sub Lege, ci sub har.",
    truth: [
      "Cuvantul Lege inchide in el vechea intelegere a lui Dumnezeu cu Israel, cu toate randuielile ei. Cuvantul har inchide in el noua intelegere prin Domnul Isus, cu tot ce cuprinde ea.",
      "Dovada este aceasta: cand nu esti sub Lege, ci sub har, pacatul nu te poate stapani. Deci felul in care aflam sub ce traim nu este cercetarea regulilor pe care le tinem, ci o incercare mult mai adanca: te stapaneste pacatul, sau il stapanesti tu?",
      "Cine este mai mare, Moise sau Domnul Isus? Raspunsul este limpede. Atunci si legamantul mijlocit prin Moise este cu atat mai prejos decat cel mijlocit prin Isus, cu cat Moise este mai prejos decat Isus.",
      "Urmarea este ca, daca Legea putea aduce pe oameni la o anumita masura de viata, harul trebuie sa-i aduca la una mai inalta. Este deosebirea dintre o bicicleta si un avion. Amandoua te duc dintr-un loc in altul, dar intre ele este o lume.",
      "In cortul din Vechiul Testament era o perdea groasa intre Locul Sfant si Locul Preasfant. Nimeni nu putea trece dincolo. Marele preot intra o data pe an, si aceea doar ca semn.",
      "Cand a murit Isus pe Golgota, perdeaua s-a rupt in doua, de sus pana jos, aratand ca acum calea spre Dumnezeu este deschisa. Daca fara partasie personala cu Dumnezeu oamenii ajungeau la o anumita masura, cu atat mai inalta ar trebui sa fie a noastra, acum, dinauntrul perdelei rupte.",
      "Ti-l poti inchipui pe Ilie sau pe Ioan Botezatorul alergand dupa femei sau dupa bani? Nu. Si totusi ei nu aveau harul si intrarea slobodă pe care o avem noi.",
      "Isus a spus ca Ioan Botezatorul era cel mai mare om nascut pana atunci. Si a adaugat: dar cel mai mic din Imparatia cerurilor este mai mare decat el. Adica cel mai inalt loc la care putea duce Legea este mai jos decat locul in care harul poate duce pe cel mai slab dintre copiii lui Dumnezeu.",
      "Voia lui Dumnezeu nu este ca doar cate un credincios ici si colo sa se ridice mai sus decat Ioan Botezatorul, ci fiecare copil al Sau venit sub har. Dar daca vor si trai asa este alta chestiune. Putinta este data.",
    ],
    wrongA: "Sub har am mai putine asteptari decat sub Lege.",
    right: "Sub har masura este mai inalta, si dovada este ca pacatul nu mai are stapanire.",
    wrongB: "Aflu sub ce traiesc dupa cate reguli tin.",
    explanation:
      "Mila priveste trecutul. Harul este puterea data pentru zilele care vin. Perdeaua s-a rupt; intrarea este deschisa.",
    step: "Numeste un pacat care te-a stapanit si spune-I lui Dumnezeu ca de azi vrei sa traiesti sub har, nu sub Lege.",
    prayer: "Doamne, multumesc ca perdeaua s-a rupt. Vreau sa ma ridic la ce mi-ai dat sub har, nu sa raman jos.",
    journal: "Traiesti ca un om biruit sau ca un om biruitor? Unde se vede?",
    memory: "Pacatul nu va mai stapani asupra voastra, pentru ca nu sunteti sub Lege, ci sub har.",
  }),
]
