import type { Lesson } from "../domain.js"

/*
 * CAMERA 6 — "Trebuie sa merit" / minciuna: "Ma iubeste cat de bun sunt."
 * Drumul: path_har. Toate cele sapte lectii sunt in fisierul asta.
 *
 * Usi care duc aici: merit, obisnuinta, frica_pedeapsa, epuizat_slujire.
 *
 * ORDINEA (docs/21 §2): incepem cu faptul ca nu se poate cumpara — pentru ca
 * omul de aici nu are nevoie de mai multa disciplina, are nevoie sa afle ca
 * balanta pe care o ține in cap nu exista. Ascultarea (lectia 4) vine DUPA har,
 * altfel drumul asta ar produce exact ce vrea sa vindece.
 *
 * ATENTIE (docs/22 §6): nu arătăm cu degetul catre nicio denominațiune. Vorbim
 * despre mecanismul din inima omului, care e la fel la ortodox, penticostal,
 * baptist si ateu moral. Textul nu spune niciodata "religia X greșește".
 *
 * VOCEA (docs/22 §10): Emanus. Fara nume de om.
 */

export const harL1: Lesson = {
  id: "har_l1",
  courseId: "path_har",
  order: 1,
  title: "Nu se cumpara",
  estMinutes: 12,
  anchorRefs: ["Efeseni 2:8-9", "Tit 3:5", "Luca 18:9-14"],
  memoryVerseRef: "Efeseni 2:8-9",
  steps: [
    {
      id: "h1_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Bine ca ai apasat." },
        {
          from: "guide",
          text: "Ce scrii aici ramane in telefonul tau — nu citeste nimeni. Cum esti azi?",
        },
      ],
    },
    {
      id: "h1_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Cine intra aici, de obicei, face lucrurile. Se roaga, merge, ajuta, da, posteste, nu face rau nimanui.",
        },
        {
          from: "guide",
          text:
            "Si totusi are in cap o balanta care nu se echilibreaza niciodata. O zi bună — pare că e bine cu Dumnezeu. O zi slaba — se simte respins.",
        },
        { from: "guide", text: "Azi vorbim despre balanta aia. Nu despre cat de mult faci." },
      ],
    },
    {
      id: "h1_3",
      type: "choice",
      order: 3,
      choice: {
        prompt: "Care propozitie seamana mai mult cu tine?",
        options: [
          {
            id: "h1c_a",
            label: "Simt ca nu fac niciodata destul",
            branchStepId: "h1_branch_never_enough",
          },
          {
            id: "h1c_b",
            label: "Fac ce trebuie, dar nu simt nimic",
            branchStepId: "h1_branch_numb",
          },
          {
            id: "h1c_c",
            label: "Mi-e frica sa nu mă pedepseasca",
            branchStepId: "h1_branch_punishment",
          },
        ],
      },
    },
    {
      id: "h1_branch_never_enough",
      type: "how_god_helps",
      order: 91,
      bubbles: [
        {
          from: "guide",
          text:
            "Când măsura se mută de fiecare dată după ce ai reușit, problema nu mai este cât faci, ci ideea că acceptarea poate fi cumpărată. Harul oprește tocmai această contabilitate.",
        },
      ],
    },
    {
      id: "h1_branch_numb",
      type: "how_god_helps",
      order: 92,
      bubbles: [
        {
          from: "guide",
          text:
            "Faptul că ai continuat nu te face fals, iar lipsa emoției nu anulează automat relația. Dar poți recunoaște oboseala și rutina fără să le acoperi cu activitate. Aici nu îți vom mai adăuga încă o sarcină.",
        },
      ],
    },
    {
      id: "h1_branch_punishment",
      type: "how_god_helps",
      order: 93,
      bubbles: [
        {
          from: "guide",
          text:
            "Frica poate veni din felul în care ai fost tratat sau dintr-o imagine a lui Dumnezeu construită prin amenințări. Consecințele și disciplina nu sunt același lucru cu respingerea sau teroarea. Vom despărți lucrurile acestea.",
        },
      ],
    },
    {
      id: "h1_4",
      type: "scripture",
      order: 4,
      scripture: {
        text:
          "Caci prin har ati fost mantuiti, prin credința. Si asta nu vine de la voi; ci este darul lui Dumnezeu. Nu prin fapte, ca sa nu se laude nimeni.",
        ref: "Efeseni 2:8-9",
      },
      bubbles: [
        {
          from: "guide",
          text: "«Har» e un cuvant de biserica si merita explicat simplu, o data:",
        },
        {
          from: "guide",
          text:
            "Har = ceva bun pe care il primesti si nu l-ai meritat. Nu il poți cere ca pe un drept si nu îl poți plati inapoi.",
        },
        {
          from: "guide",
          text:
            "Iar cuvantul «dar» e cheia. Un cadou pentru care ai plati ceva nu mai e cadou, e cumparat. Nu exista varianta la mijloc.",
        },
      ],
    },
    {
      id: "h1_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text:
            "Toate sistemele religioase din lume, si toata logica noastra de zi cu zi, functioneaza intr-un fel: faci → devii acceptat.",
        },
        {
          from: "guide",
          text: "Creștinismul e singurul care e invers: esti acceptat → faci, din alt motiv.",
        },
        {
          from: "guide",
          text:
            "Si nu e o subtilitate teologica. Schimba complet ce se intampla in tine cand cazi si cand reușești.",
        },
      ],
    },
    {
      id: "h1_6",
      type: "scripture",
      order: 6,
      scripture: {
        text:
          "Doi oameni s-au dus la Templu sa se roage... Fariseul: «Dumnezeule, Iti mulțumesc că nu sunt ca ceilalti oameni.» Vamesul: «Dumnezeule, ai mila de mine, pacatosul!»",
        ref: "Luca 18:10-13",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Fariseul nu mintea. Chiar postea de doua ori pe saptamana, chiar dadea zeciuiala. Era, obiectiv, un om mai bun.",
        },
        {
          from: "guide",
          text:
            "Iar Iisus spune ca celalalt a plecat acasa socotit neprihanit. Nu pentru ca a facut mai mult. Pentru ca a venit cu mana goala.",
        },
        {
          from: "guide",
          text: "Cel cu mana plina nu are unde sa primeasca nimic.",
        },
      ],
    },
    {
      id: "h1_7",
      type: "quiz",
      order: 7,
      quiz: {
        question: "De ce a plecat vamesul indreptatit si fariseul nu?",
        options: [
          { text: "Pentru ca vamesul suferise mai mult", correct: false },
          { text: "Pentru ca a venit cu mana goala, iar celalalt a venit cu factura", correct: true },
          { text: "Pentru ca fariseul nu se ruga corect gramatical", correct: false },
          { text: "Pentru ca Dumnezeu preferă oamenii simpli", correct: false },
        ],
        explanation:
          "Faptele fariseului erau reale. Problema era la ce le folosea: ca dovada că merita. Harul nu se poate primi cu mana plina — nu pentru ca Dumnezeu Se supara, ci pentru ca fizic nu mai e loc.",
      },
    },
    {
      id: "h1_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Și ca sa fie clar ca nu e un accident de traducere: «El ne-a mantuit nu pentru faptele facute de noi in neprihanire, ci pentru mila Lui» (Tit 3:5).",
        },
        {
          from: "guide",
          text:
            "Aceeași propozitie se repeta in Noul Testament de zeci de ori, in feluri diferite, ca si cum autorii ar fi știut că nu o vom crede din prima.",
        },
      ],
    },
    {
      id: "h1_9",
      type: "step",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi: roaga-te o data fara sa spui nimic despre ce ai facut sau ce n-ai facut. Nici scuze, nici merite.",
        },
        {
          from: "guide",
          text: "Doar: «ai mila de mine» si apoi mulțumeste. Pare puțin. Pentru cineva ca tine e cel mai greu exercitiu din drum.",
        },
      ],
    },
    {
      id: "h1_10",
      type: "prayer",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "«Dumnezeule, ai mila de mine. Nu-Ti mai aduc lista. Vin cu mana goala.»",
        },
      ],
    },
    {
      id: "h1_11",
      type: "journal",
      order: 11,
      journalPrompt: "Scrie ce crezi tu, sincer, că ți-ar strica relația cu Dumnezeu dacă ai inceta sa faci.",
    },
    {
      id: "h1_12",
      type: "memory_verse",
      order: 12,
      scripture: { text: "Prin har ati fost mantuiti... este darul lui Dumnezeu.", ref: "Efeseni 2:8" },
      bubbles: [{ from: "guide", text: "Atat pentru azi." }],
    },
  ],
}

