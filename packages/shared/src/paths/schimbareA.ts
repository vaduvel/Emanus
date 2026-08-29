import type { Lesson } from "../domain.js"

/*
 * CAMERA 5 — "Nu ma pot schimba" / minciuna: "Sunt defect, asta sunt."
 * Drumul: path_schimbare. Lectiile 1-4 aici, 5-7 in schimbareB.ts.
 *
 * Usi care duc aici: dependenta, anxietate, recadere, tristete, furie.
 *
 * ORDINEA (docs/21 §2): nu incepem cu "lasa-te de". Incepem cu ce e omul.
 * Cine crede ca e defect va incerca sa se repare cu voința si va cadea, pentru
 * ca voința nu schimba identitatea. Metoda vine abia in lectiile 3 si 4.
 *
 * SIGURANTA (docs/22 §1): aici sunt cele mai multe simptome care pot avea cauze
 * MEDICALE — anxietate, tristete, insomnie, oboseala, iritabilitate. Nicio lectie
 * din camera asta nu spune "asta ai pentru ca nu crezi destul". Pasii `s6_*`
 * din schimbareB.ts trimit la medic si sunt NENEGOCIABILI.
 *
 * VOCEA (docs/22 §10): Emanus. Fara nume de om, fara "si eu am fost la fel".
 */

