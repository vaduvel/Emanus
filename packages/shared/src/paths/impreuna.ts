import type { Lesson } from "../domain.js"

/*
 * CAMERA 7 — "Sunt singur in asta" / minciuna: "Nimeni nu ințelege si nimanui nu-i pasa."
 * Drumul: path_impreuna. Toate cele sapte lectii sunt in fisierul asta.
 *
 * Usi care duc aici: singuratate, familie_respinge, respins_biserica, nou_venit.
 *
 * ORDINEA (docs/21 §2): incepem cu faptul ca El a fost singur — nu cu "du-te la
 * biserica". Omului singur nu i se da o sarcina sociala in prima zi. Pasii
 * practici de gasire a oamenilor vin in lectiile 6 si 7.
 *
 * SIGURANTA (docs/22 §1-2, NENEGOCIABIL):
 *  - `im1_1` are avertisment si numere reale: 116 123, 112.
 *  - Lectia 4 (biserica ranita) NU apara rana si nu trimite omul inapoi intr-un
 *    loc in care e in pericol. Daca a fost abuz, se numeste abuz.
 *  - Nu promitem că singuratatea trece dacă se roaga mai mult.
 *
 * VOCEA (docs/22 §10): Emanus. Fara nume de om.
 */

export const impreunaL1: Lesson = {
  id: "impreuna_l1",
  courseId: "path_impreuna",
  order: 1,
  title: "El stie cum e",
  estMinutes: 11,
  anchorRefs: ["Isaia 53:3", "Matei 26:56", "Psalmul 27:10"],
  memoryVerseRef: "Psalmul 27:10",
  steps: [
    {
      id: "im1_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Bine ca ai apasat." },
        {
          from: "guide",
          text:
            "Un lucru inainte de orice: dacă singuratatea a ajuns in punctul in care te gandesti sa îți faci rau, nu rami singur cu asta acum. Suna 116 123, gratuit, sau 112 dacă e urgent.",
        },
        {
          from: "guide",
          text: "Emanus nu inlocuieste medicul, psihologul, poliția sau 112. Ce scrii aici ramane in telefonul tau — nu citeste nimeni. Cum esti azi?",
        },
      ],
    },
    {
      id: "im1_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Singuratatea are o parte pe care nimeni nu o spune: te face sa crezi că e ceva in tine. Ca alții au ceva ce tu nu ai.",
        },
        {
          from: "guide",
          text: "Azi nu îți spun sa te implici in ceva. Azi ne uitam la Cineva care a trecut prin exact asta.",
        },
      ],
    },
    {
      id: "im1_3",
      type: "choice",
      order: 3,
      choice: {
        prompt: "Care seamana mai mult cu situația ta?",
        options: [
          { id: "im1c_a", label: "Nu am pe nimeni apropiat" },
          { id: "im1c_b", label: "Am oameni, dar nu mă ințelege niciunul" },
          { id: "im1c_c", label: "Am fost respins acolo unde speram sa fiu primit" },
        ],
      },
    },
    {
      id: "im1_4",
      type: "scripture",
      order: 4,
      scripture: {
        text:
          "Dispretuit si parasit de oameni, om al durerii si obisnuit cu suferința, era așa de dispretuit că iti intorceai fata de la El.",
        ref: "Isaia 53:3",
      },
      bubbles: [
        {
          from: "guide",
          text: "Scris cu șapte sute de ani inainte, despre Cel care avea sa vina.",
        },
        {
          from: "guide",
          text:
            "«Parasit de oameni», in ebraica, e mai aproape de «evitat». Nu doar singur — ocolit de ceilalti.",
        },
      ],
    },
    {
      id: "im1_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Si nu a fost o singuratate generala. A fost pe bucati, ca a ta:",
        },
        {
          from: "guide",
          text: "Familia Lui a crezut ca a innebunit si a venit sa Îl ia acasa cu forta (Marcu 3:21).",
        },
        {
          from: "guide",
          text: "Oamenii din satul in care crescuse s-au suparat pe El si au vrut sa Îl arunce de pe o stanca (Luca 4:29).",
        },
        {
          from: "guide",
          text:
            "In noaptea in care avea cea mai mare nevoie, cei trei prieteni apropiați au adormit, apoi «toți ucenicii L-au parasit si au fugit» (Matei 26:56).",
        },
        {
          from: "guide",
          text: "Unul L-a vandut. Altul a spus de trei ori că nu Îl cunoaste.",
        },
      ],
    },
    {
      id: "im1_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text:
            "De ce conteaza asta practic: cand Îi spui «nu mă ințelege nimeni», nu vorbesti cu Cineva care a auzit despre singuratate.",
        },
        {
          from: "guide",
          text:
            "«Caci n-avem un Mare Preot care sa nu poata sa aiba mila de slabiciunile noastre, ci Unul care in toate lucrurile a fost ispitit ca si noi» (Evrei 4:15).",
        },
        {
          from: "guide",
          text: "Nu îți da sfaturi de la distanța. A stat in ea.",
        },
      ],
    },
    {
      id: "im1_7",
      type: "quiz",
      order: 7,
      quiz: {
        question: "Ce arata faptul ca Iisus a fost parasit de toti?",
        options: [
          { text: "Ca singuratatea e un semn ca faci ceva greșit", correct: false },
          { text: "Ca singuratatea nu e dovada ca e ceva in neregula cu tine — si ca El o cunoaste din interior", correct: true },
          { text: "Ca oamenii nu sunt necesari", correct: false },
          { text: "Ca trebuie sa te obisnuiesti sa fii singur", correct: false },
        ],
        explanation:
          "Nu era nimic in neregula cu El, si totusi a rams singur. Deci singuratatea nu masoara valoarea unui om. Si nu inseamna ca oamenii nu conteaza — despre asta e restul drumului.",
      },
    },
    {
      id: "im1_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Chiar dacă tatal meu si mama mea m-ar parasi, Domnul mă va primi.",
        ref: "Psalmul 27:10",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Versetul nu spune că nu se intampla. Spune «chiar dacă» — admite posibilitatea celei mai grele parasiri.",
        },
        {
          from: "guide",
          text: "Și pune altceva dupa. Nu o consolare — o primire.",
        },
      ],
    },
    {
      id: "im1_9",
      type: "step",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi: spune-I cu voce tare cum e, fara sa infrumusetezi. «Mi-e singur. Nu am cu cine sa vorbesc.»",
        },
        {
          from: "guide",
          text: "Nu e o plangere nepotrivita. Jumatate din Psalmi sunt exact asta.",
        },
      ],
    },
    {
      id: "im1_10",
      type: "prayer",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "«Doamne, sunt singur si doare. Tu știi cum e. Nu pleca si Tu.»",
        },
      ],
    },
    {
      id: "im1_11",
      type: "journal",
      order: 11,
      journalPrompt: "De cand e așa? Și ce s-a intamplat inainte sa devina așa?",
    },
    {
      id: "im1_12",
      type: "memory_verse",
      order: 12,
      scripture: { text: "Chiar dacă tatal meu si mama mea m-ar parasi, Domnul mă va primi.", ref: "Psalmul 27:10" },
      bubbles: [{ from: "guide", text: "Atat pentru azi." }],
    },
  ],
}

