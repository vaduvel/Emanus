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

export const NUMERI_2 = numeriChapter({
  number: 2,
  title: "Numeri 2 — O tabără așezată în jurul Cortului",
  summary:
    "După recensământ, DOMNUL rânduiește locul fiecărei seminții în tabără: trei seminții la răsărit sub steagul lui Iuda, trei la sud sub steagul lui Ruben, trei la apus sub steagul lui Efraim, trei la nord sub steagul lui Dan, iar Cortul Întâlnirii și leviții în chiar mijlocul lor. Aceeași ordine ține și la popas, și la drum: cum tăbărăsc, așa pornesc.",
  literaryContext:
    "Dacă primul capitol număra oamenii, cel de-al doilea îi așază în spațiu. Cele două recensăminte din capitolul întâi (oștirea) și din capitolul al treilea (leviții) sunt legate acum de o geografie: patru tabere a câte trei seminții, așezate în cruce în jurul unui singur centru. Structura aceasta, repetată identic mai târziu la ordinea de marș (Numeri 10:14-28), arată că nu este o întâmplare de o zi, ci rânduiala pe care Israel o va purta prin toată pustia.",
  historicalContext:
    "O tabără de război cu steaguri și cu ordine de marș era cunoscută și în alte armate ale lumii vechi; ce este cu totul altfel aici este centrul taberei. În armatele vecine, mijlocul taberei era locul comandantului sau al zeului purtat în război. La Israel, mijlocul este ocupat de Cortul Întâlnirii, locul de locuire al DOMNULUI însuși. Șase sute trei mii de bărbați și familiile lor își așează corturile privind spre același punct, la fiecare popas, pe tot cuprinsul pustiei.",
  units: [
    {
      id: "numeri-2-1-2",
      ref: "Numeri 2:1-2",
      heading: "Fiecare lângă steagul lui, cu fața spre Cort",
      text: numeriPassage(2, 1, 2),
      teaching: teaching(
        "Porunca este scurtă, dar cuprinde tot ce va urma în capitol: „Fiii lui Israel să tăbărască fiecare lângă steagul lui... în jurul Cortului Întâlnirii”. Două lucruri se împletesc aici: fiecare familie își are locul ei propriu, sub semnul casei ei, și totuși toate privesc către același centru.",
        "Nu există în tabăra aceasta un loc întâmplător. Rânduiala nu vine din obiceiul oamenilor, ci din porunca DOMNULUI, rostită lui Moise și lui Aaron împreună. Și totuși, rânduiala nu șterge deosebirile dintre seminții: fiecare își păstrează steagul, semnul casei părinților ei. Unitatea poporului nu se face prin ștergerea neamurilor, ci prin așezarea lor împreună, în jurul aceluiași Dumnezeu.",
        "Vezi și măsura pusă în text: taberele stăteau „la o oarecare depărtare” de Cort. Nu se îngrămădeau peste sfințenia lui Dumnezeu, dar nici nu se depărtau de ea. Aproprierea de Dumnezeu În Scriptură cere întotdeauna această măsură: nici obrăznicie, nici fugă.",
      ),
      words: [
        {
          original: "דגל",
          transliteration: "degel",
          language: "ebraica",
          meaning:
            "steag, stindard. Fiecare grupă de trei seminții avea un steag comun, sub care se tăbăra și pornea; era semnul de recunoaștere și de adunare al fiecărei tabere.",
        },
        {
          original: "מנגד",
          transliteration: "minegged",
          language: "ebraica",
          meaning:
            "în fața, cu privirea spre. Corturile nu erau așezate cu spatele la Cort, ci orientate spre el: întreaga tabără trăia cu fața spre locul în care locuia DOMNUL.",
        },
      ],
      crossRefs: ["Numeri 1:52-53", "Numeri 10:14-28", "Psalmi 5:7"],
      forYourHeart:
        "Locul tău în viață își păstrează numele, familia și chemarea proprie; și totuși toți suntem chemați să privim spre același centru. Spre ce privește cortul vieții tale?",
    },
    {
      id: "numeri-2-3-9",
      ref: "Numeri 2:3-9",
      heading: "Răsărit: Iuda deschide drumul",
      text: numeriPassage(2, 3, 9),
      teaching: teaching(
        "La răsărit, spre răsăritul soarelui, stă tabăra lui Iuda, cu Isahar și Zabulon alături. Locul acesta nu este întâmplător: răsăritul este partea dinspre care se vede soarele răsărind, iar tabăra așezată acolo va fi și cea dintâi care pornește la drum: „Aceștia vor porni primii”.",
        "Cu o sută optzeci și șase de mii patru sute de bărbați, tabăra lui Iuda este cea mai mare din toate cele patru. Și căpetenia ei, Nahșon, fiul lui Amminadab, deja întâlnit în capitolul întâi, va rămâne în genealogia care duce spre David și spre Domnul Iisus. Fără ca poporul să știe încă, seminția care deschide marșul este chiar seminția din care avea să vină Regele.",
        "Alături de Iuda stă Isahar, iar apoi Zabulon — amintirea binecuvântării pe care Iacov o dăduse fiecăruia (Geneza 49:13-15) se împlinește acum într-o așezare de tabără. Cuvintele rostite peste niște copii, cu generații în urmă, Înși găsesc locul în viața unui popor întreg.",
      ),
      words: [
        {
          original: "מזרחה",
          transliteration: "mizraha",
          language: "ebraica",
          meaning:
            "spre răsărit. Este partea prin care intră lumina zilei și din care pornește întreaga tabără la drum; mai târziu, intrarea Cortului și a Templului va privi tot spre răsărit.",
        },
      ],
      crossRefs: ["Geneza 49:8-15", "Numeri 10:14", "Rut 4:18-22", "Matei 1:3-4"],
      forYourHeart:
        "Nu întâietatea nașterii, ci chemarea lui Dumnezeu hotărăște cine merge în frunte. Iuda, nu Ruben, deschide drumul.",
    },
    {
      id: "numeri-2-10-16",
      ref: "Numeri 2:10-16",
      heading: "Sud: Ruben și al doilea grup",
      text: numeriPassage(2, 10, 16),
      teaching: teaching(
        "La sud stă tabăra lui Ruben, întâiul născut al lui Israel, cu Simeon și Gad alături de el. Deși este întâiul după naștere, Ruben nu deschide marșul: pierduse întâietatea prin păcatul lui din Geneza 35:22 și din cuvintele aspre ale lui Iacov din Geneza 49:3-4. Și totuși nu este dat la o parte: tabăra lui rămâne a doua, cu o sută cincizeci și una de mii patru sute cincizeci de bărbați.",
        "Se cuvine văzut și cine stă alături de Ruben: Simeon, celălalt fiu mustrat aspru în aceeași binecuvântare a lui Iacov, și Gad, fiul unei roabe. Tabăra a doua adună seminții care nu strălucesc în istoria patriarhilor; și totuși fiecare are locul ei rostit rând pe rând, cu numărul ei, cu căpetenia ei numită pe nume.",
        "Ia aminte că pedeapsa pentru păcatul din trecut nu șterge pe Ruben din numărătoare, nici din tabără, nici din moștenirea de mai târziu (Numeri 32). Dumnezeu își ține dreptatea și îndurările împreună: cel care a pierdut întâietatea nu este lepădat de la moștenire.",
      ),
      words: [
        {
          original: "תימנה",
          transliteration: "teimana",
          language: "ebraica",
          meaning:
            "spre sud, spre dreapta. Denumește partea taberei situată în direcția opusă celei dintâi, unde stă al doilea grup la marș.",
        },
      ],
      crossRefs: ["Geneza 35:22", "Geneza 49:3-4", "1 Cronici 5:1", "Numeri 32:1-5"],
      forYourHeart:
        "A pierde întâietatea nu înseamnă a pierde locul tău în popor. Dumnezeu păstrează pentru fiecare un loc, chiar după o cădere.",
    },
    {
      id: "numeri-2-17",
      ref: "Numeri 2:17",
      heading: "În mijlocul taberei: Cortul și leviții",
      text: numeriPassage(2, 17, 17),
      teaching: teaching(
        "Un singur verset, dar el este balamaua întregului capitol: „Apoi va porni Cortul Întâlnirii, cu tabăra leviților în mijlocul celorlalte tabere”. Toate cele patru tabere sunt așezate în jurul unui centru care nu se mișcă din locul lui rostuit: Cortul În care locuiește DOMNUL.",
        "Și mai spune ceva textul: „cum au tăbărât, așa vor și porni”. Ordinea nu este doar pentru odihnă, ci și pentru drum. Israel nu se mișcă haotic prin pustie; se mișcă într-o formă care păstrează, și în mers, același centru și aceeași rânduială.",
        "Ia aminte la locul leviților: nu într-o tabără anume dintre cele patru, ci în chiar mijloc, lângă Cort. Capitolele următoare vor spune de ce: ei sunt cei chemați să-l poarte și să-l păzească. Locul cel mai aproape de sfințenie nu este cel mai onorific după măsura lumii, ci cel mai încărcat de răspundere.",
      ),
      words: [
        {
          original: "בתוך המחנת",
          transliteration: "betoch hamahanot",
          language: "ebraica",
          meaning:
            "în mijlocul taberelor. Nu la marginea sau în fruntea lor, ci în chiar centrul geometric al întregii așezări de corturi.",
        },
      ],
      crossRefs: ["Numeri 1:50-53", "Numeri 3:23-38", "Exod 25:8"],
      forYourHeart:
        "Prezența lui Dumnezeu nu se mișcă după împrăștierea vieții tale; ea rămâne centrul în jurul căruia toți ceilalți se așază.",
    },
    {
      id: "numeri-2-18-24",
      ref: "Numeri 2:18-24",
      heading: "Apus: Efraim și binecuvântarea împletită a lui Iosif",
      text: numeriPassage(2, 18, 24),
      teaching: teaching(
        "La apus stă tabăra lui Efraim, cu Manase și Beniamin alături. Efraim și Manase sunt fiii lui Iosif, numărați ca două seminții de sine stătătoare, iar Beniamin le este frate deplin, singurul fiu al Rahelei născut deja în țara Canaan.",
        "Aici se vede iarăși o răsturnare a ordinii firii: Efraim, fiul mai mic al lui Iosif, este pus înaintea lui Manase, întâiul născut. Geneza 48:13-20 povestise deja această încrucișare a mâinilor lui Iacov, care a binecuvântat cu dreapta pe cel mai mic; capitolul de față arată că acea binecuvântare nu a fost o vorbă fără urmare, ci s-a scris în însăși ordinea taberei.",
        "Tabăra lui Efraim este cea mai mică dintre cele patru: o sută opt mii o sută de bărbați. Mărimea nu hotărăște locul în rânduială; fiecare tabără, mare sau mică, își are steagul, locul și rândul ei la marș.",
      ),
      words: [
        {
          original: "ימה",
          transliteration: "iama",
          language: "ebraica",
          meaning:
            "spre mare, adică spre apus — fiindcă Marea Mediterană se afla la apusul țării făgăduite. Așa se numește în ebraică direcția apuseană.",
        },
      ],
      crossRefs: ["Geneza 48:13-20", "Geneza 41:50-52", "1 Cronici 7:6-12"],
      forYourHeart:
        "Dumnezeu își ține cuvântul binecuvântării chiar și acolo unde ordinea firească pare răsturnată. Nu judeca după mărime cine este cel prețuit de El.",
    },
    {
      id: "numeri-2-25-31",
      ref: "Numeri 2:25-31",
      heading: "Nord: Dan și cei care încheie marșul",
      text: numeriPassage(2, 25, 31),
      teaching: teaching(
        "La nord stă tabăra lui Dan, cu Așer și Neftali alături — toți trei fii ai roabelor Bilha și Zilpa. Cu o sută cincizeci și șapte de mii șase sute de bărbați, este a doua ca mărime dintre cele patru tabere, dar este așezată să încheie marșul: „Aceștia vor porni ultimii”.",
        "A încheia șirul nu înseamnă a fi cel mai puțin însemnat. În rânduiala de drum a unei oștiri, ariergarda — grupul din urmă — poartă o răspundere aparte: apară spatele întregii tabere și strânge pe cei rămași în urmă. Deuteronom 25:17-18 va aminti că tocmai așa i-a lovit Amalec pe cei slăbiți din urma poporului — semn că locul din spate era și cel mai expus primejdiei.",
        "Cu tabăra lui Dan se încheie șirul celor patru grupuri, și întregul capitol își arată acum forma desăvârșită: o cruce de tabere în jurul unui centru care nu se mișcă, fiecare cu locul, numărul și căpetenia ei numită.",
      ),
      words: [
        {
          original: "צפונה",
          transliteration: "tzafona",
          language: "ebraica",
          meaning:
            "spre nord, spre partea ascunsă sau întunecată. Este ultima dintre cele patru direcții numite în capitol, locul celor care încheie marșul.",
        },
      ],
      crossRefs: ["Geneza 30:1-8", "Deuteronom 25:17-18", "Judecători 18:1"],
      forYourHeart:
        "A fi ultimul la marș nu înseamnă a fi uitat; poate însemna tocmai locul de care depinde siguranța celor din față.",
    },
    {
      id: "numeri-2-32-34",
      ref: "Numeri 2:32-34",
      heading: "Numărul întreg și ascultarea întreagă",
      text: numeriPassage(2, 32, 34),
      teaching: teaching(
        "Capitolul se încheie adunând toate numerele în unul singur: șase sute trei mii cinci sute cincizeci, același număr ieșit deja din recensământul capitolului întâi. Cele patru tabere, cu ordinea, steagurile și căpeteniile lor, nu adaugă și nu scad nimic din numărul poporului; îi dau doar formă și rânduială.",
        "Și din nou se amintește că leviții nu intră în această numărătoare, „așa cum îi poruncise DOMNUL lui Moise”. Repetarea nu este întâmplătoare: capitolul vrea să fie limpede că slujba leviților rămâne aparte de la un capăt la altul al cărții.",
        "Ultimul rând al capitolului repetă, aproape cuvânt cu cuvânt, ceea ce se spusese la finalul capitolului întâi: „Fiii lui Israel au făcut după tot ce-i poruncise DOMNUL lui Moise”. O rânduială atât de amănunțită — steaguri, direcții, ordine de marș, numere pentru fiecare seminție — a fost primită și împlinită întocmai. Această ascultare deplină este piatra pe care se clădește începutul călătoriei; cu atât mai dureroasă va fi, peste doar câteva capitole, prima ei crăpătură.",
      ),
      words: [
        {
          original: "כן עשו לכל אשרצוה יהוה",
          transliteration: "ken asu lechol asher tziva Adonai",
          language: "ebraica",
          meaning:
            "așa au făcut după tot ce a poruncit DOMNUL. Formula se repetă la finalul mai multor capitole din Numeri, ca un refren al ascultării depline.",
        },
      ],
      crossRefs: ["Numeri 1:19", "Numeri 1:54", "Numeri 9:23"],
      forYourHeart:
        "Ascultarea deplină nu se dovedește într-o singură clipă de curaj, ci în răbdarea de a păstra rânduiala primită, zi de zi, popas de popas.",
    },
  ],
  prayer:
    "Doamne, Tu ai așezat poporul Tău în jurul locului în care locuiai; învață-ne să trăim și noi cu viața așezată în jurul Tău.\n\nDă-ne să ne păstrăm locul și chemarea proprie, fără să pizmuim locul altuia.\n\nÎnvață-ne că nu mărimea sau locul din față hotărăsc prețuirea înaintea Ta, ci ascultarea de rânduiala pe care ne-ai dat-o.\n\nȘi ține-ne, popas după popas, cu privirea îndreptată spre Tine, oriunde ne-ai așeza în tabără. Amin.",
  status: NUMERI_STATUSES[2],
})
