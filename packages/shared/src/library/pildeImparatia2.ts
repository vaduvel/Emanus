import type { Lesson } from "../domain.js"
import { PILDE_IMPARATIA_PART_A } from "./pildeImparatia.js"

/*
 * Pildele lui Iisus — Cursul 2: „Ce e Împărăția și cine intră", fișele 4-5.
 * (docs/16-modul-pilde.md §Cursul 2)
 *
 * Fișa 5 (cele zece fecioare) e cea mai riscantă din tot modulul. Regulile
 * din docs/16 și din docs/22 se aplică strict:
 *  - nu se citește ca hartă a viitorului și nu se face calendar;
 *  - frica nu e motor (docs/15 §C4);
 *  - zero verdicte despre un om anume;
 *  - untdelemnul NU se alegorizează (regula 3) — textul nu spune ce e.
 */

export const pildaComoara: Lesson = {
  id: "pilda_comoara",
  courseId: "parables_c2_imparatia",
  order: 4,
  title: "Comoara și perla",
  estMinutes: 10,
  anchorRefs: ["Matei 13:44-46", "Filipeni 3:8"],
  memoryVerseRef: "Matei 13:44",
  steps: [
    {
      id: "i4_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "Două pilde de două rânduri fiecare. Un om dă peste o comoară într-un câmp și vinde tot ca să cumpere câmpul. Un negustor găsește o perlă și vinde tot ca să o cumpere." },
        { from: "guide", text: "Un cuvânt le ține pe amândouă și aproape nimeni nu-l citește: „de bucurie"." },
      ],
    },
    {
      id: "i4_2",
      type: "scripture",
      order: 2,
      scripture: {
        text: "Împărăția cerurilor se mai aseamănă cu o comoară ascunsă într-un ogor. Omul care o găsește o ascunde și, de bucuria ei, se duce și vinde tot ce are și cumpără ogorul acela.",
        ref: "Matei 13:44",
      },
      bubbles: [
        { from: "guide", text: "Nu „cu strângere de inimă". Nu „din datorie". De bucuria ei." },
      ],
    },
    {
      id: "i4_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        { from: "guide", text: "Punctul principal: cine vede ce valorează Împărăția dă restul cu bucurie, nu cu regret. Nu e sacrificiu, e schimb bun." },
        { from: "guide", text: "Două propoziții de context: în lipsa băncilor, oamenii își îngropau averea în pământ, mai ales când veneau armate — și mulți mureau fără să spună unde. Găsirea unei comori într-un ogor era o posibilitate reală, nu o poveste." },
      ],
    },
    {
      id: "i4_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Citirea greșită, cea care a obosit oameni ani întregi: „credința e o listă de renunțări; dă tot și speră că merită"." },
        { from: "guide", text: "În pildă, nu se cere nicio renunțare. Cei doi vind pentru că au văzut prețul lucrului. Nimeni nu-i pune, nimeni nu-i îndeamnă. Un om care își vinde mașina ca să-și cumpere casă nu simte că a pierdut o mașină." },
        { from: "guide", text: "De asta e o întrebare rea „cât trebuie să renunț?". Întrebarea din pildă e: am văzut ce e Împărăția?" },
      ],
    },
    {
      id: "i4_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "E și o diferență fină între cei doi, și e mângâietoare. Unul căuta perle de meserie și a dat peste cea mai bună. Celălalt nu căuta nimic — lucra câmpul și s-a lovit de comoară." },
        { from: "guide", text: "Deci se poate ajunge la Dumnezeu și căutând de-o viață, și din senin, într-o zi de muncă. Amândouă sunt în text." },
      ],
    },
    {
      id: "i4_6",
      type: "scripture",
      order: 6,
      scripture: {
        text: "Ba mai mult, toate le socotesc ca o pierdere, pe lângă prețul nespus de mare al cunoștinței lui Hristos Isus, Domnul meu.",
        ref: "Filipeni 3:8",
      },
      bubbles: [
        { from: "guide", text: "Pavel scrie asta după ce pierduse poziție, reputație și libertate. Nu vorbește ca un om care s-a sacrificat, ci ca unul care a socotit și i-a dat bine." },
      ],
    },
    {
      id: "i4_7",
      type: "choice",
      order: 7,
      choice: {
        prompt: "Cum simți, cinstit, credința în ultima vreme?",
        options: [
          { id: "i4c_a", label: "Ca o listă de lucruri la care trebuie să renunț." },
          { id: "i4c_b", label: "Înțeleg cu capul că e comoară, dar n-o simt." },
          { id: "i4c_c", label: "Am văzut-o o dată și vreau înapoi bucuria aceea." },
        ],
      },
    },
    {
      id: "i4_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        { from: "guide", text: "Dacă e o listă de renunțări: înseamnă că ți s-a cerut plata înainte să vezi comoara. În pildă, ordinea e alta: vezi, apoi dai. Cere-I să-ți arate ce ai primit — nu ce mai ai de dat." },
        { from: "guide", text: "Dacă înțelegi cu capul și nu simți: bucuria nu se produce prin efort. Și nu e o senzație permanentă. Ce poți face azi e să numești un lucru concret pe care îl ai și pe care nu-l aveai înainte." },
        { from: "guide", text: "Dacă vrei bucuria înapoi: nu ai pierdut comoara, ai pierdut vederea ei. Ogorul e tot al tău." },
      ],
    },
    {
      id: "i4_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Cum vinde omul din pildă tot ce are?",
        options: [
          { text: "Cu regret, pentru că așa se cere", correct: false },
          { text: "De bucuria comorii pe care a găsit-o", correct: true },
          { text: "Din teamă că altcineva o ia înaintea lui", correct: false },
        ],
        explanation:
          "Matei 13:44: „de bucuria ei". Pilda nu vorbește despre renunțare, ci despre valoare văzută.",
      },
    },
    {
      id: "i4_10",
      type: "how_god_helps",
      order: 10,
      bubbles: [
        { from: "guide", text: "Limita cinstită: pilda nu spune ce anume trebuie să vinzi tu, și nu e o cerere de bani. Nu îți cere nimeni nimic aici — Emanus nu cere bani pentru nimic." },
        { from: "guide", text: "Și nu spune că bucuria se simte tot timpul. Cei doi din pildă au avut o zi în care au văzut. Restul zilelor nu ni se povestesc." },
      ],
    },
    {
      id: "i4_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Și, de bucuria ei, se duce și vinde tot ce are și cumpără ogorul acela.",
        ref: "Matei 13:44",
      },
    },
  ],
}

