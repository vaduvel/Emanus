import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_12 = deuteronomChapter({
  number: 12,
  title: "Deuteronom 12 — Un singur loc ales, nu locul care-ți place ție",
  summary:
    "Începe codul legilor propriu-zise cu porunca de a nimici toate locurile de Închinare canaanite și de a aduce jertfele numai în locul pe care DOMNUL însuși Îl va alege. Israel poate mânca liber carne acasă, dar cu excepția sângelui, iar zeciuielile și jertfele trebuie duse la locul central. Capitolul se încheie cu avertismentul Împotriva cercetării felului În care neamurile se Închinau zeilor lor.",
  literaryContext:
    "Acesta este primul capitol al codului legilor (12-26), care aplică în detaliu principiile deja predicate În capitolele exhortative. Tema centralizării cultului Într-un singur loc ales de Dumnezeu va reveni constant în tot codul, ca principiu de unitate a închinării lui Israel.",
  historicalContext:
    "Canaaniții Închinau la zeitățile lor pe „dealuri înalte”, sub copaci verzi, cu stâlpi de piatră și idoli de lemn. Israel este chemat să nimicească total aceste locuri și să nu-și Închipuiască un cult descentralizat, după modelul religiilor din jur, ci să se adune Într-un singur loc pe care DOMNUL însuși Îl va alege, mai târziu identificat cu Ierusalimul.",
  units: [
    {
      id: "deuteronom-12-1-4",
      ref: "Deuteronom 12:1-4",
      heading: "Nimiciți toate locurile lor de Închinare",
      text: deuteronomPassage(12, 1, 4),
      teaching: teaching(
        "Porunca este totală și fără excepție: „să nimiciți toate locurile În care slujeau neamurile pe dumnezeii lor, pe munții înălți, pe dealuri și sub orice copac verde”, și să sfărâme altarele, stâlpii de piatră, idolii de lemn și chipurile cioplite.",
        "Contrastul este făcut expres imediat: „să nu faceți așa față de DOMNUL, Dumnezeul vostru”. Nimicirea locurilor idolatre nu înseamnă că se creează multe locuri noi pentru DOMNUL În locul lor; Închinarea adevărată este de un fel diferit și de o unitate diferită.",
      ),
      words: [
        {
          original: "֪ח֪ כל-עץ רענן",
          transliteration: "tachat kol-etz ra'anan",
          language: "ebraica",
          meaning:
            "sub orice copac verde. Expresie folosită frecvent În Vechiul Legământ pentru locurile de Închinare idolatră, condamnate constant de proroci.",
        },
      ],
      crossRefs: ["Exod 34:13", "2 Împarați 17:10-11", "Ieremia 3:6"],
      forYourHeart:
        "Închinarea adevărată nu se înmulțește În multe locuri fără rost; ea are o unitate stabilită de Dumnezeu însuși.",
    },
    {
      id: "deuteronom-12-5-12",
      ref: "Deuteronom 12:5-12",
      heading: "Locul pe care Îl va ale DOMNUL pentru Numele Său",
      text: deuteronomPassage(12, 5, 12),
      teaching: teaching(
        "Împotriva multiplicării de locuri idolatre, DOMNUL alege un singur loc: „să căutați locul pe care Îl va alege DOMNUL, Dumnezeul vostru... ca să-și pună Numele Lui acolo”. Acest loc, neidentificat încă În text, va fi mai târziu Ierusalimul.",
        "Acolo, și numai acolo, trebuie duse jertfele de tot felul, zeciuielile, darurile de mână, juruințele și primele-născute ale turmelor. Contrastul cu practica din pustie — „n-ați ajuns încă la odihna și moștenirea pe care v-o dă DOMNUL” — arată că acest sistem devine posibil abia când poporul se așează stabil În țară.",
      ),
      words: [
        {
          original: "לשכן שמו שם",
          transliteration: "leshaken shmo sham",
          language: "ebraica",
          meaning:
            "ca să-și așeze Numele Său acolo. Formula teologică pentru locul central de Închinare, folosită mai târziu direct pentru Templul lui Solomon.",
        },
      ],
      crossRefs: ["1 Împarați 8:29", "2 Cronici 7:12", "Psalmul 132:13-14"],
      forYourHeart:
        "Adorarea ta nu este răspunderea ta singură; ea trebuie să se adune Într-un loc și o comunitate stabilită de Dumnezeu.",
    },
    {
      id: "deuteronom-12-13-19",
      ref: "Deuteronom 12:13-19",
      heading: "Carne acasă, dar niciodată sângele",
      text: deuteronomPassage(12, 13, 19),
      teaching: teaching(
        "Jertfele trebuie aduse doar la locul ales, dar viața de zi cu zi În restul țării nu este oprită: „poți tăia și mânca carne În toate cetățile tale, oricât vei pofti”. Distincția este clară: jertfa cultă se aduce la locul ales, hrana obișnuită se poate lua acasă.",
        "Interzicerea sângelui, deja stabilită din Leviticul 17:10-14, se repetă direct: „numai să nu mânci sângele; să-l torni pe pământ ca apa”. Sângele reprezintă viața Însăși și rămâne sfințit doar pentru DOMNUL.",
        "Grija pentru Levit este specială: „să te păzești să nu lași pe levitul tău toată vremea cât vei fi În țara ta”. Cel care nu are moștenire de pământ trebuie susținut activ de restul poporului.",
      ),
      words: [
        {
          original: "אך הדם לא ֪אכל",
          transliteration: "akh ha-dam lo tokhal",
          language: "ebraica",
          meaning:
            "numai sângele să nu-l mânci. Interzicere repetată constant în Pentateuh, legată de sfințenia vieții pe care sângele o reprezintă.",
        },
      ],
      crossRefs: ["Leviticul 17:10-14", "Geneza 9:4", "Fapte 15:20"],
      forYourHeart:
        "Grija pentru cei fără moștenire proprie În mijlocul tău nu este opțională; este parte a legământului.",
    },
    {
      id: "deuteronom-12-20-28",
      ref: "Deuteronom 12:20-28",
      heading: "Când țara se va întinde",
      text: deuteronomPassage(12, 20, 28),
      teaching: teaching(
        "Legea pregătește dinainte pentru creșterea teritoriului: „când DOMNUL înși va întinde ținuturile, cum ți-a făgăduit”, și repetă aceeași îngăduință pentru carnea obișnuită, cu aceeași interzicere a sângelui.",
        "Ascultarea de toate poruncile este legată direct de binele copiilor: „păzește și ascultă toate aceste lucruri... ca să-ți fie bine, ție și copiilor tăi, pe urma ta, pe vecie, dacă vei face ce este bine și plăcut înaintea DOMNULUI”.",
      ),
      words: [
        {
          original: "כי-ירחיב יהוה א֪-גבלך",
          transliteration: "ki-yarchiv YHWH et-gvulekha",
          language: "ebraica",
          meaning:
            "când DOMNUL înși va întinde granițele. Făgăduință de creștere teritorială pentru care legea pregătește din timp reguli practice.",
        },
      ],
      crossRefs: ["Deuteronom 19:8", "1 Împarați 4:20-21", "Efeseni 3:20"],
      forYourHeart:
        "Dumnezeu pregătește dinainte reguli pentru creșterea pe care o va da; încrederea ta în El se întârzie să pregătească pentru belșug înainte de a-l vedea.",
    },
    {
      id: "deuteronom-12-29-32",
      ref: "Deuteronom 12:29-32",
      heading: "Nu Încerca să afli cum se Închinau ei",
      text: deuteronomPassage(12, 29, 32),
      teaching: teaching(
        "Avertismentul final al capitolului oprește chiar curiozitatea religioasă: „să nu cauți să afli cum slujeau neamurile acestea dumnezeilor lor, ca să faci și tu la fel”. Nu doar practica idolatră este oprită, ci și studiul curios care ar putea duce spre imitare.",
        "Capitolul se Încheie cu porunca de nedepășire care va deveni un refren al cărții: „să nu adaugi nimic la ea și să nu scoateți nimic din ea”, aceeași formulă de la Deuteronom 4:2. Legea DOMNULUI este completă și suficientă, fără nevoia de completare din practicile păgâne.",
      ),
      words: [
        {
          original: "איכה יעבדו הגוים",
          transliteration: "eikha ya'avdu ha-goyim",
          language: "ebraica",
          meaning:
            "cum slujeau neamurile. Interdicția acoperă chiar curiozitatea de a cerceta practicile idolatre din dorință de a le imita.",
        },
      ],
      crossRefs: ["Deuteronom 4:2", "Deuteronom 18:9", "Apocalipsa 22:18-19"],
      forYourHeart:
        "Nu orice curiozitate este nevinovată; unele căutări religioase te pregătesc, fără să-ți dai seama, spre imitare.",
    },
  ],
  prayer:
    "Doamne, învață-ne să nimicim din viața noastră toate locurile ascunse de închinăciune falsă.\n\nAdună-ne Într-un singur loc de închinare adevărată, nu În multe cărări alese de noi.\n\nÎnvață-ne sfințenia vieții, pe care sângele o reprezintă, și grija pentru cei fără moștenire.\n\nȘi păzește-ne de curiozitatea care ne-ar duce spre imitarea practicilor care nu-ți sunt plăcute. Amin.",
  status: DEUTERONOM_STATUSES[12],
})
