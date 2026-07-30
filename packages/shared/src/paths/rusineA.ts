import type { Lesson } from "../domain.js"

/*
 * CAMERA 1 — "Nu ma vrea asa cum sunt" / minciuna: "Sunt prea murdar pentru El."
 * Drumul: path_acasa. Lectiile 1-4 aici, 5-7 in rusineB.ts.
 *
 * Usi care duc aici: rusine, avort, infidelitate, pornografie, prea_departe.
 *
 * ORDINEA (docs/21 §2): camera NU incepe cu pacatul omului. Incepe cu cine e
 * Dumnezeu, spus prin rana asta: El S-a miscat primul, cand omul era inca murdar.
 * Cine crede ca trebuie sa se curete inainte de a veni nu va veni niciodata.
 *
 * VOCEA (docs/22 §10): ghidul e Emanus. Fara nume de om, fara "eu am trecut prin
 * asta", fara pretentia ca citeste ce scrie omul.
 *
 * SIGURANTA (docs/22 §1, §2, §4):
 *  - nu cerem nimanui sa mearga si sa spuna cuiva ce a facut (marturisirea catre
 *    oameni e in L5 si e explicit opriuonala, cu avertisment);
 *  - nu cerem contact cu cineva care i-a facut rau;
 *  - avortul si abuzul sexual se ating cu avertisment inainte si cu numere reale;
 *  - nu promitem ca dispare durerea. Promitem ca nu mai e singur in ea.
 *  - DE FACUT (docs/22 §2): ecran de avertisment separat inaintea lectiilor 5 si 6,
 *    in UI. Pana atunci, avertismentul e primul pas al lectiei.
 */

