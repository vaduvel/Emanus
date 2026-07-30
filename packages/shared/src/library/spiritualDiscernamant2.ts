import type { Lesson } from "../domain.js"
import { SPIRITUAL_DISCERN_PART_A } from "./spiritualDiscernamant.js"

export const discernL4: Lesson = {
  id: "spirit_discern_l4", courseId: "spiritual_c2_discernamant", order: 4,
  title: "Ce numim posesie?", estMinutes: 13,
  anchorRefs: ["Marcu 5:1-20", "Marcu 9:14-29", "1 Corinteni 6:19-20"], memoryVerseRef: "Marcu 5:19",
  steps: [
    { id: "sd4_1", type: "hook", order: 1, bubbles: [{ from: "guide", text: "Cuvântul «posesie» sugerează proprietate totală. Noul Testament folosește un termen mai larg, tradus și «demonizat», pentru situații în care influența demonică este identificată direct." }]},
    { id: "sd4_2", type: "scripture", order: 2, scripture: { text: "Duh necurat, ieși afară din omul acesta!", ref: "Marcu 5:8" } },
    { id: "sd4_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Evangheliile arată cazuri reale și severe, dar nu oferă o listă universală de simptome prin care orice cititor poate diagnostica un om." },
      { from: "guide", text: "Persoana nu încetează să poarte chipul lui Dumnezeu. Nu este spectacol, obiect de filmat sau problemă de dominat." },
    ]},
    { id: "sd4_4", type: "choice", order: 4, choice: { prompt: "Ce te îngrijorează cel mai mult?", options: [
      { id: "sd4a", label: "Mă tem că eu aș putea fi posedat.", branchStepId: "sd4_b_self" },
      { id: "sd4b", label: "Mă tem pentru cineva apropiat.", branchStepId: "sd4_b_other" },
      { id: "sd4c", label: "Vreau doar criterii sigure.", branchStepId: "sd4_b_criteria" },
    ]}},
    { id: "sd4_b_self", type: "how_god_helps", order: 90, bubbles: [{ from: "guide", text: "Frica singură nu este dovadă. Nu te autodiagnostica. Dacă Îi aparții lui Iisus, începe cu apartenența ta; apoi caută evaluare pastorală matură și medicală când există simptome." }]},
    { id: "sd4_b_other", type: "how_god_helps", order: 91, bubbles: [{ from: "guide", text: "Nu confrunta singur persoana și nu-i impune o etichetă. Protejează siguranța, ascultă, implică lideri responsabili și servicii medicale când este nevoie." }]},
    { id: "sd4_b_criteria", type: "how_god_helps", order: 92, bubbles: [{ from: "guide", text: "Nu există un test automat sigur. Discernământul este contextual, comunitar și interdisciplinar; o manifestare neobișnuită nu dovedește singură cauza." }]},
    { id: "sd4_5", type: "world_vs_truth", order: 5, bubbles: [{ from: "guide", text: "Creștinii înțeleg diferit dacă și în ce sens un credincios poate fi demonizat. Emanus nu transformă poziția unei tradiții în verdict asupra mântuirii cuiva." }]},
    { id: "sd4_6", type: "step", order: 6, bubbles: [{ from: "guide", text: "Dacă există pierderea contactului cu realitatea, violență, auto-vătămare sau voci care cer rău, prioritatea este siguranța și 112, împreună cu rugăciunea — nu o sesiune improvizată." }]},
    { id: "sd4_7", type: "prayer", order: 7, bubbles: [{ from: "guide", text: "«Iisuse, păzește demnitatea și viața omului aflat în suferință. Dă-ne adevăr, autoritate fără spectacol și smerenia de a chema ajutorul potrivit.»" }]},
    { id: "sd4_8", type: "memory_verse", order: 8, scripture: { text: "Du-te acasă la ai tăi și povestește-le tot ce ți-a făcut Domnul.", ref: "Marcu 5:19" } },
  ],
}

