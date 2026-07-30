import type { Lesson } from "../domain.js"

/*
 * Traseul pentru doliu, boala si intrebarea "de ce a permis Dumnezeu?".
 *
 * Regula doctrinara:
 * - Scriptura arata cazuri in care suferinta este consecinta sau disciplina
 *   pentru pacat (1 Corinteni 11:29-32; Ioan 5:14).
 * - Scriptura respinge transformarea acestei realitati intr-un diagnostic
 *   universal (Iov 42:7; Ioan 9:1-3; Luca 13:1-5).
 * - Dumnezeu poate folosi suferinta pentru intoarcere fara ca omul sa poata
 *   declara automat ca Dumnezeu a trimis boala pentru un pacat anume.
 *
 * Nu promitem vindecare in viata aceasta si nu numim consultul medical lipsa
 * de credinta. Nu cerem iertarea unui agresor cand nu exista un agresor.
 */

export const suferintaL1: Lesson = {
  id: "suferinta_l1",
  courseId: "path_suferinta",
  order: 1,
  title: "Ce ai pierdut este real",
  estMinutes: 11,
  anchorRefs: ["Psalmul 34:18", "Ioan 11:33-36", "Psalmul 56:8"],
  memoryVerseRef: "Psalmul 34:18",
  safety: {
    topic: "mental_health",
    notice:
      "Lecția atinge pierderea, boala și durerea care poate copleși. Poți opri oricând. Dacă nu ești în siguranță sau te gândești să îți faci rău, folosește acum ecranul de ajutor.",
  },
  steps: [
    {
      id: "sf1_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Bine că ai venit. Nu încep cu o explicație." },
        {
          from: "guide",
          text:
            "Ai ales deja o ușă. Uneori durerea are mai multe fețe în aceeași zi, așa că spune doar ce este în centru acum.",
        },
      ],
    },
    {
      id: "sf1_focus",
      type: "choice",
      order: 2,
      choice: {
        prompt: "Ce apasă cel mai greu astăzi?",
        options: [
          {
            id: "sf1_loss",
            label: "Absența unei persoane pe care am pierdut-o",
            branchStepId: "sf1_branch_loss",
          },
          {
            id: "sf1_illness",
            label: "Boala mea sau a cuiva drag",
            branchStepId: "sf1_branch_illness",
          },
          {
            id: "sf1_why",
            label: "Întrebarea de ce a permis Dumnezeu",
            branchStepId: "sf1_branch_why",
          },
        ],
      },
    },
    {
      id: "sf1_branch_loss",
      type: "how_god_helps",
      order: 91,
      bubbles: [
        {
          from: "guide",
          text:
            "Nu îți voi cere să numești pierderea un bine și nici să te grăbești să mergi mai departe. Moartea este numită în Biblie vrăjmaș, nu lecție frumoasă. Mai întâi spunem adevărul despre ce lipsește.",
        },
      ],
    },
    {
      id: "sf1_branch_illness",
      type: "how_god_helps",
      order: 92,
      bubbles: [
        {
          from: "guide",
          text:
            "Boala schimbă corpul, programul, banii și relațiile. Nu o vom reduce la o problemă de atitudine. Credința se roagă, spune adevărul și primește îngrijirea medicală disponibilă.",
        },
      ],
    },
    {
      id: "sf1_branch_why",
      type: "how_god_helps",
      order: 93,
      bubbles: [
        {
          from: "guide",
          text:
            "Întrebarea nu Îl sperie pe Dumnezeu. Biblia nu oferă o explicație individuală pentru fiecare suferință și nu vom inventa una. Vom cerceta ce spune limpede despre rău, păcat, prezența Lui și sfârșitul durerii.",
        },
      ],
    },
    {
      id: "sf1_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Domnul este aproape de cei cu inima frântă și mântuiește pe cei cu duhul zdrobit.",
        ref: "Psalmul 34:18",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Psalmul nu spune că inima frântă este o iluzie și nici că omul credincios nu ajunge acolo. Spune unde este Dumnezeu când omul este zdrobit: aproape.",
        },
      ],
    },
    {
      id: "sf1_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text:
            "Primul adevăr nu este «totul va fi bine mâine». Primul adevăr este că pierderea este reală, iar apropierea Lui nu depinde de puterea cu care o duci.",
        },
        {
          from: "guide",
          text:
            "Credința nu începe prin a nega rana. Începe prin a o aduce în lumină înaintea Celui care o vede întreagă.",
        },
      ],
    },
    {
      id: "sf1_5",
      type: "quiz",
      order: 5,
      quiz: {
        question: "Ce promite Psalmul 34 omului cu inima frântă?",
        options: [
          { text: "Că va primi imediat explicația", correct: false },
          { text: "Că Dumnezeu este aproape de el", correct: true },
          { text: "Că durerea dovedește o credință slabă", correct: false },
        ],
        explanation:
          "Textul nu promite termen, explicație sau lipsa plânsului. Promite prezența lui Dumnezeu în locul zdrobit.",
      },
    },
    {
      id: "sf1_6",
      type: "step",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text:
            "Spune astăzi o propoziție fără explicații: «Doamne, ceea ce am pierdut este ____, iar asta doare pentru că ____». Nu corecta răspunsul.",
        },
      ],
    },
    {
      id: "sf1_7",
      type: "prayer",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text:
            "Doamne, nu pot face pierderea mai mică prin cuvinte. Vin cu ea așa cum este. Fii aproape de mine și păzește-mă să nu mă ascund de Tine în durere. Amin.",
        },
      ],
    },
    {
      id: "sf1_8",
      type: "journal",
      order: 8,
      journalPrompt:
        "Ce s-a schimbat concret în viața ta din cauza pierderii sau a bolii? Scrie numai cât poți duce astăzi.",
    },
    {
      id: "sf1_9",
      type: "memory_verse",
      order: 9,
      scripture: {
        text: "Domnul este aproape de cei cu inima frântă.",
        ref: "Psalmul 34:18",
      },
    },
  ],
}

