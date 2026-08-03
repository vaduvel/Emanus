import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 6 din docs/41-module-teme-poonen.md: "De ce dam gres".
 * Scris in romana, cu firul doctrinar pastrat, fara traducere sau copiere din sursa.
 * Stare: in_review. Nu devine public inaintea reviziei umane finale.
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

const COURSE_ID = "teme_c6_esec"

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
        prompt: "Unde te regasesti acum?",
        options: [
          { id: `${p}c1`, label: "Am renuntat sa mai incerc." },
          { id: `${p}c2`, label: "Incerc, dar cad mereu la fel." },
          { id: `${p}c3`, label: "Vreau sa inteleg de ce." },
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
        "Dumnezeu nu te tine la distanta pana cand te repari singur.",
        "Duhul Sfant aduce lumina fara condamnare si putere pentru pasul urmator, unul singur, azi.",
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

export const DE_CE_DAM_GRES_LESSONS: Lesson[] = [
  make({
    id: "esec_l1",
    order: 1,
    title: "Cand cazi mereu in acelasi loc",
    refs: ["Romani 7:18-19", "Proverbe 24:16", "Psalmul 32:3-5"],
    ref: "Romani 7:19",
    hook: "Nu cazi din intamplare. Cazi de obicei in acelasi loc, la aceeasi ora, dupa aceeasi emotie.",
    word: "Caci binele pe care voiesc sa-l fac, nu-l fac, ci raul pe care nu voiesc sa-l fac, iata ce fac.",
    truth: [
      "Esecul repetat nu inseamna intotdeauna ca nu vrei destul. De multe ori inseamna ca nu ai numit inca ce se intampla inainte de cadere.",
      "Pavel nu descrie un om care nu-i pasa, ci un om care vrea si tot nu poate. Asta il duce la Hristos, nu la disperare.",
    ],
    wrongA: "Sa ma conving ca de data asta ma tin mai strans.",
    right: "Sa numesc cinstit tiparul si sa cer ajutor din vreme.",
    wrongB: "Sa nu mai incerc, ca oricum nu se schimba nimic.",
    explanation:
      "Hotararea singura nu schimba tiparul. Lumina asupra tiparului, adevarul spus cuiva si ajutorul cerut inainte de moment fac diferenta.",
    step: "Scrie ce se intampla in cele zece minute dinaintea caderii tale obisnuite: unde esti, cu cine, ce simti.",
    prayer: "Doamne, arata-mi ce se rupe inainte sa cad si da-mi curaj sa cer ajutor la timp.",
    journal: "Care este emotia care apare cel mai des inainte de cadere?",
    memory: "Binele pe care il vreau nu-l fac.",
  }),
  make({
    id: "esec_l2",
    order: 2,
    title: "Inima impartita",
    refs: ["Iacov 1:6-8", "Matei 6:24", "Psalmul 86:11"],
    ref: "Psalmul 86:11",
    hook: "Uneori nu esti invins de un dusman puternic, ci de faptul ca vrei doua lucruri deodata.",
    word: "Fa-mi inima intreaga, ca sa ma tem de Numele Tau.",
    truth: [
      "O inima impartita nu spune nu raului, ci nu inca. Si asa lasa usa intredeschisa.",
      "Intregimea inimii nu e o insusire cu care te nasti. E o cerere. Se poate cere.",
    ],
    wrongA: "Sa ma prefac ca nu mai vreau ce inca vreau.",
    right: "Sa-I spun cinstit ce vreau inca si sa-I cer o inima intreaga.",
    wrongB: "Sa astept sa-mi treaca de la sine.",
    explanation:
      "Dumnezeu lucreaza cu adevarul spus, nu cu evlavia jucata. Cererea unei inimi intregi este deja un pas de credinta.",
    step: "Numeste in scris un lucru la care nu vrei inca sa renunti si spune-I direct despre el.",
    prayer: "Tata, nu-Ti aduc o inima curata, ci una impartita. Fa-o intreaga.",
    journal: "Ce vrei sa pastrezi si sa fii totodata liber?",
    memory: "Fa-mi inima intreaga.",
  }),
  make({
    id: "esec_l3",
    order: 3,
    title: "Cand ma bizui pe puterea mea",
    refs: ["Ieremia 17:5-8", "Ioan 15:5", "2 Corinteni 12:9"],
    ref: "Ioan 15:5",
    hook: "Cea mai discreta cauza a caderii este increderea in propria putere, mai ales dupa o perioada buna.",
    word: "Despartiti de Mine, nu puteti face nimic.",
    truth: [
      "Perioadele bune sunt cele mai periculoase, pentru ca incepi sa crezi ca te tii singur.",
      "Dependenta de Hristos nu e slabiciune de caracter, ci felul normal in care traieste un om viu.",
    ],
    wrongA: "Sa ma bazez pe experienta mea de pana acum.",
    right: "Sa raman legat de El si in zilele bune, nu doar in criza.",
    wrongB: "Sa ma tem tot timpul ca voi cadea.",
    explanation:
      "Nu frica te tine, ci legatura. Cine ramane legat de Hristos primeste putere si cand este tare, nu doar cand se prabuseste.",
    step: "Alege un moment fix din zi in care sa-I spui: azi nu ma tin eu, ma tii Tu.",
    prayer: "Iisuse, tine-ma aproape mai ales in zilele in care cred ca ma descurc.",
    journal: "Dupa ce fel de zile cazi cel mai des: dupa cele grele sau dupa cele bune?",
    memory: "Despartiti de Mine nu puteti face nimic.",
  }),
  make({
    id: "esec_l4",
    order: 4,
    title: "Ce face Dumnezeu cu cel care a cazut",
    refs: ["Ioan 21:15-17", "Mica 7:8", "1 Ioan 1:9"],
    ref: "Mica 7:8",
    hook: "Intrebarea nu este daca ai cazut, ci ce crezi ca gandeste Dumnezeu despre tine dupa aceea.",
    word: "Chiar daca am cazut, ma voi scula.",
    truth: [
      "Dumnezeu nu are un plan de rezerva pentru cei care au dat gres. Are acelasi plan, reluat.",
      "Petru nu a fost pus deoparte dupa lepadare. A fost intrebat despre dragoste si trimis inapoi la lucru.",
      "Iertarea nu sterge consecintele si nu inlocuieste reparatia acolo unde ai ranit pe cineva.",
    ],
    wrongA: "Sa ma retrag pana cand simt ca merit iar.",
    right: "Sa marturisesc, sa repar ce se poate si sa ma intorc la lucru.",
    wrongB: "Sa trec mai departe fara sa spun nimanui nimic.",
    explanation:
      "Rusinea te tine deoparte, harul te intoarce in lucru. Intoarcerea reala include adevar spus, reparatie unde este posibil si oameni langa tine.",
    step: "Spune unui om matur o cadere pe care o tii ascunsa si intreaba-l ce pas ar face el in locul tau.",
    prayer: "Doamne, nu ma lasa sa raman jos de rusine. Ridica-ma si trimite-ma inapoi.",
    journal: "Ce crezi ca gandeste Dumnezeu despre tine imediat dupa ce cazi?",
    memory: "Chiar daca am cazut, ma voi scula.",
  }),
]
