import type { Lesson } from "../domain.js"
import { temelieL1, temelieL2, temelieL3 } from "./temelieA.js"
import { temelieL4, temelieL5 } from "./temelieB.js"

/*
 * TEMELIA — camera 3. Lecțiile 6-7 și asamblarea parcursului.
 * Vezi antetul din `temelieA.ts` pentru motivul rescrierii (docs/23 §3, D3).
 *
 * Lecția 6 e scrisă pentru ușa `nu_inteleg`: metodă, nu mustrare.
 * Lecția 7 nu cere nicio rugăciune de decizie ca să treci mai departe și nu
 * lasă drumul în fundătură (docs/21 §7 pct. 5): dacă în cele șapte lecții a
 * ieșit la suprafață o rană, omul e trimis la camera ei; dacă vrea mai adânc,
 * la Umblarea.
 */

export const temelieL6: Lesson = {
  id: "temelie_l6",
  courseId: "path_temelie",
  order: 6,
  title: "Cum se citește ca să înțelegi",
  estMinutes: 12,
  anchorRefs: ["Fapte 8:26-35", "Neemia 8:8"],
  memoryVerseRef: "Fapte 8:31",
  steps: [
    {
      id: "t6_1",
      type: "check_in",
      order: 1,
      choice: {
        prompt: "Cum ai încercat până acum?",
        options: [
          {
            id: "t6_c_geneza",
            label: "De la Geneza, în ordine",
            feedback:
              "E cel mai frecvent motiv de abandon. Aproape toată lumea se oprește în Levitic, și nu din vina ei.",
          },
          {
            id: "t6_c_random",
            label: "Deschid la întâmplare",
            feedback: "Uneori merge. De cele mai multe ori pici pe un capitol cu genealogii.",
          },
          {
            id: "t6_c_deloc",
            label: "Nu am încercat deloc",
            feedback: "Atunci pornim curat, fără obiceiuri de corectat.",
          },
          {
            id: "t6_c_nimic",
            label: "Citesc, dar nu-mi rămâne nimic",
            feedback: "Asta se rezolvă cu metoda din a doua jumătate a lecției.",
          },
        ],
      },
    },
    {
      id: "t6_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Biblia nu e o carte. E o bibliotecă de șaizeci și șase de cărți." },
        {
          from: "guide",
          text: "Dacă le citești pe toate la fel, de la prima pagină la ultima, nu ai cum să înțelegi. Nu ești tu de vină.",
        },
      ],
    },
    {
      id: "t6_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        { from: "guide", text: "Sunt genuri diferite și se citesc diferit." },
        { from: "guide", text: "Istorie — ce s-a întâmplat. Nu tot ce e povestit este și aprobat." },
        { from: "guide", text: "Poezie — psalmii. Se citesc ca poezie, nu ca articole de lege." },
        {
          from: "guide",
          text: "Lege — dată unui popor anume, într-un moment anume. Se citește prin ce s-a împlinit în Hristos.",
        },
        {
          from: "guide",
          text: "Scrisori — trimise unor oameni reali, cu probleme reale. Întrebi întâi ce le spunea lor.",
        },
        {
          from: "guide",
          text: "Profeție — imagini, nu grafice. Cele mai multe greșeli de citire se fac aici.",
        },
      ],
    },
    {
      id: "t6_4",
      type: "scripture",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Un om important, într-o trăsură, citește din Isaia și nu înțelege. Filip îl ajunge din urmă:",
        },
      ],
      scripture: {
        text: "Filip a alergat și a auzit pe etiopian citind pe prorocul Isaia. El i-a zis: «Înțelegi tu ce citești?» Famenul a răspuns: «Cum aș putea să înțeleg, dacă nu mă va călăuzi cineva?»",
        ref: "Fapte 8:30-31",
      },
    },
    {
      id: "t6_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Nu a fost făcut prost. I s-a trimis cineva să-i explice." },
        { from: "guide", text: "A avea nevoie de ajutor la citit e scris în Biblie, nu împotriva ei." },
      ],
    },
    {
      id: "t6_6",
      type: "world_vs_truth",
      order: 6,
      bubbles: [
        { from: "guide", text: "Ce se spune: dacă ai fi credincios adevărat, ai înțelege singur." },
        { from: "guide", text: "Ce scrie, despre ziua în care poporul a auzit Legea după zeci de ani:" },
      ],
      scripture: {
        text: "Ei citeau deslușit în cartea Legii lui Dumnezeu și-i arătau înțelesul, ca să-i facă să înțeleagă ce citiseră.",
        ref: "Neemia 8:8",
      },
    },
    {
      id: "t6_7",
      type: "step",
      order: 7,
      bubbles: [
        { from: "guide", text: "De unde începi: nu de la Geneza." },
        {
          from: "guide",
          text: "Începe cu Evanghelia după Ioan sau cu cea după Marcu. Ioan e mai lentă și mai adâncă, Marcu e scurtă și rapidă.",
        },
        {
          from: "guide",
          text: "Motivul e simplu: tot ce e în Biblie duce spre El sau pleacă de la El. Dacă începi cu El, restul are unde să se prindă.",
        },
      ],
    },
    {
      id: "t6_8",
      type: "step",
      order: 8,
      bubbles: [
        { from: "guide", text: "Cum citești: un paragraf, nu un capitol. Zece minute, în scris." },
        { from: "guide", text: "1. Ce spune aici despre Dumnezeu?" },
        { from: "guide", text: "2. Ce spune despre om?" },
        { from: "guide", text: "3. Cui i s-a scris asta întâi și ce a înțeles el?" },
        { from: "guide", text: "4. Ce fac eu cu asta azi? Un lucru, nu o listă." },
      ],
    },
    {
      id: "t6_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "De unde e cel mai bine să începi, dacă citești prima dată?",
        options: [
          { text: "Geneza 1, și mergi în ordine până la capăt", correct: false },
          { text: "O Evanghelie — Ioan sau Marcu", correct: true },
          { text: "Apocalipsa, ca să știi ce urmează", correct: false },
        ],
        explanation:
          "Evangheliile sunt centrul. Restul cărților se leagă de ele. Începutul în ordine cronologică este cel mai frecvent motiv de abandon.",
      },
    },
    {
      id: "t6_10",
      type: "multi_choice",
      order: 10,
      multiChoice: {
        prompt: "Ce te-a oprit până acum? Bifează tot ce se potrivește.",
        minSelections: 1,
        options: [
          { id: "t6_m_limbaj", label: "Limbajul, cuvintele vechi" },
          { id: "t6_m_timp", label: "Nu am timp" },
          { id: "t6_m_unde", label: "Nu știu de unde să încep" },
          { id: "t6_m_blocaj", label: "Mă blochez pe versete pe care nu le înțeleg" },
          { id: "t6_m_plictis", label: "Mă plictisesc după zece minute" },
        ],
      },
    },
    {
      id: "t6_11",
      type: "how_god_helps",
      order: 11,
      bubbles: [
        { from: "guide", text: "Regula care salvează cel mai mult: când te blochezi, pune un semn și mergi mai departe." },
        {
          from: "guide",
          text: "Textul se explică singur pe parcurs, în cea mai mare parte. Cine se oprește la primul lucru neînțeles nu ajunge niciodată la al doilea.",
        },
        {
          from: "guide",
          text: "Și nu citi singur tot timpul. Întrebarea famenului rămâne valabilă: caută un om căruia să-i poți cere lămuriri.",
        },
      ],
    },
    {
      id: "t6_12",
      type: "memory_verse",
      order: 12,
      scripture: {
        text: "«Cum aș putea să înțeleg, dacă nu mă va călăuzi cineva?»",
        ref: "Fapte 8:31",
      },
    },
    {
      id: "t6_13",
      type: "prayer",
      order: 13,
      bubbles: [
        {
          from: "guide",
          text: "«Deschide-mi mintea când citesc. Nu vreau doar informații. Vreau să Te aud pe Tine în ce citesc.»",
        },
      ],
    },
    {
      id: "t6_14",
      type: "journal",
      order: 14,
      journalPrompt:
        "Scrie ora și locul în care vei citi zece minute. Ora și locul, concret, nu intenția.",
      reward: { xp: 0 },
    },
  ],
}