export const suferintaL2: Lesson = {
  id: "suferinta_l2",
  courseId: "path_suferinta",
  order: 2,
  title: "Este pedeapsă sau este o lume ruptă?",
  estMinutes: 13,
  anchorRefs: ["Ioan 9:1-3", "1 Corinteni 11:29-32", "Iov 42:7"],
  memoryVerseRef: "Ioan 9:3",
  steps: [
    {
      id: "sf2_1",
      type: "check_in",
      order: 1,
      bubbles: [
        {
          from: "guide",
          text:
            "Astăzi intrăm într-o întrebare care trebuie tratată fără ocolire: are suferința legătură cu păcatul?",
        },
      ],
    },
    {
      id: "sf2_2",
      type: "world_vs_truth",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Biblia nu spune nici «niciodată», nici «întotdeauna». Uneori omul culege direct ce a semănat. Uneori Dumnezeu disciplinează. Alteori suferința nu este verdict asupra unui păcat personal.",
        },
        {
          from: "guide",
          text:
            "A spune doar jumătate este tot o minciună. Dacă negăm consecințele, protejăm păcatul. Dacă declarăm orice boală pedeapsă, punem în gura lui Dumnezeu o acuzație pe care El nu a rostit-o.",
        },
      ],
    },
    {
      id: "sf2_belief",
      type: "choice",
      order: 3,
      choice: {
        prompt: "Care situație cere adevăr pentru tine acum?",
        options: [
          {
            id: "sf2_known_sin",
            label: "Știu un păcat concret și îi văd consecințele",
            branchStepId: "sf2_branch_known_sin",
          },
          {
            id: "sf2_assumed_guilt",
            label: "Mă tem că orice boală înseamnă că Dumnezeu mă pedepsește",
            branchStepId: "sf2_branch_assumed_guilt",
          },
          {
            id: "sf2_uncertain",
            label: "Nu știu dacă există o legătură",
            branchStepId: "sf2_branch_uncertain",
          },
        ],
      },
    },
    {
      id: "sf2_branch_known_sin",
      type: "how_god_helps",
      order: 91,
      bubbles: [
        {
          from: "guide",
          text:
            "Atunci nu numi «încercare» ceea ce știi că este rodul neascultării. Mărturisește fapta, oprește ce continui să alimentezi, repară ce se poate și acceptă consecințele. Pocăința reală nu cere doar dispariția durerii.",
        },
      ],
    },
    {
      id: "sf2_branch_assumed_guilt",
      type: "how_god_helps",
      order: 92,
      bubbles: [
        {
          from: "guide",
          text:
            "Iisus a respins exact această concluzie în Ioan 9. Nu folosi existența bolii drept dovadă a unui păcat ascuns. Dacă Dumnezeu numește ceva prin Scriptură și conștiință, răspunde. Dacă nu, nu fabrica o sentință.",
        },
      ],
    },
    {
      id: "sf2_branch_uncertain",
      type: "how_god_helps",
      order: 93,
      bubbles: [
        {
          from: "guide",
          text:
            "Cere-I lui Dumnezeu să te cerceteze și compară viața ta cu Scriptura, nu cu frica. Dacă vezi păcat, pocăiește-te concret. Dacă nu vezi, nu continua să sapi până inventezi unul. Cercetarea biblică duce la lumină, nu la acuzație fără sfârșit.",
        },
      ],
    },
    {
      id: "sf2_4",
      type: "scripture",
      order: 4,
      scripture: {
        text:
          "Învățătorule, cine a păcătuit: omul acesta sau părinții lui, de s-a născut orb? Iisus a răspuns: «N-a păcătuit nici omul acesta, nici părinții lui.»",
        ref: "Ioan 9:2-3",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Ucenicii au văzut boala și au cerut vinovatul. Iisus nu le-a lăudat discernământul; le-a corectat diagnosticul.",
        },
      ],
    },
    {
      id: "sf2_5",
      type: "scripture",
      order: 5,
      scripture: {
        text:
          "Cine mănâncă și bea își mănâncă și bea osânda lui însuși, dacă nu deosebește trupul Domnului. Din pricina aceasta sunt între voi mulți neputincioși și bolnavi.",
        ref: "1 Corinteni 11:29-30",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Aici legătura este spusă de apostol, nu ghicită de un observator. Textul dovedește că o asemenea legătură poate exista. Ioan 9 dovedește că nu avem voie să o presupunem în fiecare caz.",
        },
      ],
    },
    {
      id: "sf2_6",
      type: "truth_simple",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text:
            "Faptul că Dumnezeu folosește suferința ca să trezească, să curețe sau să întoarcă un om nu dovedește automat că a trimis acea boală pentru un păcat anume.",
        },
        {
          from: "guide",
          text:
            "Întrebarea dreaptă este: «Ce îmi poruncește Dumnezeu acum?». Dacă există păcat, îl lași. Dacă există tratament, îl primești. Dacă există durere fără explicație, nu o acoperi cu o vină inventată.",
        },
      ],
    },
    {
      id: "sf2_7",
      type: "quiz",
      order: 7,
      quiz: {
        question: "Care concluzie păstrează întregul adevăr biblic?",
        options: [
          { text: "Boala nu are niciodată legătură cu păcatul", correct: false },
          { text: "Orice boală dovedește un păcat ascuns", correct: false },
          {
            text: "Uneori există o legătură, dar nu o declarăm fără temei biblic și factual",
            correct: true,
          },
        ],
        explanation:
          "1 Corinteni 11 arată o legătură reală. Ioan 9 respinge diagnosticul universal. Credincioșia cere să păstrăm ambele texte.",
      },
    },
    {
      id: "sf2_8",
      type: "step",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Împarte o foaie în două: «ce știu că trebuie să pun în ordine» și «de ce mă acuz fără dovadă». Ascultă de primul adevăr și refuză al doilea.",
        },
      ],
    },
    {
      id: "sf2_9",
      type: "prayer",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text:
            "Cercetează-mă, Dumnezeule. Arată-mi păcatul real și dă-mi putere să îl las. Oprește-mă să numesc verdict ceea ce Tu nu ai numit. Condu-mă în adevăr, nu în scuză și nu în acuzație. Amin.",
        },
      ],
    },
    {
      id: "sf2_10",
      type: "journal",
      order: 10,
      journalPrompt:
        "Care este un lucru concret de pus în ordine și care este o vină pe care ai presupus-o fără dovadă?",
    },
    {
      id: "sf2_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "N-a păcătuit nici omul acesta, nici părinții lui.",
        ref: "Ioan 9:3",
      },
    },
  ],
}

