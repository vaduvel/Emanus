import type { Lesson } from "../domain.js"

/*
 * Cursul „Ce se întâmplă după moarte?", lecțiile 1-3. (docs/15 §Cursul 4)
 *
 * Reguli stricte pentru acest curs:
 * - frica NU e motor. Zero „dacă mori diseară".
 * - nu arătăm cu degetul spre nicio biserică și spre nici un om anume.
 * - fiecare lecție are o limită cinstită: ce nu știm.
 */

export const vesniciaL1: Lesson = {
  id: "vesnicia_l1",
  courseId: "doctrine_c4_vesnicia",
  order: 1,
  title: "Ce e raiul, de fapt",
  estMinutes: 10,
  anchorRefs: ["Apocalipsa 21:3-4", "Ioan 17:3", "Psalmul 16:11"],
  memoryVerseRef: "Apocalipsa 21:3",
  steps: [
    {
      id: "v1_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "Dacă întrebi zece oameni ce e raiul, o să auzi nori, aripi, porți de aur și o liniște cam plictisitoare. Cei mai mulți nu și-l doresc cu adevărat — doar nu vor varianta cealaltă." },
        { from: "guide", text: "Problema e că imaginea aceea nu vine din Biblie. Vine din picturi și din desene animate." },
      ],
    },
    {
      id: "v1_2",
      type: "scripture",
      order: 2,
      scripture: {
        text: "Iată cortul lui Dumnezeu cu oamenii! El va locui cu ei și ei vor fi poporul Lui, și Dumnezeu Însuși va fi cu ei. El va șterge orice lacrimă din ochii lor. Și moartea nu va mai fi. Nu va mai fi nici tânguire, nici țipăt, nici durere.",
        ref: "Apocalipsa 21:3-4",
      },
      bubbles: [
        { from: "guide", text: "Citește încă o dată prima propoziție. Nu începe cu un loc. Începe cu Cineva: „Dumnezeu Însuși va fi cu ei"." },
      ],
    },
    {
      id: "v1_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        { from: "guide", text: "Raiul nu e, în primul rând, o adresă. E prezența Lui, fără perdea și fără despărțire." },
        { from: "guide", text: "De aceea lucrurile care ne omoară aici — moartea, boala, plânsul — pur și simplu nu mai au unde să încapă acolo. Nu sunt interzise printr-o regulă. Sunt imposibile în prezența Lui deplină." },
      ],
    },
    {
      id: "v1_4",
      type: "scripture",
      order: 4,
      scripture: {
        text: "Și viața veșnică este aceasta: să Te cunoască pe Tine, singurul Dumnezeu adevărat, și pe Isus Hristos, pe care L-ai trimis Tu.",
        ref: "Ioan 17:3",
      },
      bubbles: [
        { from: "guide", text: "Iisus definește singur viața veșnică. Și nu spune „un loc" și nu spune „o durată". Spune: să Te cunoască." },
        { from: "guide", text: "Verbul din greacă e *ginosko*: a cunoaște prin trăire, cum cunoști un om cu care ai locuit, nu cum știi un lucru dintr-o carte." },
      ],
    },
    {
      id: "v1_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        { from: "guide", text: "Lumea spune: raiul e o răsplată pe care o primești dacă ai adunat destule puncte, undeva la sfârșit." },
        { from: "guide", text: "Biblia spune: viața veșnică e o relație care începe acum și pe care moartea nu o mai poate întrerupe. Din partea ei începe deja, nu la înmormântare." },
      ],
    },
    {
      id: "v1_6",
      type: "choice",
      order: 6,
      choice: {
        prompt: "Sincer, când te gândeai la rai până acum, ce vedeai?",
        options: [
          { id: "v1c_a", label: "Nori, liniște, ceva cam plictisitor." },
          { id: "v1c_b", label: "O sală de judecată în care abia scap." },
          { id: "v1c_c", label: "Nu vedeam nimic. Doar nu voiam iadul." },
        ],
      },
    },
    {
      id: "v1_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        { from: "guide", text: "Asta schimbă și viața de azi. Dacă raiul e prezența Lui, atunci fiecare clipă în care Îl cauți acum e o gustare din ce va fi, nu o pregătire pentru un examen." },
        { from: "guide", text: "Iar dacă cineva drag ție e al Lui și a plecat, nu s-a dus într-o ceață. E cu Cineva anume." },
      ],
    },
    {
      id: "v1_8",
      type: "quiz",
      order: 8,
      quiz: {
        question: "Care e centrul raiului, după Apocalipsa 21?",
        options: [
          { text: "Porțile de aur și străzile", correct: false },
          { text: "Dumnezeu Însuși locuind cu oamenii Lui", correct: true },
          { text: "Odihna de la muncă", correct: false },
        ],
        explanation:
          "Textul începe cu „Dumnezeu Însuși va fi cu ei". Restul — fără lacrimi, fără moarte — vine din asta.",
      },
    },
    {
      id: "v1_9",
      type: "how_god_helps",
      order: 9,
      bubbles: [
        { from: "guide", text: "Limita cinstită: nu știm cum arată. Nu știm ce vom face acolo, cum vor fi corpurile, dacă ne recunoaștem imediat. Biblia spune puțin despre decor și mult despre Cine e acolo." },
        { from: "guide", text: "Cine îți descrie raiul în detaliu, cu ore și programe, adaugă de la el. Noi nu facem asta." },
      ],
    },
    {
      id: "v1_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "Iată cortul lui Dumnezeu cu oamenii! El va locui cu ei și Dumnezeu Însuși va fi cu ei.",
        ref: "Apocalipsa 21:3",
      },
    },
  ],
}

