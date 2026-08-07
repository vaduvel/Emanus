import type { Lesson } from "../domain.js"
import { divortL1, divortL2, divortL3 } from "./divortA.js"

/*
 * DUPĂ DIVORȚ — lecțiile 4-7 și asamblarea drumului.
 * Începutul și motivația drumului: `divortA.ts`.
 *
 * LECȚIA 5 E CEA MAI SENSIBILĂ DIN TOT REPO-UL. Recăsătorirea este singurul
 * subiect din Emanus unde NU dăm un răspuns. Nu din lașitate, ci pentru că
 * creștini care iau Scriptura la fel de în serios ajung la concluzii diferite,
 * iar o aplicație care nu cunoaște situația omului nu are dreptul să decidă în
 * locul lui. Arătăm pozițiile, spunem limpede că nu decidem și trimitem la un om
 * real. Regula asta nu se schimbă fără o decizie explicită în docs/14.
 *
 * INTERDICȚIE (docs/22 §6): nicio lecție de aici nu spune care denominațiune are
 * dreptate și niciuna nu-i numește necredincioși pe cei care citesc altfel.
 *
 * INTERDICȚIE SUPLIMENTARĂ, proprie drumului: nu-i spunem niciodată unui om deja
 * recăsătorit că trebuie să-și rupă a doua căsnicie. Sfatul ăsta a distrus
 * familii reale, iar noi nu îl putem da de la distanță, printr-un ecran.
 */

