import type { Lesson } from "../domain.js"

/**
 * Cursul 1 din seria pentru oamenii care cred ca nu au acces direct la Dumnezeu.
 *
 * Regula de ton (docs/14-carta-doctrinara.md, doctrineHar.ts): corectam intelegerea,
 * niciodata institutia. Nicio lectie nu numeste o confesiune, nu compara confesiuni
 * si nu spune omului sa plece de unde este. Fiecare lectie are o limita cinstita.
 *
 * Documentare: Grace to You, transcriere integrala in romana, RON-90-444
 * (Robul suveran, partea 2) si RON-1354. Materialul a fost folosit numai pentru
 * documentarea temelor si a ordinii. Lectiile nu sunt traduceri sau rezumate si
 * pot fi verificate integral din pasajele citate.
 */

export const mijlocitorL1: Lesson = {
  id: "spirit_mijl_l1", courseId: "spiritual_c5_mijlocitor", order: 1,
  title: "Perdeaua care s-a rupt", estMinutes: 12,
  anchorRefs: ["Marcu 15:37-38", "Evrei 10:19-22", "Levitic 16:2"], memoryVerseRef: "Evrei 10:19",
  steps: [
    { id: "mj1_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Multi oameni cred despre Dumnezeu ca este real, ca este bun si ca aude. Si tot nu I se adreseaza direct. Simt ca trebuie cineva la mijloc, cineva mai curat, cineva care are trecere." },
      { from: "guide", text: "Sentimentul acesta nu este o prostie. Multa vreme a fost chiar adevarat. Iar Biblia spune exact ziua si ceasul in care s-a schimbat." },
    ]},
    { id: "mj1_2", type: "truth_simple", order: 2, bubbles: [
      { from: "guide", text: "In Templu era o perdea grea. In spatele ei era locul unde se arata prezenta lui Dumnezeu. Un singur om intra acolo, o singura data pe an, si nu fara sange." },
      { from: "guide", text: "Perdeaua nu era decor. Era un raspuns limpede la intrebarea ta: nu, nu poti intra oricine si oricand." },
    ]},
    { id: "mj1_3", type: "scripture", order: 3, scripture: { text: "Si perdeaua dinauntrul Templului s-a rupt in doua de sus pana jos.", ref: "Marcu 15:38" } },
    { id: "mj1_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Observa doua lucruri. Intai, cand s-a rupt: in clipa in care Iisus a murit. Perdeaua nu s-a rupt pentru ca cineva a devenit mai bun, ci pentru ca El a platit." },
      { from: "guide", text: "Apoi, cum s-a rupt: de sus pana jos. Nu de jos in sus. Nu a fortat-o omul dinspre partea lui. A deschis-o Dumnezeu dinspre partea Lui." },
    ]},
    { id: "mj1_5", type: "choice", order: 5, choice: { prompt: "Cand te gandesti sa te rogi direct, ce te opreste cel mai des?", options: [
      { id: "mj1a", label: "Nu sunt destul de curat ca sa vorbesc eu cu El.", branchStepId: "mj1_b_curat" },
      { id: "mj1b", label: "Cineva mai priceput ar fi ascultat mai repede.", branchStepId: "mj1_b_altul" },
      { id: "mj1c", label: "Nu stiu daca ma aude cineva acolo.", branchStepId: "mj1_b_tacere" },
    ]}},
    { id: "mj1_b_curat", type: "how_god_helps", order: 90, bubbles: [
      { from: "guide", text: "Ai dreptate ca nu esti destul de curat. Nimeni nu a fost vreodata. De aceea nu curatenia ta deschide perdeaua, ci sangele Lui." },
      { from: "guide", text: "Evrei 10:19 nu spune «avem indrazneala prin viata noastra buna». Spune «prin sangele lui Iisus». Daca astepti sa fii vrednic ca sa te rogi, astepti o zi care nu vine." },
    ]},
    { id: "mj1_b_altul", type: "how_god_helps", order: 91, bubbles: [
      { from: "guide", text: "Sa ceri altcuiva sa se roage pentru tine este un lucru bun si biblic. Iacov 5:16 chiar asta ne spune sa facem." },
      { from: "guide", text: "Dar intre tine si Dumnezeu nu mai este nicio perdea de trecut. Rugaciunea altuia te insoteste. Nu te inlocuieste si nu iti este necesara ca sa fii auzit." },
    ]},
    { id: "mj1_b_tacere", type: "how_god_helps", order: 92, bubbles: [
      { from: "guide", text: "Tacerea nu inseamna absenta. Insemna, in Templu, perdea. Iar perdeaua a fost rupta din partea cealalta, de Cineva care voia sa fii inauntru." },
      { from: "guide", text: "Incepe cu o propozitie cinstita, chiar daca este «Doamne, nu stiu daca esti acolo». Dumnezeu nu Se supara pe rugaciuni sincere." },
    ]},
    { id: "mj1_6", type: "quiz", order: 6, quiz: { question: "De ce conteaza ca perdeaua s-a rupt de sus pana jos?", options: [
      { text: "Pentru ca arata ca omul si-a facut singur loc la Dumnezeu", correct: false },
      { text: "Pentru ca arata ca Dumnezeu a deschis drumul dinspre partea Lui", correct: true },
      { text: "Pentru ca arata ca Templul nu mai avea nicio valoare", correct: false },
    ], explanation: "Directia rupturii este dinspre Dumnezeu spre om. Accesul nu este cucerit de noi, ci daruit de El, si este platit de moartea lui Iisus." }},
    { id: "mj1_7", type: "step", order: 7, bubbles: [
      { from: "guide", text: "Astazi, o data, spune-I ceva direct. Cu voce tare sau in gand. Fara formula invatata pe de rost, fara intermediar, fara pregatire." },
    ]},
    { id: "mj1_8", type: "journal", order: 8, journalPrompt: "Scrie propozitia pe care I-ai spus-o direct, si ce ai simtit inainte sa o spui.", bubbles: [
      { from: "guide", text: "Scrie-o exact cum a iesit. Nu o infrumuseta." },
    ]},
    { id: "mj1_9", type: "truth_simple", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstita a acestei lectii: faptul ca ai acces nu inseamna ca vei primi imediat ce ceri, si nici ca vei simti ceva. Perdeaua rupta este despre drum deschis, nu despre emotii garantate." },
    ]},
    { id: "mj1_10", type: "prayer", order: 10, bubbles: [
      { from: "guide", text: "«Doamne Iisuse, nu vin pentru ca sunt curat. Vin pentru ca Tu ai murit si perdeaua s-a rupt. Invata-ma sa nu mai astept sa fiu vrednic ca sa vorbesc cu Tatal.»" },
    ]},
    { id: "mj1_11", type: "memory_verse", order: 11, scripture: { text: "Avem o deplina incredere ca putem intra in Locul Preasfant prin sangele lui Iisus.", ref: "Evrei 10:19" } },
  ],
}

