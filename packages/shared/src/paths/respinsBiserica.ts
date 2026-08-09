import type { Lesson } from "../domain.js"

/*
 * Ușa „respins_biserica" — două lecții suplimentare în camera 7
 * (path_impreuna).
 *
 * Cui îi scriem
 * ------------
 * Omului rănit de oameni din biserică: dat afară din slujire fără explicație,
 * bârfit după ce a spus ceva în taină, umilit în public, stăpânit de un
 * conducător, sau pur și simplu uitat când i-a fost cel mai greu. Este o rană
 * care ține zeci de ani și pe care nu o înțelege nimeni din afară, pentru că
 * locul în care omul mergea să plângă este locul din pricina căruia plânge.
 *
 * Ce face și ce nu face setul
 * ---------------------------
 * 1. Nu îl convinge să se întoarcă. Nici măcar la sfârșit. Îi dă criterii și îl
 *    lasă să aleagă când și unde.
 * 2. Nu apără instituția. Dumnezeu Însuși vorbește împotriva păstorilor care
 *    risipesc, iar lecția 1 îl lasă pe El să o spună, cu Ieremia 23 și
 *    Ezechiel 34. Asta este mișcarea centrală a setului: omul trebuie să vadă
 *    negru pe alb că Dumnezeu nu este de partea celui care l-a rănit.
 * 3. Nu confundă rănirea cu infracțiunea. Pasul rb1_3 spune răspicat că abuzul,
 *    atingerea nepotrivită, violența, banii luați și orice faptă împotriva unui
 *    copil se anunță la poliție, iar iertarea este o discuție separată, care
 *    vine după, nu în loc. Acest pas nu se scoate și nu se îndulcește.
 * 4. Nu lasă Evrei 10:25 să fie folosit ca bici. Lecția 2 îl citește împreună
 *    cu versetul 24, care spune scopul adunării.
 * 5. Nu folosește puncte, procente sau niveluri (docs/22 §8).
 *
 * De ce Ioan 9
 * ------------
 * Pentru că este singurul loc din Evanghelii unde cineva este dat afară de
 * oamenii religioși și unde se spune limpede ce s-a întâmplat după: a fost
 * căutat și găsit afară. Omul acela a văzut mai mult afară decât înăuntru.
 * Se citează doar versetul 34, iar întâlnirea din 35 se povestește în proză,
 * ca să nu intre în cod forma „Isus" din text și să se ciocnească cu
 * convenția de scriere din restul aplicației.
 *
 * Siguranță (docs/22)
 * -------------------
 * Lecția 1 poartă câmpul safety: 112 pentru urgență, 116 123 pentru linia de
 * sprijin emoțional, 116 111 pentru copii, plus îndemnul de a anunța faptele
 * penale.
 *
 * Regula textului biblic
 * ----------------------
 * Fiecare verset a fost verificat cuvânt cu cuvânt după Cornilescu 1924.
 * Ezechiel 34:4 este citat trunchiat, până la „nu căutați pe cea pierdută".
 */