export const impreunaL2: Lesson = {
  id: "impreuna_l2",
  courseId: "path_impreuna",
  order: 2,
  title: "Nu esti orfan",
  estMinutes: 11,
  anchorRefs: ["Ioan 14:18", "Psalmul 68:6", "Efeseni 1:5"],
  memoryVerseRef: "Ioan 14:18",
  steps: [
    {
      id: "im2_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum esti azi?" }],
    },
    {
      id: "im2_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Un om singur de mult timp incepe sa gandeasca intr-un anume fel: nu cere nimic, nu aspepta nimic, se descurca singur si nu deranjeaza pe nimeni.",
        },
        {
          from: "guide",
          text: "E gandirea unui orfan. Si nu se schimba cu argumente — se schimba cu un statut.",
        },
      ],
    },
    {
      id: "im2_3",
      type: "scripture",
      order: 3,
      scripture: { text: "Nu va voi lasa orfani, Mă voi intoarce la voi.", ref: "Ioan 14:18" },
      bubbles: [
        {
          from: "guide",
          text:
            "Cuvantul din greaca e chiar «orphanos». Iisus l-a spus cu cateva ore inainte sa fie arestat, unor oameni care erau pe punctul sa rami fara El.",
        },
        {
          from: "guide",
          text:
            "Un orfan, in vremea aceea, nu era doar un copil trist. Era un om fara aparare juridica, fara moștenire si fara nume in cetate.",
        },
        {
          from: "guide",
          text: "Exact ce simte cineva singur azi: nimeni care sa raspunda pentru mine.",
        },
      ],
    },
    {
      id: "im2_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Iar Biblia foloseste un termen juridic pentru ce s-a intamplat cu tine: adoptare.",
        },
        {
          from: "guide",
          text:
            "«Ne-a randăit mai inainte sa fim adoptați» (Efeseni 1:5). In dreptul roman, un fiu adoptat pierdea toate datoriile vechi si primea numele si moștenirea noii familii.",
        },
        {
          from: "guide",
          text:
            "Și, spre deosebire de un fiu natural, un fiu adoptat nu putea fi dezmoștenit. A fost ales pe hartie, nu s-a nimerit.",
        },
      ],
    },
    {
      id: "im2_5",
      type: "scripture",
      order: 5,
      scripture: {
        text: "Dumnezeu da o familie celor parasiți, El izbaveste pe prizonieri si-i face fericiți.",
        ref: "Psalmul 68:6",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Uita-te ce da El celui singur. Nu o mangaiere. O FAMILIE. Oameni.",
        },
        {
          from: "guide",
          text:
            "Asta e important pentru drumul asta: soluția lui Dumnezeu pentru singuratate include oameni. Nu ne rugam ca sa nu mai avem nevoie de nimeni.",
        },
      ],
    },
    {
      id: "im2_6",
      type: "quiz",
      order: 6,
      quiz: {
        question: "Ce inseamna ca ai fost adoptat de Dumnezeu?",
        options: [
          { text: "Ca esti tolerat pana la proba contrara", correct: false },
          { text: "Ca ai statut de fiu — nume, moștenire si cineva care raspunde pentru tine", correct: true },
          { text: "Ca nu mai ai nevoie de oameni", correct: false },
          { text: "Ca trebuie sa te porți ca sa rami in familie", correct: false },
        ],
        explanation:
          "Adoptarea era un act juridic definitiv, nu o proba. Iar Psalmul 68 arata ca Dumnezeu il asaza pe cel singur intr-o familie — statutul vine cu oameni, nu in locul lor.",
      },
    },
    {
      id: "im2_7",
      type: "world_vs_truth",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "Gandirea de orfan si gandirea de fiu, in aceeași situație:",
        },
        { from: "guide", text: "Orfanul: dacă nu cer, nu mă refuza nimeni. Fiul: pot cere." },
        {
          from: "guide",
          text: "Orfanul: trebuie sa mă descurc singur. Fiul: pot spune că nu mă descurc.",
        },
        {
          from: "guide",
          text: "Orfanul: dacă mă apropii, se vede ce sunt si pleaca. Fiul: sunt deja cunoscut si totusi ținut.",
        },
      ],
    },
    {
      id: "im2_8",
      type: "step",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi: cere un lucru mic unui om. Ceva concret — o informație, o mana de ajutor, cinci minute de vorba.",
        },
        {
          from: "guide",
          text:
            "Nu ca sa rezolvi singuratatea intr-o zi. Ca sa faci o data ce nu face un orfan.",
        },
      ],
    },
    {
      id: "im2_9",
      type: "prayer",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "«Tata, nu sunt orfan. Nu mă știu purta ca un fiu — invața-ma. Și da-mi oameni.»",
        },
      ],
    },
    {
      id: "im2_10",
      type: "journal",
      order: 10,
      journalPrompt: "Unde te porți ca un orfan, desi nu esti? Scrie o situație din saptamana asta.",
    },
    {
      id: "im2_11",
      type: "memory_verse",
      order: 11,
      scripture: { text: "Nu va voi lasa orfani.", ref: "Ioan 14:18" },
    },
  ],
}

