import { samuel1Chapter, teaching } from "./samuel1Helpers.js"
import { samuel1Passage } from "./samuel1Text.js"
import { SAMUEL1_STATUSES } from "./samuel1Publication.js"

/*
 * Explicație construită din textul Biblia Emanus și din temele tratate
 * în .research/poonen-through-the-bible-OT/transcripts/samuel-1.txt.
 */
export const SAMUEL1_1 = samuel1Chapter({
  number: 1,
  title: "1 Samuel 1 — Ana: o rugăciune care trece de la nevoia ei la nevoia lui Dumnezeu",
  summary: "Ana, apăsată de sterilitate și de provocările Peninei, își varsă sufletul înaintea DOMNULUI și Îi promite că fiul cerut Îi va aparține. DOMNUL Își aduce aminte de ea, Samuel se naște, iar Ana își ține promisiunea și îl aduce la Silo.",
  literaryContext: "Cartea începe cu nașterea omului care va face legătura dintre epoca judecătorilor și împărăția lui David. Poonen urmărește în special rugăciunea Anei și schimbarea centrului ei de greutate: de la dorința unui fiu pentru sine la oferirea unui fiu pentru lucrarea lui Dumnezeu.",
  historicalContext: "Ana trăiește într-o vreme în care sterilitatea îi aducea multă rușine socială. Pelerinajul anual la Silo și promisiunea nazireatului așază rugăciunea ei în cadrul închinării și consacrării lui Israel.",
  units: [
    {
      id: "1-samuel-1-1-8",
      ref: "1 Samuel 1:1-8",
      heading: "Durerea care o împinge pe Ana să-L caute pe Dumnezeu",
      text: samuel1Passage(1, 1, 8),
      teaching: teaching(
        "Poonen așază pe Ana alături de Sara, Rebeca și Rahela: femei a căror sterilitate le-a împins spre rugăciune stăruitoare, iar copiii primiți au avut un loc deosebit în planul lui Dumnezeu.",
        "Samuel nu apare dintr-un proiect omenesc de afirmare, ci din ani de durere și rugăciune. Atmosfera începutului vieții lui este una în care mama sa Îl caută serios pe Dumnezeu.",
      ),
      crossRefs: ["Geneza 21:1-2", "Geneza 25:21", "Geneza 30:22-24"],
      forYourHeart: "Durerea nu trebuie lăsată să te închidă în tine. Ea poate deveni locul în care Îl cauți pe Dumnezeu cu mai multă seriozitate.",
    },
    {
      id: "1-samuel-1-9-18",
      ref: "1 Samuel 1:9-18",
      heading: "Rugăciunea își schimbă centrul",
      text: samuel1Passage(1, 9, 18),
      teaching: teaching(
        "Ana cere un fiu, dar în juruința ei se vede o schimbare: copilul nu va fi păstrat ca răspuns privat la rușinea ei, ci va fi dat DOMNULUI pentru toate zilele vieții lui.",
        "Poonen subliniază că rugăciunea ei trece de la «nevoia mea» la nevoia lucrării lui Dumnezeu într-un Israel aflat în dezordine. Rugăciunea matură nu ignoră durerea personală, dar o așază în scopul lui Dumnezeu.",
        "Eli o judecă greșit, însă Ana răspunde cu respect și explică faptul că își varsă sufletul înaintea DOMNULUI.",
      ),
      words: [
        {
          original: "יְהוָה צְבָאוֹת",
          transliteration: "YHWH Țevaot",
          language: "ebraica",
          meaning: "DOMNUL oștirilor. Titlul divin apare aici pentru prima dată în Vechiul Testament și Îl prezintă pe DOMNUL ca Stăpân al tuturor oștirilor.",
        },
      ],
      crossRefs: ["Matei 6:9-10"],
      forYourHeart: "În rugăciune, spune-I lui Dumnezeu nevoia ta, apoi întreabă cum poate răspunsul să slujească numelui și lucrării Lui.",
    },
    {
      id: "1-samuel-1-19-28",
      ref: "1 Samuel 1:19-28",
      heading: "Copilul cerut este dat DOMNULUI",
      text: samuel1Passage(1, 19, 28),
      teaching: teaching(
        "DOMNUL Își aduce aminte de Ana, iar ea îi pune copilului numele Samuel, legând nașterea lui de faptul că l-a cerut de la DOMNUL.",
        "Ana nu uită ce a promis după ce primește răspunsul. După înțărcare îl aduce la Silo și mărturisește: «pentru copilul acesta mă rugam». Poonen accentuează fidelitatea ei: nu îl ia înapoi, ci îl încredințează lui Dumnezeu.",
        "Samuel începe viața sub influența unei mame care s-a rugat, și-a ținut cuvântul și l-a învățat să se închine.",
      ),
      words: [
        {
          original: "שְׁמוּאֵל",
          transliteration: "Șemu'el",
          language: "ebraica",
          meaning: "Samuel. Narațiunea leagă numele de cererea adresată DOMNULUI; formularea explică sensul povestirii fără a transforma aceasta într-o etimologie sigură.",
        },
      ],
      crossRefs: ["1 Samuel 2:18-21"],
      forYourHeart: "Nu uita promisiunile făcute în vremea durerii după ce primești răspunsul.",
    },
  ],
  prayer: "Doamne, învață-ne să ne vărsăm sufletul înaintea Ta și să mutăm centrul rugăciunii de la noi spre numele și lucrarea Ta.\n\nDă-ne fidelitatea Anei, ca să păstrăm promisiunile făcute și să-Ți încredințăm darurile primite. Amin.",
  status: SAMUEL1_STATUSES[1],
})
