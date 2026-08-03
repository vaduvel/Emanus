import type { Lesson } from "../domain.js"

/**
 * Cursul "Energii, horoscop, karma" — slotul lib_alte_credinte din raftul
 * "Întrebări mari". Aici intră tot ce ține de New Age: astrologie, horoscop,
 * energii, reiki, karma, canalizare, ghizi spirituali, cristale, numerologie.
 *
 * Reguli de ton (docs/14-carta-doctrinara.md, doctrineHar.ts):
 * - Nu se ridiculizează omul. Cel care citește horoscopul caută ceva real.
 * - Nu se numește nicio confesiune, nu se compară confesiuni, nu se spune
 *   nimănui să plece de unde este.
 * - Nu se pune diagnostic pe suferința niciunui om. Ce i s-a întâmplat cuiva
 *   nu se explică prin păcatul lui (Iov 42:7, Ioan 9:2-3, Luca 13:1-5).
 * - Nu se importă pedepsele civile ale lui Israel ca instrucțiuni pentru azi.
 * - Păcatul se numește totuși pe nume, judecata se anunță, iar chemarea la
 *   pocăință este în fiecare lecție, nu ca notă de subsol.
 * - Testul de ton: dacă un om speriat citește asta singur, noaptea, trebuie
 *   să se teamă mai puțin de întuneric și mai mult de a rămâne fără Hristos.
 * - Fiecare lecție are o limită cinstită.
 */

const COURSE = "lib_alte_credinte"

export const newAgeL1: Lesson = {
  id: "newage_l1", courseId: COURSE, order: 1,
  title: "De ce vrem să știm ce urmează", estMinutes: 12,
  anchorRefs: ["Deuteronom 18:10-14", "Isaia 47:13-14", "Matei 6:34"], memoryVerseRef: "Deuteronom 18:13",
  steps: [
    { id: "na1_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Nimeni nu deschide horoscopul din răutate. Îl deschide pentru că mâine e nesigur și azi e greu. Vrem să știm dacă scăpăm, dacă vine cineva, dacă ne ajunge banul." },
      { from: "guide", text: "Dorința e omenească și n-o batjocorim. Dar hai să ne uităm cinstit unde ne duce." },
    ]},
    { id: "na1_2", type: "scripture", order: 2, scripture: { text: "Să nu fie la tine nimeni care să-și treacă pe fiul sau pe fiica lui prin foc, nimeni care să aibă meșteșugul de ghicitor, de cititor în stele, de vestitor al viitorului, de vrăjitor.", ref: "Deuteronom 18:10" } },
    { id: "na1_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Textul nu spune că lucrurile astea sunt prostii. Spune că sunt urâciune înaintea Domnului. Adică le tratează ca fiind reale și grave, nu ca pe niște jocuri." },
      { from: "guide", text: "Și dă motivul, în versetul 13: «Tu să te ții în totul totului tot numai de Domnul Dumnezeul tău». Problema nu e curiozitatea. Problema e că îți iei siguranța din altă parte decât de la El." },
    ]},
    { id: "na1_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Isaia vorbește unui imperiu întreg care se baza pe astrologi și le spune ceva foarte concret: «cei ce împart cerul, care pândesc stelele, care vestesc după lunile noi ce are să ți se întâmple» — să se ridice și să te scape, dacă pot." },
      { from: "guide", text: "Asta e testul. Nu «e adevărat sau fals», ci «te scapă sau nu?». Un răspuns care nu te poate salva nu e un răspuns, chiar dacă uneori pare că nimerește." },
    ]},
    { id: "na1_5", type: "choice", order: 5, choice: { prompt: "Tu de ce te-ai uitat prima dată?", options: [
      { id: "na1a", label: "Din distracție, nu cred cu adevărat în asta.", branchStepId: "na1_b_joc" },
      { id: "na1b", label: "Pentru că aveam o decizie mare și nu știam ce să fac.", branchStepId: "na1_b_decizie" },
      { id: "na1c", label: "Pentru că îmi era frică de ce urmează.", branchStepId: "na1_b_frica" },
    ]}},
    { id: "na1_b_joc", type: "how_god_helps", order: 90, bubbles: [
      { from: "guide", text: "Ține minte doar atât: nimeni nu începe crezând. Se începe cu «e doar o glumă» și se ajunge la «mai văd o dată, să fiu sigur»." },
      { from: "guide", text: "Întreabă-te sincer: dacă mâine îți iese ceva rău acolo, te-ar strica ziua? Dacă da, nu mai e glumă." },
    ]},
    { id: "na1_b_decizie", type: "how_god_helps", order: 91, bubbles: [
      { from: "guide", text: "Ai avut nevoie de călăuzire, și asta e o nevoie reală. Dumnezeu nu te lasă fără ea, dar o dă altfel: prin Cuvântul Lui, prin rugăciune, prin oameni maturi și prin mintea pe care ți-a dat-o." },
      { from: "guide", text: "Diferența e uriașă. Călăuzirea Lui te face responsabil. Ghicitul te face pasiv, pentru că îți spune că e deja scris." },
    ]},
    { id: "na1_b_frica", type: "how_god_helps", order: 92, bubbles: [
      { from: "guide", text: "Frica e chiar motorul. Cauți în stele pentru că ți-e frică, iar ce citești acolo îți dă și mai multă frică. Așa se învârte roata." },
      { from: "guide", text: "Iisus n-a promis că-ți arată mâine. A promis că e cu tine în el. «Nu vă îngrijorați dar de ziua de mâine.» Nu pentru că mâine e sigur, ci pentru că El e." },
    ]},
    { id: "na1_6", type: "quiz", order: 6, quiz: { question: "De ce interzice Deuteronom 18 ghicitul viitorului?", options: [
      { text: "Pentru că e o superstiție fără nicio putere reală", correct: false },
      { text: "Pentru că îți muți încrederea de la Dumnezeu la altceva", correct: true },
      { text: "Pentru că numai preoții aveau voie să facă asta", correct: false },
    ], explanation: "Textul se încheie cu porunca de a te ține numai de Domnul. Miza nu e informația, ci încrederea: de unde îți iei siguranța zilei de mâine." }},
    { id: "na1_7", type: "step", order: 7, bubbles: [
      { from: "guide", text: "Azi, dezabonează-te de la o singură sursă: o pagină, un cont, o notificare zilnică. Una singură, acum, cât ești aici." },
    ]},
    { id: "na1_8", type: "journal", order: 8, journalPrompt: "Care e frica reală din spatele întrebării «ce urmează»? Scrie-o pe nume." },
    { id: "na1_9", type: "truth_simple", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită a acestei lecții: nu îți promitem că vei ști ce urmează. Nu vei ști. Îți spunem doar Cine ține ziua de mâine și că Îl poți cunoaște azi." },
    ]},
    { id: "na1_10", type: "prayer", order: 10, bubbles: [
      { from: "guide", text: "«Doamne, am căutat siguranță unde nu era. Iartă-mă. Nu-mi arăta viitorul, ci ține-mă de mână în el. Vreau să mă țin numai de Tine.»" },
    ]},
    { id: "na1_11", type: "memory_verse", order: 11, scripture: { text: "Tu să te ții în totul totului tot numai de Domnul Dumnezeul tău.", ref: "Deuteronom 18:13" } },
  ],
}

