import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 3 din docs/41-module-teme-poonen.md:
 * "Cuvântul: hrană, armă și înnoirea minții". Temele 10-12.
 *
 * Sursa: Zac Poonen, "Basic Christian Teachings", capitolele 10-12 (cfcindia.com).
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

const COURSE_ID = "teme_c3_cuvantul"

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
        prompt: "Cum stă treaba la tine cu Cuvântul?",
        options: [
          { id: `${p}c1`, label: "Aproape că nu îl deschid." },
          { id: `${p}c2`, label: "Îl citesc, dar nu mă schimbă." },
          { id: `${p}c3`, label: "Vreau să fie hrana mea zilnică." },
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
        "Duhul Sfânt Se mișcă, și Cuvântul iese: așa lucrează Dumnezeu de la Geneza 1 până azi.",
        "Nu ești lăsat să te schimbi singur, prin puterea voinței tale.",
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

export const CUVANTUL_HRANA_SI_ARMA_LESSONS: Lesson[] = [
  make({
    id: "cuvant_l1",
    order: 1,
    title: "Cuvântul lui Dumnezeu este hrana noastră",
    refs: ["1 Petru 1:23", "1 Petru 2:2", "Matei 4:4"],
    ref: "1 Petru 2:2",
    hook: "Mulți oameni, după ce și-au încurcat viața, își doresc să o poată lua de la capăt. Exact asta îți oferă Dumnezeu când spune: poți să te naști din nou.",
    word: "Ca niște prunci născuți de curând, să doriți laptele duhovnicesc și curat, pentru ca prin el să creșteți spre mântuire.",
    truth: [
      "Gândiți-vă ce ar însemna să vă începeți viața din nou, ca un prunc, fără niciun cazier al eșecurilor din trecut, totul șters. Asta înseamnă nașterea din nou.",
      "Nașterea aceasta nouă vine printr-o sămânță, la fel cum nașterea trupească a început cu sămânța tatălui tău. Aici, sămânța este Cuvântul lui Dumnezeu: ai crezut Cuvântul care spunea că Hristos a murit pentru păcatele tale.",
      "Apoi același Cuvânt, care a fost sămânță, devine lapte pentru pruncul nou-născut. Dumnezeu nu ne-a iertat păcatele doar ca să ne ducă în cer. Vrea să creștem și să fim tot mai izbăviți de stricăciunea pe care am moștenit-o: egoism, mândrie, aroganță, amărăciune, gelozie, răutate.",
      "Lucrurile acestea nu dispar în clipa nașterii din nou. Viața cea nouă are puterea să le biruiască, dar puterea aceea trebuie folosită ca să crească.",
      "Un prunc are în el putința de a ajunge un om puternic. Dar nu va crește dacă nu mănâncă. Mulți creștini cred că odată iertate păcatele și primit Duhul, asta e tot. Abia te-ai născut. Un prunc lăsat așa moare.",
      "Unul dintre primele lucruri pe care le face un prunc este că plânge. Din ziua dintâi tânjește după lapte, și țipă după el. Așa strigă un creștin adevărat după Cuvântul lui Dumnezeu. Dacă un prunc nu plânge așa, spunem că este bolnav sau că e pe moarte.",
      "În Geneza 1, pământul era pustiu, gol și întunecat. Aceasta este și starea omului. Dar Duhul Se mișcă deasupra apelor, și Dumnezeu a zis. Așa lucrează Dumnezeu și azi: Duhul Se mișcă, și Cuvântul iese. Nu a făcut totul într-o zi, ci în șase. Așa lucrează și în noi, zi după zi.",
    ],
    wrongA: "După iertarea păcatelor nu mai am mult de făcut.",
    right: "Nașterea din nou este începutul; creșterea vine prin hrănirea zilnică din Cuvânt.",
    wrongB: "Creșterea vine de la sine, cu timpul.",
    explanation:
      "Omul dinăuntru se înnoiește din zi în zi, spune Scriptura. Nu într-o zi, ci zi după zi, ca în cele șase zile ale creației.",
    step: "Hotărăște ora și locul în care vei citi mâine din Cuvânt, ca la o masă la oră fixă.",
    prayer: "Doamne, dă-mi foamea unui prunc după laptele Cuvântului Tău. Hrănește-mă și fă-mă să cresc.",
    journal: "De câte zile nu te-ai hrănit din Cuvânt? Ce ai pus în locul lui?",
    memory: "Doriți laptele duhovnicesc și curat, ca prin el să creșteți.",
  }),
  make({
    id: "cuvant_l2",
    order: 2,
    title: "Cuvântul ne ajută să-l biruim pe Satana",
    refs: ["Efeseni 6:17", "Ioan 6:37", "Evrei 8:12", "Romani 5:1"],
    ref: "Ioan 6:37",
    hook: "Mulți credincioși trăiesc sub o osândă și o vinovăție pe care Dumnezeu nu le-a dat-o niciodată. De unde vin ele și cu ce se alungă?",
    word: "Pe cel ce vine la Mine, nu-l voi izgoni afară.",
    truth: [
      "Cuvântul lui Dumnezeu este sabia Duhului. Este arma cu care Satana este alungat.",
      "Nu poți sta la discuție cu Satana. Eva a stat de vorbă cu el și a căzut. Isus nu a discutat: a citat Scriptura, de trei ori, și diavolul a plecat de la El.",
      "Poonen își spune mărturia: din copilărie a trăit ani de îndoială, întrebându-se dacă Dumnezeu l-a primit. Apoi a crezut Cuvântul din Ioan 6:37 - pe cel ce vine la Mine nu-l voi izgoni afară. Spune că a fost ca și cum ar fi lăsat o ancoră, și de peste treizeci și opt de ani nu s-a mai clătinat din locul acela.",
      "Dumnezeu spune: nu-Mi voi mai aduce aminte de păcatele lor. Dacă cineva ți-ar ucide copilul și l-ai ierta din inimă, tot ți-ai aduce aminte de faptă ori de câte ori l-ai vedea. Dumnezeu nu este așa. El nu-Și mai aduce aminte.",
      "Mai mult decât atât: Dumnezeu nu numai că iartă, ci și îndreptățește. Te declară neprihănit. Este deosebirea dintre un judecător care spune ești iertat și unul care spune nu ești deloc vinovat, du-te acasă. Primul iese cu capul plecat; al doilea iese cu capul sus.",
      "Când ești îndreptățit, Dumnezeu te îmbracă cu bunătatea lui Hristos, ca pe o haină. Cum arăți îmbrăcat cu bunătatea lui Hristos? Desăvârșit.",
      "Cu acestea reziști celui rău. Spune cu gura ta: sunt primit, sunt iertat, Dumnezeu nu-Mi mai ține socoteala trecutului, sunt îndreptățit, sunt îmbrăcat cu bunătatea lui Hristos și sunt tot atât de prețios înaintea lui Dumnezeu cât este Isus Însuși.",
    ],
    wrongA: "Când Satana mă acuză, trebuie să-i explic și să mă apăr.",
    right: "Nu se discută cu el; i se răspunde cu Cuvântul, cum a făcut Isus.",
    wrongB: "Orice vinovăție pe care o simt vine de la Dumnezeu.",
    explanation:
      "Aici stă problema: la a crede. Este scris îndreptățiți prin credință. Dacă nu crezi ce spune Dumnezeu despre tine, adevărul acela nu lucrează în tine.",
    step: "Învață pe de rost Ioan 6:37 și rostește-l cu voce tare data viitoare când te acuză gândurile.",
    prayer: "Doamne, cred că nu mă izgonești. Mulțumesc că mă îmbraci cu bunătatea lui Hristos.",
    journal: "Ce acuzație veche îți revine mereu în minte și cu ce verset o vei întâmpina?",
    memory: "Pe cel ce vine la Mine, nu-l voi izgoni afară.",
  }),
  make({
    id: "cuvant_l3",
    order: 3,
    title: "Cuvântul ne înnoiește mintea",
    refs: ["Romani 12:2", "Ioan 1:18", "Evrei 8:11"],
    ref: "Romani 12:2",
    hook: "N-ar fi minunat să poți ști ce gândește Dumnezeu despre problema ta și despre rezolvarea ei?",
    word: "Să nu vă potriviți chipului veacului acestuia, ci să vă prefaceți prin înnoirea minții voastre, ca să puteți deosebi bine voia lui Dumnezeu: cea bună, plăcută și desăvârșită.",
    truth: [
      "Înnoirea minții înseamnă că mintea noastră începe să gândească așa cum gândește Dumnezeu.",
      "Când mintea nu ne este înnoită, chiar dacă suntem născuți din nou și iertați, putem gândi în continuare exact ca oamenii lumii despre bani, despre femei frumoase, despre avere, despre poziție și cinste și despre dușmanii noștri.",
      "A fi prefăcut înseamnă a fi schimbat în asemănarea lui Hristos. Nu la înfățișare - Dumnezeu nu Se ocupă să ne facă să arătăm ca Isus. Se ocupă de caracterul dinăuntru.",
      "Dacă vrei să știi cum gândește Dumnezeu, citește Biblia. Ce gândește Dumnezeu despre bani, despre adulter, despre furt, despre înșelăciune, despre gelozie, despre mândrie - răspunsul este acolo.",
      "Când Isus a venit pe pământ, a fost numit Cuvântul lui Dumnezeu, și Cuvântul S-a făcut trup. În Vechiul Testament aveau Cuvântul în formă scrisă, pe table de piatră și pe suluri. Când a venit Isus, am avut Cuvântul în formă omenească. Este mult mai ușor de citit așa.",
      "Când ajungi la o răscruce și nu știi ce să faci: dacă în anii dinainte ai lăsat Duhul să-ți schimbe felul de a gândi prin Cuvânt, vei putea deosebi voia lui Dumnezeu. Dacă ai fost un creștin nepăsător, vei ajunge la criză fără să știi încotro.",
      "În Vechiul Testament, singurul care știa voia lui Dumnezeu era prorocul, și prorocii adevărați erau rari. Astăzi, fiindcă Duhul Sfânt locuiește în noi, nu mai trebuie să alergi la un proroc, la un pastor sau la un bătrân ca să afli voia lui Dumnezeu.",
      "Nu aștepta să vină criza ca să începi să-L cauți pe Dumnezeu. Unii se întorc la El doar la necaz, iar când lucrurile merg bine, uită până la următoarea criză. Asemenea credincioși nu cresc.",
    ],
    wrongA: "Voia lui Dumnezeu se află întrebându-l pe pastor la criză.",
    right: "Mintea înnoită din vreme, prin Cuvânt, deosebește singură voia lui Dumnezeu la răscruce.",
    wrongB: "Voia lui Dumnezeu se află prin semne și întâmplări.",
    explanation:
      "A alerga la un om înțelept la fiecare hotărâre este calea Vechiului Testament. Nouă ni s-a dat Duhul, ca să cunoaștem gândul lui Dumnezeu dinăuntru.",
    step: "Citește azi un capitol din Evanghelii și scrie un singur lucru despre cum a gândit și a reacționat Isus într-o situație.",
    prayer: "Duhule al lui Dumnezeu, arată-mi slava lui Isus în Scriptură și schimbă-mă după chipul acela.",
    journal: "Într-o privință anume - bani, cinste, dușmani - gândești ca lumea sau ca Dumnezeu?",
    memory: "Prefaceți-vă prin înnoirea minții voastre.",
  }),
]
