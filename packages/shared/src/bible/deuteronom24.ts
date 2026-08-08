import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Deuteronom 24 — explicație textuală.
 * Textul biblic rămâne separat în deuteronomText; acest fișier modifică doar
 * stratul de explicație. În lipsa unei expuneri aprobate care să acopere
 * capitolul, nu se introduc aplicații pastorale, reconstrucții istorice sau
 * studii lexicale ca și când ar fi concluzii ale textului.
 */

const TEXTUAL_SOURCE =
  "Emanus — rezumat textual după Deuteronom 24; fără doctrină adăugată"

export const DEUTERONOM_24 = deuteronomChapter({
  number: 24,
  title: "Deuteronom 24 — Rânduieli despre familie, datorii, muncă și cei vulnerabili",
  summary:
    "Capitolul cuprinde rânduieli despre divorț și recăsătorire, scutirea temporară a bărbatului proaspăt căsătorit, obiectele care nu pot fi luate ca zălog, răpirea unei persoane, regulile privind lepra, luarea zălogului, plata lucrătorului, responsabilitatea individuală în pedeapsă și protejarea străinului, orfanului și văduvei, inclusiv prin lăsarea unei părți din recoltă pentru ei.",
  literaryContext:
    "Deuteronom 24 continuă seria de rânduieli juridice și sociale din discursul lui Moise. Unitățile sunt scurte și tratează situații diferite, unite prin cerințe concrete privind relațiile dintre membrii comunității.",
  historicalContext:
    "Pasajul aparține legislației Israelului antic. Explicația descrie regulile formulate de text și evită să atribuie automat fiecărei reguli un scop social sau istoric care nu este declarat explicit în pasaj.",
  units: [
    {
      id: "deuteronom-24-1-4",
      ref: "Deuteronom 24:1-4",
      heading: "Divorțul, recăsătorirea și interdicția revenirii la primul soț",
      text: deuteronomPassage(24, 1, 4),
      teaching: teaching(
        "Versetele 1–4 descriu cazul în care un bărbat îi scrie soției un document de despărțire, femeia pleacă și se căsătorește cu un alt bărbat, iar a doua căsătorie se încheie prin divorț sau prin moartea celui de-al doilea soț. În această situație, primul soț nu are voie să o ia din nou de soție.",
        "Textul numește această revenire o urâciune și avertizează să nu fie adus păcat asupra țării. Pasajul nu explică aici toate motivele teologice ale divorțului și recăsătoririi; acestea nu sunt completate în overview prin concluzii luate din alte texte fără sursă doctrinară explicită.",
      ),
      explanationKind: "textual-overview",
      explanationSource: TEXTUAL_SOURCE,
    },
    {
      id: "deuteronom-24-5-9",
      ref: "Deuteronom 24:5-9",
      heading: "Căsătoria nouă, zălogul vital, răpirea și lepra",
      text: deuteronomPassage(24, 5, 9),
      teaching: teaching(
        "Versetul 5 scutește pentru un an de război și alte sarcini publice pe bărbatul care tocmai s-a căsătorit, ca să rămână acasă și să-și bucure soția. Versetul 6 interzice luarea pietrelor de moară ca zălog, deoarece sunt legate de mijlocul de trai.",
        "Versetul 7 cere moartea celui prins că a răpit un israelit pentru a-l trata ca rob sau pentru a-l vinde. Versetele 8–9 cer respectarea instrucțiunilor preoților în cazurile de lepră și amintesc ce i s-a întâmplat Mariei pe drumul din Egipt. Explicația păstrează aceste patru reguli distincte și nu le transformă într-o singură doctrină generală.",
      ),
      explanationKind: "textual-overview",
      explanationSource: TEXTUAL_SOURCE,
    },
    {
      id: "deuteronom-24-10-15",
      ref: "Deuteronom 24:10-15",
      heading: "Zălogul și plata lucrătorului",
      text: deuteronomPassage(24, 10, 15),
      teaching: teaching(
        "Versetele 10–13 spun că cel care dă un împrumut nu trebuie să intre în casa datornicului pentru a-și lua singur zălogul; trebuie să aștepte afară. Dacă datornicul este sărac și zălogul este haina lui, aceasta trebuie înapoiată până la apus pentru ca omul să poată dormi în ea.",
        "Versetele 14–15 interzic asuprirea lucrătorului sărac, fie israelit, fie străin. Plata trebuie dată în aceeași zi, înainte de apus, deoarece lucrătorul depinde de ea. Textul avertizează că altfel el poate striga către DOMNUL, iar vina va fi pusă asupra celui care reține plata.",
      ),
      explanationKind: "textual-overview",
      explanationSource: TEXTUAL_SOURCE,
    },
    {
      id: "deuteronom-24-16-18",
      ref: "Deuteronom 24:16-18",
      heading: "Pedeapsa individuală și dreptul străinului, orfanului și văduvei",
      text: deuteronomPassage(24, 16, 18),
      teaching: teaching(
        "Versetul 16 interzice ca părinții să fie omorâți pentru faptele copiilor sau copiii pentru faptele părinților; fiecare trebuie să fie omorât pentru propriul păcat în cadrul regulii juridice formulate aici.",
        "Versetele 17–18 interzic strâmbarea dreptului străinului și orfanului și luarea hainei văduvei ca zălog. Motivația dată explicit este memoria robiei în Egipt și a răscumpărării de acolo; de aceea Israel primește porunca să împlinească această rânduială.",
      ),
      explanationKind: "textual-overview",
      explanationSource: TEXTUAL_SOURCE,
    },
    {
      id: "deuteronom-24-19-22",
      ref: "Deuteronom 24:19-22",
      heading: "Ce rămâne din recoltă pentru străin, orfan și văduvă",
      text: deuteronomPassage(24, 19, 22),
      teaching: teaching(
        "Versetele 19–22 cer ca snopul uitat pe ogor să nu fie recuperat, măslinii să nu fie scuturați a doua oară și via să nu fie culeasă din nou după recoltarea principală. Ceea ce rămâne este destinat străinului, orfanului și văduvei.",
        "Și aici motivația exprimată în text este amintirea faptului că Israel fusese rob în Egipt. Explicația nu extinde automat aceste reguli agricole într-un sistem economic modern; consemnează destinatarii, acțiunile cerute și motivul formulat de pasaj.",
      ),
      explanationKind: "textual-overview",
      explanationSource: TEXTUAL_SOURCE,
    },
  ],
  prayer:
    "Doamne, ajută-ne să citim aceste rânduieli cu atenție și să nu le atribuim scopuri sau aplicații pe care textul nu le formulează. Dă-ne respect pentru dreptatea și grija față de aproapele pe care pasajul le cere în situațiile descrise. Amin.",
  status: DEUTERONOM_STATUSES[24],
})