export const suferintaL3: Lesson = {
  id: "suferinta_l3",
  courseId: "path_suferinta",
  order: 3,
  title: "Iisus a plâns",
  estMinutes: 11,
  anchorRefs: ["Ioan 11:32-36", "Evrei 4:15-16", "Romani 12:15"],
  memoryVerseRef: "Ioan 11:35",
  steps: [
    {
      id: "sf3_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum este durerea astăzi, în corp și în gând?" }],
    },
    {
      id: "sf3_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Iisus știa că Lazăr va ieși din mormânt în câteva minute. Și totuși, înainte să îl cheme afară, a plâns.",
        },
        {
          from: "guide",
          text:
            "Cunoașterea finalului nu L-a făcut rece față de durerea din prezent.",
        },
      ],
    },
    {
      id: "sf3_3",
      type: "scripture",
      order: 3,
      scripture: {
        text:
          "Iisus, când a văzut-o plângând, S-a înfiorat în duhul Lui și S-a tulburat. Și Iisus plângea.",
        ref: "Ioan 11:33,35",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Textul nu spune că a lăcrimat politicos. Cuvintele descriu tulburare și indignare în fața morții. El nu privește moartea ca pe ceva normal sau bun.",
        },
      ],
    },
    {
      id: "sf3_shapes",
      type: "multi_choice",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text:
            "Durerea nu stă într-un singur loc. Poți recunoaște mai multe fără să le rezolvi acum.",
        },
      ],
      multiChoice: {
        prompt: "Unde se simte pierderea cel mai mult?",
        options: [
          { id: "sf3_absence", label: "În absența de zi cu zi" },
          { id: "sf3_body", label: "În corp, oboseală sau teamă" },
          { id: "sf3_future", label: "În viitorul care s-a schimbat" },
          { id: "sf3_people", label: "În cuvintele sau tăcerea oamenilor" },
        ],
      },
    },
    {
      id: "sf3_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text:
            "Plânsul nu este opusul credinței. Iisus a plâns și apoi a acționat. Speranța biblică poate sta în aceeași cameră cu lacrimile.",
        },
        {
          from: "guide",
          text:
            "Nici lipsa lacrimilor nu dovedește lipsa iubirii. Uneori corpul amorțește ca să poată supraviețui. Nu îți măsura dragostea după reacția unei zile.",
        },
      ],
    },
    {
      id: "sf3_6",
      type: "scripture",
      order: 6,
      scripture: {
        text:
          "N-avem un Mare Preot care să n-aibă milă de slăbiciunile noastre, ci unul care în toate lucrurile a fost ispitit ca și noi, dar fără păcat.",
        ref: "Evrei 4:15",
      },
    },
    {
      id: "sf3_7",
      type: "step",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text:
            "Fă un act de adevăr, nu de performanță: spune unui om sigur «astăzi mi-e greu» sau oprește-te zece minute și lasă plânsul să vină dacă vine.",
        },
      ],
    },
    {
      id: "sf3_8",
      type: "prayer",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Iisuse, Tu nu ai stat departe de mormânt și nu ai disprețuit lacrimile. Stai lângă mine în ceea ce nu pot schimba astăzi. Amin.",
        },
      ],
    },
    {
      id: "sf3_9",
      type: "journal",
      order: 9,
      journalPrompt:
        "Ce îți lipsește cel mai mult? Dacă este vorba despre boală, ce parte din viața de dinainte jelești acum?",
    },
    {
      id: "sf3_10",
      type: "memory_verse",
      order: 10,
      scripture: { text: "Iisus plângea.", ref: "Ioan 11:35" },
    },
  ],
}

