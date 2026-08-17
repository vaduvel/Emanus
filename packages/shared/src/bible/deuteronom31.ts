import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_31 = deuteronomChapter({
  number: 31,
  title: "Deuteronom 31 — Comisionarea lui Iosua, Legea scrisă și predicția apostaziei",
  summary:
    "Moise, la 120 de ani, îmbărbătează poporul și pe Iosua, poruncește citirea periodică a Legii, primește vestea morții sale iminente și predicția apostaziei viitoare, și scrie cântarea care va fi martoră împotriva poporului.",
  literaryContext:
    "Acest capitol marchează trecerea autorității de la Moise la Iosua și de la cuvântul viu al lui Moise la cuvântul scris al Legii, care va rămâne alături de chivot ca mărturie permanentă, pregătind cântarea profetică din capitolul 32.",
  historicalContext:
    "Practica citirii publice a Legii la fiecare al șaptelea an, la Sărbătoarea Corturilor, a devenit un model pentru reînnoirea periodică a angajamentului comunitar față de legământ, reluat mai târziu în vremea lui Iosia și a lui Ezra.",
  units: [
    {
      id: "deuteronom-31-1-8",
      ref: "Deuteronom 31:1-8",
      heading: "Moise îmbărbătează poporul și pe Iosua",
      text: deuteronomPassage(31, 1, 8),
      teaching: teaching(
        "La 120 de ani, Moise anunță deschis limita sa: „nu voi trece Iordanul acesta”. Dar promisiunea rămâne neschimbată: „DOMNUL, Dumnezeul tău, va trece El Însuși înaintea ta”. Conducătorul se schimbă, dar Cel care conduce cu adevărat rămâne același.",
        "Îndemnul repetat „fiți tari și îmbărbătați-vă... nu te teme și nu te spăimânta” este întemeiat pe o promisiune concretă, nu pe optimism gol: „El nu te va lăsa și nu te va părăsi”. Curajul cerut este un curaj sprijinit pe caracterul credincios al lui Dumnezeu.",
      ),
      words: [
        {
          original: "חִזְקוּ וְאִמְצוּ",
          transliteration: "hizqu ve'imtsu",
          language: "ebraica",
          meaning:
            "fiți tari și întăriți-vă. Formula de îmbărbătare repetată de trei ori în acest capitol, aplicată deopotrivă poporului și lui Iosua, temelia ei fiind prezența promisă a DOMNULUI, nu puterea proprie.",
        },
      ],
      crossRefs: ["Iosua 1:9", "Evrei 13:5", "Deuteronom 3:28"],
      forYourHeart:
        "Curajul tău nu trebuie să se sprijine pe propria putere, ci pe promisiunea că DOMNUL nu te va lăsa și nu te va părăsi.",
    },
    {
      id: "deuteronom-31-9-13",
      ref: "Deuteronom 31:9-13",
      heading: "Legea scrisă, citită periodic în auzul tuturor",
      text: deuteronomPassage(31, 9, 13),
      teaching: teaching(
        "Moise instituie citirea publică a Legii la fiecare al șaptelea an, la Sărbătoarea Corturilor, „înaintea întregului Israel, în urechile lor” — bărbați, femei, prunci și străinul din porți, fără excepție.",
        "Scopul explicit este formarea generațiilor viitoare: „fiii lor, care nu o cunosc, să audă și să învețe să se teamă de DOMNUL”. Transmiterea Legii nu este lăsată la voia întâmplării, ci structurată printr-o practică comunitară regulată.",
      ),
      words: [
        {
          original: "תִּקְרָא אֶת־הַתּוֹרָה",
          transliteration: "tiqra et-hatorah",
          language: "ebraica",
          meaning:
            "să citești Legea. Porunca unei lecturi publice periodice, deschisă întregii comunități, ca mijloc structurat de transmitere a cunoașterii lui Dumnezeu către generațiile care nu au trăit evenimentele fondatoare.",
        },
      ],
      crossRefs: ["2 Regi 23:2", "Neemia 8:2-3", "Deuteronom 6:7"],
      forYourHeart:
        "Cunoașterea lui Dumnezeu nu se transmite automat; ea cere structuri regulate și intenționate de învățare pentru fiecare generație.",
    },
    {
      id: "deuteronom-31-14-23",
      ref: "Deuteronom 31:14-23",
      heading: "Comisionarea lui Iosua, predicția apostaziei, cântarea-martoră",
      text: deuteronomPassage(31, 14, 23),
      teaching: teaching(
        "DOMNUL anunță deschis viitorul: „poporul acesta se va ridica și va curvi după dumnezeii străini... Mă va părăsi”. Predicția apostaziei nu este o presupunere, ci o cunoaștere directă a inimii poporului, dată chiar înainte de intrarea în țară.",
        "Ca răspuns, DOMNUL poruncește o cântare care să rămână „martoră împotriva fiilor lui Israel” — un mijloc memorabil, transmis prin cânt, care să mărturisească adevărul chiar și atunci când poporul se va îndepărta și va vrea să nege consecințele alegerii sale.",
      ),
      words: [
        {
          original: "וְעָנְתָה הַשִּׁירָה הַזֹּאת לְפָנָיו לְעֵד",
          transliteration: "ve'anetah hashirah hazot lefanav le'ed",
          language: "ebraica",
          meaning:
            "și această cântare va mărturisi înaintea lui ca martoră. Funcția specială a cântării — nu doar amintire nostalgică, ci mărturie legală permanentă care confirmă adevărul consecințelor prevăzute.",
        },
      ],
      crossRefs: ["Deuteronom 32:1-43", "Iosua 24:27", "Isaia 30:8-9"],
      forYourHeart:
        "Dumnezeu cunoaște dinainte tendințele inimii tale spre îndepărtare, dar îți lasă mijloace ca să-ți amintești adevărul chiar în mijlocul rătăcirii.",
    },
    {
      id: "deuteronom-31-24-30",
      ref: "Deuteronom 31:24-30",
      heading: "Cartea Legii pusă lângă chivot, mărturie împotriva răzvrătirii",
      text: deuteronomPassage(31, 24, 30),
      teaching: teaching(
        "Cartea Legii scrisă complet este pusă „alături de chivotul legământului DOMNULUI... ca martoră împotriva ta”. Moise cunoaște limpede firea poporului: „îți cunosc răzvrătirea și gâtul tău cel înțepenit”, iar răzvrătirea s-a manifestat deja cât el era încă viu.",
        "Concluzia lui Moise este sobră, nu optimistă: „după moartea mea vă veți strica cu desăvârșire”. Nu este o predicție dată din amărăciune, ci o cunoaștere realistă a inimii umane, care motivează instituirea unor mijloace durabile de mărturie și memorie.",
      ),
      words: [
        {
          original: "אֶת־מֶרְיְךָ וְאֶת־עָרְפְּךָ הַקָּשֶׁה",
          transliteration: "et-moryekha ve'et-orpekha haqasheh",
          language: "ebraica",
          meaning:
            "răzvrătirea ta și grumazul tău cel înțepenit. Descrierea directă și fără menajamente a caracterului rezistent la corectare al poporului, temelie a nevoii pentru mărturii scrise permanente.",
        },
      ],
      crossRefs: ["Exodul 32:9", "Faptele Apostolilor 7:51", "2 Regi 22:8"],
      forYourHeart:
        "Cunoașterea realistă a înclinației proprii spre răzvrătire te poate motiva să cauți mijloace statornice de aducere aminte a adevărului.",
    },
  ],
  prayer:
    "Doamne, dă-ne curajul care nu se sprijină pe propriile puteri, ci pe promisiunea prezenței Tale neîntrerupte.\n\nAjută-ne să transmitem Cuvântul Tău cu credincioșie generațiilor care vin după noi.\n\nCunoaștem tendința inimii noastre spre îndepărtare; dă-ne mijloace statornice ca să ne amintim mereu de Tine.\n\nȚine-ne lipiți de adevărul Tău, chiar și atunci când inima noastră ar vrea să-l nege. Amin.",
  status: DEUTERONOM_STATUSES[31],
})
