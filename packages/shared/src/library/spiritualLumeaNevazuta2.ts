import type { Lesson } from "../domain.js"
import { SPIRITUAL_LUMEA_PART_A } from "./spiritualLumeaNevazuta.js"

export const spiritualL4: Lesson = {
  id: "spirit_lumea_l4", courseId: "spiritual_c1_lumea_nevazuta", order: 4,
  title: "Demonii și autoritatea lui Iisus", estMinutes: 12,
  anchorRefs: ["Marcu 1:21-28", "Luca 10:17-20", "Coloseni 2:15"], memoryVerseRef: "Coloseni 2:15",
  steps: [
    { id: "sl4_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "În Evanghelii, demonii nu intră într-o negociere între egali cu Iisus. Îl recunosc, se tem și ascultă porunca Lui." },
    ]},
    { id: "sl4_2", type: "scripture", order: 2, scripture: { text: "El poruncește ca un stăpân chiar și duhurilor necurate, și ele Îl ascultă!", ref: "Marcu 1:27" } },
    { id: "sl4_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Noul Testament prezintă influența demonică drept reală și uneori severă. Nu o reduce la metaforă, dar nici nu ne învață să o vedem în fiecare suferință." },
      { from: "guide", text: "Termenul tradus adesea prin «posedat» descrie oameni aflați sub influență demonică în grade pe care textul nu le transformă într-o schemă exactă. Nu inventăm niveluri pe care Biblia nu le definește." },
    ]},
    { id: "sl4_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Autoritatea este a lui Iisus, nu a unei formule, a unui obiect sau a volumului vocii. Numele Lui nu este incantație; este autoritatea Persoanei căreia omul Îi aparține." },
    ]},
    { id: "sl4_5", type: "choice", order: 5, choice: { prompt: "Ce întrebare te apasă aici?", options: [
      { id: "sl4a", label: "Cum știu dacă o problemă este demonică?", branchStepId: "sl4_b_discern" },
      { id: "sl4b", label: "Poate un creștin să fie posedat?", branchStepId: "sl4_b_believer" },
      { id: "sl4c", label: "De ce nu vedem mereu eliberare imediată?", branchStepId: "sl4_b_delay" },
    ]}},
    { id: "sl4_b_discern", type: "how_god_helps", order: 90, bubbles: [
      { from: "guide", text: "Un ecran nu poate pune acest diagnostic. Discernământul serios implică Scriptura, oameni maturi care cunosc persoana și evaluarea medicală sau psihologică atunci când există simptome relevante." },
    ]},
    { id: "sl4_b_believer", type: "how_god_helps", order: 91, bubbles: [
      { from: "guide", text: "Creștinii înțeleg diferit limitele influenței demonice asupra unui credincios. Ce afirmăm împreună: cel care Îi aparține lui Hristos este locuit de Duhul Sfânt și nu trebuie să trăiască în frica unei revendicări mai puternice decât Domnul său." },
    ]},
    { id: "sl4_b_delay", type: "how_god_helps", order: 92, bubbles: [
      { from: "guide", text: "Nu transformăm un rezultat întârziat în verdict asupra credinței omului. Uneori există mai multe straturi de suferință, iar rugăciunea, pocăința, comunitatea și îngrijirea de specialitate pot continua împreună." },
    ]},
    { id: "sl4_6", type: "quiz", order: 6, quiz: { question: "De unde vine autoritatea asupra demonilor?", options: [
      { text: "Din formula rostită exact", correct: false },
      { text: "Din Persoana și domnia lui Iisus", correct: true },
      { text: "Din cât de tare vorbește omul", correct: false },
    ], explanation: "Evangheliile pun accentul pe cine este Iisus. Numele Lui nu este tehnică magică separată de relația și ascultarea față de El." }},
    { id: "sl4_7", type: "step", order: 7, bubbles: [
      { from: "guide", text: "Citește Marcu 1:21-28 și observă verbele: cine recunoaște, cine poruncește și cine ascultă. Nu te concentra pe manifestare, ci pe autoritate." },
    ]},
    { id: "sl4_8", type: "prayer", order: 8, bubbles: [
      { from: "guide", text: "«Doamne Iisuse, Tu ai autoritate asupra întregii lumi văzute și nevăzute. Păzește-mă de negare, panică și formule. Ține-mă în adevărul și ascultarea Ta.»" },
    ]},
    { id: "sl4_9", type: "memory_verse", order: 9, scripture: { text: "A dezbrăcat domniile și stăpânirile și le-a făcut de ocară înaintea lumii.", ref: "Coloseni 2:15" } },
  ],
}

