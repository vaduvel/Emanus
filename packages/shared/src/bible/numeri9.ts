import { numeriChapter, teaching } from "./numeriHelpers.js"
import { numeriPassage } from "./numeriText.js"
import { NUMERI_STATUSES } from "./numeriPublication.js"

/*
 * Cartea Numeri, explicată pe unități de sens.
 *
 * Textul biblic: păstrat separat în numeriText.ts (fișierele numeriTextN.ts).
 * Explicația: scrisă pentru Emanus după cercetarea textului. Nu se copiază
 * formularea niciunui predicator sau comentator.
 */

export const NUMERI_9 = numeriChapter({
  number: 9,
  title: "Numeri 9 — Paștele al doilea și norul călăuzitor",
  summary:
    "Un an după ieșirea din Egipt, poporul celebrează Paștele în pustia Sinai. Cei opriți de necurăție cer o cale pentru ei, iar DOMNUL rânduiește un Paște al doilea. Capitolul se încheie cu descrierea norului care acoperea Cortul zi și noapte și călăuzea fiecare popas și fiecare pornire a taberei.",
  literaryContext:
    "Capitolul întrerupe firul organizării taberei cu o întoarcere în timp: evenimentul povestit la începutul capitolului s-a petrecut înaintea recensământului din capitolul întâi, în prima lună a anului, nu în a doua. Cartea Numeri așază aici acest episod pentru a lega Paștele — amintirea izbăvirii — de norul care va conduce poporul afară din Sinai, pregătind astfel trecerea spre capitolul zece, unde tabăra pornește în sfârșit la drum.",
  historicalContext:
    "Cererea celor necurați arată o problemă reală: legea Paștelui din Exod 12 nu prevăzuse ce se întâmplă cu cel oprit de o necurăție rituală fără voia lui (atingerea unui mort) sau aflat departe de tabără. Răspunsul DOMNULUI, „Paștele al doilea” din luna a doua, devine o rânduială permanentă în Israel, aplicată mai târziu și la vremea lui Ezechia (2 Cronici 30).",
  units: [
    {
      id: "numeri-9-1-5",
      ref: "Numeri 9:1-5",
      heading: "Paștele celebrat la vremea rânduită, în pustia Sinai",
      text: numeriPassage(9, 1, 5),
      teaching: teaching(
        "Ordinea cronologică a cărții Numeri este surprinzătoare aici: evenimentul are loc „în primul an... în luna întâi”, deci înaintea recensământului din capitolul întâi, care avusese loc în luna a doua a celui de-al doilea an. Autorul așază intenționat acest episod aici, nu în ordine strict cronologică, pentru a lega Paștele de norul călăuzitor care încheie capitolul.",
        "Porunca este scurtă și fără adaosuri: „să-l celebrați după toate rânduirile lui și după toate legile lui”. Israel ascultă întocmai: „după tot ce-i poruncise DOMNUL lui Moise, așa au făcut fiii lui Israel”. La un an de la prima celebrare din Egipt, în mijlocul pustiei, fără casele și ușorii unși cu sânge din noaptea aceea, poporul ține totuși aceeași sărbătoare, cu aceeași ascultare exactă.",
      ),
      words: [
        {
          original: "בְּמוֹעֲדוֹ",
          transliteration: "bemoado",
          language: "ebraica",
          meaning:
            "la timpul rânduit. Expresia revine de mai multe ori în capitol, subliniind că Paștele nu este o sărbătoare la alegere, ci una legată de o dată exactă, stabilită de DOMNUL.",
        },
      ],
      crossRefs: ["Exod 12:1-14", "Iosua 5:10-11", "2 Cronici 30:1-5"],
      forYourHeart:
        "Amintirea izbăvirii nu se ține doar o dată, la eliberare; ea se reînnoiește an de an, chiar și în mijlocul pustiei, ca să nu uităm de unde am fost scoși.",
    },
    {
      id: "numeri-9-6-8",
      ref: "Numeri 9:6-8",
      heading: "„De ce să fim opriți?” — întrebarea celor necurați",
      text: numeriPassage(9, 6, 8),
      teaching: teaching(
        "Un grup de bărbați, necurați „din cauza unui trup mort de om”, se prezintă înaintea lui Moise și a lui Aaron cu o întrebare îndrăzneață, dar dreaptă: „de ce să fim opriți de la aducerea ofrandei DOMNULUI la timpul rânduit în mijlocul fiilor lui Israel?” Nu vin să conteste legea, ci să ceară o cale de a o împlini, în ciuda situației lor.",
        "Răspunsul lui Moise este remarcabil de smerit: „Așteptați ca să aud ce va porunci DOMNUL cu privire la voi.” Cel mai mare conducător al lui Israel nu improvizează un răspuns și nu respinge cererea din proprie autoritate; recunoaște limita cunoașterii lui și așteaptă cuvântul DOMNULUI.",
      ),
      words: [
        {
          original: "לָמָּה נִגָּרַע",
          transliteration: "lamah nigara",
          language: "ebraica",
          meaning:
            "de ce să fim micșorați / opriți. Verbul sugerează ideea de a fi lăsat mai prejos, de a pierde ceva ce ar trebui să ai parte — tocmai nedreptatea simțită de acești bărbați.",
        },
      ],
      crossRefs: ["Numeri 27:1-5", "Iacov 1:5"],
      forYourHeart:
        "O dorință dreaptă de a te apropia de Dumnezeu, chiar când o piedică reală te oprește, merită adusă înaintea Lui, nu abandonată în tăcere.",
    },
    {
      id: "numeri-9-9-14",
      ref: "Numeri 9:9-14",
      heading: "Paștele al doilea — o cale pentru cel oprit",
      text: numeriPassage(9, 9, 14),
      teaching: teaching(
        "Răspunsul DOMNULUI nu vine ca o excepție rușinoasă, ci ca o lege pentru totdeauna: oricine este necurat printr-un trup mort sau este într-o călătorie îndepărtată „totuși va celebra Paștele DOMNULUI”, dar în luna a doua, în ziua a paisprezecea, cu aceleași rânduieli — pâini fără plămădeală, ierburi amare, fără să lase nimic până dimineața, fără să zdrobească niciun os.",
        "Legea are și o parte aspră: cel care este curat și nu este în călătorie, dar refuză să celebreze Paștele la vremea lui, „sufletul aceluia va fi nimicit din mijlocul poporului”. Mila arătată celui împiedicat fără voia lui nu se transformă în îngăduință pentru cel care disprețuiește porunca din nepăsare.",
        "Ultima propoziție a legii este surprinzător de largă pentru vremea aceea: „o singură rânduială veți avea, atât pentru străin, cât și pentru cel născut în țară”. Cel venit din afara lui Israel avea acces la aceeași sărbătoare a izbăvirii, dacă alegea să o țină după rânduiala ei.",
      ),
      words: [
        {
          original: "וְעָשָׂה פֶסַח לַיהוָה",
          transliteration: "veasah pesach la-Adonai",
          language: "ebraica",
          meaning:
            "totuși va celebra Paștele DOMNULUI. Construcția arată că sărbătoarea nu este anulată pentru cel oprit, ci doar amânată; dorința lui de părtășie nu rămâne fără răspuns.",
        },
      ],
      crossRefs: ["2 Cronici 30:2-3", "Exod 12:19", "Efeseni 2:19"],
      forYourHeart:
        "Dumnezeu face loc pentru cel oprit fără voia lui, dar cere seriozitate de la cel care are libertatea de a veni și alege să nu vină.",
    },
    {
      id: "numeri-9-15-23",
      ref: "Numeri 9:15-23",
      heading: "Norul care hotăra fiecare popas și fiecare pornire",
      text: numeriPassage(9, 15, 23),
      teaching: teaching(
        "Din chiar ziua ridicării Cortului, norul îl acoperea — ziua ca nor, noaptea „ca o înfățișare de foc”. Textul repetă, aproape ca un refren, aceeași idee sub multe forme: „la porunca DOMNULUI porneau și la porunca DOMNULUI tăbărau”. Nicio decizie de mișcare nu aparținea lui Moise, căpeteniilor sau vreunui plan omenesc dinainte stabilit.",
        "Observă varietatea duratelor menționate: uneori norul rămânea „multe zile”, alteori „doar puține zile”, alteori „doar de seară până dimineața”, alteori „două zile, o lună sau un an”. Israel nu putea prezice și nu putea grăbi ritmul; singura lui datorie era să vegheze norul și să asculte imediat, fie ziua, fie noaptea, când acesta se ridica.",
        "Ultimul verset adună tot capitolul într-o singură propoziție: „ei păzeau porunca DOMNULUI, după porunca DOMNULUI dată prin Moise”. Ascultarea aceasta zilnică, fără să știe dinainte cât va dura popasul următor, este o formă de credință mai grea decât ascultarea unei porunci date o singură dată pentru totdeauna.",
      ),
      words: [
        {
          original: "עַל־פִּי יְהוָה",
          transliteration: "al-pi Adonai",
          language: "ebraica",
          meaning:
            "după gura / la porunca DOMNULUI. Expresia repetată de șase ori în această unitate arată o dependență totală: nici pornirea, nici popasul nu veneau din inițiativa taberei.",
        },
      ],
      crossRefs: ["Exod 40:36-38", "Neemia 9:19", "1 Corinteni 10:1"],
      forYourHeart:
        "A urma călăuzirea lui Dumnezeu zi de zi, fără să știi dinainte cât va dura popasul sau cât de curând va veni pornirea următoare, este o credință vie, nu o rutină.",
    },
  ],
  prayer:
    "Doamne, învață-mă să țin amintirea izbăvirii Tale chiar și în mijlocul pustiei mele, fără să aștept vremuri mai ușoare.\n\nCând o piedică reală mă oprește de la părtășia cu Tine, dă-mi îndrăzneala celor necurați care au cerut o cale, nu tăcerea resemnării.\n\nÎnvață-mă să veghez norul Tău în fiecare zi, gata să pornesc sau să rămân, după cum hotărăști Tu, nu după planul meu dinainte stabilit.\n\nȘi mulțumesc-Ți că faci loc pentru cel oprit fără voia lui, așa cum ai rânduit Paștele al doilea pentru cei care doreau cu adevărat să se apropie de Tine. Amin.",
  status: NUMERI_STATUSES[9],
})
