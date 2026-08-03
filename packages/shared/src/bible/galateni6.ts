import { galateniChapter, teaching } from "./galateniHelpers.js"

/*
 * Textul biblic este materializat separat din RCCV.
 * Explicațiile sunt redactate în română pe baza studiilor verse-by-verse
 * ale lui Zac Poonen, fără copiere 1:1. Daniel rămâne reviewerul final.
 */

export const GALATENI_6 = galateniChapter({
  number: 6,
  title: "Galateni 6 — Semănarea în Duhul și lauda în cruce",
  summary: "Cei spirituali restaurează cu blândețe, poartă poverile altora și își cercetează propria lucrare. Pavel reafirmă principiul semănatului și seceratului, chemarea de a face bine și singura laudă legitimă: crucea lui Hristos și noua creație.",
  literaryContext: "Finalul scrisorii traduce umblarea prin Duhul în relații, responsabilitate materială și perseverență. Ultimele versete reiau conflictul cu circumcizia și concentrează întreaga epistolă în cruce și noua creație.",
  historicalContext: "Învățătorii care promovau circumcizia puteau arăta convertiții ca dovadă a succesului lor și evitau astfel prigoana asociată crucii. Pavel contrastează această laudă cu semnele suferinței purtate pentru Isus.",
  units: [
    {
      verses: [1, 5],
      heading: "Restaurare blândă și poveri purtate",
      teaching: teaching(
        "Spiritualitatea se vede în felul în care tratăm un om căzut. Cel condus de Duhul caută restaurarea cu blândețe și se păzește pe sine, conștient că este la fel de vulnerabil.",
        "A purta povara altuia împlinește legea lui Hristos. Restaurarea nu cere unei victime să ascundă abuzul, să renunțe la siguranță, la ajutor medical sau la protecție legală; păcatul grav poate necesita distanță, raportare și intervenția autorităților competente.",
      ),
      crossRefs: ["Matei 18:15-17", "Romani 15:1-3", "Iacov 5:19-20"],
      forYourHeart: "Apropie-te de cel căzut cu adevăr și blândețe, fără să minimalizezi răul sau riscul.",
    },
    {
      verses: [6, 10],
      heading: "Ce seamănă omul, aceea va secera",
      teaching: teaching(
        "Cei hrăniți spiritual sunt chemați să împartă bunurile cu cei care îi învață, dar această poruncă nu autorizează presiune financiară, promisiuni de câștig sau manipularea donatorilor. Dărnicia rămâne liberă, responsabilă și transparentă.",
        "Fiecare gând, cuvânt, faptă și ambiție seamănă fie în fire, fie în Duhul. Recolta poate întârzia, de aceea Pavel ne îndeamnă să nu obosim în facerea binelui, mai ales față de familia credinței.",
      ),
      crossRefs: ["2 Corinteni 9:6-8", "1 Timotei 5:17-18", "Evrei 6:10-12"],
      forYourHeart: "Seamănă astăzi un cuvânt, un ajutor sau o alegere care va produce viață, nu corupție.",
    },
    {
      verses: [11, 18],
      heading: "Crucea și noua creație",
      teaching: teaching(
        "Cei care impuneau circumcizia urmăreau o imagine bună și evitarea prigoanei crucii. Pavel refuză să se laude cu numărul adepților sau cu performanța religioasă.",
        "Singura lui laudă este crucea prin care lumea a fost răstignită față de el, iar el față de lume. Ceea ce contează este noua creație: o viață în care vechiul sistem al slavei omenești și-a pierdut puterea, iar Hristos este centrul.",
      ),
      crossRefs: ["2 Corinteni 5:17", "Filipeni 3:7-11", "Coloseni 2:11-15"],
      forYourHeart: "Întreabă-te ce succes te face să te lauzi și mută-ți bucuria în crucea lui Hristos.",
    },
  ],
  prayer: "Doamne Isuse, fă-mă blând cu cei căzuți, credincios în purtarea poverilor și perseverent în facerea binelui. Păzește-mă de lauda omenească și fă din mine o nouă creație care se laudă numai în crucea Ta. Amin.",
})
