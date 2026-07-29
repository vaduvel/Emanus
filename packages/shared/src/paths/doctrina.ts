import type { Lesson } from "../domain.js"

/*
 * Doctrină generală — ȘABLONUL A (docs/20 §4).
 *
 * Identică pentru toată lumea, indiferent de ușă. Nu se personalizează.
 * FĂRĂ check-in, FĂRĂ jurnal, FĂRĂ "cum te simți". Nu e loc de emoții aici,
 * e loc de claritate.
 *
 * Ritm: se deschide după lecția 5 din parcursul personal, apoi una la trei.
 * Nimeni nu învață ce e canonul Scripturii înainte să afle că e iubit.
 *
 * Beat-uri: întrebarea reală · ce crede lumea · textul · ce spune de fapt ·
 * obiecția reală · răspunsul · quiz · propoziția de reținut · versetul.
 */

export const doctrinaL1: Lesson = {
  id: "doctrina_l1",
  courseId: "course_doctrina",
  order: 1,
  title: "De unde știm că Biblia nu e inventată",
  estMinutes: 8,
  anchorRefs: ["2 Timotei 3:16", "Luca 1:1-4"],
  memoryVerseRef: "2 Timotei 3:16",
  steps: [
    {
      id: "d1_1",
      type: "hook",
      order: 1,
      bubbles: [
        {
          from: "guide",
          text: "Întrebarea pe care o pune toată lumea, măcar o dată: de unde știm că n-a scris-o cineva ca să ne țină în frâu?",
        },
        { from: "guide", text: "E o întrebare bună. Merită un răspuns, nu o privire urâtă." },
      ],
    },
    {
      id: "d1_2",
      type: "world_vs_truth",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Ce se aude de obicei: că Biblia a fost scrisă de călugări, în Evul Mediu, și că s-a modificat de o mie de ori până la noi.",
        },
        {
          from: "guide",
          text: "Nu e o părere pe care s-o combatem cu credință. E o afirmație despre documente, și se verifică cu documente.",
        },
      ],
    },
    {
      id: "d1_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "Avem peste cinci mii de copii în greacă ale Noului Testament. Cea mai veche bucată păstrată e un fragment din Ioan, datat pe la anul 125 — la vreo treizeci de ani după ce a fost scrisă cărticica.",
        },
        {
          from: "guide",
          text: "Pentru comparație: din Războiul galic al lui Cezar avem câteva zeci de copii, cea mai veche la nouă sute de ani după. Și nimeni nu spune că s-a inventat Cezar.",
        },
      ],
    },
    {
      id: "d1_4",
      type: "how_god_helps",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Și mai e ceva. În 1947, un cioban a găsit într-o peșteră la Marea Moartă suluri vechi de două mii de ani, printre care Isaia întreg.",
        },
        {
          from: "guide",
          text: "L-au pus lângă Isaia din Bibliile de azi, copiat o mie de ani mai târziu. Același text. Diferențele erau de ortografie.",
        },
      ],
    },
    {
      id: "d1_5",
      type: "scripture",
      order: 5,
      scripture: {
        text: "Fiindcă mulți s-au apucat să alcătuiască o istorisire amănunțită despre lucrurile care s-au petrecut printre noi, după cum ni le-au încredințat cei ce le-au văzut cu ochii lor de la început… am găsit și eu cu cale să ți le scriu în șir unele după altele.",
        ref: "Luca 1:1-3",
      },
    },
    {
      id: "d1_6",
      type: "truth_simple",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Uită-te cum își începe Luca Evanghelia. Nu spune «am avut o viziune». Spune: am cercetat, am vorbit cu martorii, ți le scriu în ordine.",
        },
        { from: "guide", text: "Ăsta e limbaj de reporter, nu de mitologie." },
      ],
    },
    {
      id: "d1_7",
      type: "world_vs_truth",
      order: 7,
      bubbles: [
        { from: "guide", text: "Obiecția adevărată vine acum: bine, textul s-a păstrat. Dar de unde știm că e adevărat ce scrie în el?" },
        {
          from: "guide",
          text: "Sincer: din documente nu ieși cu «Dumnezeu există». Ieși cu «nu m-a mințit nimeni despre ce s-a întâmplat». De acolo încolo e o întâlnire, nu o demonstrație.",
        },
      ],
    },
    {
      id: "d1_8",
      type: "quiz",
      order: 8,
      quiz: {
        question: "Ce dovedesc manuscrisele?",
        options: [
          { text: "Că tot ce scrie în Biblie e adevărat", correct: false },
          { text: "Că textul de azi e același cu cel scris atunci", correct: true },
          { text: "Nimic, sunt copii făcute de credincioși", correct: false },
        ],
        explanation:
          "Manuscrisele răspund la o singură întrebare, dar răspund limpede: ce citești tu azi e ce au scris ei atunci. Dacă e și adevărat se află altfel — trăind cu ce scrie acolo.",
      },
    },
    {
      id: "d1_9",
      type: "memory_verse",
      order: 9,
      scripture: {
        text: "Toată Scriptura este insuflată de Dumnezeu și de folos ca să învețe, să mustre, să îndrepte.",
        ref: "2 Timotei 3:16",
      },
    },
  ],
}

