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

export const NUMERI_19 = numeriChapter({
  number: 19,
  title: "Numeri 19 — Vaca roșie și apa de curățire",
  summary:
    "DOMNUL rânduiește un ritual unic pentru curățirea de necurăția contactului cu moartea: cenușa unei vaci roșii fără cusur, arse în afara taberei, amestecată cu apă, folosită să stropească pe oricine s-a atins de un mort, în ziua a treia și a șaptea. Fără această curățire, cel necurat spurcă Sfântul Lăcaș al DOMNULUI și este nimicit din mijlocul adunării.",
  literaryContext:
    "Acest capitol vine imediat după secțiunea despre preoție și înainte de moartea Mariei și a lui Aaron în capitolul următor, pregătind literalmente poporul pentru multele morți care vor urma în timpul rătăcirii de patruzeci de ani — fără această lege, contactul repetat cu moartea ar fi spurcat continuu tabăra și Cortul din mijlocul ei.",
  historicalContext:
    "Această lege este numită de răbini un „chok” — o poruncă fără explicație rațională evidentă — și era ultima jertfă de vacă roșie despre care există tradiții, folosită până la distrugerea celui de-al doilea Templu. Evrei 9:13-14 folosește această imagine pentru a explica superioritatea curățirii aduse prin sângele lui Hristos.",
  units: [
    {
      id: "numeri-19-1-2",
      ref: "Numeri 19:1-2",
      heading: "Porunca vacii roșii fără cusur",
      text: numeriPassage(19, 1, 2),
      teaching: teaching(
        "DOMNUL vorbește atât lui Moise, cât și lui Aaron, semn că această lege privește atât întregul popor, cât și slujba preoțească. Vaca cerută este roșie, „fără cusur”, „fără defect” și niciodată înjugată — o cerință de puritate absolută, dincolo de standardul obișnuit al animalelor pentru jertfă.",
        "Culoarea roșie este remarcabilă: nu era culoarea așteptată pentru o jertfă de curățire, dar în același timp evocă direct sângele, elementul central al oricărei ispășiri în legământul Sinaitic.",
      ),
      words: [],
      crossRefs: ["Evrei 9:13"],
      forYourHeart:
        "Puritatea cerută pentru lucrurile rânduite de Dumnezeu întrece adesea așteptările firești; El caută desăvârșire, nu doar performanță obișnuită.",
    },
    {
      id: "numeri-19-3-6",
      ref: "Numeri 19:3-6",
      heading: "Junghierea și arderea, în afara taberei",
      text: numeriPassage(19, 3, 6),
      teaching: teaching(
        "Spre deosebire de majoritatea jertfelor aduse la altarul din fața Cortului, vaca roșie este scoasă „afară din tabără” pentru înjunghiere și ardere. Preotul stropea totuși cu sângele ei spre Cort, de șapte ori, păstrând o legătură directă cu locul sfânt.",
        "Vaca este arsă în întregime — piele, carne, sânge și baligă — iar lemn de cedru, isop și stacojiu sunt aruncate în același foc, exact elementele folosite la curățirea leprosului în Levitic 14. Aceste ingrediente comune leagă această curățire de cea a bolii celei mai grave cunoscute de Israel.",
      ),
      words: [],
      crossRefs: ["Levitic 14:4-7", "Evrei 13:11-13"],
      forYourHeart:
        "Uneori lucrarea cea mai importantă de curățire se întâmplă „în afara taberei”, departe de privirea generală, dar tot atât de necesară pentru sfințenia întregului popor.",
    },
    {
      id: "numeri-19-7-10",
      ref: "Numeri 19:7-10",
      heading: "Cei implicați devin necurați până seara",
      text: numeriPassage(19, 7, 10),
      teaching: teaching(
        "Paradoxal, atât preotul care conducea ritualul, cât și cel care a ars vaca, devin ei își necurați până seara și trebuie să-și spele hainele și trupurile. Chiar producătorul unui mijloc de curățire este atins de necurăția pe care o tratează — nimeni nu iese neatins din contactul cu moartea.",
        "Cenușa rezultată este „păstrată pentru adunarea fiilor lui Israel ca apă de curățire” — o singură vacă aducea provizii pentru multă vreme, pentru întregul popor, un simbol al ispășirii ample care ajunge pentru mulți din puțin.",
      ),
      words: [],
      crossRefs: ["Evrei 9:13-14"],
      forYourHeart:
        "Chiar lucrarea de a aduce curățirea altora poate lăsa urme asupra celui care o înfăptuiește; slujirea altora în lucrurile sfinte are propriul ei preț.",
    },
    {
      id: "numeri-19-11-13",
      ref: "Numeri 19:11-13",
      heading: "Necurăția contactului cu moartea",
      text: numeriPassage(19, 11, 13),
      teaching: teaching(
        "Legea afirmă clar: „cel ce se va atinge de vreun trup mort de om va fi necurat șapte zile”. Moartea, chiar involuntară sau necesară (îngrijirea unui părinte muribund, de exemplu), aduce o necurăție ceremonială reală, nu o simplă convenție socială.",
        "Consecința nerespectării curățirii este severă: „omul acela va fi nimicit din Israel”, pentru că spurcă Cortul DOMNULUI cu prezența lui necurată. Refuzul de a te curăți după contactul cu moartea nu era o alegere personală neutră, ci o amenințare directă la sfințenia locului unde locuia DOMNUL în mijlocul poporului.",
      ),
      words: [],
      crossRefs: ["Levitic 21:1-3", "Agheu 2:13"],
      forYourHeart:
        "Moartea lasă urme reale asupra celor din jurul ei; a căuta curățirea rânduită de Dumnezeu după contactul cu ea nu este formalism, ci recunoașterea sfințeniei Lui.",
    },
    {
      id: "numeri-19-14-16",
      ref: "Numeri 19:14-16",
      heading: "Legea corturilor, vaselor și câmpului",
      text: numeriPassage(19, 14, 16),
      teaching: teaching(
        "Necurăția se extinde dincolo de cel care atinge direct trupul: „oricine intră în cort și tot ce este în cort va fi necurat șapte zile”. Un vas deschis, fără capac legat, devine și el necurat — aratând cât de larg se răspândește influența morții într-un spațiu închis.",
        "Chiar întâlnirea întâmplătoare cu un os de om sau un mormânt pe câmp aduce aceeași necurăție de șapte zile. Legea nu făcea deosebire între contactul căutat și cel neintenționat — toate cereau aceeași curățire.",
      ),
      words: [],
      crossRefs: ["Matei 23:27"],
      forYourHeart:
        "Uneori suntem atinși de consecințele morții sau ale păcatului fără să fi căutat contactul; Dumnezeu oferă totuși o cale de curățire, chiar și pentru cel atins fără voia lui.",
    },
    {
      id: "numeri-19-17-19",
      ref: "Numeri 19:17-19",
      heading: "Stropirea cu apă de curățire, prin isop, în ziua a treia și a șaptea",
      text: numeriPassage(19, 17, 19),
      teaching: teaching(
        "Ritualul de curățire cerea cenușa amestecată cu „apă curgătoare” — apă vie, proaspătă, nu stagnantă — și aplicată cu isop de către un om curat asupra cortului, uneltelor și persoanelor atinse de moarte.",
        "Curățirea nu se întâmpla instantaneu, ci printr-un proces de două stropiri, în ziua a treia și în ziua a șaptea, urmate de spălarea hainelor și îmbăierea. Doar „seara” din ziua a șaptea devenea persoana pe deplin curată, un proces care cerea răbdare și ascultare, nu o soluție rapidă.",
      ),
      words: [
        {
          original: "אֵזוֹב",
          transliteration: "ezov",
          language: "ebraica",
          meaning:
            "isop. Aceeași plantă folosită la stropirea ușilor cu sângele mielului la Paște (Exod 12:22) și la curățirea leprosului (Levitic 14:4), un instrument modest folosit în cele mai importante ritualuri de curățire ale legământului.",
        },
      ],
      crossRefs: ["Exod 12:22", "Psalmul 51:7"],
      forYourHeart:
        "Curățirea deplină cere adesea un proces rânduit în timp, nu o soluție instantanee; răbdarea în ascultare face parte din însăși lucrarea de curățire.",
    },
    {
      id: "numeri-19-20-22",
      ref: "Numeri 19:20-22",
      heading: "O orânduială veșnică pentru curățire",
      text: numeriPassage(19, 20, 22),
      teaching: teaching(
        "Legea repetă sever pedeapsa pentru cel care refuză curățirea: „sufletul aceluia va fi nimicit din mijlocul adunării, pentru că a spurcat Sfântul Lăcaș al DOMNULUI”. Aceeași severitate din începutul capitolului încheie legea, subliniind că nu era o opțiune, ci o cerință legământală.",
        "Interesant, chiar cel ce stropea apa de curățire devenea necurat până seara — un ultim ecou al paradoxului văzut deja: instrumentul curățirii altora poartă el însuși o urmă de necurăție, aratĂnd că doar DOMNUL Însăși este izvorul curat al oricărei purificări.",
      ),
      words: [],
      crossRefs: ["Evrei 9:13-14", "1 Ioan 1:7"],
      forYourHeart:
        "Nicio persoană sau ritual omenesc nu este izvorul curăției absolute; toate arătau spre nevoia unei curățiri mai mari, aduse într-o singură dată pentru totdeauna prin Hristos.",
    },
  ],
  prayer:
    "Doamne, mulțumesc-Ți că ai rânduit întotdeauna o cale de curățire pentru poporul Tău, chiar și pentru cea mai grea necurăție a morții.\n\nÎnvață-mă să caut curățirea Ta cu răbdare și ascultare, fără să caut soluții rapide sau formale.\n\nMulțumescu-Ți că sângele lui Hristos curăță conștiința mea de faptele moarte, mai mult decât putea cenușa vacii roșii să curețe trupul.\n\nȘi păzește-mă de a spurca cu nepăsare lucrurile sfinte pe care Tu le-ai rânduit. Amin.",
  status: NUMERI_STATUSES[19],
})
