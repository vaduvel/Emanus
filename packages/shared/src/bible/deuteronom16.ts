import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicat\u0103 pe unit\u0103\u021bi de sens.
 */

export const DEUTERONOM_16 = deuteronomChapter({
  number: 16,
  title: "Deuteronom 16 \u2014 Trei s\u0103rb\u0103tori pe an, \u0219i o dreptate f\u0103r\u0103 p\u0103rtinire",
  summary:
    "Moise stabile\u0219te cele trei s\u0103rb\u0103tori de pelerinaj \u2014 Pa\u0219tele cu Azimele, S\u0103rb\u0103toarea Secer\u0103tori\u0103torilor \u0219i S\u0103rb\u0103toarea Corturilor \u2014 la care fiecare b\u0103rbat trebuie s\u0103 se \u00cnf\u0103\u021bi\u0219eze la locul ales. Capitolul se \u00nncheie cu porunca de a numi judec\u0103tori drep\u021bi, f\u0103r\u0103 mit\u0103 sau p\u0103rtinire, \u0219i interzicerea altarelor idolatre cu Asera sau st\u00elpi de piatr\u0103.",
  literaryContext:
    "Acest capitol continu\u0103 tema locului central de \u00nnchinare din capitolul 12, aplic\u00end-o la calendarul anual de s\u0103rb\u0103tori. Tranzi\u021bia final\u0103 c\u0103tre justi\u021bie preg\u0103te\u0219te capitolul 17, care va detalia sistemul de conducere \u0219i judecat\u0103 al lui Israel.",
  historicalContext:
    "Cele trei s\u0103rb\u0103tori de pelerinaj erau legate de ciclul agricol: Pa\u0219tele la \u00nnceputul recoltei de orz, S\u0103rb\u0103toarea Secer\u0103tori\u0103torilor (Pentecost) la \u00ncheierea recoltei de gr\u00en, \u0219i S\u0103rb\u0103toarea Corturilor la strngerea final\u0103 a recoltei de toamn\u0103.",
  units: [
    {
      id: "deuteronom-16-1-8",
      ref: "Deuteronom 16:1-8",
      heading: "Pa\u0219tele, aminte\u0219te-\u021bi de noaptea ie\u0219irii",
      text: deuteronomPassage(16, 1, 8),
      teaching: teaching(
        "Pa\u0219tele se \u021bine \u00cn luna Abib, \u201ec\u0103ci \u00cn luna Abib te-a scos DOMNUL, Dumnezeul t\u0103u, din Egipt, noaptea\u201d. Jertfa trebuie adus\u0103 exclusiv la locul ales de DOMNUL, nu \u00cn orice cetate, subliniind din nou principiul centraliz\u0103rii cultului.",
        "P\u00einea f\u0103r\u0103 aluat, m\u00encat\u0103 \u0219apte zile, este numit\u0103 \u201ep\u00einea suferin\u021bei\u201d, ca amintire permanent\u0103 a plec\u0103rii grabnice din Egipt: \u201ec\u0103ci ai ie\u0219it \u00cn grab\u0103 din \u021bara Egiptului; \u0219i s\u0103-\u021bi aminte\u0219ti \u00cn toate zilele vie\u021bii tale de ziua ie\u0219irii\u201d.",
      ),
      words: [
        {
          original: "\u05dc\u05d7\u05dd \u05e2\u05e0\u05d9",
          transliteration: "lechem oni",
          language: "ebraica",
          meaning:
            "p\u00einea suferin\u021bei/necazului. Denumirea p\u00einii f\u0103r\u0103 aluat, care aminte\u0219te de graba \u0219i suferin\u021ba plec\u0103rii din Egipt, nu doar de o re\u021bet\u0103 obi\u0219nuit\u0103.",
        },
      ],
      crossRefs: ["Exod 12:1-14", "Exod 13:3-10", "1 Corinteni 5:7-8"],
      forYourHeart:
        "Bucuria eliber\u0103rii se \u021bine bine \u00cn minte doar dac\u0103 nu se separ\u0103 de amintirea suferin\u021bei din care ai fost izb\u0103vit.",
    },
    {
      id: "deuteronom-16-9-15",
      ref: "Deuteronom 16:9-15",
      heading: "S\u0103rb\u0103toarea Secer\u0103tori\u0103torilor \u0219i S\u0103rb\u0103toarea Corturilor",
      text: deuteronomPassage(16, 9, 15),
      teaching: teaching(
        "\u0218apte s\u0103pt\u00nni de la \u00nceputul secer\u00105ului se \u021bine S\u0103rb\u0103toarea Secer\u0103tori\u0103torilor, cu un dar propor\u021bional cu bel\u0219ugul primit: \u201epotrivit cu binecuv\u00entarea pe care \u021bi-o va da DOMNUL\u201d. Aceast\u0103 s\u0103rb\u0103toare include expres pe fiul, fiica, robul, roaba, Levitul, str\u0103inul, orfanul \u0219i v\u0103duva din mijlocul t\u0103u.",
        "S\u0103rb\u0103toarea Corturilor, \u021binut\u0103 \u0219apte zile la str\u00engerea recoltei de pe arie \u0219i din teasc, este numit\u0103 direct s\u0103rb\u0103toare a bucuriei: \u201es\u0103 te bucuri \u00cn s\u0103rb\u0103toarea ta... \u0219i vei fi cu adev\u0103rat plin de bucurie\u201d. Recolta bel\u0219ugului trebuie s\u0103 se \u00nntoarc\u0103 c\u0103tre bucurie \u00nmp\u0103r\u021bit\u0103, nu spre l\u0103comie personal\u0103.",
      ),
      words: [
        {
          original: "\u05d7\u05d2 \u05d4\u05e9\u05d1\u05e2\u05d5\u05aa",
          transliteration: "chag ha-shavuot",
          language: "ebraica",
          meaning:
            "S\u0103rb\u0103toarea S\u0103pt\u00nnilor, cunoscut\u0103 mai t\u00erziu \u00cn grecesc ca Pentecost (a cincizecea zi), s\u0103rb\u0103toare care va marca \u0219i pogor\u00erea Duhului Sf\u00nt din Fapte 2.",
        },
      ],
      crossRefs: ["Leviticul 23:15-22", "Fapte 2:1-4", "Leviticul 23:33-43"],
      forYourHeart:
        "Bel\u0219ugul care vine \u00nntr-o s\u0103rb\u0103toare este menit s\u0103 fie \u00nmp\u0103rt\u0103\u0219it, incluz\u00end pe cei care nu au propriile lor resurse.",
    },
    {
      id: "deuteronom-16-16-17",
      ref: "Deuteronom 16:16-17",
      heading: "Fiecare b\u0103rbat, de trei ori pe an",
      text: deuteronomPassage(16, 16, 17),
      teaching: teaching(
        "Cele trei s\u0103rb\u0103tori sunt rezumate ca obligatorii pentru fiecare b\u0103rbat din Israel: \u201ede trei ori pe an, tot poporul t\u0103u de parte b\u0103rb\u0103teasc\u0103 s\u0103 se \u00cnf\u0103\u021bi\u0219eze \u00cnaintea DOMNULUI\u201d. Prezen\u021ba \u00cn fa\u021ba DOMNULUI nu este op\u021bional\u0103 pentru cel care face parte din leg\u0103m\u00ent.",
        "Porunca final\u0103 arat\u0103 c\u0103 darul nu este uniform pentru to\u021bi: \u201efiecare s\u0103 dea ce va putea, potrivit cu binecuv\u00entarea pe care i-a dat-o DOMNUL\u201d. Nu este cerut\u0103 o sum\u0103 fix\u0103, ci un dar propor\u021bional cu ceea ce fiecare a primit deja.",
      ),
      words: [
        {
          original: "\u05dc\u05d0 \u05d9\u05e8\u05d0\u05d4 \u05d0\u05aa-\u05e4\u05e0\u05d9 \u05d9\u05d4\u05d5\u05d4 \u05e8\u05d9\u05e7\u05dd",
          transliteration: "lo yera'e et-pnei YHWH reikam",
          language: "ebraica",
          meaning:
            "s\u0103 nu se arate cu m\u00na goal\u0103 \u00cnaintea DOMNULUI. Formula subliniaz\u0103 c\u0103 prezen\u021ba \u00cnaintea lui Dumnezeu cere \u0219i un dar, nu doar apari\u021bia fizic\u0103.",
        },
      ],
      crossRefs: ["Exod 23:14-17", "Exod 34:23-24", "2 Corinteni 8:12"],
      forYourHeart:
        "D\u0103ruirea ta nu este m\u0103surat\u0103 la fel ca a altuia; ea trebuie s\u0103 fie propor\u021bional\u0103 cu binecuv\u00entarea pe care ai primit-o tu.",
    },
    {
      id: "deuteronom-16-18-22",
      ref: "Deuteronom 16:18-22",
      heading: "Judec\u0103tori f\u0103r\u0103 p\u0103rtinire, un altar f\u0103r\u0103 idoli",
      text: deuteronomPassage(16, 18, 22),
      teaching: teaching(
        "Sistemul de conducere trebuie s\u0103 fie \u00nntemeiat pe judec\u0103tori numi\u021bi \u00cn fiecare cetate: \u201es\u0103 nu calci dreptul, s\u0103 nu ai \u00nn vedere fa\u021ba omului \u0219i s\u0103 nu iei mit\u0103\u201d. Justi\u021bia p\u0103rtinitoare pentru cel cu putere sau avere este interzis\u0103 categoric.",
        "Formula \u201edreptatea, numai dreptatea s\u0103 urm\u0103re\u0219ti\u201d rezum\u0103 principiul central al sistemului legal al lui Israel, care este dat direct \u00cn leg\u0103tur\u0103 cu via\u021ba: \u201eca s\u0103 tr\u0103ie\u0219ti \u0219i s\u0103 st\u0103p\u00ene\u0219ti \u021bara\u201d. Capitolul se \u00nncheie cu interdic\u021bia de a planta un Asera sau ridica un st\u00elp de piatr\u0103 l\u00eng\u0103 altarul DOMNULUI \u2014 curata \u00cnchinare nu se poate mixa cu simbolurile idolatre.",
      ),
      words: [
        {
          original: "\u05e6\u05d3\u05e7 \u05e6\u05d3\u05e7 \u05aa\u05e8\u05d3\u05e3",
          transliteration: "tzedeq tzedeq tirdof",
          language: "ebraica",
          meaning:
            "dreptatea, numai dreptatea s\u0103 urm\u0103re\u0219ti (repetare pentru intensitate). Formula clasic\u0103 a justi\u021biei biblice, f\u0103r\u0103 compromis \u0219i f\u0103r\u0103 p\u0103rtinire.",
        },
      ],
      crossRefs: ["Exod 23:6-8", "Deuteronom 1:16-17", "Amos 5:24"],
      forYourHeart:
        "Nu urm\u0103ri dreptatea doar c\u00end te avantajeaz\u0103; urm\u0103re\u0219te-o f\u0103r\u0103 p\u0103rtinire, indiferent cine este \u00cn fa\u021ba ta.",
    },
  ],
  prayer:
    "Doamne, \u00cenva\u021b\u0103-ne s\u0103 ne aducem aminte de eliberarea Ta \u00cn fiecare s\u0103rb\u0103toare pe care \u021bi-o aducem.\n\nD\u0103-ne bucurie \u00cn d\u0103ruire, propor\u021bional\u0103 cu binecuv\u00entarea primit\u0103.\n\nRidic\u0103 \u00cn mijlocul nostru judec\u0103tori care urm\u0103resc numai dreptatea, f\u0103r\u0103 mit\u0103 \u0219i f\u0103r\u0103 p\u0103rtinire.\n\n\u0218i p\u0103ze\u0219te \u00cnchinarea noastr\u0103 curat\u0103, f\u0103r\u0103 mixturi cu idolii lumii. Amin.",
  status: DEUTERONOM_STATUSES[16],
})