export const impreunaL3: Lesson = {
  id: "impreuna_l3",
  courseId: "path_impreuna",
  order: 3,
  title: "Cand familia nu te ințelege",
  estMinutes: 12,
  anchorRefs: ["Marcu 3:21", "Matei 10:36", "Marcu 10:29-30"],
  memoryVerseRef: "Marcu 10:29-30",
  steps: [
    {
      id: "im3_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum esti azi? Ai cerut ceva cuiva?" }],
    },
    {
      id: "im3_2",
      type: "name_struggle",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Una din cele mai grele forme de singuratate e sa fii singur in propria casa. Sa râdă de tine, sa te ironizeze, sa spuna că ai intrat in ceva.",
        },
        {
          from: "guide",
          text: "Sau, mai subtil: nimic nu se spune, dar simti că nu ai cu cine vorbi despre ce e cel mai important pentru tine.",
        },
      ],
    },
    {
      id: "im3_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Rudele lui Iisus, cand au auzit cele ce se petreceau, au venit sa pună mana pe El, caci ziceau: «Si-a ieșit din minți.»",
        ref: "Marcu 3:21",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Familia Lui. Care Îl crescuse. Au venit sa Îl ia acasa cu forta, convinși că innebunise.",
        },
        {
          from: "guide",
          text:
            "Și Ioan 7:5 spune direct: «nici fratii Lui nu credeau in El». Au crezut abia dupa inviere. Ani intregi in aceeași casa, cu neincredere.",
        },
      ],
    },
    {
      id: "im3_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text:
            "Iisus a spus si de ce se intampla: «omul va avea de dușmani chiar pe cei din casa lui» (Matei 10:36).",
        },
        {
          from: "guide",
          text:
            "Nu era o dorința, era o avertizare. Cand cineva din casa se schimba, ceilalti se simt judecați chiar dacă nu spui nimic. Schimbarea ta le arata ceva despre ei, si asta doare.",
        },
        {
          from: "guide",
          text: "Deci reactia lor nu inseamna neaparat ca faci greșit. Uneori inseamna exact opusul.",
        },
      ],
    },
    {
      id: "im3_5",
      type: "how_god_helps",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Patru lucruri practice, si primul e cel mai greu:",
        },
        {
          from: "guide",
          text:
            "1. Nu predica in casa. «Fara vorbe, prin purtarea voastra» (1 Petru 3:1). Cel mai puternic argument in familie e sa fii mai blând, mai de incredere si mai ușor de trait cu tine.",
        },
        {
          from: "guide",
          text:
            "2. Nu te aparea. «Fii pregatit sa dai socoteala» — dar textul adauga: «cu blândețe si teama» (1 Petru 3:15). Cand îți cer socoteala, raspunde scurt si fara sa ridici vocea.",
        },
        {
          from: "guide",
          text:
            "3. Nu-i pune sa aleaga intre tine si ei. Nu e o competiție si nu ai nevoie sa ai dreptate azi.",
        },
        {
          from: "guide",
          text:
            "4. Roaga-te pentru ei cu nume, in fiecare zi. Fratii lui Iisus au crezut. A durat mai mult decat viața Lui pamanteasca, dar au crezut.",
        },
      ],
    },
    {
      id: "im3_6",
      type: "scripture",
      order: 6,
      scripture: {
        text:
          "Nu este nimeni care sa fi lasat casa, sau frati, sau surori, sau tata, sau mama... pentru Mine si pentru Evanghelie, si sa nu primeasca de o suta de ori mai mult acum, in vremea de acum.",
        ref: "Marcu 10:29-30",
      },
      bubbles: [
        {
          from: "guide",
          text: "«Acum, in vremea de acum». Nu doar in cer. Aici.",
        },
        {
          from: "guide",
          text:
            "Iar textul continua cu «impreuna cu prigoniri». Nu ți se promite ca se termina opoziția — ți se promite ca nu rami fara familie.",
        },
      ],
    },
    {
      id: "im3_7",
      type: "quiz",
      order: 7,
      quiz: {
        question: "Care e cel mai bun raspuns cand familia te ironizeaza pentru credința ta?",
        options: [
          { text: "Sa le explici pana ințeleg", correct: false },
          { text: "Purtarea, nu vorbele — si un raspuns scurt, blând, cand ti se cere", correct: true },
          { text: "Sa te retragi complet din familie", correct: false },
          { text: "Sa le arăți ca greșesc, cu versete", correct: false },
        ],
        explanation:
          "1 Petru 3 spune «fara vorbe, prin purtare», si cere blândețe cand dai socoteala. Iisus insuși nu i-a convins pe fratii Lui cu argumente — au crezut mai tarziu, dupa ce au vazut.",
      },
    },
    {
      id: "im3_8",
      type: "step",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi: fa un lucru bun, concret, pentru omul din casa care te ințelege cel mai puțin. Fara sa spui nimic despre Dumnezeu.",
        },
        { from: "guide", text: "Și roaga-te pentru el pe nume, o data." },
      ],
    },
    {
      id: "im3_9",
      type: "how_god_helps",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text:
            "Și o limita, ca sa nu se ințeleaga greșit: răbdarea nu inseamna sa rămâi in pericol.",
        },
        {
          from: "guide",
          text:
            "Daca cineva din casa te loveste, te amenința sau te umileste sistematic, asta nu se rezolva cu blandete si nu e o cruce pe care trebuie sa o duci. Este 112, si 0800 500 333 pentru violența in familie.",
        },
      ],
    },
    {
      id: "im3_10",
      type: "prayer",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "«Doamne, nu-i pot convinge. Fa-mă sa fiu mai bun de trait cu mine. Și lucreaza Tu in...» — si spune numele.",
        },
      ],
    },
    {
      id: "im3_11",
      type: "memory_verse",
      order: 11,
      scripture: { text: "Va primi de o suta de ori mai mult acum, in vremea de acum.", ref: "Marcu 10:30" },
    },
  ],
}

