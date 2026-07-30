import type { Lesson } from "../domain.js"

export const spiritualL1: Lesson = {
  id: "spirit_lumea_l1", courseId: "spiritual_c1_lumea_nevazuta", order: 1,
  title: "Nu sunt două puteri egale", estMinutes: 11,
  anchorRefs: ["Coloseni 1:15-17", "Psalmul 103:19-21"], memoryVerseRef: "Coloseni 1:16",
  steps: [
    { id: "sl1_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Când vorbim despre lumea spirituală, putem ajunge repede să ne imaginăm o luptă între două forțe aproape egale. Biblia începe în alt loc: un singur Creator și tot restul creație." },
    ]},
    { id: "sl1_2", type: "scripture", order: 2, scripture: { text: "Pentru că prin El au fost făcute toate lucrurile care sunt în ceruri și pe pământ, cele văzute și cele nevăzute... Toate au fost făcute prin El și pentru El.", ref: "Coloseni 1:16" } },
    { id: "sl1_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Îngerii, Satan și demonii nu sunt dumnezei mai mici. Sunt făpturi. Nu sunt omniprezenți, omniscienți sau atotputernici." },
      { from: "guide", text: "Dumnezeu nu câștigă la limită. Răul este real și periculos, dar nu este egalul Lui și nu poate ieși din limitele îngăduite de Creator." },
    ]},
    { id: "sl1_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Folclorul face întunericul fascinant și aproape nelimitat. Scriptura ne învață să fim treji fără să fim obsedați." },
      { from: "guide", text: "Centrul credinței nu este cât de multe știi despre demoni, ci cui Îi aparții și cine este Iisus." },
    ]},
    { id: "sl1_5", type: "choice", order: 5, choice: { prompt: "Ce apare în tine când auzi despre lumea nevăzută?", options: [
      { id: "sl1a", label: "Frică — pare că răul poate fi oriunde.", branchStepId: "sl1_b_fear" },
      { id: "sl1b", label: "Curiozitate — vreau să știu toate detaliile.", branchStepId: "sl1_b_curiosity" },
      { id: "sl1c", label: "Îndoială — nu știu dacă este reală.", branchStepId: "sl1_b_doubt" },
    ]}},
    { id: "sl1_b_fear", type: "how_god_helps", order: 90, bubbles: [
      { from: "guide", text: "Frica mărește răul până acoperă imaginea lui Dumnezeu. Începe cu Creatorul, nu cu amenințarea: nimic nevăzut nu este în afara autorității Lui." },
    ]},
    { id: "sl1_b_curiosity", type: "how_god_helps", order: 91, bubbles: [
      { from: "guide", text: "Curiozitatea poate conduce la studiu, dar Biblia nu răspunde fiecărei întrebări. Nu umplem tăcerile Scripturii cu teorii prezentate drept certitudini." },
    ]},
    { id: "sl1_b_doubt", type: "how_god_helps", order: 92, bubbles: [
      { from: "guide", text: "Nu trebuie să pretinzi că ești convins. Cursul va porni de la textele biblice și va separa ce afirmă ele de interpretările adăugate ulterior." },
    ]},
    { id: "sl1_6", type: "quiz", order: 6, quiz: { question: "Care este raportul dintre Dumnezeu și puterile răului?", options: [
      { text: "Două forțe eterne care se echilibrează", correct: false },
      { text: "Creatorul suveran și făpturi răzvrătite, dar limitate", correct: true },
      { text: "Răul este doar o metaforă fără existență personală", correct: false },
    ], explanation: "Biblia afirmă atât realitatea răului personal, cât și diferența infinită dintre Creator și orice făptură." }},
    { id: "sl1_7", type: "step", order: 7, bubbles: [
      { from: "guide", text: "Când frica sau fascinația cresc, rostește întâi Coloseni 1:16-17 și întreabă: «Ce uit acum despre Iisus?»" },
    ]},
    { id: "sl1_8", type: "prayer", order: 8, bubbles: [
      { from: "guide", text: "«Doamne Iisuse, toate lucrurile au fost create prin Tine și pentru Tine. Păzește-mă de frică și de fascinația pentru întuneric. Ține-mi privirea la Tine.»" },
    ]},
    { id: "sl1_9", type: "memory_verse", order: 9, scripture: { text: "Toate au fost făcute prin El și pentru El.", ref: "Coloseni 1:16" } },
  ],
}

