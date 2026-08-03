import type { BibleBook } from "./types.js"
import { fapteChapter, teaching } from "./fapteHelpers.js"
import { FAPTE_2 } from "./fapte2.js"
import { FAPTE_3 } from "./fapte3.js"
import { FAPTE_4 } from "./fapte4.js"
import { FAPTE_5 } from "./fapte5.js"
import { FAPTE_6 } from "./fapte6.js"
import { FAPTE_7 } from "./fapte7.js"
import { FAPTE_8 } from "./fapte8.js"
import { FAPTE_9 } from "./fapte9.js"
import { FAPTE_10 } from "./fapte10.js"
import { FAPTE_11 } from "./fapte11.js"
import { FAPTE_12 } from "./fapte12.js"
import { FAPTE_13 } from "./fapte13.js"
import { FAPTE_14 } from "./fapte14.js"
import { FAPTE_15 } from "./fapte15.js"
import { FAPTE_16 } from "./fapte16.js"
import { FAPTE_17 } from "./fapte17.js"
import { FAPTE_18 } from "./fapte18.js"
import { FAPTE_19 } from "./fapte19.js"
import { FAPTE_20 } from "./fapte20.js"
import { FAPTE_21 } from "./fapte21.js"
import { FAPTE_22 } from "./fapte22.js"
import { FAPTE_23 } from "./fapte23.js"
import { FAPTE_24 } from "./fapte24.js"
import { FAPTE_25 } from "./fapte25.js"
import { FAPTE_26 } from "./fapte26.js"
import { FAPTE_27 } from "./fapte27.js"
import { FAPTE_28 } from "./fapte28.js"

/*
 * Textul biblic este materializat separat din RCCV, cu sursa și hash-ul
 * declarate în docs/data/fapte-rccv-import.json.
 * Explicațiile redau în română, prin reformulare editorială, firul studiilor
 * verse-by-verse ale lui Zac Poonen. Daniel rămâne reviewerul uman final.
 */

