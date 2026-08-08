import type { Lesson } from "../domain.js"

/*
 * Camera 9 — Legatura rupta (path_legatura)
 *
 * Minciuna camerei: „Cu ei nu se mai poate."
 *
 * De ce exista acest fisier
 * -------------------------
 * In taxonomia usilor (docs/24) am strans peste doua sute de formulari in care
 * oamenii isi descriu durerea. O parte buna din ele nu vorbesc despre o
 * pierdere, despre frica sau despre vinovatie, ci despre un om: cearta care nu
 * se mai termina, tacerea din casa, socrii, fratele cu care nu mai vorbesti,
 * prietenul care a plecat, colegul care te-a umilit, copilul care nu mai suna.
 * Nu puteam face o usa pentru fiecare formulare si nu puteam pune doua sute de
 * usi in fata omului, asa ca le-am adunat intr-o singura camera si le-am dat un
 * singur drum, cu sapte lectii.
 *
 * Ce nu face acest drum
 * ---------------------
 * 1. Nu promite impacarea. Impacarea are nevoie de doi oameni; intoarcerea la
 *    Dumnezeu are nevoie de unul singur. Drumul lucreaza la partea ta si se
 *    opreste acolo, cinstit, in lectia 7.
 * 2. Nu trimite pe nimeni inapoi intr-un loc periculos. Iertarea si intoarcerea
 *    in aceeasi casa nu sunt acelasi lucru, iar lectia 5 spune asta pe fata.
 * 3. Nu pune presiune de timp. Nu exista „ar fi trebuit sa fi iertat pana acum".
 * 4. Nu cere confruntare. Lectia 6 arata cum se vorbeste cu omul, nu cand.
 *
 * Reguli de siguranta (docs/22)
 * -----------------------------
 * Daca cineva este lovit, amenintat sau controlat, numerele merg primele:
 * 112 pentru urgenta, 116 123 pentru linia de sprijin emotional, 116 111 pentru
 * copii. Le spunem in lectia 1, unde omul intra, si le repetam in lectia 4,
 * unde vorbim despre a nu intoarce lovitura si unde riscul de a fi inteles
 * gresit este cel mai mare. Nu folosim XP, procente sau niveluri in acest drum.
 *
 * Regula textului biblic
 * ----------------------
 * Fiecare verset din acest fisier a fost verificat cuvant cu cuvant dupa
 * Cornilescu 1924 inainte de a fi scris aici. Nu se scrie Scriptura din
 * memorie. Daca un verset nu a putut fi verificat, nu apare deloc.
 *
 * Ordinea pasilor respecta LESSON_STEP_ORDER din domain.ts:
 * check_in, hook, step, world_vs_truth, truth_simple, how_god_helps, scripture,
 * name_struggle, quiz, memory_verse, prayer, journal.
 */