export const spiritualL2: Lesson = {
  id: "spirit_lumea_l2", courseId: "spiritual_c1_lumea_nevazuta", order: 2,
  title: "Îngerii sunt slujitori", estMinutes: 10,
  anchorRefs: ["Evrei 1:13-14", "Apocalipsa 22:8-9", "Psalmul 91:11"], memoryVerseRef: "Evrei 1:14",
  steps: [
    { id: "sl2_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Îngerii apar des în Biblie, dar aproape niciodată nu cer atenția asupra lor. Ei transmit, slujesc și apoi trimit privirea spre Dumnezeu." },
    ]},
    { id: "sl2_2", type: "scripture", order: 2, scripture: { text: "Nu sunt oare toți duhuri slujitoare trimise să îndeplinească o slujbă pentru cei ce vor moșteni mântuirea?", ref: "Evrei 1:14" } },
    { id: "sl2_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Îngerii sunt creați, personali și slujitori ai lui Dumnezeu. Nu sunt oameni morți care au devenit îngeri și nu sunt intermediari pe care trebuie să-i controlăm." },
      { from: "guide", text: "Biblia arată protecție și ajutor îngeresc, dar nu ne învață să aflăm numele unui înger personal sau să-i dăm porunci." },
    ]},
    { id: "sl2_4", type: "scripture", order: 4, scripture: { text: "Ferește-te să faci una ca aceasta! Eu sunt un împreună-slujitor cu tine... Închină-te lui Dumnezeu.", ref: "Apocalipsa 22:9" } },
    { id: "sl2_5", type: "choice", order: 5, choice: { prompt: "Ce ai auzit cel mai des despre îngeri?", options: [
      { id: "sl2a", label: "Că fiecare persoană are un înger pe care îl poate contacta.", branchStepId: "sl2_b_contact" },
      { id: "sl2b", label: "Că cei dragi devin îngeri după moarte.", branchStepId: "sl2_b_dead" },
      { id: "sl2c", label: "Aproape nimic; subiectul îmi este străin.", branchStepId: "sl2_b_new" },
    ]}},
    { id: "sl2_b_contact", type: "how_god_helps", order: 90, bubbles: [
      { from: "guide", text: "Scriptura ne îndreaptă cererile către Dumnezeu, nu către un înger identificat de noi. Dumnezeu poate trimite slujitori fără ca noi să-i chemăm sau controlăm." },
    ]},
    { id: "sl2_b_dead", type: "how_god_helps", order: 91, bubbles: [
      { from: "guide", text: "Biblia vorbește diferit despre oameni și îngeri. Speranța pentru cei ai lui Hristos este învierea și viața cu El, nu transformarea în îngeri." },
    ]},
    { id: "sl2_b_new", type: "how_god_helps", order: 92, bubbles: [
      { from: "guide", text: "Este suficient să începi cu rolul lor: slujesc porunca lui Dumnezeu și nu iau locul lui Iisus în relația ta cu Tatăl." },
    ]},
    { id: "sl2_6", type: "world_vs_truth", order: 6, bubbles: [
      { from: "guide", text: "Interesul pentru îngeri devine nesănătos când căutăm mesaje, nume și protecție separat de Dumnezeu. Un mesager credincios nu fură locul Celui care l-a trimis." },
    ]},
    { id: "sl2_7", type: "quiz", order: 7, quiz: { question: "Care este răspunsul biblic atunci când un înger primește închinare?", options: [
      { text: "O acceptă fiindcă este mai sfânt decât omul", correct: false },
      { text: "O redirecționează către Dumnezeu", correct: true },
      { text: "Cere o ofrandă înainte", correct: false },
    ], explanation: "În Apocalipsa 22, îngerul se numește împreună-slujitor și spune limpede: «Închină-te lui Dumnezeu»." }},
    { id: "sl2_8", type: "prayer", order: 8, bubbles: [
      { from: "guide", text: "«Tată, Îți mulțumesc că poruncești slujitorilor Tăi după înțelepciunea Ta. Păzește-mă să caut făptura în locul Creatorului.»" },
    ]},
    { id: "sl2_9", type: "memory_verse", order: 9, scripture: { text: "Nu sunt oare toți duhuri slujitoare?", ref: "Evrei 1:14" } },
  ],
}

