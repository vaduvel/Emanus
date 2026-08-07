import type { Lesson } from "../domain.js"

/*
 * TEMELIA — camera 3: "Nu e real / nu se poate ști".
 * Referință: docs/20-parcursuri-personal-generalizate.md, docs/21-cum-lucreaza-Dumnezeu.md
 * Siguranță: docs/22-siguranta.md (are prioritate). Inventar: docs/23-porti-continut.md
 *
 * DE CE EXISTĂ FIȘIERUL ĂSTA (docs/23 §3, defectul D3): până acum `pathTemelie`
 * împrumuta primele trei lecții de doctrină (`doctrinaL1..L3`). Erau trei probleme:
 *
 *   1. Trei lecții pentru o cameră întreagă. Camera 3 primește patru uși diferite
 *      (`indoiala`, `nu_inteleg`, `biblia_inventata`, `alte_credinte`), plus două
 *      uși de explorare (`inceput`, `nu_stiu`), plus rolul de `FALLBACK_PATH_ID`.
 *      Toate primeau același răspuns scurt.
 *   2. Cele patru uși nu pun aceeași întrebare. "Nu știu dacă există Dumnezeu" și
 *      "sunt creștin, dar nu înțeleg ce citesc" nu se rezolvă cu același text.
 *   3. Suprapunere cu doctrina generală: omul care intra pe temelie făcea
 *      `doctrinaL1..L3` ca parcurs personal, iar apoi doctrina generală i le
 *      redeschidea după lecția 5 (`DOCTRINE_UNLOCK_AFTER`). Aceleași trei lecții,
 *      de două ori. `DOCTRINE_LESSONS` rămâne neatins; doar parcursul se separă.
 *
 * ORDINEA (docs/21 §2): nu începem cu dovezi și nu începem cu ce nu știe omul.
 * Începem cu permisiunea de a nu fi sigur — cine crede că trebuie să fie convins
 * înainte de a avea voie să se apropie nu se apropie niciodată. Abia apoi:
 *   1. îndoiala nu te dă afară      (Toma, tatăl din Marcu 9)
 *   2. ce se poate verifica          (Luca cercetează; "nu într-un colț")
 *   3. cine a scris Biblia           (manuscrise, note de subsol, canon)
 *   4. nu o religie, un Om           (pretențiile lui Iisus)
 *   5. energii, karma, univers       (ce era adevărat și ce nu)
 *   6. cum se citește ca să înțelegi (genuri, de unde începi, patru întrebări)
 *   7. ce faci cu ce ai aflat        (fără presiune; punte spre celelalte drumuri)
 *
 * ONESTITATE ASUMATĂ: lecțiile 2 și 3 spun explicit ce NU dovedesc. Nu prezentăm
 * argumente istorice ca demonstrație a existenței lui Dumnezeu și nu ascundem
 * diferențele dintre manuscrise — le trimitem pe om să le citească în notele de
 * subsol din propria lui Biblie. O apologetică care exagerează se sparge la prima
 * căutare pe internet și ia cu ea tot restul.
 *
 * SIGURANȚĂ: niciuna dintre cele șapte lecții nu are `safety` cu ecran separat —
 * subiectele de aici nu intră în lista din docs/22 §2. Lecția 5 conține totuși
 * trimiterea la un om real și la 116 123 pentru cine rămâne cu frică după
 * practici oculte, fără să ceară ritualuri, arderi de obiecte sau liste de fapte.
 * Lecția 7 nu cere nicio rugăciune de decizie ca să treacă mai departe.
 * Toate recompensele rămân `xp: 0` (docs/22 §8).
 */

