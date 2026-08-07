import { iosuaChapter, teaching } from "./iosuaHelpers.js"
import { iosuaPassage } from "./iosuaText.js"
import { IOSUA_STATUSES } from "./iosuaPublication.js"

export const IOSUA_3 = iosuaChapter({
  number: 3,
  title: "Iosua 3 — Trecerea Iordanului",
  summary:
    "Israel se pregătește să treacă Iordanul, care este revărsat peste maluri în vremea secerișului. Preoții duc chivotul legământului în fața poporului; de îndată ce picioarele lor ating apa, aceasta se oprește, iar poporul trece pe uscat, la fel ca la Marea Roșie.",
  literaryContext:
    "Trecerea Iordanului repetă în mod deliberat trecerea Mării Roșii din Exod 14, dar cu diferențe semnificative: acum chivotul, nu toiagul lui Moise, este centrul minunii, iar preoții, nu Moise, sunt cei care stau nemișcați în mijlocul râului. Este o confirmare publică pentru întreaga generație nouă că DOMNUL este cu Iosua așa cum a fost cu Moise.",
  historicalContext:
    "Iordanul, revărsat peste maluri primăvara, la topirea zăpezilor din munții Hermon, era de netrecut prin mijloace obișnuite. Traversarea lui într-un asemenea moment face minunea și mai vizibilă pentru popoarele din jur, care vor auzi despre ea (Iosua 5:1).",
  units: [
    {
      id: "iosua-3-1-6",
      ref: "Iosua 3:1-6",
      heading: "Pregătirea poporului și porunca de a urma chivotul",
      text: iosuaPassage(3, 1, 6),
      teaching: teaching(
        "Poporul se mută de la Șitim la Iordan și rămâne acolo trei zile înainte de trecere. Căpeteniile dau porunca esențială: „când veți vedea chivotul legământului DOMNULUI, Dumnezeul vostru, dus de preoți, leviți, să porniți și voi de la locul vostru și să mergeți după el”.",
        "Se cere o distanță de aproape două mii de coți între popor și chivot, „ca să știți drumul pe care trebuie să mergeți, căci n-ați mai trecut pe drumul acesta până acum”. Distanța nu este un semn de teamă, ci de respect: chivotul, semnul prezenței DOMNULUI, are nevoie de spațiu sacru în jurul lui.",
        "Iosua le poruncește poporului: „sfințiți-vă, căci mâine DOMNUL va face lucruri minunate în mijlocul vostru”. Minunea care va urma cere o pregătire lăuntrică, nu doar fizică — un tipar care se va repeta înainte de fiecare intervenție mare a lui Dumnezeu în carte.",
      ),
      crossRefs: ["Exod 19:10-11", "Numeri 4:15"],
      forYourHeart:
        "Dumnezeu cere sfințire înainte de minune, nu ca o condiție arbitrară, ci pentru ca inima să fie pregătită să recunoască mâna Lui atunci când vine.",
    },
    {
      id: "iosua-3-7-13",
      ref: "Iosua 3:7-13",
      heading: "DOMNUL îl înalță pe Iosua înaintea poporului",
      text: iosuaPassage(3, 7, 13),
      teaching: teaching(
        "DOMNUL îi spune lui Iosua: „astăzi voi începe să te înalț înaintea întregului Israel, ca să știe că voi fi cu tine cum am fost cu Moise”. Autoritatea lui Iosua nu este autoproclamată, ci confirmată public de Dumnezeu, prin aceeași putere care a despărțit Marea Roșie.",
        "Semnul dat poporului este limpede formulat dinainte: de îndată ce tălpile picioarelor preoților care duc chivotul se vor odihni în apele Iordanului, apele de sus se vor opri și se vor ridica „grămadă”. Minunea este anunțată înainte de a se întâmpla, ca să nu poată fi confundată cu o coincidență naturală.",
        "Titulatura folosită pentru DOMNUL în acest pasaj — „Domnul întregului pământ” — subliniază că nu doar Israel, ci întreaga țară a Canaanului, cu toate popoarele ei, se află sub stăpânirea Celui care va despărți apele.",
      ),
      words: [
        {
          original: "אֲדוֹן כָּל־הָאָרֶץ",
          transliteration: "Adon kol-ha'arets",
          language: "ebraica",
          meaning:
            "Domnul întregului pământ. Titlu folosit de trei ori în acest capitol pentru chivot, subliniind suveranitatea universală a lui Dumnezeu asupra țării pe care Israel urmează să o cucerească.",
        },
      ],
      crossRefs: ["Exod 14:21-22", "Iosua 4:14"],
      forYourHeart:
        "Dumnezeu confirmă public conducătorii pe care i-a chemat, ca poporul Lui să nu se îndoiască de cine merge înaintea lor.",
    },
    {
      id: "iosua-3-14-17",
      ref: "Iosua 3:14-17",
      heading: "Trecerea propriu-zisă: apele se opresc",
      text: iosuaPassage(3, 14, 17),
      teaching: teaching(
        "Textul notează cu precizie: Iordanul era revărsat peste toate malurile lui tot timpul secerișului — momentul cel mai puțin propice pentru o traversare naturală. Dumnezeu alege tocmai acest moment pentru a-Și arăta puterea.",
        "De îndată ce picioarele preoților ating marginea apei, apele „care se coborau din sus s-au oprit și s-au ridicat grămadă la o foarte mare depărtare”, în timp ce apele de la vale s-au scurs spre Marea Sărată. Minunea desparte în două direcții, nu doar oprește curgerea.",
        "Preoții stau „neclintiți pe uscat, în mijlocul Iordanului”, iar tot Israel trece „pe uscat”, întocmai ca la Marea Roșie. Repetarea exactă a limbajului din Exod 14 leagă cele două generații: cea care a ieșit din Egipt și cea care intră acum în Canaan, sub același Dumnezeu credincios.",
      ),
      crossRefs: ["Exod 14:29", "Psalmul 114:3-5"],
      forYourHeart:
        "DOMNUL alege adesea tocmai momentul cel mai neprielnic, omenește vorbind, pentru a-Și arăta cel mai limpede puterea.",
    },
  ],
  prayer:
    "Doamne, Tu ești Domnul întregului pământ, iar apele cele mai revărsate se opresc la porunca Ta.\n\nÎnvață-ne să ne sfințim înainte de minunile pe care le pregătești pentru noi.\n\nConfirmă și astăzi conducătorii pe care i-ai chemat, ca poporul Tău să meargă cu încredere.\n\nȘi ajută-ne să credem că ești cu noi la fel de aproape cum ai fost cu cei dinaintea noastră. Amin.",
  status: IOSUA_STATUSES[3],
})