export const mijlocitorL2: Lesson = {
  id: "spirit_mijl_l2", courseId: "spiritual_c5_mijlocitor", order: 2,
  title: "Un singur Mijlocitor", estMinutes: 13,
  anchorRefs: ["1 Timotei 2:1-6", "Evrei 7:24-25", "Isaia 53:12"], memoryVerseRef: "1 Timotei 2:5",
  steps: [
    { id: "mj2_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Un mijlocitor este cineva care sta intre doua parti care nu se pot apropia singure. Nu este un cuvant religios ciudat. Asa se semneaza pace intre doua tabere." },
      { from: "guide", text: "Intrebarea nu este daca ai nevoie de un mijlocitor. Ai. Intrebarea este cine poate fi." },
    ]},
    { id: "mj2_2", type: "scripture", order: 2, scripture: { text: "Caci este un singur Dumnezeu si este un singur mijlocitor intre Dumnezeu si oameni: Omul Iisus Hristos.", ref: "1 Timotei 2:5" } },
    { id: "mj2_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Ca sa poti sta intre Dumnezeu si om, trebuie sa apartii amandurora. Textul spune «Omul Iisus Hristos» tocmai pentru ca El este si una, si alta. Cineva care este numai om nu ajunge sus. Cineva care este numai Dumnezeu nu a fost niciodata in locul tau." },
      { from: "guide", text: "De aceea numarul din text nu este intamplator. Nu se spune «cel mai bun mijlocitor». Se spune «unul singur». Nu pentru ca Dumnezeu ar fi zgarcit, ci pentru ca un singur Om a platit." },
    ]},
    { id: "mj2_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Isaia spusese cu sute de ani inainte ca Robul lui Dumnezeu «a mijlocit pentru cei faradelege». In text, aproape tot ce face El este la trecut incheiat: a fost strapuns, a fost zdrobit, S-a dat pe Sine. Un singur lucru sta la o forma care nu se inchide: mijlocirea." },
      { from: "guide", text: "Jertfa s-a facut o data si s-a terminat. Mijlocirea nu s-a terminat. Se intampla si acum, in timp ce citesti." },
    ]},
    { id: "mj2_5", type: "scripture", order: 5, scripture: { text: "De aceea si poate sa mantuiasca in chip desavarsit pe cei ce se apropie de Dumnezeu prin El, pentru ca traieste pururea ca sa mijloceasca pentru ei.", ref: "Evrei 7:25" } },
    { id: "mj2_6", type: "choice", order: 6, choice: { prompt: "Ce te apasa cel mai tare in privinta asta?", options: [
      { id: "mj2a", label: "Mi s-a parut mereu ca trebuie sa ajung la El prin cineva.", branchStepId: "mj2_b_prin" },
      { id: "mj2b", label: "Cred ca El aude, dar nu pe mine anume.", branchStepId: "mj2_b_eu" },
      { id: "mj2c", label: "Am cerut de multe ori si tot nu s-a schimbat nimic.", branchStepId: "mj2_b_tacut" },
    ]}},
    { id: "mj2_b_prin", type: "how_god_helps", order: 90, bubbles: [
      { from: "guide", text: "Nu ti se cere sa renunti la oamenii care se roaga langa tine, si nu ti se cere sa pleci de nicaieri. Ti se spune doar ce mai ai in plus: chiar tu, direct, chiar acum." },
      { from: "guide", text: "Un mijlocitor care mijloceste pururea nu are program de vizita si nu are lista de asteptare." },
    ]},
    { id: "mj2_b_eu", type: "how_god_helps", order: 91, bubbles: [
      { from: "guide", text: "Evrei 7:25 spune «pe cei ce se apropie». Nu «pe cei care merita», nu «pe cei cunoscuti». Conditia din text este apropierea, nu recomandarea." },
      { from: "guide", text: "Daca te apropii, esti deja in categoria pentru care El mijloceste." },
    ]},
    { id: "mj2_b_tacut", type: "how_god_helps", order: 92, bubbles: [
      { from: "guide", text: "Un raspuns care intarzie nu dovedeste ca cererea nu a ajuns. Mijlocirea Lui nu depinde de ce vezi tu ca se misca." },
      { from: "guide", text: "Spune-I si asta, cu cuvintele tale, inclusiv nemultumirea. Psalmii sunt plini de oameni care au facut exact asa si nu au fost dati afara." },
    ]},
    { id: "mj2_7", type: "quiz", order: 7, quiz: { question: "Ce inseamna ca Iisus «traieste pururea ca sa mijloceasca»?", options: [
      { text: "Ca jertfa Lui trebuie repetata mereu ca sa ramana valabila", correct: false },
      { text: "Ca jertfa s-a incheiat o data, iar El sustine acum, fara pauza, pe cei ce se apropie", correct: true },
      { text: "Ca mijlocirea Lui incepe abia dupa ce devii destul de bun", correct: false },
    ], explanation: "Evrei spune limpede ca jertfa a fost adusa o singura data. Ce continua nu este plata, ci sustinerea. El nu moare din nou, dar nici nu tace." }},
    { id: "mj2_8", type: "step", order: 8, bubbles: [
      { from: "guide", text: "Scrie undeva la vedere, cu mana ta, cuvintele «traieste pururea ca sa mijloceasca pentru ei». Lasa-le acolo o saptamana." },
    ]},
    { id: "mj2_9", type: "journal", order: 9, journalPrompt: "Ce anume ai vrea sa ceara El pentru tine astazi, daca I-ai spune un singur lucru?" },
    { id: "mj2_10", type: "truth_simple", order: 10, bubbles: [
      { from: "guide", text: "Limita cinstita: aceasta lectie nu iti spune ce sa faci cu obiceiurile tale de rugaciune de pana acum si nu judeca pe nimeni langa tine. Iti spune doar ce este deschis pentru tine si nu ai stiut." },
    ]},
    { id: "mj2_11", type: "prayer", order: 11, bubbles: [
      { from: "guide", text: "«Iisuse, Tu esti Omul care a stat in locul meu si Dumnezeul care ma poate duce la Tatal. Nu mai caut alta cale. Vin prin Tine, asa cum sunt, azi.»" },
    ]},
    { id: "mj2_12", type: "memory_verse", order: 12, scripture: { text: "Este un singur mijlocitor intre Dumnezeu si oameni: Omul Iisus Hristos.", ref: "1 Timotei 2:5" } },
  ],
}

