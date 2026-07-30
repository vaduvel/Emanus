import type { Lesson } from "../domain.js"

/*
 * Pildele lui Iisus — Cursul 3: „Cum trăiește un fiu", fișele 1-3.
 * (docs/16-modul-pilde.md §Cursul 3)
 *
 * Cele patru câmpuri obligatorii, în ordine, în fiecare fișă:
 *  audience (cui i-a fost spusă) → main_point (unul singur) →
 *  misread (citirea greșită, în forma ei cea mai atrăgătoare) → honest_limit.
 *
 * Cursul ăsta răspunde la întrebarea „bun, și acum concret ce fac?" — deci
 * tonul e mai didactic (decizia de ton din chat), dar tot narativ, și niciun
 * pas nu se transformă în listă de reguli de bifat.
 */

export const pildaSamariteanul: Lesson = {
  id: "pilda_samariteanul",
  courseId: "parables_c3_fiul",
  order: 1,
  title: "Samariteanul milostiv",
  estMinutes: 12,
  anchorRefs: ["Luca 10:25-37", "Luca 10:29", "Luca 10:36"],
  memoryVerseRef: "Luca 10:36",
  steps: [
    {
      id: "f1_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "Pilda asta a ajuns numele unei legi și al unui spital. Așa se pierde o pildă: devine atât de cunoscută încât nimeni nu mai vede ce a spus." },
        { from: "guide", text: "Hai să începem de la întrebarea din care a ieșit. Pentru că întrebarea aceea era o capcană." },
      ],
    },
    {
      id: "f1_2",
      type: "scripture",
      order: 2,
      scripture: {
        text: "Dar el, vrând să se îndreptățească, a zis lui Isus: „Și cine este aproapele meu?”",
        ref: "Luca 10:29",
      },
      bubbles: [
        { from: "guide", text: "Cui i-a fost spusă: unui învățător al Legii, om instruit, care voia să se îndreptățească. Luca ne spune motivul lui, ca să nu-l ghicim noi." },
        { from: "guide", text: "„Cine este aproapele meu” nu era o întrebare de curiozitate. Era o căutare de limite: spune-mi unde se termină lista, ca să știu că mi-am făcut treaba." },
      ],
    },
    {
      id: "f1_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        { from: "guide", text: "Două propoziții de context, ca să nu-i piară țepii: drumul de la Ierusalim la Ierihon cobora vreo mie de metri, printre stânci, și era cunoscut ca loc de tâlhărie. Nu era o poveste inventată, era o știre de zi." },
        { from: "guide", text: "Iar un samaritean nu era pur și simplu un străin. Era, pentru un evreu, un om cu credință stricată și cu sânge amestecat — exact tipul de om pe care îl dai ca exemplu de rău." },
      ],
    },
    {
      id: "f1_4",
      type: "scripture",
      order: 4,
      scripture: {
        text: "Care dintre acești trei ți se pare că a dat dovadă că este aproapele celui căzut între tâlhari?",
        ref: "Luca 10:36",
      },
      bubbles: [
        { from: "guide", text: "Punctul principal, și Iisus îl spune singur: întrebarea e întoarsă. Nu „cine intră pe lista mea”, ci „cui poți fi tu aproapele”." },
        { from: "guide", text: "Prima întrebare caută o limită. A doua nu are limită, pentru că depinde numai de tine și de omul care e în fața ta acum." },
      ],
    },
    {
      id: "f1_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        { from: "guide", text: "Citirea greșită, cea pe care am auzit-o cu toții: „fii bun cu oamenii, ajută-i pe cei în nevoie”. E adevărat și totuși e cea mai mică parte din ce s-a spus." },
        { from: "guide", text: "Pentru că pilda e și o oglindă. Încearcă să te pui în groapă, nu pe drum. Tu ești omul jefuit, lăsat pe jumătate mort. Cei care ar fi trebuit să te ajute au trecut pe partea cealaltă. Și cel care s-a oprit e Cel pe care tu îl disprețuiai." },
        { from: "guide", text: "Iisus a fost numit samaritean ca insultă, în Ioan 8:48. Cei de la masă au prins asta înaintea noastră." },
      ],
    },
    {
      id: "f1_6",
      type: "choice",
      order: 6,
      choice: {
        prompt: "Unde te vezi azi în pildă?",
        options: [
          { id: "f1c_a", label: "În groapă. Am nevoie să se oprească cineva la mine." },
          { id: "f1c_b", label: "Pe drum, grăbit. Trec pe lângă oameni și știu." },
          { id: "f1c_c", label: "Am ajutat și m-am ars. Acum mă feresc." },
        ],
      },
    },
    {
      id: "f1_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        { from: "guide", text: "Dacă ești în groapă: prima veste e că Cineva S-a oprit deja și a plătit și hanăul înainte. Nu ți se cere să te ridici singur ca să fii ajutat." },
        { from: "guide", text: "Dacă treci grăbit: nu îți cerem să te simți vinovat pentru toți oamenii lumii. Samariteanul a ajutat un om, nu tot drumul. Un om, azi." },
        { from: "guide", text: "Dacă te-ai ars: uită-te cât de măsurat a fost și el — a plătit două dinari și a plecat la treaba lui, cu promisiunea că se întoarce. Mila lui n-a fost fără margini practice. Ajutorul cinstit are o limită, și asta nu e nepăsare." },
      ],
    },
    {
      id: "f1_8",
      type: "step",
      order: 8,
      bubbles: [
        { from: "guide", text: "Un singur lucru azi: gândește-te la un om pe lângă care treci des și despre care știi că nu e bine. Fă un lucru mic și concret pentru el în 24 de ore — un mesaj, un telefon, ceva dus la ușă." },
        { from: "guide", text: "Nu-i spune că e din cauza unei lecții. Samariteanul n-a explicat nimic." },
      ],
    },
    {
      id: "f1_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Ce face Iisus cu întrebarea „cine este aproapele meu?”",
        options: [
          { text: "O lărgește: aproapele e orice om de pe pământ", correct: false },
          { text: "O întoarce: nu cine îmi este, ci cui pot fi eu aproapele", correct: true },
          { text: "O ocolește și schimbă subiectul", correct: false },
        ],
        explanation:
          "Luca 10:36. Prima întrebare căuta o limită. A doua mută totul din liste în fapte.",
      },
    },
    {
      id: "f1_10",
      type: "how_god_helps",
      order: 10,
      bubbles: [
        { from: "guide", text: "Limita cinstită: pilda nu spune că trebuie să spui da la tot și să te lași secat. Nu spune că trebuie să rămâi în preajma cuiva care te rănește, și nu înlocuiește ajutorul de specialitate — samariteanul l-a dus la han, nu l-a ținut pe drum." },
        { from: "guide", text: "Și nu ne spune de ce a fost jefuit omul acela. Textul nu explică nedreptatea, o ia ca fapt și întreabă ce facem cu ea." },
      ],
    },
    {
      id: "f1_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Care dintre acești trei ți se pare că a dat dovadă că este aproapele celui căzut între tâlhari? — Du-te și fă și tu la fel.",
        ref: "Luca 10:36-37",
      },
    },
  ],
}

