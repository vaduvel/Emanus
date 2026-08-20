import type { Lesson } from "../domain.js"

/*
 * path_tristete — „Când nu mai am chef de nimic”
 *
 * DE CE EXISTĂ ACEST FIȘIER
 * Ușa `tristete` a stat până acum în `path_schimbare` („Când nu te poți schimba”),
 * apoi a fost mutată de mine în `path_greutate`, împreună cu `anxietate`. Ambele
 * au fost greșeli, iar a doua a fost a mea. Documentul canonic de rutare, decizia 7,
 * cere două trasee DISTINCTE: „ar fi o ironie să le dăm aceeași lecție, când defectul
 * pe care îl reparăm este tocmai că doorEntries le trimite pe amândouă în s1c_b”.
 * Fișierul acesta este jumătatea pentru tristețe. Anxietatea primește fișierul ei.
 *
 * DE CE PRIMA, DIN TOATĂ LISTA DE CONȚINUT NOU
 * Etapa 5 ordonează după riscul pastoral și pune tristețea pe primul loc. Motivul e
 * scris în document: eticheta ușii este „Nu mai am chef de nimic”, adică anhedonie,
 * iar aceea este o întrebare de screening, nu o stare de spirit.
 *
 * REGULI DE SIGURANȚĂ APLICATE, NENEGOCIABILE
 * 1. docs/22 §3 — numerele întâi, zero versete înaintea lor. În L1, pasul `tr1_3`
 *    vine înaintea oricărui pas de tip `scripture`. Nu se reordonează.
 * 2. Decizia 6 — răspunsurile de screening sunt efemere prin construcție. Aici sunt
 *    efemere pentru că NU SE COLECTEAZĂ DELOC: în L1 nu există niciun pas de tip
 *    `choice`, `multi_choice`, `quiz`, `reflection`, `declaration` sau `name_struggle`.
 *    Triajul e scris ca autoevaluare cu instrucțiune, nu ca întrebare cu buton.
 *    Dacă cineva adaugă aici un buton care salvează, a stricat contractul.
 * 3. docs/22 §1 — nu diagnosticăm, nu învinovățim, nu promitem vindecare.
 * 4. docs/22 §8 — `reward.xp` rămâne 0.
 * 5. Documentul canonic — „fără niciun discurs despre «a te schimba»”. Cuvântul
 *    „schimbare” nu apare în lecțiile astea ca sarcină dată omului.
 *
 * REVIZIA CLINICĂ NU E OPȚIONALĂ
 * Documentul: „Revizia clinică se obține înainte de merge, nu după.” Fișierul acesta
 * este scris, nu aprobat. Până la revizie, drumul rămâne `entryState: provisional`.
 *
 * VERSETELE
 * Toate cele cinci sunt Cornilescu 1924 și au fost verificate cuvânt cu cuvânt
 * înainte de scriere. După două incidente de retranscriere pe ramura asta (opt versete
 * în divorț, cinci greșeli în suferință), regula e că textul se aduce verificat sau
 * nu se pune deloc. Nu se scrie din memorie.
 */