export const suferintaL4: Lesson = {
  id: "suferinta_l4",
  courseId: "path_suferinta",
  order: 4,
  title: "Când nu vine explicația",
  estMinutes: 12,
  anchorRefs: ["Iov 38:1-4", "Iov 42:7", "Psalmul 13:1-2"],
  memoryVerseRef: "Psalmul 13:1",
  steps: [
    {
      id: "sf4_1",
      type: "check_in",
      order: 1,
      bubbles: [
        {
          from: "guide",
          text:
            "Ai cerut vreodată un răspuns și ai primit în loc o frază: «așa a vrut Dumnezeu»?",
        },
      ],
    },
    {
      id: "sf4_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Prietenii lui Iov au venit să îl mângâie. Cât au tăcut, au făcut bine. Când au început să explice, au transformat suferința lui într-un proces.",
        },
      ],
    },
    {
      id: "sf4_need",
      type: "choice",
      order: 3,
      choice: {
        prompt: "Ce este cel mai greu în lipsa explicației?",
        options: [
          {
            id: "sf4_need_answer",
            label: "Simt că nu pot merge mai departe fără să știu de ce",
            branchStepId: "sf4_branch_answer",
          },
          {
            id: "sf4_need_permission",
            label: "Mi s-a spus că întrebarea mea este lipsă de credință",
            branchStepId: "sf4_branch_permission",
          },
          {
            id: "sf4_need_silence",
            label: "M-au rănit explicațiile date prea repede de oameni",
            branchStepId: "sf4_branch_silence",
          },
        ],
      },
    },
    {
      id: "sf4_branch_answer",
      type: "how_god_helps",
      order: 91,
      bubbles: [
        {
          from: "guide",
          text:
            "Dorința de a înțelege este legitimă, dar vindecarea ta nu poate depinde de o informație pe care Dumnezeu nu a promis că o va da acum. Poți merge cu El pe baza caracterului Lui, chiar când cauza rămâne ascunsă.",
        },
      ],
    },
    {
      id: "sf4_branch_permission",
      type: "how_god_helps",
      order: 92,
      bubbles: [
        {
          from: "guide",
          text:
            "Psalmii păstrează întrebarea «până când?» și chiar cuvintele «de ce m-ai părăsit?». Credința nu înseamnă să cenzurezi întrebarea, ci să o duci la Dumnezeu în loc să pleci cu ea de lângă El.",
        },
      ],
    },
    {
      id: "sf4_branch_silence",
      type: "how_god_helps",
      order: 93,
      bubbles: [
        {
          from: "guide",
          text:
            "Nu ești obligat să primești drept cuvânt de la Dumnezeu orice explicație religioasă. Compar-o cu Scriptura. Poți spune: «Nu știu de ce s-a întâmplat și fraza aceasta nu mă ajută».",
        },
      ],
    },
    {
      id: "sf4_4",
      type: "scripture",
      order: 4,
      scripture: {
        text:
          "Domnul a zis lui Elifaz: «Mânia Mea s-a aprins împotriva ta și împotriva celor doi prieteni ai tăi, pentru că n-ați vorbit așa de drept despre Mine cum a vorbit robul Meu Iov.»",
        ref: "Iov 42:7",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Iov a pus întrebări grele. Prietenii lui au apărat o teorie simplă: suferi pentru că ai păcătuit. La final, Dumnezeu spune că Iov a vorbit mai drept despre El decât explicatorii.",
        },
      ],
    },
    {
      id: "sf4_5",
      type: "scripture",
      order: 5,
      scripture: {
        text:
          "Până când, Doamne, mă vei uita neîncetat? Până când Îți vei ascunde Fața de mine? Până când voi avea sufletul plin de griji?",
        ref: "Psalmul 13:1-2",
      },
    },
    {
      id: "sf4_6",
      type: "truth_simple",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text:
            "Biblia nu rezolvă toate întrebările printr-o frază. Ne spune suficient ca să nu Îl confundăm pe Dumnezeu cu răul și suficient ca să rămânem cu El când nu înțelegem.",
        },
      ],
    },
    {
      id: "sf4_7",
      type: "quiz",
      order: 7,
      quiz: {
        question: "Pe cine a mustrat Dumnezeu la finalul cărții Iov pentru vorbire greșită?",
        options: [
          { text: "Numai pe Iov, fiindcă a pus întrebări", correct: false },
          { text: "Pe prietenii care au explicat suferința lui printr-un păcat presupus", correct: true },
          { text: "Pe nimeni, toate explicațiile au fost la fel de bune", correct: false },
        ],
        explanation:
          "Dumnezeu a spus că prietenii nu au vorbit drept despre El. Zelul religios nu transformă presupunerea în adevăr.",
      },
    },
    {
      id: "sf4_8",
      type: "step",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Scrie un psalm de trei propoziții: «Doamne, nu înțeleg ____. Mă doare ____. Totuși vin la Tine cu ____». Nu încheia mai frumos decât este adevărat.",
        },
      ],
    },
    {
      id: "sf4_9",
      type: "prayer",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text:
            "Doamne, păzește-mă de explicații false și de o inimă care fuge de Tine pentru că nu înțelege. Dă-mi adevărul pe care l-ai descoperit și smerenie în ceea ce ai lăsat ascuns. Amin.",
        },
      ],
    },
    {
      id: "sf4_10",
      type: "journal",
      order: 10,
      journalPrompt:
        "Care explicație primită de la oameni te-a rănit și ce poți afirma biblic fără să pretinzi că știi cauza?",
    },
    {
      id: "sf4_11",
      type: "memory_verse",
      order: 11,
      scripture: { text: "Până când, Doamne?", ref: "Psalmul 13:1" },
    },
  ],
}

