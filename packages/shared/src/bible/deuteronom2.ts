import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_2 = deuteronomChapter({
  number: 2,
  title: "Deuteronom 2 — Drumuri pe care Dumnezeu nu ngăduie războiul",
  summary:
    "Moise îontinuă recapitularea drumului: cei treizeci și opt de ani de învârtire în jurul muntelui Seir, până ce toată generația care se răzvrătise a murit. Israel trece pe lângă Edom, Moab și Amon fără să se lupte cu ei, fiindcă DOMNUL nu le-a dat aceste țări, apoi înfrânge cu putere pe Sihon, împăratul amoriților de la Hesbon.",
  literaryContext:
    "Capitolul acesta arată o latură rar amintită a călăuzirii lui Dumnezeu: nu doar cucerire, ci răbdare față de vecini pe care DOMNUL i-a așezat deja în pământurile lor. Israel nu este chemat să lupte oriunde întâlnește un vrăjmaș posibil, ci doar unde și când DOMNUL a hotărât dăruirea unei țări.",
  historicalContext:
    "Edom (urmașii lui Esau), Moab (urmașii lui Lot) și Amon sunt neamuri înrudite cu Israel prin strămoșii comuni Avraam și Lot. Sihon, împăratul amoriților din Hesbon, este dimpotrivă un stăpânitor pe care DOMNUL îl dă spre nimicire, ca primă biruință la răsărit de Iordan.",
  units: [
    {
      id: "deuteronom-2-1-8",
      ref: "Deuteronom 2:1-8",
      heading: "Pe lângă frații lui Esau, fără război",
      text: deuteronomPassage(2, 1, 8),
      teaching: teaching(
        "DOMNUL dă o poruncă rară în această carte a cuceririi: „n-aveați nicio pornire cu ei, căci nu vă voi da nimic din țara lor”, referitor la urmașii lui Esau din muntele Seir. Nu orice țară străină este dată lui Israel; unele au fost date deja altor neamuri, prin aceeași mână a lui Dumnezeu care le-a dat părinților lor.",
        "Israel trebuie să plătească pentru hrană și apă la trecerea prin țară, nu să ia cu sila. Un popor purtat de DOMNUL patruzeci de ani în pustie, fără să-i lipsească nimic („DOMNUL, Dumnezeul tău, te-a binecuvântat în tot lucrul mâinilor tale”), nu are nevoie să fure de la rude îndepărtate.",
      ),
      words: [
        {
          original: "אל-ת֪תגרו בם",
          transliteration: "al-titgaru vam",
          language: "ebraica",
          meaning:
            "nu porniți conflict/luptă cu ei. Porunca oprește expres agresiunea împotriva urmașilor lui Esau, chiar dacă Israel are forța militară să o facă.",
        },
      ],
      crossRefs: ["Geneza 36:8", "Numeri 20:14-21", "Deuteronom 23:7"],
      forYourHeart:
        "Nu orice teritoriu pe care îl poți cuceri ți-a fost dat de Dumnezeu. Învață să recunoști ce nu este chemarea ta.",
    },
    {
      id: "deuteronom-2-9-15",
      ref: "Deuteronom 2:9-15",
      heading: "Moab, și moartea unei generații întârziate",
      text: deuteronomPassage(2, 9, 15),
      teaching: teaching(
        "Aceeași poruncă se repetă pentru Moab: „n-o vrăjmăși și nu te lupta cu Moab”, căci țara Ar a fost dată fiilor lui Lot. Textul face aici o paranteză istorică: emiții, un neam vechi „mare, mult și înalt ca anachimii”, au locuit în acest ținut înaintea moabiților — amintind că granițele popoarelor s-au schimbat de multe ori sub cârmuirea lui Dumnezeu.",
        "Apoi vine un verset care încununează tot capitolul precedent: „Toți bărbații de război au murit în pustie, precum le jurase DOMNUL”. Cei treizeci și opt de ani de la Cades-Barnea încoace nu au fost o rătăcire fără sens, ci timpul necesar ca DOMNUL Să-și împlinească jurământul de judecată asupra unei generații întregi.",
      ),
      words: [
        {
          original: "אמים",
          transliteration: "Emim",
          language: "ebraica",
          meaning:
            "emiții, neam vechi din Moab, „teroare” ca sens de rădăcină; amintirea lor arată că popoarele mari și puternice nu rămân stăpâne pentru totdeauna.",
        },
      ],
      crossRefs: ["Geneza 19:36-37", "Numeri 14:26-35", "Geneza 14:5"],
      forYourHeart:
        "Anii de întârziere pe care i-ai socotit pierduți pot fi chiar timpul în care Dumnezeu împlinește o judecată sau o pregătire pe care nu o vezi.",
    },
    {
      id: "deuteronom-2-16-23",
      ref: "Deuteronom 2:16-23",
      heading: "Amon, și o istorie a strămutărilor îngăduite de DOMNUL",
      text: deuteronomPassage(2, 16, 23),
      teaching: teaching(
        "Aceeași rânduială se repetă și pentru Amon: „n-o asupri și nu te lupta cu ei”, fiindcă țara le-a fost dată fiilor lui Lot, care i-au biruit anterior pe zamzumiți. Repetarea de trei ori a acestei porunci — pentru Edom, Moab și Amon — întărește că aceasta nu este o excepție, ci un tipar al călăuzirii lui Dumnezeu.",
        "Textul adaugă o observație ce arată privirea largă a lui Dumnezeu peste toate neamurile: aviții au fost nimiciți de caftoriți, care au venit din Caftor. DOMNUL nu strămuta doar pe Israel; El conduce mutările și biruințele multor popoare, chiar și când nu este numit expres.",
      ),
      words: [
        {
          original: "עמונים",
          transliteration: "Zamzumim",
          language: "ebraica",
          meaning:
            "neamul nimicit de amoniți înaintea așezării lor în țară; nume vechi, folosit doar aici, semn al unor istorii pierdute pentru noi, dar cunoscute de DOMNUL.",
        },
      ],
      crossRefs: ["Geneza 19:38", "Amos 1:13"],
      forYourHeart:
        "Dumnezeu conduce istoria multor popoare pe care nu-i vezi menționați în povestea ta. Suveranitatea Lui trece dincolo de ceea ce ți se spune direct.",
    },
    {
      id: "deuteronom-2-24-37",
      ref: "Deuteronom 2:24-37",
      heading: "Sihon, împăratul încăpățânat, și cea dintâi biruință",
      text: deuteronomPassage(2, 24, 37),
      teaching: teaching(
        "Pentru prima dată în carte, porunca se schimbă: „scoală-te, treci pârâul Arnon; iată, dau în mâna ta pe Sihon”. Deosebirea dintre Edom, Moab, Amon și Sihon nu este vinovăția morală a acestuia din urmă față de ceilalți, ci alegerea suverană a lui Dumnezeu asupra cărei țări o dă lui Israel.",
        "Moise trimite un mesaj de pace către Sihon — cerere doar de trecere, cu plătirea celor luate — dar „DOMNUL, Dumnezeul tău, i-a învârtoșat duhul”, ca să-l dea în mâna lui Israel. Refuzul lui Sihon nu anulează planul lui Dumnezeu; textul arată că însuși încăpățânarea lui slujea unui scop pe care nu îl cunoaștea.",
        "Bătălia se încheie cu nimicire deplină: „n-am lăsat pe nimeni cu viață”, cetățile, femeile și copiii inclusiv. Textul nu ascunde asprimea acestor războaie de cucerire; le atribuie fără rezervă poruncii DOMNULUI și le prezintă ca judecată asupra unui împărat care a refuzat pacea oferită.",
      ),
      words: [
        {
          original: "הקשה את-רוחו",
          transliteration: "hiqsha et-rucho",
          language: "ebraica",
          meaning:
            "i-a întărit/învârtoșat duhul. Aceeași expresie folosită pentru întărirea inimii lui Faraon în Exod; încăpățânarea umană poate fi parte a unui plan mai mare al lui Dumnezeu.",
        },
      ],
      crossRefs: ["Exod 4:21", "Numeri 21:21-31", "Deuteronom 29:7"],
      forYourHeart:
        "Când cineva refuză pacea pe care i-o oferi, nu înseamnă că Dumnezeu a pierdut controlul; poate fi chiar felul în care El împlinește un plan mai mare.",
    },
  ],
  prayer:
    "Doamne, învață-ne să recunoaștem ce ne-ai dat și ce nu este chemarea noastră.\n\nDă-ne răbdare cu frații alături de care nu suntem chemați să luptăm.\n\nAmintește-ne că anii pe care îi socotim pierduți pot fi chiar timpul lucrării Tale ascunse.\n\nȘi întărește-ne încrederea că Tu conduci și încăpățânarea celor care ni se împotrivesc. Amin.",
  status: DEUTERONOM_STATUSES[2],
})