export const impreunaL4: Lesson = {
  id: "impreuna_l4",
  courseId: "path_impreuna",
  order: 4,
  title: "Cand ai fost ranit acolo",
  estMinutes: 12,
  anchorRefs: ["Ioan 9:34-35", "Psalmul 55:12-14", "Romani 12:18"],
  memoryVerseRef: "Ioan 9:35",
  steps: [
    {
      id: "im4_1",
      type: "check_in",
      order: 1,
      bubbles: [
        {
          from: "guide",
          text:
            "Lectia asta atinge ceva care poate fi dureros: ce s-a intamplat cu tine intr-o biserica sau intr-un grup de credința.",
        },
        {
          from: "guide",
          text:
            "Nu îți cer sa te intorci undeva. Nu îți cer sa ințelegi pe nimeni. Daca nu vrei azi, poți reveni maine — nu se pierde nimic. Cum esti?",
        },
      ],
    },
    {
      id: "im4_2",
      type: "name_struggle",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Primul lucru, si nu il negociez: dacă ai fost ranit de oameni ai bisericii, aia nu a fost de la Dumnezeu.",
        },
        {
          from: "guide",
          text:
            "Daca ai fost umilit in public, controlat, mințit, folosit pentru bani sau abuzat — sunt fapte reale ale unor oameni reali, si sunt greșite. Nu erai «prea sensibil».",
        },
        {
          from: "guide",
          text:
            "Iar dacă a fost abuz sexual sau fizic, e infracțiune, indiferent cine a facut-o si ce funcție avea: 112, iar pentru copii 119.",
        },
      ],
    },
    {
      id: "im4_3",
      type: "scripture",
      order: 3,
      scripture: {
        text:
          "Nu mă batjocoreste un vrajmas — as suferi; ci tu, om socotit deopotriva cu mine, prietenul si increedeutul meu, cu care mergeam impreuna la Casa lui Dumnezeu!",
        ref: "Psalmul 55:12-14",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Biblia are un psalm intreg despre exact tipul asta de rana: tradarea de catre cineva cu care te rugai.",
        },
        {
          from: "guide",
          text:
            "Și spune ce știi deja — durerea e mai mare decat de la un dușman. Pentru că in locul acela nu îți țineai garda sus.",
        },
      ],
    },
    {
      id: "im4_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text:
            "Exista un om in Evanghelii care a fost dat afara din sinagoga: orbul vindecat din Ioan 9. «L-au dat afara», scrie acolo.",
        },
        {
          from: "guide",
          text:
            "Vindecat de Iisus, si excluS din comunitate pentru că nu a vrut sa retracteze ce trAise.",
        },
        {
          from: "guide",
          text:
            "Și versetul urmator: «Iisus a auzit ca fusese dat afara si, cand l-a intalnit, i-a zis...» (Ioan 9:35). L-a cautat El. Afara.",
        },
      ],
    },
    {
      id: "im4_5",
      type: "how_god_helps",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Ce e important de separat, si multi nu o fac niciodata:",
        },
        {
          from: "guide",
          text: "Oamenii care te-au ranit nu sunt Dumnezeu, chiar dacă vorbeau in numele Lui.",
        },
        {
          from: "guide",
          text:
            "Iisus a avut cele mai dure cuvinte din Evanghelii nu pentru pacatosi, ci pentru liderii religioși care apăsau oamenii. Nu e de partea lor.",
        },
        {
          from: "guide",
          text: "Și, foarte concret: nu te-a dat afara El. A ieșit dupa tine.",
        },
      ],
    },
    {
      id: "im4_6",
      type: "quiz",
      order: 6,
      quiz: {
        question: "Ce a facut Iisus cu omul dat afara din sinagoga?",
        options: [
          { text: "I-a spus sa se intoarca si sa se supuna", correct: false },
          { text: "L-a caUtat El, afara, si S-a descoperit lui", correct: true },
          { text: "L-a lasat sa se descurce singur", correct: false },
          { text: "I-a explicat ca liderii aveau dreptate", correct: false },
        ],
        explanation:
          "Ioan 9:35 spune ca Iisus a auzit ca fusese dat afara si l-a caUtat. Dumnezeu nu S-a asociat cu decizia comunitații. Nu esti in afara Lui pentru ca cineva te-a scos in afara unui grup.",
      },
    },
    {
      id: "im4_7",
      type: "step",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi: scrie ce s-a intamplat. Faptele, nu explicațiile pe care le-ai auzit. Și spune-I: «asta mi s-a facut, si nu a fost de la Tine».",
        },
        {
          from: "guide",
          text:
            "Nu îți cer sa ierți azi si cu siguranța nu îți cer sa te intorci acolo. Iertarea nu e impăcare si nu inseamna intoarcerea intr-un loc nesigur.",
        },
      ],
    },
    {
      id: "im4_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Și o intrebare pe care merita sa o pui, cand vei fi in stare: vrei sa cauti alți oameni, sau ai decis că nu mai exista oameni?",
        },
        {
          from: "guide",
          text:
            "Nu trebuie sa raspunzi acum. Dar bisericile nu sunt identice, si un grup mic de trei-patru oameni nu e acelasi lucru cu instituția care te-a ranit.",
        },
        {
          from: "guide",
          text: "Despre asta e restul drumului. Fara sa te grabeasca nimeni.",
        },
      ],
    },
    {
      id: "im4_9",
      type: "prayer",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "«Doamne, m-au ranit in numele Tau. Nu vreau sa Te confund cu ei. Vino Tu dupa mine, afara.»",
        },
      ],
    },
    {
      id: "im4_10",
      type: "journal",
      order: 10,
      journalPrompt: "Ce s-a intamplat, in cuvintele tale. Nimeni nu citeste asta.",
    },
    {
      id: "im4_11",
      type: "memory_verse",
      order: 11,
      scripture: { text: "Iisus a auzit ca fusese dat afara si, cand l-a intalnit, i-a zis...", ref: "Ioan 9:35" },
    },
  ],
}