export const legaturaL1: Lesson = {
  id: "legatura_l1",
  courseId: "path_legatura",
  order: 1,
  title: "Zidul dintre noi",
  estMinutes: 7,
  anchorRefs: ["Romani 12:18"],
  memoryVerseRef: "Romani 12:18",
  steps: [
    {
      id: "lg1_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Stai jos o clipa. Nu incepem cu sfaturi." },
        { from: "guide", text: "Este un om la care te gandesti chiar acum. Poate un nume. Poate doar o camera in care nu se mai vorbeste." },
        { from: "guide", text: "Nu trebuie sa imi spui cine este. Trebuie doar sa recunosti ca exista." }
      ]
    },
    {
      id: "lg1_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Zidurile intre oameni nu se ridica dintr-o data. Se ridica o caramida pe zi." },
        { from: "guide", text: "O vorba nespusa. Un mesaj la care nu ai raspuns. O masa la care ati stat amandoi si nu v-ati privit." },
        { from: "guide", text: "Intr-o zi te trezesti ca nu mai stii cum sa incepi o propozitie cu omul acela. Si atunci vine gandul: «Cu el nu se mai poate»." }
      ]
    },
    {
      id: "lg1_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Inainte sa mergem mai departe, trebuie sa spun un lucru clar, o singura data, dar apasat." },
        { from: "guide", text: "Daca in relatia aceasta esti lovit, amenintat sau tinut sub control, drumul acesta nu este primul lucru de care ai nevoie. Siguranta este." },
        { from: "guide", text: "112 daca esti in pericol acum. 116 123 daca ai nevoie sa vorbesti cu cineva. 116 111 daca esti copil sau stii un copil in pericol." },
        { from: "guide", text: "Nimic din ce citesti aici nu iti cere sa ramai intr-un loc care te raneste." }
      ]
    },
    {
      id: "lg1_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea iti spune doua lucruri, si amandoua suna bine." },
        { from: "guide", text: "Primul: «Taie-i din viata ta, meriti liniste». Al doilea: «Fii om bun, treci peste, nu face valuri»." },
        { from: "guide", text: "Unul te lasa singur si impacat cu tine. Celalalt te lasa impreuna si mancat pe dinauntru." },
        { from: "guide", text: "Scriptura merge pe alt drum. Nu iti cere nici sa tai, nici sa taci. Iti cere sa faci partea ta si iti spune unde se termina ea." }
      ]
    },
    {
      id: "lg1_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevarul simplu al acestei camere este acesta: raspunzi de jumatatea ta de zid." },
        { from: "guide", text: "Nu de a lui. Nu de raspunsul lui. Nu de cat de repede se misca." },
        { from: "guide", text: "Atat. Si atat este destul de greu cat sa ne ia sapte lectii." }
      ]
    },
    {
      id: "lg1_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Dumnezeu nu Se uita la voi doi ca la un dosar in care trebuie sa afle cine a inceput." },
        { from: "guide", text: "El stie deja. Si tot te cheama, pe tine, primul, pentru ca tu esti cel care asculta acum." },
        { from: "guide", text: "Nu pentru ca ai gresit mai mult. Ci pentru ca esti cel de care are cine sa se atinga astazi." }
      ]
    },
    {
      id: "lg1_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Daca este cu putinta, intrucat atarna de voi, traiti in pace cu toti oamenii.",
        ref: "Romani 12:18"
      },
      bubbles: [
        { from: "guide", text: "Citeste versetul de doua ori si uita-te la doua expresii din el." },
        { from: "guide", text: "«Daca este cu putinta». Deci se poate sa nu fie. Dumnezeu stie asta si nu te condamna pentru asta." },
        { from: "guide", text: "«Intrucat atarna de voi». Deci exista o parte care atarna de tine si o parte care nu. Toata lectia asta este despre a nu le mai amesteca." }
      ]
    },
    {
      id: "lg1_8",
      type: "name_struggle",
      order: 8,
      bubbles: [
        { from: "guide", text: "Acum spune-i pe nume. Nu omului. Zidului." },
        { from: "guide", text: "Ce s-a rupt? O incredere? Un respect? O promisiune? Sau doar timpul a trecut peste voi si nimeni nu a mai spus nimic?" },
        { from: "guide", text: "Nu ai nevoie de cuvinte frumoase. Ai nevoie de cuvinte adevarate." }
      ]
    },
    {
      id: "lg1_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Ce iti cere Romani 12:18?",
        options: [
          { text: "Sa faci pace cu orice pret, chiar daca celalalt nu vrea", correct: false },
          { text: "Sa faci partea care atarna de tine, atat cat este cu putinta", correct: true },
          { text: "Sa astepti ca celalalt sa faca primul pas", correct: false }
        ],
        explanation: "Versetul are doua limite in el. «Daca este cu putinta» recunoaste ca uneori nu este. «Intrucat atarna de voi» iti da o portie de lucru, nu tot zidul. Esti responsabil de jumatatea ta."
      }
    },
    {
      id: "lg1_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "Daca este cu putinta, intrucat atarna de voi, traiti in pace cu toti oamenii.",
        ref: "Romani 12:18"
      },
      bubbles: [
        { from: "guide", text: "Tine minte doar patru cuvinte din el: «intrucat atarna de voi»." },
        { from: "guide", text: "Le vei folosi in fiecare zi din drumul asta." }
      ]
    },
    {
      id: "lg1_11",
      type: "prayer",
      order: 11,
      bubbles: [
        { from: "guide", text: "Roaga-te scurt. Fara cuvinte mari." },
        { from: "guide", text: "«Doamne, este un om cu care nu mai pot. Nu iti cer sa il schimbi acum. Arata-mi partea mea de zid si da-mi putere pentru ea. Amin.»" }
      ]
    },
    {
      id: "lg1_12",
      type: "journal",
      order: 12,
      journalPrompt: "Scrie un nume (sau o initiala) si o singura propozitie: ce s-a rupt intre voi. Nu explica, nu te apara, nu il acuza. O propozitie.",
      reward: { xp: 0, axisDeltas: { relationships: 1 } }
    }
  ]
}