export const temelieL7: Lesson = {
  id: "temelie_l7",
  courseId: "path_temelie",
  order: 7,
  title: "Ce faci cu ce ai aflat",
  estMinutes: 12,
  anchorRefs: ["Ioan 7:17", "Ioan 1:12"],
  memoryVerseRef: "Ioan 1:12",
  steps: [
    {
      id: "t7_1",
      type: "check_in",
      order: 1,
      choice: {
        prompt: "După șase lecții, unde ești? Nu există răspuns greșit aici.",
        options: [
          {
            id: "t7_c_cred",
            label: "Cred",
            feedback: "Bine. Lecția de azi îți spune ce urmează, fără să te grăbească.",
          },
          {
            id: "t7_c_inclin",
            label: "Înclin să cred, dar nu sunt sigur",
            feedback: "E o poziție onestă. Lecția de azi e scrisă mai ales pentru ea.",
          },
          {
            id: "t7_c_nustiu",
            label: "Tot nu știu",
            feedback: "Ai voie să rămâi aici. Nu ți se ia nimic pentru asta.",
          },
          {
            id: "t7_c_nucred",
            label: "Nu cred, dar am înțeles mai bine ce se susține",
            feedback: "Asta e un câștig real și nu îl minimalizăm. Mulțumim că ai mers până la capăt.",
          },
        ],
      },
    },
    {
      id: "t7_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Aici, în alte locuri, ar urma presiunea." },
        { from: "guide", text: "Aici nu urmează." },
      ],
    },
    {
      id: "t7_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "Nu îți cerem să spui o rugăciune acum ca să se bifeze ceva. O decizie luată ca să scapi de un ecran nu ține până mâine dimineață.",
        },
        {
          from: "guide",
          text: "În schimb, există un lucru pe care El Însuși l-a propus, și e ciudat de practic.",
        },
      ],
    },
    {
      id: "t7_4",
      type: "scripture",
      order: 4,
      scripture: {
        text: "«Dacă vrea cineva să facă voia Lui, va ajunge să cunoască dacă învățătura este de la Dumnezeu sau dacă Eu vorbesc de la Mine.»",
        ref: "Ioan 7:17",
      },
    },
    {
      id: "t7_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Uită-te la ordinea din propoziția asta. E pe dos față de cum ne așteptăm." },
        {
          from: "guide",
          text: "Nu «convinge-te și apoi ascultă», ci «pune în practică ce ai înțeles deja și vei ajunge să știi de unde vine».",
        },
        { from: "guide", text: "Întâi faci. Apoi știi. Se poate testa." },
      ],
    },
    {
      id: "t7_6",
      type: "step",
      order: 6,
      bubbles: [
        { from: "guide", text: "Propunerea, pe paisprezece zile. Atât, apoi te oprești dacă vrei." },
        { from: "guide", text: "Un lucru pe zi din ce ai înțeles. Nu tot. Unul." },
        { from: "guide", text: "Zece minute de citit, cu cele patru întrebări de ieri." },
        {
          from: "guide",
          text: "Și o propoziție spusă cu voce tare, chiar dacă ți se pare că vorbești în gol. Sinceritatea contează mai mult decât siguranța.",
        },
      ],
    },
    {
      id: "t7_7",
      type: "world_vs_truth",
      order: 7,
      bubbles: [
        { from: "guide", text: "Ce se spune: fă-te mai bun întâi, apoi ai voie să fii primit." },
        { from: "guide", text: "Ce scrie: primirea vine prima, iar schimbarea vine din ea, nu înaintea ei." },
      ],
    },
    {
      id: "t7_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Dar tuturor celor ce L-au primit, adică celor ce cred în Numele Lui, le-a dat dreptul să se facă copii ai lui Dumnezeu.",
        ref: "Ioan 1:12",
      },
    },
    {
      id: "t7_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Ce ordine propune Ioan 7:17?",
        options: [
          { text: "Întâi ești sigur, apoi ai voie să faci", correct: false },
          { text: "Întâi faci ce ai înțeles, apoi ajungi să știi", correct: true },
          { text: "Nu poți ști niciodată, deci nu contează", correct: false },
        ],
        explanation:
          "Cunoașterea vine pe drum, nu înainte de plecare. De aceea îndoiala nu te blochează: poți începe fără să fii sigur.",
      },
    },
    {
      id: "t7_10",
      type: "declaration",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "Dacă vrei, spune asta cu voce tare. Dacă nu vrei, treci mai departe și nu pierzi absolut nimic.",
        },
        {
          from: "guide",
          text: "«Nu am toate răspunsurile. Dar aleg să merg spre Tine cu ce am înțeles. Ia-mă așa cum sunt acum.»",
        },
      ],
      choice: {
        prompt: "Cum rămâne?",
        options: [
          {
            id: "t7_d_spus",
            label: "Am spus-o",
            feedback: "Nu ai semnat nimic și nu datorezi nimănui nimic. Ai spus adevărul unde erai.",
          },
          {
            id: "t7_d_nu",
            label: "Nu acum",
            feedback: "E în regulă și e cinstit. Nu se închide nimic în urma ta.",
          },
        ],
      },
    },
    {
      id: "t7_11",
      type: "reflection",
      order: 11,
      bubbles: [
        {
          from: "guide",
          text: "Ultimul lucru, și e important. În lecțiile astea s-ar putea să fi ieșit la suprafață altceva decât o întrebare.",
        },
        {
          from: "guide",
          text: "O rușine veche. O pierdere. Cineva pe care nu poți să-l ierți. Singurătatea. Oboseala care nu trece.",
        },
        {
          from: "guide",
          text: "Fiecare dintre ele are drumul ei scris aici. Nu e nevoie să o duci mai departe pe asta.",
        },
        {
          from: "guide",
          text: "Iar dacă vrei mai adânc în text și în rugăciune, există «Umblarea». Nu ești la capăt, ești la o intersecție.",
        },
      ],
      response: {
        prompt: "A ieșit ceva la suprafață în zilele astea? Scrie într-un rând, ca să nu se piardă.",
        placeholder: "Poți lăsa gol.",
        required: false,
        minLength: 3,
      },
    },
    {
      id: "t7_12",
      type: "memory_verse",
      order: 12,
      scripture: {
        text: "Dar tuturor celor ce L-au primit... le-a dat dreptul să se facă copii ai lui Dumnezeu.",
        ref: "Ioan 1:12",
      },
    },
    {
      id: "t7_13",
      type: "prayer",
      order: 13,
      bubbles: [
        {
          from: "guide",
          text: "«Mulțumesc că nu mi-ai cerut să fiu sigur ca să mă asculți. Mergi cu mine mai departe de aici.»",
        },
      ],
    },
    {
      id: "t7_14",
      type: "journal",
      order: 14,
      journalPrompt:
        "Scrie o rugăciune la care aștepți răspuns. Datează-o. Peste câteva luni, recitește-o.",
      bubbles: [{ from: "guide", text: "Răspunsul este opțional. Nu scrie nimic ce nu vrei să rămână salvat pe dispozitivul tău." }],
      reward: { xp: 0 },
    },
  ],
}

