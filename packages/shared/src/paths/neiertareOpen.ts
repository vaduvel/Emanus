import type { Lesson } from "../domain.js"

/*
 * CAMERA 2 — cele două lecții de deschidere. (docs/21 §2 și §7 pct. 2)
 *
 * Etapa 2 din harta lui Dumnezeu — "Descoperirea Persoanei" — nu vine ÎNAINTEA
 * camerei, ci ÎNĂUNTRUL ei, în limbajul rănii. În C2 ("nu e bun / m-a lăsat"),
 * "Dumnezeu e bun" nu se aude ca teologie. Se aude ca: nu El ți-a făcut asta,
 * și nu a privit de departe.
 *
 * Aceeași lumină, alt geam.
 *
 * DE CE PRIMELE: omul care a fost nedreptățit nu poate ierta cât timp Îl bănuiește
 * pe Dumnezeu că a fost de partea celui care l-a rănit. Restul drumului stă pe
 * aceste două lecții.
 *
 * REGULI RESPECTATE (docs/22-siguranta.md):
 *  - nu spunem nicăieri "ți s-a întâmplat pentru că nu ai crezut / nu ai iertat";
 *  - nu explicăm de ce a permis Dumnezeu; nu avem răspunsul și nu inventăm unul;
 *  - `o1_10` trimite la ajutor real și NU se șterge;
 *  - vocea nu se prezintă cu nume de om (vezi GUIDE_NAME în LessonPlayer.tsx).
 *    Motivul: dacă pare o persoană reală, omul crede că cineva îi citește jurnalul.
 *
 * Câmpul `order` urmează ordinea reală din `pathNeiertare.lessons`: aceste
 * deschideri sunt sesiunile 1 și 2, iar lecțiile istorice continuă de la 3.
 */

export const neiertareO1: Lesson = {
  id: "neiertare_o1",
  courseId: "path_neiertare",
  order: 1,
  title: "Nu El ti-a facut asta",
  estMinutes: 10,
  anchorRefs: ["Iacov 1:17", "Ioan 10:10", "Iacov 1:13"],
  memoryVerseRef: "Iacov 1:17",
  steps: [
    {
      id: "o1_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Bine că ești aici." },
        {
          from: "guide",
          text: "Nu îți cer povestea și nu îți cer numele nimănui. Tu le știi. Ce scrii aici rămâne în telefonul tău — nu citește nimeni.",
        },
        {
          from: "guide",
          text: "Eu am altceva de spus, și e ceva ce trebuie spus înaintea oricărui pas.",
        },
      ],
    },
    {
      id: "o1_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Ai apăsat un rând care spune că ți s-a luat ceva, sau ți s-a făcut ceva, sau ai pierdut pe cineva.",
        },
        {
          from: "guide",
          text: "Iar undeva, poate fără să fi spus-o vreodată cu voce tare, s-a lipit de tine o întrebare: dacă Dumnezeu e bun, de ce arată așa viața mea?",
        },
        { from: "guide", text: "Nu fug de întrebarea asta. Începem cu ea." },
      ],
    },
    {
      id: "o1_3",
      type: "name_struggle",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "Cel mai greu nu e durerea. Cel mai greu e bănuiala care rămâne după ea: că El a văzut și n-a mișcat, deci a fost de acord. Sau că mi-a trebuit.",
        },
        {
          from: "guide",
          text: "Cu bănuiala asta în piept, nu poți ierta pe nimeni. Pentru că, de fapt, nu pe om Îl ții de vină.",
        },
      ],
    },
    {
      id: "o1_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Ți s-au spus, probabil, lucruri de felul: «asa a vrut Dumnezeu», «El știe ce face», «te-a încercat».",
        },
        {
          from: "guide",
          text: "Oamenii spun asta ca să umple liniștea, nu pentru că ar ști. Iar tu ai rămas cu ideea că mâna care ți-a stricat viața a fost mâna Lui.",
        },
        { from: "guide", text: "Scriptura spune limpede altceva." },
      ],
    },
    {
      id: "o1_5",
      type: "scripture",
      order: 5,
      scripture: {
        text: "Orice dar bun și orice dar desăvârșit este de sus, coborându-se de la Tatăl luminilor, în care nu este nici schimbare, nici umbră de mutare.",
        ref: "Iacov 1:17",
      },
    },
    {
      id: "o1_6",
      type: "truth_simple",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Iacov folosește aici două cuvinte luate din astronomie. Unul înseamnă variație — mișcarea unui astru care nu stă în același loc pe cer. Celălalt înseamnă umbra pe care o face un corp când se rotește.",
        },
        {
          from: "guide",
          text: "Adică: soarele are zile în care arde și zile în care se ascunde. Are apusuri. Face umbre. El nu.",
        },
        {
          from: "guide",
          text: "Nu are față și dos. Nu are zile bune și zile în care Se răzgândește. Ce este acum, era și în ziua în care ție ți s-a rupt ceva.",
        },
      ],
    },
    {
      id: "o1_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Nimeni, când este ispitit, să nu zică: «Sunt ispitit de Dumnezeu». Căci Dumnezeu nu poate fi ispitit ca să facă rău, și El însuși nu ispitește pe nimeni.",
        ref: "Iacov 1:13",
      },
    },
    {
      id: "o1_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "Iisus a împărțit lumea în două mișcări, într-o singură propoziție: «Hoțul nu vine decât să fure, să junghie și să prăpădească. Eu am venit ca oile să aibă viață, și s-o aibă din belșug.»",
        },
        {
          from: "guide",
          text: "Ia ce ți s-a întâmplat și pune-l într-una din cele două coloane. A furat sau a dat viață? Nu e greu de încadrat.",
        },
        {
          from: "guide",
          text: "Dumnezeu poate scoate ceva bun chiar și de acolo. Dar a scoate bine din rău nu e același lucru cu a fi făcut răul. Un chirurg salvează un om lovit de mașină. Nu el a condus mașina.",
        },
      ],
    },
    {
      id: "o1_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Ce spune Iacov despre Dumnezeu, cel mai direct?",
        options: [
          { text: "Că trimite și bine, și rău, ca să ne învețe", correct: false },
          { text: "Că din El vine numai binele, și că nu are zile în care e altul", correct: true },
          { text: "Că nu ne putem ști nimic despre El", correct: false },
        ],
        explanation:
          "«Nici schimbare, nici umbră de mutare.» Nu are o parte întunecată din care să-ți fi venit răul. Ce e bun vine de la El; răul are altă sursă, și în ziua aia n-a fost de partea ei.",
      },
    },
    {
      id: "o1_10",
      type: "step",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "Un lucru înainte de pasul de azi, și îl spun o dată, clar: dacă acum ești în pericol sau te gândești să-ți faci rău, nu rămâi singur cu asta. Pentru pericol imediat sună la 112. Pentru sprijin emoțional poți încerca 116 123 și poți merge la camera de gardă. Aplicația asta nu înlocuiește medicul, psihologul sau poliția. Te aștept aici după ce ești în siguranță.",
        },
        {
          from: "guide",
          text: "Pasul de azi, dacă nu e cazul ăsta: spune-I o singură propoziție, cu voce tare. «Doamne, nu Tu mi-ai făcut asta.»",
        },
        {
          from: "guide",
          text: "Dacă nu poți încă, spune-I varianta onestă: «vreau să pot spune asta». Nu Se supără de a doua. E tot un început.",
        },
      ],
    },
    {
      id: "o1_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "La Tatăl luminilor nu este nici schimbare, nici umbră de mutare.",
        ref: "Iacov 1:17",
      },
    },
    {
      id: "o1_12",
      type: "prayer",
      order: 12,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, am purtat mult timp gândul că mâna care mi-a stricat viața a fost a Ta. Astăzi nu-Ți cer să-mi explici tot. Îți cer să-mi arăți cine ești Tu cu adevărat, nu cine mi s-a spus că ești. Amin.",
        },
      ],
    },
    {
      id: "o1_13",
      type: "journal",
      order: 13,
      journalPrompt:
        "Ce ai crezut până azi despre Dumnezeu, în legătură cu ce ți s-a întâmplat? Scrie-o exact cum îți vine. Nu citește nimeni.",
      reward: { xp: 0 },
    },
  ],
}