export const harL2: Lesson = {
  id: "har_l2",
  courseId: "path_har",
  order: 2,
  title: "Fiul care a rămas acasa",
  estMinutes: 11,
  anchorRefs: ["Luca 15:25-32", "Romani 8:15", "Galateni 4:7"],
  memoryVerseRef: "Luca 15:31",
  steps: [
    {
      id: "h2_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum esti azi? Cum a fost rugaciunea fara lista?" }],
    },
    {
      id: "h2_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Pilda cu fiul risipitor are doi fii. Aproape toti vorbesc despre cel care a plecat. Iisus a spus-o insa pentru cel care a rămas.",
        },
        {
          from: "guide",
          text: "Iar cel care a rămas e cel care nu intra in casa la final.",
        },
      ],
    },
    {
      id: "h2_3",
      type: "scripture",
      order: 3,
      scripture: {
        text:
          "«Iata, eu ți-am slujit atatia ani si niciodata nu ti-am calcat porunca; si mie niciodata nu mi-ai dat un ied sa mă veselesc cu prietenii mei.»",
        ref: "Luca 15:29",
      },
      bubbles: [
        {
          from: "guide",
          text: "Uita-te la verbul pe care il foloseste despre el insuși: «ti-am SLUJIT». Nu «am trait cu tine».",
        },
        {
          from: "guide",
          text:
            "Era fiu si se purtase ani intregi ca un angajat. Corect, harnic, punctual — si amarat.",
        },
        {
          from: "guide",
          text: "Amaraciunea aia e semnul de recunoastere. Cine slujeste ca sa merite se enerveaza cand altul primeste degeaba.",
        },
      ],
    },
    {
      id: "h2_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Și raspunsul tatalui e una din cele mai grele propozitii din Biblie:",
        },
        {
          from: "guide",
          text: "«Fiule, tu intotdeauna esti cu mine si tot ce am eu este al tau.» (15:31)",
        },
        {
          from: "guide",
          text:
            "Tot ce a muncit sa caștige era deja al lui. Nu i-a lipsit nimic — doar nu știa, si de aia n-a cerut niciodata nici un ied.",
        },
        {
          from: "guide",
          text: "A trait ani intregi ca un sarac pe o moșie care ii apartinea.",
        },
      ],
    },
    {
      id: "h2_5",
      type: "quiz",
      order: 5,
      quiz: {
        question: "Ce nu știa fiul cel mare?",
        options: [
          { text: "Ca tatal e bogat", correct: false },
          { text: "Ca tot ce e al tatalui era deja al lui — nu avea de caștigat nimic", correct: true },
          { text: "Ca fratele lui se va intoarce", correct: false },
          { text: "Ca trebuia sa munceasca mai mult", correct: false },
        ],
        explanation:
          "Ambii fii se raportau la tata ca la un patron: unul a cerut avansul si a plecat, celalalt a muncit pentru salariu. Pilda are un singur subiect: un tata care voia fii, nu angajați.",
      },
    },
    {
      id: "h2_6",
      type: "scripture",
      order: 6,
      scripture: {
        text:
          "Si voi n-ati primit un duh de robie, ca sa mai aveti frica, ci ati primit un duh de fii, care ne face sa strigam: «Ava», adica «Tata»!",
        ref: "Romani 8:15",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "«Ava» e cuvantul aramaic cu care un copil mic isi striga tatal. Cel mai apropiat echivalent in romana e «tata», spus de un copil de trei ani.",
        },
        {
          from: "guide",
          text:
            "Cuvantul asta a fost pastrat in original in scrisoare, netradus. Era prea important ca sa se piarda ceva din el.",
        },
        {
          from: "guide",
          text: "Un rob nu spune niciodata asa. Un rob spune «stapane».",
        },
      ],
    },
    {
      id: "h2_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "Concret, cum se vede diferenta dintre fiu si angajat, in aceeași zi de miercuri:",
        },
        {
          from: "guide",
          text:
            "Angajatul: dacă azi n-am citit, e ceva rupt intre noi. Fiul: n-am citit azi, si El nu m-a iubit mai puțin — dar eu am pierdut ceva, si de aia revin.",
        },
        {
          from: "guide",
          text:
            "Angajatul se compara. Fiul nu are de ce — nu exista un buget limitat de dragoste care sa se imparta.",
        },
      ],
    },
    {
      id: "h2_8",
      type: "step",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi: spune-I «Tata» o data, cu voce tare. Doar cuvantul asta, si taci dupa.",
        },
        {
          from: "guide",
          text:
            "Daca îți vine greu sau te blocheaza — e o informație importanta despre cum Îl vezi, nu un eșec. Scrie ce ai simtit.",
        },
      ],
    },
    {
      id: "h2_9",
      type: "prayer",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "«Tata. Nu vreau sa mai fiu angajatul Tau. Arata-mi ce am deja si nu știu.»",
        },
      ],
    },
    {
      id: "h2_10",
      type: "journal",
      order: 10,
      journalPrompt: "Cum a fost sa spui «Tata»? Și unde te-ai purtat pana acum ca un angajat?",
    },
    {
      id: "h2_11",
      type: "memory_verse",
      order: 11,
      scripture: { text: "Fiule, tu intotdeauna esti cu mine si tot ce am eu este al tau.", ref: "Luca 15:31" },
    },
  ],
}

