import type { Lesson } from "../domain.js"

/*
 * Ușa „nou_venit" — două lecții în camera 7 (path_impreuna).
 *
 * Cui îi scriem
 * ------------
 * Omului care a intrat prima dată într-o adunare și nu a știut nimic: când se
 * stă în picioare, ce cântă toți pe de rost, ce înseamnă jumătate din cuvinte,
 * unde să se așeze, ce să facă dacă i se cere să se roage cu voce tare.
 * Și care a plecat acasă hotărât să nu se mai întoarcă.
 *
 * Cele două lecții
 * ----------------
 * L1 se ocupă de rușinea de a nu ști. Teza ei: apartenența vine înaintea
 * priceperii. Nu intri în casa lui Dumnezeu după ce înveți regulile casei.
 * L2 se ocupă de partea practică: cum își găsește un om, nu o mulțime, și cum
 * deosebește o adunare sănătoasă de una în care nu are ce căuta.
 *
 * Ce nu face setul
 * ----------------
 * 1. Nu îi vinde o biserică anume și nu îi spune unde să meargă.
 * 2. Nu îl învață să se prefacă priceput. Toată lecția 1 merge în sens invers.
 * 3. Nu confundă o experiență proastă cu Dumnezeu — dar nici nu îi cere să
 *    rămână undeva unde este folosit.
 * 4. Nu numără duminici și nu dă puncte (docs/22 §8).
 *
 * Semnalul de alarmă din L2
 * -------------------------
 * Omul nou este ținta cea mai ușoară. De aceea lecția 2 poartă câmpul safety
 * și spune limpede trei semne după care se pleacă: banii ceruți apăsat,
 * ruperea de familie și interzicerea întrebărilor.
 *
 * Regula textului biblic
 * ----------------------
 * Toate versetele sunt verificate după Cornilescu 1924. Efeseni 2:19 se oprește
 * la „oameni din casa lui Dumnezeu", pentru că versetul următor conține Numele
 * în forma din traducere.
 */