export const rusineL1: Lesson = {
  id: "rusine_l1",
  courseId: "path_acasa",
  order: 1,
  title: "El S-a miscat primul",
  estMinutes: 10,
  anchorRefs: ["Luca 15:20", "Romani 5:8", "Luca 19:10"],
  memoryVerseRef: "Romani 5:8",
  steps: [
    {
      id: "r1_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Bine ca ai apasat." },
        {
          from: "guide",
          text:
            "Nu te intreb ce ai facut. Nu am nevoie sa stiu si nu se scrie nicaieri. Ce scrii aici ramane in telefonul tau — nu citeste nimeni.",
        },
        { from: "guide", text: "Doar atat, ca sa stiu cum sa merg langa tine: cum esti azi?" },
      ],
    },
    {
      id: "r1_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Ai un gand pe care probabil nu l-ai spus nimanui: «pe mine nu m-ar mai vrea».",
        },
        {
          from: "guide",
          text: "Sau varianta mai blanda: «poate pe alti, dar nu dupa ce am facut eu».",
        },
        { from: "guide", text: "Vreau sa incep de acolo, nu de la ce ai facut." },
      ],
    },
    {
      id: "r1_3",
      type: "choice",
      order: 3,
      choice: {
        prompt: "Ca sa fie clar de unde pornim — care propozitie seamana mai mult cu tine?",
        options: [
          { id: "r1c_a", label: "M-ar primi, dar nu asa cum sunt acum" },
          { id: "r1c_b", label: "Cred ca am trecut linia. Pe mine nu." },
          { id: "r1c_c", label: "Nu stiu ce cred. Mi-e doar rusine." },
        ],
      },
    },
    {
      id: "r1_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text:
            "Toate trei au acelasi mecanism dedesubt: mai intai ma curat, apoi ma duc.",
        },
        {
          from: "guide",
          text:
            "Asa functioneaza aproape orice religie a lumii: urci scarile si sus te asteapta Dumnezeu, sa vada cat ai reusit.",
        },
        {
          from: "guide",
          text: "Ce urmeaza e povestea unui om care nu a mai ajuns sa urce scarile.",
        },
      ],
    },
    {
      id: "r1_5",
      type: "scripture",
      order: 5,
      scripture: {
        text:
          "Cand era inca departe, tatal sau l-a vazut si i s-a facut mila de el, a alergat de i-a cazut pe gat si l-a sarutat mult.",
        ref: "Luca 15:20",
      },
      bubbles: [
        {
          from: "guide",
          text: "Fiul venea acasa cu un discurs pregatit. Il repetase pe drum.",
        },
        {
          from: "guide",
          text:
            "«Nu mai sunt vrednic sa ma numesc fiul tau, fa-ma ca pe unul din argatii tai.» Adica: primeste-ma ca angajat, nu ca fiu. Merit mai putin.",
        },
        {
          from: "guide",
          text: "Nu a apucat sa termine. Tatal alerga deja spre el. Cand era INCA departe.",
        },
      ],
    },
    {
      id: "r1_6",
      type: "truth_simple",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text:
            "Ceva ce se pierde in traducere: in cultura de atunci, un om cu varsta si cu demnitate nu alerga niciodata in public. Ca sa alergi, trebuia sa iti ridici haina lunga. Era o umilinta.",
        },
        {
          from: "guide",
          text:
            "Tatal a ales sa se faca de rusine el, in fata satului, ca sa ajunga la fiu inainte sa ajunge sătul la el.",
        },
        { from: "guide", text: "Nu a asteptat sa se spele. L-a sarutat murdar de porci." },
      ],
    },
    {
      id: "r1_7",
      type: "scripture",
      order: 7,
      scripture: {
        text:
          "Dar Dumnezeu Isi arata dragostea fata de noi prin faptul ca, pe cand eram noi inca pacatosi, Hristos a murit pentru noi.",
        ref: "Romani 5:8",
      },
      bubbles: [
        { from: "guide", text: "Uita-te la doua cuvinte: «inca pacatosi»." },
        {
          from: "guide",
          text:
            "Nu «dupa ce s-au facut buni». Nu «cand au promis ca se schimba». Inca. In starea in care nu voiai sa te vada nimeni.",
        },
        {
          from: "guide",
          text: "Daca a facut asta atunci, ce te face sa crezi ca acum S-a razgandit?",
        },
      ],
    },
    {
      id: "r1_8",
      type: "quiz",
      order: 8,
      quiz: {
        question: "Ce a asteptat tatal din pilda inainte sa alerge la fiul lui?",
        options: [
          { text: "Sa se spele si sa se imbrace curat", correct: false },
          { text: "Sa isi termine scuzele si sa promita ca nu mai face", correct: false },
          { text: "Nimic. A alergat cand fiul era inca departe si inca murdar.", correct: true },
          { text: "Sa treaca o perioada de proba ca argat", correct: false },
        ],
        explanation:
          "Fiul avea pregatita si oferta de a fi angajat, nu fiu. Tatal nu l-a lasat sa o spuna pana la capat. Asta e ordinea evangheliei: nu te cureti ca sa fii primit, esti primit si de acolo incepe curatirea.",
      },
    },
    {
      id: "r1_9",
      type: "how_god_helps",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text:
            "Iisus Si-a descris singur meseria intr-o propozitie: «Fiul omului a venit sa caute si sa mantuiasca ce era pierdut» (Luca 19:10).",
        },
        {
          from: "guide",
          text:
            "A spus-o in casa unui om pe care tot orasul il ura, un vames, dupa ce a intrat la el la masa fara sa fie invitat.",
        },
        {
          from: "guide",
          text: "Nu te-a gasit murdar si S-a intors din drum. Te-a căutat murdar. Aia e treaba Lui.",
        },
      ],
    },
    {
      id: "r1_10",
      type: "prayer",
      order: 10,
      bubbles: [
        { from: "guide", text: "Nu e nevoie de cuvinte frumoase. Poti spune exact asta:" },
        {
          from: "guide",
          text: "«Doamne, nu ma pot curata singur. Vino la mine asa cum sunt acum.»",
        },
        {
          from: "guide",
          text:
            "Daca nu poti spune inca «vino», spune «as vrea sa pot spune asta». E si aia o rugaciune si o aude.",
        },
      ],
    },
    {
      id: "r1_11",
      type: "journal",
      order: 11,
      journalPrompt:
        "Un rand, doar pentru tine: ce crezi ca s-ar schimba in tine daca ai fi sigur ca nu trebuie sa te cureti inainte sa vii?",
      bubbles: [
        {
          from: "guide",
          text: "Nu-l citeste nimeni. Scrie-l ca sa il recitesti tu peste doua saptamani.",
        },
      ],
    },
    {
      id: "r1_12",
      type: "memory_verse",
      order: 12,
      scripture: { text: "Pe cand eram noi inca pacatosi, Hristos a murit pentru noi.", ref: "Romani 5:8" },
      bubbles: [
        { from: "guide", text: "Atat pentru azi. Un singur lucru pe zi e de ajuns." },
        {
          from: "guide",
          text: "Maine nu inveti nimic nou. Maine il duci pe strada.",
        },
      ],
    },
  ],
}