export const suferintaL5: Lesson = {
  id: "suferinta_l5",
  courseId: "path_suferinta",
  order: 5,
  title: "Ascultarea de astăzi",
  estMinutes: 11,
  anchorRefs: ["Galateni 6:2", "Iacov 5:14", "1 Regi 19:5-8"],
  memoryVerseRef: "Galateni 6:2",
  safety: {
    topic: "mental_health",
    notice:
      "Lecția vorbește despre funcționare, boală și ajutor. Simptomele noi, severe sau urgente cer evaluare medicală; rugăciunea nu înlocuiește tratamentul.",
  },
  steps: [
    {
      id: "sf5_1",
      type: "check_in",
      order: 1,
      bubbles: [
        {
          from: "guide",
          text:
            "Suferința micșorează uneori lumea până la următoarea oră. Dumnezeu nu îți cere astăzi puterea pentru tot anul.",
        },
      ],
    },
    {
      id: "sf5_2",
      type: "scripture",
      order: 2,
      scripture: {
        text: "Purtați-vă sarcinile unii altora și veți împlini astfel legea lui Hristos.",
        ref: "Galateni 6:2",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Porunca presupune că există sarcini pe care omul nu trebuie să le poarte singur. A cere ajutor nu încalcă maturitatea; împlinește textul.",
        },
      ],
    },
    {
      id: "sf5_3",
      type: "world_vs_truth",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text:
            "Dacă știi un lucru pe care Dumnezeu ți-l cere și îl amâni, suferința nu te scutește automat de ascultare. Dar nici ascultarea nu înseamnă să refuzi limitele corpului sau ajutorul competent.",
        },
        {
          from: "guide",
          text:
            "Iacov 5 pune în aceeași comunitate rugăciunea, ungerea și îngrijirea. Scriptura nu opune credința mijloacelor prin care omul este ajutat.",
        },
      ],
    },
    {
      id: "sf5_help",
      type: "multi_choice",
      order: 4,
      multiChoice: {
        prompt: "Ce formă de ascultare și ajutor poți primi astăzi?",
        options: [
          { id: "sf5_medical", label: "O programare sau urmarea tratamentului" },
          { id: "sf5_person", label: "Un om căruia îi spun adevărul" },
          { id: "sf5_body", label: "Hrană, somn sau mișcare potrivită stării mele" },
          { id: "sf5_practical", label: "Un ajutor practic pe care îl cer clar" },
          { id: "sf5_spiritual", label: "Rugăciune și un text biblic citit fără grabă" },
        ],
      },
    },
    {
      id: "sf5_5",
      type: "scripture",
      order: 5,
      scripture: {
        text:
          "Îngerul Domnului l-a atins și i-a zis: «Scoală-te și mănâncă». El s-a uitat și la căpătâiul lui era o turtă coaptă și un urcior cu apă.",
        ref: "1 Regi 19:5-6",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Ilie ceruse să moară. Primul răspuns al lui Dumnezeu a inclus somn, hrană și apă. Abia după aceea au venit cuvintele și următorul drum.",
        },
      ],
    },
    {
      id: "sf5_6",
      type: "quiz",
      order: 6,
      quiz: {
        question: "Care răspuns este ascultare biblică în boală sau epuizare?",
        options: [
          { text: "Să oprești tratamentul ca să dovedești credință", correct: false },
          { text: "Să te rogi și să primești ajutorul medical și omenesc potrivit", correct: true },
          { text: "Să ascunzi starea ca să nu împovărezi pe nimeni", correct: false },
        ],
        explanation:
          "Credința nu cere negarea corpului. Dumnezeu l-a îngrijit pe Ilie trupește și poruncește comunității să poarte sarcinile.",
      },
    },
    {
      id: "sf5_7",
      type: "step",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text:
            "Alege un singur lucru din ce ai bifat și fă-l înainte de sfârșitul zilei. Dacă este o programare, trimite cererea. Dacă este un om, scrie mesajul acum.",
        },
      ],
    },
    {
      id: "sf5_8",
      type: "prayer",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Doamne, arată-mi ascultarea de astăzi. Oprește mândria care refuză ajutorul și frica ce mă face să amân ce știu că trebuie făcut. Amin.",
        },
      ],
    },
    {
      id: "sf5_9",
      type: "journal",
      order: 9,
      journalPrompt:
        "Care este pasul concret, cine este implicat și până când îl faci?",
    },
    {
      id: "sf5_10",
      type: "memory_verse",
      order: 10,
      scripture: { text: "Purtați-vă sarcinile unii altora.", ref: "Galateni 6:2" },
    },
  ],
}