export const vesniciaL2: Lesson = {
  id: "vesnicia_l2",
  courseId: "doctrine_c4_vesnicia",
  order: 2,
  title: "Ce e iadul",
  estMinutes: 11,
  anchorRefs: ["2 Tesaloniceni 1:9", "Matei 7:23", "Romani 6:23"],
  memoryVerseRef: "2 Tesaloniceni 1:9",
  steps: [
    {
      id: "v2_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "Lecția asta se putea scrie ca să te sperie. N-o scriem așa." },
        { from: "guide", text: "Frica te poate mișca o săptămână. Relația te ține o viață. Deci nu-ți spunem „dacă mori diseară". Îți spunem doar ce scrie, și de ce e grav." },
      ],
    },
    {
      id: "v2_2",
      type: "name_struggle",
      order: 2,
      bubbles: [
        { from: "guide", text: "Mulți oameni au două imagini în cap, și amândouă îi blochează: fie un chin cu diavoli și furci, ca în picturi, fie nimic — o glumă, o poveste pentru copii." },
        { from: "guide", text: "Textul biblic nu spune nici prima, nici a doua." },
      ],
    },
    {
      id: "v2_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Ei vor avea ca pedeapsă o pierzare veșnică de la fața Domnului și de la slava puterii Lui.",
        ref: "2 Tesaloniceni 1:9",
      },
      bubbles: [
        { from: "guide", text: "Uită-te la miezul propoziției: „de la fața Domnului". Cuvântul greu din verset nu e „foc". E „de la"." },
        { from: "guide", text: "Adică despărțire. Locul din care lipsește tot ce e bun, pentru că lipsește Cine e bun." },
      ],
    },
    {
      id: "v2_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        { from: "guide", text: "Tot ce ai gustat vreodată bun — un răsărit, mâna cuiva care te ține, un râs, apa rece când ți-e sete — vine de la El, chiar dacă nu L-ai recunoscut niciodată." },
        { from: "guide", text: "Iadul e ce rămâne când se ia mâna aceea de pe tot. Nu e o cameră de tortură inventată de un Dumnezeu supărat. E consecința despărțirii, dusă până la capăt." },
      ],
    },
    {
      id: "v2_5",
      type: "scripture",
      order: 5,
      scripture: {
        text: "Atunci le voi spune curat: „Niciodată nu v-am cunoscut; depărtați-vă de la Mine."",
        ref: "Matei 7:23",
      },
      bubbles: [
        { from: "guide", text: "Cea mai grea propoziție din Evanghelii nu e despre foc. E despre a nu fi cunoscut. Iar Iisus o spune unor oameni religioși, care făcuseră lucruri impresionante." },
        { from: "guide", text: "Deci întrebarea nu e „am făcut destul?". E „mă cunoaște?"." },
      ],
    },
    {
      id: "v2_6",
      type: "choice",
      order: 6,
      choice: {
        prompt: "Ce te apasă mai mult acum?",
        options: [
          { id: "v2c_a", label: "Frica pentru mine." },
          { id: "v2c_b", label: "Frica pentru cineva drag mie." },
          { id: "v2c_c", label: "Mă revoltă ideea în sine." },
        ],
      },
    },
    {
      id: "v2_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        { from: "guide", text: "Dacă ai bifat frica pentru tine: ține minte că omul care se teme de despărțire nu e departe de El. Cine nu vrea să fie despărțit deja se întoarce cu fața." },
        { from: "guide", text: "Dacă e vorba de cineva drag: la lecția 4 vorbim exact despre asta, și despre ce nu ne e dat să judecăm noi." },
      ],
    },
    {
      id: "v2_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Fiindcă plata păcatului este moartea, dar darul fără plată al lui Dumnezeu este viața veșnică în Isus Hristos, Domnul nostru.",
        ref: "Romani 6:23",
      },
      bubbles: [
        { from: "guide", text: "Versetul are două jumătăți și nimeni nu are dreptul să citeze doar prima." },
      ],
    },
    {
      id: "v2_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Care e miezul a ceea ce spune 2 Tesaloniceni 1:9?",
        options: [
          { text: "Chinul fizic, în amănunt", correct: false },
          { text: "Despărțirea de fața Domnului și de tot ce vine de la El", correct: true },
          { text: "Că nu se știe nimic", correct: false },
        ],
        explanation:
          "„De la fața Domnului" e cheia. Gravitatea vine din despărțire, nu din decor.",
      },
    },
    {
      id: "v2_10",
      type: "how_god_helps",
      order: 10,
      bubbles: [
        { from: "guide", text: "Limita cinstită, și o spunem apăsat: nu știm cum arată, cât durează în termeni pe care mintea noastră îi înțelege, și nu știm cine e acolo. Creștini serioși înțeleg diferit unele detalii, iar noi nu ne prefacem că le-am rezolvat." },
        { from: "guide", text: "Un lucru e limpede în tot Noul Testament: Dumnezeu nu-l dorește pentru nimeni. Despre asta e lecția următoare." },
      ],
    },
    {
      id: "v2_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Darul fără plată al lui Dumnezeu este viața veșnică în Isus Hristos, Domnul nostru.",
        ref: "Romani 6:23",
      },
    },
  ],
}

