import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 3 din docs/41-module-teme-poonen.md:
 * "Cuvantul: hrana, arma si innoirea mintii". Temele 10-12.
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
        prompt: "Cum sta treaba la tine cu Cuvantul?",
        options: [
          { id: `${p}c1`, label: "Aproape ca nu il deschid." },
          { id: `${p}c2`, label: "Il citesc, dar nu ma schimba." },
          { id: `${p}c3`, label: "Vreau sa fie hrana mea zilnica." },
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
        "Duhul Sfant Se misca, si Cuvantul iese: asa lucreaza Dumnezeu de la Geneza 1 pana azi.",
        "Nu esti lasat sa te schimbi singur, prin puterea vointei tale.",
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
    title: "Cuvantul lui Dumnezeu este hrana noastra",
    refs: ["1 Petru 1:23", "1 Petru 2:2", "Matei 4:4"],
    ref: "1 Petru 2:2",
    hook: "Multi oameni, dupa ce si-au incurcat viata, isi doresc sa o poata lua de la capat. Exact asta iti ofera Dumnezeu cand spune: poti sa te nasti din nou.",
    word: "Ca niste prunci nascuti de curand, sa doriti laptele duhovnicesc si curat, pentru ca prin el sa cresteti spre mantuire.",
    truth: [
      "Ganditi-va ce ar insemna sa va incepeti viata din nou, ca un prunc, fara niciun cazier al esecurilor din trecut, totul sters. Asta inseamna nasterea din nou.",
      "Nasterea aceasta noua vine printr-o samanta, la fel cum nasterea trupeasca a inceput cu samanta tatalui tau. Aici, samanta este Cuvantul lui Dumnezeu: ai crezut Cuvantul care spunea ca Hristos a murit pentru pacatele tale.",
      "Apoi acelasi Cuvant, care a fost samanta, devine lapte pentru pruncul nou-nascut. Dumnezeu nu ne-a iertat pacatele doar ca sa ne duca in cer. Vrea sa crestem si sa fim tot mai izbaviti de stricaciunea pe care am mostenit-o: egoism, mandrie, aroganta, amaraciune, gelozie, rautate.",
      "Lucrurile acestea nu dispar in clipa nasterii din nou. Viata cea noua are puterea sa le biruiasca, dar puterea aceea trebuie folosita ca sa creasca.",
      "Un prunc are in el putinta de a ajunge un om puternic. Dar nu va creste daca nu mananca. Multi crestini cred ca odata iertate pacatele si primit Duhul, asta e tot. Abia te-ai nascut. Un prunc lasat asa moare.",
      "Unul dintre primele lucruri pe care le face un prunc este ca plange. Din ziua dintai tanjeste dupa lapte, si tipa dupa el. Asa striga un crestin adevarat dupa Cuvantul lui Dumnezeu. Daca un prunc nu plange asa, spunem ca este bolnav sau ca e pe moarte.",
      "In Geneza 1, pamantul era pustiu, gol si intunecat. Aceasta este si starea omului. Dar Duhul Se misca deasupra apelor, si Dumnezeu a zis. Asa lucreaza Dumnezeu si azi: Duhul Se misca, si Cuvantul iese. Nu a facut totul intr-o zi, ci in sase. Asa lucreaza si in noi, zi dupa zi.",
    ],
    wrongA: "Dupa iertarea pacatelor nu mai am mult de facut.",
    right: "Nasterea din nou este inceputul; cresterea vine prin hranirea zilnica din Cuvant.",
    wrongB: "Cresterea vine de la sine, cu timpul.",
    explanation:
      "Omul dinauntru se innoieste din zi in zi, spune Scriptura. Nu intr-o zi, ci zi dupa zi, ca in cele sase zile ale creatiei.",
    step: "Hotaraste ora si locul in care vei citi maine din Cuvant, ca la o masa la ora fixa.",
    prayer: "Doamne, da-mi foamea unui prunc dupa laptele Cuvantului Tau. Hraneste-ma si fa-ma sa cresc.",
    journal: "De cate zile nu te-ai hranit din Cuvant? Ce ai pus in locul lui?",
    memory: "Doriti laptele duhovnicesc si curat, ca prin el sa cresteti.",
  }),
  make({
    id: "cuvant_l2",
    order: 2,
    title: "Cuvantul ne ajuta sa-l biruim pe Satana",
    refs: ["Efeseni 6:17", "Ioan 6:37", "Evrei 8:12", "Romani 5:1"],
    ref: "Ioan 6:37",
    hook: "Multi credinciosi traiesc sub o osanda si o vinovatie pe care Dumnezeu nu le-a dat-o niciodata. De unde vin ele si cu ce se alunga?",
    word: "Pe cel ce vine la Mine, nu-l voi izgoni afara.",
    truth: [
      "Cuvantul lui Dumnezeu este sabia Duhului. Este arma cu care Satana este alungat.",
      "Nu poti sta la discutie cu Satana. Eva a stat de vorba cu el si a cazut. Isus nu a discutat: a citat Scriptura, de trei ori, si diavolul a plecat de la El.",
      "Poonen isi spune marturia: din copilarie a trait ani de indoiala, intrebandu-se daca Dumnezeu l-a primit. Apoi a crezut Cuvantul din Ioan 6:37 - pe cel ce vine la Mine nu-l voi izgoni afara. Spune ca a fost ca si cum ar fi lasat o ancora, si de peste treizeci si opt de ani nu s-a mai clatinat din locul acela.",
      "Dumnezeu spune: nu-Mi voi mai aduce aminte de pacatele lor. Daca cineva ti-ar ucide copilul si l-ai ierta din inima, tot ti-ai aduce aminte de fapta ori de cate ori l-ai vedea. Dumnezeu nu este asa. El nu-Si mai aduce aminte.",
      "Mai mult decat atat: Dumnezeu nu numai ca iarta, ci si indreptateste. Te declara neprihanit. Este deosebirea dintre un judecator care spune esti iertat si unul care spune nu esti deloc vinovat, du-te acasa. Primul iese cu capul plecat; al doilea iese cu capul sus.",
      "Cand esti indreptatit, Dumnezeu te imbraca cu bunatatea lui Hristos, ca pe o haina. Cum arati imbracat cu bunatatea lui Hristos? Desavarsit.",
      "Cu acestea rezisti celui rau. Spune cu gura ta: sunt primit, sunt iertat, Dumnezeu nu-Mi mai tine socoteala trecutului, sunt indreptatit, sunt imbracat cu bunatatea lui Hristos si sunt tot atat de pretios inaintea lui Dumnezeu cat este Isus Insusi.",
    ],
    wrongA: "Cand Satana ma acuza, trebuie sa-i explic si sa ma apar.",
    right: "Nu se discuta cu el; i se raspunde cu Cuvantul, cum a facut Isus.",
    wrongB: "Orice vinovatie pe care o simt vine de la Dumnezeu.",
    explanation:
      "Aici sta problema: la a crede. Este scris indreptatiti prin credinta. Daca nu crezi ce spune Dumnezeu despre tine, adevarul acela nu lucreaza in tine.",
    step: "Invata pe de rost Ioan 6:37 si rosteste-l cu voce tare data viitoare cand te acuza gandurile.",
    prayer: "Doamne, cred ca nu ma izgonesti. Multumesc ca ma imbraci cu bunatatea lui Hristos.",
    journal: "Ce acuzatie veche iti revine mereu in minte si cu ce verset o vei intampina?",
    memory: "Pe cel ce vine la Mine, nu-l voi izgoni afara.",
  }),
  make({
    id: "cuvant_l3",
    order: 3,
    title: "Cuvantul ne innoieste mintea",
    refs: ["Romani 12:2", "Ioan 1:18", "Evrei 8:11"],
    ref: "Romani 12:2",
    hook: "N-ar fi minunat sa poti sti ce gandeste Dumnezeu despre problema ta si despre rezolvarea ei?",
    word: "Sa nu va potriviti chipului veacului acestuia, ci sa va prefaceti prin innoirea mintii voastre, ca sa puteti deosebi bine voia lui Dumnezeu: cea buna, placuta si desavarsita.",
    truth: [
      "Innoirea mintii inseamna ca mintea noastra incepe sa gandeasca asa cum gandeste Dumnezeu.",
      "Cand mintea nu ne este innoita, chiar daca suntem nascuti din nou si iertati, putem gandi in continuare exact ca oamenii lumii despre bani, despre femei frumoase, despre avere, despre pozitie si cinste si despre dusmanii nostri.",
      "A fi prefacut inseamna a fi schimbat in asemanarea lui Hristos. Nu la infatisare - Dumnezeu nu Se ocupa sa ne faca sa aratam ca Isus. Se ocupa de caracterul dinauntru.",
      "Daca vrei sa stii cum gandeste Dumnezeu, citeste Biblia. Ce gandeste Dumnezeu despre bani, despre adulter, despre furt, despre inselaciune, despre gelozie, despre mandrie - raspunsul este acolo.",
      "Cand Isus a venit pe pamant, a fost numit Cuvantul lui Dumnezeu, si Cuvantul S-a facut trup. In Vechiul Testament aveau Cuvantul in forma scrisa, pe table de piatra si pe suluri. Cand a venit Isus, am avut Cuvantul in forma omeneasca. Este mult mai usor de citit asa.",
      "Cand ajungi la o rascruce si nu stii ce sa faci: daca in anii dinainte ai lasat Duhul sa-ti schimbe felul de a gandi prin Cuvant, vei putea deosebi voia lui Dumnezeu. Daca ai fost un crestin nepasator, vei ajunge la criza fara sa stii incotro.",
      "In Vechiul Testament, singurul care stia voia lui Dumnezeu era prorocul, si prorocii adevarati erau rari. Astazi, fiindca Duhul Sfant locuieste in noi, nu mai trebuie sa alergi la un proroc, la un pastor sau la un batran ca sa afli voia lui Dumnezeu.",
      "Nu astepta sa vina criza ca sa incepi sa-L cauti pe Dumnezeu. Unii se intorc la El doar la necaz, iar cand lucrurile merg bine, uita pana la urmatoarea criza. Asemenea credinciosi nu cresc.",
    ],
    wrongA: "Voia lui Dumnezeu se afla intrebandu-l pe pastor la criza.",
    right: "Mintea innoita din vreme, prin Cuvant, deosebeste singura voia lui Dumnezeu la rascruce.",
    wrongB: "Voia lui Dumnezeu se afla prin semne si intamplari.",
    explanation:
      "A alerga la un om intelept la fiecare hotarare este calea Vechiului Testament. Noua ni s-a dat Duhul, ca sa cunoastem gandul lui Dumnezeu dinauntru.",
    step: "Citeste azi un capitol din Evanghelii si scrie un singur lucru despre cum a gandit si a reactionat Isus intr-o situatie.",
    prayer: "Duhule al lui Dumnezeu, arata-mi slava lui Isus in Scriptura si schimba-ma dupa chipul acela.",
    journal: "Intr-o privinta anume - bani, cinste, dusmani - gandesti ca lumea sau ca Dumnezeu?",
    memory: "Prefaceti-va prin innoirea mintii voastre.",
  }),
]