export const spiritualL3: Lesson = {
  id: "spirit_lumea_l3", courseId: "spiritual_c1_lumea_nevazuta", order: 3,
  title: "Adversarul este real și limitat", estMinutes: 12,
  anchorRefs: ["1 Petru 5:8-9", "Ioan 8:44", "Iov 1:6-12"], memoryVerseRef: "1 Petru 5:9",
  steps: [
    { id: "sl3_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Biblia nu îl tratează pe Satan ca personaj de desen animat, dar nici ca prezență infinită aflată în orice loc." },
    ]},
    { id: "sl3_2", type: "scripture", order: 2, scripture: { text: "Potrivnicul vostru, diavolul, dă târcoale ca un leu care răcnește și caută pe cine să înghită. Împotriviți-vă lui tari în credință.", ref: "1 Petru 5:8-9" } },
    { id: "sl3_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Numele lui descriu lucrarea: adversar, acuzator, ispititor și tată al minciunii. Arma repetată este falsul care rupe încrederea în caracterul lui Dumnezeu." },
      { from: "guide", text: "El nu citește toate gândurile, nu este peste tot și nu acționează fără limite. Cartea Iov îl arată cerând și primind limite, nu conducând universul." },
    ]},
    { id: "sl3_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "O extremă îl ignoră complet. Cealaltă îl vede personal în spatele fiecărei întârzieri, dureri sau greșeli. Veghea biblică evită ambele extreme." },
    ]},
    { id: "sl3_5", type: "choice", order: 5, choice: { prompt: "Care extremă te atrage mai mult?", options: [
      { id: "sl3a", label: "Să cred că totul este doar psihologie sau întâmplare.", branchStepId: "sl3_b_ignore" },
      { id: "sl3b", label: "Să văd atac spiritual în aproape orice problemă.", branchStepId: "sl3_b_everywhere" },
      { id: "sl3c", label: "Oscilez între frică și neîncredere.", branchStepId: "sl3_b_swing" },
    ]}},
    { id: "sl3_b_ignore", type: "how_god_helps", order: 90, bubbles: [
      { from: "guide", text: "Biblia îți cere să lași loc realității personale a răului. Nu orice explicație spirituală este superstiție doar fiindcă nu o poți măsura." },
    ]},
    { id: "sl3_b_everywhere", type: "how_god_helps", order: 91, bubbles: [
      { from: "guide", text: "A vedea un atac în orice lucru poate muta responsabilitatea și hrăni frica. Scriptura vorbește și despre fire, lume, consecințe, boală și limite omenești." },
    ]},
    { id: "sl3_b_swing", type: "how_god_helps", order: 92, bubbles: [
      { from: "guide", text: "Nu trebuie să alegi între panică și negare. Poți recunoaște adversarul și rămâne liniștit în autoritatea lui Iisus." },
    ]},
    { id: "sl3_6", type: "quiz", order: 6, quiz: { question: "Care este lucrarea lui Satan subliniată repetat de Scriptură?", options: [
      { text: "Creează materie și viață", correct: false },
      { text: "Minte, ispitește și acuză", correct: true },
      { text: "Cunoaște orice gând omenesc", correct: false },
    ], explanation: "Puterea lui este reală, dar creată și limitată. Scriptura îl leagă în mod repetat de minciună, ispită și acuzație." }},
    { id: "sl3_7", type: "step", order: 7, bubbles: [
      { from: "guide", text: "Numește o acuzație care te împinge să te ascunzi. Apoi întreabă: «Mă conduce aceasta spre pocăință și Iisus sau doar spre disperare?»" },
    ]},
    { id: "sl3_8", type: "prayer", order: 8, bubbles: [
      { from: "guide", text: "«Tată, fă-mă treaz fără să mă faci obsedat. Arată-mi minciuna, păstrează-mi responsabilitatea și întărește-mă să mă împotrivesc prin credință.»" },
    ]},
    { id: "sl3_9", type: "memory_verse", order: 9, scripture: { text: "Împotriviți-vă lui tari în credință.", ref: "1 Petru 5:9" } },
  ],
}

export const SPIRITUAL_LUMEA_PART_A: Lesson[] = [spiritualL1, spiritualL2, spiritualL3]
