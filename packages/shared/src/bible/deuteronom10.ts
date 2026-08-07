import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_10 = deuteronomChapter({
  number: 10,
  title: "Deuteronom 10 — Table noi, și o inimă care trebuie tăiată Împreună",
  summary:
    "După mijlocirea din capitolul precedent, DOMNUL poruncește table noi de piatră și un chivot pentru păstrarea lor. Moise amintește moartea lui Aaron și alegerea Leviei ca seminție fără moștenire pământească, apoi rezumă întreaga cerere a lui Dumnezeu într-o singură întrebare și chemarea de a tăia inima Împreună, nu doar trupul.",
  literaryContext:
    "Capitolul acesta este puntea dintre povestirea vițelului de aur și chemarea finală la ascultare din capitolul 11. Versetul 12, „Ce cere DOMNUL, Dumnezeul tău, de la tine?”, este una din marile rezumări ale religiei biblice, citată și În Mica 6:8.",
  historicalContext:
    "Chivotul legământului, făcut din lemn de salcîm, avea să poarte cele două table noi ale Legii până În Templul lui Solomon. Seminția Leviei a fost aleasă să slujească În locul preoției și să nu primească moștenire de pământ, ci să aibă pe DOMNUL însuși ca partea lor.",
  units: [
    {
      id: "deuteronom-10-1-5",
      ref: "Deuteronom 10:1-5",
      heading: "Table noi În locul celor sfărâmate",
      text: deuteronomPassage(10, 1, 5),
      teaching: teaching(
        "DOMNUL nu lasă legământul rupt fără refacere: „tăiește două table de piatră, ca cele de mai înainte, și suie-te la Mine pe munte”. Table sfărâmate din pricina păcatului poporului sunt înlocuite, nu abandonate; legământul continuă.",
        "Moise Îl construiește un chivot de lemn de salcîm ca să primească tablele, punând acolo cuvântul lui Dumnezeu „cum a fost mai înainte”. Cuvintele scrise din nou sunt identice cu cele scrise prima dată; Legea nu se schimbă de la o versiune la alta, ci este restaurată exact.",
      ),
      words: [
        {
          original: "ארון עצי שטים",
          transliteration: "aron atzei shitim",
          language: "ebraica",
          meaning:
            "chivot de lemn de salcîm. Materialul și construcția chivotului sunt descrise În detaliu și În Exod 25:10-16; aici este menționat sumar, ca fapt cunoscut deja.",
        },
      ],
      crossRefs: ["Exod 34:1-4", "Exod 25:10-16", "Evrei 9:4"],
      forYourHeart:
        "Când legământul tău cu Dumnezeu pare sfărâmat de păcat, El nu-l abandonează; Îl restaurează, identic În adevăr, prin pocăință.",
    },
    {
      id: "deuteronom-10-6-9",
      ref: "Deuteronom 10:6-9",
      heading: "Moartea lui Aaron, și o seminție fără moștenire pământească",
      text: deuteronomPassage(10, 6, 9),
      teaching: teaching(
        "Textul inserează o notație de călătorie și moartea lui Aaron la Moserah, unde fiul lui Eleazar Îl urmează În slujba preoțease. Chiar cel mai mare preot al legământului nu trăiește pentru totdeauna; slujba continuă dincolo de persoana care o Îndeplinește la un moment dat.",
        "Levi este ales pentru o chemare unică: „să ducă chivotul legământului DOMNULUI, să stea înaintea DOMNULUI ca să-I slujească și să binecuvânteze În Numele Lui”. De aceea nu primește moștenire de pământ Împreună cu frații lui: „DOMNUL este partea lui de moștenire”.",
      ),
      words: [
        {
          original: "יהוה הוא נחל֪ו",
          transliteration: "YHWH hu nachalato",
          language: "ebraica",
          meaning:
            "DOMNUL este moștenirea lui. Formula folosită despre seminția Levi, care nu primește teritoriu, dar primește ceva mai mare: pe însuși Dumnezeu.",
        },
      ],
      crossRefs: ["Numeri 18:20", "Numeri 20:22-29", "Psalmul 16:5"],
      forYourHeart:
        "Uneori Dumnezeu nu ți dă moștenirea pe care o aștepți, ci pe El însuși, care este mai mare decît orice moștenire pământească.",
    },
    {
      id: "deuteronom-10-10-13",
      ref: "Deuteronom 10:10-13",
      heading: "Ce cere DOMNUL de la tine",
      text: deuteronomPassage(10, 10, 13),
      teaching: teaching(
        "Moise își amintește că mijlocirea lui de patruzeci de zile s-a Încheiat cu iertare: „DOMNUL m-a ascultat și n-a voit să te nimicească”, iar apoi cu porunca de a merge Înainte „ca să iei În stăpânire țara pe care am jurat părinților tăi că le-o voi da”.",
        "Versetul 12 rezumă întreaga cerere a lui Dumnezeu într-o întrebare memorabilă: „Ce cere DOMNUL, Dumnezeul tău, de la tine, decît să te temi de DOMNUL, Dumnezeul tău, să mergi În toate căile Lui, să-L iubești și să-I slujească cu toată inima ta și cu tot sufletul tău”? Religia biblică se rezumă Îl patru mișcări: frică sfântă, ascultare, iubire, slujire.",
      ),
      words: [
        {
          original: "וע֪ה ישראל מה יהוה שאל מעמך",
          transliteration: "veata Yisrael ma YHWH sho'el me'imakh",
          language: "ebraica",
          meaning:
            "și acum, Israel, ce cere DOMNUL de la tine. Formula devine tema centrală a chemării profetice, citată și de Mica: „Ce cere DOMNUL de la tine: decît să faci dreptate, să iubești mila și să mergi smerit cu Dumnezeul tău”.",
        },
      ],
      crossRefs: ["Mica 6:8", "Matei 22:37-38", "Deuteronom 6:4-5"],
      forYourHeart:
        "Religia ta nu se rezumă la reguli complicate; se rezumă la frică sfântă, ascultare, iubire și slujire cu toată inima.",
    },
    {
      id: "deuteronom-10-14-22",
      ref: "Deuteronom 10:14-22",
      heading: "Tăiați Împreună inima voastră",
      text: deuteronomPassage(10, 14, 22),
      teaching: teaching(
        "Suveranitatea lui Dumnezeu este afirmată în toată amploarea ei: „ale DOMNULUI, Dumnezeului tău, sunt cerurile și cerurile cerurilor, pământul și tot ce este pe el”. într-un asemenea univers, alegerea părinților lui Israel din toate popoarele este pură iubire, nu necesitate.",
        "Porunca centrală este surprinzător de intimă: „să tăiați Împreună inima voastră [circumcizia inimii] și să nu mai fiți cu grumazul țeapăn”. Circumcizia trupului, semnul legământului exterior, este nimic fără circumcizia inimii — tema care va fi dezvoltată mai târziu de proroci și de apostolul Pavel.",
        "Chemarea finală este spre iubire practică, nu abstractă: „iubiți pe străin, căci și voi ați fost străini În țara Egiptului”. Dumnezeu însăși „face dreptate orfanului și văduvei și iubește pe străin”, și cere aceeași inimă de la poporul Său.",
      ),
      words: [
        {
          original: "ומל֪ם א֪ ערל֪ לבבכם",
          transliteration: "umaltem et orlat levavkhem",
          language: "ebraica",
          meaning:
            "să tăiați Împreună pielea inimii voastre. Metaforă pentru circumcizia inimii, dezvoltată mai târziu În Ieremia 4:4 și Romani 2:29.",
        },
      ],
      crossRefs: ["Deuteronom 30:6", "Ieremia 4:4", "Romani 2:28-29"],
      forYourHeart:
        "Un semn exterior al legământului, fără o inimă schimbată, nu înseamnă nimic. Cere lui Dumnezeu tăierea lăuntrică.",
    },
  ],
  prayer:
    "Doamne, Tu restaurezi legământul sfărâmat de păcatul nostru, cuvânt cu cuvânt, identic În adevăr.\n\nÎnvață-ne că cererea Ta se rezumă la frică sfântă, ascultare, iubire și slujire cu toată inima.\n\nTăiește Împreună inima noastră, nu doar semnul exterior al legământului.\n\nȘi Învață-ne să iubim pe străin cum ne-ai iubit și pe noi când eram străini. Amin.",
  status: DEUTERONOM_STATUSES[10],
})
