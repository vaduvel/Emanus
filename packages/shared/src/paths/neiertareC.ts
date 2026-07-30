import type { Lesson } from "../domain.js"

/*
 * Parcursul "Neiertare" — lecțiile 6-7 (pașii 6-7: întoarcerea și viața de zi cu zi).
 *
 * REGULĂ DE SIGURANȚĂ, NENEGOCIABILĂ (docs/20 §4):
 * iertarea nu înseamnă împăcare, nu înseamnă întoarcere lângă cineva periculos
 * și nu înseamnă tăcere în fața abuzului. Se spune EXPLICIT, nu se subințelege.
 * Nu se scoate din lecția 6 la nicio revizuire.
 */

export const neiertareL6: Lesson = {
  id: "neiertare_l6",
  courseId: "path_neiertare",
  order: 6,
  title: "Iertarea nu e un sentiment",
  estMinutes: 13,
  anchorRefs: ["Efeseni 4:31-32", "Marcu 11:25"],
  memoryVerseRef: "Efeseni 4:32",
  safety: {
    topic: "abuse",
    notice:
      "Iertarea din această lecție nu înseamnă împăcare, contact cu agresorul, renunțarea la dreptate sau întoarcerea într-un loc periculos.",
  },
  steps: [
    {
      id: "n6_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum ești azi?" }],
    },
    {
      id: "n6_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Ai hârtia de ieri? Cu ce îți datorează?" },
        { from: "guide", text: "Azi facem ceva cu ea. Dar mai întâi, trei lucruri care trebuie spuse limpede." },
      ],
    },
    {
      id: "n6_3",
      type: "world_vs_truth",
      order: 3,
      bubbles: [
        { from: "guide", text: "Unu. Iertarea nu înseamnă împăcare." },
        {
          from: "guide",
          text: "Poți ierta un om pe care nu-l mai vezi niciodată. Iertarea o faci singur, cu Dumnezeu. Împăcarea are nevoie de doi și de pocăință de partea cealaltă.",
        },
      ],
    },
    {
      id: "n6_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Doi. Iertarea nu înseamnă să te întorci undeva unde ești în pericol." },
        {
          from: "guide",
          text: "Dacă cineva te lovește, pe tine sau pe copiii tăi, poți ierta și poți pleca în aceeași zi. Dumnezeu nu ți-a cerut niciodată să stai să fii distrus. Cine ți-a spus altceva a folosit greșit Biblia.",
        },
        {
          from: "guide",
          text: "Iar dacă ești în situația asta acum: oprește lecția și sună la 112 sau la 0800 500 333. Lecția te așteaptă.",
        },
      ],
    },
    {
      id: "n6_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        { from: "guide", text: "Trei. Iertarea nu înseamnă tăcere." },
        {
          from: "guide",
          text: "Poți ierta un om și în aceeași săptămână să-l dai pe mâna legii. Dreptatea și iertarea nu se bat cap în cap. Una ține de societate, cealaltă de inima ta.",
        },
      ],
    },
    {
      id: "n6_6",
      type: "name_struggle",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Acum, ce rămâne. Cei mai mulți așteaptă să simtă că pot ierta. Așteaptă să le treacă durerea întâi.",
        },
        { from: "guide", text: "Nu-ți trece. Nu așa merge." },
      ],
    },
    {
      id: "n6_7",
      type: "truth_simple",
      order: 7,
      bubbles: [
        { from: "guide", text: "Iertarea nu e un sentiment. E o hotărâre, luată împotriva sentimentului." },
        {
          from: "guide",
          text: "Iisus n-a așteptat pe cruce să-I treacă durerea ca să spună «iartă-i». A spus-o în timp ce Îl durea cel mai tare.",
        },
      ],
    },
    {
      id: "n6_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Orice amărăciune, orice iuțime, orice mânie, orice strigare și orice clevetire să piară din mijlocul vostru. Dimpotrivă, fiți buni unii cu alții, miloși și iertați-vă unul pe altul, cum v-a iertat și Dumnezeu pe voi în Hristos.",
        ref: "Efeseni 4:31-32",
      },
    },
    {
      id: "n6_9",
      type: "how_god_helps",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "Uită-te la ultimele cuvinte: «cum v-a iertat și Dumnezeu pe voi». Nu «cât puteți voi». Nu «dacă merită».",
        },
        {
          from: "guide",
          text: "Nu ți se cere să produci tu iertarea. Ți se cere să dai mai departe ce ai primit. E o țeavă, nu o fântână.",
        },
      ],
    },
    {
      id: "n6_readiness",
      type: "choice",
      order: 10,
      choice: {
        prompt: "Ce poti spune onest inaintea pasului de iertare?",
        options: [
          {
            id: "n6_ready",
            label: "Pot alege sa predau dreptatea, chiar daca inca doare",
            branchStepId: "n6_branch_ready",
          },
          {
            id: "n6_not_ready",
            label: "Vreau sa iert, dar nu pot spune inca faptul ca am ales",
            branchStepId: "n6_branch_not_ready",
          },
          {
            id: "n6_afraid",
            label: "Mi-e teama ca iertarea ma obliga sa ma intorc sau sa tac",
            branchStepId: "n6_branch_afraid",
          },
        ],
      },
    },
    {
      id: "n6_branch_ready",
      type: "how_god_helps",
      order: 91,
      bubbles: [
        {
          from: "guide",
          text:
            "Atunci poti numi alegerea fara sa pretinzi ca durerea a disparut. Declaratia nu spune ca fapta a fost mica si nici ca sentimentul tau trebuie sa se schimbe astazi. Spune doar in mana cui lasi dreptatea.",
        },
      ],
    },
    {
      id: "n6_branch_not_ready",
      type: "how_god_helps",
      order: 92,
      bubbles: [
        {
          from: "guide",
          text:
            "Nu spune o declaratie pe care nu o crezi. Poti scrie onest: «Doamne, vreau sa ajung sa pot alege iertarea; arata-mi ce ma tine». Dorinta de a veni spre iertare este pasul adevarat de astazi, nu un esec.",
        },
      ],
    },
    {
      id: "n6_branch_afraid",
      type: "how_god_helps",
      order: 93,
      bubbles: [
        {
          from: "guide",
          text:
            "Iertarea nu te obliga la contact, impacare, tacere, retragerea unei plangeri sau renuntarea la limite. Daca declaratia este folosita ca sa te trimita inapoi in pericol, nu mai vorbim despre iertare biblica. Siguranta ramane prima.",
        },
      ],
    },
    {
      id: "n6_10",
      type: "declaration",
      order: 11,
      bubbles: [
        { from: "guide", text: "Pasul de azi. Ia hârtia. Spune cu voce tare, uitându-te la ea:" },
        {
          from: "guide",
          text: "«Aleg — nu simt, dar aleg — să nu mai încasez eu datoria asta. O predau lui Dumnezeu. Nu-mi mai aparține.» Poți spune numele lui doar dacă este sigur pentru tine. Pe urmă rupe hârtia.",
        },
        {
          from: "guide",
          text: "Dacă plângi, e în regulă. Dacă nu simți absolut nimic, tot e în regulă. Ai făcut-o și rămâne făcută.",
        },
      ],
      response: {
        prompt:
          "Scrie declarația pe care o poți face onest azi. Poate fi «Aleg să iert și predau dreptatea lui Dumnezeu» sau «Doamne, vreau să ajung să pot alege iertarea».",
        placeholder: "Declarația mea…",
        required: true,
        minLength: 8,
      },
    },
    {
      id: "n6_11",
      type: "memory_verse",
      order: 12,
      scripture: {
        text: "Iertați-vă unul pe altul, cum v-a iertat și Dumnezeu pe voi în Hristos.",
        ref: "Efeseni 4:32",
      },
    },
    {
      id: "n6_12",
      type: "prayer",
      order: 13,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, aleg să iert. Nu pentru că merită și nu pentru că simt. Pentru că Tu m-ai iertat pe mine și nu vreau să mai car ce nu e al meu. Ia-l din mâna mea. Și dacă mâine îl iau înapoi, adu-mi aminte de ziua de azi. Amin.",
        },
      ],
    },
    {
      id: "n6_13",
      type: "journal",
      order: 14,
      journalPrompt: "Ai rupt hârtia? Scrie ce ai simțit — sau ce n-ai simțit.",
      reward: { xp: 0 },
    },
  ],
}