export const respinsBisericaL1: Lesson = {
  id: "respins_biserica_l1",
  courseId: "path_impreuna",
  order: 21,
  title: "Când rana vine din casă",
  estMinutes: 9,
  anchorRefs: ["Ieremia 23:1", "Ezechiel 34:4", "Psalmul 55:12", "Psalmul 147:3"],
  memoryVerseRef: "Psalmul 147:3",
  safety: {
    topic: "mental_health",
    notice: "Dacă ce ți s-a făcut a fost o faptă penală — abuz, atingere nepotrivită, violență, bani luați sau orice faptă împotriva unui copil — se anunță la poliție, chiar dacă a trecut timp. Pentru pericol imediat sună la 112; abuzul, neglijarea, exploatarea sau violența asupra unui copil se raportează la 119; copiii și adolescenții pot încerca 116 111 pentru consiliere, iar pentru sprijin emoțional poți încerca 116 123. Iertarea este o discuție separată și nu ține locul unei sesizări."
  },
  steps: [
    {
      id: "rb1_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Ai deschis ușa asta și îți spun de la început un lucru: nu ai venit ca să fii convins să te întorci." },
        { from: "guide", text: "Nu asta facem aici. Ne uităm întâi la ce s-a întâmplat." }
      ]
    },
    {
      id: "rb1_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Rana asta are ceva ce alte răni nu au." },
        { from: "guide", text: "Când te lovește lumea, te duci la biserică. Când te lovește biserica, unde te duci?" },
        { from: "guide", text: "Locul în care mergeai să plângi este locul din pricina căruia plângi. De aceea rămâne ani de zile și de aceea nu o înțeleg cei care nu au trecut prin ea." }
      ]
    },
    {
      id: "rb1_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Trei lămuriri înainte să mergem mai departe." },
        { from: "guide", text: "Unu: aici vorbim despre oameni, nu despre Dumnezeu. S-au amestecat în mintea ta pentru că oamenii aceia vorbeau în Numele Lui. Îl vom despărți pe El de ei." },
        { from: "guide", text: "Doi: dacă ce ți s-a făcut a fost o faptă penală — abuz, atingere nepotrivită, bătaie, bani luați, ceva făcut unui copil — locul acela este la poliție, nu într-o lecție. Se anunță, chiar dacă a trecut timp. Iertarea vine după, nu în loc." },
        { from: "guide", text: "Trei: nu tot ce doare este abuz. Uneori a fost prostie omenească, uneori păcat adevărat, uneori amândouă. Vom numi exact ce a fost, fără să mărim și fără să micșorăm." }
      ]
    },
    {
      id: "rb1_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Ai auzit două răspunsuri și amândouă te-au lăsat singur." },
        { from: "guide", text: "Din afară: «toate bisericile sunt la fel, lasă-le baltă». Comod, dar nu îți pune nimic în loc." },
        { from: "guide", text: "Dinăuntru, poate: «nu te atinge de unsul Domnului», «nu vorbi, ca să nu faci rușine lucrării», «roagă-te și taci»." },
        { from: "guide", text: "A doua este mai rea, pentru că folosește Numele lui Dumnezeu ca să îți închidă gura. Nu Dumnezeu ți-a închis gura acolo." }
      ]
    },
    {
      id: "rb1_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: Dumnezeu nu este de partea celui care te-a rănit." },
        { from: "guide", text: "Nu este nici neutru și nu Se uită în altă parte. Are cuvinte tari despre asta, scrise cu mult înainte să te naști tu." }
      ]
    },
    {
      id: "rb1_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Nu îți spun eu că a fost nedrept. Îți arăt unde spune El." },
        { from: "guide", text: "Sunt capitole întregi în care Dumnezeu vorbește direct împotriva conducătorilor care Îi strică turma. Nu sunt cuvintele mele. Sunt ale Lui." },
        { from: "guide", text: "Citește-le rar. Sunt scrise și pentru tine." }
      ]
    },
    {
      id: "rb1_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Vai de păstorii care nimicesc și risipesc turma pășunii Mele, zice Domnul.",
        ref: "Ieremia 23:1"
      },
      bubbles: [
        { from: "guide", text: "«Vai» este cuvântul pe care Dumnezeu îl folosește când vine judecata. Aici îl folosește pentru păstori, nu pentru oi." }
      ]
    },
    {
      id: "rb1_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Nu întăriți pe cele slabe, nu vindecați pe cea bolnavă, nu legați pe cea rănită, n-aduceți înapoi pe cea rătăcită, nu căutați pe cea pierdută",
        ref: "Ezechiel 34:4"
      },
      bubbles: [
        { from: "guide", text: "Uită-te ce le reproșează. Nu că au greșit învățătura. Că nu au legat pe cea rănită și nu au căutat pe cea pierdută." },
        { from: "guide", text: "Dumnezeu ține socoteala rănilor nelegate. Inclusiv a ta." }
      ]
    },
    {
      id: "rb1_9",
      type: "scripture",
      order: 9,
      scripture: {
        text: "Nu un vrăjmaș mă batjocorește, căci aș suferi; nu potrivnicul meu se ridică împotriva mea, căci m-aș ascunde dinaintea lui.",
        ref: "Psalmul 55:12"
      },
      bubbles: [
        { from: "guide", text: "David spune: dacă mă lovea un dușman, aș fi dus-o. Mă lovește unul de-al meu." },
        { from: "guide", text: "Scriptura recunoaște că rana venită dinăuntru doare altfel. Nu ești slab pentru că nu treci peste ea." }
      ]
    },
    {
      id: "rb1_10",
      type: "name_struggle",
      order: 10,
      bubbles: [
        { from: "guide", text: "Spune ce s-a întâmplat, într-o singură propoziție, fără să înmoi cuvintele." },
        { from: "guide", text: "Nu «a fost o neînțelegere». Ce a fost? «Am fost scos din slujire fără să fiu întrebat.» «Mi s-a spus în față, de față cu alții, că sunt un om rău.» «Am spus ceva în taină și a doua zi știa toată biserica.»" },
        { from: "guide", text: "Numește-o exact. Ce este spus pe jumătate nu se poate vindeca." }
      ]
    },
    {
      id: "rb1_11",
      type: "quiz",
      order: 11,
      quiz: {
        question: "Ce spune Dumnezeu despre conducătorii care rănesc turma?",
        options: [
          { text: "Că nu pot fi niciodată puși la îndoială de cei din turmă", correct: false },
          { text: "Că El Însuși vorbește împotriva lor și le cere socoteală pentru rănile nelegate", correct: true },
          { text: "Că rana este semn că cel rănit nu a fost destul de supus", correct: false }
        ],
        explanation: "În Ieremia 23 și Ezechiel 34, Dumnezeu vorbește direct împotriva conducătorilor care risipesc și nu îngrijesc. Reproșul nu este despre învățătură, ci despre oile slabe neîntărite și despre cele rănite și nelegate. Cine folosește «nu te atinge de unsul Domnului» ca să impună tăcerea folosește Scriptura împotriva a ceea ce Scriptura spune aici."
      }
    },
    {
      id: "rb1_12",
      type: "memory_verse",
      order: 12,
      scripture: {
        text: "tămăduiește pe cei cu inima zdrobită și le leagă rănile.",
        ref: "Psalmul 147:3"
      },
      bubbles: [
        { from: "guide", text: "«Le leagă rănile.» Exact lucrul pe care nu l-au făcut oamenii aceia, îl face El." }
      ]
    },
    {
      id: "rb1_13",
      type: "prayer",
      order: 13,
      bubbles: [
        { from: "guide", text: "«Doamne, m-au rănit oameni care vorbeau în Numele Tău și de atunci nu mai știu ce este de la Tine și ce este de la ei. Desparte Tu lucrurile în mine. Leagă ce au lăsat ei nelegat. Amin.»" }
      ]
    },
    {
      id: "rb1_14",
      type: "journal",
      order: 14,
      journalPrompt: "Scrie într-o singură propoziție ce s-a întâmplat, fără să înmoi cuvintele. Apoi scrie dedesubt: «Aceasta a fost fapta unor oameni.»",
      reward: { xp: 0, axisDeltas: { emotional_peace: 1 } }
    }
  ]
}

