import type { Lesson } from "../domain.js"

/*
 * Ușa „înșelat" — trei lecții suplimentare în camera 9 (path_legatura).
 *
 * Cui îi scriem
 * ------------
 * Nu celui care a înșelat. Acela intră pe ușa „infidelitate", în camera 1, și
 * are nevoie de alt drum, care începe cu rușinea și cu pocăința. Aici scriem
 * celui căruia i s-a făcut. Este o distincție care se pierde des și care face
 * mult rău când se pierde: omul trădat ajunge să citească lecții de pocăință
 * scrise pentru celălalt și înțelege că el trebuie să se schimbe.
 *
 * De ce stă în camera 9
 * ---------------------
 * Pentru că este, înainte de orice, o legătură ruptă. Cele trei lecții de aici
 * nu formează un drum separat, ci se intercalează în cele șapte ale camerei,
 * prin mecanismul de secvențe al PathDef (vezi docs/24 și sarcina de cablare
 * din paths/index.ts). Ordinea propusă pentru ușa „înșelat":
 *
 *   legatura_l1 → inselat_l1 → legatura_l3 → inselat_l2 → legatura_l5 →
 *   inselat_l3 → legatura_l7
 *
 * Lecția 5 din cameră (iertare, împăcare și încredere, separate) este
 * obligatorie înaintea lui inselat_l3 și nu se scoate din secvență. Fără ea,
 * ultima lecție de aici s-ar citi ca o împingere spre întoarcere.
 *
 * Ce nu face acest set de lecții
 * ------------------------------
 * 1. Nu spune omului să rămână și nu îi spune să plece. Decizia despre
 *    căsnicie nu se ia dintr-o aplicație, ci cu oameni reali, care cunosc
 *    situația întreagă.
 * 2. Nu caută partea de vină a celui trădat. Există probleme într-o căsnicie
 *    și se discută la locul lor, mai târziu și cu cineva de față; ele nu sunt
 *    cauza trădării și nu se pun în fața unui om în prima săptămână.
 * 3. Nu grăbește iertarea și nu o transformă în condiție de acces la
 *    Dumnezeu.
 * 4. Nu folosește puncte, procente sau niveluri (docs/22 §8).
 *
 * Siguranță (docs/22)
 * -------------------
 * Trădarea vine des însoțită de nesomn, de gânduri negre și uneori de amenințări
 * din partea celuilalt. Lecția 1 poartă câmpul safety și numerele: 112 pentru
 * urgență, 116 123 pentru linia de sprijin emoțional, 116 111 pentru copii.
 * Se adaugă și îndemnul la control medical, pentru că este o realitate practică
 * pe care nimeni nu o spune în biserică.
 *
 * Regula textului biblic
 * ----------------------
 * Fiecare verset a fost verificat cuvânt cu cuvânt după Cornilescu 1924.
 */

