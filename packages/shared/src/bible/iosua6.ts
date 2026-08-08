import { iosuaChapter, teaching } from "./iosuaHelpers.js"
import { iosuaPassage } from "./iosuaText.js"
import { IOSUA_STATUSES } from "./iosuaPublication.js"

const TEXTUAL_SOURCE =
  "Emanus — rezumat textual după Iosua 6; fără doctrină adăugată"

export const IOSUA_6 = iosuaChapter({
  number: 6,
  title: "Iosua 6 — Căderea Ierihonului",
  summary:
    "Capitolul descrie porunca dată lui Iosua pentru înconjurarea Ierihonului, căderea zidului după strigătul poporului, nimicirea cetății, salvarea lui Rahab și a casei ei, punerea metalelor deoparte pentru vistieria DOMNULUI și blestemul rostit asupra reconstruirii cetății.",
  literaryContext:
    "Iosua 6 urmează trecerii Iordanului și întâlnirii lui Iosua din capitolul precedent. Este prima cucerire de cetate relatată după intrarea în țară și introduce tema lucrurilor date spre nimicire, care continuă direct în episodul lui Acan din capitolul 7.",
  historicalContext:
    "Pasajul aparține narațiunii cuceririi Canaanului. Explicația descrie porunca și acțiunile din text fără a transforma războiul Ierihonului într-un model pentru violență religioasă, politică sau militară modernă.",
  units: [
    {
      id: "iosua-6-1-5",
      ref: "Iosua 6:1-5",
      heading: "Instrucțiunile pentru înconjurarea Ierihonului",
      text: iosuaPassage(6, 1, 5),
      teaching: teaching(
        "Versetele 1–5 prezintă Ierihonul ca fiind închis din cauza fiilor lui Israel. DOMNUL îi spune lui Iosua că a dat în mâna lui cetatea, împăratul și oamenii ei de război și îi dă o procedură precisă: oamenii de război să înconjoare cetatea o dată pe zi timp de șase zile, șapte preoți să poarte șapte trâmbițe înaintea chivotului, iar în ziua a șaptea cetatea să fie înconjurată de șapte ori.",
        "La sunetul prelung al trâmbiței, poporul trebuie să strige, iar textul spune că zidul cetății va cădea și poporul va urca fiecare înaintea lui. Explicația nu transformă această succesiune într-o metodă spirituală generală pentru obținerea unor «biruințe» personale.",
      ),
      explanationKind: "textual-overview",
      explanationSource: TEXTUAL_SOURCE,
    },
    {
      id: "iosua-6-6-14",
      ref: "Iosua 6:6-14",
      heading: "Primele șase zile",
      text: iosuaPassage(6, 6, 14),
      teaching: teaching(
        "Versetele 6–14 descriu punerea în practică a instrucțiunilor. Preoții poartă chivotul și trâmbițele, oamenii înarmați merg înainte, iar ariergarda urmează chivotul. Iosua poruncește poporului să nu strige și să nu rostească nimic până în ziua în care îi va spune să strige.",
        "În fiecare dintre primele șase zile cetatea este înconjurată o singură dată, după care poporul se întoarce în tabără. Textul relatează această repetare fără să ofere aici o explicație psihologică despre răbdarea sau credința generației.",
      ),
      explanationKind: "textual-overview",
      explanationSource: TEXTUAL_SOURCE,
    },
    {
      id: "iosua-6-15-21",
      ref: "Iosua 6:15-21",
      heading: "A șaptea zi, lucrurile date spre nimicire și uciderea cetății",
      text: iosuaPassage(6, 15, 21),
      teaching: teaching(
        "Versetele 15–20 descriu cele șapte înconjurări din ziua a șaptea, sunetul trâmbițelor și porunca lui Iosua ca poporul să strige. Cetatea este declarată dată spre nimicire pentru DOMNUL, cu excepția lui Rahab și a celor din casa ei, deoarece ascunsese solii. Poporul este avertizat să nu ia pentru sine lucrurile date spre nimicire; argintul, aurul și obiectele de bronz și fier sunt puse deoparte pentru vistieria DOMNULUI.",
        "Versetul 21 relatează explicit că au ucis cu sabia tot ce era în cetate: bărbat și femeie, tânăr și bătrân, bou, oaie și măgar. Explicația nu atenuează această afirmație și nici nu o transformă într-o autorizație pentru violență modernă; descrie acțiunea din narațiunea și cadrul ei istoric.",
      ),
      explanationKind: "textual-overview",
      explanationSource: TEXTUAL_SOURCE,
    },
    {
      id: "iosua-6-22-27",
      ref: "Iosua 6:22-27",
      heading: "Rahab este scoasă din cetate și blestemul asupra reconstruirii",
      text: iosuaPassage(6, 22, 27),
      teaching: teaching(
        "Versetele 22–25 descriu împlinirea jurământului față de Rahab. Cei doi bărbați care cercetaseră țara intră în casa ei și o scot pe ea, familia ei și tot ce îi aparține. Ei sunt așezați în afara taberei lui Israel, iar cetatea și tot ce era în ea sunt arse, cu excepția metalelor destinate vistieriei DOMNULUI. Textul spune apoi că Rahab a locuit în mijlocul lui Israel până în ziua redactării narațiunii.",
        "Versetele 26–27 consemnează jurământul/blestemul rostit de Iosua împotriva celui care va reconstrui Ierihonul și încheie capitolul spunând că DOMNUL era cu Iosua și că vestea despre el s-a răspândit în țară. Orice legătură ulterioară cu alte pasaje este tratată separat, nu introdusă ca doctrină în acest overview.",
      ),
      explanationKind: "textual-overview",
      explanationSource: TEXTUAL_SOURCE,
    },
  ],
  prayer:
    "Doamne, ajută-ne să citim cu fidelitate acest capitol greu, fără să ascundem violența relatată și fără să o folosim pentru a justifica violență în afara contextului ei biblic. Păzește-ne de interpretări care adaugă textului ceea ce nu spune. Amin.",
  status: IOSUA_STATUSES[6],
})