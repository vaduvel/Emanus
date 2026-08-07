import { iosuaChapter, teaching } from "./iosuaHelpers.js"
import { iosuaPassage } from "./iosuaText.js"
import { IOSUA_STATUSES } from "./iosuaPublication.js"

export const IOSUA_2 = iosuaChapter({
  number: 2,
  title: "Iosua 2 — Rahab și cei doi iscoade",
  summary:
    "Iosua trimite doi iscoade să cerceteze Ierihonul. Ei sunt găzduiți de Rahab, o femeie curvă, care îi ascunde de regele Ierihonului și mărturisește credința ei în DOMNUL. În schimbul vieții familiei ei, cei doi iscoade îi promit protecție și îi dau un semn: un șnur roșu la fereastră.",
  literaryContext:
    "Capitolul contrastează frica locuitorilor Canaanului, exprimată chiar prin gura lui Rahab, cu ascultarea de sorginte divină cerută lui Israel în capitolul anterior. Rahab devine primul exemplu concret din carte al unui străin care se alătură poporului legământului prin credință, nu prin naștere.",
  historicalContext:
    "Șitim, tabăra lui Israel, se afla la răsărit de Iordan, în fața Ierihonului, una dintre cele mai vechi cetăți fortificate din regiune. Trimiterea de iscoade repetă tiparul din Numeri 13, dar de data aceasta doar doi bărbați sunt trimiși, în secret, nu doisprezece cu misiune publică.",
  units: [
    {
      id: "iosua-2-1-7",
      ref: "Iosua 2:1-7",
      heading: "Cei doi iscoade ascunși de Rahab",
      text: iosuaPassage(2, 1, 7),
      teaching: teaching(
        "Iosua trimite iscoadele în taină, spre deosebire de misiunea publică din Numeri 13. Lecția de la Cades-Barnea nu a fost uitată: raportul iscoadelor nu va mai fi prilej de cârtire publică a întregului popor.",
        "Rahab îi ascunde pe cei doi bărbați sub niște tulpini de in de pe acoperișul casei ei și îi induce în eroare pe trimișii regelui. Riscul pe care și-l asumă este uriaș: adăpostirea unor spioni străini putea însemna moartea ei și a familiei ei.",
        "Casa lui Rahab, construită chiar în zidul cetății, este un detaliu geografic relevant: locuința ei oferă acces direct la exteriorul cetății, explicând cum iscoadele vor putea coborî mai târziu pe frânghie.",
      ),
      crossRefs: ["Numeri 13:1-25", "Iacov 2:25"],
      forYourHeart:
        "Dumnezeu poate folosi un om aflat la marginea societății pentru a păzi planul Lui, chiar înainte ca acel om să înțeleagă pe deplin cine este DOMNUL.",
    },
    {
      id: "iosua-2-8-14",
      ref: "Iosua 2:8-14",
      heading: "Mărturisirea de credință a lui Rahab",
      text: iosuaPassage(2, 8, 14),
      teaching: teaching(
        "Rahab urcă la iscoade pe acoperiș și rostește o mărturisire surprinzătoare pentru o femeie canaanită: „Știu că DOMNUL v-a dat țara aceasta”. Vestea despre Marea Roșie și despre înfrângerea regilor amoriți ajunsese deja până la ea, iar frica locuitorilor Canaanului confirmă cuvintele DOMNULUI din Exod 15:14-16.",
        "Mărturisirea ei culminează cu o afirmație teologică deplină: „DOMNUL, Dumnezeul vostru, este Dumnezeu sus în ceruri și jos pe pământ”. Aceasta nu este doar recunoașterea unei puteri militare, ci o confesiune despre unicitatea lui Dumnezeu, asemănătoare celei cerute în Deuteronom 4:39.",
        "Cererea ei pentru sine și familia ei — părinți, frați, surori și tot ce este al lor — arată o credință care se extinde spre alții. Legământul propus de ea nu este doar pentru salvarea proprie, ci pentru toată casa ei.",
      ),
      words: [
        {
          original: "אֱלֹהִים בַּשָּׁמַיִם מִמַּעַל וְעַל־הָאָרֶץ מִתָּחַת",
          transliteration: "Elohim bashamayim mimma'al ve'al-ha'arets mittahat",
          language: "ebraica",
          meaning:
            "Dumnezeu sus în ceruri și jos pe pământ. Formula folosită de Rahab, o canaanită, pentru a mărturisi suveranitatea universală a DOMNULUI, nu doar puterea Lui militară.",
        },
      ],
      crossRefs: ["Exod 15:14-16", "Deuteronom 4:39", "Evrei 11:31"],
      forYourHeart:
        "Credința adevărată nu se oprește la recunoașterea puterii lui Dumnezeu, ci cere protecție pentru cei pe care îi iubești.",
    },
    {
      id: "iosua-2-15-24",
      ref: "Iosua 2:15-24",
      heading: "Șnurul roșu și raportul iscoadelor",
      text: iosuaPassage(2, 15, 24),
      teaching: teaching(
        "Rahab îi coboară pe iscoade cu o frânghie pe fereastră și le dă un sfat practic: să se ascundă în munte trei zile, până se întorc urmăritorii. Credința ei este însoțită de înțelepciune practică, nu doar de vorbe.",
        "Semnul șnurului roșu la fereastră devine condiția vizibilă a legământului: „când vom intra în țară, să legi funia aceasta de fir roșu la fereastra pe care ne-ai coborât”. Mântuirea promisă lui Rahab este legată de un semn exterior, vizibil, pe care ea trebuie să-l păstreze cu credincioșie.",
        "Raportul final al iscoadelor către Iosua este scurt, dar decisiv: „DOMNUL a dat toată țara în mâinile noastre, și toți locuitorii țării tremură înaintea noastră”. Spre deosebire de raportul de la Cades-Barnea, acest raport nu conține frică, ci încredere, confirmată chiar de mărturia unei străine.",
      ),
      crossRefs: ["Iosua 6:22-25", "Evrei 11:31", "Iacov 2:25"],
      forYourHeart:
        "Un semn simplu, păstrat cu credincioșie, poate fi tot ce ai nevoie pentru a fi găsit de mila lui Dumnezeu în ziua judecății.",
    },
  ],
  prayer:
    "Doamne, Tu găsești credință acolo unde nimeni nu s-ar aștepta să o caute.\n\nMulțumim că mila Ta se întinde spre cei care mărturisesc numele Tău, chiar dacă vin dintr-un neam străin de legământ.\n\nÎnvață-ne să păstrăm semnul mântuirii noastre cu aceeași credincioșie cu care Rahab a păzit șnurul roșu.\n\nȘi dă-ne curajul de a mărturisi despre Tine, chiar și atunci când riscul este mare. Amin.",
  status: IOSUA_STATUSES[2],
})