export const legaturaL2: Lesson = {
  id: "legatura_l2",
  courseId: "path_legatura",
  order: 2,
  title: "Partea mea de zid",
  estMinutes: 8,
  anchorRefs: ["Matei 5:23-24"],
  memoryVerseRef: "Matei 5:24",
  steps: [
    {
      id: "lg2_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Ai scris ieri o propozitie. Nu o reciti inca." },
        { from: "guide", text: "Astazi lucram la ceva ce doare mai tare decat rana primita: partea ta." }
      ]
    },
    {
      id: "lg2_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "In aproape orice ruptura exista un procent care este al tau. Uneori zece la suta. Uneori nouazeci." },
        { from: "guide", text: "Mintea noastra face insa un lucru ciudat: cand celalalt are nouazeci, noi ne comportam ca si cum am avea zero." },
        { from: "guide", text: "Si asa ramane zidul in picioare, pentru ca nimeni nu isi ridica partea lui de caramizi." }
      ]
    },
    {
      id: "lg2_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Sa fim exacti. A-ti recunoaste partea nu inseamna a lua vina intreaga." },
        { from: "guide", text: "Daca cineva te-a tradat sau te-a lovit, partea ta nu este tradarea sau lovitura. Nu a fost vina ta." },
        { from: "guide", text: "Partea ta este doar ce ai facut tu dupa aceea: tacerea, raspunsul taios, usa trantita, anii in care nu ai mai intrebat nimic." },
        { from: "guide", text: "Aceea este singura bucata pe care o poti muta." }
      ]
    },
    {
      id: "lg2_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea zice: «Recunoaste primul si ai pierdut. Te fac slab»." },
        { from: "guide", text: "Iisus zice altceva. Zice ca cel care recunoaste primul este cel care se ridica de la masa si merge." },
        { from: "guide", text: "In Imparatia Lui, cel care face primul pas nu este cel invins. Este cel liber." }
      ]
    },
    {
      id: "lg2_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevarul de astazi: nu poti cere de la celalalt ceva ce tu nu ai dat." },
        { from: "guide", text: "Si nu poti astepta ca el sa inceapa, pentru ca si el asteapta." },
        { from: "guide", text: "Cineva trebuie sa se opreasca din asteptat. Tu esti aici, deci tu esti acela." }
      ]
    },
    {
      id: "lg2_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Dumnezeu nu te lasa sa faci pasul acesta pe gol." },
        { from: "guide", text: "El te-a iertat pe tine inainte sa iti ceri tu iertare. A facut El primul pas, spre tine, cand tu nici nu il cautai." },
        { from: "guide", text: "Cand mergi tu primul spre cineva, nu faci un lucru umilitor. Faci exact ce a facut El." }
      ]
    },
    {
      id: "lg2_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Asa ca, daca iti aduci darul la altar si acolo iti aduci aminte ca fratele tau are ceva impotriva ta, lasa-ti darul acolo, inaintea altarului, si du-te intai de impaca-te cu fratele tau; apoi vino de adu-ti darul.",
        ref: "Matei 5:23-24"
      },
      bubbles: [
        { from: "guide", text: "Uita-te unde se intampla scena. La altar. In cel mai sfant moment al zilei." },
        { from: "guide", text: "Si uita-te cine are ceva: «fratele tau are ceva impotriva ta». Nu tu impotriva lui. El impotriva ta." },
        { from: "guide", text: "Deci nici macar nu esti trimis sa rezolvi ce ti-a facut el. Esti trimis sa rezolvi ce i-ai facut tu." }
      ]
    },
    {
      id: "lg2_8",
      type: "name_struggle",
      order: 8,
      bubbles: [
        { from: "guide", text: "Intreaba-te cinstit, fara sa te aperi in gand: ce am facut eu care l-a durut?" },
        { from: "guide", text: "Poate nu ai facut nimic mare. Poate doar ai plecat. Poate ai spus o vorba pe care nu o mai poti lua inapoi." },
        { from: "guide", text: "Daca iti vine imediat un «da, dar el...», opreste-te acolo. Acel «dar» este caramida care tine zidul." }
      ]
    },
    {
      id: "lg2_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "In Matei 5:23-24, cine este trimis sa faca primul pas?",
        options: [
          { text: "Cel care a fost ranit", correct: false },
          { text: "Cel care isi aduce aminte ca fratele lui are ceva impotriva lui", correct: true },
          { text: "Cel care are dreptate", correct: false }
        ],
        explanation: "Iisus nu il trimite pe cel ranit sa alerge dupa vinovat. Il opreste pe cel care isi aminteste, chiar in mijlocul inchinarii, si il trimite la om. Darul poate astepta. Omul, nu."
      }
    },
    {
      id: "lg2_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "lasa-ti darul acolo, inaintea altarului, si du-te intai de impaca-te cu fratele tau; apoi vino de adu-ti darul.",
        ref: "Matei 5:24"
      },
      bubbles: [
        { from: "guide", text: "Cuvantul de tinut minte este «intai». Nu «candva». Nu «cand se poate»." }
      ]
    },
    {
      id: "lg2_11",
      type: "prayer",
      order: 11,
      bubbles: [
        { from: "guide", text: "«Doamne, arata-mi partea mea si nu ma lasa sa o fac mai mica decat este. Nici mai mare. Doar cat este. Amin.»" }
      ]
    },
    {
      id: "lg2_12",
      type: "journal",
      order: 12,
      journalPrompt: "Scrie o propozitie despre partea ta, fara cuvantul «dar» in ea. Daca nu iti iese fara «dar», mai incearca o data.",
      reward: { xp: 0, axisDeltas: { relationships: 1 } }
    }
  ]
}