export const inselatL1: Lesson = {
  id: "inselat_l1",
  courseId: "path_legatura",
  order: 21,
  title: "Când se rupe pământul sub tine",
  estMinutes: 8,
  anchorRefs: ["Psalmul 34:18"],
  memoryVerseRef: "Psalmul 34:18",
  safety: {
    topic: "mental_health",
    notice: "Dacă nu mai poți dormi de zile întregi, dacă ai gânduri de a-ți face rău sau dacă cineva te amenință, cere ajutor astăzi: 112 în caz de urgență, 116 123 pentru linia de sprijin emoțional, 116 111 pentru copii. Nu ești slab pentru că ceri ajutor într-o astfel de săptămână."
  },
  steps: [
    {
      id: "in1_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Nu încep cu un vers și nu încep cu un sfat." },
        { from: "guide", text: "Încep cu ce este adevărat: ce ți s-a făcut este grav. Nu exagerezi. Nu ești sensibil." },
        { from: "guide", text: "Dacă astăzi nu poți citi până la capăt, lasă și vino mâine. Nu se pierde nimic." }
      ]
    },
    {
      id: "in1_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Oamenii care au trecut prin asta spun cu toții același lucru: nu doare doar fapta. Doare că se rescrie trecutul." },
        { from: "guide", text: "Te uiți înapoi la ziua aceea de vară, la vacanța aceea, la seara aceea în care râdeați, și nu mai știi ce era adevărat și ce nu." },
        { from: "guide", text: "Nu ai pierdut doar o relație. Ai pierdut siguranța a ceea ce ai trăit. De aceea este atât de greu și de aceea nu se trece în două săptămâni." }
      ]
    },
    {
      id: "in1_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Trei lucruri practice, spuse simplu, pentru că nimeni nu le spune în biserică." },
        { from: "guide", text: "Unu: mergi la medic și fă-ți analizele. Nu este lipsă de credință, este grijă de trupul tău." },
        { from: "guide", text: "Doi: nu lua nicio decizie mare în primele zile. Nici să pleci, nici să ierți, nici să anunți pe toată lumea. Mintea unui om lovit nu este mintea lui obișnuită." },
        { from: "guide", text: "Trei: spune-i unui singur om în care ai încredere. Nu la zece. Unul singur, care nu va povesti mai departe." }
      ]
    },
    {
      id: "in1_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea are două răspunsuri gata făcute și amândouă vin prea repede." },
        { from: "guide", text: "Unul: «pleacă imediat, nu meriți asta». Celălalt, auzit din biserică: «iartă și treci peste, ține familia»." },
        { from: "guide", text: "Amândouă îți cer o decizie în săptămâna în care nu poți nici să mănânci. Niciuna nu întreabă întâi ce s-a rupt în tine." },
        { from: "guide", text: "Dumnezeu nu începe cu decizia. Începe cu omul zdrobit." }
      ]
    },
    {
      id: "in1_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: Dumnezeu nu stă departe și nu așteaptă să te aduni." },
        { from: "guide", text: "Este scris că este aproape tocmai de cei cu inima frântă. Nu de cei care s-au reparat." }
      ]
    },
    {
      id: "in1_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Nu ți se cere să te rogi frumos în zilele astea." },
        { from: "guide", text: "În Psalmi sunt rugăciuni scrise de oameni trădați de prieteni apropiați. Sunt aspre. Nu au fost șterse din carte." },
        { from: "guide", text: "Poți să Îi spui exact ce simți, inclusiv că ești furios. Dumnezeu nu Se sperie și nu Se supără." }
      ]
    },
    {
      id: "in1_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Domnul este aproape de cei cu inima înfrântă și mântuiește pe cei cu duhul zdrobit.",
        ref: "Psalmul 34:18"
      },
      bubbles: [
        { from: "guide", text: "Nu scrie că este aproape de cei care iartă repede. Nici de cei care iau decizia corectă." },
        { from: "guide", text: "Scrie că este aproape de cei cu inima înfrântă. Astăzi te încadrezi fără să faci nimic." }
      ]
    },
    {
      id: "in1_8",
      type: "name_struggle",
      order: 8,
      bubbles: [
        { from: "guide", text: "Nu îți cer să povestești ce s-a întâmplat. Îți cer un singur cuvânt." },
        { from: "guide", text: "Ce simți cel mai tare acum? Furie? Rușine? Gol? Frică? Toate deodată?" },
        { from: "guide", text: "Un cuvânt este destul. Ce este numit poate fi dus la Dumnezeu." }
      ]
    },
    {
      id: "in1_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Cui Îi este aproape Domnul, după Psalmul 34:18?",
        options: [
          { text: "Celor care au iertat deja", correct: false },
          { text: "Celor cu inima înfrântă și cu duhul zdrobit", correct: true },
          { text: "Celor care iau repede decizia corectă", correct: false }
        ],
        explanation: "Versetul nu pune nicio condiție de vindecare și nicio condiție de iertare. Apropierea lui Dumnezeu este legată tocmai de starea de zdrobire, nu de ieșirea din ea."
      }
    },
    {
      id: "in1_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "Domnul este aproape de cei cu inima înfrântă",
        ref: "Psalmul 34:18"
      },
      bubbles: [
        { from: "guide", text: "Cuvântul de sprijin este «aproape». Nu «va veni». Este deja." }
      ]
    },
    {
      id: "in1_11",
      type: "prayer",
      order: 11,
      bubbles: [
        { from: "guide", text: "«Doamne, nu am cuvinte frumoase. M-a mințit și nu mai știu ce a fost adevărat. Stai aproape astăzi. Nu Îți cer încă nimic altceva. Amin.»" }
      ]
    },
    {
      id: "in1_12",
      type: "journal",
      order: 12,
      journalPrompt: "Scrie un singur cuvânt pentru ce simți astăzi. Sub el scrie numele omului căruia îi vei spune și ziua în care îl suni.",
      reward: { xp: 0, axisDeltas: { emotional_peace: 1 } }
    }
  ]
}

