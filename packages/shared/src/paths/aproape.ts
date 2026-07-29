import type { Lesson } from "../domain.js"

/*
 * CAMERA 4 — "E departe, nu ma aude" / minciuna: "Am ramas singur pe drum."
 * Drumul: path_aproape. Toate cele sapte lectii sunt in fisierul asta.
 *
 * Usi care duc aici: perete, uscaciune, flacara, cum_citesc.
 *
 * ORDINEA (docs/21 §2): incepem cu faptul că El nu a plecat — pentru ca omul de
 * aici nu are nevoie de tehnica de rugaciune, are nevoie sa afle ca nu a fost
 * abandonat. Metoda (cum se aude, cum se citeste) vine de la lectia 4 incolo.
 *
 * SIGURANTA (docs/22 §1): lectia 3 atinge intrebarea "e ceva la mine?". Nu punem
 * vina automat pe om. Pasul `a3_8` spune explicit ca uneori nu e nimic de reparat
 * si ca tacerea nu e o pedeapsa — e NENEGOCIABIL. Oboseala, insomnia si lipsa de
 * orice simtire pot avea cauze medicale (`a2_9`).
 *
 * VOCEA (docs/22 §10): Emanus. Fara nume de om.
 */

export const aproapeL1: Lesson = {
  id: "aproape_l1",
  courseId: "path_aproape",
  order: 1,
  title: "N-a plecat El",
  estMinutes: 10,
  anchorRefs: ["Evrei 13:5", "Matei 28:20", "Deuteronom 31:6"],
  memoryVerseRef: "Evrei 13:5",
  steps: [
    {
      id: "a1_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Bine ca ai apasat." },
        {
          from: "guide",
          text:
            "Ce scrii aici ramane in telefonul tau — nu citeste nimeni. Cum esti azi?",
        },
      ],
    },
    {
      id: "a1_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Cine intra aici nu are, de obicei, o problema de credința. Crede. Doar ca nu mai simte nimic.",
        },
        {
          from: "guide",
          text:
            "Te rogi si ai impresia ca vorbesti singur in camera. Citesti si nu se aprinde nimic. Si undeva, in fundal, o intrebare: «m-a lasat?»",
        },
        { from: "guide", text: "Azi nu îți dau o tehnica. Azi lamurim intrebarea aia." },
      ],
    },
    {
      id: "a1_3",
      type: "choice",
      order: 3,
      choice: {
        prompt: "Ce seamana mai mult cu tine acum?",
        options: [
          { id: "a1c_a", label: "Mă rog si nu primesc nimic" },
          { id: "a1c_b", label: "Am fost aproape de El candva, acum nu mai sunt" },
          { id: "a1c_c", label: "Nu stiu cum să fac, poate de-aia nu merge" },
        ],
      },
    },
    {
      id: "a1_4",
      type: "scripture",
      order: 4,
      scripture: {
        text: "Caci El insuși a zis: «Nicidecum nu te voi lasa si cu niciun chip nu te voi parasi.»",
        ref: "Evrei 13:5",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "In greaca, propozitia asta are trei negatii puse una peste alta. Nu se poate reda in romana fara sa sune stricat.",
        },
        {
          from: "guide",
          text:
            "Efectul e ceva de genul: «nu te voi lasa, nu, niciodata, in niciun fel». E cel mai apasat «nu» din Noul Testament.",
        },
        {
          from: "guide",
          text: "Iar contextul e o scrisoare catre oameni care isi pierdeau casele si erau tentați sa renunte. Nu era o vorba pentru vremuri bune.",
        },
      ],
    },
    {
      id: "a1_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Deci prezența Lui e o promisiune, nu o senzatie.",
        },
        {
          from: "guide",
          text:
            "Diferenta e uriasa in practica: o senzatie se schimba cu somnul, cu glicemia, cu o cearta de acasa. O promisiune nu se schimba cu nimic din astea.",
        },
        {
          from: "guide",
          text:
            "Soarele nu dispare cand e nor. Poti sa nu il vezi trei saptamani si totusi el e cel care tine planeta pe orbita.",
        },
      ],
    },
    {
      id: "a1_6",
      type: "quiz",
      order: 6,
      quiz: {
        question: "Ce arata faptul ca nu simti nimic cand te rogi?",
        options: [
          { text: "Ca Dumnezeu S-a indepartat pentru o vreme", correct: false },
          { text: "Ca ai facut ceva grav si te-a lasat", correct: false },
          { text: "Nimic despre unde e El. Simtirea nu e aparatul de masura al prezenței Lui.", correct: true },
          { text: "Ca nu ai credința adevarata", correct: false },
        ],
        explanation:
          "Promisiunea din Evrei 13:5 nu are nicio condiție de simtire atasata. Iar cei mai apropiați oameni din Biblie au avut perioade lungi de tacere — David, Iov, Ilie, si Iisus insuși pe cruce. Simtirea urca si coboara. Faptul nu.",
      },
    },
    {
      id: "a1_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text:
            "Ultimul lucru pe care l-a spus Iisus inainte sa plece a fost: «Eu sunt cu voi in toate zilele, pana la sfarsitul veacului» (Matei 28:20).",
        },
        {
          from: "guide",
          text: "«In toate zilele» include ziua in care nu simti nimic. Aia e o zi.",
        },
        {
          from: "guide",
          text:
            "Si mai e ceva: numele pe care I l-a dat Isaia înainte sa se nasca a fost Emanuel — «Dumnezeu este cu noi». Nu «Dumnezeu ne priveste de sus».",
        },
      ],
    },
    {
      id: "a1_8",
      type: "step",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi: vorbeste-I o data, cu voce tare, exact despre asta. Nu o rugaciune frumoasa — plangerea ta.",
        },
        {
          from: "guide",
          text: "«Nu Te simt. Nu-mi place. Dar Tu ai spus ca esti aici.» Ambele parti, in aceeași propozitie.",
        },
      ],
    },
    {
      id: "a1_9",
      type: "prayer",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "«Doamne, nu Te simt. Nu plec de aici. Ai spus ca nu mă lași — mă țin de asta.»",
        },
      ],
    },
    {
      id: "a1_10",
      type: "journal",
      order: 10,
      journalPrompt: "De cand ai impresia ca nu se mai aude nimic? Si ce s-a intamplat in perioada aia?",
    },
    {
      id: "a1_11",
      type: "memory_verse",
      order: 11,
      scripture: { text: "Nicidecum nu te voi lasa si cu niciun chip nu te voi parasi.", ref: "Evrei 13:5" },
      bubbles: [{ from: "guide", text: "Atat pentru azi." }],
    },
  ],
}