export const legaturaL3: Lesson = {
  id: "legatura_l3",
  courseId: "path_legatura",
  order: 3,
  title: "Cuvintele care rup",
  estMinutes: 8,
  anchorRefs: ["Iacov 1:19-20", "Efeseni 4:31-32"],
  memoryVerseRef: "Iacov 1:19",
  steps: [
    {
      id: "lg3_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Astazi nu vorbim despre ce s-a intamplat. Vorbim despre cum vorbiti." },
        { from: "guide", text: "Multe legaturi nu s-au rupt dintr-o fapta. S-au rupt din felul in care s-a discutat despre fapta." }
      ]
    },
    {
      id: "lg3_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Gandeste-te la ultima cearta. Cat din ea ai ascultat cu adevarat?" },
        { from: "guide", text: "Sau, ca majoritatea dintre noi, ai stat tacut si ti-ai pregatit raspunsul in timp ce el inca vorbea?" },
        { from: "guide", text: "Asta nu este ascultare. Este o pauza de incarcare." }
      ]
    },
    {
      id: "lg3_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Exista trei feluri de cuvinte care rup, si toate trei par nevinovate." },
        { from: "guide", text: "«Tu intotdeauna...» si «Tu niciodata...» — nu descriu o fapta, descriu un om. Nimeni nu se poate apara de asa ceva." },
        { from: "guide", text: "Vorba spusa la nervi, care este adevarata dar spusa ca sa taie. Adevarul folosit ca arma nu mai este adevar, este lovitura." },
        { from: "guide", text: "Si tacerea folosita ca pedeapsa. Cea mai grea dintre toate, pentru ca nu ai ce sa repeti in instanta." }
      ]
    },
    {
      id: "lg3_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea zice: «Spune-i tot ce ai pe suflet, altfel te imbolnavesti»." },
        { from: "guide", text: "Scriptura nu iti cere sa inghiti. Iti cere sa asezi ordinea: intai auzi, apoi vorbesti, si te grabesti cel mai putin catre manie." },
        { from: "guide", text: "Aceeasi propozitie, spusa dupa trei secunde de tacere, poate salva o seara intreaga." }
      ]
    },
    {
      id: "lg3_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevarul de astazi: nu esti obligat sa raspunzi in aceeasi secunda." },
        { from: "guide", text: "Tacerea de trei secunde nu este slabiciune. Este singurul loc in care mai poti alege." }
      ]
    },
    {
      id: "lg3_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Dumnezeu nu ti-a dat un caracter nou ca sa il tii in sertar." },
        { from: "guide", text: "Cand ceri ajutor exact in secunda in care simti ca urci, primesti ajutor exact acolo. Nu peste o ora, cand deja ai spus tot." },
        { from: "guide", text: "Rugaciunea din mijlocul certei este scurta: «Doamne, tine-mi gura». Se poate spune in gand." }
      ]
    },
    {
      id: "lg3_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Stiti bine lucrul acesta, preaiubitii mei frati! Orice om sa fie grabnic la ascultare, incet la vorbire, zabavnic la manie; caci mania omului nu lucreaza neprihanirea lui Dumnezeu.",
        ref: "Iacov 1:19-20"
      },
      bubbles: [
        { from: "guide", text: "Trei viteze intr-un singur verset: repede la ascultat, incet la vorbit, foarte incet la manie." },
        { from: "guide", text: "Si un motiv, in versetul urmator: mania ta nu produce ce crezi ca produce. Nu il face pe celalalt mai bun." }
      ]
    },
    {
      id: "lg3_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Orice amaraciune, orice iuteala, orice manie, orice strigare, orice clevetire si orice fel de rautate sa piara din mijlocul vostru. Dimpotriva, fiti buni unii cu altii, milosi si iertati-va unul pe altul, cum v-a iertat si Dumnezeu pe voi in Hristos.",
        ref: "Efeseni 4:31-32"
      },
      bubbles: [
        { from: "guide", text: "Observa ca nu se opreste la «nu mai striga». Pune ceva in loc: buni, milosi, iertatori." },
        { from: "guide", text: "Un loc gol se umple singur, de obicei cu acelasi lucru care era acolo." }
      ]
    },
    {
      id: "lg3_9",
      type: "name_struggle",
      order: 9,
      bubbles: [
        { from: "guide", text: "Care dintre cele trei este a ta? «Intotdeauna», adevarul folosit ca arma, sau tacerea ca pedeapsa?" },
        { from: "guide", text: "Nu raspunde repede. Toti avem una preferata." }
      ]
    },
    {
      id: "lg3_10",
      type: "quiz",
      order: 10,
      quiz: {
        question: "De ce spune Iacov ca mania omului este o problema?",
        options: [
          { text: "Pentru ca a te supara este intotdeauna pacat", correct: false },
          { text: "Pentru ca mania omului nu lucreaza neprihanirea lui Dumnezeu", correct: true },
          { text: "Pentru ca oamenii tari nu simt manie", correct: false }
        ],
        explanation: "Iacov nu spune ca simtirea este pacat, ci ca mania nu produce rezultatul pe care il astepti de la ea. Nu il indrepta pe celalalt si nu te indrepta pe tine. De aceea vine dupa «zabavnic», nu dupa «interzis»."
      }
    },
    {
      id: "lg3_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Orice om sa fie grabnic la ascultare, incet la vorbire, zabavnic la manie",
        ref: "Iacov 1:19"
      },
      bubbles: [
        { from: "guide", text: "Trei viteze. Repeta-le in ordinea lor pana le stii pe de rost." }
      ]
    },
    {
      id: "lg3_12",
      type: "prayer",
      order: 12,
      bubbles: [
        { from: "guide", text: "«Doamne, pune-mi o paza la gura si o intarziere la manie. Vreau sa aud intai. Amin.»" }
      ]
    },
    {
      id: "lg3_13",
      type: "journal",
      order: 13,
      journalPrompt: "Scrie ultima propozitie taioasa pe care ai spus-o. Apoi scrie-o din nou, cum ai fi putut sa o spui daca ai fi asteptat trei secunde.",
      reward: { xp: 0, axisDeltas: { relationships: 1 } }
    }
  ]
}

