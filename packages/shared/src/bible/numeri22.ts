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

export const NUMERI_22 = numeriChapter({
  number: 22,
  title: "Numeri 22 — Balac, Balaam și măgărița care vorbește",
  summary:
    "Speriat de numărul lui Israel, Balac, împăratul Moabului, îl cheamă pe ghicitorul Balaam să blesteme poporul. Dumnezeu îi interzice lui Balaam să meargă, apoi îi îngăduie să meargă, dar cu o restricție strictă: să spună doar ce-i va spune DOMNUL. Pe drum, măgărița lui Balaam vede un înger înarmat pe care călărețul lui nu-l vede, iar mustrarea vine chiar din gura animalului.",
  literaryContext:
    "Începe un bloc narativ neobișnuit în Numeri: patru capitole (22-25) văzute din perspectiva dușmanilor lui Israel, nu a taberei israelite. Balaam devine unul dintre personajele cele mai complexe din Pentateuh — un profet păgân căruia DOMNUL Însăși îi vorbește direct, dar a cărui inimă rămâne atrasă de plata lui Balac.",
  historicalContext:
    "Descoperirile arheologice de la Deir Alla, în Iordania, confirmă că Balaam, fiul lui Beor, era cunoscut ca un văzut de renume dincolo de granițele lui Israel — o inscripție din secolul al VIII-lea î.Hr. îl menționează explicit ca primind viziuni de la zei. Faptul că Numeri 22 îl prezintă vorbind cu DOMNUL, Dumnezeul lui Israel, arată că puterea lui de a binecuvânta sau blestema depindea întotdeauna de Cine îi dădea de fapt cuvântul.",
  units: [
    {
      id: "numeri-22-1-4",
      ref: "Numeri 22:1-4",
      heading: "Frica Moabului față de Israel",
      text: numeriPassage(22, 1, 4),
      teaching: teaching(
        "Israel tăbărăște în câmpiile Moabului, dincolo de Iordan, în fața Ierihonului — ultima tabără din carte și locul de unde va porni, mai târziu, cucerirea Canaanului. Balac vede ce făcuse Israel amoriților și este cuprins de groază — „Moabul a fost cuprins de groază din pricina fiilor lui Israel”.",
        "Frica lui îl duce să caute aliați la Madian, chiar dacă nu avusese conflict direct cu Israel. Metafora lui — „cum înghițe boul iarba de pe câmp” — arată percepția unei forțe irezistibile, deși, de fapt, DOMNUL îi poruncise deja lui Israel să nu atace Moabul.",
      ),
      words: [],
      crossRefs: ["Deuteronom 2:9"],
      forYourHeart:
        "Frica de poporul lui Dumnezeu se poate năște din percepția greșită a intențiilor Lui; Moab nu avea de ce se teamă, dar necredința vede peste tot amenințare.",
    },
    {
      id: "numeri-22-5-12",
      ref: "Numeri 22:5-12",
      heading: "Prima solie și refuzul lui Dumnezeu",
      text: numeriPassage(22, 5, 12),
      teaching: teaching(
        "Balac îl trimite pe Balaam, un ghicitor renumit din Petor, cu o cerere clară: „blestemă-mi pe poporul acesta”, bazată pe convingerea că cine binecuvântează sau blestemă Balaam este cu adevărat afectat de acele cuvinte.",
        "Balaam nu acționează impulsiv, ci cere un răspuns de la DOMNUL — dovadă că recunoaște o autoritate divină reală, dincolo de propriile lui practici de ghicire. Dumnezeu vine chiar la el și îi dă un răspuns hotărât: „să nu te duci cu ei; să nu blestemi poporul acela, căci este binecuvântat!”",
        "Refuzul lui Dumnezeu este absolut la acest prim pas: nu e o negociere, ci un „nu” simplu, pentru că Israel era deja sub binecuvântarea Lui și niciun blestem omenesc nu putea schimba acest fapt.",
      ),
      words: [],
      crossRefs: ["Geneza 12:3"],
      forYourHeart:
        "Nimeni nu poate blestema ce Dumnezeu a binecuvântat; identitatea poporului lui Dumnezeu nu atârnă de vorbele vreunui ghicitor plătit.",
    },
    {
      id: "numeri-22-13-20",
      ref: "Numeri 22:13-20",
      heading: "A doua solie și îngăduința condiționată",
      text: numeriPassage(22, 13, 20),
      teaching: teaching(
        "Balaam refuză corect prima cerere, dar Balac nu se dă bătut și trimite „mai mulți și mai cu vază” fruntași, cu promisiunea unor „mari cinste”. Răspunsul lui Balaam sună nobil: „dacă mi-ar da Balac casa lui plină cu argint și aur, tot nu aș putea să calc porunca DOMNULUI”.",
        "Totuși, în loc să trimită solii înapoi definitiv, Balaam îi invită să rămână peste noapte din nou — un semn subtil că vrea să vadă dacă DOMNUL îi va schimba răspunsul. De data aceasta, Dumnezeu îi permite să meargă, dar cu o condiție strictă: „să faci numai ce-ți voi spune!”",
        "Îngaduința lui Dumnezeu nu este o răzgândire despre Israel, ci o permisiune de a merge fizic, în timp ce cuvântul rămane sub control divin absolut. Textul arată pericolul de a insista pentru un răspuns diferit de cel deja primit clar.",
      ),
      words: [],
      crossRefs: ["2 Petru 2:15-16", "Iuda 1:11"],
      forYourHeart:
        "Când Dumnezeu a spus deja un „nu” clar, insistența de a căuta o altă călare, deși primim îngăduință să mergem, nu înseamnă că dorința noastră inițială a devenit corectă.",
    },
    {
      id: "numeri-22-21-27",
      ref: "Numeri 22:21-27",
      heading: "Măgărița și îngerul cu sabia",
      text: numeriPassage(22, 21, 27),
      teaching: teaching(
        "Balaam pleacă cu fruntasii Moabului, dar „mânia lui Dumnezeu S-a aprins pentru că plecase” — semn că motivația lui interioară, dincolo de permisiunea formală, nu era curată. Îngeru l DOMNULUI Se așează pe drum cu sabia scoasă, vizibil doar măgăriței.",
        "De trei ori animalul vede pericolul și se abate — pe câmp, lipindu-se de un zid și strângând piciorul lui Balaam, apoi culcându-se complet sub el — și de fiecare dată Balaam o bate, orb la realitatea spirituală pe care doar animalul o percepea.",
        "Contrastul este tăios: un ghicitor renumit, chemat să vadă și să vestească viitorul, este mai orb decât propria lui măgăriță față de prezența reală a îngerului DOMNULUI.",
      ),
      words: [],
      crossRefs: ["2 Petru 2:16"],
      forYourHeart:
        "Când inima merge într-o direcție greșită, chiar cu permisiune formală, discernământul spiritual se poate pierde — uneori mai puțin decât al unui animal supus.",
    },
    {
      id: "numeri-22-28-30",
      ref: "Numeri 22:28-30",
      heading: "Măgărița vorbește",
      text: numeriPassage(22, 28, 30),
      teaching: teaching(
        "DOMNUL deschide gura măgăriței și ea întreabă direct: „Ce ți-am făcut de m-ai bătut de trei ori?” Balaam, înfuriat, răspunde ca și cum ar fi normal să discute cu un animal: „dacă aș fi avut o sabie în mână, te-aș fi ucis acum!”",
        "Măgărița îi răspunde cu o întrebare retorică simplă dar devastatoare: nu a mai avut niciodată acest comportament înainte, deci abaterea ei trebuie să aibă o cauză reală. Balaam recunoaște fapt cinstit: „Nu.”",
      ),
      words: [],
      crossRefs: [],
      forYourHeart:
        "Uneori Dumnezeu folosește căi neobișnuite — chiar și un animal — pentru a ne opri din drumul greșit, atunci când suntem prea orbiți de furie ca să vedem adevărul evident.",
    },
    {
      id: "numeri-22-31-35",
      ref: "Numeri 22:31-35",
      heading: "Ochii lui Balaam se deschid",
      text: numeriPassage(22, 31, 35),
      teaching: teaching(
        "DOMNUL deschide ochii lui Balaam și el vede în sfârșit Îngeru l DOMNULUI cu sabia scoasă. Se pleacă imediat cu fața la pământ. Îngeru l îi explică grav: „drumul tău este un drum al pierzării înaintea Mea” — iar dacă măgărița nu s-ar fi abătut, Balaam ar fi fost ucis, nu animalul.",
        "Balaam recunoaște păcatul: „Am păcătuit, căci nu știam că Tu stai înaintea mea”, și se oferă să se întoarcă. Dar Îngeru l DOMNULUI îl trimite înainte, repetând aceeași restricție ca la început: „să rostești numai cuvântul pe care ți-l voi spune Eu!”",
        "Dumnezeu îngăduie călătoria fizică, dar controlează absolut cuvântul care va fi rostit — pregătind scena pentru binecuvântările care vor urma în capitolele 23-24, indiferent de intențiile lui Balac sau ale lui Balaam însuși.",
      ),
      words: [],
      crossRefs: [],
      forYourHeart:
        "Când recunoaștem greșeala, Dumnezeu nu ne întoarce mereu din drum, ci ne trimite înainte sub o ascultare mai strictă de cuvântul Lui.",
    },
    {
      id: "numeri-22-36-41",
      ref: "Numeri 22:36-41",
      heading: "Întâlnirea cu Balac",
      text: numeriPassage(22, 36, 41),
      teaching: teaching(
        "Balac îi iese în întâmpinare lui Balaam la hotarul Arnonului, aproape reproșându-i întârzierea: „oare nu pot eu să-ți dau cinste?” Balaam îi răspunde cu aceeași limită pe care i-a fost dată: „cuvântul pe care-l va pune Dumnezeu în gura mea, pe acela îl voi rosti”.",
        "Balac îl duce pe Balaam la Chiriat-Huțot, jertfește boi și oi, și în sfârșit îl suie la Bamot-Baal, un loc înalt de unde poate vedea „marginea poporului” — pregătind scena pentru primele cuvântări profetice ale lui Balaam, care vor veni în capitolul următor.",
      ),
      words: [],
      crossRefs: [],
      forYourHeart:
        "Chiar dacă ești chemat într-o situație plină de presiune și promisiuni de cinste, rămâi cu Balaam în acest moment: nu-ți aparține cuvântul pe care îl vei rosti — aparține Celui care ți l-a dat.",
    },
  ],
  prayer:
    "Doamne, dă-mi ochi care să Te vadă când îmi stai împotriva în drumul greșit, chiar dacă la început nu înțeleg de ce.\n\nPăzește-mă de a insista pentru un răspuns diferit de cel pe care mi l-ai dat deja clar, chiar dacă primesc apoi o îngăduință formală.\n\nÎnvață-mă să recunosc greșeala imediat, ca Balaam, dar să nu mă opresc acolo, ci să merg înainte sub ascultare mai strictă de Cuvântul Tău.\n\nȘi învață-mă că niciun cuvânt pe care îl rostesc nu este cu adevărat al meu, ci al Tău, dacă sunt slujînt Cuvântul Tău. Amin.",
  status: NUMERI_STATUSES[22],
})
