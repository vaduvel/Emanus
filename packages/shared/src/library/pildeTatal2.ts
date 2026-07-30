import type { Lesson } from "../domain.js"
import { PILDE_TATAL_PART_A } from "./pildeTatal.js"

/*
 * Pildele lui Iisus — Cursul 1: „Cine e Tatăl", fișele 4-5.
 * (docs/16-modul-pilde.md §Cursul 1)
 *
 * Atenție la fișa 5 (robul datornic): NU se scrie ca o condiție de plată
 * („dacă nu ierți, îți pierzi mântuirea"). Punctul e proporția dintre cele
 * două datorii. Și se ține regula 9 din chat: iertare ≠ împăcare ≠
 * întoarcere în pericol.
 */

export const pildaLucratorii: Lesson = {
  id: "pilda_lucratorii",
  courseId: "parables_c1_tatal",
  order: 4,
  title: "Lucrătorii de la ceasul al unsprezecelea",
  estMinutes: 10,
  anchorRefs: ["Matei 20:1-16"],
  memoryVerseRef: "Matei 20:15",
  steps: [
    {
      id: "p4_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "Un stăpân angajează oameni la vie dimineața, apoi la amiază, apoi cu o oră înainte de asfințit. Seara le plătește tuturor la fel." },
        { from: "guide", text: "Prima reacție a oricărui om normal e: nu e corect. Ține minte reacția asta — pilda e construită exact pe ea." },
      ],
    },
    {
      id: "p4_2",
      type: "name_struggle",
      order: 2,
      bubbles: [
        { from: "guide", text: "Cui i-a fost spusă: ucenicilor, imediat după ce Petru întrebase, în practică, „noi am lăsat tot și Te-am urmat — ce vom avea?"" },
        { from: "guide", text: "Deci nu e o pildă despre salarii. E răspunsul dat unor oameni care începuseră să-și socotească vechimea." },
      ],
    },
    {
      id: "p4_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Aceștia de pe urmă n-au lucrat decât un ceas, și la plată i-ai făcut la fel cu noi, care am suferit arșița zilei.",
        ref: "Matei 20:12",
      },
      bubbles: [
        { from: "guide", text: "Două propoziții de context: cei de la ceasul al unsprezecelea nu erau leneși. Stăteau în piață de dimineață și nu-i angajase nimeni. Erau cei pe care nimeni nu-i voise." },
      ],
    },
    {
      id: "p4_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        { from: "guide", text: "Punctul principal: harul nu se calculează pe oră lucrată. Stăpânul nu înșeală pe nimeni — plătește întocmai ce a promis, și în plus e generos cu alții." },
        { from: "guide", text: "Și întrebarea finală a stăpânului e miezul pildei: „Nu-mi este îngăduit să fac ce vreau cu ce e al meu?"" },
      ],
    },
    {
      id: "p4_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        { from: "guide", text: "Citirea greșită, foarte modernă: „o lecție despre nedreptate la plată" — sau invers, un argument că munca nu contează." },
        { from: "guide", text: "Pilda nu e despre bani. E despre invidia celui care a lucrat de dimineață. Nimeni n-a primit mai puțin. Unii au primit mai mult decât socoteau ei că se cuvine — și asta a fost de nesuportat." },
      ],
    },
    {
      id: "p4_6",
      type: "choice",
      order: 6,
      choice: {
        prompt: "Unde te găsești în pildă?",
        options: [
          { id: "p4c_a", label: "Am venit târziu și mi-e rușine de anii pierduți." },
          { id: "p4c_b", label: "Sunt de dimineață și mă ustură când alții primesc uor." },
          { id: "p4c_c", label: "Mi se pare, sincer, nedrept." },
        ],
      },
    },
    {
      id: "p4_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        { from: "guide", text: "Dacă ai venit târziu: nu primești o versiune redusă. Nu există fii de rangul doi, cu jumătate de moWtenire." },
        { from: "guide", text: "Dacă ești de dimineață și te ustură: nu ți s-a luat nimic. Usturimea nu vine din pierdere, vine din comparație — și comparația e singurul lucru care poate face grea o zi în care nimeni n-a fost înșelat." },
      ],
    },
    {
      id: "p4_8",
      type: "quiz",
      order: 8,
      quiz: {
        question: "Despre ce e pilda, de fapt?",
        options: [
          { text: "Despre plata corectă a muncii", correct: false },
          { text: "Despre invidia celui care își socotește vechimea înaintea lui Dumnezeu", correct: true },
          { text: "Despre faptul că nu contează ce faci", correct: false },
        ],
        explanation:
          "Vine imediat după întrebarea „ce vom avea noi?". Răspunsul e că nimeni nu primește mai puțin, dar nici nu are un drept câștigat peste ceilalți.",
      },
    },
    {
      id: "p4_9",
      type: "how_god_helps",
      order: 9,
      bubbles: [
        { from: "guide", text: "Limita cinstită: pilda nu spune că nu există răsplată și nu spune că e la fel dacă trăiești oricum. Alte texte vorbesc despre răsplată. Aici se rezolvă o singură chestiune: dreptul câștigat." },
      ],
    },
    {
      id: "p4_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "Nu-mi este îngăduit să fac ce vreau cu ce e al meu?",
        ref: "Matei 20:15",
      },
    },
  ],
}

