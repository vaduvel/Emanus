import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_16 = deuteronomChapter({
  number: 16,
  title: "Deuteronom 16 — Trei sărbători pe an, și o dreptate fără părtinire",
  summary:
    "Moise stabilește cele trei sărbători de pelerinaj — Paștele cu Azimele, Sărbătoarea Săptămânilor și Sărbătoarea Corturilor — la care fiecare bărbat trebuie să se înfățișeze la locul ales. Capitolul se încheie cu porunca de a numi judecători drepți, fără mită sau părtinire, și interzicerea altarelor idolatre cu Asera sau stâlpi de piatră.",
  literaryContext:
    "Acest capitol continuă tema locului central de închinare din capitolul 12, aplicând-o la calendarul anual de sărbători. Tranziția finală către justiție pregătește capitolul 17, care va detalia sistemul de conducere și judecată al lui Israel.",
  historicalContext:
    "Cele trei sărbători de pelerinaj erau legate de ciclul agricol: Paștele la începutul recoltei de orz, Sărbătoarea Săptămânilor (Cincizecimea) la încheierea recoltei de grâu, și Sărbătoarea Corturilor la strângerea finală a recoltei de toamnă.",
  units: [
    {
      id: "deuteronom-16-1-8",
      ref: "Deuteronom 16:1-8",
      heading: "Paștele, amintește-ți de noaptea ieșirii",
      text: deuteronomPassage(16, 1, 8),
      teaching: teaching(
        "Paștele se ține în luna Abib, „căci în luna Abib te-a scos DOMNUL, Dumnezeul tău, din Egipt, noaptea”. Jertfa trebuie adusă exclusiv la locul ales de DOMNUL, nu în orice cetate, subliniind din nou principiul centralizării cultului.",
        "Pâinea fără aluat, mâncată șapte zile, este numită „pâinea suferinței”, ca amintire permanentă a plecării grabnice din Egipt: „căci ai ieșit în grabă din țara Egiptului; și să-ți amintești în toate zilele vieții tale de ziua ieșirii”.",
      ),
      words: [
        {
          original: "לחם עני",
          transliteration: "lechem oni",
          language: "ebraica",
          meaning:
            "pâinea suferinței/necazului. Denumirea pâinii fără aluat, care amintește de graba și suferința plecării din Egipt, nu doar de o rețetă obișnuită.",
        },
      ],
      crossRefs: ["Exod 12:1-14", "Exod 13:3-10", "1 Corinteni 5:7-8"],
      forYourHeart:
        "Bucuria eliberării se ține bine în minte doar dacă nu se separă de amintirea suferinței din care ai fost izbăvit.",
    },
    {
      id: "deuteronom-16-9-15",
      ref: "Deuteronom 16:9-15",
      heading: "Sărbătoarea Săptămânilor și Sărbătoarea Corturilor",
      text: deuteronomPassage(16, 9, 15),
      teaching: teaching(
        "Șapte săptămâni de la începutul secerișului se ține Sărbătoarea Săptămânilor, cu un dar proporțional cu belșugul primit: „potrivit cu binecuvântarea pe care ți-o va da DOMNUL”. Această sărbătoare include expres pe fiul, fiica, robul, roaba, Levitul, străinul, orfanul și văduva din mijlocul tău.",
        "Sărbătoarea Corturilor, ținută șapte zile la strângerea recoltei de pe arie și din teasc, este numită direct sărbătoare a bucuriei: „să te bucuri în sărbătoarea ta... și vei fi cu adevărat plin de bucurie”. Recolta belșugului trebuie să se întoarcă către bucurie împărtășită, nu spre lăcomie personală.",
      ),
      words: [
        {
          original: "חג השבעות",
          transliteration: "chag ha-shavuot",
          language: "ebraica",
          meaning:
            "Sărbătoarea Săptămânilor, cunoscută mai târziu în grecește ca Pentecost (a cincizecea zi), sărbătoare care va marca și pogorârea Duhului Sfânt din Fapte 2.",
        },
      ],
      crossRefs: ["Leviticul 23:15-22", "Fapte 2:1-4", "Leviticul 23:33-43"],
      forYourHeart:
        "Belșugul care vine într-o sărbătoare este menit să fie împărtășit, incluzând pe cei care nu au propriile lor resurse.",
    },
    {
      id: "deuteronom-16-16-17",
      ref: "Deuteronom 16:16-17",
      heading: "Fiecare bărbat, de trei ori pe an",
      text: deuteronomPassage(16, 16, 17),
      teaching: teaching(
        "Cele trei sărbători sunt rezumate ca obligatorii pentru fiecare bărbat din Israel: „de trei ori pe an, tot poporul tău de parte bărbătească să se înfățișeze înaintea DOMNULUI”. Prezența în fața DOMNULUI nu este opțională pentru cel care face parte din legământ.",
        "Porunca finală arată că darul nu este uniform pentru toți: „fiecare să dea ce va putea, potrivit cu binecuvântarea pe care i-a dat-o DOMNUL”. Nu este cerută o sumă fixă, ci un dar proporțional cu ceea ce fiecare a primit deja.",
      ),
      words: [
        {
          original: "לא יראה את-פני יהוה ריקם",
          transliteration: "lo yera'e et-pnei YHWH reikam",
          language: "ebraica",
          meaning:
            "să nu se arate cu mâna goală înaintea DOMNULUI. Formula subliniază că prezența înaintea lui Dumnezeu cere și un dar, nu doar apariția fizică.",
        },
      ],
      crossRefs: ["Exod 23:14-17", "Exod 34:23-24", "2 Corinteni 8:12"],
      forYourHeart:
        "Dăruirea ta nu este măsurată la fel ca a altuia; ea trebuie să fie proporțională cu binecuvântarea pe care ai primit-o tu.",
    },
    {
      id: "deuteronom-16-18-22",
      ref: "Deuteronom 16:18-22",
      heading: "Judecători fără părtinire, un altar fără idoli",
      text: deuteronomPassage(16, 18, 22),
      teaching: teaching(
        "Sistemul de conducere trebuie să fie întemeiat pe judecători numiți în fiecare cetate: „să nu calci dreptul, să nu ai în vedere fața omului și să nu iei mită”. Justiția părtinitoare pentru cel cu putere sau avere este interzisă categoric.",
        "Formula „dreptatea, numai dreptatea să urmărești” rezumă principiul central al sistemului legal al lui Israel, care este dat direct în legătură cu viața: „ca să trăiești și să stăpânești țara”. Capitolul se încheie cu interdicția de a planta un Asera sau ridica un stâlp de piatră lângă altarul DOMNULUI — curata închinare nu se poate mixa cu simbolurile idolatre.",
      ),
      words: [
        {
          original: "צדק צדק תרדף",
          transliteration: "tzedeq tzedeq tirdof",
          language: "ebraica",
          meaning:
            "dreptatea, numai dreptatea să urmărești (repetare pentru intensitate). Formula clasică a justiției biblice, fără compromis și fără părtinire.",
        },
      ],
      crossRefs: ["Exod 23:6-8", "Deuteronom 1:16-17", "Amos 5:24"],
      forYourHeart:
        "Nu urmări dreptatea doar când te avantajează; urmărește-o fără părtinire, indiferent cine este în fața ta.",
    },
  ],
  prayer:
    "Doamne, învață-ne să ne aducem aminte de eliberarea Ta în fiecare sărbătoare pe care ți-o aducem.\n\nDă-ne bucurie în dăruire, proporțională cu binecuvântarea primită.\n\nRidică în mijlocul nostru judecători care urmăresc numai dreptatea, fără mită și fără părtinire.\n\nȘi păzește închinarea noastră curată, fără mixturi cu idolii lumii. Amin.",
  status: DEUTERONOM_STATUSES[16],
})