export const aproapeL2: Lesson = {
  id: "aproape_l2",
  courseId: "path_aproape",
  order: 2,
  title: "Cand tace",
  estMinutes: 11,
  anchorRefs: ["Psalmul 22:1-2", "Psalmul 13", "Matei 27:46"],
  memoryVerseRef: "Psalmul 13:5",
  steps: [
    {
      id: "a2_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum esti azi?" }],
    },
    {
      id: "a2_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Exista o idee care circula prin biserici si care face mult rau: «dacă nu simti nimic, e ceva la tine».",
        },
        {
          from: "guide",
          text: "Azi ne uitam la cine a trecut prin tacere in Biblie. Lista e incomoda.",
        },
      ],
    },
    {
      id: "a2_3",
      type: "scripture",
      order: 3,
      scripture: {
        text:
          "Dumnezeul meu, Dumnezeul meu, pentru ce m-ai parasit? Strig ziua, si nu-mi raspunzi; strig si noaptea, si totuși n-am odihna.",
        ref: "Psalmul 22:1-2",
      },
      bubbles: [
        {
          from: "guide",
          text: "Cel care scrie e David. Omul despre care Dumnezeu a spus «un om dupa inima Mea».",
        },
        {
          from: "guide",
          text:
            "Si observa ca psalmul asta a intrat in Biblie. Nu a fost cenzurat, nu a fost «corectat». Dumnezeu a pastrat in cartea Lui plangerea unui om care se simtea parasit de El.",
        },
      ],
    },
    {
      id: "a2_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text:
            "Iar cel care a citat versetul asta pe cruce a fost Iisus (Matei 27:46). El, care nu avea nici un pacat, a trait momentul in care Tatal parea plecat.",
        },
        {
          from: "guide",
          text:
            "Deci tacerea nu e dovada ca ai facut ceva. Daca ar fi fost, cazul de pe cruce nu s-ar explica.",
        },
      ],
    },
    {
      id: "a2_5",
      type: "how_god_helps",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text:
            "Psalmul 13 e o lecție de structura. Sase versete, si trebuie citite in ordine ca sa se vada ce face omul cu tacerea.",
        },
        {
          from: "guide",
          text:
            "Versetele 1-2: «pana cand ma vei uita, Doamne? Pana cand Îi ascunzi Fata?» Se plange. Direct La El, nu despre El.",
        },
        {
          from: "guide",
          text: "Versetele 3-4: cere. «Priveste, raspunde-mi.» Nu se resemneaza.",
        },
        {
          from: "guide",
          text:
            "Versetele 5-6: «Eu mă increed in bunatatea Ta.» Nu spune ca s-a schimbat situația. Situația e identica. S-a schimbat unde s-a ancorat.",
        },
      ],
    },
    {
      id: "a2_6",
      type: "world_vs_truth",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Ce facem noi, de obicei, cand tace: ne oprim. Nu ne mai rugam, pentru ca «n-are rost».",
        },
        {
          from: "guide",
          text:
            "Ce face psalmistul: se plange, si continua sa vorbeasca. Plangerea e o forma de rugaciune, si e in Biblie mai des decat lauda.",
        },
        {
          from: "guide",
          text: "Nu trebuie sa vorbesti frumos cu El. Trebuie sa vorbesti.",
        },
      ],
    },
    {
      id: "a2_7",
      type: "quiz",
      order: 7,
      quiz: {
        question: "Ce face omul din Psalmul 13, la final?",
        options: [
          { text: "Se preface ca nu mai are nicio problema", correct: false },
          { text: "Isi schimba ancora — se increde in bunatatea Lui desi nimic nu s-a rezolvat", correct: true },
          { text: "Renunta sa se mai roage", correct: false },
          { text: "Isi cere iertare ca s-a plans", correct: false },
        ],
        explanation:
          "Psalmul incepe cu «pana cand?» si se termina cu «voi canta», fara sa se fi schimbat nimic intre timp. Asta e credința — nu absența intrebarilor, ci faptul că le pui direct Lui si rami.",
      },
    },
    {
      id: "a2_8",
      type: "step",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi: scrie-ți propriul Psalm 13. Trei parti, doua propozitii fiecare. Plangerea. Cererea. Si o propozitie de ancora, chiar dacă nu o simti.",
        },
      ],
    },
    {
      id: "a2_9",
      type: "how_god_helps",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text:
            "Si un lucru cinstit, pentru ca nu tot ce pare uscaciune spirituala e uscaciune spirituala.",
        },
        {
          from: "guide",
          text:
            "Daca nu simti NIMIC de luni, nici bucurie, nici tristete, dacă nu dormi, dacă nu ai energie pentru nimic — asta poate fi epuizare sau o depresie, si se trateaza. Un medic sau un psiholog nu e o tradare a lui Dumnezeu.",
        },
        {
          from: "guide",
          text: "Sprijin: 116 123. Urgențe: 112. Emanus nu inlocuieste medicul, psihologul, poliția sau 112.",
        },
      ],
    },
    {
      id: "a2_10",
      type: "prayer",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "«Pana cand, Doamne? Și totusi, nu plec. Ma increed in bunatatea Ta.»",
        },
      ],
    },
    {
      id: "a2_11",
      type: "memory_verse",
      order: 11,
      scripture: { text: "Eu mă increed in bunatatea Ta.", ref: "Psalmul 13:5" },
    },
  ],
}