export const doctrinaL2: Lesson = {
  id: "doctrina_l2",
  courseId: "course_doctrina",
  order: 2,
  title: "Ce înseamnă, de fapt, har",
  estMinutes: 8,
  anchorRefs: ["Efeseni 2:8-9", "Tit 3:5", "Romani 6:1-2"],
  memoryVerseRef: "Efeseni 2:8-9",
  steps: [
    {
      id: "d2_1",
      type: "hook",
      order: 1,
      bubbles: [
        {
          from: "guide",
          text: "«Har» e un cuvânt pe care îl auzi la fiecare slujbă și pe care aproape nimeni nu-l poate explica fără alte cuvinte bisericești.",
        },
        { from: "guide", text: "Azi îl spunem pe românește." },
      ],
    },
    {
      id: "d2_2",
      type: "truth_simple",
      order: 2,
      bubbles: [
        { from: "guide", text: "Har înseamnă: primești ceva bun pe care nu l-ai meritat și nu-l poți plăti." },
        { from: "guide", text: "Atât. Un dar, dat cuiva care n-avea cum să-l câștige." },
      ],
    },
    {
      id: "d2_3",
      type: "world_vs_truth",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "Ce credem toți, din reflex: că Dumnezeu ține o balanță. Faptele bune într-o parte, cele rele în cealaltă, și la sfârșit se vede care atârnă mai greu.",
        },
        {
          from: "guide",
          text: "Toate religiile lumii funcționează așa. Creștinismul e singurul care spune că balanța nu se poate echilibra — și că a fost plătită de altcineva.",
        },
      ],
    },
    {
      id: "d2_4",
      type: "scripture",
      order: 4,
      scripture: {
        text: "Căci prin har ați fost mântuiți, prin credință. Și aceasta nu vine de la voi, ci este darul lui Dumnezeu. Nu prin fapte, ca să nu se laude nimeni.",
        ref: "Efeseni 2:8-9",
      },
    },
    {
      id: "d2_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Pavel scrie asta unor oameni din Efes, oraș plin de temple unde te duceai cu ofrande ca să-ți cumperi bunăvoința zeilor. Le spune: aici nu se plătește la intrare.",
        },
        {
          from: "guide",
          text: "Și mai spune și de ce: «ca să nu se laude nimeni». Dacă ai fi putut s-o faci singur, ai fi avut cu ce să te uiți de sus la altul.",
        },
      ],
    },
    {
      id: "d2_6",
      type: "world_vs_truth",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Obiecția serioasă, și o pune oricine gândește: dacă e gratis, atunci pot să fac ce vreau. Nu?",
        },
        {
          from: "guide",
          text: "Pavel și-a pus-o singur, în Romani. Răspunsul lui: «Nicidecum! Noi, care am murit față de păcat, cum să mai trăim în el?»",
        },
        {
          from: "guide",
          text: "Nu e o amenințare, e o observație. Omul care chiar a înțeles ce a primit nu se întoarce la ce l-a distrus. Cine se întoarce liniștit, n-a înțeles încă nimic.",
        },
      ],
    },
    {
      id: "d2_7",
      type: "quiz",
      order: 7,
      quiz: {
        question: "Unde intră faptele bune, atunci?",
        options: [
          { text: "Le fac ca să fiu primit de Dumnezeu", correct: false },
          { text: "Le fac pentru că am fost primit", correct: true },
          { text: "Nu mai contează deloc", correct: false },
        ],
        explanation:
          "Aceeași faptă, dar din alt loc. Una e a unui angajat care se teme să nu fie dat afară. Cealaltă e a unui copil care e deja acasă.",
      },
    },
    {
      id: "d2_8",
      type: "memory_verse",
      order: 8,
      scripture: {
        text: "Prin har ați fost mântuiți, prin credință. Nu prin fapte, ca să nu se laude nimeni.",
        ref: "Efeseni 2:8-9",
      },
    },
  ],
}

