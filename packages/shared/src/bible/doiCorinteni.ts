import type { BibleBook } from "./types.js"
import { doiCorinteniChapter, teaching } from "./doiCorinteniHelpers.js"
import { DOI_CORINTENI_2 } from "./doiCorinteni2.js"
import { DOI_CORINTENI_3 } from "./doiCorinteni3.js"
import { DOI_CORINTENI_4 } from "./doiCorinteni4.js"
import { DOI_CORINTENI_5 } from "./doiCorinteni5.js"
import { DOI_CORINTENI_6 } from "./doiCorinteni6.js"
import { DOI_CORINTENI_7 } from "./doiCorinteni7.js"
import { DOI_CORINTENI_8 } from "./doiCorinteni8.js"
import { DOI_CORINTENI_9 } from "./doiCorinteni9.js"
import { DOI_CORINTENI_10 } from "./doiCorinteni10.js"
import { DOI_CORINTENI_11 } from "./doiCorinteni11.js"
import { DOI_CORINTENI_12 } from "./doiCorinteni12.js"
import { DOI_CORINTENI_13 } from "./doiCorinteni13.js"

/*
 * Textul biblic este materializat separat din RCCV.
 * Explicațiile sunt redactate în română pe baza studiilor verse-by-verse
 * ale lui Zac Poonen, fără copiere 1:1. Daniel rămâne reviewerul final.
 */

const DOI_CORINTENI_1 = doiCorinteniChapter({
  number: 1,
  title: "2 Corinteni 1 — Mângâiați ca să putem mângâia",
  summary: "Pavel Îl binecuvântează pe Dumnezeu, Tatăl îndurărilor, Care folosește chiar necazul pentru a forma slujitori capabili să-i mângâie pe alții. El își apără apoi transparența și arată că toate promisiunile lui Dumnezeu își găsesc răspunsul în Hristos.",
  literaryContext: "Scrisoarea începe personal, nu abstract. Pavel leagă suferința, rugăciunea comunității și integritatea slujirii de credincioșia lui Dumnezeu în Hristos.",
  historicalContext: "Relația dintre Pavel și corinteni trecuse prin tensiuni, schimbări de plan și o vizită dureroasă. El explică de ce nu a revenit imediat și refuză să conducă prin presiune.",
  units: [
    {
      verses: [1, 7],
      heading: "Dumnezeul oricărei mângâieri",
      teaching: teaching(
        "Pavel nu spune că necazul este bun în sine, ci că Dumnezeu poate face din el o școală a compasiunii. Mângâierea primită nu se termină la noi; ea ne pregătește să stăm lângă alții fără formule goale.",
        "Poonen accentuează că un slujitor folositor nu este format numai prin studiu, ci și prin situații în care sprijinul omenesc nu mai ajunge. Atunci cunoașterea lui Dumnezeu devine experiență, nu simplă teorie.",
      ),
      crossRefs: ["Psalmul 34:18", "Romani 8:17", "Evrei 4:15-16"],
      forYourHeart: "Nu minimaliza durerea altuia. Adu-i prezența și mângâierea pe care le-ai primit tu de la Dumnezeu.",
    },
    {
      verses: [8, 11],
      heading: "Eliberați dintr-o primejdie peste puteri",
      teaching: teaching(
        "Pavel descrie o apăsare atât de mare încât nu se mai bizuia pe sine, ci pe Dumnezeu Care învie morții. Credința nu neagă gravitatea crizei; ea mută centrul încrederii de la resursele proprii la Dumnezeu.",
        "Rugăciunile credincioșilor participă real la lucrare. Aceasta nu transformă rugăciunea într-o tehnică de control, ci într-o dependență comună de har.",
      ),
      crossRefs: ["Psalmul 107:4-6", "Fapte 12:5", "Iacov 5:16"],
      forYourHeart: "Când nu mai poți controla rezultatul, spune-I lui Dumnezeu adevărul și lasă comunitatea să se roage împreună cu tine.",
    },
    {
      verses: [12, 22],
      heading: "Da-ul lui Dumnezeu în Hristos",
      teaching: teaching(
        "Pavel își apără purtarea printr-o conștiință curată, nu prin abilitate politică. Un slujitor al noului legământ nu spune «da» și «nu» după interes, ci caută simplitatea și sinceritatea harului.",
        "Toate făgăduințele lui Dumnezeu sunt «Da» în Hristos. Duhul Sfânt este pecetea și arvuna lucrării viitoare, nu un instrument prin care liderul își legitimează orice decizie.",
      ),
      crossRefs: ["Matei 5:37", "Efeseni 1:13-14", "Evrei 10:23"],
      forYourHeart: "Întreabă-te dacă oamenii pot avea încredere în cuvântul tău chiar când adevărul te costă.",
    },
    {
      verses: [23, 24],
      heading: "Nu stăpâni peste credința altuia",
      teaching: teaching(
        "Pavel spune că a amânat vizita pentru a-i cruța. Autoritatea apostolică urmărește bucuria și maturizarea oamenilor, nu dependența lor de lider.",
        "Niciun conducător creștin nu primește dreptul de a controla conștiința, banii, relațiile sau deciziile personale ale altuia. Corectarea biblică nu autorizează manipularea, amenințarea ori abuzul spiritual.",
      ),
      crossRefs: ["Marcu 10:42-45", "1 Petru 5:2-3", "Galateni 5:1"],
      forYourHeart: "Primește îndrumarea, dar păstrează-L pe Hristos ca Domn al conștiinței tale.",
    },
  ],
  prayer: "Tată al îndurărilor, mângâie-mă în necaz și fă-mă capabil să-i mângâi pe alții. Curăță-mi cuvintele de ambiguitate și păzește-mă să nu domin credința nimănui. Amin.",
})

export const DOI_CORINTENI: BibleBook = {
  id: "2-corinteni",
  name: "2 Corinteni",
  testament: "nt",
  order: 47,
  blurb: "Puterea noului legământ se arată în slăbiciune, sinceritate, împăcare, dărnicie și harul suficient al lui Hristos.",
  chapters: [
    DOI_CORINTENI_1,
    DOI_CORINTENI_2,
    DOI_CORINTENI_3,
    DOI_CORINTENI_4,
    DOI_CORINTENI_5,
    DOI_CORINTENI_6,
    DOI_CORINTENI_7,
    DOI_CORINTENI_8,
    DOI_CORINTENI_9,
    DOI_CORINTENI_10,
    DOI_CORINTENI_11,
    DOI_CORINTENI_12,
    DOI_CORINTENI_13,
  ],
}
