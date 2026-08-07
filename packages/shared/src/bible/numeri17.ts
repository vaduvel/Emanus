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

export const NUMERI_17 = numeriChapter({
  number: 17,
  title: "Numeri 17 — Toiagul lui Aaron care odrăslește",
  summary:
    "După două răzvrătiri consecutive împotriva preoției lui Aaron, DOMNUL rezolvă disputa printr-un semn fără posibilitate de contestare: doisprezece toiege uscate, câte unul pentru fiecare seminție, sunt puse peste noapte înaintea mărturiei, iar dimineața doar toiagul lui Aaron a înverzit, înflorit și a făcut migdale. Poporul, îngrozit, recunoaște în sfârșit primejdia de a se apropia fără chemare de lucrurile sfinte.",
  literaryContext:
    "Acest semn încheie firul narativ deschis în capitolul șaisprezece: dacă cădelnițele arse fuseseră un avertisment negativ, toiagul înverzit este confirmarea pozitivă, dată nu prin foc și moarte, ci prin viață și roadă. Împreună, cele două capitole închid definitiv orice contestare viitoare a preoției lui Aaron.",
  historicalContext:
    "Toiagul păstrat „înaintea mărturiei” avea să rămână în chivot alături de tablele legământului și vasul cu mană, conform Evrei 9:4, ca amintire permanentă a felului în care DOMNUL Însăși alesese preoția, nu poporul sau vreo dezbatere omenească.",
  units: [
    {
      id: "numeri-17-1-5",
      ref: "Numeri 17:1-5",
      heading: "Doisprezece toiege înaintea mărturiei",
      text: numeriPassage(17, 1, 5),
      teaching: teaching(
        "DOMNUL propune un test simplu, dar imposibil de falsificat: câte un toiag uscat de la fiecare căpetenie de seminție, cu numele scris pe el, iar pe toiagul lui Levi numele lui Aaron. Toate cele doisprezece sunt puse „înaintea mărturiei, unde Mă întâlnesc cu voi”, în cel mai sfânt loc accesibil oamenilor.",
        "Scopul declarat este limpede: „astfel voi face să înceteze dinaintea Mea cârtirile fiilor lui Israel”. După două răzvrătiri și mii de morți, DOMNUL alege să încheie disputa nu printr-o nouă judecată, ci printr-un semn de viață, dat gratuit, fără să mai ceară altă pedeapsă.",
      ),
      words: [],
      crossRefs: ["Numeri 16:5", "Evrei 9:4"],
      forYourHeart:
        "DOMNUL alege uneori să încheie o dispută îndelungată nu prin încă o judecată, ci printr-un semn de viață care nu lasă loc de îndoială.",
    },
    {
      id: "numeri-17-6-9",
      ref: "Numeri 17:6-9",
      heading: "Toiagul lui Aaron înverzește, înflorește și face migdale",
      text: numeriPassage(17, 6, 9),
      teaching: teaching(
        "Toate cele douăsprezece toiege sunt puse înaintea DOMNULUI, iar „toiagul lui Aaron era în mijlocul toiegelor lor” — fără niciun avantaj vizibil față de celelalte. Un toiag tăiat din lemn, uscat de multă vreme, nu poate înverzi prin nicio lege naturală.",
        "Minunea este descrisă în trei etape progresive: „înverzise, înflorise și făcuse migdale” — nu doar un semn de viață incipientă, ci rod copt, complet, într-o singură noapte. Această progresie întreagă exclude orice explicație naturală: era o lucrare directă a DOMNULUI, nu doar o creștere accelerată.",
      ),
      words: [
        {
          original: "שְׁקֵדִים",
          transliteration: "shqedim",
          language: "ebraica",
          meaning:
            "migdale. Cuvântul ebraic pentru migdal este înrudit cu verbul „a veghea, a fi treaz”, migdalul fiind primul copac care înflorește primăvara în Israel — un simbol potrivit pentru alegerea promptă și vie a DOMNULUI.",
        },
      ],
      crossRefs: ["Ieremia 1:11-12", "Evrei 9:4"],
      forYourHeart:
        "Când DOMNUL confirmă o chemare, o face fără ambiguitate; rodul viu și complet este semnul Său, nu o dovadă parțială sau ambălăieșe.",
    },
    {
      id: "numeri-17-10-11",
      ref: "Numeri 17:10-11",
      heading: "Toiagul păstrat ca un semn permanent",
      text: numeriPassage(17, 10, 11),
      teaching: teaching(
        "DOMNUL poruncește ca toiagul lui Aaron să nu fie doar arătat o dată, ci păstrat definitiv „înaintea mărturiei, ca un semn pentru fiii răzvrătiți”. Scopul dublă: “a pune capăt cârtirilor lor împotriva Mea și să nu moară” — semnul viu era protecție pentru popor, nu doar dovadă pentru Aaron.",
        "Moise ascultă imediat: „Moise a făcut așa; cum îi poruncise DOMNUL, așa a făcut”. Fraza scurtă și repetitivă subliniază ascultarea exactă, fără adăugiri sau omisiuni, care caracterizează slujirea lui Moise în fața fiecărei porunci a DOMNULUI.",
      ),
      words: [],
      crossRefs: ["Exod 40:16", "Evrei 9:4"],
      forYourHeart:
        "Un semn al harului lui Dumnezeu păstrat în timp poate proteja o generație întreagă de repetarea acelorași greșeli.",
    },
    {
      id: "numeri-17-12-13",
      ref: "Numeri 17:12-13",
      heading: "„Vom pieri noi oare toți?”",
      text: numeriPassage(17, 12, 13),
      teaching: teaching(
        "Abia acum, după două judecăți succesive și un semn fără echivoc, poporul ajunge în sfârșit la o înțelegere corectă a sfințeniei DOMNULUI: „iată, pierim, suntem pierduți, toți suntem pierduți! Oricine se apropie de Cortul DOMNULUI moare!”",
        "Această teamă nu este încă credință matură, ci recunoaștere târzie și îngrozită a unei realități pe care ar fi trebuit s-o înțeleagă mult mai devreme: apropierea de un Dumnezeu sfânt cere mediere rânduită de El, nu inițiativă omenească. Tocmai acest lucru va deschide, în capitolul următor, explicarea rolului distinct al preoților și levitiților.",
      ),
      words: [],
      crossRefs: ["Levitic 16:2", "Evrei 10:19-22"],
      forYourHeart:
        "Recunoașterea târzie a sfințeniei lui Dumnezeu poate naște teamă paralizantă; dar tocmai această teamă pregătește inima să prețuiască mijlocirea rânduită de El.",
    },
  ],
  prayer:
    "Doamne, mulțumesc-Ți că nu încetezi să confirmi chemarea celor pe care i-ai ales, printr-un semn de viață, nu doar prin judecată.\n\nÎnvață-mă ascultarea exactă a lui Moise, fără adăugiri și fără omisiuni față de porunca Ta.\n\nDă-mi o înțelegere sănătoasă a sfințeniei Tale, care să nu mă paralizeze de frică, ci să mă facă să prețuiesc mijlocirea pe care Tu Însăți ai rânduit-o. Amin.",
  status: NUMERI_STATUSES[17],
})