export const temelieL1: Lesson = {
  id: "temelie_l1",
  courseId: "path_temelie",
  order: 1,
  title: "Îndoiala nu te dă afară",
  estMinutes: 10,
  anchorRefs: ["Ioan 20:24-29", "Marcu 9:14-27"],
  memoryVerseRef: "Marcu 9:24",
  steps: [
    {
      id: "t1_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Bine ai venit. Aici nu se presupune nimic despre tine." },
        {
          from: "guide",
          text: "Nu trebuie să știi termeni, nu trebuie să fi citit ceva înainte și nu trebuie să crezi nimic ca să mergi mai departe.",
        },
      ],
      choice: {
        prompt: "Cu ce ai venit?",
        options: [
          {
            id: "t1_o_indoiala",
            label: "Nu știu dacă există Dumnezeu",
            feedback: "Bine că ai spus-o direct. De acolo pornim.",
          },
          {
            id: "t1_o_nu_inteleg",
            label: "Cred, dar nu înțeleg ce citesc",
            feedback: "Atunci îți lipsește temelia, nu efortul. Lecția 6 e despre asta.",
          },
          {
            id: "t1_o_carte",
            label: "Cred că Biblia e scrisă de oameni",
            feedback: "Este scrisă de oameni. Întrebarea adevărată e alta și o luăm în lecția 3.",
          },
          {
            id: "t1_o_altele",
            label: "Am crezut alte lucruri înainte",
            feedback: "Nu te judecă nimeni aici. Lecția 5 e scrisă exact pentru asta.",
          },
          {
            id: "t1_o_nimic",
            label: "Nu știu, doar m-am uitat",
            feedback: "E un motiv suficient. Nu trebuie să ai o problemă ca să întrebi.",
          },
        ],
      },
    },
    {
      id: "t1_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Există o idee care ține foarte mulți oameni la distanță: că mai întâi trebuie să fii sigur și abia apoi ai voie să te apropii.",
        },
        { from: "guide", text: "Nu scrie asta nicăieri." },
      ],
    },
    {
      id: "t1_3",
      type: "choice",
      order: 3,
      choice: {
        prompt: "Ce ți s-a spus, până acum, despre îndoială?",
        options: [
          {
            id: "t1_d_pacat",
            label: "Că e păcat",
            feedback: "Nu e păcat. E o întrebare care încă nu și-a primit răspunsul.",
          },
          {
            id: "t1_d_credinta",
            label: "Că înseamnă că nu am destulă credință",
            feedback: "Opusul credinței nu e îndoiala. E indiferența. Tu nu ești indiferent, altfel nu erai aici.",
          },
          {
            id: "t1_d_tacere",
            label: "Nimic. N-am vorbit cu nimeni despre asta",
            feedback: "Atunci hai s-o spunem o dată, ca să nu mai stea doar în cap.",
          },
        ],
      },
    },
    {
      id: "t1_4",
      type: "name_struggle",
      order: 4,
      bubbles: [
        { from: "guide", text: "Spune-o pe a ta. Un singur rând, fără să o îmbraci frumos." },
      ],
      response: {
        prompt: "Nu pot să cred că…",
        placeholder: "…un Dumnezeu bun lasă să se întâmple ce se întâmplă.",
        required: false,
        minLength: 3,
      },
    },
    {
      id: "t1_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Ce se spune: dacă ai întrebări, înseamnă că de fapt nu crezi. Alege o tabără.",
        },
        {
          from: "guide",
          text: "Ce s-a întâmplat de fapt: unul dintre cei doisprezece oameni care Îl urmaseră trei ani a spus, după înviere, că nu crede până nu pune degetul în rană.",
        },
        { from: "guide", text: "Nu a fost dat afară. Nu a fost certat în fața celorlalți." },
      ],
    },
    {
      id: "t1_6",
      type: "scripture",
      order: 6,
      scripture: {
        text: "Apoi a zis lui Toma: «Adu-ți degetul încoace și uită-te la mâinile Mele; adu-ți și mâna și pune-o în coasta Mea; și nu fi necredincios, ci credincios.» Drept răspuns, Toma I-a zis: «Domnul meu și Dumnezeul meu!»",
        ref: "Ioan 20:27-28",
      },
    },
    {
      id: "t1_7",
      type: "truth_simple",
      order: 7,
      bubbles: [
        { from: "guide", text: "Iisus nu i-a cerut lui Toma să se prefacă. I-a întins mâna." },
        {
          from: "guide",
          text: "Uită-te la ordine: întâi i-a dat exact dovada pe care o ceruse, apoi i-a vorbit despre credință. Nu invers.",
        },
      ],
    },
    {
      id: "t1_8",
      type: "quiz",
      order: 8,
      quiz: {
        question: "Ce a făcut Iisus când Toma a spus că nu crede?",
        options: [
          { text: "L-a scos dintre ucenici", correct: false },
          { text: "I-a arătat mâinile și coasta", correct: true },
          { text: "I-a cerut să se roage mai mult și să revină", correct: false },
        ],
        explanation:
          "I-a dat chiar dovada pe care o ceruse. Îndoiala spusă cu voce tare a primit răspuns, nu pedeapsă.",
      },
    },
    {
      id: "t1_9",
      type: "how_god_helps",
      order: 9,
      bubbles: [
        { from: "guide", text: "Mai e un om în Evanghelii care spune propoziția asta. E un tată." },
        {
          from: "guide",
          text: "Copilul lui era bolnav de ani de zile. Iisus îi spune că totul e cu putință celui ce crede. Iar omul nu se preface.",
        },
      ],
      scripture: {
        text: "«Cred, Doamne! Ajută necredinței mele!»",
        ref: "Marcu 9:24",
      },
    },
    {
      id: "t1_10",
      type: "truth_simple",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "A cerut ajutor pentru partea din el care nu credea. Nu a fost trimis acasă să se lămurească.",
        },
        { from: "guide", text: "Copilul a fost vindecat în aceeași zi. Cu credința aia, pe jumătate." },
      ],
    },
    {
      id: "t1_11",
      type: "step",
      order: 11,
      bubbles: [
        { from: "guide", text: "Pasul de azi e o propoziție, nu o convingere." },
        {
          from: "guide",
          text: "Spune cu voce tare, o singură dată: «Dacă ești acolo, arată-mi. Sunt dispus să văd.»",
        },
        {
          from: "guide",
          text: "Dacă ți se pare ridicol să vorbești în gol, spune și asta. Sinceritatea nu strică nimic.",
        },
      ],
    },
    {
      id: "t1_12",
      type: "memory_verse",
      order: 12,
      scripture: {
        text: "«Cred, Doamne! Ajută necredinței mele!»",
        ref: "Marcu 9:24",
      },
      bubbles: [
        { from: "guide", text: "Nu e o formulă. E permisiunea de a veni pe jumătate." },
      ],
    },
    {
      id: "t1_13",
      type: "prayer",
      order: 13,
      bubbles: [
        { from: "guide", text: "Dacă vrei, spune asta. Dacă nu vrei, treci mai departe — nu se bifează nimic." },
        {
          from: "guide",
          text: "«Nu știu dacă ești. Dacă ești, vreau să știu. Nu Te voi minți că sunt sigur. Ajută-mă cu partea care nu crede.»",
        },
      ],
    },
    {
      id: "t1_14",
      type: "journal",
      order: 14,
      journalPrompt:
        "Ce ar trebui să se întâmple ca să te răzgândești? Scrie sincer, chiar dacă răspunsul e «nu știu».",
      bubbles: [{ from: "guide", text: "Rămâne pe telefonul tău. Nu îl citește nimeni." }],
      reward: { xp: 0 },
    },
  ],
}