export const aproapeL3: Lesson = {
  id: "aproape_l3",
  courseId: "path_aproape",
  order: 3,
  title: "Daca e ceva de pus in ordine",
  estMinutes: 11,
  anchorRefs: ["Isaia 59:1-2", "Psalmul 139:23-24", "Marcu 11:25"],
  memoryVerseRef: "Psalmul 139:23",
  steps: [
    {
      id: "a3_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum esti azi? Ai scris psalmul tau?" }],
    },
    {
      id: "a3_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Lectia asta e delicata si o spun cu grija, in ordinea corecta.",
        },
        {
          from: "guide",
          text:
            "Ieri am spus ca tacerea nu e dovada că ai facut ceva. Aia rami adevarat. Azi spun ca UNEORI exista si ceva de pus in ordine — si merita verificat, nu presupus.",
        },
      ],
    },
    {
      id: "a3_3",
      type: "scripture",
      order: 3,
      scripture: {
        text:
          "Nu, mana Domnului nu este prea scurta ca sa mantuiasca, nici urechea Lui prea tare ca sa auda, ci nelegiuirile voastre pun un zid de despartire.",
        ref: "Isaia 59:1-2",
      },
      bubbles: [
        {
          from: "guide",
          text: "Observa ce spune primul: nu e El. Nu S-a slabit, nu a surzit.",
        },
        {
          from: "guide",
          text:
            "Iar cuvantul folosit e «zid», nu «plecare». Zidul se poate darama. E o veste bună, nu o acuzatie: dacă exista un zid, se poate face ceva.",
        },
      ],
    },
    {
      id: "a3_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Trei lucruri pe care Biblia le numeste concret ca punand zid. Nici unul nu e «nu esti destul de bun»:",
        },
        {
          from: "guide",
          text:
            "1. Un pacat pastrat cu bună stiința — nu unul cu care te lupti, unul pe care il aperi. «Daca as fi avut fardelegea in inima, nu m-ar fi ascultat Domnul» (Psalmul 66:18).",
        },
        {
          from: "guide",
          text:
            "2. Neiertarea. Iisus a legat direct rugaciunea de asta: «cand stati in rugaciune, iertati» (Marcu 11:25).",
        },
        {
          from: "guide",
          text:
            "3. Nedreptatea facuta cuiva mai slab. Isaia 58 spune ca postul degeaba, cand cel de langa tine e nedreptatit, nu se aude.",
        },
      ],
    },
    {
      id: "a3_5",
      type: "scripture",
      order: 5,
      scripture: {
        text:
          "Cerceteaza-ma, Dumnezeule, si cunoaste-mi inima! Incearca-ma si cunoaste-mi gandurile! Vezi dacă sunt pe o cale rea si du-ma pe calea veciniciei!",
        ref: "Psalmul 139:23-24",
      },
      bubbles: [
        {
          from: "guide",
          text: "Uita-te cine face verificarea. Nu tu. «Cerceteaza-ma TU.»",
        },
        {
          from: "guide",
          text:
            "Diferenta e enorma. Cand te cercetezi tu, gasesti mereu prea mult sau prea putin — ori te condamni pentru tot, ori nu vezi nimic.",
        },
        {
          from: "guide",
          text:
            "Cand Îl lași pe El, arata un lucru, clar, cu ieșire. Niciodata o lista de zece cu care sa te prabusesti.",
        },
      ],
    },
    {
      id: "a3_6",
      type: "quiz",
      order: 6,
      quiz: {
        question: "Care e diferenta dintre a-ți cerceta inima si a te cerceta singur?",
        options: [
          { text: "Nu e nicio diferenta", correct: false },
          { text: "El arata un lucru concret, cu ieșire; autoanaliza fie te condamna in bloc, fie nu vede nimic", correct: true },
          { text: "El arata tot ce e greșit deodata, ca sa fii serios", correct: false },
          { text: "Autoanaliza e mai sigura, El e prea blând", correct: false },
        ],
        explanation:
          "Convingerea de la Dumnezeu e specifica si are ieșire: «asta, hai sa o punem in ordine». Ce te condamna in bloc, fara soluție, nu vine de la El — vezi si lectia despre rusine.",
      },
    },
    {
      id: "a3_7",
      type: "step",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi: spune rugaciunea din Psalmul 139:23 si taci doua minute. Doua, cu ceasul.",
        },
        {
          from: "guide",
          text:
            "Daca vine un lucru anume — un om, o fapta, o ușa lasata deschisa — scrie-l si fa ce se poate face azi. Daca nu vine nimic, treci mai departe liniStit.",
        },
      ],
    },
    {
      id: "a3_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Și partea cea mai importanta din lectia asta, pe care nu vreau sa o pierzi:",
        },
        {
          from: "guide",
          text:
            "Foarte des nu e nimic de reparat. Uscaciunea vine din oboseala, din prea multe zile la rand, dintr-o pierdere, dintr-o iarna prin care trece oricine merge mult.",
        },
        {
          from: "guide",
          text:
            "Tacerea Lui nu e pedeapsa. Un tata nu tace ca sa pedepseasca un copil care Îl caUta. Daca ai cercetat si nu ai gasit nimic, nu ai voie sa continui sa te cauti — asta nu mai e smerenie, e chin.",
        },
      ],
    },
    {
      id: "a3_9",
      type: "prayer",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "«Cerceteaza-ma Tu, Doamne. Ce gasesti, arata-mi. Ce nu gasesti, nu mi-l inventa in cap.»",
        },
      ],
    },
    {
      id: "a3_10",
      type: "memory_verse",
      order: 10,
      scripture: { text: "Cerceteaza-ma, Dumnezeule, si cunoaste-mi inima!", ref: "Psalmul 139:23" },
    },
  ],
}