export const mijlocitorL3: Lesson = {
  id: "spirit_mijl_l3", courseId: "spiritual_c5_mijlocitor", order: 3,
  title: "Cand nu ai cuvinte", estMinutes: 12,
  anchorRefs: ["Romani 8:26-27", "Romani 8:34", "Psalmul 62:8"], memoryVerseRef: "Romani 8:26",
  steps: [
    { id: "mj3_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Una dintre cele mai frecvente motive pentru care oamenii nu se roaga singuri: nu stiu cum se spune. Le e teama sa nu ceara gresit, sa nu foloseasca un cuvant nepotrivit, sa nu para ridicoli." },
      { from: "guide", text: "Scriptura raspunde direct la frica asta, si raspunsul nu este «invata formula corecta»." },
    ]},
    { id: "mj3_2", type: "scripture", order: 2, scripture: { text: "Si tot astfel si Duhul ne ajuta in slabiciunea noastra: caci nu stim cum trebuie sa ne rugam. Dar insusi Duhul mijloceste pentru noi cu suspine negraite.", ref: "Romani 8:26" } },
    { id: "mj3_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Textul nu spune ca unii nu stiu sa se roage. Spune «nu stim» - la plural, despre toti. Neputinta de a formula nu este semnul unui credincios slab. Este starea normala a oricui." },
      { from: "guide", text: "Si mai spune ceva: cand tu te blochezi, rugaciunea nu se opreste. Duhul duce mai departe ce nu ai putut spune." },
    ]},
    { id: "mj3_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Deci ai doi care mijlocesc pentru tine in acelasi timp. Fiul, la dreapta Tatalui, in Romani 8:34. Si Duhul, inauntrul tau, in Romani 8:26. Unul sus, Unul aici." },
      { from: "guide", text: "Rugaciunea ta nu porneste singura de la zero. Intra intr-o miscare care era deja pornita." },
    ]},
    { id: "mj3_5", type: "choice", order: 5, choice: { prompt: "Cum arata blocajul tau?", options: [
      { id: "mj3a", label: "Deschid gura si nu iese nimic.", branchStepId: "mj3_b_gol" },
      { id: "mj3b", label: "Repet aceleasi cuvinte si mi se pare ca sunt goale.", branchStepId: "mj3_b_repet" },
      { id: "mj3c", label: "Mi-e rusine de ce ar trebui sa spun.", branchStepId: "mj3_b_rusine" },
    ]}},
    { id: "mj3_b_gol", type: "how_god_helps", order: 90, bubbles: [
      { from: "guide", text: "Atunci stai acolo tacut si spune-I ca stai. Tacerea in prezenta Lui nu este rugaciune ratata. Suspinul fara cuvinte este numit in text ca fiind chiar lucrarea Duhului." },
    ]},
    { id: "mj3_b_repet", type: "how_god_helps", order: 91, bubbles: [
      { from: "guide", text: "Cuvintele repetate nu sunt automat goale, si nici automat vii. Verifica un singur lucru: mai vorbesti cu Cineva, sau doar recitezi? Daca doar reciti, opreste-te si spune un lucru concret din ziua de azi." },
    ]},
    { id: "mj3_b_rusine", type: "how_god_helps", order: 92, bubbles: [
      { from: "guide", text: "El stie deja. Rusinea nu ascunde nimic de El, ascunde doar pe tine de El. Psalmul 62:8 spune «varsati-va inimile inaintea Lui», nu «prezentati-va varianta curatata»." },
    ]},
    { id: "mj3_6", type: "quiz", order: 6, quiz: { question: "Ce spune Romani 8:26 despre cel care nu stie sa se roage?", options: [
      { text: "Ca ar trebui sa lase pe altcineva sa se roage in locul lui", correct: false },
      { text: "Ca este o slabiciune comuna tuturor, iar Duhul mijloceste chiar acolo", correct: true },
      { text: "Ca rugaciunea lui nu ajunge pana la Dumnezeu", correct: false },
    ], explanation: "Textul spune «nu stim», despre toti credinciosii, si pune ajutorul Duhului exact in punctul acela de neputinta." }},
    { id: "mj3_7", type: "step", order: 7, bubbles: [
      { from: "guide", text: "Astazi, roaga-te trei minute fara sa ceri nimic. Doar spune-I ce este. Pune ceasul, ca sa nu fugi dupa treizeci de secunde." },
    ]},
    { id: "mj3_8", type: "journal", order: 8, journalPrompt: "Ce nu ai reusit sa spui in cuvinte, dar ai vrea ca El sa stie?" },
    { id: "mj3_9", type: "truth_simple", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstita: daca nu poti vorbi deloc, de saptamani, si nu doar in rugaciune, aceasta poate fi si o problema de sanatate, nu doar una duhovniceasca. Nu o trata singur. Vorbeste cu un medic sau un psiholog. Nu este necredinta." },
    ]},
    { id: "mj3_10", type: "prayer", order: 10, bubbles: [
      { from: "guide", text: "«Duhule Sfant, nu stiu sa cer cum trebuie. Ia ce nu pot spune si du mai departe. Iar Tu, Iisuse, stai pentru mine acolo unde eu nu ajung.»" },
    ]},
    { id: "mj3_11", type: "memory_verse", order: 11, scripture: { text: "Duhul ne ajuta in slabiciunea noastra, caci nu stim cum trebuie sa ne rugam.", ref: "Romani 8:26" } },
  ],
}