export const respinsBisericaL2: Lesson = {
  id: "respins_biserica_l2",
  courseId: "path_impreuna",
  order: 22,
  title: "Înapoi, dar nu la fel",
  estMinutes: 10,
  anchorRefs: ["Ioan 9:34", "Evrei 10:24-25", "1 Petru 5:2-3", "Romani 12:19"],
  memoryVerseRef: "Evrei 10:24",
  steps: [
    {
      id: "rb2_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Astăzi vorbim despre ce faci de aici înainte. Și, cum am spus, nu îți voi cere să te întorci." }
      ]
    },
    {
      id: "rb2_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Este în Evanghelie un capitol întreg despre un om dat afară." },
        { from: "guide", text: "Un orb din naștere este vindecat. În loc de bucurie, urmează o anchetă. Este chemat și întrebat. Sunt chemați părinții lui, cărora le este frică și se feresc să răspundă. Apoi este chemat a doua oară." },
        { from: "guide", text: "La capăt, oamenii cu autoritate îi spun că este născut în păcat și îl dau afară. Pentru că a povestit ce i se făcuse." }
      ]
    },
    {
      id: "rb2_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Patru lucruri practice, dacă te gândești vreodată la o adunare." },
        { from: "guide", text: "Unu, timpul: rana poate cere o perioadă de oprire și vindecare. Dar nu transforma izolarea într-o destinație; Hristos te cheamă în poporul Lui, într-un loc sigur și sănătos, nu neapărat în locul care te-a rănit." },
        { from: "guide", text: "Doi, alt loc: ai voie să mergi în altă parte. Nu ești dator să te vindeci fix în locul care te-a rănit." },
        { from: "guide", text: "Trei, cum intri: du-te cu cineva, stai în spate, pleacă înainte de final dacă simți nevoia. Nimeni nu îți dă note." },
        { from: "guide", text: "Patru, fără responsabilități: nu primi nicio slujbă în primele luni. Ai fost rănit într-un loc de muncă; nu te angaja a doua zi în altul." }
      ]
    },
    {
      id: "rb2_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Ți s-a citat, poate, versetul: «să nu părăsim adunarea noastră». Ți s-a citat ca pe un bici." },
        { from: "guide", text: "Numai că versetul acela vine după altul, iar acela spune de ce ne adunăm: ca să veghem unii asupra altora și să ne îndemnăm la dragoste și la fapte bune." },
        { from: "guide", text: "Versetul 25 nu obligă pe nimeni să rămână într-o comunitate abuzivă și nu oferă conducerii dreptul să ascundă păcatul. Dar porunca de a nu abandona adunarea rămâne: caută, în timp și cu discernământ, o comunitate în care adevărul, dragostea și răspunderea sunt reale." },
        { from: "guide", text: "Dumnezeu nu te cheamă la o clădire anume. Te cheamă la trupul lui Hristos, la oameni care veghează unii asupra altora și se supun ei înșiși Cuvântului." }
      ]
    },
    {
      id: "rb2_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: ai fost dat afară dintr-o clădire, nu din Împărăție." },
        { from: "guide", text: "Ușa aceea a fost ținută de oameni. Cealaltă nu este ținută de ei." }
      ]
    },
    {
      id: "rb2_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Ce s-a întâmplat cu omul acela dat afară?" },
        { from: "guide", text: "Iisus a auzit că l-au dat afară. Nu l-a așteptat să se întoarcă și nu l-a certat că a ieșit. L-a căutat și l-a găsit afară." },
        { from: "guide", text: "Iar acolo, afară, i S-a descoperit. Omul acela a văzut mai mult afară decât văzuse înăuntru." }
      ]
    },
    {
      id: "rb2_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Tu ești născut cu totul în păcat, i-au răspuns ei, și vrei să ne înveți pe noi? Și l-au dat afară.",
        ref: "Ioan 9:34"
      },
      bubbles: [
        { from: "guide", text: "Observă argumentul: nu i-au răspuns la ce a spus. I-au spus cine este. Așa se face și azi." }
      ]
    },
    {
      id: "rb2_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Să veghem unii asupra altora, ca să ne îndemnăm la dragoste și la fapte bune. Să nu părăsim adunarea noastră, cum au unii obicei; ci să ne îndemnăm unii pe alții și cu atât mai mult, cu cât vedeți că ziua se apropie.",
        ref: "Evrei 10:24-25"
      },
      bubbles: [
        { from: "guide", text: "Citește-le împreună, așa cum sunt scrise. Cine îl citește doar pe al doilea a tăiat jumătate din poruncă." }
      ]
    },
    {
      id: "rb2_9",
      type: "scripture",
      order: 9,
      scripture: {
        text: "Păstoriți turma lui Dumnezeu, care este sub paza voastră, nu de silă, ci de bunăvoie, după voia lui Dumnezeu; nu pentru un câștig mârșav, ci cu lepădare de sine; nu ca și cum ați stăpâni peste cei ce v-au căzut la împărțeală, ci făcându-vă pilde turmei.",
        ref: "1 Petru 5:2-3"
      },
      bubbles: [
        { from: "guide", text: "Îl citez pentru un singur motiv: ca să vezi cântarul. «Nu ca și cum ați stăpâni.»" },
        { from: "guide", text: "Dacă ai fost stăpânit, nu tu ai fost problema. S-a călcat o regulă scrisă negru pe alb." }
      ]
    },
    {
      id: "rb2_10",
      type: "scripture",
      order: 10,
      scripture: {
        text: "Preaiubiților, nu vă răzbunați singuri; ci lăsați să se răzbune mânia lui Dumnezeu; căci este scris: Răzbunarea este a Mea; Eu voi răsplăti, zice Domnul.",
        ref: "Romani 12:19"
      },
      bubbles: [
        { from: "guide", text: "Nu îți cere să spui că nu s-a întâmplat nimic. Îți cere să nu porți tu războiul." },
        { from: "guide", text: "Și nu înseamnă tăcere acolo unde este vorba de o faptă penală — aceea se anunță, cum am spus în lecția trecută. Înseamnă doar că nu îți faci din răzbunare a doua slujbă." }
      ]
    },
    {
      id: "rb2_11",
      type: "name_struggle",
      order: 11,
      bubbles: [
        { from: "guide", text: "Scrie trei semne după care vei recunoaște un loc sigur." },
        { from: "guide", text: "Dacă nu îți vin: «se poate pune o întrebare fără să fii pedepsit», «cel care conduce își cere iertare când greșește», «ce spui în taină rămâne în taină», «nu ți se cer bani ca să fii binecuvântat»." },
        { from: "guide", text: "Scrie-le. Data viitoare nu intri pe ochi închiși. Intri cu o listă." }
      ]
    },
    {
      id: "rb2_12",
      type: "quiz",
      order: 12,
      quiz: {
        question: "Cum se citește corect îndemnul din Evrei 10:25?",
        options: [
          { text: "Ca o obligație de a rămâne oriunde, indiferent ce se întâmplă acolo", correct: false },
          { text: "Împreună cu versetul dinainte: ne adunăm ca să veghem unii asupra altora și să ne îndemnăm la dragoste", correct: true },
          { text: "Ca un îndemn valabil doar pentru cei care nu au fost răniți", correct: false }
        ],
        explanation: "Versetul 25 nu stă singur. Versetul 24 dă scopul adunării: vegherea unora asupra altora și îndemnul la dragoste și la fapte bune. Îndemnul este spre oameni care fac lucrul acesta, nu spre o clădire anume, și nu poate fi folosit ca să fie ținut cineva într-un loc care îl vatămă."
      }
    },
    {
      id: "rb2_13",
      type: "memory_verse",
      order: 13,
      scripture: {
        text: "Să veghem unii asupra altora, ca să ne îndemnăm la dragoste și la fapte bune.",
        ref: "Evrei 10:24"
      },
      bubbles: [
        { from: "guide", text: "Ăsta este scopul. Când cauți un loc, asta cauți." }
      ]
    },
    {
      id: "rb2_14",
      type: "prayer",
      order: 14,
      bubbles: [
        { from: "guide", text: "«Doamne, nu am putere să intru pe o ușă de biserică. Nu îmi cere astăzi mai mult decât pot. Adu-mi în cale doi-trei oameni care veghează și dă-mi curaj când vine ziua. Amin.»" }
      ]
    },
    {
      id: "rb2_15",
      type: "journal",
      order: 15,
      journalPrompt: "Scrie cele trei semne ale unui loc sigur. Apoi scrie un singur nume: un om credincios cu care ai putea bea o cafea luna asta, în afara oricărei clădiri.",
      reward: { xp: 0, axisDeltas: { relationships: 1 } }
    }
  ]
}

export const RESPINS_BISERICA_LESSONS: Lesson[] = [
  respinsBisericaL1,
  respinsBisericaL2
]

/*
 * Practicile pentru ușa „respins_biserica", aliniate pe index cu lecțiile.
 * Niciuna nu cere întoarcerea în locul acela și niciuna nu cere o întâlnire cu
 * cel care a rănit.
 */
export const RESPINS_BISERICA_PRACTICES: string[] = [
  "Astăzi spune-I lui Dumnezeu, cu voce tare, ce ți-au făcut oamenii aceia. Fără să înmoi cuvintele și fără să închei cu o scuză pentru ei.",
  "Astăzi scrie-i unui singur om credincios din afara locului aceluia și propune-i o cafea. Nu ești obligat să vorbești despre biserică."
]
