import type { Lesson } from "../domain.js"

/*
 * Pot să am încredere în Biblie? — lecțiile 1-3.
 * Surse de documentare: seria Can I Trust the Bible (Wesley Huff),
 * cercetare de critică textuală și istoria canonului. Autor în aplicație: Emanus.
 */

export const bibliaL1: Lesson = {
  id: "biblia_l1", courseId: "doctrine_c1_biblia", order: 1,
  title: "Dacă Biblia a fost modificată?", estMinutes: 11,
  anchorRefs: ["Isaia 40:8", "Luca 1:1-4"], memoryVerseRef: "Luca 1:3-4",
  steps: [
    { id: "b1_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Ai auzit probabil propoziția: «Biblia e o copie după o copie, tradusă de atâtea ori încât nimeni nu mai știe ce scria la început.» Sună logic. Jocul telefonului fără fir chiar strică mesajul." },
      { from: "guide", text: "Dar manuscrisele nu funcționează ca telefonul fără fir. Nu avem doar ultimul om din șir. Avem mii de martori din locuri și secole diferite, pe care îi putem pune unul lângă altul." },
    ]},
    { id: "b1_2", type: "truth_simple", order: 2, bubbles: [
      { from: "guide", text: "Un manuscris este o copie scrisă de mână înainte de tipar. Critica textuală nu înseamnă «a critica Biblia», ci disciplina care compară copiile pentru a identifica formularea cea mai veche recuperabilă." },
      { from: "guide", text: "Când două copii diferă, diferența se numește variantă textuală. Cele mai multe sunt ortografie, ordine de cuvinte sau repetarea și omiterea accidentală a unui cuvânt." },
    ]},
    { id: "b1_3", type: "world_vs_truth", order: 3, bubbles: [
      { from: "guide", text: "Obiecția spune: «există mai multe variante decât cuvinte în Noul Testament, deci textul este distrus». Numărul sună uriaș fiindcă fiecare diferență este numărată în fiecare manuscris în care apare." },
      { from: "guide", text: "Mai mulți martori produc mai multe diferențe de numărat — dar și mai multă putere de comparație. O carte cu o singură copie ar avea zero variante cunoscute și aproape zero posibilitate de verificare." },
    ]},
    { id: "b1_4", type: "scripture", order: 4, scripture: { text: "Am găsit și eu cu cale, preaalesule Teofile, după ce am făcut cercetări cu de-amănuntul asupra tuturor acestor lucruri de la obârșia lor, să ți le scriu în șir unele după altele, ca să poți cunoaște astfel temeinicia învățăturilor pe care le-ai primit.", ref: "Luca 1:3-4" }, bubbles: [
      { from: "guide", text: "Luca nu cere credință oarbă. Spune că a cercetat surse și mărturii ca cititorul să poată verifica temeinicia mesajului." },
    ]},
    { id: "b1_5", type: "truth_simple", order: 5, bubbles: [
      { from: "guide", text: "Manuscrisele de la Marea Moartă au împins cu aproximativ o mie de ani înapoi martorii pentru părți mari din Biblia ebraică. Marele Sul al lui Isaia conține toate cele 66 de capitole și este remarcabil de apropiat de textul medieval folosit la traduceri." },
      { from: "guide", text: "Spunem «remarcabil de apropiat», nu «identic literă cu literă». Există diferențe reale de ortografie, gramatică și formulare. Tocmai fiindcă sulul poate fi comparat, nu trebuie să ascundem asta." },
    ]},
    { id: "b1_6", type: "choice", order: 6, choice: { prompt: "Ce te neliniștește cel mai mult?", options: [
      { id: "b1a", label: "Că un copist ar fi putut schimba intenționat textul." },
      { id: "b1b", label: "Că traducerea mea poate spune altceva decât originalul." },
      { id: "b1c", label: "Că există pasaje pe care Bibliile le marchează ca nesigure." },
    ]}},
    { id: "b1_7", type: "how_god_helps", order: 7, bubbles: [
      { from: "guide", text: "O schimbare locală nu putea controla copiile deja răspândite în regiuni și limbi diferite. Comparând familiile de manuscrise, o modificare târzie devine vizibilă." },
      { from: "guide", text: "Traducerile moderne serioase nu sunt traduceri succesive din alte traduceri; echipele lucrează cu ediții critice ale textelor ebraice, aramaice și grecești." },
      { from: "guide", text: "Pasajele disputate, precum finalul lung din Marcu sau femeia prinsă în adulter, sunt marcate tocmai fiindcă editorii nu le ascund. Nicio doctrină centrală nu depinde numai de ele." },
    ]},
    { id: "b1_8", type: "quiz", order: 8, quiz: { question: "De ce numărul mare de variante nu înseamnă automat un text mai puțin recuperabil?", options: [
      { text: "Fiindcă variantele sunt ignorate", correct: false },
      { text: "Fiindcă numărul mare de manuscrise permite compararea lor", correct: true },
      { text: "Fiindcă toate copiile sunt identice", correct: false },
    ], explanation: "Diferențele sunt vizibile tocmai pentru că există mulți martori de comparat. Nu pretindem că toate copiile sunt identice." }},
    { id: "b1_9", type: "how_god_helps", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: nu deținem manuscrisele originale scrise de mâna autorilor și nu putem reconstrui fiecare literă cu certitudine absolută. Există variante asupra cărora specialiștii încă discută." },
      { from: "guide", text: "Dovezile susțin o transmitere foarte bine atestată, nu o conservare magică fără nicio greșeală de copiere. Încrederea nu cere să negăm urmele omenești ale transmiterii." },
    ]},
    { id: "b1_10", type: "step", order: 10, bubbles: [
      { from: "guide", text: "Deschide Marcu 16 sau Ioan 7:53 într-o traducere modernă și citește nota. Nu ocoli paranteza. Lasă transparența să devină motiv de încredere, nu de frică." },
    ]},
    { id: "b1_11", type: "memory_verse", order: 11, scripture: { text: "Ca să poți cunoaște astfel temeinicia învățăturilor pe care le-ai primit.", ref: "Luca 1:4" } },
  ],
}