export const tristeteL1: Lesson = {
  id: "tristete_l1",
  courseId: "path_tristete",
  order: 1,
  title: "Întâi să știm că ești în siguranță",
  estMinutes: 12,
  anchorRefs: ["Psalmul 34:18", "1 Regi 19:5-6"],
  memoryVerseRef: "Psalmul 34:18",
  safety: {
    topic: "self_harm",
    notice:
      "Lecția aceasta începe cu o verificare de siguranță și cu numere de telefon. Emanus nu înlocuiește medicul, psihologul sau 112.",
  },
  steps: [
    {
      id: "tr1_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Ai deschis ușa pe care scrie «Nu mai am chef de nimic»." }],
    },
    {
      id: "tr1_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "N-o să-ți spun că trece. Nu știu dacă trece și nu vreau să te mint din prima zi.",
        },
        {
          from: "guide",
          text: "Dar înainte de orice altceva, avem ceva de lămurit. Durează un minut și e mai important decât toată lecția.",
        },
      ],
    },
    {
      id: "tr1_3",
      type: "step",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "Citește lista asta pentru tine. Nu bifezi nimic, nu răspunzi nimănui, nu se salvează nicăieri.",
        },
        {
          from: "guide",
          text: "Te-ai gândit că ar fi mai bine dacă n-ai mai fi. Te-ai gândit cum ai face-o. Ai făcut pregătiri. Te-ai rănit singur. Sau simți acum că nu mai poți ține până mâine.",
        },
        {
          from: "guide",
          text: "Dacă te regăsești în oricare dintre ele, oprește lecția aici și sună. 112, dacă e acum. 116 123, linia pentru suferință emoțională, dacă vrei să vorbești cu cineva. Dacă ai sub 18 ani, 116 111.",
        },
        {
          from: "guide",
          text: "Nu e o formalitate și nu-i o măsură de precauție pusă ca să fim acoperiți. Un om la telefon poate face acum ceva ce o lecție nu poate. Lecția te așteaptă.",
        },
      ],
    },
    {
      id: "tr1_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Bun. Acum să separăm patru lucruri pe care lumea le pune în aceeași oală și le zice, tuturor, «depresie».",
        },
        {
          from: "guide",
          text: "Tristețea are un motiv și se mișcă. Doliul are un nume și un chip. Epuizarea vine din prea mult, nu din prea puțin.",
        },
        {
          from: "guide",
          text: "Iar a patra e altceva: nu mai simți nimic, nici măcar la lucrurile care îți plăceau, și ține de săptămâni. Aia nu e o stare de spirit. Aia e ceva ce se tratează, și nu de mine.",
        },
      ],
    },
    {
      id: "tr1_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Nu-ți spun eu care dintre ele e. N-am cum să știu și n-ar fi corect să ghicesc.",
        },
        {
          from: "guide",
          text: "Îți spun doar atât: dacă a patra descriere ți-a sunat cunoscut, mergi la un medic sau la un psiholog. Nu în locul drumului ăstuia. În paralel cu el.",
        },
      ],
    },
    {
      id: "tr1_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "E în Biblie un om care a ajuns exact unde ești tu. Ilie. Tocmai câștigase cea mai mare zi din viața lui și, la câteva zile după, s-a culcat sub un copac și a cerut să moară.",
        },
        {
          from: "guide",
          text: "Uită-te ce a făcut Dumnezeu cu el. Nu i-a ținut predică. Nu l-a certat că un profet nu are voie să se simtă așa.",
        },
      ],
    },
    {
      id: "tr1_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Iată, l-a atins un înger și i-a zis: «Scoală-te și mănâncă.» El s-a uitat și la căpătâiul lui era o turtă coaptă pe niște pietre încălzite și un ulcior cu apă.",
        ref: "1 Regi 19:5-6",
      },
    },
    {
      id: "tr1_8",
      type: "truth_simple",
      order: 8,
      bubbles: [
        { from: "guide", text: "Somn. Mâncare. Apă. Și abia mult mai târziu, o discuție." },
        {
          from: "guide",
          text: "Prima grijă a lui Dumnezeu pentru un om prăbușit a fost trupul lui. Ține minte asta, pentru că lumea creștină o uită des.",
        },
      ],
    },
    {
      id: "tr1_9",
      type: "step",
      order: 9,
      bubbles: [
        { from: "guide", text: "Pasul de azi e mic, pentru că azi nu ai mult." },
        {
          from: "guide",
          text: "Alege un om în care ai încredere și trimite-i un mesaj astăzi. Nu trebuie să-i explici nimic. «Nu-mi e bine în perioada asta» e de ajuns.",
        },
        {
          from: "guide",
          text: "Dacă nu-ți vine niciun nume, nu înseamnă că nu ai pe nimeni. Înseamnă că azi nu-ți vine niciun nume. Sună la 116 123 și vorbește cu omul de acolo.",
        },
      ],
    },
    {
      id: "tr1_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "Domnul este aproape de cei cu inima înfrântă și mântuiește pe cei cu duhul zdrobit.",
        ref: "Psalmul 34:18",
      },
    },
    {
      id: "tr1_11",
      type: "prayer",
      order: 11,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, nu am cuvinte azi și nu am putere să caut. Tu spui că ești aproape de cei zdrobiți. Nu de cei care se ridică singuri. De cei zdrobiți. Rămâi lângă mine până mâine. Atât Îți cer. Amin.",
        },
      ],
    },
    {
      id: "tr1_12",
      type: "journal",
      order: 12,
      journalPrompt: "Dacă vrei, scrie un singur lucru pe care l-ai făcut azi. Orice. Chiar și că te-ai ridicat din pat.",
      reward: { xp: 0, axisDeltas: { emotional_peace: 1 } },
    },
  ],
}

