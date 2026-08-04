import { exodChapter, teaching } from "./exodHelpers.js"

/*
 * Cartea Exod, explicată pe unități de sens.
 *
 * Textul biblic: păstrat separat în exodText.ts (fișierele exodTextN.ts).
 * Explicația: scrisă pentru Emanus după cercetarea textului. Nu se copiază
 * formularea niciunui predicator sau comentator.
 */

export const EXOD_13 = exodChapter({
  number: 13,
  title: "Exod 13 — Întâii născuți, semnul pe mână și drumul ocolit",
  summary:
    "După noaptea ieșirii vin cele dintâi porunci pentru un popor liber, și toate sunt despre aducere-aminte. Întâii născuți sunt ai Domnului, fiindcă în noaptea aceea au fost cruțați; azimile se țin în fiecare an; iar povestirea se pune în gura părinților, ca semn pe mână și între ochi. La urmă, Dumnezeu nu-i duce pe drumul cel scurt, ci pe cel ocolit, prin pustie — fiindcă un popor abia ieșit din robie nu era în stare să vadă război și s-ar fi întors. Iau cu ei oasele lui Iosif, și pornesc după un stâlp de nor ziua și un stâlp de foc noaptea.",
  literaryContext:
    "Capitolul ține împreună două lucruri care par de firi deosebite: rânduieli (1-16) și drum (17-22). Ia aminte că nu întâmplător stau alături: cine a fost scos primește întâi aducerea-aminte, și abia apoi pornește la drum. Se repetă pentru a treia oară în două capitole întrebarea copilului — ce înseamnă aceasta — semn că toată ieșirea a fost dată spre povestire, nu numai spre trăit. Și vezi cum se încheie capitolul: nu cu o poruncă, ci cu un stâlp care nu se depărta de la popor nici ziua, nici noaptea. Cartea trece astfel de la ce a făcut Dumnezeu în Egipt la felul în care merge Îl însuși înaintea lor în pustie.",
  historicalContext:
    "Dreptul întâiului născut era temeiul casei în tot Răsăritul vechi; așezământul acesta ia tocmai ce era socotit al tău și îl dă lui Dumnezeu. Măgarul, care nu se aducea ca jertfă, se răscumpăra cu un miel — chip limpede al înlocuirii. Drumul cel scurt spre Canaan, de-a lungul mării, era vechiul drum al oștirilor, păzit de întărituri și străji egiptene; drumul acela îi arunca îndată în război. Cel ocolit, spre pustie, era mai lung și mai greu, dar îi ferea de ce nu puteau duce încă. Iar oasele lui Iosif fuseseră ținute vreme de veacuri, după cuvântul lăsat de el înainte de moarte: credea că Dumnezeu îi va cerceta pe ai săi, și a cerut să fie dus și el afară când va veni ziua aceea.",
  units: [
    {
      verses: [1, 2],
      heading: "„Al Meu este”",
      teaching: teaching(
        "Întâia poruncă după ieșire nu este despre luptă, nici despre hărană, nici despre drum: este despre ce dăm lui Dumnezeu. Iar ce cere El este chiar ce a cruțat: întâiul născut. Nu ia ce nu ne trebuie; ia ce ne este cel mai scump.",
        "Ia aminte la temei: ei nu sunt ai Domnului fiindcă au fost cumparați cu bani, ci fiindcă au fost cruțați cu sânge. Așa se naște toată închinarea adevărată: nu din datorie și nici din frică, ci din aducerea-aminte că ai fost scăpat. Cine uită noaptea din care a fost scos începe să socotească viața lui ca fiind a lui.",
      ),
      words: [
        {
          original: "קדש לי",
          transliteration: "kadeș li",
          language: "ebraica",
          meaning:
            "pune-Mi deoparte, sfințește-Mi. Nu înseamnă mai întâi ceva jertfit, ci ceva scos din rândul obișnuit și dat lui Dumnezeu.",
        },
        {
          original: "לי הוא",
          transliteration: "li hu",
          language: "ebraica",
          meaning:
            "al Meu este. Temeiul nu este un târg, ci cruțarea din noaptea Paștelui.",
        },
      ],
      crossRefs: ["Exod 12:12-13", "Numeri 3:12-13", "Luca 2:22-23", "Romani 12:1", "1 Corinteni 6:19-20"],
      forYourHeart:
        "Dumnezeu nu cere ce nu ne trebuie, ci ce ne este cel mai scump. Ce îți este cel mai scump și n-ai pus încă în mâna Lui?",
    },
    {
      verses: [3, 10],
      heading: "Aducere-aminte cu mâna și cu gura",
      teaching: teaching(
        "Moise spune poporului întâi să țină minte ziua. Nu să țină minte un simțământ, ci o zi anume, cu ce s-a petrecut în ea. Credința în Scriptură nu atârnă de ce simțim astăzi, ci de ce a făcut Dumnezeu atunci.",
        "Și ia aminte la măsură: șapte zile azime, și în casele lor să nu se vadă aluat. Aducerea-aminte nu se ține numai în cap; se ține și în ce mânci, și în ce scoti afară din casă. Dumnezeu știe cum suntem făcuți: ce nu ne trece prin mâini și prin obiceiuri se șterge repede din minte.",
        "Apoi vine porunca cea mai însemnată pentru o casă: să spui fiului tău. Nu se spune să aștepți întrebarea, aici; se spune să spui. Iar pricina este limpede: în ziua când tatăl tace, copilul rămâne cu obiceiul și pierde înțelesul. Un neam pierde credința într-o singură generație de părinți tăcuți.",
        "Iar toate acestea să fie ca un semn pe mână și ca o aducere-aminte între ochi. Adică: la ce faci cu mâinile și la ce privești. Nu la vedere, pentru alții, ci acolo unde se hotărăște viața omului: în lucru și în privire.",
      ),
      words: [
        {
          original: "זכור את היום הזה",
          transliteration: "zahor et haiom haze",
          language: "ebraica",
          meaning:
            "adu-ți aminte ziua aceasta. Nu un simțământ, ci o zi cu ce s-a petrecut în ea.",
        },
        {
          original: "לאות על ידך",
          transliteration: "leot al iadha",
          language: "ebraica",
          meaning:
            "ca semn pe mâna ta. Aducerea-aminte se leagă de ce faci cu mâinile și de ce privești, nu de ce arăți altora.",
        },
      ],
      crossRefs: ["Deuteronom 6:6-9", "Exod 12:26-27", "Psalmi 103:2", "Proverbe 4:23", "Iosua 24:15"],
      forYourHeart:
        "Nu se spune să aștepți întrebarea copilului, ci să-i spui. Un neam pierde credința într-o singură generație de părinți tăcuți.",
    },
    {
      verses: [11, 16],
      heading: "Răscumpărare: un miel în locul celui care nu putea fi adus",
      teaching: teaching(
        "Porunca se întoarce la întâii născuți, dar acum cu amănuntul cel mai însemnat: cei ai oamenilor se răscumpără. Dumnezeu nu voia viața copilului; voia ca fiecare casă să știe că el trăiește pentru că altul a fost dat în locul lui.",
        "Și ia aminte la măgarul care nu se aducea ca jertfă: se răscumpăra cu un miel. Ceva ce nu era primit în sine putea trăi printr-un miel pus în locul lui. Aici este în chip mărunt tot înțelesul împăcării; și tocmai de aceea nu se cade să întindem chipul mai mult decât îl întinde Scriptura însăși.",
        "Iar întrebarea copilului se întoarce a treia oară: când te va întreba, să-i răspunzi. Ia seama ce se cere de la părinte: nu o învățătură învățată pe dinafară, ci povestirea a ce a făcut Dumnezeu cu ei. Copiii nu se țin lângă Dumnezeu cu porunci fără înțeles; se țin cu povestirea scăpării.",
      ),
      words: [
        {
          original: "ופדית",
          transliteration: "ufadita",
          language: "ebraica",
          meaning:
            "să răscumperi. Se plătește un preț ca să trăiască cel care era datorat: altul ia locul lui.",
        },
        {
          original: "בחזק יד",
          transliteration: "behozek iad",
          language: "ebraica",
          meaning:
            "cu mână tare. Răspunsul dat copilului nu este o învățătură, ci o povestire: cu mână tare ne-a scos Domnul.",
        },
      ],
      crossRefs: ["Numeri 18:15-16", "Luca 2:24", "Marcu 10:45", "1 Petru 1:18-19", "Exod 34:20"],
      forYourHeart:
        "Copilul trăia pentru că altul fusese dat în locul lui. Tot ce ai astăzi îți vine pe aceeași cale — nu al tău, ci răscumpărat.",
    },
    {
      verses: [17, 22],
      heading: "Drumul cel lung, oasele lui Iosif și stâlpul care nu se depărta",
      teaching: teaching(
        "Aici stă unul dintre cele mai mângâietoare cuvinte din carte: Dumnezeu nu i-a dus pe drumul cel scurt, ca să nu vadă război și să nu se întoarcă în Egipt. Îl cunoștea pe poporul Lui mai bine decât se cunoștea el însuși. Știa ce nu pot duce încă, și i-a ferit — nu prin scutit de greutăți, ci prin altfel de greutăți.",
        "Ia aminte deci: drumul mai lung nu este totdeauna semn că ai greșit calea. Uneori este mila lui Dumnezeu, care te ține departe de o luptă ce te-ar fi întors îndată la robie. Iar nici drumul acela ocolit nu a fost fără mare, cum se va vedea îndată — dar acolo lupta nu a fost a lor.",
        "Și au luat cu ei oasele lui Iosif. Un om murise cu veacuri înainte, și totuși crezuse că vine ziua aceasta; iar acum îl duc cu ei. Credința unui om poate ajunge mai departe decât viața lui. Iosif nu a văzut ieșirea, dar a fost purtat în ea.",
        "Iar la urmă: un stâlp de nor ziua și un stâlp de foc noaptea, și nu se depărtau de la popor. Cele două chipuri se potrivesc după nevoie: umbră în arșiță, lumină în întuneric. Dumnezeu nu Se arătă totdeauna la fel, dar nu lipsește niciodată. Și nu se spune că le-a dat o hartă; le-a dat prezența Lui. Când nu știi calea, ai o singură călăuză sigură: să mergi cât merge El, și să stai când stole El.",
      ),
      words: [
        {
          original: "דרך ארץ פלשתים",
          transliteration: "dereh ereț Peliștim",
          language: "ebraica",
          meaning:
            "drumul țării filistenilor — calea cea scurtă, dar păzită de întărituri și oștiri. Dumnezeu i-a ferit de ea.",
        },
        {
          original: "עמוד ענן",
          transliteration: "amud anan",
          language: "ebraica",
          meaning:
            "stâlp de nor. Umbră în arșiță ziua, foc în întuneric noaptea: același Însoțitor, pe măsura nevoii.",
        },
        {
          original: "לא ימיש",
          transliteration: "lo iamiș",
          language: "ebraica",
          meaning:
            "nu se depărta. Nu se spune că le-a dat un drum lămurit, ci că nu S-a depărtat de ei.",
        },
      ],
      crossRefs: ["Geneza 50:24-25", "Evrei 11:22", "Exod 14:19-20", "Numeri 9:17-22", "Isaia 4:5-6", "1 Corinteni 10:13"],
      forYourHeart:
        "Dumnezeu i-a dus pe drumul cel lung fiindcă știa ce nu puteau duce încă. Drumul tău ocolit poate să nu fie o greșeală, ci o cruțare.",
    },
  ],
  prayer:
    "Doamne, Tu ne-ai cruțat, și de aceea suntem ai Tăi; nu ne lăsa să trăim ca și cum viața noastră ar fi a noastră.\n\nDă-ne gură să povestim copiilor noștri ce ai făcut, și mâini care să arate același lucru.\n\nCând drumul se lungește și nu înțelegem de ce, adu-ne aminte că Tu știi ce putem duce.\n\nȘi nu Te depărta de noi: nor în arșiță, foc în noapte, Îtu înaintea noastră pe orice cale. Amin.",
})