export const pildaTalantii: Lesson = {
  id: "pilda_talantii",
  courseId: "parables_c3_fiul",
  order: 2,
  title: "Talanții",
  estMinutes: 11,
  anchorRefs: ["Matei 25:14-30", "Matei 25:24-25", "1 Ioan 4:18"],
  memoryVerseRef: "Matei 25:25",
  steps: [
    {
      id: "f2_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "Pilda asta e folosită azi mai ales în conferințe de motivare: înmulțește-ți talentele, nu-ți îngropa potențialul." },
        { from: "guide", text: "Numai că robul cu un talant nu a fost leneș din comoditate. El spune singur ce l-a oprit, și motivul lui e altul." },
      ],
    },
    {
      id: "f2_2",
      type: "name_struggle",
      order: 2,
      bubbles: [
        { from: "guide", text: "Cui i-a fost spusă: ucenicilor, pe Muntele Măslinilor, într-un șir de pilde despre așteptarea stăpânului. Deci e o pildă despre Împărăție, nu un curs de administrare a banilor." },
        { from: "guide", text: "Un talant nu era un talent. Era o cantitate de argint, cam douăzeci de ani de salariu. Chiar și cel cu unul singur primise o avere." },
      ],
    },
    {
      id: "f2_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Doamne, am știut că ești om greu, care mesteci de unde n-ai semănat și strângi de unde n-ai voră; mi-a fost teamă și m-am dus și ți-am ascuns talantul în pământ.",
        ref: "Matei 25:24-25",
      },
      bubbles: [
        { from: "guide", text: "„Mi-a fost teamă.” Asta e propoziția din care se înțelege toată pilda." },
        { from: "guide", text: "El nu a furat și nu a pierdut nimic. A păstrat perfect. Și a păstrat perfect pentru că își imagina un stăpân dur, care caută greșeala." },
      ],
    },
    {
      id: "f2_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        { from: "guide", text: "Punctul principal: nu lenea l-a paralizat, ci imaginea greșită despre stăpân. Cum Îl vezi pe Dumnezeu decide ce îndrăznești să faci pentru El." },
        { from: "guide", text: "Ceilalți doi n-au fost mai talentați. Au fost mai liniștiți. Un om care nu se teme de stăpânul lui poate risca ceva." },
      ],
    },
    {
      id: "f2_5",
      type: "scripture",
      order: 5,
      scripture: {
        text: "În dragoste nu este frică; ci dragostea desăvârșită izgonește frica, pentru că frica are cu ea pedeapsa.",
        ref: "1 Ioan 4:18",
      },
      bubbles: [
        { from: "guide", text: "De aceea nu se rezolvă nimic dacă îți spui „trebuie să fac mai mult”. Frica nu se scoate cu efort. Se scoate când se schimbă imaginea despre Cel pentru care lucrezi." },
      ],
    },
    {
      id: "f2_6",
      type: "world_vs_truth",
      order: 6,
      bubbles: [
        { from: "guide", text: "Citirea greșită, foarte plăcută la auz: „Dumnezeu vrea să ai succes, să-ți înmulțești banii și talentele”." },
        { from: "guide", text: "În pildă, nimic nu e al robului. Argintul e al stăpânului, de la început până la sfârșit. Iar răsplata nu e o promovare și nici bani — e „intră în bucuria stăpânului tău”." },
      ],
    },
    {
      id: "f2_7",
      type: "choice",
      order: 7,
      choice: {
        prompt: "Ce te oprește, mai des, să faci ceva pentru Dumnezeu?",
        options: [
          { id: "f2c_a", label: "Frica de a o da în bară și de a fi certat." },
          { id: "f2c_b", label: "Sentimentul că nu am nimic de dat." },
          { id: "f2c_c", label: "Comparația. Alții au cinci, eu am unul." },
        ],
      },
    },
    {
      id: "f2_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        { from: "guide", text: "Dacă e frica: observă că stăpânul nu i-a reproșat un rezultat slab. I-a reproșat că nu a făcut nici măcar cel mai puțin riscant lucru posibil. Nu se cere reușită. Se cere să nu îngropi." },
        { from: "guide", text: "Dacă e sentimentul că nu ai nimic: cel cu unul singur avea o avere în mână și credea că nu are mare lucru. Foarte des e exact așa." },
        { from: "guide", text: "Dacă e comparația: cei doi laudați primesc, cuvânt cu cuvânt, aceeași laudă. Cinci și doi, aceeași propoziție." },
      ],
    },
    {
      id: "f2_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Ce a făcut rău robul cu un talant?",
        options: [
          { text: "A furat argintul stăpânului", correct: false },
          { text: "A investit și a pierdut", correct: false },
          { text: "S-a temut — și frica l-a făcut să nu încerce nimic", correct: true },
        ],
        explanation:
          "Matei 25:25: „mi-a fost teamă”. La rădăcină stă o imagine greșită despre stăpân, nu lenea.",
      },
    },
    {
      id: "f2_10",
      type: "how_god_helps",
      order: 10,
      bubbles: [
        { from: "guide", text: "Limita cinstită: pilda nu îți spune ce anume ți s-a încredințat ție și nu garantează că ce începi va reuși. Nu e o promisiune de rezultat — e o vindecare a fricii de Stăpân." },
        { from: "guide", text: "Și partea grea de la final rămâne grea. Nu o îndulcim și nu o folosim ca să speriem pe nimeni. În chestiuni de judecată, noi nu avem lista și nu suntem la masă acolo." },
      ],
    },
    {
      id: "f2_11",
      type: "journal",
      order: 11,
      journalPrompt:
        "Scrie un lucru pe care îl eviți de frică, nu din lipsă de timp. Și, dedesubt, ce crezi că s-ar întâmpla dacă ai greși încercând.",
    },
    {
      id: "f2_12",
      type: "memory_verse",
      order: 12,
      scripture: {
        text: "Mi-a fost teamă și m-am dus și ți-am ascuns talantul în pământ.",
        ref: "Matei 25:25",
      },
    },
  ],
}

