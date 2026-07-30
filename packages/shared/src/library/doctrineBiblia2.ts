import type { Lesson } from "../domain.js"
import { DOCTRINE_BIBLIA_PART_A } from "./doctrineBiblia.js"

export const bibliaL4: Lesson = {
  id: "biblia_l4", courseId: "doctrine_c1_biblia", order: 4,
  title: "Dar părțile care mă revoltă?", estMinutes: 12,
  anchorRefs: ["Luca 24:27", "Evrei 1:1-3"], memoryVerseRef: "Evrei 1:3",
  steps: [
    { id: "b4_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Poți accepta manuscrisele și canonul, apoi să ajungi la un text despre război, sclavie, femei sau judecată și să spui: «Dacă asta vine de la Dumnezeu, nu știu dacă Îl vreau.»" },
      { from: "guide", text: "Nu vom răspunde că întrebarea ta este răzvrătire. Unele texte sunt grele fiindcă ceea ce descriu este greu — și unele au fost folosite ca să acopere răul." },
    ]},
    { id: "b4_2", type: "truth_simple", order: 2, bubbles: [
      { from: "guide", text: "Prima distincție: ce relatează Biblia nu este automat ce aprobă Biblia. Geneza povestește minciuni, violență sexuală, poligamie și răzbunare fără să le transforme în model." },
      { from: "guide", text: "A doua: o lege care limitează un rău într-o lume veche nu este neapărat portretul final al binelui. Iisus însuși spune despre anumite concesii că au existat din cauza împietririi inimii." },
    ]},
    { id: "b4_3", type: "scripture", order: 3, scripture: { text: "După ce a vorbit în vechime părinților noștri prin proroci, în multe rânduri și în multe chipuri, Dumnezeu, la sfârșitul acestor zile, ne-a vorbit prin Fiul... El este oglindirea slavei Lui și întipărirea Ființei Lui.", ref: "Evrei 1:1-3" }, bubbles: [
      { from: "guide", text: "Pentru creștin, Iisus nu este un detaliu adăugat la capătul Bibliei. El este lentila prin care se vede limpede caracterul lui Dumnezeu." },
    ]},
    { id: "b4_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Citirea greșită dintr-o parte spune: «Dacă apare în Biblie, Dumnezeu aprobă». Așa au fost apărate abuzul, sclavia și reducerea la tăcere a victimelor." },
      { from: "guide", text: "Citirea greșită din cealaltă parte spune: «Dacă un text mă revoltă, sigur nu l-am înțeles sau trebuie scos». Uneori contextul schimbă mult; alteori tensiunea morală rămâne și trebuie recunoscută." },
    ]},
    { id: "b4_5", type: "truth_simple", order: 5, bubbles: [
      { from: "guide", text: "Pentru un text greu întrebăm: ce gen literar este? Cine vorbește? Ce descrie și ce poruncește? Cui i se poruncește? Ce problemă limita atunci? Cum este reluat sau împlinit în Iisus?" },
      { from: "guide", text: "Nu citim o poezie ca pe un cod penal și nici o relatare de război ca pe o permisiune personală pentru violență." },
    ]},
    { id: "b4_6", type: "choice", order: 6, choice: { prompt: "Ce fel de text te oprește cel mai tare?", options: [
      { id: "b4a", label: "Războaiele și judecata din Vechiul Testament." },
      { id: "b4b", label: "Textele despre sclavie, femei sau autoritate." },
      { id: "b4c", label: "Faptul că oameni credincioși fac lucruri îngrozitoare." },
    ]}},
    { id: "b4_7", type: "how_god_helps", order: 7, bubbles: [
      { from: "guide", text: "Nu explica un text greu printr-un slogan. Citește înainte și după, află lumea lui și urmărește întreaga direcție a Scripturii: creație, cădere, răscumpărare, restaurare." },
      { from: "guide", text: "Dacă un text a fost folosit împotriva ta, separă textul de mâna care l-a folosit. Autoritatea spirituală nu transformă constrângerea, lovirea sau abuzul în ascultare de Dumnezeu." },
    ]},
    { id: "b4_8", type: "quiz", order: 8, quiz: { question: "Ce înseamnă faptul că Biblia relatează o faptă?", options: [
      { text: "Că Dumnezeu o aprobă", correct: false }, { text: "Că trebuie copiată", correct: false }, { text: "Doar că textul spune că s-a întâmplat; evaluarea vine din context", correct: true },
    ], explanation: "Descrierea și aprobarea nu sunt același lucru. Contextul literar și întreaga mărturie a Scripturii arată evaluarea." }},
    { id: "b4_9", type: "how_god_helps", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: contextul nu face automat fiecare text ușor și nu avem o explicație care să înlăture orice întrebare morală. Nu vom inventa de ce a permis Dumnezeu fiecare eveniment." },
      { from: "guide", text: "Nici nu vom folosi «așa scrie» ca să cerem cuiva să rămână în pericol. Pentru violență sau abuz, ieșirea în siguranță și ajutorul specializat nu sunt necredință." },
    ]},
    { id: "b4_10", type: "journal", order: 10, journalPrompt: "Scrie pasajul care te revoltă și întrebarea exactă pe care ai vrea să I-o pui lui Dumnezeu. Nu o îndulci." },
    { id: "b4_11", type: "memory_verse", order: 11, scripture: { text: "El este oglindirea slavei Lui și întipărirea Ființei Lui.", ref: "Evrei 1:3" } },
  ],
}