export const divortL4: Lesson = {
  id: "divort_l4",
  courseId: "path_divort",
  order: 4,
  title: "Vina care e a ta și vina care nu e",
  estMinutes: 13,
  anchorRefs: ["Psalmul 51:1-4", "1 Ioan 1:9"],
  memoryVerseRef: "1 Ioan 1:9",
  steps: [
    {
      id: "d4_1",
      type: "check_in",
      order: 1,
      choice: {
        prompt: "Când te gândești la ce s-a întâmplat, unde ajungi de obicei?",
        options: [
          {
            id: "d4_c_tot",
            label: "Totul e vina mea",
            feedback: "Verificăm asta azi. Nu ca să te liniștim — ca să vedem ce e adevărat.",
          },
          {
            id: "d4_c_nimic",
            label: "Nu e nimic vina mea",
            feedback: "Poate așa e. Sau poate e o ușă pe care n-ai deschis-o încă. O deschidem încet.",
          },
          {
            id: "d4_c_confuz",
            label: "Nu mai știu ce a fost al meu și ce nu",
            feedback: "Asta e cea mai cinstită poziție de start. Lecția asta exact despre asta e.",
          },
          {
            id: "d4_c_zi",
            label: "Depinde de zi",
            feedback: "Înseamnă că nu s-a așezat încă nimic. E normal.",
          },
        ],
      },
    },
    {
      id: "d4_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Două minciuni trag în direcții opuse și te țin pe loc la fel de bine." },
        {
          from: "guide",
          text: "Prima: «totul e vina mea». A doua: «n-am nicio vină». Prima te îngroapă, a doua te îngheață. Nu poți ieși din niciuna fără să separi coloanele.",
        },
      ],
    },
    {
      id: "d4_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        { from: "guide", text: "Un divorț nu e aproape niciodată sută la sută al unuia singur." },
        {
          from: "guide",
          text: "Dar nici nu e automat jumătate-jumătate. Presiunea de a spune «am greșit amândoi» e, în unele cazuri, o nedreptate în plus — mai ales acolo unde a fost violență sau trădare.",
        },
        {
          from: "guide",
          text: "Deci nu îți cerem un procent. Îți cerem un singur lucru: să nu mai amesteci coloanele.",
        },
      ],
    },
    {
      id: "d4_4",
      type: "scripture",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "David scrie rândurile astea după ce luase nevasta altui om și îl trimisese pe acel om să moară în război. Uită-te cum vorbește:",
        },
      ],
      scripture: {
        text: "Căci îmi cunosc bine fărădelegile și păcatul meu stă necurmat înaintea mea. Împotriva Ta, numai împotriva Ta am păcătuit și am făcut ce este rău înaintea Ta.",
        ref: "Psalmul 51:3-4",
      },
    },
    {
      id: "d4_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "«Păcatul meu.» La singular și cu posesiv. Nu «ce s-a întâmplat», nu «greșelile noastre»." },
        {
          from: "guide",
          text: "Și acum uită-te la ce NU face David. Nu mărturisește partea Batșebei. Nu mărturisește partea lui Ioab, care a dus ordinul. Nu explică de ce a ajuns acolo.",
        },
        {
          from: "guide",
          text: "Mărturisirea funcționează doar pe coloana ta. Tot ce pui în ea din coloana altuia o strică.",
        },
      ],
    },
    {
      id: "d4_6",
      type: "world_vs_truth",
      order: 6,
      bubbles: [
        { from: "guide", text: "Ce se spune: «e nevoie de doi ca să se rupă o căsnicie»." },
        {
          from: "guide",
          text: "Ce scrie: da, dar socoteala se face separat. «Ai făcut și tu» nu e un argument, e o metodă de a încurca. Dumnezeu nu cere de la nimeni plăti pentru fapta altuia.",
        },
      ],
    },
    {
      id: "d4_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Dacă ne mărturisim păcatele, El este credincios și drept ca să ne ierte păcatele și să ne curățească de orice nelegiuire.",
        ref: "1 Ioan 1:9",
      },
    },
    {
      id: "d4_8",
      type: "truth_simple",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "Citește încă o dată și caută condiția care nu e acolo: nicăieri nu scrie «dacă și celălalt își mărturisește partea».",
        },
        {
          from: "guide",
          text: "Nu aștepți după nimeni. Poți fi curățat de partea ta chiar dacă celălalt nu recunoaște niciodată nimic. Asta e o veste bună, nu o nedreptate.",
        },
      ],
    },
    {
      id: "d4_9",
      type: "multi_choice",
      order: 9,
      multiChoice: {
        prompt: "Ce a fost în coloana ta? Bifează doar ce recunoști tu, nu ce ți s-a reproșat.",
        options: [
          { id: "d4_m_tacere", label: "Am tăcut ani de zile în loc să vorbesc" },
          { id: "d4_m_duritate", label: "Am fost dur sau am rănit cu vorba" },
          { id: "d4_m_retragere", label: "M-am retras și l-am lăsat singur pe celălalt" },
          { id: "d4_m_infidel", label: "Am fost necredincios" },
          { id: "d4_m_prioritati", label: "Am pus munca, familia mea sau altceva înaintea lui" },
          { id: "d4_m_nustiu", label: "Încă nu știu" },
        ],
        minSelections: 0,
      },
    },
    {
      id: "d4_10",
      type: "reflection",
      order: 10,
      bubbles: [
        { from: "guide", text: "Un singur lucru. Nu lista. Nu contextul. Nu ce a făcut celălalt înainte." },
      ],
      response: {
        prompt: "Scrie un singur lucru care a fost al tău. O propoziție.",
        placeholder: "Poți lăsa gol dacă încă nu e limpede.",
        required: false,
        minLength: 3,
      },
    },
    {
      id: "d4_11",
      type: "how_god_helps",
      order: 11,
      bubbles: [
        {
          from: "guide",
          text: "Dacă nu poți separa coloanele pentru că ani la rând ți s-a spus că tot ce merge prost e din cauza ta — asta nu e pocăință, e o rană. Se vindecă altfel.",
        },
        {
          from: "guide",
          text: "Spune-i unui om real: un păstor, un consilier, un psiholog. Iar dacă vina te ține treaz nopțile sau îți trece prin cap să îți faci rău, sună 116 123. Non-stop și gratuit.",
        },
      ],
    },
    {
      id: "d4_12",
      type: "step",
      order: 12,
      bubbles: [
        {
          from: "guide",
          text: "Azi, o singură dată: spune-I lui Dumnezeu lucrul acela pe nume. Cu voce tare, dacă poți.",
        },
        {
          from: "guide",
          text: "Și oprește-te acolo. Nu adăuga «dar el» sau «dar ea». Propoziția se termină unde se termină coloana ta.",
        },
      ],
    },
    {
      id: "d4_13",
      type: "memory_verse",
      order: 13,
      scripture: {
        text: "Dacă ne mărturisim păcatele, El este credincios și drept ca să ne ierte.",
        ref: "1 Ioan 1:9",
      },
    },
    {
      id: "d4_14",
      type: "prayer",
      order: 14,
      bubbles: [
        {
          from: "guide",
          text: "«Arată-mi ce a fost al meu, atât. Nu vreau să car ce nu e al meu și nu vreau să pun în spatele altuia ce e.»",
        },
      ],
    },
    {
      id: "d4_15",
      type: "journal",
      order: 15,
      journalPrompt:
        "Continuă lista cu două coloane de ieri. Azi scrie doar în coloana ta. Mâine nu te întoarce la ea.",
      reward: { xp: 0 },
    },
  ],
}