export const bibliaL2: Lesson = {
  id: "biblia_l2", courseId: "doctrine_c1_biblia", order: 2,
  title: "Cine a ales cărțile?", estMinutes: 11,
  anchorRefs: ["Luca 24:44", "2 Petru 3:15-16"], memoryVerseRef: "Luca 24:44",
  steps: [
    { id: "b2_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "O altă poveste sună așa: «În anul 325, Constantin a adunat episcopi la Niceea, iar ei au votat ce cărți intră în Biblie și dacă Iisus este Dumnezeu.»" },
      { from: "guide", text: "Este o poveste bună pentru un film. Problema este că documentele conciliului nu consemnează un vot asupra canonului Bibliei." },
    ]},
    { id: "b2_2", type: "truth_simple", order: 2, bubbles: [
      { from: "guide", text: "«Canon» înseamnă lista scrierilor recunoscute drept Scriptură. Procesul nu s-a întâmplat într-o singură cameră și într-o singură zi." },
      { from: "guide", text: "Primele comunități nu aveau o Biblie legată într-un volum. Aveau suluri și codexuri separate: Evanghelii, colecții ale scrisorilor lui Pavel și Scripturile lui Israel." },
    ]},
    { id: "b2_3", type: "scripture", order: 3, scripture: { text: "Trebuia să se împlinească tot ce este scris despre Mine în Legea lui Moise, în Proroci și în Psalmi.", ref: "Luca 24:44" }, bubbles: [
      { from: "guide", text: "Iisus primește structura Scripturilor lui Israel înainte de orice conciliu creștin. Noul Testament apare apoi în interiorul unei comunități care deja știa ce înseamnă Scriptură." },
    ]},
    { id: "b2_4", type: "truth_simple", order: 4, bubbles: [
      { from: "guide", text: "Trei întrebări au cântărit mult în recunoașterea cărților Noului Testament: are legătură apostolică? A fost primită și citită larg în comunități? Este coerentă cu mărturia despre Iisus primită de la început?" },
      { from: "guide", text: "Unele cărți au fost recunoscute foarte devreme. Pentru altele — precum Evrei, Iacov, 2 Petru sau Apocalipsa — discuțiile au durat mai mult. Asta nu se ascunde." },
    ]},
    { id: "b2_5", type: "world_vs_truth", order: 5, bubbles: [
      { from: "guide", text: "Citirea greșită dintr-o parte: «Biserica a inventat autoritatea cărților». Mai exact, comunitățile au recunoscut, folosit și delimitat scrieri pe care le considerau primite, nu le-au făcut adevărate prin vot." },
      { from: "guide", text: "Citirea greșită din cealaltă parte: «toți au știut instantaneu exact aceeași listă». Istoria arată un nucleu stabil foarte devreme și margini discutate mai mult timp." },
    ]},
    { id: "b2_6", type: "choice", order: 6, choice: { prompt: "Ce întrebare ai pune oamenilor care au recunoscut canonul?", options: [
      { id: "b2a", label: "De ce ați inclus această carte?" }, { id: "b2b", label: "De ce ați exclus alte evanghelii?" }, { id: "b2c", label: "Cum ați știut că nu decideți doar politic?" },
    ]}},
    { id: "b2_7", type: "how_god_helps", order: 7, bubbles: [
      { from: "guide", text: "Cărțile numite astăzi «evanghelii pierdute» sunt adesea mai târzii, provin din alte medii teologice și nu au aceeași legătură timpurie cu martorii lui Iisus. Faptul că există o scriere veche nu o face automat apostolică." },
      { from: "guide", text: "Niceea a discutat în principal conflictul despre identitatea Fiului și relația Lui cu Tatăl. Creștinii Îl numeau deja pe Iisus Domn și Îl venerau cu mult înainte de Constantin; conciliul nu a inventat această credință." },
    ]},
    { id: "b2_8", type: "quiz", order: 8, quiz: { question: "Ce s-a întâmplat la Niceea cu lista cărților Bibliei?", options: [
      { text: "Constantin a ales personal cele 27 de cărți", correct: false },
      { text: "Episcopii au votat Evangheliile câștigătoare", correct: false },
      { text: "Nu avem dovadă că conciliul a stabilit canonul", correct: true },
    ], explanation: "Documentele și relatările conciliului nu menționează stabilirea canonului. Discuțiile despre cărți existau înainte și au continuat după Niceea." }},
    { id: "b2_9", type: "how_god_helps", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: istoria canonului este complexă. Tradițiile creștine nu au astăzi liste complet identice pentru Vechiul Testament, iar cuvintele «a recunoscut» nu elimină toate deciziile și disputele omenești." },
      { from: "guide", text: "Nu putem transforma procesul într-o demonstrație matematică. Putem însă verifica dacă ideea unei conspirații târzii se potrivește cu manuscrisele, citările și listele anterioare. Nu se potrivește." },
    ]},
    { id: "b2_10", type: "step", order: 10, bubbles: [
      { from: "guide", text: "În loc să întrebi doar «cine a ales?», alege o Evanghelie și întreabă: cât de aproape este de martori, cât de devreme este citată și ce fel de Iisus prezintă? Începe cu Luca 1:1-4." },
    ]},
    { id: "b2_11", type: "memory_verse", order: 11, scripture: { text: "Trebuia să se împlinească tot ce este scris despre Mine.", ref: "Luca 24:44" } },
  ],
}

