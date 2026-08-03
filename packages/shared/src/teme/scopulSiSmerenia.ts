import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 8 din docs/41-module-teme-poonen.md: "Scopul lui Dumnezeu si smerenia lui Hristos".
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
        prompt: "Unde te gasesti?",
        options: [
          { id: `${p}c1`, label: "Vreau sa fiu vazut si pretuit." },
          { id: `${p}c2`, label: "Ma compar mereu cu altii." },
          { id: `${p}c3`, label: "Vreau sa invat sa cobor." },
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
        "Dumnezeu sta impotriva celor mandri, dar celor smeriti le da har.",
        "Duhul Sfant a venit ca sa ne faca gandirea asemenea gandirii lui Hristos.",
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
    title: "Pentru ce te-a facut Dumnezeu",
    refs: ["Geneza 1:26", "Marcu 8:36", "Ioan 14:9", "1 Ioan 2:6"],
    ref: "Geneza 1:26",
    hook: "In prima pagina a Bibliei, Dumnezeu ne spune de ce l-a facut pe om. Fiindca omul a uitat lucrul acesta, nu-si mai gaseste rostul.",
    word: "Sa facem om dupa chipul Nostru, dupa asemanarea Noastra.",
    truth: [
      "Biblia este ca o carte de instructiuni. Cand cumperi un aparat scump, primesti si brosura fabricantului. Daca esti intelept, urmezi intocmai instructiunile, pentru ca fabricantul stie mai bine decat tine cum a fost facut si cum trebuie sa mearga.",
      "Cat pretuieste viata ta? Isus a pus intr-un talger toata lumea cu bogatia si slava ei, iar in celalalt un singur suflet - si sufletul a atarnat mai greu. Atunci cum se face ca omul, care este atat de pretios, nu se uita niciodata la instructiunile Facatorului sau?",
      "In Geneza 1, la fiecare zi a facerii, Dumnezeu nu spune de ce a facut lucrul acela. Nu ni se spune scopul luminii, nici al cerurilor, nici al plantelor, nici al animalelor. Dar cand a ajuns la om, a spus mai intai: sa facem om dupa chipul Nostru.",
      "Cel dintai scop pentru care l-a facut Dumnezeu pe om a fost ca omul sa arate asemanarea lui Dumnezeu. Dumnezeu este Duh si nevazut; a vrut ca firea Lui sa fie aratata printr-o faptura.",
      "Ingerii au fost facuti inaintea omului, dar nu este nicio dovada in Biblie ca au fost facuti dupa chipul lui Dumnezeu. Aceasta este cinstea data numai omului.",
      "Inchipuie-ti scopul lui Dumnezeu pentru om ca pe o linie care urca. Undeva la inceputul liniei, Adam a cazut si linia s-a prabusit intr-o groapa. Ce a facut Isus? A coborat in groapa si l-a ridicat pe om inapoi pe linie.",
      "Deci iertarea pacatelor nu este implinirea scopului lui Dumnezeu; este doar aducerea noastra inapoi la locul de unde a cazut Adam. Multi crestini se opresc acolo: pacatele mele sunt iertate. Dar mai este de mers pe linia care urca, si aceea inseamna crestere in asemanare cu Isus.",
      "Isus n-a venit doar sa moara. Moartea Lui a tinut sase ceasuri intr-o singura zi. Dar viata pe care a trait-o treizeci si trei de ani ce a aratat? A aratat cum vrea Dumnezeu sa traiasca omul pe pamant.",
      "Daca as vrea sa te invat sa inoti, as putea sa-ti desenez pe tabla cum se misca mainile si picioarele, si apoi sa-ti spun: sari in rau. Te-ai ineca. Sau te-as putea duce la rau si sa-ti spun: uita-te la mine si fa la fel. Invatatura nu este niciodata la fel de buna ca pilda vie.",
      "Vechiul Testament este tabla. Noul Testament este pilda vie. A fi sub har inseamna ca nu mai am nevoie de tabla, fiindca Il am pe Isus ca pilda. Dar daca Isus nu-ti este pilda, atunci ai foarte multa nevoie de Lege.",
    ],
    wrongA: "Scopul lui Dumnezeu cu mine s-a implinit cand mi-am primit iertarea.",
    right: "Iertarea ma readuce la punctul de plecare; scopul este sa cresc in asemanarea lui Hristos.",
    wrongB: "Cine este sub har nu mai are nevoie nici de Lege, nici de pilda lui Isus.",
    explanation:
      "Omul a fost facut ca sa arate firea lui Dumnezeu. De aceea ne-a fost dat Duhul Sfant: ca sa aratam firea aceasta in viata de zi cu zi.",
    step: "Uita-te azi la o singura purtare a lui Isus si intreaba-te: unde as fi facut eu altfel?",
    prayer: "Doamne, nu vreau sa ma opresc la iertare. Vreau sa cresc pana ajung sa semăn cu Tine.",
    journal: "Ce ar vedea cineva despre Dumnezeu, uitandu-se la viata ta saptamana asta?",
    memory: "Sa facem om dupa chipul Nostru, dupa asemanarea Noastra.",
  }),
  make({
    id: "smer_l2",
    order: 2,
    title: "Smerenia in venirea lui Isus pe pamant",
    refs: ["Ioan 1:14", "Filipeni 2:5-8", "Iacov 4:6", "Matei 1:1-16"],
    ref: "Ioan 1:14",
    hook: "Marimea lui Dumnezeu nu se vede cel mai limpede in stele, ci in smerenia cu care a venit in chip de om.",
    word: "Si Cuvantul S-a facut trup si a locuit printre noi, plin de har si de adevar.",
    truth: [
      "Omul este in temeiul lui mandru. Suntem mandri de neam, de familie, de scoala, de infatisare, de destepaciune, de daruri, de pozitie, de casa, de masina, de prieteni cu greutate.",
      "Cand a venit Isus pe pamant, a luat locul cel mai de jos pe care il poate lua un om. A venit ca slujitor al tuturor, desi era Dumnezeu.",
      "El nu a venit cu un aer de binefacator care Se coboara la noi. S-a smerit ca sa fie una cu noi in toate. In smerenia aceasta este mai multa slava decat in toate minunile pe care le-a facut.",
      "In Isus nu a fost un atom de mandrie. Nu S-a impus niciodata oamenilor. Nu i-a facut niciodata sa se teama de El ca de unul cu mult mai presus, desi era mai presus de fiecare. Isi spunea Fiul omului: sunt doar un om obisnuit.",
      "Raul a intrat in univers prin Lucifer, care s-a mandrit cu intelepciunea si frumusetea lui. Dumnezeu sta impotriva celui mandru, oricare ar fi pricina mandriei. Cuvantul se impotriveste este opusul lui sprijina.",
      "Asa cum tot pacatul s-a nascut din mandria lui Lucifer, tot asa mantuirea s-a nascut din smerirea lui Isus. Sunt doua duhuri care lucreaza in lume: unul care urca si altul care coboara.",
      "De aceea poti sti cat de mult din gandul lui Hristos ai in tine: exact cat ai din smerenia Lui. Aceasta este masura cea mai sigura a cresterii duhovnicesti - nu cunoasterea Bibliei, nu multimea lucrarilor.",
      "Isus a coborat din cer si a devenit om. Dar nu S-a oprit acolo. Ca om, a refuzat sa fie imparat; cand au vrut sa-L faca imparat, a fugit. S-a facut slujitorul tuturor.",
      "Noi nu ne-am ales familia in care ne-am nascut, nici tara, nici imprejurarile. Un singur Om a putut alege: cand, unde si in ce familie Se naste. Si ce a ales? O familie saraca de tamplar, dintr-un oras cu nume prost, si un staul cu animale.",
      "A ales chiar si un sir de stramosi in care erau Tamar, Rahav, Rut si Bat-Seba. De ce a ales asemenea sir? Fiindca a vrut sa vina dedesubtul nostru, al tuturor, ca sa ne slujeasca.",
    ],
    wrongA: "Cresc duhovniceste pe masura ce stiu mai multa Biblie.",
    right: "Masura cresterii duhovnicesti este cresterea in smerenie.",
    wrongB: "Smerenia lui Isus se vede mai ales in minunile Lui.",
    explanation:
      "Sunt oameni care slujesc mult si sunt tot mai activi, dar nu cresc. Cine creste cu adevarat devine tot mai smerit.",
    step: "Fa azi un lucru marunt pentru cineva, fara sa fie nevoie sa afle nimeni.",
    prayer: "Doamne, scoate din mine duhul care vrea sa urce. Invata-ma sa cobor, ca Tine.",
    journal: "Cu ce te mandresti, desi nu ti-ai ales tu lucrul acela?",
    memory: "Cuvantul S-a facut trup si a locuit printre noi.",
  }),
  make({
    id: "smer_l3",
    order: 3,
    title: "Smerenia in viata Lui pamanteasca",
    refs: ["Filipeni 2:3", "Efeseni 3:8", "Ioan 13:4-5", "Luca 2:51"],
    ref: "Filipeni 2:3",
    hook: "Smerenia nu inseamna sa-i socotesti pe altii mai buni decat tine. Isus nu i-a socotit pe altii mai buni decat El - si totusi le-a spalat picioarele.",
    word: "Fiecare sa priveasca si la folosul altora, nu numai la al sau.",
    truth: [
      "Isus S-a facut una cu omul si nu S-a rusinat sa fie om. Nu Se rusineaza sa ne numeasca fratii Lui. Noi ne simtim uneori mai presus de altii: mai invatati, dintr-o clasa mai buna. Toate acestea vin din mandria care ne-a molipsit de la caderea lui Adam.",
      "El a venit dedesubtul tuturor, pentru ca numai asa putea fi slujitorul tuturor. Nu poti sluji pe cineva daca nu esti gata sa cobori sub el. Ca sa ridici pe cineva, trebuie sa te asezi sub el.",
      "Duhul Sfant a venit ca sa faca gandul nostru ca al lui Hristos. Aceasta nu este o teorie. Inseamna ca in gandul nostru sa nu ne mai socotim mai presus de niciun om, de orice neam sau religie ar fi.",
      "La ce te gandesti despre tine cand esti singur? Ca esti chipes, ca esti destept, ca ai avut norocul unei familii bune? Acolo se vede cat de mult gandesti ca Hristos si cat ca diavolul. Cand te compari cu altii si te socotesti mai presus, gandesti exact ce a gandit Lucifer inainte de a ajunge diavol.",
      "Scriptura nu spune sa-i socotim pe altii mai buni decat noi - asta ar insemna sa credem o minciuna. Cine a fost cel mai smerit Om de pe pamant? Isus. I-a socotit El pe altii mai buni decat El? Cum ar fi putut? Stia ca Iuda este un diavol.",
      "Scriptura spune sa-i socotim pe altii mai insemnati decat noi. Este cu totul altceva. Si Pavel, care le-a spus corintenilor ca sunt firesti, se socotea pe sine cel mai neinsemnat dintre toti sfintii.",
      "De aceea a luat Isus ligheanul si a spalat picioarele ucenicilor. In vremea aceea, acela era lucrul robului. Ucenicii s-au gandit fiecare: nu eu. Petru poate ca s-a gandit ca el va fi conducatorul. Matei poate ca s-a gandit ca este un om cu carte.",
      "Nu era o prefacatorie. Sunt oameni care joaca smerenie ca sa se vada ca sunt smeriti - aceea este fatarnicie si Dumnezeu o uraste.",
      "Aceasta este smerenia adevarata: sa iei locul de a nu fi nimic inaintea lui Dumnezeu. Doamne, sunt nimic; tot ce sunt, Tu m-ai facut. Daca esti destept, cine te-a facut destept?",
      "Te puteai naste cu mintea slaba, cu trupul slabit, cu o boala din nastere. Ce ai fi fost atunci? Ce ai tu, si sa nu fi primit? Numai un om fara minte este mandru.",
      "Si Isus, desavarsit si fara pacat, a stat treizeci de ani supus lui Iosif si Mariei, care nu erau desavarsiti. Nu ne vine usor sa ne supunem cuiva mai prejos decat noi. Dar cine este cu adevarat smerit nu are nicio greutate: se supune oricui, fiindca stie ca nu este nimic.",
    ],
    wrongA: "Smerenia inseamna sa-i crezi pe toti mai buni decat tine.",
    right: "Smerenia inseamna sa-i socotesti pe altii mai insemnati si sa fii nimic inaintea lui Dumnezeu.",
    wrongB: "Cine este mai desavarsit trebuie sa fie ascultat, nu sa asculte.",
    explanation:
      "Isus n-a socotit pe nimeni mai sfant decat El, dar i-a tratat pe toti ca fiind mai insemnati. Asta a facut cu ligheanul in mana.",
    step: "Supune-te azi, fara sa comentezi, cuiva pe care il socotesti mai prejos decat tine.",
    prayer: "Doamne, arata-mi gandurile pe care le am despre mine cand sunt singur si curata-le.",
    journal: "Fata de cine te simti mai presus? Spune-i lui Dumnezeu.",
    memory: "Fiecare sa priveasca si la folosul altora, nu numai la al sau.",
  }),
  make({
    id: "smer_l4",
    order: 4,
    title: "Smerenia in moartea Lui",
    refs: ["Ioan 13:14-17", "Matei 26:38", "Isaia 53:12", "Luca 16:15"],
    ref: "Ioan 13:17",
    hook: "Ce a facut Isus in seara aceea cu ligheanul? A vazut o nevoie si a facut o treaba murdara pentru ai Lui. Atat.",
    word: "Daca stiti aceste lucruri, ferice de voi daca le faceti.",
    truth: [
      "Multi au inteles porunca de a ne spala picioarele unii altora ca pe o randuiala de tinut, chiar si cand picioarele sunt in sosete si ciorapi curati. Asa devine un obicei fara inteles.",
      "Ce a facut de fapt Isus? A implinit o nevoie trupeasca a lor, facand o treaba murdara pentru ei. Deci ce ne-a spus sa facem? Sa fim gata sa facem treburile murdare unii pentru altii, acolo unde este nevoie. Intr-o sala de adunare, spalarea picioarelor de azi ar fi sa cureti tu toaleta.",
      "Nu-ti face griji daca altii nu traiesc asa. Nu-i judeca. Nu este treaba noastra. Dar tu poti trai asa. Isus a spus: daca stiti aceste lucruri, ferice de voi daca le faceti - nu daca doar va ganditi la ele.",
      "Nu esti fericit cand stai ca un stapan pe scaun si-i pui pe altii sa te slujeasca. Daca vrei cu adevarat sa fii fericit, fii slujitor.",
      "Isus S-a apropiat de cei de la treapta cea mai de jos a societatii si a umblat printre ei ca un egal. Si nu numai de cei de jos ca stare, ci si de cei de jos ca purtare: curve, betivi, inselatori. Era fara pacat si totusi Se amesteca printre ei.",
      "Nu S-a temut ca I se va spune ca este prieten cu pacatosii. Si niciodata n-a facut vreun pacatos sa se simta stanjenit prin sfintenia Lui. Acesta este un semn al omului smerit: langa el te simti in largul tau, desi el este curat.",
      "Fariseii nu erau asa. Erau teapani si nu lasau pe nimeni sa se apropie, fiindca se socoteau prea sfinti.",
      "In Ghetsimani a fost sub o apasare grea. Ce face atunci? Nu Se poarta ca unul care nu are nevoie de nimeni. Ii cheama pe Petru, Iacov si Ioan si le cere sa se roage cu El. Un om mandru nu cere nimanui sa se roage cu el.",
      "De ce s-a aratat puterea lui Dumnezeu asa de mare in viata lui Isus? Fiindca a recunoscut ca este nimic. A trait inaintea Tatalui ca nimic - si Tatal a putut sa-Si arate toata puterea prin El.",
      "La judecata si la moartea Lui nu I s-a facut niciodata dreptate. A fost umilit, batjocorit, luat in ras. Si n-a chemat ingerii, desi putea chema douasprezece legiuni.",
      "Toata viata Si-a deschis palmele ca sa dea altora. Si la sfarsit Si-a deschis palmele ca sa primeasca piroanele. Asa vrea Dumnezeu sa traim: cu palma deschisa, nu cu pumnul stran s.",
      "Aceasta este crestinismul adevarat. Nu este ceva mare si laudat. Ce este inalt in ochii oamenilor este uraciune inaintea lui Dumnezeu.",
    ],
    wrongA: "Spalarea picioarelor este o randuiala de tinut la adunare.",
    right: "Este chemarea de a face treburile murdare pentru altii, acolo unde vezi o nevoie.",
    wrongB: "Un om duhovnicesc nu are nevoie sa ceara altora sa se roage cu el.",
    explanation:
      "Isus a vazut o nevoie si a implinit-o. Fericirea vine din facerea lucrului, nu din gandirea despre el.",
    step: "Fa azi treaba pe care nimeni nu vrea sa o faca, si nu spune nimanui.",
    prayer: "Doamne, fa-ma sa cobor. Deschide-mi palma sa dau, in loc sa apuc.",
    journal: "Ce treaba murdara ai evitat, socotind ca nu este de nivelul tau?",
    memory: "Daca stiti aceste lucruri, ferice de voi daca le faceti.",
  }),
]