export const divortL5: Lesson = {
  id: "divort_l5",
  courseId: "path_divort",
  order: 5,
  title: "Recăsătorirea: ce se știe, ce se discută și ce nu decidem noi",
  estMinutes: 14,
  anchorRefs: ["Matei 19:9", "1 Corinteni 7:10-16"],
  memoryVerseRef: "Romani 14:5",
  steps: [
    {
      id: "d5_1",
      type: "check_in",
      order: 1,
      choice: {
        prompt: "De ce ai deschis lecția asta?",
        options: [
          {
            id: "d5_c_eu",
            label: "Mă gândesc la asta pentru mine",
            feedback: "Atunci ai nevoie de pozițiile întregi, nu de una singură.",
          },
          {
            id: "d5_c_interzis",
            label: "Mi s-a spus că nu am voie",
            feedback: "O să vezi și de unde vine acel răspuns, și ce se mai spune în afară de el.",
          },
          {
            id: "d5_c_deja",
            label: "M-am recăsătorit deja",
            feedback: "Atunci sari liniștit peste dezbatere: pasul 12 e scris pentru tine.",
          },
          {
            id: "d5_c_curios",
            label: "Vreau doar să știu ce spune Biblia",
            feedback: "Bine. Și vei vedea și unde nu spune limpede.",
          },
        ],
      },
    },
    {
      id: "d5_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Aici Emanus nu îți dă un verdict." },
        {
          from: "guide",
          text: "Nu pentru că e o temă delicată și vrem să scăpăm ușor. Ci pentru că oameni care iau Biblia la fel de în serios ca tine, care se roagă și care își iubesc Domnul, ajung la concluzii diferite pe textul ăsta.",
        },
        {
          from: "guide",
          text: "O aplicație care nu știe nimic despre situația ta nu are dreptul să decidă în locul tău. Îți arătăm ce e limpede, ce se discută, și unde să mergi cu întrebarea.",
        },
      ],
    },
    {
      id: "d5_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        { from: "guide", text: "Întâi ce NU e în dispută. Astea trei le spun toți:" },
        { from: "guide", text: "Că Dumnezeu a gândit legătura dintre doi oameni ca să țină o viață." },
        {
          from: "guide",
          text: "Că o a doua căsnicie nu se ia ca să scapi de singurătate, de frica de bătrânețe sau de gura lumii.",
        },
        {
          from: "guide",
          text: "Și că ce nu s-a vindecat în tine merge cu tine mai departe. Aici nu se ceartă nimeni.",
        },
      ],
    },
    {
      id: "d5_4",
      type: "scripture",
      order: 4,
      bubbles: [{ from: "guide", text: "Acum textele. Primul:" }],
      scripture: {
        text: "Eu însă vă spun că oricine își lasă nevasta, afară de pricină de curvie, și ia pe alta de nevastă preacurvește.",
        ref: "Matei 19:9",
      },
    },
    {
      id: "d5_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "PRIMA CITIRE, cea mai răspândită în bisericile evanghelice." },
        {
          from: "guide",
          text: "«Afară de pricină de curvie» e o excepție pusă chiar de Iisus. Unde a fost infidelitate, legământul a fost deja rupt de cel care a trădat, iar cel nevinovat e liber să se recasătorească.",
        },
      ],
    },
    {
      id: "d5_6",
      type: "scripture",
      order: 6,
      bubbles: [{ from: "guide", text: "Al doilea text, cel pe care l-am văzut și în lecția 3:" }],
      scripture: {
        text: "Dacă cel necredincios vrea să se despartă, să se despartă; în împrejurarea aceasta, fratele sau sora nu sunt legați: Dumnezeu ne-a chemat să trăim în pace.",
        ref: "1 Corinteni 7:15",
      },
    },
    {
      id: "d5_7",
      type: "truth_simple",
      order: 7,
      bubbles: [
        { from: "guide", text: "A DOUA CITIRE adaugă un al doilea caz la excepția lui Iisus." },
        {
          from: "guide",
          text: "Pavel scrie despre abandon, iar «nu sunt legați» e citit ca libertate reală, inclusiv de a se recăsători. Mulți extind principiul și la cazurile de violență, pe motiv că cel care lovește a părăsit deja legământul, chiar dacă nu a plecat din casă.",
        },
      ],
    },
    {
      id: "d5_8",
      type: "truth_simple",
      order: 8,
      bubbles: [
        { from: "guide", text: "A TREIA CITIRE, și n-o să o ascundem de tine." },
        {
          from: "guide",
          text: "Marcu 10:11-12 și Luca 16:18 spun același lucru FĂRĂ clauza de excepție. De aici, o parte din creștini — și o bună parte din tradiția veche a Bisericii — citesc că recăsătorirea nu e îngăduită cât trăiește celălalt.",
        },
        {
          from: "guide",
          text: "Nu sunt oameni care te urăsc. Citesc aceleași pagini și cântăresc altfel textele care par să se bată cap în cap. Meriți să știi că poziția asta există și de ce există.",
        },
      ],
    },
    {
      id: "d5_9",
      type: "truth_simple",
      order: 9,
      bubbles: [
        { from: "guide", text: "Ce nu facem noi, și o spunem pe șleau:" },
        { from: "guide", text: "Nu îți spunem care dintre cele trei citiri e cea corectă." },
        {
          from: "guide",
          text: "Nu îți spunem că cei care citesc altfel decât biserica ta nu sunt creștini adevărați.",
        },
        {
          from: "guide",
          text: "Și nu îți spunem, dacă ești deja recăsătorit, că trebuie să-ți rupi casa de acum. Sfatul ăsta a distrus familii reale. Nu se dă printr-un ecran.",
        },
      ],
    },
    {
      id: "d5_10",
      type: "scripture",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "Pavel avea o regulă pentru lucrurile pe care creștinii sinceri le citeau diferit. N-a spus «tăceți» și n-a spus «nu contează»:",
        },
      ],
      scripture: {
        text: "Fiecare să fie deplin încredințat în mintea lui.",
        ref: "Romani 14:5",
      },
    },
    {
      id: "d5_11",
      type: "quiz",
      order: 11,
      quiz: {
        question: "Ce face Emanus cu întrebarea despre recăsătorire?",
        options: [
          { text: "Îți dă răspunsul corect și îl susține cu versete", correct: false },
          {
            text: "Îți arată citirile care există și te trimite la un om care îți cunoaște situația",
            correct: true,
          },
          { text: "Spune că subiectul nu contează", correct: false },
        ],
        explanation:
          "A treia variantă ar fi la fel de necinstită ca prima. Contează — tocmai de aceea nu o rezolvă o aplicație care nu știe nimic despre tine.",
      },
    },
    {
      id: "d5_12",
      type: "step",
      order: 12,
      bubbles: [
        { from: "guide", text: "Trei lucruri practice, indiferent de citirea la care ajungi." },
        {
          from: "guide",
          text: "Unu: du întrebarea la un păstor sau un consilier care îți cunoaște povestea. Nu la un grup de pe internet și nu la primul verset găsit noaptea, pe telefon.",
        },
        {
          from: "guide",
          text: "Doi: nu decide în primul an. Nu e o regulă biblică, e o măsură de bun-simț. Nimeni nu alege bine cât timp e încă în doliu.",
        },
        {
          from: "guide",
          text: "Trei: dacă ești deja recăsătorit, întrebarea ta nu mai e «aveam voie?», ci «cum trăiesc bine casa asta înaintea lui Dumnezeu?». Aia are răspuns limpede și începe azi.",
        },
      ],
    },
    {
      id: "d5_13",
      type: "how_god_helps",
      order: 13,
      bubbles: [
        {
          from: "guide",
          text: "Dacă întrebarea asta te ține în loc de luni de zile, observă ceva: de multe ori dedesubt nu stă o problemă de interpretare, ci frica de a rămâne singur.",
        },
        {
          from: "guide",
          text: "Frica aia e reală și are nevoie de altceva decât de un verdict. Dacă o recunoști, ușa «nu am pe nimeni» are un drum întreg scris pentru ea.",
        },
      ],
    },
    {
      id: "d5_14",
      type: "memory_verse",
      order: 14,
      scripture: { text: "Fiecare să fie deplin încredințat în mintea lui.", ref: "Romani 14:5" },
    },
    {
      id: "d5_15",
      type: "prayer",
      order: 15,
      bubbles: [
        {
          from: "guide",
          text: "«Nu vreau răspunsul care îmi convine. Vreau să fiu lămurit înaintea Ta, nu să câștig o discuție. Trimite-mi un om înțelept.»",
        },
      ],
    },
    {
      id: "d5_16",
      type: "journal",
      order: 16,
      journalPrompt:
        "Scrie numele omului cu care vei duce întrebarea asta și când îi scrii. Dacă nu ai pe nimeni, scrie asta — e primul lucru de rezolvat.",
      reward: { xp: 0 },
    },
  ],
}

