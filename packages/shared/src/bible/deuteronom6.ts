import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_6 = deuteronomChapter({
  number: 6,
  title: "Deuteronom 6 — Ascultă, Israel: iubirea care naște ascultare",
  summary:
    "Moise rostesc Shema, mărturisirea centrală a credinței lui Israel: DOMNUL este unul singur, și El trebuie iubit cu toată inima, cu tot sufletul și cu toată puterea. Poporul este chemat să nu-L uite pe Dumnezeu În belșugul țării făgăduite, să nu-L ispitească și să Învețe pe copiii lor tot ce a făcut DOMNUL pentru ei.",
  literaryContext:
    "Versetul 4 al acestui capitol — Shema Yisrael — va deveni cea mai rostită confesiune de credință din întreaga istorie a lui Israel, spusă dimineața și seara, pănă În ziua de astăzi. Domnul Iisus Însăși o citeăză ca cea mai mare poruncă (Marcu 12:29-30).",
  historicalContext:
    "Popoarele canaanite din țara pe care Israel o va cuceri Închinau mai mulți dumnezei, fiecare cu rolul lui În agricultură, război sau fertilitate. Declarația „DOMNUL este una” nu era doar o formulă religioasă abstractă, ci o respingere radicală a întregului sistem religios pe care Israel avea să-l Întîlnească În Canaan.",
  units: [
    {
      id: "deuteronom-6-1-3",
      ref: "Deuteronom 6:1-3",
      heading: "Porunci date pentru zile lungi În țara făgăduită",
      text: deuteronomPassage(6, 1, 3),
      teaching: teaching(
        "Scopul poruncilor este spus limpede la început: „ca să trăiți multă vreme În țara pe care o veți lua În stăpînire”. Legea nu este dată pentru Îngreunarea vieții, ci pentru prelungirea ei, și pentru belșugul „În țara În care curge lapte și miere”.",
        "Formula „să ascultați și să paziți cu grijă”, repetată aici, arată din nou că ascultarea biblică este mai mult decît acord intelectual; este păzire activă În viața de zi cu zi.",
      ),
      words: [
        {
          original: "ארץ זבת חלב ודבש",
          transliteration: "eretz zavat chalav udevash",
          language: "ebraica",
          meaning:
            "țară În care curge lapte și miere. Expresia clasică pentru belșugul țării făgăduite, repetată de multe ori În Pentateuh.",
        },
      ],
      crossRefs: ["Exod 3:8", "Deuteronom 4:40"],
      forYourHeart:
        "Poruncile lui Dumnezeu nu-ți Îngreunează viața; sunt date pentru belșugul și lungimea zilelor tale.",
    },
    {
      id: "deuteronom-6-4-9",
      ref: "Deuteronom 6:4-9",
      heading: "Shema: DOMNUL este unul, și inima Întărită după El",
      text: deuteronomPassage(6, 4, 9),
      teaching: teaching(
        "„Ascultă, Israel! DOMNUL, Dumnezeul nostru, este singurul DOMN” — această declarație scurtă este piatra de temelie a monoteismului biblic. Într-o lume plină de alți zei, Israel mărturisește un singur Dumnezeu, o singură loialitate.",
        "Din această unicitate decurge porunca cea mai mare: „să iubești pe DOMNUL, Dumnezeul tău, cu toată inima ta, cu tot sufletul tău și cu toată puterea ta”. Domnul Iisus va numi aceasta cea mai mare poruncă din toată Legea (Marcu 12:29-30), și pe ea se întemeiază toată celelalte.",
        "Iubirea aceasta nu rămîne teoretică: cuvintele trebuie să fie „În inima ta”, învățate copiilor, vorbite „acasă... pe drum... cînd te culci... cînd te scoli”, purtate pe mnă și pe frunte, scrise pe ușile casei. întreaga viață, În fiecare clipă și fiecare loc, este chemată să fie Împregnată de cuvîntul lui Dumnezeu.",
      ),
      words: [
        {
          original: "שמע ישראל יהוה אלהינו יהוה אחד",
          transliteration: "Shema Yisrael, YHWH Eloheinu, YHWH echad",
          language: "ebraica",
          meaning:
            "Ascultă, Israel: DOMNUL, Dumnezeul nostru, DOMNUL este unul. Cea mai importantă confesiune de credință a Vechiului Legămînt, rostită zilnic de fiecare evreu practicant.",
        },
      ],
      crossRefs: ["Marcu 12:29-30", "Deuteronom 11:18-20", "Iacov 2:19"],
      forYourHeart:
        "Nu există colț din viața ta — acasă, pe drum, cînd te culci sau cînd te scoli — care să fie prea mic pentru cuvîntul lui Dumnezeu.",
    },
    {
      id: "deuteronom-6-10-15",
      ref: "Deuteronom 6:10-15",
      heading: "Belșugul care poate naște uitare",
      text: deuteronomPassage(6, 10, 15),
      teaching: teaching(
        "Moise avertizează despre un pericol care nu vine din pustie sau război, ci din belșug: cetăți pe care nu le-ai zidit, vii pe care nu le-ai sădit, fîntîni pe care nu le-ai săpat. „Socotește-te săul, ca nu cumva... să-L uiți pe DOMNUL”. Prosperitatea nemeritată poate naște o amnezie spirituală mai periculoasă decît suferința.",
        "Alergarea după alți dumnezei „dintre dumnezeii popoarelor Înconjurătoare” este numită direct ca provocare a mîniei lui Dumnezeu: „căci DOMNUL, Dumnezeul tău, este un Dumnezeu gelos În mijlocul tău”. Aceeași gelozie amintită În Decalog rămîne temeiul avertismentului.",
      ),
      words: [
        {
          original: "פן-֪שכח",
          transliteration: "pen-tishkach",
          language: "ebraica",
          meaning:
            "ca nu cumva să uiți. Formulă de avertisment repetată de multe ori În Deuteronom, legată mai ales de pericolul belșugului.",
        },
      ],
      crossRefs: ["Deuteronom 8:11-14", "Proverbe 30:8-9", "Osea 13:6"],
      forYourHeart:
        "Belșugul pe care nu l-ai muncit tu să nu-ți devină prilej de uitare a Celui care ți l-a dat.",
    },
    {
      id: "deuteronom-6-16-19",
      ref: "Deuteronom 6:16-19",
      heading: "Nu ispiti pe DOMNUL, ci faț ce este drept",
      text: deuteronomPassage(6, 16, 19),
      teaching: teaching(
        "„Să nu ispitiți pe DOMNUL, Dumnezeul vostru, cum L-ați ispitit la Masa” — aducere directă aminte de cîrteala de la Masa (Exod 17:1-7), cînd poporul a cerut apă pundeînd la îndoială prezența lui Dumnezeu. Domnul Iisus Însăși va cita acest verset În ispitirea din pustie (Matei 4:7).",
        "Răspunsul cerut este simplu și cuprinzător: „să faceți ce este bine și plăcut Înaintea DOMNULUI”. Nu este suficient să evitați ispitirea lui Dumnezeu; trebuie trăită activ dreptatea Lui, ca să fie luată În stăpînire țara făgăduită.",
      ),
      words: [
        {
          original: "לא ֪נסו א֪-יהוה",
          transliteration: "lo tenasu et-YHWH",
          language: "ebraica",
          meaning:
            "să nu ispitiți pe DOMNUL. Citat de Domnul Iisus În Matei 4:7 cînd a respins ispita diavolului de a se arunca de pe Templu.",
        },
      ],
      crossRefs: ["Exod 17:1-7", "Matei 4:7", "1 Corinteni 10:9"],
      forYourHeart:
        "Nu cere semne care să forțeze mâna lui Dumnezeu; trăiește dreptatea Lui și lasă-L să-și Împlineăscă făgăduința.",
    },
    {
      id: "deuteronom-6-20-25",
      ref: "Deuteronom 6:20-25",
      heading: "Ce vei răspunde fiului tău",
      text: deuteronomPassage(6, 20, 25),
      teaching: teaching(
        "Capitolul se Încheie cu o întrebă pe care Moise o pune În gura copiilor viitori: „Ce înseamnă aceste învățături, legi și porunci pe care vi le-a dat DOMNUL, Dumnezeul nostru?”. Legea nu este dată pentru a fi ținută secretă; este menită să trezească curiozitate și întrebări În generația care vine.",
        "Răspunsul părinților trebuie să fie povestea izbăvirii: „Eram robi ai lui Faraon În Egipt, și DOMNUL ne-a scos din Egipt cu putere”. Legea nu se învăță În abstract, ci ca și răspuns la ceea ce Dumnezeu a făcut deja pentru eliberarea poporului Lui.",
      ),
      words: [
        {
          original: "מה-העד֪ והחקים",
          transliteration: "ma ha-edot vehachuqim",
          language: "ebraica",
          meaning:
            "ce înseamnă mărturiile și hotărîrile. întrebarea imaginată a copilului, care pregătește învățătura viitoarelor generații prin poveste, nu prin memorare seacă.",
        },
      ],
      crossRefs: ["Exod 12:26-27", "Deuteronom 4:9", "Psalmul 78:5-7"],
      forYourHeart:
        "Pregătește-te să răspunzi copiilor tăi cu povestea izbăvirii, nu doar cu regulile, cînd te vor întreba de ce crești așa.",
    },
  ],
  prayer:
    "Doamne, Tu ești unul, și noi învățăm să Te iubim cu toată inima, cu tot sufletul și cu toată puterea.\n\nPăzește-ne de uitarea pe care belșugul o poate naște În inimile noastre.\n\nDă-ne Învățătura care să treacă la copiii noștri, prin poveste, nu doar prin regulă.\n\nȘi ajută-ne să facem ce este bine și plăcut Înaintea Ta, fără să Te ispitim. Amin.",
  status: DEUTERONOM_STATUSES[6],
})