export const inselatL2: Lesson = {
  id: "inselat_l2",
  courseId: "path_legatura",
  order: 22,
  title: "Nu a fost pentru că nu ai fost destul",
  estMinutes: 8,
  anchorRefs: ["Plângerile 3:22-23"],
  memoryVerseRef: "Plângerile 3:23",
  steps: [
    {
      id: "in2_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Astăzi luăm în primire întrebarea care te ține treaz." },
        { from: "guide", text: "«Ce nu am avut eu?»" }
      ]
    },
    {
      id: "in2_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Întrebarea vine singură și vine repede. În prima săptămână ești deja în fața oglinzii, numărând." },
        { from: "guide", text: "Cât am mai slăbit. Cât am îmbătrânit. Cât am fost obosit în anii cu copii mici. Cât de rar am râs." },
        { from: "guide", text: "Iar mintea, care vrea să înțeleagă cu orice preț, preferă un vinovat cunoscut înaintea unui haos fără explicație. Și cel mai la îndemână vinovat ești tu." }
      ]
    },
    {
      id: "in2_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Să așezăm două lucruri separat, pentru că se amestecă mereu și amestecul lor face rău." },
        { from: "guide", text: "Unu: într-o căsnicie există aproape întotdeauna probleme reale, ale amândurora. Se discută și au rezolvare." },
        { from: "guide", text: "Doi: nicio problemă de căsnicie nu produce singură o trădare. Între nemulțumire și minciună stă o alegere, iar alegerea nu a fost a ta." },
        { from: "guide", text: "Cine amestecă cele două ajunge la propoziția «m-a înșelat pentru că eu nu am fost destul». Este falsă, oricât de logică pare la trei dimineața." }
      ]
    },
    {
      id: "in2_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea îți spune, și uneori îți spun chiar oameni din biserică: «trebuie să fi fost și partea ta»." },
        { from: "guide", text: "Se spune ca să pară echilibrat. Dar unui om căruia îi sângerează rana nu i se face bilanțul. Se oprește întâi sângerarea." },
        { from: "guide", text: "Vom vorbi și despre partea ta. În camera asta există o lecție întreagă despre partea ta de zid. Dar nu astăzi și nu ca explicație pentru ce ți s-a făcut." }
      ]
    },
    {
      id: "in2_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: valoarea ta nu a fost stabilită de alegerea lui." },
        { from: "guide", text: "El a ales pentru el. Alegerea aceea spune ceva despre el. Nu este un verdict despre cât valorezi tu." }
      ]
    },
    {
      id: "in2_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Cartea Plângerilor este scrisă de un om care privea un oraș făcut scrum. Nu este o carte optimistă." },
        { from: "guide", text: "Și totuși, la mijlocul ei, apar două versete despre dimineață. Nu spun că ruinele nu există. Spun că îndurarea vine din nou, mâine." },
        { from: "guide", text: "Asta îți trebuie acum: nu o explicație, ci o porție nouă de putere pentru fiecare dimineață." }
      ]
    },
    {
      id: "in2_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Bunătățile Domnului nu s-au sfârșit, îndurările Lui nu sunt la capăt, ci se înnoiesc în fiecare dimineață. Și credincioșia Ta este atât de mare!",
        ref: "Plângerile 3:22-23"
      },
      bubbles: [
        { from: "guide", text: "În fiecare dimineață. Nu o dată pe săptămână și nu când ți-ai revenit." },
        { from: "guide", text: "Iar ultimul cuvânt este «credincioșia». Este exact cuvântul care s-a rupt în viața ta. Aici stă nerupt." }
      ]
    },
    {
      id: "in2_8",
      type: "name_struggle",
      order: 8,
      bubbles: [
        { from: "guide", text: "Care este propoziția pe care ți-o spui în fața oglinzii?" },
        { from: "guide", text: "«Nu am fost destul de frumoasă.» «Nu am fost destul de bărbat.» «Dacă aș fi fost altfel...»" },
        { from: "guide", text: "Spune-o o dată, în gura mare, și ascultă cum sună afară din capul tău. De obicei sună altfel." }
      ]
    },
    {
      id: "in2_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Cum stă problema vinei când cineva a fost înșelat?",
        options: [
          { text: "Dacă relația avea probleme, vina se împarte în două", correct: false },
          { text: "Problemele din relație se discută la locul lor, dar alegerea de a trăda a fost a celui care a trădat", correct: true },
          { text: "Cel înșelat nu are niciodată nimic de lucrat în relație", correct: false }
        ],
        explanation: "Sunt două lucruri diferite. Problemele reale dintr-o căsnicie există și se discută, la timpul lor și de obicei cu cineva de față. Dar între o problemă și o trădare stă o alegere, iar alegerea aparține celui care a făcut-o."
      }
    },
    {
      id: "in2_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "se înnoiesc în fiecare dimineață. Și credincioșia Ta este atât de mare!",
        ref: "Plângerile 3:23"
      },
      bubbles: [
        { from: "guide", text: "Spune-l mâine, înainte să deschizi ochii bine. Dimineața este cea mai grea parte a zilei acum." }
      ]
    },
    {
      id: "in2_11",
      type: "prayer",
      order: 11,
      bubbles: [
        { from: "guide", text: "«Doamne, mă cântăresc de zile întregi și ies mereu prea puțin. Spune-mi Tu cât valorez și dă-mi putere pentru dimineața de mâine. Amin.»" }
      ]
    },
    {
      id: "in2_12",
      type: "journal",
      order: 12,
      journalPrompt: "Scrie propoziția din oglindă. Taie-o cu o linie. Sub ea scrie: «Alegerea a fost a lui, nu măsura mea.»",
      reward: { xp: 0, axisDeltas: { identity: 1 } }
    }
  ]
}