export const divortL6: Lesson = {
  id: "divort_l6",
  courseId: "path_divort",
  order: 6,
  title: "Copiii, ceilalți, biserica",
  estMinutes: 13,
  anchorRefs: ["Romani 12:18", "Efeseni 4:31-32"],
  memoryVerseRef: "Romani 12:18",
  steps: [
    {
      id: "d6_1",
      type: "check_in",
      order: 1,
      choice: {
        prompt: "Care dintre astea te apasă cel mai tare acum?",
        options: [
          { id: "d6_c_copii", label: "Copiii", feedback: "Începem cu ei. Sunt primii în lecție." },
          {
            id: "d6_c_lume",
            label: "Ce spune lumea despre mine",
            feedback: "Ajungem acolo. Și o să fim cinstiți: unele lucruri chiar se spun.",
          },
          {
            id: "d6_c_biserica",
            label: "Locul meu în biserică",
            feedback: "Partea a treia e despre asta și nu o îndulcim.",
          },
          {
            id: "d6_c_familie",
            label: "Familia lui sau a ei",
            feedback: "Se rezolvă cu aceeași regulă ca restul: ce depinde de tine, atât.",
          },
        ],
      },
    },
    {
      id: "d6_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Un divorț nu se termină la tribunal. Continuă ani buni în trei locuri: în copii, în gura oamenilor și în biserică.",
        },
        { from: "guide", text: "Le luăm pe rând și îți dăm o singură regulă pentru fiecare." },
      ],
    },
    {
      id: "d6_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        { from: "guide", text: "COPIII. O singură regulă, și e grea: nu vorbi de rău celălalt părinte de față cu copilul." },
        {
          from: "guide",
          text: "Nu pentru că celălalt merită protecție. Poate nu merită. Ci pentru că jumătate din copilul tău e el, iar copilul aude «tatăl tău e un om rău» ca pe «jumătate din tine e rea».",
        },
      ],
    },
    {
      id: "d6_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        { from: "guide", text: "Din aceeași regulă ies patru lucruri concrete." },
        { from: "guide", text: "Copilul nu e mesager. Nu transmite el ce ai de spus." },
        { from: "guide", text: "Copilul nu e martor. Nu i se cere să confirme cine a greșit." },
        { from: "guide", text: "Copilul nu e consilier. Nu lui îi povestești cât de greu îți e." },
        { from: "guide", text: "Și copilul nu alege o tabără. Cine îl pune să aleagă îl pierde, chiar dacă câștigă." },
      ],
    },
    {
      id: "d6_5",
      type: "step",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "O excepție, și e importantă. Dacă celălalt părinte e periculos pentru copil, asta nu mai e «vorbit de rău», e protecție.",
        },
        { from: "guide", text: "Copil în pericol: 119. Pericol imediat: 112." },
        {
          from: "guide",
          text: "Sună și cere ajutor. Ne întoarcem la lecție când copilul e în siguranță.",
        },
      ],
    },
    {
      id: "d6_6",
      type: "truth_simple",
      order: 6,
      bubbles: [
        { from: "guide", text: "CEILALȚI. Aici trebuie să fim cinstiți cu tine." },
        {
          from: "guide",
          text: "Vei pierde o parte din prieteni. Unii vor alege tabăra cealaltă, alții vor dispărea pentru că nu știu ce să spună. Vei afla lucruri urâte care s-au spus despre tine.",
        },
        {
          from: "guide",
          text: "Nu e o pedeapsă și nu înseamnă că toți au dreptate. E ce se întâmplă când un cerc de oameni nu știe să stea lângă durere.",
        },
      ],
    },
    {
      id: "d6_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Dacă este cu putință, întâmplu atârnă de voi, trăiți în pace cu toți oamenii.",
        ref: "Romani 12:18",
      },
    },
    {
      id: "d6_8",
      type: "truth_simple",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "Uită-te câte limitări pune Pavel într-un singur verset: «dacă este cu putință» și îîntât atârnă de voi».",
        },
        {
          from: "guide",
          text: "Nu ți se cere imposibilul și nu ți se cere ce depinde de celălalt. Dacă nu vrea pace, nu e înfrângerea ta. Tu răspunzi doar de partea ta de drum.",
        },
      ],
    },
    {
      id: "d6_9",
      type: "truth_simple",
      order: 9,
      bubbles: [
        { from: "guide", text: "BISERICA. Aici doare cel mai des și cel mai tăcut." },
        {
          from: "guide",
          text: "Unii te vor primi la fel. Alții îți vor lua ce făceai acolo, fără să-ți spună în față. Alții vor tăcea când intri. Asta nu ți se pare — se întâmplă des.",
        },
        {
          from: "guide",
          text: "Nu arătăm cu degetul către nicio biserică anume. Se întâmplă peste tot, pentru că oamenilor le e mai ușor să dea o regulă decât să stea lângă un om rupt.",
        },
        {
          from: "guide",
          text: "Un singur lucru ține-l minte: poziția unor oameni față de tine nu e poziția lui Dumnezeu față de tine. Ai citit în lecția 1 cum vorbește El despre cel părăsit.",
        },
      ],
    },
    {
      id: "d6_10",
      type: "scripture",
      order: 10,
      scripture: {
        text: "Orice amărăciune, orice iuțime, orice mânie, orice strigare și orice clevetire să piară din mijlocul vostru... Dimpotrivă, fiți buni unii cu alții, miloși și iertați-vă unul pe altul.",
        ref: "Efeseni 4:31-32",
      },
    },
    {
      id: "d6_11",
      type: "quiz",
      order: 11,
      quiz: {
        question:
          "De ce nu vorbești de rău celălalt părinte în fața copilului?",
        options: [
          { text: "Pentru că merită respect după ce a făcut", correct: false },
          { text: "Pentru că jumătate din copil e el și aude asta despre sine", correct: true },
          { text: "Pentru că așa arată mai bine în fața oamenilor", correct: false },
        ],
        explanation:
          "Regula nu e pentru celălalt părinte și nu e pentru aparențe. E pentru copil.",
      },
    },
    {
      id: "d6_12",
      type: "how_god_helps",
      order: 12,
      bubbles: [
        {
          from: "guide",
          text: "Dacă ai fost pus deoparte într-o biserică, nu rămâne singur ca să nu mai fii rănit. E reacția normală și e cea mai scumpă.",
        },
        {
          from: "guide",
          text: "Caută doi-trei oameni, nu o mulțime. Ușa «m-am simțit respins în biserică» are un drum întreg despre asta și nu îți cere să te întorci nicăieri.",
        },
      ],
    },
    {
      id: "d6_13",
      type: "memory_verse",
      order: 13,
      scripture: {
        text: "Dacă este cu putință, întâmplu atârnă de voi, trăiți în pace cu toți oamenii.",
        ref: "Romani 12:18",
      },
    },
    {
      id: "d6_14",
      type: "prayer",
      order: 14,
      bubbles: [
        {
          from: "guide",
          text: "«Păzește-mi gura de față cu copiii mei. Și ajută-mă să nu mă închid în mine după ce m-au lăsat oamenii.»",
        },
      ],
    },
    {
      id: "d6_15",
      type: "journal",
      order: 15,
      journalPrompt:
        "Scrie numele a doi oameni care au rămas. Dacă nu ai doi, scrie unul. Dacă n-ai niciunul, scrie unde ai putea căuta săptămâna asta.",
      reward: { xp: 0 },
    },
  ],
}