export const temelieL2: Lesson = {
  id: "temelie_l2",
  courseId: "path_temelie",
  order: 2,
  title: "Ce se poate verifica înainte să crezi ceva",
  estMinutes: 12,
  anchorRefs: ["Luca 1:1-4", "Fapte 26:24-26"],
  memoryVerseRef: "Luca 1:3-4",
  steps: [
    {
      id: "t2_1",
      type: "check_in",
      order: 1,
      choice: {
        prompt: "Unde ești azi, față de ieri?",
        options: [
          { id: "t2_c_same", label: "Cam la fel", feedback: "E în regulă. Nu se schimbă nimic în două zile." },
          { id: "t2_c_open", label: "Puțin mai deschis", feedback: "Atât e nevoie ca să continui." },
          {
            id: "t2_c_skeptic",
            label: "Mai sceptic",
            feedback: "Bine. Lecția de azi e făcută pentru scepticism, nu împotriva lui.",
          },
        ],
      },
    },
    {
      id: "t2_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "În limba de zi cu zi, «credință» a ajuns să însemne «crede fără să întrebi».",
        },
        { from: "guide", text: "În Biblie nu înseamnă asta. Și se vede din primul rând al unei Evanghelii." },
      ],
    },
    {
      id: "t2_3",
      type: "world_vs_truth",
      order: 3,
      bubbles: [
        { from: "guide", text: "Ce se spune: religia îți cere să nu verifici." },
        {
          from: "guide",
          text: "Ce scrie: una dintre cele patru Evanghelii se deschide cu o notă de metodă. Autorul explică ce a făcut înainte să scrie.",
        },
      ],
    },
    {
      id: "t2_4",
      type: "scripture",
      order: 4,
      scripture: {
        text: "Fiindcă mulți s-au apucat să alcătuiască o istorisire amănunțită despre lucrurile care s-au petrecut printre noi… am găsit și eu cu cale, preaalesule Teofile, după ce am făcut cercetări cu de-amănuntul asupra tuturor acestor lucruri de la obârșia lor, să ți le scriu în șir unele după altele, ca să poți cunoaște astfel temeinicia învățăturilor pe care le-ai primit prin viu grai.",
        ref: "Luca 1:1-4",
      },
    },
    {
      id: "t2_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Luca nu spune «am avut o viziune». Spune «am făcut cercetări»." },
        {
          from: "guide",
          text: "Și spune de ce scrie: ca destinatarul să poată cunoaște temeinicia. Adică să verifice, nu să înghită.",
        },
      ],
    },
    {
      id: "t2_6",
      type: "multi_choice",
      order: 6,
      multiChoice: {
        prompt: "Dacă ar fi adevărat, ce ți-ar conta cu adevărat? Alege ce se potrivește.",
        minSelections: 1,
        options: [
          { id: "t2_m_real", label: "Că a existat ca om real, într-un loc real" },
          { id: "t2_m_public", label: "Că a murit public, nu într-o legendă" },
          { id: "t2_m_martori", label: "Că oamenii care L-au văzut nu s-au răzgândit după" },
          { id: "t2_m_devreme", label: "Că nu s-a scris la cinci sute de ani după" },
          { id: "t2_m_nimic", label: "Sincer, niciuna. Nu ăsta e blocajul meu" },
        ],
      },
    },
    {
      id: "t2_7",
      type: "scripture",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "Scena: Pavel e judecat, în lanțuri, în fața regelui Agripa, în orașul în care se petrecuseră lucrurile. E acuzat că a înnebunit. Răspunde așa:",
        },
      ],
      scripture: {
        text: "«Împăratul știe aceste lucruri și de aceea îi vorbesc cu îndrăzneală; căci sunt încredințat că nu-i este nimic necunoscut din ele, fiindcă nu s-au petrecut într-un colț!»",
        ref: "Fapte 26:26",
      },
    },
    {
      id: "t2_8",
      type: "truth_simple",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "«Nu s-au petrecut într-un colț» e o invitație la verificare, spusă în fața celui care putea să-l condamne.",
        },
        {
          from: "guide",
          text: "Un om care inventează nu-și trimite judecătorul să întrebe martorii.",
        },
      ],
    },
    {
      id: "t2_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Cum își începe Luca Evanghelia?",
        options: [
          { text: "Cu o viziune personală pe care nimeni n-o poate verifica", correct: false },
          { text: "Cu o cercetare a mărturiilor celor care au văzut", correct: true },
          { text: "Cu o poruncă de a nu pune întrebări", correct: false },
        ],
        explanation:
          "Luca declară metoda înainte de conținut și spune explicit că scopul e ca cititorul să cunoască temeinicia.",
      },
    },
    {
      id: "t2_10",
      type: "reflection",
      order: 10,
      bubbles: [
        { from: "guide", text: "Acum partea pe care nu ți-o ascundem." },
        {
          from: "guide",
          text: "Nimic din ce ai citit azi nu dovedește că Dumnezeu există. Nu vindem asta drept demonstrație.",
        },
        {
          from: "guide",
          text: "Ce face este să mute discuția din «e o poveste frumoasă» în «sunt afirmații despre lucruri care s-au întâmplat sau nu s-au întâmplat». E mult, dar nu e tot.",
        },
      ],
      response: {
        prompt: "Ce ți-ar trebui, concret, ca să iei asta în serios?",
        placeholder: "Scrie ce ți-ar trebui, chiar dacă pare imposibil.",
        required: false,
        minLength: 3,
      },
    },
    {
      id: "t2_11",
      type: "step",
      order: 11,
      bubbles: [
        {
          from: "guide",
          text: "Pasul de azi: deschide Evanghelia după Ioan și citește doar primele optsprezece versete.",
        },
        { from: "guide", text: "Nu ca să fii de acord. Citește-le ca pe un document." },
      ],
    },
    {
      id: "t2_12",
      type: "memory_verse",
      order: 12,
      scripture: {
        text: "…să ți le scriu în șir unele după altele, ca să poți cunoaște astfel temeinicia învățăturilor pe care le-ai primit prin viu grai.",
        ref: "Luca 1:3-4",
      },
    },
    {
      id: "t2_13",
      type: "prayer",
      order: 13,
      bubbles: [
        {
          from: "guide",
          text: "«Dacă e adevărat, vreau să văd cu mintea limpede, nu pentru că mi-e frică sau pentru că mă simt singur. Nu mă lăsa să cred ce nu e adevărat.»",
        },
      ],
    },
    {
      id: "t2_14",
      type: "journal",
      order: 14,
      journalPrompt:
        "Ai crezut vreodată ceva pentru că voiai să fie adevărat? Și ai respins ceva pentru că nu voiai? Scrie câte un exemplu.",
      reward: { xp: 0 },
    },
  ],
}