export const mijlocitorL4: Lesson = {
  id: "spirit_mijl_l4", courseId: "spiritual_c5_mijlocitor", order: 4,
  title: "Vino cu indrazneala", estMinutes: 12,
  anchorRefs: ["Evrei 4:14-16", "Evrei 2:17-18", "Ioan 6:37"], memoryVerseRef: "Evrei 4:16",
  steps: [
    { id: "mj4_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Ai invatat pana acum ca drumul este deschis, ca Mijlocitorul este unul si ca nu depinde de cuvintele tale. Ramane ultima intrebare, cea mai personala: cu ce fata vii?" },
    ]},
    { id: "mj4_2", type: "scripture", order: 2, scripture: { text: "Caci n-avem un Mare Preot care sa n-aiba mila de slabiciunile noastre, ci Unul care in toate lucrurile a fost ispitit ca si noi, dar fara pacat.", ref: "Evrei 4:15" } },
    { id: "mj4_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Textul nu spune ca El intelege teoretic prin ce treci. Spune ca a trecut. Foame, oboseala, tradare, frica in gradina, moarte. Nu vii la Cineva caruia trebuie sa ii explici." },
      { from: "guide", text: "Si abia dupa asta vine indemnul. Nu «sa ne apropiem cu frica», ci «cu deplina incredere»." },
    ]},
    { id: "mj4_4", type: "scripture", order: 4, scripture: { text: "Sa ne apropiem dar cu deplina incredere de scaunul harului, ca sa capatam indurare si sa gasim har, pentru ca sa fim ajutati la vreme de nevoie.", ref: "Evrei 4:16" } },
    { id: "mj4_5", type: "choice", order: 5, choice: { prompt: "Care este vremea ta de nevoie, chiar acum?", options: [
      { id: "mj4a", label: "Am facut ceva de care mi-e rusine.", branchStepId: "mj4_b_vina" },
      { id: "mj4b", label: "Mi-e frica de ce urmeaza.", branchStepId: "mj4_b_frica" },
      { id: "mj4c", label: "Sunt pur si simplu obosit si gol.", branchStepId: "mj4_b_gol" },
    ]}},
    { id: "mj4_b_vina", type: "how_god_helps", order: 90, bubbles: [
      { from: "guide", text: "Nu astepta sa repari intai, ca abia apoi sa vii. Ordinea din text este inversa: vii ca sa capeti indurare, si de acolo primesti puterea sa indrepti." },
      { from: "guide", text: "Spune fapta pe nume, fara sa o micsorezi. Ceea ce numesti poate fi iertat. Ceea ce ascunzi te tine." },
    ]},
    { id: "mj4_b_frica", type: "how_god_helps", order: 91, bubbles: [
      { from: "guide", text: "Cel la care vii S-a rugat si El intr-o noapte in care Ii era groaza de ce urmeaza. Nu vei fi certat ca ti-e frica." },
      { from: "guide", text: "Cere ajutor pentru ziua de azi, nu curaj pentru tot anul. Textul spune «la vreme de nevoie», adica exact atunci cand este nevoie, nu cu luni inainte." },
    ]},
    { id: "mj4_b_gol", type: "how_god_helps", order: 92, bubbles: [
      { from: "guide", text: "Scaunul se numeste al harului, nu al performantei. Nu se cere sa aduci ceva ca sa ai voie sa te apropii." },
      { from: "guide", text: "Vino gol. Aceasta este singura conditie pe care o poti indeplini oricum azi." },
    ]},
    { id: "mj4_6", type: "quiz", order: 6, quiz: { question: "Pe ce se sprijina indrazneala de a te apropia de Dumnezeu?", options: [
      { text: "Pe faptul ca ai reusit sa te indrepti destul", correct: false },
      { text: "Pe faptul ca Marele Preot a trecut prin ce treci tu si a platit in locul tau", correct: true },
      { text: "Pe faptul ca Dumnezeu nu ia pacatul in serios", correct: false },
    ], explanation: "Evrei leaga indrazneala de persoana lui Hristos, nu de starea noastra. Tocmai pentru ca pacatul este luat in serios a fost nevoie de o plata reala." }},
    { id: "mj4_7", type: "step", order: 7, bubbles: [
      { from: "guide", text: "Stabileste un loc si o ora fixa pentru maine. Nu mai mult de cinci minute. Un loc anume, o ora anume. Scrie-le acum." },
    ]},
    { id: "mj4_8", type: "journal", order: 8, journalPrompt: "Scrie in cateva randuri, cu cuvintele tale, ce ai inteles in cursul acesta despre cine te aude si de ce." },
    { id: "mj4_9", type: "truth_simple", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstita: nimeni de aici nu poate verifica daca te rogi si nu iti va cere socoteala. Nu tinem evidenta. Lucrul acesta ramane intre tine si El, si asta este exact ideea intregului curs." },
    ]},
    { id: "mj4_10", type: "prayer", order: 10, bubbles: [
      { from: "guide", text: "«Tata, vin cu deplina incredere, nu pentru ca sunt in regula, ci pentru ca Fiul Tau a deschis drumul. Ajuta-ma azi, la vremea nevoii mele. Aici sunt.»" },
    ]},
    { id: "mj4_11", type: "memory_verse", order: 11, scripture: { text: "Sa ne apropiem dar cu deplina incredere de scaunul harului.", ref: "Evrei 4:16" } },
  ],
}

export const SPIRITUAL_MIJLOCITOR_LESSONS: Lesson[] = [mijlocitorL1, mijlocitorL2, mijlocitorL3, mijlocitorL4]