export const newAgeL2: Lesson = {
  id: "newage_l2", courseId: COURSE, order: 2,
  title: "Horoscopul și Cine ține stelele", estMinutes: 13,
  anchorRefs: ["Geneza 1:14-16", "Ieremia 10:2", "Daniel 2:27-28"], memoryVerseRef: "Ieremia 10:2",
  steps: [
    { id: "na2_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Astrologia nu e nouă și nu e o modă de pe internet. Are mii de ani și s-a născut acolo unde stelele erau socotite dumnezei care hotărăsc soarta oamenilor." },
      { from: "guide", text: "Asta e cheia. Ca să crezi în horoscop, trebuie să crezi că ceva de deasupra ta îți scrie viața și nu poate fi întors." },
    ]},
    { id: "na2_2", type: "scripture", order: 2, scripture: { text: "Dumnezeu a zis: «Să fie niște luminători în întinderea cerului, ca să despartă ziua de noapte; ei să fie niște semne care să arate vremurile, zilele și anii».", ref: "Geneza 1:14" } },
    { id: "na2_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Prima pagină a Bibliei spune ce sunt stelele: ceasuri și calendar. Lucruri făcute. Nu sunt persoane, nu au voință, nu au ce spune despre tine." },
      { from: "guide", text: "Iar Coloseni 1:16-17 adaugă: toate au fost făcute prin Hristos și prin El se țin toate. Ce se spune despre stele că ar hotărî pentru tine, Scriptura spune că El ține în mână." },
    ]},
    { id: "na2_4", type: "scripture", order: 4, scripture: { text: "Nu vă luați după felul de viețuire al neamurilor și nu vă temeți de semnele cerului, cum se tem neamurile de ele.", ref: "Ieremia 10:2" } },
    { id: "na2_5", type: "world_vs_truth", order: 5, bubbles: [
      { from: "guide", text: "Există un moment în Biblie în care astrologii cei mai buni din lume sunt chemați să dea un răspuns. Împăratul Babilonului cere să i se spună visul. Ei răspund cinstit: nimeni pe pământ nu poate face asta." },
      { from: "guide", text: "Iar Daniel spune: «Este în ceruri un Dumnezeu care descoperă tainele». Nu «eu sunt mai priceput». Ci: nu e o chestiune de tehnică, ci de Persoană. Cerul nu e o hartă. Cerul are un Nume." },
    ]},
    { id: "na2_6", type: "choice", order: 6, choice: { prompt: "Ce te ține agățat de horoscop?", options: [
      { id: "na2a", label: "Uneori chiar nimerește, nu pot să neg.", branchStepId: "na2_b_nimereste" },
      { id: "na2b", label: "Mă ajută să înțeleg ce fel de om sunt.", branchStepId: "na2_b_identitate" },
      { id: "na2c", label: "E doar un obicei de dimineață, ca o cafea.", branchStepId: "na2_b_obicei" },
    ]}},
    { id: "na2_b_nimereste", type: "how_god_helps", order: 90, bubbles: [
      { from: "guide", text: "Două lucruri, amândouă adevărate. Unul: textele sunt scrise atât de larg încât i se potrivesc oricui. Doi: Scriptura nu neagă că în spatele practicilor oculte poate lucra o putere reală — vezi Faptele 16:16, unde o roabă chiar ghicea." },
      { from: "guide", text: "Dar acolo, Pavel nu s-a mirat de exactitate. A poruncit duhului să iasă. Faptul că ceva funcționează nu înseamnă că vine de la Dumnezeu." },
    ]},
    { id: "na2_b_identitate", type: "how_god_helps", order: 91, bubbles: [
      { from: "guide", text: "Cauți un răspuns la «cine sunt eu». E cea mai bună întrebare pe care o poți pune. Doar că o pui unei hărți." },
      { from: "guide", text: "O zodie îți dă un tipar fix, din care nu poți ieși. Hristos îți dă un nume și o schimbare. Una te închide, cealaltă te eliberează." },
    ]},
    { id: "na2_b_obicei", type: "how_god_helps", order: 92, bubbles: [
      { from: "guide", text: "Atunci înlocuiește obiceiul, nu doar taie-l. Un gol rămas gol se umple singur, de obicei cu ce era înainte." },
      { from: "guide", text: "Pune în locul lui un verset pe zi. Aceeași durată, același moment al dimineții." },
    ]},
    { id: "na2_7", type: "quiz", order: 7, quiz: { question: "Ce spune Geneza 1 despre stele?", options: [
      { text: "Că sunt puteri care hotărăsc soarta oamenilor", correct: false },
      { text: "Că sunt lucruri făcute, care arată vremurile, zilele și anii", correct: true },
      { text: "Că nu trebuie să ne uităm niciodată la cer", correct: false },
    ], explanation: "Stelele sunt creație, nu creator. Frumusețea lor Îl arată pe Dumnezeu, dar nu vorbesc despre viața ta." }},
    { id: "na2_8", type: "step", order: 8, bubbles: [
      { from: "guide", text: "Mâine dimineață, în locul în care citeai horoscopul, citește Psalmul 19. Are exact tema: ce spun cu adevărat cerurile." },
    ]},
    { id: "na2_9", type: "journal", order: 9, journalPrompt: "Dacă zodia nu-ți mai spune cine ești, cine crezi tu că ești? Scrie ce-ți vine, chiar dacă nu știi." },
    { id: "na2_10", type: "truth_simple", order: 10, bubbles: [
      { from: "guide", text: "Limita cinstită: nu spunem că oricine s-a uitat vreodată la horoscop e pierdut, și nu punem etichete pe nimeni. Spunem doar unde duce drumul și că poți coborî din el azi." },
    ]},
    { id: "na2_11", type: "prayer", order: 11, bubbles: [
      { from: "guide", text: "«Doamne, Tu ai făcut stelele și le ții. M-am temut de semne în loc să mă tem de Tine. Îmi pare rău. Spune-Mi Tu cine sunt.»" },
    ]},
    { id: "na2_12", type: "memory_verse", order: 12, scripture: { text: "Nu vă temeți de semnele cerului, cum se tem neamurile de ele.", ref: "Ieremia 10:2" } },
  ],
}

