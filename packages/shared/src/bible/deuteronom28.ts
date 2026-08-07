import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_28 = deuteronomChapter({
  number: 28,
  title: "Deuteronom 28 — Binecuvântările ascultării, blestemele nesocotirii",
  summary:
    "Moise expune în detaliu binecuvântările care vin din ascultare deplină și, în oglindă mult mai extinsă, blestemele care vin din nesocotirea legământului — boală, înfrângere, împresurare, exil — culminând cu inversarea completă a Exodului: întoarcerea în robie în Egipt.",
  literaryContext:
    "Acest capitol este punctul culminant al structurii de legământ din Deuteronom, urmând tiparul antic al tratatelor suzerane, unde binecuvântările și blestemele detaliate confirmau consecințele ascultării sau nesocotirii unui legământ. Proporția — 14 versete de binecuvântare față de peste 50 de versete de blestem — subliniază gravitatea avertismentului.",
  historicalContext:
    "Limbajul și structura acestui capitol au paralele directe cu tratatele de vasalitate ale imperiilor din Orientul Apropiat antic (hitite, asiriene), unde împărații își legau vasalii prin liste similare de binecuvântări și blesteme, dar aici suveranul este DOMNUL însuși, nu un împărat pământesc.",
  units: [
    {
      id: "deuteronom-28-1-14",
      ref: "Deuteronom 28:1-14",
      heading: "Binecuvântările ascultării depline",
      text: deuteronomPassage(28, 1, 14),
      teaching: teaching(
        "Ascultarea de glasul DOMNULUI aduce binecuvântare în tot: „în cetate... la câmp... la intrarea ta... la ieșirea ta” — fiecare aspect al vieții zilnice este cuprins. Israel va fi „cap, nu coadă” și va da cu împrumut, nu va lua, într-o poziție de supremație morală și materială printre neamuri.",
        "Motivul de fond este relevant: „toate popoarele pământului vor vedea că tu porți Numele DOMNULUI”. Binecuvântarea lui Israel nu este scop în sine, ci mărturie publică despre identitatea și caracterul DOMNULUI căruia își aparține.",
      ),
      words: [
        {
          original: "לראש ולא לזנב",
          transliteration: "lerosh velo lezanav",
          language: "ebraica",
          meaning:
            "drept cap, nu drept coadă. Imagine de supremație și conducere față de subordonare și urmare — poziția pe care ascultarea o aduce lui Israel printre neamuri.",
        },
      ],
      crossRefs: ["Deuteronom 26:19", "Ieremia 29:11", "Iacov 1:25"],
      forYourHeart:
        "Binecuvântarea pe care o primești nu e doar pentru tine; ea este menită să arate lumii cui îți aparții.",
    },
    {
      id: "deuteronom-28-15-19",
      ref: "Deuteronom 28:15-19",
      heading: "Blestemul în oglindă cu binecuvântarea",
      text: deuteronomPassage(28, 15, 19),
      teaching: teaching(
        "Structura blestemelor oglindește exact structura binecuvântărilor — „în cetate... la câmp... coșul... covata... la intrarea ta... la ieșirea ta” — aceeași viață zilnică, dar sub blestem în loc de binecuvântare. Nu există domeniu neutru: fiecare aspect este ori blând, ori întors împotrivă.",
        "Această simetrie deliberată arată că rezultatul nu este arbitrar, ci consecința directă a alegerii — ascultare sau nesocotire — aplicată exact peste aceleași domenii ale vieții.",
      ),
      words: [
        {
          original: "ארור אתה בעיר",
          transliteration: "arur atah ba'ir",
          language: "ebraica",
          meaning:
            "blestemat vei fi în cetate. Formula directă în oglindă cu „binecuvântat vei fi în cetate” din v.3, subliniind simetria structurală dintre cele două liste.",
        },
      ],
      crossRefs: ["Leviticul 26:14-17", "Galateni 3:10", "Deuteronom 30:19"],
      forYourHeart:
        "Nu există zonă neutră în viața ta; alegerea tă față de Dumnezeu se reflectă în fiecare colț al ei.",
    },
    {
      id: "deuteronom-28-20-37",
      ref: "Deuteronom 28:20-37",
      heading: "Boală, înfrângere, înșelătoarea înstrăinare a familiei",
      text: deuteronomPassage(28, 20, 37),
      teaching: teaching(
        "Blestemele descriu în detaliu înfricoșător boli incurabile, secetă, înfrângere militară și o răsturnare completă a normalității: „te vei logodi cu o femeie și altul se va culca cu ea; vei zidi o casă și nu vei locui în ea” — munca și speranțele omului sunt zadărnicite sistematic.",
        "Punctul culminant al acestei secțiuni este pierderea copiilor: „fiii tăi și fiicele tale vor fi dați altui popor, ochii tăi vor vedea și vor tânji... și mâna ta va fi fără putere”. Neputința de a-și proteja proprii copii este descrisă ca cea mai adâncă formă de suferință.",
      ),
      words: [
        {
          original: "והיית רק עשוק ועשוק",
          transliteration: "vehayita akh ashuq ve'ashuq",
          language: "ebraica",
          meaning:
            "vei fi doar asuprit și jefuit. Formula repetitivă care descrie o stare permanentă de exploatare, fără nicio protecție sau eliberare, ca rezultat direct al părăsirii legământului.",
        },
      ],
      crossRefs: ["Ieremia 30:14", "Amos 4:9-11", "Plangerile lui Ieremia 5:2-5"],
      forYourHeart:
        "Părăsirea legământului cu Dumnezeu nu afectează doar viața ta, ci și pe cei mai apropiați ție.",
    },
    {
      id: "deuteronom-28-38-46",
      ref: "Deuteronom 28:38-46",
      heading: "Recolta zadărnicită, copiii în robie, semn permanent",
      text: deuteronomPassage(28, 38, 46),
      teaching: teaching(
        "Lăcustele, viermii, măslinele care cad, străinul care se înalță tot mai sus deasupra ta — fiecare efort agricol este zadărnicit sistematic. Concluzia dată este directă: „pentru că n-ai ascultat de glasul DOMNULUI, Dumnezeului tău”.",
        "Un motiv aparte este dat pentru severitatea blestemului: „pentru că n-ai slujit DOMNULUI... cu bucurie și cu inimă bună în mijlocul belșugului”. Nu doar nesocotirea, ci mai ales lipsa bucuriei recunoscătoare în vremuri bune este identificată ca rădăcină a problemei.",
      ),
      words: [
        {
          original: "תחת אשר לא-עבדת את-יהוה בשמחה",
          transliteration: "tachat asher lo-avadta et-YHWH besimchah",
          language: "ebraica",
          meaning:
            "pentru că n-ai slujit DOMNULUI cu bucurie. Formula-cheie care identifică lipsa bucuriei recunoscătoare în mijlocul belșugului ca rădăcina profundă a nesocotirii legământului.",
        },
      ],
      crossRefs: ["Filipeni 4:4", "Neemia 8:10", "Deuteronom 26:11"],
      forYourHeart:
        "Bucuria recunoscătoare în vremuri de belșug nu este opțională; absența ei este ea însăși o formă de nesocotire.",
    },
    {
      id: "deuteronom-28-47-57",
      ref: "Deuteronom 28:47-57",
      heading: "Împresurarea extremă, oroarea descrisă fără eufemism",
      text: deuteronomPassage(28, 47, 57),
      teaching: teaching(
        "Un neam de departe, „care va zbura ca vulturul”, va împresura cetățile până vor cădea zidurile cele mai înalte. Descrierea oroarei extreme a asediului — părinți împinși către canibalism din disperare — este redată fără eufemism, ca avertisment cutremurător.",
        "Aceste versete nu sunt o profeție care să fie dorită, ci un avertisment menit să prevină: consecințele extreme ale părăsirii legământului sunt arătate în toată oroarea lor, ca să nască teamă sănătoasă de nesocotire, nu curiozitate morbidă.",
      ),
      words: [
        {
          original: "כאשר ידאה הנשר",
          transliteration: "ka'asher yid'eh hanesher",
          language: "ebraica",
          meaning:
            "cum zboară vulturul. Imagine de viteză și forță devastatoare a invadatorului, aplicată istoric la marile imperii care au subjugat Israel și Iuda.",
        },
      ],
      crossRefs: ["2 Regi 6:28-29", "Plangerile lui Ieremia 4:10", "Habacuc 1:8"],
      forYourHeart:
        "Avertismentele grave ale lui Dumnezeu nu sunt cruzime, ci milostivire care vrea să prevină oroarea reală a păcătuirii continue.",
    },
    {
      id: "deuteronom-28-58-68",
      ref: "Deuteronom 28:58-68",
      heading: "Exilul final, inversarea completă a Exodului",
      text: deuteronomPassage(28, 58, 68),
      teaching: teaching(
        "Nesocotirea Numelui „slăvit și înfricoșător: DOMNUL, DUMNEZEUL TăU” aduce urgii fără sfârșit și împrăștierea printre toate popoarele, cu „o inimă tremurând” și teamă permanentă, ziua și noaptea, fără odihnă.",
        "Ultimul verset încheie capitolul cu o inversare completă și tragică a Exodului: „DOMNUL te va duce înapoi pe corăbii în Egipt... acolo vă veți oferi de vânzare vrăjmașilor tăi ca robi... dar nu va fi nimeni să vă cumpere”. Israel eliberat din robie ar putea, prin nesocotire, să se întoarcă în exact locul de unde a fost scos — și nici măcar ca robi n-ar mai fi vrednici de cumpărat.",
      ),
      words: [
        {
          original: "והתמכרתם שם... ואין קונה",
          transliteration: "vehitmakartem sham... ve'ein qoneh",
          language: "ebraica",
          meaning:
            "vă veți oferi de vânzare acolo... și nu va fi cumpărător. Fraza finală, dramatică, care descrie o degradare atât de deplină încât nici piața de sclavi nu-i mai vede valoarea — inversarea totală a demnității date la Exod.",
        },
      ],
      crossRefs: ["2 Cronici 36:15-21", "Osea 8:13", "Deuteronom 4:27"],
      forYourHeart:
        "Libertatea pe care Dumnezeu ți-a dat-o nu este garantată automat pentru totdeauna; păstreaz-o prețuind legământul care a adus-o.",
    },
  ],
  prayer:
    "Doamne, învață-ne să Te ascultăm cu bucurie în mijlocul belșugului, nu doar din obligație.\n\nDă-ne o inimă recunoscătoare care nu ia niciodată binecuvântarea Ta ca firească sau merită.\n\nPăzește-ne de nesocotirea care duce spre pustiire, și înmoaie-ne inima la cel mai mic semn de îndepărtare.\n\nȘi amintește-ne mereu că libertatea pe care ne-ai dat-o merită prețuită și păzită prin ascultare statornică. Amin.",
  status: DEUTERONOM_STATUSES[28],
})