export const rusineL2: Lesson = {
  id: "rusine_l2",
  courseId: "path_acasa",
  order: 2,
  title: "Rusinea nu e de la El",
  estMinutes: 11,
  anchorRefs: ["Geneza 3:7-10", "Geneza 3:21", "Ioan 3:17"],
  memoryVerseRef: "Ioan 3:17",
  steps: [
    {
      id: "r2_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Te-ai intors. Bine." },
        { from: "guide", text: "Cum a fost cu propozitia de ieri? Cum esti azi?" },
      ],
    },
    {
      id: "r2_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Azi separam doua lucruri pe care limba romana le amesteca: vina si rusinea.",
        },
        { from: "guide", text: "Vina spune: «am facut un lucru rau»." },
        { from: "guide", text: "Rusinea spune: «sunt un lucru rau»." },
        {
          from: "guide",
          text:
            "Prima se poate rezolva. A doua te face sa te ascunzi — si cine se ascunde nu se mai poate rezolva.",
        },
      ],
    },
    {
      id: "r2_3",
      type: "name_struggle",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "Uite cum se aude rusinea in cap, ca sa o recunosti cand vine:",
        },
        {
          from: "guide",
          text:
            "«Daca ar sti cine sunt de fapt, ar pleca.» · «Sunt un ipocrit.» · «Ceilalti se lupta, eu sunt stricat.» · «Mai bine nu ma mai rog, ca oricum nu am fata.»",
        },
        {
          from: "guide",
          text: "Observa ceva: niciuna nu vorbeste despre o fapta. Toate vorbesc despre cine esti.",
        },
      ],
    },
    {
      id: "r2_4",
      type: "scripture",
      order: 4,
      scripture: {
        text:
          "Si-au cusut invelitori din frunze de smochin. Si omul si femeia sa s-au ascuns de Fata Domnului Dumnezeu printre copacii din grădina.",
        ref: "Geneza 3:7-8",
      },
      bubbles: [
        {
          from: "guide",
          text: "Prima reactie a omului la pacat nu a fost sa ceara iertare. A fost sa se acopere si sa fuga.",
        },
        {
          from: "guide",
          text:
            "Si observa cine a vorbit primul: «Adame, unde esti?» Dumnezeu stia unde e. Intrebarea nu era pentru informatie. Era o chemare.",
        },
        { from: "guide", text: "El a cautat, omul se ascundea. De atunci, mereu asa." },
      ],
    },
    {
      id: "r2_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Acum uita-te la ce se intampla cateva versete mai jos, in Geneza 3:21.",
        },
        {
          from: "guide",
          text:
            "«Domnul Dumnezeu a facut omului si femeii haine de piele si i-a imbracat cu ele.»",
        },
        {
          from: "guide",
          text:
            "Frunzele au fost soluția omului. Nu ii aduna nimeni frunzele. El le-a inlocuit. Dar ca sa fie piele, a murit un animal. Prima moarte din Biblie a fost ca sa fie acoperita rusinea unui om.",
        },
        {
          from: "guide",
          text: "De atunci pana la cruce, e aceeasi propoziție spusa mai tare.",
        },
      ],
    },
    {
      id: "r2_6",
      type: "quiz",
      order: 6,
      quiz: {
        question: "Care e diferenta practica dintre vina si rusine?",
        options: [
          { text: "Sunt acelasi lucru, doar cuvinte diferite", correct: false },
          {
            text: "Vina e despre ce am facut si te duce la Dumnezeu; rusinea e despre cine sunt si te face sa te ascunzi de El",
            correct: true,
          },
          { text: "Vina e de la oameni, rusinea e de la Dumnezeu", correct: false },
          { text: "Rusinea e mai buna, arata ca iti pasa mai mult", correct: false },
        ],
        explanation:
          "Vina e utila: numeste o fapta si are rezolvare. Rusinea nu numeste nimic, doar te condamna in bloc si te trimite in tufisuri, ca pe Adam. De aia rusinea nu produce niciodata schimbare — produce doar ascundere si, de obicei, o cadere in plus.",
      },
    },
    {
      id: "r2_7",
      type: "scripture",
      order: 7,
      scripture: {
        text:
          "Dumnezeu, in adevar, n-a trimis pe Fiul Sau in lume ca sa judece lumea, ci ca lumea sa fie mantuita prin El.",
        ref: "Ioan 3:17",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Multi cunosc versetul 16 si sar peste 17. Al 17-lea rezolva o frica: «bine, ma iubeste, dar cand ma uit in sus vad un judecator».",
        },
        {
          from: "guide",
          text: "Scopul venirii Lui, spus de El: nu sa judece, ci sa scoata afara.",
        },
      ],
    },
    {
      id: "r2_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Deci ai doua voci in cap si trebuie sa le deosebesti, pentru ca amandoua par serioase.",
        },
        {
          from: "guide",
          text:
            "Vocea Lui e specifica si are ieșire: «asta ai facut, nu e bine, hai sa o punem in ordine». Te intoarce.",
        },
        {
          from: "guide",
          text:
            "Cealalta e generala si nu are ieșire: «esti un dezastru, nu te schimbi niciodata, degeaba». Te izoleaza.",
        },
        {
          from: "guide",
          text: "Testul e simplu: care dintre ele te trage spre El si care te trage in tufisuri.",
        },
      ],
    },
    {
      id: "r2_9",
      type: "step",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "Un lucru concret pentru astazi, nu o tema de gandit:",
        },
        {
          from: "guide",
          text:
            "Cand vine propozitia «sunt un dezastru», nu te certa cu ea si nu o crede. Tradu-o. Intreaba-te: ce fapta anume? Numeste-o cu un cuvant.",
        },
        {
          from: "guide",
          text:
            "Cu o fapta numita se poate merge la Dumnezeu. Cu «sunt un dezastru» nu se poate merge nicaieri.",
        },
      ],
    },
    {
      id: "r2_10",
      type: "prayer",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "«Doamne, nu mai vreau frunze. Imbraca-Tu ce am eu de acoperit.»",
        },
      ],
    },
    {
      id: "r2_11",
      type: "journal",
      order: 11,
      journalPrompt:
        "Scrie propozitia pe care ti-o spune rusinea cel mai des. Doar propozitia. Vom reveni la ea in lectia a sasea.",
    },
    {
      id: "r2_12",
      type: "memory_verse",
      order: 12,
      scripture: { text: "N-a trimis pe Fiul Sau in lume ca sa judece lumea, ci ca lumea sa fie mantuita prin El.", ref: "Ioan 3:17" },
      bubbles: [{ from: "guide", text: "Atat. Ne vedem cand revii." }],
    },
  ],
}

