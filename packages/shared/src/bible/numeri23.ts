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

export const NUMERI_23 = numeriChapter({
  number: 23,
  title: "Numeri 23 — Primele două profeții de binecuvântare ale lui Balaam",
  summary:
    "Balac îl duce pe Balaam în două locuri diferite, cu jertfe pe câte șapte altare, sperând de fiecare dată să primească un blestem asupra lui Israel. De fiecare dată, DOMNUL pune în gura lui Balaam nu un blestem, ci o binecuvântare de necontestat, spunând că Dumnezeu nu poate fi manipulat, pentru că nu este „un om ca să mintă”.",
  literaryContext:
    "Cele patru profeții ale lui Balaam (două în acest capitol, două în cel următor) sunt scrise în formă poetică solemnă, deosebit de restul cărții. Structura repetitivă — ceremonie, cuvânt de la DOMNUL, pildă, reacția lui Balac — subliniază prin repetiție ideea centrală: indiferent de loc sau de numărul de încercări, răspunsul lui Dumnezeu rămâne același.",
  historicalContext:
    "Șapte altare și câte un taur și un berbec pe fiecare erau o jertfă masivă, tipică pentru un rege care voia să impresioneze zeitățile invocate de ghicitorul său. Practica lui Balac de a schimba locul de observație reflectă o credință păgână comună în Orientul Apropiat antic: puterea unui zeu sau spirit era considerată legată de un teritoriu geografic anume.",
  units: [
    {
      id: "numeri-23-1-6",
      ref: "Numeri 23:1-6",
      heading: "Prima ceremonie: șapte altare",
      text: numeriPassage(23, 1, 6),
      teaching: teaching(
        "Balaam pregătește scena cu grijă rituală: șapte altare, șapte tauri, șapte berbeci — un număr simbolic al desăvârșirii în tradițiile din regiune. Se retrage singur pe o colină pleșuvă, lăsându-l pe Balac lângă jertfe, în așteptarea unui cuvânt de la Cel pe care știa că nu-l poate controla.",
        "„Dumnezeu i-a ieșit în întâmpinare lui Balaam” — nu Balaam Îl invocă pe Dumnezeu prin ritual, ci Dumnezeu vine la el, inițiind El Însăși întâlnirea. Cuvântul pus în gura lui este simplu: „întoarce-te la Balac și așa să-i vorbești”, lăsând conținutul exact pentru momentul rostirii.",
      ),
      words: [],
      crossRefs: [],
      forYourHeart:
        "Ritualul și pregătirea nu forțează mana Dumnezeu să vorbească cum vrem noi; El vine când și cum vrea El, iar cuvântul rămâne în controlul Său până în ultima clipă.",
    },
    {
      id: "numeri-23-7-10",
      ref: "Numeri 23:7-10",
      heading: "Prima pildă: cum să blestem pe cel binecuvântat?",
      text: numeriPassage(23, 7, 10),
      teaching: teaching(
        "Balaam începe prin a expune direct motivul chemării lui: „Vino, blestemă-mi pe Iacov! Vino, denunță pe Israel!” — apoi răspunde cu o întrebare retorică care rezumă tot capitolul: „Cum să blestem pe cel pe care nu-l blestemă Dumnezeu?”",
        "El descrie Israel ca „un popor care locuiește deosebit și nu se numără printre neamuri” — o identitate de separație sfântă dată de DOMNUL, nu doar o descriere demografică. Profeția se încheie cu o dorință personală remarcabilă din gura unui păgân: „să mor de moartea celor drepți și sfârșitul meu să fie ca al lor!”",
      ),
      words: [],
      crossRefs: ["Exod 19:5-6", "2 Corinteni 6:14-17"],
      forYourHeart:
        "Nimeni din afară nu poate anula ceea ce Dumnezeu a stabilit deja ca binecuvântat; identitatea celor sfințiți de El este dincolo de puterea de blestem a oamenilor.",
    },
    {
      id: "numeri-23-11-12",
      ref: "Numeri 23:11-12",
      heading: "Prima frustrare a lui Balac",
      text: numeriPassage(23, 11, 12),
      teaching: teaching(
        "Balac se enervează imediat: „Ce mi-ai făcut? Te-am luat ca să-mi blestemi vrăjmașii, și iată că tu i-ai binecuvântat cu desăvârșire!” El nu înțelege că nu Balaam decisese conținutul, ci DOMNUL.",
        "Răspunsul lui Balaam este simplu și rămâne consecvent pe tot parcursul capitolelor: „nu trebuie oare să am grijă să rostesc ce pune DOMNUL în gura mea?” Chiar dacă inima lui, după cum se va vedea mai târziu în Numeri 31:16, nu era curată, gura lui a fost ținută sub control divin absolut.",
      ),
      words: [],
      crossRefs: ["Numeri 31:16"],
      forYourHeart:
        "Este posibil ca o inimă să nu fie întru totul supusă lui Dumnezeu, și totuși cuvintele să fie ținute perfect sub stăpânirea Lui, atunci când El a decis așa.",
    },
    {
      id: "numeri-23-13-17",
      ref: "Numeri 23:13-17",
      heading: "A doua ceremonie: câmpul Țofim",
      text: numeriPassage(23, 13, 17),
      teaching: teaching(
        "Balac schimbă locul, crezând că o perspectivă diferită — „il vei vedea numai o parte din el” — ar putea produce un rezultat diferit. Această logică trădează gândirea păgână: crede că puterea spirituală a lui Balaam ar fi legată de un loc sau de o perspectivă vizuală anume.",
        "Ritualul se repetă identic — șapte altare, șapte tauri, șapte berbeci — și din nou „DOMNUL i-a ieșit în întâmpinare lui Balaam”, inițiind din nou El Însăși întâlnirea, în aceeași formulă ca prima dată.",
      ),
      words: [],
      crossRefs: [],
      forYourHeart:
        "Repetarea unei încercări în condiții schimbate nu schimbă caracterul lui Dumnezeu; adevărul Său nu depinde de perspectiva din care este privit.",
    },
    {
      id: "numeri-23-18-24",
      ref: "Numeri 23:18-24",
      heading: "A doua pildă: Dumnezeu nu este un om ca să mintă",
      text: numeriPassage(23, 18, 24),
      teaching: teaching(
        "Această a doua profeție cuprinde una dintre cele mai puternice afirmații teologice din Pentateuh: „Dumnezeu nu este un om ca să mintă, nici un fiu al omului ca să-I pară rău. Ce a zis El, nu va face oare?” Aici se află fundamentul încrederii în orice făgăduință divină.",
        "Balaam declară că „El nu vede nicio nelegiuire în Iacov” — nu pentru că Israel era fără păcat, ci pentru că DOMNUL, prin legământul Său, alesese să nu țină seama de vina lor împotriva făgăduinței date părinților. Israel este descris cu putere de bivol sălbatic și forță de leu, iar „nu există descântec împotriva lui Iacov”.",
      ),
      words: [],
      crossRefs: ["Romani 8:1", "Evrei 6:17-18"],
      forYourHeart:
        "Nicio putere spirituală opusă nu poate anula făgăduința lui Dumnezeu față de poporul Său, pentru că El nu minte niciodată și nu-I pare rău de ceea ce a promis.",
    },
    {
      id: "numeri-23-25-26",
      ref: "Numeri 23:25-26",
      heading: "A doua frustrare a lui Balac",
      text: numeriPassage(23, 25, 26),
      teaching: teaching(
        "Balac reduce cererea: „dacă nu-l blestemi, cel puțin nu-l binecuvânta!” — sperând cel puțin la neutralitate. Dar neutralitatea nu este o opțiune când DOMNUL a decis deja să vorbească; Balaam repetă identic principiul de la prima frustrare: „tot ce va vorbi DOMNUL, aceea voi face”.",
      ),
      words: [],
      crossRefs: [],
      forYourHeart:
        "Nu există o cale de mijloc când Dumnezeu a hotărât să binecuvânteze; încercările de a reduce mărturia Lui la tăcere nu reușesc.",
    },
    {
      id: "numeri-23-27-30",
      ref: "Numeri 23:27-30",
      heading: "A treia încercare: vârful Peor",
      text: numeriPassage(23, 27, 30),
      teaching: teaching(
        "Fără să renunțe, Balac îl duce pe Balaam într-un al treilea loc, vârful Peor, cu speranța nouă: „poate va fi pe placul lui Dumnezeu să mi-l blestemi de acolo”. Acest vârf, Peor, va deveni tragic de important în capitolul 25, unde Israel însuși va păcătui prin idolatria lui Baal-Peor.",
        "Aceeași ceremonie se repetă a treia oară — șapte altare, șapte tauri, șapte berbeci — pregătind scena pentru cea mai lungă și cea mai plină dintre profețiile lui Balaam, care va urma în capitolul 24.",
      ),
      words: [],
      crossRefs: ["Numeri 25:1-3"],
      forYourHeart:
        "Persistența înșelăciunii nu se oprește la un singur refuz; dar nici perseverența în rău nu poate schimba răspunsul lui Dumnezeu.",
    },
  ],
  prayer:
    "Doamne, învață-mă să cred cu toată ființa că Tu nu ești un om ca să minți, nici un fiu al omului ca să-Ți pară rău de făgăduințele Tale.\n\nÎți mulțumesc că nicio putere din afară, oricât de insistentă, nu poate blestema ceea ce Tu ai binecuvântat.\n\nDă-mi o gură supusă Cuvântului Tău, ca a lui Balaam în aceste două profeții, chiar dacă inima are încă lupte de dus.\n\nȘi păzește-mi inima de a căuta o cale de mijloc când Tu ai vorbit deja limpede. Amin.",
  status: NUMERI_STATUSES[23],
})