export const impreunaL5: Lesson = {
  id: "impreuna_l5",
  courseId: "path_impreuna",
  order: 5,
  title: "Ce e biserica, de fapt",
  estMinutes: 11,
  anchorRefs: ["Matei 18:20", "Fapte 2:42-46", "1 Corinteni 12:21-26"],
  memoryVerseRef: "Matei 18:20",
  steps: [
    {
      id: "im5_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum esti azi?" }],
    },
    {
      id: "im5_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Cand auzi «biserica», îți vine in minte o clAdire, un program si niste scaune. Asa o folosim toti.",
        },
        {
          from: "guide",
          text:
            "Dar cuvantul din greaca, «ekklesia», nu insemna clAdire. Insemna adunarea de oameni chemați la un loc. Nu exista in original ideea de imobil.",
        },
      ],
    },
    {
      id: "im5_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Caci acolo unde sunt doi sau trei adunati in numele Meu, sunt si Eu in mijlocul lor.",
        ref: "Matei 18:20",
      },
      bubbles: [
        {
          from: "guide",
          text: "Doi sau trei. Nu doua sute. Nu un lider, nu o sala, nu un program.",
        },
        {
          from: "guide",
          text:
            "Ceea ce inseamna ca poți incepe de la un singur om cu care vorbesti despre El. Aia e deja biserica, in sensul din text.",
        },
      ],
    },
    {
      id: "im5_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text:
            "Și uita-te la primul grup de creștini, in Fapte 2:42-46. Ce faceau, in patru lucruri: invațatura, viata impreuna, mesele, rugaciunea.",
        },
        {
          from: "guide",
          text:
            "«Frangeau pAinea acasa». Cea mai mare parte din ce vezi acolo se intampla in case, la masa. Nu intr-o instituție.",
        },
        {
          from: "guide",
          text:
            "Cuvantul folosit pentru viata lor impreuna e «koinonia»: nu «am fost la aceeași slujba», ci «avem lucrurile in comun». Se știau intre ei.",
        },
      ],
    },
    {
      id: "im5_5",
      type: "scripture",
      order: 5,
      scripture: {
        text:
          "Ochiul nu poate zice manii: «N-am trebuința de tine»... Ba mai mult, madularele care par mai slabe sunt de neaparata trebuința.",
        ref: "1 Corinteni 12:21-22",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Imaginea din text e un corp. Un madular rupt de corp nu devine independent — se usuca. Nu e o critica, e o descriere.",
        },
        {
          from: "guide",
          text:
            "Și observa cine e numit «de neaparata trebuința»: cei care par mai slabi. Nu cei care vorbesc pe scena. Deci ai un loc chiar acum, exact cum esti.",
        },
      ],
    },
    {
      id: "im5_6",
      type: "quiz",
      order: 6,
      quiz: {
        question: "Care e minimul, dupa Matei 18:20?",
        options: [
          { text: "O clAdire si un lider", correct: false },
          { text: "Doi sau trei oameni adunati in numele Lui", correct: true },
          { text: "O adunare de cel puțin cateva zeci", correct: false },
          { text: "Un program saptamanal fix", correct: false },
        ],
        explanation:
          "De aia, dacă nu poți intra intr-o adunare mare — din rana, din anxietate sau pentru că nu exista una langa tine — nu esti in afara. Incepi de la doi.",
      },
    },
    {
      id: "im5_7",
      type: "world_vs_truth",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "«Cred in Dumnezeu, dar in felul meu, singur» — e cea mai comuna propozitie din Romania.",
        },
        {
          from: "guide",
          text:
            "Și e ințeleaga bila dupa ce ai fost ranit. Dar Noul Testament nu are un singur exemplu de creștin care trăiește izolat, din alegere.",
        },
        {
          from: "guide",
          text:
            "Nu pentru ca ar fi o regula bisericeasca. Pentru ca sunt lucruri care nu se pot intampla singur: nu îți poți spune tu «te-am vazut, si totusi te țin».",
        },
      ],
    },
    {
      id: "im5_8",
      type: "step",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi: scrie numele a doi oameni. Nu prieteni apropiați — doi oameni cu care ai putea vorbi despre lucrurile astea, fara sa te simți in pericol.",
        },
        {
          from: "guide",
          text: "Daca nu îți vine niciun nume, scrie asta. E un punct de plecare cinstit, si maine facem ceva cu el.",
        },
      ],
    },
    {
      id: "im5_9",
      type: "prayer",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "«Doamne, da-mi doi oameni. Nu o mulțime. Doi, cu care sa pot fi eu insumi.»",
        },
      ],
    },
    {
      id: "im5_10",
      type: "journal",
      order: 10,
      journalPrompt: "Cei doi oameni. Sau, dacă nu ai pe nimeni, unde ai putea intalni oameni ca ei.",
    },
    {
      id: "im5_11",
      type: "memory_verse",
      order: 11,
      scripture: { text: "Acolo unde sunt doi sau trei adunati in numele Meu, sunt si Eu in mijlocul lor.", ref: "Matei 18:20" },
    },
  ],
}