export const nouVenitL1: Lesson = {
  id: "nou_venit_l1",
  courseId: "path_impreuna",
  order: 41,
  title: "Prima dată când intri și nu știi nimic",
  estMinutes: 10,
  anchorRefs: ["Efeseni 2:19", "Ioan 6:37", "Matei 6:7", "Luca 18:13"],
  memoryVerseRef: "Efeseni 2:19",
  steps: [
    {
      id: "nv1_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Ai intrat undeva unde toată lumea părea să știe ce face, în afară de tine." },
        { from: "guide", text: "Nu este o nimica toată. Este unul dintre cele mai singuratice sentimente care există." }
      ]
    },
    {
      id: "nv1_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Hai să le spun eu, ca să nu le mai spui tu." },
        { from: "guide", text: "Nu ai știut când se stă în picioare și te-ai ridicat cu o secundă mai târziu decât toți. Nu ai știut cântecul și ai mișcat din buze. Nu ai știut unde să te așezi și ai stat în spate." },
        { from: "guide", text: "Cineva te-a întrebat «ești nou?» și ți s-a făcut cald la față. Ai numărat minutele până la sfârșit și ai plecat repede, ca să nu îți vorbească nimeni." },
        { from: "guide", text: "Iar acasă ți-ai spus: «nu e de mine»." }
      ]
    },
    {
      id: "nv1_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Întâi, o veste care ușurează: nimic din ce ai simțit acolo nu are legătură cu Dumnezeu. Are legătură cu obiceiurile unui grup de oameni." },
        { from: "guide", text: "Fiecare grup are obiceiurile lui — și o echipă de fotbal, și o familie mare la masă de Crăciun. Cine intră din afară se simte străin câteva dăți. Este normal și trece." },
        { from: "guide", text: "Ce nu este normal ar fi să crezi că Dumnezeu îți cere școală înainte de intrare." }
      ]
    },
    {
      id: "nv1_4",
      type: "step",
      order: 4,
      bubbles: [
        { from: "guide", text: "Al doilea, problema cuvintelor. Se vorbește acolo o limbă pe care nu ți-a predat-o nimeni." },
        { from: "guide", text: "«Părtășie» înseamnă oameni care își împart viața, nu doar care se salută. «Mărturie» înseamnă când cineva povestește ce i-a făcut Dumnezeu. «Amvon» este locul de unde se vorbește." },
        { from: "guide", text: "«Zeciuială» înseamnă a zecea parte din venit, dată de bunăvoie. «Adunare» și «biserică» înseamnă uneori clădirea, alteori oamenii — și al doilea înțeles este cel adevărat." },
        { from: "guide", text: "Nu îți cere nimeni să le știi pe toate. În orice loc sănătos, întrebarea «ce înseamnă asta?» este primită bine. Dacă nu este, ai aflat ceva important despre locul acela." }
      ]
    },
    {
      id: "nv1_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        { from: "guide", text: "Minciuna care te-a scos pe ușă sună așa: «mai întâi învăț, mă fac cum trebuie, și pe urmă vin»." },
        { from: "guide", text: "Este exact pe dos. Nu îți speli hainele înainte de a intra în casă; intri în casă și acolo te speli." },
        { from: "guide", text: "Și mai este una: «toți de acolo sunt mai buni decât mine». Nu sunt. Sunt doar acolo de mai multă vreme, deci știu unde se țin scaunele." }
      ]
    },
    {
      id: "nv1_6",
      type: "truth_simple",
      order: 6,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: apartenența vine înaintea priceperii." },
        { from: "guide", text: "Ești primit ca om din casă înainte să înveți vreo regulă a casei." }
      ]
    },
    {
      id: "nv1_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        { from: "guide", text: "Trei lucruri pe care le găsești în text și pe care nu ți le poate lua nimeni." },
        { from: "guide", text: "Unu: cuvântul folosit pentru tine nu este «musafir», ci «om din casă». Este o schimbare de statut, nu o politețe." },
        { from: "guide", text: "Doi: nu există o probă de intrare. Cine vine nu este dat afară." },
        { from: "guide", text: "Trei: nici la rugăciune nu ai nevoie de vocabular. Cea mai lăudată rugăciune din Evanghelii are șase cuvinte și a fost spusă de un om care stătea în spate." }
      ]
    },
    {
      id: "nv1_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Așadar, voi nu mai sunteți nici străini, nici oaspeți ai casei, ci sunteți împreună cetățeni cu sfinții, oameni din casa lui Dumnezeu",
        ref: "Efeseni 2:19"
      },
      bubbles: [
        { from: "guide", text: "Citește încă o dată ce nu mai ești: nici străin, nici oaspete." },
        { from: "guide", text: "Oaspetele este primit frumos și pleacă la ora potrivită. Omul din casă rămâne și când nu știe unde se țin farfuriile." }
      ]
    },
    {
      id: "nv1_9",
      type: "scripture",
      order: 9,
      scripture: {
        text: "Tot ce-Mi dă Tatăl va ajunge la Mine; și pe cel ce vine la Mine, nu-l voi izgoni afară",
        ref: "Ioan 6:37"
      },
      bubbles: [
        { from: "guide", text: "Nu scrie «pe cel ce vine pregătit». Scrie «pe cel ce vine»." }
      ]
    },
    {
      id: "nv1_10",
      type: "scripture",
      order: 10,
      scripture: {
        text: "Când vă rugați, să nu bolborosiți aceleași vorbe, ca păgânii, cărora li se pare că, dacă spun o mulțime de vorbe, vor fi ascultați.",
        ref: "Matei 6:7"
      },
      bubbles: [
        { from: "guide", text: "Deci grija ta că «nu știu să mă rog frumos» este exact inversă față de grija Lui." },
        { from: "guide", text: "Nu se cer vorbe multe și alese. Se cere să fie ale tale." }
      ]
    },
    {
      id: "nv1_11",
      type: "scripture",
      order: 11,
      scripture: {
        text: "Vameșul stătea departe și nu îndrăznea nici ochii să și-i ridice spre cer, ci se bătea în piept și zicea: «Dumnezeule, ai milă de mine, păcătosul!»",
        ref: "Luca 18:13"
      },
      bubbles: [
        { from: "guide", text: "Uite-l pe omul din spatele sălii, care nu știe cum se face și nu îndrăznește să ridice ochii." },
        { from: "guide", text: "În povestea aceea, el este cel care pleacă acasă primit de Dumnezeu, nu omul din față, care știa toate cuvintele." }
      ]
    },
    {
      id: "nv1_12",
      type: "name_struggle",
      order: 12,
      bubbles: [
        { from: "guide", text: "Spune un singur lucru: care a fost momentul cel mai stânjenitor?" },
        { from: "guide", text: "Poate cel în care nu ai știut ce să faci cu mâinile. Poate când te-a întrebat cineva ceva și ai răspuns aiurea." },
        { from: "guide", text: "Scrie-l. Când îl vezi scris, se face mult mai mic decât era în cap." }
      ]
    },
    {
      id: "nv1_13",
      type: "quiz",
      order: 13,
      quiz: {
        question: "Ce trebuie să știi înainte de a intra?",
        options: [
          { text: "Cântecele, când se stă în picioare și înțelesul cuvintelor, altfel nu ai ce căuta acolo", correct: false },
          { text: "Nimic; ești primit ca om din casă înainte să înveți regulile casei", correct: true },
          { text: "Măcar o rugăciune frumoasă, pe care să o poți spune cu voce tare dacă ți se cere", correct: false }
        ],
        explanation: "Efeseni 2:19 spune că nu mai ești nici străin, nici oaspete, ci om din casa lui Dumnezeu — iar asta se spune despre oameni care abia intraseră. Ioan 6:37 nu pune nicio condiție de pregătire, iar Matei 6:7 spune că vorbele multe și alese nu sunt cerute."
      }
    },
    {
      id: "nv1_14",
      type: "memory_verse",
      order: 14,
      scripture: {
        text: "Așadar, voi nu mai sunteți nici străini, nici oaspeți ai casei, ci sunteți împreună cetățeni cu sfinții, oameni din casa lui Dumnezeu",
        ref: "Efeseni 2:19"
      },
      bubbles: [
        { from: "guide", text: "Dacă ții minte doar trei cuvinte din toată lecția, ține minte: oameni din casă." }
      ]
    },
    {
      id: "nv1_15",
      type: "prayer",
      order: 15,
      bubbles: [
        { from: "guide", text: "«Doamne, nu știu cum se face acolo. Nu știu cântecele și nu știu cuvintele. Dar am venit. Primește-mă așa cum sunt astăzi și dă-mi curaj să mai intru o dată. Amin.»" }
      ]
    },
    {
      id: "nv1_16",
      type: "journal",
      order: 16,
      journalPrompt: "Scrie momentul cel mai stânjenitor de atunci. Apoi scrie dedesubt, cu cuvintele tale, ce înseamnă «oameni din casa lui Dumnezeu» dacă este adevărat și despre tine.",
      reward: { xp: 0, axisDeltas: { identity: 1 } }
    }
  ]
}

