import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicata pe unitati de sens.
 */

export const DEUTERONOM_34 = deuteronomChapter({
  number: 34,
  title: "Deuteronom 34 - Moartea lui Moise pe muntele Nebo, un proroc fara asemanare",
  summary:
    "Moise vede tara promisa de pe muntele Nebo, moare acolo fara sa treaca Iordanul, este jelit treizeci de zile, iar cartea se incheie cu o evaluare finala unica: in Israel nu s-a mai ridicat un proroc ca el, pe care DOMNUL sa-l fi cunoscut fata in fata.",
  literaryContext:
    "Acest capitol final, scris probabil de o alta mana dupa moartea lui Moise, incheie nu doar Deuteronomul, ci intregul Pentateuh, facand trecerea de la conducerea lui Moise la cea a lui Iosua si pregatind cartea Iosua pentru cucerirea tarii promise.",
  historicalContext:
    "Necunoasterea locului mormantului lui Moise (v.6) a fost inteleasa traditional ca o masura providentiala impotriva transformarii locului in obiect de cult sau pelerinaj, pastrand centrul atentiei pe DOMNUL, nu pe conducatorul care L-a slujit.",
  units: [
    {
      id: "deuteronom-34-1-4",
      ref: "Deuteronom 34:1-4",
      heading: "Moise vede toata tara de pe muntele Nebo",
      text: deuteronomPassage(34, 1, 4),
      teaching: teaching(
        "DOMNUL insusi ii arata lui Moise „toata tara: Galaadul pana la Dan... toata tara lui Iuda pana la Marea de Apus” - o panorama completa a promisiunii facute lui Avraam, Isaac si Iacov, vazuta cu proprii ochi chiar de cel care nu va intra in ea.",
        "Cuvintele DOMNULUI sunt directe si fara ambiguitate: „Ti-am aratat-o cu ochii tai, dar nu vei trece in ea.” Consecinta pacatului de la Meriba ramane in vigoare, dar este imblanzita de darul vederii depline a implinirii promisiunii, chiar fara a o experimenta personal.",
      ),
      words: [
        {
          original: "הראיתיך בעיניך ושמה לא תעבר",
          transliteration: "herithika be'einekha veshamah lo ta'avor",
          language: "ebraica",
          meaning:
            "ti-am aratat-o cu ochii tai, dar acolo nu vei trece. Formula finala si directa care confirma limita ramasa asupra lui Moise, imblanzita de privilegiul de a vedea implinirea promisiunii inainte de moarte.",
        },
      ],
      crossRefs: ["Numeri 27:12-14", "Evrei 11:13", "Geneza 15:18-21"],
      forYourHeart:
        "Poti sa vezi si sa te bucuri de implinirea unei promisiuni a lui Dumnezeu, chiar daca nu ti se da sa o experimentezi personal in intregime.",
    },
    {
      id: "deuteronom-34-5-8",
      ref: "Deuteronom 34:5-8",
      heading: "Moartea lui Moise, mormantul necunoscut, jelirea poporului",
      text: deuteronomPassage(34, 5, 8),
      teaching: teaching(
        "Moise este numit la finalul vietii sale „slujitorul DOMNULUI” - titlul cel mai inalt posibil, care rezuma intreaga sa activitate. Moartea sa vine „dupa cuvantul DOMNULUI”, nu ca un accident, ci ca implinire a unei hotarari cunoscute dinainte.",
        "Detaliul remarcabil este pastrarea tainei mormantului: „nimeni nu-i cunoaste mormantul pana in ziua de astazi”. In ciuda acestui fapt, poporul il jeleste deplin - „treizeci de zile” - aratand cinstea reala pentru conducatorul lor, fara a avea nevoie de un loc de pelerinaj pentru a o exprima.",
      ),
      words: [
        {
          original: "ולא-ידע איש את-קברתו",
          transliteration: "velo yada ish et-qevurato",
          language: "ebraica",
          meaning:
            "si nimeni nu-i cunoaste mormantul. Detaliu remarcabil care a prevenit crearea unui cult al locului, indreptand cinstirea poporului spre DOMNUL care l-a folosit pe Moise, nu spre ramasitele lui.",
        },
      ],
      crossRefs: ["Iuda 1:9", "Numeri 20:29", "2 Regi 13:20-21"],
      forYourHeart:
        "Cinstea adevarata pentru cei care ne-au slujit bine nu are nevoie de un loc fizic de pelerinaj; ea se arata prin recunostinta si ascultare fata de mostenirea lor.",
    },
    {
      id: "deuteronom-34-9-12",
      ref: "Deuteronom 34:9-12",
      heading: "Iosua plin de duh, evaluarea finala unica a lui Moise",
      text: deuteronomPassage(34, 9, 12),
      teaching: teaching(
        "Iosua este descris ca fiind „plin de duhul intelepciunii, caci Moise isi pusese mainile peste el” - transmiterea autoritatii nu este lasata la intamplare, ci este confirmata printr-un act deliberat de investire, iar poporul raspunde cu ascultare.",
        "Cartea se incheie cu o evaluare finala fara egal: „in Israel nu s-a mai ridicat un proroc ca Moise, pe care DOMNUL sa-l fi cunoscut fata in fata”. Aceasta afirmatie, scrisa probabil mult mai tarziu, lasa deschisa asteptarea canonica a unui proroc viitor asemenea lui Moise, dar mai mare - asteptare pe care Noul Testament o va identifica cu Hristos.",
      ),
      words: [
        {
          original: "לא-קם נביא עוד בישראל כמשה",
          transliteration: "lo-qam navi od beYisrael keMoshe",
          language: "ebraica",
          meaning:
            "nu s-a mai ridicat un proroc in Israel ca Moise. Evaluarea finala care pastreaza unicitatea relatiei fata in fata a lui Moise cu DOMNUL, lasand deschisa o asteptare canonica implinita mai tarziu in mod suprem in Hristos.",
        },
      ],
      crossRefs: ["Deuteronom 18:15-18", "Faptele Apostolilor 3:22-23", "Ioan 1:17-18"],
      forYourHeart:
        "Mostenirea unui slujitor credincios continua prin cei pregatiti sa-i urmeze, dar cea mai mare asteptare a poporului lui Dumnezeu ramane implinita deplin doar in Hristos.",
    },
  ],
  prayer:
    "Doamne, multumim pentru viata lui Moise, slujitorul Tau credincios pana la ultima suflare.\n\nAjuta-ne sa ne bucuram de implinirea promisiunilor Tale, chiar si atunci cand nu le vedem deplin cu ochii nostri.\n\nDa-ne intelepciune sa primim si sa sustinem pe cei pe care ii pregatesti sa continue lucrarea inceputa de altii inaintea noastra.\n\nSi multumim ca asteptarea unui Proroc mai mare ca Moise este implinita deplin in Hristos, Cuvantul Tau intrupat. Amin.",
  status: DEUTERONOM_STATUSES[34],
})