export const spiritualL5: Lesson = {
  id: "spirit_lumea_l5", courseId: "spiritual_c1_lumea_nevazuta", order: 5,
  title: "Ce știm și unde ne oprim", estMinutes: 11,
  anchorRefs: ["Deuteronomul 29:29", "1 Timotei 1:3-4", "2 Timotei 3:16-17"], memoryVerseRef: "Deuteronomul 29:29",
  steps: [
    { id: "sl5_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Lumea nevăzută atrage teorii: originea exactă a demonilor, ierarhii, nume, teritorii, Nephilim și hărți ale cerurilor. Unele pornesc din texte reale, dar merg mai departe decât spun textele." },
    ]},
    { id: "sl5_2", type: "scripture", order: 2, scripture: { text: "Lucrurile ascunse sunt ale Domnului Dumnezeului nostru, iar lucrurile descoperite sunt ale noastre și ale copiilor noștri.", ref: "Deuteronomul 29:29" } },
    { id: "sl5_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Biblia ne oferă suficient pentru credință și ascultare, nu o enciclopedie a fiecărei ființe spirituale. O interpretare posibilă nu devine doctrină doar fiindcă explică un mister." },
      { from: "guide", text: "Originea precisă a demonilor și interpretarea Genezei 6 sunt discutate între creștini. Emanus poate prezenta pozițiile, dar nu declară una singură drept test al maturității." },
    ]},
    { id: "sl5_4", type: "choice", order: 4, choice: { prompt: "Ce faci de obicei când Biblia nu oferă toate detaliile?", options: [
      { id: "sl5a", label: "Aleg teoria care explică tot.", branchStepId: "sl5_b_theory" },
      { id: "sl5b", label: "Resping întregul subiect.", branchStepId: "sl5_b_reject" },
      { id: "sl5c", label: "Pot rămâne cu o întrebare deschisă.", branchStepId: "sl5_b_open" },
    ]}},
    { id: "sl5_b_theory", type: "how_god_helps", order: 90, bubbles: [
      { from: "guide", text: "O teorie care explică tot poate da control, dar nu și adevăr. Marchează limpede diferența dintre «Scriptura spune» și «această interpretare propune»." },
    ]},
    { id: "sl5_b_reject", type: "how_god_helps", order: 91, bubbles: [
      { from: "guide", text: "Lipsa tuturor detaliilor nu anulează afirmațiile clare. Poți refuza speculația fără să refuzi realitatea îngerilor, demonilor și autorității lui Iisus." },
    ]},
    { id: "sl5_b_open", type: "how_god_helps", order: 92, bubbles: [
      { from: "guide", text: "Aceasta este maturitate, nu lipsă de credință: să afirmi limpede ce este scris și să nu umpli cu siguranță artificială ceea ce rămâne ascuns." },
    ]},
    { id: "sl5_5", type: "world_vs_truth", order: 5, bubbles: [
      { from: "guide", text: "Un curs devine periculos când speculația produce frică sau reguli: nume pe care trebuie să le afli, blesteme pe care doar un expert le vede, ritualuri fără de care nu ești sigur." },
    ]},
    { id: "sl5_6", type: "quiz", order: 6, quiz: { question: "Cum tratăm o teorie despre care creștinii serioși au poziții diferite?", options: [
      { text: "O prezentăm ca singura explicație biblică", correct: false },
      { text: "O numim interpretare și păstrăm centrul în textele clare", correct: true },
      { text: "O folosim pentru a diagnostica oameni", correct: false },
    ], explanation: "Onestitatea despre limite păzește atât adevărul, cât și omul vulnerabil." }},
    { id: "sl5_7", type: "step", order: 7, bubbles: [
      { from: "guide", text: "Când auzi o afirmație spectaculoasă, întreabă: «Unde spune textul exact aceasta? Este afirmație clară sau concluzie posibilă?»" },
    ]},
    { id: "sl5_8", type: "prayer", order: 8, bubbles: [
      { from: "guide", text: "«Dumnezeule, dă-mi foame pentru adevăr și smerenie înaintea lucrurilor ascunse. Păzește-mă de teorii care mă fac dependent de frică sau de un expert.»" },
    ]},
    { id: "sl5_9", type: "memory_verse", order: 9, scripture: { text: "Lucrurile ascunse sunt ale Domnului Dumnezeului nostru.", ref: "Deuteronomul 29:29" } },
  ],
}

