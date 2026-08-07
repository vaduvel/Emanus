import type { Lesson } from "../domain.js"

/*
 * Traseul pentru doliu, boala si intrebarea "de ce a permis Dumnezeu?".
 *
 * PROVENIENTA
 * Textul nu este scris aici. Este adus din packages/shared/src/paths/suferinta.ts
 * de pe ramura codex/nolan-short-courses (blob d0e68097, 37.412 octeti), unde
 * exista deja complet. A fost impartit in suferintaA.ts (lectiile 1-3) si
 * suferintaB.ts (lectiile 4-7) pentru ca un singur fisier de 37 KB depaseste
 * bugetul sigur al unei singure scrieri.
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
 *
 * INTRAREA CONTEXTUALA
 * Pasul sf1_focus este intrarea comuna pentru cele trei usi care ajung aici:
 * doliu, boala si de_ce_permis. Optiunile sf1_loss / sf1_illness / sf1_why
 * corespund exact celor trei usi, iar doorEntries.ts de pe codex le mapeaza.
 * Nu redenumi aceste identificatoare fara sa actualizezi maparea.
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