export const tristeteL2: Lesson = {
  id: "tristete_l2",
  courseId: "path_tristete",
  order: 2,
  title: "Nu e lene și nu e lipsă de credință",
  estMinutes: 11,
  anchorRefs: ["Psalmul 13:1-2", "Psalmul 88:18"],
  memoryVerseRef: "Psalmul 13:1",
  steps: [
    {
      id: "tr2_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Ai revenit. Nu e puțin lucru." }],
    },
    {
      id: "tr2_2",
      type: "name_struggle",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Vreau să atac azi propoziția care ți s-a spus, probabil, de mai multe ori: «dacă ai avea destulă credință, ți-ar trece».",
        },
        { from: "guide", text: "Uneori ți-au spus-o oameni buni. Asta o face să doară mai tare, nu mai puțin." },
      ],
    },
    {
      id: "tr2_3",
      type: "world_vs_truth",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "Dacă propoziția aia ar fi adevărată, atunci o treime din Psalmi n-ar avea ce căuta în Biblie.",
        },
        {
          from: "guide",
          text: "Pentru că sunt scriși de oameni cu credință mare, care se plâng lui Dumnezeu fără să-și ceară scuze. Și Dumnezeu i-a pus în cartea Lui exact așa cum sunt.",
        },
      ],
    },
    {
      id: "tr2_4",
      type: "scripture",
      order: 4,
      scripture: {
        text: "Până când, Doamne, mă vei uita neîncetat? Până când Îți vei ascunde Fața de mine? Până când voi avea sufletul chinuit de griji și inima îndurerată în fiecare zi?",
        ref: "Psalmul 13:1-2",
      },
    },
    {
      id: "tr2_5",
      type: "how_god_helps",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Citește încă o dată. «Până când» de patru ori. Nu «te laud oricum», nu «știu că ai un plan».",
        },
        {
          from: "guide",
          text: "David nu-și cere iertare pentru tonul ăsta. Iar Dumnezeu nu-l ceartă. Îl trece în carte.",
        },
        {
          from: "guide",
          text: "Există și un psalm, al 88-lea, care se termină în întuneric. Fără rezolvare, fără «dar Tu ești bun». Se termină și atât. Cineva a hotărât ca și acela să rămână acolo.",
        },
      ],
    },
    {
      id: "tr2_6",
      type: "truth_simple",
      order: 6,
      bubbles: [
        { from: "guide", text: "Deci nu ești un credincios stricat pentru că nu te bucuri." },
        {
          from: "guide",
          text: "Ai voie să vii la Dumnezeu exact așa. Nu curățat înainte, nu cu fața aranjată. Așa.",
        },
      ],
    },
    {
      id: "tr2_7",
      type: "quiz",
      order: 7,
      quiz: {
        question: "Cineva îți spune: «roagă-te mai mult și o să treacă». Ce faci cu propoziția asta?",
        options: [
          { text: "O accept — dacă nu-mi trece, înseamnă că nu m-am rugat destul", correct: false },
          {
            text: "O las deoparte — rugăciunea nu e o plată care cumpără o stare, iar Psalmii nu funcționează așa",
            correct: true,
          },
          { text: "Mă cert cu omul care mi-a spus-o", correct: false },
        ],
        explanation:
          "Rugăciunea nu e o plată. Dacă ar fi, psalmul 88 s-ar fi terminat altfel. Omul care ți-a spus-o poate a vrut binele; propoziția rămâne greșită.",
      },
    },
    {
      id: "tr2_8",
      type: "step",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "Pasul de azi. Spune-I lui Dumnezeu un singur lucru, cu voce tare, în forma în care chiar îl simți. Fără să-l îmbraci frumos.",
        },
        { from: "guide", text: "Dacă iese «nu mai pot», atât să iasă. E rugăciune. E chiar în Biblie." },
      ],
    },
    {
      id: "tr2_9",
      type: "memory_verse",
      order: 9,
      scripture: {
        text: "Până când, Doamne, mă vei uita neîncetat?",
        ref: "Psalmul 13:1",
      },
    },
    {
      id: "tr2_10",
      type: "prayer",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, nu mai încerc să sun bine. Până când? Asta e tot ce am azi. Ai lăsat întrebarea asta în cartea Ta, deci pot să Ți-o pun și eu. Ascult-o. Amin.",
        },
      ],
    },
    {
      id: "tr2_11",
      type: "journal",
      order: 11,
      journalPrompt: "Ce propoziție ți s-a spus, despre starea ta, care ți-a făcut rău? Scrie-o și lasă-o aici.",
      reward: { xp: 0, axisDeltas: { emotional_peace: 1 } },
    },
  ],
}