export const aproapeL4: Lesson = {
  id: "aproape_l4",
  courseId: "path_aproape",
  order: 4,
  title: "Cum se aude, de fapt",
  estMinutes: 11,
  anchorRefs: ["1 Regi 19:11-12", "Ioan 10:27", "Isaia 30:21"],
  memoryVerseRef: "Ioan 10:27",
  steps: [
    {
      id: "a4_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum esti azi?" }],
    },
    {
      id: "a4_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Multi oameni asteapta o voce. Ceva clar, cu autoritate, care sa acopere gandurile.",
        },
        {
          from: "guide",
          text: "Si de aia rateaza ce se intampla de fapt. Azi ne uitam la locul in care Biblia descrie cum vorbeste El.",
        },
      ],
    },
    {
      id: "a4_3",
      type: "scripture",
      order: 3,
      scripture: {
        text:
          "Un vant tare... dar Domnul nu era in vantul acela. Un cutremur... dar Domnul nu era in cutremur. Un foc... dar Domnul nu era in foc. Si dupa aceea, s-a auzit un susur blând si subțire.",
        ref: "1 Regi 19:11-12",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Ilie era epuizat si voia sa moara. Dumnezeu ii da un spectacol: vant care sparge stanci, cutremur, foc.",
        },
        {
          from: "guide",
          text:
            "Si de trei ori textul spune: nu era acolo. Vorbirea a venit dupa, in cel mai mic sunet posibil. Traducerea literala e aproape «o liniste subțire».",
        },
        {
          from: "guide",
          text: "Ce se aude asa nu concureaza cu zgomotul. Trebuie sa opresti zgomotul.",
        },
      ],
    },
    {
      id: "a4_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Practic, El vorbeste in patru feluri, si primul e cel pe care il neglijam toti:",
        },
        {
          from: "guide",
          text:
            "1. Prin Scriptura. Un verset care te opreste, care pare scris pentru ziua ta. Asta e cel mai sigur — nu se contrazice niciodata.",
        },
        {
          from: "guide",
          text:
            "2. Prin gandul care nu seamana cu gandurile tale. Blând, clar, si de obicei fix pe ce evitai.",
        },
        {
          from: "guide",
          text: "3. Prin oameni — o propozitie spusa de cineva care nu stia ce te framânta.",
        },
        {
          from: "guide",
          text: "4. Prin circumstanțe — uși inchise si deschise. Astea se citesc ultimele si se verifica cu primele.",
        },
      ],
    },
    {
      id: "a4_5",
      type: "scripture",
      order: 5,
      scripture: { text: "Oile Mele ascultă glasul Meu; Eu le cunosc si ele vin dupa Mine.", ref: "Ioan 10:27" },
      bubbles: [
        {
          from: "guide",
          text:
            "Iisus spune asta ca pe un fapt, nu ca pe un ideal pentru elita. «Oile Mele ascultă» — la prezent, despre oameni obisnuiti.",
        },
        {
          from: "guide",
          text:
            "Oaia nu recunoaste glasul pastorului prin talent. Il recunoaste pentru ca l-a auzit de mii de ori. Se invața prin repetare, nu prin intensitate.",
        },
      ],
    },
    {
      id: "a4_6",
      type: "quiz",
      order: 6,
      quiz: {
        question: "Cum se verifica dacă un gand e de la El?",
        options: [
          { text: "Daca e insotit de o emoție puternica", correct: false },
          { text: "Daca se potriveste cu Scriptura, e blând, te trage spre El si nu te condamna in bloc", correct: true },
          { text: "Daca se intampla imediat ce te-ai rugat", correct: false },
          { text: "Daca îți confirma ce voiai deja", correct: false },
        ],
        explanation:
          "Testul e Scriptura, nu intensitatea. Ce contrazice Biblia nu e de la El, oricat de puternic se simte. Ce te condamna fara ieșire nu e de la El. Iar ce te trimite sa faci rau altcuiva sau sa te izolezi complet nu e de la El niciodata.",
      },
    },
    {
      id: "a4_7",
      type: "step",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi, un exercitiu de opt minute. Cinci vorbesti, trei taci, cu ceasul pornit.",
        },
        {
          from: "guide",
          text:
            "Telefonul in alta camera. In cele trei minute nu cauta nimic — doar nu pleca. Daca vine un gand, scrie-l pe hartie si continua.",
        },
        {
          from: "guide",
          text: "Prima data pare pierdere de vreme. Dupa doua saptamani nu mai pare.",
        },
      ],
    },
    {
      id: "a4_8",
      type: "prayer",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "«Doamne, vorbeste-mi cum vorbesti Tu. Invața-ma sa recunosc glasul Tau intre celelalte.»",
        },
      ],
    },
    {
      id: "a4_9",
      type: "journal",
      order: 9,
      journalPrompt: "Ce a venit in cele trei minute de liniste? Scrie fara sa judeci.",
    },
    {
      id: "a4_10",
      type: "memory_verse",
      order: 10,
      scripture: { text: "Oile Mele ascultă glasul Meu.", ref: "Ioan 10:27" },
    },
  ],
}