export const pildaFecioarele: Lesson = {
  id: "pilda_fecioarele",
  courseId: "parables_c2_imparatia",
  order: 5,
  title: "Cele zece fecioare",
  estMinutes: 11,
  anchorRefs: ["Matei 25:1-13", "Matei 25:13"],
  memoryVerseRef: "Matei 25:13",
  steps: [
    {
      id: "i5_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "Fișa asta e cea mai greu de scris din tot cursul, pentru că pilda a fost folosită mult ca să sperie oameni. Nu facem asta aici." },
        { from: "guide", text: "Zece fete așteaptă un mire. Cinci au untdelemn de rezervă, cinci nu. Mirele întârzie. Toate zece adorm." },
      ],
    },
    {
      id: "i5_2",
      type: "truth_simple",
      order: 2,
      bubbles: [
        { from: "guide", text: "Citește încă o dată propoziția de dinainte: toate zece au adormit. Și cele cinci lăudate. Somnul nu e vina din pildă." },
        { from: "guide", text: "Două propoziții de context: la o nuntă de atunci, mirele venea după mireasă la o oră pe care nimeni nu o știa exact, uneori foarte târziu în noapte, pentru că se negocia până la ultima clipă cu familia. Așteptarea lungă era normală, nu un semn rău." },
      ],
    },
    {
      id: "i5_3",
      type: "name_struggle",
      order: 3,
      bubbles: [
        { from: "guide", text: "Cui i-a fost spusă: ucenicilor, în particular, pe Muntele Măslinilor — aceeași zi și același șir cu talanții. Nu mulțimii. Oamenilor Lui, care îl iubeau și care aveau în față o așteptare mai lungă decât credeau." },
        { from: "guide", text: "Deci nu e o pildă pentru cei de afară. E pentru cei care așteaptă și obosesc." },
      ],
    },
    {
      id: "i5_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        { from: "guide", text: "Punctul principal: se plătește lipsa pregătirii pentru o așteptare lungă, nu somnul. Cinci s-au pregătit pentru varianta în care întârzie. Cinci s-au pregătit doar pentru varianta în care vine repede." },
        { from: "guide", text: "Și nu alegorizăm untdelemnul. Textul nu spune ce e, și ce s-a spus despre el în predici e adăugat de oameni. Ce spune textul e că nu se împrumută — nimeni nu poate aștepta pe Dumnezeu în locul tău." },
      ],
    },
    {
      id: "i5_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        { from: "guide", text: "Prima citire greșită: „dacă adormi spiritual, ești pierdut". Nu asta spune pilda. Toate au adormit și cinci au intrat la nuntă." },
        { from: "guide", text: "A doua citire greșită, mai periculoasă: „trăiește în frică, că poți rămâne afară oricând". Frica te mișcă o săptămână. Relația te ține o viață." },
        { from: "guide", text: "A treia, mai subtilă: pilda nu e o hartă a viitorului. Nu se fac calcule cu ea, nu se ghicesc date și nu se numără semne. Încheierea o spune limpede: nu știți." },
      ],
    },
    {
      id: "i5_6",
      type: "scripture",
      order: 6,
      scripture: {
        text: "Vegheați, dar, căci nu știți ziua, nici ceasul.",
        ref: "Matei 25:13",
      },
      bubbles: [
        { from: "guide", text: "„Nu știți" e concluzia dată de El. Orice om care îți spune că știe ziua contrazice versetul cu care se încheie chiar pilda pe care o citește." },
      ],
    },
    {
      id: "i5_7",
      type: "choice",
      order: 7,
      choice: {
        prompt: "Ce aștepți tu, de mult, și nu vine?",
        options: [
          { id: "i5c_a", label: "Un răspuns la o rugăciune veche." },
          { id: "i5c_b", label: "Să se schimbe cineva din familia mea." },
          { id: "i5c_c", label: "Să simt din nou ceva în relația cu El." },
        ],
      },
    },
    {
      id: "i5_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        { from: "guide", text: "Întrebarea practică a pildei nu e „când vine", ci „cu ce aștepți". Cele cinci n-au fost mai treze — au fost mai aprovizionate." },
        { from: "guide", text: "Tradus în viața de zi cu zi: nu se ține o așteptare lungă pe entuziasm. Se ține pe lucrurile mici, repetate, care nu se văd — câteva minute cu El, un jurnal, un om căruia să-i spui cinstit unde ești." },
        { from: "guide", text: "Și untdelemnul nu se împrumută: nimeni nu poate umbla cu Dumnezeu în locul tău — nici părinții, nici partenerul, nici un om de la amvon." },
      ],
    },
    {
      id: "i5_9",
      type: "step",
      order: 9,
      bubbles: [
        { from: "guide", text: "Un singur lucru azi: alege lucrul cel mai mic pe care îl poți face în fiecare zi și pe care l-ai putea ține și într-o săptămână grea. Atât de mic încât să ți se pară ridicol." },
        { from: "guide", text: "Aia e rezerva de untdelemn. Nu se strânge în noaptea în care ai nevoie de ea." },
      ],
    },
    {
      id: "i5_10",
      type: "quiz",
      order: 10,
      quiz: {
        question: "Care e diferența dintre cele cinci și celelalte cinci?",
        options: [
          { text: "Cinci au rămas treze, celelalte au adormit", correct: false },
          { text: "Cinci s-au pregătit pentru o așteptare lungă", correct: true },
          { text: "Cinci știau ora exactă a venirii mirelui", correct: false },
        ],
        explanation:
          "Matei 25:5 spune că toate au adormit. Diferența e rezerva, nu somnul. Iar ora n-o știa nimeni — Matei 25:13.",
      },
    },
    {
      id: "i5_11",
      type: "how_god_helps",
      order: 11,
      bubbles: [
        { from: "guide", text: "Limita cinstită, și rămâne grea: finalul pildei e greu și nu îl îndulcim. Dar nu știm ce înseamnă pentru un om anume și nu-l folosim ca să dăm verdicte — nici despre alții, nici despre tine." },
        { from: "guide", text: "Dacă după lecția asta ai frică în piept, nu ai înțeles greșit pilda — ai întâlnit ecoul felului în care ți-a fost predată. Vorbește-I Și despre asta. Cel care vine în pildă e mirele, nu un inspector." },
      ],
    },
    {
      id: "i5_12",
      type: "prayer",
      order: 12,
      bubbles: [
        { from: "guide", text: "Roagă-te scurt, cu cuvintele tale: „Doamne, învață-mă să Te aștept lung, fără să mă sting și fără să mă tem de Tine."" },
      ],
    },
    {
      id: "i5_13",
      type: "memory_verse",
      order: 13,
      scripture: {
        text: "Vegheați, dar, căci nu știți ziua, nici ceasul.",
        ref: "Matei 25:13",
      },
    },
  ],
}

/** Cursul 2 întreg, în ordine. */
export const PILDE_IMPARATIA_LESSONS: Lesson[] = [
  ...PILDE_IMPARATIA_PART_A,
  pildaComoara,
  pildaFecioarele,
]