/** Cele șapte lecții ale camerei 3, în ordinea în care se parcurg. */
export const TEMELIE_LESSONS: Lesson[] = [
  temelieL1,
  temelieL2,
  temelieL3,
  temelieL4,
  temelieL5,
  temelieL6,
  temelieL7,
]

/**
 * Ziua dintre lecții. Index aliniat cu TEMELIE_LESSONS: practices[i] urmează
 * după lessons[i]. (docs/20 §2)
 */
export const TEMELIE_PRACTICES: string[] = [
  "Azi nu încerca să te convingi de nimic. O singură dată, cu voce tare: «Dacă ești acolo, arată-mi». Și observă dacă ți-a fost mai ușor sau mai greu decât credeai.",
  "Azi citește singur primele optsprezece versete din Ioan 1. Nu ca să fii de acord, ci ca pe un document. Zece minute.",
  "Azi deschide Biblia ta la Marcu 16 sau la începutul lui Ioan 8 și citește nota de subsol până la capăt. Cu ochii tăi, nu pentru că ți-am spus noi.",
  "Azi citește Marcu 2, primele douăsprezece versete, încet. Uită-te doar la ce spune Iisus despre Sine, nu la ce fac ceilalți în jur.",
  "Azi nu arunca nimic și nu face niciun ritual. Spune-I o dată pe nume: «Doamne Iisuse». Dacă a rămas frică după, vorbește cu un om real, nu cu o aplicație.",
  "Azi un singur paragraf din Ioan, trecut prin cele patru întrebări, în scris. Zece minute. Dacă te blochezi pe un verset, pune un semn și mergi mai departe.",
  "Ai terminat drumul. Azi fă un singur lucru din ce ai înțeles și spune-I că îl faci. Iar dacă a ieșit la suprafață o rană, alege ușa ei — nu e nevoie să o duci singur mai departe.",
]