const FAPTE_1 = fapteChapter({
  number: 1,
  title: "Fapte 1 — Veți primi putere și Îmi veți fi martori",
  summary: "Isus înviat îi pregătește pe ucenici pentru continuarea lucrării Sale prin Duhul Sfânt. Ei sunt chemați să aștepte puterea de sus, să mărturisească până la marginile pământului și să rămână uniți în rugăciune.",
  literaryContext: "Faptele continuă Evanghelia după Luca. Ceea ce Isus a început să facă și să învețe în trupul Său pământesc continuă acum prin Biserică, trupul Său spiritual.",
  historicalContext: "Înălțarea are loc după patruzeci de zile de arătări ale Domnului înviat. Ucenicii se întorc la Ierusalim, unde aproximativ o sută douăzeci de credincioși așteaptă împreună făgăduința Tatălui.",
  units: [
    {
      verses: [1, 5],
      heading: "Mai întâi a făcut, apoi a învățat",
      teaching: teaching(
        "Isus nu a predicat o viață pe care urma cândva să o trăiască. El a făcut și apoi a învățat. Poonen subliniază că slujirea creștină are autoritate atunci când cuvântul rostit este sprijinit de o viață de ascultare.",
        "Chiar și după înviere, tema centrală a Domnului este Împărăția lui Dumnezeu: stăpânirea Lui peste fiecare domeniu al vieții. Ucenicii nu sunt trimiși imediat, deși nevoia lumii este mare; trebuie mai întâi să aștepte puterea Duhului Sfânt.",
      ),
      crossRefs: ["Luca 24:44-49", "Ioan 14:12", "1 Corinteni 4:20"],
      forYourHeart: "Nu te grăbi să lucrezi pentru Dumnezeu prin energia ta. Lasă-L mai întâi să-ți formeze viața și caută puterea pe care numai Duhul Sfânt o poate da.",
    },
    {
      verses: [6, 11],
      heading: "Nu datele, ci puterea pentru mărturie",
      teaching: teaching(
        "Ucenicii încă se gândesc la o împărăție politică și întreabă despre vremuri. Isus le mută atenția de la cronologii la responsabilitatea prezentă: vor primi putere și Îi vor fi martori.",
        "Poonen avertizează împotriva poftei de a calcula datele revenirii lui Hristos. Ceea ce ni s-a dat să căutăm este plinătatea Duhului, o viață care Îl reprezintă pe Isus și o mărturie care pornește de aproape și ajunge până departe.",
      ),
      crossRefs: ["Matei 24:36", "1 Tesaloniceni 5:1-6", "Zaharia 4:6"],
      forYourHeart: "Întrebarea principală nu este «când?», ci «trăiesc astăzi ca martor al lui Isus prin puterea Duhului?»",
    },
    {
      verses: [12, 14],
      heading: "Un singur gând și rugăciune stăruitoare",
      teaching: teaching(
        "Credincioșii se întorc în ascultare și se dedică rugăciunii cu un singur gând. Poonen vede aici două condiții rare și prețioase: unitate reală și rugăciune perseverentă.",
        "Maria, frații lui Isus, femeile și apostolii așteaptă împreună. Relațiile naturale sau pozițiile anterioare nu înlocuiesc nevoia comună de har și de puterea Duhului.",
      ),
      crossRefs: ["Matei 18:19-20", "Efeseni 4:1-6", "Coloseni 4:2"],
      forYourHeart: "Caută împăcarea și roagă-te stăruitor cu oamenii pe care Dumnezeu i-a așezat lângă tine.",
    },
    {
      verses: [15, 26],
      heading: "O mărturie despre înviere",
      teaching: teaching(
        "Petru arată din Scriptură că locul rămas gol trebuia ocupat de un martor al învierii. Comunitatea se roagă Celui care cunoaște inimile și cere călăuzire.",
        "Tragerea la sorți apare aici înainte de revărsarea Duhului și nu mai devine metoda normală a Bisericii după Cincizecime. În Noul Legământ, Dumnezeu călăuzește prin Duhul, Scriptură și discernământul comunității.",
        "Moartea lui Iuda este prezentată ca avertisment despre iubirea banilor și împietrire, nu ca permisiune de a specula asupra fiecărui om care moare prin sinucidere. O persoană aflată în criză suicidară are nevoie imediată de protecție, prezență și ajutor competent.",
      ),
      crossRefs: ["Proverbe 16:33", "Romani 8:14", "Fapte 13:1-3"],
      forYourHeart: "Cere-I lui Dumnezeu să-ți cerceteze inima și nu lua decizii spirituale importante prin superstiție sau impuls.",
    },
  ],
  prayer: "Doamne Isuse, fă ca viața mea să susțină cuvintele mele. Umple-mă cu Duhul Sfânt, păzește-mă de curiozități fără rod și unește-mă cu frații mei în rugăciune. Fă-mă un martor credincios al învierii Tale. Amin.",
})

export const FAPTE: BibleBook = {
  id: "fapte",
  name: "Faptele Apostolilor",
  testament: "nt",
  order: 44,
  blurb: "Isus continuă să lucreze prin Biserica plină de Duhul Sfânt, ducând Evanghelia de la Ierusalim până la Roma.",
  chapters: [
    FAPTE_1,
    FAPTE_2,
    FAPTE_3,
    FAPTE_4,
    FAPTE_5,
    FAPTE_6,
    FAPTE_7,
    FAPTE_8,
    FAPTE_9,
    FAPTE_10,
    FAPTE_11,
    FAPTE_12,
    FAPTE_13,
    FAPTE_14,
    FAPTE_15,
    FAPTE_16,
    FAPTE_17,
    FAPTE_18,
    FAPTE_19,
    FAPTE_20,
    FAPTE_21,
    FAPTE_22,
    FAPTE_23,
    FAPTE_24,
    FAPTE_25,
    FAPTE_26,
    FAPTE_27,
    FAPTE_28,
  ],
}