export const divortL7: Lesson = {
  id: "divort_l7",
  courseId: "path_divort",
  order: 7,
  title: "Ce urmează",
  estMinutes: 12,
  anchorRefs: ["Ioan 8:10-11", "Isaia 43:18-19"],
  memoryVerseRef: "Isaia 43:19",
  steps: [
    {
      id: "d7_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "E ultima lecție și nu urmează nicio presiune." },
        {
          from: "guide",
          text: "Nu îți cerem să declari că ești vindecat, nu îți cerem să ierți până diseară și nu îți cerem să spui că a fost spre bine. Uneori nu a fost.",
        },
      ],
    },
    {
      id: "d7_2",
      type: "scripture",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "O femeie prinsă în adulter e adusă în mijlocul mulțimii, ca să fie făcută exemplu. Rămân doar ei doi:",
        },
      ],
      scripture: {
        text: "«Femeie, unde sunt pârâșii tăi? Nimeni nu te-a osdit?» «Nimeni, Doamne», I-a răspuns ea. Și Iisus i-a zis: «Nici Eu nu te osndesc. Du-te și să nu mai păcătuiești.»",
        ref: "Ioan 8:10-11",
      },
    },
    {
      id: "d7_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        { from: "guide", text: "Două propoziții, în aceeași respirație, și nu se anulează una pe alta." },
        {
          from: "guide",
          text: "«Nici Eu nu te osndesc» — deci nu e nevoie să mai plătești în fiecare dimineață. «Du-te și să nu mai păcătuiești» — deci nu se preface că nu s-a întâmplat nimic.",
        },
        {
          from: "guide",
          text: "Cine îți dă doar prima propoziție te lasă unde ești. Cine îți dă doar pe a doua te îngroapă. Iisus le-a dat pe amândouă, în ordinea asta.",
        },
      ],
    },
    {
      id: "d7_4",
      type: "scripture",
      order: 4,
      scripture: {
        text: "Nu vă gândiți la ce a fost mai înainte și nu vă mai uitați la cele vechi! Iată, voi face ceva nou și-i gata să se întâmple. Să nu-l cunoașteți voi oare?",
        ref: "Isaia 43:18-19",
      },
    },
    {
      id: "d7_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "«Nu vă gândiți la ce a fost» nu înseamnă «prefa-te că n-a fost». Textul e spus unui popor dus în robie, care pierduse tot. Nu li se cere să uite.",
        },
        {
          from: "guide",
          text: "Li se cere să nu rămână acolo. E o diferență uriașă între a nega ce s-a întâmplat și a nu-ți mai construi viața în jurul acelei zile.",
        },
      ],
    },
    {
      id: "d7_6",
      type: "declaration",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Dacă vrei, spune propoziția asta cu voce tare. Dacă nu vrei, treci mai departe — nu se schimbă nimic și nu te întreabă nimeni de ce.",
        },
        { from: "guide", text: "«Nu mai sunt ce s-a întâmplat cu mine.»" },
      ],
      choice: {
        prompt: "",
        options: [
          { id: "d7_d_spus", label: "Am spus-o", feedback: "Bine. N-o repeta de zece ori." },
          {
            id: "d7_d_nu",
            label: "Nu acum",
            feedback: "E un răspuns la fel de bun. Propoziția rămâne aici când va fi adevărată pentru tine.",
          },
        ],
      },
    },
    {
      id: "d7_7",
      type: "truth_simple",
      order: 7,
      bubbles: [
        { from: "guide", text: "Drumul ăsta se termină aici. Rana pe care ai bifat-o în prima lecție, poate nu." },
        {
          from: "guide",
          text: "Divorțul a fost situația. Ce a rămas dedesubt are un nume, iar pentru fiecare nume e scris un drum întreg.",
        },
      ],
    },
    {
      id: "d7_8",
      type: "choice",
      order: 8,
      choice: {
        prompt: "După șapte lecții, ce a rămas cel mai tare?",
        options: [
          {
            id: "d7_b_rusine",
            label: "Rușinea. Nu mă pot uita la mine.",
            feedback:
              "Alege ușa «am făcut lucruri de care mi-e rușine». Drumul de acolo nu începe cu ce ai făcut, ci cu faptul că El S-a mișcat primul.",
          },
          {
            id: "d7_b_furie",
            label: "Furia. Nu pot ierta ce mi s-a făcut.",
            feedback:
              "Alege ușa «mi s-a făcut ceva și nu pot ierta». Nu îți va cere să spui că n-a fost grav.",
          },
          {
            id: "d7_b_singur",
            label: "Singurătatea.",
            feedback:
              "Alege ușa «nu am pe nimeni». Nu începe cu «du-te la biserică» și nu îți promite oameni în șapte lecții.",
          },
          {
            id: "d7_b_putere",
            label: "Nu mai am putere. Mi-e frică tot timpul.",
            feedback:
              "Alege ușa «trăiesc cu anxietate» sau «nu mai am chef de nimic». Drumul de acolo trimite și la medic, nu doar la versete.",
          },
          {
            id: "d7_b_adanc",
            label: "Nimic anume. Vreau doar să merg mai departe cu El.",
            feedback: "Atunci Umblarea e drumul tău. Presupune că mergi deja și ridică ștacheta.",
          },
        ],
      },
    },
    {
      id: "d7_9",
      type: "step",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "Un singur lucru azi și nu e o temă mare: prima lecție din ușa pe care ai ales-o. Atât.",
        },
        {
          from: "guide",
          text: "Nu e nevoie să duci mai departe singur ce a rămas. Nu de asta ai venit până aici.",
        },
      ],
    },
    {
      id: "d7_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "Iată, voi face ceva nou și-i gata să se întâmple.",
        ref: "Isaia 43:19",
      },
    },
    {
      id: "d7_11",
      type: "prayer",
      order: 11,
      bubbles: [
        {
          from: "guide",
          text: "«Nu știu cum arată lucrul nou și nu-mi cer să-l văd azi. Vreau doar să nu-mi mai construiesc viața în jurul zilei în care s-a rupt.»",
        },
      ],
    },
    {
      id: "d7_12",
      type: "journal",
      order: 12,
      journalPrompt:
        "Scrie o rugăciune la care aștepți răspuns și pune data de azi lângă ea. Peste un an o vei citi altfel.",
      reward: { xp: 0 },
    },
  ],
}