export const schimbareL1: Lesson = {
  id: "schimbare_l1",
  courseId: "path_schimbare",
  order: 1,
  title: "Nu esti defect",
  estMinutes: 11,
  anchorRefs: ["Marcu 5:1-15", "Psalmul 139:13-14", "Romani 7:15"],
  memoryVerseRef: "Psalmul 139:14",
  steps: [
    {
      id: "s1_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Bine ca ai apasat." },
        {
          from: "guide",
          text:
            "Nu te intreb de cate ori ai incercat si nu te intreb ce faci. Ce scrii aici ramane in telefonul tau — nu citeste nimeni.",
        },
        { from: "guide", text: "Doar atat: cum esti azi?" },
      ],
    },
    {
      id: "s1_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Cine intra aici a mai incercat. De obicei de multe ori. Si a ajuns la o concluzie care doare mai mult decat lucrul in sine:",
        },
        { from: "guide", text: "«asa sunt eu»." },
        {
          from: "guide",
          text: "Azi nu vorbim despre cum te lasi. Azi vorbim despre propozitia aia.",
        },
      ],
    },
    {
      id: "s1_3",
      type: "choice",
      order: 3,
      choice: {
        prompt: "Ce te-a adus aici seamana mai mult cu:",
        options: [
          { id: "s1c_a", label: "Un lucru de care nu mă pot lasa" },
          { id: "s1c_b", label: "O stare pe care nu o pot opri (frica, tristete)" },
          { id: "s1c_c", label: "O reactie care raneste oamenii din jur" },
        ],
      },
    },
    {
      id: "s1_4",
      type: "name_struggle",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text:
            "Toate trei ajung in acelasi loc: «am incercat, deci problema sunt eu».",
        },
        {
          from: "guide",
          text:
            "Si e o diferenta uriasa intre «am o problema» si «sunt problema». Prima are ieșire. A doua nu are unde sa se duca.",
        },
      ],
    },
    {
      id: "s1_5",
      type: "scripture",
      order: 5,
      scripture: {
        text:
          "Nimeni nu putea sa-l tina in frâu... si zi si noapte statea in morminte si pe munti, tipand si tainduse cu pietre.",
        ref: "Marcu 5:4-5",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "E vorba de un om din Gadara. Se automutila. Fusese legat de mai multe ori si rupsese legaturile de fiecare data.",
        },
        {
          from: "guide",
          text:
            "Satul incercase tot ce se putea cu forta. Nu a functionat. Il mutaseră afara, in cimitir, unde nu deranja.",
        },
        {
          from: "guide",
          text: "Cel mai pierdut om din regiune. Si primul lucru din capitol e ca Iisus traverseaza lacul.",
        },
      ],
    },
    {
      id: "s1_6",
      type: "truth_simple",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text:
            "Un amanunt important: Iisus il intreaba «care ti-e numele?». Nu pentru informatie — ca sa fie clar ca omul e una si ce e in el e alta.",
        },
        {
          from: "guide",
          text:
            "Iar la sfarsit scrie ca sedea «îmbrăcat si intreg la minte». Nu s-a nascut alt om. Acela era el, cel de dedesubt, cel pe care nu il mai vazuse nimeni de ani.",
        },
        {
          from: "guide",
          text: "Satul il numise nebunul din cimitir. Iisus a vazut un om acoperit.",
        },
      ],
    },
    {
      id: "s1_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Te laud ca sunt o făptura atat de minunata. Minunate sunt lucrarile Tale.",
        ref: "Psalmul 139:14",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Asta nu e o vorba de incurajare. E o afirmatie despre fabricatie: nu ai ieșit stricat de la producator.",
        },
        {
          from: "guide",
          text:
            "Ce s-a stricat s-a stricat pe drum — prin ce ai trait, prin ce ti s-a facut, prin ce ai ales. Astea se pot desface. Un defect de fabricatie nu s-ar putea.",
        },
      ],
    },
    {
      id: "s1_8",
      type: "quiz",
      order: 8,
      quiz: {
        question: "Care e diferenta care conteaza in lectia asta?",
        options: [
          { text: "Intre oameni tari si oameni slabi", correct: false },
          { text: "Intre «am o problema» si «sunt problema»", correct: true },
          { text: "Intre pacate mari si pacate mici", correct: false },
          { text: "Intre cei care se roaga si cei care nu se roaga", correct: false },
        ],
        explanation:
          "Prima propozitie descrie ceva ce ai si care se poate scoate. A doua descrie ceea ce esti si nu are ieșire. Omul din Gadara a fost tratat de sat ca fiind problema. Iisus a vorbit cu omul, nu cu problema.",
      },
    },
    {
      id: "s1_9",
      type: "how_god_helps",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text:
            "Si ca sa fie clar ca nu e vorba de oameni slabi: cel care a scris Romani a spus despre el «nu fac ce vreau, ci fac ce nu vreau» (Romani 7:15).",
        },
        {
          from: "guide",
          text:
            "Deci nu esti singurul si nu esti o exceptie rusinoasa. Esti intr-un loc descris in Biblie, la persoana intai.",
        },
        {
          from: "guide",
          text: "In lectia urmatoare ne uitam de ce voința nu tine. Nu e lipsa de caracter.",
        },
      ],
    },
    {
      id: "s1_10",
      type: "prayer",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "«Doamne, nu mai pot singur. Uita-te la mine, nu la ce fac.»",
        },
      ],
    },
    {
      id: "s1_11",
      type: "journal",
      order: 11,
      journalPrompt:
        "Scrie propozitia cu care te-ai obisnuit sa te descrii. Exact cum suna in capul tau. O vom recitit la final.",
    },
    {
      id: "s1_12",
      type: "memory_verse",
      order: 12,
      scripture: { text: "Te laud ca sunt o făptura atat de minunata.", ref: "Psalmul 139:14" },
      bubbles: [{ from: "guide", text: "Atat pentru azi. Un singur lucru pe zi." }],
    },
  ],
}