export const vesniciaL3: Lesson = {
  id: "vesnicia_l3",
  courseId: "doctrine_c4_vesnicia",
  order: 3,
  title: "Un Dumnezeu bun ar trimite pe cineva acolo?",
  estMinutes: 11,
  anchorRefs: ["2 Petru 3:9", "Ezechiel 33:11", "Ioan 3:17"],
  memoryVerseRef: "2 Petru 3:9",
  steps: [
    {
      id: "v3_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "Asta e întrebarea din cauza căreia mulți oameni se opresc și nu mai vor să audă nimic. Și e o întrebare bună. Nu una obraznică." },
        { from: "guide", text: "Hai să nu o ocolim." },
      ],
    },
    {
      id: "v3_2",
      type: "scripture",
      order: 2,
      scripture: {
        text: "Domnul... are o îndelungă răbdare pentru voi și dorește ca niciunul să nu piară, ci toți să vină la pocăință.",
        ref: "2 Petru 3:9",
      },
      bubbles: [
        { from: "guide", text: "Prima informație, înainte de orice argument: El nu vrea asta. Nu e o dorință ascunsă a Lui, nu e un plan." },
      ],
    },
    {
      id: "v3_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Pe viața Mea, zice Domnul Dumnezeu, că nu doresc moartea celui rău, ci să se întoarcă de la calea lui și să trăiască.",
        ref: "Ezechiel 33:11",
      },
      bubbles: [
        { from: "guide", text: "„Pe viața Mea" e cel mai tare jurământ care există în Vechiul Testament. Dumnezeu jură pe El Însuși ca să spună un singur lucru: nu vreau asta." },
      ],
    },
    {
      id: "v3_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        { from: "guide", text: "Atunci de ce există? Pentru că dragostea care nu poate fi refuzată nu e dragoste, e stăpânire." },
        { from: "guide", text: "Dumnezeu a făcut oameni, nu păpuși. Un om care nu poate spune nu, nu poate nici să iubească. Iar dacă poate spune nu toată viața, trebuie să existe și un loc unde acel nu e respectat până la capăt." },
      ],
    },
    {
      id: "v3_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        { from: "guide", text: "Lumea spune: dacă Dumnezeu e bun, ar trebui să ne primească pe toți, oricum." },
        { from: "guide", text: "Biblia spune că a făcut ceva mai costisitor decât asta: a venit El, a plătit El, a luat El despărțirea în locul nostru. Pe cruce a strigat „de ce M-ai părăsit?" — ca să nu trebuiască noi." },
      ],
    },
    {
      id: "v3_6",
      type: "scripture",
      order: 6,
      scripture: {
        text: "Dumnezeu, în adevăr, n-a trimis pe Fiul Său în lume ca să judece lumea, ci ca lumea să fie mântuită prin El.",
        ref: "Ioan 3:17",
      },
    },
    {
      id: "v3_7",
      type: "choice",
      order: 7,
      choice: {
        prompt: "Ce simți acum, cinstit?",
        options: [
          { id: "v3c_a", label: "Încă mi se pare nedrept." },
          { id: "v3c_b", label: "Înțeleg, dar mă gândesc la o persoană anume." },
          { id: "v3c_c", label: "N-am privit niciodată așa lucrul ăsta." },
        ],
      },
    },
    {
      id: "v3_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        { from: "guide", text: "Dacă ți se pare încă nedrept, e în regulă să rămâi cu întrebarea deschisă. Nu-ți cerem să o închizi azi și nu te scoatem de aici pentru că o ai." },
        { from: "guide", text: "Un singur lucru te rugăm să nu confunzi: nu e un Dumnezeu care caută motive să te condamne. E Unul care a plătit ca să nu fie nevoie." },
      ],
    },
    {
      id: "v3_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Ce spune Ezechiel 33:11 despre dorința lui Dumnezeu?",
        options: [
          { text: "Că așteaptă să greșim ca să ne pedepsească", correct: false },
          { text: "Că jură pe viața Lui că nu dorește moartea celui rău, ci întoarcerea lui", correct: true },
          { text: "Că nu-L interesează ce facem", correct: false },
        ],
        explanation:
          "Cel mai tare jurământ posibil, folosit pentru o singură idee: întoarce-te și trăiește.",
      },
    },
    {
      id: "v3_10",
      type: "how_god_helps",
      order: 10,
      bubbles: [
        { from: "guide", text: "Limita cinstită: nu explicăm de ce Dumnezeu a îngăduit lumea așa cum e, cu tot ce e în ea. Nu ni s-a spus, și cine spune că știe, adaugă." },
        { from: "guide", text: "Ce ni s-a spus e ce a făcut El în privința asta. Și aia e crucea." },
      ],
    },
    {
      id: "v3_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Domnul dorește ca niciunul să nu piară, ci toți să vină la pocăință.",
        ref: "2 Petru 3:9",
      },
    },
  ],
}

/** Prima parte a cursului, în ordine. */
export const DOCTRINE_VESNICIA_PART_A: Lesson[] = [vesniciaL1, vesniciaL2, vesniciaL3]