export const newAgeL3: Lesson = {
  id: "newage_l3", courseId: COURSE, order: 3,
  title: "Energia care nu are nume", estMinutes: 13,
  anchorRefs: ["Coloseni 1:16-17", "Faptele 17:24-28", "Ioan 1:1-4"], memoryVerseRef: "Coloseni 1:17",
  steps: [
    { id: "na3_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "«Energie.» «Vibrație.» «Universul mi-a trimis.» «Atrag ce emit.» Reiki, cristale, aliniere, canale care se deschid și se închid." },
      { from: "guide", text: "Toate au un lucru în comun, și e singurul care contează: puterea la care apelezi n-are nume și n-are față. Nu poți vorbi cu ea. Nu te iubește. O manevrezi cu tehnică." },
    ]},
    { id: "na3_2", type: "scripture", order: 2, scripture: { text: "El este mai înainte de toate lucrurile și toate se țin prin El.", ref: "Coloseni 1:17" } },
    { id: "na3_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Există într-adevăr ceva care ține totul în picioare. Aici nu ne certăm. Biblia spune că simți corect: lumea nu stă singură." },
      { from: "guide", text: "Dar ce o ține nu e un curent. E o Persoană. Și diferența schimbă tot: pe o energie o folosești, pe o Persoană o cunoști. Una răspunde la tehnică, Cealaltă răspunde la pocăință și credință." },
    ]},
    { id: "na3_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Pavel a stat într-un oraș plin de spiritualități amestecate și n-a râs de ei. A pornit chiar de la altarul lor: «În El avem viața, mișcarea și ființa». Le-a spus: Cel pe care Îl bâjbâiți nu e departe." },
      { from: "guide", text: "Dar a mers până la capăt: acum Dumnezeu poruncește tuturor oamenilor de pretutindeni să se pocăiască. Nu «adăugați-L și pe El la listă». Ci: întoarceți-vă." },
    ]},
    { id: "na3_5", type: "choice", order: 5, choice: { prompt: "Cu ce ai avut de-a face cel mai mult?", options: [
      { id: "na3a", label: "Terapii cu energie, reiki, deschideri de canale.", branchStepId: "na3_b_reiki" },
      { id: "na3b", label: "Cristale, obiecte de protecție, lucruri purtate la mine.", branchStepId: "na3_b_obiecte" },
      { id: "na3c", label: "«Universul», gândire pozitivă, legea atracției.", branchStepId: "na3_b_univers" },
    ]}},
    { id: "na3_b_reiki", type: "how_god_helps", order: 90, bubbles: [
      { from: "guide", text: "Aici e o întrebare pe care merită să ți-o pui: dacă e doar relaxare și atingere, de ce are inițieri, simboluri și maeștri care transmit? Ce se transmite, mai exact, și de la cine?" },
      { from: "guide", text: "Iisus a vindecat cu autoritate, pe față, fără taxă și fără inițiere. Dacă te-ai deschis unei puteri fără nume, poți închide azi ușa aceea, cu voce tare, în Numele Lui." },
    ]},
    { id: "na3_b_obiecte", type: "how_god_helps", order: 91, bubbles: [
      { from: "guide", text: "Un obiect nu te poate păzi. Dacă ar putea, ar fi mai puternic decât Cel care l-a făcut din pământ." },
      { from: "guide", text: "Aici e testul cinstit: dacă gândul de a-l scoate de la tine îți dă neliniște, atunci nu e o podoabă. E o încredere. Și încrederea aceea are un singur loc unde stă bine." },
    ]},
    { id: "na3_b_univers", type: "how_god_helps", order: 92, bubbles: [
      { from: "guide", text: "Ideea că atragi ce emiți pare blândă, dar are un capăt crud: dacă ți se întâmplă ceva rău, înseamnă că l-ai chemat tu. E o povară pe care nimeni n-o poate duce." },
      { from: "guide", text: "Iisus a respins direct logica asta. Când I s-a arătat o nenorocire și I s-a cerut explicația, a răspuns de două ori «nu» — nu erau mai păcătoși decât ceilalți. Și a păstrat totuși avertismentul: dacă nu vă pocăiți, veți pieri la fel." },
    ]},
    { id: "na3_6", type: "quiz", order: 6, quiz: { question: "Care e diferența de fond între «energie» și Dumnezeul Bibliei?", options: [
      { text: "Energia e mai slabă, dar funcționează la fel", correct: false },
      { text: "Energia se folosește prin tehnică; Dumnezeu e o Persoană pe care o cunoști și înaintea căreia te pleci", correct: true },
      { text: "Nu e nicio diferență, sunt două nume pentru același lucru", correct: false },
    ], explanation: "O forță o manevrezi. Unei Persoane I te supui și de la ea primești iertare. Coloseni spune că Cel care ține toate lucrurile are trup, nume și cruce." }},
    { id: "na3_7", type: "step", order: 7, bubbles: [
      { from: "guide", text: "Fă o listă scurtă, doar pentru tine, cu tot ce ai în casă sau la tine legat de practicile astea. Nu arunca încă nimic. Doar scrie. Mâine vorbim despre ce faci cu ea." },
    ]},
    { id: "na3_8", type: "journal", order: 8, journalPrompt: "Ce ai căutat prin acele practici: liniște, sănătate, control, sens? Scrie nevoia adevărată." },
    { id: "na3_9", type: "truth_simple", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: dacă ai o boală, mergi la medic și continuă tratamentul. Nimic din lecția asta nu e sfat medical și nimeni de aici nu-ți spune să oprești ce ți-a dat doctorul." },
    ]},
    { id: "na3_10", type: "prayer", order: 10, bubbles: [
      { from: "guide", text: "«Doamne Iisuse, Tu ții toate lucrurile. Am căutat o putere fără nume, când Tu aveai un Nume și o cruce. Vin la Tine. Fii Tu Cel de care mă țin.»" },
    ]},
    { id: "na3_11", type: "memory_verse", order: 11, scripture: { text: "El este mai înainte de toate lucrurile și toate se țin prin El.", ref: "Coloseni 1:17" } },
  ],
}

