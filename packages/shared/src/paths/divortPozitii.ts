import type { Lesson } from "../domain.js"

/*
 * path_divort — întrebarea de situație și pozițiile despre divorț.
 *
 * Trei lecții care se așază înaintea drumului existent din divort.ts:
 *   dp0 — întrebarea: unde ești tu, de fapt?
 *   dp1 — textele, toate, fără să fie îndoite
 *   dp2 — cele trei poziții și de ce oameni cinstiți nu cad de acord
 *
 * De ce există setul acesta
 * -------------------------
 * Este ușa cea mai contestată doctrinar din toată aplicația. Orice text scris
 * aici va supăra pe cineva. Regula pe care o ținem este simplă: arătăm textul
 * întreg, arătăm pozițiile așa cum sunt susținute de oameni care cred Biblia,
 * spunem răspicat unde textul este limpede și unde nu este, și nu decidem noi
 * în locul omului. Aplicația nu îmbrățișează niciuna dintre cele trei poziții.
 *
 * Ordinea nu este negociabilă
 * --------------------------
 * Întâi situația, abia apoi doctrina. Un om bătut în casă nu are nevoie de o
 * dezbatere despre clauza de excepție; are nevoie să fie în siguranță. De aceea
 * lecția dp0 începe cu șase situații și îl oprește pe loc pe cel care este la
 * situația întâi.
 *
 * Maleahi 2:16 se citește întreg
 * ------------------------------
 * Este versetul cel mai citat și cel mai tăiat în două de pe tema asta. În
 * aceeași frază, Dumnezeu spune că urăște despărțirea în căsătorie și pe cel
 * ce își acoperă haina cu silnicie, adică pe omul violent. Jumătatea a doua nu
 * se scoate niciodată din acest set.
 *
 * Cele trei poziții, pe scurt
 * ---------------------------
 * 1. Legământul ține până la moarte; separarea poate exista, recăsătorirea nu.
 * 2. Două excepții scrise: curvia (Matei 5:32; 19:9) și părăsirea de către cel
 *    necredincios (1 Corinteni 7:15).
 * 3. Aceleași două excepții, plus situațiile în care legământul a fost rupt de
 *    fapt prin violență sau abuz.
 *
 * Siguranță (docs/22)
 * -------------------
 * Lecția dp0 poartă câmpul safety: 112, 116 123, 116 111.
 *
 * Regula textului biblic
 * ----------------------
 * Toate versetele au fost verificate cuvânt cu cuvânt după Cornilescu 1924.
 * Matei 19:8 și 19:9 sunt citate numai din vorbirea directă, fără formula
 * introductivă, pentru a păstra convenția de scriere a Numelui din aplicație.
 * Matei 19:9 este trunchiat la prima propoziție, care este atestată identic în
 * toate edițiile consultate.
 */

