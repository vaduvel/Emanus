import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicata pe unitati de sens.
 */

export const DEUTERONOM_33 = deuteronomChapter({
  number: 33,
  title: "Deuteronom 33 - Binecuvantarea finala a lui Moise pentru cele douasprezece seminatii",
  summary:
    "Moise, inainte de moarte, binecuvanteaza fiecare seminatie a lui Israel in parte, incheind cu o descriere unica a Dumnezeului lui Iesurun, ale carui brate vesnice sustin poporul.",
  literaryContext:
    "Aceasta binecuvantare paraleleaza binecuvantarea lui Iacov din Geneza 49, dar vine dupa patruzeci de ani de calatorie prin pustie, chiar in pragul intrarii in tara promisa, ca ultim cuvant al lui Moise catre popor inainte de moartea sa pe muntele Nebo.",
  historicalContext:
    "Ordinea si continutul binecuvantarilor tribale reflecta pozitia geografica si istorica pe care fiecare seminție o va avea in tara Canaanului, unele accente (precum absenta explicita a lui Simeon) fiind pastrate exact asa cum apar in text, fara armonizare artificiala cu Geneza 49.",
  units: [
    {
      id: "deuteronom-33-1-5",
      ref: "Deuteronom 33:1-5",
      heading: "DOMNUL vine din Sinai, Moise imparat in Iesurun",
      text: deuteronomPassage(33, 1, 5),
      teaching: teaching(
        "Binecuvantarea se deschide cu o imagine teofanică: „DOMNUL a venit din Sinai... a stralucit din muntele Paran si a venit cu zeci de mii de sfinți; din mana Lui dreapta le venea o lege de foc.” Legea nu este prezentata ca o povara birocratica, ci ca stralucirea însăși a prezentei divine.",
        "Moise este numit cel care „a dat Legea, moștenirea adunarii lui Iacov”, iar rolul sau de conducător este descris ca cel al unui „imparat in Iesurun” - o autoritate care nu vine din ambiție personala, ci din slujirea directa a poruncilor DOMNULUI.",
      ),
      words: [
        {
          original: "אש דת למו",
          transliteration: "esh dat lamo",
          language: "ebraica",
          meaning:
            "o lege de foc pentru ei. Expresie dificila si rara, care leaga direct primirea Legii de imaginea focului teofanic vazut la Sinai, subliniind natura ei sacra si arzatoare.",
        },
      ],
      crossRefs: ["Exodul 19:18", "Evrei 12:29", "Geneza 49:1-2"],
      forYourHeart:
        "Cuvantul lui Dumnezeu nu este o povara seaca; el straluceste cu insasi prezenta Celui care l-a dat.",
    },
    {
      id: "deuteronom-33-6-11",
      ref: "Deuteronom 33:6-11",
      heading: "Ruben, Iuda si Levi - viata, ajutorul in lupta, devotamentul absolut",
      text: deuteronomPassage(33, 6, 11),
      teaching: teaching(
        "Binecuvantarea lui Ruben este simpla si esențială: „sa traiasca... si sa nu moara”, iar pentru Iuda, Moise cere ajutor direct in lupta: „mâinile lui sa se lupte pentru el si sa-i fii ajutor impotriva vrăjmașilor lui”.",
        "Levi este descris prin devotamentul sau radical fata de DOMNUL, mai presus de legaturile de familie: „cel ce zice despre tatăl sau si despre mama sa: Nu i-am văzut... căci ei pazesc cuvântul Tau”. Slujirea preoteasca cere o loialitate care trece dincolo de afecțiunile naturale, când acestea vin in conflict cu ascultarea de DOMNUL.",
      ),
      words: [
        {
          original: "כי שמרו אמרתך",
          transliteration: "ki shameru imratekha",
          language: "ebraica",
          meaning:
            "caci ei pazesc cuvantul Tau. Motivul dat pentru loialitatea radicala a lui Levi - nu duritate de caracter, ci pastrarea cu sfintenie a Cuvantului lui Dumnezeu, chiar cu pretul relatiilor de familie compromise de idolatrie.",
        },
      ],
      crossRefs: ["Exodul 32:25-29", "Matei 10:37", "Maleahi 2:5-7"],
      forYourHeart:
        "Loialitatea ta fata de Dumnezeu poate cere, in momente critice, sa puna ascultarea de El inaintea legaturilor naturale care se opun adevarului.",
    },
    {
      id: "deuteronom-33-12-17",
      ref: "Deuteronom 33:12-17",
      heading: "Beniamin si Iosif - siguranta si belsugul cel mai deplin",
      text: deuteronomPassage(33, 12, 17),
      teaching: teaching(
        "Beniamin este descris cu tandrețe rara: „preaiubitul DOMNULUI va locui in siguranta langa El... si va locui intre umerii lui” - imagine de proximitate si ocrotire intima.",
        "Binecuvantarea lui Iosif este cea mai extinsa si mai generoasa: „cu cele mai bune daruri ale cerului... cu frunatile muntilor stravechi” - un belsug complet, material si topografic, incoronat de imaginea puterii: „coarnele lui sunt coarne de bivol; cu ele va impunge popoarele pana la marginile pamantului”.",
      ),
      words: [
        {
          original: "ובין כתפיו שכן",
          transliteration: "uven ketefav shakhen",
          language: "ebraica",
          meaning:
            "si intre umerii Lui va locui. Imagine de intimitate si sprijin direct, aplicata lui Beniamin ca beneficiar al ocrotirii personale a DOMNULUI, dincolo de simpla protectie generala.",
        },
      ],
      crossRefs: ["Geneza 49:22-26", "Deuteronom 33:27", "Psalmul 91:4"],
      forYourHeart:
        "Siguranta pe care Dumnezeu ti-o da nu este distanta si abstracta; ea vine din a locui aproape de El, ca sub bratul Lui ocrotitor.",
    },
    {
      id: "deuteronom-33-18-25",
      ref: "Deuteronom 33:18-25",
      heading: "Zabulon, Isahar, Gad, Dan, Neftali si Aser - daruri diferite, aceeasi binecuvantare",
      text: deuteronomPassage(33, 18, 25),
      teaching: teaching(
        "Fiecare seminție primeste o binecuvantare adaptata caracterului si pozitiei sale viitoare: Zabulon si Isahar se bucura in iesirile si corturile lor, Gad este descris ca o leoaica curajoasa care împlinește dreptatea DOMNULUI, iar Dan este „un pui de leu, care sare din Basan”.",
        "Neftali este „saturat de bunăvoința”, iar Aser primeste o imagine plina de bogăție senzoriala: „sa-si moaie piciorul in ulei... zăvoarele tale sa fie de fier si de arama” - simbol de abundenta si de aparare puternica deopotriva.",
      ),
      words: [
        {
          original: "מנעלך ברזל ונחשת",
          transliteration: "man'alekha barzel unekhoshet",
          language: "ebraica",
          meaning:
            "zavoarele tale, de fier si de arama. Imagine de aparare puternica si durabila, promisa lui Aser ca pandant al bogatiei si al bunavointei descrise in acelasi verset.",
        },
      ],
      crossRefs: ["Geneza 49:13-21", "Judecatorii 5:18", "Iosua 19:10-39"],
      forYourHeart:
        "Dumnezeu nu da tuturor acelasi dar in aceeasi forma; binecuvantarea Lui se adapteaza chemarii si caracterului fiecaruia.",
    },
    {
      id: "deuteronom-33-26-29",
      ref: "Deuteronom 33:26-29",
      heading: "Dumnezeul lui Iesurun, bratele vesnice, Israel fericit",
      text: deuteronomPassage(33, 26, 29),
      teaching: teaching(
        "Binecuvantarea se incheie cu afirmația unicitatii absolute a Dumnezeului lui Israel: „nimeni nu este ca Dumnezeul lui Iesurun, Care trece pe ceruri ca sa-ti vina in ajutor”, urmata de una dintre cele mai calduroase imagini din tot Deuteronomul: „sub tine sunt bratele veșnice”.",
        "Concluzia finala este o exclamație de fericire: „Ferice de tine, Israele! Cine este ca tine, un popor mântuit de DOMNUL”. Toata cartea Deuteronomul, cu legile, avertismentele si blestemele ei, se incheie pe aceasta nota de siguranta si bucurie întemeiată pe caracterul lui Dumnezeu, nu pe meritul poporului.",
      ),
      words: [
        {
          original: "ומתחת זרעת עולם",
          transliteration: "umitachat zero'ot olam",
          language: "ebraica",
          meaning:
            "si sub tine bratele vesnice. Una dintre cele mai calduroase imagini biblice de siguranta - nu o promisiune abstracta, ci sprijinul concret si permanent al puterii lui Dumnezeu sub poporul Sau.",
        },
      ],
      crossRefs: ["Psalmul 46:1", "Isaia 40:28-29", "Romani 8:38-39"],
      forYourHeart:
        "Fericirea ta reala nu vine din meritul propriu, ci din faptul ca sub tine sunt bratele vesnice ale unui Dumnezeu care nu obosseste sa te sustina.",
    },
  ],
  prayer:
    "Doamne, multumim ca Cuvântul Tau strălucește cu însăși prezenta Ta, nu este o povara seaca.\n\nAjuta-ne sa Te punem înaintea oricărei legaturi care s-ar opune ascultarii de Tine.\n\nMultumim ca binecuvantarea Ta se adaptează fiecaruia dintre noi, dupa chemarea pe care ne-ai dat-o.\n\nSi lasa-ne sa ne odihnim încrezători, căci sub noi sunt bratele Tale veșnice. Amin.",
  status: DEUTERONOM_STATUSES[33],
})
