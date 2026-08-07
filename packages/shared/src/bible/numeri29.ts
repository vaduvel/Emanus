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

export const NUMERI_29 = numeriChapter({
  number: 29,
  title: "Numeri 29 — Sărbătorile lunii a șaptea",
  summary:
    "Luna a șaptea concentrează cele mai importante sărbători ale anului: Ziua Sunării din Trâmbițe, Ziua Ispășirii cu smerirea sufletelor și Sărbătoarea Corturilor de șapte zile, încheiată cu o a opta zi de adunare solemnă. Fiecare zi cere jertfe specifice, iar capitolul se încheie cu ascultarea deplină a lui Moise și a poporului.",
  literaryContext:
    "Numeri 29 continuă direct calendarul de jertfe din capitolul 28, mutând atenția către cele mai solemne sărbători ale anului iudaic, concentrate în luna a șaptea (Tișri), care marca și începutul anului civil. Structura repetitivă a zilelor Sărbătorii Corturilor — cu numărul de tauri descăzând în fiecare zi — este deliberată, nu întâmplătoare.",
  historicalContext:
    "Ziua Sunării din Trâmbițe, Ziua Ispășirii (Yom Kippur) și Sărbătoarea Corturilor (Sucot) au rămas până astăzi cele trei mari sărbători ale toamnei în tradiția iudaică, marcând începutul anului nou, ziua ispășirii naționale și amintirea locuirii în corturi în pustie.",
  units: [
    {
      id: "numeri-29-1-6",
      ref: "Numeri 29:1-6",
      heading: "Ziua Sunării din Trâmbițe",
      text: numeriPassage(29, 1, 6),
      teaching: teaching(
        "Prima zi a lunii a șaptea aducea o adunare sfântă specială, „o zi de sunare din trâmbițe” — un semnal sonor puternic menit să marcheze începutul unei perioade solemne, chemând poporul la atenție și pregătire spirituală înainte de Ziua Ispășirii care urma.",
        "Jertfa acestei zile — un taur, un berbec, șapte miei, plus un țap pentru păcat — se aduce pe lângă arderea-de-tot a lunii noi și cea perpetuă, arătând că fiecare strat de jertfă se acumulează fără să înlocuiască pe cel anterior.",
      ),
      words: [],
      crossRefs: ["Levitic 23:23-25"],
      forYourHeart:
        "Sunetul trâmbiței ne cheamă la atenție și pregătire spirituală înainte de momentele cele mai solemne ale vieții noastre cu Dumnezeu.",
    },
    {
      id: "numeri-29-7-11",
      ref: "Numeri 29:7-11",
      heading: "Ziua Ispășirii și smerirea sufletelor",
      text: numeriPassage(29, 7, 11),
      teaching: teaching(
        "Ziua a zecea a lunii a șaptea cerea o cerință unică, nemenționată la celelalte sărbători: „să vă smeriți sufletele” — o umilire personală și colectivă, dincolo de simpla încetare a lucrului, cerută în ziua ispășirii naționale detaliată pe larg în Levitic 16.",
        "Jertfa acestei zile este identică cu cea a Sunării din Trâmbițe, dar semnificația ei este diferită: aici jertfa pentru păcat se adaugă „pe lângă jertfa pentru păcat a ispășirii”, subliniind că această zi era dedicată exclusiv curățirii poporului înaintea DOMNULUI.",
      ),
      words: [],
      crossRefs: ["Levitic 16:29-31", "Levitic 23:26-32"],
      forYourHeart:
        "Smerirea sufletului înaintea lui Dumnezeu este o disciplină spirituală mai profundă decât simpla încetare a lucrului — cere o recunoaștere sinceră a nevoii de ispășire.",
    },
    {
      id: "numeri-29-12-16",
      ref: "Numeri 29:12-16",
      heading: "Sărbătoarea Corturilor — prima zi",
      text: numeriPassage(29, 12, 16),
      teaching: teaching(
        "Prima zi a Sărbătorii Corturilor, în ziua a cincisprezecea, deschide șapte zile de prăznuire cu cea mai mare jertfă din întregul an: treisprezece tauri, doi berbeci și paisprezece miei — un număr impresionant, care marca bucuria cea mai mare a calendarului religios, amintirea locuirii în corturi în pustie.",
      ),
      words: [],
      crossRefs: ["Levitic 23:33-36"],
      forYourHeart:
        "Cea mai mare bucurie a anului — amintirea felul în care Dumnezeu a îngrijit de poporul Său în pustie — merita cea mai generoasă jertfă de recunoștință.",
    },
    {
      id: "numeri-29-17-34",
      ref: "Numeri 29:17-34",
      heading: "Zilele a doua până a șaptea: numărul taurilor descrește",
      text: numeriPassage(29, 17, 34),
      teaching: teaching(
        "În fiecare din următoarele șase zile, numărul taurilor jertfiți scade cu exact unul — doisprezece, unsprezece, zece, nouă, opt, șapte — în timp ce numărul berbecilor (doi) și mieilor (paisprezece) rămâne constant. Această descreștere precisă, zi de zi, nu este întâmplătoare și arată o grijă minuțioasă pentru detaliu în porunca DOMNULUI.",
        "Tradiția iudaică a văzut în această descreștere o imagine a diminuării treptate: În ziua întâi, 13; în ultima zi a săptămânii, 7 — un total de 70 de tauri de-a lungul șaptelui zile, număr simbolic legat de cele șaptezeci de neamuri ale lumii în gândirea iudaică tradițională, sugerand o mijlocire care se extinde dincolo de Israel.",
      ),
      words: [],
      crossRefs: ["Geneza 10:1-32"],
      forYourHeart:
        "Chiar într-o sărbătoare dedicată propriului popor, structura jertfelor sugerează o grijă a DOMNULUI care se întinde dincolo de un singur popor, către întreaga lume.",
    },
    {
      id: "numeri-29-35-38",
      ref: "Numeri 29:35-38",
      heading: "A opta zi — adunarea de încheiere",
      text: numeriPassage(29, 35, 38),
      teaching: teaching(
        "După șapte zile de prăznuire amplă, a opta zi este numită explicit „adunare de încheiere”, cu o jertfă mult redusă — un singur taur, un berbec, șapte miei — semnând o încheiere solemnă și liniștită a marii sărbători, distinctă de zilele anterioare.",
      ),
      words: [],
      crossRefs: ["Levitic 23:36", "Ioan 7:37"],
      forYourHeart:
        "Fiecare perioadă mare de bucurie spirituală are nevoie și de o încheiere liniștită, care să consolideze și să sigileze ceea ce s-a trăit în zilele precedente.",
    },
    {
      id: "numeri-29-39-40",
      ref: "Numeri 29:39-40",
      heading: "Încheierea calendarului și ascultarea lui Moise",
      text: numeriPassage(29, 39, 40),
      teaching: teaching(
        "Capitolul se încheie precizând că aceste jertfe randuite se adaugă la orice alte jertfe de bunăvoie sau pentru împlinirea unui jurământ, arătând că rânduiala fixă nu înlocuiește devoțiunea personală spontană, ci o completează.",
        "Ultimul verset simplu — „Moise le-a spus fiilor lui Israel tot ce-i poruncise DOMNUL” — confirmă fidelitatea deplină a lui Moise ca mijlocitor: nu a adăugat, nu a omis, ci a transmis exact ce a primit.",
      ),
      words: [],
      crossRefs: ["Deuteronom 4:2"],
      forYourHeart:
        "Fidelitatea în a transmite exact ce ne-a fost poruncit de DOMNUL, fără adăugiri sau omisiuni, este o marcă a unui slujitor credincios.",
    },
  ],
  prayer:
    "Doamne, învață-mă să ascult sunetul trâmbiței spirituale care îmi cere atenție și pregătire înainte de momentele solemne ale vieții mele cu Tine.\n\nDă-mi o smerire sinceră a sufletului, nu doar o încetare exterioară a lucrului, atunci când vin înaintea Ta pentru ispășire.\n\nAjută-mă să trăiesc bucuria cea mai mare cu recunoștință generoasă, și să încheiate fiecare perioadă de bucurie cu liniște și statornicie, așa cum a opta zi încheia Sărbătoarea Corturilor.\n\nDă-mi fidelitatea lui Moise de a transmite exact Cuvântul Tău, fără adăugiri sau omisiuni. Amin.",
  status: NUMERI_STATUSES[29],
})
