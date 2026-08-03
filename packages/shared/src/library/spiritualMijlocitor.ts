import type { Lesson } from "../domain.js"

/**
 * Cursul "Cine te aude când te rogi" — pentru omul care crede că Dumnezeu este
 * real și bun, dar simte că nu are voie să-I vorbească el, direct.
 *
 * Regula de ton (docs/14-carta-doctrinara.md, doctrineHar.ts): corectăm
 * înțelegerea, niciodată instituția. Nicio lecție nu numește o confesiune, nu
 * compară confesiuni și nu spune omului să plece de unde este. Nicio lecție nu
 * interzice rugăciunea altora pentru tine. Fiecare lecție are o limită cinstită.
 *
 * Documentare: Grace to You, transcriere integrală în română, RON-90-444
 * ("Robul suveran, partea 2"). Materialul a fost folosit numai pentru
 * documentarea temelor și a ordinii. Lecțiile nu sunt traduceri sau rezumate
 * și pot fi verificate integral din pasajele citate.
 */

const COURSE = "spiritual_c5_mijlocitor"

export const mijlocitorL1: Lesson = {
  id: "spirit_mijl_l1", courseId: COURSE, order: 1,
  title: "Perdeaua care s-a rupt", estMinutes: 12,
  anchorRefs: ["Marcu 15:37-38", "Evrei 10:19-22", "Levitic 16:2"], memoryVerseRef: "Evrei 10:19",
  steps: [
    { id: "mj1_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Mulți oameni cred despre Dumnezeu că este real, că este bun și că aude. Și totuși nu I se adresează direct. Simt că trebuie cineva la mijloc, cineva mai curat, cineva care are trecere." },
      { from: "guide", text: "Sentimentul acesta nu e o prostie. Multă vreme a fost chiar adevărat. Iar Biblia spune exact ziua și ceasul în care s-a schimbat." },
    ]},
    { id: "mj1_2", type: "truth_simple", order: 2, bubbles: [
      { from: "guide", text: "În Templu era o perdea grea. În spatele ei era locul unde se arăta prezența lui Dumnezeu. Un singur om intra acolo, o singură dată pe an, și nu fără sânge." },
      { from: "guide", text: "Perdeaua nu era decor. Era un răspuns limpede la întrebarea ta: nu, nu poate intra oricine și oricând." },
    ]},
    { id: "mj1_3", type: "scripture", order: 3, scripture: { text: "Și perdeaua dinăuntrul Templului s-a rupt în două de sus până jos.", ref: "Marcu 15:38" } },
    { id: "mj1_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Observă două lucruri. Întâi, când s-a rupt: în clipa în care Iisus a murit. Perdeaua nu s-a rupt pentru că cineva a devenit mai bun, ci pentru că El a plătit." },
      { from: "guide", text: "Apoi, cum s-a rupt: de sus până jos. Nu de jos în sus. N-a forțat-o omul dinspre partea lui. A deschis-o Dumnezeu dinspre partea Lui." },
    ]},
    { id: "mj1_5", type: "choice", order: 5, choice: { prompt: "Când te gândești să te rogi direct, ce te oprește cel mai des?", options: [
      { id: "mj1a", label: "Nu sunt destul de curat ca să vorbesc eu cu El.", branchStepId: "mj1_b_curat" },
      { id: "mj1b", label: "Cineva mai priceput ar fi ascultat mai repede.", branchStepId: "mj1_b_altul" },
      { id: "mj1c", label: "Nu știu dacă mă aude cineva acolo.", branchStepId: "mj1_b_tacere" },
    ]}},
    { id: "mj1_b_curat", type: "how_god_helps", order: 90, bubbles: [
      { from: "guide", text: "Ai dreptate că nu ești destul de curat. Nimeni n-a fost vreodată. De aceea nu curățenia ta deschide perdeaua, ci sângele Lui." },
      { from: "guide", text: "Evrei 10:19 nu spune «avem îndrăzneală prin viața noastră bună». Spune «prin sângele lui Iisus». Dacă aștepți să fii vrednic ca să te rogi, aștepți o zi care nu vine." },
    ]},
    { id: "mj1_b_altul", type: "how_god_helps", order: 91, bubbles: [
      { from: "guide", text: "Să ceri altcuiva să se roage pentru tine e un lucru bun și biblic. Iacov 5:16 chiar asta ne spune să facem." },
      { from: "guide", text: "Dar între tine și Dumnezeu nu mai e nicio perdea de trecut. Rugăciunea altuia te însoțește. Nu te înlocuiește și nu îți este necesară ca să fii auzit." },
    ]},
    { id: "mj1_b_tacere", type: "how_god_helps", order: 92, bubbles: [
      { from: "guide", text: "Tăcerea nu înseamnă absență. În Templu însemna perdea. Iar perdeaua a fost ruptă din partea cealaltă, de Cineva care voia să fii înăuntru." },
      { from: "guide", text: "Începe cu o propoziție cinstită, chiar dacă e «Doamne, nu știu dacă ești acolo». Dumnezeu nu Se supără pe rugăciuni sincere." },
    ]},
    { id: "mj1_6", type: "quiz", order: 6, quiz: { question: "De ce contează că perdeaua s-a rupt de sus până jos?", options: [
      { text: "Pentru că arată că omul și-a făcut singur loc la Dumnezeu", correct: false },
      { text: "Pentru că arată că Dumnezeu a deschis drumul dinspre partea Lui", correct: true },
      { text: "Pentru că arată că Templul nu mai avea nicio valoare", correct: false },
    ], explanation: "Direcția rupturii e dinspre Dumnezeu spre om. Accesul nu e cucerit de noi, ci dăruit de El, și e plătit de moartea lui Iisus." }},
    { id: "mj1_7", type: "step", order: 7, bubbles: [
      { from: "guide", text: "Astăzi, o dată, spune-I ceva direct. Cu voce tare sau în gând. Fără formulă învățată pe de rost, fără intermediar, fără pregătire." },
    ]},
    { id: "mj1_8", type: "journal", order: 8, journalPrompt: "Scrie propoziția pe care I-ai spus-o direct și ce ai simțit înainte s-o spui.", bubbles: [
      { from: "guide", text: "Scrie-o exact cum a ieșit. Nu o înfrumuseța." },
    ]},
    { id: "mj1_9", type: "truth_simple", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită a acestei lecții: faptul că ai acces nu înseamnă că vei primi imediat ce ceri și nici că vei simți ceva. Perdeaua ruptă e despre drum deschis, nu despre emoții garantate." },
    ]},
    { id: "mj1_10", type: "prayer", order: 10, bubbles: [
      { from: "guide", text: "«Doamne Iisuse, nu vin pentru că sunt curat. Vin pentru că Tu ai murit și perdeaua s-a rupt. Învață-mă să nu mai aștept să fiu vrednic ca să vorbesc cu Tatăl.»" },
    ]},
    { id: "mj1_11", type: "memory_verse", order: 11, scripture: { text: "Avem o deplină încredere că putem intra în Locul Preasfânt prin sângele lui Iisus.", ref: "Evrei 10:19" } },
  ],
}

