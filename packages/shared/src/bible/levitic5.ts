import { leviticChapter, teaching } from "./leviticHelpers.js"

/*
 * Cartea Levitic, explicată pe unități de sens.
 *
 * Textul biblic: păstrat separat în leviticText.ts (fișierele leviticTextN.ts).
 * Explicația: scrisă pentru Emanus după cercetarea textului. Nu se copiază
 * formularea niciunui predicator sau comentator.
 */

export const LEVITIC_5 = leviticChapter({
  number: 5,
  title: "Levitic 5 — Vina care nu se vede și jertfa care se poate duce",
  summary:
    "Capitolul începe cu păcate pe care nimeni nu le-ar numi păcate: omul care a auzit un jurământ de martor și a tăcut, cel care s-a atins de o necurăție fără să bage de seamă, cel care a rostit o făgăduință pripită și a uitat-o. Când ajunge să vadă ce a făcut, mărturisește și aduce jertfă. Apoi vine scara darurilor: cine nu poate aduce un miel aduce două turturele; cine nu poate nici atât aduce o mână de făină, fără untdelemn și fără tămâie. Ultima parte vorbește despre jertfa pentru vină: cine s-a atins pe nedrept de lucrurile sfinte întoarce ce a luat, mai adaugă a cincea parte și aduce un berbec.",
  literaryContext:
    "Capitolul dinainte vorbea despre păcatul făcut fără voie, așezat pe trepte de răspundere. Aici se coboară în viața de fiecare zi și se dau pilde: tocmai lucrurile care nu se socotesc, și pe care omul le uită. Ia aminte că întâia pildă este o tăcere — nu o faptă, ci o nefaptă. Și vezi ce se adaugă aici pentru întâia dată în rândul jertfelor pentru păcat: mărturisirea cu gura. Nu numai animalul: și cuvântul omului. La mijloc stă scara darurilor, iar la sfârșit un fel nou de jertfă, cea pentru vină, unde nu se cere numai ispășire, ci și întoarcerea a ceea ce s-a luat.",
  historicalContext:
    "În lumea aceea nu erau scrisori și acte pentru toate; judecata se făcea la poarta cetății și stătea aproape întreagă pe mărturia oamenilor. Când se rostea jurământul de martor, cine știa ceva era ținut să vorbească; tăcerea lui putea lăsa un nevinovat fără dreptate. De aceea tăcerea este pusă aici întâia între păcate. Iar scara darurilor arată cât de sărac era poporul: o pasăre se putea prinde, iar o mână de făină se găsea în orice casă. La darul din făină al celui sărac nu se punea untdelemn și nici tămâie — nu fiindcă ar fi fost scump, ci fiindcă acesta nu era un dar de bucurie, ci pentru păcat. La sfârșit, a cincea parte adăugată era o rânduială cunoscută și în legile din jur: cel care lua ce nu era al lui dădea îndoit sau cu adăugare, ca întoarcerea să doară mai mult decât paguba.",
  units: [
    {
      verses: [1, 6],
      heading: "Când tăcerea este păcat",
      teaching: teaching(
        "Cea dintâi pildă din capitol nu este o faptă, ci o tăcere: cine a auzit jurământul de martor, știe ceva și nu spune, poartă vina. Ia aminte ce lucru mare se învață aici. Noi socotim păcat ce facem; Dumnezeu socotește păcat și ce nu facem când trebuia să facem.",
        "        ".trim() === "" ? "" : "",
      ),
      words: [],
      crossRefs: [],
    },
  ],
  prayer: "placeholder"
})
