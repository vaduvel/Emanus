import type { BibleBook } from "./types.js"
import { galateniChapter, teaching } from "./galateniHelpers.js"
import { GALATENI_2 } from "./galateni2.js"
import { GALATENI_3 } from "./galateni3.js"
import { GALATENI_4 } from "./galateni4.js"
import { GALATENI_5 } from "./galateni5.js"
import { GALATENI_6 } from "./galateni6.js"

/*
 * Textul biblic este materializat separat din RCCV.
 * Explicațiile sunt redactate în română pe baza studiilor verse-by-verse
 * ale lui Zac Poonen, fără copiere 1:1. Daniel rămâne reviewerul final.
 */

const GALATENI_1 = galateniChapter({
  number: 1,
  title: "Galateni 1 — Evanghelia primită de la Hristos",
  summary: "Pavel își afirmă chemarea de la Dumnezeu, arată că Hristos ne izbăvește din veacul rău de acum și avertizează împotriva oricărei evanghelii care înlocuiește harul. Mărturia lui arată cum harul transformă un prigonitor într-un vestitor al credinței.",
  literaryContext: "Scrisoarea începe fără mulțumirea obișnuită, deoarece bisericile Galatiei se îndepărtau repede de Evanghelia harului. Pavel apără atât mesajul, cât și originea chemării sale.",
  historicalContext: "Învățători iudaizanți încercau să lege mântuirea și maturitatea creștină de circumcizie și de rânduielile Legii lui Moise. Pavel răspunde că autoritatea Evangheliei nu vine din aprobarea unui centru omenesc.",
  units: [
    {
      verses: [1, 5],
      heading: "Trimis de Dumnezeu, pentru slava Lui",
      teaching: teaching(
        "Pavel nu folosește titlul de apostol ca să obțină prestigiu, ci pentru ca bisericile să recunoască autoritatea mesajului primit de la Hristos. Chemarea spirituală nu este produsă de o funcție, un comitet sau o etichetă religioasă.",
        "Moartea și învierea lui Isus trebuie ținute împreună. Hristos S-a dat pentru păcatele noastre nu doar ca să ne ierte, ci ca să ne scoată din sistemul acestui veac rău și să ne aducă sub voia Tatălui.",
      ),
      crossRefs: ["Faptele 9:15-16", "1 Corinteni 15:3-4", "Efeseni 4:11-13"],
      forYourHeart: "Caută aprobarea lui Dumnezeu mai mult decât recunoașterea unui rol.",
    },
    {
      verses: [6, 10],
      heading: "O singură Evanghelie a harului",
      teaching: teaching(
        "Galatenii nu abandonau doar o doctrină, ci pe Dumnezeu Care îi chemase prin har. Orice mesaj care mută încrederea de la Hristos la ritual, merit personal sau supunere față de oameni falsifică Evanghelia.",
        "Harul nu este permisiunea de a trăi în păcat. El ne mântuiește fără meritul nostru și apoi ne întărește să ascultăm din inimă. Pavel refuză să adapteze adevărul ca să placă oamenilor.",
      ),
      crossRefs: ["Romani 6:14", "Faptele 20:24", "Iuda 3"],
      forYourHeart: "Verifică dacă mesajul pe care îl urmezi te leagă mai mult de Hristos sau de aprobarea oamenilor.",
    },
    {
      verses: [11, 17],
      heading: "Hristos descoperit prin Duhul",
      teaching: teaching(
        "Pavel a primit Evanghelia prin descoperirea lui Isus Hristos, nu ca pe o teorie transmisă mecanic. Studiul Scripturii este esențial, dar numai Duhul Sfânt deschide ochii inimii ca adevărul să devină viață.",
        "Harul nu a șters trecutul lui Pavel; l-a răscumpărat și l-a pus în slujba lui Dumnezeu. Chemarea nu i-a dat superioritate, ci l-a dus în dependență, retragere și ascultare.",
      ),
      crossRefs: ["Efeseni 1:17-18", "1 Corinteni 2:10-14", "1 Timotei 1:12-16"],
      forYourHeart: "Roagă-te ca Hristos să fie descoperit în tine, nu doar cunoscut intelectual.",
    },
    {
      verses: [18, 24],
      heading: "O viață care Îl face pe Dumnezeu slăvit",
      teaching: teaching(
        "Pavel nu își construiește identitatea prin apropierea de oameni importanți. El vizitează Ierusalimul, dar rămâne conștient că sursa chemării sale este Dumnezeu.",
        "Bisericile auzeau că fostul prigonitor vestea acum credința și Îl slăveau pe Dumnezeu. O mărturie sănătoasă nu atrage admirația spre persoană, ci arată puterea harului care schimbă viața.",
      ),
      crossRefs: ["Faptele 9:26-31", "1 Corinteni 15:9-10", "2 Corinteni 4:5"],
      forYourHeart: "Lasă schimbarea vieții tale să-L facă vizibil pe Dumnezeu, nu să-ți construiască o imagine.",
    },
  ],
  prayer: "Doamne Isuse, păstrează-mă în Evanghelia harului și eliberează-mă de dorința de a plăcea oamenilor. Descoperă-Te inimii mele și fă din viața mea o mărturie care Îl slăvește pe Tatăl. Amin.",
})

export const GALATENI: BibleBook = {
  id: "galateni",
  name: "Galateni",
  testament: "nt",
  order: 48,
  blurb: "Evanghelia harului ne eliberează de justificarea prin Lege și ne conduce, prin Duhul, într-o viață de credință, dragoste și cruce.",
  chapters: [
    GALATENI_1,
    GALATENI_2,
    GALATENI_3,
    GALATENI_4,
    GALATENI_5,
    GALATENI_6,
  ],
}