export const schimbareL2: Lesson = {
  id: "schimbare_l2",
  courseId: "path_schimbare",
  order: 2,
  title: "De ce nu tine voința",
  estMinutes: 11,
  anchorRefs: ["Romani 7:18-24", "Ioan 8:34-36", "Galateni 5:16-17"],
  memoryVerseRef: "Ioan 8:36",
  steps: [
    {
      id: "s2_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum esti azi?" }],
    },
    {
      id: "s2_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Ai promis. Poate chiar I-ai promis Lui. Poate ai postit, ai plans, ai sters aplicatia, ai aruncat pachetul.",
        },
        { from: "guide", text: "Si a tinut. Trei zile, doua saptamani, patru luni." },
        {
          from: "guide",
          text:
            "Azi vorbim despre de ce metoda asta cedeaza mereu. Nu ca sa te descurajez — ca sa nu mai crezi ca vina e ca nu ai vrut destul.",
        },
      ],
    },
    {
      id: "s2_3",
      type: "scripture",
      order: 3,
      scripture: {
        text:
          "Caci binele care vreau sa-l fac, nu-l fac, ci raul, care nu vreau sa-l fac, iata ce fac!... O, nenorocitul om ce sunt! Cine ma va izbavi?",
        ref: "Romani 7:19,24",
      },
      bubbles: [
        {
          from: "guide",
          text: "Uita-te la ultima intrebare. Nu «ce sa fac?». «Cine ma va izbavi?»",
        },
        {
          from: "guide",
          text:
            "A trecut de la metoda la persoana. Aia e trecerea intreaga a capitolului — si e trecerea pe care majoritatea o rateaza timp de ani.",
        },
      ],
    },
    {
      id: "s2_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text:
            "Iisus a folosit un cuvant tare: «oricine trăiește in pacat este rob al pacatului» (Ioan 8:34).",
        },
        {
          from: "guide",
          text:
            "Un rob nu e cineva care nu vrea sa plece. E cineva care vrea si nu poate. De aia «vreau mai mult» nu e soluția — robul deja vrea.",
        },
        {
          from: "guide",
          text: "Iar propozitia urmatoare e: «dacă Fiul va va face slobozi, veti fi in adevar slobozi» (8:36). Cineva te scoate. Nu te scoti.",
        },
      ],
    },
    {
      id: "s2_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Doua modele, si merita sa vezi diferenta pe hartie:",
        },
        {
          from: "guide",
          text:
            "Modelul cu voința: strang din dinti → rezist → ma epuizez → cad → mi-e rusine → ma ascund → cad mai rau. Ai fost pe cercul asta, il stii pe de rost.",
        },
        {
          from: "guide",
          text:
            "Modelul din Biblie: sunt primit → nu mai am de ce sa mă ascund → numesc lucrul → taie alimentarea → pun altceva in loc → nu sunt singur → cand cad, revin in aceeași zi.",
        },
        {
          from: "guide",
          text: "Al doilea e mai lent la inceput si singurul care tine dupa un an.",
        },
      ],
    },
    {
      id: "s2_6",
      type: "scripture",
      order: 6,
      scripture: {
        text:
          "Umblati cârmuiți de Duhul si nu impliniti poftele firii pamantesti.",
        ref: "Galateni 5:16",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Observa ce NU spune: nu spune «luptati-va cu poftele si o sa fiti liberi». Spune «umblati» — adica mergeti cu El — si consecinta vine.",
        },
        {
          from: "guide",
          text:
            "Ordinea e inversata fata de cum incercam noi. Noi vrem sa curatam ca sa putem umbla cu El. El spune: umbla cu Mine si asa se curata.",
        },
      ],
    },
    {
      id: "s2_7",
      type: "quiz",
      order: 7,
      quiz: {
        question: "De ce nu e de ajuns «sa vreau mai mult»?",
        options: [
          { text: "Pentru ca de fapt nu vrei destul", correct: false },
          { text: "Pentru ca un rob deja vrea sa fie liber — problema nu e voința, e puterea", correct: true },
          { text: "Pentru ca Dumnezeu nu vrea sa te schimbi prea repede", correct: false },
          { text: "Pentru ca voința e un lucru rau", correct: false },
        ],
        explanation:
          "Romani 7 e scris de un om care voia si nu putea. De aia intrebarea lui nu e «ce metoda incerc?», ci «cine ma va izbavi?». Voința are un rol — in ce hranesti si ce tai — dar nu are puterea sa te scoata din robie.",
      },
    },
    {
      id: "s2_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Asta nu inseamna ca stai si aștepți. Inseamna ca schimbi ce ceri.",
        },
        {
          from: "guide",
          text:
            "Pana acum ai cerut probabil «ajuta-ma sa nu mai fac». Incearca sa ceri «arata-mi de ce ma duc acolo».",
        },
        {
          from: "guide",
          text:
            "Aproape nimeni nu se duce la lucrul acela pentru placere. Se duce pentru liniste, pentru amortire, pentru o clipa in care nu mai simte. Adica e o cautare, nu doar un viciu.",
        },
        {
          from: "guide",
          text: "Si o cautare nu se opreste. Se muta." },
      ],
    },
    {
      id: "s2_9",
      type: "step",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi, un singur lucru: cand vine impulsul, nu te lupta cu el imediat. Intreaba-te ce simteai in minutul dinainte.",
        },
        {
          from: "guide",
          text:
            "Plictiseala? Singuratate? Furie? Frica? Scrie cuvantul. Nu trebuie sa faci nimic cu el azi. Doar sa il vezi.",
        },
      ],
    },
    {
      id: "s2_10",
      type: "prayer",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "«Doamne, nu-Ti mai promit ca ma descurc. Arata-mi de ce ma duc acolo si scoate-ma Tu.»",
        },
      ],
    },
    {
      id: "s2_11",
      type: "memory_verse",
      order: 11,
      scripture: { text: "Dacă Fiul va va face slobozi, veti fi in adevar slobozi.", ref: "Ioan 8:36" },
    },
  ],
}