export const harL3: Lesson = {
  id: "har_l3",
  courseId: "path_har",
  order: 3,
  title: "Frica nu vine de la El",
  estMinutes: 11,
  anchorRefs: ["1 Ioan 4:18", "Evrei 4:16", "Romani 8:1"],
  memoryVerseRef: "1 Ioan 4:18",
  steps: [
    {
      id: "h3_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum esti azi?" }],
    },
    {
      id: "h3_2",
      type: "name_struggle",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Multi oameni cresc cu o imagine despre Dumnezeu care nu e in Biblie: un judecator care aspepta sa greșești ca sa te loveasca.",
        },
        {
          from: "guide",
          text:
            "Se vede in lucruri mici: cand se intampla o nenorocire, primul gand e «ce am facut?». Sau nu indraznesti sa ceri, ca sa nu deranjezi.",
        },
        { from: "guide", text: "Azi ne uitam la ce spune Biblia despre frica asta." },
      ],
    },
    {
      id: "h3_3",
      type: "scripture",
      order: 3,
      scripture: {
        text:
          "In dragoste nu este frica; ci dragostea desavarsita izgonit frica; pentru ca frica are cu ea pedeapsa.",
        ref: "1 Ioan 4:18",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Fraza a doua explica prima: frica de care vorbeste e frica de PEDEAPSA. Aia nu are ce sa caute in relația cu El.",
        },
        {
          from: "guide",
          text:
            "Nu se refera la respect. Biblia numeste «frica de Domnul» inceputul ințelepciunii — dar acolo e alt lucru: greutatea pe care o are cineva pentru tine, nu teroarea.",
        },
        {
          from: "guide",
          text:
            "Diferenta e ca intre respectul pentru un tata bun si teama de un om care bate. Amandoua se numesc «frica» in romana, si nu sunt acelasi lucru.",
        },
      ],
    },
    {
      id: "h3_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text:
            "Și mai e o problema practica cu frica de pedeapsa: nu tine. Produce ascundere, nu schimbare.",
        },
        {
          from: "guide",
          text:
            "Un copil care se teme de tata nu inceteaza sa greșeasca. Doar inceteaza sa ii spuna. Exact ce nu vrem in relația cu Dumnezeu.",
        },
      ],
    },
    {
      id: "h3_5",
      type: "scripture",
      order: 5,
      scripture: {
        text:
          "Sa ne apropiem dar cu deplina încredere de scaunul harului, ca sa capatam mila si sa gasim har, ca sa fim ajutati la vreme de nevoie.",
        ref: "Evrei 4:16",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Cuvantul din greaca pentru «deplina încredere» e «parrhesia»: dreptul de a vorbi liber, fara sa îți ceri scuze că exiști.",
        },
        {
          from: "guide",
          text:
            "Și observa numele scaunului: al HARULUI. Nu al judecatii. Pentru cine e in Hristos, tronul si-a schimbat numele.",
        },
        {
          from: "guide",
          text: "Iar momentul recomandat pentru a te apropia e «vremea de nevoie». Adica exact cand te-ai simti cel mai nedemn sa vii.",
        },
      ],
    },
    {
      id: "h3_6",
      type: "quiz",
      order: 6,
      quiz: {
        question: "Ce fel de frica nu are loc in relația cu Dumnezeu?",
        options: [
          { text: "Orice fel de frica sau respect", correct: false },
          { text: "Frica de pedeapsa — cea care te face sa te ascunzi de El", correct: true },
          { text: "Frica de consecințele faptelor rele", correct: false },
          { text: "Respectul pentru cine e El", correct: false },
        ],
        explanation:
          "1 Ioan 4:18 spune explicit «frica are cu ea pedeapsa». Aia e frica scoasa afara. Respectul rami — dar respectul te apropie, teroarea te ascunde. Testul e in ce direcție te mișca.",
      },
    },
    {
      id: "h3_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text:
            "Si daca te intrebi ce facem cu disciplinarea, ca exista in Biblie: Evrei 12 spune ca Dumnezeu disciplineaza «pe cine iubește», ca un tata.",
        },
        {
          from: "guide",
          text:
            "Dar textul spune si scopul: «spre folosul nostru, ca sa ne faca partași sfințeniei Lui». Corectarea unui tata are un scop si un capat. Pedeapsa unui judecator, nu.",
        },
        {
          from: "guide",
          text: "Nu e acelasi lucru, si de aia nu trebuie sa trăiești așteptând lovitura.",
        },
      ],
    },
    {
      id: "h3_8",
      type: "step",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi: cere-I un lucru concret, mic, pentru tine. Nu pentru altcineva, nu ceva nobil. Un lucru de care ai nevoie tu.",
        },
        {
          from: "guide",
          text: "Cine se teme de pedeapsa nu cere niciodata pentru el. Fa asta o data si observa ce simti.",
        },
      ],
    },
    {
      id: "h3_9",
      type: "prayer",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "«Doamne, nu vreau sa mă mai apropii de Tine cu spatele la perete. Vin liber. Am nevoie de...» — si spune ce.",
        },
      ],
    },
    {
      id: "h3_10",
      type: "journal",
      order: 10,
      journalPrompt: "De unde crezi ca ai luat imaginea de Dumnezeu care pedepseste? Un rand.",
    },
    {
      id: "h3_11",
      type: "memory_verse",
      order: 11,
      scripture: { text: "In dragoste nu este frica; dragostea desavarsita izgonit frica.", ref: "1 Ioan 4:18" },
    },
  ],
}

