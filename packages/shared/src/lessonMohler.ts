import type { Course, Lesson, Module } from "./domain.js"
import type { SeedBundle } from "./seed.js"

/*
 * Lecție pilot — „N-ai fost făcut pentru tine”.
 *
 * Conversie de FORMAT, nu de conținut: liniile tari rămân tari, în cuvintele
 * predicatorului. Nu se atenuează, nu se adaugă ieșiri consolatoare.
 *
 * Sursă: Dan Mohler — „The Heart of Authentic Christianity: Knowing God and
 * Living His Love”. STATUT JURIDIC: NEREZOLVAT. Lecția e pentru testare internă;
 * nu se publică fără permisiune scrisă sau fără rescrierea povestirilor.
 *
 * Scrisă în tipurile EXISTENTE (LessonStep), ca să ruleze azi în LessonPlayer.
 * Limitări cunoscute ale motorului, de rezolvat separat:
 *  - nu există `poll` (întrebare fără răspuns corect) → folosim `choice`;
 *  - quiz-ul are o singură `explanation`, nu feedback per opțiune;
 *  - playerul ține un singur text de jurnal → o singură întrebare deschisă/lecție;
 *  - nu există scriere în memorie din răspunsuri.
 */

const LESSON_ID = "mohler_l1"
const COURSE_ID = "mohler_c1"
const MODULE_ID = "mohler_m1"

const mod: Module = {
  id: MODULE_ID,
  categoryId: "doctrine",
  order: 90,
  title: "N-ai fost făcut pentru tine",
  axis: "character",
  courseIds: [COURSE_ID],
}

const course: Course = {
  id: COURSE_ID,
  moduleId: MODULE_ID,
  order: 1,
  title: "N-ai fost făcut pentru tine",
  struggle: "Merg la biserică de ani de zile și nu s-a schimbat nimic.",
  truth: "Nu oamenii trebuie să se schimbe ca să-ți fie bine. Tu n-ai fost făcut pentru tine.",
  lessonIds: [LESSON_ID],
}

