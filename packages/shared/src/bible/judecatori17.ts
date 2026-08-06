import { judecatoriChapter, teaching } from "./judecatoriHelpers.js"
import { judecatoriStatus } from "./judecatoriPublication.js"

/* Judecători 17 — text Biblia Emanus; explicație originală Emanus după cercetarea textului și a transcrierii Through The Bible. */
export const JUDECATORI_17 = judecatoriChapter({
  number: 17,
  title: "Judecători 17 — Mica și religia făcută după chipul propriei dorințe",
  summary:
    "Mica restituie argintul furat mamei sale, dar banii sunt folosiți pentru un chip cioplit și unul turnat. El își amenajează o casă de dumnezei, face un efod și își numește propriul fiu preot. Mai târziu angajează un levit și presupune că prezența lui îi garantează binecuvântarea DOMNULUI.",
  literaryContext:
    "Capitolele 17–21 formează epilogul cărții și nu mai urmează ciclul obișnuit al unui judecător. Ele arată degradarea religioasă și socială din interiorul lui Israel. Repetiția «fiecare făcea ce-i plăcea» interpretează narațiunile, nu le aprobă.",
  historicalContext:
    "Cultul legitim al lui Israel era legat de sanctuarul stabilit de DOMNUL și de preoția aaronică. O gospodărie cu idoli, efod și preot privat combina vocabularul credinței în DOMNUL cu practicile religioase ale popoarelor din jur. Levitul din Betleem căuta un loc stabil și ajunge dependent financiar de Mica.",
  units: [
    {
      verses: [1, 6],
      heading: "Argint furat, binecuvântare rostită și un idol numit consacrat DOMNULUI",
      teaching: teaching(
        "Mica recunoaște că el a furat argintul după ce aude blestemul mamei sale. Restituirea este necesară, dar ceea ce urmează arată că mărturisirea nu a ajuns la o întoarcere reală spre Cuvântul lui Dumnezeu.",
        "Mama spune că argintul este consacrat DOMNULUI, apoi îl folosește pentru un chip cioplit și unul turnat. Un gest nu devine sfânt doar pentru că numele lui Dumnezeu este rostit peste el. Dumnezeu nu primește drept închinare ceea ce contrazice porunca Lui.",
        "Mica își face o casă de dumnezei, un efod și un preot ales de el. Religia este reorganizată în jurul confortului familiei, fără autoritatea legământului. Versetul-cheie explică atmosfera: fiecare făcea ce era drept în ochii lui.",
      ),
      words: [
        {
          original: "הַיָּשָׁר בְּעֵינָיו",
          transliteration: "ha-iașar be-einav",
          language: "ebraica",
          meaning:
            "ceea ce era drept în ochii lui. Expresia nu laudă autenticitatea personală, ci descrie o societate în care dorința proprie a înlocuit Cuvântul și domnia lui Dumnezeu.",
        },
      ],
      crossRefs: ["Exod 20:4-6", "Deuteronom 12:5-14", "Marcu 7:6-8"],
      forYourHeart:
        "Nu întreba numai dacă un lucru pare religios sau folosește numele lui Dumnezeu. Întreabă dacă este în acord cu adevărul și caracterul Lui.",
    },
    {
      verses: [7, 13],
      heading: "Levitul angajat și iluzia că binecuvântarea poate fi cumpărată",
      teaching: teaching(
        "Levitul pleacă să-și caute un loc, iar Mica îi oferă salariu, haine, hrană și statutul de «tată și preot». Nevoia reală a levitului este transformată într-un contract care legitimează sanctuarul privat.",
        "Mica se bucură că are acum un levit și concluzionează: «DOMNUL îmi va face bine». El presupune că persoana potrivită în sistemul construit de el Îl obligă pe Dumnezeu să binecuvânteze ceea ce Dumnezeu nu poruncise.",
        "Slujirea nu este marfă, iar prezența unui titlu religios nu sfințește idolatria. Când slujitorul depinde de plătitor pentru identitate și adevăr, amândoi pot ajunge să folosească religia în loc să se supună lui Dumnezeu.",
      ),
      crossRefs: ["Numeri 18:1-7", "1 Samuel 2:12-17", "1 Timotei 6:3-10"],
      forYourHeart:
        "Nu încerca să cumperi pacea cu Dumnezeu prin oameni, donații, ritualuri sau titluri. Binecuvântarea Lui nu este plata pentru sistemul pe care l-ai construit, ci har primit în ascultare și adevăr.",
    },
  ],
  prayer:
    "Doamne, păzește-ne de religia făcută după ochii și avantajele noastre.\n\nNu ne lăsa să numim consacrat ceea ce Cuvântul Tău numește idol și nici să folosim slujitori sau ritualuri ca garanții ale prosperității.\n\nCurăță-ne închinarea, motivele și felul în care administrăm banii și autoritatea spirituală.\n\nFă-ne oameni care se supun adevărului Tău, nu oameni care Îți folosesc Numele pentru propriul sistem. Amin.",
  status: judecatoriStatus(17),
})