export const legaturaL4: Lesson = {
  id: "legatura_l4",
  courseId: "path_legatura",
  order: 4,
  title: "Cand nu intorc lovitura",
  estMinutes: 8,
  anchorRefs: ["1 Petru 3:9"],
  memoryVerseRef: "1 Petru 3:9",
  steps: [
    {
      id: "lg4_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Astazi ajungem la lectia cea mai usor de inteles gresit din tot drumul." },
        { from: "guide", text: "Citeste-o pana la capat inainte sa tragi o concluzie despre ea." }
      ]
    },
    {
      id: "lg4_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Cand cineva te loveste cu o vorba, in tine se aprinde imediat un raspuns. Il ai gata in doua secunde si stii exact unde doare." },
        { from: "guide", text: "Si de obicei il si spui. Iar el raspunde. Si urcati amandoi cate o treapta." },
        { from: "guide", text: "Nimeni nu castiga scara asta. Doar ajungeti mai sus si cadeti mai tare." }
      ]
    },
    {
      id: "lg4_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Aici trebuie sa repet ce am spus in prima lectie, pentru ca aici se poate intelege gresit." },
        { from: "guide", text: "A nu intoarce raul cu rau nu inseamna a sta sub pumn. Nu inseamna a nu chema ajutor. Nu inseamna a nu pleca dintr-o casa periculoasa." },
        { from: "guide", text: "Daca esti in pericol: 112. Daca ai nevoie sa vorbesti: 116 123. Pentru copii: 116 111." },
        { from: "guide", text: "Lectia aceasta este despre vorbe si despre razbunarile mici de fiecare zi. Nu este despre a rabda violenta." }
      ]
    },
    {
      id: "lg4_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea zice: «Daca nu raspunzi, te calca in picioare»." },
        { from: "guide", text: "Petru scrie unor oameni care chiar erau calcati in picioare. Nu le vorbeste din birou." },
        { from: "guide", text: "Si le spune ca exista o a treia iesire, care nu este nici lovitura, nici stergerea pe jos: binecuvantarea." }
      ]
    },
    {
      id: "lg4_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevarul de astazi: singurul lant pe care il poti rupe este cel din mana ta." },
        { from: "guide", text: "Nu poti opri ce vine spre tine. Poti opri ce pleaca de la tine." }
      ]
    },
    {
      id: "lg4_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Cand nu intorci lovitura, nu inseamna ca fapta ramane nerezolvata." },
        { from: "guide", text: "Inseamna doar ca nu o rezolvi tu. O lasi in mainile Celui care judeca drept si care vede si ce nu ai vazut tu." },
        { from: "guide", text: "Asta nu este slabiciune. Este sa muti greutatea de pe umerii tai pe umeri care o pot duce." }
      ]
    },
    {
      id: "lg4_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Nu intoarceti rau pentru rau, nici ocara pentru ocara; dimpotriva, binecuvantati, caci la aceasta ati fost chemati: sa mosteniti binecuvantarea.",
        ref: "1 Petru 3:9"
      },
      bubbles: [
        { from: "guide", text: "Doua feluri de raspuns sunt oprite: rau pentru rau, si ocara pentru ocara. Adica fapta si vorba." },
        { from: "guide", text: "Si un motiv neasteptat la final: nu ca sa il schimbi pe el, ci pentru ca tu ai fost chemat la altceva." }
      ]
    },
    {
      id: "lg4_8",
      type: "name_struggle",
      order: 8,
      bubbles: [
        { from: "guide", text: "Care este razbunarea ta mica? Toti avem una." },
        { from: "guide", text: "Mesajul citit si lasat fara raspuns. Numele lui scos din discutie de fata cu altii. Ajutorul refuzat exact cand stia ca ai putea." },
        { from: "guide", text: "Sunt mici si de aceea nu le numim niciodata razbunare. Dar exact asta sunt." }
      ]
    },
    {
      id: "lg4_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Ce inseamna sa nu intorci rau pentru rau, dupa 1 Petru 3:9?",
        options: [
          { text: "Sa ramai intr-un loc in care esti in pericol", correct: false },
          { text: "Sa nu raspunzi cu aceeasi moneda si sa binecuvantezi in loc", correct: true },
          { text: "Sa te faci ca nu s-a intamplat nimic", correct: false }
        ],
        explanation: "Versetul opreste raspunsul tau, nu dreptul tau la siguranta. Poti sa pleci, poti sa ceri ajutor, poti sa pui o limita — si in acelasi timp sa nu intorci ocara cu ocara. Nu se cere nici prefacatorie: se cere binecuvantare, care este o alegere, nu un sentiment."
      }
    },
    {
      id: "lg4_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "Nu intoarceti rau pentru rau, nici ocara pentru ocara; dimpotriva, binecuvantati",
        ref: "1 Petru 3:9"
      },
      bubbles: [
        { from: "guide", text: "Cuvantul de sprijin este «dimpotriva». Acolo se schimba directia." }
      ]
    },
    {
      id: "lg4_11",
      type: "prayer",
      order: 11,
      bubbles: [
        { from: "guide", text: "«Doamne, cand vine lovitura, tine-mi mana si gura. Nu vreau sa duc mai departe ce mi s-a dat. Binecuvanteaza-l pe el si pazeste-ma pe mine. Amin.»" }
      ]
    },
    {
      id: "lg4_12",
      type: "journal",
      order: 12,
      journalPrompt: "Scrie razbunarea ta mica. Apoi scrie ce ai putea face in locul ei astazi, ceva ce se poate face in cinci minute.",
      reward: { xp: 0, axisDeltas: { relationships: 1 } }
    }
  ]
}