export const schimbareL3: Lesson = {
  id: "schimbare_l3",
  courseId: "path_schimbare",
  order: 3,
  title: "Ce hranesti, creste",
  estMinutes: 11,
  anchorRefs: ["Iacov 1:14-15", "Matei 5:29-30", "Romani 13:14"],
  memoryVerseRef: "Romani 13:14",
  steps: [
    {
      id: "s3_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Cum esti azi?" },
        { from: "guide", text: "Ai prins cuvantul din minutul dinainte? Care era?" },
      ],
    },
    {
      id: "s3_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Ieri am spus ca nu te scoti singur. Azi spun partea a doua, si nu se contrazic:",
        },
        {
          from: "guide",
          text: "El nu va face in locul tau lucrurile pe care ti le-a lasat in mana.",
        },
      ],
    },
    {
      id: "s3_3",
      type: "scripture",
      order: 3,
      scripture: {
        text:
          "Fiecare este ispitit cand este atras de pofta lui insuși. Apoi pofta, cand a zamislit, da naStere pacatului; si pacatul, odata savarsit, aduce moartea.",
        ref: "Iacov 1:14-15",
      },
      bubbles: [
        {
          from: "guide",
          text: "Uita-te la lanț: atras → zamislit → naște → moarte. Sunt patru verigi, nu una.",
        },
        {
          from: "guide",
          text:
            "Aproape toți se luptă la veriga a treia, când deja e în curs. Lupta se câștigă la prima, unde nu e nici dramatic, nici spiritual: cu telefonul în mână, la unsprezece noaptea.",
        },
      ],
    },
    {
      id: "s3_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text:
            "Iisus a spus ceva care sperie prima data: «dacă ochiul tau te face sa cazi, scoate-l» (Matei 5:29).",
        },
        {
          from: "guide",
          text:
            "Nu a cerut nimanui sa se mutileze — nimeni din biserica primului secol nu a facut-o. E o exagerare deliberata, ca sa transmita o masura: taie fara mila lucrul care te duce acolo, chiar dacă pare o pierdere.",
        },
        {
          from: "guide",
          text: "Traducere pentru azi: aplicația, numarul din telefon, drumul care trece pe langa, contul, ora din noapte, omul cu care se intampla mereu.",
        },
      ],
    },
    {
      id: "s3_5",
      type: "scripture",
      order: 5,
      scripture: {
        text: "Imbracati-va in Domnul Isus Hristos si nu purtati grija de firea pamanteasca, ca sa nu-i treziti poftele.",
        ref: "Romani 13:14",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "«Nu purtati grija» — in original e mai concret: nu face planuri pentru ea, nu te aproviziona.",
        },
        {
          from: "guide",
          text:
            "Nimeni nu cade din senin. Intre «nu mai fac» si cadere exista aproape mereu un moment de aprovizionare: ai pastrat ceva, ai lasat o ușa deschisa, «pentru orice eventualitate».",
        },
      ],
    },
    {
      id: "s3_6",
      type: "quiz",
      order: 6,
      quiz: {
        question: "Unde se câștigă, practic, lupta?",
        options: [
          { text: "In momentul ispitei, cu voința", correct: false },
          { text: "La prima veriga: ce hranesti si ce tai inainte sa apara impulsul", correct: true },
          { text: "Dupa cadere, prin regret puternic", correct: false },
          { text: "Nu se câștigă; doar te obișnuiești să pierzi mai rar", correct: false },
        ],
        explanation:
          "Iacov descrie un proces cu verigi. Cand ai ajuns la «zamislit», decizia e aproape luata. De aia oamenii care se schimba real nu sunt mai puternici — si-au schimbat mediul, orele si accesul.",
      },
    },
    {
      id: "s3_7",
      type: "step",
      order: 7,
      bubbles: [
        { from: "guide", text: "Astazi, ceva concret, in cinci minute:" },
        {
          from: "guide",
          text:
            "Numeste UN lucru care te alimenteaza si scoate-l azi. Nu trei. Unul — dar pe cel care conteaza, nu pe cel mai ieștin.",
        },
        {
          from: "guide",
          text:
            "Si mai identifica ora. Aproape orice cadere are o ora preferata. Ce faci diferit la ora aia, incepand de azi?",
        },
      ],
    },
    {
      id: "s3_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Sa fie clar de ce nu e o metoda de dezvoltare personala: taiatul singur nu vindeca. Face loc.",
        },
        {
          from: "guide",
          text:
            "Un om care doar taie ramane cu o gaura si cu dor. De aia lectia urmatoare e despre ce se pune in loc — si e cea mai importanta din drumul asta.",
        },
      ],
    },
    {
      id: "s3_9",
      type: "prayer",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "«Doamne, tai ce trebuie taiat. Da-mi curaj pentru cinci minute, nu pentru un an.»",
        },
      ],
    },
    {
      id: "s3_10",
      type: "journal",
      order: 10,
      journalPrompt: "Ce ai scos azi, si la ce ora se intampla de obicei?",
    },
    {
      id: "s3_11",
      type: "memory_verse",
      order: 11,
      scripture: { text: "Nu purtati grija de firea pamanteasca, ca sa nu-i treziti poftele.", ref: "Romani 13:14" },
    },
  ],
}

