import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_30 = deuteronomChapter({
  number: 30,
  title: "Deuteronom 30 — Restaurarea promisă, cuvântul apropiat, alegerea vieții",
  summary:
    "Moise promite restaurare după pocăință, privește înainte către o tăiere împrejur a inimii făcută de DOMNUL însuși, asigură că porunca nu este depărtată sau inaccesibilă, și încheie cu apelul culminant: alege viața.",
  literaryContext:
    "Acest capitol încheie secțiunea de legământ începută în 27-29, transformând avertismentul sumbru al blestemelor într-o speranță concretă de restaurare și într-un apel personal direct, pregătind trecerea către desemnarea lui Iosua din capitolul 31.",
  historicalContext:
    "Promisiunea tăierii împrejur a inimii (v.6) anticipează tema legământului nou din Ieremia 31 și Ezechiel 36 — restaurarea nu depinde doar de efortul uman de ascultare, ci de o lucrare transformatoare pe care DOMNUL însuși o înfăptuiește în inima poporului.",
  units: [
    {
      id: "deuteronom-30-1-5",
      ref: "Deuteronom 30:1-5",
      heading: "Restaurarea promisă după întoarcere",
      text: deuteronomPassage(30, 1, 5),
      teaching: teaching(
        "Chiar în mijlocul împrăștierii printre neamuri, promisiunea rămâne: „dacă te vei întoarce la DOMNUL... și vei asculta de glasul Lui din toată inima ta”, atunci El „va avea milă de tine și te va aduna din nou”, chiar de la „marginea cerului”.",
        "Această promisiune de restaurare nu este condiționată de merit sau de o poziție privilegiată, ci pur și simplu de întoarcere sinceră — nici cea mai profundă dispersie nu este dincolo de puterea lui Dumnezeu de a aduna și restaura.",
      ),
      words: [
        {
          original: "ושב יהוה אלהיך את-שבותך",
          transliteration: "veshav YHWH Elohekha et-shevutkha",
          language: "ebraica",
          meaning:
            "și DOMNUL, Dumnezeul tău, va aduce înapoi pe cei prinși ai tăi. Formula restaurării care promite inversarea exilului, condiționată doar de întoarcerea sinceră a poporului.",
        },
      ],
      crossRefs: ["Ieremia 29:14", "Neemia 1:9", "Luca 15:20"],
      forYourHeart:
        "Indiferent cât de îndepărtat te-ai simți de Dumnezeu, întoarcerea sinceră către El întâmpină mereu mila Lui.",
    },
    {
      id: "deuteronom-30-6-10",
      ref: "Deuteronom 30:6-10",
      heading: "Tăierea împrejur a inimii, făcută de DOMNUL",
      text: deuteronomPassage(30, 6, 10),
      teaching: teaching(
        "Promisiunea remarcabilă este că „DOMNUL... îți va tăia împrejur inima ta... ca să-L iubești pe DOMNUL... din toată inima ta și din tot sufletul tău, ca să trăiești”. Restaurarea nu este doar externă, ci implică o transformare internă făcută de Dumnezeu însuși.",
        "Acest verset anticipează legământul nou din profeții mai târzii — ascultarea adevărată nu vine doar din efort uman, ci din lucrarea lui Dumnezeu care schimbă dorințele inimii însăși, făcând iubirea de DOMNUL posibilă și deplină.",
      ),
      words: [
        {
          original: "ומל יהוה אלהיך את-לבבך",
          transliteration: "umal YHWH Elohekha et-levavkha",
          language: "ebraica",
          meaning:
            "și DOMNUL, Dumnezeul tău, îți va tăia împrejur inima. Metaforă pentru transformarea interioară profundă făcută de Dumnezeu, dincolo de simpla circumcizie fizică a legământului dat lui Avraam.",
        },
      ],
      crossRefs: ["Ieremia 31:33", "Romani 2:29", "Ezechiel 36:26-27"],
      forYourHeart:
        "Transformarea reală a inimii tale nu este în primul rând rezultatul propriului efort, ci lucrarea lui Dumnezeu în tine.",
    },
    {
      id: "deuteronom-30-11-14",
      ref: "Deuteronom 30:11-14",
      heading: "Cuvântul, nu în cer, nu dincolo de mare, ci în gura ta",
      text: deuteronomPassage(30, 11, 14),
      teaching: teaching(
        "Porunca lui Dumnezeu nu este „prea înaltă” sau inaccesibilă: „nu este în cer... nu este nici dincolo de mare”, ca să necesite o călătorie extraordinară sau un mediator special ca s-o obții.",
        "Concluzia surprinzătoare este intimitatea accesibilității: „cuvântul este foarte aproape de tine, în gura ta și în inima ta, ca să-l împlinești”. Voia lui Dumnezeu nu este un secret ascuns rezervat unei elite spirituale, ci este dată deschis, la îndemâna fiecărui om.",
      ),
      words: [
        {
          original: "לא-בשמים היא",
          transliteration: "lo bashamayim hi",
          language: "ebraica",
          meaning:
            "nu este în cer. Afirmația care respinge ideea că voia lui Dumnezeu ar fi inaccesibilă sau rezervată doar celor cu acces special la revelații extraordinare.",
        },
      ],
      crossRefs: ["Romani 10:6-8", "Psalmul 119:105", "Iacov 1:22-25"],
      forYourHeart:
        "Nu ai nevoie de o revelație extraordinară pentru a-L cunoaște și asculta pe Dumnezeu; Cuvântul Lui este deja la îndemâna ta.",
    },
    {
      id: "deuteronom-30-15-20",
      ref: "Deuteronom 30:15-20",
      heading: "Alege viața — apelul culminant al legământului",
      text: deuteronomPassage(30, 15, 20),
      teaching: teaching(
        "Moise pune înainte cea mai clară alegere posibilă: „viața și binele, moartea și răul”, cu cerul și pământul chemați ca martori solemni. Nu este loc pentru neutralitate — fiecare zi este o reafirmare a acestei alegeri fundamentale.",
        "Apelul final rezumă întreaga carte: „alege viața, ca să trăiești... iubindu-L pe DOMNUL, Dumnezeul tău, ascultând de glasul Lui și alipindu-te de El; căci aceasta este viața ta”. A alege viața nu este doar o decizie de supraviețuire, ci o direcție întreagă a iubirii, ascultării și lipirii de Dumnezeu.",
      ),
      words: [
        {
          original: "ובחרת בחיים",
          transliteration: "uvacharta bachayyim",
          language: "ebraica",
          meaning:
            "și să alegi viața. Imperativul final al întregii cărți — o chemare activă, personală, la o alegere care nu se face o singură dată, ci se reafirmă continuu prin iubire, ascultare și lipire de DOMNUL.",
        },
      ],
      crossRefs: ["Ieremia 21:8", "Iosua 24:15", "Matei 7:13-14"],
      forYourHeart:
        "Fiecare zi îți pune înainte aceeași alegere fundamentală — viața și binele prin lipirea de Dumnezeu, sau moartea și răul prin îndepărtare. Alege viața.",
    },
  ],
  prayer:
    "Doamne, mulțumim că mila Ta întâmpină întoarcerea sinceră, indiferent cât de depărtați ne-am rătăcit.\n\nTăiere împrejur inima noastră, ca să Te iubim din toată inima și din tot sufletul.\n\nAjută-ne să înțelegem că Cuvântul Tău nu este depărtat, ci foarte aproape de noi, în gura și în inima noastră.\n\nȘi dă-ne înțelepciune să alegem viața, în fiecare zi, prin iubire și lipire de Tine. Amin.",
  status: DEUTERONOM_STATUSES[30],
})
