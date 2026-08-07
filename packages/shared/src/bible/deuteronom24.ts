import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_24 = deuteronomChapter({
  number: 24,
  title: "Deuteronom 24 — Demnitatea celui vulnerabil, în familie și în viața de fiecare zi",
  summary:
    "Moise reglementează divorțul deja existent, protejează căsătoria proaspătă, interzice răpirea de oameni, cere grijă față de cel sărac în luarea zălogului și plata lucrătorului, respinge pedeapsa colectivă, și cere dreptate și generozitate față de străin, orfan și văduvă.",
  literaryContext:
    "Acest capitol continuă legile de ordine socială din 22-23, extinzându-le către protecția demnității celui vulnerabil — femeia divorțată, robul răpit, lucrătorul sărac, străinul, orfanul și văduva — într-un fir unitar de compasiune practică.",
  historicalContext:
    "Cartea de despărțire menționată aici nu instituie divorțul, ci încearcă să-l limiteze și să-l facă formal, într-o cultură antică unde bărbații puteau alunga o nevastă fără nicio procedură; interdicția recompensei ei este o măsură împotriva ușurinței cu care s-ar fi luat această decizie.",
  units: [
    {
      id: "deuteronom-24-1-4",
      ref: "Deuteronom 24:1-4",
      heading: "Divorțul reglementat, nu poruncit",
      text: deuteronomPassage(24, 1, 4),
      teaching: teaching(
        "Legea nu instituie divorțul, ci îl reglementează — cartea de despărțire scrisă este o procedură formală care încetinește decizia și o face publică, într-o cultură unde bărbații aveau puterea de a alunga o nevastă fără nicio protecție pentru ea.",
        "Interdicția de a o lua înapoi după o a doua căsătorie — „căci este o urâciune înaintea DOMNULUI” — arată că legământul căsătoriei nu este un joc reversibil de conveniență, ci o legătură serioasă cu consecințe permanente.",
      ),
      words: [
        {
          original: "ספר כריתת",
          transliteration: "sefer keritut",
          language: "ebraica",
          meaning:
            "carte de tăiere/despărțire. Documentul formal care făcea publică și verificabilă despărțirea, protejând femeia de acuzația ulterioară de adulter dacă se recăsătorea.",
        },
      ],
      crossRefs: ["Matei 5:31-32", "Matei 19:7-9", "Ieremia 3:1"],
      forYourHeart:
        "Legămintele serioase nu se desfac și refac cu ușurință; consecințele lor sunt reale și durabile.",
    },
    {
      id: "deuteronom-24-5-9",
      ref: "Deuteronom 24:5-9",
      heading: "Căsătoria proaspătă ocrotită, răpirea de oameni pedepsită cu moartea",
      text: deuteronomPassage(24, 5, 9),
      teaching: teaching(
        "Bărbatul proaspăt căsătorit este scutit un an întreg de oaste și sarcini, ca să poată „înveseli pe nevasta pe care a luat-o” — legătura de familie recent formată este prețuită mai mult decât nevoile imediate ale comunității.",
        "Moara nu poate fi luată ca zălog, pentru că „s-ar lua ca zălog însăși viața omului” — mijlocul de existență zilnic nu poate fi confiscat. Răpirea unui om pentru robie sau vânzare este pedepsită cu moartea, iar bolile de lepră cer atenție strictă, cu amintirea judecății Mariei ca avertisment concret.",
      ),
      words: [
        {
          original: "גנב נפש",
          transliteration: "gonev nefesh",
          language: "ebraica",
          meaning:
            "cel care fură o viață/persoană. Termen distinct de furtul obișnuit al bunurilor — răpirea unei persoane pentru robie este tratată ca o crimă capitală, nu ca un simplu furt de proprietate.",
        },
      ],
      crossRefs: ["Numeri 12:10-15", "Exod 21:16", "1 Timotei 1:10"],
      forYourHeart:
        "Mijlocul de existență al altuia și libertatea lui de persoană sunt lucruri pe care nici o nevoie proprie nu le poate confisca.",
    },
    {
      id: "deuteronom-24-10-15",
      ref: "Deuteronom 24:10-15",
      heading: "Zălogul cu demnitate, plata lucrătorului fără întârziere",
      text: deuteronomPassage(24, 10, 15),
      teaching: teaching(
        "Cel care dă împrumut nu poate intra în casa datornicului să-și aleagă zălogul — trebuie să aștepte afară și să primească ce-i este oferit. Zălogul unui om sărac — probabil haina lui de noapte — trebuie returnat la apusul soarelui, ca să se poată culca acoperit.",
        "Argatul sărac trebuie plătit „în aceeași zi, înainte de apusul soarelui; căci este sărac și își pune nădejdea în ea”. Întârzierea plății pentru cel care depinde de ea zilnic nu este o simplă neplăcere administrativă, ci o nedreptate care strigă către DOMNUL.",
      ),
      words: [
        {
          original: "ביומו תתן שכרו",
          transliteration: "beyomo titten sekharo",
          language: "ebraica",
          meaning:
            "în ziua lui să-i dai plata. Formula care leagă direct plății de demnitatea celui sărac — pentru el, plata întârziată chiar cu o zi poate însemna o noapte fără hrană.",
        },
      ],
      crossRefs: ["Leviticul 19:13", "Iacov 5:4", "Exod 22:26-27"],
      forYourHeart:
        "Demnitatea celui care depinde de tine se păzește în detalii concrete — când și cum îi dăm ce i se datorează.",
    },
    {
      id: "deuteronom-24-16-18",
      ref: "Deuteronom 24:16-18",
      heading: "Responsabilitate individuală, dreptate pentru cel fără apărător",
      text: deuteronomPassage(24, 16, 18),
      teaching: teaching(
        "Legea respinge pedeapsa colectivă în cadrul familiei: „părinții să nu fie puși la moarte pentru copii și copiii... pentru părinți; fiecare... pentru păcatul lui”. Responsabilitatea morală este individuală, nu transferabilă prin înrudire.",
        "Judecata străinului și a orfanului nu poate fi strâmbată, iar haina văduvei nu poate fi luată ca zălog — pe motivul concret al propriei istorii: „adu-ți aminte că ai fost rob în Egipt”. Amintirea propriei vulnerabilități trebuie să nască milă pentru vulnerabilitatea altuia.",
      ),
      words: [
        {
          original: "איש בחטאו יומתו",
          transliteration: "ish bekhet'o yumatu",
          language: "ebraica",
          meaning:
            "fiecare om să fie pus la moarte pentru păcatul lui. Principiul responsabilității individuale în dreptul penal, care distinge legea lui Israel de practicile de pedeapsă colectivă din culturile din jur.",
        },
      ],
      crossRefs: ["Ezechiel 18:20", "2 Regi 14:6", "Exod 22:21-22"],
      forYourHeart:
        "Propria ta istorie de vulnerabilitate ar trebui să te facă mai atent, nu mai indiferent, la vulnerabilitatea altora.",
    },
    {
      id: "deuteronom-24-19-22",
      ref: "Deuteronom 24:19-22",
      heading: "Recolta împărțită cu străinul, orfanul și văduva",
      text: deuteronomPassage(24, 19, 22),
      teaching: teaching(
        "Snopul uitat pe ogor, măslinele rămase pe ramuri, ciorchinele rămase în vie — toate acestea nu se recuperează, ci se lasă pentru străin, orfan și văduvă. Această generozitate obligatorie face parte structurală din economia agricolă a lui Israel, nu o opțiune de caritate.",
        "Motivul repetat este identic cu cel din versetele precedente: „adu-ți aminte că ai fost rob în țara Egiptului”. Memoria eliberării proprii este forța motrice a generozității către cel fără protecție.",
      ),
      words: [
        {
          original: "לא תשוב לקחתו",
          transliteration: "lo tashuv leqachto",
          language: "ebraica",
          meaning:
            "să nu te întorci să-l iei. Interdicția recuperării deliberate a recoltei rămase, care transformă pierderea agricolă accidentală într-o formă sistematică de aprovizionare pentru cel vulnerabil.",
        },
      ],
      crossRefs: ["Rut 2:2-3", "Leviticul 19:9-10", "Deuteronom 15:15"],
      forYourHeart:
        "Amintirea propriei eliberări ar trebui să se transforme în generozitate concretă, nu doar în recunoștință abstractă.",
    },
  ],
  prayer:
    "Doamne, învață-ne să prețuim legămintele noastre cu seriozitate, fără să le desfacem ușor.\n\nDă-ne grijă față de mijlocul de existență și libertatea altuia, și plătește-ne prin noi datoria față de cel sărac fără întârziere.\n\nAjută-ne să ținem responsabilitatea individuală, nu să pedepsim pe cei nevinovați.\n\nȘi adu-ne aminte mereu de unde ne-ai răscumpărat, ca să fim generatori față de cel fără apărător. Amin.",
  status: DEUTERONOM_STATUSES[24],
})