export const suferintaL6: Lesson = {
  id: "suferinta_l6",
  courseId: "path_suferinta",
  order: 6,
  title: "Speranță fără promisiuni false",
  estMinutes: 12,
  anchorRefs: ["Romani 8:22-25", "2 Corinteni 12:7-10", "Apocalipsa 21:4"],
  memoryVerseRef: "Apocalipsa 21:4",
  steps: [
    {
      id: "sf6_1",
      type: "check_in",
      order: 1,
      bubbles: [
        {
          from: "guide",
          text:
            "Speranța creștină nu este obligația de a spune că mâine va fi mai ușor. Este legată de ceva mai tare decât prognoza unei zile.",
        },
      ],
    },
    {
      id: "sf6_2",
      type: "world_vs_truth",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Biblia ne cere să ne rugăm pentru vindecare. Nu ne dă dreptul să garantăm fiecărui om vindecarea acum dacă are destulă credință.",
        },
        {
          from: "guide",
          text:
            "Pavel s-a rugat de trei ori să îi fie luat țepușul și răspunsul nu a fost îndepărtarea lui. Harul lui Dumnezeu nu a fost mai puțin real din cauza răspunsului.",
        },
      ],
    },
    {
      id: "sf6_hope",
      type: "choice",
      order: 3,
      choice: {
        prompt: "Ce face speranța greu de primit acum?",
        options: [
          {
            id: "sf6_guarantee",
            label: "Vreau o garanție că situația se schimbă aici",
            branchStepId: "sf6_branch_guarantee",
          },
          {
            id: "sf6_forgetting",
            label: "Mi-e teamă că speranța înseamnă să uit ce am pierdut",
            branchStepId: "sf6_branch_forgetting",
          },
          {
            id: "sf6_tired",
            label: "Sunt prea obosit să mai sper",
            branchStepId: "sf6_branch_tired",
          },
        ],
      },
    },
    {
      id: "sf6_branch_guarantee",
      type: "how_god_helps",
      order: 91,
      bubbles: [
        {
          from: "guide",
          text:
            "Nu îți voi da o garanție pe care Scriptura nu o dă. Poți cere vindecare cu îndrăzneală și poți folosi toate mijloacele bune. Temelia speranței rămâne învierea și prezența Lui, nu un termen inventat.",
        },
      ],
    },
    {
      id: "sf6_branch_forgetting",
      type: "how_god_helps",
      order: 92,
      bubbles: [
        {
          from: "guide",
          text:
            "Învierea nu șterge persoana iubită și nici nu numește moartea neimportantă. Speranța spune că moartea nu are ultimul cuvânt. A-ți aminti nu este necredință.",
        },
      ],
    },
    {
      id: "sf6_branch_tired",
      type: "how_god_helps",
      order: 93,
      bubbles: [
        {
          from: "guide",
          text:
            "Atunci nu produce o emoție. Spune doar adevărul pe care îl poți purta: «Doamne, eu nu mai pot ține speranța; ține-mă Tu». Credința slabă se sprijină pe același Hristos puternic.",
        },
      ],
    },
    {
      id: "sf6_4",
      type: "scripture",
      order: 4,
      scripture: {
        text:
          "Toată firea suspină și suferă durerile nașterii. Și noi suspinăm în noi și așteptăm răscumpărarea trupului nostru.",
        ref: "Romani 8:22-23",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Pavel nu numește suspinul lipsă de credință. Îl pune chiar în mijlocul așteptării creștine. Trupul încă așteaptă răscumpărarea deplină.",
        },
      ],
    },
    {
      id: "sf6_5",
      type: "scripture",
      order: 5,
      scripture: {
        text:
          "El va șterge orice lacrimă din ochii lor. Și moartea nu va mai fi. Nu va mai fi nici tânguire, nici țipăt, nici durere.",
        ref: "Apocalipsa 21:4",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Aceasta nu este o metaforă pentru o atitudine pozitivă. Este promisiunea unei lumi refăcute, în care moartea și durerea nu mai au loc.",
        },
      ],
    },
    {
      id: "sf6_6",
      type: "quiz",
      order: 6,
      quiz: {
        question: "Unde pune Noul Testament garanția că durerea va înceta deplin?",
        options: [
          { text: "În vindecarea imediată a fiecărui credincios", correct: false },
          { text: "În înviere și în creația refăcută de Dumnezeu", correct: true },
          { text: "În capacitatea omului de a nu mai simți", correct: false },
        ],
        explanation:
          "Ne rugăm și lucrăm pentru bine acum, dar garanția universală este Apocalipsa 21, nu un termen promis de noi.",
      },
    },
    {
      id: "sf6_7",
      type: "step",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text:
            "Scrie o speranță fără termen fals: «Astăzi cer ____. Dacă răspunsul întârzie, mă sprijin pe ____. La înviere știu că ____».",
        },
      ],
    },
    {
      id: "sf6_8",
      type: "prayer",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Doamne, cer ajutor și vindecare fără să Îți dictez răspunsul. Păzește-mă de promisiuni false și ține-mi ochii spre ziua în care moartea și durerea nu vor mai fi. Amin.",
        },
      ],
    },
    {
      id: "sf6_9",
      type: "journal",
      order: 9,
      journalPrompt:
        "Ce ceri pentru viața aceasta și ce speranță rămâne chiar dacă răspunsul nu vine în forma dorită?",
    },
    {
      id: "sf6_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "Moartea nu va mai fi. Nu va mai fi nici tânguire, nici țipăt, nici durere.",
        ref: "Apocalipsa 21:4",
      },
    },
  ],
}

