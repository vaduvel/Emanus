import type { Lesson } from "../domain.js"

/*
 * Camera 9 — Legătura ruptă (path_legatura), partea A: lecțiile 1—4.
 *
 * Minciuna camerei: „Cu ei nu se mai poate."
 *
 * De ce există acest fișier
 * -------------------------
 * În taxonomia ușilor (docs/24) am strâns peste două sute de formulări în care
 * oamenii își descriu durerea. O parte bună din ele nu vorbesc despre o
 * pierdere, despre frică sau despre vinovăție, ci despre un om: cearta care nu
 * se mai termină, tăcerea din casă, socrii, fratele cu care nu mai vorbești,
 * prietenul care a plecat, colegul care te-a umilit, copilul care nu mai sună.
 * Nu puteam face o ușă pentru fiecare formulare și nu puteam pune două sute de
 * uși în fața omului, așa că le-am adunat într-o singură cameră și le-am dat un
 * singur drum, cu șapte lecții.
 *
 * Fișierul este împărțit în două (legaturaA.ts / legaturaB.ts) din același
 * motiv pentru care este împărțită și suferința: un singur fișier trece de
 * limita la care scrierea automată riscă să fie tăiată la mijloc. Lecțiile se
 * adună în legatura.ts.
 *
 * Ce nu face acest drum
 * ---------------------
 * 1. Nu promite împăcarea. Împăcarea are nevoie de doi oameni; întoarcerea la
 *    Dumnezeu are nevoie de unul singur. Drumul lucrează la partea ta și se
 *    oprește acolo, cinstit, în lecția 7.
 * 2. Nu trimite pe nimeni înapoi într-un loc periculos. Iertarea și întoarcerea
 *    în aceeași casă nu sunt același lucru, iar lecția 5 spune asta pe față.
 * 3. Nu pune presiune de timp. Nu există „ar fi trebuit să fi iertat până acum".
 * 4. Nu cere confruntare. Lecția 6 arată cum se vorbește cu omul, nu când.
 *
 * Reguli de siguranță (docs/22)
 * -----------------------------
 * Dacă cineva este lovit, amenințat sau controlat, numerele merg primele:
 * 112 pentru urgență, 116 123 pentru linia de sprijin emoțional, 116 111 pentru
 * copii. Le spunem în lecția 1, unde omul intră, și le repetăm în lecția 4,
 * unde vorbim despre a nu întoarce lovitura și unde riscul de a fi înțeleși
 * greșit este cel mai mare. Nu folosim XP, procente sau niveluri în acest drum.
 *
 * Regula textului biblic
 * ----------------------
 * Fiecare verset din acest fișier a fost verificat cuvânt cu cuvânt după
 * Cornilescu 1924 înainte de a fi scris aici. Nu se scrie Scriptură din
 * memorie. Dacă un verset nu a putut fi verificat, nu apare deloc.
 *
 * Ordinea pașilor respectă LESSON_STEP_ORDER din domain.ts:
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
        { from: "guide", text: "Stai jos o clipă. Nu începem cu sfaturi." },
        { from: "guide", text: "Este un om la care te gândești chiar acum. Poate un nume. Poate doar o cameră în care nu se mai vorbește." },
        { from: "guide", text: "Nu trebuie să îmi spui cine este. Trebuie doar să recunoști că există." }
      ]
    },
    {
      id: "lg1_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Zidurile dintre oameni nu se ridică dintr-o dată. Se ridică o cărămidă pe zi." },
        { from: "guide", text: "O vorbă nespusă. Un mesaj la care nu ai răspuns. O masă la care ați stat amândoi și nu v-ați privit." },
        { from: "guide", text: "Într-o zi te trezești că nu mai știi cum să începi o propoziție cu omul acela. Și atunci vine gândul: «Cu el nu se mai poate»." }
      ]
    },
    {
      id: "lg1_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Înainte să mergem mai departe, trebuie să spun un lucru clar, o singură dată, dar apăsat." },
        { from: "guide", text: "Dacă în relația aceasta ești lovit, amenințat sau ținut sub control, drumul acesta nu este primul lucru de care ai nevoie. Siguranța este." },
        { from: "guide", text: "112 dacă ești în pericol acum. 116 123 dacă ai nevoie să vorbești cu cineva. 116 111 dacă ești copil sau știi un copil în pericol." },
        { from: "guide", text: "Nimic din ce citești aici nu îți cere să rămâi într-un loc care te rănește." }
      ]
    },
    {
      id: "lg1_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea îți spune două lucruri, și amândouă sună bine." },
        { from: "guide", text: "Primul: «Taie-l din viața ta, meriți liniște». Al doilea: «Fii om bun, treci peste, nu face valuri»." },
        { from: "guide", text: "Unul te lasă singur și împăcat cu tine. Celălalt te lasă împreună și mâncat pe dinăuntru." },
        { from: "guide", text: "Scriptura merge pe alt drum. Nu îți cere nici să tai, nici să taci. Îți cere să faci partea ta și îți spune unde se termină ea." }
      ]
    },
    {
      id: "lg1_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul simplu al acestei camere este acesta: răspunzi de jumătatea ta de zid." },
        { from: "guide", text: "Nu de a lui. Nu de răspunsul lui. Nu de cât de repede se mișcă." },
        { from: "guide", text: "Atât. Și atât este destul de greu cât să ne ia șapte lecții." }
      ]
    },
    {
      id: "lg1_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Dumnezeu nu Se uită la voi doi ca la un dosar în care trebuie să afle cine a început." },
        { from: "guide", text: "El știe deja. Și tot te cheamă pe tine, primul, pentru că tu ești cel care ascultă acum." },
        { from: "guide", text: "Nu pentru că ai greșit mai mult. Ci pentru că ești cel de care are cine să se atingă astăzi." }
      ]
    },
    {
      id: "lg1_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Dacă este cu putință, întrucât atârnă de voi, trăiți în pace cu toți oamenii.",
        ref: "Romani 12:18"
      },
      bubbles: [
        { from: "guide", text: "Citește versetul de două ori și uită-te la două expresii din el." },
        { from: "guide", text: "«Dacă este cu putință». Deci se poate să nu fie. Dumnezeu știe asta și nu te condamnă pentru asta." },
        { from: "guide", text: "«Întrucât atârnă de voi». Deci există o parte care atârnă de tine și o parte care nu. Toată lecția asta este despre a nu le mai amesteca." }
      ]
    },
    {
      id: "lg1_8",
      type: "name_struggle",
      order: 8,
      bubbles: [
        { from: "guide", text: "Acum spune-i pe nume. Nu omului. Zidului." },
        { from: "guide", text: "Ce s-a rupt? O încredere? Un respect? O promisiune? Sau doar timpul a trecut peste voi și nimeni nu a mai spus nimic?" },
        { from: "guide", text: "Nu ai nevoie de cuvinte frumoase. Ai nevoie de cuvinte adevărate." }
      ]
    },
    {
      id: "lg1_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Ce îți cere Romani 12:18?",
        options: [
          { text: "Să faci pace cu orice preț, chiar dacă celălalt nu vrea", correct: false },
          { text: "Să faci partea care atârnă de tine, atât cât este cu putință", correct: true },
          { text: "Să aștepți ca celălalt să facă primul pas", correct: false }
        ],
        explanation: "Versetul are două limite în el. «Dacă este cu putință» recunoaște că uneori nu este. «Întrucât atârnă de voi» îți dă o porție de lucru, nu tot zidul. Ești responsabil de jumătatea ta."
      }
    },
    {
      id: "lg1_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "Dacă este cu putință, întrucât atârnă de voi, trăiți în pace cu toți oamenii.",
        ref: "Romani 12:18"
      },
      bubbles: [
        { from: "guide", text: "Ține minte doar patru cuvinte din el: «întrucât atârnă de voi»." },
        { from: "guide", text: "Le vei folosi în fiecare zi din drumul ăsta." }
      ]
    },
    {
      id: "lg1_11",
      type: "prayer",
      order: 11,
      bubbles: [
        { from: "guide", text: "Roagă-te scurt. Fără cuvinte mari." },
        { from: "guide", text: "«Doamne, este un om cu care nu mai pot. Nu Îți cer să îl schimbi acum. Arată-mi partea mea de zid și dă-mi putere pentru ea. Amin.»" }
      ]
    },
    {
      id: "lg1_12",
      type: "journal",
      order: 12,
      journalPrompt: "Scrie un nume (sau o inițială) și o singură propoziție: ce s-a rupt între voi. Nu explica, nu te apăra, nu îl acuza. O propoziție.",
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
        { from: "guide", text: "Ai scris ieri o propoziție. Nu o reciti încă." },
        { from: "guide", text: "Astăzi lucrăm la ceva ce doare mai tare decât rana primită: partea ta." }
      ]
    },
    {
      id: "lg2_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "În aproape orice ruptură există un procent care este al tău. Uneori zece la sută. Uneori nouăzeci." },
        { from: "guide", text: "Mintea noastră face însă un lucru ciudat: când celălalt are nouăzeci, noi ne purtăm ca și cum am avea zero." },
        { from: "guide", text: "Și așa rămâne zidul în picioare, pentru că nimeni nu își ridică partea lui de cărămizi." }
      ]
    },
    {
      id: "lg2_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Să fim exacți. A-ți recunoaște partea nu înseamnă a lua vina întreagă." },
        { from: "guide", text: "Dacă cineva te-a trădat sau te-a lovit, partea ta nu este trădarea sau lovitura. Nu a fost vina ta." },
        { from: "guide", text: "Partea ta este doar ce ai făcut tu după aceea: tăcerea, răspunsul tăios, ușa trântită, anii în care nu ai mai întrebat nimic." },
        { from: "guide", text: "Aceea este singura bucată pe care o poți muta." }
      ]
    },
    {
      id: "lg2_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea zice: «Recunoaște primul și ai pierdut. Te fac slab»." },
        { from: "guide", text: "Iisus zice altceva. Zice că cel care recunoaște primul este cel care se ridică de la masă și merge." },
        { from: "guide", text: "În Împărăția Lui, cel care face primul pas nu este cel învins. Este cel liber." }
      ]
    },
    {
      id: "lg2_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: nu poți cere de la celălalt ceva ce tu nu ai dat." },
        { from: "guide", text: "Și nu poți aștepta ca el să înceapă, pentru că și el așteaptă." },
        { from: "guide", text: "Cineva trebuie să se oprească din așteptat. Tu ești aici, deci tu ești acela." }
      ]
    },
    {
      id: "lg2_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Dumnezeu nu te lasă să faci pasul acesta pe gol." },
        { from: "guide", text: "El te-a iertat pe tine înainte să îți ceri tu iertare. A făcut El primul pas, spre tine, când tu nici nu Îl căutai." },
        { from: "guide", text: "Când mergi tu primul spre cineva, nu faci un lucru umilitor. Faci exact ce a făcut El." }
      ]
    },
    {
      id: "lg2_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Așa că, dacă îți aduci darul la altar și acolo îți aduci aminte că fratele tău are ceva împotriva ta, lasă-ți darul acolo, înaintea altarului, și du-te întâi de împacă-te cu fratele tău; apoi vino de adu-ți darul.",
        ref: "Matei 5:23-24"
      },
      bubbles: [
        { from: "guide", text: "Uită-te unde se întâmplă scena. La altar. În cel mai sfânt moment al zilei." },
        { from: "guide", text: "Și uită-te cine are ceva: «fratele tău are ceva împotriva ta». Nu tu împotriva lui. El împotriva ta." },
        { from: "guide", text: "Deci nici măcar nu ești trimis să rezolvi ce ți-a făcut el. Ești trimis să rezolvi ce i-ai făcut tu." }
      ]
    },
    {
      id: "lg2_8",
      type: "name_struggle",
      order: 8,
      bubbles: [
        { from: "guide", text: "Întreabă-te cinstit, fără să te aperi în gând: ce am făcut eu care l-a durut?" },
        { from: "guide", text: "Poate nu ai făcut nimic mare. Poate doar ai plecat. Poate ai spus o vorbă pe care nu o mai poți lua înapoi." },
        { from: "guide", text: "Dacă îți vine imediat un «da, dar el...», oprește-te acolo. Acel «dar» este cărămida care ține zidul." }
      ]
    },
    {
      id: "lg2_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "În Matei 5:23-24, cine este trimis să facă primul pas?",
        options: [
          { text: "Cel care a fost rănit", correct: false },
          { text: "Cel care își aduce aminte că fratele lui are ceva împotriva lui", correct: true },
          { text: "Cel care are dreptate", correct: false }
        ],
        explanation: "Iisus nu îl trimite pe cel rănit să alerge după vinovat. Îl oprește pe cel care își amintește, chiar în mijlocul închinării, și îl trimite la om. Darul poate aștepta. Omul, nu."
      }
    },
    {
      id: "lg2_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "lasă-ți darul acolo, înaintea altarului, și du-te întâi de împacă-te cu fratele tău; apoi vino de adu-ți darul.",
        ref: "Matei 5:24"
      },
      bubbles: [
        { from: "guide", text: "Cuvântul de ținut minte este «întâi». Nu «cândva». Nu «când se poate»." }
      ]
    },
    {
      id: "lg2_11",
      type: "prayer",
      order: 11,
      bubbles: [
        { from: "guide", text: "«Doamne, arată-mi partea mea și nu mă lăsa să o fac mai mică decât este. Nici mai mare. Doar cât este. Amin.»" }
      ]
    },
    {
      id: "lg2_12",
      type: "journal",
      order: 12,
      journalPrompt: "Scrie o propoziție despre partea ta, fără cuvântul «dar» în ea. Dacă nu îți iese fără «dar», mai încearcă o dată.",
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
        { from: "guide", text: "Astăzi nu vorbim despre ce s-a întâmplat. Vorbim despre cum vorbiți." },
        { from: "guide", text: "Multe legături nu s-au rupt dintr-o faptă. S-au rupt din felul în care s-a discutat despre faptă." }
      ]
    },
    {
      id: "lg3_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Gândește-te la ultima ceartă. Cât din ea ai ascultat cu adevărat?" },
        { from: "guide", text: "Sau, ca majoritatea dintre noi, ai stat tăcut și ți-ai pregătit răspunsul în timp ce el încă vorbea?" },
        { from: "guide", text: "Asta nu este ascultare. Este o pauză de încărcare." }
      ]
    },
    {
      id: "lg3_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Există trei feluri de cuvinte care rup, și toate trei par nevinovate." },
        { from: "guide", text: "«Tu întotdeauna...» și «Tu niciodată...» — nu descriu o faptă, descriu un om. Nimeni nu se poate apăra de așa ceva." },
        { from: "guide", text: "Vorba spusă la nervi, care este adevărată, dar spusă ca să taie. Adevărul folosit ca armă nu mai este adevăr, este lovitură." },
        { from: "guide", text: "Și tăcerea folosită ca pedeapsă. Cea mai grea dintre toate, pentru că nu are cuvinte pe care să le poți arăta cuiva." }
      ]
    },
    {
      id: "lg3_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea zice: «Spune-i tot ce ai pe suflet, altfel te îmbolnăvești»." },
        { from: "guide", text: "Scriptura nu îți cere să înghiți. Îți cere să așezi ordinea: întâi auzi, apoi vorbești, și te grăbești cel mai puțin către mânie." },
        { from: "guide", text: "Aceeași propoziție, spusă după trei secunde de tăcere, poate salva o seară întreagă." }
      ]
    },
    {
      id: "lg3_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: nu ești obligat să răspunzi în aceeași secundă." },
        { from: "guide", text: "Tăcerea de trei secunde nu este slăbiciune. Este singurul loc în care mai poți alege." }
      ]
    },
    {
      id: "lg3_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Dumnezeu nu ți-a dat un caracter nou ca să îl ții în sertar." },
        { from: "guide", text: "Când ceri ajutor exact în secunda în care simți că urci, primești ajutor exact acolo. Nu peste o oră, când deja ai spus tot." },
        { from: "guide", text: "Rugăciunea din mijlocul certei este scurtă: «Doamne, ține-mi gura». Se poate spune în gând." }
      ]
    },
    {
      id: "lg3_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Știți bine lucrul acesta, preaiubiții mei frați! Orice om să fie grabnic la ascultare, încet la vorbire, zăbavnic la mânie; căci mânia omului nu lucrează neprihănirea lui Dumnezeu.",
        ref: "Iacov 1:19-20"
      },
      bubbles: [
        { from: "guide", text: "Trei viteze într-un singur verset: repede la ascultat, încet la vorbit, foarte încet la mânie." },
        { from: "guide", text: "Și un motiv, în versetul următor: mânia ta nu produce ce crezi că produce. Nu îl face pe celălalt mai bun." }
      ]
    },
    {
      id: "lg3_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Orice amărăciune, orice iuțime, orice mânie, orice strigare, orice clevetire și orice fel de răutate să piară din mijlocul vostru. Dimpotrivă, fiți buni unii cu alții, miloși și iertați-vă unul pe altul, cum v-a iertat și Dumnezeu pe voi în Hristos.",
        ref: "Efeseni 4:31-32"
      },
      bubbles: [
        { from: "guide", text: "Observă că nu se oprește la «nu mai striga». Pune ceva în loc: buni, miloși, iertători." },
        { from: "guide", text: "Un loc gol se umple singur, de obicei cu același lucru care era acolo." }
      ]
    },
    {
      id: "lg3_9",
      type: "name_struggle",
      order: 9,
      bubbles: [
        { from: "guide", text: "Care dintre cele trei este a ta? «Întotdeauna», adevărul folosit ca armă, sau tăcerea ca pedeapsă?" },
        { from: "guide", text: "Nu răspunde repede. Toți avem una preferată." }
      ]
    },
    {
      id: "lg3_10",
      type: "quiz",
      order: 10,
      quiz: {
        question: "De ce spune Iacov că mânia omului este o problemă?",
        options: [
          { text: "Pentru că a te supăra este întotdeauna păcat", correct: false },
          { text: "Pentru că mânia omului nu lucrează neprihănirea lui Dumnezeu", correct: true },
          { text: "Pentru că oamenii tari nu simt mânie", correct: false }
        ],
        explanation: "Iacov nu spune că simțirea este păcat, ci că mânia nu produce rezultatul pe care îl aștepți de la ea. Nu îl îndreaptă pe celălalt și nu te îndreaptă pe tine. De aceea vine după «zăbavnic», nu după «interzis»."
      }
    },
    {
      id: "lg3_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Orice om să fie grabnic la ascultare, încet la vorbire, zăbavnic la mânie",
        ref: "Iacov 1:19"
      },
      bubbles: [
        { from: "guide", text: "Trei viteze. Repetă-le în ordinea lor până le știi pe de rost." }
      ]
    },
    {
      id: "lg3_12",
      type: "prayer",
      order: 12,
      bubbles: [
        { from: "guide", text: "«Doamne, pune-mi o pază la gură și o întârziere la mânie. Vreau să aud întâi. Amin.»" }
      ]
    },
    {
      id: "lg3_13",
      type: "journal",
      order: 13,
      journalPrompt: "Scrie ultima propoziție tăioasă pe care ai spus-o. Apoi scrie-o din nou, cum ai fi putut să o spui dacă ai fi așteptat trei secunde.",
      reward: { xp: 0, axisDeltas: { relationships: 1 } }
    }
  ]
}

export const legaturaL4: Lesson = {
  id: "legatura_l4",
  courseId: "path_legatura",
  order: 4,
  title: "Când nu întorc lovitura",
  estMinutes: 8,
  anchorRefs: ["1 Petru 3:9"],
  memoryVerseRef: "1 Petru 3:9",
  steps: [
    {
      id: "lg4_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Astăzi ajungem la lecția cea mai ușor de înțeles greșit din tot drumul." },
        { from: "guide", text: "Citește-o până la capăt înainte să tragi o concluzie despre ea." }
      ]
    },
    {
      id: "lg4_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Când cineva te lovește cu o vorbă, în tine se aprinde imediat un răspuns. Îl ai gata în două secunde și știi exact unde doare." },
        { from: "guide", text: "Și de obicei îl și spui. Iar el răspunde. Și urcați amândoi câte o treaptă." },
        { from: "guide", text: "Nimeni nu câștigă scara asta. Doar ajungeți mai sus și cădeți mai tare." }
      ]
    },
    {
      id: "lg4_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Aici trebuie să repet ce am spus în prima lecție, pentru că aici se poate înțelege greșit." },
        { from: "guide", text: "A nu întoarce răul cu rău nu înseamnă a sta sub pumn. Nu înseamnă a nu chema ajutor. Nu înseamnă a nu pleca dintr-o casă periculoasă." },
        { from: "guide", text: "Dacă ești în pericol: 112. Dacă ai nevoie să vorbești: 116 123. Pentru copii: 116 111." },
        { from: "guide", text: "Lecția aceasta este despre vorbe și despre răzbunările mici de fiecare zi. Nu este despre a răbda violența." }
      ]
    },
    {
      id: "lg4_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea zice: «Dacă nu răspunzi, te calcă în picioare»." },
        { from: "guide", text: "Petru scrie unor oameni care chiar erau călcați în picioare. Nu le vorbește dintr-un birou." },
        { from: "guide", text: "Și le spune că există o a treia ieșire, care nu este nici lovitura, nici ștergerea pe jos: binecuvântarea." }
      ]
    },
    {
      id: "lg4_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: singurul lanț pe care îl poți rupe este cel din mâna ta." },
        { from: "guide", text: "Nu poți opri ce vine spre tine. Poți opri ce pleacă de la tine." }
      ]
    },
    {
      id: "lg4_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Când nu întorci lovitura, nu înseamnă că fapta rămâne nerezolvată." },
        { from: "guide", text: "Înseamnă doar că nu o rezolvi tu. O lași în mâinile Celui care judecă drept și care vede și ce nu ai văzut tu." },
        { from: "guide", text: "Asta nu este slăbiciune. Este să muți greutatea de pe umerii tăi pe umeri care o pot duce." }
      ]
    },
    {
      id: "lg4_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Nu întoarceți rău pentru rău, nici ocară pentru ocară; dimpotrivă, binecuvântați, căci la aceasta ați fost chemați: să moșteniți binecuvântarea.",
        ref: "1 Petru 3:9"
      },
      bubbles: [
        { from: "guide", text: "Două feluri de răspuns sunt oprite: rău pentru rău, și ocară pentru ocară. Adică fapta și vorba." },
        { from: "guide", text: "Și un motiv neașteptat la final: nu ca să îl schimbi pe el, ci pentru că tu ai fost chemat la altceva." }
      ]
    },
    {
      id: "lg4_8",
      type: "name_struggle",
      order: 8,
      bubbles: [
        { from: "guide", text: "Care este răzbunarea ta mică? Toți avem una." },
        { from: "guide", text: "Mesajul citit și lăsat fără răspuns. Numele lui scos din discuție de față cu alții. Ajutorul refuzat exact când știa că ai putea." },
        { from: "guide", text: "Sunt mici și de aceea nu le numim niciodată răzbunare. Dar exact asta sunt." }
      ]
    },
    {
      id: "lg4_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Ce înseamnă să nu întorci rău pentru rău, după 1 Petru 3:9?",
        options: [
          { text: "Să rămâi într-un loc în care ești în pericol", correct: false },
          { text: "Să nu răspunzi cu aceeași monedă și să binecuvântezi în loc", correct: true },
          { text: "Să te faci că nu s-a întâmplat nimic", correct: false }
        ],
        explanation: "Versetul oprește răspunsul tău, nu dreptul tău la siguranță. Poți să pleci, poți să ceri ajutor, poți să pui o limită — și în același timp să nu întorci ocară pentru ocară. Nu se cere nici prefăcătorie: se cere binecuvântare, care este o alegere, nu un sentiment."
      }
    },
    {
      id: "lg4_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "Nu întoarceți rău pentru rău, nici ocară pentru ocară; dimpotrivă, binecuvântați",
        ref: "1 Petru 3:9"
      },
      bubbles: [
        { from: "guide", text: "Cuvântul de sprijin este «dimpotrivă». Acolo se schimbă direcția." }
      ]
    },
    {
      id: "lg4_11",
      type: "prayer",
      order: 11,
      bubbles: [
        { from: "guide", text: "«Doamne, când vine lovitura, ține-mi mâna și gura. Nu vreau să duc mai departe ce mi s-a dat. Binecuvântează-l pe el și păzește-mă pe mine. Amin.»" }
      ]
    },
    {
      id: "lg4_12",
      type: "journal",
      order: 12,
      journalPrompt: "Scrie răzbunarea ta mică. Apoi scrie ce ai putea face în locul ei astăzi, ceva ce se poate face în cinci minute.",
      reward: { xp: 0, axisDeltas: { relationships: 1 } }
    }
  ]
}