export const legaturaL5: Lesson = {
  id: "legatura_l5",
  courseId: "path_legatura",
  order: 5,
  title: "Iertarea nu este acelasi lucru cu intoarcerea",
  estMinutes: 9,
  anchorRefs: ["Coloseni 3:13", "Matei 6:12"],
  memoryVerseRef: "Coloseni 3:13",
  steps: [
    {
      id: "lg5_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Am ajuns la cuvantul de care te-ai temut de cand ai intrat pe usa asta." },
        { from: "guide", text: "Il spunem, dar il spunem intreg. Nu pe jumatate, cum se spune de obicei." }
      ]
    },
    {
      id: "lg5_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Multi oameni nu se impotrivesc iertarii. Se impotrivesc a ce cred ei ca inseamna iertarea." },
        { from: "guide", text: "Cred ca inseamna sa spui ca a fost in regula. Sa uiti. Sa te intorci la masa aceea si sa te porti ca inainte." },
        { from: "guide", text: "Nu inseamna niciunul dintre lucrurile astea." }
      ]
    },
    {
      id: "lg5_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Sa le asezam separat, pentru ca sunt trei lucruri diferite si le amestecam mereu." },
        { from: "guide", text: "Iertarea: renunti sa mai ceri plata pentru ce ti s-a facut. Se face intre tine si Dumnezeu si nu are nevoie de acordul celuilalt." },
        { from: "guide", text: "Impacarea: relatia se reia. Are nevoie de doi oameni si de o schimbare reala din partea celui care a ranit." },
        { from: "guide", text: "Increderea: se reconstruieste in timp, prin fapte repetate. Nu se da inapoi cu o propozitie." },
        { from: "guide", text: "Poti sa ierti astazi si sa nu te impaci niciodata. Nu esti un crestin pe jumatate daca faci asa." }
      ]
    },
    {
      id: "lg5_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea are doua greseli aici, si merg in directii opuse." },
        { from: "guide", text: "Una spune: «Daca ai iertat cu adevarat, te intorci». Asta trimite oameni inapoi in locuri care ii distrug." },
        { from: "guide", text: "Cealalta spune: «Nu ierta niciodata, tine minte tot». Asta lasa omul legat de fapta pentru tot restul vietii." },
        { from: "guide", text: "Scriptura taie prin mijloc: iarta, ca sa fii liber. Si pazeste-te, ca sa fii intreg." }
      ]
    },
    {
      id: "lg5_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevarul de astazi: iertarea nu il elibereaza intai pe el. Te elibereaza intai pe tine." },
        { from: "guide", text: "Cat timp astepti plata, esti legat de omul care ti-o datoreaza. Iertarea taie sfoara aceea." }
      ]
    },
    {
      id: "lg5_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Nu ti se cere sa gasesti in tine putere de iertare pe care nu o ai." },
        { from: "guide", text: "Ti se cere sa privesti cat ti s-a iertat tie si sa dai mai departe dintr-un vas care a fost umplut deja." },
        { from: "guide", text: "De aceea versetul nu zice «iarta ca sa fii bun», ci «cum v-a iertat Hristos, asa iertati-va si voi»." }
      ]
    },
    {
      id: "lg5_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Ingaduiti-va unii pe altii si, daca unul are pricina sa se planga de altul, iertati-va unul pe altul. Cum v-a iertat Hristos, asa iertati-va si voi.",
        ref: "Coloseni 3:13"
      },
      bubbles: [
        { from: "guide", text: "Observa ca versetul nu neaga plangerea: «daca unul are pricina sa se planga». Deci exista pricina. Este reala." },
        { from: "guide", text: "Nu ti se cere sa spui ca nu s-a intamplat nimic. Ti se cere sa nu mai ceri plata pentru ce s-a intamplat." }
      ]
    },
    {
      id: "lg5_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "si ne iarta noua gresealele noastre, precum si noi iertam gresitilor nostri",
        ref: "Matei 6:12"
      },
      bubbles: [
        { from: "guide", text: "Este singura cerere din Tatal nostru in care ne legam singuri de o masura." },
        { from: "guide", text: "O spunem de ani de zile fara sa ne uitam la ea. Uita-te astazi." }
      ]
    },
    {
      id: "lg5_9",
      type: "name_struggle",
      order: 9,
      bubbles: [
        { from: "guide", text: "Ce anume nu poti ierta? Nu omul intreg. Fapta." },
        { from: "guide", text: "Cu cat este mai exact ce numesti, cu atat este mai usor de dus la Dumnezeu." },
        { from: "guide", text: "Si daca astazi nu poti spune «iert», spune «vreau sa pot». Este un inceput cinstit, si El il primeste." }
      ]
    },
    {
      id: "lg5_10",
      type: "quiz",
      order: 10,
      quiz: {
        question: "Care afirmatie este adevarata despre iertare?",
        options: [
          { text: "Daca ai iertat, esti obligat sa reiei relatia ca inainte", correct: false },
          { text: "Poti sa ierti si sa pastrezi in acelasi timp o limita sanatoasa", correct: true },
          { text: "Iertarea inseamna ca fapta nu a fost grava", correct: false }
        ],
        explanation: "Iertarea, impacarea si increderea sunt trei lucruri diferite. Iertarea se face intre tine si Dumnezeu si te elibereaza. Impacarea are nevoie de doi. Increderea se cladeste in timp, prin fapte. A ierta nu inseamna a te intoarce intr-un loc care te raneste."
      }
    },
    {
      id: "lg5_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Cum v-a iertat Hristos, asa iertati-va si voi.",
        ref: "Coloseni 3:13"
      },
      bubbles: [
        { from: "guide", text: "Masura nu esti tu. Masura este El." }
      ]
    },
    {
      id: "lg5_12",
      type: "prayer",
      order: 12,
      bubbles: [
        { from: "guide", text: "«Doamne, iti aduc fapta aceasta. Nu mai cer plata pentru ea. Nu stiu daca ne vom mai vedea vreodata la aceeasi masa si Te las pe Tine cu asta. Elibereaza-ma. Amin.»" }
      ]
    },
    {
      id: "lg5_13",
      type: "journal",
      order: 13,
      journalPrompt: "Scrie fapta pe care o ierti astazi, cat poti de exact. Sub ea scrie o singura limita pe care o pastrezi. Amandoua pot sta pe aceeasi pagina.",
      reward: { xp: 0, axisDeltas: { relationships: 1 } }
    }
  ]
}