export const mijlocitorL2: Lesson = {
  id: "spirit_mijl_l2", courseId: COURSE, order: 2,
  title: "Un singur Mijlocitor", estMinutes: 13,
  anchorRefs: ["1 Timotei 2:1-6", "Evrei 7:24-25", "Isaia 53:12"], memoryVerseRef: "1 Timotei 2:5",
  steps: [
    { id: "mj2_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Un mijlocitor e cineva care stă între două părți care nu se pot apropia singure. Nu e un cuvânt religios ciudat. Așa se semnează pace între două tabere." },
      { from: "guide", text: "Întrebarea nu e dacă ai nevoie de un mijlocitor. Ai. Întrebarea e cine poate fi." },
    ]},
    { id: "mj2_2", type: "scripture", order: 2, scripture: { text: "Căci este un singur Dumnezeu și este un singur mijlocitor între Dumnezeu și oameni: Omul Iisus Hristos.", ref: "1 Timotei 2:5" } },
    { id: "mj2_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Ca să poți sta între Dumnezeu și om, trebuie să aparții amândurora. Textul spune «Omul Iisus Hristos» tocmai pentru că El e și una, și alta. Cine e numai om nu ajunge sus. Cine e numai Dumnezeu n-a fost niciodată în locul tău." },
      { from: "guide", text: "De aceea numărul din text nu e întâmplător. Nu se spune «cel mai bun mijlocitor». Se spune «unul singur». Nu pentru că Dumnezeu ar fi zgârcit, ci pentru că un singur Om a plătit." },
    ]},
    { id: "mj2_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Isaia spusese cu sute de ani înainte că Robul lui Dumnezeu «a mijlocit pentru cei fărădelege». În text, aproape tot ce face El e la trecut încheiat: a fost străpuns, a fost zdrobit, S-a dat pe Sine. Un singur lucru stă la o formă care nu se închide: mijlocirea." },
      { from: "guide", text: "Jertfa s-a făcut o dată și s-a terminat. Mijlocirea nu s-a terminat. Se întâmplă și acum, în timp ce citești." },
    ]},
    { id: "mj2_5", type: "scripture", order: 5, scripture: { text: "De aceea și poate să mântuiască în chip desăvârșit pe cei ce se apropie de Dumnezeu prin El, pentru că trăiește pururea ca să mijlocească pentru ei.", ref: "Evrei 7:25" } },
    { id: "mj2_6", type: "choice", order: 6, choice: { prompt: "Ce te apasă cel mai tare în privința asta?", options: [
      { id: "mj2a", label: "Mi s-a părut mereu că trebuie să ajung la El prin cineva.", branchStepId: "mj2_b_prin" },
      { id: "mj2b", label: "Cred că El aude, dar nu pe mine anume.", branchStepId: "mj2_b_eu" },
      { id: "mj2c", label: "Am cerut de multe ori și tot nu s-a schimbat nimic.", branchStepId: "mj2_b_tacut" },
    ]}},
    { id: "mj2_b_prin", type: "how_god_helps", order: 90, bubbles: [
      { from: "guide", text: "Nu ți se cere să renunți la oamenii care se roagă lângă tine și nu ți se cere să pleci de nicăieri. Ți se spune doar ce mai ai în plus: chiar tu, direct, chiar acum." },
      { from: "guide", text: "Un mijlocitor care mijlocește pururea n-are program de vizită și n-are listă de așteptare." },
    ]},
    { id: "mj2_b_eu", type: "how_god_helps", order: 91, bubbles: [
      { from: "guide", text: "Evrei 7:25 spune «pe cei ce se apropie». Nu «pe cei care merită», nu «pe cei cunoscuți». Condiția din text e apropierea, nu recomandarea." },
      { from: "guide", text: "Dacă te apropii, ești deja în categoria pentru care El mijlocește." },
    ]},
    { id: "mj2_b_tacut", type: "how_god_helps", order: 92, bubbles: [
      { from: "guide", text: "Un răspuns care întârzie nu dovedește că cererea n-a ajuns. Mijlocirea Lui nu depinde de ce vezi tu că se mișcă." },
      { from: "guide", text: "Spune-I și asta, cu cuvintele tale, inclusiv nemulțumirea. Psalmii sunt plini de oameni care au făcut exact așa și n-au fost dați afară." },
    ]},
    { id: "mj2_7", type: "quiz", order: 7, quiz: { question: "Ce înseamnă că Iisus «trăiește pururea ca să mijlocească»?", options: [
      { text: "Că jertfa Lui trebuie repetată mereu ca să rămână valabilă", correct: false },
      { text: "Că jertfa s-a încheiat o dată, iar El susține acum, fără pauză, pe cei ce se apropie", correct: true },
      { text: "Că mijlocirea Lui începe abia după ce devii destul de bun", correct: false },
    ], explanation: "Evrei spune limpede că jertfa a fost adusă o singură dată. Ce continuă nu e plata, ci susținerea. El nu moare din nou, dar nici nu tace." }},
    { id: "mj2_8", type: "step", order: 8, bubbles: [
      { from: "guide", text: "Scrie undeva la vedere, cu mâna ta, cuvintele «trăiește pururea ca să mijlocească pentru ei». Lasă-le acolo o săptămână." },
    ]},
    { id: "mj2_9", type: "journal", order: 9, journalPrompt: "Ce anume ai vrea să ceară El pentru tine astăzi, dacă I-ai spune un singur lucru?" },
    { id: "mj2_10", type: "truth_simple", order: 10, bubbles: [
      { from: "guide", text: "Limita cinstită: lecția asta nu-ți spune ce să faci cu obiceiurile tale de rugăciune de până acum și nu judecă pe nimeni de lângă tine. Îți spune doar ce e deschis pentru tine și n-ai știut." },
    ]},
    { id: "mj2_11", type: "prayer", order: 11, bubbles: [
      { from: "guide", text: "«Iisuse, Tu ești Omul care a stat în locul meu și Dumnezeul care mă poate duce la Tatăl. Nu mai caut altă cale. Vin prin Tine, așa cum sunt, azi.»" },
    ]},
    { id: "mj2_12", type: "memory_verse", order: 12, scripture: { text: "Este un singur mijlocitor între Dumnezeu și oameni: Omul Iisus Hristos.", ref: "1 Timotei 2:5" } },
  ],
}

