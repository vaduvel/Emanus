import { judecatoriChapter, teaching } from "./judecatoriHelpers.js"
import { judecatoriStatus } from "./judecatoriPublication.js"

/* Judecători 21 — text Biblia Emanus; explicație originală Emanus după cercetarea textului și a transcrierii Through The Bible. */
export const JUDECATORI_21 = judecatoriChapter({
  number: 21,
  title: "Judecători 21 — Jurăminte, masacru și răpire: finalul în care fiecare făcea ce-i plăcea",
  summary:
    "Israel descoperă că jurământul de a nu da femei beniamiților poate duce la dispariția seminției. În loc să-și recunoască și să-și repare jurământul nesăbuit, adunarea atacă Iabeșul din Galaad și ia patru sute de fecioare. Pentru bărbații rămași, conducătorii permit răpirea fetelor care dansează la Șilo. Cartea se încheie cu diagnosticul că fiecare făcea ce era drept în ochii lui.",
  literaryContext:
    "Ultimul capitol nu oferă o rezolvare curată, ci arată cum oamenii încearcă să repare consecințele violenței prin alte violențe. Refrenul despre lipsa unui împărat și dreptatea proprie leagă idolatria din capitolul 17 de abuzul social din capitolele 19–21.",
  historicalContext:
    "Jurămintele comunitare aveau greutate solemnă, dar Legea nu cerea împlinirea unui jurământ care producea rău și oferea cadre pentru mărturisire și răspundere. Iabeșul din Galaad este pedepsit pentru absența de la adunare. Sărbătoarea de la Șilo devine ocazia unei răpiri tolerate de conducători.",
  units: [
    {
      verses: [1, 7],
      heading: "Poporul plânge o ruptură pe care propria furie și propriul jurământ au creat-o",
      teaching: teaching(
        "Israel plânge că lipsește o seminție, dar nu recunoaște imediat că aproape a nimicit-o și că jurământul său agravează criza. Durerea față de consecință nu este încă pocăință față de deciziile care au produs-o.",
        "Jurământul de a nu da fiice beniamiților este tratat ca o constrângere absolută, deși fusese rostit în mânia conflictului. O promisiune nesăbuită nu devine mai sfântă când este apărată printr-un rău și mai mare.",
        "Comunitatea caută o portiță juridică în locul adevărului: cum poate păstra litera jurământului și totuși obține femei? Când reputația religioasă contează mai mult decât persoana, conștiința inventează soluții care păstrează formula și calcă dreptatea.",
      ),
      crossRefs: ["Levitic 5:4-6", "1 Samuel 14:24-45", "Matei 23:16-24"],
      forYourHeart:
        "Când o promisiune a fost nesăbuită și produce rău, nu căuta o portiță care păstrează aparența. Mărturisește, cere iertare și repară în adevăr.",
    },
    {
      verses: [8, 15],
      heading: "Iabeș-Galaad este masacrat pentru ca o seminție să primească patru sute de femei",
      teaching: teaching(
        "Adunarea descoperă că Iabeșul din Galaad nu participase și trimite o armată să ucidă populația, păstrând numai patru sute de fete. O comunitate este distrusă pentru a rezolva consecința distrugerii altei comunități.",
        "Femeile nu sunt consultate și sunt tratate ca resurse pentru supraviețuirea seminției. Textul nu numește această soluție bună; o așază în seria faptelor care arată cât de adânc s-a prăbușit Israel.",
        "Cei patru sute de beniamiți primesc femeile, dar nu sunt suficiente. În loc să se oprească și să recunoască nedreptatea, conducătorii caută un nou mecanism de a obține alte persoane fără să pară că încalcă jurământul.",
      ),
      crossRefs: ["Deuteronom 24:16", "Psalmul 82:3-4", "Mica 6:8"],
      forYourHeart:
        "Nicio cauză colectivă, familie, seminție sau instituție nu are dreptul să transforme femeile și copiii în resurse pentru supraviețirea sa. Persoana poartă chipul lui Dumnezeu și trebuie ascultată, protejată și tratată cu demnitate.",
    },
    {
      verses: [16, 25],
      heading: "Răpirea de la Șilo și verdictul final asupra unei societăți fără domnia lui Dumnezeu",
      teaching: teaching(
        "Conducătorii îi sfătuiesc pe beniamiți să pândească fetele care dansează și să le răpească. Apoi pregătesc un răspuns pentru tați și frați, ca jurământul să pară neîncălcat. Este o legalizare a abuzului prin artificiu verbal.",
        "Acest pasaj nu oferă un model pentru căsătorie, curtare sau «voia lui Dumnezeu». Răpirea, constrângerea și lipsa consimțământului sunt parte din diagnosticul moral al cărții. O căsătorie creștină nu se întemeiază pe capturare, presiune sau dreptul grupului asupra femeii.",
        "Ultimul vers explică totul: nu era împărat în Israel și fiecare făcea ce era drept în ochii lui. Problema nu se rezolvă doar prin apariția oricărui conducător uman; cartea cere domnia dreaptă a lui Dumnezeu, ascultarea de Cuvânt și o inimă care nu își proclamă dorința drept adevăr.",
      ),
      words: [
        {
          original: "הַיָּשָׁר בְּעֵינָיו",
          transliteration: "ha-iașar be-einav",
          language: "ebraica",
          meaning:
            "ceea ce era drept în ochii lui. Formula finală este verdict asupra autonomiei morale: omul își face propria dorință criteriul binelui și ajunge să numească soluție o nouă nedreptate.",
        },
      ],
      crossRefs: ["Deuteronom 12:8", "Judecători 17:6", "Proverbe 14:12", "Marcu 10:42-45"],
      forYourHeart:
        "Consimțământul și siguranța nu sunt detalii opționale. Dacă cineva folosește Biblia, familia sau comunitatea pentru a te constrânge într-o relație, caută ajutor și protecție; acest capitol expune asemenea fapte, nu le binecuvântează.",
    },
  ],
  prayer:
    "Doamne, iartă-ne pentru jurămintele, sistemele și tradițiile prin care păstrăm aparența și rănim persoane.\n\nOprește în comunitățile noastre masacrul reputațional, constrângerea, răpirea, căsătoria forțată și tratarea femeilor ca resurse.\n\nDă-ne curaj să mărturisim deciziile greșite și să reparăm fără a produce o victimă nouă.\n\nDomnește Tu peste ochii, dorințele și conștiința noastră, ca să nu numim drept ceea ce ne place nouă. Amin.",
  status: judecatoriStatus(21),
})