export const temelieL3: Lesson = {
  id: "temelie_l3",
  courseId: "path_temelie",
  order: 3,
  title: "Cine a scris Biblia și de unde știm ce scria la început",
  estMinutes: 13,
  anchorRefs: ["2 Petru 1:20-21", "2 Timotei 3:16-17"],
  memoryVerseRef: "2 Petru 1:21",
  steps: [
    {
      id: "t3_1",
      type: "check_in",
      order: 1,
      choice: {
        prompt: "Ce ai auzit despre Biblie?",
        options: [
          {
            id: "t3_c_modificata",
            label: "Că a fost modificată de-a lungul secolelor",
            feedback: "E cea mai frecventă. O luăm în față, cu ce se știe.",
          },
          {
            id: "t3_c_conciliu",
            label: "Că niște oameni au ales la un conciliu ce intră în ea",
            feedback: "Există un miez de adevăr aici și o exagerare mare. Le separăm.",
          },
          {
            id: "t3_c_mituri",
            label: "Că e o colecție de mituri",
            feedback: "Atunci întrebarea e ce fel de text e. Începem de acolo.",
          },
        ],
      },
    },
    {
      id: "t3_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Începem cu partea care surprinde: da, Biblia a fost scrisă de oameni." },
        { from: "guide", text: "Nu a căzut din cer și nu susține nicăieri că a căzut din cer." },
      ],
    },
    {
      id: "t3_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "Aproximativ patruzeci de autori, pe parcursul a vreo cincisprezece secole, în trei limbi: ebraică, aramaică și greacă.",
        },
        {
          from: "guide",
          text: "Un rege, un medic, niște pescari, un vameș, un păstor de capre, un paharnic. Nu s-au întâlnit niciodată între ei.",
        },
      ],
    },
    {
      id: "t3_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Ce se spune: a fost scrisă de oameni, deci e inventată." },
        {
          from: "guide",
          text: "Oameni au scris și legile țării, și manualele de medicină. «Scris de om» nu înseamnă «neadevărat».",
        },
        {
          from: "guide",
          text: "Rămân două întrebări adevărate: a vorbit Dumnezeu prin ei? Și mai avem noi ce au scris ei?",
        },
      ],
    },
    {
      id: "t3_5",
      type: "scripture",
      order: 5,
      scripture: {
        text: "Fiindcă nicio prorocie n-a fost adusă prin voia omului; ci oamenii au vorbit de la Dumnezeu, mânați de Duhul Sfânt.",
        ref: "2 Petru 1:21",
      },
    },
    {
      id: "t3_6",
      type: "truth_simple",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "«Mânați», nu «dictați». Se vede în text: Luca scrie ca un cercetător, Pavel ca un avocat, David ca un poet. Stilurile rămân ale lor.",
        },
        {
          from: "guide",
          text: "Asta e prima întrebare, și pe ea nu ți-o poate dovedi nimeni în cinci minute. A doua întrebare, însă, se poate verifica.",
        },
      ],
    },
    {
      id: "t3_7",
      type: "step",
      order: 7,
      bubbles: [
        { from: "guide", text: "Mai avem ce au scris ei?" },
        {
          from: "guide",
          text: "Din Noul Testament s-au păstrat mii de copii în greacă, plus traduceri vechi și citate în scrierile creștinilor din primele secole. Unele fragmente sunt la mai puțin de două sute de ani de la original.",
        },
        {
          from: "guide",
          text: "Iar copiile nu sunt identice între ele. Diferă. Asta nu ți-o ascunde nimeni.",
        },
      ],
    },
    {
      id: "t3_8",
      type: "truth_simple",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "Cele mai multe diferențe sunt de ortografie și de ordine a cuvintelor. Câteva sunt mai mari și sunt cunoscute pe nume.",
        },
        {
          from: "guide",
          text: "Deschide Biblia ta la Marcu 16 și la Ioan 8, la începutul capitolului. Vei găsi o notă de subsol care spune că unele manuscrise vechi nu conțin acele versete.",
        },
        {
          from: "guide",
          text: "Nota aia e tipărită de creștini, în Biblia creștinilor. Nu se ascunde. Cine ar fi inventat totul n-ar fi tipărit nota.",
        },
      ],
    },
    {
      id: "t3_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "De ce apar în Biblie note de subsol despre manuscrise?",
        options: [
          { text: "Ca să ascundă diferențele dintre copii", correct: false },
          { text: "Pentru că diferențele sunt cunoscute, catalogate și publicate", correct: true },
          { text: "Pentru că textul a fost rescris în ultimii o sută de ani", correct: false },
        ],
        explanation:
          "Diferențele dintre manuscrise sunt publice și tipărite chiar în ediția pe care o ții în mână. Niciun punct central de credință nu stă pe un pasaj disputat.",
      },
    },
    {
      id: "t3_10",
      type: "how_god_helps",
      order: 10,
      bubbles: [
        { from: "guide", text: "Și lista cărților? Aici e miezul de adevăr și exagerarea." },
        {
          from: "guide",
          text: "Adevărul: da, au existat discuții și liste, iar unele scrieri au fost respinse.",
        },
        {
          from: "guide",
          text: "Exagerarea: că un conciliu a inventat lista ca să controleze oamenii. Bisericile citeau deja aceste scrieri de generații, în locuri aflate la mii de kilometri unele de altele. Conciliile au recunoscut ce se citea deja.",
        },
      ],
    },
    {
      id: "t3_11",
      type: "scripture",
      order: 11,
      scripture: {
        text: "Toată Scriptura este insuflată de Dumnezeu și de folos ca să învețe, să mustre, să îndrepte, să dea înțelepciune în neprihănire, pentru ca omul lui Dumnezeu să fie desăvârșit și cu totul destoinic pentru orice lucrare bună.",
        ref: "2 Timotei 3:16-17",
      },
    },
    {
      id: "t3_12",
      type: "reflection",
      order: 12,
      bubbles: [
        {
          from: "guide",
          text: "Din nou, limita: nimic din lecția asta nu dovedește că textul e insuflat. Dovedește doar că e vechi, transmis și verificabil, nu fabricat recent.",
        },
      ],
      response: {
        prompt: "Ce anume din ce ai auzit despre Biblie s-a clătinat azi? Și ce a rămas în picioare?",
        placeholder: "Scrie amândouă părțile.",
        required: false,
        minLength: 3,
      },
    },
    {
      id: "t3_13",
      type: "step",
      order: 13,
      bubbles: [
        {
          from: "guide",
          text: "Pasul de azi: ia Biblia ta, orice ediție, și găsește o pagină cu note de subsol. Citește o notă până la capăt.",
        },
        { from: "guide", text: "Cu ochii tăi. Nu pentru că ți-am spus noi." },
      ],
    },
    {
      id: "t3_14",
      type: "memory_verse",
      order: 14,
      scripture: {
        text: "…oamenii au vorbit de la Dumnezeu, mânați de Duhul Sfânt.",
        ref: "2 Petru 1:21",
      },
    },
    {
      id: "t3_15",
      type: "prayer",
      order: 15,
      bubbles: [
        {
          from: "guide",
          text: "«Dacă e cuvântul Tău, arată-mi asta din text, nu dintr-un argument. Vreau să știu dacă vorbești, nu doar dacă cineva a scris bine.»",
        },
      ],
    },
    {
      id: "t3_16",
      type: "journal",
      order: 16,
      journalPrompt:
        "Cine ți-a spus prima dată că Biblia e inventată? Și ce știa omul acela, de fapt, despre subiect?",
      reward: { xp: 0 },
    },
  ],
}

