import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicat\u0103 pe unit\u0103\u021bi de sens.
 *
 * Textul biblic: p\u0103strat separat \u00een deuteronomText.ts (fi\u0219ierele deuteronomTextN.ts).
 * Explica\u021bia: scris\u0103 pentru Emanus dup\u0103 cercetarea textului. Nu se copiaz\u0103
 * formularea niciunui predicator sau comentator.
 */

export const DEUTERONOM_1 = deuteronomChapter({
  number: 1,
  title: "Deuteronom 1 \u2014 O genera\u021bie care \u00eencepe s\u0103 povesteasc\u0103 drumul",
  summary:
    "\u00cen c\u00e2mpia Moabului, \u00een luna a unsprezecea a celui de-al patruzecilea an, Moise \u00eencepe s\u0103 rosteasc\u0103 poporului \u00eentreaga lege pe care DOMNUL i-o dat. El prive\u0219te \u00eenapoi la Horeb, la punerea judec\u0103torilor, la trimiterea celor doisprezece cerceta\u0219i \u00een \u021bara Canaanului \u0219i la r\u0103zvr\u0103tirea care a urmat rapoartelor lor. Genera\u021bia care a ie\u0219it din Egipt este oprit\u0103 de la intrarea \u00een \u021bar\u0103, \u0219i doar Iosua \u0219i Caleb r\u0103m\u00e2n dintre cei mari.",
  literaryContext:
    "Deuteronomul \u00eensu\u0219i \u00eenseamn\u0103 \u00een grece\u0219te \u201eal doilea legi\u201d, dar \u00een ebraic\u0103 numele c\u0103r\u021bii, Devarim, vine chiar din primul ei cuv\u00e2nt: \u201eCuvintele\u201d. Nu este o repetare mecanic\u0103 a legilor din Exod, Levitic \u0219i Numeri, ci o predic\u0103 de r\u0103mas bun, rostit\u0103 de un om de o sut\u0103 dou\u0103zeci de ani unei genera\u021bii noi, care nu a v\u0103zut Egiptul, dar care va intra \u00een \u021bara pe care p\u0103rin\u021bii lor au pierdut-o din pricina necredin\u021bei. Capitolul 1 stabile\u0219te tonul \u00eentregii c\u0103r\u021bi: istoria este rostit\u0103 nu ca informa\u021bie, ci ca \u00eenv\u0103\u021b\u0103tur\u0103 vie, pentru o genera\u021bie care trebuie s\u0103 aleag\u0103 altfel dec\u00e2t p\u0103rin\u021bii ei.",
  historicalContext:
    "Patruzeci de ani au trecut de la Horeb (Sinai). Genera\u021bia adult\u0103 care a ie\u0219it din Egipt a murit \u00een pustie, dup\u0103 cum DOMNUL a jurat la Cades-Barnea (Numeri 14:20-35). Israel se afl\u0103 acum \u00een c\u00e2mpia Moabului, la r\u0103s\u0103rit de Iordan, preg\u0103tit s\u0103 intre \u00een Canaan. Moise nu va trece Iordanul; cuv\u00e2ntul lui din aceast\u0103 carte este ultima lui lucrare pentru poporul pe care l-a c\u0103l\u0103uzit patru decenii.",
  units: [
    {
      id: "deuteronom-1-1-8",
      ref: "Deuteronom 1:1-8",
      heading: "Cuvintele rostite \u00eenainte de a trece Iordanul",
      text: deuteronomPassage(1, 1, 8),
      teaching: teaching(
        "Cartea se deschide cu o \u00eensemnare geografic\u0103 \u0219i cronologic\u0103 aproape banal\u0103: locul, timpul, \u0219i faptul c\u0103 Moise a vorbit \u201edup\u0103 tot ce-i poruncise DOMNUL s\u0103-i spun\u0103\u201d. Nimic din ce va urma \u00een aceast\u0103 carte lung\u0103 nu este ini\u021biativ\u0103 personal\u0103 a lui Moise; el rostea ce i se poruncise.",
        "Textul \u00eensemneaz\u0103 c\u0103 de la Horeb la Cades-Barnea era un drum de unsprezece zile \u2014 \u0219i totu\u0219i Israel a petrecut patruzeci de ani \u00eentre aceste dou\u0103 puncte. Distan\u021ba scurt\u0103 fa\u021b\u0103 de anii lungi de rătăcire arat\u0103 limpede: nu geografia a fost problema, ci necredin\u021ba.",
        "DOMNUL rennoie\u0219te aici porunca ini\u021bial\u0103 din Horeb: \u201eIntra\u021bi \u00een st\u0103p\u00e2nirea \u021b\u0103rii pe care am jurat-o p\u0103rin\u021bilor vo\u0219tri\u201d. Cuv\u00e2ntul acesta era valabil de patruzeci de ani; nu s-a schimbat. Ceea ce s-a schimbat este genera\u021bia care \u00eel ascult\u0103.",
      ),
      words: [
        {
          original: "\u05d3\u05d1\u05e8\u05d9\u05dd",
          transliteration: "devarim",
          language: "ebraica",
          meaning:
            "cuvinte. D\u0103 numele ebraic al c\u0103r\u021bii; \u00eentreaga carte este \u00een\u021beleas\u0103 ca o rostire, un discurs de r\u0103mas bun, nu doar o list\u0103 de legi.",
        },
      ],
      crossRefs: ["Numeri 14:20-35", "Geneza 15:18-21"],
      forYourHeart:
        "Un drum scurt poate deveni ani de r\u0103t\u0103cire atunci c\u00e2nd inima nu crede. Distan\u021ba p\u00e2n\u0103 la f\u0103g\u0103duin\u021b\u0103 nu este niciodat\u0103 mai lung\u0103 dec\u00e2t necredin\u021ba ta.",
    },
    {
      id: "deuteronom-1-9-18",
      ref: "Deuteronom 1:9-18",
      heading: "Judec\u0103tori pu\u0219i \u00een fruntea unui popor \u00eenmul\u021bit",
      text: deuteronomPassage(1, 9, 18),
      teaching: teaching(
        "Moise \u00eencepe amintirea lui cu o povar\u0103, nu cu o victorie: \u201en-am putut singur s\u0103 v\u0103 duc\u201d. Recunoa\u0219terea neputin\u021bei personale este pragul de la care se ridic\u0103 o rânduial\u0103 nou\u0103. Un popor \u00eenmul\u021bit \u201eca stelele cerului\u201d \u2014 f\u0103g\u0103duin\u021ba lui Avraam \u00eempl\u00e2nit\u0103 sub ochii lui \u2014 nu mai poate fi c\u0103l\u0103uzit de un singur om.",
        "Alegerea judec\u0103torilor cere calit\u0103\u021bi limpezi: \u201ein\u021belep\u021bi, pricepu\u021bi \u0219i cunoscu\u021bi\u201d, ale\u0219i chiar de c\u0103tre semin\u021biile lor. Rânduiala nu este impus\u0103 de la Moise \u00een jos, ci recunoscut\u0103 din mijlocul poporului \u00eensu\u0219i \u2014 aceea\u0219i structur\u0103 v\u0103zut\u0103 deja \u00een Exod 18:21-26.",
        "Porunca dat\u0103 judec\u0103torilor este f\u0103r\u0103 echivoc: \u201es\u0103 nu v\u0103 uita\u021bi la fa\u021ba omului la judecat\u0103\u201d, mic sau mare, str\u0103in sau b\u0103\u0219tina\u0219. Judecata este a lui Dumnezeu, iar cazurile prea grele se aduc \u00eenaintea lui Moise \u2014 nu ca pe o sc\u0103pare din r\u0103spundere, ci ca pe o rezerv\u0103 pentru ce trece peste puterea omeneasc\u0103 de \u00een\u021belegere.",
      ),
      words: [
        {
          original: "\u05dc\u05d0-\u05ea\u05db\u05d9\u05e8\u05d5 \u05e4\u05e0\u05d9\u05dd",
          transliteration: "lo-takiru fanim",
          language: "ebraica",
          meaning:
            "s\u0103 nu cunoa\u0219te\u021bi/prti\u0219ni\u021bi fa\u021ba \u2014 s\u0103 nu ave\u021bi p\u0103rtinire. Formula standard pentru nep\u0103rtinirea cerut\u0103 judec\u0103torilor din Israel.",
        },
      ],
      crossRefs: ["Exod 18:21-26", "Geneza 15:5", "Numeri 11:16-17"],
      forYourHeart:
        "Recunoa\u0219terea c\u0103 nu po\u021bi duce singur o r\u0103spundere nu este \u00eenfr\u00e2ngere, ci \u00eenceputul unei rânduieli s\u0103n\u0103toase.",
    },
    {
      id: "deuteronom-1-19-33",
      ref: "Deuteronom 1:19-33",
      heading: "Cerceta\u0219ii, raportul \u0219i r\u0103zvr\u0103tirea de la Cades-Barnea",
      text: deuteronomPassage(1, 19, 33),
      teaching: teaching(
        "Ajun\u0219i la Cades-Barnea, poporul \u00eensu\u0219i cere iscoade: \u201eS\u0103 trimitem \u00eenainte pe unii care s\u0103 cerceteze \u021bara\u201d. Cei doisprezece se \u00eentorc \u0219i aduc din roadele \u021b\u0103rii, m\u0103rturisind c\u0103 este bun\u0103 \u2014 \u0219i totu\u0219i, chiar din raportul lor bun se na\u0219te frica \u0219i c\u00e2rteala.",
        "Moise \u00eei aminte\u0219te poporului chiar propriile lui cuvinte de \u00eencurajare: \u201eDOMNUL, Dumnezeul t\u0103u, care merge \u00eenaintea ta, se va lupta El \u00cesu\u0219i pentru voi\u201d, a\u0219a cum a f\u0103cut \u00een Egipt. Dar cuvintele bune nu au fost de-ajuns \u00eempotriva unei inimi care \u00eendoia.",
        "C\u00e2rteala poporului este aspr\u0103 \u0219i r\u0103st\u0103lm\u0103citoare: acuz\u0103 pe DOMNUL c\u0103 \u00eei ur\u0103\u0219te, c\u0103 i-a scos din Egipt ca s\u0103-i dea \u00een m\u00e2na amori\u021bilor. Necredin\u021ba nu este niciodat\u0103 t\u0103cut\u0103; ea preface iubirea lui Dumnezeu \u00een ur\u0103, \u0219i izb\u0103virea \u00een tr\u0103dare.",
        "Versetul 32 spune totul \u00een cinci cuvinte: \u201en-a\u021bi crezut pe DOMNUL, Dumnezeul vostru\u201d. P\u0103catul de la Cades-Barnea nu a fost, la r\u0103d\u0103cin\u0103, fric\u0103 de r\u0103zboi, ci necredin\u021b\u0103 fa\u021b\u0103 de f\u0103g\u0103duin\u021b\u0103.",
      ),
      words: [
        {
          original: "\u05dc\u05d0 \u05d4\u05d0\u05de\u05e0\u05ea\u05dd",
          transliteration: "lo he\u2019emantem",
          language: "ebraica",
          meaning:
            "n-a\u021bi crezut. Verbul de la care vine \u201eamin\u201d; miezul p\u0103catului de la Cades-Barnea este descris direct ca lips\u0103 de \u00eencredere, nu ca fric\u0103 sau lips\u0103 de curaj.",
        },
      ],
      crossRefs: ["Numeri 13:1-33", "Numeri 14:1-4", "Evrei 3:16-19"],
      forYourHeart:
        "Un raport corect despre binecuv\u00e2ntare poate fi \u00eentors \u00eempotriva ta de o inim\u0103 care nu crede. Verific\u0103-\u021bi inima, nu doar faptele, \u00eenainte de a c\u00e2rti.",
    },
    {
      id: "deuteronom-1-34-40",
      ref: "Deuteronom 1:34-40",
      heading: "Jur\u0103m\u00e2ntul care \u00eenchide \u021bara pentru o genera\u021bie",
      text: deuteronomPassage(1, 34, 40),
      teaching: teaching(
        "M\u00e2nia DOMNULUI se aprinde \u0219i vine un jur\u0103m\u00e2nt f\u0103r\u0103 \u00eentoarcere: \u201eNiciunul din b\u0103rba\u021bii acestei genera\u021bii rele nu va vedea \u021bara cea bun\u0103\u201d, afar\u0103 de Caleb, care \u201ea urmat \u00eentru totul pe DOMNUL\u201d. Exact acest lucru \u00eel deosebe\u0219te pe Caleb de restul iscoadelor: nu curajul lui militar, ci statornicia inimii lui.",
        "Iosua este numit aici, \u00eenainte de finalul c\u0103r\u021bii, ca cel care va duce poporul \u00een \u021bar\u0103: \u201eel o va \u00eemp\u0103r\u021bi lui Israel de mo\u0219tenire\u201d. Continuitatea leg\u0103m\u00e2ntului nu se rupe pentru c\u0103 o genera\u021bie a c\u0103zut; Dumnezeu preg\u0103te\u0219te deja p\u0103storul urm\u0103tor.",
        "Chiar copiii cei mici sunt scuti\u021bi de acest jur\u0103m\u00e2nt \u2014 \u201ecare nu cunosc \u00eenc\u0103 azi ce este bine \u0219i ce este r\u0103u\u201d \u2014 ar\u0103t\u00e2nd c\u0103 judecata lui Dumnezeu \u021bine seama de r\u0103spunderea moral\u0103, nu pedepse\u0219te la \u00eent\u00e2mplare o genera\u021bie \u00eentreag\u0103 f\u0103r\u0103 distinc\u021bie.",
      ),
      words: [
        {
          original: "\u05de\u05dc\u05d0 \u05d0\u05d7\u05e8\u05d9 \u05d9\u05d4\u05d5\u05d4",
          transliteration: "mile\u2019 aharei YHWH",
          language: "ebraica",
          meaning:
            "a urmat \u00cen totul pe DOMNUL, literal \u201ea umplut dup\u0103 DOMNUL\u201d. Expresia descrie o statornicie deplin\u0103, nedivizat\u0103, folosit\u0103 anume pentru Caleb.",
        },
      ],
      crossRefs: ["Numeri 14:20-35", "Numeri 32:11-12", "Iosua 14:6-14"],
      forYourHeart:
        "Nu curajul t\u0103u \u00een fa\u021ba primejdiei te scap\u0103, ci statornicia de a urma pe deplin pe DOMNUL, ca Caleb.",
    },
    {
      id: "deuteronom-1-41-46",
      ref: "Deuteronom 1:41-46",
      heading: "O poc\u0103in\u021b\u0103 t\u00e2rzie \u0219i o \u00eenfr\u00e2ngere care confirm\u0103 cuv\u00e2ntul",
      text: deuteronomPassage(1, 41, 46),
      teaching: teaching(
        "Poporul \u00eencearc\u0103 s\u0103 repare gre\u0219eala prin proprii puteri: \u201eVom sui \u0219i vom lupta\u201d, spun ei, dup\u0103 ce refuzaser\u0103 s\u0103 fac\u0103 exact acest lucru c\u00e2nd DOMNUL le poruncise. DOMNUL \u00eens\u0103 nu mai este cu ei \u00een aceast\u0103 lupt\u0103 ini\u021biat\u0103 din propria voin\u021b\u0103, \u0219i sunt b\u0103tu\u021bi de amori\u021bi la Horma.",
        "Cuv\u00e2ntul lui Moise este limpede: \u201eDOMNUL nu este \u00een mijlocul vostru\u201d. Poc\u0103in\u021ba adev\u0103rat\u0103 nu \u00eenseamn\u0103 doar a \u00eencerca din nou aceea\u0219i fapt\u0103 pe care ai refuzat-o mai \u00eenainte, ci a te \u00eentoarce la ascultarea de cuv\u00e2ntul care este dat \u00een prezent, nu la cel care s-a \u00eenchis deja.",
        "Capitolul se \u00eencheie cu poporul \u0219ez\u00e2nd la Cades \u201emulte zile\u201d, ca o im\u0103gine a anilor pierdu\u021bi \u00een pustie. Ceea ce ar fi putut fi un scurt drum de unsprezece zile s-a preschimbat, prin necredin\u021b\u0103, \u00eentr-o \u0219edere lung\u0103, f\u0103r\u0103 progres, \u00eenainte ca o genera\u021bie nou\u0103 s\u0103 fie preg\u0103tit\u0103 s\u0103 asculte altfel.",
      ),
      words: [
        {
          original: "\u05d0\u05d9\u05df \u05d9\u05d4\u05d5\u05d4 \u05d1\u05e7\u05e8\u05d1\u05db\u05dd",
          transliteration: "ein YHWH beqirbekhem",
          language: "ebraica",
          meaning:
            "DOMNUL nu este \u00een mijlocul vostru. Explica\u021bia direct\u0103 pentru \u00eenfr\u00e2ngerea de la Horma: prezen\u021ba lui Dumnezeu, nu num\u0103rul sau curajul, hot\u0103r\u0103\u0219te biruin\u021ba.",
        },
      ],
      crossRefs: ["Numeri 14:39-45", "Numeri 21:1-3"],
      forYourHeart:
        "O poc\u0103in\u021b\u0103 care \u00eencearc\u0103 doar s\u0103 repare fapta de ieri, f\u0103r\u0103 s\u0103 asculte cuv\u00e2ntul de azi, r\u0103m\u00e2ne tot o fapt\u0103 f\u0103cut\u0103 f\u0103r\u0103 DOMNUL.",
    },
  ],
  prayer:
    "Doamne, Tu ne-ai purtat de gr\u0103it\u0103 chiar \u0219i c\u00e2nd am ales necredin\u021ba.\n\n\u00cenva\u021b\u0103-ne s\u0103 credem f\u0103g\u0103duin\u021ba Ta \u00eenainte de a c\u00e2rti \u00eempotriva greut\u0103\u021bii drumului.\n\nD\u0103-ne statornicia lui Caleb, nu doar curajul de o clip\u0103.\n\n\u0218i \u00eenva\u021b\u0103-ne c\u0103 poc\u0103in\u021ba adev\u0103rat\u0103 ascult\u0103 cuv\u00e2ntul de azi, nu doar repar\u0103 fapta de ieri. Amin.",
  status: DEUTERONOM_STATUSES[1],
})