export const bibliaL5: Lesson = {
  id: "biblia_l5", courseId: "doctrine_c1_biblia", order: 5,
  title: "Nu este doar un mit copiat?", estMinutes: 11,
  anchorRefs: ["2 Petru 1:16", "1 Corinteni 15:3-8"], memoryVerseRef: "2 Petru 1:16",
  steps: [
    { id: "b5_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Potopul seamănă cu povești mai vechi. Se spune că Horus, Mithra sau Osiris s-au născut miraculos, au avut ucenici, au murit și au înviat. Atunci Iisus nu este doar încă o versiune?" },
      { from: "guide", text: "Nu răspundem că orice asemănare este inventată. Culturile chiar împart teme: apă, haos, sacrificiu, moarte, erou și speranța unei lumi reparate." },
    ]},
    { id: "b5_2", type: "truth_simple", order: 2, bubbles: [
      { from: "guide", text: "Asemănarea nu dovedește singură copierea. Trebuie întrebat: sursa presupusă este mai veche în forma invocată? Există contact istoric plauzibil? Detaliile esențiale chiar coincid sau numai cuvintele generale?" },
      { from: "guide", text: "O listă de pe internet poate transforma «zeu asociat cu soarele» în «născut pe 25 decembrie din fecioară, cu doisprezece ucenici». Când verifici textele antice, multe liste se destramă." },
    ]},
    { id: "b5_3", type: "scripture", order: 3, scripture: { text: "În adevăr, v-am făcut cunoscut puterea și venirea Domnului nostru Isus Hristos, nu întemeindu-ne pe niște basme meșteșugit alcătuite, ci ca unii care am văzut noi înșine cu ochii noștri mărirea Lui.", ref: "2 Petru 1:16" } },
    { id: "b5_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Creștinismul nu spune doar «odată, în afara timpului, un zeu a învins întunericul». Își leagă afirmațiile de locuri, conducători, o execuție romană și oameni despre care spune că puteau fi întrebați." },
      { from: "guide", text: "Asta nu demonstrează automat că totul este adevărat. Dar schimbă categoria: afirmațiile istorice trebuie cercetate istoric, nu respinse doar fiindcă alte culturi au povești despre salvare." },
    ]},
    { id: "b5_5", type: "truth_simple", order: 5, bubbles: [
      { from: "guide", text: "Poveștile despre potop din Mesopotamia au asemănări reale cu Geneza și diferențe profunde despre Dumnezeu, om și motivul judecății. O memorie comună, o polemică teologică sau împrumutul cultural sunt ipoteze discutate; simpla asemănare nu decide între ele." },
      { from: "guide", text: "La Iisus, comparația corectă cere surse antice, nu meme. «Moarte și revenire» poate însemna ciclul anotimpurilor într-un mit și înviere corporală într-o afirmație iudaică — nu sunt automat același lucru." },
    ]},
    { id: "b5_6", type: "choice", order: 6, choice: { prompt: "Care afirmație te-a făcut să crezi că povestea lui Iisus este copiată?", options: [
      { id: "b5a", label: "Listele cu Horus, Mithra sau Osiris." }, { id: "b5b", label: "Asemănarea potopului cu Ghilgameș." }, { id: "b5c", label: "Ideea generală de zeu care moare și revine." },
    ]}},
    { id: "b5_7", type: "step", order: 7, bubbles: [
      { from: "guide", text: "Alege o singură paralelă. Cere textul antic exact, data lui și pasajul în care apare detaliul. Dacă sursa spune doar «se știe», nu ai încă dovadă — ai o afirmație repetată." },
      { from: "guide", text: "Aplică aceeași măsură și apologeților creștini. O comparație proastă nu devine bună doar fiindcă ne ajută concluzia." },
    ]},
    { id: "b5_8", type: "quiz", order: 8, quiz: { question: "Ce trebuie demonstrat pentru a susține că o poveste a fost copiată?", options: [
      { text: "Că ambele conțin o naștere sau o moarte", correct: false },
      { text: "Că există sursă anterioară, asemănări specifice și o cale plauzibilă de transmitere", correct: true },
      { text: "Că poveștile provin din culturi diferite", correct: false },
    ], explanation: "Temele generale apar în multe culturi. Dependența literară cere o legătură istorică și asemănări suficient de specifice." }},
    { id: "b5_9", type: "how_god_helps", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: autorii biblici au trăit în culturi reale și au folosit limbaj, imagini și forme cunoscute. Biblia nu a fost dictată într-un vid cultural." },
      { from: "guide", text: "Nu putem demonstra că nicio idee biblică nu are vreo paralelă. Putem verifica dacă afirmația concretă de copiere este susținută de textele și datele invocate." },
    ]},
    { id: "b5_10", type: "memory_verse", order: 10, scripture: { text: "Nu întemeindu-ne pe niște basme meșteșugit alcătuite, ci ca unii care am văzut noi înșine.", ref: "2 Petru 1:16" } },
  ],
}