export const neiertareL7: Lesson = {
  id: "neiertare_l7",
  courseId: "path_neiertare",
  order: 7,
  title: "Ce fac când revine",
  estMinutes: 10,
  anchorRefs: ["Matei 6:12", "Luca 6:28", "Filipeni 1:6"],
  memoryVerseRef: "Filipeni 1:6",
  steps: [
    {
      id: "n7_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Ultima zi din drumul ăsta. Cum ești?" }],
    },
    {
      id: "n7_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Îți spun de pe acum ce urmează, ca să nu crezi că ai dat greș: peste câteva zile o să-ți vină înapoi. O amintire, o poză, o voce — și valul întreg peste tine.",
        },
        { from: "guide", text: "Asta nu înseamnă că iertarea de ieri n-a fost adevărată." },
      ],
    },
    {
      id: "n7_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "Iisus i-a spus lui Petru «de șaptezeci de ori câte șapte» nu pentru că Petru urma să întâlnească patru sute nouăzeci de oameni răi.",
        },
        { from: "guide", text: "Ci pentru că pe același om o să-l ierți de patru sute nouăzeci de ori." },
      ],
    },
    {
      id: "n7_4",
      type: "scripture",
      order: 4,
      scripture: {
        text: "Și ne iartă nouă greșelile noastre, precum și noi iertăm greșiților noștri.",
        ref: "Matei 6:12",
      },
    },
    {
      id: "n7_5",
      type: "how_god_helps",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Iisus a pus iertarea în rugăciunea de fiecare zi, lângă pâinea de fiecare zi. Nu într-o ceremonie anuală.",
        },
        { from: "guide", text: "Se face zilnic, ca mâncatul. Nu o dată, definitiv." },
      ],
    },
    {
      id: "n7_6",
      type: "step",
      order: 6,
      bubbles: [
        { from: "guide", text: "Deci îți las trei lucruri de folosit când revine." },
        {
          from: "guide",
          text: "Unu: nu te certa cu sentimentul. Spune doar — «am predat asta. Nu mai e a mea.» Și mergi mai departe.",
        },
        {
          from: "guide",
          text: "Doi: roagă-te pentru el. Iisus a zis «binecuvântați pe cei ce vă blestemă». Nu e pentru el, e pentru tine — nu poți urî un om pentru care te rogi cu adevărat.",
        },
        { from: "guide", text: "Trei: dacă pică, o iei de la capăt. Fără rușine. A patra oară sau a suta oară." },
      ],
    },
    {
      id: "n7_7",
      type: "quiz",
      order: 7,
      quiz: {
        question: "Peste două săptămâni te lovește iar ura. Ce înseamnă?",
        options: [
          { text: "Că n-am iertat cu adevărat și am mințit", correct: false },
          { text: "Că e normal — hotărârea rămâne, sentimentul vine din urmă", correct: true },
          { text: "Că trebuie să reiau tot parcursul de la zero", correct: false },
        ],
        explanation:
          "Hotărârea s-a luat o dată. Sentimentul vine din urmă, uneori luni întregi. Cazi și te ridici pe aceeași hotărâre, nu iei alta.",
      },
    },
    {
      id: "n7_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Sunt încredințat că Acela care a început în voi această bună lucrare o va isprăvi până în ziua lui Iisus Hristos.",
        ref: "Filipeni 1:6",
      },
    },
    {
      id: "n7_9",
      type: "truth_simple",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "Lucrarea asta n-ai început-o tu și n-o duci tu la capăt. Tu doar n-ai fugit șapte zile.",
        },
        { from: "guide", text: "Restul Îl privește pe El, și Îl privește de mult." },
      ],
    },
    {
      id: "n7_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "Acela care a început în voi această bună lucrare o va isprăvi.",
        ref: "Filipeni 1:6",
      },
    },
    {
      id: "n7_11",
      type: "prayer",
      order: 11,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, Îi binecuvântez pe cei care m-au rănit. Nu pentru că-mi vine, ci pentru că așa ai spus. Când o să-mi vină iar, adu-mi aminte că am predat asta. Și ține Tu ce am lăsat în mâna Ta. Amin.",
        },
      ],
    },
    {
      id: "n7_12",
      type: "journal",
      order: 12,
      journalPrompt: "Ce e altfel azi față de ziua întâi?",
      reward: { xp: 0 },
    },
  ],
}
