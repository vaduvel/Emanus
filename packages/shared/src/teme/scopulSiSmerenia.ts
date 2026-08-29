import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 8 din docs/41-module-teme-poonen.md: "Scopul lui Dumnezeu și smerenia lui Hristos".
 * Temele 31-34.
 *
 * Sursa: Zac Poonen, "Basic Christian Teachings", capitolele 31-34 (cfcindia.com).
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

const COURSE_ID = "teme_c8_smerenia"

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
          { id: `${p}c1`, label: "Vreau să fiu văzut și prețuit." },
          { id: `${p}c2`, label: "Mă compar mereu cu alții." },
          { id: `${p}c3`, label: "Vreau să învăț să cobor." },
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
        "Dumnezeu stă împotriva celor mândri, dar celor smeriți le dă har.",
        "Duhul Sfânt a venit ca să ne facă gândirea asemenea gândirii lui Hristos.",
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

export const SCOPUL_SI_SMERENIA_LESSONS: Lesson[] = [
  make({
    id: "smer_l1",
    order: 1,
    title: "Pentru ce te-a făcut Dumnezeu",
    refs: ["Geneza 1:26", "Marcu 8:36", "Ioan 14:9", "1 Ioan 2:6"],
    ref: "Geneza 1:26",
    hook: "În prima pagină a Bibliei, Dumnezeu ne spune de ce l-a făcut pe om. Fiindcă omul a uitat lucrul acesta, nu-și mai găsește rostul.",
    word: "Să facem om după chipul Nostru, după asemănarea Noastră.",
    truth: [
      "Biblia este ca o carte de instrucțiuni. Când cumperi un aparat scump, primești și broșura fabricantului. Dacă ești înțelept, urmezi întocmai instrucțiunile, pentru că fabricantul știe mai bine decât tine cum a fost făcut și cum trebuie să meargă.",
      "Cât prețuiește viața ta? Isus a pus într-un talger toată lumea cu bogăția și slava ei, iar în celălalt un singur suflet - și sufletul a atârnat mai greu. Atunci cum se face că omul, care este atât de prețios, nu se uită niciodată la instrucțiunile Făcătorului său?",
      "În Geneza 1, la fiecare zi a facerii, Dumnezeu nu spune de ce a făcut lucrul acela. Nu ni se spune scopul luminii, nici al cerurilor, nici al plantelor, nici al animalelor. Dar când a ajuns la om, a spus mai întâi: să facem om după chipul Nostru.",
      "Cel dintâi scop pentru care l-a făcut Dumnezeu pe om a fost ca omul să arate asemănarea lui Dumnezeu. Dumnezeu este Duh și nevăzut; a vrut ca firea Lui să fie arătată printr-o făptură.",
      "Îngerii au fost făcuți înaintea omului, dar nu este nicio dovadă în Biblie că au fost făcuți după chipul lui Dumnezeu. Aceasta este cinstea dată numai omului.",
      "Închipuie-ți scopul lui Dumnezeu pentru om ca pe o linie care urcă. Undeva la începutul liniei, Adam a căzut și linia s-a prăbușit într-o groapă. Ce a făcut Isus? A coborât în groapă și l-a ridicat pe om înapoi pe linie.",
      "Deci iertarea păcatelor nu este împlinirea scopului lui Dumnezeu; este doar aducerea noastră înapoi la locul de unde a căzut Adam. Mulți creștini se opresc acolo: păcatele mele sunt iertate. Dar mai este de mers pe linia care urcă, și aceea înseamnă creștere în asemănare cu Isus.",
      "Isus n-a venit doar să moară. Moartea Lui a ținut șase ceasuri într-o singură zi. Dar viața pe care a trăit-o treizeci și trei de ani ce a arătat? A arătat cum vrea Dumnezeu să trăiască omul pe pământ.",
      "Dacă aș vrea să te învăț să înoți, aș putea să-ți desenez pe tablă cum se mișcă mâinile și picioarele, și apoi să-ți spun: sari în râu. Te-ai îneca. Sau te-aș putea duce la râu și să-ți spun: uită-te la mine și fă la fel. Învățătura nu este niciodată la fel de bună ca pilda vie.",
      "Vechiul Testament este tabla. Noul Testament este pilda vie. A fi sub har înseamnă că nu mai am nevoie de tablă, fiindcă Îl am pe Isus ca pildă. Dar dacă Isus nu-ți este pildă, atunci ai foarte multă nevoie de Lege.",
    ],
    wrongA: "Scopul lui Dumnezeu cu mine s-a împlinit când mi-am primit iertarea.",
    right: "Iertarea mă readuce la punctul de plecare; scopul este să cresc în asemănarea lui Hristos.",
    wrongB: "Cine este sub har nu mai are nevoie nici de Lege, nici de pilda lui Isus.",
    explanation:
      "Omul a fost făcut ca să arate firea lui Dumnezeu. De aceea ne-a fost dat Duhul Sfânt: ca să arătăm firea aceasta în viața de zi cu zi.",
    step: "Uită-te azi la o singură purtare a lui Isus și întreabă-te: unde aș fi făcut eu altfel?",
    prayer: "Doamne, nu vreau să mă opresc la iertare. Vreau să cresc până ajung să semăn cu Tine.",
    journal: "Ce ar vedea cineva despre Dumnezeu, uitându-se la viața ta săptămâna asta?",
    memory: "Să facem om după chipul Nostru, după asemănarea Noastră.",
  }),
  make({
    id: "smer_l2",
    order: 2,
    title: "Smerenia în venirea lui Isus pe pământ",
    refs: ["Ioan 1:14", "Filipeni 2:5-8", "Iacov 4:6", "Matei 1:1-16"],
    ref: "Ioan 1:14",
    hook: "Mărimea lui Dumnezeu nu se vede cel mai limpede în stele, ci în smerenia cu care a venit în chip de om.",
    word: "Și Cuvântul S-a făcut trup și a locuit printre noi, plin de har și de adevăr.",
    truth: [
      "Omul este în temeiul lui mândru. Suntem mândri de neam, de familie, de școală, de înfățișare, de deșteptăciune, de daruri, de poziție, de casă, de mașină, de prieteni cu greutate.",
      "Când a venit Isus pe pământ, a luat locul cel mai de jos pe care îl poate lua un om. A venit ca slujitor al tuturor, deși era Dumnezeu.",
      "El nu a venit cu un aer de binefăcător care Se coboară la noi. S-a smerit ca să fie una cu noi în toate. În smerenia aceasta este mai multă slavă decât în toate minunile pe care le-a făcut.",
      "În Isus nu a fost un atom de mândrie. Nu S-a impus niciodată oamenilor. Nu i-a făcut niciodată să se teamă de El ca de unul cu mult mai presus, deși era mai presus de fiecare. Își spunea Fiul omului: sunt doar un om obișnuit.",
      "Răul a intrat în univers prin Lucifer, care s-a mândrit cu înțelepciunea și frumusețea lui. Dumnezeu stă împotriva celui mândru, oricare ar fi pricina mândriei. Cuvântul se împotrivește este opusul lui sprijină.",
      "Așa cum tot păcatul s-a născut din mândria lui Lucifer, tot așa mântuirea s-a născut din smerirea lui Isus. Sunt două duhuri care lucrează în lume: unul care urcă și altul care coboară.",
      "De aceea poți ști cât de mult din gândul lui Hristos ai în tine: exact cât ai din smerenia Lui. Aceasta este măsura cea mai sigură a creșterii duhovnicești - nu cunoașterea Bibliei, nu mulțimea lucrărilor.",
      "Isus a coborât din cer și a devenit om. Dar nu S-a oprit acolo. Ca om, a refuzat să fie împărat; când au vrut să-L facă împărat, a fugit. S-a făcut slujitorul tuturor.",
      "Noi nu ne-am ales familia în care ne-am născut, nici țara, nici împrejurările. Un singur Om a putut alege: când, unde și în ce familie Se naște. Și ce a ales? O familie săracă de tâmplar, dintr-un oraș cu nume prost, și un staul cu animale.",
      "A ales chiar și un șir de strămoși în care erau Tamar, Rahav, Rut și Bat-Șeba. De ce a ales asemenea șir? Fiindcă a vrut să vină dedesubtul nostru, al tuturor, ca să ne slujească.",
    ],
    wrongA: "Cresc duhovnicește pe măsură ce știu mai multă Biblie.",
    right: "Măsura creșterii duhovnicești este creșterea în smerenie.",
    wrongB: "Smerenia lui Isus se vede mai ales în minunile Lui.",
    explanation:
      "Sunt oameni care slujesc mult și sunt tot mai activi, dar nu cresc. Cine crește cu adevărat devine tot mai smerit.",
    step: "Fă azi un lucru mărunt pentru cineva, fără să fie nevoie să afle nimeni.",
    prayer: "Doamne, scoate din mine duhul care vrea să urce. Învață-mă să cobor, ca Tine.",
    journal: "Cu ce te mândrești, deși nu ți-ai ales tu lucrul acela?",
    memory: "Cuvântul S-a făcut trup și a locuit printre noi.",
  }),
  make({
    id: "smer_l3",
    order: 3,
    title: "Smerenia în viața Lui pământească",
    refs: ["Filipeni 2:3", "Efeseni 3:8", "Ioan 13:4-5", "Luca 2:51"],
    ref: "Filipeni 2:3",
    hook: "Smerenia nu înseamnă să-i socotești pe alții mai buni decât tine. Isus nu i-a socotit pe alții mai buni decât El - și totuși le-a spălat picioarele.",
    word: "Fiecare să privească și la folosul altora, nu numai la al său.",
    truth: [
      "Isus S-a făcut una cu omul și nu S-a rușinat să fie om. Nu Se rușinează să ne numească frații Lui. Noi ne simțim uneori mai presus de alții: mai învățați, dintr-o clasă mai bună. Toate acestea vin din mândria care ne-a molipsit de la căderea lui Adam.",
      "El a venit dedesubtul tuturor, pentru că numai așa putea fi slujitorul tuturor. Nu poți sluji pe cineva dacă nu ești gata să cobori sub el. Ca să ridici pe cineva, trebuie să te așezi sub el.",
      "Duhul Sfânt a venit ca să facă gândul nostru ca al lui Hristos. Aceasta nu este o teorie. Înseamnă că în gândul nostru să nu ne mai socotim mai presus de niciun om, de orice neam sau religie ar fi.",
      "La ce te gândești despre tine când ești singur? Că ești chipeș, că ești deștept, că ai avut norocul unei familii bune? Acolo se vede cât de mult gândești ca Hristos și cât ca diavolul. Când te compari cu alții și te socotești mai presus, gândești exact ce a gândit Lucifer înainte de a ajunge diavol.",
      "Scriptura nu spune să-i socotim pe alții mai buni decât noi - asta ar însemna să credem o minciună. Cine a fost cel mai smerit Om de pe pământ? Isus. I-a socotit El pe alții mai buni decât El? Cum ar fi putut? Știa că Iuda este un diavol.",
      "Scriptura spune să-i socotim pe alții mai însemnați decât noi. Este cu totul altceva. Și Pavel, care le-a spus corintenilor că sunt firești, se socotea pe sine cel mai neînsemnat dintre toți sfinții.",
      "De aceea a luat Isus ligheanul și a spălat picioarele ucenicilor. În vremea aceea, acela era lucrul robului. Ucenicii s-au gândit fiecare: nu eu. Petru poate că s-a gândit că el va fi conducătorul. Matei poate că s-a gândit că este un om cu carte.",
      "Nu era o prefăcătorie. Sunt oameni care joacă smerenie ca să se vadă că sunt smeriți - aceea este fățărnicie și Dumnezeu o urăște.",
      "Aceasta este smerenia adevărată: să iei locul de a nu fi nimic înaintea lui Dumnezeu. Doamne, sunt nimic; tot ce sunt, Tu m-ai făcut. Dacă ești deștept, cine te-a făcut deștept?",
      "Te puteai naște cu mintea slabă, cu trupul slăbit, cu o boală din naștere. Ce ai fi fost atunci? Ce ai tu, și să nu fi primit? Numai un om fără minte este mândru.",
      "Și Isus, desăvârșit și fără păcat, a stat treizeci de ani supus lui Iosif și Mariei, care nu erau desăvârșiți. Nu ne vine ușor să ne supunem cuiva mai prejos decât noi. Dar cine este cu adevărat smerit nu are nicio greutate: se supune oricui, fiindcă știe că nu este nimic.",
    ],
    wrongA: "Smerenia înseamnă să-i crezi pe toți mai buni decât tine.",
    right: "Smerenia înseamnă să-i socotești pe alții mai însemnați și să fii nimic înaintea lui Dumnezeu.",
    wrongB: "Cine este mai desăvârșit trebuie să fie ascultat, nu să asculte.",
    explanation:
      "Isus n-a socotit pe nimeni mai sfânt decât El, dar i-a tratat pe toți ca fiind mai însemnați. Asta a făcut cu ligheanul în mână.",
    step: "Supune-te azi, fără să comentezi, cuiva pe care îl socotești mai prejos decât tine.",
    prayer: "Doamne, arată-mi gândurile pe care le am despre mine când sunt singur și curăță-le.",
    journal: "Față de cine te simți mai presus? Spune-i lui Dumnezeu.",
    memory: "Fiecare să privească și la folosul altora, nu numai la al său.",
  }),
  make({
    id: "smer_l4",
    order: 4,
    title: "Smerenia în moartea Lui",
    refs: ["Ioan 13:14-17", "Matei 26:38", "Isaia 53:12", "Luca 16:15"],
    ref: "Ioan 13:17",
    hook: "Ce a făcut Isus în seara aceea cu ligheanul? A văzut o nevoie și a făcut o treabă murdară pentru ai Lui. Atât.",
    word: "Dacă știți aceste lucruri, ferice de voi dacă le faceți.",
    truth: [
      "Mulți au înțeles porunca de a ne spăla picioarele unii altora ca pe o rânduială de ținut, chiar și când picioarele sunt în șosete și ciorapi curați. Așa devine un obicei fără înțeles.",
      "Ce a făcut de fapt Isus? A împlinit o nevoie trupească a lor, făcând o treabă murdară pentru ei. Deci ce ne-a spus să facem? Să fim gata să facem treburile murdare unii pentru alții, acolo unde este nevoie. Într-o sală de adunare, spălarea picioarelor de azi ar fi să cureți tu toaleta.",
      "Nu-ți face griji dacă alții nu trăiesc așa. Nu-i judeca. Nu este treaba noastră. Dar tu poți trăi așa. Isus a spus: dacă știți aceste lucruri, ferice de voi dacă le faceți - nu dacă doar vă gândiți la ele.",
      "Nu ești fericit când stai ca un stăpân pe scaun și-i pui pe alții să te slujească. Dacă vrei cu adevărat să fii fericit, fii slujitor.",
      "Isus S-a apropiat de cei de la treapta cea mai de jos a societății și a umblat printre ei ca un egal. Și nu numai de cei de jos ca stare, ci și de cei de jos ca purtare: curve, bețivi, înșelători. Era fără păcat și totuși Se amesteca printre ei.",
      "Nu S-a temut că I se va spune că este prieten cu păcătoșii. Și niciodată n-a făcut vreun păcătos să se simtă stânjenit prin sfințenia Lui. Acesta este un semn al omului smerit: lângă el te simți în largul tău, deși el este curat.",
      "Fariseii nu erau așa. Erau țepeni și nu lăsau pe nimeni să se apropie, fiindcă se socoteau prea sfinți.",
      "În Ghetsimani a fost sub o apăsare grea. Ce face atunci? Nu Se poartă ca unul care nu are nevoie de nimeni. Îi cheamă pe Petru, Iacov și Ioan și le cere să se roage cu El. Un om mândru nu cere nimănui să se roage cu el.",
      "De ce s-a arătat puterea lui Dumnezeu așa de mare în viața lui Isus? Fiindcă a recunoscut că este nimic. A trăit înaintea Tatălui ca nimic - și Tatăl a putut să-Și arate toată puterea prin El.",
      "La judecată și la moartea Lui nu I s-a făcut niciodată dreptate. A fost umilit, batjocorit, luat în râs. Și n-a chemat îngerii, deși putea chema douăsprezece legiuni.",
      "Toată viața Și-a deschis palmele ca să dea altora. Și la sfârșit Și-a deschis palmele ca să primească piroanele. Așa vrea Dumnezeu să trăim: cu palma deschisă, nu cu pumnul strân s.",
      "Aceasta este creștinismul adevărat. Nu este ceva mare și lăudat. Ce este înalt în ochii oamenilor este urăciune înaintea lui Dumnezeu.",
    ],
    wrongA: "Spălarea picioarelor este o rânduială de ținut la adunare.",
    right: "Este chemarea de a face treburile murdare pentru alții, acolo unde vezi o nevoie.",
    wrongB: "Un om duhovnicesc nu are nevoie să ceară altora să se roage cu el.",
    explanation:
      "Isus a văzut o nevoie și a împlinit-o. Fericirea vine din facerea lucrului, nu din gândirea despre el.",
    step: "Fă azi treaba pe care nimeni nu vrea să o facă, și nu spune nimănui.",
    prayer: "Doamne, fă-mă să cobor. Deschide-mi palma să dau, în loc să apuc.",
    journal: "Ce treabă murdară ai evitat, socotind că nu este de nivelul tău?",
    memory: "Dacă știți aceste lucruri, ferice de voi dacă le faceți.",
  }),
]
