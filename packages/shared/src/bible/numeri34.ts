import { numeriChapter, teaching } from "./numeriHelpers.js"
import { numeriPassage } from "./numeriText.js"
import { NUMERI_STATUSES } from "./numeriPublication.js"

/*
 * Cartea Numeri, explicată pe unități de sens.
 *
 * Textul biblic: păstrat separat în numeriText.ts (fișierele numeriTextN.ts).
 * Explicația: scrisă pentru Emanus după cercetarea textului. Nu se copiază
 * formularea niciunui predicator sau comentator.
 */

export const NUMERI_34 = numeriChapter({
  number: 34,
  title: "Numeri 34 — Hotarele Canaanului și căpeteniile împărțirii",
  summary:
    "DOMNUL trece de la general la extrem de specific: definește cu exactitate hotarele țării făgăduite pe toate cele patru laturi, apoi numește oficial bărbații responsabili să supravegheze împărțirea ei — preotul Eleazar, Iosua și o căpetenie din fiecare seminție.",
  literaryContext:
    "Acest capitol închide întrebările despre teritoriu care au fost deschise în Numeri 32 (moștenirea de la est de Iordan) și în Numeri 26 (împărțirea prin sorți). Hotarele descrise aici corespund în mare cu țara pe care Iosua o va cuceri și o va împărți în cartea care îi porta numele.",
  historicalContext:
    "Hotarele menționate — pustia Țin și Edom la sud, Marea cea Mare (Mediterana) la apus, muntele Hor și intrarea Hamatului la nord, Iordanul și Marea Sărată la răsărit — defineau un teritoriu concret, cunoscut geografic, nu o promisiune abstractă.",
  units: [
    {
      id: "numeri-34-1-2",
      ref: "Numeri 34:1-2",
      heading: "Porunca DOMNULUI privind hotarele",
      text: numeriPassage(34, 1, 2),
      teaching: teaching(
        "DOMNUL îi poruncește lui Moise să definească hotarele exacte ale țării făgăduite înainte ca poporul să intre în ea. Această precizie geografică arată că făgăduința lui Dumnezeu nu era una vagă, ci una care putea fi trasă pe hartă, cu punct de început și de sfârșit.",
      ),
      words: [],
      crossRefs: ["Geneza 15:18-21"],
      forYourHeart:
        "Făgăduințele lui Dumnezeu nu sunt vagi sau nedefinite; El le împlinește cu aceeași precizie cu care le-a făcut.",
    },
    {
      id: "numeri-34-3-5",
      ref: "Numeri 34:3-5",
      heading: "Hotarul de sud",
      text: numeriPassage(34, 3, 5),
      teaching: teaching(
        "Hotarul de sud începe de la pustia Țin, de-a lungul Edomului, de la capătul Mării Sărate, trece prin urcușul Acrabim, Cadeș-Barnea, Hațar-Adar, Ațmon și se termină la pârâul Egiptului — același Cadeș-Barnea de unde iscoadele au fost trimise 38 de ani înainte, devenit acum doar un punct de rutină pe hotarul unei țări pe care Israel este pregătit să o intre.",
      ),
      words: [],
      crossRefs: ["Numeri 13:26"],
      forYourHeart:
        "Locurile care odată ne-au marcat printr-o greșeală pot deveni, cu timpul, simple repere pe drumul spre binecuvântarea pe care Dumnezeu ne-o dăruiește în cele din urmă.",
    },
    {
      id: "numeri-34-6",
      ref: "Numeri 34:6",
      heading: "Hotarul de apus",
      text: numeriPassage(34, 6, 6),
      teaching: teaching(
        "Hotarul de apus este cel mai simplu de definit: „Marea Cea Mare” — Mediterana — forma o barieră naturală clară, fără ambiguitate, arătând că nu toate hotarele făgăduinței necesitau explicații complicate.",
      ),
      words: [],
      crossRefs: [],
      forYourHeart:
        "Unele adevăruri ale lui Dumnezeu sunt la fel de clare și de sigure ca o coastă de mare, fără loc de îndoială.",
    },
    {
      id: "numeri-34-7-9",
      ref: "Numeri 34:7-9",
      heading: "Hotarul de nord",
      text: numeriPassage(34, 7, 9),
      teaching: teaching(
        "Hotarul de nord trece de la Marea cea Mare spre muntele Hor, intrarea Hamatului, Țedad, Zifron, până la Hațar-Enan — un traseu care marca limita nordică a teritoriului promis, extinzându-se mult mai la nord decât va fi vreodată controlat efectiv de regatele lui Israel și Iuda.",
      ),
      words: [],
      crossRefs: [],
      forYourHeart:
        "Făgăduința lui Dumnezeu poate fi mai mare decât ceea ce poporul Său va lua vreodată în deplinătate — limita ei o pune El, nu credincioșia noastră parțială.",
    },
    {
      id: "numeri-34-10-12",
      ref: "Numeri 34:10-12",
      heading: "Hotarul de răsărit și concluzia",
      text: numeriPassage(34, 10, 12),
      teaching: teaching(
        "Hotarul de răsărit se trasează de la Hațar-Enan la Șefam, se coboară spre Ribla, atinge coasta mării Chineret (Galileea) și se coboară pe Iordan până la Marea Sărată, închizând cercul complet: „Aceasta va fi țara voastră după hotarele ei de jur împrejur.”",
      ),
      words: [],
      crossRefs: [],
      forYourHeart:
        "Când Dumnezeu închide un cerc de făgăduință, nu lasă nimic ambiguu; hotarele Lui sunt complete și clare de jur împrejur.",
    },
    {
      id: "numeri-34-13-15",
      ref: "Numeri 34:13-15",
      heading: "Moștenirea celor nouă seminții și jumătate",
      text: numeriPassage(34, 13, 15),
      teaching: teaching(
        "Moise reamintește că această țară, cu toate hotarele ei precise, va fi împărțită doar între nouă seminții și jumătate, pentru că Ruben, Gad și jumătatea lui Manase și-au luat deja moștenirea dincolo de Iordan (Numeri 32) — o confirmare finală că aranjamentul negociat mai înainte rămâne valabil și este integrat armonios în planul general de împărțire.",
      ),
      words: [],
      crossRefs: ["Numeri 32:33"],
      forYourHeart:
        "Înțelegerile făcute cu înțelepciune în trecut nu trebuie desfăcute mai târziu, ci integrate cu grijă în planul mai larg al lui Dumnezeu.",
    },
    {
      id: "numeri-34-16-18",
      ref: "Numeri 34:16-18",
      heading: "Numirea lui Eleazar și Iosua",
      text: numeriPassage(34, 16, 18),
      teaching: teaching(
        "DOMNUL numește oficial doi oameni responsabili de împărțirea țării: preotul Eleazar, reprezentând autoritatea spirituală, și Iosua, fiul lui Nun, reprezentând autoritatea militară și de conducere care îl va succeda pe Moise. Alături de ei, o căpetenie din fiecare seminție va participa la procesul de împărțire.",
        "Această structură dublă — preoție și conducere, plus reprezentare tribală — asigură că nicio seminție nu va fi tratată nedrept și că împărțirea va avea binecuvântarea deopotrivă spirituală și administrativă.",
      ),
      words: [],
      crossRefs: ["Numeri 27:18-23"],
      forYourHeart:
        "Deciziile importante pentru o comunitate au nevoie de o structură echilibrată de responsabilitate, care să includă atenta reprezentare a tuturor părților implicate.",
    },
    {
      id: "numeri-34-19-29",
      ref: "Numeri 34:19-29",
      heading: "Numele celor zece căpetenii",
      text: numeriPassage(34, 19, 29),
      teaching: teaching(
        "Zece căpetenii sunt numite prin nume, una din fiecare seminție rămasă fără moștenire deja stabilită: Caleb din Iuda, Șemuel din Simeon, Elidad din Beniamin, Buki din Dan, Haniel din Manase, Kemuel din Efraim, Elițafan din Zabulon, Paltiel din Isahar, Ahihud din Așer și Pedahel din Neftali.",
        "Menționarea numelor concrete, exact ca la numărătorile din Numeri 1 și 26, arată din nou grija Scripturii pentru identitățile individuale: fiecare familie și seminție avea un reprezentant cu nume, nu doar o cifră statistică, la momentul împărțirii moștenirii finale.",
      ),
      words: [],
      crossRefs: ["Numeri 1:5-15", "Numeri 26:1-4"],
      forYourHeart:
        "În ochii lui Dumnezeu fiecare persoană implicată într-o lucrare importantă are un nume și o identitate proprie, nu este doar o cifră anonimă într-un plan mai mare.",
    },
  ],
  prayer:
    "Doamne, înțeleg că făgăduințele Tale au hotare precise și sigure, la fel de clare ca o coastă de mare, și învață-mă să le primesc cu încredere deplină.\n\nDă-mi înțelepciunea de a păstra cu grijă înțelegerile făcute cu alții și de a le integra armonios în planurile mai mari pe care le ai pentru noi.\n\nÎți mulțumesc că mă vezi cu nume și identitate proprie, nu doar ca pe o cifră într-un plan mare al lucrării Tale. Amin.",
  status: NUMERI_STATUSES[34],
})
