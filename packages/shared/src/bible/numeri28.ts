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

export const NUMERI_28 = numeriChapter({
  number: 28,
  title: "Numeri 28 — Calendarul jertfelor DOMNULUI",
  summary:
    "Înainte de intrarea în Canaan, DOMNUL reamintește și extinde calendarul complet al jertfelor de foc: jertfa zilnică, jertfa Sabatului, jertfa lunii noi și jertfele Paștelui și ale Sărbătorii Azimelor, pregătind poporul să continue viața de adorări regulate în noua țară.",
  literaryContext:
    "Acest capitol și cel care urmează (Numeri 29) reiau și extind legile despre calendarul jertfelor deja date în Exod și Levitic, dar aici sunt reunite într-un singur loc, ca ultimă pregătire liturgică înainte de intrarea în țara făgăduită, unde ritmul jertfelor va continua neschimbat.",
  historicalContext:
    "Calendarul agricol și lunar al Israelului antic organiza întreaga viață religioasă în jurul acestor momente fixe — zilnic, săptămânal, lunar și anual — asigurând o continuitate a legăturii cu DOMNUL indiferent de circumstanțele externe ale poporului.",
  units: [
    {
      id: "numeri-28-1-2",
      ref: "Numeri 28:1-2",
      heading: "Porunca generală a ofrandelor",
      text: numeriPassage(28, 1, 2),
      teaching: teaching(
        "DOMNUL numește jertfele „Ofranda Mea, pâinea Mea pentru jertfele Mele mistuite de foc, de un miros plăcut Mie” — un limbaj personal, intim, care arată că aceste jertfe nu erau simple ritualuri, ci o hrană simbolică oferită DOMNULUI Însăși, la timpul rânduit de El.",
        "Accentul pe „timpul rânduit” pregătește întregul capitol: nu este vorba doar de ce anume se aduce, ci și când, arătând că fidelitatea în adorării cere disciplină a timpului, nu doar bunăvoință ocazională.",
      ),
      words: [],
      crossRefs: ["Levitic 3:16"],
      forYourHeart:
        "Dumnezeu primește adorările noastre ca o hrană personală, dar cere ca ele să vină la timpul potrivit, cu regularitate, nu doar când ne aducem aminte.",
    },
    {
      id: "numeri-28-3-8",
      ref: "Numeri 28:3-8",
      heading: "Arderea-de-tot perpetuă, zilnică",
      text: numeriPassage(28, 3, 8),
      teaching: teaching(
        "Fiecare zi, fără excepție, cerea doi miei de un an fără cusur — unul dimineața, unul spre seară — împreună cu darul de cereale și jertfa de turnare de băutură tare. Această jertfă era numită „perpetuă” pentru că marca ritmul zilnic constant al legăturii dintre Israel și DOMNUL.",
        "Fără această jertfă de bază, niciuna dintre jertfele suplimentare din restul capitolului — Sabat, lună nouă, sărbători — nu ar avea sens; toate se adaugă „pe lângă arderea-de-tot perpetuă”, nu în locul ei.",
      ),
      words: [],
      crossRefs: ["Exod 29:38-42"],
      forYourHeart:
        "Viața de închinare are nevoie de un ritm zilnic de bază, statornic și neschimbat, peste care se pot adăuga momente speciale, dar care nu înlocuiesc niciodată disciplina zilnică.",
    },
    {
      id: "numeri-28-9-10",
      ref: "Numeri 28:9-10",
      heading: "Jertfa dublă a Sabatului",
      text: numeriPassage(28, 9, 10),
      teaching: teaching(
        "În ziua Sabatului, jertfa se dublează: doi miei suplimentari, pe lângă arderea-de-tot perpetuă zilnică, și două zecimi de efa de făină aleasă, tot dublu față de restul săptămânii — o cinstire proporională a zilei de odihnă sfințite de DOMNUL.",
      ),
      words: [],
      crossRefs: ["Exod 20:8-11"],
      forYourHeart:
        "Ziua de odihnă sfințită DOMNULUI merită o cinstire mai mare, nu una redusă, chiar dacă este o zi de încetare a lucrului obișnuit.",
    },
    {
      id: "numeri-28-11-15",
      ref: "Numeri 28:11-15",
      heading: "Jertfa lunii noi",
      text: numeriPassage(28, 11, 15),
      teaching: teaching(
        "La începutul fiecărei luni, jertfa crește și mai mult: doi taurini, un berbec și șapte miei, cu daruri de cereale proporționale pentru fiecare animal, plus un țap ca jertfă pentru păcat. Această scărare crescută — zilnic, săptămânal, lunar — arată un ritm liturgic bine structurat, care marca trecerea timpului cu recunoștință către DOMNUL.",
      ),
      words: [],
      crossRefs: ["Psalmul 81:3"],
      forYourHeart:
        "Fiecare nouă etapă de timp — fiecare lună nouă din viața noastră — poate fi întâmpinată cu recunoștință sporită față de DOMNUL, nu doar ca o trecere neobservată a calendarului.",
    },
    {
      id: "numeri-28-16-25",
      ref: "Numeri 28:16-25",
      heading: "Paștele și Sărbătoarea Azimelor",
      text: numeriPassage(28, 16, 25),
      teaching: teaching(
        "Paștele, în ziua a paisprezecea a primei luni, este urmat imediat de șapte zile de azime, începând și încheindu-se cu o „adunare sfântă” în care „nu veți face nicio lucrare de slujbă”. Fiecare din cele șapte zile cerea aceeași jertfă generoasă: doi taurini, un berbec, șapte miei și un țap pentru păcat, ca ispașire.",
        "Repetarea zilnică timp de șapte zile a acelorași jertfe ample arată că amintirea izbăvirii din Egipt nu era o singură clipă festivă, ci o săptămână întreagă de închinare susținută, împlinind gratitudinea pentru libertatea primă.",
      ),
      words: [],
      crossRefs: ["Exod 12:14-20", "Levitic 23:5-8"],
      forYourHeart:
        "Marea izbăvire pe care Dumnezeu a făcut-o pentru noi merită mai mult decât o zi de recunoștință — merită o viață întreagă trăită în amintirea ei constantă.",
    },
    {
      id: "numeri-28-26-31",
      ref: "Numeri 28:26-31",
      heading: "Sărbătoarea Săptămânilor și primele roduri",
      text: numeriPassage(28, 26, 31),
      teaching: teaching(
        "La Sărbătoarea Săptămânilor, când se aduce „darul de cereale nouă DOMNULUI” din prima recoltă, jertfele repetă aceeași structură generoasă văzută la Paște — doi taurini, un berbec, șapte miei, un țap pentru ispășire — alături de o adunare sfântă fără lucrare de slujbă.",
        "Prin recunoștință pentru prima recoltă, poporul recunoaște că rodul pământului nu este de la sine, ci un dar dat de DOMNUL, care merită să fie întâmpinat cu aceeași generozitate în jertfă ca și eliberarea din robie.",
      ),
      words: [],
      crossRefs: ["Levitic 23:15-21", "Fapte 2:1"],
      forYourHeart:
        "Recunoașterea că orice recoltă sau binecuvântare vine de la DOMNUL merită aceeași generozitate a recunoștinței ca și cea arătată pentru marile izbăviri din viață.",
    },
  ],
  prayer:
    "Doamne, învață-mă disciplina unei închinări zilnice constante, care nu se schimbă după dispoziția mea de moment.\n\nDă-mi recunoștință sporită la fiecare etapă nouă a vieții mele, așa cum Israel își sporea jertfa la fiecare lună nouă.\n\nAjută-mă să trăiesc amintirea marilor Tale izbăviri nu ca pe o singură clipă festivă, ci ca pe un ritm statornic al întregii mele vieți. Amin.",
  status: NUMERI_STATUSES[28],
})