export const divortPozitiiL0: Lesson = {
  id: "divort_pozitii_l0",
  courseId: "path_divort",
  order: 21,
  title: "Unde ești tu, de fapt?",
  estMinutes: 8,
  anchorRefs: ["Maleahi 2:16"],
  memoryVerseRef: "Maleahi 2:16",
  safety: {
    topic: "mental_health",
    notice: "Dacă ești lovit, amenințat sau ți-e frică în casa ta, asta nu este o problemă de doctrină, este o problemă de siguranță. Sună 112 în caz de urgență, 116 123 pentru linia de sprijin emoțional, 116 111 dacă ești copil sau tânăr. Nicio lecție de aici nu îți cere să rămâi într-un loc în care ești în pericol."
  },
  steps: [
    {
      id: "dp0_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Ușa asta este cea mai grea din toată aplicația. Nu pentru că textul ar fi încurcat, ci pentru că oameni care Îl iubesc pe Dumnezeu îl citesc diferit de două mii de ani." },
        { from: "guide", text: "Îți spun de la început ce facem: îți arăt textul întreg și pozițiile, cinstit. Nu decid eu în locul tău." }
      ]
    },
    {
      id: "dp0_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Dar înaintea oricărei discuții despre poziții, o întrebare: unde ești tu, de fapt?" },
        { from: "guide", text: "Pentru că «divorț» este un singur cuvânt pentru situații care nu seamănă deloc între ele." },
        { from: "guide", text: "Cel care a fost părăsit nu stă în același loc cu cel care vrea să plece. Iar cel care este bătut nu stă în niciunul dintre ele." }
      ]
    },
    {
      id: "dp0_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Uită-te pe listă și vezi care este a ta. Nu răspunde repede." },
        { from: "guide", text: "Unu: ești lovit, amenințat sau ți-e frică în casa ta. Doi: celălalt a plecat sau te-a părăsit, fără să fi vrut tu. Trei: a fost infidelitate." },
        { from: "guide", text: "Patru: sunteți încă împreună și te gândești să pleci. Cinci: ai divorțat deja și te întrebi ce ai voie de aici înainte. Șase: te-ai recăsătorit și cineva ți-a spus că trăiești în păcat." },
        { from: "guide", text: "Fiecare are alt drum. Iar dacă ești la unu, restul poate aștepta o săptămână. Siguranța vine înaintea lămuririi." }
      ]
    },
    {
      id: "dp0_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea spune: «e viața ta, faci ce vrei». Nu este adevărat că nu contează. Legământul este real, iar ce se rupe acolo rupe oameni." },
        { from: "guide", text: "Din partea cealaltă se spune: «Dumnezeu urăște divorțul, deci rabdă orice». Versetul acela există. Dar cine îl citește doar pe jumătate face un rău pe care Dumnezeu nu l-a cerut." },
        { from: "guide", text: "Vom citi versetul întreg. Este singura cinste posibilă aici." }
      ]
    },
    {
      id: "dp0_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: Dumnezeu urăște și ruperea căsniciei, și cruzimea dinăuntrul ei." },
        { from: "guide", text: "În același verset. Nu în două cărți diferite." }
      ]
    },
    {
      id: "dp0_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Maleahi 2:16 este versetul cel mai citat pe tema asta și cel mai des tăiat în două." },
        { from: "guide", text: "Prima jumătate spune ce urăște Dumnezeu în despărțire. A doua spune pe cine mai urăște: pe cel care își acoperă haina cu silnicie. Silnicie înseamnă violență." },
        { from: "guide", text: "Adică, în aceeași frază, Dumnezeu așază și ruperea legământului, și pe omul violent. Versetul nu poate fi folosit ca să fie ținut cineva sub bătaie." }
      ]
    },
    {
      id: "dp0_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Căci Eu urăsc despărțirea în căsătorie, zice Domnul, Dumnezeul lui Israel, și pe cel ce își acoperă haina cu silnicie, zice Domnul oștirilor. De aceea, luați seama în mintea voastră și nu fiți necredincioși!",
        ref: "Maleahi 2:16"
      },
      bubbles: [
        { from: "guide", text: "Citește-l de două ori. A doua oară, oprește-te la «silnicie»." }
      ]
    },
    {
      id: "dp0_8",
      type: "name_struggle",
      order: 8,
      bubbles: [
        { from: "guide", text: "Scrie numărul situației tale, de la unu la șase. Doar numărul." },
        { from: "guide", text: "Dacă ai scris unu, oprește-te aici și fă un singur lucru astăzi: spune-i unui om în care ai încredere. Doctrina te așteaptă." }
      ]
    },
    {
      id: "dp0_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Cum se citește corect Maleahi 2:16?",
        options: [
          { text: "Că Dumnezeu urăște despărțirea, deci orice căsnicie trebuie păstrată în orice condiții", correct: false },
          { text: "Că Dumnezeu urăște și ruperea legământului, și pe cel care își acoperă haina cu silnicie", correct: true },
          { text: "Că Dumnezeu nu are nicio părere despre ce se întâmplă într-o căsnicie", correct: false }
        ],
        explanation: "Versetul are două jumătăți și de obicei se citează doar prima. În aceeași frază, Dumnezeu spune că urăște despărțirea în căsătorie și pe cel ce își acoperă haina cu silnicie, adică pe omul violent. Textul nu poate fi folosit ca să fie ținut cineva într-o casă în care este lovit."
      }
    },
    {
      id: "dp0_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "Căci Eu urăsc despărțirea în căsătorie, zice Domnul, Dumnezeul lui Israel, și pe cel ce își acoperă haina cu silnicie",
        ref: "Maleahi 2:16"
      },
      bubbles: [
        { from: "guide", text: "Ține minte amândouă jumătățile. Cine ți-l citește doar pe jumătate, să știi că nu ți l-a citit." }
      ]
    },
    {
      id: "dp0_11",
      type: "prayer",
      order: 11,
      bubbles: [
        { from: "guide", text: "«Doamne, nu vreau să îmi aleg singur versetele care îmi convin. Arată-mi unde sunt cu adevărat și dă-mi curaj pentru pasul următor. Amin.»" }
      ]
    },
    {
      id: "dp0_12",
      type: "journal",
      order: 12,
      journalPrompt: "Scrie numărul situației tale, de la unu la șase, și o propoziție despre ce te sperie cel mai tare acum.",
      reward: { xp: 0, axisDeltas: { emotional_peace: 1 } }
    }
  ]
}