export const temelieL4: Lesson = {
  id: "temelie_l4",
  courseId: "path_temelie",
  order: 4,
  title: "Nu o religie, un Om",
  estMinutes: 12,
  anchorRefs: ["Marcu 2:1-12", "Ioan 8:56-59"],
  memoryVerseRef: "Ioan 14:6",
  steps: [
    {
      id: "t4_1",
      type: "check_in",
      order: 1,
      choice: {
        prompt: "Cine crezi că a fost Iisus? Răspunde cum gândeai înainte de lecția asta.",
        options: [
          { id: "t4_c_invatator", label: "Un învățător bun", feedback: "E cea mai comodă variantă. Vedem dacă a lăsat-o pe masă." },
          { id: "t4_c_legenda", label: "Un personaj în mare parte legendar", feedback: "Atunci uită-te azi la ce se pretinde în text, indiferent cine l-a scris." },
          { id: "t4_c_fiul", label: "Fiul lui Dumnezeu", feedback: "Bine. Lecția de azi îți arată de unde vine asta, nu doar că se spune." },
          { id: "t4_c_nimic", label: "Nu m-am gândit niciodată serios", feedback: "Atunci azi e prima dată. Nu e târziu." },
        ],
      },
    },
    {
      id: "t4_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Creștinismul nu începe cu un set de reguli. Începe cu o persoană." },
        {
          from: "guide",
          text: "Și persoana asta a spus despre sine niște lucruri care nu se pot trece cu vederea politicos.",
        },
      ],
    },
    {
      id: "t4_3",
      type: "scripture",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "Patru oameni au desfăcut acoperișul unei case ca să coboare un paralitic în fața Lui. Toată lumea aștepta o vindecare. El spune altceva:",
        },
      ],
      scripture: {
        text: "«Fiule, păcatele îți sunt iertate!» Unii din cărturari, care erau de față, se gândeau în inimile lor: «Cum vorbește Omul acesta astfel? Hulește! Cine poate să ierte păcatele decât numai Dumnezeu?»",
        ref: "Marcu 2:5-7",
      },
    },
    {
      id: "t4_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        { from: "guide", text: "Cărturarii nu s-au supărat pentru că a fost bun cu omul." },
        {
          from: "guide",
          text: "S-au supărat pentru că iertarea unui păcat făcut altcuiva nu e treaba unui trecător. Au înțeles perfect ce spunea.",
        },
      ],
    },
    {
      id: "t4_5",
      type: "step",
      order: 5,
      bubbles: [
        { from: "guide", text: "Și apoi a făcut ceva verificabil pe loc, tocmai ca să nu rămână la vorbe:" },
      ],
      scripture: {
        text: "«Dar, ca să știți că Fiul omului are putere pe pământ să ierte păcatele, — Ție îți poruncesc», a zis El slăbănogului, «scoală-te, ridică-ți patul și du-te acasă.»",
        ref: "Marcu 2:10-11",
      },
    },
    {
      id: "t4_6",
      type: "world_vs_truth",
      order: 6,
      bubbles: [
        { from: "guide", text: "Ce se spune: a fost un învățător bun, ca mulți alții." },
        {
          from: "guide",
          text: "Un învățător bun nu iartă păcate făcute altcuiva, nu primește închinare și nu spune despre sine ce urmează.",
        },
      ],
    },
    {
      id: "t4_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Iisus le-a zis: «Adevărat, adevărat vă spun că, mai înainte ca să se nască Avraam, sunt Eu.» La auzul acestor vorbe, au luat pietre ca să arunce în El.",
        ref: "Ioan 8:58-59",
      },
    },
    {
      id: "t4_8",
      type: "truth_simple",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "«Eu sunt» e numele pe care Dumnezeu Îl dă lui Moise la rugul aprins. Ascultătorii Lui știau asta pe de rost.",
        },
        {
          from: "guide",
          text: "Au ridicat pietre în aceeași secundă. Pentru ei nu era o metaforă frumoasă. Era exact ce credem noi că era.",
        },
      ],
    },
    {
      id: "t4_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "De ce au ridicat pietre după Ioan 8:58?",
        options: [
          { text: "Pentru că vorbea prea mult în public", correct: false },
          { text: "Pentru că a folosit despre Sine numele lui Dumnezeu", correct: true },
          { text: "Pentru că vindecase în ziua de sabat", correct: false },
        ],
        explanation:
          "Reacția lor arată ce au înțeles. Nimeni nu ridică pietre pentru o metaforă.",
      },
    },
    {
      id: "t4_10",
      type: "multi_choice",
      order: 10,
      multiChoice: {
        prompt:
          "Dacă cineva spune despre sine lucrurile astea, câte variante rămân pe masă? Bifează ce ți se pare posibil.",
        minSelections: 1,
        options: [
          { id: "t4_m_mint", label: "A mințit, știind că minte", feedback: "E o variantă. Atunci a murit pentru o minciună pe care o putea retrage." },
          { id: "t4_m_gresit", label: "S-a înșelat pe sine", feedback: "E o variantă. Atunci a fost un om profund tulburat, nu un învățător de morală." },
          { id: "t4_m_adevar", label: "A spus adevărul", feedback: "E o variantă. Și e singura în care restul are sens." },
          {
            id: "t4_m_bun",
            label: "A fost doar un învățător bun",
            feedback:
              "Asta e singura variantă pe care El nu a lăsat-o pe masă. Nu poți păstra bunătatea și arunca pretenția — sunt în aceeași propoziție.",
          },
        ],
      },
    },
    {
      id: "t4_11",
      type: "how_god_helps",
      order: 11,
      bubbles: [
        { from: "guide", text: "De ce contează asta pentru tine, azi?" },
        {
          from: "guide",
          text: "Pentru că schimbă întrebarea. Nu «pot să țin niște reguli?», ci «am de-a face cu o Persoană?».",
        },
        { from: "guide", text: "Regulile nu caută pe nimeni. O Persoană, da." },
      ],
    },
    {
      id: "t4_12",
      type: "memory_verse",
      order: 12,
      scripture: {
        text: "Iisus i-a zis: «Eu sunt calea, adevărul și viața. Nimeni nu vine la Tatăl decât prin Mine.»",
        ref: "Ioan 14:6",
      },
    },
    {
      id: "t4_13",
      type: "prayer",
      order: 13,
      bubbles: [
        {
          from: "guide",
          text: "«Dacă ești cine ai spus că ești, vreau să Te cunosc ca pe o persoană, nu ca pe o idee. Dacă nu ești, nu vreau să mă mint singur.»",
        },
      ],
    },
    {
      id: "t4_14",
      type: "journal",
      order: 14,
      journalPrompt:
        "Care dintre cele patru variante ți-e cel mai greu să o elimini? Scrie de ce.",
      reward: { xp: 0 },
    },
  ],
}

