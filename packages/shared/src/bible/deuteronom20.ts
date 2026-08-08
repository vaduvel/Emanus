import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Deuteronom 20 — corecție finală de conținut.
 *
 * Textul biblic este păstrat separat prin deuteronomPassage(). Aici este doar
 * stratul de explicație. Deoarece transcriptul aprobat nu dezvoltă în mod
 * demonstrabil întreg capitolul, explicația rămâne textual-overview și nu
 * adaugă aplicații pastorale, tipologie sau studii lexicale nesusținute.
 */

const TEXTUAL_SOURCE =
  "Emanus — rezumat textual după Deuteronom 20; fără doctrină adăugată"

export const DEUTERONOM_20 = deuteronomChapter({
  number: 20,
  title: "Deuteronom 20 — Rânduieli pentru război",
  summary:
    "Capitolul stabilește rânduieli pentru Israel în vreme de război: încurajarea rostită înaintea luptei, cazurile în care un om este trimis acasă, procedura pentru cetățile îndepărtate, porunca distinctă privind cetățile popoarelor din Canaan și interdicția de a tăia pomii roditori în timpul unui asediu.",
  literaryContext:
    "Deuteronom 20 continuă seria de legi adresate vieții comunității lui Israel. Capitolul este alcătuit din instrucțiuni concrete pentru situații de război și face distincții între diferite tipuri de cetăți și diferite situații ale oamenilor chemați la luptă.",
  historicalContext:
    "Pasajul aparține cadrului istoric al Israelului antic și al intrării în țară. Explicația nu transferă automat aceste porunci asupra conflictelor moderne și nu identifică popoare sau state contemporane cu grupurile numite în text.",
  units: [
    {
      id: "deuteronom-20-1-9",
      ref: "Deuteronom 20:1-9",
      heading: "Încurajarea înaintea luptei și cei trimiși acasă",
      text: deuteronomPassage(20, 1, 9),
      teaching: teaching(
        "Versetele 1–4 descriu cuvintele pe care preotul trebuie să le rostească înaintea luptei. Poporului i se spune să nu se teamă de cai, care de luptă sau de o oștire mai numeroasă, iar motivul dat de text este că DOMNUL merge cu Israel pentru a lupta împotriva vrăjmașilor lui și pentru a-l izbăvi.",
        "Versetele 5–9 enumeră cazurile în care un om este trimis acasă: cel care a zidit o casă și nu a inaugurat-o, cel care a sădit o vie și nu s-a bucurat încă de rodul ei, cel logodit care nu și-a luat încă soția și cel fricos. Despre ultimul caz textul spune explicit că este trimis acasă pentru ca inima fraților lui să nu se topească asemenea inimii lui. După aceste scutiri, căpeteniile sunt puse în fruntea poporului.",
      ),
      explanationKind: "textual-overview",
      explanationSource: TEXTUAL_SOURCE,
    },
    {
      id: "deuteronom-20-10-15",
      ref: "Deuteronom 20:10-15",
      heading: "Cetățile cărora li se oferă pace",
      text: deuteronomPassage(20, 10, 15),
      teaching: teaching(
        "Versetele 10–15 cer ca unei cetăți atacate să i se proclame mai întâi pacea. Dacă cetatea acceptă și își deschide porțile, locuitorii ei intră sub muncă impusă pentru Israel. Dacă refuză pacea și pornește războiul, urmează asediul; după ce cetatea este dată în mâna lui Israel, pasajul descrie uciderea bărbaților și luarea femeilor, copiilor, animalelor și prăzii.",
        "Versetul 15 precizează că această procedură se aplică cetăților foarte îndepărtate, care nu aparțin cetăților popoarelor enumerate în versetele următoare. Explicația păstrează această distincție a textului fără a transforma «oferta de pace» într-o regulă pastorală generală pentru orice conflict interpersonal.",
      ),
      explanationKind: "textual-overview",
      explanationSource: TEXTUAL_SOURCE,
    },
    {
      id: "deuteronom-20-16-20",
      ref: "Deuteronom 20:16-20",
      heading: "Cetățile canaanite și pomii din timpul asediului",
      text: deuteronomPassage(20, 16, 20),
      teaching: teaching(
        "Versetele 16–18 dau o poruncă diferită pentru cetățile popoarelor numite în țara dată Israelului: textul cere să nu fie lăsată în viață nicio făptură care respiră și enumeră hetiții, amoriții, canaaniții, fereziții, heviții și iebusiții. Motivul formulat în pasaj este ca Israel să nu învețe practicile religioase descrise drept urâciuni și să păcătuiască împotriva DOMNULUI.",
        "Versetele 19–20 tratează asediul prelungit al unei cetăți. Pomii din care se poate mânca nu trebuie tăiați pentru lucrările de asediu; pomii cunoscuți ca neroditori pot fi tăiați și folosiți până la căderea cetății. Explicația nu numește această regulă o doctrină ecologică modernă și nu folosește porunca de nimicire pentru a justifica violență religioasă sau politică astăzi.",
      ),
      explanationKind: "textual-overview",
      explanationSource: TEXTUAL_SOURCE,
    },
  ],
  prayer:
    "Doamne, ajută-ne să citim acest capitol așa cum este scris, fără să transformăm războaiele Israelului antic în permisiuni pentru violență modernă și fără să ascundem severitatea textului. Dă-ne discernământ să deosebim descrierea și porunca din contextul ei de aplicațiile doctrinare care trebuie argumentate separat. Amin.",
  status: DEUTERONOM_STATUSES[20],
})