export const bibliaL6: Lesson = {
  id: "biblia_l6", courseId: "doctrine_c1_biblia", order: 6,
  title: "Dacă Iisus n-a înviat?", estMinutes: 13,
  anchorRefs: ["1 Corinteni 15:3-8", "1 Corinteni 15:14-17"], memoryVerseRef: "1 Corinteni 15:17",
  steps: [
    { id: "b6_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "La capătul cursului nu spunem: «Biblia este adevărată fiindcă Biblia spune că este adevărată». Creștinismul își pune centrul pe un eveniment: Iisus a fost mort și apoi a fost văzut viu." },
      { from: "guide", text: "Pavel nu protejează credința de verificare. Spune că dacă Învierea nu s-a întâmplat, credința este zadarnică." },
    ]},
    { id: "b6_2", type: "scripture", order: 2, scripture: { text: "Dacă n-a înviat Hristos, atunci propovăduirea noastră este zadarnică, și zadarnică este și credința voastră... dacă n-a înviat Hristos, credința voastră este zadarnică, voi sunteți încă în păcatele voastre.", ref: "1 Corinteni 15:14,17" } },
    { id: "b6_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Punctele istorice care cer explicație sunt acestea: Iisus a fost executat prin crucificare; ucenicii au ajuns foarte devreme să creadă că L-au văzut viu; mesajul a fost formulat și transmis înainte ca legenda să aibă secole la dispoziție; Pavel și Iacov au trecut de la necredință sau opoziție la această convingere." },
      { from: "guide", text: "1 Corinteni 15 păstrează o formulare primită de Pavel și transmisă mai departe: moarte, îngropare, înviere și apariții. Scrisoarea este timpurie, iar tradiția din ea este și mai timpurie." },
    ]},
    { id: "b6_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Explicațiile alternative trebuie și ele testate: mormânt greșit, trup mutat, legendă târzie, viziuni de durere, conspirație sau supraviețuirea crucificării." },
      { from: "guide", text: "Fiecare poate explica o parte. Întrebarea este care explicație acoperă cel mai bine întregul set de date fără să adauge mai multe presupuneri decât rezolvă." },
    ]},
    { id: "b6_5", type: "truth_simple", order: 5, bubbles: [
      { from: "guide", text: "Martiriul nu demonstrează că o credință este adevărată — oameni mor pentru idei false. Arată însă că persoana credea sincer, iar în cazul martorilor revendicați întrebarea nu era doar ce doctrină au primit, ci ce spuneau că au văzut." },
      { from: "guide", text: "Nici mormântul gol, luat singur, nu dovedește Învierea. Argumentul este cumulativ: moartea, proclamarea timpurie, aparițiile revendicate și transformarea martorilor." },
    ]},
    { id: "b6_6", type: "choice", order: 6, choice: { prompt: "Ce explicație ți se pare acum cea mai plauzibilă?", options: [
      { id: "b6a", label: "Ucenicii au fost sinceri, dar s-au înșelat." },
      { id: "b6b", label: "Povestea a crescut mai târziu." },
      { id: "b6c", label: "Învierea explică cel mai bine datele, dar încă mă sperie concluzia." },
    ]}},
    { id: "b6_7", type: "how_god_helps", order: 7, bubbles: [
      { from: "guide", text: "Metoda istorică poate evalua surse, date, explicații și probabilități. Nu poate pune un miracol într-un laborator și nu poate obliga pe cineva să accepte că Dumnezeu a acționat." },
      { from: "guide", text: "Dar nici nu este neutru să spui din start că un miracol este imposibil. Asta nu este concluzie istorică, ci o decizie filosofică despre ce fel de lume poate exista." },
    ]},
    { id: "b6_8", type: "step", order: 8, bubbles: [
      { from: "guide", text: "Citește 1 Corinteni 15:1-20 ca pe o mărturie care se oferă examinării. Scrie două coloane: «ce afirmă» și «ce ar explica altfel afirmația». Nu te grăbi să aperi niciuna." },
    ]},
    { id: "b6_9", type: "how_god_helps", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: dovezile istorice nu produc singure credință și nu oferă certitudine matematică. O concluzie istorică rămâne o inferență către explicația considerată cea mai bună." },
      { from: "guide", text: "Emanus nu îți poate da un certificat că Învierea s-a întâmplat. Îți poate arăta că afirmația nu este o poveste fără rădăcini și te poate lăsa în fața întrebării pe care dovezile nu o pot trăi în locul tău: dacă este adevărat, ce faci cu El?" },
    ]},
    { id: "b6_10", type: "prayer", order: 10, bubbles: [
      { from: "guide", text: "Dacă poți, spune atât: «Iisuse, dacă ai înviat cu adevărat, nu vreau doar să câștig o discuție. Arată-mi cine ești și dă-mi curaj să urmez adevărul unde duce.»" },
    ]},
    { id: "b6_11", type: "memory_verse", order: 11, scripture: { text: "Dacă n-a înviat Hristos, credința voastră este zadarnică.", ref: "1 Corinteni 15:17" } },
  ],
}

export const DOCTRINE_BIBLIA_LESSONS: Lesson[] = [...DOCTRINE_BIBLIA_PART_A, bibliaL4, bibliaL5, bibliaL6]
