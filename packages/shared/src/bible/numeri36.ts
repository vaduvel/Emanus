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

export const NUMERI_36 = numeriChapter({
  number: 36,
  title: "Numeri 36 — Fiicele lui Țelofhad și păstrarea moștenirii",
  summary:
    "Capitolul final al Cărții Numeri rezolvă o îngrijorare practică ridicată de căpeteniile seminției lui Manase: dacă fiicele lui Țelofhad se căsătoresc în afara seminției, moștenirea lor s-ar pierde pentru Manase. DOMNUL dă o soluție care păstrează deopotrivă dreptul lor la moștenire și integritatea teritorială a semințiilor.",
  literaryContext:
    "Acest capitol închide Cărtea Numeri revenind la cazul fiicelor lui Țelofhad, deschis în Numeri 27:1-11, formând un cadru narativ care începe și se termină cu aceeași familie — o închidere elegantă care arată că fiecare lege dată în pustie avea consecințe practice concrete pentru viața reală a oamenilor.",
  historicalContext:
    "Ultimul verset localizează din nou toate aceste porunci „în câmpiile Moabului, lângă Iordan, în fața Ierihonului” — același loc final unde Israel se află pregătit să treacă în țara făgăduită, cu toate legile de moștenire deja clarificate.",
  units: [
    {
      id: "numeri-36-1-4",
      ref: "Numeri 36:1-4",
      heading: "Îngrijorarea căpeteniilor lui Manase",
      text: numeriPassage(36, 1, 4),
      teaching: teaching(
        "Căpeteniile familiei lui Galaad, din seminția lui Manase, aduc înaintea lui Moise o îngrijorare legitimă: dacă fiicele lui Țelofhad — care au primit deja moștenire în Numeri 27 — se căsătoresc cu bărbați din alte seminții, moștenirea lor „va fi luată din moștenirea părinților noștri și adăugată la moștenirea seminției în care vor fi primite”.",
        "Această îngrijorare arată că dreptul nou dat femeilor de a moșteni, oricât de necesar și drept în sine, crea o consecință practică neașteptată care putea eroda teritoriul original al fiecărei seminții de-a lungul generațiilor.",
      ),
      words: [],
      crossRefs: ["Numeri 27:1-11"],
      forYourHeart:
        "O lege dreaptă poate crea totuși consecințe practice neașteptate; înțelepciunea adevărată este să recunoști aceste consecințe și să le abordezi cu grijă, nu să anulezi dreptatea deja stabilită.",
    },
    {
      id: "numeri-36-5-9",
      ref: "Numeri 36:5-9",
      heading: "Porunca DOMNULUI: căsătorie în seminția tatălui",
      text: numeriPassage(36, 5, 9),
      teaching: teaching(
        "Moise confirmă imediat: „Seminția fiilor lui Iosif are dreptate”, și transmite soluția DOMNULUI: fiicele care moștenesc se pot căsători „cu cine vor voi” — nu li se restrânge libertatea de a-și alege partenerul — „numai să se căsătorească într-o familie din seminția tatălui lor”.",
        "Principiul general este repetat de două ori pentru claritate deplină: „nicio moștenire a fiilor lui Israel să nu se strămute de la o seminție la alta”. Soluția elegantă nu limitează libertatea femeilor, ci direcționează alegerea lor într-un cadru care protejează și moștenirea individuală, și integritatea teritorială colectivă.",
      ),
      words: [],
      crossRefs: ["Numeri 27:7-8"],
      forYourHeart:
        "Dumnezeu știe să împace drepturile individuale cu binele comunității, fără să sacrifice pe unul în favoarea celuilalt.",
    },
    {
      id: "numeri-36-10-12",
      ref: "Numeri 36:10-12",
      heading: "Ascultarea fiicelor lui Țelofhad",
      text: numeriPassage(36, 10, 12),
      teaching: teaching(
        "„Fiicele lui Țelofhad au făcut cum îi poruncise DOMNUL lui Moise” — Mahla, Țirța, Hogla, Milca și Noa se căsătoresc cu fiii fraților tatălui lor, din propria lor seminție, și moștenirea lor rămâne în familia tatălui.",
        "Această încheiere pașnică arată că cele cinci femei, care au avut curajul în Numeri 27 să ceară dreptate înaintea lui Moise, au arătat aceeași credincioșie și în ascultarea de porunca finală a DOMNULUI, fără protest și fără să-și piardă dreptul câștigat.",
      ),
      words: [],
      crossRefs: ["Numeri 27:1-7"],
      forYourHeart:
        "Cei care au curajul de a cere dreptate cu credință au și înțelepciunea de a asculta de rânduielile care le păstrează acea dreptate în armonie cu întreaga comunitate.",
    },
    {
      id: "numeri-36-13",
      ref: "Numeri 36:13",
      heading: "Concluzia Cărții Numeri",
      text: numeriPassage(36, 13, 13),
      teaching: teaching(
        "Ultimul verset al cărții încheie cu o formulă solemnă: „Acestea sunt poruncile și orânduirile pe care le-a dat DOMNUL prin Moise fiilor lui Israel în câmpiile Moabului, lângă Iordan, în fața Ierihonului.” Cartea Numeri, care a început cu numărătoarea unei generații condamnate să moară în pustie, se încheie cu o nouă generație pregătită, cu legi de dreptate și moștenire clarificate, la marginea țării făgăduite.",
        "Toată călătoria prin pustie, cu toate căderile și toate biruințele ei, converge într-un moment de așteptare plină de speranță: poporul stă pregătit, DOMNUL a vorbit clar prin Moise, și tot ce mai rămâne este pasul peste Iordan, care va fi istorisit în cartea Iosua.",
      ),
      words: [],
      crossRefs: ["Deuteronom 1:1-3", "Iosua 1:1-9"],
      forYourHeart:
        "Chiar după cele mai grele încercări ale drumului cu Dumnezeu, El aduce poporul Său la un loc de pregătire deplină, cu tot ce este necesar pentru pasul următor în făgăduință.",
    },
  ],
  prayer:
    "Doamne, învață-mă să recunosc că dreptatea și binele comunității nu trebuie să se afle în conflict, ci Tu ai înțelepciunea să le împaci pe amândouă.\n\nDă-mi curajul să cer ceea ce este drept, dar și înțelepciunea de a asculta de rânduielile care păstrează armonia în jurul meu.\n\nÎți mulțumesc că, după fiecare încercare a drumului cu Tine, mă aduci la un loc de pregătire deplină pentru pasul următor în făgăduință. Amin.",
  status: NUMERI_STATUSES[36],
})