export const neiertareO2: Lesson = {
  id: "neiertare_o2",
  courseId: "path_neiertare",
  order: 2,
  title: "N-a privit de departe",
  estMinutes: 11,
  anchorRefs: ["Ioan 11:33-35", "Matei 27:46", "Evrei 4:15-16"],
  memoryVerseRef: "Evrei 4:16",
  steps: [
    {
      id: "o2_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Bine că te-ai întors. Cum ești azi?" },
        {
          from: "guide",
          text: "Ieri am spus ce nu a făcut El. Azi spun ce a făcut, și e mai greu de crezut.",
        },
      ],
    },
    {
      id: "o2_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Există un gând mai subțire decât «El mi-a făcut asta», și de aceea mai greu de scos: «El n-a făcut-o, dar nici nu I-a păsat».",
        },
        { from: "guide", text: "Adică a stat deoparte. A privit. Și a mers mai departe." },
      ],
    },
    {
      id: "o2_3",
      type: "name_struggle",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "Dacă gândul ăsta e în tine, nu ești nici primul, nici cel mai slab în credință. E în Psalmi de trei mii de ani: «Până când, Doamne, mă vei uita?»",
        },
        { from: "guide", text: "Omul care a scris asta n-a fost dat afară pentru întrebare. A fost pus în Biblie." },
      ],
    },
    {
      id: "o2_4",
      type: "scripture",
      order: 4,
      scripture: {
        text: "Iisus, când a văzut-o plângând, pe ea și pe iudeii care veniseră cu ea, S-a înfiorat în duhul Lui și S-a tulburat. Și a zis: «Unde l-ați pus?» […] Iisus plângea.",
        ref: "Ioan 11:33-35",
      },
    },
    {
      id: "o2_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Aici trebuie să intru în cuvântul original, pentru că traducerea îl îmblânzește. Verbul folosit pentru «S-a înfiorat» e cel cu care se descria, în greacă, un cal care fornăie de furie înainte de luptă.",
        },
        {
          from: "guide",
          text: "Iisus nu S-a înmuiat sentimental la mormânt. S-a mâniat. S-a mâniat pe moarte, pe stricăciunea intrată în lume, pe tot ce rupe oameni unii de alții.",
        },
        {
          from: "guide",
          text: "Și apoi a plâns — deși știa că în cinci minute îl scoate viu din groapă. Nu plângi pentru cineva pe care urmează să-l înviezi. Plângi pentru cei rămași în urmă. A plâns pentru surorile lui.",
        },
      ],
    },
    {
      id: "o2_6",
      type: "world_vs_truth",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Religia îți vinde un Dumnezeu senin, care privește de sus lucrurile mici ale oamenilor și nu se implică.",
        },
        {
          from: "guide",
          text: "Iisus, care a spus «cine M-a văzut pe Mine a văzut pe Tatăl», stă la o groapă și plânge. Ăsta e portretul, dacă vrei să știi cum arată Dumnezeu față în față cu durerea ta.",
        },
      ],
    },
    {
      id: "o2_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Iisus a strigat cu glas tare: «Eli, Eli, lama sabactani?» adică: «Dumnezeul Meu, Dumnezeul Meu, pentru ce M-ai părăsit?»",
        ref: "Matei 27:46",
      },
    },
    {
      id: "o2_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "Stai o clipă pe versetul ăsta. Întrebarea care te apasă pe tine — «unde erai?» — a fost strigată de pe cruce de Fiul lui Dumnezeu.",
        },
        {
          from: "guide",
          text: "Nu ai o întrebare pe care El n-a avut-o. Nu ai o singurătate în care El n-a intrat. A fost trădat de un apropiat, părăsit de prieteni, judecat nedrept, batjocorit, dezbrăcat și omorât.",
        },
        {
          from: "guide",
          text: "Deci când vorbești cu El despre ce ți s-a făcut, nu vorbești cu cineva care citește despre asta. Vorbești cu cineva care a trecut prin ea.",
        },
      ],
    },
    {
      id: "o2_9",
      type: "scripture",
      order: 9,
      scripture: {
        text: "Căci n-avem un Mare Preot care să n-aibă milă de slăbiciunile noastre, ci unul care a fost ispitit în toate lucrurile ca și noi. Să ne apropiem, dar, cu deplină încredere de scaunul harului, ca să căpătăm milă și să găsim har, ca să fim ajutați la vreme de nevoie.",
        ref: "Evrei 4:15-16",
      },
    },
    {
      id: "o2_10",
      type: "truth_simple",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "Un lucru pe care nu ți-l voi spune niciodată în drumul ăsta: de ce a permis. Nu știu. Iov a întrebat patruzeci de capitole și n-a primit explicația — a primit prezența.",
        },
        {
          from: "guide",
          text: "Cine îți dă un răspuns rapid la întrebarea aia îți vinde ceva. Eu îți spun doar ce se poate spune: nu El ți-a făcut-o, și nu te-a privit de departe.",
        },
      ],
    },
    {
      id: "o2_11",
      type: "quiz",
      order: 11,
      quiz: {
        question: "Ce arată faptul că Iisus a plâns la mormântul lui Lazar?",
        options: [
          { text: "Că nu putea face nimic în situația aia", correct: false },
          { text: "Că durerea oamenilor Îl atinge, chiar și când are soluția în mână", correct: true },
          { text: "Că moartea e voia lui Dumnezeu și trebuie acceptată", correct: false },
        ],
        explanation:
          "Știa că îl scoate viu din groapă și totuși a plâns. Nu e un Dumnezeu care privește de sus. E unul pe care ce te doare pe tine Îl doare.",
      },
    },
    {
      id: "o2_12",
      type: "step",
      order: 12,
      bubbles: [
        {
          from: "guide",
          text: "Pasul de azi: spune-I ce nu ai spus nimănui despre ziua aceea. Fără să înfrumusețezi și fără să te scuzi că ești supărat pe El.",
        },
        {
          from: "guide",
          text: "Poți începe exact așa: «Unde erai?» Nu e o blasfemie. E un verset.",
        },
      ],
    },
    {
      id: "o2_13",
      type: "memory_verse",
      order: 13,
      scripture: {
        text: "Să ne apropiem cu deplină încredere de scaunul harului, ca să fim ajutați la vreme de nevoie.",
        ref: "Evrei 4:16",
      },
    },
    {
      id: "o2_14",
      type: "prayer",
      order: 14,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, am crezut că nu Ți-a păsat. Astăzi am văzut că ai plâns la o groapă și că ai strigat aceeași întrebare pe care o strig eu. Nu-Ți cer explicația. Îți cer să nu pleci. Amin.",
        },
      ],
    },
    {
      id: "o2_15",
      type: "journal",
      order: 15,
      journalPrompt: "Ce nu ai spus nimănui despre ziua aceea?",
      reward: { xp: 0 },
    },
  ],
}

/** Cele două lecții cu care începe camera 2, în ordine. */
export const C2_OPENING: Lesson[] = [neiertareO1, neiertareO2]
