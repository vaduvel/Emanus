import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_20 = deuteronomChapter({
  number: 20,
  title: "Deuteronom 20 — Nu te teme, DOMNUL merge cu tine la luptă",
  summary:
    "Moise dă legile războiului: încurajarea de a nu te teme căci DOMNUL luptă pentru Israel, scutirile pentru cei cu casă nouă, vie neculeasă, logodnă sau frică, oferta de pace pentru cetățile îndepărtate, nimicirea desăvârșită a neamurilor canaanite, și cruțarea pomilor roditori în timpul împresurării.",
  literaryContext:
    "Acest capitol aplică principiile de dreptate din capitolele 17-19 la contextul războiului, arătând că și în luptă Israel trebuie să acționeze cu discernământ, nu cu cruzime nediscriminată.",
  historicalContext:
    "Cuceririle antice erau de obicei brutale și fără limite față de populația civilă sau resursele naturale ale inamicului. Legea lui Israel distinge net între neamurile canaanite condamnate la nimicire, pentru păcatul lor idolatru continuu, și cetățile îndepărtate care pot primi oferta de pace.",
  units: [
    {
      id: "deuteronom-20-1-9",
      ref: "Deuteronom 20:1-9",
      heading: "Nu te teme, și scutirile de la război",
      text: deuteronomPassage(20, 1, 9),
      teaching: teaching(
        "Preotul încurajează poporul înainte de luptă: „să nu vi se înmoaie inima, nu vă temeți... căci DOMNUL, Dumnezeul vostru, merge El Însuși cu voi”. Frica de superioritatea numerică sau militară a vrăjmașului este înlocuită cu încrederea în prezența activă a DOMNULUI în luptă.",
        "Patru categorii sunt scutite de la luptă: cel cu casă nouă nesfințită, cel cu vie neculeasă, cel logodit neînsurat, și cel fricos la inimă — ultima categorie fiind trimisă acasă „ca să nu înmoaie inima fraților lui”. Armata lui Israel nu se bazează pe număr, ci pe curajul autentic al celor rămași.",
      ),
      words: [
        {
          original: "כי יהוה אלהיכם ההלך עמכם",
          transliteration: "ki YHWH Eloheikhem hahole'kh imakhem",
          language: "ebraica",
          meaning:
            "căci DOMNUL, Dumnezeul vostru, merge cu voi. Temeiul teologic al curajului cerut de la Israel în luptă — nu forța proprie, ci prezența activă a lui Dumnezeu.",
        },
      ],
      crossRefs: ["Deuteronom 31:6", "Judecătorii 7:2-3", "2 Cronici 20:15"],
      forYourHeart:
        "Curajul tău nu vine din propriile resurse, ci din certitudinea că Dumnezeu Însuși luptă alături de tine.",
    },
    {
      id: "deuteronom-20-10-15",
      ref: "Deuteronom 20:10-15",
      heading: "Oferta de pace pentru cetățile îndepărtate",
      text: deuteronomPassage(20, 10, 15),
      teaching: teaching(
        "Pentru cetățile aflate „foarte departe” de Israel, care nu fac parte din neamurile canaanite condamnate, legea cere mai întâi oferta de pace: „să-i oferi mai întâi pacea”. Doar dacă cetatea refuză și alege lupta, Israel poate ataca.",
        "Distincția este netă între cele două categorii de război: cetățile îndepărtate primesc o șansă reală de supunere pacifică (bir și slujire), pe când cetățile canaanite nu primesc această opțiune, din cauza idolatriei lor persistente descrise în versetele următoare.",
      ),
      words: [
        {
          original: "וקראת אליה לשלום",
          transliteration: "veqarata eleha leshalom",
          language: "ebraica",
          meaning:
            "să-i strigi/oferi pace. Formula care deschide procedura de război pentru cetățile îndepărtate — pacea este oferită mai întâi, nu presupusă absentă.",
        },
      ],
      crossRefs: ["Iosua 9:3-27", "2 Regi 18:31-32", "Luca 14:31-32"],
      forYourHeart:
        "Chiar în conflict, oferta de pace vine înaintea escaladării; nu orice diferență cere imediat confruntare.",
    },
    {
      id: "deuteronom-20-16-20",
      ref: "Deuteronom 20:16-20",
      heading: "Nimicirea neamurilor canaanite, și pomii roditori cruțați",
      text: deuteronomPassage(20, 16, 20),
      teaching: teaching(
        "Cetățile celor șapte neamuri canaanite — hetiți, amoriți, canaaniți, fereziți, heviți, iebusiți — sunt date spre „nimicire cu desăvârșire”, fără opțiunea de pace oferită celorlalte cetăți. Motivul dat explicit este prevenirea contaminării idolatre: „ca să nu vă învețe să faceți după toate urâciunile lor”.",
        "În contrast cu această severitate, legea cere cruțarea pomilor roditori chiar în timpul unei împresurări prelungite: „să nu-i nimicești... să mănânci din ei, dar să nu-i tăiezi”. Doar pomii neroditori pot fi folosiți ca unelte de asediu. Chiar războiul are limite ecologice.",
      ),
      words: [
        {
          original: "החרם תחרימם",
          transliteration: "hacharem tacharimem",
          language: "ebraica",
          meaning:
            "să-i nimicești cu desăvârșire (repetare pentru intensitate). Termenul cherem descrie consacrarea unui lucru/persoană spre nimicire totală, aplicat aici exclusiv neamurilor canaanite idolatre.",
        },
      ],
      crossRefs: ["Deuteronom 7:1-2", "Iosua 11:20-23", "Deuteronom 12:29-31"],
      forYourHeart:
        "Severitatea judecății lui Dumnezeu asupra răului statornic nu-i dă dreptul omului la distrugere nediscriminată; chiar în conflict, limitele rămân.",
    },
  ],
  prayer:
    "Doamne, Tu ești Cel care lupți pentru poporul Tău; scoate din inima noastră frica și dă-ne curaj adevărat.\n\nÎnvață-ne să oferim pace înainte de confruntare, oriunde este posibil.\n\nDă-ne discernământ să distingem răul care trebuie înfruntat de ceea ce merită încă o șansă.\n\nȘi păzește-ne de distrugere nediscriminată, chiar și în vremuri de conflict. Amin.",
  status: DEUTERONOM_STATUSES[20],
})