export const pildaDoiFii: Lesson = {
  id: "pilda_doi_fii",
  courseId: "parables_c3_fiul",
  order: 3,
  title: "Cei doi fii",
  estMinutes: 9,
  anchorRefs: ["Matei 21:28-32"],
  memoryVerseRef: "Matei 21:31",
  steps: [
    {
      id: "f3_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "Cea mai scurtă pildă din curs și cea mai greu de purtat. Un tată cere la doi fii să meargă la vie. Unul spune nu și se duce. Celălalt spune da și nu se duce." },
      ],
    },
    {
      id: "f3_2",
      type: "name_struggle",
      order: 2,
      bubbles: [
        { from: "guide", text: "Cui i-a fost spusă: preoților de seamă și bătrânilor poporului, în Templu, în săptămâna dinainte de cruce. Oameni cu funcții și cu răspundere, care spuseseră „da” toată viața." },
        { from: "guide", text: "De aceea urmează imediat o propoziție care i-a scandalizat: vameșii și femeile de stradă intră înaintea lor în Împărăție." },
      ],
    },
    {
      id: "f3_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        { from: "guide", text: "Punctul principal: contează cine s-a dus, nu cine a spus „da”." },
        { from: "guide", text: "Și mai e ceva blând în pildă, care se pierde: primul fiu a răspuns urât, apoi s-a căit și s-a dus. Un „nu” spus azi nu e ultima propoziție din viața nimănui." },
      ],
    },
    {
      id: "f3_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Citirea greșită, foarte a zilelor noastre: „contează intenția, important e că în suflet vreau binele”." },
        { from: "guide", text: "În pildă, fiul cu intenția frumoasă și cu vorba respectuoasă e cel care nu face voia tatălui. Iisus nu întreabă cine a fost sincer când a vorbit. Întreabă cine a ajuns la vie." },
      ],
    },
    {
      id: "f3_5",
      type: "choice",
      order: 5,
      choice: {
        prompt: "Cu care ai semănat mai mult în ultima lună?",
        options: [
          { id: "f3c_a", label: "Am spus da la multe și n-am făcut aproape nimic." },
          { id: "f3c_b", label: "Am spus nu, dar pe urmă m-am dus." },
          { id: "f3c_c", label: "N-am mai fost întrebat nimic de mult." },
        ],
      },
    },
    {
      id: "f3_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Dacă ai bifat prima: nu îți cerem să spui „da” mai tare. Îți propunem invers — promite mai puțin și fă acel puțin. Un lucru mic, dus la capăt, spune mai mult decât zece angajamente." },
        { from: "guide", text: "Dacă ai bifat a doua: ești fiul lăudat în pildă, și probabil te simți cel mai puțin în regulă dintre toți. Ți-e rușine de „nu”-ul spus și ai uitat că te-ai dus." },
      ],
    },
    {
      id: "f3_7",
      type: "step",
      order: 7,
      bubbles: [
        { from: "guide", text: "Un singur lucru azi: alege un „da” pe care l-ai spus și nu l-ai făcut. Ori îl faci în 48 de ore, ori te duci și spui cinstit omului că nu poți." },
        { from: "guide", text: "A retrage un da nefăcut e mai aproape de adevăr decât a-l lăsa să atrâne acolo." },
      ],
    },
    {
      id: "f3_8",
      type: "quiz",
      order: 8,
      quiz: {
        question: "Care fiu a făcut voia tatălui?",
        options: [
          { text: "Cel care a răspuns respectuos „mă duc”", correct: false },
          { text: "Cel care a spus „nu vreau”, apoi s-a căit și s-a dus", correct: true },
          { text: "Niciunul — pilda își lasă finalul deschis", correct: false },
        ],
        explanation:
          "Matei 21:31. Iisus îi pune pe ascultători să dea singuri verdictul, și abia apoi le arată că vorbea despre ei.",
      },
    },
    {
      id: "f3_9",
      type: "how_god_helps",
      order: 9,
      bubbles: [
        { from: "guide", text: "Limita cinstită: pilda nu spune că faptele te fac fiu. Cei doi erau deja fii ai aceluiași tată, înainte să fie întrebați orice. Vorbește despre ce se vede din ce ești, nu despre cum devii." },
        { from: "guide", text: "Și nu ne dă dreptul să socotim noi cine a ajuns la vie și cine nu. Cei care au dat verdictul în text erau, fără să știe, cei judăcați în pildă." },
      ],
    },
    {
      id: "f3_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "Care din amândoi a făcut voia tatălui său?",
        ref: "Matei 21:31",
      },
    },
  ],
}

/** Prima parte a cursului 3, în ordine. */
export const PILDE_FIUL_PART_A: Lesson[] = [
  pildaSamariteanul,
  pildaTalantii,
  pildaDoiFii,
]