export const harL4: Lesson = {
  id: "har_l4",
  courseId: "path_har",
  order: 4,
  title: "Atunci de ce sa mai fac ceva?",
  estMinutes: 11,
  anchorRefs: ["Ioan 14:15", "2 Corinteni 5:14", "Galateni 5:6"],
  memoryVerseRef: "2 Corinteni 5:14",
  steps: [
    {
      id: "h4_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum esti azi? Ai cerut ceva pentru tine?" }],
    },
    {
      id: "h4_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Daca trei lectii la rand ți-am spus ca nu se caștiga nimic, e normal sa apara intrebarea: atunci de ce sa mai fac ceva?",
        },
        { from: "guide", text: "Intrebarea e corecta si Biblia ii raspunde direct." },
      ],
    },
    {
      id: "h4_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Caci dragostea lui Hristos ne strange; fiindca socotim ca, dacă Unul singur a murit pentru toți, toți deci au murit.",
        ref: "2 Corinteni 5:14",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "«Ne strange» — in greaca, un cuvant folosit pentru ceva care te ține si te impinge inainte, ca malurile care duc un fluviu.",
        },
        {
          from: "guide",
          text:
            "Deci motorul nu e frica si nu e datoria. E dragostea Lui, care odata inteleasa nu te lasa sa stai.",
        },
        {
          from: "guide",
          text: "Un om care a fost scos din apa nu trebuie obligat sa fie recunoscator.",
        },
      ],
    },
    {
      id: "h4_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text:
            "Iisus a spus: «daca Mă iubiti, veti pazi poruncile Mele» (Ioan 14:15). Uita-te la ordine.",
        },
        {
          from: "guide",
          text:
            "Nu «paziti poruncile ca sa va iubesc». Nu «paziti poruncile ca sa Mă iubiti». Iubirea e prima, ascultarea e consecinta.",
        },
        {
          from: "guide",
          text:
            "De aia harul nu produce delasare, cum se teme toata lumea. Produce ascultare care tine — pentru că nu depinde de cat de tare strangi din dinti azi.",
        },
      ],
    },
    {
      id: "h4_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Doua case, aceleasi fapte in ele, doua vieti complet diferite:",
        },
        {
          from: "guide",
          text:
            "Prima: fac ca sa fiu acceptat. Rezultat — oboseala, comparație, mandrie cand merge, disperare cand nu, si niciodata pace.",
        },
        {
          from: "guide",
          text:
            "A doua: fac pentru că sunt acceptat. Rezultat — aceleași fapte, dar fara panica. Cazi, te intorci, continui.",
        },
        {
          from: "guide",
          text: "Din afara arata identic. Din interior, una omoara si alta ține.",
        },
      ],
    },
    {
      id: "h4_6",
      type: "quiz",
      order: 6,
      quiz: {
        question: "Care e ordinea corecta?",
        options: [
          { text: "Ascult → sunt iubit", correct: false },
          { text: "Sunt iubit → ascult, din alt motiv", correct: true },
          { text: "Sunt iubit → nu mai conteaza ce fac", correct: false },
          { text: "Ascult ca sa nu fiu pedepsit", correct: false },
        ],
        explanation:
          "Harul nu desființeaza ascultarea, ii schimba motivul — si de aia rezista. Galateni 5:6 spune «credința care lucreaza prin dragoste»: credința adevarata lucreaza, dar motorul e dragostea, nu teama.",
      },
    },
    {
      id: "h4_7",
      type: "step",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi: fa un lucru bun despre care nu afla nimeni. Nimeni, niciodata.",
        },
        {
          from: "guide",
          text:
            "E cel mai simplu test pentru motiv: dacă nu se vede, nu se pune la punctaj. Și atunci vezi dacă mai ai chef sa il faci.",
        },
      ],
    },
    {
      id: "h4_8",
      type: "prayer",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "«Doamne, schimba-mi motivul. Nu vreau sa mai lucrez pentru ce am primit deja.»",
        },
      ],
    },
    {
      id: "h4_9",
      type: "memory_verse",
      order: 9,
      scripture: { text: "Dragostea lui Hristos ne strange.", ref: "2 Corinteni 5:14" },
    },
  ],
}