export const tristeteL3: Lesson = {
  id: "tristete_l3",
  courseId: "path_tristete",
  order: 3,
  title: "Trupul are cuvântul lui",
  estMinutes: 11,
  anchorRefs: ["1 Regi 19:5-6"],
  memoryVerseRef: "1 Regi 19:5",
  safety: {
    topic: "mental_health",
    notice:
      "Lecția aceasta vorbește despre îngrijire medicală. Emanus nu dă diagnostic și nu recomandă tratamente.",
  },
  steps: [
    {
      id: "tr3_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum ai dormit?" }],
    },
    {
      id: "tr3_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Întrebarea aia n-a fost politețe. E lecția de azi.",
        },
        {
          from: "guide",
          text: "Ne-am obișnuit să tratăm starea sufletului ca și cum ar pluti deasupra trupului. Nu plutește. Stă în el.",
        },
      ],
    },
    {
      id: "tr3_3",
      type: "world_vs_truth",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "Într-o parte se spune: e doar chimie, ia o pastilă. În cealaltă: e doar duhovnicesc, roagă-te.",
        },
        { from: "guide", text: "Amândouă taie omul în două. Biblia nu-l taie." },
      ],
    },
    {
      id: "tr3_4",
      type: "scripture",
      order: 4,
      scripture: {
        text: "Iată, l-a atins un înger și i-a zis: «Scoală-te și mănâncă.» El s-a uitat și la căpătâiul lui era o turtă coaptă pe niște pietre încălzite și un ulcior cu apă.",
        ref: "1 Regi 19:5-6",
      },
    },
    {
      id: "tr3_5",
      type: "how_god_helps",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Am pus versetul ăsta a doua oară intenționat. Vreau să-l ții minte.",
        },
        {
          from: "guide",
          text: "Un om care voia să moară a primit, din cer, o turtă și un ulcior cu apă. Și l-au lăsat să doarmă de două ori înainte de orice conversație.",
        },
        {
          from: "guide",
          text: "Dacă Dumnezeu a început de acolo, nu e nerușinare să începi și tu de acolo.",
        },
      ],
    },
    {
      id: "tr3_6",
      type: "truth_simple",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Somnul, mâncarea, lumina de afară și mișcatul din casă nu vindecă tristețea. Nimeni nu-ți promite asta.",
        },
        {
          from: "guide",
          text: "Dar fără ele, nimic altceva nu are pe ce se așeza. Sunt podeaua, nu acoperișul.",
        },
      ],
    },
    {
      id: "tr3_7",
      type: "step",
      order: 7,
      bubbles: [
        { from: "guide", text: "Pasul de azi. Alege unul singur dintre cele patru. Unul." },
        {
          from: "guide",
          text: "Culcă-te cu o oră mai devreme. Sau mănâncă o masă adevărată. Sau ieși zece minute afară, chiar și pe bloc. Sau bea apă acum.",
        },
        {
          from: "guide",
          text: "Nu patru. Unul. Dacă îți propui patru, nu faci niciunul și pe urmă te învinovățești, iar asta e mai rău decât dacă nu începeam.",
        },
      ],
    },
    {
      id: "tr3_8",
      type: "step",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "Și încă ceva, care intră tot la trup. Dacă starea asta ține de peste două săptămâni, fă-ți o programare la medic.",
        },
        {
          from: "guide",
          text: "Nu e semn că ai renunțat la Dumnezeu. Ilie a mâncat pâinea trimisă din cer, n-a refuzat-o pentru că era prea pământească.",
        },
      ],
    },
    {
      id: "tr3_9",
      type: "memory_verse",
      order: 9,
      scripture: {
        text: "Scoală-te și mănâncă.",
        ref: "1 Regi 19:5",
      },
    },
    {
      id: "tr3_10",
      type: "prayer",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, m-ai făcut cu trup și nu Te-ai rușinat de asta. Ajută-mă să fac azi lucrul mic pe care l-am ales. Și dă-mi curajul să cer ajutor de la un om priceput, dacă asta îmi trebuie. Amin.",
        },
      ],
    },
    {
      id: "tr3_11",
      type: "journal",
      order: 11,
      journalPrompt: "Care dintre cele patru l-ai ales? Scrie-l, ca să știi mâine ce ai zis.",
      reward: { xp: 0, axisDeltas: { emotional_peace: 1 } },
    },
  ],
}