export const schimbareL4: Lesson = {
  id: "schimbare_l4",
  courseId: "path_schimbare",
  order: 4,
  title: "Casa goala",
  estMinutes: 11,
  anchorRefs: ["Matei 12:43-45", "Ioan 15:5", "Efeseni 5:18-19"],
  memoryVerseRef: "Ioan 15:5",
  steps: [
    {
      id: "s4_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum esti azi? A tinut ce ai scos?" }],
    },
    {
      id: "s4_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Ai avut vreodata o perioada curata, in care te-ai simtit bine, si apoi ai recazut mai rau decat inainte?",
        },
        { from: "guide", text: "Iisus a explicat mecanismul, si e neconfortabil de precis." },
      ],
    },
    {
      id: "s4_3",
      type: "scripture",
      order: 3,
      scripture: {
        text:
          "Atunci zice: «Ma voi intoarce in casa mea.» Si, cand vine, o gaseste goala, maturata si impodobita... si starea din urma a acelui om se face mai rea decat cea dintai.",
        ref: "Matei 12:44-45",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Casa era curata. Chiar frumoasa. Problema nu era murdaria. Problema era ca era GOALA.",
        },
        {
          from: "guide",
          text: "Un loc gol nu ramane gol. Se umple cu ce era acolo inainte, pentru ca ala cunoaste drumul.",
        },
      ],
    },
    {
      id: "s4_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text:
            "De aia programele care doar interzic tin cateva luni. Ai scos ce te amortea si acum simti tot, fara nimic in loc.",
        },
        {
          from: "guide",
          text:
            "Nu ai nevoie de mai multa abstinenta. Ai nevoie ca locul acela sa fie ocupat de ceva viu.",
        },
      ],
    },
    {
      id: "s4_5",
      type: "scripture",
      order: 5,
      scripture: {
        text:
          "Eu sunt Vița, voi sunteti mladițele. Cine ramane in Mine si in cine ramin Eu aduce multă roada; caci despartiti de Mine nu puteti face nimic.",
        ref: "Ioan 15:5",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Cuvantul «raman» din greaca e «meno»: a locui, a sta, a nu pleca. Nu «viziteaza».",
        },
        {
          from: "guide",
          text:
            "O mladita nu se străduiește sa faca struguri. Sta lipita si primeste seva. Roada e o consecinta a locului, nu a efortului.",
        },
        {
          from: "guide",
          text: "Aici e tot secretul schimbarii, si de aia nu se poate graba: se schimba cine te hraneste.",
        },
      ],
    },
    {
      id: "s4_6",
      type: "quiz",
      order: 6,
      quiz: {
        question: "Ce lipsea casei din pilda lui Iisus?",
        options: [
          { text: "Curățenia", correct: false },
          { text: "Un locuitor — era curata, dar goala", correct: true },
          { text: "O ușa mai buna", correct: false },
          { text: "Reguli mai stricte", correct: false },
        ],
        explanation:
          "Textul spune explicit: goala, maturata, impodobita. Curățenia nu a impiedicat intoarcerea. De aia «nu mai fac» nu e un plan complet — e doar jumatatea negativa a unui plan.",
      },
    },
    {
      id: "s4_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "Concret, cu ce se umple locul. Nu sunt lucruri spirituale abstracte:",
        },
        {
          from: "guide",
          text:
            "1. Un timp fix cu El, scurt si zilnic. Zece minute la aceeași ora bat o ora la doua saptamani.",
        },
        {
          from: "guide",
          text:
            "2. Oameni. Cel putin unul care stie si care nu se sperie. Singuratatea e combustibilul principal al oricarei dependențe.",
        },
        {
          from: "guide",
          text:
            "3. Un lucru care te obosește sanatos si unul care ajuta pe altcineva. Corpul si sensul — amandoua tin locul ocupat.",
        },
      ],
    },
    {
      id: "s4_8",
      type: "step",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi: alege ora si scrie ce faci in ea. Ora la care cadeai de obicei — aia. Pune ceva acolo, chiar banal: o plimbare, un telefon dat cuiva, zece minute de citit.",
        },
      ],
    },
    {
      id: "s4_9",
      type: "prayer",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "«Doamne, nu vreau doar sa fiu curat. Vreau sa fii Tu in locul care s-a golit.»",
        },
      ],
    },
    {
      id: "s4_10",
      type: "journal",
      order: 10,
      journalPrompt: "Ce pui in locul gol, la ce ora, incepand de azi? Scrie-o ca pe o programare.",
    },
    {
      id: "s4_11",
      type: "memory_verse",
      order: 11,
      scripture: { text: "Despartiti de Mine nu puteti face nimic.", ref: "Ioan 15:5" },
    },
  ],
}

export const SCHIMBARE_A: Lesson[] = [schimbareL1, schimbareL2, schimbareL3, schimbareL4]