export const rusineL3: Lesson = {
  id: "rusine_l3",
  courseId: "path_acasa",
  order: 3,
  title: "S-a ispravit",
  estMinutes: 11,
  anchorRefs: ["Isaia 53:5-6", "Ioan 19:30", "Coloseni 2:13-14"],
  memoryVerseRef: "Coloseni 2:14",
  steps: [
    {
      id: "r3_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Cum esti azi?" },
        {
          from: "guide",
          text: "Ai reusit sa traduci macar o data «sunt un dezastru» intr-o fapta anume?",
        },
      ],
    },
    {
      id: "r3_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Multi oameni cred, in teorie, ca Dumnezeu iarta. Si totusi se simt in continuare cu datorie. Ca cineva care a plătit ipoteca dar tot se trezeste noaptea cu frica de rata.",
        },
        {
          from: "guide",
          text: "Azi ne uitam la ce s-a intamplat exact cu datoria. Nu la ce simti tu despre ea.",
        },
      ],
    },
    {
      id: "r3_3",
      type: "scripture",
      order: 3,
      scripture: {
        text:
          "El era strapuns pentru pacatele noastre, zdrobit pentru fardelegile noastre. Pedeapsa care ne da pacea a cazut peste El, si prin ranile Lui suntem tamaduiti.",
        ref: "Isaia 53:5",
      },
      bubbles: [
        {
          from: "guide",
          text: "Textul asta s-a scris cu sapte sute de ani inainte de cruce.",
        },
        {
          from: "guide",
          text:
            "Numara prepozitiile: pentru pacatele noastre, pentru fardelegile noastre, peste El. E un transfer, nu o metafora.",
        },
      ],
    },
    {
      id: "r3_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text:
            "Pe cruce, ultimul lucru pe care l-a spus Iisus a fost un singur cuvant in greaca: «tetelestai» (Ioan 19:30). Se traduce «s-a ispravit», dar nu era un cuvant religios.",
        },
        {
          from: "guide",
          text:
            "Era un cuvant de comert. Se scria pe un act de datorie cand suma fusese incasata integral. «Plătit. Nu se mai datoreaza nimic.»",
        },
        {
          from: "guide",
          text:
            "Nu a spus «am facut ce am putut» sau «acum e rândul vostru». A spus «plătit in intregime».",
        },
      ],
    },
    {
      id: "r3_5",
      type: "scripture",
      order: 5,
      scripture: {
        text:
          "A sters zapisul cu poruncile lui, care sta impotriva noastra si ne era potrivnic, si l-a nimicit pironindu-l pe cruce.",
        ref: "Coloseni 2:14",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "«Zapisul» era hartia semnata de mana ta, in care recunoșteai ce datorezi. Lista, cu scrisul tau pe ea.",
        },
        {
          from: "guide",
          text: "Nu spune ca a ignorat lista. Spune ca a batut-o in cuie pe cruce. A pus-o unde s-a plătit.",
        },
      ],
    },
    {
      id: "r3_6",
      type: "quiz",
      order: 6,
      quiz: {
        question: "Ce insemna cuvantul «tetelestai», spus de Iisus pe cruce?",
        options: [
          { text: "«Am terminat, nu mai pot»", correct: false },
          { text: "«Plătit integral» — se scria pe actele de datorie incasate", correct: true },
          { text: "«Restul depinde de tine»", correct: false },
          { text: "«Iertati-i, ca nu stiu ce fac»", correct: false },
        ],
        explanation:
          "Era un termen comercial. De aia nu exista, in creștinism, o parte din datorie pe care sa o achiti tu prin fapte, penitenta sau suferinta. Ori a fost plătita integral, ori nu a fost plătita — si El a spus care din doua.",
      },
    },
    {
      id: "r3_7",
      type: "world_vs_truth",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "Aici se strecoara o idee care pare evlavioasa si nu e: «trebuie sa plătesc si eu ceva».",
        },
        {
          from: "guide",
          text:
            "Ea se vede in lucruri concrete: te pedepsesti singur, amâni rugaciunea pana te simti mai bun, faci bine ca sa echilibrezi balanta, tii minte lista ta cand El a rupt-o.",
        },
        {
          from: "guide",
          text:
            "Daca ai putea plăti tu o parte, atunci crucea a fost o exagerare. Nu se poate si una si alta.",
        },
      ],
    },
    {
      id: "r3_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Iertarea in Biblie nu e ca Dumnezeu se face ca nu a fost nimic. Cineva a plătit. De aia iertarea Lui nu se contrazice cu dreptatea Lui.",
        },
        {
          from: "guide",
          text:
            "Ce ai facut a fost real si a avut greutate. Atat de real ca a fost nevoie de cruce. Si atat de plătit ca nu mai ai de adaugat.",
        },
      ],
    },
    {
      id: "r3_9",
      type: "step",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi: cand iti vine in minte fapta pe care nu ti-o poti scoate din cap, nu o discuta cu tine. Spune cu voce tare, o data: «s-a plătit».",
        },
        {
          from: "guide",
          text:
            "Nu ca sa o minimizezi. Ca sa nu o mai plătesti a doua data, cand ai bonul.",
        },
      ],
    },
    {
      id: "r3_10",
      type: "prayer",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "«Doamne, nu mai plătesc ce ai plătit Tu. Iti mulțumesc ca s-a isprăvit.»",
        },
      ],
    },
    {
      id: "r3_11",
      type: "memory_verse",
      order: 11,
      scripture: { text: "A sters zapisul care sta impotriva noastra si l-a nimicit pironindu-l pe cruce.", ref: "Coloseni 2:14" },
    },
  ],
}