export const tristeteL4: Lesson = {
  id: "tristete_l4",
  courseId: "path_tristete",
  order: 4,
  title: "Cui îi spui, și ce îi spui",
  estMinutes: 11,
  anchorRefs: ["Galateni 6:2"],
  memoryVerseRef: "Galateni 6:2",
  steps: [
    {
      id: "tr4_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "A patra zi. Cum a fost cu lucrul mic de ieri?" }],
    },
    {
      id: "tr4_2",
      type: "name_struggle",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Când ești așa, se întâmplă un lucru ciudat: exact lucrul care ar ajuta e lucrul care pare imposibil. Să spui cuiva.",
        },
        {
          from: "guide",
          text: "Și motivul nu e că ești mândru. E că ți-e frică de fața pe care o s-o facă.",
        },
      ],
    },
    {
      id: "tr4_3",
      type: "world_vs_truth",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "Se spune că omul matur duce singur. Se citează chiar și versete pentru asta.",
        },
        { from: "guide", text: "Uite ce spune, de fapt, versetul." },
      ],
    },
    {
      id: "tr4_4",
      type: "scripture",
      order: 4,
      scripture: {
        text: "Purtați-vă sarcinile unii altora și veți împlini astfel Legea lui Hristos.",
        ref: "Galateni 6:2",
      },
    },
    {
      id: "tr4_5",
      type: "how_god_helps",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "A cere ajutor nu încalcă maturitatea, ci împlinește textul. Cine duce singur nu e mai duhovnicesc; doar îl împiedică pe altul să facă ce i s-a cerut.",
        },
      ],
    },
    {
      id: "tr4_6",
      type: "step",
      order: 6,
      bubbles: [
        { from: "guide", text: "Cum alegi omul. Trei semne, și niciunul nu e «cel mai duhovnicesc din biserică»." },
        {
          from: "guide",
          text: "Unu: nu se sperie. Doi: nu repetă mai departe. Trei: nu-ți dă soluții în prima propoziție.",
        },
        {
          from: "guide",
          text: "Al treilea e cel mai important. Ai nevoie de cineva care poate sta cu tine în ceva ce nu se rezolvă azi.",
        },
      ],
    },
    {
      id: "tr4_7",
      type: "step",
      order: 7,
      bubbles: [
        { from: "guide", text: "Ce îi spui. Nu trebuie să explici tot. Trei propoziții ajung." },
        {
          from: "guide",
          text: "«Trec printr-o perioadă grea.» «Nu-ți cer să rezolvi.» «Aș vrea doar să știi și să mă întrebi din când în când ce fac.»",
        },
        { from: "guide", text: "Ultima e cea care contează. Îi dai un rol pe care poate să-l ducă." },
      ],
    },
    {
      id: "tr4_8",
      type: "quiz",
      order: 8,
      quiz: {
        question: "Îi spui unui prieten și el răspunde imediat cu «trebuie să te rogi mai mult». Ce înseamnă?",
        options: [
          { text: "Că am greșit spunându-i și mai bine tăceam", correct: false },
          { text: "Că nu el e omul potrivit pentru asta — caut altul, fără să-l condamn", correct: true },
          { text: "Că are dreptate și problema e la mine", correct: false },
        ],
        explanation:
          "Un răspuns prost nu înseamnă că ai greșit deschizându-te. Înseamnă că omul acela nu poate duce sarcina asta. Se caută altul. De obicei nu e primul la care te gândești.",
      },
    },
    {
      id: "tr4_9",
      type: "memory_verse",
      order: 9,
      scripture: {
        text: "Purtați-vă sarcinile unii altora și veți împlini astfel Legea lui Hristos.",
        ref: "Galateni 6:2",
      },
    },
    {
      id: "tr4_10",
      type: "prayer",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, dă-mi un om. Nu mulți, unul. Unul care nu se sperie și nu se grăbește. Și dă-mi curaj să deschid gura, chiar dacă îmi tremură vocea. Amin.",
        },
      ],
    },
    {
      id: "tr4_11",
      type: "journal",
      order: 11,
      journalPrompt: "Scrie un nume. Doar unul. Nu trebuie să-i scrii azi.",
      reward: { xp: 0, axisDeltas: { relationships: 1 } },
    },
  ],
}