export const aproapeL5: Lesson = {
  id: "aproape_l5",
  courseId: "path_aproape",
  order: 5,
  title: "Cum citesc, ca sa nu fie degeaba",
  estMinutes: 12,
  anchorRefs: ["2 Timotei 3:16-17", "Psalmul 119:105", "Luca 24:27"],
  memoryVerseRef: "Psalmul 119:105",
  steps: [
    {
      id: "a5_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum esti azi? Ai reusit cele trei minute?" }],
    },
    {
      id: "a5_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Cel mai frecvent motiv pentru care oamenii nu mai citesc Biblia nu e lenea. E ca au incercat si nu au inteles nimic.",
        },
        {
          from: "guide",
          text:
            "De obicei pentru ca au inceput de la Geneza si au murit la Levitic, intre reguli despre lepra si jertfe.",
        },
        { from: "guide", text: "Azi îți dau o metoda. Nu e complicata si nu e a mea." },
      ],
    },
    {
      id: "a5_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "Intai, de unde se incepe. Nu de la pagina 1. Biblia nu e un roman.",
        },
        {
          from: "guide",
          text:
            "Incepe cu o Evanghelie — Ioan sau Marcu. Îl cunosti pe El intai. Apoi Psalmii, cate unul, pentru rugaciune. Apoi o scrisoare scurta, Filipeni sau 1 Ioan.",
        },
        {
          from: "guide",
          text: "Vechiul Testament dupa aceea, cand ai in cap cine e Cel despre care vorbeste tot.",
        },
      ],
    },
    {
      id: "a5_4",
      type: "how_god_helps",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Metoda, pe un singur paragraf pe zi. Nu pe un capitol. Patru intrebari, in ordine:",
        },
        { from: "guide", text: "1. Ce SPUNE, de fapt? Reciteste si spune-o cu cuvintele tale." },
        { from: "guide", text: "2. Ce arata despre Dumnezeu? Ce fel de Persoana e Cel din textul asta?" },
        { from: "guide", text: "3. Ce arata despre om, despre mine?" },
        { from: "guide", text: "4. Ce fac azi cu asta? Un lucru, concret, pana seara." },
      ],
    },
    {
      id: "a5_5",
      type: "scripture",
      order: 5,
      scripture: {
        text:
          "Toata Scriptura este insuflata de Dumnezeu si de folos ca sa invețe, sa mustre, sa indrepte, sa dea ințelepciune in neprihanire.",
        ref: "2 Timotei 3:16",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Patru verbe: invața, mustra, indrepta, da ințelepciune. Doua sunt plăcute, doua nu.",
        },
        {
          from: "guide",
          text:
            "Deci dacă citesti si te deranjeaza ceva, functioneaza. Nu e un text de incurajare, e un text care lucreaza.",
        },
      ],
    },
    {
      id: "a5_6",
      type: "truth_simple",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text:
            "«Cuvantul Tau este o candela pentru picioarele mele si o lumina pe calea mea» (Psalmul 119:105).",
        },
        {
          from: "guide",
          text:
            "O candela din vremea aceea lumina cam un pas inainte. Nu tot drumul, nu urmatorii zece ani.",
        },
        {
          from: "guide",
          text:
            "De aia cauta «pasul de azi» cand citesti, nu planul vietii tale. Cine cere harta cand i s-a dat lanterna se supara degeaba.",
        },
      ],
    },
    {
      id: "a5_7",
      type: "quiz",
      order: 7,
      quiz: {
        question: "Care e a doua intrebare din metoda?",
        options: [
          { text: "Ce simt cand citesc asta?", correct: false },
          { text: "Ce arata textul despre Dumnezeu?", correct: true },
          { text: "Cui pot trimite versetul?", correct: false },
          { text: "Ce reguli trebuie sa respect?", correct: false },
        ],
        explanation:
          "Ordinea conteaza. Daca sari direct la «ce fac eu», Biblia devine un manual de reguli. Daca intrebi intai ce arata despre El, ascultarea vine din cine e El, nu din frica — si de-aia tine.",
      },
    },
    {
      id: "a5_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Si o cheie pe care a dat-o Iisus insuși, pe drumul spre Emaus: «le-a talcuit, in toate Scripturile, ce era cu privire la El» (Luca 24:27).",
        },
        {
          from: "guide",
          text:
            "Deci intrebarea care descuie orice pasaj greu, inclusiv din Vechiul Testament, e: unde e Hristos in textul asta?",
        },
        {
          from: "guide",
          text: "Cei doi de pe drum nu au inteles nimic pana nu le-a aratat asta. Si au mers cu El kilometri fara sa Îl recunoasca.",
        },
      ],
    },
    {
      id: "a5_9",
      type: "step",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi: un paragraf din Ioan 1, trecut prin cele patru intrebari, in scris. Zece minute. Nu mai mult.",
        },
      ],
    },
    {
      id: "a5_10",
      type: "prayer",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "«Doamne, deschide-mi ochii cand citesc. Nu vreau informație, vreau sa Te cunosc.»",
        },
      ],
    },
    {
      id: "a5_11",
      type: "memory_verse",
      order: 11,
      scripture: { text: "Cuvantul Tau este o candela pentru picioarele mele.", ref: "Psalmul 119:105" },
    },
  ],
}