export const newAgeL4: Lesson = {
  id: "newage_l4", courseId: COURSE, order: 4,
  title: "Karma și crucea", estMinutes: 12,
  anchorRefs: ["Galateni 6:7-8", "Efeseni 2:8-9", "Romani 6:23"], memoryVerseRef: "Efeseni 2:8",
  steps: [
    { id: "na4_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Karma sună drept. Ce dai, primești. Universul ține socoteala. Mulți oameni care nu cred în nimic cred totuși în asta." },
      { from: "guide", text: "Și e cu atât mai interesant cu cât Biblia spune ceva foarte asemănător. Dar apoi spune ceva ce karma nu poate spune niciodată." },
    ]},
    { id: "na4_2", type: "scripture", order: 2, scripture: { text: "Nu vă înșelați: Dumnezeu nu Se lasă să fie batjocorit. Ce seamănă omul, aceea va și secera.", ref: "Galateni 6:7" } },
    { id: "na4_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Deci partea aspră e adevărată. Există semănat și seceriș. Faptele au urmări reale, iar la capăt e o judecată adevărată. Nu ocolim asta ca să sune frumos." },
      { from: "guide", text: "Dar observă cuvântul dinainte: «Dumnezeu». Nu «universul». Socoteala nu e ținută de o lege oarbă, ci de Cineva care te cunoaște. Iar Cineva poate face un lucru pe care o lege nu-l poate face niciodată: poate ierta." },
    ]},
    { id: "na4_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Aici se rupe totul în două. Karma spune: plătești tu, singur, până la capăt, iar dacă nu ajunge o viață, mai vine una. Nu există iertare, pentru că n-ai cui să-i ceri." },
      { from: "guide", text: "Evanghelia spune: plata a fost făcută. Nu ștearsă din registru, ci plătită, de Altcineva, pe cruce. «Plata păcatului este moartea, dar darul fără plată al lui Dumnezeu este viața veșnică.»" },
    ]},
    { id: "na4_5", type: "choice", order: 5, choice: { prompt: "Ce te apasă când te gândești la ce ai făcut?", options: [
      { id: "na4a", label: "Simt că plătesc acum pentru ce am făcut atunci.", branchStepId: "na4_b_platesc" },
      { id: "na4b", label: "Încerc să echilibrez cu fapte bune.", branchStepId: "na4_b_echilibru" },
      { id: "na4c", label: "Nu cred că mai pot fi iertat pentru ceva anume.", branchStepId: "na4_b_prea" },
    ]}},
    { id: "na4_b_platesc", type: "how_god_helps", order: 90, bubbles: [
      { from: "guide", text: "Ai grijă aici, e important. Uneori suferința chiar vine din urmările alegerilor noastre, și e cinstit să recunoaștem. Dar de multe ori nu vine de acolo, iar Iisus a refuzat de două ori să lege necazul cuiva de păcatul lui." },
      { from: "guide", text: "Deci nu-ți citi durerea ca pe o factură. Adu-I ce ai făcut, cere iertare pentru ce e de cerut, și lasă restul în mâna Lui, nu într-o socoteală pe care n-o poți verifica." },
    ]},
    { id: "na4_b_echilibru", type: "how_god_helps", order: 91, bubbles: [
      { from: "guide", text: "Faptele bune sunt bune. Dar nu sunt monedă. Dacă ar fi, n-ai ști niciodată câte îți trebuie, și n-ai fi liniștit nicio zi." },
      { from: "guide", text: "«Prin har ați fost mântuiți, prin credință. Și aceasta nu vine de la voi, ci este darul lui Dumnezeu.» Un dar nu se echilibrează. Se primește." },
    ]},
    { id: "na4_b_prea", type: "how_god_helps", order: 92, bubbles: [
      { from: "guide", text: "Dacă ar exista un păcat prea mare, ar însemna că există ceva mai puternic decât moartea lui Hristos. Nu există." },
      { from: "guide", text: "Spune-I lucrul acela pe nume, exact, fără să-l micșorezi și fără să-l explici. Ce numești poate fi iertat." },
    ]},
    { id: "na4_6", type: "quiz", order: 6, quiz: { question: "Care e diferența dintre karma și ce spune Evanghelia?", options: [
      { text: "Evanghelia spune că faptele nu au nicio urmare", correct: false },
      { text: "Amândouă spun că faptele au urmări, dar numai Evanghelia are iertare plătită de Altcineva", correct: true },
      { text: "Karma e mai severă, iar Evanghelia e mai îngăduitoare cu păcatul", correct: false },
    ], explanation: "Evanghelia nu ia păcatul mai ușor. Îl ia atât de în serios încât a fost nevoie de cruce. Diferența nu e severitatea, ci existența unui Mântuitor." }},
    { id: "na4_7", type: "step", order: 7, bubbles: [
      { from: "guide", text: "Scrie pe o hârtie un singur lucru pe care simți că îl «plătești». Apoi scrie peste el: «plătit la cruce». Păstrează hârtia până termini cursul." },
    ]},
    { id: "na4_8", type: "journal", order: 8, journalPrompt: "Ce ai încercat să răscumperi singur, și de cât timp?" },
    { id: "na4_9", type: "truth_simple", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: iertarea lui Dumnezeu e deplină, dar nu șterge automat urmările pământești. Dacă ai de reparat ceva cu un om, du-te și repară. Iertarea îți dă puterea, nu scutirea." },
    ]},
    { id: "na4_10", type: "prayer", order: 10, bubbles: [
      { from: "guide", text: "«Doamne, am crezut că trebuie să plătesc singur. Recunosc ce am făcut, nu-l ascund. Primesc darul pe care nu-l pot câștiga. Mulțumesc pentru cruce.»" },
    ]},
    { id: "na4_11", type: "memory_verse", order: 11, scripture: { text: "Prin har ați fost mântuiți, prin credință. Și aceasta nu vine de la voi, ci este darul lui Dumnezeu.", ref: "Efeseni 2:8" } },
  ],
}

