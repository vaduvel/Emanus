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

export const NUMERI_30 = numeriChapter({
  number: 30,
  title: "Numeri 30 — Legile jurămintelor",
  summary:
    "DOMNUL dă reguli precise despre valabilitatea jurămintelor și făgăduințelor: un bărbat este legat necondiționat de cuvântul lui, dar jurămintele unei femei necăsătorite sau căsătorite pot fi întărite sau desființate de tatăl sau soțul ei, în timp ce jurămintele văduvei sau ale femeii divorțate rămân întotdeauna valabile.",
  literaryContext:
    "Acest capitol scurt, dar dens juridic, se plasează imediat după calendarul jertfelor din Numeri 28-29, care menționa explicit jertfele aduse „pentru împlinirea unui jurământ” — legătura firească fiind cuvântul dat DOMNULUI, fie prin jertfă, fie prin făgăduință personală.",
  historicalContext:
    "În structura de familie a Israelului antic, tatăl unei fecioare și soțul unei femei căsătorite aveau autoritate legală asupra angajamentelor financiare și religioase ale acesteia, pentru că orice jurământ sau făgăduință putea afecta resursele și obligațiile întregii gospodării, nu doar ale persoanei care jura.",
  units: [
    {
      id: "numeri-30-1-2",
      ref: "Numeri 30:1-2",
      heading: "Legea de bază: cuvântul dat trebuie ținut",
      text: numeriPassage(30, 1, 2),
      teaching: teaching(
        "Moise transmite căpeteniilor semințiilor o poruncă clară și fără excepții pentru bărbați: „să nu-și calce cuvântul, ci să facă după tot ce i-a ieșit din gură”. Un jurământ făcut DOMNULUI este întotdeauna obligatoriu, fără mijloc de anulare din partea altcuiva.",
        "Această lege stabilește principiul general înaintea excepțiilor detaliate care urmează: sfințenia cuvântului dat este norma, iar situațiile speciale despre femeile aflate sub autoritatea unui tată sau soț sunt tratate ca excepții explicate, nu ca regula generală.",
      ),
      words: [],
      crossRefs: ["Deuteronom 23:21-23", "Eclesiastul 5:4-5"],
      forYourHeart:
        "Cuvântul dat lui Dumnezeu este sfânt și obligatoriu; sinceritatea unei făgăduințe se dovedește prin fidelitatea de a o îndeplini, nu prin ușurința de a o face.",
    },
    {
      id: "numeri-30-3-5",
      ref: "Numeri 30:3-5",
      heading: "Jurământul fecioarei în casa tatălui",
      text: numeriPassage(30, 3, 5),
      teaching: teaching(
        "O fecioară în casa tatălui ei putea face un jurământ, dar valabilitatea lui depindea de reacția tatălui: dacă acesta „va tăcea” când află, jurământul rămâne valabil; dar dacă se „va împotrivi” în ziua în care află, jurământul este anulat și „DOMNUL o va ierta”.",
        "Această lege nu diminuează valoarea cuvântului unei fecioare, ci recunoaște că, fiind încă sub autoritatea și responsabilitatea financiară a tatălui ei, angajamentul ei public necesita confirmarea celui care îi purta responsabilitatea legală.",
      ),
      words: [],
      crossRefs: [],
      forYourHeart:
        "Dumnezeu întâmpină cu înțelegere structurile de responsabilitate din familie, oferind iertare celor ale căror făgăduințe sunt anulate de cei care le portă răspunderea.",
    },
    {
      id: "numeri-30-6-8",
      ref: "Numeri 30:6-8",
      heading: "Jurământul femeii care se căsătorește",
      text: numeriPassage(30, 6, 8),
      teaching: teaching(
        "Dacă o femeie se căsătorește fiind deja legată printr-un jurământ făcut înainte — „o vorbă ieșită nechibzuit din buzele ei” — aceeași logică se transferă acum către soțul ei: tăcerea lui confirmă jurământul, împotrivirea lui îl anulează, iar DOMNUL o iartă.",
        "Această continuitate a autorității — de la tată la soț, la momentul căsătoriei — arată că responsabilitatea legală asupra făgăduințelor unei femei se transmite împreună cu tranziția ei dintr-o gospodărie în alta, nu se șterge sau se dublează.",
      ),
      words: [],
      crossRefs: [],
      forYourHeart:
        "Tranzițiile importante ale vieții vin adesea cu o schimbare a responsabilităților și angajamentelor pe care le porționăm; înțelepciunea este să le înțelegem, nu să le ignorăm.",
    },
    {
      id: "numeri-30-9",
      ref: "Numeri 30:9",
      heading: "Văduva și femeia divorțată",
      text: numeriPassage(30, 9, 9),
      teaching: teaching(
        "Pentru văduvă sau femeia divorțată, legea este simplă și directă: „tot ce și-a impus ea în mod ferm va rămâne valabil pentru ea”, fără vreo autoritate masculină care să poată anula angajamentul ei. Nemaifiind sub autoritatea unui tată sau soț, cuvântul ei este pe deplin al ei și pe deplin obligatoriu.",
      ),
      words: [],
      crossRefs: [],
      forYourHeart:
        "Când o persoană nu mai este sub autoritatea altcuiva pentru anumite decizii, responsabilitatea deplină a cuvântului ei revine direct asupra ei înaintea lui Dumnezeu.",
    },
    {
      id: "numeri-30-10-15",
      ref: "Numeri 30:10-15",
      heading: "Jurământul femeii căsătorite și puterea soțului",
      text: numeriPassage(30, 10, 15),
      teaching: teaching(
        "Pentru o femeie deja căsătorită, aceeași logică a tăcerii și împotrivirii se aplică din nou, dar textul adaugă un detaliu important: „dacă însă soțul ei tace din zi în zi”, el întărește astfel jurămintele ei prin tăcerea prelungită, dar „dacă le va desființa după un timp”, după ce deja tăcuse, atunci „el își va purta nelegiuirea” — nu ea.",
        "Această preciziune finală protejează femeia de o schimbare arbitrară de decizie a soțului: odată ce el a permis prin tăcere continuă ca jurământul să se întărească, el nu mai poate anula angajamentul ei mai târziu fără să-și asume el Însăși vina morală a acestei întorsături.",
      ),
      words: [],
      crossRefs: [],
      forYourHeart:
        "Autoritatea vine cu responsabilitate: cel care are puterea de a întări sau anula angajamentul altcuiva răspunde înaintea lui Dumnezeu pentru felul în care o folosește, mai ales dacă schimbă decizia târziu și pe nedrept.",
    },
    {
      id: "numeri-30-16",
      ref: "Numeri 30:16",
      heading: "Concluzia rânduielilor",
      text: numeriPassage(30, 16, 16),
      teaching: teaching(
        "Capitolul se încheie rezumând domeniul de aplicare al acestor legi: „între un bărbat și soția lui, între un tată și fiica lui în tinerețea ei, în casa tatălui ei” — confirmând că aceste reguli erau specifice relațiilor de familie, nu o regulă generală despre valoarea cuvântului unei femei în orice context.",
      ),
      words: [],
      crossRefs: [],
      forYourHeart:
        "Legile date de Dumnezeu înțeleg contextul real al relațiilor și responsabilităților umane, nu simplifică totul într-o singură regulă universală fără nuanță.",
    },
  ],
  prayer:
    "Doamne, învață-mă sfințenia cuvântului dat ție, ca să nu-mi calc niciodată făgăduințele făcute în fața Ta.\n\nDă-mi înțelepciune să-mi asum responsabilitatea deplină pentru cuvintele mele, mai ales atunci când am autoritate asupra deciziilor altora.\n\nÎți mulțumesc că iubești dreptatea în structurile de familie și că ești întotdeauna dispus să ierți când un jurământ este anulat pe cale dreaptă. Amin.",
  status: NUMERI_STATUSES[30],
})