export const inselatL3: Lesson = {
  id: "inselat_l3",
  courseId: "path_legatura",
  order: 23,
  title: "Ce fac cu ce a mai rămas",
  estMinutes: 9,
  anchorRefs: ["Coloseni 3:13", "Romani 12:18"],
  memoryVerseRef: "Romani 12:18",
  steps: [
    {
      id: "in3_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Ultima lecție din setul acesta. Și nu îți va spune ce să faci cu căsnicia ta." },
        { from: "guide", text: "Nu pentru că nu contează, ci pentru că nu se poate. Nu știu dacă s-a oprit, dacă mai minte, dacă ești în siguranță, dacă sunt copii și câți ani au." }
      ]
    },
    {
      id: "in3_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Toată lumea din jurul tău are o părere și ți-o spune fără să o ceri." },
        { from: "guide", text: "Iar tu, care ești singurul care va trăi cu urmarea, ești singurul care nu știe încă." },
        { from: "guide", text: "E în regulă să nu știi. Nu îți trebuie răspunsul astăzi. Îți trebuie următorul pas." }
      ]
    },
    {
      id: "in3_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Ce îți pot spune sunt lucrurile care rămân adevărate indiferent de decizie." },
        { from: "guide", text: "Unu: iertarea nu înseamnă împăcare, iar împăcarea nu înseamnă încredere refăcută. Sunt trei lucruri, și lecția 5 din camera asta le desparte pe fiecare." },
        { from: "guide", text: "Doi: poți ierta și să nu te întorci. Nu ești dator să stai într-un loc în care ești în pericol." },
        { from: "guide", text: "Trei: decizia despre căsnicie se ia cu oameni reali, nu într-o aplicație. Un păstor care nu se grăbește, un consilier, un om care vă cunoaște pe amândoi." }
      ]
    },
    {
      id: "in3_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea măsoară finalul în două feluri: ori ați rămas împreună, ori nu." },
        { from: "guide", text: "Dumnezeu se uită la altceva: ce fel de om ieși tu din lunile astea." },
        { from: "guide", text: "Poți să rămâi împreună și să ieși amărât pe viață. Și poți să te desparți și să nu duci ură mai departe. Finalul nu spune totul." }
      ]
    },
    {
      id: "in3_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: nu ești obligat să decizi astăzi, dar ești liber să nu duci otrava mai departe." },
        { from: "guide", text: "Iertarea este singura parte care nu depinde de el. Restul depinde și de el." }
      ]
    },
    {
      id: "in3_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Nu ți se cere să ierți într-o zi ce s-a construit în ani." },
        { from: "guide", text: "Iertarea, în cazuri ca al tău, nu este un moment. Este o hotărâre pe care o iei de mai multe ori, uneori în fiecare săptămână, până când rămâne." },
        { from: "guide", text: "Și nu se face din puterea ta, ci privind cât ți s-a iertat ție. De aceea versetul nu spune «iartă pentru că ești bun»." }
      ]
    },
    {
      id: "in3_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Îngăduiți-vă unii pe alții și, dacă unul are pricină să se plângă de altul, iertați-vă unul pe altul. Cum v-a iertat Hristos, așa iertați-vă și voi.",
        ref: "Coloseni 3:13"
      },
      bubbles: [
        { from: "guide", text: "«Dacă unul are pricină să se plângă» — Scriptura recunoaște că pricina este reală. Nu ți se cere să spui că nu s-a întâmplat nimic." },
        { from: "guide", text: "Ți se cere să nu mai ceri plată. Atât. Nu să uiți și nu să te faci că e bine." }
      ]
    },
    {
      id: "in3_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Dacă este cu putință, întrucât atârnă de voi, trăiți în pace cu toți oamenii.",
        ref: "Romani 12:18"
      },
      bubbles: [
        { from: "guide", text: "«Dacă este cu putință». Uneori nu este, și Dumnezeu a scris asta în verset ca să nu te acuzi." },
        { from: "guide", text: "Porția ta este mărginită. Când ai făcut-o, ai terminat, chiar dacă pacea nu a venit." }
      ]
    },
    {
      id: "in3_9",
      type: "name_struggle",
      order: 9,
      bubbles: [
        { from: "guide", text: "Spune care este următorul tău pas. Nu decizia. Pasul." },
        { from: "guide", text: "«Sun păstorul.» «Caut un consilier.» «Iau o săptămână fără să discutăm nimic.» «Merg la analize.»" },
        { from: "guide", text: "Un singur pas. Este de ajuns pentru săptămâna asta." }
      ]
    },
    {
      id: "in3_10",
      type: "quiz",
      order: 10,
      quiz: {
        question: "Ce se poate spune cu siguranță despre iertare în această situație?",
        options: [
          { text: "Că iertarea cere reluarea relației ca înainte", correct: false },
          { text: "Că iertarea este partea care nu depinde de celălalt și nu obligă la întoarcere", correct: true },
          { text: "Că trebuie făcută într-o singură zi, altfel nu este reală", correct: false }
        ],
        explanation: "Iertarea, împăcarea și încrederea sunt trei lucruri distincte, așa cum le desparte lecția 5 a acestei camere. Iertarea se face între om și Dumnezeu și eliberează; împăcarea cere doi oameni și o schimbare reală; încrederea se reclădește în timp, prin fapte. Și niciuna nu cere cuiva să rămână într-un loc periculos."
      }
    },
    {
      id: "in3_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Dacă este cu putință, întrucât atârnă de voi, trăiți în pace cu toți oamenii.",
        ref: "Romani 12:18"
      },
      bubbles: [
        { from: "guide", text: "«Întrucât atârnă de voi». Nu mai mult. Nu tot." }
      ]
    },
    {
      id: "in3_12",
      type: "prayer",
      order: 12,
      bubbles: [
        { from: "guide", text: "«Doamne, nu știu ce voi face cu căsnicia asta. Știu doar că nu vreau să ies un om otrăvit. Ia otrava din mine, chiar dacă nu se schimbă nimic afară. Amin.»" }
      ]
    },
    {
      id: "in3_13",
      type: "journal",
      order: 13,
      journalPrompt: "Scrie un singur pas pentru săptămâna asta și ziua în care îl faci. Nu scrie decizia finală. Doar pasul.",
      reward: { xp: 0, axisDeltas: { relationships: 1 } }
    }
  ]
}

export const INSELAT_LESSONS: Lesson[] = [inselatL1, inselatL2, inselatL3]

/*
 * Practicile pentru ușa „înșelat", aliniate pe index cu INSELAT_LESSONS.
 * Niciuna nu cere o discuție cu cel care a trădat și niciuna nu cere o decizie.
 */
export const INSELAT_PRACTICES: string[] = [
  "Astăzi fă două lucruri pentru trup: mănâncă o masă întreagă și fă-ți programare la medic.",
  "Astăzi, când începe numărătoarea în fața oglinzii, spune cu voce tare: «Alegerea a fost a lui, nu măsura mea.»",
  "Astăzi fă un singur pas din cei pe care i-ai scris și nu discuta despre decizia finală cu nimeni."
]
