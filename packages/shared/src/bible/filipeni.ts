import type { BibleBook } from "./types.js"
import { filipeniChapter, teaching } from "./filipeniHelpers.js"
import { FILIPENI_2 } from "./filipeni2.js"
import { FILIPENI_3 } from "./filipeni3.js"
import { FILIPENI_4 } from "./filipeni4.js"

/*
 * Textul biblic este materializat separat din RCCV.
 * Explicațiile sunt redactate în română pe baza studiilor verse-by-verse
 * ale lui Zac Poonen, fără copiere 1:1. Daniel rămâne reviewerul final.
 */

const FILIPENI_1 = filipeniChapter({
  number: 1,
  title: "Filipeni 1 — Hristos este viața mea",
  summary: "Pavel scrie din închisoare cu recunoștință și bucurie, arătând că Evanghelia poate înainta chiar prin împrejurări grele. Rugăciunea lui urmărește dragoste cu discernământ, o viață centrată în Hristos și o comunitate care rămâne unită fără teamă.",
  literaryContext: "Scrisoarea începe cu relația caldă dintre Pavel și biserica din Filipi. Temele bucuriei, părtășiei în Evanghelie, suferinței și vieții vrednice de Hristos pregătesc chemarea la smerenie din capitolul următor.",
  historicalContext: "Pavel scria ca întemnițat, probabil la Roma. Filipenii îl sprijiniseră în lucrare și cunoșteau deja din propria cetate cum putea el să se bucure chiar după bătaie și închisoare.",
  units: [
    {
      verses: [1, 2],
      heading: "Robi ai lui Hristos și sfinți prin har",
      teaching: teaching(
        "Pavel și Timotei se prezintă ca oameni care Îi aparțin lui Hristos, nu ca personalități care cer privilegii. Poonen subliniază că slujirea adevărată renunță la revendicarea recompensei și caută voia Stăpânului din dragoste.",
        "Această imagine descrie o dăruire liberă față de Hristos și nu justifică sclavia, exploatarea ori controlul exercitat de oameni. Liderii, prezbiterii și diaconii rămân slujitori ai comunității, fără drept asupra conștiinței, trupului, banilor sau libertății altuia.",
      ),
      crossRefs: ["Marcu 10:42-45", "Romani 12:1", "1 Petru 5:2-3"],
      forYourHeart: "Întreabă-te ce drept personal te împiedică să-I slujești lui Hristos cu bucurie, fără să cedezi însă controlul vieții tale unui om.",
    },
    {
      verses: [3, 11],
      heading: "Recunoștință, părtășie și dragoste cu discernământ",
      teaching: teaching(
        "Pavel își amintește de credincioși cu mulțumire și se roagă cu bucurie. O inimă spirituală nu ignoră problemele, dar învață să vadă și lucrarea harului în ceilalți, în loc să trăiască din critică permanentă.",
        "El are încredere că Dumnezeu va duce mai departe lucrarea începută, în timp ce credincioșii răspund prin credință și ascultare. Dragostea trebuie să crească împreună cu cunoașterea și discernământul, ca viața să producă roada dreptății, nu doar emoție religioasă.",
      ),
      crossRefs: ["1 Corinteni 1:4-9", "Coloseni 1:9-10", "Iacov 1:5"],
      forYourHeart: "Numește înaintea lui Dumnezeu un lucru concret pentru care Îi poți mulțumi în legătură cu fiecare persoană apropiată.",
    },
    {
      verses: [12, 18],
      heading: "Evanghelia înaintează chiar prin lanțuri",
      teaching: teaching(
        "Întemnițarea nu a anulat chemarea lui Pavel; Dumnezeu a folosit-o pentru ca Hristos să fie cunoscut în locuri neașteptate și pentru ca alți credincioși să capete curaj. Bucuria lui nu depindea de libertatea exterioară, ci de înaintarea lucrării lui Dumnezeu.",
        "Unii Îl vesteau pe Hristos din dragoste, iar alții din rivalitate. Pavel se bucura că mesajul adevărat era proclamat, fără să declare bune motivele egoiste. Conținutul corect nu curăță automat caracterul celui care predică; Dumnezeu judecă și mesajul, și inima.",
      ),
      crossRefs: ["Faptele 28:30-31", "2 Timotei 2:8-9", "1 Corinteni 3:12-15"],
      forYourHeart: "Caută felul în care Dumnezeu poate folosi o limitare prezentă, fără să numești răul bun sau să refuzi ajutorul necesar.",
    },
    {
      verses: [19, 26],
      heading: "Pentru mine, a trăi este Hristos",
      teaching: teaching(
        "Pavel dorește ca Hristos să fie mărit în trupul lui, fie prin viață, fie prin moarte. «A trăi este Hristos» înseamnă că interesul lui Isus, caracterul Lui și binele oamenilor devin centrul alegerilor, nu conservarea reputației sau a confortului personal.",
        "Moartea este câștig pentru cel unit cu Hristos, dar Pavel nu își grăbește plecarea și nu disprețuiește viața. El vede rostul de a rămâne pentru creșterea altora. Textul nu oferă justificare sinuciderii; viața este primită și păstrată ca responsabilitate înaintea lui Dumnezeu.",
      ),
      crossRefs: ["Romani 14:7-9", "Galateni 2:20", "2 Corinteni 5:6-9"],
      forYourHeart: "Completează sincer propoziția «Pentru mine, a trăi este…» și adu-I lui Dumnezeu tot ce concurează cu Hristos.",
    },
    {
      verses: [27, 30],
      heading: "O singură inimă, fără intimidare",
      teaching: teaching(
        "O purtare vrednică de Evanghelie înseamnă statornicie comună, colaborare și curaj. Biserica nu este chemată la individualism spiritual, ci la o unitate în care oamenii luptă împreună pentru credință fără rivalitate și fără frică de opoziție.",
        "Suferința pentru Hristos poate însoți credincioșia, dar nu orice suferință este o cruce pe care cineva trebuie să o accepte pasiv. Persecuția pentru Evanghelie nu trebuie confundată cu abuzul familial, violența, exploatarea sau infracțiunea; în asemenea situații, protecția, sprijinul comunitar și autoritățile competente sunt potrivite.",
      ),
      crossRefs: ["Faptele 16:22-25", "2 Timotei 1:7-8", "1 Petru 3:14-17"],
      forYourHeart: "Rămâi credincios fără intimidare, dar caută imediat siguranță și ajutor când cineva îți face rău sau te amenință.",
    },
  ],
  prayer: "Doamne Isuse, fii centrul vieții mele. Umple-mă de recunoștință, dragoste cu discernământ și curaj curat. Folosește chiar limitele mele pentru înaintarea Evangheliei și păzește-mă de egoism, rivalitate și frică. Amin.",
})

export const FILIPENI: BibleBook = {
  id: "filipeni",
  name: "Filipeni",
  testament: "nt",
  order: 50,
  blurb: "Bucuria stabilă izvorăște din Hristos, din gândul Lui smerit, din alergarea spre maturitate și din mulțumirea în orice împrejurare.",
  chapters: [FILIPENI_1, FILIPENI_2, FILIPENI_3, FILIPENI_4],
}
