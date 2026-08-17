import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_7 = deuteronomChapter({
  number: 7,
  title: "Deuteronom 7 — Nu pentru că sunteți mai mulți, ci pentru că v-a iubit",
  summary:
    "Moise poruncește nimicirea deplină a celor șapte neamuri din Canaan, fără legăminte, fără căsătorii și fără milă pentru idolii lor. Motivul alegerii lui Israel nu este mărimea sau vrednicia poporului, ci iubirea și credincioșia lui Dumnezeu față de legământul cu părinții. Capitolul se încheie cu Încredințarea că DOMNUL va scoate treptat pe vrăjmași, ca să nu-i Împresoare fiarele sălbatice.",
  literaryContext:
    "Acest capitol dezvoltă tema aleasă de la Deuteronom 4: separarea absolută de idolatrie, aplicată aici concret la neamurile din țara făgăduită. Alegerea gratuită a lui Israel, fără vreun merit al lor, este una din marile teme teologice ale cărții.",
  historicalContext:
    "Cele șapte neamuri numite — hitit, ghirgașit, amorit, canaanit, ferezit, hivit și iebusit — locuiau țara pe care Israel avea să o cucerească. Practicile lor religioase includeau prostituție rituală și, potrivit altor texte biblice, jertfe de copii — fapt care explică severitatea poruncii de nimicire deplină.",
  units: [
    {
      id: "deuteronom-7-1-6",
      ref: "Deuteronom 7:1-6",
      heading: "Fără legăminte, fără căsătorii, un popor sfânt",
      text: deuteronomPassage(7, 1, 6),
      teaching: teaching(
        "Porunca este radicală: „să le nimicești cu desăvârșire; să nu faci nicio învoială cu ele și să nu ai milă de ele”. Această asprime nu este cruzime fără rost, ci un zid de apărare Împotriva unei religii care ar fi corupt total legământul lui Israel cu Dumnezeu.",
        "Interzicerea căsătoriilor mixte are un motiv teologic clar: „căci ar abate pe fiii tăi de la Mine și i-ar face să slujească altor dumnezei”. Nu este xenofobie; este protecția unei loialități exclusive, într-un context în care căsătoria însemna și împărțea religiei.",
        "Temeiul deplin este numit direct: „tu ești un popor sfânt pentru DOMNUL, Dumnezeul tău; DOMNUL, Dumnezeul tău, te-a ales... ca să fii un popor al Lui deosebit”. Sfințenia lui Israel nu vine din merit, ci din alegerea suverană a lui Dumnezeu.",
      ),
      words: [
        {
          original: "החרם ֪חרים א֪ם",
          transliteration: "hacharem tacharim otam",
          language: "ebraica",
          meaning:
            "să le nimicești cu desăvârșire. Rădăcina „cherem” descrie o nimicire rituală totală, consacrată lui Dumnezeu ca judecată.",
        },
      ],
      crossRefs: ["Exod 34:12-16", "Deuteronom 12:29-31", "1 Împarați 11:1-4"],
      forYourHeart:
        "Sfințenia ta nu vine din vrednicia proprie; este darul alegerii lui Dumnezeu, care te-a scos deosebit pentru El.",
    },
    {
      id: "deuteronom-7-7-11",
      ref: "Deuteronom 7:7-11",
      heading: "Nu pentru că erau mai mulți, ci pentru că i-a iubit",
      text: deuteronomPassage(7, 7, 11),
      teaching: teaching(
        "Motivul alegerii lui Israel este spus fără nicio urmă de măgulire: „DOMNUL nu v-a ales și nu v-a iubit pentru că ați fi mai la număr decât toate celelalte popoare, căci erați cel mai mic dintre toate popoarele”. Israel nu avea nimic care să-l facă vrednic de alegere.",
        "Cauza este numai în Dumnezeu însuși: „DOMNUL v-a iubit și a voit să țină jurământul pe care l-a făcut părinților voștri”. Iubirea aceasta nu are cauză exterioară; este statornică pentru că vine din caracterul și credincioșia lui Dumnezeu.",
        "Din această credincioșie decurge o răspundere: „El ține legământul... față de cei care Îl iubesc și păzesc poruncile Lui... dar răsplătește părilor săi, în față, celor ce-L urăsc”. Statornicia lui Dumnezeu în legământ nu este pasivă față de răzvrătire.",
      ),
      words: [
        {
          original: "חשק יהוה בכם",
          transliteration: "chashaq YHWH bakhem",
          language: "ebraica",
          meaning:
            "DOMNUL s-a alipit/legat de voi cu iubire. Verbul descrie o afecțiune profundă și intențională, nu una întâmplătoare sau meritată.",
        },
      ],
      crossRefs: ["Deuteronom 4:37", "Romani 9:11-16", "Efeseni 1:4-5"],
      forYourHeart:
        "Nu ești iubit de Dumnezeu pentru vrednicia ta; ești iubit pentru că așa a voit El, și această iubire este statornică.",
    },
    {
      id: "deuteronom-7-12-16",
      ref: "Deuteronom 7:12-16",
      heading: "Binecuvântarea celui care ascultă",
      text: deuteronomPassage(7, 12, 16),
      teaching: teaching(
        "Ascultarea legământului atrage o binecuvântare cuprinzătoare: rodul pântecelui, rodul ogorului, grânele, vinul, untdelemnul, turmele — „vei fi binecuvântat mai mult decât toate popoarele”. Nimic din viața fizică a poporului nu este exclus din grija legământului.",
        "Promisiunea se întinde și la sănătate: „DOMNUL va îndepărta de la tine orice boală”, și include amintirea directă a „relelor Egiptului, pe care le cunoști” — făgăduința este contrastată explicit cu suferințele robiei din care au fost scoși.",
      ),
      words: [
        {
          original: "ברוך ֪היה מכל-העמים",
          transliteration: "barukh tihye mikol-ha-amim",
          language: "ebraica",
          meaning:
            "binecuvântat vei fi mai mult decât toate popoarele. Făgăduință de belșug și favoare condiționată de ascultarea de legământ.",
        },
      ],
      crossRefs: ["Deuteronom 28:1-14", "Exod 15:26", "Psalmul 103:3"],
      forYourHeart:
        "Grija lui Dumnezeu pentru viața ta se întinde peste tot ce ai nevoie, de la hrană la sănătate, nu doar la sufletul tău.",
    },
    {
      id: "deuteronom-7-17-21",
      ref: "Deuteronom 7:17-21",
      heading: "Nu te teme; amintește-ți ce a făcut DOMNUL în Egipt",
      text: deuteronomPassage(7, 17, 21),
      teaching: teaching(
        "Moise anticipează obiecția firească: „poate vei zice în inima ta: aceste neamuri sunt mai mari decât mine; cum le voi putea izgoni?”. Frica față de o forță mai mare este înțeleasă și nu condamnată, dar nu este lăsată să aibă ultimul cuvânt.",
        "Remediul cerut este memoria activă: „amintește-ți bine ce a făcut DOMNUL, Dumnezeul tău, lui Faraon și întregului Egipt”. Biruințele trecute nu sunt doar istorie de păstrat, ci temei practic pentru încredere în fața fricii viitoare.",
      ),
      words: [
        {
          original: "זכר ֪זכר",
          transliteration: "zakhor tizkor",
          language: "ebraica",
          meaning:
            "să-ți amintești bine (repetare a verbului pentru intensitate). Aducerea aminte activă este remediul biblic pentru frica în fața unui vrăjmaș mai mare.",
        },
      ],
      crossRefs: ["Exod 14:13-14", "1 Samuel 17:36-37", "Filipeni 4:6-7"],
      forYourHeart:
        "Când frica întreabă „cum voi putea?”, răspunsul nu este puterea ta, ci amintirea a ceea ce Dumnezeu a făcut deja.",
    },
    {
      id: "deuteronom-7-22-26",
      ref: "Deuteronom 7:22-26",
      heading: "Nimicire treptată, și idoli care nu trebuie poftiți",
      text: deuteronomPassage(7, 22, 26),
      teaching: teaching(
        "DOMNUL Se angajează să nimicească neamurile „puțin câte puțin”, nu deodată, „ca să nu te înmulțească fiarele câmpului”. Câteodată mila lui Dumnezeu se arată chiar în ritmul întârziat al biruinței, nu numai în viteza ei.",
        "Capitolul se Încheie cu o poruncă practică: chipurile cioplite ale zeilor lor să fie arse în foc, iar argintul și aurul lor să nu fie poftite și luate acasă, „ca să nu cazi în cursă”. Comoara obținută dintr-un idol poartă cu ea puterea de a corupe pe cel care o râvnește.",
      ),
      words: [
        {
          original: "שקץ ֪שקצנו ו֪עב ֪֪עבנו",
          transliteration: "shaqetz tishaktzenu vetaev titaevenu",
          language: "ebraica",
          meaning:
            "să-l urgisești cu putere și să-l urâști cu putere (referire la chipul cioplit). Repetarea verbului subliniază refuzul total, fără nicio urmă de fascinație față de idol.",
        },
      ],
      crossRefs: ["Ieșire 3:22", "Iosua 6:19", "Fapte 19:19"],
      forYourHeart:
        "Comorile luate dintr-un lucru necurat pot deveni cursă pentru tine; refuză să le porți acasă.",
    },
  ],
  prayer:
    "Doamne, Tu nu ne-ai ales pentru vrednicia noastră, ci pentru iubirea și credincioșia Ta statornică.\n\nAjută-ne să ne aducem aminte de biruințele Tale când frica întreabă cum vom putea.\n\nPăzește-ne să nu poftim comori care poartă cu ele puterea de a ne corupe.\n\nȘi Învață-ne răbdarea Ta, care nimicește răul puțin câte puțin, la timpul potrivit. Amin.",
  status: DEUTERONOM_STATUSES[7],
})