export const aproapeL6: Lesson = {
  id: "aproape_l6",
  courseId: "path_aproape",
  order: 6,
  title: "Flacara care s-a stins",
  estMinutes: 11,
  anchorRefs: ["Apocalipsa 2:4-5", "Osea 6:3", "Luca 24:32"],
  memoryVerseRef: "Apocalipsa 2:5",
  steps: [
    {
      id: "a6_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum esti azi?" }],
    },
    {
      id: "a6_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Poate ai avut o perioada in care totul ardea. Te trezeai cu bucurie, citeai cu foame, vorbeai despre El tuturor.",
        },
        {
          from: "guide",
          text: "Si acum faci aceleasi lucruri, dar din inertie. Ceea ce doare cel mai mult e ca știi cum era.",
        },
      ],
    },
    {
      id: "a6_3",
      type: "scripture",
      order: 3,
      scripture: {
        text:
          "Dar ce am impotriva ta este ca ti-ai parasit dragostea dintai. Adu-ți dar aminte de unde ai cazut, pocaieste-te si intoarce-te la faptele tale de la inceput.",
        ref: "Apocalipsa 2:4-5",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "E adresata unei biserici harnice. Nu leneșa, nu imorala — muncea, rezista, verifica doctrina. Si totusi ii lipsea exact ce ți lipsește.",
        },
        {
          from: "guide",
          text: "Deci se poate ca activitatea sa creasca in timp ce dragostea scade. Nu se compenseaza una cu alta.",
        },
      ],
    },
    {
      id: "a6_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Si uita-te la rețeta pe care o da. Trei verbe, si al treilea e surprinzator:",
        },
        {
          from: "guide",
          text: "1. «Adu-ți aminte de unde ai cazut.» Nu ca sa te chinui — ca sa știi ce cauti.",
        },
        {
          from: "guide",
          text: "2. «Pocaieste-te.» Adica intoarce-te, schimba direcția. Nu «simte-te vinovat».",
        },
        {
          from: "guide",
          text:
            "3. «Fa faptele tale de la inceput.» Nu «simte ce simteai la inceput». FA. Ce facea omul acela? Vorbea cu El, citea, spunea altora, ajuta pe cineva. Fa exact acelea, fara simtire.",
        },
      ],
    },
    {
      id: "a6_5",
      type: "quiz",
      order: 5,
      quiz: {
        question: "Ce se cere celui care si-a pierdut dragostea dintai?",
        options: [
          { text: "Sa aspepte pana revine simtirea", correct: false },
          { text: "Sa faca faptele de la inceput — actițunea inaintea simtirii", correct: true },
          { text: "Sa munceasca mai mult in biserica", correct: false },
          { text: "Sa se retraga o vreme, pana se lamureste", correct: false },
        ],
        explanation:
          "Biserica din Efes muncea deja mult — nu i s-a cerut mai mult efort, i s-a cerut intoarcerea la lucrurile simple de la inceput. Simtirea urmeaza faptele, aproape niciodata invers. La fel e in orice relație lunga.",
      },
    },
    {
      id: "a6_6",
      type: "world_vs_truth",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text:
            "Lumea spune: dacă nu mai simti, s-a terminat, mergi mai departe. Se spune despre relații, si de aia se rup atatea casnicii la anul cinci.",
        },
        {
          from: "guide",
          text:
            "In realitate, orice relație lunga trece prin perioade fara flacara. Ce o duce dincolo nu e intensitatea, e statornicia — timpul petrecut impreuna cand nu e spectaculos.",
        },
        {
          from: "guide",
          text: "E acelasi lucru aici, si de aia relația cu El nu e un obicei, e o casnicie.",
        },
      ],
    },
    {
      id: "a6_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Sa cunoastem, sa caUtam sa cunoastem pe Domnul! Caci El Se iveste ca zorile diminetii si va veni la noi ca o ploaie.",
        ref: "Osea 6:3",
      },
      bubbles: [
        {
          from: "guide",
          text: "«Ca zorile» — zorile nu se intampla intr-o secunda. Vin, incet, si nu se pot grabi.",
        },
        {
          from: "guide",
          text: "Iar verbul e la persoana intai plural si repetat: sa cunoastem, sa caUtam sa cunoastem. E o urmarire, nu o asteptare.",
        },
      ],
    },
    {
      id: "a6_8",
      type: "step",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi: scrie trei lucruri pe care le faceai la inceput si nu le mai faci. Alege UNUL si fa-l azi, exact cum il faceai.",
        },
        {
          from: "guide",
          text: "Fara sa aspepti sa îți vina chef. Cheful vine dupa, si de obicei mult dupa.",
        },
      ],
    },
    {
      id: "a6_9",
      type: "how_god_helps",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text:
            "Și inca ceva, de pe drumul spre Emaus. Cei doi au spus dupa: «nu ne ardea inima in noi cand ne vorbea pe drum?» (Luca 24:32).",
        },
        {
          from: "guide",
          text:
            "Au simtit ce simteau in timp ce El le deschidea Scripturile. Nu inainte. Focul a venit din text, nu dintr-o experienta separata.",
        },
        {
          from: "guide",
          text: "Si abia la masa L-au recunoscut. Mergeau cu El de ore și credeau ca sunt singuri. Exact ca tu, in perioada asta.",
        },
      ],
    },
    {
      id: "a6_10",
      type: "prayer",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "«Doamne, m-am racit si știu. Nu aspept sa simt. Ma intorc la ce faceam la inceput — vino Tu la mine ca ploaia.»",
        },
      ],
    },
    {
      id: "a6_11",
      type: "journal",
      order: 11,
      journalPrompt: "Ce faceai la inceput si nu mai faci? Și care din ele il reiei azi?",
    },
    {
      id: "a6_12",
      type: "memory_verse",
      order: 12,
      scripture: { text: "Intoarce-te la faptele tale de la inceput.", ref: "Apocalipsa 2:5" },
    },
  ],
}

