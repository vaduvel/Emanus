import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 12 din docs/41-module-teme-poonen.md: "Tatăl nostru, pas cu pas".
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
          { id: `${p}c1`, label: "Mai mult cer decât vorbesc." },
          { id: `${p}c2`, label: "Spun cuvinte, dar fără inimă." },
          { id: `${p}c3`, label: "Vreau să învăț să vorbesc cu Tatăl." },
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
        "Tatăl tău știe de ce ai nevoie mai înainte ca să-I ceri tu.",
        "Rugăciunea nu-L înștiințează pe Dumnezeu; ea arată că atârnăm de El.",
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
    title: "Nu ca fățarnicii",
    refs: ["Matei 6:5", "Matei 6:6", "Matei 23:13"],
    ref: "Matei 6:6",
    hook: "Cuvântul fățarnic înseamnă actor. Actorul urcă pe scenă și se face că este cineva care nu este în viața de toate zilele.",
    word: "Ci tu, când te rogi, intră în odăița ta, încuie-ți ușa și roagă-te Tatălui tău care este în ascuns.",
    truth: [
      "Am fost făcuți ca să vorbim cu Dumnezeu și să-L auzim vorbindu-ne. Nimănui nu i-ar plăcea să aibă un copil surd și mut. Ești tu unul dintre creștinii surzi și muți, care nu vorbesc niciodată cu Tatăl și nu aud niciodată ce le spune El?",
      "Rugăciunea nu este o rânduială și nici o formulă repetată. Este un copil care vorbește cu tatăl lui.",
      "Isus a spus că la rugăciune nu cuprinsul este lucrul cel mai însemnat, ci starea inimii. De aceea, înainte să le spună cum să se roage, le-a spus cum să nu se roage.",
      "Scena unui om religios fățarnic este sala de adunare. Duminică se îmbracă frumos și joacă rolul omului sfânt. Când se întoarce acasă, redevine cine este.",
      "Noi am crede că cele mai mari păcate sunt uciderea, preacurvia și furtul. Isus a așezat deasupra tuturor un altul: fățărnicia. Pe curvele care s-au pocăit nu le-a osândit; pe tâlharul de lângă El l-a primit. Dar pe fățarnici i-a numit pui de năpârți.",
      "Rugăciunea este ca o convorbire la telefon. Când suni, te asiguri întâi că celălalt te aude. La fel, cel dintâi lucru este să știi că Dumnezeu te ascultă. Și tot ca la telefon: nu numai vorbești, ci și asculți.",
      "Pentru mulți, rugăciunea este doar o listă de cumpărături: dă-mi asta, dă-mi cealaltă. Ce ai zice de un copil care vine la tatăl lui numai când vrea ceva și nu-l interesează nicio altă vorbă?",
      "Cel dintâi lucru pe care l-a spus Isus: nu juca teatru. Nu te ruga ca să fii văzut de oameni. Unii sunt atât de rușinoși încât nu se roagă niciodată în public - o margine. Alții se roagă rugăciuni lungi și plicticoase în public - cealaltă margine. Cui se roagă aceștia? Nu lui Dumnezeu.",
      "Întreabă-te data viitoare când te rogi în public: mă rog eu așa și când sunt singur? Ai aceeași povară în odaia ta, sau numai în adunare?",
      "Dacă ai făcut așa - și, dacă suntem cinstiți, toți am făcut - mergi acasă și spune: Doamne, iartă-mă, rugăciunea mea a fost un păcat, fiindcă I-am adus-o omului.",
    ],
    wrongA: "Rugăciunea bună se cunoaște după cuvintele alese.",
    right: "Rugăciunea se măsoară după starea inimii, nu după cuvinte și nu după cine te aude.",
    wrongB: "Cine nu se roagă în public nu se roagă cu adevărat.",
    explanation:
      "Isus a osândit jocul de teatru religios mai tare decât păcatele pe care le știe toată lumea.",
    step: "Roagă-te azi ceva ce n-ai spune niciodată cu glas tare în fața altora.",
    prayer: "Doamne, scoate din mine dorința de a fi văzut. Vreau să vorbesc cu Tine, nu cu oamenii.",
    journal: "Ce spui în rugăciunea publică și nu spui când ești singur?",
    memory: "Roagă-te Tatălui tău care este în ascuns.",
  }),
  make({
    id: "rug_l2",
    order: 2,
    title: "Nu cu multă vorbărie",
    refs: ["Matei 6:7-8", "Luca 18:1-7", "Luca 11:5-8", "Matei 14:30"],
    ref: "Matei 6:7",
    hook: "Cât de lungă trebuie să fie rugăciunea ta ca să fie ascultată? Petru s-a rugat două secunde: Doamne, scapă-mă.",
    word: "Când vă rugați, să nu bolborosiți aceleași vorbe, ca păgânii.",
    truth: [
      "Dacă te rogi și postești și apoi spui altora că ai postit trei zile sau șapte zile, Isus a spus despre aceștia că și-au luat răsplata. Au vrut cinstea de la oameni și au primit-o. De la Dumnezeu nu mai primesc nimic.",
      "Iar celălalt, care nu spune nimănui, se închide în odaie și se roagă Tatălui în ascuns, nu primește nimic de la oameni, dar primește răsplata deplină de la Dumnezeu.",
      "Omul este din fire religios. Ne place să arătăm cât ne rugăm, cât postim, câți bani dăm pentru lucrarea Domnului, ce jertfe am făcut. Isus a spus: băgați de seamă să nu spuneți nimănui nimic din acestea.",
      "Al doilea lucru: nu bolborosiți aceleași vorbe, ca păgânii, care își închipuie că, dacă spun multe cuvinte, vor fi ascultați. Ei cred că Dumnezeu este surd și nu aude dacă spui o dată.",
      "Mulți cred că Dumnezeu ascultă pe cine se roagă un ceas și nu ascultă pe cine se roagă un minut. De unde vine gândul acesta? Când Petru se scufunda în mare, a strigat: Doamne, scapă-mă. Rugăciunea aceea a ținut două secunde și a fost ascultată.",
      "Nu este vorba nici de lungime, nici de repetare - ci de repetarea fără înțeles. În Ghetsimani, Isus a spus de trei ori același lucru, dar din inimă. Când ai o povară, o duci înaintea lui Dumnezeu iar și iar, până se ridică.",
      "Văduva a mers mereu la judecător cu același cuvânt: fă-mi dreptate. Iar omul a bătut mereu la ușa vecinului până i-a deschis. Isus ne-a învățat tocmai stăruința aceasta.",
      "Poți însă lua chiar rugăciunea Tatăl nostru și s-o repeți ca un papagal de douăzeci de ori. Va asculta Dumnezeu mai mult dacă altul o spune de cincizeci de ori? Isus a spus limpede că acesta este un gând păgân. Inima hotărăște ce aude Dumnezeu.",
      "Și încă ceva: Tatăl vostru știe de ce aveți trebuință mai înainte ca să-I cereți voi. Când te rogi, nu-I dai lui Dumnezeu o știre nouă.",
      "Unii își închipuie că rugăciunea înseamnă să-L înduplecăm pe Dumnezeu să aibă milă de cineva față de care ar fi împietrit. Este fără sens. Dumnezeu are pentru fiecare om mai multă milă decât vom avea noi vreodată.",
      "Ne rugăm ca să arătăm că atârnăm de El și că El este Cel care împlinește toate nevoile noastre.",
    ],
    wrongA: "Cu cât mă rog mai mult timp, cu atât sunt mai ascultat.",
    right: "Inima hotărăște, nu numărul cuvintelor; stăruința din inimă este altceva decât bolboroseala.",
    wrongB: "Rugăciunea Îl înștiințează pe Dumnezeu despre nevoile noastre.",
    explanation:
      "Rugăciunea lui Petru a ținut două secunde și a fost ascultată; iar stăruința văduvei era din inimă.",
    step: "Spune-I azi lui Dumnezeu, în câteva cuvinte simple, lucrul care te apasă cu adevărat.",
    prayer: "Doamne, nu vreau vorbe multe. Vreau o inimă adevărată înaintea Ta.",
    journal: "Ce spui în rugăciune fără să mai gândești ce spui?",
    memory: "Tatăl vostru știe de ce aveți trebuință mai înainte ca să-I cereți voi.",
  }),
  make({
    id: "rug_l3",
    order: 3,
    title: "Tatăl nostru care ești în ceruri",
    refs: ["Matei 6:9", "Iacov 1:6-7", "Evrei 11:6", "Romani 12:2"],
    ref: "Matei 6:9",
    hook: "În cele dintâi patru cuvinte ale rugăciunii sunt două temeiuri care îți întăresc credința: ne iubește și poate totul.",
    word: "Tatăl nostru care ești în ceruri!",
    truth: [
      "Una dintre cerințele cele mai însemnate pentru rugăciunea ascultată este credința. Cine se îndoiește seamănă cu valul mării, tulburat de vânt; un astfel de om să nu se aștepte să primească ceva de la Domnul.",
      "Mulți spun: m-am rugat, presupun că Dumnezeu a auzit. Întrebarea este: te-ai rugat cu credință? Cine se apropie de Dumnezeu trebuie să creadă că El este și că răsplătește pe cei ce-L caută.",
      "De aceea ne-a învățat Isus să începem cu Tatăl nostru: nu este directorul unei mari întreprinderi, la ușa căruia aștepți să fii primit, nici un mare conducător religios cu listă de așteptare. Este un Tată iubitor.",
      "Și care ești în ceruri: Cel care cârmuiește peste tot universul. Deci nu numai Cineva care ne iubește, ci Cineva care are toată puterea.",
      "Când vrei să-I ceri ceva, oprește-te și întreabă-te cu Cine vorbești. Odată ce știi că vorbești cu Cel care te iubește desăvârșit și care are toată puterea, ești gata să te rogi.",
      "Bănuiesc că foarte multe rugăciuni ale creștinilor nu primesc niciodată răspuns - poate nouă din zece - fiindcă nu este credință în ele.",
      "În rugăciunea aceasta sunt șase cereri. Cele dintâi trei privesc pe Dumnezeu: sfințească-se Numele Tău, vie Împărăția Ta, facă-se voia Ta. Celelalte trei privesc nevoile noastre.",
      "Deci, înainte de nevoile noastre, Isus ne-a învățat să ne rugăm pentru slava lui Dumnezeu, pentru Împărăția și pentru voia Lui. Astfel ne-a învățat să-L punem pe Dumnezeu cel dintâi. Chiar dacă nevoia ta este mare, ea rămâne a doua.",
      "Necazul întregului neam omenesc, din zilele lui Adam, este că suntem așezați în jurul nostru înșine. Mereu ne gândim ce câștig avem de aici, cum mă ajută pe mine și pe familia mea.",
      "Aceasta este înnoirea minții: să privim totul mai întâi din punctul de vedere al lui Dumnezeu, nu din al nostru.",
    ],
    wrongA: "Rugăciunea începe cu nevoia mea, fiindcă este cea mai arzătoare.",
    right: "Rugăciunea începe cu Dumnezeu: Numele, Împărăția și voia Lui; nevoile vin după.",
    wrongB: "Credința nu are legătură cu primirea răspunsului.",
    explanation:
      "Cine se îndoiește să nu se aștepte să primească ceva de la Domnul.",
    step: "Începe azi rugăciunea numai cu Dumnezeu; abia după cinci minute spune-ți nevoia.",
    prayer: "Tatăl nostru care ești în ceruri, cred că mă iubești și că poți totul.",
    journal: "Cu ce imagine despre Dumnezeu te-ai rugat până acum?",
    memory: "Tatăl nostru care ești în ceruri!",
  }),
  make({
    id: "rug_l4",
    order: 4,
    title: "Numele, Împărăția și voia Lui",
    refs: ["Matei 6:9-10", "Ioan 12:27-28", "Ioan 6:38", "Psalmul 34:19"],
    ref: "Ioan 12:28",
    hook: "Isus, sub cea mai grea apăsare, a spus: ce voi zice? Tată, izbăvește-Mă din ceasul acesta? Nu. Tată, proslăvește Numele Tău.",
    word: "Tată, proslăvește Numele Tău!",
    truth: [
      "Multă vreme oamenii au crezut că pământul este centrul universului și toate socotelile le ieșeau greșit. Așa este și duhovnicește: Dumnezeu nu ne-a făcut să fim așezați în jurul nostru înșine.",
      "Cea dintâi cerere este: sfințească-se Numele Tău. Nu înseamnă ca oamenii să-L cinstească pe Isus ca pe un om mare; înseamnă ca oamenii să se plece cu totul înaintea Domniei Lui.",
      "Și să înceapă cu cei care se numesc creștini: să-L pună cu totul pe cel dintâi loc în viața lor.",
      "Nu ajunge să spui cuvintele; trebuie să fie povara inimii tale: Doamne, cea dintâi povară a mea este ca Numele Tău să fie proslăvit în viața mea, în familia mea, în biserica noastră și în țara noastră.",
      "Când a fost sub cea mai grea apăsare, Isus a spus: acum sufletul Meu este tulburat. Și ce voi zice? Tată, izbăvește-Mă din ceasul acesta? A ales să spună: Tată, proslăvește Numele Tău. Putea să Se roage să fie cruțat, și atunci noi am fi rămas pierduți în păcatele noastre.",
      "A doua cerere: vie Împărăția Ta. Astăzi nu prea mai avem împărați; un cuvânt mai potrivit ar fi cârmuire. Doamne, vie cârmuirea Ta - în lume, în biserică și în viața mea.",
      "A treia cerere: facă-se voia Ta, precum în cer așa și pe pământ. Isus a spus că a venit din cer nu ca să facă voia Lui, ci voia Celui ce L-a trimis.",
      "Cum se face voia lui Dumnezeu în cer? Îngerii ascultă îndată. Nu spun: mai așteaptă puțin, Doamne, am ceva mai însemnat de făcut.",
      "Omul face așa. Dumnezeu îi spune să se ducă să-și ceară iertare, să se boteze sau să dea înapoi banii luați pe nedrept, iar el așteaptă zile, săptămâni, luni.",
      "Îngerii ascultă îndată, cu bucurie și pe deplin. Nu umblă cu fața lungă, plângându-se de partea lor. Așa suntem chemați să ascultăm și noi.",
      "Sunt multe necazuri pentru cel neprihănit, dar Domnul îl scapă din toate. Și lumea are necazuri, dar nu are cine s-o scape. Noi avem un Tată în ceruri.",
    ],
    wrongA: "Împărăția Lui privește lumea, nu viața mea de zi cu zi.",
    right: "Cele trei cereri încep cu mine: Numele Lui cinstit, cârmuirea Lui și voia Lui în viața mea.",
    wrongB: "Pot amâna ascultarea până îmi vine bine.",
    explanation:
      "Ascultarea din cer este îndată, bucuroasă și deplină. Aceasta cerem să fie și pe pământ.",
    step: "Fă azi, în ceasul următor, lucrul pe care îl amâni de săptămâni.",
    prayer: "Tată, proslăvește Numele Tău în viața mea, chiar dacă mă costă.",
    journal: "Ce ți-a spus Dumnezeu și încă aștepți?",
    memory: "Tată, proslăvește Numele Tău!",
  }),
  make({
    id: "rug_l5",
    order: 5,
    title: "Pâinea noastră cea de toate zilele",
    refs: ["Matei 6:11", "Filipeni 4:19", "Matei 6:10"],
    ref: "Matei 6:11",
    hook: "În toată rugăciunea aceasta nu apar cuvintele eu, mie și al meu. Nici măcar o dată.",
    word: "Pâinea noastră cea de toate zilele dă-ne-o nouă astăzi.",
    truth: [
      "Dacă începi cu adevărat să te rogi așa, ajungi un om duhovnicesc: dorința ta cea dintâi este ca Numele lui Dumnezeu să fie proslăvit, nu dacă faci bani sau dacă ți se vindecă durerea de spate.",
      "Multe necazuri nu se dezleagă niciodată dacă nu-L pui pe Dumnezeu cel dintâi. Nu spun că nu vei avea necazuri; spun că Dumnezeu va lucra și te va face biruitor în mijlocul lor.",
      "Cuvintele eu, mie și al meu nu se află în rugăciunea aceasta. După ce am căutat Numele, Împărăția și voia lui Dumnezeu, următorul lucru este să nu ne gândim numai la noi, ci și la ceilalți copii ai Tatălui.",
      "Îți este foame? Roagă-te pentru pâinea ta. Dar nu uita că mai sunt copii ai lui Dumnezeu cărora le este foame. De aceea a spus: pâinea noastră, iartă-ne nouă, izbăvește-ne pe noi.",
      "Nu ne-a învățat să cerem pâine pentru un an întreg. Să fii mulțumit dacă Dumnezeu ți-a dat destul pentru ziua de azi. Nu înseamnă că este rău să pui deoparte pentru mâine; poți face planuri, dar să fii mulțumitor.",
      "Și nu ne-a învățat să cerem lucruri de prisos: nu înghețată zilnică, nici prăjitură zilnică, ci pâinea cea de toate zilele - hrana simplă care ține trupul în putere.",
      "Tatăl știe că avem nevoie de pâine. Atunci de ce nu ne-o dă fără să cerem? Fiindcă vrea să avem legătură cu El și bucuria unei rugăciuni ascultate.",
      "De aceea mulțumim înainte de masă. Nu ca să aibă mâncarea alt gust, ci ca să recunoaștem că Dumnezeu a dat-o. Cei fără Dumnezeu se așază la masă fără să mulțumească nimănui.",
      "Deci nu este niciun rău în a te ruga pentru lucruri materiale de trebuință: îmbrăcăminte, o casă în care să locuiești, școală pentru copii.",
      "Băgați de seamă unde este așezată cererea aceasta: îndată după facă-se voia Ta. Adică: vreau să se facă voia Ta pe pământ și, ca s-o pot face, dă-mi pâinea cea de toate zilele, ca să am putere.",
      "Unii spun că este nepotrivit să te rogi pentru lucruri materiale. Sună evlavios, dar este împotriva învățăturii lui Isus, care ne-a învățat să cerem pâinea înainte chiar de iertare și de izbăvire.",
    ],
    wrongA: "Este nepotrivit să te rogi pentru lucruri materiale.",
    right: "Ne rugăm pentru ce ne este de trebuință, ca să avem putere să facem voia Lui - și ne rugăm pentru toți, nu doar pentru noi.",
    wrongB: "Rugăciunea aceasta ne îndeamnă să cerem belșug.",
    explanation:
      "Cererea pentru pâine stă îndată după facă-se voia Ta: cerem ca să putem asculta.",
    step: "Roagă-te azi pentru pâinea unui om pe care îl știi în lipsă - și du-i ceva.",
    prayer: "Doamne, dă-ne nouă astăzi pâinea de care avem trebuință, ca să facem voia Ta.",
    journal: "Pentru cine altcineva te-ai rugat săptămâna aceasta?",
    memory: "Pâinea noastră cea de toate zilele dă-ne-o nouă astăzi.",
  }),
  make({
    id: "rug_l6",
    order: 6,
    title: "Iartă-ne și izbăvește-ne",
    refs: ["Matei 6:12-13", "Matei 6:14-15", "Matei 18:23-35", "2 Timotei 2:22"],
    ref: "Matei 6:14",
    hook: "Dintre toate cele șase cereri, Isus a ales una singură ca s-o repete la sfârșit: iertarea celor care ne-au greșit.",
    word: "Dacă iertați oamenilor greșelile lor, și Tatăl vostru cel ceresc vă va ierta vouă.",
    truth: [
      "Avem două feluri de nevoi: unele privesc trecutul, altele viitorul. Pentru trecut ne trebuie iertare; pentru viitor ne trebuie ajutor ca să biruim răul din firea noastră.",
      "Nu trebuie să faci o listă cu toate păcatele tale; nimeni n-ar putea. Recunoaștem că suntem păcătoși și Îi cerem să ne ierte, precum și noi iertăm greșiților noștri. Aceasta este singura condiție.",
      "Isus a spus pilda împăratului care a iertat unui rob o datorie uriașă. Omul acela a ieșit sărind de bucurie, a întâlnit un tovarăș care îi datora o nimica toată, l-a apucat de gât și l-a aruncat în temniță.",
      "Ce a făcut împăratul când a auzit? L-a chemat înapoi: eu ți-am iertat toată datoria și tu n-ai putut ierta atâta? Și l-a dat pe mâna chinuitorilor. Isus a încheiat: tot așa va face și Tatăl Meu cel ceresc, dacă nu iertați.",
      "Unul dintre cele mai mari păcate întâlnite astăzi între creștini este duhul care nu iartă. Aici este singurul loc unde Isus a spus că păcatele tale nu vor fi iertate; ba chiar iertarea dată poate fi luată înapoi.",
      "Gândiți-vă o clipă: dacă este pe pământ un om pe care nu l-ai iertat, Tatăl tău ceresc nu te iartă pe tine.",
      "Dumnezeu nu-ți cere să uiți ce ți-au făcut oamenii. Îți cere să ierți. Spune-I: Doamne, îl iert pe omul acesta; nu mai țin nimic împotriva lui.",
      "Apoi vine: nu ne duce în ispită, ci izbăvește-ne de cel rău. Nu încerca să faci pe viteazul. Scriptura spune: fugi de idolatrie, fugi de poftele tinereții. Nu te așeza singur în locul unde poți fi ispitit fără rost.",
      "Aici este mărturisirea că nu mă pot izbăvi singur, cum nu-mi pot câștiga nici iertarea. Nu mă pot izbăvi prin hotărâre sau prin stăpânire de sine. Îl rog pe singurul care are putere.",
      "Și iarăși nu este numai despre mine: izbăvește-ne pe noi, pentru Împărăția Ta și pentru slava Ta. Numele Tău este necinstit când creștinii fac rău.",
      "Rugăciunea se încheie cum a început - cu Dumnezeu: a Ta este Împărăția și puterea și slava. Este rugăciunea unui om smerit, care recunoaște că Dumnezeu este totul și el este nimic. Când vine răspunsul, nu ne luăm noi cinstea.",
      "Iar Amin este un cuvânt evreiesc care înseamnă: așa să fie. Este o mărturisire de credință. Cum a început rugăciunea cu credință, tot cu credință se încheie.",
      "Nu trebuie să repetăm rugăciunea aceasta de fiecare dată. Isus a spus: iată dar cum trebuie să vă rugați. Adică: începeți așezându-L pe Dumnezeu în mijloc, rugați-vă cu credință și încheiați dându-I Lui slavă.",
    ],
    wrongA: "Iertarea înseamnă să uiți ce ți s-a făcut.",
    right: "Iertarea înseamnă să nu mai ții nimic împotriva omului; Dumnezeu nu-ți cere să uiți.",
    wrongB: "Mă pot izbăvi de rău prin hotărâre și stăpânire de sine.",
    explanation:
      "Dacă este un singur om pe pământ pe care nu l-ai iertat, Tatăl nu te iartă pe tine.",
    step: "Numește azi, înaintea lui Dumnezeu, omul pe care nu l-ai iertat - și iartă-l.",
    prayer: "Doamne, iartă-mă cum și eu iert. Nu mă duce în ispită și izbăvește-mă de cel rău.",
    journal: "Pe cine ții încă sub datorie în inima ta?",
    memory: "Dacă iertați oamenilor greșelile lor, și Tatăl vostru cel ceresc vă va ierta vouă.",
  }),
]