export const legaturaL6: Lesson = {
  id: "legatura_l6",
  courseId: "path_legatura",
  order: 6,
  title: "Vorbeste cu el, nu despre el",
  estMinutes: 8,
  anchorRefs: ["Matei 18:15"],
  memoryVerseRef: "Matei 18:15",
  steps: [
    {
      id: "lg6_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Pana acum am lucrat inauntru. Astazi iesim afara, la o singura conversatie." },
        { from: "guide", text: "Nu astazi, daca nu esti gata. Dar sa stii cum se face." }
      ]
    },
    {
      id: "lg6_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Cand cineva ne raneste, aproape niciodata nu mergem la el. Mergem la altcineva." },
        { from: "guide", text: "Ii povestim unei prietene, unui frate, unui coleg. Si de fiecare data cand povestim, mai punem un strat." },
        { from: "guide", text: "Dupa zece povestiri, omul din capul nostru nu mai seamana cu omul adevarat. Si cu omul din capul nostru nu se poate impaca nimeni." }
      ]
    },
    {
      id: "lg6_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Iisus da o regula foarte simpla si foarte greu de tinut: intai singuri, doar voi doi." },
        { from: "guide", text: "Nu pe grup. Nu de fata cu copiii. Nu cu inca doi martori adusi de la inceput, ca sa ai sprijin." },
        { from: "guide", text: "Motivul nu este delicatete. Este ca un om care nu are public are unde sa se retraga fara sa se faca de ras. Iar cine nu se poate retrage, se apara." }
      ]
    },
    {
      id: "lg6_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea zice: «Aduna dovezi, spune-le si altora, ai nevoie de sustinere»." },
        { from: "guide", text: "Iisus zice: du-te singur, intai. Nu pentru ca esti singur pe lume, ci pentru ca scopul nu este sa castigi disputa." },
        { from: "guide", text: "Scopul este scris chiar in verset: «ai castigat pe fratele tau». Nu procesul. Omul." }
      ]
    },
    {
      id: "lg6_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevarul de astazi: o conversatie sincera de zece minute face mai mult decat zece luni de tacere demna." },
        { from: "guide", text: "Dar numai daca intri in ea ca sa il castigi pe el, nu ca sa ai dreptate." }
      ]
    },
    {
      id: "lg6_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Nu trebuie sa mergi cu discursul pregatit si nici cu curajul facut." },
        { from: "guide", text: "Cere-I doar doua lucruri: momentul potrivit si primele trei propozitii. Restul se aseaza singur." },
        { from: "guide", text: "Si daca omul nu asculta, nu ai esuat. Versetul insusi lasa loc pentru varianta asta." }
      ]
    },
    {
      id: "lg6_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Daca fratele tau a pacatuit impotriva ta, du-te si mustra-l intre tine si el singur. Daca te asculta, ai castigat pe fratele tau.",
        ref: "Matei 18:15"
      },
      bubbles: [
        { from: "guide", text: "«Du-te» — miscarea este a ta, chiar daca fapta a fost a lui." },
        { from: "guide", text: "«Intre tine si el singur» — fara audienta, fara ecran, fara martori adusi din prima." },
        { from: "guide", text: "«Daca te asculta» — deci se poate sa nu te asculte. Nici asta nu este in mana ta." }
      ]
    },
    {
      id: "lg6_8",
      type: "name_struggle",
      order: 8,
      bubbles: [
        { from: "guide", text: "Cui i-ai povestit ultima data despre el?" },
        { from: "guide", text: "Si cati oameni stiu acum despre rana asta, inaintea omului care a facut-o?" },
        { from: "guide", text: "Nu ca sa te simti vinovat. Ca sa vezi cate usi ai deschis in alta directie decat cea care ar rezolva." }
      ]
    },
    {
      id: "lg6_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Care este primul pas dat de Iisus in Matei 18:15?",
        options: [
          { text: "Sa spui la doi-trei oameni de incredere ce s-a intamplat", correct: false },
          { text: "Sa mergi singur la el si sa vorbesti intre patru ochi", correct: true },
          { text: "Sa astepti sa vina el, pentru ca el a gresit", correct: false }
        ],
        explanation: "Iisus il trimite pe cel ranit, nu pe cel vinovat, si il trimite singur. Ceilalti pasi din capitol vin abia daca acesta nu reuseste. Ordinea nu este intamplatoare: protejeaza demnitatea celui care a gresit si tine cearta mica."
      }
    },
    {
      id: "lg6_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "du-te si mustra-l intre tine si el singur. Daca te asculta, ai castigat pe fratele tau.",
        ref: "Matei 18:15"
      },
      bubbles: [
        { from: "guide", text: "Tine minte scopul: «ai castigat pe fratele tau». Nu «ai dovedit»." }
      ]
    },
    {
      id: "lg6_11",
      type: "prayer",
      order: 11,
      bubbles: [
        { from: "guide", text: "«Doamne, da-mi ziua potrivita si primele trei propozitii. Vreau sa il castig pe el, nu sa castig eu. Amin.»" }
      ]
    },
    {
      id: "lg6_12",
      type: "journal",
      order: 12,
      journalPrompt: "Scrie primele trei propozitii pe care i le-ai spune daca ai vorbi cu el maine. Niciuna sa nu inceapa cu «tu».",
      reward: { xp: 0, axisDeltas: { relationships: 1 } }
    }
  ]
}

