import { iosuaChapter, teaching } from "./iosuaHelpers.js"
import { iosuaPassage } from "./iosuaText.js"
import { IOSUA_STATUSES } from "./iosuaPublication.js"

export const IOSUA_7 = iosuaChapter({
  number: 7,
  title: "Iosua 7 — Păcatul lui Acan",
  summary:
    "Acan fură din lucrurile date spre nimicire la Ierihon, iar Israel este înfrânt la Ai din pricina acestui păcat ascuns. Iosua se roagă stăruitor, DOMNUL descoperă vinovatul prin sorți, iar Acan și familia lui sunt pedepsiți în Valea Acor.",
  literaryContext:
    "După biruința răsunătoare de la Ierihon, înfrângerea de la Ai vine ca un contrast brutal, amintind cititorului că biruința nu este automată, ci depinde de sfințenia poporului. Capitolul explică teologic de ce armata care tocmai a văzut ziduri prăbușindu-se fuge acum înaintea unei cetăți mici.",
  historicalContext:
    "Ai era o cetate mult mai mică decât Ierihonul, motiv pentru care iscoadele lui Iosua recomandă trimiterea doar a două-trei mii de oameni. Înfrângerea neprevăzută arată că problema nu era numărul soldaților, ci păcatul din tabără.",
  units: [
    {
      id: "iosua-7-1-5",
      ref: "Iosua 7:1-5",
      heading: "Păcatul lui Acan și înfrângerea de la Ai",
      text: iosuaPassage(7, 1, 5),
      teaching: teaching(
        "Primul verset expune imediat cauza: „fiii lui Israel au păcătuit și au călcat legământul... căci Acan... a luat din lucrurile date spre nimicire”. Deși doar un om a furat, textul spune „fiii lui Israel au păcătuit” — solidaritatea legământului înseamnă că păcatul unuia atinge întregul popor.",
        "Iscoadele trimise la Ai raportează că poporul cetății este puțin și recomandă trimiterea doar a două-trei mii de oameni, ca „să nu obosim tot poporul”. Încrederea lor se bazează pe experiența de la Ierihon, nu pe o întrebare adresată din nou DOMNULUI.",
        "Israel este înfrânt, treizeci și șase de oameni mor, iar textul notează: „inima poporului s-a topit de tot și s-a făcut ca apa” — aceeași expresie care descrisese, invers, teama canaaniților înaintea lui Israel; acum roluri s-au schimbat brusc.",
      ),
      crossRefs: ["Iosua 6:18-19", "1 Corinteni 12:26"],
      forYourHeart:
        "Păcatul ascuns al unuia poate afecta întreaga comunitate; sfințenia nu este niciodată doar o chestiune personală.",
    },
    {
      id: "iosua-7-6-15",
      ref: "Iosua 7:6-15",
      heading: "Rugăciunea lui Iosua și răspunsul DOMNULUI",
      text: iosuaPassage(7, 6, 15),
      teaching: teaching(
        "Iosua și bătrânii îiși sfâșie hainele, cad cu fața la pământ înaintea chivotului și își pun țrână pe cap până seara. Durerea lui Iosua este atât de sinceră încât își pune la îndoială chiar decizia de a trece Iordanul: „de ce ne-ai trecut oare Iordanul?”.",
        "Răspunsul DOMNULUI este ferm, aproape aspru: „Scoală-te! Pentru ce stai așa pe fața ta?... Israel a păcătuit... au luat din lucrurile date spre nimicire, au furat, au mințit și le-au ascuns printre lucrurile lor”. Rugăciunea, oricât de sinceră, nu înlocuiește acțiunea de a rezolva păcatul.",
        "DOMNUL explică de ce Israel nu mai poate sta înaintea vrăjmașilor săi: „au ajuns un lucru dat spre nimicire” ei înșiși, prin asociere cu ce au furat. Se stabilește un proces de identificare a vinovatului prin sorți, seminție cu seminție, familie cu familie, până la un singur om.",
      ),
      crossRefs: ["Deuteronom 7:26", "Iacov 1:14-15"],
      forYourHeart:
        "Rugăciunea sinceră în fața unei crize nu ține loc de mărturisirea și îndepărtarea păcatului ascuns care a produs-o.",
    },
    {
      id: "iosua-7-16-26",
      ref: "Iosua 7:16-26",
      heading: "Descoperirea și pedepsirea lui Acan",
      text: iosuaPassage(7, 16, 26),
      teaching: teaching(
        "Prin sorți, vinovăția se îngustează treptat: seminția lui Iuda, apoi familia zerahiților, apoi casa lui Zabdi, până când Acan, fiul lui Carmi, este arătat drept vinovat. Procesul lent este public și transparent, lăsând loc pentru mărturisire la fiecare pas.",
        "Iosua îl îndeamnă pe Acan: „dă slavă DOMNULUI, Dumnezeul lui Israel, și mărturisește”. Acan recunoaște: a văzut „o manta frumoasă din Șinear, două sute de sicli de argint și o plăcuță de aur”, le-a poftit și le-a luat, ascunzându-le în pământ sub cortul său.",
        "Acan și tot ce-i aparține sunt duși în Valea Acor și uciși cu pietre, apoi arși, iar o grămadă de pietre este ridicată deasupra lor. Numele văii — Acor, „ntristare/tulburare” — devine el însuși o mărturie permanentă asupra gravității păcatului ascuns; abia după aceasta, „DOMNUL Și-a potolit mânia aprinsă”.",
      ),
      words: [
        {
          original: "עָכוֹר",
          transliteration: "Acor",
          language: "ebraica",
          meaning:
            "tulburare, nenorocire. Numele văii unde Acan a fost pedepsit, joc de cuvinte cu numele său și cu tulburarea pe care păcatul lui a adus-o peste Israel.",
        },
      ],
      crossRefs: ["Osea 2:15", "1 Cronici 2:7"],
      forYourHeart:
        "Mărturisirea sinceră, chiar târzie, dă slavă lui Dumnezeu, dar nu poate întotdeauna înlătura consecințele deja puse în mișcare de păcat.",
    },
  ],
  prayer:
    "Doamne, cercetează-ne inimile și arată-ne păcatele ascunse pe care le-am îngropat sub aparența liniștii.\n\nÎnvață-ne că rugăciunea sinceră trebuie urmată de ascultare, nu doar de lacrimi.\n\nDă-ne curajul de a mărturisi repede, înainte ca păcatul să aducă tulburare peste alții din jurul nostru.\n\nȘi mulțumim că, după mărturisire și curățire, mânia Ta se potolește și biruința poate continua. Amin.",
  status: IOSUA_STATUSES[7],
})