export const temelieL5: Lesson = {
  id: "temelie_l5",
  courseId: "path_temelie",
  order: 5,
  title: "Energii, karma, univers: ce era adevărat și ce nu",
  estMinutes: 13,
  anchorRefs: ["Fapte 17:22-28", "Coloseni 1:16-17"],
  memoryVerseRef: "Fapte 17:27",
  steps: [
    {
      id: "t5_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Lecția asta se poartă cu respect. Nu se râde de nimeni aici." },
        {
          from: "guide",
          text: "Nu ți se cere să povestești nimănui ce ai făcut și nu ți se cere nicio listă.",
        },
      ],
      choice: {
        prompt: "Ce ai crezut sau ai practicat? Alege ce se apropie cel mai mult.",
        options: [
          { id: "t5_c_energii", label: "Energii, vindecare, cristale" },
          { id: "t5_c_karma", label: "Karma și reîncarnare" },
          { id: "t5_c_univers", label: "«Universul» ca putere care răspunde" },
          { id: "t5_c_astro", label: "Astrologie, numerologie, tarot" },
          { id: "t5_c_amestec", label: "Nimic anume, un amestec din toate" },
        ],
      },
    },
    {
      id: "t5_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Cei mai mulți oameni nu ajung acolo din prostie." },
        {
          from: "guide",
          text: "Ajung pentru că au simțit că e mai mult decât materie și pentru că nimeni din biserică nu le-a răspuns la întrebare.",
        },
      ],
    },
    {
      id: "t5_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        { from: "guide", text: "Începem cu ce ai avut dreptate. Trei lucruri, și nu sunt mici:" },
        { from: "guide", text: "Că există mai mult decât ce se vede. Adevărat." },
        { from: "guide", text: "Că faptele au consecințe reale, nu doar sociale. Adevărat." },
        {
          from: "guide",
          text: "Că simți că e ceva de curățat în tine. Adevărat, și e cea mai importantă dintre cele trei.",
        },
      ],
    },
    {
      id: "t5_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Ce se spune: toate drumurile duc în același loc." },
        {
          from: "guide",
          text: "Ce se vede când te uiți de aproape: seamănă la întrebări și diferă complet la răspuns. Nu e o nuanță.",
        },
      ],
    },
    {
      id: "t5_5",
      type: "scripture",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Pavel ajunge în Atena, un oraș plin de altare pentru zei străini. Uită-te cum începe:",
        },
      ],
      scripture: {
        text: "«Bărbați atenieni! În toate privințele vă găsesc foarte religioși. Căci, pe când străbăteam cetatea voastră și mă uitam la lucrurile la care vă închinați voi, am descoperit chiar și un altar pe care este scris: „Unui Dumnezeu necunoscut!” Ei bine, ceea ce voi cinstiți fără să cunoașteți, aceea vă vestesc eu.»",
        ref: "Fapte 17:22-23",
      },
    },
    {
      id: "t5_6",
      type: "truth_simple",
      order: 6,
      bubbles: [
        { from: "guide", text: "Pavel nu a râs de ei și nu le-a spus că sunt proști." },
        {
          from: "guide",
          text: "A pornit de la un altar pe care îl aveau deja și, câteva versete mai jos, le citează propriii poeți.",
        },
        { from: "guide", text: "Căutarea lor nu era greșită. Adresa era." },
      ],
    },
    {
      id: "t5_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        { from: "guide", text: "Acum diferența, pe scurt, fără politețuri." },
        {
          from: "guide",
          text: "Karma spune: plătești tu, până se echilibrează. Nu se termină niciodată, pentru că nu poți plăti înapoi ce ai făcut deja.",
        },
        {
          from: "guide",
          text: "Crucea spune: a plătit Altcineva, o dată, definitiv. De asta creștinismul nu are trepte de purificare și nu are vieți următoare în care să repari.",
        },
        {
          from: "guide",
          text: "Iar «universul» nu are nume și nu are față. Nu poți vorbi cu o forță și nu poți fi iubit de o lege. Aici, Dumnezeu are un nume și S-a arătat într-un Om.",
        },
      ],
    },
    {
      id: "t5_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Pentru că prin El au fost făcute toate lucrurile care sunt în ceruri și pe pământ, cele văzute și cele nevăzute… Toate au fost făcute prin El și pentru El. El este mai înainte de toate lucrurile și toate se țin prin El.",
        ref: "Coloseni 1:16-17",
      },
    },
    {
      id: "t5_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Care e diferența de fond dintre karma și cruce?",
        options: [
          { text: "Cine plătește", correct: true },
          { text: "Cât de repede vine consecința", correct: false },
          { text: "Nu e nicio diferență reală", correct: false },
        ],
        explanation:
          "Amândouă spun că fapta contează. Una spune că plătești tu, la nesfârșit. Cealaltă spune că s-a plătit deja, o dată.",
      },
    },
    {
      id: "t5_10",
      type: "reflection",
      order: 10,
      bubbles: [
        { from: "guide", text: "Nu conta atât ce ai practicat. Contează ce căutai când ai mers acolo." },
      ],
      response: {
        prompt: "Ce căutai, de fapt? Un rând.",
        placeholder: "Liniște, control, un semn, o vindecare, o explicație…",
        required: false,
        minLength: 3,
      },
    },
    {
      id: "t5_11",
      type: "step",
      order: 11,
      bubbles: [
        {
          from: "guide",
          text: "Nu îți cerem niciun ritual, nu îți cerem să arzi nimic și nu îți cerem o listă cu ce ai făcut. Cine îți cere asta ca să fii primit, îți cere greșit.",
        },
        {
          from: "guide",
          text: "Dacă ai rămas cu frică, cu coșmaruri sau cu senzația că nu ești liber, vorbește cu un om real — un păstor, un consilier — nu cu o aplicație. Noi nu putem face asta de aici.",
        },
        {
          from: "guide",
          text: "Iar dacă frica te ține treaz nopți la rând, mergi și la medic. Poți suna 116 123, gratuit. Nu e lipsă de credință.",
        },
        {
          from: "guide",
          text: "Pasul de azi e o propoziție: «Vreau să vorbesc cu Cineva care are nume, nu cu o forță.»",
        },
      ],
    },
    {
      id: "t5_12",
      type: "memory_verse",
      order: 12,
      scripture: {
        text: "…ca ei să caute pe Dumnezeu și să se silească să-L găsească bâjbâind, măcar că nu este departe de fiecare din noi.",
        ref: "Fapte 17:27",
      },
    },
    {
      id: "t5_13",
      type: "prayer",
      order: 13,
      bubbles: [
        {
          from: "guide",
          text: "«Am căutat în locuri în care nu erai. Nu am căutat degeaba, dar am căutat greșit. Dacă ai un nume, spune-mi-l Tu.»",
        },
      ],
    },
    {
      id: "t5_14",
      type: "journal",
      order: 14,
      journalPrompt:
        "Ce ți-a dat, concret, ce ai practicat înainte? Și ce nu ți-a dat niciodată, oricât ai fi încercat?",
      bubbles: [{ from: "guide", text: "Rămâne pe telefonul tău. Nu îl citește nimeni." }],
      reward: { xp: 0 },
    },
  ],
}