export const pildaRobulDatornic: Lesson = {
  id: "pilda_robul_datornic",
  courseId: "parables_c1_tatal",
  order: 5,
  title: "Robul datornic",
  estMinutes: 12,
  anchorRefs: ["Matei 18:21-35"],
  memoryVerseRef: "Matei 18:33",
  steps: [
    {
      id: "p5_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "Pilda asta a făcut mult rău citită greșit, pentru că se termină aspru. Hai să o luăm exact cum e, cu cifrele ei — pentru că cifrele sunt tot mesajul." },
      ],
    },
    {
      id: "p5_2",
      type: "name_struggle",
      order: 2,
      bubbles: [
        { from: "guide", text: "Cui i-a fost spusă: lui Petru, care întrebase câte ori trebuie să ierte — și propusese șapte, ceea ce era deja mult mai mult decât se cerea pe atunci." },
        { from: "guide", text: "Deci întrebarea din spate e o întrebare de contabil: unde e limita? Iisus nu ridică limita. O desființează, și explică de ce, cu o socoteală." },
      ],
    },
    {
      id: "p5_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        { from: "guide", text: "Cele două datorii din pildă: primul rob datora zece mii de talanți. Al doilea îi datora lui o sută de dinari." },
        { from: "guide", text: "Un dinar era plata unei zile de muncă. Un talant, cam șaizeci de mii de dinari — aproape două sute de ani de muncă. Zece mii de talanți nu e o sumă mare: e o sumă imposibilă, aleasă anume ca să nu poată fi calculată." },
        { from: "guide", text: "Punctul principal e proporția: ai fost iertat de o datorie pe care nu o puteai plăti niciodată." },
      ],
    },
    {
      id: "p5_4",
      type: "scripture",
      order: 4,
      scripture: {
        text: "Nu se cădea să ai și tu milă de tovarășul tău, cum am avut eu milă de tine?",
        ref: "Matei 18:33",
      },
      bubbles: [
        { from: "guide", text: "„Cum am avut eu milă de tine" — asta e cheia. Iertarea noastră nu e o taxă de intrare. E o curgere: din ce am primit, dau." },
      ],
    },
    {
      id: "p5_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        { from: "guide", text: "Citirea greșită, și cea care a chinuit mulți oameni: „dacă nu reușesc să iert, îmi pierd mântuirea"." },
        { from: "guide", text: "Asta transformă pilda într-o condiție de plată — exact ce a stricat robul din pildă. Punctul nu e cât de bine reușești tu să ierți. Punctul e că un om care a înțeles cât i s-a șters nu mai poate sta cu mâna de gâtul altuia pentru o sută de dinari." },
        { from: "guide", text: "Iar dacă azi nu poți ierta, nu ești robul rău din pildă. Ești un om rănit care încă nu a văzut socoteala întreagă." },
      ],
    },
    {
      id: "p5_6",
      type: "choice",
      order: 6,
      choice: {
        prompt: "Unde ești tu acum în socoteala asta?",
        options: [
          { id: "p5c_a", label: "Știu pe cine nu pot ierta. Și nu pot." },
          { id: "p5c_b", label: "Mi se pare că mie nu mi s-a șters nimic mare." },
          { id: "p5c_c", label: "Mi-e teamă că Dumnezeu ține socoteli cu mine." },
        ],
      },
    },
    {
      id: "p5_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        { from: "guide", text: "Dacă ai bifat prima: iertarea nu începe cu sentimentul și nu e o comandă pe care o dai inimii. Începe cu o predare: „Doamne, nu pot, dar nu mai vreau să fiu eu cel care ține socoteala."" },
        { from: "guide", text: "Și ceva ce trebuie spus limpede: a ierta nu înseamnă a te împăca, nu înseamnă că ce s-a făcut a fost în regulă, și nu înseamnă să te întorci lângă cineva care te rănește. Sunt trei lucruri diferite, iar pilda vorbește doar despre primul." },
      ],
    },
    {
      id: "p5_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        { from: "guide", text: "Dacă ai bifat a doua: pilda își face treaba abia când cifra devine reală pentru tine. Nu e vorba de greșeli mari sau mici, ci de cine ar fi trebuit să plătească și n-a putut niciodată." },
        { from: "guide", text: "Dacă ai bifat a treia: uită-te unde începe pilda. Stăpânul șterge datoria înainte de orice faptă a robului, și o șterge întreagă." },
      ],
    },
    {
      id: "p5_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Care e punctul principal al pildei?",
        options: [
          { text: "Că iertarea altora e condiția ca Dumnezeu să te ierte", correct: false },
          { text: "Proporția: ai fost iertat de o datorie imposibil de plătit", correct: true },
          { text: "Că datoriile trebuie plătite oricum", correct: false },
        ],
        explanation:
          "Zece mii de talanți față de o sută de dinari. Cifrele sunt argumentul, și din ele curge tot restul.",
      },
    },
    {
      id: "p5_10",
      type: "how_god_helps",
      order: 10,
      bubbles: [
        { from: "guide", text: "Limita cinstită: pilda nu ne spune cât timp ia iertarea și nu ne spune ce se întâmplă cu omul care te-a rănit. Nu ne dă nici dreptul să grăbim pe cineva care e încă în durere." },
        { from: "guide", text: "Dacă e vorba de un abuz sau de un pericol, iertarea nu înlocuiește niciodată protecția și ajutorul din afară. Ai butonul de ajutor sus, oricând." },
      ],
    },
    {
      id: "p5_11",
      type: "journal",
      order: 11,
      journalPrompt:
        "Scrie o singură propoziție: ce ți s-a șters ție și nu ai fi putut plăti niciodată. Nu scrie nimic despre celălalt om, azi.",
    },
    {
      id: "p5_12",
      type: "memory_verse",
      order: 12,
      scripture: {
        text: "Nu se cădea să ai și tu milă de tovarășul tău, cum am avut eu milă de tine?",
        ref: "Matei 18:33",
      },
    },
  ],
}

/** Cursul 1 întreg, în ordine. */
export const PILDE_TATAL_LESSONS: Lesson[] = [
  ...PILDE_TATAL_PART_A,
  pildaLucratorii,
  pildaRobulDatornic,
]