export const bibliaL3: Lesson = {
  id: "biblia_l3", courseId: "doctrine_c1_biblia", order: 3,
  title: "Dar contradicțiile?", estMinutes: 12,
  anchorRefs: ["1 Corinteni 15:3-8", "Proverbe 18:17"], memoryVerseRef: "Proverbe 18:17",
  steps: [
    { id: "b3_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Câte femei au venit la mormânt? Câți îngeri erau? Cine a dus crucea? Cum a murit Iuda? Dacă relatările spun lucrurile diferit, de ce să le credem?" },
      { from: "guide", text: "Răspunsul slab este: «nu există nicio problemă». Există diferențe reale. Întrebarea este dacă o diferență este automat contradicție." },
    ]},
    { id: "b3_2", type: "truth_simple", order: 2, bubbles: [
      { from: "guide", text: "O contradicție logică apare când două afirmații nu pot fi adevărate în același timp și în același sens: «era numai un înger» și «erau doi îngeri». Dar «un înger a vorbit» nu înseamnă «numai un înger era acolo»." },
      { from: "guide", text: "Autorii antici selectau, rezumau și grupau evenimentele. Ordinea tematică, citarea comprimată și focalizarea pe personaje diferite nu sunt automat erori." },
    ]},
    { id: "b3_3", type: "scripture", order: 3, scripture: { text: "Cel dintâi care-și spune pricina pare că are dreptate, dar vine celălalt și-l cercetează.", ref: "Proverbe 18:17" }, bubbles: [
      { from: "guide", text: "O listă virală îți dă de obicei versetele, nu și genul literar, contextul, limba sau explicațiile concurente. Cercetarea începe când citești ambele texte întregi." },
    ]},
    { id: "b3_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Unele diferențe se completează simplu. Un autor numește persoana relevantă fără să pretindă că era singura. Altul comprimă două momente într-o singură relatare." },
      { from: "guide", text: "Altele sunt mai grele. Genealogiile lui Iisus, recensământul lui Quirinius, moartea lui Iuda sau anumite numere din cărțile istorice au explicații propuse, dar nu toate explicațiile au aceeași putere." },
    ]},
    { id: "b3_5", type: "truth_simple", order: 5, bubbles: [
      { from: "guide", text: "Relatările Învierii diferă în selecția femeilor, îngerilor și ordinea unor detalii, dar converg asupra nucleului: Iisus a murit, mormântul a fost găsit gol, ucenicii au spus că L-au văzut viu, iar mesajul a fost proclamat imediat." },
      { from: "guide", text: "Identitatea perfectă ar ridica și ea o întrebare: avem martori independenți sau o singură relatare copiată? Diferența controlată nu dovedește adevărul, dar nici nu-l anulează." },
    ]},
    { id: "b3_6", type: "choice", order: 6, choice: { prompt: "Cum reacționezi când găsești două texte care par să nu se potrivească?", options: [
      { id: "b3a", label: "Închid Biblia; simt că am fost mințit." }, { id: "b3b", label: "Accept prima armonizare, chiar dacă e forțată." }, { id: "b3c", label: "Vreau să le citesc întregi înainte de verdict." },
    ]}},
    { id: "b3_7", type: "step", order: 7, bubbles: [
      { from: "guide", text: "Metoda Emanus în patru pași: citește pasajele întregi; scrie exact ce afirmă fiecare; separă ce spune textul de ce ai presupus tu; apoi caută dacă afirmațiile se exclud sau doar diferă." },
      { from: "guide", text: "Nu începe prin a salva Biblia. Începe prin a o asculta atent. Adevărul nu are nevoie de o armonizare inventată." },
    ]},
    { id: "b3_8", type: "quiz", order: 8, quiz: { question: "Care pereche este o contradicție propriu-zisă?", options: [
      { text: "Un autor spune că era un înger; altul spune că erau doi", correct: false },
      { text: "Un autor spune că era numai un înger; altul spune că erau doi", correct: true },
      { text: "Un autor numește o femeie; altul numește trei", correct: false },
    ], explanation: "Cuvântul «numai» face afirmațiile incompatibile. Fără el, autorul poate selecta persoana relevantă fără să excludă alte persoane." }},
    { id: "b3_9", type: "how_god_helps", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: nu avem o rezolvare unanim acceptată pentru fiecare tensiune. Uneori concluzia corectă este «nu știu încă»." },
      { from: "guide", text: "A spune «nu știu» despre un detaliu nu înseamnă că nu știm nimic despre text. Dar nici nu avem voie să numim orice explicație posibilă o explicație demonstrată." },
    ]},
    { id: "b3_10", type: "journal", order: 10, journalPrompt: "Scrie contradicția care te-a oprit cel mai mult. Nu o rezolva acum. Scrie exact cele două afirmații, cu referințele lor." },
    { id: "b3_11", type: "memory_verse", order: 11, scripture: { text: "Vine celălalt și-l cercetează.", ref: "Proverbe 18:17" } },
  ],
}

export const DOCTRINE_BIBLIA_PART_A: Lesson[] = [bibliaL1, bibliaL2, bibliaL3]
