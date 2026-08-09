import type { Lesson } from "../domain.js"

/*
 * TEMELIA — camera 3: "Nu e real / nu se poate ști". Lecțiile 1-3.
 * Continuare în `temelieB.ts` (4-5) și `temelieC.ts` (6-7 + asamblare).
 * Referință: docs/20, docs/21. Siguranță: docs/22 (are prioritate).
 * Inventar pe uși: docs/23-porti-continut.md
 *
 * DE CE EXISTĂ (docs/23 §3, defectul D3): până acum `pathTemelie` împrumuta
 * primele trei lecții de doctrină (`doctrinaL1..L3`). Trei probleme:
 *   1. Trei lecții pentru o cameră întreagă, care primește patru uși
 *      (`indoiala`, `nu_inteleg`, `biblia_inventata`, `alte_credinte`), două uși
 *      de explorare (`inceput`, `nu_stiu`) și rolul de `FALLBACK_PATH_ID`.
 *   2. Cele patru uși nu pun aceeași întrebare și primeau același răspuns.
 *   3. Suprapunere cu doctrina generală: omul făcea `doctrinaL1..L3` ca parcurs
 *      personal, iar `DOCTRINE_UNLOCK_AFTER` i le redeschidea după lecția 5.
 *      Aceleași trei lecții, de două ori. `DOCTRINE_LESSONS` rămâne neatins.
 *
 * ORDINEA (docs/21 §2): nu începem cu dovezi și nu începem cu ce nu știe omul.
 * Începem cu permisiunea de a nu fi sigur — cine crede că trebuie să fie convins
 * înainte de a avea voie să se apropie nu se apropie niciodată.
 *   1. îndoiala nu te dă afară   2. ce se poate verifica   3. cine a scris Biblia
 *   4. nu o religie, un Om      5. energii, karma, univers
 *   6. cum se citește           7. ce faci cu ce ai aflat
 *
 * ONESTITATE ASUMATĂ: lecțiile 2 și 3 spun explicit ce NU dovedesc și nu ascund
 * diferențele dintre manuscrise — trimit omul să le citească în notele de subsol
 * din propria lui Biblie. O apologetică care exagerează se sparge la prima
 * căutare pe internet și ia cu ea tot restul.
 *
 * SIGURANȚĂ: niciuna dintre cele șapte lecții nu are `safety` cu ecran separat —
 * subiectele nu intră în lista din docs/22 §2. Excepția de conținut e în
 * `temelieB.ts`, lecția 5. Toate recompensele rămân `xp: 0` (docs/22 §8).
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
            feedback:
              "Opusul credinței nu e îndoiala. E indiferența. Tu nu ești indiferent, altfel nu erai aici.",
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
      scripture: { text: "«Cred, Doamne! Ajută necredinței mele!»", ref: "Marcu 9:24" },
    },
    {
      id: "t1_10",
      type: "truth_simple",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "A cerut ajutor pentru partea din el care nu credea. Nu a fost trimis acasă să se lămurească întâi.",
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
      scripture: { text: "«Cred, Doamne! Ajută necredinței mele!»", ref: "Marcu 9:24" },
      bubbles: [{ from: "guide", text: "Nu e o formulă. E permisiunea de a veni pe jumătate." }],
    },
    {
      id: "t1_13",
      type: "prayer",
      order: 13,
      bubbles: [
        {
          from: "guide",
          text: "Dacă vrei, spune asta. Dacă nu vrei, treci mai departe — nu se bifează nimic.",
        },
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
      bubbles: [{ from: "guide", text: "Răspunsul este opțional. Nu scrie nimic ce nu vrei să rămână salvat pe dispozitivul tău." }],
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
        prompt: "Unde ești azi, față de data trecută?",
        options: [
          {
            id: "t2_c_same",
            label: "Cam la fel",
            feedback: "E în regulă. Nu se schimbă nimic în două zile.",
          },
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
        {
          from: "guide",
          text: "În Biblie nu înseamnă asta. Se vede din primul rând al unei Evanghelii.",
        },
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
          text: "Și spune de ce scrie: ca cititorul să poată cunoaște temeinicia. Adică să verifice, nu să înghită.",
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
          text: "Scena: Pavel e judecat, în lanțuri, în fața regelui Agripa, în regiunea în care se petrecuseră lucrurile. E acuzat că a înnebunit. Răspunde așa:",
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
        { from: "guide", text: "Un om care inventează nu-și trimite judecătorul să întrebe martorii." },
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
          text: "Nimic din ce ai citit azi nu dovedește că Dumnezeu există. Nu îți vindem asta drept demonstrație.",
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
          text: "«Dacă e adevărat, vreau să văd cu mintea limpede, nu pentru că mi-e frică și nu pentru că mă simt singur. Nu mă lăsa să cred ce nu e adevărat.»",
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
        {
          from: "guide",
          text: "Începem cu partea care surprinde: da, Biblia a fost scrisă de oameni.",
        },
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
          text: "Un rege, un medic, niște pescari, un vameș, un păstor de capre, un paharnic. Cei mai mulți nu s-au întâlnit niciodată între ei.",
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
          text: "Asta e prima întrebare și nu ți-o poate dovedi nimeni în cinci minute. A doua întrebare, însă, se poate verifica.",
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
        { from: "guide", text: "Iar copiile nu sunt identice între ele. Diferă. Asta nu ți-o ascunde nimeni." },
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
          text: "Deschide Biblia ta la Marcu 16 și la începutul lui Ioan 8. Vei găsi o notă de subsol care spune că unele manuscrise vechi nu conțin acele versete.",
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
        { from: "guide", text: "Și lista cărților? Aici e și miezul de adevăr, și exagerarea." },
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