export const temelieL6: Lesson = {
  id: "temelie_l6",
  courseId: "path_temelie",
  order: 6,
  title: "Cum se citește ca să înțelegi",
  estMinutes: 12,
  anchorRefs: ["Fapte 8:26-35", "Neemia 8:8"],
  memoryVerseRef: "Fapte 8:31",
  steps: [
    {
      id: "t6_1",
      type: "check_in",
      order: 1,
      choice: {
        prompt: "Cum ai încercat până acum?",
        options: [
          {
            id: "t6_c_geneza",
            label: "De la Geneza, în ordine",
            feedback:
              "E cel mai frecvent motiv de abandon. Aproape toată lumea se oprește în Levitic, și nu din vina ei.",
          },
          {
            id: "t6_c_random",
            label: "Deschid la întâmplare",
            feedback: "Uneori merge. De cele mai multe ori pică pe un capitol cu genealogii.",
          },
          { id: "t6_c_deloc", label: "Nu am încercat deloc", feedback: "Atunci pornim curat, fără obiceiuri de corectat." },
          {
            id: "t6_c_nimic",
            label: "Citesc, dar nu-mi rămâne nimic",
            feedback: "Asta se rezolvă cu metoda din a doua jumătate a lecției.",
          },
        ],
      },
    },
    {
      id: "t6_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Biblia nu e o carte. E o bibliotecă de șaizeci și șase de cărți." },
        {
          from: "guide",
          text: "Dacă le citești pe toate la fel, de la prima pagină la ultima, nu ai cum să înțelegi. Nu ești tu de vină.",
        },
      ],
    },
    {
      id: "t6_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        { from: "guide", text: "Sunt genuri diferite, și se citesc diferit:" },
        { from: "guide", text: "Istorie — ce s-a întâmplat. Nu tot ce e povestit e și aprobat." },
        { from: "guide", text: "Poezie — psalmii. Se citesc ca poezie, nu ca articole de lege." },
        { from: "guide", text: "Lege — dată unui popor anume, într-un moment anume. Se citește prin ce s-a împlinit în Hristos." },
        { from: "guide", text: "Scrisori — trimise unor oameni reali, cu probleme reale. Întrebi întâi ce le spunea lor." },
        { from: "guide", text: "Profeție — imagini, nu grafice. Cele mai multe greșeli de citire se fac aici." },
      ],
    },
    {
      id: "t6_4",
      type: "scripture",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Un om important, într-o trăsură, citește din Isaia și nu înțelege. Filip îl ajunge din urmă:",
        },
      ],
      scripture: {
        text: "Filip a alergat și a auzit pe etiopian citind pe prorocul Isaia. El i-a zis: «Înțelegi tu ce citești?» Famenul a răspuns: «Cum aș putea să înțeleg, dacă nu mă va călăuzi cineva?»",
        ref: "Fapte 8:30-31",
      },
    },
    {
      id: "t6_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Nu a fost făcut prost. I s-a trimis cineva să-i explice." },
        {
          from: "guide",
          text: "A avea nevoie de ajutor la citit e scris în Biblie, nu împotriva ei.",
        },
      ],
    },
    {
      id: "t6_6",
      type: "world_vs_truth",
      order: 6,
      bubbles: [
        { from: "guide", text: "Ce se spune: dacă ai fi credincios adevărat, ai înțelege singur." },
        { from: "guide", text: "Ce scrie, despre ziua în care poporul a auzit Legea după zeci de ani:" },
      ],
      scripture: {
        text: "Ei citeau deslușit în cartea Legii lui Dumnezeu și-i arătau înțelesul, ca să-i facă să înțeleagă ce citiseră.",
        ref: "Neemia 8:8",
      },
    },
    {
      id: "t6_7",
      type: "step",
      order: 7,
      bubbles: [
        { from: "guide", text: "De unde începi: nu de la Geneza." },
        {
          from: "guide",
          text: "Începe cu Evanghelia după Ioan sau cu cea după Marcu. Ioan e mai lentă și mai adâncă, Marcu e scurtă și rapidă.",
        },
        {
          from: "guide",
          text: "Motivul e simplu: totul în Biblie duce spre El sau pleacă de la El. Dacă începi cu El, restul are unde să se prindă.",
        },
      ],
    },
    {
      id: "t6_8",
      type: "step",
      order: 8,
      bubbles: [
        { from: "guide", text: "Cum citești: un paragraf, nu un capitol. Zece minute, în scris." },
        { from: "guide", text: "1. Ce spune aici despre Dumnezeu?" },
        { from: "guide", text: 