export const mijlocitorL3: Lesson = {
  id: "spirit_mijl_l3", courseId: COURSE, order: 3,
  title: "Când nu ai cuvinte", estMinutes: 12,
  anchorRefs: ["Romani 8:26-27", "Romani 8:34", "Psalmul 62:8"], memoryVerseRef: "Romani 8:26",
  steps: [
    { id: "mj3_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Unul dintre cele mai frecvente motive pentru care oamenii nu se roagă singuri: nu știu cum se spune. Le e teamă să nu ceară greșit, să nu folosească un cuvânt nepotrivit, să nu pară ridicoli." },
      { from: "guide", text: "Scriptura răspunde direct la frica asta, și răspunsul nu e «învață formula corectă»." },
    ]},
    { id: "mj3_2", type: "scripture", order: 2, scripture: { text: "Și tot astfel și Duhul ne ajută în slăbiciunea noastră: căci nu știm cum trebuie să ne rugăm. Dar însuși Duhul mijlocește pentru noi cu suspine negrăite.", ref: "Romani 8:26" } },
    { id: "mj3_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Textul nu spune că unii nu știu să se roage. Spune «nu știm» — la plural, despre toți. Neputința de a formula nu e semnul unui credincios slab. E starea normală a oricui." },
      { from: "guide", text: "Și mai spune ceva: când tu te blochezi, rugăciunea nu se oprește. Duhul duce mai departe ce n-ai putut spune." },
    ]},
    { id: "mj3_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Deci ai doi care mijlocesc pentru tine în același timp. Fiul, la dreapta Tatălui, în Romani 8:34. Și Duhul, înăuntrul tău, în Romani 8:26. Unul sus, Unul aici." },
      { from: "guide", text: "Rugăciunea ta nu pornește singură de la zero. Intră într-o mișcare care era deja pornită." },
    ]},
    { id: "mj3_5", type: "choice", order: 5, choice: { prompt: "Cum arată blocajul tău?", options: [
      { id: "mj3a", label: "Deschid gura și nu iese nimic.", branchStepId: "mj3_b_gol" },
      { id: "mj3b", label: "Repet aceleași cuvinte și mi se par goale.", branchStepId: "mj3_b_repet" },
      { id: "mj3c", label: "Mi-e rușine de ce ar trebui să spun.", branchStepId: "mj3_b_rusine" },
    ]}},
    { id: "mj3_b_gol", type: "how_god_helps", order: 90, bubbles: [
      { from: "guide", text: "Atunci stai acolo tăcut și spune-I că stai. Tăcerea în prezența Lui nu e rugăciune ratată. Suspinul fără cuvinte e numit în text chiar lucrarea Duhului." },
    ]},
    { id: "mj3_b_repet", type: "how_god_helps", order: 91, bubbles: [
      { from: "guide", text: "Cuvintele repetate nu sunt automat goale și nici automat vii. Verifică un singur lucru: mai vorbești cu Cineva, sau doar reciți? Dacă doar reciți, oprește-te și spune un lucru concret din ziua de azi." },
    ]},
    { id: "mj3_b_rusine", type: "how_god_helps", order: 92, bubbles: [
      { from: "guide", text: "El știe deja. Rușinea nu ascunde nimic de El, te ascunde doar pe tine de El. Psalmul 62:8 spune «vărsați-vă inimile înaintea Lui», nu «prezentați-vă varianta curățată»." },
    ]},
    { id: "mj3_6", type: "quiz", order: 6, quiz: { question: "Ce spune Romani 8:26 despre cel care nu știe să se roage?", options: [
      { text: "Că ar trebui să lase pe altcineva să se roage în locul lui", correct: false },
      { text: "Că e o slăbiciune comună tuturor, iar Duhul mijlocește chiar acolo", correct: true },
      { text: "Că rugăciunea lui nu ajunge până la Dumnezeu", correct: false },
    ], explanation: "Textul spune «nu știm», despre toți credincioșii, și pune ajutorul Duhului exact în punctul acela de neputință." }},
    { id: "mj3_7", type: "step", order: 7, bubbles: [
      { from: "guide", text: "Astăzi, roagă-te trei minute fără să ceri nimic. Doar spune-I ce este. Pune ceasul, ca să nu fugi după treizeci de secunde." },
    ]},
    { id: "mj3_8", type: "journal", order: 8, journalPrompt: "Ce n-ai reușit să spui în cuvinte, dar ai vrea ca El să știe?" },
    { id: "mj3_9", type: "truth_simple", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: dacă nu poți vorbi deloc, de săptămâni, și nu doar în rugăciune, asta poate fi și o problemă de sănătate, nu doar una duhovnicească. Nu o trata singur. Vorbește cu un medic sau un psiholog. Nu e necredință." },
    ]},
    { id: "mj3_10", type: "prayer", order: 10, bubbles: [
      { from: "guide", text: "«Duhule Sfânt, nu știu să cer cum trebuie. Ia ce nu pot spune și du mai departe. Iar Tu, Iisuse, stai pentru mine acolo unde eu nu ajung.»" },
    ]},
    { id: "mj3_11", type: "memory_verse", order: 11, scripture: { text: "Duhul ne ajută în slăbiciunea noastră, căci nu știm cum trebuie să ne rugăm.", ref: "Romani 8:26" } },
  ],
}