const lesson: Lesson = {
  id: LESSON_ID,
  courseId: COURSE_ID,
  order: 1,
  title: "N-ai fost făcut pentru tine",
  estMinutes: 11,
  anchorRefs: [
    "Proverbe 14:12",
    "Luca 9:23",
    "Luca 14:33",
    "Psalm 23:1",
    "Luca 23:34",
    "Matei 25:31-46",
    "Galateni 2:20",
  ],
  memoryVerseRef: "Galateni 2:20",
  steps: [
    {
      id: "m_s1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Salut. Sunt Daniel. Înainte de orice — cum ești azi?" }],
    },
    {
      id: "m_s2",
      type: "choice",
      order: 2,
      choice: {
        prompt: "Cine te calcă pe nervi cel mai tare zilele astea?",
        options: [
          { id: "acasa", label: "Cineva de acasă" },
          { id: "munca", label: "Cineva de la muncă" },
          { id: "biserica", label: "Cineva din biserică" },
          { id: "toti", label: "Toată lumea, în ultima vreme" },
        ],
      },
    },
    {
      id: "m_s3",
      type: "hook",
      order: 3,
      bubbles: [
        { from: "guide", text: "Ține minte răspunsul. Peste zece minute îți spun ce înseamnă de fapt." },
      ],
    },
    {
      id: "m_s4",
      type: "name_struggle",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Dacă oamenii îți intră sub piele, nu-ți trebuie alți oameni. Îți trebuie piele nouă. Și aia se ia în rugăciune.",
        },
        { from: "guide", text: "Dacă te calcă pe nervi, ia-ți alți nervi." },
      ],
    },
    {
      id: "m_s5",
      type: "name_struggle",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Nu te mai ruga doar ca oamenii să se schimbe. Nu-ți căuta altă slujbă — o să găsești acolo exact ce te deranja aici.",
        },
        {
          from: "guide",
          text: "De dependență nu fugi. Te muți în alt oraș și te trezești că te-ai mutat lângă un dealer.",
        },
      ],
    },
    {
      id: "m_s6",
      type: "truth_simple",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Nu poți fugi de lucruri. Trebuie să fii eliberat de ele. Nu poți fugi de oameni — sunt oameni peste tot.",
        },
        { from: "guide", text: "Nu e vorba ca cineva să se schimbe. E vorba ca tu să devii ignifug." },
      ],
    },
    {
      id: "m_s7",
      type: "choice",
      order: 7,
      choice: {
        prompt: "Ce ai încercat până acum?",
        options: [
          { id: "loc", label: "Am schimbat locul" },
          { id: "taiat", label: "Am tăiat oamenii din viață" },
          {
            id: "rugat",
            label: "M-am rugat ani de zile să se schimbe el",
            branchStepId: "m_branch_rugat",
          },
          { id: "rabdat", label: "Am răbdat și atât" },
        ],
      },
    },
    {
      id: "m_branch_rugat",
      type: "name_struggle",
      order: 7,
      bubbles: [
        { from: "guide", text: "Și tot acolo ești." },
        { from: "guide", text: "Ține minte asta. Ne întoarcem la ea mai încolo, și n-o să-ți placă." },
      ],
    },
    {
      id: "m_s8",
      type: "world_vs_truth",
      order: 8,
      bubbles: [
        { from: "guide", text: "Toate patru duc în același loc. Pentru că niciuna nu atinge problema." },
      ],
    },
    {
      id: "m_s9",
      type: "scripture",
      order: 9,
      scripture: { text: "Multe căi i se par bune omului, dar la urmă duc la moarte.", ref: "Proverbe 14:12" },
    },
    {
      id: "m_s10",
      type: "world_vs_truth",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "Oamenii trăiesc din «mi se pare». Vorbesc din «mi se pare». Judecă din «mi se pare». Nu știu nimic, dar li se pare, și asta le e de-ajuns ca să verse peste tine ce au înăuntru.",
        },
        { from: "guide", text: "Și dacă ce spun ei te mișcă, întreabă-te de ce." },
      ],
    },
    {
      id: "m_s11",
      type: "truth_simple",
      order: 11,
      bubbles: [
        {
          from: "guide",
          text: "Dacă Îl cunoști, nu te mișcă. Dacă tot ce ai e teologie, te mișcă. Dacă trăiești pentru tine, te mișcă. E un barometru bun.",
        },
      ],
    },
    {
      id: "m_s12",
      type: "hook",
      order: 12,
      bubbles: [
        {
          from: "guide",
          text: "Singurul mod în care te schimbi e chemarea lui Iisus. Și chemarea Lui nu a fost «dacă mori la noapte și nu știi unde te duci, spune rugăciunea asta după mine».",
        },
      ],
    },
    {
      id: "m_s13",
      type: "scripture",
      order: 13,
      scripture: {
        text: "Dacă voiește cineva să vină după Mine, să se lepede de sine, să-și ia crucea în fiecare zi și să Mă urmeze.",
        ref: "Luca 9:23",
      },
    },
    {
      id: "m_s14",
      type: "scripture",
      order: 14,
      scripture: {
        text: "Oricine dintre voi care nu se leapădă de tot ce are nu poate fi ucenicul Meu.",
        ref: "Luca 14:33",
      },
    },
    {
      id: "m_s15",
      type: "quiz",
      order: 15,
      quiz: {
        question: "Care a fost chemarea lui Iisus?",
        options: [
          { text: "Spune rugăciunea asta și ajungi în cer", correct: false },
          { text: "Socotește cheltuiala. Pune mâna pe plug. Nu te uita înapoi", correct: true },
          { text: "Vino duminica și ține-te de reguli", correct: false },
        ],
        explanation:
          "Rugăciunea aia are optzeci, poate o sută de ani. Nu e a Lui. El a spus: socotește cheltuiala.",
      },
    },
    {
      id: "m_s16",
      type: "world_vs_truth",
      order: 16,
      bubbles: [
        { from: "guide", text: "Milioane merg la biserică. Milioane Îi laudă Numele. Milioane citează Cuvântul." },
        { from: "guide", text: "Dar Biblia spune că puțini găsesc drumul ăsta îngust." },
      ],
    },
    {
      id: "m_s17",
      type: "truth_simple",
      order: 17,
      bubbles: [
        {
          from: "guide",
          text: "Și dacă mergi pe alt drum, nu te mira că ți-e rezervorul gol. Dumnezeu nu-ți pune benzină în mașină ca să mergi pe un drum pentru care nu te-a făcut.",
        },
        { from: "guide", text: "De asta te chinui în viață." },
      ],
    },
    {
      id: "m_s18",
      type: "hook",
      order: 18,
      bubbles: [
        {
          from: "guide",
          text: "Un cuptor cu microunde e făcut pentru un lucru anume. Încinge mâncarea, repede, cu unde. Nu e cuptor normal.",
        },
        {
          from: "guide",
          text: "Dar pui metal înăuntru — o folie, o furculiță sub fasole — și ai reacție. Îl arunci în aer. Nu pentru că e stricat. Pentru că nu a fost făcut pentru asta.",
        },
      ],
    },
    {
      id: "m_s19",
      type: "truth_simple",
      order: 19,
      bubbles: [
        {
          from: "guide",
          text: "Citește manualul fabricantului pentru viață și o să găsești că omul n-a fost niciodată făcut pentru el însuși.",
        },
        { from: "guide", text: "Bagi egoismul în produs și ai reacție. Și-l arunci în aer." },
      ],
    },
    {
      id: "m_s20",
      type: "scripture",
      order: 20,
      scripture: { text: "Domnul este Păstorul meu: nu voi duce lipsă de nimic.", ref: "Psalm 23:1" },
    },
    {
      id: "m_s21",
      type: "name_struggle",
      order: 21,
      bubbles: [
        {
          from: "guide",
          text: "Uite cum îți dai seama dacă e nevoie sau poftă. Când nevoia ta îți dictează dispoziția. Când îți schimbă felul în care vorbești și cine ești în casă.",
        },
        { from: "guide", text: "Atunci s-a făcut poftă." },
      ],
    },
    {
      id: "m_s22",
      type: "world_vs_truth",
      order: 22,
      bubbles: [
        {
          from: "guide",
          text: "«N-aș fi așa dacă el n-ar face.» «Dacă ea s-ar schimba, mi-ar fi ușor.» Și chiar crezi că, dacă partenerul tău ar trăi altfel, ai fi bine.",
        },
        { from: "guide", text: "Nu. S-ar rezolva pentru moment. Lucrul ăla ar rămâne în tine." },
      ],
    },
    {
      id: "m_s23",
      type: "hook",
      order: 23,
      bubbles: [
        {
          from: "guide",
          text: "Soția predicatorului s-a rugat treisprezece ani ca el să se schimbe, pe când trăia numai pentru el. La un moment dat a renunțat la el și a renunțat și la Dumnezeu.",
        },
        {
          from: "guide",
          text: "Când el s-a născut din nou, ea s-a luptat cu el cu dinții și cu unghiile pentru exact lucrul pentru care se rugase treisprezece ani.",
        },
      ],
    },
    {
      id: "m_s24",
      type: "name_struggle",
      order: 24,
      bubbles: [
        { from: "guide", text: "Și Domnul i-a spus așa: «Ai fost redusă la încă o soție rănită care se roagă.»" },
        {
          from: "guide",
          text: "Te rogi pentru el pentru că, dacă Îl schimb Eu, ție îți merge ziua mai bine. Nu te rogi pentru că îl iubești. Nu pentru că ți-e milă că e înșelat și nu știe cine e.",
        },
      ],
    },
    {
      id: "m_s25",
      type: "truth_simple",
      order: 25,
      bubbles: [{ from: "guide", text: "Te rogi pentru că te doare pe tine." }],
    },
    {
      id: "m_s26",
      type: "world_vs_truth",
      order: 26,
      bubbles: [
        { from: "guide", text: "E o diferență uriașă între a te durea din cauza cuiva și a te durea pentru cineva." },
        { from: "guide", text: "Noi am învățat să ne doară din cauza oamenilor. Și ăsta e egoism." },
      ],
    },
    {
      id: "m_s27",
      type: "scripture",
      order: 27,
      scripture: { text: "Tată, iartă-i, căci nu știu ce fac.", ref: "Luca 23:34" },
    },
    {
      id: "m_s28",
      type: "truth_simple",
      order: 28,
      bubbles: [
        {
          from: "guide",
          text: "Nimeni n-a fost tratat cu mai multă nedreptate decât El. Și tot ce a găsit de spus a fost: iartă-i, nu știu cine sunt și nu știu ce fac.",
        },
        {
          from: "guide",
          text: "Oamenii de care te-a durut — dacă ar fi știut cine sunt, dacă ar fi fost plini de Duhul lui Dumnezeu, ți-ar fi făcut ce ți-au făcut?",
        },
      ],
    },
    {
      id: "m_s29",
      type: "name_struggle",
      order: 29,
      bubbles: [
        {
          from: "guide",
          text: "N-o să-ți duci niciodată crucea dacă totul e despre tine și despre cum te simți. Tot ce o să faci e să gravitezi spre oameni care îți înțeleg sentimentele.",
        },
        { from: "guide", text: "O să le zici prieteni. O să le zici grup de sprijin." },
        {
          from: "guide",
          text: "Îți spun eu ce sprijină. Sprijină să rămâi exact așa și îți garantează încă douăzeci și cinci de ani de rănit.",
        },
      ],
    },
    {
      id: "m_s30",
      type: "how_god_helps",
      order: 30,
      bubbles: [
        {
          from: "guide",
          text: "Ți-ar trebui oameni care te iubesc destul cât să-ți spună adevărul. «De ce lași lucrul ăsta să conteze atât de mult? Știu că au greșit. Dar de ce ești așa de nevoiaș?»",
        },
        { from: "guide", text: "Pentru că și dacă și-ar cere iertare, tot nu ți-ar ajunge." },
      ],
    },
    {
      id: "m_s31",
      type: "hook",
      order: 31,
      bubbles: [
        {
          from: "guide",
          text: "Un pastor l-a chemat să predice fără să-l fi ascultat vreodată. După slujbă, în mașină, era o tăcere rea.",
        },
        {
          from: "guide",
          text: "«Mă deranjează ce ai spus. Că nu ai dulapuri în viața ta, că nu ai secrete. Frate, e arogant. Toți avem lucrurile noastre.»",
        },
        { from: "guide", text: "«Singurul motiv pentru care crezi asta e că aia e viața ta. Deci care e lucrul tău?»" },
      ],
    },
    {
      id: "m_s32",
      type: "name_struggle",
      order: 32,
      bubbles: [
        { from: "guide", text: "Pornografie zilnică, de pe calculatorul din biroul bisericii." },
        { from: "guide", text: "Și știi cum își explicase? «E țeapa din carnea mea, ca să mă țină smerit.»" },
        {
          from: "guide",
          text: "Atât de departe poate ajunge minciuna. Până acolo încât nu mai auzi Cuvântul și nu mai poți nici măcar să înțelegi povestea altcuiva, pentru că nu e a ta.",
        },
      ],
    },
    {
      id: "m_s33",
      type: "how_god_helps",
      order: 33,
      bubbles: [
        {
          from: "guide",
          text: "În mașină, omul ăla a plâns cât nu văzuse predicatorul un bărbat plângând în viața lui. Seara a bătut la ușa camerei de oaspeți și a stat de vorbă până târziu. Și s-a ridicat de acolo restaurat.",
        },
      ],
    },
    {
      id: "m_s34",
      type: "hook",
      order: 34,
      bubbles: [
        {
          from: "guide",
          text: "Un bărbat i-a spus: «Frate, nu mă simt condus să fac asta acum.» Nu se simțea condus să-și iubească nevasta — zicea că ar răsfăța-o și că acum îi trebuie iubire dură.",
        },
        {
          from: "guide",
          text: "Predicatorul e pescar. Ține în sertar o greutate de plumb de la undiță. I-a deschis palma și i-a strâns degetele peste ea.",
        },
        { from: "guide", text: "«Acum, că ai simțit plumbul, hai să mergem mai departe cu Dumnezeu și să lăsăm prostiile.»" },
      ],
    },
    {
      id: "m_s35",
      type: "truth_simple",
      order: 35,
      bubbles: [{ from: "guide", text: "Oamenii știu exact atâta Biblie cât să se convingă singuri de o minciună." }],
    },
    {
      id: "m_s36",
      type: "hook",
      order: 36,
      bubbles: [
        { from: "guide", text: "Fiul lui a plecat în droguri. A fugit mult timp, nu răspundea, era sub condamnare." },
        {
          from: "guide",
          text: "Și noi ce zicem? «Ce-o să zică lumea? Că n-am știut să fim părinți. Băiatul ăsta ne face de rușine numele.» Deci tot despre noi era.",
        },
      ],
    },
    {
      id: "m_s37",
      type: "truth_simple",
      order: 37,
      bubbles: [
        {
          from: "guide",
          text: "Pilda fiului risipitor n-ar fi nimic fără tatăl din ea. Ar fi doar un băiat care a plecat și și-a tocat moștenirea. Tatăl face povestea.",
        },
        {
          from: "guide",
          text: "Când a bătut băiatul la ușă, n-a trebuit să se gândească la nimic. I-a văzut fața și i s-a umplut inima de căldură: «Bună, băiatule. Ce bine că te văd.»",
        },
      ],
    },
    {
      id: "m_s38",
      type: "world_vs_truth",
      order: 38,
      bubbles: [
        {
          from: "guide",
          text: "În pilda oilor și a caprelor, diferența n-a fost că un grup a spus rugăciunea păcătosului și celălalt nu. Nici că unii mergeau la biserică.",
        },
        {
          from: "guide",
          text: "Un grup a văzut nevoia omului de lângă el și a ieșit din drumul lui pentru ea. Celălalt grup nici măcar n-a văzut nevoia.",
        },
      ],
    },
    {
      id: "m_s39",
      type: "truth_simple",
      order: 39,
      bubbles: [
        { from: "guide", text: "Ținta nu e cerul. Ținta e cerul în tine." },
        { from: "guide", text: "Creștin nu înseamnă că merg la biserică. Creștin înseamnă mic Hristos." },
      ],
    },
    {
      id: "m_s40",
      type: "name_struggle",
      order: 40,
      bubbles: [
        { from: "guide", text: "De ce e așa de greu să renunți la ceva pentru care n-ai fost creat niciodată?" },
        {
          from: "guide",
          text: "Dumnezeu l-a întrebat pe Adam: ai mâncat din pom? Și Adam a zis: femeia pe care mi-ai dat-o Tu. Adică: dacă nu-mi dădeai femeia, probabil nu mâncam. Nu te uita la mine.",
        },
        {
          from: "guide",
          text: "Asta face egoismul. Face un motiv și o scuză, arată spre orice altceva și nu-și asumă niciodată nimic.",
        },
      ],
    },
    {
      id: "m_s41",
      type: "step",
      order: 41,
      bubbles: [
        {
          from: "guide",
          text: "Azi te rogi o singură rugăciune. Nu îți ceri nimic. «Duhule Sfânt, în orice fel în care viața mea e încă despre mine, arată-mi. Nu mă cruța.»",
        },
        { from: "guide", text: "Și pe urmă stai și ascultă." },
      ],
    },
    {
      id: "m_s42",
      type: "memory_verse",
      order: 42,
      scripture: {
        text: "Am fost răstignit împreună cu Hristos, și trăiesc… dar nu mai trăiesc eu, ci Hristos trăiește în mine.",
        ref: "Galateni 2:20",
      },
    },
    {
      id: "m_s43",
      type: "prayer",
      order: 43,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, cer o descoperire a egoismului din mine. Nu ca să mă acuz, ci ca să-l văd exact așa cum e. Și să fug de el. Dacă sunt răni vechi în urma mea, ajută-mă să le văd așa: dacă oamenii aceia ar fi știut ce fac, n-ar fi făcut ce au făcut. Și am terminat cu găsitul identității mele în lucrurile alea. Amin.",
        },
      ],
    },
    {
      id: "m_s44",
      type: "journal",
      order: 44,
      journalPrompt: "Ce ți-a arătat?",
      reward: { xp: 10, axisDeltas: { character: 1 } },
    },
  ],
}

export const mohlerNotForMe: SeedBundle = { module: mod, course, lessons: [lesson] }