export const rusineL4: Lesson = {
  id: "rusine_l4",
  courseId: "path_acasa",
  order: 4,
  title: "Nu esti ce ai facut",
  estMinutes: 11,
  anchorRefs: ["Ioan 8:3-11", "2 Corinteni 5:17", "Ioan 4:16-19"],
  memoryVerseRef: "2 Corinteni 5:17",
  steps: [
    {
      id: "r4_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum esti azi?" }],
    },
    {
      id: "r4_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Exista o diferenta intre «am mintit» si «sunt un mincinos». Intre «am cazut» si «sunt un dependent». Intre «am facut» si «sunt».",
        },
        {
          from: "guide",
          text:
            "Oamenii care te cunosc te-au numit poate cu a doua varianta. Poate ai inceput sa te numesti si tu.",
        },
        { from: "guide", text: "Azi ne uitam la cum vorbeste Iisus cu cineva prins in fapt." },
      ],
    },
    {
      id: "r4_3",
      type: "scripture",
      order: 3,
      scripture: {
        text:
          "«Invatatorule, femeia aceasta a fost prinsa chiar cand savarsea adulterul.» ... Iisus S-a plecat in jos si scria cu degetul pe pamant.",
        ref: "Ioan 8:4,6",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Au adus-o in mijloc. Au spus fapta cu voce tare, in fata tuturor. Exact coșmarul: sa te vada toti in ce ai facut.",
        },
        {
          from: "guide",
          text: "Iisus nu S-a uitat la ea. S-a aplecat si a scris pe pamant. Nu a facut spectacol din rusinea ei.",
        },
      ],
    },
    {
      id: "r4_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text:
            "Cand a vorbit, a spus doua propoziții care nu se despart niciodata: «Nici Eu nu te osandesc» si «du-te si sa nu mai pacatuiesti».",
        },
        {
          from: "guide",
          text:
            "Prima fara a doua e o mângâiere care te lasa in aceeași groapa. A doua fara prima e o povara care te zdrobește.",
        },
        {
          from: "guide",
          text: "El le-a spus in ordinea asta. Mai intai te ridica, apoi iti arata drumul.",
        },
      ],
    },
    {
      id: "r4_5",
      type: "choice",
      order: 5,
      choice: {
        prompt: "Sincer, care dintre cele doua ti-e mai greu sa o crezi?",
        options: [
          { id: "r4c_a", label: "«Nu te osandesc» — mie asta nu mi se aplica", branchStepId: "r4_6" },
          { id: "r4c_b", label: "«Sa nu mai faci» — eu am incercat si nu pot", branchStepId: "r4_7" },
        ],
      },
    },
    {
      id: "r4_6",
      type: "truth_simple",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text:
            "Daca nu ti se aplica tie, atunci trebuie sa existe o categorie de oameni prea murdari, iar Biblia nu o are.",
        },
        {
          from: "guide",
          text:
            "Cel care a scris jumatate din Noul Testament ii ucidea pe creștini. Cel pe care Iisus l-a pus sa conduca L-a negat de trei ori, ultima injurand.",
        },
        { from: "guide", text: "Nu exista lista de exceptii. Ai verificat-o si nu e." },
      ],
    },
    {
      id: "r4_7",
      type: "truth_simple",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text:
            "Ai dreptate ca nu poti. Nimeni nu poate cu voința. De aia ordinea conteaza: schimbarea vine DUPA ce esti primit, nu inainte, si nu o faci singur.",
        },
        {
          from: "guide",
          text:
            "Despre cum se rupe efectiv un obicei vorbim in alt drum, si nu cu «strange din dinti». Aici tinem un singur cui: nu esti fapta ta.",
        },
      ],
    },
    {
      id: "r4_8",
      type: "scripture",
      order: 8,
      scripture: {
        text:
          "Caci, daca este cineva in Hristos, este o făptura nouă. Cele vechi s-au dus: iata ca toate lucrurile s-au facut noi.",
        ref: "2 Corinteni 5:17",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "«Făptura noua» nu inseamna ca amintirile dispar sau ca nu mai ai lupte. Inseamna ca s-a schimbat de unde pornesti.",
        },
        {
          from: "guide",
          text:
            "Nu mai pornesti ca vinovat care incearca sa se reabiliteze. Pornesti ca fiu care are ceva de descurcat. Aceeasi zi, cu totul alt om in ea.",
        },
      ],
    },
    {
      id: "r4_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Iisus i-a spus femeii «nici Eu nu te osandesc». Ce a mai spus?",
        options: [
          { text: "Nimic altceva. A inchis subiectul.", correct: false },
          { text: "«Du-te si sa nu mai pacatuiesti» — dupa ce a ridicat condamnarea", correct: true },
          { text: "«Mergi si spune tuturor ce ai facut»", correct: false },
          { text: "«Ai o perioada de proba»", correct: false },
        ],
        explanation:
          "Cele doua stau mereu impreuna si in ordinea asta. Har fara chemare la schimbare te lasa in groapa; chemare la schimbare fara har te ingroapa. Iisus a facut si una si alta, in mai putin de un minut.",
      },
    },
    {
      id: "r4_10",
      type: "how_god_helps",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text:
            "Mai e un amanunt. Femeia de la put (Ioan 4) avea cinci căsătorii in urma si trăia cu un al șaselea om. Iisus i-a spus lucrul asta in fata, fara sa il inmoaie.",
        },
        {
          from: "guide",
          text:
            "Si totusi, cu ea a purtat cea mai lunga discuție teologica din evanghelii, si ei i-a spus primul, direct, ca El e Mesia.",
        },
        {
          from: "guide",
          text:
            "Nu i-a ascuns pacatul si nu a facut din el identitatea ei. Aia e diferenta pe care o inveti aici.",
        },
      ],
    },
    {
      id: "r4_11",
      type: "journal",
      order: 11,
      journalPrompt:
        "Scrie cum te numesti tu pe tine cand esti singur. Apoi scrie dedesubt: «asta am facut, nu asta sunt».",
    },
    {
      id: "r4_12",
      type: "prayer",
      order: 12,
      bubbles: [
        {
          from: "guide",
          text: "«Doamne, spune-mi Tu cine sunt. Am ascultat prea mult ce spun ceilalti si ce spun eu.»",
        },
      ],
    },
    {
      id: "r4_13",
      type: "memory_verse",
      order: 13,
      scripture: { text: "Daca este cineva in Hristos, este o făptura noua.", ref: "2 Corinteni 5:17" },
    },
  ],
}

export const RUSINE_A: Lesson[] = [rusineL1, rusineL2, rusineL3, rusineL4]