export const legaturaL7: Lesson = {
  id: "legatura_l7",
  courseId: "path_legatura",
  order: 7,
  title: "Ce ramane cand celalalt nu vine",
  estMinutes: 9,
  anchorRefs: ["Galateni 6:2", "Romani 12:18"],
  memoryVerseRef: "Galateni 6:2",
  steps: [
    {
      id: "lg7_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Ultima lectie. Si trebuie sa fie cinstita, altfel tot drumul nu a valorat nimic." },
        { from: "guide", text: "Se poate sa fi facut tot ce scrie aici si omul sa nu vina." }
      ]
    },
    {
      id: "lg7_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Ai cerut iertare si ti s-a raspuns cu tacere. Sau cu o vorba si mai rece decat tacerea." },
        { from: "guide", text: "Si acum stai cu intrebarea: atunci la ce a fost bun tot ce am facut?" },
        { from: "guide", text: "Sa iti spun exact la ce." }
      ]
    },
    {
      id: "lg7_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Primul lucru: partea ta de zid nu mai este in picioare. Aceea era treaba ta si s-a terminat." },
        { from: "guide", text: "Al doilea: nu mai duci in tine plata pe care i-o cereai. Ai lasat-o jos. Se simte in somn si in piept." },
        { from: "guide", text: "Al treilea: usa a ramas deschisa din partea ta. Daca el se intoarce peste zece ani, nu gaseste zid." },
        { from: "guide", text: "Astea trei sunt ale tale si nu ti le poate lua raspunsul lui." }
      ]
    },
    {
      id: "lg7_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea masoara reusita dupa rezultat: v-ati impacat sau nu." },
        { from: "guide", text: "Dumnezeu masoara ascultarea: ai facut ce atarna de tine sau nu." },
        { from: "guide", text: "Sunt doua examene diferite. Tu ai dat unul singur, si l-ai dat." }
      ]
    },
    {
      id: "lg7_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevarul de astazi: nu esti responsabil de raspunsul nimanui. Esti responsabil de intinderea mainii." },
        { from: "guide", text: "Poti sa stai in pace chiar daca relatia nu s-a vindecat. Nu este o infrangere ascunsa. Este o limita cinstita." }
      ]
    },
    {
      id: "lg7_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Si daca ramai cu o legatura pe care nu o poti repara, nu ramai singur cu ea." },
        { from: "guide", text: "Dumnezeu nu ne-a lasat sa ne caram poverile in tacere, fiecare a lui. Ne-a pus unii langa altii tocmai pentru asa ceva." },
        { from: "guide", text: "Poate ca omul care nu vine te invata sa lasi pe altcineva sa te ajute. Nu era planul tau, dar nu este o pierdere." }
      ]
    },
    {
      id: "lg7_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Purtati-va sarcinile unii altora si veti implini astfel Legea lui Hristos.",
        ref: "Galateni 6:2"
      },
      bubbles: [
        { from: "guide", text: "Sarcina nu se stinge. Se poarta. Si nu singur." },
        { from: "guide", text: "Uneori vindecarea nu vine din partea celui care a ranit, ci din partea celui care a ramas." }
      ]
    },
    {
      id: "lg7_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Daca este cu putinta, intrucat atarna de voi, traiti in pace cu toti oamenii.",
        ref: "Romani 12:18"
      },
      bubbles: [
        { from: "guide", text: "Ne intoarcem de unde am plecat, dar acum versetul suna altfel." },
        { from: "guide", text: "La inceput l-ai citit ca pe o datorie. Astazi il citesti ca pe o eliberare." }
      ]
    },
    {
      id: "lg7_9",
      type: "name_struggle",
      order: 9,
      bubbles: [
        { from: "guide", text: "Spune, in gand, cum stau lucrurile astazi. Fara sa infrumusetezi si fara sa innegresti." },
        { from: "guide", text: "«Am facut partea mea. El nu a venit inca. Il las in mainile lui Dumnezeu si nu inchid usa.»" },
        { from: "guide", text: "Daca nu este adevarat inca, spune ce este adevarat. Dumnezeu lucreaza cu adevarul, nu cu formula." }
      ]
    },
    {
      id: "lg7_10",
      type: "quiz",
      order: 10,
      quiz: {
        question: "Ai facut partea ta si celalalt nu raspunde. Ce urmeaza?",
        options: [
          { text: "Ai esuat si trebuie sa incerci pana cedeaza", correct: false },
          { text: "Ti-ai implinit partea; raspunsul lui nu este in mana ta", correct: true },
          { text: "Trebuie sa inchizi usa definitiv, ca sa nu suferi", correct: false }
        ],
        explanation: "Romani 12:18 iti da o portie limitata: cat atarna de tine. Cand ai facut-o, ai terminat ce ti se cerea, chiar daca relatia nu s-a refacut. Usa poate ramane deschisa fara ca tu sa stai in prag toata viata."
      }
    },
    {
      id: "lg7_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Purtati-va sarcinile unii altora si veti implini astfel Legea lui Hristos.",
        ref: "Galateni 6:2"
      },
      bubbles: [
        { from: "guide", text: "Ce nu se poate repara, se poate purta. Si se poate purta impreuna." }
      ]
    },
    {
      id: "lg7_12",
      type: "prayer",
      order: 12,
      bubbles: [
        { from: "guide", text: "«Doamne, am facut cat a atarnat de mine. Il las pe el in mainile Tale si iau mainile mele de pe el. Da-mi pace si tine-mi usa deschisa. Amin.»" }
      ]
    },
    {
      id: "lg7_13",
      type: "journal",
      order: 13,
      journalPrompt: "Reciteste prima propozitie pe care ai scris-o in lectia 1. Sub ea scrie unde esti astazi, dupa sapte lectii. Nu trebuie sa fie o poveste frumoasa. Trebuie sa fie a ta.",
      reward: { xp: 0, axisDeltas: { relationships: 1 } }
    }
  ]
}

export const LEGATURA_LESSONS: Lesson[] = [
  legaturaL1,
  legaturaL2,
  legaturaL3,
  legaturaL4,
  legaturaL5,
  legaturaL6,
  legaturaL7
]

/*
 * Practicile sunt aliniate pe index cu LEGATURA_LESSONS: practica[i] apartine
 * lectiei[i]. Fiecare se poate face astazi, in cateva minute, si niciuna nu
 * cere prezenta sau acordul celuilalt om — pentru ca celalalt om nu este in
 * mana celui care parcurge drumul.
 */
export const LEGATURA_PRACTICES: string[] = [
  "Astazi nu repari nimic. Scrie doar un nume si o propozitie: ce s-a rupt.",
  "Astazi spune-i cuiva o propozitie despre partea ta, fara «dar» in ea. Daca nu poti sa i-o spui lui, spune-o cu voce tare in masina.",
  "Astazi asculta o singura conversatie pana la capat, fara sa iti pregatesti raspunsul in timp ce celalalt vorbeste.",
  "Astazi, cand vine lovitura, numara trei secunde in tacere si binecuvanteaza-l in gand inainte sa raspunzi.",
  "Astazi iarta in rugaciune un lucru mic si nu anunta pe nimeni ca ai facut-o.",
  "Astazi nu vorbi despre el cu nimeni altcineva. Nici macar o data, nici macar pe scurt.",
  "Astazi poarta o sarcina a cuiva: un drum, un telefon, o ora din timpul tau. Nu neaparat a lui."
]
