import type { Lesson } from "../domain.js"

/*
 * CAMERA 1 — partea a doua. Lectiile 5-7 din path_acasa.
 *
 * ATENTIE, docs/22:
 *  - §2: lectia 5 si lectia 6 ating abuz, avort si autovatamare. Primul pas al
 *    fiecareia e AVERTISMENT, cu ieșire spre ajutor. Cand exista ecranul separat
 *    de avertisment in UI, pasul asta se muta acolo.
 *  - §0: propozitia "Emanus nu inlocuieste medicul, psihologul, poliția sau 112"
 *    apare in `r5_1` si `r6_1`. NENEGOCIABIL.
 *  - §1: nu punem vina pe om pentru un simptom care poate fi medical. Pasul
 *    `r6_9` trimite la medic si e NENEGOCIABIL.
 *  - §4: nu cerem nimanui sa se intoarca sau sa ia legatura cu cine i-a facut rau.
 *    Pasul `r5_8` e NENEGOCIABIL.
 */

export const rusineL5: Lesson = {
  id: "rusine_l5",
  courseId: "path_acasa",
  order: 5,
  title: "Să nu mai ascunzi",
  estMinutes: 12,
  anchorRefs: ["1 Ioan 1:9", "Psalmul 32:3-5", "Iacov 5:16"],
  memoryVerseRef: "1 Ioan 1:9",
  steps: [
    {
      id: "r5_1",
      type: "hook",
      order: 1,
      bubbles: [
        {
          from: "guide",
          text:
            "Inainte de orice: ce urmeaza atinge lucruri ascunse — inclusiv lucruri care ti s-au facut, nu doar ce ai facut tu. Poti opri oricand si poti reveni.",
        },
        {
          from: "guide",
          text:
            "Daca acum esti in pericol sau te gandesti sa iti faci rau: 112. Copii si adolescenti: 116 111. Suport emoțional: 116 123. Violența in familie: 0800 500 333.",
        },
        {
          from: "guide",
          text: "Emanus nu inlocuieste medicul, psihologul, poliția sau 112.",
        },
      ],
    },
    {
      id: "r5_2",
      type: "check_in",
      order: 2,
      bubbles: [{ from: "guide", text: "Cum esti azi?" }],
    },
    {
      id: "r5_3",
      type: "name_struggle",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text:
            "Cuvantul «mărturisire» a fost stricat pentru multi. Suna a interogatoriu, a genunchi, a cineva care afla ce ai facut si te privește altfel dupa.",
        },
        {
          from: "guide",
          text: "In Biblie e mult mai simplu de atat, si mult mai putin infricoșator.",
        },
      ],
    },
    {
      id: "r5_4",
      type: "scripture",
      order: 4,
      scripture: {
        text:
          "Daca ne marturisim pacatele, El este credincios si drept ca sa ne ierte pacatele si sa ne curateasca de orice nelegiuire.",
        ref: "1 Ioan 1:9",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Cuvantul din greaca e «homologeo»: «homo» = acelasi, «logos» = cuvant. A spune acelasi lucru.",
        },
        {
          from: "guide",
          text:
            "Adica: nu Il informezi pe Dumnezeu. El stie deja. Doar incetezi sa spui altceva decat El. Iesi din negociere.",
        },
        {
          from: "guide",
          text:
            "Si uita-te ce cuvant folosește pentru El: «drept». Nu «indurator». Nu iti face un favor cand te iarta — ar fi nedrept sa ceara plata a doua oara, dupa ce a fost plătit pe cruce.",
        },
      ],
    },
    {
      id: "r5_5",
      type: "scripture",
      order: 5,
      scripture: {
        text:
          "Cat am tacut, mi se topeau oasele... Atunci Ti-am marturisit pacatul meu si nu mi-am ascuns fardelegea. Si Tu ai iertat vina pacatului meu.",
        ref: "Psalmul 32:3,5",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "David scrie asta dupa adulter si dupa ce a aranjat moartea unui om. A tacut aproape un an.",
        },
        {
          from: "guide",
          text:
            "«Mi se topeau oasele» — descrie ce face ascunderea in corp. Insomnie, greutate in piept, oboseala fara motiv. Nu era poezie.",
        },
      ],
    },
    {
      id: "r5_6",
      type: "world_vs_truth",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Doua idei greșite despre asta, amandoua raspandite:",
        },
        {
          from: "guide",
          text:
            "Prima: «trebuie sa spun unui om anume ca sa fiu iertat». Nu. Iertarea vine de la Dumnezeu, direct, si nu are nevoie de intermediar (1 Timotei 2:5).",
        },
        {
          from: "guide",
          text:
            "A doua: «nu are rost sa spun nimanui niciodata». Iacov 5:16 spune sa ne marturisim unii altora pacatele — nu pentru iertare, ci pentru vindecare. Ce sta doar in cap se repeta.",
        },
      ],
    },
    {
      id: "r5_7",
      type: "quiz",
      order: 7,
      quiz: {
        question: "Ce inseamna, la origine, cuvantul tradus «marturisire»?",
        options: [
          { text: "A-ti primi pedeapsa", correct: false },
          { text: "A spune acelasi lucru — a nu mai contrazice ce spune Dumnezeu", correct: true },
          { text: "A povesti totul in detaliu cuiva", correct: false },
          { text: "A promite ca nu mai faci", correct: false },
        ],
        explanation:
          "«Homologeo» = a spune acelasi lucru. Nu e informare, nu e pedeapsa si nu e detaliu. E ieșirea din ascundere: incetezi sa numesti altfel ce El numeste pacat, si atunci se poate lucra cu el.",
      },
    },
    {
      id: "r5_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Trei limite, si nu se negociaza, pentru ca oamenii au fost răniți aici de biserici, nu de Dumnezeu:",
        },
        {
          from: "guide",
          text:
            "1. Nu esti obligat sa spui nimanui. Daca alegi sa spui, alegi TU cui — un om matur, discret, care nu te va folosi.",
        },
        {
          from: "guide",
          text:
            "2. Daca ceea ce te apasa ti s-a FACUT (abuz, violența, agresiune), nu e pacatul tau si nu ai ce marturisi. Ai nevoie de ajutor, nu de iertare.",
        },
        {
          from: "guide",
          text:
            "3. Nu lua legatura cu cineva care ti-a facut rau ca sa «rezolvi». Nu asta cere Dumnezeu si nu e curaj, e pericol.",
        },
      ],
    },
    {
      id: "r5_9",
      type: "step",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi, un singur lucru: spune-I lui Dumnezeu, cu cuvintele tale, lucrul pe care nu l-ai spus cu voce tare. Cu voce tare, nu in gand.",
        },
        {
          from: "guide",
          text:
            "Daca ai o ușa care se inchide, inchide-o. Nu ai nevoie de formula. Doar numeste-l.",
        },
      ],
    },
    {
      id: "r5_10",
      type: "prayer",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "«Doamne, nu mai ascund. Asta am facut. Nu mai spun altfel decat spui Tu.»",
        },
        {
          from: "guide",
          text: "Si daca ti s-a facut ceva: «Doamne, asta mi s-a facut. Nu vreau sa mai duc singur greutatea.»",
        },
      ],
    },
    {
      id: "r5_11",
      type: "journal",
      order: 11,
      journalPrompt:
        "Daca vrei, scrie aici ce ai spus cu voce tare. Nimeni nu il citește. Poti sa il stergi in orice moment.",
    },
    {
      id: "r5_12",
      type: "memory_verse",
      order: 12,
      scripture: {
        text: "Daca ne marturisim pacatele, El este credincios si drept ca sa ne ierte.",
        ref: "1 Ioan 1:9",
      },
    },
  ],
}