export const impreunaL6: Lesson = {
  id: "impreuna_l6",
  courseId: "path_impreuna",
  order: 6,
  title: "Cum se gasesc oamenii",
  estMinutes: 11,
  anchorRefs: ["Eclesiastul 4:9-12", "Fapte 9:26-27", "Proverbe 18:24"],
  memoryVerseRef: "Eclesiastul 4:12",
  steps: [
    {
      id: "im6_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum esti azi? Ai scris cele doua nume?" }],
    },
    {
      id: "im6_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "«Gasește-ți oameni» e cel mai inutil sfat pe care il primeste cineva singur. Daca ar fi știut cum, ar fi facut-o.",
        },
        { from: "guide", text: "Azi e o lectie practica. Patru pași, in ordine, de la cel mai mic." },
      ],
    },
    {
      id: "im6_3",
      type: "scripture",
      order: 3,
      scripture: {
        text:
          "Mai bine doi decat unul... Caci dacă se intampla sa cada, se ridica unul pe altul; dar vai de cine este singur si cade, fara sa aiba pe altul care sa-l ridice!",
        ref: "Eclesiastul 4:9-10",
      },
      bubbles: [
        {
          from: "guide",
          text: "Textul continua cu «funia impletita in trei nu se rupe ușor». Trei, nu treizeci.",
        },
        {
          from: "guide",
          text: "Deci scopul nu e sa devii sociabil. Scopul e sa nu fii singur cand cazi.",
        },
      ],
    },
    {
      id: "im6_4",
      type: "how_god_helps",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Pasul 1, cel mai mic: UN om, nu un grup. Trimite un mesaj cuiva de pe lista. Nu «hai sa vorbim despre credința» — doar «ce mai faci?».",
        },
        {
          from: "guide",
          text:
            "Pasul 2: mergi in acelasi loc de trei ori. Orice loc — un grup mic, o slujba, un voluntariat. Prima data nu cunosti pe nimeni, a treia data te salută cineva. Sub trei nu se intampla nimic si oamenii renunta la prima.",
        },
        {
          from: "guide",
          text:
            "Pasul 3: fa ceva, nu doar asista. Cel mai rapid mod de a nu fi străin intr-un grup e sa ajuti la ceva concret. Cine careă scaune nu mai e vizitator.",
        },
        {
          from: "guide",
          text:
            "Pasul 4: cere ajutor pentru un lucru mic. Prietenia nu se naste din a fi util, ci din a lasa pe cineva sa îți fie util.",
        },
      ],
    },
    {
      id: "im6_5",
      type: "scripture",
      order: 5,
      scripture: {
        text:
          "Cand a venit in Ierusalim, Saul a caUtat sa se lipeasca de ucenici; dar toți se temeau de el, caci nu puteau sa creada ca este ucenic. Atunci Barnaba l-a luat cu el.",
        ref: "Fapte 9:26-27",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Omul care avea sa scrie jumatate din Noul Testament a fost, la inceput, un om de care se ferea toata biserica.",
        },
        {
          from: "guide",
          text: "«A caUtat sa se lipeasca» — a incercat, si a fost respins. Nu din prima, deci.",
        },
        {
          from: "guide",
          text:
            "Și tot ce a trebuit a fost UN om care sa Îl ia cu el. Un Barnaba. Nu o comunitate intreaga care sa se hotarasca.",
        },
      ],
    },
    {
      id: "im6_6",
      type: "quiz",
      order: 6,
      quiz: {
        question: "Ce a schimbat situația lui Saul in Ierusalim?",
        options: [
          { text: "S-a impus prin argumente", correct: false },
          { text: "Un singur om, Barnaba, l-a luat cu el si a garantat pentru el", correct: true },
          { text: "A așteptat sa fie invitat oficial", correct: false },
          { text: "A plecat si a stat singur", correct: false },
        ],
        explanation:
          "Un om a fost destul. De aia obiectivul nu e «sa mă accepte grupul», ci «sa gasesc un Barnaba» — sau, mai devreme sau mai tarziu, sa devii tu Barnaba pentru cineva nou.",
      },
    },
    {
      id: "im6_7",
      type: "truth_simple",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "Și doua lucruri cinstite, ca sa nu te lovesti de ele si sa crezi ca ai greșit:",
        },
        {
          from: "guide",
          text:
            "1. Dureaza. O prietenie reala se face in luni, nu in doua intalniri. Daca dupa a treia oara inca e ciudat, e normal.",
        },
        {
          from: "guide",
          text:
            "2. Vei fi dezamagit. Oamenii din biserica sunt oameni. Nu inseamna că ai ales greșit — inseamna ca nu ai gasit inca oamenii tai.",
        },
      ],
    },
    {
      id: "im6_8",
      type: "step",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi, un singur lucru: trimite mesajul. Unul din cele doua nume de ieri. Trei cuvinte sunt de ajuns.",
        },
        {
          from: "guide",
          text: "Daca nu ai niciun nume, caută azi un grup mic aproape de tine si scrie unde si cand se intalneste.",
        },
      ],
    },
    {
      id: "im6_9",
      type: "prayer",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "«Doamne, trimite-mi un Barnaba. Și da-mi curaj sa nu mă ascund cand apare.»",
        },
      ],
    },
    {
      id: "im6_10",
      type: "memory_verse",
      order: 10,
      scripture: { text: "Funia impletita in trei nu se rupe ușor.", ref: "Eclesiastul 4:12" },
    },
  ],
}