export const discernL5: Lesson = {
  id: "spirit_discern_l5", courseId: "spiritual_c2_discernamant", order: 5,
  title: "Boală, traumă sau atac spiritual?", estMinutes: 14,
  anchorRefs: ["Ioan 9:1-3", "Luca 4:40-41", "1 Timotei 5:23"], memoryVerseRef: "Ioan 9:3",
  steps: [
    { id: "sd5_1", type: "hook", order: 1, bubbles: [{ from: "guide", text: "Uneori simptome asemănătoare pot avea cauze diferite sau mai multe cauze simultan. Biblia distinge între bolnavi și demonizați, chiar când îi prezintă în același context." }]},
    { id: "sd5_2", type: "scripture", order: 2, scripture: { text: "N-a păcătuit nici omul acesta, nici părinții lui; ci s-a născut așa ca să se arate în el lucrările lui Dumnezeu.", ref: "Ioan 9:3" } },
    { id: "sd5_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Boala nu este automat demon, pedeapsă sau credință slabă. Trauma poate afecta trupul, memoria și reacțiile fără ca suferința să fie prefăcută sau pur spirituală." },
      { from: "guide", text: "Rugăciunea, medicina și îngrijirea psihologică pot sta în aceeași cameră. A primi tratament nu îi ia lui Dumnezeu locul." },
    ]},
    { id: "sd5_4", type: "choice", order: 4, choice: { prompt: "Ce ai fost tentat să crezi despre suferință?", options: [
      { id: "sd5a", label: "Dacă iau tratament, nu am credință.", branchStepId: "sd5_b_treatment" },
      { id: "sd5b", label: "Dacă mă rog, trebuie să mă vindec imediat.", branchStepId: "sd5_b_immediate" },
      { id: "sd5c", label: "Dacă există diagnostic, partea spirituală nu contează.", branchStepId: "sd5_b_onlymedical" },
    ]}},
    { id: "sd5_b_treatment", type: "how_god_helps", order: 90, bubbles: [{ from: "guide", text: "Tratamentul poate fi una dintre căile prin care primești ajutor. Nu îl opri fără medic și nu lăsa pe nimeni să-ți ceară asta ca probă spirituală." }]},
    { id: "sd5_b_immediate", type: "how_god_helps", order: 91, bubbles: [{ from: "guide", text: "Putem cere vindecare cu credință fără să promitem timpul sau rezultatul. Întârzierea nu autorizează rușinarea celui bolnav." }]},
    { id: "sd5_b_onlymedical", type: "how_god_helps", order: 92, bubbles: [{ from: "guide", text: "Un diagnostic nu exclude rugăciunea, sensul, comunitatea și lupta cu minciuna. Evităm atât reducționismul medical, cât și diagnosticul demonic automat." }]},
    { id: "sd5_5", type: "quiz", order: 5, quiz: { question: "Care abordare păstrează cel mai bine adevărul și siguranța?", options: [
      { text: "Doar rugăciune, fără evaluare", correct: false },
      { text: "Doar medicină, fără loc pentru credință", correct: false },
      { text: "Rugăciune, discernământ comunitar și îngrijire competentă", correct: true },
    ], explanation: "Nu trebuie să alegem artificial între realitatea spirituală și îngrijirea trupului și minții." }},
    { id: "sd5_6", type: "step", order: 6, bubbles: [{ from: "guide", text: "Pentru un simptom persistent, notează durata, intensitatea, somnul, tratamentul, factorii declanșatori și practicile spirituale. Du această imagine întreagă unor oameni competenți." }]},
    { id: "sd5_7", type: "prayer", order: 7, bubbles: [{ from: "guide", text: "«Dumnezeule al adevărului, vindecă și păzește. Condu-mă spre îngrijirea potrivită și eliberează-mă de rușinea care mă împiedică să cer ajutor.»" }]},
    { id: "sd5_8", type: "memory_verse", order: 8, scripture: { text: "N-a păcătuit nici omul acesta, nici părinții lui.", ref: "Ioan 9:3" } },
  ],
}