export const doctrinaL3: Lesson = {
  id: "doctrina_l3",
  courseId: "course_doctrina",
  order: 3,
  title: "Cine spune Iisus că este",
  estMinutes: 9,
  anchorRefs: ["Ioan 8:58", "Marcu 2:5-7", "Ioan 14:6"],
  memoryVerseRef: "Ioan 14:6",
  steps: [
    {
      id: "d3_1",
      type: "hook",
      order: 1,
      bubbles: [
        {
          from: "guide",
          text: "Aproape toată lumea e de acord că Iisus a fost un om bun. Un învățător, un model de blândețe.",
        },
        { from: "guide", text: "Problema e că exact asta e singura variantă pe care El n-a lăsat-o pe masă." },
      ],
    },
    {
      id: "d3_2",
      type: "scripture",
      order: 2,
      scripture: {
        text: "Adevărat, adevărat vă spun că, mai înainte ca să se nască Avraam, sunt Eu.",
        ref: "Ioan 8:58",
      },
    },
    {
      id: "d3_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "Sună doar ciudat în română. Pentru cei care ascultau, era îngrozitor: «Eu sunt» e numele pe care Dumnezeu Îl spusese lui Moise la rugul aprins.",
        },
        {
          from: "guide",
          text: "De asta scrie în versetul următor că au luat pietre să-L omoare. Nu se supăraseră pe o lecție de morală.",
        },
      ],
    },
    {
      id: "d3_4",
      type: "how_god_helps",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Și mai face ceva ce niciun învățător nu făcea: îi spune unui paralitic «fiule, păcatele îți sunt iertate».",
        },
        {
          from: "guide",
          text: "Cărturarii au reacționat corect: «cine poate să ierte păcatele decât Dumnezeu?» Dacă te calc eu pe picior, poate te ierta un străin? Numai cel căruia i s-a greșit poate ierta.",
        },
        { from: "guide", text: "Iar Iisus ierta păcate făcute altora. Adică Se punea pe Sine ca partea lezată în orice păcat din lume." },
      ],
    },
    {
      id: "d3_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "De aici ieși cu trei variante, și doar cu trei. Ori a mințit știind că minte. Ori credea sincer ceva neadevărat despre El — și atunci era un om bolnav. Ori spunea adevărul.",
        },
        {
          from: "guide",
          text: "Ce nu poți spune, cinstit, e «un învățător bun». Un om care pretinde că e Dumnezeu și nu e, nu e nici bun, nici întreg la cap.",
        },
      ],
    },
    {
      id: "d3_6",
      type: "truth_simple",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Iar dacă te uiți la viața Lui — la ce a spus, la cum a murit, la cine a devenit din niște pescari fricosți după aceea — primele două variante se țin greu.",
        },
      ],
    },
    {
      id: "d3_7",
      type: "quiz",
      order: 7,
      quiz: {
        question: "De ce nu putem spune doar că a fost un învățător bun?",
        options: [
          { text: "Pentru că e lipsă de respect", correct: false },
          { text: "Pentru că El a pretins că e Dumnezeu — asta nu e o opțiune", correct: true },
          { text: "Pentru că nu a învățat pe nimeni nimic", correct: false },
        ],
        explanation:
          "Nu e o chestiune de respect, e de logică. Pretenția Lui te obligă să alegi: mincinos, dus cu capul, sau Dumnezeu. Învățătorul cumsecade nu e pe listă.",
      },
    },
    {
      id: "d3_8",
      type: "memory_verse",
      order: 8,
      scripture: {
        text: "Eu sunt Calea, Adevărul și Viața. Nimeni nu vine la Tatăl decât prin Mine.",
        ref: "Ioan 14:6",
      },
    },
  ],
}

export const DOCTRINE_LESSONS: Lesson[] = [doctrinaL1, doctrinaL2, doctrinaL3]