export const harL5: Lesson = {
  id: "har_l5",
  courseId: "path_har",
  order: 5,
  title: "Cand slujirea te-a golit",
  estMinutes: 11,
  anchorRefs: ["Luca 10:38-42", "Matei 11:28-30", "Ioan 15:5"],
  memoryVerseRef: "Matei 11:29",
  steps: [
    {
      id: "h5_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum esti azi?" }],
    },
    {
      id: "h5_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Exista o oboseala speciala, pe care o cunosc oamenii care fac mult in biserica sau pentru alții. Nu e oboseala de munca. E goliciune.",
        },
        {
          from: "guide",
          text:
            "Se recunoaste dupa un semn: te enerveaza oamenii pentru care lucrezi. Și îți pare rau ca te enerveaza, si te enerveaza si mai mult.",
        },
      ],
    },
    {
      id: "h5_3",
      type: "scripture",
      order: 3,
      scripture: {
        text:
          "«Doamne, nu-ți pasa că sora mea m-a lasat sa slujesc singura?» Domnul i-a raspuns: «Marto, Marto, pentru multe lucruri te ingrijorezi si te framanti tu, dar un lucru trebuie.»",
        ref: "Luca 10:40-42",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Marta nu facea nimic greșit. Gatea pentru Iisus. Ea Îl primise in casa — fara ea nu ar fi fost nici masa, nici scena.",
        },
        {
          from: "guide",
          text:
            "Si observa cum ajunge sa vorbeasca: intai il acuza pe Iisus («nu-ți pasa?»), apoi pe sora ei. Așa se termina slujirea fara sursa — in resentiment.",
        },
      ],
    },
    {
      id: "h5_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text:
            "Iisus nu i-a spus ca gatitul e rau. I-a spus «un lucru trebuie» — unul e necesar, restul urmeaza din el.",
        },
        {
          from: "guide",
          text:
            "Maria sta jos si ascultă. Nu era lenea — era locul din care se poate da mai departe ceva.",
        },
        {
          from: "guide",
          text: "Nimeni nu poate turna din vas gol. Iar cine tot toarna din vas gol se enerveaza pe cei care cer.",
        },
      ],
    },
    {
      id: "h5_5",
      type: "scripture",
      order: 5,
      scripture: {
        text:
          "Veniti la Mine, toți cei trudiți si impovarați, si Eu va voi da odihna. Luati jugul Meu asupra voastra... caci jugul Meu este blând si povara Mea este usoara.",
        ref: "Matei 11:28-30",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Un jug e o piesa de lemn care lega doi boi. Nu se punea niciodata pe unul singur.",
        },
        {
          from: "guide",
          text:
            "Deci «jugul Meu» nu inseamna «o sarcina de la Mine», inseamna «jugul in care sunt și Eu». Trage cu tine.",
        },
        {
          from: "guide",
          text:
            "Iar boul tanar se punea la jug cu unul batran, care ducea greul si il invața mersul. Daca ce faci e istovitor, e posibil sa fii in alt jug decat al Lui.",
        },
      ],
    },
    {
      id: "h5_6",
      type: "quiz",
      order: 6,
      quiz: {
        question: "Ce a greșit Marta?",
        options: [
          { text: "A gatit — nu trebuia sa munceasca", correct: false },
          { text: "A slujit fara sa mai stea cu El — si a ajuns la resentiment", correct: true },
          { text: "Nu a chemat destui oaspeti", correct: false },
          { text: "S-a rugat prea puțin dimineata", correct: false },
        ],
        explanation:
          "Iisus nu a criticat munca, a numit ingrijorarea si framantarea. Semnul că lipseste «un lucru» nu e oboseala fizica — e amaraciunea fata de oamenii pentru care lucrezi.",
      },
    },
    {
      id: "h5_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "Practic, pentru cineva epuizat de slujire, in ordinea asta:",
        },
        {
          from: "guide",
          text: "1. Sursa inaintea servirii. Zece minute cu El inainte de orice lista.",
        },
        {
          from: "guide",
          text:
            "2. Spune «nu» la ceva. Iisus nu a vindecat pe toata lumea din Israel si a plecat de langa multimi ca sa Se roage. Nu era neglijent.",
        },
        {
          from: "guide",
          text:
            "3. Verifica de ce faci. Daca nu poți renunta la o slujba fara sa te simți anulat ca om, nu e slujire, e identitate construita din ea.",
        },
        {
          from: "guide",
          text: "4. Odihna. Dumnezeu a pus o zi de odihna in cele zece porunci. E singurul lucru din creatie care a fost numit sfant inainte de om.",
        },
      ],
    },
    {
      id: "h5_8",
      type: "step",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi: anuleaza sau amana un lucru. Unul. Și pune in locul lui zece minute in care stai jos, ca Maria.",
        },
      ],
    },
    {
      id: "h5_9",
      type: "prayer",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "«Doamne, m-am golit. Nu mai vreau sa lucrez pentru Tine fara Tine. Am nevoie de odihna, nu de o sarcina noua.»",
        },
      ],
    },
    {
      id: "h5_10",
      type: "journal",
      order: 10,
      journalPrompt: "La ce spui «nu» saptamana asta? Și ce ai pierde daca ai renunta la ea?",
    },
    {
      id: "h5_11",
      type: "memory_verse",
      order: 11,
      scripture: { text: "Jugul Meu este blând si povara Mea este usoara.", ref: "Matei 11:30" },
    },
  ],
}