export const impreunaL7: Lesson = {
  id: "impreuna_l7",
  courseId: "path_impreuna",
  order: 7,
  title: "De la singur, la al cuiva",
  estMinutes: 11,
  anchorRefs: ["Iacov 5:16", "Galateni 6:2", "Evrei 10:24-25"],
  memoryVerseRef: "Galateni 6:2",
  steps: [
    {
      id: "im7_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Ultima din drumul asta. Ai trimis mesajul? Cum esti azi?" }],
    },
    {
      id: "im7_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Ai intrat aici cu «sunt singur». Nu îți promit că in șapte lectii ai o familie — ar fi o minciuna, si oamenii nu se fabrica.",
        },
        {
          from: "guide",
          text: "Dar știi acum ce cauti, si e mai puțin decat credeai: nu popularitate. Doi oameni si o ușa deschisa.",
        },
      ],
    },
    {
      id: "im7_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Marturisiti-va unii altora pacatele si rugati-va unii pentru alții, ca sa fiți vindecați.",
        ref: "Iacov 5:16",
      },
      bubbles: [
        {
          from: "guide",
          text: "«Ca sa fiți vindecați». Textul leaga vindecarea de faptul ca cineva știe.",
        },
        {
          from: "guide",
          text:
            "Nu inseamna sa spui totul tuturor — ar fi imprudent si periculos. Inseamna sa nu fii singurul care știe ce te lupta.",
        },
        { from: "guide", text: "Un om. Unul e destul ca sa nu mai fie secret." },
      ],
    },
    {
      id: "im7_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text:
            "Și ceva ce nu se aspepta nimeni: cel mai rapid mod de a ieși din singuratate e sa ai grija de altcineva singur.",
        },
        {
          from: "guide",
          text: "«Purtați-va poverile unii altora si veți implini așa legea lui Hristos» (Galateni 6:2).",
        },
        {
          from: "guide",
          text:
            "Nu e o metoda de distragere. Cine primeste tot timpul rămâne in poziti a celui asistat. Cine da devine cuiva necesar — si aia e apartenența.",
        },
      ],
    },
    {
      id: "im7_5",
      type: "quiz",
      order: 5,
      quiz: {
        question: "De ce leaga Iacov vindecarea de marturisirea unul altuia?",
        options: [
          { text: "Pentru ca trebuie sa ne pedepsim public", correct: false },
          { text: "Pentru ca ce e știut de cineva nu mai are putere de secret asupra ta", correct: true },
          { text: "Pentru ca altfel Dumnezeu nu iarta", correct: false },
          { text: "Pentru ca liderii trebuie sa afle tot", correct: false },
        ],
        explanation:
          "Iertarea vine de la Dumnezeu — asta e clar in 1 Ioan 1:9. Marturisirea intre oameni e pentru vindecare si pentru a nu mai duce singur. Și se face fata de un om de incredere, nu in public.",
      },
    },
    {
      id: "im7_6",
      type: "scripture",
      order: 6,
      scripture: {
        text:
          "Sa veghem unii asupra altora, ca sa ne indemnam la dragoste si la fapte bune. Sa nu parasșim adunarea noastra, cum au unii obicei.",
        ref: "Evrei 10:24-25",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Observa motivul dat pentru adunare: ca sa ne indemnam unii pe alții. Nu ca sa bifam prezența.",
        },
        {
          from: "guide",
          text: "Adunarea nu e scopul. Oamenii sunt.",
        },
      ],
    },
    {
      id: "im7_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "Ce rămâne cu tine din drumul asta, in patru rânduri:",
        },
        { from: "guide", text: "El știe singuratatea din interior. A fost parasit de toti." },
        { from: "guide", text: "Nu esti orfan. Ai fost adoptat, si adoptarea nu se anuleaza." },
        { from: "guide", text: "Cine te-a ranit in numele Lui nu vorbea din partea Lui. El a ieșit dupa tine." },
        { from: "guide", text: "Nu ai nevoie de o mulțime. Doi sau trei, si un om care știe ce te lupta." },
      ],
    },
    {
      id: "im7_8",
      type: "step",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi, doua lucruri. Primul: spune UNUI om o propozitie adevarata despre tine. Nu tot — una.",
        },
        {
          from: "guide",
          text:
            "Al doilea: gasește pe cineva mai singur decat tine si fa un lucru pentru el azi. Un mesaj, un telefon, o vizita.",
        },
      ],
    },
    {
      id: "im7_9",
      type: "prayer",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "«Doamne, nu vreau sa mă mai descurc singur. Da-mi oameni — si arata-mi pe cine sa țin eu.»",
        },
      ],
    },
    {
      id: "im7_10",
      type: "journal",
      order: 10,
      journalPrompt:
        "Reciteste ce ai scris in prima lectie. Ce s-a schimbat? Și cine e omul pe care Îl ții tu de acum?",
      bubbles: [
        {
          from: "guide",
          text:
            "Drumul asta s-a terminat. Relația, nu. Ce ai scris ramane al tau, oricare drum alegi mai departe.",
        },
      ],
    },
    {
      id: "im7_11",
      type: "memory_verse",
      order: 11,
      scripture: { text: "Purtați-va poverile unii altora.", ref: "Galateni 6:2" },
    },
  ],
}

export const IMPREUNA_LESSONS: Lesson[] = [
  impreunaL1,
  impreunaL2,
  impreunaL3,
  impreunaL4,
  impreunaL5,
  impreunaL6,
  impreunaL7,
]