export const rusineL6: Lesson = {
  id: "rusine_l6",
  courseId: "path_acasa",
  order: 6,
  title: "Când nu te poți ierta pe tine",
  estMinutes: 12,
  anchorRefs: ["Romani 8:1", "1 Ioan 3:20", "Psalmul 103:12"],
  memoryVerseRef: "Romani 8:1",
  steps: [
    {
      id: "r6_1",
      type: "hook",
      order: 1,
      bubbles: [
        {
          from: "guide",
          text:
            "Lectia asta atinge regretul greu: copii pierduți sau nenăscuți, oameni răniți de tine, ani care nu se mai intorc. Poti opri si reveni.",
        },
        {
          from: "guide",
          text:
            "Daca te gandesti sa iti faci rau: 112 sau 116 123. Emanus nu inlocuieste medicul, psihologul, poliția sau 112.",
        },
      ],
    },
    {
      id: "r6_2",
      type: "check_in",
      order: 2,
      bubbles: [{ from: "guide", text: "Cum esti azi?" }],
    },
    {
      id: "r6_3",
      type: "name_struggle",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text:
            "Exista un loc in care oamenii ajung dupa ce cred, cu mintea, ca Dumnezeu i-a iertat: «bine, El m-a iertat. Eu nu.»",
        },
        {
          from: "guide",
          text:
            "Si de obicei se simte ca smerenie. Ca daca te-ai ierta prea repede, ai fi superficial.",
        },
        { from: "guide", text: "Hai sa ne uitam la ce e de fapt dedesubt." },
      ],
    },
    {
      id: "r6_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text:
            "Cand spui «El m-a iertat, eu nu ma pot ierta», ai pus un standard mai sus decat al Lui. Adica al tau conteaza mai mult.",
        },
        {
          from: "guide",
          text:
            "Nu spun asta ca sa te fac vinovat inca o data — e exact opusul. Spun ca autopedepsirea nu e smerenie. Smerenia ar fi sa accepti verdictul Lui chiar cand nu il simti.",
        },
        {
          from: "guide",
          text:
            "Si mai e ceva: autopedepsirea nu a repus niciodata nimic la loc. Nu il vindeca pe cel pe care l-ai rănit. Doar te scoate pe tine din joc.",
        },
      ],
    },
    {
      id: "r6_5",
      type: "scripture",
      order: 5,
      scripture: {
        text: "Acum dar nu este nicio osandire pentru cei ce sunt in Hristos Iisus.",
        ref: "Romani 8:1",
      },
      bubbles: [
        { from: "guide", text: "«Nicio». Nu «mai putina»." },
        {
          from: "guide",
          text:
            "Si observa cine e exclus din lista celor care te pot osandi: nu scrie «nicio osandire de la Dumnezeu». Scrie «nicio». Nici a ta.",
        },
        {
          from: "guide",
          text:
            "Capitolul dinainte, Romani 7, e un om care spune «fac exact ce nu vreau sa fac». Asta e propozitia care urmeaza imediat dupa. Nu i s-a spus «incearca mai tare».",
        },
      ],
    },
    {
      id: "r6_6",
      type: "scripture",
      order: 6,
      scripture: {
        text:
          "Chiar daca ne osandește inima noastra, Dumnezeu este mai mare decat inima noastra si cunoaște toate lucrurile.",
        ref: "1 Ioan 3:20",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Versetul recunoaște faptul: da, inima te osandește. Nu iti spune ca nu simti ce simti.",
        },
        {
          from: "guide",
          text:
            "Dar spune ca inima nu e instanța suprema. Sentimentele tale despre tine nu sunt verdictul. El e mai mare decat ele si El stie tot — inclusiv ce nu vezi tu.",
        },
      ],
    },
    {
      id: "r6_7",
      type: "quiz",
      order: 7,
      quiz: {
        question: "Ce e, de fapt, «nu ma pot ierta pe mine»?",
        options: [
          { text: "Smerenie. Arata ca iti pasa cu adevarat.", correct: false },
          {
            text: "Un standard pus mai sus decat verdictul lui Dumnezeu — si o plata care nu repara nimic",
            correct: true,
          },
          { text: "O parte necesara din pocaința, cateva luni", correct: false },
          { text: "Semn ca nu ai fost iertat inca", correct: false },
        ],
        explanation:
          "Pocaința se intoarce catre Dumnezeu si duce la schimbare. Autopedepsirea se intoarce catre tine si duce la paralizie. Cine se pedepsește singur nu are energie sa repare ce se mai poate repara — si de obicei cade din nou, din epuizare.",
      },
    },
    {
      id: "r6_8",
      type: "truth_simple",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "«Cat este de departe rasaritul de apus, atat de mult departă El fardelegile noastre de la noi.» (Psalmul 103:12)",
        },
        {
          from: "guide",
          text:
            "Nordul si sudul se termina — exista Polul Nord. Rasaritul si apusul nu se intalnesc niciodata, oricat ai merge.",
        },
        {
          from: "guide",
          text:
            "Iar la finalul unei alte scrieri: «vei arunca in fundul marii toate pacatele lor» (Mica 7:19). Nu la marginea marii. In fund. Nu sunt de recuperat.",
        },
      ],
    },
    {
      id: "r6_9",
      type: "how_god_helps",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text:
            "Trebuie sa spun ceva cinstit, pentru ca nu tot ce apasa e vina si nu tot ce apasa se rezolva cu un verset.",
        },
        {
          from: "guide",
          text:
            "Daca ai gandul asta zi si noapte, daca nu dormi, daca nu poti funcționa, daca te-ai gandit sa dispari — asta cere si ajutor omenesc. Un medic, un psiholog, o linie de sprijin.",
        },
        {
          from: "guide",
          text:
            "Nu e lipsa de credința. Un om cu piciorul rupt se roaga si merge si la doctor. Dumnezeu nu Se supara ca ai mers la doctor — tot El l-a pus acolo.",
        },
        {
          from: "guide",
          text: "116 123 pentru sprijin emoțional. 112 dacă e acum.",
        },
      ],
    },
    {
      id: "r6_10",
      type: "step",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi: propozitia pe care ai scris-o in lectia a doua — cea pe care ti-o spune rusinea cel mai des.",
        },
        {
          from: "guide",
          text:
            "Citește-o o data. Apoi spune cu voce tare, dupa ea: «nu este nicio osandire». In ordinea asta, nu invers.",
        },
        {
          from: "guide",
          text:
            "Nu ca sa te simți bine. Ca sa auzi cu urechile tale ca ultimul cuvant nu il are ea.",
        },
      ],
    },
    {
      id: "r6_11",
      type: "prayer",
      order: 11,
      bubbles: [
        {
          from: "guide",
          text:
            "«Doamne, nu mai cer o plata pe care Tu nu o ceri. Iau ce ai spus Tu despre mine, chiar dacă nu simt nimic.»",
        },
      ],
    },
    {
      id: "r6_12",
      type: "journal",
      order: 12,
      journalPrompt:
        "Ce ai pierdut si nu se mai poate intoarce? Scrie-i-o Lui. Nu ca sa Il convingi — ca sa nu o mai duci singur.",
    },
    {
      id: "r6_13",
      type: "memory_verse",
      order: 13,
      scripture: {
        text: "Acum dar nu este nicio osandire pentru cei ce sunt in Hristos Iisus.",
        ref: "Romani 8:1",
      },
    },
  ],
}