export const mijlocitorL4: Lesson = {
  id: "spirit_mijl_l4", courseId: COURSE, order: 4,
  title: "Vino cu îndrăzneală", estMinutes: 12,
  anchorRefs: ["Evrei 4:14-16", "Evrei 2:17-18", "Ioan 6:37"], memoryVerseRef: "Evrei 4:16",
  steps: [
    { id: "mj4_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Ai învățat până acum că drumul e deschis, că Mijlocitorul e unul și că nu depinde de cuvintele tale. Rămâne ultima întrebare, cea mai personală: cu ce față vii?" },
    ]},
    { id: "mj4_2", type: "scripture", order: 2, scripture: { text: "Căci n-avem un Mare Preot care să n-aibă milă de slăbiciunile noastre, ci Unul care în toate lucrurile a fost ispitit ca și noi, dar fără păcat.", ref: "Evrei 4:15" } },
    { id: "mj4_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Textul nu spune că El înțelege teoretic prin ce treci. Spune că a trecut. Foame, oboseală, trădare, frică în grădină, moarte. Nu vii la Cineva căruia trebuie să-i explici." },
      { from: "guide", text: "Și abia după asta vine îndemnul. Nu «să ne apropiem cu frică», ci «cu deplină încredere»." },
    ]},
    { id: "mj4_4", type: "scripture", order: 4, scripture: { text: "Să ne apropiem dar cu deplină încredere de scaunul harului, ca să căpătăm îndurare și să găsim har, pentru ca să fim ajutați la vreme de nevoie.", ref: "Evrei 4:16" } },
    { id: "mj4_5", type: "choice", order: 5, choice: { prompt: "Care e vremea ta de nevoie, chiar acum?", options: [
      { id: "mj4a", label: "Am făcut ceva de care mi-e rușine.", branchStepId: "mj4_b_vina" },
      { id: "mj4b", label: "Mi-e frică de ce urmează.", branchStepId: "mj4_b_frica" },
      { id: "mj4c", label: "Sunt pur și simplu obosit și gol.", branchStepId: "mj4_b_gol" },
    ]}},
    { id: "mj4_b_vina", type: "how_god_helps", order: 90, bubbles: [
      { from: "guide", text: "Nu aștepta să repari întâi, ca abia apoi să vii. Ordinea din text e inversă: vii ca să capeți îndurare, și de acolo primești puterea să îndrepți." },
      { from: "guide", text: "Spune fapta pe nume, fără s-o micșorezi. Ce numești poate fi iertat. Ce ascunzi te ține." },
    ]},
    { id: "mj4_b_frica", type: "how_god_helps", order: 91, bubbles: [
      { from: "guide", text: "Cel la care vii S-a rugat și El într-o noapte în care Îi era groază de ce urmează. Nu vei fi certat că ți-e frică." },
      { from: "guide", text: "Cere ajutor pentru ziua de azi, nu curaj pentru tot anul. Textul spune «la vreme de nevoie», adică exact atunci când e nevoie, nu cu luni înainte." },
    ]},
    { id: "mj4_b_gol", type: "how_god_helps", order: 92, bubbles: [
      { from: "guide", text: "Scaunul se numește al harului, nu al performanței. Nu ți se cere să aduci ceva ca să ai voie să te apropii." },
      { from: "guide", text: "Vino gol. E singura condiție pe care o poți îndeplini oricum azi." },
    ]},
    { id: "mj4_6", type: "quiz", order: 6, quiz: { question: "Pe ce se sprijină îndrăzneala de a te apropia de Dumnezeu?", options: [
      { text: "Pe faptul că ai reușit să te îndrepți destul", correct: false },
      { text: "Pe faptul că Marele Preot a trecut prin ce treci tu și a plătit în locul tău", correct: true },
      { text: "Pe faptul că Dumnezeu nu ia păcatul în serios", correct: false },
    ], explanation: "Evrei leagă îndrăzneala de persoana lui Hristos, nu de starea noastră. Tocmai pentru că păcatul e luat în serios a fost nevoie de o plată reală." }},
    { id: "mj4_7", type: "step", order: 7, bubbles: [
      { from: "guide", text: "Stabilește un loc și o oră fixă pentru mâine. Nu mai mult de cinci minute. Un loc anume, o oră anume. Scrie-le acum." },
    ]},
    { id: "mj4_8", type: "journal", order: 8, journalPrompt: "Scrie în câteva rânduri, cu cuvintele tale, ce ai înțeles în cursul acesta despre cine te aude și de ce." },
    { id: "mj4_9", type: "truth_simple", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: nimeni de aici nu poate verifica dacă te rogi și nu-ți va cere socoteală. Nu ținem evidență. Lucrul acesta rămâne între tine și El, și asta e chiar ideea întregului curs." },
    ]},
    { id: "mj4_10", type: "prayer", order: 10, bubbles: [
      { from: "guide", text: "«Tată, vin cu deplină încredere, nu pentru că sunt în regulă, ci pentru că Fiul Tău a deschis drumul. Ajută-mă azi, la vremea nevoii mele. Aici sunt.»" },
    ]},
    { id: "mj4_11", type: "memory_verse", order: 11, scripture: { text: "Să ne apropiem dar cu deplină încredere de scaunul harului.", ref: "Evrei 4:16" } },
  ],
}

export const SPIRITUAL_MIJLOCITOR_LESSONS: Lesson[] = [mijlocitorL1, mijlocitorL2, mijlocitorL3, mijlocitorL4]
