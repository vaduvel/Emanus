import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

const POONEN_SOURCE =
  "Zac Poonen — Through The Bible: Deuteronomy (Deuteronom 20:1-9)"
const TEXTUAL_SOURCE =
  "Emanus — exegeza textuală după Deuteronom 20; fără atribuirea unor aplicații lui Poonen acolo unde transcriptul nu le dezvoltă"

export const DEUTERONOM_20 = deuteronomChapter({
  number: 20,
  title: "Deuteronom 20 — Războiul, frica și inima împărțită",
  summary:
    "Capitolul începe cu chemarea de a nu se teme înaintea luptei și cu trimiterea acasă a celor a căror inimă este prinsă de casă, vie, căsătorie sau frică. Poonen folosește tocmai această primă secțiune ca o cercetare a priorităților: Dumnezeu caută oameni a căror preocupare principală este să trăiască pentru El. Restul capitolului stabilește rânduieli distincte pentru cetățile îndepărtate, pentru popoarele Canaanului și pentru pomii din timpul asediului.",
  literaryContext:
    "Deuteronom 20 se află în discursul lung al lui Moise despre viața poporului în țară. Poonen se oprește la începutul capitolului și îl aplică vieții de ucenicie; a doua jumătate continuă cu rânduielile de război date Israelului.",
  historicalContext:
    "Poruncile militare aparțin cadrului istoric al Israelului și cuceririi țării. Poonen folosește oamenii trimiși acasă în 20:1-9 pentru a cerceta prioritățile inimii: casa, familia, munca și alte interese pământești nu trebuie să ia locul întâi înaintea lui Dumnezeu.",
  units: [
    {
      id: "deuteronom-20-1-9",
      ref: "Deuteronom 20:1-9",
      heading: "Nu te teme — și nu merge cu inima împărțită",
      text: deuteronomPassage(20, 1, 9),
      teaching: teaching(
        "Înainte de luptă, preotul trebuie să spună poporului să nu se înmoaie la inimă și să nu se teamă, pentru că DOMNUL Dumnezeul lor merge cu ei. Poonen se oprește aici mai întâi la frică: omul lui Dumnezeu nu trebuie să fie condus de mărimea vrăjmașului, ci de faptul că Dumnezeu este cu el.",
        "Apoi vin oamenii trimiși acasă: cel care și-a zidit o casă și n-a inaugurat-o, cel care a sădit o vie și n-a început să se bucure de ea, cel logodit care nu și-a luat încă soția și, la urmă, cel fricos. Poonen ia foarte direct această listă și o aduce în viața creștinului: dacă proprietatea, viața de familie, slujba sau lucrurile pământești sunt interesul care îți stăpânește inima, ocupă-te de ele; Dumnezeu Își face lucrarea cu cei care sunt interesați înainte de toate să trăiască pentru El.",
        "Poonen nu spune că o casă, o soție sau o slujbă sunt rele; spune că ele nu pot ocupa locul întâi în omul care vrea să fie disponibil pentru Dumnezeu. Problema nu este existența acestor daruri, ci o inimă împărțită.",
        "Textul adaugă și motivul pentru care fricosul este trimis acasă: ca să nu facă și inima fraților lui să se topească. Frica nu rămâne întotdeauna privată. Într-o comunitate, necredința și curajul se pot răspândi de la unul la altul.",
      ),
      explanationKind: "exposition",
      explanationSource: POONEN_SOURCE,
      crossRefs: ["Luca 14:26-33", "Matei 6:33", "2 Timotei 2:4", "Evrei 12:1-2"],
      forYourHeart:
        "Ce îți ocupă primul loc în inimă: casa, banii, slujba, relația — sau chemarea de a trăi pentru Dumnezeu?",
    },
    {
      id: "deuteronom-20-10-15",
      ref: "Deuteronom 20:10-15",
      heading: "Cetățile cărora li se oferă pace",
      text: deuteronomPassage(20, 10, 15),
      teaching: teaching(
        "Versetele 10–15 cer ca unei cetăți atacate să i se proclame mai întâi pacea. Dacă cetatea acceptă și își deschide porțile, locuitorii ei intră sub muncă impusă pentru Israel. Dacă refuză pacea și pornește războiul, urmează asediul; după ce cetatea este dată în mâna lui Israel, pasajul descrie uciderea bărbaților și luarea femeilor, copiilor, animalelor și prăzii.",
        "Versetul 15 precizează că această procedură se aplică cetăților foarte îndepărtate, care nu aparțin cetăților popoarelor enumerate în versetele următoare.",
      ),
      explanationKind: "textual-overview",
      explanationSource: TEXTUAL_SOURCE,
    },
    {
      id: "deuteronom-20-16-20",
      ref: "Deuteronom 20:16-20",
      heading: "Nimicirea canaaniților și pomii din timpul asediului",
      text: deuteronomPassage(20, 16, 20),
      teaching: teaching(
        "Versetele 16–18 dau o poruncă diferită pentru cetățile popoarelor numite în țara dată Israelului: textul cere să nu fie lăsată în viață nicio făptură care respiră și enumeră hetiții, amoriții, canaaniții, fereziții, heviții și iebusiții. Motivul formulat în pasaj este ca Israel să nu învețe practicile lor religioase și să păcătuiască împotriva DOMNULUI. Severitatea poruncii nu este ascunsă sau reformulată.",
        "Versetele 19–20 tratează asediul prelungit. Pomii din care se poate mânca nu trebuie tăiați pentru lucrările de asediu; pomii cunoscuți ca neroditori pot fi folosiți până la căderea cetății.",
      ),
      explanationKind: "textual-overview",
      explanationSource: TEXTUAL_SOURCE,
    },
  ],
  prayer:
    "Doamne, scapă-ne și de frică, și de o inimă împărțită. Nu lăsa casa, banii, munca sau relațiile să ia locul care Îți aparține. Fă-ne disponibili pentru Tine. Amin.",
  status: DEUTERONOM_STATUSES[20],
})