export const discernL6: Lesson = {
  id: "spirit_discern_l6", courseId: "spiritual_c2_discernamant", order: 6,
  title: "Cum discernem responsabil", estMinutes: 15,
  anchorRefs: ["1 Ioan 4:1-3", "1 Tesaloniceni 5:21-22", "Iacov 3:13-18"], memoryVerseRef: "1 Tesaloniceni 5:21",
  steps: [
    { id: "sd6_1", type: "hook", order: 1, bubbles: [{ from: "guide", text: "Discernământul biblic nu înseamnă să ai repede o explicație. Înseamnă să cercetezi fără negare, fără panică și fără a pune o etichetă mai mare decât dovezile." }]},
    { id: "sd6_2", type: "scripture", order: 2, scripture: { text: "Cercetați toate lucrurile și păstrați ce este bun.", ref: "1 Tesaloniceni 5:21" } },
    { id: "sd6_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Întrebăm: ce spune Scriptura? Ce roade produce? Există păcat cunoscut, practici oculte, traumă, boală, dependență sau lipsă de somn? Cine cunoaște persoana și poate verifica?" },
      { from: "guide", text: "O concluzie responsabilă poate rămâne provizorie. Putem să ne rugăm pentru protecție și libertate fără să pretindem că știm cauza completă." },
    ]},
    { id: "sd6_4", type: "choice", order: 4, choice: { prompt: "Care este următorul tău pas sigur?", options: [
      { id: "sd6a", label: "Să vorbesc cu un lider matur care mă cunoaște.", branchStepId: "sd6_b_pastoral" },
      { id: "sd6b", label: "Să cer o evaluare medicală sau psihologică.", branchStepId: "sd6_b_clinical" },
      { id: "sd6c", label: "Să ies din izolare și să spun cuiva ce trăiesc.", branchStepId: "sd6_b_tell" },
    ]}},
    { id: "sd6_b_pastoral", type: "how_god_helps", order: 90, bubbles: [{ from: "guide", text: "Caută pe cineva care nu se grăbește să diagnosticheze, respectă consimțământul, colaborează cu specialiști și Îl ține pe Iisus în centru." }]},
    { id: "sd6_b_clinical", type: "how_god_helps", order: 91, bubbles: [{ from: "guide", text: "Spune complet simptomele și nu ascunde dimensiunea spirituală importantă pentru tine. O evaluare bună nu îți cere să renunți la credință." }]},
    { id: "sd6_b_tell", type: "how_god_helps", order: 92, bubbles: [{ from: "guide", text: "Alege o persoană calmă și sigură. Nu ai nevoie să dovedești cauza înainte să spui că suferi și ai nevoie de prezență." }]},
    { id: "sd6_5", type: "world_vs_truth", order: 5, bubbles: [{ from: "guide", text: "Semnale de alarmă la un ajutor spiritual: secretomanie, bani, contact privat impus, filmare, atingere fără acord, oprirea tratamentului, izolare și promisiuni garantate." }]},
    { id: "sd6_6", type: "step", order: 6, bubbles: [{ from: "guide", text: "Scrie trei contacte înainte de criză: un om apropiat, un lider matur și un profesionist. Dacă există risc imediat pentru viață sau violență, sună la 112." }]},
    { id: "sd6_7", type: "journal", order: 7, journalPrompt: "Ce trăiești, ce știi sigur, ce nu știi încă și care este următorul pas responsabil?" },
    { id: "sd6_8", type: "prayer", order: 8, bubbles: [{ from: "guide", text: "«Duhule al adevărului, păzește-mă de negare și de frică. Dă-mi oameni curați, minte limpede și curajul de a urma ajutorul pe care îl aduci.»" }]},
    { id: "sd6_9", type: "memory_verse", order: 9, scripture: { text: "Cercetați toate lucrurile și păstrați ce este bun.", ref: "1 Tesaloniceni 5:21" } },
  ],
}

export const SPIRITUAL_DISCERN_LESSONS: Lesson[] = [
  ...SPIRITUAL_DISCERN_PART_A,
  discernL4, discernL5, discernL6,
]
