import { iosuaChapter, teaching } from "./iosuaHelpers.js"
import { iosuaPassage } from "./iosuaText.js"
import { IOSUA_STATUSES } from "./iosuaPublication.js"

export const IOSUA_20 = iosuaChapter({
  number: 20,
  title: "Iosua 20 — Cetățile de refugiu",
  summary:
    "DOMNUL îi poruncește lui Iosua să stabilească cetățile de refugiu, unde cel care a ucis fără voie pe cineva se poate adăposti de răzbunarea răzbunătorului sângelui, până la judecata cinstită a adunării și moartea marelui preot.",
  literaryContext:
    "Această instituție, poruncită deja în Numeri 35 și Deuteronom 19, este împlinită acum efectiv în țara Canaanului. Este un semn că sistemul de dreptate al lui Israel nu este doar despre pedepsire, ci și despre protecția celui nevinovat.",
  historicalContext:
    "Cele șase cetăți de refugiu — trei la răsărit de Iordan, trei la apus — erau distribuite strategic pentru a fi accesibile din orice colț al țării, arătând o grijă practică pentru dreptate rapidă și accesibilă.",
  units: [
    {
      id: "iosua-20-1-9",
      ref: "Iosua 20:1-9",
      heading: "Instituirea cetăților de refugiu",
      text: iosuaPassage(20, 1, 9),
      teaching: teaching(
        "DOMNUL îi amintește lui Iosua porunca deja dată prin Moise: să se stabilească cetăți de refugiu „pentru ca ucigătorul care va omorî pe cineva fără voie și fără să aibă vreun gând să-l omoare să poată fugi acolo”. Distincția dintre omorul din neațență și crima cu intenție este esențială în această lege.",
        "Procedura descrisă este cinstită: cel care fuge trebuie să explice cauza la poarta cetății, bătrânii îl primesc și îi dau un loc, apoi, dacă răzbunătorul sângelui îl urmărește, cetatea nu-l poate da pe mâna lui fără o judecată dreaptă înaintea adunării.",
        "Eliberarea deplină vine doar la moartea marelui preot aflat în funcție în acea vreme — un detaliu care, prin analogie, prefigurează modul în care moartea Marelui Preot ceresc aduce eliberare deplină pentru cei adăpostiți în El.",
      ),
      crossRefs: ["Numeri 35:9-15", "Deuteronom 19:1-10", "Evrei 6:18"],
      forYourHeart:
        "Dumnezeu face distincție între greșeală și răutate premeditată; sistemul Său de dreptate prevede întotdeauna un loc de refugiu pentru cel care caută adăpost sincer.",
    },
  ],
  prayer:
    "Doamne, mulțumim că ai pregătit întotdeauna un loc de refugiu pentru cei care fug la Tine cu sinceritate.\n\nÎnvață-ne să facem distincție între greșeală și răutate, așa cum ai făcut Tu în această lege.\n\nDă-ne o inimă dreaptă, care să caute judecata cinstită înainte de răzbunare.\n\nȘi mulțumim că prin moartea Marelui nostru Preot, Isus, avem eliberare deplină și veșnică. Amin.",
  status: IOSUA_STATUSES[20],
})