export const aproapeL7: Lesson = {
  id: "aproape_l7",
  courseId: "path_aproape",
  order: 7,
  title: "Statornicia",
  estMinutes: 11,
  anchorRefs: ["Galateni 6:9", "Evrei 10:23", "Ioan 15:4-5"],
  memoryVerseRef: "Galateni 6:9",
  steps: [
    {
      id: "a7_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Ultima din drumul asta. Cum esti azi?" }],
    },
    {
      id: "a7_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Ai intrat aici cu «nu mă aude». Nu îți promit că de maine simti foc. Nu asta e ce cauta un om matur.",
        },
        {
          from: "guide",
          text: "Ce cauti e ceva care tine si in ianuarie, nu doar in aprilie. Despre asta e ultima lectie.",
        },
      ],
    },
    {
      id: "a7_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Sa nu obosim in facerea binelui; caci, la vremea potrivita, vom culege, dacă nu vom cadea de oboseala.",
        ref: "Galateni 6:9",
      },
      bubbles: [
        {
          from: "guide",
          text: "«La vremea potrivita» — nu la vremea pe care o alegi tu. Asta e partea grea.",
        },
        {
          from: "guide",
          text:
            "Un agricultor nu sapa samanța a treia zi ca sa verifice. Sub pamant se intampla ceva ce nu se vede si nu se poate grabi.",
        },
      ],
    },
    {
      id: "a7_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "De aia ritmul bate intensitatea. Zece minute in fiecare zi bat trei ore o data pe luna.",
        },
        {
          from: "guide",
          text:
            "Și nu e vorba de ritual. Nimeni nu numeste «ritual» faptul că mananci in fiecare zi sau că vorbesti cu omul cu care trăiești. E doar felul in care funcționeaza orice relație vie.",
        },
        {
          from: "guide",
          text: "Un stalp, nu o obligație.",
        },
      ],
    },
    {
      id: "a7_5",
      type: "scripture",
      order: 5,
      scripture: {
        text: "Sa ținem fara sovaire la marturisirea nadejdii noastre, caci credincios este Cel ce a facut fagaduința.",
        ref: "Evrei 10:23",
      },
      bubbles: [
        {
          from: "guide",
          text: "Motivul pentru care poti rami nu e ca tu esti tare. E ca El e credincios.",
        },
        {
          from: "guide",
          text: "Nu te ții tu de El cu unghiile. Te ține El, si de-aia poți trece o iarna intreaga fara sa cazi.",
        },
      ],
    },
    {
      id: "a7_6",
      type: "quiz",
      order: 6,
      quiz: {
        question: "Ce e mai important pentru o relație care tine?",
        options: [
          { text: "Momentele intense, oricat de rare", correct: false },
          { text: "Statornicia — puțin, in fiecare zi, si cand nu simti", correct: true },
          { text: "Sa nu ai niciodata perioade goale", correct: false },
          { text: "Sa citesti cat mai multe capitole", correct: false },
        ],
        explanation:
          "Ioan 15 spune «ramaneti in Mine» — verbul e «meno», a locui, nu a vizita. O mladita nu se lipeste de vita cand are chef. Roada nu vine din intensitate, vine din a nu pleca.",
      },
    },
    {
      id: "a7_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "Ce rămâne cu tine din drumul asta, in patru rânduri:",
        },
        { from: "guide", text: "Prezența Lui e o promisiune, nu o senzatie." },
        { from: "guide", text: "Cand tace, te plangi — Lui, nu despre El — si rami." },
        { from: "guide", text: "Verifici o data, cu El, si nu te mai cauti la infinit." },
        { from: "guide", text: "Faci faptele de la inceput inainte sa simti ce simteai la inceput." },
      ],
    },
    {
      id: "a7_8",
      type: "step",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi: alege ora si locul. Scrie-le. Zece minute, in fiecare zi, la aceeași ora. Cinci minute de citit dupa metoda, cinci de vorbit cu El.",
        },
        {
          from: "guide",
          text:
            "Și pune-o in calendar ca pe o intalnire cu cineva pe care nu Îl anulezi.",
        },
      ],
    },
    {
      id: "a7_9",
      type: "prayer",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "«Doamne, nu mai alerg dupa simtire. Rămân. Tu esti credincios si eu vin in fiecare zi.»",
        },
      ],
    },
    {
      id: "a7_10",
      type: "journal",
      order: 10,
      journalPrompt:
        "Reciteste ce ai scris in prima lectie. Ce s-a schimbat? Și scrie ora la care te vezi cu El de acum.",
      bubbles: [
        {
          from: "guide",
          text:
            "Drumul asta s-a terminat. Relația, nu. Ce ai scris ramane al tau, oricare drum alegi mai departe.",
        },
      ],
    },
    {
      id: "a7_11",
      type: "memory_verse",
      order: 11,
      scripture: { text: "Sa nu obosim in facerea binelui; la vremea potrivita, vom culege.", ref: "Galateni 6:9" },
    },
  ],
}

export const APROAPE_LESSONS: Lesson[] = [
  aproapeL1,
  aproapeL2,
  aproapeL3,
  aproapeL4,
  aproapeL5,
  aproapeL6,
  aproapeL7,
]