export const newAgeL5: Lesson = {
  id: "newage_l5", courseId: COURSE, order: 5,
  title: "Ghizi, canalizări și îngeri de lumină", estMinutes: 13,
  anchorRefs: ["2 Corinteni 11:13-15", "1 Ioan 4:1", "Faptele 16:16-19"], memoryVerseRef: "1 Ioan 4:1",
  steps: [
    { id: "na5_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Multe practici New Age nu vorbesc despre forțe, ci despre ființe: ghizi spirituali, maeștri înălțați, entități care dau mesaje prin cineva. Și aproape întotdeauna mesajele sunt frumoase." },
      { from: "guide", text: "Tocmai asta e problema. Scriptura nu ne avertizează despre monștri. Ne avertizează despre lumină falsă." },
    ]},
    { id: "na5_2", type: "scripture", order: 2, scripture: { text: "Și nu este de mirare, căci chiar Satana se preface într-un înger de lumină.", ref: "2 Corinteni 11:14" } },
    { id: "na5_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Un înșelător care arată înfricoșător nu înșală pe nimeni. De aceea forma e blândă: pace, iubire, acceptare, «ești deja lumină»." },
      { from: "guide", text: "Testul nu e cum te simți când primești mesajul. Testul e ce spune mesajul despre Iisus Hristos: că a venit în trup, că a murit pentru păcat, că a înviat, că este singurul drum. Un duh care ocolește crucea s-a demascat singur." },
    ]},
    { id: "na5_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "În Filipi, o roabă cu duh de ghicire striga după apostoli: «Oamenii aceștia sunt robii Dumnezeului Celui Preaînalt și vă vestesc calea mântuirii». Fiecare cuvânt era adevărat." },
      { from: "guide", text: "Și totuși Pavel a poruncit duhului să iasă. Un adevăr rostit din sursa greșită rămâne o capcană. Iar femeia n-a fost pedepsită — a fost eliberată. Ea era victima, nu ținta." },
    ]},
    { id: "na5_5", type: "choice", order: 5, choice: { prompt: "Ce ți s-a întâmplat, mai exact?", options: [
      { id: "na5a", label: "Am primit mesaje sau am mers la cineva care «vede».", branchStepId: "na5_b_mesaje" },
      { id: "na5b", label: "Am simțit o prezență și nu știu ce era.", branchStepId: "na5_b_prezenta" },
      { id: "na5c", label: "Am făcut asta pentru altcineva, nu pentru mine.", branchStepId: "na5_b_altul" },
    ]}},
    { id: "na5_b_mesaje", type: "how_god_helps", order: 90, bubbles: [
      { from: "guide", text: "Nu analiza mesajele. Nu le cântări, nu căuta care s-a adeverit. Asta te ține exact acolo. Închide subiectul și adu-l la Iisus ca păcat, nu ca enigmă." },
      { from: "guide", text: "Dacă ți s-a spus ceva despre viitorul tău și îți stă în minte, spune cu voce tare: nu primesc asta. Viața mea e în mâna lui Hristos." },
    ]},
    { id: "na5_b_prezenta", type: "how_god_helps", order: 91, bubbles: [
      { from: "guide", text: "Nu-ți spunem ce a fost, pentru că n-avem cum să știm, și nimeni prin ecran n-ar trebui să-ți pună un diagnostic spiritual. Poate a fost real, poate a fost oboseală sau frică. Amândouă se întâmplă." },
      { from: "guide", text: "Ce știm sigur e la cine te duci: la Iisus, cu voce tare, chiar acum, cu propriile tale cuvinte. Și nu rămâne singur cu asta — spune unui creștin matur." },
    ]},
    { id: "na5_b_altul", type: "how_god_helps", order: 92, bubbles: [
      { from: "guide", text: "Ai făcut-o din dragoste, probabil pentru un copil sau un bolnav. Nu te condamnăm pentru intenție. Dar dragostea nu sfințește ușa pe care ai deschis-o." },
      { from: "guide", text: "Poți face acum lucrul pe care voiai să-l faci atunci: roagă-te tu însuți pentru el, direct, în Numele lui Iisus. Ai voie. Ai învățat asta în cursul despre Mijlocitor." },
    ]},
    { id: "na5_6", type: "quiz", order: 6, quiz: { question: "Cum se cercetează un duh, după 1 Ioan 4?", options: [
      { text: "După cât de bine te face să te simți", correct: false },
      { text: "După ce mărturisește despre Iisus Hristos venit în trup", correct: true },
      { text: "După cât de exacte sunt informațiile pe care le dă", correct: false },
    ], explanation: "Criteriul e hristologic, nu emoțional și nici informațional. Exactitatea nu dovedește nimic — duhul din Faptele 16 spunea adevărul curat." }},
    { id: "na5_7", type: "step", order: 7, bubbles: [
      { from: "guide", text: "Spune azi unui creștin în care ai încredere un lucru concret din trecutul tău legat de zona asta. Unul singur. Ieșirea la lumină e primul pas real." },
    ]},
    { id: "na5_8", type: "journal", order: 8, journalPrompt: "Ce mesaj ai primit atunci și de care nu ai scăpat? Scrie-l aici și lasă-l aici." },
    { id: "na5_9", type: "truth_simple", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: dacă auzi voci, dacă vezi lucruri sau dacă nu mai dormi, mergi și la medic. Nu e necredință și nu e rușine. Uneori e și una, și alta, iar noi nu avem cum să le despărțim prin ecran." },
    ]},
    { id: "na5_10", type: "prayer", order: 10, bubbles: [
      { from: "guide", text: "«Iisuse, am ascultat de o altă voce. Nu vreau. Tu ai murit și ai înviat, Tu ești adevărul. Curăță-mi mintea de ce am primit și învață-mă să Te ascult pe Tine.»" },
    ]},
    { id: "na5_11", type: "memory_verse", order: 11, scripture: { text: "Preaiubiților, să nu dați crezare oricărui duh, ci să cercetați duhurile, dacă sunt de la Dumnezeu.", ref: "1 Ioan 4:1" } },
  ],
}