export const spiritualL6: Lesson = {
  id: "spirit_lumea_l6", courseId: "spiritual_c1_lumea_nevazuta", order: 6,
  title: "Biruința are un Nume", estMinutes: 13,
  anchorRefs: ["Efeseni 6:10-18", "Coloseni 2:13-15", "Luca 10:20"], memoryVerseRef: "Efeseni 6:10",
  steps: [
    { id: "sl6_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "După un curs despre lumea nevăzută, ținta nu este să observi mai mulți demoni. Ținta este să-L vezi mai limpede pe Iisus și să trăiești mai treaz în adevăr." },
    ]},
    { id: "sl6_2", type: "scripture", order: 2, scripture: { text: "Încolo, fraților, întăriți-vă în Domnul și în puterea tăriei Lui.", ref: "Efeseni 6:10" } },
    { id: "sl6_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Pavel nu spune «întăriți-vă în temperamentul vostru». Armura este viața așezată în adevăr, dreptate, Evanghelia păcii, credință, mântuire, Cuvânt și rugăciune." },
      { from: "guide", text: "Acestea nu sunt obiecte imaginare îmbrăcate printr-o formulă de dimineață, ci realități ale lui Hristos în care rămâi și pe care le practici." },
    ]},
    { id: "sl6_4", type: "scripture", order: 4, scripture: { text: "Totuși să nu vă bucurați de faptul că duhurile vă sunt supuse; ci bucurați-vă că numele voastre sunt scrise în ceruri.", ref: "Luca 10:20" } },
    { id: "sl6_5", type: "choice", order: 5, choice: { prompt: "Ce vrei să rămână după acest curs?", options: [
      { id: "sl6a", label: "Mai puțină frică.", branchStepId: "sl6_b_fear" },
      { id: "sl6b", label: "Mai mult discernământ.", branchStepId: "sl6_b_discern" },
      { id: "sl6c", label: "Mai multă siguranță în Iisus.", branchStepId: "sl6_b_jesus" },
    ]}},
    { id: "sl6_b_fear", type: "how_god_helps", order: 90, bubbles: [
      { from: "guide", text: "Frica scade nu fiindcă negi răul, ci fiindcă îl vezi sub autoritatea Celui căruia Îi aparții." },
    ]},
    { id: "sl6_b_discern", type: "how_god_helps", order: 91, bubbles: [
      { from: "guide", text: "Discernământul următor începe prin a separa firea, lumea și diavolul — fără scuze pentru păcat și fără negarea luptei." },
    ]},
    { id: "sl6_b_jesus", type: "how_god_helps", order: 92, bubbles: [
      { from: "guide", text: "Aceasta este ancora: identitatea ta nu stă în cât de bine recunoști întunericul, ci în lucrarea terminată a lui Hristos." },
    ]},
    { id: "sl6_6", type: "quiz", order: 6, quiz: { question: "În ce spune Pavel să ne întărim?", options: [
      { text: "În curajul și experiența noastră", correct: false },
      { text: "În Domnul și puterea tăriei Lui", correct: true },
      { text: "În cunoașterea numelor demonilor", correct: false },
    ], explanation: "Lupta spirituală este reală, dar centrul armurii și al rezistenței este ceea ce Dumnezeu oferă în Hristos." }},
    { id: "sl6_7", type: "step", order: 7, bubbles: [
      { from: "guide", text: "Alege o piesă din Efeseni 6 și transform-o în ascultare concretă: spune adevărul, repară nedreptatea, caută pacea, ridică scutul credinței sau răspunde minciunii cu Scriptura." },
    ]},
    { id: "sl6_8", type: "prayer", order: 8, bubbles: [
      { from: "guide", text: "«Doamne Iisuse, biruința este a Ta. Întărește-mă în adevăr, dreptate, pace, credință, mântuire și Cuvânt. Fă-mă treaz, liniștit și ascultător.»" },
    ]},
    { id: "sl6_9", type: "memory_verse", order: 9, scripture: { text: "Întăriți-vă în Domnul și în puterea tăriei Lui.", ref: "Efeseni 6:10" } },
  ],
}

export const SPIRITUAL_LUMEA_LESSONS: Lesson[] = [
  ...SPIRITUAL_LUMEA_PART_A,
  spiritualL4, spiritualL5, spiritualL6,
]