export const divortPozitiiL1: Lesson = {
  id: "divort_pozitii_l1",
  courseId: "path_divort",
  order: 22,
  title: "Ce spune textul, fără să îl îndoim",
  estMinutes: 11,
  anchorRefs: [
    "Matei 19:6",
    "Matei 19:8",
    "Matei 19:9",
    "1 Corinteni 7:10-11",
    "1 Corinteni 7:15"
  ],
  memoryVerseRef: "Matei 19:6",
  steps: [
    {
      id: "dp1_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Astăzi citim textele. Toate, nu doar pe cele care îmi convin mie sau ție." }
      ]
    },
    {
      id: "dp1_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Discuția a început cu o capcană. Niște oameni au venit la Iisus și L-au întrebat dacă este îngăduit ca un bărbat să își lase nevasta din orice pricină." },
        { from: "guide", text: "Nu era o întrebare curată. În vremea aceea erau două școli: una spunea că se poate din orice motiv, până și pentru mâncarea arsă; cealaltă spunea că numai pentru necinste." },
        { from: "guide", text: "Răspunsul nu a mers la niciuna dintre ele. A mers înapoi, la început." }
      ]
    },
    {
      id: "dp1_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Cinci texte, în ordine. Le pun pe toate, chiar dacă unele nu îți plac." },
        { from: "guide", text: "Întâi ce a vrut Dumnezeu. Apoi de ce a existat totuși o îngăduință. Apoi excepția rostită de Iisus. Apoi ce a scris Pavel celor căsătoriți și ce a scris pentru cazul în care celălalt pleacă." },
        { from: "guide", text: "Dacă ții doar unul din cinci, ieși cu o convingere tare și cu o eroare." }
      ]
    },
    {
      id: "dp1_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Se aude des: «Noul Testament interzice divorțul, punct». Și tot atât de des: «Dumnezeu vrea să fii fericit, deci pleacă»." },
        { from: "guide", text: "Niciuna nu este ce scrie. Prima trece peste excepțiile scrise chiar în text. A doua trece peste legământ." }
      ]
    },
    {
      id: "dp1_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: planul lui Dumnezeu este ca legământul să țină." },
        { from: "guide", text: "Iar textul recunoaște, tot el, că oamenii îl rup și că există situații în care cel nevinovat nu rămâne legat." }
      ]
    },
    {
      id: "dp1_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Observă un lucru înainte să citim. Când I s-a cerut o regulă, răspunsul a început cu ce a fost la început, nu cu o listă de motive." },
        { from: "guide", text: "Dumnezeu nu apără o procedură. Apără doi oameni care au ajuns unul." }
      ]
    },
    {
      id: "dp1_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Așa că nu mai sunt doi, ci un singur trup. Deci ce a împreunat Dumnezeu, omul să nu despartă.",
        ref: "Matei 19:6"
      },
      bubbles: [
        { from: "guide", text: "Acesta este planul. De aici pornim, oricare ar fi situația ta." }
      ]
    },
    {
      id: "dp1_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Din pricina împietririi inimilor voastre a îngăduit Moise să vă lăsați nevestele; dar de la început n-a fost așa.",
        ref: "Matei 19:8"
      },
      bubbles: [
        { from: "guide", text: "Un cuvânt greu de trecut cu vederea: «a îngăduit». Legea lui Moise nu a poruncit divorțul; l-a îngăduit, din pricina împietririi inimii." },
        { from: "guide", text: "Dumnezeu a făcut loc în lege pentru un rău care oricum se întâmpla, ca să limiteze paguba. Nu este o binecuvântare. Este o îngăduință." }
      ]
    },
    {
      id: "dp1_9",
      type: "scripture",
      order: 9,
      scripture: {
        text: "Eu însă vă spun că oricine își lasă nevasta, afară de pricină de curvie, și ia pe alta de nevastă preacurvește.",
        ref: "Matei 19:9"
      },
      bubbles: [
        { from: "guide", text: "«Afară de pricină de curvie.» Excepția nu este a mea și nu este a bisericii tale. Este în text." },
        { from: "guide", text: "Și mai observă ceva: este o îngăduință, nu o poruncă. Nimeni nu este obligat să plece pentru că ar avea dreptul." }
      ]
    },
    {
      id: "dp1_10",
      type: "scripture",
      order: 10,
      scripture: {
        text: "Celor căsătoriți, le poruncesc, nu eu, ci Domnul, ca nevasta să nu se despartă de bărbat. Dacă este despărțită, să rămână nemăritată sau să se împace cu bărbatul ei.",
        ref: "1 Corinteni 7:10-11"
      },
      bubbles: [
        { from: "guide", text: "Pavel spune limpede că porunca este a Domnului, nu a lui: să nu se despartă." },
        { from: "guide", text: "Și totuși, în aceeași frază, prevede cazul în care s-a întâmplat deja. Nu îl lasă pe om fără niciun drum." }
      ]
    },
    {
      id: "dp1_11",
      type: "scripture",
      order: 11,
      scripture: {
        text: "Dacă cel necredincios vrea să se despartă, să se despartă; în împrejurarea aceasta, fratele sau sora nu sunt legați: Dumnezeu ne-a chemat să trăim în pace.",
        ref: "1 Corinteni 7:15"
      },
      bubbles: [
        { from: "guide", text: "Aici Pavel adaugă un al doilea caz: celălalt pleacă și nu mai vrea să trăiască cu tine." },
        { from: "guide", text: "«Nu sunt legați.» Este singurul loc în care Scriptura spune, cu cuvintele acestea, că cineva nu mai este ținut de legătură." }
      ]
    },
    {
      id: "dp1_12",
      type: "name_struggle",
      order: 12,
      bubbles: [
        { from: "guide", text: "Care dintre cele cinci texte te-a lovit cel mai tare?" },
        { from: "guide", text: "Scrie-l. Nu ca să câștigi o discuție, ci ca să știi cu ce ai de-a face." }
      ]
    },
    {
      id: "dp1_13",
      type: "quiz",
      order: 13,
      quiz: {
        question: "Ce spune Matei 19:8 despre ce a făcut Moise?",
        options: [
          { text: "Că Dumnezeu a poruncit divorțul ca lucru bun", correct: false },
          { text: "Că a fost o îngăduință dată din pricina împietririi inimilor, iar de la început nu a fost așa", correct: true },
          { text: "Că legea lui Moise nu are nicio legătură cu subiectul", correct: false }
        ],
        explanation: "Cuvântul folosit este «a îngăduit», nu «a poruncit». Textul spune și de ce: din pricina împietririi inimilor. Și adaugă imediat că de la început nu a fost așa. Îngăduința recunoaște o realitate căzută; nu schimbă planul."
      }
    },
    {
      id: "dp1_14",
      type: "memory_verse",
      order: 14,
      scripture: {
        text: "Deci ce a împreunat Dumnezeu, omul să nu despartă.",
        ref: "Matei 19:6"
      },
      bubbles: [
        { from: "guide", text: "Ține-l chiar dacă al tău s-a rupt deja. Nu este o acuzare. Este planul de la care a plecat totul." }
      ]
    },
    {
      id: "dp1_15",
      type: "prayer",
      order: 15,
      bubbles: [
        { from: "guide", text: "«Doamne, nu vreau un verset care să îmi dea dreptate. Vreau să văd tot ce ai spus, chiar dacă mă doare. Amin.»" }
      ]
    },
    {
      id: "dp1_16",
      type: "journal",
      order: 16,
      journalPrompt: "Scrie cele cinci texte, unul sub altul, și lângă fiecare o propoziție cu ce înțelegi din el. Fără concluzie finală astăzi.",
      reward: { xp: 0, axisDeltas: { living_faith: 1 } }
    }
  ]
}