/** Cele șapte lecții ale drumului `path_divort`, în ordine. */
export const DIVORT_LESSONS: Lesson[] = [
  divortL1,
  divortL2,
  divortL3,
  divortL4,
  divortL5,
  divortL6,
  divortL7,
]

/** Ziua dintre lecții. Index aliniat cu DIVORT_LESSONS. */
export const DIVORT_PRACTICES: string[] = [
  "Azi spune cu voce tare, o singură dată: «Am pierdut...» și completează. Nu adăuga ce ți s-a făcut — doar ce ai pierdut.",
  "Azi deschide-ți Biblia la Matei 19 și citește primele nouă versete întregi, cu ochii tăi. Nu bucata care ți s-a citat.",
  "Azi, când vine gândul «mă pedepsește», răspunde-i o dată: «nu Tu ai făcut asta». Atât. Nu te certa cu el.",
  "Lucrul pe care l-ai scris ieri în coloana ta — spune-I-l o dată pe nume. Și oprește-te acolo, fără «dar el».",
  "Azi nu decide nimic. Dacă întrebarea te ține treaz, scrie numele omului cu care vei vorbi și ziua în care îi scrii.",
  "Azi, o singură dată, taci când ai fi spus ceva rău despre celălalt părinte. Dacă nu ai copii, taci o dată în fața cuiva care aștepta bârfa.",
  "Ai terminat drumul. Azi alege ușa rănii care ți-a rămas și fă prima lecție. Nu e nevoie să o duci singur mai departe.",
]