export const tristeteL5: Lesson = {
  id: "tristete_l5",
  courseId: "path_tristete",
  order: 5,
  title: "Dimineața, fără să mint",
  estMinutes: 11,
  anchorRefs: ["Plângerile 3:22-23", "Psalmul 34:18"],
  memoryVerseRef: "Plângerile 3:23",
  steps: [
    {
      id: "tr5_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Ultima zi din drumul ăsta." }],
    },
    {
      id: "tr5_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "N-o să închei spunându-ți că de mâine e mai bine. Ți-am promis în prima zi că nu te mint și țin promisiunea până la capăt.",
        },
        { from: "guide", text: "Dar am ceva de arătat, și e scris de un om care pierduse absolut tot." },
      ],
    },
    {
      id: "tr5_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Bunătățile Domnului nu s-au sfârșit, îndurările Lui nu sunt la capăt, ci se înnoiesc în fiecare dimineață.",
        ref: "Plângerile 3:22-23",
      },
    },
    {
      id: "tr5_4",
      type: "how_god_helps",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Cartea din care e luat versetul se numește «Plângerile». Tot ce e în jurul lui e jale, cetate arsă, copii flămânzi. Nu e scris de un om care avea o zi bună.",
        },
        {
          from: "guide",
          text: "Și uită-te ce nu spune. Nu spune «mâine o să-ți fie mai bine». Spune că îndurarea se înnoiește dimineața. Adică ajunge pentru ziua aia. Atât.",
        },
      ],
    },
    {
      id: "tr5_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Asta e diferența dintre speranță și minciună optimistă. Minciuna spune că se termină curând. Speranța spune că ai destul pentru azi și că mâine dimineață vine altă porție.",
        },
        {
          from: "guide",
          text: "Nu ți se cere să duci tot anul. Ți se cere să duci până diseară.",
        },
      ],
    },
    {
      id: "tr5_6",
      type: "step",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Ce rămâne cu tine după drumul ăsta, în ordinea în care se folosesc:",
        },
        {
          from: "guide",
          text: "Numerele, dacă vreodată se întunecă de tot. Lucrul mic pentru trup. Omul căruia i-ai spus. Și voia de a-I spune lui Dumnezeu adevărul, chiar dacă adevărul e «până când».",
        },
      ],
    },
    {
      id: "tr5_7",
      type: "step",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "Iar dacă peste o săptămână ești tot acolo, nu înseamnă că drumul n-a folosit la nimic.",
        },
        {
          from: "guide",
          text: "Înseamnă că ai nevoie de mai mult decât o lecție pe telefon. Mergi la medic sau la psiholog. E pasul următor, nu eșecul pasului de acum.",
        },
      ],
    },
    {
      id: "tr5_8",
      type: "memory_verse",
      order: 8,
      scripture: {
        text: "Se înnoiesc în fiecare dimineață.",
        ref: "Plângerile 3:23",
      },
    },
    {
      id: "tr5_9",
      type: "prayer",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, nu-Ți cer să-mi treacă mâine. Îți cer atât cât ai promis: destul pentru ziua de azi. Iar mâine dimineață vin din nou și cer iar. Amin.",
        },
      ],
    },
    {
      id: "tr5_10",
      type: "journal",
      order: 10,
      journalPrompt: "Ce e altfel azi față de ziua întâi? Chiar dacă e un lucru foarte mic, sau chiar dacă nu e nimic — scrie ce e.",
      reward: { xp: 0, axisDeltas: { emotional_peace: 1 } },
    },
  ],
}

export const TRISTETE_LESSONS: Lesson[] = [
  tristeteL1,
  tristeteL2,
  tristeteL3,
  tristeteL4,
  tristeteL5,
]

/*
 * Practicile drumului. Index-aliniate cu lecțiile de mai sus.
 * Regula: fiecare practică se poate face într-o zi proastă. Dacă o practică cere
 * energie pe care omul n-o are, e scrisă greșit pentru drumul acesta.
 */
export const TRISTETE_PRACTICES: string[] = [
  "Salvează 116 123 în telefon, cu un nume pe care îl recunoști. Se face în treizeci de secunde și se folosește o dată în viață.",
  "Când îți vine în minte o propoziție de felul «un creștin adevărat n-ar fi așa», spune cu voce tare: «Psalmul 13 e în Biblie».",
  "Lucrul mic pentru trup, ales în lecția a treia, repetat astăzi. Același, nu altul.",
  "Scrie-i omului al cărui nume l-ai notat. Trei propoziții, nu mai mult.",
  "Dimineața, înainte de telefon: «destul pentru azi». Atât.",
]