export const harL6: Lesson = {
  id: "har_l6",
  courseId: "path_har",
  order: 6,
  title: "Cand forma inlocuieste relația",
  estMinutes: 11,
  anchorRefs: ["Matei 15:8", "Ioan 5:39-40", "Matei 23:25-26"],
  memoryVerseRef: "Ioan 5:40",
  steps: [
    {
      id: "h6_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum esti azi? Ai spus «nu» la ceva?" }],
    },
    {
      id: "h6_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Lectia asta nu e despre nicio biserica si nicio denominațiune. E despre un mecanism care funcționeaza la fel in oricare — si in oameni care nu merg niciunde.",
        },
        {
          from: "guide",
          text: "Mecanismul: forma rami, relația se goleste, si nimeni nu observa pentru ca din afara arata bine.",
        },
      ],
    },
    {
      id: "h6_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Poporul acesta se apropie de Mine cu gura, dar inima lui este departe de Mine.",
        ref: "Matei 15:8",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Iisus citeaza aici din Isaia, un text de sapte sute de ani mai vechi. Deci nu e o problema noua si nu e a unei epoci.",
        },
        {
          from: "guide",
          text:
            "Și nu se adreseaza unor oameni care lipseau de la slujbe. Se adreseaza celor mai prezenți si mai corecți din țara.",
        },
      ],
    },
    {
      id: "h6_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Cea mai directa propozitie despre asta e in Ioan 5:39-40, si e adresata unor oameni care cunosteau Scriptura pe de rost:",
        },
        {
          from: "guide",
          text:
            "«Voi cercetati Scripturile, pentru ca socotiți ca in ele aveti viața vecișnica... si nu vreți sa veniti la Mine, ca sa aveti viața!»",
        },
        {
          from: "guide",
          text:
            "Deci se poate cunoaste textul si sa Îl ratezi pe El. Se poate face totul corect si sa nu vii. Formele nu duc automat la Persoana.",
        },
      ],
    },
    {
      id: "h6_5",
      type: "how_god_helps",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Și ca sa nu rami abstract — patru intrebari de verificare, pentru tine, nu pentru altcineva:",
        },
        {
          from: "guide",
          text: "1. Vorbesc cu El in timpul saptamanii, sau doar in locurile si momentele stabilite?",
        },
        { from: "guide", text: "2. Cand fac lucrurile astea, mă gandesc la El sau la ce trebuie bifat?" },
        {
          from: "guide",
          text: "3. Daca nimeni nu ar vedea niciodata ce fac, ar rami la fel?",
        },
        {
          from: "guide",
          text: "4. S-a schimbat ceva in cum mă purt cu oamenii de acasa, in ultimul an?",
        },
      ],
    },
    {
      id: "h6_6",
      type: "quiz",
      order: 6,
      quiz: {
        question: "Cui a spus Iisus «nu vreți sa veniti la Mine»?",
        options: [
          { text: "Unor oameni care nu citeau deloc Scriptura", correct: false },
          { text: "Unora care cercetau Scripturile temeinic, dar se opreau la text", correct: true },
          { text: "Unor străini care nu știau nimic", correct: false },
          { text: "Ucenicilor Lui", correct: false },
        ],
        explanation:
          "Cei mai riguroși cunoscatori ai textului au fost cei care L-au ratat. De aia cunoasterea, prezența la slujbe si corectitudinea nu sunt garanții — sunt bune, dar nu inlocuiesc relația.",
      },
    },
    {
      id: "h6_7",
      type: "world_vs_truth",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text:
            "Iisus a folosit o imagine dura pentru asta: un pahar spalat pe dinafara si murdar pe dinauntru (Matei 23:25-26).",
        },
        {
          from: "guide",
          text:
            "Și soluția pe care a dat-o nu a fost «nu mai spalati pe dinafara». A fost «curațați mai intai partea din launtru, ca sa fie curata si cea de afara».",
        },
        {
          from: "guide",
          text: "Adica formele nu se arunca. Se umplu.",
        },
      ],
    },
    {
      id: "h6_8",
      type: "step",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi: ia UN lucru pe care il faci automat — rugaciunea de dinaintea mesei, o rugaciune știuta, mersul la biserica — si fa-l ca si cum ar fi prima data. Incet, cu cuvintele tale, uitandu-te la El.",
        },
        { from: "guide", text: "Nu il elimini. Îl umpli." },
      ],
    },
    {
      id: "h6_9",
      type: "prayer",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "«Doamne, nu vreau sa știu doar despre Tine. Vin la Tine. Umple ce fac de atatia ani.»",
        },
      ],
    },
    {
      id: "h6_10",
      type: "journal",
      order: 10,
      journalPrompt: "Raspunde la a treia intrebare, in scris: daca nimeni nu ar vedea, ce ai continua sa faci?",
    },
    {
      id: "h6_11",
      type: "memory_verse",
      order: 11,
      scripture: { text: "Nu vreți sa veniti la Mine, ca sa aveti viața!", ref: "Ioan 5:40" },
    },
  ],
}