export const rusineL7: Lesson = {
  id: "rusine_l7",
  courseId: "path_acasa",
  order: 7,
  title: "De aici încolo",
  estMinutes: 11,
  anchorRefs: ["Ioan 8:11", "Tit 2:11-12", "Evrei 10:24-25"],
  memoryVerseRef: "Tit 2:11-12",
  steps: [
    {
      id: "r7_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Ultima din drumul asta. Cum esti azi?" },
      ],
    },
    {
      id: "r7_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Sase lectii in urma ai intrat cu «sunt prea murdar pentru El». Azi nu adaugam un adevar nou. Azi vorbim despre ce faci maine dimineata.",
        },
        {
          from: "guide",
          text:
            "Pentru ca exista o capcana: omul ridicat de har, care apoi se intoarce singur in exact acelasi loc si crede ca s-a intors la zero.",
        },
      ],
    },
    {
      id: "r7_3",
      type: "scripture",
      order: 3,
      scripture: {
        text:
          "Harul lui Dumnezeu... ne invața sa o rupem cu paganatatea si cu poftele lumesti si sa trăim in veacul de acum cu cumpătare, dreptate si evlavie.",
        ref: "Tit 2:11-12",
      },
      bubbles: [
        {
          from: "guide",
          text: "Uita-te la verb: harul «invața». Nu «scuza», nu «tolereaza».",
        },
        {
          from: "guide",
          text:
            "Deci ce te-a primit murdar e si ce te curata. Nu sunt doua etape cu doi profesori diferiți — mai intai har, apoi disciplina cu dintii stransi.",
        },
      ],
    },
    {
      id: "r7_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text:
            "Practic, asta schimba motivul. Inainte te abțineai ca sa nu fii prins sau pedepsit. Nu tine mult.",
        },
        {
          from: "guide",
          text:
            "De aici incolo motivul e altul: nu mai vrei sa te intorci acolo pentru ca stii ce e in afara. Un om care a ieșit din fum nu se roaga sa nu mai fumeze — nu mai vrea.",
        },
        {
          from: "guide",
          text:
            "Nu se intampla intr-o zi. Dar direcția s-a inversat, si asta se vede in cateva luni.",
        },
      ],
    },
    {
      id: "r7_5",
      type: "how_god_helps",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Trei lucruri practice pentru cand cazi din nou. Si vei cadea, cel putin o data.",
        },
        {
          from: "guide",
          text:
            "1. Intoarce-te imediat, nu duminica. Distanța nu creste pe cand cazi — creste pe cand te ascunzi.",
        },
        {
          from: "guide",
          text:
            "2. Nu reface drumul de la zero. Nu ai pierdut ce ai invățat. Zapisul e tot pironit.",
        },
        {
          from: "guide",
          text:
            "3. Nu fii singur. «Sa nu părăsim adunarea noastra» (Evrei 10:25) nu e o regula de bifat — e pentru ca nimeni nu se ridica singur din ce e ascuns.",
        },
      ],
    },
    {
      id: "r7_6",
      type: "quiz",
      order: 6,
      quiz: {
        question: "Ce faci daca faci din nou lucrul de care ti-e rusine?",
        options: [
          { text: "Iei o pauza de la Dumnezeu pana te aduni", correct: false },
          { text: "Reincepi drumul de la zero, ca sa fie serios", correct: false },
          { text: "Te intorci in aceeași zi, il numesti si mergi mai departe de unde erai", correct: true },
          { text: "Te pedepsești o vreme, ca sa iti amintești", correct: false },
        ],
        explanation:
          "Fiul risipitor a mancat cu porcii, dar drumul acasa a fost tot un drum, nu o retrogradare. Ce te ține departe nu e caderea, e ascunderea de dupa ea.",
      },
    },
    {
      id: "r7_7",
      type: "step",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi, doua lucruri concrete. Primul: gasește un om — unul — caruia poti spune «m-am intors» cand se intampla. Nu trebuie sa ii spui tot. Doar sa existe.",
        },
        {
          from: "guide",
          text:
            "Al doilea: scoate lucrul care te trage. Aplicația, numărul, drumul spre casa care trece pe langa. Nu se lupta cu voința ce se poate rezolva cu o ștergere.",
        },
      ],
    },
    {
      id: "r7_8",
      type: "scripture",
      order: 8,
      scripture: { text: "Nici Eu nu te osandesc. Du-te si sa nu mai pacatuiesti.", ref: "Ioan 8:11" },
      bubbles: [
        {
          from: "guide",
          text:
            "Astea sunt ultimele cuvinte spuse femeii din mijlocul cercului. Nu i-a cerut sa explice, nu i-a cerut sa promita.",
        },
        { from: "guide", text: "I-a spus «du-te». Adica: ai unde sa mergi de aici." },
      ],
    },
    {
      id: "r7_9",
      type: "prayer",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text:
            "«Doamne, nu ma mai ascund de Tine. Cand cad, ma intorc in aceeași zi. Invața-ma sa trăiesc ca un fiu, nu ca un vinovat.»",
        },
      ],
    },
    {
      id: "r7_10",
      type: "journal",
      order: 10,
      journalPrompt:
        "Reciteste ce ai scris in prima lectie. S-a schimbat ceva in sapte lectii? Scrie ce.",
      bubbles: [
        {
          from: "guide",
          text:
            "Drumul asta s-a terminat. Relația, nu. Ce ai scris ramane al tau, oricare drum alegi mai departe.",
        },
        {
          from: "guide",
          text:
            "Si scrie undeva o rugaciune la care aștepți raspuns. Peste luni o vei citi altfel.",
        },
      ],
    },
    {
      id: "r7_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Harul lui Dumnezeu ne invața sa trăim in veacul de acum cu cumpătare, dreptate si evlavie.",
        ref: "Tit 2:11-12",
      },
    },
  ],
}

export const RUSINE_B: Lesson[] = [rusineL5, rusineL6, rusineL7]