export const nouVenitL2: Lesson = {
  id: "nou_venit_l2",
  courseId: "path_impreuna",
  order: 42,
  title: "Cum îți găsești oamenii",
  estMinutes: 11,
  anchorRefs: [
    "Romani 15:7",
    "Faptele apostolilor 2:42",
    "1 Corinteni 12:18",
    "Iacov 2:9"
  ],
  memoryVerseRef: "Romani 15:7",
  safety: {
    topic: "mental_health",
    notice: "Omul nou este cel mai ușor de folosit. Dacă undeva ți se cer bani apăsat sau repetat, dacă ești îndemnat să te rupi de familie și de prieteni, sau dacă întrebările tale sunt pedepsite, pleacă de acolo. Nu este lipsă de credință, este bun-simț. Dacă ești amenințat, sună la 112."
  },
  steps: [
    {
      id: "nv2_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Ieri am scos rușinea din drum. Astăzi vorbim despre partea grea: cum ajungi să ai acolo oamenii tăi." }
      ]
    },
    {
      id: "nv2_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Cea mai mare greșeală a omului nou este că așteaptă să fie adoptat de mulțime." },
        { from: "guide", text: "Nu funcționează așa nicăieri. Nici la o slujbă nouă, nici într-un oraș nou. Nu te împrietenești cu o sală. Te împrietenești cu un om, și pe urmă cu încă unul." },
        { from: "guide", text: "Deci ținta ta pentru luna asta nu este «să mă integrez». Este un singur nume." }
      ]
    },
    {
      id: "nv2_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Șase lucruri practice. Ia două, nu șase." },
        { from: "guide", text: "Unu, rămâi zece minute după ce se termină. Tot ce contează se întâmplă în cele zece minute în care ceilalți stau de vorbă, nu în timpul programului." },
        { from: "guide", text: "Doi, spune din prima că ești nou. Nu este o slăbiciune, este o ușă deschisă pentru celălalt. Majoritatea oamenilor vor să ajute, dar nu știu cui." },
        { from: "guide", text: "Trei, pune întrebările proaste. «Ce înseamnă cuvântul ăsta?», «de ce faceți asta așa?». Răspunsul îți spune și despre cuvânt, și despre om." },
        { from: "guide", text: "Patru, caută grupul mic, nu sala mare. Zece oameni într-o bucătărie fac mai mult decât trei sute într-o sală." },
        { from: "guide", text: "Cinci, dă-i patru șanse. Nu judeca un loc după o singură duminică, așa cum nu judeci un om după o singură propoziție." },
        { from: "guide", text: "Șase, cere să faci ceva. Un scaun mutat, o mână la bucătărie. Oamenii se cunosc muncind alături mai repede decât stând față în față." }
      ]
    },
    {
      id: "nv2_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Se aude des: «dacă Dumnezeu vrea, o să vină ei la mine»." },
        { from: "guide", text: "Uneori vin. De multe ori nu vin, și nu din răutate, ci pentru că nu te-au văzut. Oamenii care se cunosc de douăzeci de ani nu își dau seama că tu stai singur lângă ușă." },
        { from: "guide", text: "Iar cealaltă, mai amară: «am încercat o dată, nu m-a băgat nimeni în seamă, gata». Este dreptul tău să fii supărat. Dar nu lăsa o duminică rece să îți hotărască zece ani." }
      ]
    },
    {
      id: "nv2_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: nu ai nevoie de o mulțime care să te primească. Ai nevoie de un om." },
        { from: "guide", text: "Și, de cele mai multe ori, omul acela apare abia după ce îl cauți tu." }
      ]
    },
    {
      id: "nv2_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Două lucruri pe care Dumnezeu le așază sub tine aici." },
        { from: "guide", text: "Unu: porunca de a primi nu este a ta, este a lor. Tu nu trebuie să cerșești un loc; ei sunt cei cărora li se cere să te primească. Dacă nu o fac, nu îți lipsește ție ceva." },
        { from: "guide", text: "Doi: locul tău nu este ales de comitet. A fost așezat de El. Nu ești un om în plus la numărătoare." }
      ]
    },
    {
      id: "nv2_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Așadar, primiți-vă unii pe alții, cum v-a primit și pe voi Hristos, spre slava lui Dumnezeu.",
        ref: "Romani 15:7"
      },
      bubbles: [
        { from: "guide", text: "Observă cui i se vorbește. Nu ție, celui nou. Celor dinlăuntru." },
        { from: "guide", text: "Și observă măsura: «cum v-a primit și pe voi». Adică fără examen la intrare." }
      ]
    },
    {
      id: "nv2_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Ei stăruiau în învățătura apostolilor, în legătura frățească, în frângerea pâinii și în rugăciuni.",
        ref: "Faptele apostolilor 2:42"
      },
      bubbles: [
        { from: "guide", text: "Uite din ce era făcută cea dintâi biserică: învățătură, oameni legați între ei, masă și rugăciune." },
        { from: "guide", text: "Nu apar aici nici sala, nici programul, nici muzica. Dacă undeva găsești cele patru lucruri, ai găsit ce trebuie." }
      ]
    },
    {
      id: "nv2_9",
      type: "scripture",
      order: 9,
      scripture: {
        text: "Acum dar, Dumnezeu a pus mădularele în trup, pe fiecare așa cum a voit El.",
        ref: "1 Corinteni 12:18"
      },
      bubbles: [
        { from: "guide", text: "«Pe fiecare.» Deci și pe cel care stă acum în spate și nu cunoaște pe nimeni." }
      ]
    },
    {
      id: "nv2_10",
      type: "scripture",
      order: 10,
      scripture: {
        text: "Dar, dacă aveți în vedere fața omului, faceți un păcat și sunteți osândiți de Lege ca niște călcători de lege.",
        ref: "Iacov 2:9"
      },
      bubbles: [
        { from: "guide", text: "Dacă ai simțit că ești cântărit după haine, după mașină sau după felul de a vorbi, nu ți s-a părut. Și nu este o scăpare mică — textul îi spune păcat." },
        { from: "guide", text: "Deci greșeala este a lor, nu a hainelor tale." }
      ]
    },
    {
      id: "nv2_11",
      type: "name_struggle",
      order: 11,
      bubbles: [
        { from: "guide", text: "Un nume și o zi. Atât îți cer." },
        { from: "guide", text: "Cine este omul de acolo cu care ai schimbat măcar două vorbe? Nu trebuie să fie cineva important. Poate fi cel care îți ține ușa." },
        { from: "guide", text: "Și când îi spui «bună, sunt nou pe aici»?" }
      ]
    },
    {
      id: "nv2_12",
      type: "quiz",
      order: 12,
      quiz: {
        question: "Ai fost de trei ori și nu a vorbit nimeni cu tine. Ce faci?",
        options: [
          { text: "Te oprești; dacă ar fi fost locul tău, te-ar fi căutat cineva până acum", correct: false },
          { text: "Rămâi zece minute după program, spui unui singur om că ești nou și cauți un grup mic", correct: true },
          { text: "Te muți la altă biserică în fiecare duminică, până când te întreabă cineva cum te cheamă", correct: false }
        ],
        explanation: "Porunca de a primi le este dată lor (Romani 15:7), dar asta nu te ține pe loc pe tine. Cea dintâi biserică se ținea prin legătură și masă (Faptele apostolilor 2:42), lucruri care se întâmplă în grupuri mici, nu în săli mari. Un singur om cunoscut schimbă totul."
      }
    },
    {
      id: "nv2_13",
      type: "memory_verse",
      order: 13,
      scripture: {
        text: "Așadar, primiți-vă unii pe alții, cum v-a primit și pe voi Hristos, spre slava lui Dumnezeu.",
        ref: "Romani 15:7"
      },
      bubbles: [
        { from: "guide", text: "Ține-l minte pentru două vremuri: acum, când ești nou, și peste doi ani, când va intra altcineva pe ușă și nu va ști nimic." }
      ]
    },
    {
      id: "nv2_14",
      type: "prayer",
      order: 14,
      bubbles: [
        { from: "guide", text: "«Doamne, dă-mi un om. Nu o mulțime, un om. Și fă-mă să nu fug de la primele zece minute de tăcere. Amin.»" }
      ]
    },
    {
      id: "nv2_15",
      type: "journal",
      order: 15,
      journalPrompt: "Scrie numele unui om de acolo și ziua în care îi spui că ești nou. Apoi scrie cele două lucruri practice pe care le iei din cele șase.",
      reward: { xp: 0, axisDeltas: { relationships: 1 } }
    }
  ]
}

export const NOU_VENIT_LESSONS: Lesson[] = [nouVenitL1, nouVenitL2]

/*
 * Practicile ușii, aliniate pe index cu lecțiile. Amândouă sunt mici și
 * verificabile într-o singură zi.
 */
export const NOU_VENIT_PRACTICES: string[] = [
  "Astăzi scrie trei întrebări pe care nu ai îndrăznit să le pui acolo. Doar scrie-le; le vei pune când vei fi gata.",
  "Astăzi, dacă mergi, rămâi zece minute după ce se termină și spune unui singur om că ești nou."
]