export const harL7: Lesson = {
  id: "har_l7",
  courseId: "path_har",
  order: 7,
  title: "Cum trăiesc ca un fiu",
  estMinutes: 11,
  anchorRefs: ["Galateni 4:6-7", "Filipeni 3:8-9", "Romani 8:16"],
  memoryVerseRef: "Galateni 4:7",
  steps: [
    {
      id: "h7_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Ultima din drumul asta. Cum esti azi?" }],
    },
    {
      id: "h7_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Ai intrat aici cu «trebuie sa merit». Balanta din cap nu dispare in sapte lectii — s-a construit in ani si probabil nu doar in biserica.",
        },
        {
          from: "guide",
          text: "Dar de acum știi ca e o balanta, si ca nu e a Lui. Asta se poate dezvata.",
        },
      ],
    },
    {
      id: "h7_3",
      type: "scripture",
      order: 3,
      scripture: {
        text:
          "Astfel dar, nu mai esti rob, ci fiu; si dacă esti fiu, esti si moștenitor prin Dumnezeu.",
        ref: "Galateni 4:7",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "In dreptul roman, diferenta dintre rob si fiu nu era cat de bine muncea. Robul putea fi mai harnic. Diferenta era statutul, si el nu se caștiga prin muncă.",
        },
        {
          from: "guide",
          text:
            "Un rob putea fi vandut oricand, oricat de bun era. Un fiu rami fiu chiar cand era o rusine pentru familie.",
        },
      ],
    },
    {
      id: "h7_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Practic, cum se vede la un om care a inceput sa trăiasca din har. Patru semne:",
        },
        {
          from: "guide",
          text: "1. Cand cade, se intoarce in aceeași zi. Nu isi mai da o pauza de pedeapsa.",
        },
        { from: "guide", text: "2. Nu se mai compara. Nici in sus, nici in jos." },
        {
          from: "guide",
          text: "3. Poate primi — un compliment, un ajutor, o zi de odihna — fara sa se simta datornic.",
        },
        {
          from: "guide",
          text: "4. E mai blând cu ceilalti. Cine trăiește din merit e mereu dur cu cei care nu se descurca.",
        },
      ],
    },
    {
      id: "h7_5",
      type: "quiz",
      order: 5,
      quiz: {
        question: "Care e cel mai bun semn ca un om a inceput sa inteleaga harul?",
        options: [
          { text: "Face mai multe lucruri in biserica", correct: false },
          { text: "Devine mai blând cu cei care cad si se intoarce mai repede cand cade el", correct: true },
          { text: "Nu mai greșește", correct: false },
          { text: "Nu il mai deranjeaza nimic", correct: false },
        ],
        explanation:
          "Fiul cel mare din pilda era ireproșabil si nu suporta iertarea data fratelui lui. Duritatea fata de alții e semnul cel mai sigur ca un om inca isi plăteste singur intrarea.",
      },
    },
    {
      id: "h7_6",
      type: "scripture",
      order: 6,
      scripture: {
        text:
          "Ba mai mult, toate le socotesc ca o pierdere, fata de prețul nespus de mare al cunoasterii lui Hristos Iisus, Domnul meu... ca sa am nu o neprihanire a mea, ci pe aceea care se capata prin credința.",
        ref: "Filipeni 3:8-9",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Omul care scrie asta avea cea mai buna educație religioasa a vremii si o viața ireproșabila. Le numeste «pierdere» — nu pentru ca erau rele, ci pentru ca le folosise ca plata.",
        },
        {
          from: "guide",
          text: "«Nu o neprihanire a mea». Aia e propozitia care omoara balanta.",
        },
      ],
    },
    {
      id: "h7_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "Ce rămâne cu tine din drumul asta, in patru rânduri:",
        },
        { from: "guide", text: "Harul nu se poate plati; cine vine cu mana plina nu are unde sa primeasca." },
        { from: "guide", text: "Erai fiu si te-ai purtat ca un angajat. Tot ce e al Lui era deja al tau." },
        { from: "guide", text: "Frica de pedeapsa nu vine de la El si nu produce schimbare." },
        { from: "guide", text: "Ascultarea rami — dar din dragoste, si de aia tine." },
      ],
    },
    {
      id: "h7_8",
      type: "step",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi, doua lucruri. Primul: primeste ceva fara sa dai nimic in schimb. O zi de odihna, un ajutor de la cineva, o ora pentru tine.",
        },
        {
          from: "guide",
          text:
            "Al doilea: gasește un om pe care il judecai in gand — dintre cei care nu se descurca. Și fa-i azi un bine, in liniste.",
        },
      ],
    },
    {
      id: "h7_9",
      type: "prayer",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "«Tata, nu mai sunt robul Tau. Nu-Ti mai plătesc intrarea. Invața-ma sa trăiesc ca un fiu.»",
        },
      ],
    },
    {
      id: "h7_10",
      type: "journal",
      order: 10,
      journalPrompt:
        "Reciteste ce ai scris in prima lectie — ce credeai că ți-ar strica relația cu El. Mai crezi la fel?",
      bubbles: [
        {
          from: "guide",
          text:
            "Drumul asta s-a terminat. Relația, nu. Ce ai scris ramane al tau, oricare drum alegi mai departe.",
        },
      ],
    },
    {
      id: "h7_11",
      type: "memory_verse",
      order: 11,
      scripture: { text: "Nu mai esti rob, ci fiu.", ref: "Galateni 4:7" },
    },
  ],
}

export const HAR_LESSONS: Lesson[] = [harL1, harL2, harL3, harL4, harL5, harL6, harL7]