export const divortPozitiiL2: Lesson = {
  id: "divort_pozitii_l2",
  courseId: "path_divort",
  order: 23,
  title: "De ce oameni care Îl iubesc pe Dumnezeu nu cad de acord",
  estMinutes: 10,
  anchorRefs: ["Matei 5:32", "1 Corinteni 7:12", "1 Corinteni 7:15"],
  memoryVerseRef: "1 Corinteni 7:15",
  steps: [
    {
      id: "dp2_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Astăzi îți pun pe masă pozițiile. Toate trei, cu ce are fiecare tare și ce are slab." }
      ]
    },
    {
      id: "dp2_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Poate ai auzit deja: un păstor spune una, o carte spune alta, mama ta spune a treia." },
        { from: "guide", text: "Nu înseamnă că unul dintre ei este necredincios. Înseamnă că textul are câteva puncte în care se poate citi în mai multe feluri, iar oameni cinstiți ajung la concluzii diferite." }
      ]
    },
    {
      id: "dp2_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Poziția întâi, cea mai strictă: legământul ține până la moarte. Separarea poate exista; recăsătorirea, nu, cât trăiește celălalt. Se sprijină pe Marcu și Luca, unde excepția nu apare deloc." },
        { from: "guide", text: "Poziția a doua, cea mai răspândită: două excepții, amândouă scrise — curvia, la Matei, și părăsirea de către cel necredincios, la 1 Corinteni 7. În aceste cazuri, cel nevinovat nu este legat." },
        { from: "guide", text: "Poziția a treia: aceleași două excepții, plus situațiile în care legământul a fost rupt de fapt prin violență sau abuz, chiar dacă nu există un verset care să le numească anume. Se sprijină pe felul în care Scriptura tratează asuprirea și pe jumătatea a doua din Maleahi 2:16." },
        { from: "guide", text: "Aplicația asta nu îți impune niciuna. Îți spun doar unde nu se ceartă nimeni: nimeni nu îți cere să rămâi într-un loc în care ești lovit." }
      ]
    },
    {
      id: "dp2_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea spune că, dacă oamenii nu cad de acord, înseamnă că nu contează. Fals." },
        { from: "guide", text: "Iar unii spun: «poziția mea este singura biblică, restul sunt compromisuri». Și asta este fals, și mai ales nu ajută cu nimic omul care stă în fața lor și plânge." },
        { from: "guide", text: "Cinstea înseamnă să spui limpede unde textul este clar și unde nu este." }
      ]
    },
    {
      id: "dp2_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: nu ești obligat să iei singur hotărârea asta și nu o iei dintr-o aplicație." },
        { from: "guide", text: "O iei cu oameni care te cunosc, care cunosc textul și care nu se grăbesc." }
      ]
    },
    {
      id: "dp2_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Este un amănunt pe care puțini îl observă în 1 Corinteni 7. La un moment dat, Pavel scrie: «Celorlalți le zic eu, nu Domnul»." },
        { from: "guide", text: "Nu înseamnă că partea aceea nu este Scriptură. Înseamnă că el însuși face diferența între ce a spus Domnul direct și ce aplică el, pentru situații pe care Domnul nu le atinsese." },
        { from: "guide", text: "Dacă Pavel a avut grijă să arate unde este linia, poți și tu să spui: «asta știu sigur, asta nu știu»." }
      ]
    },
    {
      id: "dp2_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Dar Eu vă spun că oricine își va lăsa nevasta, afară numai de pricină de curvie, îi dă prilej să preacurvească; și cine va lua de nevastă pe cea lăsată de bărbat preacurvește.",
        ref: "Matei 5:32"
      },
      bubbles: [
        { from: "guide", text: "Este a doua oară când apare excepția, în alt loc și în alte cuvinte. De aceea poziția a doua o socotește scrisă, nu dedusă." }
      ]
    },
    {
      id: "dp2_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Celorlalți le zic eu, nu Domnul: dacă un frate are o nevastă necredincioasă și ea voiește să trăiască înainte cu el, să nu se despartă de ea.",
        ref: "1 Corinteni 7:12"
      },
      bubbles: [
        { from: "guide", text: "«Le zic eu, nu Domnul.» Ține minte propoziția asta când cineva îți spune că totul este limpede ca lumina zilei." }
      ]
    },
    {
      id: "dp2_9",
      type: "name_struggle",
      order: 9,
      bubbles: [
        { from: "guide", text: "Spune, cu voce tare, care poziție ți se pare ție cea mai apropiată de text și de ce." },
        { from: "guide", text: "Apoi spune ce te-ar face să te răzgândești. Dacă nu există nimic, nu ai o convingere, ai o tabără." }
      ]
    },
    {
      id: "dp2_10",
      type: "quiz",
      order: 10,
      quiz: {
        question: "Ce arată faptul că Pavel scrie «Celorlalți le zic eu, nu Domnul»?",
        options: [
          { text: "Că partea aceea nu este Scriptură și poate fi lăsată deoparte", correct: false },
          { text: "Că el face diferența între ce a spus Domnul direct și aplicarea la o situație pe care Domnul nu o tratase", correct: true },
          { text: "Că Pavel nu era sigur pe nimic din ce scria", correct: false }
        ],
        explanation: "Este o distincție de acuratețe, nu de autoritate. Pavel arată unde citează o poruncă a Domnului și unde aplică principiul la un caz nou, cel al căsniciei cu un necredincios. Exemplul ne învață să spunem limpede ce este scris și ce este concluzia noastră."
      }
    },
    {
      id: "dp2_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Dumnezeu ne-a chemat să trăim în pace.",
        ref: "1 Corinteni 7:15"
      },
      bubbles: [
        { from: "guide", text: "Este ultima propoziție din versetul despre părăsire. Se uită mereu, și tocmai ea spune ce urmărește Dumnezeu." }
      ]
    },
    {
      id: "dp2_12",
      type: "prayer",
      order: 12,
      bubbles: [
        { from: "guide", text: "«Doamne, sunt lucruri pe care nu le pot lămuri singur. Adu-mi oameni înțelepți lângă mine și păzește-mă să nu îmi fac din Scriptură o armă. Amin.»" }
      ]
    },
    {
      id: "dp2_13",
      type: "journal",
      order: 13,
      journalPrompt: "Scrie poziția spre care înclini, un motiv pentru care o ții și un lucru care te-ar face să o reconsideri. Apoi scrie numele omului cu care vei discuta asta.",
      reward: { xp: 0, axisDeltas: { relationships: 1 } }
    }
  ]
}

export const DIVORT_POZITII_LESSONS: Lesson[] = [
  divortPozitiiL0,
  divortPozitiiL1,
  divortPozitiiL2
]

/*
 * Practicile pentru cele trei lecții de poziții, aliniate pe index.
 * Niciuna nu cere o hotărâre și niciuna nu cere o discuție cu celălalt soț.
 */
export const DIVORT_POZITII_PRACTICES: string[] = [
  "Astăzi nu lua nicio hotărâre. Scrie doar numărul situației tale și pune hârtia undeva la vedere.",
  "Astăzi citește Matei 19:3-9 în întregime, din Biblia ta, nu din aplicație. Citește și întrebarea, și răspunsul.",
  "Astăzi caută un om — păstor, consilier, un credincios mai în vârstă — și cere-i o discuție. Față în față, nu pe telefon."
]