export const newAgeL6: Lesson = {
  id: "newage_l6", courseId: COURSE, order: 6,
  title: "Cum ieși, concret", estMinutes: 15,
  anchorRefs: ["Faptele 19:18-20", "Coloseni 1:13-14", "1 Ioan 1:9"], memoryVerseRef: "Coloseni 1:13",
  steps: [
    { id: "na6_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "A înțelege nu e același lucru cu a ieși. Lecția asta nu mai explică nimic. Aici se face." },
    ]},
    { id: "na6_2", type: "scripture", order: 2, scripture: { text: "Mulți din cei ce crezuseră veneau să mărturisească și să spună ce făcuseră. Și unii din cei ce făcuseră vrăjitorii și-au adus cărțile și le-au ars înaintea tuturor.", ref: "Faptele 19:18-19" } },
    { id: "na6_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Uită-te bine la text, are trei părți și niciuna nu se poate sări. Întâi au crezut. Apoi au spus pe față ce făcuseră. Abia apoi au ars." },
      { from: "guide", text: "Și mai e ceva ce se pierde ușor: și-au ars cărțile lor. Nu ale vecinilor. Nu ale orașului. Nu ale nimănui altcuiva. Fiecare a dat foc la ce era al lui." },
    ]},
    { id: "na6_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Nu era un ritual cu putere în el. Nu e o formulă care rupe ceva în văzduh. Era o despărțire publică și costisitoare — textul spune chiar cât au valorat cărțile." },
      { from: "guide", text: "Renunțarea nu e o incantație. E o hotărâre. Iar puterea nu vine din gestul tău, ci din Cel în care ai crezut: «ne-a izbăvit de sub puterea întunericului și ne-a strămutat în Împărăția Fiului dragostei Lui»." },
    ]},
    { id: "na6_5", type: "choice", order: 5, choice: { prompt: "Unde ești tu, acum, în cele trei părți?", options: [
      { id: "na6a", label: "Nu sunt sigur că am crezut cu adevărat în Iisus.", branchStepId: "na6_b_credinta" },
      { id: "na6b", label: "Cred, dar n-am spus nimănui ce am făcut.", branchStepId: "na6_b_marturisire" },
      { id: "na6c", label: "Am spus, dar lucrurile sunt încă la mine în casă.", branchStepId: "na6_b_obiecte" },
    ]}},
    { id: "na6_b_credinta", type: "how_god_helps", order: 90, bubbles: [
      { from: "guide", text: "Atunci începe de aici, nu de la curățenie. Nimic aruncat nu te mântuiește. Recunoaște înaintea Lui că ai păcătuit, crede că Iisus a murit pentru tine și a înviat, și cere-I să fie Domnul tău." },
      { from: "guide", text: "Fă asta acum, cu cuvintele tale. Restul vine după." },
    ]},
    { id: "na6_b_marturisire", type: "how_god_helps", order: 91, bubbles: [
      { from: "guide", text: "Tăcerea e locul unde rușinea își ține puterea. «Dacă ne mărturisim păcatele, El este credincios și drept ca să ne ierte.»" },
      { from: "guide", text: "Alege un singur om matur și spune-i. Nu tuturor, nu pe internet. Unul." },
    ]},
    { id: "na6_b_obiecte", type: "how_god_helps", order: 92, bubbles: [
      { from: "guide", text: "Scoate-le. Nu le da mai departe, nu le vinde, nu le pune într-o cutie «pentru orice eventualitate». Cutia aceea e chiar dovada că mai speri ceva de la ele." },
      { from: "guide", text: "Dacă e ceva ce nu-ți aparține doar ție, nu-l distruge fără să vorbești cu ceilalți din casă. Nu se face libertate prin nedreptate." },
    ]},
    { id: "na6_6", type: "quiz", order: 6, quiz: { question: "Ce arată ordinea din Faptele 19?", options: [
      { text: "Că arderea obiectelor e ce te eliberează", correct: false },
      { text: "Că mai întâi vine credința și mărturisirea, iar despărțirea de lucruri urmează", correct: true },
      { text: "Că trebuie distruse și lucrurile altora", correct: false },
    ], explanation: "Textul spune limpede: cei ce crezuseră veneau și mărturiseau, apoi și-au adus cărțile lor. Puterea e în Hristos, nu în gest — dar credința adevărată ajunge până la lucruri." }},
    { id: "na6_7", type: "step", order: 7, bubbles: [
      { from: "guide", text: "Ia lista pe care ai făcut-o în lecția a treia. Astăzi scoate din casă ce e al tău. Apoi spune cu voce tare, pe rând, pentru fiecare: «Renunț la asta. Sunt al lui Iisus Hristos»." },
    ]},
    { id: "na6_8", type: "truth_simple", order: 8, bubbles: [
      { from: "guide", text: "Și acum lucrul cel mai important din tot cursul. Nu rămâne cu casa goală. Un om care doar scoate rămâne gol, iar golul se umple singur." },
      { from: "guide", text: "Pune în loc: Cuvântul citit zilnic, rugăciune cu cuvintele tale, și oameni credincioși lângă tine. Nu ești chemat să fii curat. Ești chemat să fii al Lui." },
    ]},
    { id: "na6_9", type: "journal", order: 9, journalPrompt: "Scrie declarația ta, cu mâna ta: de ce anume te lepezi și Cui te dai. Semnează cu data de azi." },
    { id: "na6_10", type: "truth_simple", order: 10, bubbles: [
      { from: "guide", text: "Limita cinstită, la final: e posibil ca frica să nu dispară imediat, iar asta nu înseamnă că n-a funcționat. Vrăjmașul e biruit, nu tăcut. Coloseni 2:15 spune că a fost dezbrăcat de puteri la cruce — un vrăjmaș învins care încă se zbate." },
      { from: "guide", text: "Dacă ți-e greu, nu te întorci la vechile lucruri și nu rămâi singur. Te rogi, citești, și chemi pe cineva lângă tine." },
    ]},
    { id: "na6_11", type: "prayer", order: 11, bubbles: [
      { from: "guide", text: "«Doamne Iisuse, mă lepăd de tot ce am făcut și de tot ce am chemat în viața mea în afară de Tine. Nu mă mai țin de nimic altceva. Tu m-ai scos de sub puterea întunericului. Sunt al Tău. Ține-mă.»" },
    ]},
    { id: "na6_12", type: "memory_verse", order: 12, scripture: { text: "El ne-a izbăvit de sub puterea întunericului și ne-a strămutat în Împărăția Fiului dragostei Lui.", ref: "Coloseni 1:13" } },
  ],
}

export const NEW_AGE_LESSONS: Lesson[] = [newAgeL1, newAgeL2, newAgeL3, newAgeL4, newAgeL5, newAgeL6]
