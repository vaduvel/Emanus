import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_23 = deuteronomChapter({
  number: 23,
  title: "Deuteronom 23 — O tabără sfântă, un legământ de cuvânt ținut",
  summary:
    "Moise reglementează cine poate face parte din adunarea DOMNULUI, cere sfințenie în igiena taberei, interzice returnarea robului fugit și prostituția de templu, interzice camăta între frați, și cere ținerea cuvântului dat prin făgăduințe.",
  literaryContext:
    "Acest capitol continuă seria de legi de ordine socială din capitolul 22, extinzându-le la identitatea comunitară a lui Israel — cine aparține adunării, cum se păzește sfințenia taberei, și cum se păstrează integritatea cuvântului dat.",
  historicalContext:
    "Amoniții și moabiții au ostilitate istorică directă cu Israel — refuzul de a le oferi pâine și apa la Exod și tocmirea lui Balaam pentru blestem. În contrast, edomiții și egiptenii sunt tratați cu blândețe, ca rude sau ca gazde din trecut.",
  units: [
    {
      id: "deuteronom-23-1-8",
      ref: "Deuteronom 23:1-8",
      heading: "Cine face parte din adunarea DOMNULUI",
      text: deuteronomPassage(23, 1, 8),
      teaching: teaching(
        "Legea exclude din adunarea DOMNULUI pe cel cu mădularul tăiat, pe cel născut din curvie, și pe amonit și moabit „nână chiar la a zecea generație” — motivul dat pentru acești din urmă fiind ostilitatea lor istorică directă, inclusiv tocmirea lui Balaam pentru blestem.",
        "Contrastul este remarcabil: „să nu-l urăști pe edomit, căci este fratele tău; să nu-l urăști pe egiptean, căci ai fost străin în țara lui”. Excluderea nu este bazată pe etnie în general, ci pe istoria concretă de ostilitate sau prietenie față de Israel.",
      ),
      words: [
        {
          original: "לא-תתעב אדמי כי אחיך הוא",
          transliteration: "lo-teta'ev edomi ki achikha hu",
          language: "ebraica",
          meaning:
            "să nu urâști pe edomit, căci este fratele tău. Excepția bazată pe legătura de sânge cu Esau, care arată că legea nu este ostilitate generală față de neamuri, ci răspuns istoric la fapte concrete.",
        },
      ],
      crossRefs: ["Numeri 22:1-6", "Geneza 25:29-30", "Rut 4:13-17"],
      forYourHeart:
        "Relațiile tale cu alții ar trebui judecate pe fapte concrete, nu pe categorii generale nediscriminate.",
    },
    {
      id: "deuteronom-23-9-14",
      ref: "Deuteronom 23:9-14",
      heading: "Sfințenia taberei, păzită în amănunt",
      text: deuteronomPassage(23, 9, 14),
      teaching: teaching(
        "Legile de igienă a taberei militare — locul special pentru necesități, acoperirea murdăriei, curățirea celui necurat — sunt legate direct de teologie, nu doar de sănătate practică: „DOMNUL, Dumnezeul tău, umblă în mijlocul taberei tale”.",
        "Prezența activă a lui Dumnezeu în mijlocul taberei este motivul pentru sfințenia cerută: „ca DOMNUL să nu vadă la tine nimic necurat și să nu Se întoarcă de la tine”. Prezența divină nu este compatibilă cu indiferența față de curăție, chiar în detalii practice.",
      ),
      words: [
        {
          original: "כי יהוה אלהיך מתהלך בקרב מחנך",
          transliteration: "ki YHWH Elohekha mit'halekh beqerev machanekha",
          language: "ebraica",
          meaning:
            "căci DOMNUL, Dumnezeul tău, umblă în mijlocul taberei tale. Temeiul teologic pentru sfințenia practică cerută — prezența activă a lui Dumnezeu cere ordine și curăție, nu doar în cult, ci în viața de fiecare zi.",
        },
      ],
      crossRefs: ["Leviticul 15:16-18", "Numeri 5:1-4", "1 Corinteni 6:19-20"],
      forYourHeart:
        "Prezența lui Dumnezeu în viața ta cere atenție și la detaliile pe care le-ai considera prea mici pentru sfințenie.",
    },
    {
      id: "deuteronom-23-15-18",
      ref: "Deuteronom 23:15-18",
      heading: "Robul fugit, protejat; templul, păzit de exploatare sexuală",
      text: deuteronomPassage(23, 15, 18),
      teaching: teaching(
        "Legea interzice întoarcerea robului fugit către stăpânul lui: „să rămână cu tine... să nu-l asuprești”. Israel devine astfel un loc de refugiu, nu de extrădare către exploatare, pentru cel care fuge de la un stăpân abuziv.",
        "Interdicția prostituției de templu — pentru fii și fiice ale lui Israel — și refuzul de a aduce „câștigul unei prostituate” ca dar la altar arată că sfințenia cultului nu poate fi finanțată prin exploatare sexuală, indiferent de învelișul religios pe care aceasta l-ar avea în culturile din jur.",
      ),
      words: [
        {
          original: "לא-תונונו",
          transliteration: "lo tonenu",
          language: "ebraica",
          meaning:
            "să nu-l asuprești. Termen care leagă protecția robului fugit de porunca generală de a nu asupri pe cel vulnerabil, repetată în multiple locuri din Legea lui Israel.",
        },
      ],
      crossRefs: ["1 Corinteni 7:23", "Leviticul 19:29", "Osea 4:14"],
      forYourHeart:
        "Un loc sfânt nu se poate finanța prin exploatare, indiferent cât de mult ar avea nevoie de resurse.",
    },
    {
      id: "deuteronom-23-19-23",
      ref: "Deuteronom 23:19-23",
      heading: "Fără camată între frați, cuvântul dat este sfânt",
      text: deuteronomPassage(23, 19, 23),
      teaching: teaching(
        "Camăta este interzisă explicit între israeliți — „de la fratele tău să nu iei dobândă” — dar permisă față de străini, distingând între relațiile de legământ intern și tranzacțiile comerciale externe. Scopul dat este direct legat de binecuvântare: „ca DOMNUL... să te binecuvânteze în tot ce vei pune mâna”.",
        "Făgăduințele făcute DOMNULUI trebuie ținute fără întârziere: „DOMNUL, Dumnezeul tău, ți-ar cere socoteală de ea și te-ai încărca cu un păcat”. Interesant, a nu face o făgăduință nu este păcat — dar a o face și a n-o ține, da.",
      ),
      words: [
        {
          original: "מוצא שפתיך תשמר",
          transliteration: "motza sfatekha tishmor",
          language: "ebraica",
          meaning:
            "ce iese din buzele tale să păzești. Principiul integrității verbale — cuvântul dat, mai ales lui Dumnezeu, este un legământ care trebuie ținut, nu o formalitate opinabilă.",
        },
      ],
      crossRefs: ["Exod 22:25", "Eclesiastul 5:4-5", "Matei 5:33-37"],
      forYourHeart:
        "Cuvântul dat, mai ales înaintea lui Dumnezeu, te leagă; e mai bine să nu promiți decât să promiți și să nu ții.",
    },
    {
      id: "deuteronom-23-24-25",
      ref: "Deuteronom 23:24-25",
      heading: "Foamea aproapelui, potolită fără furt",
      text: deuteronomPassage(23, 24, 25),
      teaching: teaching(
        "Legea permite trecătorului flămând să mănânce direct din vie sau din grâul aproapelui „până te vei sătura”, dar interzice să pună în vas sau să folosească secera — diferența dintre a te hrăni cu ce ai nevoie și a te îmbogăți din munca altuia.",
        "Această lege echilibrează cu grijă dreptul proprietății și nevoia celui flămând, permițând o formă de generozitate obligatorie față de trecător, dar fără să legitimeze recolta comercială făcută pe cheltuiala altuia.",
      ),
      words: [
        {
          original: "ואכלת ענבים כנפשך שבעך",
          transliteration: "ve'akhalta anavim kenafshekha sova'ekha",
          language: "ebraica",
          meaning:
            "să mănânci struguri, după dorința ta, până te vei sătura. Formula care definește limita corectă: hrana pentru nevoia imediată, nu recolta pentru câștig personal din munca altuia.",
        },
      ],
      crossRefs: ["Matei 12:1", "Leviticul 19:9-10", "Rut 2:2-3"],
      forYourHeart:
        "Generozitatea față de cel în nevoie nu te scutește de respectul pentru munca și proprietatea altuia.",
    },
  ],
  prayer:
    "Doamne, învață-ne să judecăm relațiile pe fapte concrete, nu pe categorii nediscriminate.\n\nDă-ne atenție la sfințenie în cele mai mici detalii ale vieții, pentru că Tu locuiești în mijlocul nostru.\n\nPăzește-ne de exploatare, și învață-ne să fim un loc de refugiu pentru cel asuprit.\n\nȘi dă-ne integritate deplină în cuvântul dat, mai ales înaintea Ta. Amin.",
  status: DEUTERONOM_STATUSES[23],
})