export const suferintaL7: Lesson = {
  id: "suferinta_l7",
  courseId: "path_suferinta",
  order: 7,
  title: "Mergi mai departe fără să negi ce a fost",
  estMinutes: 11,
  anchorRefs: ["Plângerile 3:21-24", "Psalmul 23:4", "Filipeni 3:12-14"],
  memoryVerseRef: "Plângerile 3:22-23",
  steps: [
    {
      id: "sf7_1",
      type: "check_in",
      order: 1,
      bubbles: [
        {
          from: "guide",
          text:
            "Ultima lecție nu închide durerea. Încheie doar acest traseu și îți lasă un mod de a merge cu Dumnezeu prin ce rămâne.",
        },
      ],
    },
    {
      id: "sf7_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "A merge mai departe nu înseamnă să lași persoana în urmă, să pretinzi că trupul este ca înainte sau să nu mai întrebi niciodată.",
        },
        {
          from: "guide",
          text:
            "Înseamnă să nu dai durerii dreptul de a hotărî singură fiecare pas care urmează.",
        },
      ],
    },
    {
      id: "sf7_3",
      type: "scripture",
      order: 3,
      scripture: {
        text:
          "Iată ce mai gândesc în inima mea și iată ce mă face să mai trag nădejde: bunătățile Domnului nu s-au sfârșit, îndurările Lui nu sunt la capăt, ci se înnoiesc în fiecare dimineață.",
        ref: "Plângerile 3:21-23",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Cuvintele au fost scrise privind ruinele Ierusalimului. Autorul nu a ieșit din dezastru ca să vorbească despre îndurare. Le-a văzut pe amândouă în aceeași dimineață.",
        },
      ],
    },
    {
      id: "sf7_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text:
            "Durerea poate reveni la aniversări, rezultate medicale, mirosuri sau melodii. Revenirea ei nu anulează ce a lucrat Dumnezeu și nu te trimite la început.",
        },
        {
          from: "guide",
          text:
            "Când revine, faci din nou lucrurile adevărate: plângi fără rușine, verifici dacă există ceva de pus în ordine, primești ajutorul și îți aduci aminte de promisiunea finală.",
        },
      ],
    },
    {
      id: "sf7_5",
      type: "step",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text:
            "Pregătește trei rânduri pentru ziua grea: omul pe care îl suni, adevărul biblic pe care îl citești și pasul medical sau practic pe care nu îl amâni.",
        },
      ],
    },
    {
      id: "sf7_6",
      type: "declaration",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text:
            "Dacă poți spune onest, scrie o declarație. Nu declara că nu mai doare și nu promite ce nu controlezi.",
        },
      ],
      response: {
        prompt:
          "Completează voluntar: «Nu numesc răul bine și nu inventez o explicație. Astăzi aleg să…»",
        placeholder: "Astăzi aleg să…",
      },
    },
    {
      id: "sf7_7",
      type: "prayer",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text:
            "Doamne, Îți dau din nou ce nu pot controla. Ține-mă în adevăr, mustră-mă unde trebuie să mă întorc și mângâie-mă unde port o rană, nu o vină. Condu următorul meu pas. Amin.",
        },
      ],
    },
    {
      id: "sf7_8",
      type: "journal",
      order: 8,
      journalPrompt:
        "Ce s-a schimbat în felul în care Îl vezi pe Dumnezeu și care întrebare rămâne încă deschisă?",
    },
    {
      id: "sf7_9",
      type: "memory_verse",
      order: 9,
      scripture: {
        text: "Îndurările Lui nu sunt la capăt, ci se înnoiesc în fiecare dimineață.",
        ref: "Plângerile 3:22-23",
      },
    },
  ],
}

export const SUFERINTA_LESSONS = [
  suferintaL1,
  suferintaL2,
  suferintaL3,
  suferintaL4,
  suferintaL5,
  suferintaL6,
  suferintaL7,
]
