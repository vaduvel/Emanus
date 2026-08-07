import { iosuaChapter, teaching } from "./iosuaHelpers.js"
import { iosuaPassage } from "./iosuaText.js"
import { IOSUA_STATUSES } from "./iosuaPublication.js"

/*
 * Cartea Iosua, explicata pe unitati de sens.
 *
 * Textul biblic: pastrat separat in iosuaText.ts (fisierele iosuaTextN.ts).
 * Explicatia: scrisa pentru Emanus dupa cercetarea textului. Nu se copiaza
 * formularea niciunui predicator sau comentator.
 */

export const IOSUA_1 = iosuaChapter({
  number: 1,
  title: "Iosua 1 — Fii tare și curajos",
  summary:
    "După moartea lui Moise, DOMNUL îi vorbește lui Iosua și îi încredințează conducerea poporului spre țara făgăduită. Porunca centrală se repetă de trei ori: fii tare și curajos. Iosua transmite mai departe poporului pregătirea de a trece Iordanul, iar rubeniții, gadiții și jumătatea seminției lui Manase își reînnoiesc ascultarea.",
  literaryContext:
    "Cartea Iosua continuă direct Deuteronomul: Moise a murit, iar cuvântul lui Dumnezeu, care fusese cuvântul rostit prin Moise, trece acum printr-un intermediar nou. Capitolul 1 este o scenă de instalare, asemenea celei din Deuteronom 31, dar de data aceasta vorbește DOMNUL Însuși direct lui Iosua, nu doar prin Moise. Structura repetitivă a poruncii „fii tare și curajos” (versetele 6, 7, 9, 18) leagă întregul capitol.",
  historicalContext:
    "Israel se află încă în câmpia Moabului, la răsărit de Iordan. Moise a murit pe muntele Nebo, iar poporul l-a plâns treizeci de zile (Deuteronom 34:8). Iosua, fiul lui Nun, care fusese ajutorul lui Moise și unul dintre cei doi iscoade credincioși de la Cades-Barnea, preia acum conducerea unei generații care nu a cunoscut robia egipteană.",
  units: [
    {
      id: "iosua-1-1-9",
      ref: "Iosua 1:1-9",
      heading: "DOMNUL îl însărcinează pe Iosua",
      text: iosuaPassage(1, 1, 9),
      teaching: teaching(
        "Cartea se deschide cu o moarte și o poruncă: „Moise, slujitorul Meu, a murit. Acum, scoală-te...”. Doliul nu oprește lucrarea lui Dumnezeu; jalea are un timp, dar chemarea la înaintare vine imediat după ea.",
        "Făgăduința teritorială este vastă: „tot locul pe care va călca talpa piciorului vostru vi-l dau”. Aceeași promisiune făcută lui Avraam se împlinește acum printr-un popor care trebuie doar să pășească, nu să inventeze o cucerire proprie.",
        "Porunca centrală, „fii tare și curajos”, nu este un apel la vitejie firească, ci este legată direct de ascultarea de Lege: „ai grijă să lucrezi întocmai după toată legea”. Curajul biblic al lui Iosua se sprijină pe Cuvântul scris, nu pe puterea armelor.",
        "Promisiunea finală, „DOMNUL, Dumnezeul tău, este cu tine oriunde vei merge”, este temelia întregii cărți. Fiecare bătălie care urmează va confirma acest adevăr rostit chiar la început.",
      ),
      words: [
        {
          original: "חֲזַק וֶאֱמָץ",
          transliteration: "hazak ve'emats",
          language: "ebraica",
          meaning:
            "fii tare și curajos. Formula repetată de patru ori în acest capitol; nu descrie o stare emoțională, ci o hotărâre a voinței de a asculta poruncile DOMNULUI.",
        },
      ],
      crossRefs: ["Deuteronom 31:6-8", "Deuteronom 34:9", "Evrei 13:5"],
      forYourHeart:
        "Curajul pe care ți-l cere Dumnezeu nu este lipsă de frică, ci hotărârea de a asculta Cuvântul Lui chiar și atunci când drumul dinainte pare uriaș.",
    },
    {
      id: "iosua-1-10-15",
      ref: "Iosua 1:10-15",
      heading: "Pregătirea poporului și reamintirea legământului cu triburile de la răsărit",
      text: iosuaPassage(1, 10, 15),
      teaching: teaching(
        "Iosua acționează imediat: le poruncește căpeteniilor să pregătească merinde, „căci peste trei zile veți trece Iordanul acesta”. Ascultarea lui Iosua față de porunca DOMNULUI se traduce instantaneu în conducere practică pentru popor.",
        "Rubeniților, gadiților și jumătății seminției lui Manase li se amintește promisiunea făcută lui Moise: ei au primit deja moștenirea la răsărit de Iordan, dar trebuie să meargă înarmați înaintea fraților lor până când și aceștia își vor primi moștenirea.",
        "Principiul care se vede aici este solidaritatea de legământ: nimeni nu se odihnește în moștenirea proprie cât timp frații lui încă luptă pentru a lor. Proprietatea individuală nu anulează responsabilitatea față de comunitate.",
      ),
      crossRefs: ["Numeri 32:20-22", "Deuteronom 3:18-20"],
      forYourHeart:
        "Ai primit deja binecuvântarea ta? Nu te odihni în ea cât timp frații tăi de credință încă se luptă pentru a lor.",
    },
    {
      id: "iosua-1-16-18",
      ref: "Iosua 1:16-18",
      heading: "Răspunsul poporului: aceeași ascultare cerută lui Moise",
      text: iosuaPassage(1, 16, 18),
      teaching: teaching(
        "Poporul răspunde cu o supunere deplină: „vom face tot ce ne-ai poruncit”. Autoritatea lui Iosua nu este contestată; ea este recunoscută ca o continuare directă a autorității lui Moise.",
        "Fraza finală a poporului este, de fapt, aceeași poruncă pe care Iosua a primit-o de la DOMNUL, întoarsă acum spre el: „numai să fii tare și curajos”. Poporul îi cere conducătorului exact ceea ce Dumnezeu i-a cerut deja — un semn că vestea bună circulă repede prin tabără.",
        "Amenințarea cu moartea pentru cel care se răzvrătește arată seriozitatea legământului militar al lui Israel în acest moment: unitatea poporului sub o singură conducere este privită ca esențială pentru intrarea în țara făgăduită.",
      ),
      crossRefs: ["Deuteronom 17:12"],
      forYourHeart:
        "Ascultarea adevărată de un conducător pus de Dumnezeu se vede în disponibilitatea de a repeta pentru el cuvântul de încurajare pe care Domnul i l-a dat.",
    },
  ],
  prayer:
    "Doamne, Tu ești Cel care ne trimite mai departe chiar și după o pierdere grea.\n\nDă-ne curajul lui Iosua, legat de ascultarea de Cuvântul Tău, nu de puterea noastră.\n\nÎnvață-ne să nu ne odihnim în binecuvântarea primită cât timp frații noștri încă luptă.\n\nȘi fii cu noi oriunde mergem, așa cum ai fost cu robul Tău Moise. Amin.",
  status: IOSUA_STATUSES[1],
})
